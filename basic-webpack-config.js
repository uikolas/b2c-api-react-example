const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


dotenv.config();

const PRODUCTION = process.env.NODE_ENV === 'production' || process.argv.indexOf('-p') !== -1;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST ? process.env.DEV_SERVER_HOST : 'localhost';
const DEV_SERVER_PORT = process.env.DEV_SERVER_PORT ? process.env.DEV_SERVER_PORT : '2992';
const WEB_PORT = process.env.WEB_PORT ? process.env.WEB_PORT : '4200';
const WEB_PATH = process.env.WEB_PATH ? process.env.WEB_PATH : '/api/';
const API_URL = process.env.API_URL ? process.env.API_URL : 'http://localhost:8080/api/';
const APP_TITLE = process.env.APP_TITLE || 'App';

const definableConstants = {
  "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
  "process.env.WEB_PORT": JSON.stringify(WEB_PORT),
  "process.env.WEB_PATH": JSON.stringify(WEB_PATH),
  "process.env.API_URL": JSON.stringify(API_URL),
  "process.env.DEV_SERVER_HOST": JSON.stringify(DEV_SERVER_HOST),
  "process.env.DEV_SERVER_PORT": JSON.stringify(DEV_SERVER_PORT),
  "process.env.APP_TITLE": JSON.stringify(APP_TITLE),
};

const globalCssLoaderOptions = {
  loader: "css-loader",
  options: {
    modules: false,
    sourceMap: !PRODUCTION,
    minimize: PRODUCTION,
    discardComments: { removeAll: true },
  },
};
const localCssLoaderOptions = {
  loader: "css-loader",
  options: {
    camelCase: true,
    modules: true,
    localIdentName: !PRODUCTION ? '[path]___[name]__[local]___[hash:base64:5]' : '[hash:base64:5]',
    sourceMap: !PRODUCTION,
    minimize: PRODUCTION,
    discardComments: { removeAll: true },
  },
};
const sassLoaderOptions = {
  loader: "sass-loader",
  options: {
    includePaths: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "src")
    ]
  },
};
const localCssLoader = {
  test: /\.css$/,
  exclude: /node_modules/, // Ignore the folder containing 3rd party scripts
  use: [
    MiniCssExtractPlugin.loader,
    localCssLoaderOptions,
    {
      loader: "resolve-url-loader"
    },
    {
      loader: "postcss-loader"
    }
  ]
};
const localSaasLoader = {
  test: /\.sass$/,
  exclude: /node_modules/, // Ignore the folder containing 3rd party scripts
  use: [
    MiniCssExtractPlugin.loader,
    localCssLoaderOptions,
    {
      loader: "resolve-url-loader"
    },
    {
      loader: "postcss-loader"
    },
    sassLoaderOptions
  ]
};
const localScssLoader = {
  test: /\.scss$/,
  exclude: /node_modules/, // Ignore the folder containing 3rd party scripts
  use: [
    MiniCssExtractPlugin.loader,
    localCssLoaderOptions,
    {
      loader: "resolve-url-loader"
    },
    {
      loader: "postcss-loader"
    },
    sassLoaderOptions
  ]
};
const globalCssLoader = {
  test: /\.css$/,
  include: /node_modules/, // Proceed the folder containing 3rd party scripts
  use: [
    MiniCssExtractPlugin.loader,
    globalCssLoaderOptions,
    {
      loader: "resolve-url-loader"
    },
    {
      loader: "postcss-loader"
    }
  ]
};
const globalSaasLoader = {
  test: /\.sass$/,
  include: /node_modules/, // Proceed the folder containing 3rd party scripts
  use: [
    MiniCssExtractPlugin.loader,
    globalCssLoaderOptions,
    {
      loader: "resolve-url-loader"
    },
    {
      loader: "postcss-loader"
    },
    sassLoaderOptions
  ]
};
const globalScssLoader = {
  test: /\.scss$/,
  include: /node_modules/, // Proceed the folder containing 3rd party scripts
  use: [
    MiniCssExtractPlugin.loader,
    globalCssLoaderOptions,
    {
      loader: "resolve-url-loader"
    },
    {
      loader: "postcss-loader"
    },
    sassLoaderOptions
  ]
};
const tsLoader = {
  test: /\.tsx?$/,
  include: [
    path.resolve(__dirname, 'src'),
  ],
  use: [
    {loader: 'ts-loader', options: {transpileOnly: false}},
    {loader: 'tslint-loader'},
  ],
};
const htmlLoader = {
  test: /\.html$/,
  use: [
    "htmllint-loader",
    {loader: "html-loader"}
  ]
};
const staticLoaders = [
  {test: /\.gif(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
  {test: /\.jpg|png$/, loader: "url-loader?limit=100000"},
  {
    test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/', // where the fonts will go
        publicPath: '../', // override the default path
      },
    }],
  },
];
const stylesLoaders = [
  localCssLoader,
  localSaasLoader,
  localScssLoader,
  globalCssLoader,
  globalSaasLoader,
  globalScssLoader
];
const commonLoaders = [
  {test: /\.node$/, loader: 'node-loader'},
  {test: /\.json$/, loader: 'json-loader'}, // already set by default in webpack@2.2, so redundant
  tsLoader,
  htmlLoader,
  {test: /\.md$/, loader: "html-loader!markdown-loader?gfm=false"},
  {test: /LICENSE$/, loader: "html-loader!markdown-loader?gfm=false"},
];
const webLoaders = [
  ...stylesLoaders,
  ...staticLoaders
];
const cleanBuild = (paths) => {
  return new CleanWebpackPlugin(paths, {
    root: path.resolve(__dirname),
    verbose: true,
    dry: false
  });
};
const configureLoader = () => {
  return new webpack.LoaderOptionsPlugin({
    minimize: PRODUCTION,
    debug: !PRODUCTION,
    options: {
      context: __dirname
    },
  });
};

const commonExtensions = [
  '.webpack.js', '.web.js',
  '.ts', '.tsx',
  '.js', '.jsx',
  '.html',
  '.json',
  '.node',
];

const webExtensions = [
  '.css', '.less', '.sass', '.scss',
  '.woff', '.woff2', '.ttf', '.eot',
  '.svg', '.md',
  '.jpg', '.png',
];


module.exports = {
  PRODUCTION,
  NODE_ENV,
  WEB_PORT,
  WEB_PATH,
  API_URL,
  DEV_SERVER_HOST,
  DEV_SERVER_PORT,
  definableConstants,
  globalCssLoaderOptions,
  localCssLoaderOptions,
  sassLoaderOptions,
  localCssLoader,
  localSaasLoader,
  localScssLoader,
  globalCssLoader,
  globalSaasLoader,
  globalScssLoader,
  tsLoader,
  htmlLoader,
  staticLoaders,
  stylesLoaders,
  commonLoaders,
  webLoaders,
  cleanBuild,
  configureLoader,
  commonExtensions,
  webExtensions
};
