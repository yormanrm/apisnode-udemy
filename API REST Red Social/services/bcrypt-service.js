const bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt = (toencrypt) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(toencrypt, saltRounds, (error, password_encrypted) => {
            if(error){
                return reject(error)
            } else {
                resolve(password_encrypted);
            }

        });
    });
}

const compare = (decrypted, encrypted) => {
    return bcrypt.compareSync(decrypted, encrypted);
}

module.exports = {
    encrypt,
    compare
}