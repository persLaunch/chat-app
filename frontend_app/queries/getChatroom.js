
import gql from 'graphql-tag';

export default gql`
query getChatroom($id: ID!) {
    chatroom(id: $id) {
    id
    title
    messages {
      id
      text
      createdAt
      __typename
    } 
    __typename
  }
}
`
