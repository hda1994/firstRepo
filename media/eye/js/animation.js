'use strict';
let body = document.querySelector('body');
let eye = document.querySelector('.big-book__eye');
let a = eye.getBoundingClientRect();
let eyeX = a.left;
let eyeY = a.top;

document.addEventListener('mousemove', event => {

  updateEye(event.pageX, event.pageY, document.documentElement.scrollWidth, document.documentElement.scrollHeight)
});

function updateEye(x, y, maxX, maxY){
  let size;
  let tmpX;
  let tmpY;
  
  if(x <= eyeX){
    tmpX = (x / eyeX * 30) - 30;
  }
  if(x > eyeX){
    tmpX = ((x - eyeX) / (maxX - eyeX) * 30);
  }
  if(y <= eyeY){
    tmpY = (y / eyeY * 30) - 30;
  }
  if(y > eyeY){
    tmpY = ((y - eyeY) / (maxY - eyeY) * 30);
  }
  let maxR1 = Math.sqrt((maxY - eyeY) * (maxY - eyeY) + (maxX - eyeX) * (maxX - eyeX));
  let maxR2 = Math.sqrt((maxY - eyeY) * (maxY - eyeY) + eyeX * eyeX);
  let max = maxR1 > maxR2? maxR1 : maxR2;
  let r = Math.sqrt((y - eyeY) * (y - eyeY) + (x - eyeX) * (x - eyeX));
  size = r / max * (-2) + 3;

  document.querySelector('.big-book__pupil').style.setProperty('--pupil-x', tmpX + 'px');
  document.querySelector('.big-book__pupil').style.setProperty('--pupil-y', tmpY + 'px');
  document.querySelector('.big-book__pupil').style.setProperty('--pupil-size', size);
}