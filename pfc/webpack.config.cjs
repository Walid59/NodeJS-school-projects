// fichier webpack.config.js
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require('webpack-node-externals');



module.exports = {
  resolve: {
    fallback: {
      "url": false,
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
    }
  },
  entry: './main.js',
  mode : 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'scripts/bundle.js'
  },
plugins: [
  new CopyPlugin({
    patterns: [
      {
        from: 'public/*.html',
        to:   '[name].html'
      },
      {
        from: 'public/scripts/*.js',
        to:   '[name].js'
      },
    ]
  }),
],
  externals: [nodeExternals()],
};