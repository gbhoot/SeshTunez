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
        Sesh.findOne({_id: sid}, function(error, sesh) {
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
        Sesh.findOne({_id: sid}, function(error, sesh) {
            if (error) {
                console.log("There was an issue: ", error);
                res.render('seshRoom', error);
            } else {
                let response = {
                    message: "Success",
                    sesh: sesh
                };
                res.render('seshRoom', response);
            };
        });
    },
    
    create: function(req, res) {
        let uid = req.session.uid;
        let inc_sesh = req.body['sesh'];
        inc_sesh.organizer = user._id;
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
    },

    destroyAll: function(req, res) {
        Sesh.find({}, function(error, seshes) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                for (let sesh of seshes) {
                    req.params.id = sesh._id;
                    this.destroyOne(req, res);
                };
                let response = {
                    message: "Success"
                };
                res.json(response);
            };
        });
    },

    destroyOne: function(req, res) {
        let sid = req.params.id;
        Sesh.find({_id: sid}, function(error, sesh) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                if (sesh == null || sesh.length == 0) {
                    console.log("Sesh not found");
                    let response = {
                        message: "Failure",
                        content: "Sesh not found"
                    };
                    res.json(response);
                } else {
                    // Sesh - organizer == User - seshes
                    let oid = sesh.organizer._id;
                    User.update({_id: oid}, {$pull: {seshes: sesh._id}}, function(error) {
                        if (error) {
                            console.log("There was an issue: ", error);
                            res.json(error);
                        } else {
                            // Sesh - invitees == User - invitations
                            let inviteeList = sesh.invitees;
                            User.updateMany({_id: {$in: inviteeList}}, {$pull: {invitations: sesh._id}}, function(error) {
                                if (error) {
                                    console.log("There was an issue: ", error);
                                    res.json(error);
                                } else {
                                    // Sesh - attendees == User - events
                                    let attendeeList = sesh.attendees;
                                    User.updateMany({_id: {$in: attendeeList}}, {$pull: {events: sesh._id}}, function(error) {
                                        if (error) {
                                            console.log("There was an issue: ", error);
                                            res.json(error);
                                        } else {
                                            // Sesh - crashers == User - parties
                                            let crasherList = sesh.crashers;
                                            User.updateMany({_id: {$in: crasherList}}, {$pull: {parties: sesh._id}}, function(error) {
                                                if (error) {
                                                    console.log("There was an issue: ", error);
                                                    res.json(error);
                                                } else {
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
                                                };
                                            });
                                        };
                                    });
                                };
                            });
                        };
                    });
                };
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
    }
}