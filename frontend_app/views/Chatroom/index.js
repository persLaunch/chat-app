import React, { Component } from 'react'
import getChatroom from '../../queries/getChatroom'
import Loader from '../../components/Loader/Loader'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

class Chatroom extends Component {

  static propTypes = {

    loading: PropTypes.bool,
    chatroom: PropTypes.object,
    chatroomId: PropTypes.string,
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

        

        <style jsx>{`
         
        `}</style>
      </div>
    )
  }
}

export default graphql(getChatroom, {
  props: ({ data: { loading, chatroom } }) => ({
    loading,
    chatroom
  }),
  options: (props) => {
    
    return {
      variables: { id: props.chatroomId }
    }
  },
})(Chatroom)
