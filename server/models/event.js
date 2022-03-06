const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventName: String,
    eventLink: String,
    eventTime: {
        type: Date,
        default: Date.now()
    },
    eventOrganizer: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'Event'
    }
});

module.exports = mongoose.model('Event', EventSchema);