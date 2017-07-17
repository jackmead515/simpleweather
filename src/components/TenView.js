import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import CompactWeather from './CompactWeather';
import {fetchIcon} from './../util/weather';
import {fetchLocationObj} from './../user/user';

export default class TenView extends React.Component {

  renderWeather() {
    let obj = this.props.weather;

    return obj.list.map((day) => {
      return (
        <CompactWeather
          key={day.dt}
          weather={day}
          image={fetchIcon(day.weather[0].icon)}
        />
      );
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.areaContainer}>
          <Text style={styles.area}>
            {this.props.weather.city.name}, {this.props.weather.city.country}
          </Text>
        </View>
        {this.renderWeather()}
      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  container: {

  },
  areaContainer: {
    flex: 1,
    flexWrap: 'nowrap'
  },
  area: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});
