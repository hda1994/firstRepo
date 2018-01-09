let items = 0;
let itemsTag = document.querySelector('#cart-count');
let price = 0;
let priceTag = document.querySelector('#cart-total-price');

function f(){
	items++;
	let tmpPrice = parseInt(this.getAttribute('data-price'));
	price += tmpPrice;
	itemsTag.innerHTML = items;
	priceTag.innerHTML = price;
}

let buttons = document.querySelectorAll('.add.fa.fa-plus');

for(let button of buttons){
	button.addEventListener('click',f);
}


