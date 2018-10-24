import gql from 'graphql-tag';

export default gql`
mutation PushUserActivityMutation($status: Boolean!, $chatroomId: String!){
    pushUserActivity(status: $status, chatroomId: $chatroomId) {
      chatroomId
      status
      createdAt
      user {
        id
        firstName
        lastName
        username
        email
        signedUpAt
      }
    }
  }
`
