require('./../model/user.js');
require('./../model/course.js');

var express = require("express");
var app = module.exports = express();
var User = mongo.model('User');
var Course = mongo.model('Course');
var config = require('./../config/config.js');

app.get('/', authenticateUser, function(req, res) {
    User.findOne({"_id": req.session.uid})
        .exec(function(err, r) {
            if (err){
                res.send(400);
            } else{
                res.send(200, r);
            }
        });
});

app.get('/search', function(req, res) {
    User.find({})
        .exec(function(err, r) {
            if (err){
                res.send(400);
            } else{
                res.send(200, r);
            }
        });
});


app.get('/:email', function(req, res) {
    User.findOne({"email": req.params.email})
        .exec(function(err, user) {
            if (err){
                res.send(400);
            } else{
                Course
                .find({"managers": user._id})
                .exec(function(err, courses) {
                    if (err){
                        res.send(400, err);
                    } else{
                        user['courses'] = courses;
                        res.send({
                            courses : courses, 
                            name : user.name, 
                            _id : user._id,
                            email: user.email, 
                            picture : user.picture, 
                            bio: user.bio,
                            homepage : user.homepage,
                            phone:user.phone
                        });
                    }
                });
            }
        });
});