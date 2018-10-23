
const s_auth = require('../services/s_auth');

const loginTypeDef = `
extend type Mutation {
    login(email: String, password: String): String
  }
`;

const loginResolvers = {
    Mutation: {
        login: async (parentValue, { email, password }, req) => {
 
            try {

                console.log('auth', req.auth);
                const token = await s_auth.login({ email, password, req });

                return token;
                
            } catch (err) {

                return err;
            }

        },
    },
};

module.exports = {
    loginTypeDef,
    loginResolvers,
};
