
import React, { Component } from 'react'
import Card from '../../../components/Card/Card'
import PropTypes from 'prop-types'

class MessagesContainer extends Component {

  state =  {

    messages: {},
    scroll: false,
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
  
  componentDidUpdate() { 

    if(this.state.scroll) { this.scrollToBottom(); }
  }

  componentDidMount() {
    setTimeout(() => {
      this.scrollToBottom();
    })
    
    if(this.props.chatroom) {
      this.setState({ messages: this.props.chatroom.messages.reverse() })
    
    }
  }

  static getDerivedStateFromProps(props, state) {
  
    if(props.chatroom && props.newMessage) {

      if(Object.keys(state.messages).indexOf(props.newMessage.id) < 0) {

        const newMessages = state.messages.slice()
        newMessages[props.newMessage.id] = props.newMessage
        return { messages: newMessages, scroll: true }

      } else {

        return { scroll: false }
      }
    }

    return null;
  
  }

  render() {
    return (
        
      <div className="messages-box" >
        {Object.values(this.state.messages).slice(0).map((message) => {
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






