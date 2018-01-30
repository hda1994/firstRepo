'use strict';
let tmp = {};
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

let counter = document.querySelector('.counter');
let errors = document.querySelector('output.errors');

connection.addEventListener('message', event => {
  let tmpData = JSON.parse(event.data);
  counter.textContent = tmpData.connections;
  errors.textContent = tmpData.errors;  
});
window.addEventListener('beforeunload', ()=>connection.close(1000, 'Closed'));