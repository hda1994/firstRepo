'use strict';
const canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

let video = document.createElement('video');
let app = document.querySelector('.app');
const takePhoto = document.getElementById('take-photo');
const errMessage = document.getElementById('error-message');
const list = document.querySelector('.list');

navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(stream => strFunction(stream)).catch(err => errMessage.textContent = 'Нет доступа к камере');

function strFunction(stream){
  video.src = URL.createObjectURL(stream);
  video.autoplay = true;
  app.insertBefore(video, app.firstChild);
  takePhoto.addEventListener('click', event =>{
    event.preventDefault();
    
  });
//  console.log(document)
  document.addEventListener('keyup', event =>{
    new Audio('./audio/click.mp3').play();
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    let url = canvas.toDataURL();
    let newNode = createElement(tmp(url));
    newNode.querySelectorAll('.material-icons')[1].addEventListener('click', () =>{
//      console.log('dfdf')
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://neto-api.herokuapp.com/photo-booth', true);
      xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        alert(this.responseText);
      }
      xhr.send(url);
    });
    newNode.querySelectorAll('.material-icons')[2].addEventListener('click', event =>{
      list.removeChild(event.target.parentElement.parentElement.parentElement)
//      console.log(event.target.parentElement.parentElement.parentElement);
    });
    list.insertBefore(newNode, list.firstChild);
//    console.log(canvas);
    
  });
}

function tmp(url){
  return {
    name: 'figure',
    childs: [
      {
        name: 'img',
        props: {
          src: url,
        }
      },
      {
        name: 'figcaption',
        childs: [
          {
            name: 'a',
            props: {
              href: url,
              download: 'snapshot.png'
            },
            childs: [
              {
                name: 'i',
                props: {
                  class: 'material-icons'
                },
                childs: [
                  'file_download'
                ]
              }
            ]
          },
          {
            name: 'a',
            childs: [
              {
                name: 'i',
                props: {
                  class: 'material-icons'
                },
                childs: [
                  'file_upload'
                ]
              }
            ]
          },
          {
            name: 'a',
            childs: [
              {
                name: 'i',
                props: {
                  class: 'material-icons'
                },
                childs: [
                  'delete'
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

function createElement(node){
  if((typeof node === 'string') || (typeof node === 'number')){
    return document.createTextNode(node);
  }
  const tmp = document.createElement(node.name);

  if(node.childs){
    node.childs.forEach(child => tmp.appendChild(createElement(child)));
  }
  
  if(node.props){
    Object.keys(node.props).forEach(function(key) {
      tmp.setAttribute(key, node.props[key]);
    });
  }
  
  return tmp;
}
