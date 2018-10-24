import gql from 'graphql-tag';

export default gql`
mutation PushUserActivityMutation($status: String!, $chatroomId: String!){
    pushUserActivity(status: $status, chatroomId: $chatroomId)
  }
`
