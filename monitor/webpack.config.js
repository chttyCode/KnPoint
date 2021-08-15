const path = require("path");
const fs = require("fs");
const WriteStream = fs.WriteStream;
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  context: process.cwd(),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "monitor.js",
  },
  devtool: "source-map",
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    before(router) {
      console.log(router);
      router.get("/success", function (req, res) {
        res.json({ id: 1 }); //200
      });
      router.post("/error", function (req, res) {
        res.sendStatus(500); //500
      });
      router.post("/logstores", function (req, res) {
        req.pipe(res);
      });
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", ".wasm"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "head",
    }),
  ],
};
