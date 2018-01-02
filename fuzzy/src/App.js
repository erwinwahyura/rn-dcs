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
import InputNilai from './screens/InputNilai';
import NilaiKaryawan from './screens/NilaiKaryawan';
import AddKaryawan from './screens/AddKaryawan';
import Report from './screens/Report';

const fuzzy = TabNavigator({
  // Login: { screen: Login },
  Home: { screen: Home },
  AddKaryawan: { screen: AddKaryawan},
  InputNilai: { screen: InputNilai},
  Report: { screen: Report},
});

AppRegistry.registerComponent('fuzzy', () => fuzzy);
