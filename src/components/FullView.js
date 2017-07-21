import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';

import {fetchTenDayForecast} from './../util/weather';
import {fetchLocationObj} from './../user/user';

import Button from './Button';

export default class FullView extends React.Component {

  state = {
    'date': 0,
    'image': ''
  };

  componentWillMount() {
    let weather = this.props.weather;
    this.setState({'date': parseInt(weather.dt + '000')});
    this.fetchImage(weather.weather[0].icon);
  };

  fetchWeather() {
        this.props.beginLoad();
        fetchTenDayForecast(this.props.location.zip).then((weather) => {
          fetchLocationObj(this.props.location.zip).then((location) => {
              this.props.changePage(2, weather, location);
          }).catch((err) => {
            this.props.endLoad();
            this.props.changePage(3, err);
          });
        }).catch((err) => {
          this.props.endLoad();
          this.props.changePage(3, err);
        });
  };

  fetchImage(icon) {
      let image = require('./../img/earth.png');
      icon = icon.substring(0, 2);
      switch(icon) {
        case '01':
          image = require('./../img/sun.png');
          break;
        case '02':
          image = require('./../img/partsun.png');
          break;
        case '03':
          image = require('./../img/cloud.png');
          break;
        case '04':
          image = require('./../img/cloud.png');
          break;
        case '09':
          image = require('./../img/drop.png');
          break;
        case '10':
          image = require('./../img/drop.png');
          break;
        case '11':
          image = require('./../img/drop.png');
          break;
        case '13':
          image = require('./../img/snowflake.png');
          break;
        case '50':
          image = require('./../img/fog.png');
          break;
        default:
          break;
      }
      this.setState({'image': image});
  };

  render() {

    let weather = this.props.weather;
    let location = this.props.location;
    let deg = '\u00B0';
    let up = '\u2191';
    let down = '\u2193';

    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.areaContainer}>
            <Text style={styles.area}>
              {weather.name}, {weather.sys.country} {location.zip}
            </Text>
          </View>
          <View style={styles.timeContainer}>
              <Text style={styles.time}>
                {moment.utc(this.state.date).format('MMMM Do, YYYY')}
              </Text>
          </View>
          <View style={styles.weatherContainer}>
            <View style={styles.mainWeatherContainer}>
              <View style={styles.tempContainer}>
                <Text style={styles.mainTemp}>
                  {weather.main.temp} {deg}F
                </Text>
                <View style={styles.lowhighTemp}>
                  <Text style={styles.highTemp}>
                    {up} {weather.main.temp_max} {deg}F
                  </Text>
                  <Text style={styles.lowTemp}>
                    {down} {weather.main.temp_min} {deg}F
                  </Text>
                </View>
                <Text style={styles.description}>
                  Today: {weather.weather[0].description}
                </Text>
              </View>
              <Image
                style={styles.image}
                source={this.state.image}
              />
            </View>
            <View style={styles.extraWeatherContainer}>
              <Text style={styles.extra}>
                Humidity: {weather.main.humidity}%
              </Text>
              <Text style={styles.extra}>
                Wind Speed: {weather.wind.speed} mph
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => this.fetchWeather()}>
              Ten Day Forecast
            </Button>
          </View>
        </View>
        <View style={styles.addLocationContainer}>
          <TouchableOpacity onPress={this.props.onPressPlus}>
            <Text style={styles.addLocationText}>
              Add Another Location!
            </Text>
          </TouchableOpacity>
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
    padding: 10
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
  extraWeatherContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tempContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    height: 30
  },
  addLocationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 40,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e8e8e8',
    backgroundColor: '#e6f0ff'
  },
  mainTemp: {
    fontSize: 30,
    color: '#4d4d4d'
  },
  lowhighTemp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  highTemp: {
    fontSize: 15,
    margin: 10,
    fontWeight: 'bold',
    color: '#ff1a1a'
  },
  lowTemp: {
    fontSize: 15,
    margin: 10,
    fontWeight: 'bold',
    color: '#1a1aff'
  },
  description: {
    fontWeight: 'bold',
    color: '#4d4d4d'
  },
  area: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#4d4d4d'
  },
  image: {
    height: 170,
    width: 170
  },
  time: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#4d4d4d'
  },
  extra: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#4d4d4d'
  },
  addLocationText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4d4d4d'
  }
});
