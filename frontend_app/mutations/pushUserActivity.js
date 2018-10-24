import gql from 'graphql-tag';

export default gql`
mutation PushUserActivityMutation($chatroomId: String!, $status: String!){
    pushUserActivity(chatroomId: $chatroomId, status: $status) {
      text
    }
  }
`
