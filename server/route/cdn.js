var express = require("express");
var app = module.exports = express(); 
var fs = require('fs');
var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'x', 
  secretAccessKey: 'x',
  region: 'x'
})

app.post('/', function(req, res){
  if(typeof req.files.file !== 'undefined' && req.files.file){
    var bodyStream = fs.createReadStream(req.files.file.path);
    var timestamp = new Date().getTime(); 
    var s3 = new AWS.S3();
    var s3obj = {
        Bucket: 'com.uvunt.alpha', 
        Key: timestamp+encodeURI(req.files.file.name), 
        Body: bodyStream,
        ContentType: 'image/jpg'
      }; 

    s3.putObject(s3obj, function(err, data) {
        if (err)     
          res.send(400, err);
        else{
          var url = encodeURI('https://s3-eu-west-1.amazonaws.com/'+s3obj.Bucket+'/'+s3obj.Key);
          res.send(url);  
        }
     });
  }else{
    res.send(400);
  }
});


app.post('/avatar', authenticateUser, function(req, res){
  //Avatar uploads
  //file name is based on the logged in user
  if(typeof req.files.file !== 'undefined' && req.files.file){
    var bodyStream = fs.createReadStream(req.files.file.path);
    var timestamp = new Date().getTime(); 
    var s3 = new AWS.S3();
    var s3obj = {
        Bucket: 'com.uvunt.avatar', 
        Key: req.session.user+'.jpg', 
        Body: bodyStream,
        ContentType: 'image/jpg'
      }; 
    s3.putObject(s3obj, function(err, data) {
        if (err)     
          res.send(400, err);
        else{
          //Update users avatar in DB
          var User = mongo.model('User'); 
          User.findOne({_id: req.session.user},function(err, r){
            var url = encodeURI('https://s3-eu-west-1.amazonaws.com/' + 
              s3obj.Bucket + '/' + s3obj.Key  );
            r.picture = url;
            r.save(function(err){
              if(!err)
                res.send(url + '?' + timestamp);
              else 
                res.send(err);
            });
          });
        }
     });
  }else{
    res.send(400);
  }
});