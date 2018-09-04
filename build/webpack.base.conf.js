const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

require('dotenv').config()

module.exports = {
  entry: {
    app: [
      './client/index.js'
    ]
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '..', 'client')
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        exclude: [/node_modules/]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        },
        exclude: [/flag-icon-css/]
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'file-loader',
        include: [/flag-icon-css/]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'OBFUSCATION_KEY': JSON.stringify(process.env.AIS_CLIENT_OBFUSCATION_KEY)
      }
    }),
    new FriendlyErrorsPlugin(),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '..', 'static'),
      to: path.join(__dirname, '..', 'dist')
    }]),
    new HtmlWebpackPlugin({
      index: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
}
