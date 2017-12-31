import React, { Component } from 'react'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image
} from 'react-native';



export default class Home extends Component {
    constructor() {
        super()
    }
    
    static navigationOptions = {
        title: 'Home',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text 
                    style={styles.welcome}
                >
                    Applikasi Fuzzy (judul skripsi)
                </Text>
                <Image 
                    source={require('../img/logo.jpg')}
                    style={{width: 250, height: 200, resizeMode: Image.resizeMode.contain,}}
                />
                <Text 
                    style={styles.welcome}
                >
                    Jln. Bintaro Jaya kel287:20
                </Text>
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
  images: {
    
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Home', () => Home);