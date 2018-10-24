
import React, { Component } from 'react'
import Card from '../../../components/Card/Card'
import PropTypes from 'prop-types'

class MessagesContainer extends Component {

  state =  {

    messages: [],
  }

  static propTypes = {

    chatroom: PropTypes.object,
    newMessage: PropTypes.object,
  }

  scrollToBottom = () => {
    if(this.messagesEnd) {

      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  componentDidUpdate() { this.scrollToBottom(); }

  componentDidMount() {
    this.scrollToBottom();

    if(this.props.chatroom) {
      this.setState({ messages: this.props.chatroom.messages.reverse() })
    
    }
  }

  static getDerivedStateFromProps(props, state) {
  
    if(props.chatroom && props.newMessage) {

      const newMessages = state.messages.slice()
      newMessages.push(props.newMessage)
      return { messages: newMessages }

    }
  
    return null;
  }

  render() {
    return (
        
      <div className="messages-box" >
        {this.state.messages.slice(0).map((message) => {
          const dateTab =  message.createdAt.split(' ')
          const date = dateTab[0] +' '+dateTab[2] +' '+dateTab[3] +' '+dateTab[4]
          return (
            <div key={message.id} className="row">
              <div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                    
                <Card  style={{ textAlign: 'center' }}>
                  {`${message.ownerName}: ${date}`}
                  <div className="content">
            
                    <div >{message.text}</div>
                    <div ></div>
            
                  </div>
                </Card>

              </div>
            </div>
          )
        })}

        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>


        <style jsx>{`
 
        .messages-box {
          height: 300px;
          overflow: scroll;

        }
   

      `}</style>
      </div>
    )
  }
}

export default MessagesContainer;






