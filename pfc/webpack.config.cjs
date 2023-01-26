// fichier webpack.config.js
const path = require('path');
module.exports = {
  entry: './main.js',
  mode : 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'scripts/bundle.js'
  }
};