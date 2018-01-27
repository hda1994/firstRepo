'use strict';

function handleTableClick(event) {
 if(event.target.classList.contains('prop__name')){
	 if(event.target.hasAttribute('data-dir')){
		 event.target.dataset.dir *= -1;
		 sortTable(event.target.dataset.propName, event.target.dataset.dir);
	 }
	 else{
		 document.querySelectorAll('th').forEach(elem => elem.removeAttribute('data-dir'));
		 event.target.dataset.dir = 1;
		 sortTable(event.target.dataset.propName, 1);
	 }
	 document.querySelector('table').dataset.sortBy = event.target.dataset.propName;
 } 
}
