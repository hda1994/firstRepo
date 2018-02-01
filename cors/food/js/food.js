'use strict';
let title = document.querySelector('[data-title]');
let ingredients = document.querySelector('[data-ingredients]');
let rating = document.querySelector('[data-rating]');
let star = document.querySelector('[data-star]');
let votes = document.querySelector('[data-votes]');
let consumers = document.querySelector('[data-consumers]');
let pic = document.querySelector('[data-pic]');

let url = 'https://neto-api.herokuapp.com/food/42';

function addScript(src) {
  let elem = document.createElement("script");
  elem.src = src;
  document.head.appendChild(elem);
}

function getUrlRating(id){
  return 'https://neto-api.herokuapp.com/food/' + id + '/rating?jsonp=parseRating';
}
function getUrlConsumers(id){
  return 'https://neto-api.herokuapp.com/food/' + id + '/consumers?jsonp=parseConsumers';
}

function showIngredients(ingredients){
  let str = '';
  for(let i = 0; i < ingredients.length - 1; i++){
    str += ingredients[i] + ', ';
  }
  str += ingredients[ingredients.length - 1] + '.';
  return str;
}

addScript(url+'?jsonp=parseData');
function parseData(data){
  title.textContent = data.title;
  ingredients.textContent = showIngredients(data.ingredients);
  pic.style.background = 'url(' + data.pic + ')';
  addScript(getUrlRating(data.id));
  addScript(getUrlConsumers(data.id));
}

function parseRating(data){
  rating.textContent = Math.ceil(data.rating * 100)/100;
  star.style.width = Math.ceil(data.rating * 100)/10 +'%';
  votes.textContent = '(' + data.votes +' оценок)';
}

function parseConsumers(data){
  console.log(data);
  addUser(data.consumers);
  let elem = document.createElement('span');
  let tmp = data.total - 4;
  elem.textContent = '(+' + tmp + ')';
  consumers.appendChild(elem);
}
function addUser(users){
  for(let user of users){
    let elem = document.createElement('img');
    elem.src = user.pic;
    elem.title = user.name;
    consumers.appendChild(elem);
  }
}