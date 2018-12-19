var mongoose = require('../config/mongoose.js'),
    UserSchema = require('./user.js').schema,
    QueueItemSchema = require('./queueItem.js').schema;

var SeshSchema = new mongoose.Schema({
    name: {type: String, required: true},
    organizer: {type: UserSchema, required: true},
    attendees: [UserSchema],
    nowPlaying: {
        itemID: String,
        status: String,
        progress: {type: Number, default: 0}
    },
    queue: {type: [QueueItemSchema]},
}, {timestamps: true});

var Seshes = mongoose.model('Sesh', SeshSchema);

module.exports = Seshes;