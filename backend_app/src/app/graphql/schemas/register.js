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
                
                console.log({ email, password, firstName, lastName, username });
                const user = await s_user.createUser({ email, firstName, lastName, username });
               
                console.log("a");
                 const cred = await s_auth.register(user.id, user.email, password);
                
                console.log("b");
                const token = await s_auth.generateTokenAuth(req.login, cred);

                console.log(token);
                return token;

            } catch (err) {

                console.log(err);
                throw err;
            }

        },
    },
};

module.exports = {
    registerTypeDef,
    registerResolvers,
};
