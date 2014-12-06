module.exports = function(app) {
    global.authenticateUser = function(req, res, next) {
        if (req.session.uid)
            next();
        else
            res.send(403);
    }

    app.use('/api', require('../route/api'));
    app.get('/?_escaped_fragment_', function(request, response) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8"
        });
        response.end("Google bot!");
    });

    app.get(new RegExp("^(?!/api).*$", 'i'), function(req, res) {
        res.render('index');
    });
};

/* 
app.get('/?_escaped_fragment_*', function(req, res) {
        var fragment = req.query._escaped_fragment_;
        console.log(fragment);
        // If there is no fragment in the query params
        // then we're not serving a crawler
        if (!fragment) return next();

        // If the fragment is empty, serve the
        // index page
        if (fragment === "" || fragment === "/")
            fragment = "/index.html";

        // If fragment does not start with '/'
        // prepend it to our fragment
        if (fragment.charAt(0) !== "/")
            fragment = '/' + fragment;

        // If fragment does not end with '.html'
        // append it to the fragment
        if (fragment.indexOf('.html') == -1)
            fragment += ".html";

        // Serve the static html snapshot
        try {
            var file = __dirname + "/snapshots" + fragment;
            res.sendfile(file);
        } catch (err) {
            res.send(404);
        }
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8"
        });
        res.end("Google bot!");
    });
    */