const path = require("path");
const merge = require("webpack-merge");
const dev = require("./webpack.dev");
const prd = require("./webpack.prd");
const webpack = require("webpack");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// eslint-disable-next-line no-undef
module.exports = env => {
  let base = {
    mode: env,
    entry: "./src/index.tsx",
    output: {
      filename: "[name][hash].js",
      path: path.resolve(__dirname, "../dist")
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".json", ".scss", ".jsx", ".svg"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "babel-loader"
        },
        {
          test: /\.css$/,
          use: [
            env == "development" ? "style-loader" : miniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader"
          ]
        },
        {
          test: /\.less$/,
          use: [
            env == "development" ? "style-loader" : miniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "less-loader"
          ]
        },
        {
          test: /\.(jpe?g|png|gif|mp4|mp3)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 1 * 1024,
              name: "images/[hash].[ext]"
            }
          }
        },
        {
          test: /\.tsx?$/,
          loader: "eslint-loader",
          enforce: "pre",
          include: [path.join(__dirname, "../src")],
          options: {
            fix: true
          }
        }
      ]
    },
    plugins: [
      env !== "development" &&
        new miniCssExtractPlugin({
          filename: "[name].[hash].css"
        }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "../public/index.html")
      }),
      new CleanWebpackPlugin(),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ].filter(Boolean)
  };
  if (env === "development") {
    return merge(base, dev);
  }
  return merge(base, prd);
};
