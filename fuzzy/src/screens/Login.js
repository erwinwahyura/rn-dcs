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
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'


class Login extends Component {
  
    constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        
      <View style = {styles.container}>
          
        <Text style={styles.welcome}>Welcome To APPS</Text>
        <View style={styles.wrapper}>
          <Text style={styles.textLogin}>Username</Text>
            <TextInput 
              style= {styles.input}
              onChangeText={(e) => this.onUsernameChange({e})}
              value={this.state.username}
            />
          <Text>Password</Text>
            <TextInput 
              style= {styles.input}
              secureTextEntry = {true}
              onChangeText={(e) => this.onPasswordChange({e})}
              value={this.state.password}
            />
        </View>
        <Button style={styles.buttonStyle} onPress={() => navigate('Home')}
          title="Login">
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
    backgroundColor: '#6D9C9F',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginBottom: 50,
  },
  wrapper: {
    marginTop: 50,
    backgroundColor: '#fff',
    opacity: 20,
    borderWidth: 0.1,
    borderRadius: 0.5,
    margin: 10
  },
  input: {
    width: 300,
    height: 50,
  },
  textLogin: {
    textAlign: 'left',
    marginRight: 175,
  },  
  buttonStyle: {
    width: 100,
    color: '#6D9C9F'
  }
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     do_login: (input) => {
//       dispatch(login_customer(input))
//     }
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     mapping: state
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login)
