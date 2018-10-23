import gql from 'graphql-tag';

export default gql`
mutation PushMessageMutation($text: String!, $chatroomId: String!){
    pushMessage(text: $text, chatroomId: $chatroomId) {
      text
    }
  }
`
