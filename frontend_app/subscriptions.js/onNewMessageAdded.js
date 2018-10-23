
import gql from 'graphql-tag';

export default gql`
subscription onNewMessageAdded($chatroomId: String!){
    newMessageAdded(chatroomId: $chatroomId){
      id
      text
    }
  }
  `
