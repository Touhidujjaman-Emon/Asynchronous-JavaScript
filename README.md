# Asynchronous JavaScript

## What is synchronous

- Executing code line by line means **synchronous**
- Each line of code **wait** for previous line to finish
- Long running code **block** execution of the next code
- Like **alert** notification . If I dont click **ok** it wont execute next line of code.suppose i dont press ok for 5 sec then next line of code wont run for 5 sec.

```js
console.log('Line 1');
alert('Click OK to continue');
console.log('Line 3');
```

## What is Asynchronous

- Executing code without waiting for previous line to finish .Coordinating behavior   of program over a period of time **(not occuring at the same time)**
- Asynchronous is **non-blocking** .It wont block another line of code. It will run on the **backround**
- Execution **does'nt** wait for asynchronous code
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
img.src ='dog.jpg';
img.addEventListener('load',function(){
    img.classList.add('fadeIn')
});
p.style.width ='300px'

``` 
- Here **img.src** is asynchronous . Because it will load the **src** in the **background** without blocking any code and the event listener will listen for **load**  after the img is fully loaded and then the **call back function** will be called. So the callback funtion alone is'nt making the code asynchronous but **img.src** is asynchronous.

```js

const btn = document.querySelector('.btn')
btn.addEventListener('click',()=>console.log('hello'))

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
 request.open('GET','https://restcountries.com/v3.1/name/bangladesh');
 request.send();

 request.addEventListener('load' , function(){
    const [data] = JSON.parse(this.responseText)
    console.log(data);

 })

```
- Calling  open('method' , 'URL' , async)  **Initializing** or **Opening** the request to retrive the data from url.
- Calling send() to request the server and **fetch** data from it
```js
 const request = new XMLHttpRequest();
 request.open('GET','https://restcountries.com/v3.1/name/bangladesh');
 request.send();
```
## Callback Hell
- If we want to sequence AJAX calls we will have **nested callbacks** inside nested callbacks if we want to sequence 10 callbacks we will have 10 nested callbacks insie on another.
- Example: Here i want get data of 3 neighbouring in **sequence** and asynchronous
```js
 const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');

      // AJAX call country #
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
      request2.send();

      request2.addEventListener('load', function () {
        const [data3] = JSON.parse(this.responseText);
        console.log(data3);

        renderCountry(data3, 'neighbour');
      });
    });
  ```
  - But it doesnt have to be AJAX calls **any asynchronous** code **with callbacks** function have to be nested same way for sequence.And it is bad practice to avoid this we have **Promises**
  - For Example:
  ```js
   setTimeout(()=> {console.log('callback hell')
    setTimeout(()=> {console.log('callback hell')
      setTimeout(()=> {console.log('callback hell')
        setTimeout(()=> {console.log('callback hell')
          setTimeout(()=> {console.log('callback hell')
          },1000)
        },1000)
      },1000)
    },1000)
   },1000)
   ```


