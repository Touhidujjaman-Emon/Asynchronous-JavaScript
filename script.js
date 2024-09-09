'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// Old way of Ajax call
const countryData = function(country){
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
 countryData('USA');