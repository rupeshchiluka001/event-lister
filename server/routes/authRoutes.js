const router = require('express').Router();
const authMethods = require('../controllers/auth');


router.get('/', (req, res, next) => {
    console.log('authenticating in a second');
    next();
});

router.post('/signup', authMethods.signup);

router.post('/login', authMethods.login);

router.get('/verify-token', authMethods.verifyToken);

router.get('/delete-user', authMethods.deleteUser);

module.exports = router;