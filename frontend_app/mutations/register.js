
import gql from 'graphql-tag';

export default gql`
mutation Register($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!){
    register(email: $email, password: $password, firstName: $firstName, lastName: $lastName, username: $username )
}
`;
