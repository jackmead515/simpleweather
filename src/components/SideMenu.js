/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler} from 'react-native';

export default class SideMenu extends Component {

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
            onPress={() => {}}
            style={styles.sideButton}
          >
            <Text>
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => BackHandler.exitApp()}
            style={styles.sideButton}
          >
            <Text>
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
    flex: 1
  },
  locationsContainer: {
    maxHeight: 350,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    margin: 5
  },
  title: {
    fontSize: 30,
    alignSelf: 'center'
  },
  extra: {
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  sideButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    margin: 5
  }
});
