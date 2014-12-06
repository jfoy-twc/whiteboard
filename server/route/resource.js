require('./../model/user.js');
require('./../model/resource.js');

var express = require("express");
var app = module.exports = express();
var User = mongo.model('User');
var Resource = mongo.model('Resource');
var config = require('./../config/config.js');

app.get('/:id', function(req, res) {
    Resource.findById(req.params.id, function(err, c) {
        if(err)
            res.end(400, err);
        else
            res.send(200,c);
    });
});