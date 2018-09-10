const dotenv = require('dotenv');


dotenv.config();

const webpackDevServer = process.env.NODE_ENV === 'webpack-dev-server';
const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST || 'localhost';
const DEV_SERVER_PORT = process.env.DEV_SERVER_PORT ? parseInt(process.env.DEV_SERVER_PORT, 10) : 2992;
const WEB_PORT = process.env.WEB_PORT ? parseInt(process.env.WEB_PORT, 10) : 3000;

const RUN_API = process.env.RUN_API === 'true';
const API_PORT = process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 8080;
const API_PATH = process.env.API_PATH ? process.env.API_PATH : '/api/';


module.exports = {
  webpackDevServer,
  DEV_SERVER_HOST,
  DEV_SERVER_PORT,
  WEB_PORT,
  RUN_API,
  API_PORT,
  API_PATH,
};
