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
            dataKaryawan: [],
            namaCurrent: '',
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
            durasiProses: 0,
            selectedName: 1,
            dataInput: {
                kehadiran: 0,
                kerapihan: 0,
                sikap: 0,
                weekInput: 0,
            },
            dataTunggal: [],
            dataProsesTunggal: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            flagTunggal: false,
            flagViewTunggal: false,
        }

        datak = []
    }
    
    static navigationOptions = {
        title: 'Input Nilai',
    };

    
    setModalAbsen(visible) {
        this.setState({modalAbsen: visible});
        this.getNamaKaryawan()
        this.AbsenIdKaryawan()
    }
    
    getNamaKaryawan() {
        axios.get('https://erwar.id/absens/api/detail')
        // axios.get('https://erwar.id/karyawans/api/')
        .then((response) => {
            console.log('response nama karyawan: ', response.data);
            setTimeout(() =>  { 
                this.setState({dataKaryawan: [...response.data]})
            }, 3000)
            
            datak = [...response.data]
        })
        .catch((err) => {
            console.log('Uh Oh error', err);
        })

       
    }
    
    addAbsen(id, kehadiran, kerapihan, sikap, week, status) {
        if (kehadiran >10 || kehadiran <0) {
            alert('Nilai Kehadiran 0-10!');
        } else if (kerapihan >5 || kerapihan <0) {
            alert('Nilai Kerapihan 0-5!')
        } else if (sikap >5 || sikap <0) {
            alert('Nilai Sikap 0-5!')
        } else if (week === '') {
            alert('week harus di isi (ex: week1.. ')
        } else {
            axios.post('https://erwar.id/penilaians/api/', {
                id_absen: id,
                kehadiran: kehadiran,
                kerapihan: kerapihan,
                sikap: sikap,
                tag: week.toLowerCase().trim().split(' ').join('')
            })
            .then((response) => {
                
                console.log('sukses create penilaians ',response);
                alert('Sucess!')
                this.setState({flagViewTunggal: true})
                this.getDataTunggal(this.state.selectedName, this.state.weekInput, true)
            })
            .catch((err) => {
                console.log('err', err);
                alert('Failed!')
            })
        }
    }
    
    cariData(week, status) {
        this.setState({flagListViewByWeek: status, flagProsesFuzzy: false, flagProsesFuzzy: false, flagListViewHasil: false })
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
        var t1 = Date.now();
        this.setState({flagListViewByWeek: false,loadingFuzzy: true, flagListViewHasil: true})
        axios.post('https://erwar.id/proses/api/fuzzy', {
            week: week.toLowerCase()
        })
        .then((response) => {
            console.log('proses fuzzynyaaa: ', response.data)
            console.log('lengtnya : ',response.data.length);
            this.setState({dataCari: [...response.data]})
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            var t2 = Date.now()
            var hasil = ((t2-t1)/1000) // detik
            this.setState({
                isLoading: false,
                dataHasil: ds.cloneWithRows(response.data),
                flagDataCari: false,
                flagProsesFuzzy: true,
                flagListViewByWeek: false,
                flagListViewHasil: true,
                loadingFuzzy: false,
                Result: [...response.data],
                durasiProses: hasil,
            });
            var baik = 0;
            var buruk = 0;
            response.data.map(x => {
                if (x.keterangan === 'baik') {
                    baik++
                } else {
                    buruk++
                }
            })

            console.log('cek buruk: ',buruk)
            console.log('cek baik :', baik);
            alert(`proses generate nilai berhasil,
                \n waktu yang di perlukan selama ${this.state.durasiProses.toString().substr(0,5)} detik.
                \n Hasil Penialaian Baik : ${baik}
                \n Hasil Penilaian Buruk : ${buruk}
            `)
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
        //move to promise chainning
        let checker = this.state.week
        let getChecker = (param) => {
            console.log('ini paramnya pastikan isi benar !!', param);
            return new Promise((resolve, reject) => {
                let data = axios.post('https://erwar.id/nilais/api/week', {
                    week: param.toLowerCase()
                })
                console.log('ini datanyaaa cek lengnyaaa ', data);
                resolve(data);
                reject(err)
            })
        }

        let saveData = (param, res) => {
            console.log('cekk k k ',res);
            if (res.data.length === 0 ) {
                console.log('masuk sini leng 0');
                return new Promise ((resolve, reject) => {
                    let data = axios.post('https://erwar.id/proses/api/save', {
                        datas: param
                    })
                    resolve(data)
                    reject(err)
                })
            } else {
                console.log('masuk sini leng 1');
                return new Promise ((resolve, reject) => {
                    let data = 'sudah ada'
                    resolve(data)
                    reject(err)
                })
            }
        }

        getChecker(checker)
        .then((response) => {
            console.log('ini RESPONSEEEE ', response)
            return saveData(parsingData, response)
        })
        .then((result) => {
            console.log('data setelah jalanin save Data: ',result);
            if (result === 'sudah ada') {
                alert('Data sudah ada tidak perlu di simpan!')
            } else {
                alert('Data berhasil di simpan!')
            }
        })
        .catch((err) => {
            alert('Uh.. Oh.. Sorry Error!')
        })
    }

    getDataTunggal(id, week, status) {
        
        console.log('data yg msk ', id, week)
        axios.post('https://erwar.id/proses/api/tunggal',{
            id_karyawan: this.state.selectedName,
            week: this.state.weekInput.toLowerCase()
        })
        .then((response) => {
            console.log('data cari tunggal: ', response.data);
            this.setState({dataTunggal: [...response.data]})
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                dataProsesTunggal: ds.cloneWithRows(response.data),
                flagTunggal: status,
                flagViewTunggal: status
            });
        })
        .catch((err) => {
            console.log('err: ',err);
            alert('Uh Oh error', err);
        })
    }
    componentDidMount() {
        this.getNamaKaryawan()
    }

    ProsesTunggal(id, week) {
        console.log('id ',id, 'weeknya ', week )
        var t1 = Date.now();
        axios.post('https://erwar.id/proses/api/fuzzytunggal', {
            id_karyawan: Number(id),
            week: week.toLowerCase()
        })
        .then((response) => {
            console.log('proses fuzzynyaaa: ', response.data)
            
            var t2 = Date.now()
            var hasil = ((t2-t1)/1000) // detik
            
            var baik = 0;
            var buruk = 0;
            response.data.map(x => {
                if (x.keterangan === 'baik') {
                    baik++
                } else {
                    buruk++
                }
            })

            console.log('cek buruk: ',buruk)
            console.log('cek baik :', baik);
            alert(`
                \n waktu yang di perlukan selama ${hasil.toString().substr(0,5)}  detik.
                \n Nilai karyawan ${response.data[0].nilai_karywan.toString().substr(0,4)}
                \n keterangan Nilai : ${response.data[0].keterangan}
            `)
            this.setState({flagTunggal: false, flagViewTunggal: false})
        })
        .catch((err) => {
            console.log('err: ',err);
            alert('Uh Oh error', err);
        })
    }

    AbsenIdKaryawan () {
        var arrA = [];
        var arrk = [];
        var different = [];
        axios.get('https://erwar.id/karyawans/api')
        .then((response) => {
            // arrA = [...response.data];
            var temp = response.data
            console.log(response.data);
            // console.log(datak[0].ID);
            for(var l =0; l<datak.length; l++) {
                arrk.push(datak[l].id_karyawan)
            }

            for (var k=0; k<temp.length; k++) {
                arrA.push(temp[k].id)
            }

            arrk.sort(function(a,b) {return a-b})
            arrA.sort(function(a,b) {return a-b})
            console.log('array ke k - ', arrk);
            console.log('array ke A - ', arrA);
            for (var i = 0; i<arrA.length; i++) {
                if (arrk[i] !== arrA[i]) {
                    different.push(arrA[i])
                }
            }
            console.log('data different ', different)
            if (different[0] !== undefined) {
                different.map(x=> {
                    axios.post('https://erwar.id/absens/api', {
                        id_karyawan: x
                    })
                    .then((response) => {
                        console.log('sukses add data absens', response.data);
                        // this.componentDidMount();
                        this.getNamaKaryawan()
                    })
                    .catch((err) => {
                        console.log(err, 'err add data absens');
                    })
                })
            }
        })
        .catch((err) => {
            console.log(err, 'err absenidKaryawan');
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
                <Text style={styles.welcome}>Menu Input Nilai Karyawan</Text>

                <TouchableOpacity
                    style={styles.buttonAddKaryawan}
                    onPress={() => {
                        this.setModalAbsen(true)

                    }}
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
                        onRequestClose={() => {this.setModalAbsen(!this.state.modalAbsen)}}
                    >
                        <View style={{marginTop: 22}}>
                            <View>
                                <Text style={styles.welcome}>Input Nilai Karyawan</Text>
                                <View style={styles.frameEdit}>
                                    <View style={styles.inFrameEdit}>
                                    
                                        <Picker
                                            selectedValue={this.state.selectedName}
                                            onValueChange={(v) => this.setState({selectedName: v})}>
                                            {
                                                datak.map(v =>  <Picker.Item key={v.ID} label={v.nama} value={v.id_karyawan} />) 
                                            }
                                        </Picker>
                                        <TextInput
                                            style={styles.TextInput}
                                            keyboardType ='numeric'
                                            maxLength={2}
                                            placeholder="nilai kehadiran.. (1-10)"
                                            onChangeText={(kehadiran) => this.setState({kehadiran})}
                                            value={this.state.kehadiran}
                                        />
                                        <TextInput
                                            style={styles.TextInput}
                                            keyboardType ='numeric'
                                            maxLength={1}
                                            placeholder="nilai kerapihan.. (1-5)"
                                            onChangeText={(kerapihan) => this.setState({kerapihan})}
                                            value={this.state.kerapihan}
                                        />
                                        <TextInput
                                            style={styles.TextInput}
                                            maxLength={1}
                                            keyboardType ='numeric'
                                            placeholder="nilai sikap.. (1-5)"
                                            onChangeText={(sikap) => this.setState({sikap})}
                                            value={this.state.sikap}
                                        />
                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="week ke berapa.."
                                            onChangeText={(weekInput) => this.setState({weekInput})}
                                            value={this.state.weekInput}
                                        />

                                        <View style={styles.buttonEDIT}>
                                            <TouchableOpacity style={styles.inFrameEditButton}
                                                onPress={() => {
                                                    console.log('id: ',this.state.selectedName, 'kehadiran:',this.state.kehadiran, this.state.kerapihan, this.state.sikap, this.state.weekInput)
                                                    this.addAbsen(this.state.selectedName, this.state.kehadiran, this.state.kerapihan, this.state.sikap, this.state.weekInput, true)
                                                    // this.setModalAbsen(!this.state.modalAbsen)
                                                    // setTimeout(() => {
                                                    //     this.getDataTunggal(this.state.selectedName, this.state.weekInput, true)
                                                    // }, 5000);
                                                    
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
                                        
                                        {/* ======== ADD PROSES FUZZY TUNGGAL ========= */}
                                        {
                                            this.state.flagViewTunggal === false ? null :
                                            <ListView
                                            dataSource={this.state.dataProsesTunggal}
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
                                            this.state.flagTunggal === false ? null :
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
                                            onPress={() => {this.ProsesTunggal(this.state.selectedName, this.state.weekInput)}}
                                            title="Proses Fuzzy!"
                                        >
                                        </Button>
                                        }

                                        {/* ========== END ========== */}
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