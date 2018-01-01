import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image,
    ActivityIndicator, 
    ListView, 
    Modal, 
    TouchableHighlight, 
    TouchableOpacity,
    Picker,
} from 'react-native';

import axios from 'axios';


export default class DataAbsen extends Component {
    constructor() {
        super()
        this.state = {
            datas: {},
            isloading: true,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            modalAbsen: false,
            dataKaryawan: {},
            namaCurrent: '',
            selectedName: 'pilih nama',
            animating: true,
            dataNilaiAbsen: [],
            week: '',
        }
    }
    
    static navigationOptions = {
        title: 'Input Nilai',
    };

    componentWillMount() {
        this.getNamaKaryawan();

        var env = 'https://erwar.id/absens/api/detail';
        return fetch(env)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('wow11: ',responseJson.data);
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(responseJson),
                datas: [ ...responseJson.data]
            });
        })
        .catch((error) => {
            console.error('err : ',error);
        });

    }

    componentWillMount() {
        this.getNamaKaryawan()
    }
    setModalAbsen(visible) {
        this.setState({modalAbsen: visible});
    }

    getNamaKaryawan() {
        axios.get('https://erwar.id/karyawans/api/')
        .then((response) => {
            console.log('response nama karyawan: ', response.data);
            setTimeout(() =>  { 
                this.setState({dataKaryawan: [...response.data]})
            }, 3000)
            
        })
        .catch((err) => {
            console.log('Uh Oh error', err);
        })
    }

    addAbsen(data) {
        console.log('datasdsdsds : ;: ', data);
    }

    render() {
        const animating = this.state.animating

        // {this.state.dataKaryawan}
        // let namaItems = setTimeout(() => {
        //     this.state.dataKaryawan.map((s, i) => {
        //         return <Picker.Item key={i} value={s} label={i} />
        //     });
        // }, 10000)

        // const namaItems = []; 
        // for (var i = 0; i < this.state.datas.length; i++) {
        //      var s = this.state.datas[i]; 
        //      namaItems.push(<Picker.Item key={i} value={s} label={s} />); 
        // }
        // console.log('masuk? ', namaItems);
    

        if (this.state.isLoading) {
            return (
              <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator />
              </View>
            );
        } 
        return (
            <View style={{flex: 1, padding: 20}}>
                <Text style={styles.welcome}>Menu Input Nilai Karyawan</Text>

                <TouchableOpacity
                    style={styles.buttonAddKaryawan}
                    onPress={() => {this.setModalAbsen(true)}}
                >
                    <Text style={styles.button}> Input Nilai </Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.TextInput}
                    placeholder="input week berapa disini..ex: (week1)"
                    onChangeText={(week) => this.setState({week})}
                    value={this.state.week}
                />
                <TouchableOpacity
                    style={styles.buttonAddKaryawan}
                    onPress={() => {this.cariData()}}
                >
                    <Text style={styles.button}> Cari </Text>
                </TouchableOpacity>

                <Modal
                        animationType={"fade"}
                        transparent={false}
                        visible={this.state.modalAbsen}
                        onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                        <View style={{marginTop: 22}}>
                            <View>
                                <Text style={styles.welcome}>Add Data Karyawan</Text>
                                <View style={styles.frameEdit}>
                                    <View style={styles.inFrameEdit}>

                                        <View style={styles.buttonEDIT}>
                                            <TouchableOpacity style={styles.inFrameEditButton}
                                                onPress={() => {
                                                    this.addAbsen(this.state.namaCurrent)
                                                    this.setModalAbsen(!this.state.modalAbsen)
                                                }}
                                            >
                                                <Text>ADD</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.inFrameEditButton}
                                                onPress={() => {
                                                    this.setModalAbsen(!this.state.modalAbsen)
                                                }}
                                            >
                                                <Text>CANCEL</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => 
                        <View>
                            <View style={styles.data}> 
                                <Text>
                                    Id: {rowData.ID}
                                </Text>

                                <Text>
                                    Nama: {rowData.nama}
                                </Text>

                                <Text>
                                    Tanggal: {rowData.tgl}
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