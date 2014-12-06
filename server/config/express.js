var express = require('express');
var passport = require('passport');

module.exports = function(app) {
    app.configure( function() {
        app.use(express.static(__dirname + '/../../build'))
        .set('view engine', 'html')
        .set('views', __dirname + '/../../build')
        .engine('html', require('swig').renderFile)
        .use(express.bodyParser())
        .use(express.urlencoded())
        .use(express.json())
        .use(express.methodOverride())
        .use(express.cookieParser())
        .use(express.session({secret: "This is a secret"}))
        .use(passport.initialize())
        .use(passport.session())
        .use(app.router);
    })

    .configure('development', function() {
        app
        .use(express.logger('dev'))
        .set('view cache', false );
    })

    .configure('production', function() {
        app
        .set('view cache', true )
        .use(express.compress());
    });
};