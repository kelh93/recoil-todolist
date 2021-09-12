const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|less)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                importLoader: 2,
                namedExport: true, // 将'.foo-bar' 导出为 'fooBar'
                localIdentName: '[name]__[local]__[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, './src'), // cssMoudle作用域
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {},
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        type: 'assets/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
    }),
    new HtmlExtractPlugin({
      title: 'recoil and webpack',
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ],
};
