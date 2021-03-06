import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import {fetchIcon} from './../util/weather';
import {fetchLocationObj} from './../user/user';

import CompactWeather from './CompactWeather';

export default class TenView extends React.Component {

  renderWeather() {
    let weather = this.props.weather;

    return weather.list.map((day) => {
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
      <View>
        <View style={styles.areaContainer}>
          <Text style={styles.area}>
            {this.props.weather.city.name}, {this.props.weather.city.country} {this.props.location.zip}
          </Text>
        </View>
        <ScrollView>
          {this.renderWeather()}
        </ScrollView>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  areaContainer: {
    padding: 10,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  area: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#4d4d4d'
  }
});
