const express = require('express');
const http = require('http');

const config = require('./server-config');
const fixtures = require('./src/shared/services/Pages/Home.fixtures.json');


const apiServer = express();
apiServer.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const appRouter = express.Router();

// stub API:
const apiRouter = express.Router({mergeParams: true});
apiRouter.route('/home')
  .get(function (req, res) {
    res.status(200)
      .json({
        items: fixtures,
        items_count: fixtures.length,
      });
  });
appRouter.use(config.API_PATH.replace(/\/?$/,''), apiRouter);

apiServer.use('/', appRouter);

// Error Handler
apiServer.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

apiServer.set('port', config.API_PORT);

/**
 * Create HTTP server.
 */
const server = http.createServer(apiServer);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(config.API_PORT, () => console.info(`Running API Server at localhost:${config.API_PORT}`));

module.exports = server;
