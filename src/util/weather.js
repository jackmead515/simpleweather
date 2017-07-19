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
    fetch(request, {timeout: 20})
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

export {fetchTenDayForecast, fetchCurrentDayForecast, fetchIcon};
