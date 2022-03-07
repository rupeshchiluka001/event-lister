const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const User = require('../models/user');

const PRIV_KEY = fs.readFileSync( path.join(__dirname, 'private_key.pem'), 'utf8' );
const PUB_KEY = fs.readFileSync( path.join(__dirname, 'public_key.pem'), 'utf8' );

function issueJWT(id, hash) {
    const payload = {
        data: id, // user id
        id: hash // hash
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {algorithm: 'RS256'});
    
    return JSON.stringify({
        token: signedToken,
        expires: Date.now() + 300000 // 5 minutes
    });
}

async function verifyJWT(signedJWT) {
    try {
        let payload = await jsonwebtoken.verify(signedJWT, PUB_KEY, {algorithm: 'RS256'});
        
        const user = await User.findById(payload.data).exec();

        return (Date.now() <= payload.iat && user && payload.id === user.hash);
    } catch (err) {
        console.log(err);
        return false;
    }
}

function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    }
}

function validatePassword(password, hash, salt) {
    let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return hash === hashVerify;
}

module.exports.issueJWT = issueJWT;
module.exports.verifyJWT = verifyJWT;
module.exports.validatePassword = validatePassword;
module.exports.genPassword = genPassword;