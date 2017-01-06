
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './configureStore';
import Storage from 'react-native-storage';

const storage = new Storage({
  size: 1000,
  defaultExpires: null,
  enableCache: true,
});
global.storage = storage;


function setup():React.Component {
  class Root extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: false,
        store: configureStore(() => this.setState({ isLoading: false })),
      };
    }

    render() {
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
