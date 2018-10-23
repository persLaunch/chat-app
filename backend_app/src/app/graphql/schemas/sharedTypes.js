
// Check for Types: https://graphql.org/learn/schema/

const sharedTypesTypeDef = `

  type User {
    id: ID
    email: String
    firstName: String
    lastName: String
    username: String
    signedUpAt: String
    
  }

`;

const sharedTypesResolvers = {

};

module.exports = {
    sharedTypesTypeDef,
    sharedTypesResolvers,
};
