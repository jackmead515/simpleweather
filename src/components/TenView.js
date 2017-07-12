import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import CompactWeather from './CompactWeather';
import {fetchIcon, fetchLocation} from './../util/weather';

export default class TenView extends React.Component {

  state = {
    'area': ''
  }

  renderWeather() {
    let obj = this.props.weatherData;

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

  renderArea() {
    let area = this.props.weatherData.city.name + ',' + this.props.weatherData.city.country;

    fetchLocation(this.props.zip).then((json) => {
      this.setState({'area': json.formatted_address});
    }).catch((err) => {
      this.setState({'area': area});
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.areaContainer}>
          <Text style={styles.area}>
            {this.state.area}
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
    justifyContent: 'space-around'
  }
});
