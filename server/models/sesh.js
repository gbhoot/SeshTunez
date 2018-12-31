var mongoose = require('../config/mongoose.js'),
    UserSchema = require('./user.js').schema,
    QueueItemSchema = require('./queueItem.js').schema;

var SeshSchema = new mongoose.Schema({
    name: {type: String, required: true},
    // Sesh has 1 organizer, user has many seshes
    organizer: {type: UserSchema, required: true},
    // Sesh has many invitees (users who have been invited, but not accepted invitation), users = invitations
    invitees: {type: [String], default: ['']},
    // Sesh has many attendees (users who have been invited and accepted), users = events
    attendees: {type: [String], default: ['']},
    // Sesh has many crashers (users who are currently in the sesh room, whether invited, accepted or not), users = parties
    crashers: {type: [String], default: ['']},
    nowPlaying: {
        itemID: {type: String, default: ''},
        status: {type: String, default: ''},
        progress: {type: Number, default: 0}
    },
    queue: {type: [QueueItemSchema]},
}, {timestamps: true});

var Seshes = mongoose.model('Sesh', SeshSchema);

module.exports = Seshes;