'use strict';

let done = document.querySelector('.todo-list .done');
let undone = document.querySelector('.todo-list .undone');
let input;
let labels = document.querySelectorAll('.todo-list label');

for(let i = 0; i < labels.length; i++){
	input = labels[i].querySelector('input');
	input.addEventListener('click', () => {
		if(labels[i].querySelector('input').parentElement.parentElement == done){
			undone.appendChild(labels[i].querySelector('input').parentElement);
		}
		else{
			if(labels[i].querySelector('input').parentElement.parentElement == undone){
				done.appendChild(labels[i].querySelector('input').parentElement);
			}
		}
	});
}
