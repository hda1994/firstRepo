'use strict';
function slide(element){
	let tmpSlide;
	let newSlide = element.querySelector('.slide');
	newSlide.classList.add('slide-current');
	let prev = element.querySelector('[data-action="prev"]');
	let next = element.querySelector('[data-action="next"]');
	let first = element.querySelector('[data-action="first"]');
	let last = element.querySelector('[data-action="last"]');
	
	next.addEventListener('click', () => {
		if(next.classList.contains('disabled')){
		}
		else{
			move('next');
		}
	});
	prev.addEventListener('click', () => {
		if(prev.classList.contains('disabled')){
		}
		else{
			move('prev');
		}
	});
	last.addEventListener('click', () => {
		if(last.classList.contains('disabled')){
		}
		else{
			move('last');
		}
	});
	first.addEventListener('click', () => {
		if(first.classList.contains('disabled')){
		}
		else{
			move('first');
		}
	});
	
	update();
	function update(){
		next.classList.toggle('disabled', newSlide.nextElementSibling == null);
		prev.classList.toggle('disabled', newSlide.previousElementSibling == null);
		last.classList.toggle('disabled', newSlide.nextElementSibling == null);
		first.classList.toggle('disabled', newSlide.previousElementSibling == null);
	}

	function move(m){
		tmpSlide = element.querySelector('.slide-current');
		tmpSlide.classList.remove('slide-current');
		switch(m){
			case 'next':	
				newSlide = tmpSlide.nextElementSibling;
				break;
			case 'prev':
				newSlide = tmpSlide.previousElementSibling;
				break;
			case 'last':
				newSlide = tmpSlide.parentElement.lastElementChild;
				break;
			case 'first':
				newSlide = tmpSlide.parentElement.firstElementChild;
				break;
		}
		newSlide.classList.add('slide-current');
		update();
	}
}

document.querySelectorAll('.slider').forEach(element => slide(element));
