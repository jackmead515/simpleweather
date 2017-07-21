/* @flow weak */

import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

const MenuIcon = (props) => (
    <TouchableOpacity onPress={props.onPress}>
      <Image
        style={styles.menuIcon}
        source={props.source}
      />
    </TouchableOpacity>
);

export default MenuIcon;

const styles = StyleSheet.create({
  menuIcon: {
    height: 20,
    width: 20,
    margin: 10
  }
});
