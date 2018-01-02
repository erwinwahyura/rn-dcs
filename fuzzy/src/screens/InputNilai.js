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


export default class InputNilai extends Component {
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
            dataNilaiAbsen: [],
            week: '',
            dataCari: [],
            flagDataCari: false,
            flagProsesFuzzy: false,
            flagListViewByWeek: false,
            flagListViewHasil: false,
            dataHasil: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            loadingFuzzy: false,
            Result: {},
        }
    }
    
    static navigationOptions = {
        title: 'Input Nilai',
    };

    componentDidMount() {
        // var env = 'https://erwar.id/absens/api/detail';
        // return fetch(env)
        // .then((response) => response.json())
        // .then((responseJson) => {
        //     console.log('wow11: ',responseJson.data);
        //     let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //     this.setState({
        //         isLoading: false,
        //         dataSource: ds.cloneWithRows(responseJson),
        //         datas: [ ...responseJson.data]
        //     });
        // })
        // .catch((error) => {
        //     console.error('err : ',error);
        // });

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

    cariData(week, status) {
        this.setState({flagListViewByWeek: status})
        axios.post('https://erwar.id/proses/api/',{
            week: week
        })
        .then((response) => {
            console.log('data cari: ', response.data);
            this.setState({dataCari: [...response.data]})
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(response.data),
                flagDataCari: true,
                flagListViewByWeek: true,
            });
        })
        .catch((err) => {
            console.log('err: ',err);
            alert('Uh Oh error', err);
        })
    }

    prosesFuzzy(week, statusFlagWeek) {
        this.setState({flagListViewByWeek: false,loadingFuzzy: true, flagListViewHasil: true})
        axios.post('https://erwar.id/proses/api/fuzzy', {
            week: week.toLowerCase()
        })
        .then((response) => {
            console.log('proses fuzzynyaaa: ', response.data);
            this.setState({dataCari: [...response.data]})
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataHasil: ds.cloneWithRows(response.data),
                flagDataCari: false,
                flagProsesFuzzy: true,
                flagListViewByWeek: false,
                flagListViewHasil: true,
                loadingFuzzy: false,
                Result: [...response.data],
            });
        })
        .catch((err) => {
            console.log('err: ',err);
            alert('Uh Oh error', err);
        })
    }

    bulkInsert(obj) {
        console.log('ini obj save data: ', obj);
        var parsingData = [];
        for (var i =0 ;i<obj.length; i++) {
            var temp = {
                'id_absen': obj[i].id,
                'nilai': obj[i].nilai_karywan,
                'tag': this.state.week.toLowerCase(),
                'keterangan': obj[i].keterangan,
                'createdAt': new Date(),
                'updatedAt': new Date()
            }
        parsingData.push(temp)
        }

        console.log('parsingdata baru: ', parsingData)

        axios.post('https://erwar.id/proses/api/save', {
            datas: parsingData
        })
        .then((response) => {
            this.setState({
                flagListViewHasil: false,
                flagProsesFuzzy: false,
            })
            console.log('data simpan hasil fuzzy  : ', response);
            alert('data berhasil di simpan')
            
        })
        .catch((err) => {
            console.log('err: ',err);
            alert('Uh Oh error', err);
        })
    }

    render() {

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
                    onPress={() => {this.cariData(this.state.week.toLowerCase()), 'loading'}}
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
                    {/* LIST UNTUK GET DATA BY WEEK */}
                {
                    this.state.flagListViewByWeek === false ?
                    null 
                    :
                    this.state.flagListViewByWeek === 'loading' ?
                    <ActivityIndicator></ActivityIndicator>
                    :
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
                                    Nama: {rowData.nama}
                                </Text>

                                <Text>
                                    Nilai Kehadiran: {rowData.total_kehadiran}
                                </Text>

                                <Text>
                                    Nilai Kerapihan: {rowData.total_kerapihan}
                                </Text>

                                <Text>
                                    Nilai Sikap: {rowData.total_sikap}
                                </Text>
                                
                            </View>
                        </View>
                    }
                />
                }
                {
                    this.state.loadingFuzzy === false ?
                    null:
                    <ActivityIndicator size="large" color="#0000ff" />
                }

                {/* LIST DATA UNTUK PROSES FUZZY! */}
                {
                    this.state.flagListViewHasil === false ?
                    null
                    :
                    this.state.flagListViewHasil === 'loading' ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <ListView
                    dataSource={this.state.dataHasil}
                    enableEmptySections={true}
                    renderRow={(rowData) => 
                        <View>
                            <View style={styles.data}> 
                                <Text>
                                    Id: {rowData.id}
                                </Text>

                                <Text>
                                    Nama: {rowData.nama}
                                </Text>

                                <Text>
                                    Nilai Karyawan: {rowData.nilai_karywan.toString().substr(0,4)}
                                </Text>

                                <Text>
                                    Keterangan: {rowData.keterangan}
                                </Text>
                            </View>
                        </View>
                    }
                />
                }
             

                {
                    this.state.flagDataCari === false ?
                    null
                    :
                    <Button
                        style={{
                            width: 60,  
                            height: 60,   
                            borderRadius: 30,            
                            backgroundColor: '#ee6e73',                                    
                            position: 'absolute',                                          
                            bottom: 10,                                                    
                            right: 10, 
                        }}
                        onPress={() => {this.prosesFuzzy(this.state.week), false}}
                        title="Proses Fuzzy!"
                    >
                    </Button>
                }

                {
                    this.state.flagProsesFuzzy === false ?
                     null
                     :
                     <Button
                         style={{
                             width: 60,  
                             height: 60,   
                             borderRadius: 30,            
                             backgroundColor: '#ee6e73',                                    
                             position: 'absolute',                                          
                             bottom: 10,                                                    
                             right: 10, 
                         }}
                         onPress={() => {this.bulkInsert(this.state.Result)}}
                         title="Save Data!"
                     >
                     </Button>
                }
                
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