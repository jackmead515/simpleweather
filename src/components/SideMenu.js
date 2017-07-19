/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Alert} from 'react-native';
import rnfs from 'react-native-fs';

export default class SideMenu extends Component {

  displayAbout() {
    //rnfs.readFile('./../../package.json'); get version
      Alert.alert(
        'About',
        'Version: 1.0.0\n\nAuthor: Jack Mead\n\nGithub: \nhttps://github.com/jackmead515/simpleweather',
        [
          {text: 'OK', onPress: () => {}},
        ],
        { cancelable: false }
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Locations
        </Text>
        <ScrollView style={styles.locationsContainer}>
            {this.props.renderLocations()}
        </ScrollView>
        <View style={styles.extra}>
          <TouchableOpacity
            onPress={() => this.displayAbout()}
            style={styles.sideButton}
          >
            <Text style={{color: '#4d4d4d'}}>
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => BackHandler.exitApp()}
            style={styles.sideButton}
          >
            <Text style={{color: '#4d4d4d'}}>
              Exit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66A3FF'
  },
  locationsContainer: {
    maxHeight: 350,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    margin: 5,
    backgroundColor: '#e6f0ff',
    borderRadius: 5
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'black'
  },
  extra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: 20
  },
  sideButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    margin: 5,
    backgroundColor: '#e6f0ff'
  }
});
