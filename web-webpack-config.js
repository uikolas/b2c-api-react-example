const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");

const DashboardPlugin = require("webpack-dashboard/plugin");

const basicConfig = require('./basic-webpack-config');


const {
  PRODUCTION,
  definableConstants,
  DEV_SERVER_HOST,
  DEV_SERVER_PORT,

  commonLoaders,
  webLoaders,

  cleanBuild,
  configureLoader,

  commonExtensions,
  webExtensions,
} = basicConfig;

const webpackDevServer = process.env.NODE_ENV === 'webpack-dev-server';
let devServer = {};
let watchOptions = {};

if(webpackDevServer) {
  watchOptions = {
    // aggregates multiple changes to a single rebuild
    aggregateTimeout: 1000, // in ms
    poll: 1000, // in ms
  };
  const staticPattern = new RegExp('^/.*\.(js|css|json|woff|woff2|ttf|gif|eot|svg|md|jpg|png|map|ico)$');
  devServer = {
    contentBase: path.resolve(__dirname, 'build', 'web'),
    compress: true,
    historyApiFallback: {
      disableDotRule: true
    },
    host: DEV_SERVER_HOST,
    port: DEV_SERVER_PORT,
    https: false, // if true, self-signed certificate is used
    hot: true,
    inline: true,
    noInfo: false, // if true, bundling messages will be hidden. Errors and warnings will still be shown.
    proxy: {
      '^/**': {  //catch all other requests
        target: '/index.html',  //default target
        secure: false,
        bypass: (req, res, opt) => {
          if(req.path.match(staticPattern)){
            return '/';
          }
          if (req.headers.accept.indexOf('html') !== -1) {
            return '/index.html';
          }
        }
      }
    }
  };
}

const entry = {
  app: [
    `./src/web/index.tsx`,
  ],
};
if(webpackDevServer) {
  entry["dev-server-client"] = 'webpack-dev-server/client?http://' + DEV_SERVER_HOST + ':' + DEV_SERVER_PORT;
  entry["dev-server-hot"] = 'webpack/hot/only-dev-server';
}

const config = {
  mode: PRODUCTION ? 'production' : 'development',
  target: 'web',
  context: __dirname,
  entry,

  node: {
    __dirname: true,
  },

  output: {
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    path: path.resolve(__dirname, 'build', 'web'), // string

    // the filename template for entry chunks
    filename: webpackDevServer ? '[name].js': '[name].[hash].js',

    chunkFilename: webpackDevServer ? '[name].js': '[name].[hash].js',

    // the url to the output directory resolved relative to the HTML page
    publicPath: webpackDevServer ? "http://" + DEV_SERVER_HOST + ':' + DEV_SERVER_PORT + "/" : "/",
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        cache: !PRODUCTION,
        extractComments: PRODUCTION,
        uglifyOptions: {
          ie8: false,
          safari10: true,
          ecma: 8,
          mangle: PRODUCTION ? {
            keep_classnames: true,
            keep_fnames: true,
            safari10: true,
          } : false,
          keep_classnames: true,
          keep_fnames: true,
          // sourceMap: true,
          compress: {
            warnings: false, // Suppress uglification warnings
            drop_console: PRODUCTION,
            // inline: false,
            keep_classnames: true,
            ecma: 8,
          },
          output: {
            comments: false,
            beautify: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    cleanBuild(['build/web']),
    configureLoader(),
    new webpack.DefinePlugin({
      __WEB__: true,
      __SERVER__: false,
      'global.GENTLY': false,
      ...definableConstants,
    }),
    new ExtractTextPlugin({
      filename: '[name][hash].css',
      disable: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `src`, `web`, `index.ejs`),
      inject: false,
      title: process.env.APP_TITLE || '',
      filename: `index.html`,
      hash: true,
      compile: true,
      favicon: path.resolve(__dirname, 'favicon.ico'),
      minify: false,
      cache: true,
      showErrors: true,
      devServer: webpackDevServer ? 'http://' + DEV_SERVER_HOST + ':' + DEV_SERVER_PORT : '',
      xhtml: false,
    }),
    ...(
      webpackDevServer ? [
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin(),
      ] : []
    ),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    extensions: [
      ...commonExtensions,
      ...webExtensions,
    ],
    alias: {},
  },
  module: {
    rules: [
      ...commonLoaders,
      ...webLoaders,
    ],
  },

  stats: {
    children: false, // Log spam
    reasons: !PRODUCTION,
    hash: true,
    version: true,
    timings: true,
    cached: true,
  },

  cache: true,

  performance: {
    hints: 'warning'
  },


  watch: webpackDevServer,
  watchOptions,

  devtool: PRODUCTION ? 'source-map' : 'inline-source-map',
  devServer,
};


module.exports = config;
