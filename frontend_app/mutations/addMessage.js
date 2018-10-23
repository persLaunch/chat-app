import gql from 'graphql-tag';

export default gql`
mutation add($text: String!, $chatroomId: Int!) {
    addMessage(text: $text, chatroomId: $chatroomId) {
        text
    }
}
`
