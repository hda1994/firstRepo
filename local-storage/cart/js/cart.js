'use strict';
let colors  = new XMLHttpRequest();
colors.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
colors.send();
colors.addEventListener('load', ()=>{
//  console.log(colors.response);
  showColors(JSON.parse(colors.response));
});

let sizes = new XMLHttpRequest();
sizes.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
sizes.send();
sizes.addEventListener('load', ()=>{
//  console.log(sizes.response);
  showSizes(JSON.parse(sizes.response));
});

let cart = new XMLHttpRequest();
cart.open('GET', 'https://neto-api.herokuapp.com/cart');
cart.send();
cart.addEventListener('load', ()=>{
//  console.log(cart.response);
//    showCarts(JSON.parse(cart.response)); 
});

let button = document.getElementById('AddToCartText');
button.addEventListener('click', ()=>{
  
});



let colorBlock = document.getElementById('colorSwatch');
let sizeBlock = document.getElementById('sizeSwatch');
let cartBlock = document.getElementById('quick-cart');
let boxBlock = document.getElementById('quick-cart');

function craeteColor(color, avail, colorText, colorCode, check){
  let available = avail ? 'available': 'soldout';
  let div1 = document.createElement('div');
  div1.dataset.value = color;
  div1.classList.add('swatch-element','color', color, available);
  let div2 = document.createElement('div');
  div2.classList.add('tooltip');
  div2.value = colorText;
  let input = document.createElement('input');
  input.quickbeam = 'color';
  input.id = 'swatch-1-' + color;
  input.type = 'radio';
  input.name = 'color';
  input.value = color;
  input.checked = check;
  input.disabled = avail;
  let label = document.createElement('label');
  label.for = 'swatch-1-'+ color;
  label.style.borderColor = color;
  let span = document.createElement('span');
  span.style.backgroundColor = colorCode;
  let img = document.createElement('img');
  img.classList.add('crossed-out');
  img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
  div1.addEventListener('click',()=>{
    if(event.target == label){
      let a = event.target.parentElement.parentElement.querySelectorAll('input');
      for(let r of a){
        r.checked = false;
      }
      event.target.previousElementSibling.checked = true;
    }
    if(event.target == span){
      let a = event.target.parentElement.parentElement.parentElement.querySelectorAll('input');
      for(let r of a){
        r.checked = false;
      }
      event.target.parentElement.previousElementSibling.checked = true;
    }
  });
  label.appendChild(span);
  label.appendChild(img);
  div1.appendChild(div2);
  div1.appendChild(input);
  div1.appendChild(label);
  colorBlock.appendChild(div1);
}

function craeteSize(size, avail, sizeText, check){
  let available = avail ? 'available': 'soldout';
  let div1 = document.createElement('div');
  div1.dataset.value = size;
  div1.classList.add('swatch-element','color', size, available);

  let input = document.createElement('input');
  input.id = 'swatch-0-' + size;
  input.type = 'radio';
  input.name = 'size';
  input.value = size;
  input.checked = check;
  input.disabled = avail;
  let label = document.createElement('label');
  label.for = 'swatch-0-'+ size;
  label.textContent = sizeText;
  let img = document.createElement('img');
  img.classList.add('crossed-out');
  img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
  div1.addEventListener('click',()=>{
    if(event.target == label){
      let a = event.target.parentElement.parentElement.querySelectorAll('input');
      for(let r of a){
        r.checked = false;
      }
      event.target.previousElementSibling.checked = true;
    }
  });
  label.appendChild(img);
  div1.appendChild(input);
  div1.appendChild(label);
  
  sizeBlock.appendChild(div1);
}

function craeteCart(id, src, title, count){
  let div1 = document.createElement('div');
  div1.id = 'quick-cart-product-' + id;
  div1.classList.add('quick-cart-product', 'quick-cart-product-static');
  div1.style.opacity = 1;
  let div2 = document.createElement('div');
  div2.classList.add('quick-cart-product-wrap');
  let img = document.createElement('img');
  img.src = src;
  img.title = title;
  let span1 = document.createElement('span');
  span1.classList.add('s1');
  span1.style.backgroundColor = '#000';
  span1.style.opacity = 0.5;
  span1.textContent = '$800.00';
  let span2 = document.createElement('span');
  span2.classList.add('s2');
  
  let span3 = document.createElement('span');
  span3.classList.add('count', 'hide', 'fadeUp');
  span3.id = 'quick-cart-product-count-' + id;
  span3.textContent = count;
  
  let span4 = document.createElement('span');
  span4.classList.add('quick-cart-product-remove', 'remove');
  span4.dataset.id = id;
  
  div2.appendChild(img);
  div2.appendChild(span1);
  div2.appendChild(span2);
  div1.appendChild(div2);
  div1.appendChild(span3);
  div1.appendChild(span4);

  cartBlock.appendChild(div1);
}

function craeteBox(id, src, title, count){
  let a = document.createElement('a');
  a.id = 'quick-cart-pay';
  a.classList.add('cart-ico', 'open');
  a.quickbeam = 'cart-pay';
  

  let span1 = document.createElement('span');
  
  let strong = document.createElement('strong');
  strong.classList.add('quick-cart-text');
  strong.textContent = 'Оформить заказ';
  
  let br = document.createElement('br');

  let span2 = document.createElement('span');
  span2.id = 'quick-cart-price';
  span2.textContent = '$800.00';


  strong.appendChild(br);
  span1.appendChild(strong);
  span1.appendChild(span2);
  a.appendChild(span1);


  cartBlock.appendChild(div1);
}



function showColors(colors){
  for(let color of colors){
    craeteColor(color.type, color.isAvailable, color.title, color.code, false);
  }
}

function showSizes(sizes){
  for(let size of sizes){
    craeteSize(size.type, size.isAvailable, size.title, false);
  }
}

function showCarts(carts){
  for(let cart of carts){
    craeteCart(cart.id, cart.src, cart.title, cart.count);
  }
}
