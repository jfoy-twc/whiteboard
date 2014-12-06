require('./../model/course.js');
require('./../model/resource.js');

var express = require("express");
var app = module.exports = express();
var Course = mongo.model('Course');
var Resource = mongo.model('Resource');
var config = require('./../config/config.js');

app.get('/', function(req, res) {
    var po = {}; //Page Options
    var fo = {}; //Find Options
    var ro = {}; //Return Options
    var so = {}; //Score options
    var search = req.query; //Search Options
    if (search.text) {
        fo['$text'] = {
            $search: search.text
        };
        ro['score'] = {
            $meta: "textScore"
        };
        so['score'] = {
            $meta: "textScore"
        };
    }

    //search by author id
    if (search.author) {
        fo['author'] = search.author;
    }

    //Sort options
    switch (search.sort) {
        case '-created':
            so['created'] = -1;
            break;
        case 'created':
            so['created'] = 1;
            break;
        default:
            so['created'] = -1;
            break;
    }

    Course
        .find(fo, ro, po)
        .populate('managers', 'name')
        .sort(so)
        .exec(function(err, r) {
            if (err) {
                res.send(400);
            } else {
                res.send(200, r);
            }
        });
});


app.put('/:id', function(req, res) {
    Course.update({"_id": req.params.id}, req.body, { multi: false }, function(err, r){
        if (err)
            res.send(400, err);
        else 
            res.send(200);      
    })
});


app.get('/:id/subscribe/:email', function(req, res) {
    var email = req.params.eamil;
    Course.findById(req.params.id, function(err, c) {
        if (c.subscribers.indexOf(email) == -1)
            c.subscribers.push(email);
        c.save(function(err) {
            if (err)
              res.send(400, err);
            else
              res.send(200, c);
        });
    });
});

app.get('/:id/unsubscribe/:email', function(req, res) {
    var email = req.params.eamil;
    Course.findById(req.params.id, function(err, c) {
        for (var i = 0; i < c.subscribers.length; i++){
            if (c.subscribers[i] == email) {
                c.subscribers.splice(i, 1);
                break;
            }
          }

          c.save(function(err) {
              if (err) return handleError(err);
              res.send(200, c);
          });
    });
});

app.get('/:id', function(req, res) {
    var c = Course.findOne({"code": req.params.id});
    
    if(req.query.populate){
        req.query.populate.split(',').forEach(function(f){
            c.populate(f);
        })
    }
    
    c.exec(function(err, r) {
            if (err || !r)
                res.send(404, "Not found");
            else {
                res.send(r);
            }
        });
});


app.post('/:id/resource', authenticateUser, function(req, res) {
    var resource = new Resource(req.body);
    resource.author = req.session.uid;
    resource.save(function(err, result){
        if (err)
            res.send(400, err);
        else{
            Course.findOne({'code':req.params.id}, function(err, c) {
                if (typeof c.resources === 'undefined') 
                    c.resources = [];
                c.resources.push(result._id);
                c.save(function(err) {
                    if (err) 
                        res.send(400, err);
                    else
                        res.send(200, result);
                });
            });
        } 
    })
});

app.post('/', authenticateUser, function(req, res) {
    var course = new Course(req.body);
    course.author = req.session.uid;
    course.managers = [course.author];
    course.save(function(err, result) {
        if (err)
            res.send(400, err);
        else 
            res.send(200, result);
    });
});

app.delete('/:id', authenticateUser, function(req, res) {
    Course.remove({
        "_id": req.params.id,
        'managers' : req.session.uid
    }, function(err) {
        if (err)
            res.send(400);
        else
            res.send(200);
    });
});