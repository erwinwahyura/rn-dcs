/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';


import { TabNavigator } from 'react-navigation';

import Home from './screens/Home';
import InputNilai from './screens/InputNilai';
import AddKaryawan from './screens/AddKaryawan';
import Report from './screens/Report';

const fuzzy = TabNavigator({
  Home: { screen: Home },
  AddKaryawan: { screen: AddKaryawan},
  InputNilai: { screen: InputNilai},
  Report: { screen: Report},
});

AppRegistry.registerComponent('fuzzy', () => fuzzy);
