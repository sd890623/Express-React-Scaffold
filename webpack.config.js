const path = require('path');
const webpack = require('webpack');

const ENTRY_POINTS = './client/src/index';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ENTRY_POINTS,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  module: {
    rules: [
      { test: /\.html$/, use: ['file-loader?name=[name].[ext]'], include: path.join(__dirname, 'client', 'src') },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$|\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        query: {
          limit: 1,
          name: 'images/[name].[ext]?[hash:5]'
        }
      },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=/fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=/fonts/[name].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'}
    ]
  },
  devServer: {
      proxy: {
        '/api':{
          target: 'http://localhost:8080' 
        }
    }
  }
};
