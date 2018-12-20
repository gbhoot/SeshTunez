var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session')({
        secret: "sssssssssssssshhhh",
        autoSave: true,
        resave: false,
        saveUninitialized: true
    });

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Routes
require('./server/config/routes.js')(app);

var server = app.listen(8000);

// Sockets
require('./server/config/sockets.js')(server);
