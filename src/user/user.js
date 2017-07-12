import rnfs from 'react-native-fs';

const userDataPath = '/' + rnfs.DocumentDirectoryPath + '/user_data.json';
const userDataSrcPath = './user_data.json';
/*var RNFS = require('react-native-fs');
 // create a path you want to write to
 var path = RNFS.DocumentDirectoryPath + '/test.txt';

// write the file
RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
.then((success) => {
 console.log('FILE WRITTEN!');
})
.catch((err) => {
 console.log(err.message);
});*/

const locations = () => {
  let tmp = {
    'locations': [
      {
        'zip': '50010'
      }
    ]
  };

  console.log(userDataPath);

  return new Promise((resolve, reject) => {
    rnfs.exists(userDataPath).then((exts) => {
      if(!exts) {
        rnfs.writeFile(userDataPath, tmp).then(() => {
          rnfs.readFile(userDataPath).then((data) => {
            let obj = JSON.stringify(data);
            resolve(obj.locations);
          }).catch((err) => {
            reject('File created. Could not read from file');
          });
        }).catch((err) => {
          reject('Could not create file');
        });
      } else {
        rnfs.readFile(userDataPath).then((data) => {
          let obj = JSON.stringify(data);
          resolve(obj.locations);
        }).catch((err) => {
          reject('File exists, could not read file');
        });
      }
    }).catch((err) => {
      reject('Could not find file');
    });
  });
};

const saveZip = (zip) => {
  return new Promise((resolve, reject) => {
    if(zip) {
        let arr = locations();
        arr.push(zip);
        rnfs.writeFile(userDataPath, arr);
        resolve();
    }
    reject();
  });
};

const deleteZip = (zip) => {
  return new Promise((resolve, reject) => {
    if(zip) {
      let arr = locations();
      if(arr.indexOf(zip) > -1) {
        arr.splice(arr.indexOf(zip), 1);
        rnfs.writeFile(userDataPath, arr);
        resolve();
      } else {
        reject(); //TODO
      }
    }
    reject(); //TODO
  });
};

export {locations, saveZip, deleteZip};
