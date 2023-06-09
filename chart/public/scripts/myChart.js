
const nbValues = 12;
const defaultValue = 1;
const MIN_VALUE = 0;
const MAX_VALUE = 10;

const socket = io();
socket.on('ping', () => console.log("ping")); //send ping from server
socket.emit("pong"); //send pong to server

const allLabels = new Array(nbValues).fill(defaultValue).map( (_,i) => String.fromCharCode('A'.charCodeAt(0)+i));


const ctxt = document.getElementById('myChart').getContext('2d');

let myChart = new Chart(ctxt, {
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


  function addData(res) {
    myChart.data.labels.unshift(myChart.data.labels.pop());
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.unshift(dataset.data.pop());
        dataset.data[0] = res;
    });
      myChart.update();
}
socket.on('val', (arg) => {console.log(arg); addData(arg);});
