/* webpack.config.js ： Webpack 的設定檔 */
const path = require('path');
const clientConfig = {
  entry: {
    'index': './frontend/src/index.js'
  },
  module:{
    rules:[{
       loader: 'babel-loader',
            test: '/\.(js|jsx)$/',
            exclude: /node_modules/
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // 獲取絕對路徑的方法
    filename: '[name].bundle.js'
  }
}
module.exports = [clientConfig];
