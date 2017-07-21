import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import moment from 'moment';

const CompactWeather = (props) => {
  let weather = props.weather;
  let date = parseInt(weather.dt + '000');
  let description = weather.weather[0].description;
  let temp = weather.temp.day;
  let deg = '\u00B0';

  return (
    <View style={styles.container}>
        <View>
          <Text style={styles.date}>
            {moment.utc(date).format('MMMM Do')}
          </Text>
          <Text style={styles.description}>
            {description}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: props.image}}
          />
        </View>
        <View style={styles.tempContainer}>
          <Text style={styles.temp}>
            {temp} {deg}F
          </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: 'white',
    margin: 5,
    padding: 5,
    backgroundColor: '#e6f0ff'
  },
  descriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1
  },
  tempContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  temp: {
    fontSize: 20,
    color: '#4d4d4d'
  },
  image: {
    height: 70,
    width: 70
  },
  date: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#4d4d4d'
  },
  description: {
    marginLeft: 10,
    fontSize: 15,
    color: '#4d4d4d'
  }
});

export default CompactWeather;
