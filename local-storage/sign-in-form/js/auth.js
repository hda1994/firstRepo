'use strict';
const inLinck = 'https://neto-api.herokuapp.com/signin';
const upLinck = 'https://neto-api.herokuapp.com/signup';

let signIn = document.querySelector('.sign-in-htm');
let signUp = document.querySelector('.sign-up-htm');

let inForm = new FormData(signIn);
let upForm = new FormData(signUp);

let inEmail = signIn.querySelector('#email');
let inPass = signIn.querySelector('#pass');
let inOut = signIn.querySelector('.error-message');
let inCheck = signIn.querySelector('#check');

let upEmail = signUp.querySelector('#email');
let upPass = signUp.querySelector('#pass');
let upPasscopy = signUp.querySelectorAll('#pass')[1];
let upName = signUp.querySelectorAll('#pass')[2];
let upOut = signUp.querySelector('.error-message');

document.addEventListener('DOMContentLoaded', ()=>{
  if(localStorage.email !== undefined){
    inEmail.value = localStorage.email;
  }
  if(localStorage.pass !== undefined){
    inPass.value = localStorage.pass
  }
  update();
});

inCheck.addEventListener('change', ()=>{
  localStorage.check = inCheck.checked;
  update();
});
function update(){
  if(inCheck.checked){    
    inEmail.addEventListener('change', updateEmail);
    inPass.addEventListener('change', updatePass);
  }
  else{
    inEmail.value = '';
    inPass.value = '';
    localStorage.email = '';
    localStorage.pass = '';
    inEmail.removeEventListener('change', updateEmail);
    inPass.removeEventListener('change', updatePass);
  }
}

function updateEmail(){
  localStorage.email = inEmail.value;
}
function updatePass(){
  localStorage.pass = inPass.value;
}


let tmp = {};
let xhrIn = new XMLHttpRequest();
let xhrUp = new XMLHttpRequest();
let buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click',()=> click(button.value)));

xhrIn.addEventListener('load', ()=> {
  tmp = JSON.parse(xhrIn.response);
  if(tmp.error){
    inOut.textContent = tmp.message;
  }
  else{
    inOut.textContent = 'Пользователь ' + tmp.name + ' успешно авторизован'
  }
});
xhrUp.addEventListener('load', ()=> {
  tmp = JSON.parse(xhrUp.response);
  if(tmp.error){
    upOut.textContent = tmp.message;
  }
  else{
    upOut.textContent = 'Пользователь ' + tmp.name + ' успешно зарегистрирован'
  }
});

function click(text){
  event.preventDefault();
  switch(text){
    case 'Зарегистрироваться':
      xhrUp.open('POST', upLinck);
      xhrUp.setRequestHeader('Content-Type','application/json');
      xhrUp.send(JSON.stringify({password: upPass.value, email: upEmail.value, passwordcopy: upPasscopy.value, name: upName.value}));
      break;
    case 'Войти':
      xhrIn.open('POST', inLinck);
      xhrIn.setRequestHeader('Content-Type','application/json');
      xhrIn.send(JSON.stringify({password: inPass.value, email: inEmail.value}));
      break;
  }
}