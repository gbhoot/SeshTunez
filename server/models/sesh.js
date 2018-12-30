var mongoose = require('../config/mongoose.js'),
    UserSchema = require('./user.js').schema,
    QueueItemSchema = require('./queueItem.js').schema;

var SeshSchema = new mongoose.Schema({
    name: {type: String, required: true},
    // Sesh has 1 organizer, user has many seshes
    organizer: {type: String, required: true},
    // Sesh has many invitees (users who have been invited, but not accepted invitation), users = invitations
    invitees: [String],
    // Sesh has many attendees (users who have been invited and accepted), users = events
    attendees: [String],
    // Sesh has many crashers (users who are currently in the sesh room, whether invited, accepted or not), users = parties
    crashers: [String],
    nowPlaying: {
        itemID: String,
        status: String,
        progress: {type: Number, default: 0}
    },
    queue: {type: [QueueItemSchema]},
}, {timestamps: true});

var Seshes = mongoose.model('Sesh', SeshSchema);

module.exports = Seshes;