import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import moment from 'moment';

import {fetchImage} from './../util/weather';

import StartView from './StartView';
import TenView from './TenView';

export default class FullView extends React.Component {

  render() {

    let weather = this.props.weather;
    let location = this.props.location;
    let date = parseInt(weather.dt + '000');
    let uri = './../img/' + fetchImage(weather.weather[0].icon) + '.png';
    let uArrow = '\u2191';
    let dArrow = '\u2193';

    return (
      <View style={styles.container}>
        <View style={styles.areaContainer}>
          <Text style={styles.area}>
            {weather.name}, {weather.sys.country} {location.zip}
          </Text>
        </View>
        <View style={styles.timeContainer}>
            <Text style={{fontWeight: 'bold'}}>
              {moment.utc(date).format('MMMM Do, YYYY')}
            </Text>
        </View>
        <View style={styles.weatherContainer}>
          <View style={styles.mainWeatherContainer}>
            <View style={styles.tempContainer}>
              <Text style={styles.mainTemp}>
                {weather.main.temp} F
              </Text>
              <View style={styles.lowhighTemp}>
                <Text style={styles.highTemp}>
                  {weather.main.temp_max} F
                </Text>
                <Text style={styles.lowTemp}>
                  {weather.main.temp_min} F
                </Text>
              </View>
              <Text style={styles.description}>
                {weather.weather[0].description}
              </Text>
            </View>
            <Image
              style={styles.image}
              source={require('./../img/sun.png')}
            />
          </View>

        </View>
      </View>
    );
  };

};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around'
  },
  areaContainer: {
    flexWrap: 'nowrap'
  },
  weatherContainer: {

  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  mainWeatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tempContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  mainTemp: {
    fontSize: 30
  },
  lowhighTemp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  highTemp: {
    margin: 10,
    fontWeight: 'bold',
    color: '#ff1a1a'
  },
  lowTemp: {
    margin: 10,
    fontWeight: 'bold',
    color: '#1a1aff'
  },
  description: {
    color: 'black',
    fontWeight: 'bold'
  },
  area: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  image: {
    height: 170,
    width: 170
  }
});
