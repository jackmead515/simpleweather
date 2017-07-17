import {AsyncStorage} from 'react-native';

const userLocationsTemp = {'locations': []};

const locations = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('user_locations').then((obj) => {
      if(obj === undefined || obj === null) {
        setLocations(userLocationsTemp).then(() => {
          resolve(userLocationsTemp);
        }).catch((err) => {
          reject(err);
        })
      } else {
        resolve(JSON.parse(obj));
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

const clearLocations = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem('user_locations', JSON.stringify(userLocationsTemp)).then(() => {
      resolve();
    }).catch((err) => {
      reject(err);
    })
  });
};

const setLocations = (obj) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem('user_locations', JSON.stringify(obj)).then(() => {
      resolve();
    }).catch((err) => {
      reject(err);
    })
  });
};

const saveZip = (zip) => {
  return new Promise((resolve, reject) => {
    locations().then((obj) => {

      if(obj.locations.indexOf(zip) === -1) {
        obj.locations.push(zip);

        setLocations(obj).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      } else {
          reject('Location already exists');
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

const fetchLocation = (zip) => {
  return new Promise((resolve, reject) => {
    let request = 'https://maps.googleapis.com/maps/api/geocode/json?address='+zip;
    fetch(request)
    .then((res) => res.json())
    .then((rjson) => {
      resolve(rjson.results[0]);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

const fetchLocationObj = (zip) => {
  return new Promise((resolve, reject) => {
    fetchLocation(zip).then((json) => {
      let obj = {
        'zip': zip,
        'area': json.formatted_address
      };

      resolve(obj);
    }).catch((err) => {
      reject(err);
    });
  });
};

const deleteZip = (zip) => {
  return new Promise((resolve, reject) => {
    locations().then((obj) => {
      let index = obj.locations.indexOf(zip);
      if(index > -1) {
        obj.locations.splice(index ,1);
        setLocations(obj).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      } else {
          reject('Location does not exist');
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

export {locations, saveZip, deleteZip, fetchLocation, fetchLocationObj, clearLocations};
