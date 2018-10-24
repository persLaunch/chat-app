const s_user = require('../services/s_user');
const s_auth = require('../services/s_auth');

const registerTypeDef = `
  extend type Mutation {
    register(email: String!, password: String!, firstName: String!, lastName: String!, username: String! ): String
  }
`;

const registerResolvers = {
    Mutation: {
        register: async (parentValue, { email, password, firstName, lastName, username }, req) => {

            try {
                
                const user = await s_user.createUser({ email, firstName, lastName, username });
                const cred = await s_auth.register(user.id, user.email, password);
                const token = await s_auth.generateTokenAuth(req.login, cred.email, cred.password);

                return token;

            } catch (err) {

                console.log(err);
                throw new Error('Error on registering');
            }

        },
    },
};

module.exports = {
    registerTypeDef,
    registerResolvers,
};
