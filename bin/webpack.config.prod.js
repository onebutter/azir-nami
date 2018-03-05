const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  stats: 'none',
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'src/index.html'),
      inject: 'body'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      sourceMap: true,
      screw_ie8: true,
      warnings: false
    }),
    new CompressionPlugin({
      asset: '[path]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshhold: 0,
      minRatio: 0.8
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: path.join(process.cwd(), 'node_modules'),
        include: path.join(process.cwd(), 'src/'),
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              extends: path.join(process.cwd(), '/.babelrc')
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { importLoaders: 1, modules: true }
          },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.png$|\.jpg$|.jpeg|\.svg$/,
        loaders: [{ loader: 'file-loader', options: { name: '[hash].[ext]' } }]
      }
    ]
  },
  output: {
    path: path.resolve(process.cwd(), 'build'),
    filename: 'application.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      Features: path.join(process.cwd(), 'src', 'features'),
      Utils: path.join(process.cwd(), 'src', 'utils'),
      Containers: path.join(process.cwd(), 'src', 'containers'),
      config: path.join(process.cwd(), 'src', 'config')
    }
  }
};
