var path = require('path'),
    seshes = require('../controllers/seshes.js');

module.exports = function(app) {
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

    // Remaining routes direct to Angular app
    app.all("*", function(req, res) {
        res.sendFile(path.resolve(__dirname, '../../public/dist/public/index.html'));
    });
}