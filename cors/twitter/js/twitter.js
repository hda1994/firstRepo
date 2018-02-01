'use strict';

let username = document.querySelector('[data-username]');
let description = document.querySelector('[data-description]');
let tweets = document.querySelector('[data-tweets]');
let followers = document.querySelector('[data-followers]');
let following = document.querySelector('[data-following]');
let wallpaper = document.querySelector('[data-wallpaper]');
let pic = document.querySelector('[data-pic]');

let url = 'https://neto-api.herokuapp.com/twitter/jsonp';
function addScript(src) {
  var elem = document.createElement("script");
  elem.src = src;
  document.head.appendChild(elem);
}
addScript(url+'?jsonp=parseData');
function parseData(data){
  username.textContent = data.username;
  description.textContent = data.description;
  tweets.textContent = data.tweets;
  followers.textContent = data.followers;
  following.textContent = data.following;
  pic.src = data.pic;
  wallpaper.src = data.wallpaper;
}