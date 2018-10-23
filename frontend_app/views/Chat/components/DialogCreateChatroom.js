import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

import addChatroom from '../../../mutations/addChatroom'
import getChatroomList from '../../../queries/getChatroomList';

class DialogCreateChatroom extends Component {
  
    static propTypes = {

      closeDialog: PropTypes.func,
      addChatroom: PropTypes.func,
      user: PropTypes.object
    }

    confirmAddChatroom = async e => {

      e.preventDefault()

      const chatroomTitle = document.getElementById('add_chatroom_title').value


      try{

        await this.props.addChatroom(
          chatroomTitle,
        )

        alert("Chatroom du nom de " + chatroomTitle + " a été créé !")
        this.props.closeDialog()
      }catch (err) {

        alert("Une erreur s'est produite")
      }

    }

    render() {
      return (
        <>
          <div className="form-section">
            <form id="createChatroomForm" onSubmit={e => this.confirmAddChatroom(e)}>
              <fieldset>
                <legend>Create Chatroom</legend>
                <div className="input-group fluid">
                  <label style={{ width: 90 }}>Chatroom name</label>
                  <input
                    name="name"
                    id="add_chatroom_title"
                    type="text"
                    label="Title"
                  />
                </div>
   
                <button
                  type="submit"
                  className="button-action"
                  style={{ float: 'right' }}
                >
                  Create Chatroom
                </button>
              </fieldset>
            </form>
          </div>
          <style jsx="true">{`
            .form-section {
              margin: 20px;
            }
          `}</style>
        </>
      )
    }
}

export default compose(
  graphql(addChatroom, {
    props: ({ mutate }) => ({
      addChatroom: (title) => {
        return mutate({
          variables: { title },
        })
      }
    }),
    options: () => ({
      refetchQueries: [
        {
          query: getChatroomList,
        }
      ]
    })
  })
)(DialogCreateChatroom)
