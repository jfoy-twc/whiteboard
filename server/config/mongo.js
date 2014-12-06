module.exports = function(app) {
	var mongo = require('mongoose');
	var config = require('./config');
	mongo.connect(config.mongo.host);
	mongo.connection.on('error', console.error.bind(console, 'Mongo connection error:'));
	mongo.connection.on('open', function (ref) {});
	global.mongo = mongo;
};