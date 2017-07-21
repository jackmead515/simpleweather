/* @flow */

import React, { Component } from 'react';
import {DrawerLayoutAndroid} from 'react-native';

import {locations, fetchLocationObj, deleteZip} from './../user/user';
import {fetchCurrentDayForecast} from './../util/weather';

import SideMenu from './SideMenu';
import SavedLocation from './SavedLocation';

export default class SideMenuWrapper extends Component {

  state = {
    'locations': []
  }

  componentWillMount() {
    this.fetchLocations();
  };

  fetchLocations() {
    locations().then((obj) => {
      let locs = [];
      obj.locations.map((zip) => {
        this.generateJSXAreas(zip, locs);
      });
    }).catch((err) => {
      // Failed to fetch side menu locations
    });
  };

  generateJSXAreas(zip, locs) {
    fetchLocationObj(zip).then((obj) => {
      let jsk = (
        <SavedLocation
          key={zip}
          location={obj}
          onPressTrash={() => this.deleteLocation(obj)}
          onPressArea={() => {
            this.props.beginLoad();
            this.props.closeSideMenu();
            fetchCurrentDayForecast(zip).then((weather) => {
              fetchLocationObj(zip).then((obj) => {
                this.props.changePage(1, weather, obj);
              }).catch((err) => {
                this.props.endLoad();
                this.props.changePage(3, err);
                console.log(err);
              });
            }).catch((err) => {
              this.props.endLoad();
              this.props.changePage(3, err);
            });
          }}
        />
      );
      locs.push(jsk);
      this.setState({'locations': locs});
    }).catch((err) => {
      this.props.changePage(3, err);
    });
  };

  deleteLocation(obj) {
    let arr = this.state.locations.filter((loc) => {
      return loc.props.location.zip !== obj.zip;
    });
    this.setState({'locations': arr});
    deleteZip(obj.zip).then(() => {
      //TODO
    }).catch((err) => {
      //TODO
    });
  };

  renderLocations() {
      return this.state.locations.map((loc) => loc);
  };

  render() {
    return (
      <DrawerLayoutAndroid
        ref={this.props.reference}
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        onDrawerClose={() => this.fetchLocations()}
        renderNavigationView={() => {
          return (
            <SideMenu
              renderLocations={() => this.renderLocations()}
            />
          );
        }}
      >
        {this.props.children}
      </DrawerLayoutAndroid>
    );
  };
};
