const appid = '03a87a52a0d126f10d5a0ba7215ffad6';

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
      });
  });
};

const fetchCurrentDayForecast = (zip) => {
  return new Promise((resolve, reject) => {
    let request = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip='+zip+',us&appid='+appid;
    fetch(request)
        .then((res) => res.json())
        .then((rjson) => {
          if(rjson.cod === 200){
            resolve(rjson);
          } else {
            reject(rjson);
          }
        })
        .catch((err) => {
          reject(err);
        });
  });
};

const fetchIcon = (icon) => {
    return 'http://openweathermap.org/img/w/'+icon+'.png';
};

const fetchImage = (icon) => {
  let image = 'earth';
  icon = icon.substring(0, 2);
  console.log(icon);
  switch(icon) {
    case '01':
      image = 'sun';
      break;
    case '02':
      image = 'partsun';
      break;
    case '03':
      image = 'cloud';
      break;
    case '04':
      image = 'cloud';
      break;
    case '09':
      image = 'drop';
      break;
    case '10':
      image = 'drop';
      break;
    case '11':
      image = 'drop';
      break;
    case '13':
      image = 'snowflake';
      break;
    case '50':
      image = 'fog';
      break;
    default:
      break;
  }

  return image;
};

export {fetchTenDayForecast, fetchCurrentDayForecast, fetchIcon, fetchImage};
