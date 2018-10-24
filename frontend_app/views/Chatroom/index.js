import React, { Component } from 'react'
import Loader from '../../components/Loader/Loader'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import PushMessage from './components/PushMessage'
import MessagesContainer from './components/MessagesContainer'
import Card from '../../components/Card/Card'

import getChatroom from '../../queries/getChatroom'
import subNewMessage from '../../subscriptions.js/subNewMessage';

class Chatroom extends Component {

  static propTypes = {

    user: PropTypes.object,
    loading: PropTypes.bool,
    chatroom: PropTypes.object,
    chatroomId: PropTypes.string,
    getChatroom: PropTypes.object,
  }

  state = {

    newMessage: null,
  }
  static getDerivedStateFromProps(props) {

    console.log("props", props)

    if(props.data.newMessage) {

      return { newMessage : props.data.newMessage }
    }
    /*if(props.getChatroom && props.chatroom) {
      
      const newMessage = props.data.newMessage

      if(getChatroom.chatroom.includes(newMessage.id))
      props.getChatroom = update(props.getChatroom, { // On merge previousResult et le nouveau objet
        chatroom: {
          messages: {
            $push: [props.data.messageToAdd],
          },
        },
      });

      // # TODO to be improve -> merge directly in gql store cache with newMessage in param
      // props.getChatroom.refetch();
    }*/

    return null;
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

        <MessagesContainer 
          chatroom={this.props.chatroom}
          newMessage={this.state.newMessage}
         />
        <PushMessage chatroomId={this.props.chatroomId}/>
      
        <style jsx>{`
        .content {
          font-size: 20px;
          font-weight: bolder;
        }

      `}</style>

      </div>
      
    )
  }
}



export default compose(
  graphql(subNewMessage, {

    options: (props) => {
      return {
        variables: { 
          chatroomId: props.chatroomId 
        }
      }
    }
  },
  ),
  graphql(getChatroom, {

    props: (props) => {
      return {
        loading: props.data.loading,
        chatroom: props.data.chatroom,
        getChatroom: props.data,
      }},
    options: (props) => {
    
      return {
        variables: { id: props.chatroomId }
      }
    },
  })
)(Chatroom)

