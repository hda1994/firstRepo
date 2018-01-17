'use strict';

function handleTableClick(event) {
 if(event.target.parentElement.parentElement == document.querySelector('thead')){
	 if(event.target.hasAttribute('data-dir')){
		 event.target.dataset.dir = -1;
		 sortTable(event.target.dataset.propName, -1);
	 }
	 else{
		 document.querySelectorAll('th').forEach(elem => elem.removeAttribute('data-dir'));
		 event.target.dataset.dir = 1;
		 sortTable(event.target.dataset.propName, 1);
	 }
	 event.target.parentElement.parentElement.parentElement.dataset.sortBy = event.target.dataset.propName;
 } 
}
