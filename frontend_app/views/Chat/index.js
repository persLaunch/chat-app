import React, { Component } from 'react'

import getChatroomList from '../../queries/getChatroomList'
import Loader from '../../components/Loader/Loader'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import Router from 'next/router'

class Chat extends Component {
    
  static propTypes = {

    loading: PropTypes.bool,
    chatrooms: PropTypes.array,
  }


  enterInChatroom = (chatroomId) => {

    Router.push('/chatroom?chatroomId=' + chatroomId);
  }


  render() {
    
    if (this.props.loading) {
      return <Loader />
    }

    console.log(this.props)
    return (
      <div
        className="container"
      >
       
        { this.props.chatrooms.map((chatroom) => {

          return (
            <div key={chatroom.id}>
              <button onClick={this.enterInChatroom.bind(this, chatroom.id)} >
                {chatroom.title}
              </button>
            </div>
          )
      
        }) }

        <style jsx>{`
         
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
