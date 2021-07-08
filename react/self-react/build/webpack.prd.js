const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                 parallel: true,
                 cache: true
            }),
            new OptimizeCSSAssetsPlugin({
                 assetNameRegExp:/\.css$/g,
                 cssProcessor:require('cssnano')
            })
        ]
    }
}