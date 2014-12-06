var express = require("express");
var app = module.exports = express();

app.use('/course', require('./course'));
app.use('/user', require('./user'));
app.use('/auth', require('./auth'));
app.use('/cdn', require('./cdn'));
app.use('/resource', require('./resource'));