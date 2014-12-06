require('./../model/user.js');
var bcrypt = require('bcrypt');
var express = require("express");
var app = module.exports = express();
var User = mongo.model('User');



app.post('/login', function(req, res){
  var email = req.body.email; 
  var password = req.body.password; 
  User.findOne({email: email}, function(err, result){
    if (err || !result)
        res.send(400);
    else{
      var salt = result.salt;
      var hash = bcrypt.hashSync(req.body.password, salt);
      if(result.hash === hash){
        req.session.uid = result._id;
        res.send(202, result);
      }else{
        res.send(400);
      }
    } 
  })
});

app.post('/register', function(req, res){
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  var user = new User({
    name : req.body.name,
    email : req.body.email, 
    salt : salt,
    hash : hash
  }); 
  user.save(function(err, result){
    if (err)
        res.send(400, err);
    else 
        res.send(200, result);
  })
}); 

app.get('/logout', function(req, res){
  req.session.destroy();
  res.send(200, "test");
});