/* @flow weak */

import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const ErrorView = (props) => (
  <View style={styles.container}>
    <Text>An Error Occured</Text>
    <Text>{props.error}</Text>
  </View>
);

export default ErrorView;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
