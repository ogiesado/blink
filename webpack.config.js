const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const buildDir = path.resolve(__dirname, 'client', 'build');
const publicPath = '/assets/';

const imageEncodeSizeLimit = 3000;
const fontEncodeSizeLimit = 3000;

const nodeModuleFiles = /node_modules/;
const sassFiles = /\.scss$/;
const cssFiles = /\.css$/;
const scriptFIles = /\.(jsx|js)$/;
const imageFiles = /\.(png|jpg|gif|svg)$/;
const fontFiles = /\.(eot|ttf|woff|woff2)$/;

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  allChunks: true,
});

module.exports = {
  entry: {
    ['babel-polyfill']: 'babel-polyfill',
    ['blink']: './client/src',
  },
  output: {
    path: buildDir,
    publicPath: publicPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  externals: {
    jquery: 'jQuery',
  },
  module: {
    rules: [
      {
        test: scriptFIles,
        exclude: nodeModuleFiles,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
            options: {
              emitError: true,
              emitWarning: true,
              failOnWarning: false,
              failOnError: true,
            },
          },
        ],
      },
      {
        test: cssFiles,
        exclude: nodeModuleFiles,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: true,
                sourceMap: true,
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
      {
        test: sassFiles,
        exclude: nodeModuleFiles,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: true,
                sourceMap: true,
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: imageFiles,
        exclude: nodeModuleFiles,
        loader: 'url-loader',
        options: {
          name: './images/[hash].[ext]',
          limit: imageEncodeSizeLimit,
        },
      },
      {
        test: fontFiles,
        exclude: nodeModuleFiles,
        loader: 'url-loader',
        options: {
          name: './fonts/[hash].[ext]',
          limit: fontEncodeSizeLimit,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([path.join('client', 'build')], {
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: [],
      watch: false,
    }),
    extractSass,
    new webpack.LoaderOptionsPlugin({
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new StyleLintPlugin({
      files: ['client/src/**/*.s?(a|c)ss'],
      emitErrors: true,
      failOnError: false,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
  ],
  devtool: 'source-map',
  stats: 'minimal',
};
