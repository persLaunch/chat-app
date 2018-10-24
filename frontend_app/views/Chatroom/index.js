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
import subUpdateSomeoneActivity from '../../subscriptions/subUpdateSomeoneActivity';
import pushUserActivity from '../../mutations/pushUserActivity';

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
    someoneActivity: null,

  }
 

  static getDerivedStateFromProps(props) {

    if(props.data.newMessage) { return { newMessage : props.data.newMessage } }
    if(props.data.someoneActivity) { return { someoneActivity : props.data.someoneActivity } }

    return null;
  }

  
  componentDidMount() {
    
    _pushUserActivity(true)
  }

  componentWillUnmount() {
    
    _pushUserActivity(false)
  }

  _pushUserActivity = async (statusParam) => {

    const { chatroomId } = this.props

    try{
      await this.props.pushUserActivityMutation({
        variables: {
          chatroomId,
          status: statusParam,
        }
      })

    }catch(err) {

      alert("Une erreur s'est produite, lors de l'envoi de votre présence aux autres utilisateurs...")
    }
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
        <UsersContainer 
          chatroom={this.props.chatroom}
          someoneActivity={this.state.someoneActivity}
        />
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
  graphql(subUpdateSomeoneActivity, {

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

