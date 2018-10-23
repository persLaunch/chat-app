import gql from 'graphql-tag';

export default gql`
mutation addChatroom($title: String!){
  addChatroom(title: $title) {
      id
      title
    }
  }
`
