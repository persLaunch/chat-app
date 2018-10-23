import Chatroom from '../views/Chatroom'
import React from 'react'
import { pageWithUserData } from '../hocs/page'
import Unauthorized from '../components/Unauthorized/Unauthorized'


export default pageWithUserData(({ urlInfo, getUserProfile, ...props }) => {

  if (!props.loggedIn) {
    
    return (
      <div>
        <Unauthorized />
      </div>
    )
  }

  return <Chatroom user={getUserProfile} chatroomId={urlInfo.query.chatroomId} />

})