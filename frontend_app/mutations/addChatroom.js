import gql from 'graphql-tag';

export default gql`
mutation addChatroom($text: String!, $userId: String!){
  addChatroom(text: $text, id: $userId) {
      id
      title
    }
  }
`
