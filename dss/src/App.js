import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './components/Login';
import Home from './components/Home';

const RootNavigator = StackNavigator({
  Login: {
    screen: Login,
  },
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
}, {
  headerMode: 'screen' 
});

// export default RootNavigator;


export default class App extends Component<{}> {
  render() {
    return (
        <RootNavigator/>
    );
  }
}