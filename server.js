const config = require('./configs/server-config');

let devServer;
let webServer;

if (config.webpackDevServer) {
  devServer = require('./dev-server');
} else {
  webServer = require('./web-server');
}

module.exports = {
  devServer,
  webServer,
};
