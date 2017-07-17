/* @flow weak */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import MenuIcon from './MenuIcon';

const SavedLocation = (props) => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <MenuIcon
            onPress={props.onPressTrash}
            style={styles.image}
            source={require('./../img/waste-bin.png')}
          />
        </View>
        <TouchableOpacity
          onPress={props.onPressArea}
          style={styles.areaContainer}
        >
            <Text>
              {props.location.area}
            </Text>
        </TouchableOpacity>
      </View>
    );
};

export default SavedLocation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    margin: 5
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  areaContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 3
  },
  image: {
    width: 20,
    height: 20
  }
});
