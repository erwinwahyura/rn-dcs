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
     header: null
  };
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
          <Text>Welcome To APPS</Text>
        <Button onPress={() => navigate('Main')}
          title="Get Started">
        </Button>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Login', () => Login);