const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  context: process.cwd(),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "monitor.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    before(router) {
      router.get("/success", function (req, res) {
        res.json({ id: 1 }); //200
      });
      router.post("/error", function (req, res) {
        res.sendStatus(500); //500
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
