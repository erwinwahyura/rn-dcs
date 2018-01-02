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
        }
    }
    
    static navigationOptions = {
        title: 'Report',
    };

    getData(obj) {
        console.log('objectnya  ',obj);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if (obj === '') {
            axios.get('https://erwar.id/nilais/api/')
            .then((response) => {
                console.log('hai ', response.data);
                this.setState({dataSource: ds.cloneWithRows(response.data)})
            })
            .catch((err) => {
                console.log('err',err);
                alert('Uh Oh Sorry Error!');
            })
        } else if (obj.toLowerCase().substr(0,4) === 'week') {
            axios.post('https://erwar.id/nilais/api/week', {
                week: obj
            })
            .then((response) => {
                console.log('hai ', response.data);
                this.setState({dataSource: ds.cloneWithRows(response.data)})
            })
            .catch((err) => {
                console.log('err',err);
                alert('Uh Oh Sorry Error!');
            })
        } else {
            axios.post('https://erwar.id/nilais/api/nama', {
                nama: obj
            })
            .then((response) => {
                console.log('hai ', response.data);
                this.setState({dataSource: ds.cloneWithRows(response.data)})
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
                <ListView
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
                                    Nilai: {rowData.nilai}
                                </Text>

                                <Text>
                                    Week: {rowData.week}
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});