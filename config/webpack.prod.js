const path = require('path');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = env => {
  return {
    entry: {
      main: ["./src/main.js"]
    },
    mode: "production",
    output: {
      filename: "[name]-bundle.js",
      path: path.resolve(__dirname, '../dist'),
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCSSExtractPlugin.loader
            },
            {
              loader: "css-loader"
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: {
                attrs: ["img:src"]
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: "images/[name].[ext]"
              }
            }
          ]
        },
      ]
    },
    plugins: [
      new OptimizeCssPlugin({
        filename: "[name]-[contenthash].css"
      }),
      new MiniCSSExtractPlugin(),
      new htmlWebpackPlugin({
        template: './src/index.ejs',
        title: 'Link\'s Journal'
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(env.NODE_ENV)
        }
      }),
      new MinifyPlugin(),
      new UglifyjsPlugin(),
      new CompressionPlugin({
        algorithm: "gzip"
      }),
      new BrotliPlugin()
    ]
  }
}
