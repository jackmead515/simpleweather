import {AsyncStorage} from 'react-native';

const locations = () => {
  let userLocations = {
    'locations': []
  };

  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('user_locations').then((obj) => {
      if(obj === null || obj === undefined) {
        AsyncStorage.setItem('user_locations', userLocations).then(() => {
            AsyncStorage.getItem('user_locations').then((obj) => {
              if(obj === null || obj === undefined) {
                reject('Could not fetch user_locations');
              } else {
                resolve(obj.locations);
              }
            }).catch((err) => {
              reject('Could not fetch user_locations');
            });
        }).catch((err) => {
          reject('Could not fetch user_locations');
        });
      } else {
        resolve(obj.locations);
      }
    }).catch((err) => {
      reject('Could not fetch user_locations');
    });
  });
};

const saveZip = (zip) => {
  return new Promise((resolve, reject) => {
    locations().then((locations) => {
      locations.push({'zip': zip});

      let obj = {locations};

      AsyncStorage.setItem('user_locations', obj).then(() => {
        resolve();
      }).catch((err) => {
        reject('Could not save location');
      });

    }).catch((err) => {
      reject('Could not fetch locations');
    });
  });

};

const deleteZip = (zip) => {

};

export {locations, saveZip, deleteZip};
