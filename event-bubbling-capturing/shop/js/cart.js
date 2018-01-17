'use strict';

document.querySelector('.items-list').addEventListener('click',event => {
	if(event.target.classList.contains('add-to-cart')){
		event.preventDefault();
		let a = event.target.dataset.price;
		let tmp = {};
		tmp.title = event.target.dataset.title;
		tmp.price = event.target.dataset.price;
		addToCart(tmp);
	}
})