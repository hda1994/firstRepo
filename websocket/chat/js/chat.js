'use strict'
const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
const chat = document.querySelector('.chat');
const chatStatus = document.querySelector('.chat-status');
const messageStatus = document.querySelector('.message-status');
const messageBox = document.querySelector('.message-box'); 
const messagesTemplates = document.querySelector('.messages-templates');
const messagesContent = document.querySelector('.messages-content');
let tmp;

connection.addEventListener('open', () => {
  chatStatus.textContent = chatStatus.dataset.online;
  tmp = messageStatus.cloneNode(true);
  tmp.querySelector('.message-text').textContent = 'Пользователь появился в сети';
  messagesContent.appendChild(tmp);
  messageBox.querySelector('.message-submit').disabled = false;
});

connection.addEventListener('close', () => {
  chatStatus.textContent = chatStatus.dataset.offline;
  tmp = messageStatus.cloneNode(true);
  tmp.querySelector('.message-text').textContent = 'Пользователь не в сети';
  messagesContent.appendChild(tmp);
  messageBox.querySelector('.message-submit').disabled = true;
});

connection.addEventListener('message', event => {
  if(event.data === '...'){
    tmp = messagesTemplates.querySelector('.loading').cloneNode(true);
    messagesContent.appendChild(tmp);
  }
  else{
    tmp = messagesTemplates.querySelectorAll('.message')[1].cloneNode(true);
    tmp.querySelector('.message-text').textContent = event.data;
    tmp.querySelector('.timestamp').textContent = getTmpTime();
    messagesContent.appendChild(tmp);
    messagesContent.removeChild(messagesContent.querySelector('.loading'));
  }
});

messageBox.querySelector('.message-submit').addEventListener('click', event => {
  event.preventDefault();
  tmp = messagesTemplates.querySelector('.message-personal').cloneNode(true);
  let text = messageBox.querySelector('.message-input').value;
  if(/\S/.test(text)){
    tmp.querySelector('.message-text').textContent = text;
    tmp.querySelector('.timestamp').textContent = getTmpTime();
    messagesContent.appendChild(tmp);  
    connection.send(text);
    messageBox.querySelector('.message-input').value = '';
  }
});

function getTmpTime(){
  let time = new Date();
  let timeString = '';
  if(time.getHours() < 10){
    timeString += '0' + time.getHours().toString();
  }
  else{
    timeString += time.getHours().toString();
  }
  timeString += ':';
  if(time.getMinutes() < 10){
    timeString += '0' + time.getMinutes().toString();
  }
  else{
    timeString += time.getMinutes().toString();
  }
  return timeString;
}

window.addEventListener('beforeunload', () => connection.close());

//setTimeout(() => {connection.close()}, 5000);