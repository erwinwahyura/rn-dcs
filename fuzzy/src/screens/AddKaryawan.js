import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image,
    ActivityIndicator, ListView, Modal, TouchableHighlight, TouchableOpacity
} from 'react-native';

import axios from 'axios';

export default class AddKaryawan extends Component {
    constructor() {
        super()
        this.state = {
            datas: {},
            isloading: true,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            modalVisible: false,
            objEdit: {
                id: 0,
                nip: '',
                nama: '',
                jabatan: ''
            },
            modalAddKaryawan: false,
        }
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    setModalKaryawan(visible) {
        this.setState({modalAddKaryawan: visible});
        this.setState({id: 0, nip:'', nama: '', jabatan: ''})
    }

    static navigationOptions = {
        title: 'Karyawan'
    };

    componentDidMount() {
        var env = 'https://erwar.id/karyawans/api';
        return fetch(env)
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

    show_editKaryawan(id, nip, nama, jabatan) {
        console.log('your id', id);
        this.setState({id: id, nip: nip, nama: nama, jabatan: jabatan})
        console.log(this.state.objEdit);
        this.setModalVisible(true)
    }

    editKaryawan(id, nip, nama, jabatan) {
        var env = 'https://erwar.id/karyawans/api/';
        console.log('objectsss', id, nip, nama, jabatan);
        axios.put(env+id, {
            nip: nip,
            nama: nama,
            jabatan: jabatan
        })
        .then((response) => {
            console.log('respon edit ', response);
            this.componentDidMount()
            alert('updated success')
        })
        .catch((err) => {
            console.log('errr ', err);
            alert('Uh Oh!.. Sorry Error.', err)
        })

    }

    addKaryawan(nip, nama, jabatan) {
        var env = 'https://erwar.id/karyawans/api/';
        axios.post(env, {
            nip: nip,
            nama: nama,
            jabatan: jabatan
        })
        .then((response) => {
            console.log('respon add ', response);
            this.componentDidMount()
            alert('success add data karyawan')
        })
        .catch((err) => {
            console.log('errr ', err);
            alert('Uh Oh!.. Sorry Error.')  
        })
    }

    deleteKaryawan(id) {
        var env = 'https://erwar.id/karyawans/api/';
        axios.delete(env+id)
        .then((response) => {
            console.log('respon delete ', response);
            this.componentDidMount()
            alert('success delete data karyawan')
        })
        .catch((err) => {
            console.log('errr ', err);
            alert('Uh Oh!.. Sorry Error.')  
        })
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
                <TouchableOpacity
                    style={styles.buttonAddKaryawan}
                    onPress={() => {this.setModalKaryawan(true)}}
                >
                    <Text style={styles.button}> Add Karyawan </Text>
                </TouchableOpacity>
                
                {/* ------------------------------------------ */}
                {/* =========== Modal ADD KARYAWAN ===========*/}
                
                <Modal
                        animationType={"fade"}
                        transparent={false}
                        visible={this.state.modalAddKaryawan}
                        onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                        <View style={{marginTop: 22}}>
                            <View>
                                <Text style={styles.welcome}>Add Data Karyawan</Text>
                                <View style={styles.frameEdit}>
                                    <View style={styles.inFrameEdit}>

                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="nip.."
                                            onChangeText={(nip) => this.setState({nip})}
                                            value={this.state.nip}
                                        />
                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="nama.."
                                            onChangeText={(nama) => this.setState({nama})}
                                            value={this.state.nama}
                                        />
                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="jabatan.."
                                            onChangeText={(jabatan) => this.setState({jabatan})}
                                            value={this.state.jabatan}
                                        />
                                        <View style={styles.buttonEDIT}>
                                            <TouchableOpacity style={styles.inFrameEditButton}
                                                onPress={() => {
                                                    this.addKaryawan(this.state.nip, this.state.nama, this.state.jabatan)
                                                    this.setModalKaryawan(!this.state.modalAddKaryawan)
                                                }}
                                            >
                                                <Text>ADD</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.inFrameEditButton}
                                                onPress={() => {
                                                    this.setModalKaryawan(!this.state.modalAddKaryawan)
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
                    {/* ------------------------------------------ */}
                <ListView
                    dataSource={this.state.dataSource}
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
                                <Text style={{
                                    alignItems: 'flex-end', 
                                    borderBottomWidth: 1,
                                    borderColor: '#eaeaea',
                                }}>
                                    Jabatan: {rowData.jabatan}
                                </Text>
                                <View style={styles.buttonEDIT}>
                                    <TouchableOpacity
                                        style={styles.buttonList}
                                        onPress={() => {this.show_editKaryawan(rowData.id, rowData.nip, rowData.nama, rowData.jabatan)}}
                                    >
                                        <Text style={{ margin: 5}}> Edit </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonList}
                                        onPress={() => {this.deleteKaryawan(rowData.id)}}
                                    >
                                        <Text style={{ margin: 5, underlayColor: '#eaeaea'}}> Delete </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                />
                

                <View>
                    {/* ------------------------------------------ */}
                    {/* =========== Modal EDIT KARYAWAN ===========*/}

                    <Modal
                        animationType={"fade"}
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                        <View style={{marginTop: 22}}>
                            <View>
                                <Text style={styles.welcome}>Edit Your Data Karyawan</Text>
                                <View style={styles.frameEdit}>
                                    <View style={styles.inFrameEdit}>

                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="nip.."
                                            onChangeText={(nip) => this.setState({nip})}
                                            value={this.state.nip}
                                        />
                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="nama.."
                                            onChangeText={(nama) => this.setState({nama})}
                                            value={this.state.nama}
                                        />
                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="jabatan.."
                                            onChangeText={(jabatan) => this.setState({jabatan})}
                                            value={this.state.jabatan}
                                        />
                                        <View style={styles.buttonEDIT}>
                                            <TouchableOpacity style={styles.inFrameEditButton}
                                                onPress={() => {
                                                    this.editKaryawan(this.state.id, this.state.nip, this.state.nama, this.state.jabatan)
                                                    this.setModalVisible(!this.state.modalVisible)
                                                }}
                                            >
                                                <Text>EDIT</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.inFrameEditButton}
                                                onPress={() => {
                                                    this.setModalVisible(!this.state.modalVisible)
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
                    {/* ------------------------------------------ */}
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