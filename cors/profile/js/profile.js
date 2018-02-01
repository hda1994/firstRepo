'use strict';
let content = document.querySelector('.content');
let name = document.querySelector('[data-name]');
let description = document.querySelector('[data-description]');
let position = document.querySelector('[data-position]');
let technologies = document.querySelector('[data-technologies]');
let following = document.querySelector('[data-following]');
let pic = document.querySelector('[data-pic]');

let url = 'https://neto-api.herokuapp.com/profile/me';

function addScript(src) {
  let elem = document.createElement("script");
  elem.src = src;
  document.head.appendChild(elem);
}

function getUrlById(id){
  return 'https://neto-api.herokuapp.com/profile/' + id + '/technologies?jsonp=parseFollowing';
}

addScript(url+'?jsonp=parseData');
function parseData(data){
  name.textContent = data.name;
  description.textContent = data.description;
  position.textContent = data.position;
  pic.src = data.pic;
  addScript(getUrlById(data.id))
}

function parseFollowing(data){
  for(let d of data){
    devicons(d);
  }
}
function devicons(django){
  let elem = document.createElement('span');
  let clas = 'devicons-' + django;
  elem.classList.add('devicons',clas);
  technologies.appendChild(elem);
}
content.style.display = 'initial';
