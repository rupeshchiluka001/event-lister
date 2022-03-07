const User = require('../models/user');
const Utils = require('../config/utils');
const connection = require('../config/database');

async function signup(req, res, next) {
    if (await User.findOne({email: req.body.email}).exec()) {
        res.status(208);
        res.send({"msg": "A user already registered with same email"});
        return;
    }

    const saltHash = Utils.genPassword(req.body.password);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        hash: saltHash.hash,
        salt: saltHash.salt
    });

    try {
        await newUser.save();

        res.status(200);
        res.send({"msg": "Successfully user registered!! Please, Login"});
    } catch (err) {
        res.status(500);
        res.send({"msg": "Not able to create User, try again later."});
        console.log(err);
    }
}

async function login(req, res, next) {
    try {
        const user = await User.findOne({email: req.body.email}).exec();
        
        if (!user) {
            res.status(401);
            res.send({ "msg": "Invalid credntials" });
            return;
        }

        if ( Utils.validatePassword(req.body.password, user.hash, user.salt) ) {
            
            res.status(200);
            res.send({ "msg": Utils.issueJWT(user._id, user.hash), "id": user._id });
        }
        else {
            res.status(401);
            res.send({ "msg": "Invalid credntials" });
        }
    } catch (err) {
        res.status(501);
        res.send({"msg": `Not able to create User, try again later.`});
        console.log(err);
    }
}

async function verifyToken(req, res, next) {

    const data = JSON.parse(req.query.token);
    
    try {
        if (  req.query.id && Utils.verifyJWT(data.token) ) {
            res.status(200);
            res.send({ "msg": req.query.token, "id": req.query.id });
        }
        else {
            res.status(201);
            res.send({ "msg": "Session expired, please login again!!" });
        }
    } catch (err) {
        res.status(500);
        res.send({"msg": `Internal error, try again later`});
        console.log(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        await User.findByIdAndDelete(req.query.id).exec();

        res.status(200);
        res.send({ "msg": "User account deleted successfully" });
    } catch (err) {
        res.status(500);
        res.send({"msg": `Internal error, try again later`});
        console.log(err);
    }
}

exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
exports.verifyToken = verifyToken;