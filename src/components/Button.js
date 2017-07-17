import React from 'react';
import {Text, StyleSheet, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#3385ff',
    padding: 7,
    borderRadius: 5,
    maxHeight: 30
  },
  text: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#fff'
  }
});

export default Button;
