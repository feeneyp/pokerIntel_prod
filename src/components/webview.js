import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'http://maps.google.be'}}
        style={{marginTop: 20}}
      />
    );
  }
}
