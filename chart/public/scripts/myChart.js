
const nbValues = 12;
const defaultValue = 1;
const MIN_VALUE = 0;
const MAX_VALUE = 10;
let value = 0;


const allLabels = new Array(nbValues).fill(defaultValue).map( (_,i) => String.fromCharCode('A'.charCodeAt(0)+i));
//const allLabels = ['J','F','M','A','M','J','J','A','S','O','N','D'];

// const displayMessage = msg => document.getElementById('messageZone').appendChild(buildMessage(msg));
const socket = io();
socket.on('ping', () => console.log("ping")); //send ping from server
socket.emit("pong"); //send pong to server
socket.on("val", (arg) => {console.log(arg);});

const ctxt = document.getElementById('myChart').getContext('2d');

// l'objet Chart
const myChart = new Chart(ctxt, {
    type: 'bar',
    data: {
        labels: allLabels,
        datasets: [{
            label : `mes ${nbValues} dernières données`,
            data :  new Array(nbValues).fill(defaultValue),
            backgroundColor: 'rgba(128,255,128,0.5)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
              min: MIN_VALUE,
              max: MAX_VALUE
            }
      }
    }
  });

  function addData(chart, label, data) {
    chart.data.labels.unshift(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.unshift(data);
    });
    removeData(chart);
    chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
}
addData(myChart, '1', myChart.data.datasets.data);