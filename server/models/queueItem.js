var mongoose = require('mongoose');
var QueueItemSchema = new mongoose.Schema({
    itemID: {type: String},
    votes: {type: Number, default: 0},
}, {timestamps: true});

var QueueItems = mongoose.model('QueueItem', QueueItemSchema);

module.exports = QueueItems;