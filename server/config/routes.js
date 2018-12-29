var path = require('path'),
    seshes = require('../controllers/seshes.js'),
    spots = require('../controllers/spots.js'),
    users = require('../controllers/users.js');

module.exports = function(app) {

    /* FRONT-END */
    app.get('/', function(req, res) {
        res.render('home');
    });

    app.get('/signup', function(req, res) {
        res.render('login');
    });

    app.get('/sesh/:id', function(req, res) {
        seshes.renderOne(req, res);
        // res.render('seshRoom');
    });




    /* SERVER BACK-END */

    // Get all seshes
    app.get('/db/v1/seshes', function(req, res) {
        seshes.getAll(req, res);        
    });

    // Get single sesh by ID
    app.get('/db/v1/seshes/:id', function(req, res) {
        seshes.getOne(req, res);
    });

    // Create a new sesh
    app.post('/db/v1/seshes', function(req, res) {
        seshes.create(req, res);
    });

    // Destroy all seshes
    app.delete('/db/v1/seshes', function(req, res) {
        seshes.destroyAll(req, res);
    });

    // Destroy single sesh by ID
    app.delete('/db/v1/seshes/:id', function(req, res) {
        seshes.destroyOne(req, res);
    });

    // Update a sesh by ID
    app.put('/db/v1/seshes/:id', function(req, res) {
        seshes.update(req, res);
    });

    // Add attendee to sesh by ID
    app.post('/db/v1/seshes/:id/addAttendee', function(req, res) {
        seshes.addAttendee(req, res);
    });

    // Search for a song
    app.post('/db/v1/seshes/:id/searchSong', function(req, res) {
        spots.songSearch(req, res);
    });
    
    // Get all users
    app.get('/db/v1/users', function(req, res) {
        users.getAll(req, res);
    });
    
    // Get one user
    app.get('db/v1/users/:id', function(req, res) {
        users.getOne(req, res);
    });
    
    // Register (create a user)
    app.post('/db/v1/users/register', function(req, res) {
        users.register(req, res);
    });

    // Login user
    app.post('/db/v1/users/login', function(req, res) {
        users.login(req, res);
    });

    // Remaining routes direct to Angular app
    app.all("*", function(req, res) {
        res.redirect('/');
    });
}