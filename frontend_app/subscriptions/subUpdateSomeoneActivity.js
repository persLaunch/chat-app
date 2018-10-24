
import gql from 'graphql-tag';

export default gql`
subscription NewMessage($chatroomId: ID) {
  newMessage(chatroomId: $chatroomId) {
      id
      text
      createdAt
      ownerName
  }
}
`
