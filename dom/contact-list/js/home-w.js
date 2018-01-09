'use strict';

let contacts = JSON.parse(loadContacts());

let contactsList = document.querySelector('.contacts-list');

let firstLi = contactsList.querySelector('li');
let newListElem = document.createElement('li');
newListElem.innerHTML ='<strong>' + contacts[contacts.length - 1].name + '</strong>';
newListElem.dataset.email = contacts[contacts.length - 1].email;
newListElem.dataset.phone = contacts[contacts.length - 1].phone;
contactsList.insertBefore(newListElem, firstLi);
contactsList.removeChild(firstLi);

for(let i = contacts.length - 2; i >= 0; i--){
	firstLi = contactsList.querySelector('li');
	newListElem = document.createElement('li');
	newListElem.innerHTML ='<strong>' + contacts[i].name + '</strong>';
	newListElem.dataset.email = contacts[i].email;
	newListElem.dataset.phone = contacts[i].phone;

	
	contactsList.insertBefore(newListElem, firstLi);
}
//contactsList.removeChild(firstLi);

console.log(contacts);
console.log(contactsList);
