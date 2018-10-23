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
                
                console.log('auth', req.auth);

                const user = await s_user.createUser({ email, firstName, lastName, username });
                const token = await s_auth.register({ userId: user.id, email: user.email, password, req });
               
                return token;

            } catch (err) {

                console.log(err);
                return err;
            }

        },
    },
};

module.exports = {
    registerTypeDef,
    registerResolvers,
};
