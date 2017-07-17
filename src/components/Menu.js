import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

import MenuIcon from './MenuIcon';

export default class Menu extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <MenuIcon
          onPress={this.props.onPressHam}
          source={require('./../img/menu.png')}
        />
        <Text style={styles.logo}>Simple Weather</Text>
        <MenuIcon
          onPress={this.props.onPressPlus}
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
    alignSelf: 'center',
    color: 'black'
  }
});
