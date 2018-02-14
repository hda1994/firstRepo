'use strict';

let poolingNumber = document.querySelectorAll('.pooling div');

let xhr = new XMLHttpRequest();
setInterval(f, 5000);

function f(){
  xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling', true);
  xhr.send();
  xhr.addEventListener('loadend', (event) => {
    poolingNumber.forEach(elem =>     elem.classList.remove('flip-it'));
    poolingNumber[event.target.response - 1].classList.add('flip-it');
  });
}
