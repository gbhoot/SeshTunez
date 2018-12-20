var Sesh = require('../models/sesh.js'),
    User = require('../models/user.js');

module.exports = {
    getAll: function(req, res) {
        Sesh.find({}, function(error, seshes) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    seshes: seshes
                };
                res.json(response);
            };
        });
    },

    getOne: function(req, res) {
        let sid = req.params.id;
        Sesh.find({_id: sid}, function(error, sesh) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    sesh: sesh
                };
                res.json(response);
            };
        });
    },

    renderOne: function(req, res) {
        let sid = req.params.id;
        Sesh.find({_id: sid}, function(error, sesh) {
            if (error) {
                console.log("There was an issue: ", error);
                res.render('seshRoom', error);
            } else {
                console.log(sesh);
                let response = {
                    message: "Success",
                    sesh: sesh[0]
                };
                res.render('seshRoom', response);
            };
        });
    },
    
    create: function(req, res) {
        let inc_user = req.body['user']
        let inc_sesh = req.body['sesh'];
        let user = new User(inc_user);
        user.save(function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                inc_sesh.organizer = user;
                let sesh = new Sesh(inc_sesh);
                sesh.save(function(error) {
                    if (error) {
                        console.log("There was an issue: ", error);
                        res.json(error);
                    } else {
                        let response = {
                            message: "Success",
                            sesh: sesh
                        };
                        res.json(response);
                    };
                });
            }
        });
    },

    destroyAll: function(req, res) {
        Sesh.deleteMany({}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success"
                };
                res.json(response);
            };
        });
    },

    destroyOne: function(req, res) {
        let sid = req.params.id;
        Sesh.deleteOne({_id: sid}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success"
                };
                res.json(response);
            };
        });
    },

    update: function(req, res) {
        let sid = req.params.id;
        let inc_sesh = req.body;
        let opts = { runValidators: true };
        Sesh.update({_id: sid}, inc_sesh, opts, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success"
                };
                res.json(response);
            };
        });
    },

    addAttendee: function(req, res) {
        let sid = req.params.id;
        let inc_user = req.body;
        let user = new User(inc_user);
        user.save(function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                Sesh.update({_id: sid}, {$push: {attendees: user}}, function(error) {
                    if (error) {
                        console.log("There was an issue: ", error);
                        res.json(error);
                    } else {
                        let response = {
                            message: "Success"
                        };
                        res.json(response);
                    };
                });
            };
        });
    }
}