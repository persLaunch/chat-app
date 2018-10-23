
import gql from 'graphql-tag';

export default gql`
  query getUserProfile {
    getUserProfile {
      id
      firstName
      lastName
      username
      email
      dateSignedUp
    }
  }
`
