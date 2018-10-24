import React, { Component } from 'react'
import Loader from '../../components/Loader/Loader'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

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
  }

  state = {

    newMessage: null,
    newUserActivity: null,

  }
 

  static getDerivedStateFromProps(props) {

    if(props.subNewMessage.newMessage) { return { newMessage : props.subNewMessage.newMessage } }
    if(props.subNewUserActivity.newUserActivity) { 
      
      console.log("RECEIVE HEARTBEAT from ", props.subNewUserActivity.newUserActivity)
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

      alert("Une erreur s'est produite, lors de l'envoi de votre présence aux autres utilisateurs...")
    }
  }
  

  componentDidMount() {

    this.interval = setInterval(() => {
      
      console.log("SEND HEARTBEAT")
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
      
        <p>
          Online users:
        </p>
        <p>
          * Refresh when new users join or leave chat or send/receive heartbeats 
        </p>
        <p>
          * HeartBeats every {TIME_INTERVAL_PUSH_REFRESH_USER_ACTIVITY} ms
        </p>
        <UsersContainer 
          chatroom={this.props.chatroom}
          newUserActivity={this.state.newUserActivity}
        />
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

    props: (props) => {
      return {
        subNewMessage: props.data,
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
      }},
    options: (props) => {
    
      return {
        variables: { id: props.chatroomId }
      }
    },
  })
)(Chatroom)

