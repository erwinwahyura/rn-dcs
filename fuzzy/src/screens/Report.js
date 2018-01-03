import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image,
    ListView
} from 'react-native';

import axios from 'axios';

export default class Report extends Component {
    constructor() {
        super()
        this.state = {
            week: '',
            isloading: true,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            flag: false,
            flagText: false,
        }
    }
    
    static navigationOptions = {
        title: 'Report',
    };

    getData(obj) {
        this.setState({flagText: false, })
        console.log('objectnya  ',obj);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if (obj === '') {
            axios.get('https://erwar.id/nilais/api/')
            .then((response) => {
                console.log('hai ', response.data);
                this.setState({dataSource: ds.cloneWithRows(response.data), flagText: true, })
            })
            .catch((err) => {
                console.log('err',err);
                alert('Uh Oh Sorry Error!');
            })
        } else if (obj.toLowerCase().substr(0,4) === 'week') {
            this.setState({flagText: false, })
            console.log('masuk ke pencarian week');
            axios.post('https://erwar.id/nilais/api/week', {
                week: obj.toLowerCase()
            })
            .then((response) => {
                console.log('hai ', response.data);
                this.setState({dataSource: ds.cloneWithRows(response.data), flagText: true, })
            })
            .catch((err) => {
                console.log('err',err);
                alert('Uh Oh Sorry Error!');
            })
        } else {
            this.setState({flagText: false, })
            axios.post('https://erwar.id/nilais/api/nama', {
                nama: obj
            })
            .then((response) => {
                console.log('hai ', response.data);
                this.setState({dataSource: ds.cloneWithRows(response.data), flagText: true, })
            })
            .catch((err) => {
                console.log('err',err);
                alert('Uh Oh Sorry Error!');
            })
        }
    }
    render() {
        return (
            <View style={{flex: 1, padding: 20, marginTop: 0}}>
                <Text style={styles.welcome}>Data Report</Text>
                <TextInput
                    style={styles.TextInput}
                    placeholder="cari report by nama.. atau week.."
                    onChangeText={(week) => this.setState({week})}
                    value={this.state.week}
                />
                <Button
                    onPress={() => {this.getData(this.state.week)}}
                    title="Cari!"
                />
                {
                    this.state.flagText === false ?
                    null :
                    <Text style={styles.welcome}> Data Result </Text>
                }
                <ListView style={{marginTop: 0}}
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderRow={(rowData) => 
                        <View>
                            <View style={styles.data}> 
                            
                                <Text>
                                    Id: {rowData.id}
                                </Text>

                                <Text>
                                    Nip: {rowData.nip}
                                </Text>

                                <Text>
                                    Nama: {rowData.nama}
                                </Text>

                                <Text>
                                    Nilai: {rowData.nilai.toString().substr(0,4)}
                                </Text>

                                <Text>
                                    Week: {rowData.tag}
                                </Text>

                                <Text>
                                    Keterangan: {rowData.keterangan}
                                </Text>
                                
                            </View>
                        </View>
                    }
                />
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
      marginBottom: 20,
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
      flexDirection: 'row',
      backgroundColor: '#DDDDDD',
      padding: 1,
      marginTop: 5,
      borderRadius: 5,
      marginBottom: 3,
      alignItems: 'center',
    },
    frameEdit: {
      padding: 20,
    },
    inFrameEdit: {
      backgroundColor: '#f1f8ff',
      padding: 10,
      borderTopWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderColor: '#eaeaea',
      borderRadius: 5,
    },
    inFrameEditButton: {
      flex: 1,
      alignItems: 'flex-start',
      alignSelf: 'auto',
      
   },
    buttonEDIT: {
      flexDirection: 'row',
      backgroundColor: '#eaeaea',
      justifyContent: 'flex-start',
      padding: 5,
      margin: 15,
      borderRadius: 5,
    },
    buttonAddKaryawan: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      borderRadius: 5,
      marginRight: 80,
      marginLeft: 80,
      marginBottom: 10,
    },
    buttonList: {
      flex: 1,
      alignItems: 'flex-start',
      flexDirection: 'row',
      backgroundColor: '#eaeaea',
      borderRadius: 5,
    }
  });