import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import user from './../user/user';

import StartView from './StartView';
import TenView from './TenView';

export default class FullView extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.areaContainer}>
          <Text style={styles.area}>
              HEllo HELO!
          </Text>
        </View>
        <View style={styles.weatherContainer}>

        </View>
      </View>
    );
  };

};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  areaContainer: {
    flex: 1,
    flexWrap: 'nowrap'
  },
  weatherContainer: {

  },
  area: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});
