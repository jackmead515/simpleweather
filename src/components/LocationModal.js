/* @flow */

import React, { Component } from 'react';
import { View, Text, Modal} from 'react-native';

import StartView from './StartView';

export default class LocationModal extends Component {
  render() {
    return (
      <Modal
          style={{flex: 1}}
          animationType={'fade'}
          transparent={false}
          visible={this.props.visible}
          onRequestClose={this.props.onRequestClose}
      >
        <StartView
          changePage={this.props.changePage}
          beginLoad={this.props.beginLoad}
          endLoad={this.props.endLoad}
        />
      </Modal>
    );
  }
};
