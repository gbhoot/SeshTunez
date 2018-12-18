var Sesh = require('../models/sesh.js');

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
    
    create: function(req, res) {
        let inc_sesh = req.body;
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
    }
}