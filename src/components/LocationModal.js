/* @flow */

import React from 'react';
import {Modal} from 'react-native';

import StartView from './StartView';

const LocationModal = (props) => {
    return (
      <Modal
          style={{flex: 1}}
          animationType={'fade'}
          transparent={false}
          visible={props.visible}
          onRequestClose={props.onRequestClose}
      >
        <StartView
          changePage={props.changePage}
          beginLoad={props.beginLoad}
          endLoad={props.endLoad}
        />
      </Modal>
    );
};

export default LocationModal;
