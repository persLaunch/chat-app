
import React, { Component } from 'react'
import Card from '../../../components/Card/Card'
import PropTypes from 'prop-types'

const TIME_INTERVAL_LOCAL_REFRESH_USER_RENDER = 9000;
const CONSIDERED_INACTIVE_AFTER_THIS_TIMEOUT = 10000;

function updateActiveUsers(activeUsersParam, newUserActivity) {

  const activeUsers = { ...activeUsersParam }
  const someone = newUserActivity.user;
  const createdAt = new Date(newUserActivity.createdAt);
  const someoneId = someone.id;

  if(newUserActivity.status) {
    activeUsers[someoneId] = { user: someone, lastUpdate: createdAt }
  }

  if(!newUserActivity.status) {
    delete activeUsers[someoneId]; 
  }

  return activeUsers
}


class MessagesContainer extends Component {

  state =  {

    /**
     * activeUsers: {
     *    iduser1: { user: USER, lastUpdate: DATE }
     *    iduser2: ...
     * }
     */
    activeUsers: {},
    time: Date.now(),
  }

  static propTypes = {

    chatroom: PropTypes.object,
    newUserActivity: PropTypes.object,
  }

  
  componentDidMount() {

    this.interval = setInterval(() => {
      this.setState(() => { return { time: Date.now() }})}, TIME_INTERVAL_LOCAL_REFRESH_USER_RENDER);
      
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  static getDerivedStateFromProps(props, state) {
  
    /**
     * newUserActivity: {
     *        status,
     *        user
     *     }
     */
    if(props.chatroom && props.newUserActivity) {

      const activeUsers = updateActiveUsers(state.activeUsers, props.newUserActivity)

      return { activeUsers : activeUsers }
    }
  
    return null;
  }

  render() {
    return (
        
      <div className="users-box" >
        <p>
          * Users are considered inactives if no heartbeats received within {CONSIDERED_INACTIVE_AFTER_THIS_TIMEOUT} ms
        </p>
        <p>
          * Inactive users are not displayed
        </p>
      
        {Object.values(this.state.activeUsers).map((activeUser) => {
         
          const { user, lastUpdate } = activeUser
   
          const dateTab = lastUpdate.toString().split(' ')
          const date = dateTab[0] +' '+dateTab[2] +' '+dateTab[3] +' '+dateTab[4]
        
          return ( lastUpdate.getTime() > (this.state.time - CONSIDERED_INACTIVE_AFTER_THIS_TIMEOUT) ?
            <div key={user.id} className="row">
              <div className="col-sm-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                    
                <Card style={{ textAlign: 'center' }}>
                  <div className="content">
                    <div >{user.username} vue à {date}</div>
                    <div ></div>
            
                  </div>
                </Card>

              </div>
            </div>
            : null)
            
        })}


        <style jsx>{`
 
        .users-box {
          height: 200px;
          overflow: scroll;

        }
   

      `}</style>
      </div>
    )
  }
}

export default MessagesContainer;
