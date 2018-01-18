'use strict';
let preloader = document.querySelector('#preloader');
preloader.classList.remove('hidden');
let xhr;
document.addEventListener('DOMContentLoaded', () => {
event.preventDefault();
	onClick('email')
});
let content = document.querySelector('#content');
let tabs = document.querySelectorAll('.tabs a');
let email = tabs[0];
let sms = tabs[1];

email.addEventListener('click', () => {
	event.preventDefault();
	onClick('email')
});
sms.addEventListener('click', () => {
	event.preventDefault();
	onClick('sms')
});

function onLoadEnd(){
	preloader.classList.add('hidden');
}

function onLoading(text){
	switch(text){ 
		case 'sms':
			email.classList.remove('active');
			sms.classList.add('active');
			break;
		case 'email':
			sms.classList.remove('active');
			email.classList.add('active');
			break;
	}
	content.innerHTML = xhr.responseText;
}

function onClick(text){
	xhr = new XMLHttpRequest();
	xhr.addEventListener('load',  () =>{
		event.preventDefault();
		onLoading(text);
	});
	xhr.addEventListener('loadend', onLoadEnd);
	xhr.open('GET', 'components/' + text + '-tab.html');
	xhr.send();
}

//		function onProgress(event){
//			let pr = Math.round(event.loaded / event.total * 100);
//			preloader.innerHTML = 'Загрузка... ' + pr + '%';
//			preloader.classList.remove('hidden');
//		}
