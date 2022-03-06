module.exports = function () {
    const crypto = require('crypto');
    const fs = require('fs');
    const path = require('path');

    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });
    
    fs.writeFileSync( path.join(__dirname, 'public_key.pem'), keyPair.publicKey ); 
    fs.writeFileSync( path.join(__dirname, 'private_key.pem'), keyPair.privateKey );
};