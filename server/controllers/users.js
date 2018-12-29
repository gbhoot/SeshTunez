var User = require('../models/user.js'),
    bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
    getAll: function(req, res) {
        User.find({}, function(error, users) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    users: users
                };
                res.json(response);
            };
        });
    },

    getOne: function(req, res) {
        let uid = req.params.id;
        User.find({_id: uid}, function(error, user) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    user: user
                };
                res.json(response);
            };
        });
    },

    register: function(req, res) {
        let inc_user = req.body;
        if (inc_user.password == inc_user.pw_confirm) {
            delete inc_user.pw_confirm;
            bcrypt.hash(inc_user.password, saltRounds)
            .then(hashed => {
                inc_user.password = hashed;
                let user = new User(inc_user);
                user.save(function(error) {
                    if (error) {
                        console.log("There was an issue: ", error);
                        res.json(error);
                    } else {
                        req.session.uid = user._id;
                        let response = {
                            message: "Success",
                            user: user
                        };
                        res.json(response);
                    };
                });
            }).catch(error => {
                console.log("There was an issue: ", error);
                res.json(error);
            });
        } else {
            let response = {
                message: "Failure",
                details: "Passwords do not match"
            };
            res.json(response);
        };
    },

    login: function(req, res) {
        let inc_user = req.body;
        User.find({email: inc_user.email}, function(error, users) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else if (users.length == 0 || users == null) {
                console.log("User email not found");
                let response = {
                    message: "Failure",
                    content: "User email address not found"
                };
                res.json(response);
            } else if (users.length == 1) {
                let user = users[0];
                console.log("Single user found", user, inc_user);
                bcrypt.compare(inc_user.password, user.password)
                .then(result => {
                    console.log(result);
                    let response = {};
                    if (result) {
                        req.session.uid = user._id;
                        response = {
                            message: "Success",
                            user: user
                        };
                    } else {
                        response = {
                            message: "Failure",
                            content: "Password is incorrect"
                        };
                    };
                    res.json(response);
                }).catch(error => {
                    console.log("There was an issue: ", error);
                    res.json(error);
                });
            };
        });
    },

    destroyAll: function(req, res) {
        User.deleteMany({}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                };    
                res.json(response);
            };    
        });    
    },    

    destroyOne: function(req, res) {
        let uid = req.params.id;
        User.deleteOne({_id: uid}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                };    
                res.json(response);
            };
        });
    },

    inviteAccepted: function(req, res) {
        let sid = req.params.id;
        let uid = req.session.uid;
        User.update({_id: uid}, {$pull: {invitations: sid}, $push: {events: sid}}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                Sesh.update({_id: sid}, {$pull: {invitees: uid}, $push: {attendees: uid}}, function(error) {
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
    },

    sendInvitations: function(req, res) {
        let sid = req.params.id;
    },

    partyCrasher: function(req, res) {
        let sid = req.params.id;
        let uid = req.session.uid;
    }
}