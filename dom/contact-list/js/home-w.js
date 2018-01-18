'use strict';

let contacts = JSON.parse(loadContacts());

let contactsList = document.querySelector('.contacts-list');

let firstLi = contactsList.querySelector('li');
contactsList.removeChild(firstLi);
for(let contact of contacts){
	let tmpLi = firstLi.cloneNode(true);
	tmpLi.dataset.email = contact.email;
	tmpLi.dataset.phone = contact.phone;
	tmpLi.firstElementChild.textContent = contact.name;
	contactsList.appendChild(tmpLi);
}
//console.log(contacts);
//console.log(contactsList);
