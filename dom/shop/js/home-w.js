let items = 0;
let itemsTag = document.querySelector('#cart-count');
let price = 0;
let priceTag = document.querySelector('#cart-total-price');

function f(event){
	
	items++;
	let tmpPrice = parseInt(event.target.getAttribute('data-price'));
	price += tmpPrice;
	itemsTag.innerHTML = items;
	priceTag.innerHTML = price;
}

let container = document.querySelector('#container');
container.addEventListener('click', f);

