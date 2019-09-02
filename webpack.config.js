const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const pkg = require('./package.json');

const { HOST = '0.0.0.0', PORT = 3000 } = process.env;

// eslint-disable-next-line max-lines-per-function
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const nodeModulesPath = path.resolve(__dirname, 'node_modules');

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'static/js/[name]-[hash:8].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        store: path.resolve(__dirname, 'src/store'),
        components: path.resolve(__dirname, 'src/components'),
        'react-dom': '@hot-loader/react-dom'
      }
    },
    optimization: {
      minimizer: [
        new TerserPlugin({ parallel: true, cache: true }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            'babel-loader?cacheDirectory=true',
            isProduction
              ? false
              : {
                  loader: 'eslint-loader',
                  options: {
                    emitWarning: true
                  }
              }
          ].filter((loader) => Boolean(loader))
        },
        {
          test: /\.css$/,
          include: nodeModulesPath,
          use: isProduction ? [MiniCssExtractPlugin.loader, 'css-loader'] : ['style-loader', 'css-loader']
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]-[local]'
                },
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /(\.gif|\.jpe?g|\.png|\.svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 6000,
                name: 'static/media/[name]-[hash:8].ext'
              }
            }
          ]
        }
      ]
    },
    devServer: {
      host: HOST,
      port: PORT,
      public: `localhost:${PORT}`,
      open: true
    },
    devtool: isProduction ? false : 'cheap-module-source-map',
    plugins: [
      isProduction
        ? new MiniCssExtractPlugin({
            filename: 'static/css/[name]-[hash:8].css',
            allChunks: true
          })
        : false,
      new ProgressBarPlugin({ clear: false }),
      new HtmlWebpackPlugin({
        cache: true,
        template: './src/static/index.html',
        favicon: './src/static/favicon.png',
        filename: './index.html',
        package: `${pkg.name} v${pkg.version}`
      }),
      isProduction ? false : new webpack.HotModuleReplacementPlugin()
    ].filter((plugin) => Boolean(plugin)),
    performance: {
      hints: false
    },
    stats: 'minimal'
  };
};
