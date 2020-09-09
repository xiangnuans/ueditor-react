const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const targetDirectory = path.resolve(__dirname, "dist");

const isDev = process.env.NODE_ENV !== "production";

if (!isDev) {
  plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    })
  );
  plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
      sourceMap: false,
    })
  );
}

module.exports = {
  entry: path.resolve(__dirname, "examples/src/app.js"),
  output: {
    path: targetDirectory,
    filename: "[name]-[hash].js",
    hashDigestLength: 8,
  },
  devtool: "eval-source-map",
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "./"),
    open: true,
    port: 8001,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader",
            options: {
              url: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "less-loader",
            options: {
              url: false,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "ueditor-react": path.resolve(__dirname),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: path.resolve(__dirname, "examples/src/index.html"),
      minify: {
        collapseWhitespace: !isDev,
        removeComments: !isDev,
        removeRedundantAttributes: !isDev,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "app-[contenthash:8].css",
    }),
  ],
};
