import Chat from '../views/Chat'
import React from 'react'
import { pageWithUserData } from '../hocs/page'
import Unauthorized from '../components/Unauthorized/Unauthorized'

export default pageWithUserData(({ ...props }) => {

  if (!props.loggedIn) {
    
    return (
      <div>
        <Unauthorized />
      </div>
    )
  }

  return <Chat />

})
