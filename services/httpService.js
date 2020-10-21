"use strict";

const http    = require('http');

const startHttpServer = (port) => {
  return new Promise((resolve, reject) => {
    let server = http.createServer(app).listen(port, function () {
      console.error("###################### Express App Connected ##################", app.get('port'), app.get('env'));
      resolve(server);
    });
  });
};

exports.startHttpServer             = startHttpServer;