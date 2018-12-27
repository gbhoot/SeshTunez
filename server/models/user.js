var mongoose = require('../config/mongoose.js'),
    validators = require('mongoose-validators');

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength: 5},
    email: {type: String, required: true, unique: true,
        validate: validators.isEmail()},
    password: {type: String, required: true, minlength: 8},
    seshes: [String],
    invitations: [String],
    events: [String],
    parties: [String]
}, {timestamps: true});

var Users = mongoose.model('User', UserSchema);

module.exports = Users;