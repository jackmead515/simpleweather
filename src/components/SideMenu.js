/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';

import {locations, deleteZip} from './../user/user';

export default class SideMenu extends Component {

  renderLocations() {
    locations().then((locations) => {
      return locations.map((l) => {
        return (
          <Text>
            {l.zip}
          </Text>
        );
      });
    }).catch((err) => {
      console.log(err);
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Locations
        </Text>
        <ScrollView style={styles.locationsContainer}>
          {this.renderLocations()}
        </ScrollView>
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
  text: {
    fontSize: 40,
    alignSelf: 'center'
  }
});
