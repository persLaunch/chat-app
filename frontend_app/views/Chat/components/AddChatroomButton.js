import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from '../../../components/Modal/Modal'
import DialogCreateChatroom from './DialogCreateChatroom'

class AddChatroomButton extends Component {
  
  state = {

    openCreateDialog: false,
  }

  static propTypes = {

    user: PropTypes.object
  }
  clickCreateDialog = () => {

    this.setState((prevState) => {

      return { openCreateDialog: !prevState.creating };
    })
  }

	closeCreateDialog = () => {

	  this.setState(() => {

	    return { openCreateDialog: false };
	  })
	}
  
	render() {
   
	  return (
      <>
        <Modal open={this.state.openCreateDialog} closeModal={this.closeCreateDialog}>

          < DialogCreateChatroom 
            closeDialog={this.closeCreateDialog}
            user={this.props.user}
          />
        </Modal>
    
				<button className="button-action button-fix" type="button" onClick={this.clickCreateDialog} >Create a Chatroom</button>

    <style jsx="true">{`

          .button-fix  {
            z-index: 200;
            position: fixed;
            bottom: 10px;
            right: 10px;
          }

        `}</style>
      </>
	  )
	}
}

export default AddChatroomButton;