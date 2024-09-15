'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// Old way of Ajax call
/*const countryData = function(country){
const request = new XMLHttpRequest();
 request.open('GET',`https://restcountries.com/v3.1/name/${country}`);
 request.send();

 request.addEventListener('load' , function(){
    const [data] = JSON.parse(this.responseText)
    console.log(data);

    const language = Object.values(data.languages)[0]
    const {name:moneyName , symbol} = Object.values(data.currencies)[0]
    
    
    const html = `
    
     <article class="country">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region"${data.region}</h4>
            <p class="country__row"><span>👫</span>${+(data.population/1000000).toFixed(1)}M People</p>
            <p class="country__row"><span>🗣️</span>${language}</p>
            <p class="country__row"><span>💰</span>${moneyName}</p>
          </div>
        </article>

    `;
    countriesContainer.insertAdjacentHTML('beforeend',html);
    countriesContainer.style.opacity = 1;
 })}

 countryData('bangladesh');
 countryData('pakistan');
 countryData('USA');*/

const renderCountry = function (data, className = '') {
  //Getting the language dynamically
  const language =
    Object.values(data.languages)[0] !== 'English'
      ? Object.values(data.languages)[0]
      : Object.values(data.languages)[1] || Object.values(data.languages)[0];

  const { name: moneyName, symbol } = Object.values(data.currencies)[0];
  const html = `
      
       <article class="country ${className}" >
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region"${data.region}</h4>
              <p class="country__row"><span>👫</span>${+(
                data.population / 1000000
              ).toFixed(1)}M People</p>
              <p class="country__row"><span>🗣️</span>${language}</p>
              <p class="country__row"><span>💰</span>${moneyName}</p>
            </div>
          </article>
  
      `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};
const getJSON = function (url, msg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${msg}:${response.status}`);
    return response.json();
  });
};

/*const getCountryAndNeighbour = function (country) {
  //  AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country
    const neighbour = data.borders?.[0];

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('bangladesh');
getCountryAndNeighbour('usa');
*/

// new way of AJAX call
// fetch(`https://restcountries.com/v3.1/name/${country}`)

// const getCountryData = function (country) {
//   //country 1

//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) throw new Error('No neighbour found');
//       //country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.log(`${err}`);
//       renderError(`something went wrong ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('bangladesh');
// });

/* Coding Challenge #1

In this challenge you will build a function 'whereAmI' which renders a country 
only based on GPS coordinates. For that, you will use a second API to geocode 
coordinates. So in this challenge, you’ll use an API on your own for the first time �
Your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') 
and a longitude value ('lng') (these are GPS coordinates, examples are in test 
data below).

2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means 
to convert coordinates to a meaningful location, like a city and country name. 
Use this API to do reverse geocoding: https://geoapify.com. The AJAX call 
will be done to a URL with this format: 
https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=fd48a5c7752c432e8ac325c8b713d7fb. Use the fetch API and 
promises to get the data. Do not use the 'getJSON' function we created, that 
is cheating �

3. Once you have the data, take a look at it in the console to see all the attributes 
that you received about the provided location. Then, using this data, log a 
message like this to the console: “You are in Berlin, Germany”

4. Chain a .catch method to the end of the promise chain and log errors to the 
console

5. If use 0,0 cordinates, youwill get this error with code 404. So create an error to reject the promise yourself, with a meaningful error message


PART 2
6. Now it's time to use the received data to render a country. So take the relevant 
attribute from the geocoding API result, and plug it into the countries API that 
we have been using.
7. Render the country and catch any errors, just like we have done in the last 
lecture (you can even copy this code, no need to type the same code)

Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474
*/

const whereAmI = function (lat, lang) {
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lang}&apiKey=fd48a5c7752c432e8ac325c8b713d7fb`
  )
    .then(response => response.json())
    .then(data => {
      const countryName = data.features[0].properties.country;
      if (!countryName) throw new Error(`no country with this ${lat},${lang} coords`);
      return fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.log(`${err.message}`);
    });
};

whereAmI(-33.933, 18.474);

// Building a promise
const lotteryPromise = new Promise(function (resolve, reject) {

  console.log('Lottery draw happenig')
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('you win')
    }else{
     reject(new Error('you lost your money'))
   }
   
  },2000)
})

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err))

// Promisifying setTimeout Function

const wait = function (seconds) {

  return new Promise(function(resolve){
    setTimeout(resolve , seconds*1000)
  })
  
}

wait(2).then(() => {
  console.log('I waited for 2 seconds') 
  return wait(1)
}).then(()=> console.log('I waited for 1 second'))