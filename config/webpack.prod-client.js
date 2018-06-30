const path = require('path');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
  name: "client",
  entry: {
    vendor: ["react", "react-dom"],
    main: ["./src/main.js"]
  },
  mode: "production",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, '../dist'),
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
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
        use: [MiniCSSExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "markdown-with-front-matter-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin(),
    new OptimizeCssPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        WEBPACK: true
      }
    }),
    new UglifyjsPlugin(),
    new CompressionPlugin({
      algorithm: "gzip"
    }),
    new BrotliPlugin()
  ]
}
