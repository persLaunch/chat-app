import React, { Component } from 'react';

import PushMessage from './components/PushMessage';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ToastContainer, toast } from 'react-toastify';


class App extends Component {

  componentWillReceiveProps({ data: { newMessage: { text } } }) {
    toast(text);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <PushMessage/>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

const subNewMessage = gql`
  subscription {
    newMessage {
        text
    }
  }
`;

export default graphql(subNewMessage)(App);
