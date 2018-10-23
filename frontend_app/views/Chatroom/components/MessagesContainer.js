
import React, { Component } from 'react'
import Card from '../../../components/Card/Card'
import PropTypes from 'prop-types'

class MessagesContainer extends Component {

  static propTypes = {

    chatroom: PropTypes.object,
  }

  scrollToBottom = () => {
    if(this.messagesEnd) {

      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  componentDidMount() { this.scrollToBottom(); }
  componentDidUpdate() { this.scrollToBottom(); }

  render() {
    return (
        
      <div className="messages-box" >
        {this.props.chatroom.messages.slice(0).reverse().map((message) => {

          return (
            <div key={message.id} className="row">
              <div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                    
                <Card  style={{ textAlign: 'center' }}>
                  {`${message.ownerName}:`}
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






