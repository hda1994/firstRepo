'use strict';
let increment_button = document.getElementById('increment');
let decrement_button = document.getElementById('decrement');
let reset_button = document.getElementById('reset');
let counter = document.getElementById('counter');

increment_button.addEventListener('click', ()=> click('inc'));
decrement_button.addEventListener('click', ()=> click('dec'));
reset_button.addEventListener('click', ()=> click('re'));
document.addEventListener('DOMContentLoaded', () => click(''));

function click(text){
  if(!localStorage.count){
    localStorage.count = 0
  }
  switch(text){
    case 'inc': 
      localStorage.count++;
      break;
    case 'dec': 
      localStorage.count--;
      break;
    case 're': 
      localStorage.count = 0;
      break;  
  }
  counter.textContent = localStorage.count.toString();
}

