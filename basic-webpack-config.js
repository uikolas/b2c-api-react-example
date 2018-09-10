const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


dotenv.config();

const PRODUCTION = process.env.NODE_ENV === 'production' || process.argv.indexOf('-p') !== -1;
const NODE_ENV = process.env.NODE_ENV || 'development';
const ROOT_DIR = path.resolve(__dirname);
const STATIC_PATH = process.env.STATIC_PATH || "build/web";
const STATIC_DIR = path.resolve(ROOT_DIR, STATIC_PATH);
const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST ? process.env.DEV_SERVER_HOST : 'localhost';
const DEV_SERVER_PORT = process.env.DEV_SERVER_PORT ? process.env.DEV_SERVER_PORT : '2992';
const WEB_PROTOCOL = process.env.WEB_PROTOCOL ? process.env.WEB_PROTOCOL : 'http';
const WEB_HOST = process.env.WEB_HOST ? process.env.WEB_HOST : 'localhost';
const WEB_PORT = process.env.WEB_PORT ? process.env.WEB_PORT : '4200';
const WEB_PATH = process.env.WEB_PATH ? process.env.WEB_PATH : '/api/';
const WEB_URL = process.env.WEB_URL ? process.env.WEB_URL : 'http://localhost:4200/api/';
const RENDERER_PROTOCOL = process.env.RENDERER_PROTOCOL ? process.env.RENDERER_PROTOCOL : 'http';
const RENDERER_HOST = process.env.RENDERER_HOST ? process.env.RENDERER_HOST : 'localhost';
const RENDERER_PORT = process.env.RENDERER_PORT ? process.env.RENDERER_PORT : '4200';
const RENDERER_PATH = process.env.RENDERER_PATH ? process.env.RENDERER_PATH : '/';
const RENDERER_URL = process.env.RENDERER_URL ? process.env.RENDERER_URL : 'http://localhost:4200/';
const API_PROTOCOL = process.env.API_PROTOCOL ? process.env.API_PROTOCOL : 'http';
const API_HOST = process.env.API_HOST ? process.env.API_HOST : 'localhost';
const API_PORT = process.env.API_PORT ? process.env.API_PORT : '8080';
const API_PATH = process.env.API_PATH ? process.env.API_PATH : '/api/';
const API_URL = process.env.API_URL ? process.env.API_URL : 'http://localhost:8080/api/';
const SECRET = process.env.SECRET || 'fdgdfVVVsf3t43rfsdFSS';
const AUTH_TOKEN_LIFETIME = process.env.AUTH_TOKEN_LIFETIME ?
  parseInt(process.env.AUTH_TOKEN_LIFETIME, 10) : 24*60*60*1000;
const APP_TITLE = process.env.APP_TITLE || 'App';

const definableConstants = {
  "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
  "process.env.ROOT_DIR": JSON.stringify(ROOT_DIR),
  "process.env.STATIC_PATH": JSON.stringify(STATIC_PATH),
  "process.env.STATIC_DIR": JSON.stringify(STATIC_DIR),
  "process.env.WEB_PROTOCOL": JSON.stringify(WEB_PROTOCOL),
  "process.env.WEB_HOST": JSON.stringify(WEB_HOST),
  "process.env.WEB_PORT": JSON.stringify(WEB_PORT),
  "process.env.WEB_PATH": JSON.stringify(WEB_PATH),
  "process.env.WEB_URL": JSON.stringify(WEB_URL),
  "process.env.API_PROTOCOL": JSON.stringify(API_PROTOCOL),
  "process.env.API_HOST": JSON.stringify(API_HOST),
  "process.env.API_PORT": JSON.stringify(API_PORT),
  "process.env.API_PATH": JSON.stringify(API_PATH),
  "process.env.API_URL": JSON.stringify(API_URL),
  "process.env.RENDERER_PROTOCOL": JSON.stringify(RENDERER_PROTOCOL),
  "process.env.RENDERER_HOST": JSON.stringify(RENDERER_HOST),
  "process.env.RENDERER_PORT": JSON.stringify(RENDERER_PORT),
  "process.env.RENDERER_PATH": JSON.stringify(RENDERER_PATH),
  "process.env.RENDERER_URL": JSON.stringify(RENDERER_URL),
  "process.env.DEV_SERVER_HOST": JSON.stringify(DEV_SERVER_HOST),
  "process.env.DEV_SERVER_PORT": JSON.stringify(DEV_SERVER_PORT),
  "process.env.SECRET": JSON.stringify(SECRET),
  "process.env.AUTH_TOKEN_LIFETIME": JSON.stringify(AUTH_TOKEN_LIFETIME),
  "process.env.APP_TITLE": JSON.stringify(APP_TITLE),
};

const globalCssLoaderOptions = {
  loader: "css-loader",
  options: {
    modules: false,
    sourceMap: !PRODUCTION,
    minimize: PRODUCTION,
    discardComments: {removeAll: true},
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
    discardComments: {removeAll: true},
  },
};
const sassLoaderOptions = {
  loader: "sass-loader",
  options: {
    includePaths: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "src"),
    ]
  },
};
const localCssLoader = {
  test: /\.css$/,
  exclude: /node_modules/, // Ignore the folder containing 3rd party scripts
  loader: ExtractTextPlugin.extract({
    use: [
      localCssLoaderOptions,
      {
        loader: 'resolve-url-loader',
      },
      {
        loader: 'postcss-loader',
      },
    ],
  }),
};
const localLessLoader = {
  test: /\.less$/,
  exclude: /node_modules/, // Ignore the folder containing 3rd party scripts
  loader: ExtractTextPlugin.extract({
    use: [
      localCssLoaderOptions,
      {
        loader: 'resolve-url-loader',
      },
      {
        loader: 'postcss-loader',
      },
      "less-loader",
    ],
  }),
};
const localSaasLoader = {
  test: /\.sass$/,
  exclude: /node_modules/, // Ignore the folder containing 3rd party scripts
  loader: ExtractTextPlugin.extract({
    use: [
      localCssLoaderOptions,
      {
        loader: 'resolve-url-loader',
      },
      {
        loader: 'postcss-loader',
      },
      sassLoaderOptions,
    ],
  }),
};
const localScssLoader = {
  test: /\.scss$/,
  exclude: /node_modules/, // Ignore the folder containing 3rd party scripts
  loader: ExtractTextPlugin.extract({
    use: [
      localCssLoaderOptions,
      {
        loader: 'resolve-url-loader',
      },
      {
        loader: 'postcss-loader',
      },
      sassLoaderOptions,
    ],
  }),
};
const globalCssLoader = {
  test: /\.css$/,
  include: /node_modules/, // Proceed the folder containing 3rd party scripts
  loader: ExtractTextPlugin.extract({
    use: [
      globalCssLoaderOptions,
      {
        loader: 'resolve-url-loader',
      },
      {
        loader: 'postcss-loader',
      },
    ],
  }),
};
const globalLessLoader = {
  test: /\.less$/,
  include: /node_modules/, // Proceed the folder containing 3rd party scripts
  loader: ExtractTextPlugin.extract({
    use: [
      globalCssLoaderOptions,
      {
        loader: 'resolve-url-loader',
      },
      {
        loader: 'postcss-loader',
      },
      "less-loader",
    ],
  }),
};
const globalSaasLoader = {
  test: /\.sass$/,
  include: /node_modules/, // Proceed the folder containing 3rd party scripts
  loader: ExtractTextPlugin.extract({
    use: [
      globalCssLoaderOptions,
      {
        loader: 'resolve-url-loader',
      },
      {
        loader: 'postcss-loader',
      },
      sassLoaderOptions,
    ],
  }),
};
const globalScssLoader = {
  test: /\.scss$/,
  include: /node_modules/, // Proceed the folder containing 3rd party scripts
  loader: ExtractTextPlugin.extract({
    use: [
      globalCssLoaderOptions,
      {
        loader: 'resolve-url-loader',
      },
      {
        loader: 'postcss-loader',
      },
      sassLoaderOptions,
    ],
  }),
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
  localLessLoader,
  localSaasLoader,
  localScssLoader,
  globalCssLoader,
  globalLessLoader,
  globalSaasLoader,
  globalScssLoader,
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
  ...staticLoaders,
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
      context: __dirname,
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
  ROOT_DIR,
  STATIC_PATH,
  STATIC_DIR,
  WEB_PROTOCOL,
  WEB_HOST,
  WEB_PORT,
  WEB_PATH,
  WEB_URL,
  API_PROTOCOL,
  API_HOST,
  API_PORT,
  API_PATH,
  API_URL,
  RENDERER_PROTOCOL,
  RENDERER_HOST,
  RENDERER_PORT,
  RENDERER_PATH,
  RENDERER_URL,
  DEV_SERVER_HOST,
  DEV_SERVER_PORT,
  SECRET,
  AUTH_TOKEN_LIFETIME,
  definableConstants,
  globalCssLoaderOptions,
  localCssLoaderOptions,
  sassLoaderOptions,
  localCssLoader,
  localLessLoader,
  localSaasLoader,
  localScssLoader,
  globalCssLoader,
  globalLessLoader,
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
  webExtensions,
};
