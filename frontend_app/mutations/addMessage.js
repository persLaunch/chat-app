import gql from 'graphql-tag';

export default gql`
mutation addMessage($text: String!, $chatroomId: String!) {
    addMessage(text: $text, chatroomId: $chatroomId) {
        id
    }
}
`
