
import gql from 'graphql-tag';

export default gql`
subscription {
  newMessage {
      id
      text
      createdAt
      ownerName
  }
}
`
