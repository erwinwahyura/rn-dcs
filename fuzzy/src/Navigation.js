import React, { Component } from 'React';
import { Provider } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import MainScreenNavigator from './config/router';

class Navigator extends React.Component {
  render() {
    return (
      <MainScreenNavigator/>
    );
  }
}

export default Navigator;
