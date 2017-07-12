import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import user from './../user/user';
import MenuIcon from './MenuIcon';
import SideMenu from './SideMenu';

export default class Menu extends React.Component {

  render() {

    let hamIcon = (
      <MenuIcon
        style={styles.menuIcon}
        onPress={() => {}}
        source={require('./../img/menu.png')}
      />
    );

    return (
      <View style={styles.container}>
        <MenuIcon
          style={styles.menuIcon}
          onPress={this.props.onPressHam}
          source={require('./../img/menu.png')}
        />
        <Text style={styles.logo}>Simple Weather</Text>
        <MenuIcon
          style={styles.menuIcon}
          onPress={() => {}}
          source={require('./../img/add.png')}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 3},
    backgroundColor: '#66a3ff',
    justifyContent: 'space-between'
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  menuIcon: {
    height: 20,
    width: 20,
    margin: 10
  }
});
