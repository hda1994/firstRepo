'use strict';
let stars = [];
let disks = [];
const canvas = document.querySelector('#wall');
let ctx = canvas.getContext('2d');
let globalDate = new Date();

class Disk{
  constructor(){
    this.size = randomR(0.1, 0.6);
    this.nextPoint = getNextPoint();
    this.x = randomN(0, canvas.width);
    this.y = randomN(0, canvas.height);
  } 
}

class Star{
  constructor(){
    this.size = randomR(0.1, 0.6);
    this.nextPoint = getNextPoint();
    this.rspeed = randomR(-0.2, 0.2);
    this.x = randomN(0, canvas.width);
    this.y = randomN(0, canvas.height);
    this.alpha = randomR(0, Math.PI * 2);
  }
}

let m = randomN(50, 200);
for(let i = 0; i < m; i++){
  if(i % 2 === 0){//i = 2k
    let tmp = new Disk();
    disks.push(tmp);
  }
  else{//i=2k+1
    let tmp = new Star();
    stars.push(tmp);
   }
}
  
function randomR(a, b){
  return (Math.random() * (b - a)) + a;
}

function next1(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  }
}

function next2(x, y, time) {
  return {
    x: x + Math.sin((x + (time / 10)) / 100) * 5,
    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
  }
}

function getNextPoint(){
  switch(randomN(1, 2)){
    case 1: 
      return next1;
    case 2:
      return next2;
  }
}

function randomN(a, b){
  return Math.round(Math.random() * (b - a)) + a;
}
 
function clock(){
  let now = new Date();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let ms = (now.getTime() - globalDate.getTime());
  ctx.strokeStyle = "#ffffff";
  for(let star of stars){
    ctx.save();
    ctx.lineWidth = star.size * 5;
    let tmp = star.nextPoint(star.x, star.y, Date.now());
    ctx.translate(tmp.x, tmp.y);
    ctx.beginPath();
    ctx.rotate(ms / 50 * star.rspeed * star.alpha);
    ctx.moveTo(0, 0);
    ctx.lineTo(20 * star.size, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 20 * star.size);
    ctx.moveTo(0, 0);
    ctx.lineTo(-20 * star.size, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -20 * star.size);
    ctx.stroke();
    ctx.restore();
  }
  for(let disk of disks){
    ctx.save();
    ctx.lineWidth = disk.size * 5;
    let tmp = disk.nextPoint(disk.x, disk.y, Date.now());
    ctx.translate(tmp.x, tmp.y);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 12 * disk.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#04BBD3';
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 7 * disk.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
    window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);