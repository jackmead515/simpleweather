/* @flow */

import React, { Component } from 'react';
import { View,Text,StyleSheet,TextInput} from 'react-native';

import Button from './Button';

import {fetchCurrentDayForecast} from './../util/weather';
import {fetchLocationObj, saveZip} from './../user/user';


export default class AddLocationForm extends Component {

  state = {
    zip: ''
  }

  enterZip() {
    this.props.beginLoad();
    fetchCurrentDayForecast(this.state.zip).then((weather) => {
        fetchLocationObj(this.state.zip).then((obj) => {
            saveZip(this.state.zip).then(() => {
              this.props.changePage(1, weather, obj);
            }).catch((err) => {
              this.props.changePage(1, weather, obj);
            });
        }).catch((err) => {
          this.props.endLoad();
          this.props.changePage(3, err);
        });
    }).catch((err) => {
      this.props.endLoad();
      this.props.changePage(3, err);
    });
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.text}>
          What's the weather in...
        </Text>
        <TextInput
          style={styles.input}
          placeholder={'Zip Code'}
          onChangeText={zip => this.setState({'zip': zip})}
          keyboardType={'numeric'}
        />
        <Button onPress={() => this.enterZip()}>
            Go!
        </Button>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4d4d4d'
  }
});
