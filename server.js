const config = require('./server-config');

let devServer;
let webServer;
let apiServer;
if (config.webpackDevServer) {
  devServer = require('./dev-server');
} else {
  webServer = require('./web-server');
}
if (config.RUN_API) {
  apiServer = require('./api-server');
}

module.exports = {
  devServer,
  apiServer,
  webServer,
};
