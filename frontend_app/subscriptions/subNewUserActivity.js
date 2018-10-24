
import gql from 'graphql-tag';

export default gql`
subscription NewUserActivity($chatroomId: ID) {
  newUserActivity(chatroomId: $chatroomId) {
      chatroomId
      status   
      user {
        id
        firstName
        lastName
        username
        email
        signedUpAt
      }
      createdAt
  }
}
`
