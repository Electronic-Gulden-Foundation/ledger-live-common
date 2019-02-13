// @flow

import Svg, { G, Path } from "react-native-svg";
import React from "react";

const Changelly = ({ width = 150 }: { width?: number }) => (
  <Svg height={(width * 34) / 150} width={width} viewBox="0 0 150 34">
    <G fill="#2d2e2c" fillRule="evenodd">
      <Path d="m42.48 17.066c0-3.537 2.813-6.542 6.538-6.542 2.417 0 3.922 0.994 5.106 2.23l-1.208 1.26c-1.012-1.043-2.196-1.842-3.923-1.842-2.59 0-4.564 2.156-4.564 4.894 0 2.714 2.023 4.87 4.687 4.87 1.629 0 2.838-0.823 3.849-1.89l1.258 1.14c-1.283 1.405-2.812 2.422-5.205 2.422-3.725 0-6.537-2.98-6.537-6.542" />
      <Path d="m56.355 6.549 1.9-0.92v7.342c0.838-1.356 2.17-2.447 4.366-2.447 3.083 0 4.884 2.036 4.884 5.016v7.778h-1.9v-7.318c0-2.326-1.282-3.78-3.527-3.78-2.195 0-3.824 1.575-3.824 3.926v7.172h-1.899v-16.77" />
      <Path d="m75.504 10.598c-1.874 0-3.2327 0.43445-4.6387 1.0645l0.56836 1.5273c1.184-0.533 2.368-0.89648 3.873-0.89648 2.393 0 3.7734 1.1626 3.7734 3.3926v0.38672c-1.135-0.315-2.2685-0.5332-3.8965-0.5332-3.232 0-5.4531 1.4067-5.4531 4.0957 0 2.618 2.3687 3.9492 4.7617 3.9492 2.245 0 3.6999-1.0188 4.5879-2.1328v1.8672h1.875v-7.6582c0-1.599-0.44403-2.8106-1.332-3.6836-0.913-0.896-2.3181-1.3789-4.1191-1.3789zm-0.12305 6.4199a13.322 13.322 0 0 1 3.7246 0.5332v1.1641c0 1.987-1.9011 3.3672-4.2441 3.3672-1.727 0-3.207-0.92109-3.207-2.4961 0-1.55 1.3586-2.5684 3.7266-2.5684z" />
      <Path d="m84.165 10.79h1.9v2.181c0.839-1.356 2.17-2.447 4.366-2.447 3.084 0 4.885 2.036 4.885 5.016v7.778h-1.9v-7.318c0-2.326-1.283-3.78-3.527-3.78-2.196 0-3.824 1.575-3.824 3.926v7.172h-1.9v-12.528" />
      <Path d="m103.69 10.523c-3.034 0-5.9941 2.2541-5.9941 5.9121 0 3.659 2.9351 5.9141 5.9941 5.9141 2.343 0 3.8978-1.1886 5.0078-2.6426v1.4785c0 2.932-1.8267 4.459-4.6387 4.459-1.825 0-3.4532-0.55761-4.9082-1.5996l-0.86524 1.4531h0.001953c1.701 1.163 3.6759 1.7441 5.7969 1.7441 2.024 0 3.7254-0.55688 4.8594-1.6719 1.036-1.018 1.6289-2.4946 1.6289-4.4336v-10.346h-1.9004v2.2539c-1.036-1.357-2.5894-2.5215-4.9824-2.5215zm0.36914 1.6484c2.4164 0 4.6863 1.6714 4.6875 4.2383v0.001953c-0.00117 2.5689-2.2701 4.2891-4.6875 4.2891-2.368 0-4.416-1.7456-4.416-4.2656 0-2.616 1.999-4.2637 4.416-4.2637z" />
      <Path d="m119.3 10.523c-3.528-1e-6 -6.1191 2.909-6.1191 6.543 0 3.902 2.8612 6.541 6.3652 6.541 2.417 0 3.9709-0.94461 5.2539-2.3496l-1.1855-1.041c-1.035 1.066-2.2685 1.7676-4.0195 1.7676-2.245 0-4.2182-1.527-4.4902-4.168h10.115c0.025-0.291 0.02343-0.48334 0.02343-0.65234 0-3.684-2.1694-6.6406-5.9434-6.6406zm-0.04882 1.5762c2.516 0 3.8464 1.9368 4.0684 4.2148h-8.2148c0.272-2.423 1.9505-4.2148 4.1465-4.2148z" />
      <Path d="m127.9 7.356 1.9-0.919v16.88h-1.9v-15.959" />
      <Path d="m133.27 6.549 1.9-0.92v17.689h-1.9v-16.77" />
      <Path d="m137.69 26.637 0.642-1.478c0.616 0.315 1.184 0.46 1.997 0.46 1.135 0 1.85-0.58 2.616-2.35l-5.798-12.478h2.097l4.638 10.443 4.095-10.443h2.023l-5.353 12.938c-1.086 2.593-2.319 3.538-4.243 3.538-1.061 0-1.85-0.218-2.714-0.63" />
    </G>
    <Path
      d="m29.688 18.399c-5.523 4.77-7.827 5.228-10.113 4.182l2.495-3.095c0.368-0.453 0.636-0.991 0.773-1.555l1.007-4.128-4.204 0.988a4.103 4.103 0 0 0-1.58 0.758l-3.154 2.451c-1.064-2.245-0.599-4.508 4.259-9.933 4.589-5.125 14.3-6.302 17.178-6.543-0.245 2.827-1.443 12.366-6.661 16.874zm-3.677 7.394a0.893 0.893 0 0 1-0.38 0.563c-0.581 0.393-1.478 0.938-2.273 1.41l0.04-0.146c0.386-1.491 0.382-2.64-0.01-3.424 1.046-0.312 2.177-0.886 3.458-1.745-0.31 1.155-0.669 2.533-0.835 3.342zm-8.736-2.676c-0.329 0.408-0.841 0.636-1.37 0.61l-0.02-2e-3 -1.256 2e-3 4.354-5.144-5.238 4.276 3e-3 -1.213-2e-3 -0.04a1.603 1.603 0 0 1 0.62-1.346l4.612-3.585a2.619 2.619 0 0 1 1.01-0.484l1.88-0.443-0.45 1.848a2.54 2.54 0 0 1-0.495 0.994zm-7.493-8.87-0.15 0.038a52.609 52.609 0 0 1 1.437-2.233 0.912 0.912 0 0 1 0.573-0.372c0.823-0.163 2.226-0.515 3.402-0.82-0.875 1.258-1.458 2.369-1.776 3.397-0.797-0.386-1.967-0.39-3.486-0.01zm27.328-14.217c-0.54 0.023-13.227 0.597-19.04 7.088a53.482 53.482 0 0 0-1.609 1.876c-0.842 0.227-3.8 1.016-5.109 1.275a2.37 2.37 0 0 0-1.49 0.968c-0.89 1.273-2.445 3.888-2.51 3.999l-1.127 1.898 2.052-0.876c1.344-0.574 3.6-1.164 4.405-0.678 0.132 0.08 0.27 0.211 0.293 0.583h3e-3c0.016 0.935 0.277 1.832 0.758 2.752l-0.279 0.216a3.035 3.035 0 0 0-1.175 2.53l-7e-3 3.51 3.574-7e-3a3.124 3.124 0 0 0 2.575-1.154l0.22-0.274c0.937 0.473 1.85 0.727 2.803 0.742v7e-3c0.378 0.022 0.512 0.157 0.593 0.287 0.495 0.79-0.106 3.006-0.69 4.327l-0.896 2.018 1.936-1.11c0.113-0.064 2.776-1.59 4.071-2.465 0.513-0.346 0.863-0.866 0.986-1.464 0.264-1.285 1.067-4.19 1.298-5.018 0.603-0.475 1.238-1 1.91-1.58 6.608-5.71 7.193-18.173 7.215-18.7l0.032-0.78-0.793 0.031z"
      fill="#46b06e"
      fillRule="evenodd"
    />
    <Path
      d="m26.865 7.512a2.412 2.412 0 0 1 1.695-0.688c0.613 0 1.227 0.23 1.694 0.688a2.327 2.327 0 0 1 0 3.329 2.43 2.43 0 0 1-3.389 0 2.318 2.318 0 0 1-0.702-1.665c0-0.628 0.25-1.22 0.702-1.664zm1.695 5.455c0.988 0 1.977-0.37 2.73-1.109a3.75 3.75 0 0 0 0-5.364 3.915 3.915 0 0 0-5.46 0 3.735 3.735 0 0 0-1.132 2.682c0 1.014 0.402 1.966 1.131 2.682a3.885 3.885 0 0 0 2.73 1.11zm-10.65 15.705a9.974 9.974 0 0 1-0.899 0.742 13.68 13.68 0 0 1-1.966 1.216c-0.685 0.35-1.395 0.645-2.12 0.891a17.22 17.22 0 0 1-2.22 0.598c-0.373 0.084-0.754 0.138-1.13 0.205l-0.572 0.073-0.285 0.037-0.287 0.026-0.574 0.054-0.576 0.03c-0.384 0.03-0.77 0.028-1.155 0.038a32.09 32.09 0 0 1-3.384-0.152c0.132-0.181 0.261-0.365 0.386-0.553 0.361-0.55 0.685-1.126 0.97-1.715 0.562-1.184 0.97-2.402 1.318-3.618a36.241 36.241 0 0 1 1.184-3.524 32.838 32.838 0 0 1 1.574-3.41c-0.422 0.476-0.8 0.99-1.158 1.514-0.361 0.525-0.695 1.067-1.01 1.622a25.011 25.011 0 0 0-1.609 3.466c-0.449 1.162-0.913 2.305-1.488 3.365-0.567 1.064-1.27 2.032-2.071 2.966l-0.836 0.975 1.297 0.182c1.602 0.224 3.228 0.342 4.858 0.284 0.407-0.02 0.814-0.027 1.221-0.07l0.61-0.057 0.608-0.081c0.405-0.045 0.806-0.135 1.208-0.205 0.4-0.095 0.801-0.17 1.194-0.29 0.395-0.103 0.783-0.235 1.171-0.363 0.384-0.144 0.766-0.289 1.139-0.458a14.047 14.047 0 0 0 2.138-1.177 11.66 11.66 0 0 0 1.863-1.544c0.553-0.58 1.063-1.208 1.412-1.916a7.616 7.616 0 0 1-0.811 0.848"
      fill="#46b06e"
      fillRule="evenodd"
    />
  </Svg>
);

export default Changelly;