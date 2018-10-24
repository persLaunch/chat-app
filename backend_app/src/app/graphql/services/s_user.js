const debug = require('debug')('debug');

const { User } = require('../../models');

module.exports = { 
    
    createUser: async ({ email, firstName, lastName, username }) => {
     
        const user = new User({ 
            email: email.toLowerCase(), 
            firstName, 
            lastName, 
            username,
            signedUpAt: new Date(),
        }).dataValues;


        try {
            const existingUser = await User.findOne({ where: { email: user.email } });
            
            if (existingUser) { throw new Error('Email in use'); }

            const userDataValues = await User.create(user);
            return userDataValues.dataValues;

        } catch (err) {

            throw err; 
        }
    },

    getUserProfile: async (userId) => {

        return new Promise((resolve, reject) => {

            User.findOne({ where: { id: userId } })
                .then(async (existingUser) => {

                    if (!existingUser) { return reject(new Error('User Not Found')); }

                    return resolve(existingUser);

                })
                .catch((err) => {

                    debug(err);
                    return reject(new Error('An error occured')); 
                });    
        });

    },
};
