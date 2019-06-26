// App variable initialization
//
// Note the connectionString is initialized from an environment variable
const config= require('./config/config');
const controller = require('./controller/url');
const Counter = require('./model/counter');
const url=new controller();
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http').Server(app),
    mongoose = require('mongoose'),
    promise,
    connectionString = config.mongoDB,
    port = config.PORT || 8080;

// ExpressJS server start
http.listen(port, function () {
    console.log('Server Started. Listening on *:' + port);
});

// ExpressJS middleware for serving static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Base route for front-end
app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: __dirname
    });
});

// Connect to the MongoDB instance
promise = mongoose.connect(connectionString, {
    useMongoClient: true
});

// Reset the app to default values when starting the server
//
// WARNING: Do this only when you want a fresh instance of the application else
// comment the code.
promise.then(function (db) {
    console.log('APP: Connected to MongoDB');
    URL.remove({}, function () {
        console.log('APP: URL collection emptied');
    })
    Counter.remove({}, function () {
        console.log('APP: Counter collection emptied');
        console.log('APP: Initializing Counter collection with a default value');
        var counter = new Counter({ _id: 'url_count', count: 10000 });
        counter.save(function (err) {
            if (err) {
                console.error('APP: Error while initializing counter');
                return console.error(err);
            }
            console.log('APP: Counter has been initialized');
        });
    });
});
app.get('/:hash', url.redirectionUrl)
app.post('/shorten', url.shortenUrl);
