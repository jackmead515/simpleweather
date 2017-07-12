import axios from 'axios';
const appid = '03a87a52a0d126f10d5a0ba7215ffad6';

import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';

const fetchTenDayForecast = (zip) => {
  return new Promise((resolve, reject) => {
    let request = 'http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&zip='+zip+',us&cnt=10&appid='+appid;
    fetch(request)
      .then((res) => res.json())
      .then((rjson) => {
        if(rjson.cod === '200'){
          resolve(rjson);
        } else {
            reject(rjson);
        }
      })
      .catch((err) => {
        reject(err);
      })
  });
};

const fetchCurrentDayForecast = (zip) => {
  return new Promise((resolve, reject) => {
    axios.get('http://api.openweathermap.org/data/2.5/weather?units=imperial&zip='+zip+',us&appid='+appid)
    .then((res) => {
      console.log(res); //TODO
      resolve(res);
    }).catch((err) => {
      console.log(err); //TODO
      reject(err);
    });
  });
};

const fetchIcon = (icon) => {
    return 'http://openweathermap.org/img/w/'+icon+'.png';
};

const fetchLocation = (zip) => {
  return new Promise((resolve, reject) => {
    let request = 'http://maps.googleapis.com/maps/api/geocode/json?address='+zip;
    fetch(request)
    .then((res) => res.json())
    .then((rjson) => {
      resolve(rjson);
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export {fetchTenDayForecast, fetchCurrentDayForecast, fetchIcon, fetchLocation};
