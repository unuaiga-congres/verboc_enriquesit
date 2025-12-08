// API/VotzApi.js

const API_TOKEN = "9c0d1ee261c49c34a12b2713e7e370d8";



export function getPhonetFromApi (text, variety) {
  const url = 'https://api.locongres.org/fonoc.php?key=' + API_TOKEN + '&var=' + variety + '&content=' + text
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}



export function getAudioFromApi (text, variety) {
  const url = 'https://votz.eu/tts_api/'
  const body = {
    text: text,
    language: variety,
    apiKey: '631dc9006a044cb682f1c00648cd2141',
    mode: 'url'
  };
  var formBody = [];
  for (var key in body) {
     var encodedKey = encodeURIComponent(key);
     var encodedValue = encodeURIComponent(body[key]);
     formBody.push(encodedKey + '=' + encodedValue);
   }
   formBody = formBody.join('&');
  return fetch(url, {
    method:'POST',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody

  })
    .then((response) => response.text())
    .catch((error) => console.error(error))
}



export function getAudioFromApiFile (text, variety) {
  const url = 'https://votz.eu/tts_api/'
  const body = {
    text: text,
    language: variety,
    apiKey: '631dc9006a044cb682f1c00648cd2141',
    mode: 'file'
  };
  var formBody = [];
  for (var key in body) {
     var encodedKey = encodeURIComponent(key);
     var encodedValue = encodeURIComponent(body[key]);
     formBody.push(encodedKey + '=' + encodedValue);
   }
   formBody = formBody.join('&');
  return fetch(url, {
    method:'POST',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody

  })
    .then((response) => response.text())
    .catch((error) => console.error(error))
}
