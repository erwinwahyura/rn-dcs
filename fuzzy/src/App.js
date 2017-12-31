/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';


import { TabNavigator } from 'react-navigation';

import Login from './screens/Login';
import Home from './screens/Home';
import DataAbsen from './screens/DataAbsen';
import NilaiKaryawan from './screens/NilaiKaryawan';
import AddKaryawan from './screens/AddKaryawan';
import ProcessFuzzy from './screens/ProcessFuzzy';

const fuzzy = TabNavigator({
  // Login: { screen: Login },
  Home: { screen: Home },
  AddKaryawan: { screen: AddKaryawan},
  DataAbsen: { screen: DataAbsen},
  NilaiKaryawan: { screen: NilaiKaryawan},
  ProcessFuzzy: { screen: ProcessFuzzy},
});

AppRegistry.registerComponent('fuzzy', () => fuzzy);
