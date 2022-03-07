const User = require('../models/user');
const Event = require('../models/event');
const connection = require('../config/database');

async function listEvents(req, res, next) {
    const user = await User.findById(req.body.id).exec();

    if (!user) {
        res.status(401);
        res.send({ "msg": "Invalid user id" });
        return;
    }

    try {
        const events = await Event.find({eventOrganizerId: user._id});
        
        res.status(200);
        res.send({"msg": events});
    } catch (err) {
        res.status(500);
        res.send({"msg": `Not able to fetch event details:( Please, try again later.`});
        console.log(err);
    }
}

async function addEvent(req, res, next) {
    const user = await User.findById(req.body.id).exec();

    if (!user) {
        res.status(401);
        res.send({ "msg": "Invalid user id" });
        return;
    }

    const newEvent = new Event({
        eventName: req.body.eventname,
        eventTime: req.body.eventTime,
        eventLink: req.body.eventlink,
        eventOrganizerId: user._id,
        eventOrganizerName: user.username
    });

    try {
        await newEvent.save();

        res.status(200);
        res.send({"msg": "Event successfuly added!!"});
    } catch (err) {
        res.status(500);
        res.send({"msg": "Not able to add event:( Please, try again later."});
        console.log(err);
    }
}

async function deleteEvent(req, res, next) {
    try {
        await Event.findByIdAndDelete(req.body.eventId);

        res.status(200);
        res.send({"msg": "Event successfuly deleted!!"});
    } catch (err) {
        res.status(500);
        res.send({"msg": "Not able to delete event:( Please, try again later."});
        console.log(err);
    }
}

exports.listEvents = listEvents;
exports.addEvent = addEvent;
exports.deleteEvent = deleteEvent;