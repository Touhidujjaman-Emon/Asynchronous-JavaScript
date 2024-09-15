# Asynchronous JavaScript

## What is synchronous

- Executing code line by line means **synchronous**
- Each line of code **wait** for previous line to finish
- Long running code **block** execution of the next code
- Like **alert** notification . If I dont click **Ok** it wont execute next line of code.suppose i dont press ok for 5 sec then next line of code wont run for 5 sec.

```js
console.log('Line 1');
alert('Click OK to continue');
console.log('Line 3');
```

## What is Asynchronous

- Executing code without waiting for previous line to finish .Coordinating behavior of program over a period of time **(not occuring at the same time)**
- Asynchronous is **non-blocking** .It wont block another line of code. It will run on the **backround**
- Execution of next line of code **does'nt** wait for asynchronous code
- For example callback function with **timer** is asynchronous.

```js
const text = document.querySelector('p');
setTimeout(function () {
  text.textContent = 'Hi , Iam Emon';
}, 5000);

text.style.color = 'red';
```

- setTimeout function will be running on the background without blocking any code.And callback will run after **timer(5sec)**.Though it **isn't** the last line of code but it will execute after all other line of code in this example.That basically means an action was deferred into the future in order to make the code **non-blocking**

**note** : callback function and addEventListener alone do **NOT** make code asynchronous.

- For example:

```js
const img = document.querySelector('.dog');
img.src = 'dog.jpg';
img.addEventListener('load', function () {
  img.classList.add('fadeIn');
});
p.style.width = '300px';
```

- Here **img.src** is asynchronous . Because it will load the **src** in the **background** without blocking any code and the event listener will listen for **load** after the img is fully loaded and then the **call back function** will be called. So the callback funtion alone is'nt making the code asynchronous but **img.src** is asynchronous.

```js
const btn = document.querySelector('.btn');
btn.addEventListener('click', () => console.log('hello'));
```

- In this example the event listener just **waiting** for a button click event and wont doing anything on the **background** so it isnt asynchronous.

## AJAX - Asynchronous javaScript and XML

- Allow us to communicate with remote web servers in an asynchronous way . With AJAX calls we can request data from web servers dynamically.
- With out reloding the page we can use that data dynamically

## API - Application Programing Interface

- Piece of software that can be used by another piece of software, In order to allow **applications to talk to each other**
- online/web API's : Application running on server , that receives resquest for data and send data as response
- Most API's use JSON data formate nowadays . When tiggers used to smoke (long time ago) , people used to use XML formate to transmit data on the web . Thats where the name AJAX came from. and it isnt changed till now.

## Old way of doing AJAX call

```js
const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v3.1/name/bangladesh');
request.send();

request.addEventListener('load', function () {
  const [data] = JSON.parse(this.responseText);
  console.log(data);
});
```

- Calling open('method' , 'URL' , async) **Initializing** or **Opening** the request to retrive the data from url.
- Calling send() to request the server and **fetch** data from it

```js
const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v3.1/name/bangladesh');
request.send();
```

## Callback Hell

- If we want to sequence AJAX calls we will have **nested callbacks** inside nested callbacks if we want to sequence 10 callbacks we will have 10 nested callbacks insie on another.
- Example: Here i want get data of 3 neighbouring in **sequence** and asynchronous

```js
const getCountryAndNeighbour = function (country) {
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

      // Render country 2
      renderCountry(data2, 'neighbour');

      // Get neighbour country 2
      const neighbour = data2.borders?.[0];

      // AJAX call country 3
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
      request2.send();

      request2.addEventListener('load', function () {
        const [data3] = JSON.parse(this.responseText);
        console.log(data3);

        // Render country 3
        renderCountry(data3, 'neighbour');
      });
    });
  });
};
```

- But it doesnt have to be AJAX calls **any asynchronous** code **with callbacks** function have to be nested same way for sequence.And it is bad practice to avoid this we have **Promises**
- For Example:

```js
setTimeout(() => {
  console.log('callback hell');
  setTimeout(() => {
    console.log('callback hell');
    setTimeout(() => {
      console.log('callback hell');
      setTimeout(() => {
        console.log('callback hell');
        setTimeout(() => {
          console.log('callback hell');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
```

## New way of AJAX call

```js
const request = fetch('https://restcountries.com/v3.1/name/bangladesh');
console.log(request);
```

## What are Promises

- An **object** that is used as a **placeholder** for the future of an asynchronous operation.
- In less formal way :- a container or placeholder for asynchronous delivered value (future value).
- Suppose I buy a lottery ticket (promise). Lottery draw happen asynchronously , Because I didnt have to drop my work and wait for draw.If correct outcome I receive money because it is promised.

## Advantage of promises

- We dont need to rely on events and callbacks passed in asynchronous functions to handle asynchronous results.
- We can **chain promises** for sequence of asynchronous operation : **escaping callback hells**

## The promise lifecycle

- **PENDING** (befor the value is available) ---> (async task) ---> **SETTELED** (asynchronous task finished) ---> **FULFILLED** (_succes_ the value is now availabe) --- _OR_ --- **REJECTED** (an error happend)

- Pending: I buy a lottery ticket and wait for the draw to happen. The Promise is in a Pending state, meaning it has not yet been resolved or rejected.Pending (waiting for the draw)
- Fulfilled (you win the lottery): The draw happens, and your numbers match the winning numbers. The Promise is Fulfilled, and the winning amount is resolved.Fulfilled (you win the lottery)
- Rejected (you don't win the lottery): The draw happens, and your numbers don't match the winning numbers. The Promise is Rejected, and an error message is returned.Rejected (you don't win the lottery)

## Consuming promises

```js
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      return reponse.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};
getCountryData('bangladesh');
```

- **fetch()** function returns a promise

```js
fetch(`https://restcountries.com/v3.1/name/${country}`);
```

- Handling the promise using **then(function(perameter){})** method and reading the response using **json()**

```js
fetch(`https://restcountries.com/v3.1/name/${country}`).then(function (
  response
) {
  console.log(response);
  return response.json();
});
```

- json() method **return another promise** (now this time the promise itself is the **data**) and we return that promise.
- And again we handle that promise using then() method.

## Chaining promises

- We can chain promises in sequence
- Example :

```js
fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(response => response.json())
  .then(data => {
    renderCountry(data[0]);
    const neighbour = data[0].borders?.[0];
    //country 2
    return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
  })
  .then(response => response.json())
  .then(data => renderCountry(data[0], 'neighbour'));
```

- We get the neighbouring country using another AJAX call. (fetch(``))
- then() method always **returns a promise** no matter if we actually return a value or not.
- But if we return a value this value become the **fulfillment value** of the return promise.
- Example:

```js
.then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      //country 2
       fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
       return 13
    })
    .then(data =>

      console.log(data)//23

    )
```

- A common mistake :- if we chain the then() method directly to the fetch() method while sequencing asynchronous code we will get back to **callback hell**

```js
fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(response => response.json())
  .then(data => {
    renderCountry(data[0]);
    const neighbour = data[0].borders?.[0];
    //country 2
    fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`).then(response =>
      response.json()
    );
  });
```

## Rejected promises

- A rejected promise is a promise in JavaScript that has failed to complete its intended operation. When a promise is rejected, it means that an error occurred during its execution.
- We can handle rejected promises using **catch()** method. We can add the catch() method at the end of the promise chain.
- The catch() meyhod also returns a **promise**.
- Example :

```js
.then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(`${err}`);
      renderError(`something went wrong ${err.message}`)
    })
```

- We can use another method called **finally()**.We can use regardless whether the promise is fulfilled or rejected.
- It is maily used to for loader animation while loadling data asynchronously.

```js
   .then(response => response.json())
   .then(data => renderCountry(data[0], 'neighbour'))
   .catch(err => {
     console.log(`${err}`);
     renderError(`something went wrong ${err.message}`)
   })
   .finally(() => {
     countriesContainer.style.opacity = 1;
   })
```

## Throwing Errors maunally

- In async fuction error arent propagated automatically . If we dont handle the error it will be silently ignored.
- By throwing error manually we can catch and handle the error and provide a **clear error message**

```js
fetch(`https://restcountries.com/v3.1/name/${country}`).then(response => {
  if (!response.ok) throw new Error(`Country not found ${response.status}`);
  return response.json();
});
```

- In this example if the country is not found we are throwing a manual error. But if we dont provide a manual error the browser show us some property of the country is undifined . But that is not the **reason** why our promise was rejected . So we have to throw a error manually to show a clear error **message**

## Coding Challenge #1

In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates. For that, you will use a second API to geocode
coordinates. So in this challenge, you’ll use an API on your own for the first time �
Your tasks:

### PART 1

1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') and a longitude value ('lng') (these are GPS coordinates, examples are in test data below).

2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name.
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

5.  If use 0,0 cordinates, you
   will get this error with code 404. So create an error to reject
   the promise yourself, with a meaningful error message

### PART 2

6.  Now it's time to use the received data to render a country. So take the relevant
    attribute from the geocoding API result, and plug it into the countries API that
    we have been using. 
    
7. Render the country and catch any errors, just like we have done in the last
    lecture (you can even copy this code, no need to type the same code)

### Test data:
- Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
- Coordinates 2: 19.037, 72.873
- Coordinates 3: -33.933, 18.474

### Solution
```js
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

whereAmI(0, 0);
```
## Building a promise
- A Promise is created using the **new Promise constructor**, which takes a callback function with two parameters: **resolve and reject**. The resolve function is called when the Promise is fulfilled, while the reject function is called when the Promise is rejected.

- Example: Creating a lotteryPromise that simulates a lottery draw with a 2-second delay

```js
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw happening')
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You win!')
    } else {
      reject(new Error('You lost your money'))
    }
  }, 2000)
})
```

- To use a Promise, you can chain then blocks to handle the resolved value, and catch blocks to handle any errors.

- Example: Using the lotteryPromise to log the result

```js
lotteryPromise.then(res => console.log(res)).catch(err => console.log(err))
```
## Promisifying a Callback Function
- You can convert a callback-based function to a Promise-based function using the new Promise constructor.

- Example: Promisifying the setTimeout function using the wait function

```js
const wait = function (seconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, seconds * 1000)
  })
}
```
- This allows you to use the wait function with then blocks, making it easier to write asynchronous code.
```js
wait(2).then(() => {
  console.log('I waited for 2 seconds')
  return wait(1)
}).then(() => console.log('I waited for 1 second'))
```


