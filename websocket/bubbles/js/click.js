'use strinct';
let tmp = {};
const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
showBubbles(connection);
document.addEventListener('click', (event) => {
  tmp.x = event.pageX;
  tmp.y = event.pageY;
  connection.send(JSON.stringify(tmp));
});
window.addEventListener('beforeunload', ()=>connection.close());
