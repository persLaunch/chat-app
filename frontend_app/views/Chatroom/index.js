import React, { Component } from 'react'
import Loader from '../../components/Loader/Loader'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import Router from 'next/router'

import PushMessage from './components/PushMessage'
import MessagesContainer from './components/MessagesContainer'
import UsersContainer from './components/UsersContainer'
import Card from '../../components/Card/Card'

import getChatroom from '../../queries/getChatroom'
import subNewMessage from '../../subscriptions/subNewMessage';
import subNewUserActivity from '../../subscriptions/subNewUserActivity';
import pushUserActivity from '../../mutations/pushUserActivity';

const TIME_INTERVAL_PUSH_REFRESH_USER_ACTIVITY = 5000;

class Chatroom extends Component {

  static propTypes = {

    user: PropTypes.object,
    loading: PropTypes.bool,
    chatroom: PropTypes.object,
    chatroomId: PropTypes.string,
    getChatroom: PropTypes.object,
    pushUserActivityMutation: PropTypes.func,
    getChatroomRefetch: PropTypes.func,
    subNewMessageRefetch: PropTypes.func,
    subNewUserActivityRefetch: PropTypes.func,
  }

  state = {

    newMessage: null,
    newUserActivity: null,

  }
 

  static getDerivedStateFromProps(props) {

    if(props.subNewMessage.newMessage) { return { newMessage : props.subNewMessage.newMessage } }
    if(props.subNewUserActivity.newUserActivity) { 
      
      // console.log("RECEIVE HEARTBEAT from ", props.subNewUserActivity.newUserActivity)
      return { newUserActivity : props.subNewUserActivity.newUserActivity } }

    return null;
  }

  

  _pushUserActivity = async (statusParam) => {

    const { chatroomId } = this.props

    try{
      await this.props.pushUserActivityMutation({
        variables: {
          status: statusParam,
          chatroomId,
        }
      })

    }catch(err) {

      // Boring alert
      // alert("Une erreur s'est produite, lors de l'envoi de votre présence aux autres utilisateurs...")
    }
  }
  
  refetch() {

    if( this.props.getChatroomRefetch && this.props.chatroomId) {
      this.props.getChatroomRefetch(this.props.chatroomId)
    }
    if( this.props.subNewUserActivityRefetch) {
      this.props.subNewUserActivityRefetch()
    }
    if( this.props.subNewMessageRefetch) {
      this.props.subNewMessageRefetch()
    }
  }

  componentDidMount() {

    this.refetch();

    this.interval = setInterval(() => {
      
      // console.log("SEND HEARTBEAT")
      this._pushUserActivity(true)
    },TIME_INTERVAL_PUSH_REFRESH_USER_ACTIVITY)

    setTimeout(() => {

      this._pushUserActivity(true)
    }, 100);
  }

  componentWillUnmount() {
    
    this._pushUserActivity(false)
    clearInterval(this.interval);
  }
  render() {
    
    if (this.props.loading) { return <Loader /> }

    return (
   
      <div className="container">

        <div className="row">
          <div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
            <div className="title-section">
              {this.props.chatroom.title}
            </div>
          </div>
        </div>
       

        <button className="button-action" onClick={() => Router.push('/chat')} > Back </button>
       
        <div className="row">
          <div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
            <div className="title-section">
              Users online
            </div>
            
            <div className="title-note">
              <p>
          * Refresh when new users join or leave chat or send/receive heartbeats 
              </p>
              <p>
          * HeartBeats every {TIME_INTERVAL_PUSH_REFRESH_USER_ACTIVITY} ms
              </p>
              <p>
          * Users are considered inactives if no heartbeats received within 10000 ms
              </p>
              <p>
          * Inactive users are not displayed
              </p>
            </div>
            <UsersContainer 
              chatroom={this.props.chatroom}
              newUserActivity={this.state.newUserActivity}
            />
          </div>
        </div>


        <MessagesContainer 
          chatroom={this.props.chatroom}
          newMessage={this.state.newMessage}
        />
        <div className="row">
          <div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
            <PushMessage chatroomId={this.props.chatroomId}/>
          </div>
        </div>
    
        <style jsx>{`
     
        .container {
          background: white;
          text-align: center;
          padding-top: 30px;
        }
      `}</style>

      </div>
      
    )
  }
}



export default compose(
  graphql(subNewMessage, {

    props: (props) => {
      return {
        subNewMessage: props.data,
        subNewMessageRefetch: props.data.refetch
      }},
    options: (props) => {
      return {
        variables: { 
          chatroomId: props.chatroomId
        }
      }
    }
  },
  ),
  graphql(subNewUserActivity, {

    props: (props) => {
      return {
        subNewUserActivity: props.data,
        subNewUserActivityRefetch: props.data.refetch
      }},
    options: (props) => {
      return {
        variables: { 
          chatroomId: props.chatroomId
        }
      }
    }
  },
  ),
  graphql(pushUserActivity, { name: 'pushUserActivityMutation' }),
  graphql(getChatroom, {

    props: (props) => {
      return {
        loading: props.data.loading,
        chatroom: props.data.chatroom,
        getChatroom: props.data,
        getChatroomRefetch: props.data.refetch
      }},
    options: (props) => {
    
      return {
        variables: { id: props.chatroomId }
      }
    },
  })
)(Chatroom)

