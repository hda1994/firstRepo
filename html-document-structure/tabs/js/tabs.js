'use strict';

let tmpLi = document.querySelector('.tabs-nav li');
let tabsNav = document.querySelector('.tabs-nav');
tabsNav.removeChild(tmpLi);
let articles = document.querySelectorAll('.tabs-content article');
for(let i = 1; i < articles.length; i++){
	articles[i].classList.add('hidden');
}
for(let article of articles){
	let tmp = tmpLi.cloneNode(true);
	tmp.firstElementChild.textContent = article.dataset.tabTitle;
	tmp.firstElementChild.classList.add(article.dataset.tabIcon);
	tmp.addEventListener('click', () => {
		for(let tab of tabsNav.children){
			tab.classList.remove('ui-tabs-active');
		}
		tmp.classList.add('ui-tabs-active');
		for(let art of articles){
			if(tmp.firstElementChild.textContent == art.dataset.tabTitle){
				art.classList.remove('hidden');
			}
			else{
				art.classList.add('hidden');
			}
		}
	})
	tabsNav.appendChild(tmp);
}
tabsNav.firstElementChild.classList.add('ui-tabs-active');