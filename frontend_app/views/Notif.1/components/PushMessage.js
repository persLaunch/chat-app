import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class PushMessage extends Component {
  state = { text: '' }

  render() {
    return (
      <div>
        <input
          value={this.state.text}
          onChange={e => this.setState({ text: e.target.value })}
          type="text"
          placeholder="A text"
        />
        <button onClick={() => this._pushMessage()}>Submit</button>
      </div>
    )
  }

  _pushMessage = async () => {
    const { text } = this.state
    await this.props.pushMessageMutation({
      variables: {
        text
      }
    })
    this.setState({ label: '' });
  }
}

const POST_MUTATION = gql`
mutation PushMessageMutation($text: String!){
  pushMessage(text: $text) {
    text
  }
}
`

export default graphql(POST_MUTATION, { name: 'pushMessageMutation' })(PushMessage)
