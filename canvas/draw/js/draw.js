'use strict';
let abc="0123456789abcdef".split("");
const S = 1;
const L = 0.5;
let tmp = 1;
let isEnd = true;
let firstPoint = true;
const LEFT_MOUSE_BUTTON = Math.pow(2, 0);
const canvas = document.querySelector('#draw');
let ctx = canvas.getContext('2d');
document.addEventListener('DOMContentLoaded', newCanvas);
document.addEventListener('dblclick', newCanvas);
canvas.addEventListener('mouseout', () => {
  firstPoint = true;
  isEnd = false;
});
window.addEventListener('resize', newCanvas);
function newCanvas(){
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
let a = randomN(0, 359);
let size = 100;
canvas.addEventListener('mousemove', event => drawLine(event));
canvas.addEventListener('mouseup', event => {
  firstPoint = true;
  isEnd = true;
});
let tmpPointX;
let tmpPointY;
let tmpColor;
function drawLine(event){
  let y = event.clientY;
  let x = event.clientX;
  if(isButtonPressed(LEFT_MOUSE_BUTTON, event.buttons) && isEnd){
    if(firstPoint){
      tmpPointX = event.clientX;
      tmpPointY = event.clientY;
      ctx.moveTo(tmpPointX, tmpPointY);
      firstPoint = false;      
    }
    else{
      a = event.shiftKey ? dec(a) : inc(a);
      size = getNextSize(size);
      ctx.strokeStyle = colorConvert(a, S, L);
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(tmpPointX, tmpPointY);
      tmpPointX = event.clientX;
      tmpPointY = event.clientY;
      ctx.lineTo(tmpPointX, tmpPointY);
      ctx.stroke();
      ctx.closePath();
    }
  }
}

function getNextSize(size){
  if((size + tmp > 100) || (size + tmp < 5)){
    tmp *= -1;
  }
  return size + tmp;
}

function dec(a){
  if(a === 0){
    return 359;
  }
  return --a;
}

function inc(a){
  if(a === 359){
    return 0;
  }
  return ++a;
}

function randomN(a, b){
  return Math.round(Math.random() * (b - a)) + a;
}

function isButtonPressed(button, pressed){
  return (pressed & button) === button;
}

function colorConvert(h, s, l){
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(mod2(h / 60) - 1));
  let m = l - c / 2;
  let tmpR;
  let tmpG;
  let tmpB;
  if((h >= 0) && (h < 60)){
    tmpR = c;
    tmpG = x;
    tmpB = 0;
  }
  if((h >= 60) && (h < 120)){
    tmpR = x;
    tmpG = c;
    tmpB = 0;
  }
  if((h >= 120) && (h < 180)){
    tmpR = 0;
    tmpG = c;
    tmpB = x;
  }
  if((h >= 180) && (h < 240)){
    tmpR = 0;
    tmpG = x;
    tmpB = c;
  }
  if((h >= 240) && (h < 300)){
    tmpR = x;
    tmpG = 0;
    tmpB = c;
  }
  if((h >= 300) && (h < 360)){
    tmpR = c;
    tmpG = 0;
    tmpB = x;
  }
  let r = (tmpR + m) * 255;
  let g = (tmpG + m) * 255;
  let b = (tmpB + m) * 255;
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

function mod2(x){
  while(x - 2 >= 0){
    x -= 2;
  }
  return x;
}

function toHex(a){
	let s = "";
  a = Math.round(a);
//   console.log(a);
  let mas = abc.slice(0, 16);
  s = mas[a % 16];
  a = Math.floor(a / 16);
  s = mas[a % 16] + s;
//  console.log(s);
  return s;
}