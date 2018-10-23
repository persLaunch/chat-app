import Chatroom from '../views/Chatroom'
import React from 'react'
import { pageWithUserData } from '../hocs/page'
import Unauthorized from '../components/Unauthorized/Unauthorized'


export default pageWithUserData(({ urlInfo, ...props }) => {

  if (!props.loggedIn) {
    
    return (
      <div>
        <Unauthorized />
      </div>
    )
  }

  return <Chatroom chatroomId={urlInfo.query.chatroomId} />

})