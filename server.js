var express = require('express');
var app = express();
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./server/config/config');

require('./server/config/mongo')(app);
require('./server/config/express')(app);
require('./server/route/routes')(app);

app.listen(config.server.port);
console.log("Server started on port %d", config.server.port);