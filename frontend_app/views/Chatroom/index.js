import React, { Component } from 'react'
import getChatroom from '../../queries/getChatroom'
import AddMessage from '../../mutations/addMessage'

import Loader from '../../components/Loader/Loader'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import Card from '../../components/Card/Card'
import onNewMessageAdded from '../../subscriptions.js/onNewMessageAdded';

class Chatroom extends Component {

  static propTypes = {

    user: PropTypes.object,
    loading: PropTypes.bool,
    chatroom: PropTypes.object,
    chatroomId: PropTypes.string,
    addMessage: PropTypes.func,
  }

  scrollToBottom = () => {
    if(this.messagesEnd) {

      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  sendMessage = async (e) => {

    e.preventDefault()

    const message = document.getElementById('message_input').value
  
    if (!message || message === '') { 
      
      alert("Veuillez entrer un message") 
      return;
    }

    try{

      await this.props.addMessage(message, this.props.chatroomId);
      document.getElementById('message_input').value = ''
      
    } catch (err) {

      console.log(err)
      alert("Une erreur s'est produite lors de l'envoie de votre message")
    }

    
  }

  render() {
    
    if (this.props.loading) {

      return <Loader />
    }


    return (
      <div className="container">
      
        <div className="row">
          <div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
            <Card style={{ textAlign: 'center' }}>
        
              <div className="content">
                {this.props.chatroom.title}
              </div>
            </Card>
          </div>
        </div>

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
        </div>
    
        <div className="message-input-box">
          <form onSubmit={this.sendMessage}>

            <div className="input-group fluid">
              <textarea type="text" id="message_input" placeholder="Enter your message" />
            </div>
            <button className="button-action"> Send </button>
          </form>
        </div>
        <style jsx>{`
        .content {
          font-size: 20px;
          font-weight: bolder;
        }

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
        
        .messages-box {
          height: 300px;
          overflow: scroll;

        }
   

      `}</style>
      </div>
    )
  }
}

export default compose(graphql(getChatroom, {
  props: (({ loading, error, data }) => {

    const subscribeToMore = data && data.subscribeToMore;
    subscribeToMore({
      document: onNewMessageAdded,
          variables: { chatroomId: data.variables.id }, // id = chatroomId on va utiliser un props.id
          onError: (error) => { return console.error('APOLLO-CHAT', error); },
          updateQuery: ( previousResult, {subscriptionData} ) => {

            if (!subscriptionData.data) {
              return previousResult;
            }

            const newMessageAdded = get(subscriptionData, 'data.newMessageAdded');

            const newResult = update(previousResult, { // On merge previousResult et le nouveau objet
              chatroom: {
                messages: {
                  $push: [newMessageAdded],
                },
              },
            });
            return newResult;
          },
    });

    return {
      loading: data.loading,
      chatroom: data.chatroom,
    }
  }),
  options: (props) => {
    
    return {
      variables: { id: props.chatroomId }
    }
  },
}),
graphql(AddMessage, {
  props: ({ mutate }) => ({
    addMessage: (text, chatroomId) => {
      return mutate({
        variables: { text, chatroomId },
    
      })
    }
  }),
  options: props => ({
    refetchQueries: [
      {
        query: getChatroom,
        variables: { id: props.chatroomId }
      }
    ]
  })
})
)(Chatroom)
