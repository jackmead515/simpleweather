import React from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';

import {saveZip} from './../user/user';
import {fetchTenDayForecast} from './../util/weather';

import Button from './Button';
import Spinner from './Spinner';

export default class StartView extends React.Component {

  state = {
    'spinner': 0,
    'zip': undefined,
  }

  enterZip() {
    this.setState({'spinner': 1});

    fetchTenDayForecast(this.state.zip).then((data) => {
      this.setState({'spinner': 0});

      saveZip(this.state.zip).then(() => {
      }).catch((err) => {
        console.log(err);
      })

      this.props.changePage(2, data, this.state.zip);
    }).catch((err) => {

      this.setState({'spinner': 0});

      console.log(err);
    });
  }

  renderInput() {
    if(this.state.spinner === 0) {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.text}>
            What's the weather in...
          </Text>
          <TextInput
            style={styles.input}
            placeholder={'Zip Code'}
            onChangeText={zip => this.setState({'zip': zip})}
          />
          <View style={styles.buttonContainer}>
            <Button onPress={() => this.enterZip()}>
              Go!
            </Button>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.inputContainer}>
          <Spinner size={'large'} />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('./../img/earth.png')}
          />
        </View>

        {this.renderInput()}

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start'
  },
  buttonContainer: {
    marginTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    height: 40
  },
  inputContainer: {
    marginRight: 10,
    marginLeft: 10,
    flex: 2
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
    marginTop: 20
  },
  image: {
    maxHeight: 200,
    maxWidth: 200,
    flex: 1
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    marginLeft: 40,
    marginRight: 40
  }
});
