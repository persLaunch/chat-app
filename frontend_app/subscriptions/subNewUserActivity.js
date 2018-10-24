
import gql from 'graphql-tag';

export default gql`
subscription NewUserActivity($chatroomId: ID) {
  newUserActivity(chatroomId: $chatroomId) {
      id
      status
      user
      createdAt
  }
}
`
