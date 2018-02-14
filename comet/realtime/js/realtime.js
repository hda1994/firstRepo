const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
ws.addEventListener('message', event => {
  if (isFirst) {
    event.data
      .split('},')
      .map(line => line.split(','))
      .forEach(data => { 
      realtime.addData([Number(data[1].replace('}]', '').slice(9))], data[0].replace('[', '').slice(9, 14));
      });
    isFirst = false;
  } 
  else {
    realtime.removeData();
    let e = event.data.split(',');
    realtime.addData([Number(e[1].replace('}','').slice(9))], e[0].slice(9,14));
  }
});
