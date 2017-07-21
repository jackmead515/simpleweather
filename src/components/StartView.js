import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import AddLocationForm from './AddLocationForm';

export default class StartView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('./../img/earth.png')}
          />
        </View>
        <View style={styles.inputContainer}>
          <AddLocationForm
            changePage={this.props.changePage}
            beginLoad={this.props.beginLoad}
            endLoad={this.props.endLoad}
          />
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
    marginTop: 20
  },
  inputContainer: {
    padding: 30,
    flex: 2
  },
  image: {
    maxHeight: 200,
    maxWidth: 200,
    flex: 1
  }
});
