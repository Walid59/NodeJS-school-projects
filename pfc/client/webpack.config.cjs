const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PRODUCTION = false;
const OUTPATH = PRODUCTION ? '../server/public' : '../server/public';
module.exports = {
  entry: './public/scripts/pfc.js',
  mode: PRODUCTION ? 'production' : 'development',
  target: "node",

  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
  },

  output: {
    path: path.resolve(__dirname, OUTPATH),
    filename: 'scripts/bundle.js'
  },

  devServer: {
    static: {
      publicPath: path.resolve(__dirname, 'public'),
      watch: true
    },
    host: 'localhost',
    port: 8080,
    open: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg`)/i,
        use: [
          { loader: 'file-loader' }
        ]
      }
    ]
  },

  plugins: [

    new HtmlWebpackPlugin({
      template: "./public/html/pfc.html",
      filename: "./pfc.html"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './public/html/*.html',
          to: '[name][ext]',
          globOptions: {
            ignore: ['**/pfc.html*']
          },
          noErrorOnMissing: true
        },

        {
          from: './public/images/*',
          to: 'images/[name][ext]',
          noErrorOnMissing: true
        },
        {
          from: './public/style/*',
          to: 'style/[name][ext]',
          noErrorOnMissing: true
        },
        {
          from: './public/scripts/*',
          to: 'scripts/[name][ext]',
          globOptions: {
            ignore: ['**/pfc.js*']
          },
          noErrorOnMissing: true
        }
      ]
    })
  ],
};