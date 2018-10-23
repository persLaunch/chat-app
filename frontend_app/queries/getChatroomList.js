
import gql from 'graphql-tag';

export default gql`
  query getChatroomList {
    chatrooms {
      id
      title
    }
  }
`
