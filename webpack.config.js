const NODE_ENV = process.env.NODE_ENV || 'development'

const webpack = require('webpack')
const path = require('path')

module.exports = {

  context: __dirname + '/app',

  entry: [
    './core.js'
  ],
  output: {
    path: __dirname + '/assets/js',
    filename: 'bundle.js',
    library: 'store'
  },

  // watch: NODE_ENV == 'development',
  //
  // watchOptions: {
  //   aggregateTimeout: 300
  // },

  devtool: NODE_ENV == 'development' ? 'cheap-module-eval-source-map' : false,

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ],

  // resolve: {
  // },
  // resolveLoader: {
  // },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint']
      }
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        exclude: [
          /node_modules/,
          /tests/
        ],
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]

  },

  devServer: {
    host: 'localhost',
    port: 3000
  }

}

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings:     false,
        drop_console: true,
        unsafe:       true
      }
    })
  )
}
