const s_user = require('../services/s_user');
const s_auth = require('../services/s_auth');

const getUserProfileTypeDef = `
  extend type Query {
    getUserProfile: User
  }
`;

const getUserProfileResolvers = {
    Query: {
        getUserProfile: async (_, args, req) => {

            let user = {};

            if (s_auth.isAuth(req)) { 

                try {

                    const { userId } = req.auth;

                    user = await s_user.getUserProfile(userId);
        
                } catch (err) {
                    
                    user = {};
                }

            }

            return user;
        
        },
    },
};

module.exports = {
    getUserProfileTypeDef,
    getUserProfileResolvers,
};
