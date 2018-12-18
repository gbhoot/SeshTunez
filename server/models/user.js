var mongoose = require('../config/mongoose.js');
UserSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength: 3}
}, {timestamps: true});

var Users = mongoose.model('User', UserSchema);

module.exports = Users;