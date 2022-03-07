const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventName: String,
    eventLink: String,
    eventTime: {
        type: Date,
        default: Date.now()
    },
    eventOrganizerId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'User'
    },
    eventOrganizerName: String
});

module.exports = mongoose.model('Event', EventSchema);