'use strict';

const colors = ['#ffffff','#ffe9c4','#d4fbff'];
const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
document.addEventListener('DOMContentLoaded', createStars);
canvas.addEventListener('click', createStars);

function randomN(a, b){
  return Math.round(Math.random() * (b - a)) + a;
}
function randomR(a, b){
  return (Math.random() * (b - a)) + a;
}

function createStars(){
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let amount = randomN(200, 400);
  for(let i = 0; i < amount; i++){
    createStar();
  }
  ctx.closePath();
}

function createStar(){
  let x = randomN(0, canvas.width);
  let y = randomN(0, canvas.height);
  let color = colors[randomN(0, 2)];
  let r = randomR(0, 1.1);
  let bright = randomR(0.8, 1);
  ctx.moveTo(x, y);
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.globalAlpha = bright;
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}


