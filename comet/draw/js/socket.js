'use strict';
function l(x){
  console.log(x);
}


const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');
//ws.binaryType = 'arraybuffer';
ws.addEventListener('open', event => {
//  l(event)
  ws.send('');
});

//l(window.editor);
window.editor.addEventListener('update', event =>{
  let fileField = event.canvas;  
//  let ggg = fileField.getContext('2d').getImageData(0, 0, fileField.width, fileField.height);
//  let bin = Uint8Array.from(ggg.data);
//  ws.send(bin.buffer); 
  
  let bin = Uint8Array.from(fileField.toDataURL());
  ws.send(bin);
  
});
