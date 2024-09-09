# Asynchronous JavaScript

## What is synchronous

- Executing code line by line means _synchronous_
- Each line of code _wait_ for previous line to finish
- Long running code _block_ execution of the next code
- Like _alert_ notification . If I dont click _ok_ it wont execute next line of code.suppose i dont press ok for 5 sec then next line of code wont run for 5 sec.

```js
console.log('Line 1');
alert('Click OK to continue');
console.log('Line 3');
```

## What is Asynchronous

- Executing code without waiting for previous line to finish .Coordinating behavior   of program over a period of time _(not occuring at the same time)_
- Asynchronous is _non-blocking_ .It wont block another line of code. It will run on the _backround_
- Execution _does'nt_ wait for asynchronous code
- For example callback function with _timer_ is asynchronous.

```js
const text = document.querySelector('p');
setTimeout(function () {
  text.textContent = 'Hi , Iam Emon';
}, 5000);

text.style.color = 'red';
```

- setTimeout function will be running on the background without blocking any code.And callback will run after _timer(5sec)_.Though it _isn't_ the last line of code but it will execute after all other line of code in this example.That basically means an action was deferred into the future in order to make the code _non-blocking_

**note** : callback function and addEventListener alone do _NOT_ make code asynchronous.

- For example:
```js

const img = document.querySelector('.dog');
img.src ='dog.jpg';
img.addEventListener('load',function(){
    img.classList.add('fadeIn')
});
p.style.width ='300px'

``` 
- Here _img.src_ is asynchronous . Because it will load the _src_ in the _background_ without blocking any code and the event listener will listen for _load_  after the img is fully loaded and then the _call back function_ will be called. So the callback funtion alone is'nt making the code asynchronous but _img.src_ is asynchronous.

```js

const btn = document.querySelector('.btn')
btn.addEventListener('click',()=>console.log('hello'))

```
- In this example the event listener just _waiting_ for a button click event and wont doing anything on the _background_ so it isnt asynchronous.

## AJAX - Asynchronous javaScript and XML
- Allow us to communicate with remote web servers in an asynchronous way . With AJAX calls we can request data from web servers dynamically.
- With out reloding the page we can use that data dynamically

## API - Application Programing Interface
- Piece of software that can be used by another piece of software, In order to allow _applications to talk to each other_
- online/web API's : Application running on server , that receives resquest for data and send data as response
- Most API's use JSON data formate nowadays . When tiggers used to smoke (long time ago) , people used to use XML formate to transmit data on the web . Thats where the name AJAX came from. and it isnt changed till now.

### Old way of doing AJAX call

```js 

 const request = new XMLHttpRequest();
 request.open('GET','https://restcountries.com/v3.1/name/bangladesh');
 request.send();

 request.addEventListener('load' , function(){
    const [data] = JSON.parse(this.responseText)
    console.log(data);

 })

```
- Call  open('method','URL' async)  _Initializing_ or _Opening_ the request to retrive the data from url.
- calling send() to request the server and _fetch_ data from it
```js
 const request = new XMLHttpRequest();
 request.open('GET','https://restcountries.com/v3.1/name/bangladesh');
 request.send();
```
- calling send() to request the server and _fetch_ data from it

