const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const DashboardPlugin = require("webpack-dashboard/plugin");

const basicConfig = require('./basic-webpack-config');

const {
  PRODUCTION,
  definableConstants,
  DEV_SERVER_HOST,
  DEV_SERVER_PORT,
  WEB_PATH,
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
    filename: "[name].[hash].bundle.js", // string

    chunkFilename: "[name].[chunkhash].chunk.js",

    // the url to the output directory resolved relative to the HTML page
    // webpackDevServer ? "http://" + DEV_SERVER_HOST + WEB_PATH : WEB_PATH
    publicPath: webpackDevServer ? "http://" + DEV_SERVER_HOST + ':' + DEV_SERVER_PORT + "/" : WEB_PATH,
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
          parse: {
            // Let uglify-js parse ecma 8 code but always output
            // ES5 compliant code for older browsers
            ecma: 8
          },
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
            ecma: 5,
            comparisons: false
          },
          output: {
            ecma: 5,
            comments: false,
            beautify: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'async',
      automaticNameDelimiter: "-",
      // hidePathInfo: true,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "vendors",
          chunks: "all",
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: "runtime"
    }
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
    new MiniCssExtractPlugin({
      filename: webpackDevServer ? "[name].css" : "[name].[hash].css",
      chunkFilename: webpackDevServer ? "[id].css" : "[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `src`, `web`, `index.ejs`),
      inject: true,
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
      chunksSortMode: 'none',
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
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
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
