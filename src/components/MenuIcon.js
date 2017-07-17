/* @flow weak */

import React from 'react';
import {View, Image, StyleSheet, TouchableHighlight} from 'react-native';

const MenuIcon = (props) => (
    <TouchableHighlight
        onPress={props.onPress}
        activeOpacity={0.3}
        underlayColor={'#4d94ff'}
    >
      <Image
        style={styles.menuIcon}
        source={props.source}
      />
    </TouchableHighlight>
);

export default MenuIcon;

const styles = StyleSheet.create({
  menuIcon: {
    height: 20,
    width: 20,
    margin: 10
  }
});
