const router = require('express').Router();
const Utils = require('../config/utils');
const eventMethods = require('../controllers/events');


router.use('/', (req, res, next) => {
    const data = JSON.parse(req.body.token);

    if ( req.body.id && Utils.verifyJWT(data.token) ) {
        next();
    }
    else {
        res.status(201);
        res.send({ "msg": "Session expired, please login again!!" });
    }
});

router.post('/list-events', eventMethods.listEvents);

router.post('/add-event', eventMethods.addEvent);

router.post('/delete-event', eventMethods.deleteEvent);

module.exports = router;