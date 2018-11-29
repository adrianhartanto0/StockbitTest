import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducers from './reducer/mainReducer';
import React, { Component } from 'react';
import AppNavigator from './AppNavigator';
import { AppRegistry } from 'react-native';
import { createAppContainer } from 'react-navigation'

const store = createStore(mainReducers);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
