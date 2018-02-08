'use strict'

document.getElementById('btnSeatMap').addEventListener('click', buttonClick);
const select = document.getElementById('acSelect');
const seatMapTitle = document.getElementById('seatMapTitle');
const seatMapDiv = document.getElementById('seatMapDiv');
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');
const totalPax = document.getElementById('totalPax');
const totalAdult = document.getElementById('totalAdult');
const h3 = document.querySelector('h3.text-center');

btnSetFull.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelectorAll('.seat').forEach((elem) => {
    if(!elem.classList.contains('half') || !elem.classList.contains('adult')){
      elem.classList.add('adult');
    }
  });
  updateAdult();
  updateHalf();
})

btnSetEmpty.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelectorAll('.seat').forEach((elem) => {
    elem.classList.remove('half', 'adult');
  });
  updateAdult();
  updateHalf();
})

function updateAdult(){
  totalAdult.textContent = document.querySelectorAll('.adult').length;
}
function updateHalf(){
  totalHalf.textContent = document.querySelectorAll('.half').length;
}

function buttonClick(event){
  event.preventDefault();
  
  fetch('https://neto-api.herokuapp.com/plane/' + select.value)
  .then(res => res.json())
  .then(t => {
    seatMapDiv.innerHTML = '';
    seatMapTitle.textContent = t.title + ' (' + t.passengers + ' пассажиров)';
    h3.textContent = '';
    totalPax.textContent = t.passengers;
    createRows(t);
    updateAdult();
    updateHalf();
  });
}

function createPlase(label){
  const div = document.createElement('div');
  const span = document.createElement('span');
  
  span.className = 'seat-label';
  span.textContent = label;
  div.classList.add('col-xs-4');
  if(label === ''){
    div.classList.add('no-seat');
    return div;
  }
  div.classList.add('seat');
  div.appendChild(span);
  
  div.addEventListener('click', (event)=>{
    if(div.classList.contains('half') || div.classList.contains('adult')){
      div.classList.remove('half', 'adult');
    }
    else{
      if(event.altKey){
        div.classList.add('half');
      }
      else{
      div.classList.add('adult');
      }
    }
    updateAdult();
    updateHalf();
  })
  return div; 
}

function createRow(row, numbers, letters){
  
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const div3 = document.createElement('div');
  const div = document.createElement('div');
  const h2 = document.createElement('h2');
  
  h2.textContent = row;
  div.classList.add('row', 'seating-row', 'text-center');
  div1.classList.add('col-xs-1', 'row-number');
  div2.classList.add('col-xs-5');
  div3.classList.add('col-xs-5');
  if(numbers === 6){
    for(let i = 0; i < 3; i++){
      div2.appendChild(createPlase(letters[i]));
    }
    for(let i = 3; i < 6; i++){
      div3.appendChild(createPlase(letters[i]));
    }
  }
  if(numbers === 4){
    div2.appendChild(createPlase(''));
    for(let i = 0; i < 2; i++){
      div2.appendChild(createPlase(letters[i]));
    }
    for(let i = 2; i < 4; i++){
      div3.appendChild(createPlase(letters[i]));
    }
    div3.appendChild(createPlase(''));
  }
  if(numbers === 0){
    for(let i = 0; i < 3; i++){
      div2.appendChild(createPlase(''))
    }
    for(let i = 3; i < 6; i++){
      div3.appendChild(createPlase(''))
    }
  }
  
  div1.appendChild(h2);
  div.appendChild(div1);
  div.appendChild(div2);
  div.appendChild(div3);

  return div;
}

function createRows(plan){
  plan.scheme.forEach((elem,index)  => {
    switch(elem){
      case 6:
        seatMapDiv.appendChild(createRow(index+1, 6, plan.letters6));
        break;
      case 4:
        seatMapDiv.appendChild(createRow(index+1, 4, plan.letters4));
        break;
      case 0:
        seatMapDiv.appendChild(createRow(index+1, 0));
        break;
    }
  })
}