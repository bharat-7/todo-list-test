const bodyParser              = require('body-parser');
const config                  = require('config');
const morgan                  = require('morgan');

app.use(morgan('dev'));
app.set('port', config.get('PORT'));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(function (error, res, next) {
  if (error instanceof SyntaxError) {
    return res.sendStatus(400);
  }
  next();
});

console.log("Server Environment Running at: ", app.get('env'));
