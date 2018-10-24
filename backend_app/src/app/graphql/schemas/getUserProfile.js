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

            if (s_auth.isAuth(req)) { 

                try {

                    const { userId } = req.auth;
                    const user = await s_user.getUserProfile(userId);
                    return user;
                } catch (err) {
                    
                    throw new Error('Error when fetching user profil');
                }
            }

            return {};
        
        },
    },
};

module.exports = {
    getUserProfileTypeDef,
    getUserProfileResolvers,
};
