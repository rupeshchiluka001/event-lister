const router = require('express').Router();
const eventMethods = require('../controllers/events');

router.get('/list-events', eventMethods.listEvents);

router.post('/add-event', eventMethods.addEvent);

router.get('/delete-events', eventMethods.deleteEvent);

module.exports = router;