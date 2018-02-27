'use strict';
function createElement(node){
  if((typeof node === 'string') || (typeof node === 'number')){
    return document.createTextNode(node);
  }
  const tmp = document.createElement(node.name);
  if(node.childs){
    for(let child of node.childs){
      tmp.appendChild(createElement(child));
    }
  }
  if(node.props){
    Object.keys(node.props).forEach(function(key) {
      tmp.setAttribute(key, node.props[key]);
    });
  }
  return tmp;
}