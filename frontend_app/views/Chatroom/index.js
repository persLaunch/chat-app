import React, { Component } from 'react'
import getChatroom from '../../queries/getChatroom'
import AddMessage from '../../mutations/addMessage'

import Loader from '../../components/Loader/Loader'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import Card from '../../components/Card/Card'

class Chatroom extends Component {

  static propTypes = {

    loading: PropTypes.bool,
    chatroom: PropTypes.object,
    chatroomId: PropTypes.string,
    addMessage: PropTypes.func,
  }

  sendMessage = async (e) => {
    e.preventDefault()
    const message = document.getElementById('message_input').value
  
    if (message === '') { alert("Veuillez entrer un message") }


    try{

      await this.props.addMessage(message, this.props.chatroomId);

    } catch (err) {

      console.log(err)
      alert("Une erreur s'est produite lors de l'envoie de votre message")
    }

  }

  render() {
    
    if (this.props.loading) {

      return <Loader />
    }

    console.log(this.props)

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
          {this.props.chatroom.messages.map((message) => {

            return (
              <div key={message.id} className="row">
                <div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                  <Card  style={{ textAlign: 'center' }}>
                    <div className="content">
            
                      <div >{message.owner}</div>
                      <div >{message.text}</div>
             
                    </div>
                  </Card>

                </div>
              </div>
            )
          })}
        </div>
        <form onSubmit={this.sendMessage}>

          <div className="input-group fluid">
            <input type="text" id="message_input" placeholder="Enter your message" />
          </div>
          <button className="button-action"> Send </button>
        </form>
     
        <style jsx>{`
        .content {
          font-size: 20px;
          font-weight: bolder;
        }

        .messages-box {
          height: 300px;
          background: #FFFFFF;

        }
   

      `}</style>
      </div>
    )
  }
}

export default compose(graphql(getChatroom, {
  props: ({ data: { loading, chatroom } }) => ({
    loading,
    chatroom
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
        optimisticResponse: {
          __typename: 'Mutation',
          addMessage: {
            __typename: 'Message',
            text,
            createdAt: new Date().toString(),
          }
        }
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
