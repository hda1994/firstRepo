'use strict';
let wedsocketNumber = document.querySelectorAll('.websocket div');

let ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
ws.addEventListener('message', event => {
  wedsocketNumber.forEach(elem => elem.classList.remove('flip-it'));
  wedsocketNumber[event.data - 1].classList.add('flip-it');
});