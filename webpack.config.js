/* webpack.config.js ： Webpack 的設定檔 */
const path = require('path');
const clientConfig = {
  entry: {
<<<<<<< HEAD
    'index': './frontend/src/index.js'
=======
    'index': './frontend/src/containers/App.js'
>>>>>>> main
  },
  module:{
    rules:[{
       loader: 'babel-loader',
            exclude: /node_modules/,
            test: '/\.js$|jsx/',
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // 獲取絕對路徑的方法
    filename: '[name].bundle.js'
  }
}
module.exports = [clientConfig];
