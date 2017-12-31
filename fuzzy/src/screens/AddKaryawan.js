import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image,
    ActivityIndicator, ListView, Modal, TouchableHighlight
} from 'react-native';


export default class AddKaryawan extends Component {
    constructor() {
        super()
        this.state = {
            datas: {},
            isloading: true,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            modalVisible: false,
        }
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    static navigationOptions = {
        title: 'Karyawan'
    };

    componentDidMount() {
        var envss = 'https://erwar.id/karyawans/api';
        return fetch(envss)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('wow: ',responseJson);
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(responseJson),
                datas: [ ...responseJson]
            });
        })
        .catch((error) => {
            console.error('err : ',error);
        });
    }
    editKaryawan(id) {
        //do edit
        //alert('your id'+id)
        console.log('your id', id);
        this.setModalVisible(true)
    }
    render() {
       
        if (this.state.isLoading) {
            return (
              <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator />
              </View>
            );
        } 
        return (
           
            <View style={{flex: 1, padding: 20}}>
                <Text style={styles.welcome}>Daftar Karyawan</Text>
                
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => 
                        <View>
                            <View style={styles.data}> 
                                <Text>
                                    Id: {rowData.id}
                                </Text>
                                <Text>
                                    Nama: {rowData.nama}
                                </Text>
                                <Text style={{
                                    alignItems: 'flex-end', 
                                    borderBottomWidth: 1,
                                    borderColor: '#eaeaea',
                                }}>
                                    Jabatan: {rowData.jabatan}
                                </Text>
                                <TouchableHighlight
                                    style={styles.button}
                                    onPress={() => {this.editKaryawan(rowData.id)}}
                                >
                                    <Text style={{ margin: 5}}> Edit </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    }
                />
                

                <View>
                    <Modal
                        animationType={"fade"}
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                        <View style={{marginTop: 22}}>
                            <View>
                                <Text>Hello World!</Text>

                                <Button onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }}>
                                    OK
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </View>
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
  
  data: {
    flex: 1,
    backgroundColor: '#f1f8ff',
    padding: 15,
    marginBottom: 5,
    marginTop: 5,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 5,
},
  button: {
    alignItems: 'flex-end',
    backgroundColor: '#DDDDDD',
    padding: 1,
    marginTop: 5,
    borderRadius: 5,
    marginBottom: 3,
    width: 50,
  },
});