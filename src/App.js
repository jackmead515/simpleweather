import React from 'react';
import { View, StyleSheet, DrawerLayoutAndroid } from 'react-native';

import {locations} from './user/user';

import StartView from './components/StartView';
import FullView from './components/FullView';
import TenView from './components/TenView';
import Menu from './components/Menu';
import SideMenu from './components/SideMenu';

export default class App extends React.Component {
  /**
    View:
      0 = <StartView />
      1 = <FullView />
      2 = <TenView />
  */
  state = {
    'view': 0,
    'data': {}
  }

  componentWillMount() {
    locations().then((data) => {
      if(locations.length > 0) {

        //TODO
        // If they have saved locations,
        // get the first location and
        // its weather data.

        this.setState({'view': 1});
      } else {
        this.setState({'view': 0});
      }
    }).catch((err) => {
      console.log(err);
      this.setState({'view': 0});
    });
  };

  openSideMenu() {
    this.sidemenu.openDrawer();
  };

  render() {
    let jsx = <StartView />
    switch(this.state.view) {
      case 0:
          jsx = (
            <StartView
              changePage={(page, data, zip) => {
                this.setState({'view': page, 'data': data, 'zip': zip});
              }}
            />
          );
        break;
      case 1:
          jsx = <FullView />
        break;
      case 2:
          jsx = <TenView weatherData={this.state.data} zip={this.state.zip} />
        break;
      default:
        jsx = (
          <StartView
            changePage={(page, data) => {
              this.setState({'view': page, 'data': data});
            }}
          />
        );
        break;
    }

    return (
       <DrawerLayoutAndroid
          ref={(_sidemenu) => this.sidemenu = _sidemenu}
          drawerWidth={200}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => <SideMenu />}>
             <View style={styles.container}>
               <Menu onPressHam={this.openSideMenu.bind(this)}/>
               {jsx}
             </View>
       </DrawerLayoutAndroid>

    );
  };
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1
    }
});
