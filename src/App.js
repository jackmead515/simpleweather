import React from 'react';
import { View, StyleSheet, DrawerLayoutAndroid, Modal, Text} from 'react-native';

import {fetchLocationObj, locations} from './user/user';
import {fetchCurrentDayForecast} from './util/weather';

import StartView from './components/StartView';
import FullView from './components/FullView';
import TenView from './components/TenView';
import ErrorView from './components/ErrorView';
import Menu from './components/Menu';
import SideMenuWrapper from './components/SideMenuWrapper';
import Spinner from './components/Spinner';
import LocationModal from './components/LocationModal';

export default class App extends React.Component {
  /**
    View:
      0 = <StartView />
      1 = <FullView />
      2 = <TenView />
      3 = <ErrorView />

    Weather:
      Usually is the requested location's weather to display.
      Can also be error message passed into <ErrorView />
  */

  state = {
    'view': 0,
    'weather': {},
    'location': {},
    'spinner': 0,
    'modalVisible': false
  }

  componentWillMount() {
    locations().then((obj) => {
      if(obj.locations.length > 0) {
        let zip = obj.locations[0];
          this.setState({'spinner': 1});
        fetchCurrentDayForecast(zip).then((weather) => {
          fetchLocationObj(zip).then((location) => {
              this.setState({'view': 1, 'location': location, 'weather': weather, 'spinner': 0});
          }).catch((err) => {
            //TODO Pass in error
              this.setState({'view': 3, 'spinner': 0, 'weather': err});
          });
        }).catch((err) => {
          //TODO Pass in error
          this.setState({'view': 3, 'spinner': 0, 'weather': err});
        });
      } else {
        // When user has no saved locations
        this.setState({'view': 0});
      }
    }).catch((err) => {
      //TODO pass in error
      this.setState({'view': 3, 'weather': err});
    });
  };

  openSideMenu() {
    this.sidemenu.openDrawer();
  };

  closeSideMenu() {
    this.sidemenu.closeDrawer();
  };

  closeModal() {
    this.setState({'modalVisible': false});
  };

  openModal() {
    this.setState({'modalVisible': true});
  };

  changePage(page, weather, location) {
      this.setState({'view': page, 'location': location, 'weather': weather, 'spinner': 0});
  };

  beginLoad() {
    this.setState({'spinner': 1});
  };

  endLoad() {
    this.setState({'spinner': 0});
  };

  render() {
    let pageView = (
      <StartView
        beginLoad={() => this.beginLoad()}
        endLoad={() => this.endLoad()}
        changePage={(p, w, l) => this.changePage(p, w, l)}
      />
    );

    switch(this.state.view) {
      case 0:
        break;
      case 1:
        pageView = (
          <FullView
            weather={this.state.weather}
            location={this.state.location}
            onPressPlus={this.openModal.bind(this)}
            beginLoad={() => this.beginLoad()}
            endLoad={() => this.endLoad()}
            changePage={(p, w, l) => this.changePage(p, w, l)}
          />
        );
        break;
      case 2:
        pageView = (
          <TenView
            weather={this.state.weather}
            location={this.state.location}
            beginLoad={() => this.beginLoad()}
            endLoad={() => this.endLoad()}
            changePage={(p, w, l) => this.changePage(p, w, l)}
          />
        );
        break;
      case 3:
        pageView = (
          <ErrorView error={this.state.weather} />
        );
        console.log(this.state.weather); // For Developer Debugging
        break;
      default:
        break;
    }

    if(this.state.spinner === 1) {
      pageView = <Spinner size={'large'} />
    }

    return (
      <SideMenuWrapper
        reference={(_sidemenu) => this.sidemenu = _sidemenu}
        beginLoad={() => this.beginLoad()}
        endLoad={() => this.endLoad()}
        changePage={(p, w, l) => this.changePage(p, w, l)}
        closeSideMenu={this.closeSideMenu.bind(this)}
      >
        <View style={styles.container}>
          <Menu
            onPressHam={this.openSideMenu.bind(this)}
            onPressPlus={this.openModal.bind(this)}
          />
          <LocationModal
              visible={this.state.modalVisible}
              onRequestClose={this.closeModal.bind(this)}
              beginLoad={() => {
                this.beginLoad();
                this.closeModal();
              }}
              endLoad={() => this.endLoad()}
              changePage={(p, w, l) => this.changePage(p, w, l)}
           />

          {pageView}

        </View>
      </SideMenuWrapper>
    );
  };
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1
    }
});
