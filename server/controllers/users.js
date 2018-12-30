var User = require('../models/user.js'),
    Sesh = require('../models/sesh.js'),
    seshes = require('./seshes.js'),
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
        User.find({_id: uid}, function(error, users) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let user = users[0];
                let invites = user['invitations'];

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

    logout: function(req, res) {
        if (!req.session.uid) {
            res.redirect('/');
        } else {
            delete req.session.uid;
            res.redirect('/');
        };
    },

    destroyAll: function(req, res) {
        User.find({}, function(error, users) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                for (let user of users) {
                    req.params.id = user._id;
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
        let uid = req.params.id;
        User.find({_id: uid}, function(error, users) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {};
                if (users.length == 0 || users == null) {
                    response = {
                        message: "Failure",
                        content: "User not found"
                    };
                    res.json(response);
                } else {
                    let user = users[0];
                    let organized = user['seshes'];
                    for (let sesh of organized) {
                        req.params.id = sesh._id;
                        seshes.destroyOne(req, res);
                    }
                    let invites = user['invitations'];
                    Sesh.updateMany({_id: {$in: invites}}, {$pull: {invitees: uid}}, function(error) {
                        if (error) {
                            console.log("There was an issue: ", error);
                            res.json(error);
                        } else {
                            let attending = user['events'];
                            Sesh.updateMany({_id: {$in: attending}}, {$pull: {attendees: uid}}, function(error) {
                                if (error) {
                                    console.log("There was an issue: ", error);
                                    res.json(error);
                                } else {
                                    let parties = user['parties'];
                                    Sesh.updateMany({_id: {$in: parties}}, {$pull: {crashers: uid}}, function(error) {
                                        if (error) {
                                            console.log("There was an issue: ", error);
                                            res.json(error);
                                        } else {
                                            response = {
                                                message: "Success",
                                            };
                                            res.json(response);
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

    renderHome: function(req, res) {
        console.log(req.session);
        if (req.session.uid) {
            res.redirect('/dashboard');
        } else {
            res.render('home');
        };
    },

    renderSignUp: function(req, res) {
        console.log(req.session);
        if (req.session.uid) {
            res.redirect('/dashboard');
        } else {
            res.render('login');
        };
    },

    renderDash: function(req, res) {
        if (!req.session.uid) {
            res.redirect('/');
        } else {
            let uid = req.session.uid;
            User.find({_id: uid}, function(error, users) {
                if (error) {
                    console.log("There was an issue: ", error);
                    res.render('dashboard', error);
                } else {
                    let response = {};
                    if (users.length == 0 || users == null) {
                        response = {
                            message: "Failure",
                            content: "Logged in user not found in database"
                        };
                    } else {
                        let user = users[0];
                        response = {
                            message: "Success",
                            user: user
                        };
                    };
                    res.render('dashboard', response);
                };
            });
        };
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
    },
}