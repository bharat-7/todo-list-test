"use strict";

process.env.NODE_CONFIG_DIR       = 'config/';
const express                     = require('express')
const app                         = express();

const swaggerUi = require('swagger-ui-express');

app.use(express.static('./docs'));
const url = 'http://localhost:3000/'
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(null, {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: url + 'swagger.json',
        name: 'Swagger'
      }
    ]
  }
}));
global.app                        = app;

require('./middlewares');
require('./modules');
require('./startup').initializeServer();
