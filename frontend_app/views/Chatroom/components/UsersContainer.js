
import React, { Component } from 'react'
import Card from '../../../components/Card/Card'
import PropTypes from 'prop-types'

class MessagesContainer extends Component {

  state =  {

    /**
     * activeUsers: {
     *    iduser1: { user: [USER], lastUpdate: [DATE] }
     *    iduser2: ...
     * }
     */
    activeUsers: {},
    messages: [],
  }

  static propTypes = {

    chatroom: PropTypes.object,
    newUserActivity: PropTypes.object,
  }

  scrollToBottom = () => {
    if(this.usersEnd) {

      this.usersEnd.scrollIntoView({ behavior: "smooth" });
    }
  }
  


  updateActiveUsers = (activeUsersParam, newUserActivity) => {

    const activeUsers = { ...activeUsersParam}
    const someone = newUserActivity.user;
    const someoneId = someone.id;

    if(newUserActivity.status && !Object.keys(activeUsers).include(someoneId)) {
      activeUsers[someoneId] = { user: someone, lastUpdate: new Date() }
    }

    if(!newUserActivity.status) {
      delete activeUsers[someoneId]; 
    }

    return activeUsers
  }

  
  componentDidUpdate() { this.scrollToBottom(); }

  componentDidMount() {
    this.scrollToBottom();

    if(this.props.chatroom) {
      this.setState({ messages: this.props.chatroom.messages.reverse() })
    
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  static getDerivedStateFromProps(props, state) {
  
    if(props.chatroom && props.newMessage) {

      const newMessages = state.messages.slice()
      newMessages.push(props.newMessage)
      return { messages: newMessages }

    }

    /**
     * newUserActivity: {
     *        status,
     *        user
     *     }
     */
    if(props.chatroom && props.data.newUserActivity) {

      const activeUsers = updateActiveUsers(state.activeUsers, props.data.newUserActivity)

      return { activeUsers : activeUsers, newMessage : props.data.newMessage }
    }
  
    return null;
  }

  render() {
    return (
        
      <div className="messages-box" >
        {Object.values(this.state.activeUsers).map((activeUser) => {

          const { user, lastUpdate } = activeUser

          return 
          ( lastUpdate < new Date() -  ?
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
            : null)
            
        })}

        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.usersEnd = el; }}>
        </div>


        <style jsx>{`
 
        .messages-box {
          height: 200px;
          overflow: scroll;

        }
   

      `}</style>
      </div>
    )
  }
}

export default MessagesContainer;
