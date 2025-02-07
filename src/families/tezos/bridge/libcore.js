// @flow
import invariant from "invariant";
import { BigNumber } from "bignumber.js";
import {
  AmountRequired,
  NotEnoughBalance,
  NotEnoughBalanceToDelegate,
  NotEnoughBalanceInParentAccount,
  FeeNotLoaded,
  FeeTooHigh,
  NotSupportedLegacyAddress,
  InvalidAddressBecauseDestinationIsAlsoSource,
  RecommendSubAccountsToEmpty,
  RecommendUndelegation
} from "@ledgerhq/errors";
import { validateRecipient } from "../../../bridge/shared";
import type { Account, AccountBridge, CurrencyBridge } from "../../../types";
import type { Transaction } from "../types";
import { scanAccountsOnDevice } from "../../../libcore/scanAccountsOnDevice";
import { getAccountNetworkInfo } from "../../../libcore/getAccountNetworkInfo";
import { syncAccount } from "../../../libcore/syncAccount";
import { getFeesForTransaction } from "../../../libcore/getFeesForTransaction";
import libcoreSignAndBroadcast from "../../../libcore/signAndBroadcast";
import { makeLRUCache } from "../../../cache";
import { isAccountBalanceSignificant } from "../../../account";
import { withLibcore } from "../../../libcore/access";
import { libcoreBigIntToBigNumber } from "../../../libcore/buildBigNumber";
import { getCoreAccount } from "../../../libcore/getCoreAccount";
import {
  fetchAllBakers,
  hydrateBakers,
  asBaker,
  isAccountDelegating
} from "../bakers";
import { getEnv } from "../../../env";

type EstimateGasLimitAndStorage = (
  Account,
  string
) => Promise<{ gasLimit: BigNumber, storage: BigNumber }>;
export const estimateGasLimitAndStorage: EstimateGasLimitAndStorage = makeLRUCache(
  (account, addr) =>
    withLibcore(async core => {
      const { coreAccount } = await getCoreAccount(core, account);
      const tezosLikeAccount = await coreAccount.asTezosLikeAccount();
      const gasLimit = await libcoreBigIntToBigNumber(
        await tezosLikeAccount.getEstimatedGasLimit(addr)
      );

      // for babylon network 257 is the current cost of sending to new account.
      const storage = BigNumber(257);
      /*
      const storage = await libcoreBigIntToBigNumber(
        await tezosLikeAccount.getStorage(addr)
      );
      */
      return { gasLimit, storage };
    }),
  (a, addr) => a.id + "|" + addr
);

const calculateFees = makeLRUCache(
  async (a, t) => {
    return getFeesForTransaction({
      account: a,
      transaction: t
    });
  },
  (a, t) =>
    `${a.id}_${t.amount.toString()}_${t.recipient}_${
      t.gasLimit ? t.gasLimit.toString() : ""
    }_${t.fees ? t.fees.toString() : ""}_${
      t.storageLimit ? t.storageLimit.toString() : ""
    }_${String(t.useAllAmount)}`
);

const startSync = (initialAccount, _observation) => syncAccount(initialAccount);

const createTransaction = () => ({
  family: "tezos",
  mode: "send",
  amount: BigNumber(0),
  fees: null,
  gasLimit: null,
  storageLimit: null,
  recipient: "",
  networkInfo: null,
  useAllAmount: false
});

const updateTransaction = (t, patch) => ({ ...t, ...patch });

const signAndBroadcast = (account, transaction, deviceId) =>
  libcoreSignAndBroadcast({
    account,
    transaction,
    deviceId
  });

const getTransactionStatus = async (a, t) => {
  const errors = {};
  const warnings = {};
  const subAcc = !t.subAccountId
    ? null
    : a.subAccounts && a.subAccounts.find(ta => ta.id === t.subAccountId);

  invariant(
    t.mode === "send" || !subAcc,
    "delegation features not supported for sub accounts"
  );

  const account = subAcc || a;

  if (t.mode !== "undelegate") {
    if (account.freshAddress === t.recipient) {
      errors.recipient = new InvalidAddressBecauseDestinationIsAlsoSource();
    } else {
      const { recipientError, recipientWarning } = await validateRecipient(
        a.currency,
        t.recipient
      );

      if (recipientError) {
        errors.recipient = recipientError;
      }

      if (recipientWarning) {
        warnings.recipient = recipientWarning;
      }
    }
  }

  if (
    !getEnv("LEGACY_KT_SUPPORT_TO_YOUR_OWN_RISK") &&
    t.recipient.startsWith("KT") &&
    !errors.recipient
  ) {
    errors.recipient = new NotSupportedLegacyAddress();
  }

  let estimatedFees = BigNumber(0);
  let amount = t.amount;

  if (!t.fees) {
    errors.fees = new FeeNotLoaded();
  } else if (!errors.recipient) {
    await calculateFees(a, t).then(
      res => {
        estimatedFees = res.estimatedFees;
        amount = res.value;
      },
      error => {
        if (error.name === "NotEnoughBalance") {
          errors.amount = error;
        } else {
          throw error;
        }
      }
    );
  }

  if (!errors.amount && subAcc && estimatedFees.gt(a.balance)) {
    errors.amount = new NotEnoughBalanceInParentAccount();
  }

  let totalSpent = !t.useAllAmount
    ? t.amount.plus(estimatedFees)
    : account.balance;

  if (
    !errors.recipient &&
    !errors.amount &&
    (amount.lt(0) || totalSpent.gt(account.balance))
  ) {
    errors.amount = new NotEnoughBalance();
    totalSpent = BigNumber(0);
    amount = BigNumber(0);
  }

  if (t.mode === "send") {
    if (!errors.amount && amount.eq(0)) {
      errors.amount = new AmountRequired();
    } else if (amount.gt(0) && estimatedFees.times(10).gt(amount)) {
      warnings.feeTooHigh = new FeeTooHigh();
    }

    const thresholdWarning = 0.5 * 10 ** a.currency.units[0].magnitude;

    if (
      !errors.amount &&
      account.balance.minus(totalSpent).lt(thresholdWarning)
    ) {
      if (isAccountDelegating(account)) {
        warnings.amount = new RecommendUndelegation();
      } else if (
        !subAcc &&
        (a.subAccounts || []).some(isAccountBalanceSignificant)
      ) {
        warnings.amount = new RecommendSubAccountsToEmpty();
      }
    }
  } else {
    // delegation case, we remap NotEnoughBalance to a more precise error
    if (errors.amount instanceof NotEnoughBalance) {
      errors.amount = new NotEnoughBalanceToDelegate();
    }
  }

  return Promise.resolve({
    errors,
    warnings,
    estimatedFees,
    amount,
    totalSpent
  });
};

const prepareTransaction = async (a, t) => {
  let networkInfo = t.networkInfo;
  if (!networkInfo) {
    const ni = await getAccountNetworkInfo(a);
    invariant(ni.family === "tezos", "tezos networkInfo expected");
    networkInfo = ni;
  }

  let gasLimit = t.gasLimit;
  let storageLimit = t.storageLimit;
  if (!gasLimit || !storageLimit) {
    const { recipientError } =
      t.mode === "undelegate"
        ? {}
        : await validateRecipient(a.currency, t.recipient);
    if (!recipientError) {
      const r = await estimateGasLimitAndStorage(a, t.recipient);
      gasLimit = r.gasLimit;
      storageLimit = r.storage;
    }
  }

  let fees = t.fees || networkInfo.fees;

  if (
    t.networkInfo !== networkInfo ||
    t.gasLimit !== gasLimit ||
    t.storageLimit !== storageLimit ||
    t.fees !== fees
  ) {
    return { ...t, networkInfo, storageLimit, gasLimit, fees };
  }

  return t;
};

const preload = async () => {
  const bakers = await fetchAllBakers();
  return { bakers };
};

const hydrate = (data: mixed) => {
  if (!data || typeof data !== "object") return;
  const { bakers } = data;
  if (!bakers || typeof bakers !== "object" || !Array.isArray(bakers)) return;
  hydrateBakers(bakers.map(asBaker).filter(Boolean));
};

const currencyBridge: CurrencyBridge = {
  preload,
  hydrate,
  scanAccountsOnDevice
};

const accountBridge: AccountBridge<Transaction> = {
  createTransaction,
  updateTransaction,
  prepareTransaction,
  getTransactionStatus,
  startSync,
  signAndBroadcast
};

export default { currencyBridge, accountBridge };
