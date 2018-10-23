
import gql from 'graphql-tag';

export default gql`
query getChatroom {
    chatroom(id: "1") {
    id
    title
    messages {
      id
      text
      createdAt
      ownerName
      __typename
    } 
    __typename
  }
}
`
