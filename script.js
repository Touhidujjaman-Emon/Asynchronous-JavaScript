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

const getCountryData = function (country) {
  //country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      //country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0],'neighbour') );
};
getCountryData('bangladesh');
