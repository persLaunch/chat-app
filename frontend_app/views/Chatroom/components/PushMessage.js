import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import pushMessage from '../../../mutations/pushMessage'
import PropTypes from 'prop-types'

class PushMessage extends Component {

  state = { text: '' }
   
  static propTypes = {

    pushMessageMutation: PropTypes.func,
    chatroomId: PropTypes.string,
  }

  _pushMessage = async (e) => {
    e.preventDefault();

    const { text } = this.state
    const { chatroomId } = this.props

    if (!text || text === '') { 
      
      alert("Veuillez entrer un message") 
      return;
    }
   
    try{
      await this.props.pushMessageMutation({
        variables: {
          text,
          chatroomId
        }
      })

      document.getElementById('message_input').value = ''
      this.setState(() => { text: '' });
    }catch(err) {

      alert("Une erreur s'est produite lors de l'envoie de votre message")
    }
  }

  render() {
    return (
   
      <div className="message-input-box">

        <form onSubmit={this._pushMessage}>

          <div className="input-group fluid">
            <textarea 
              type="text" 
              id="message_input" 
              placeholder="Enter your message"
              onChange={e => this.setState({ text: e.target.value })} 
            />
          </div>

          <button className="button-action"> Send </button>

        </form>

        <style jsx>{`

        .button-action {
          width: 100%;
          margin-top: 10px;
          margin-right: 0px;
          margin-left: 0px;
          margin-bottom: 10px;
        }
        
        .message-input-box {
          background: #FFFFFF;
          margin: 10px;
        }
        
      `}</style>
      </div>

    )
  }

}


export default graphql(pushMessage, { name: 'pushMessageMutation' })(PushMessage)
