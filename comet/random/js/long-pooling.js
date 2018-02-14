'use strict';

let longpoolingNumber = document.querySelectorAll('.long-pooling div');

subscribe('https://neto-api.herokuapp.com/comet/long-pooling');

function subscribe(url) {
  let xhr = new XMLHttpRequest();

  xhr.addEventListener('readystatechange', function() {
    if (this.readyState != 4) return;

    longpoolingNumber.forEach(elem =>     elem.classList.remove('flip-it'));
    longpoolingNumber[Number(this.responseText) - 1].classList.add('flip-it');
    
    subscribe(url);
  });
  
  xhr.open('GET', url, true);
  xhr.send();
}