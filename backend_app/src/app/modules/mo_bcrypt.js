const bcrypt = require('bcrypt');


exports.cryptPassword = function (password) {

    return new Promise((resolve, reject) => {

        const saltRounds = 10;

        bcrypt.hash(password, saltRounds)
            .then((hash) => {

                return resolve(hash);
            })
            .catch((err) => {
            
                return reject(err);
            });
        
    });
};

exports.comparePassword = function (plainPass, hashword) {
    
    return new Promise((resolve, reject) => {

        bcrypt.compare(plainPass, hashword, (err, isPasswordMatch) => {   

            return err == null ? resolve(isPasswordMatch) : reject(err);
        });
    });
};
