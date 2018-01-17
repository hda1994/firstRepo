'use strict';

		let xhre;
		let xhrs;
		document.addEventListener('DOMContentLoaded', onLoad);
		let preloader = document.querySelector('#preloader');
		let content = document.querySelector('#content');
		let tabs = document.querySelectorAll('.tabs a');
		let email = tabs[0];
		let sms = tabs[1];
		email.addEventListener('click', onclickEmail);
		sms.addEventListener('click', onclickSms);
		function onLoad(event){
			onclickEmail(event);
		}
		function onProgress(event){
			let pr = Math.round(event.loaded / event.total * 100);
			preloader.innerHTML = 'Загрузка... ' + pr + '%';
			preloader.classList.remove('hidden');
		}
		function onLoadEnd(){
			preloader.classList.add('hidden');
		}
		function onLoadE(){
			sms.classList.remove('active');
			email.classList.add('active');
			event.preventDefault();
			content.innerHTML = xhre.responseText;
		}
		function onclickEmail(event){
			event.preventDefault();
			xhre = new XMLHttpRequest();
			xhre.addEventListener('progress', onProgress);
			xhre.addEventListener('load', onLoadE);
			xhre.addEventListener('loadend', onLoadEnd);
			xhre.open('GET', 'components/email-tab.html');
			xhre.send();
		}
		function onLoadS(){
			email.classList.remove('active');
			sms.classList.add('active');
			event.preventDefault();
			content.innerHTML = xhrs.responseText;
		}
		function onclickSms(event){
			event.preventDefault();
			xhrs = new XMLHttpRequest();		
			xhrs.addEventListener('progress', onProgress);
			xhrs.addEventListener('load', onLoadS);
			xhrs.addEventListener('loadend', onLoadEnd);
			xhrs.open('GET', 'components/sms-tab.html');
			xhrs.send();
		}