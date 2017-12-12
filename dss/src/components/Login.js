import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image
} from 'react-native';


export default class Login extends Component {
  
    constructor() {
    super()
  }

  static navigationOptions = {
    title: 'Login',
  };
    rend
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
          <Text>Hii</Text>
        <Button onPress={() => navigate('Main')}
          title="Get Started">
        </Button>
      </View>
    )
  }
}

AppRegistry.registerComponent('Login', () => Login);