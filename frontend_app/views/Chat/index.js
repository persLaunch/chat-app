import React, { Component } from 'react'

import getChatroomList from '../../queries/getChatroomList'
import Loader from '../../components/Loader/Loader'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import Router from 'next/router'

import AddChatroomButton from './components/AddChatroomButton'

class Chat extends Component {
    
  static propTypes = {

    loading: PropTypes.bool,
    chatrooms: PropTypes.array,
    user: PropTypes.object
  }

  enterInChatroom = (chatroomId) => {

    Router.push('/chatroom?chatroomId=' + chatroomId);
  }


  render() {
    
    if (this.props.loading || !this.props.chatrooms) {
      return <Loader />
    }

    return (
      <div
        className="container"
      >
       
        <div className="row">
          <div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
            <div className="title-section">
              Chatroom List
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
            <div className="content">

              { this.props.chatrooms.map((chatroom) => {
                return (
                  <div key={chatroom.id}>
                    <button className="button-action" onClick={this.enterInChatroom.bind(this, chatroom.id)} >
                      {chatroom.title}
                    </button>
                  </div>
                )
              }) 
              }

            </div>
          </div>
        </div>
   

        <AddChatroomButton 
          user={this.props.user}/>
        <style jsx>{`
          .container {
            margin: 20px;
            text-align: center;
          }
         .button-action{

          background: #152220
         }
        `}</style>
      </div>
    )
  }
}

export default graphql(getChatroomList, {
  props: ({ data: { loading, chatrooms } }) => ({
    loading,
    chatrooms
  }),
})(Chat)
