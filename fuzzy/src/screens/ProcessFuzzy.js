import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image
} from 'react-native';



export default class ProcessFuzzy extends Component {
    constructor() {
        super()
    }
    
    static navigationOptions = {
        title: 'Result',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome ProcessFuzzy</Text>
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