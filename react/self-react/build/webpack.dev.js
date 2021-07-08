const path = require('path')
module.exports={
    mode:'development',
    devtool: 'cheap-module-eval-source-map', //eval-source-map
    devServer:{
        historyApiFallback: true,
        inline: true,
        hot: true,
        port: 3000,
        compress: true,
        disableHostCheck: true, //LAN host config
        stats: 'errors-only',
        proxy: {
          '/mock': {
            target: 'http://dip.cnsuning.com/service/1554195599857/1.0.0',
            pathRewrite: {
              '^/mock': '/yypt-web'
            },
            changeOrigin: true,
            secure: false
          },
          '/api': {
            target: 'http://yyptsit2.cnsuning.com/',
            pathRewrite: { '^/api': '/yypt-web' },
            changeOrigin: true,
            secure: false
          },
          '/yypt-web': {
            target: 'http://yyptsit2.cnsuning.com/',
            pathRewrite: { '^/api': '/yypt-web' },
            changeOrigin: true,
            secure: false
          },
          
        }
    }
}