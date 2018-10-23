
import gql from 'graphql-tag';

export default gql`
query getChatroom($id: ID!) {
    chatroom(id: $id) {
    id
    title
    __typename
  }
}
`
