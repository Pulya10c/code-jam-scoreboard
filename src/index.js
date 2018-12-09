import downloadData from './downloadData';
import templateTable from './templateTable';
import setComparison from './setComparison';

const dataSours = downloadData('./data/sessions', './data/users');
const dataSoursOld = downloadData('./data/sessions-old', './data/users-old');
const resultNow = templateTable(dataSours);
const resultOld = templateTable(dataSoursOld);

const table = document.createElement('table');
const divCanvas = document.createElement('div');
const div = document.createElement('div');
const nameTab = document.createElement('h1');

document.querySelector('body').appendChild(divCanvas);

let checkState = '';

divCanvas.className = 'canvas';
divCanvas.innerHTML = '<canvas id="myChart" width="100%" height="25%"></canvas>';
document.querySelector('.space').appendChild(divCanvas);
div.id = 'draw';
document.querySelector('.wrapper').appendChild(div);

const colorSet = new Set();
const ctx = document.getElementById('myChart').getContext('2d');
const chartConfig = {
  type: 'line',
  data: {
    labels: dataSours[1].map(item => item.name),
    datasets: [],
  },
  options: {
    title: {
      display: true,
      text: 'Comparison of results',
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  },
};
const myChart = new Chart(ctx, chartConfig);

const generateRandomColor = () => {
  let color = '';
  for (let i = 0; i < 3; i++) {
    const colorComponent = Math.floor(Math.random() * 255);
    color += colorComponent.toString(16);
  }
  return color;
};

const addUserToChart = (config, setName, setData) => {
  const name = setName;
  const Data = setData;
  let randomColor;
  do {
    randomColor = generateRandomColor();
  } while (colorSet.has(randomColor));
  colorSet.add(randomColor);
  const color = `#${randomColor}`;

  const newUser = {
    label: name,
    data: Data,
    backgroundColor: color,
    borderColor: color,
    borderWidth: 2,
    fill: false,
  };

  config.data.datasets.push(newUser);
  myChart.update();
};

const removeUserToChart = ({ data: { datasets } }, name) => {
  if (name) {
    const names = datasets.map(user => user.label);
    const index = names.indexOf(name);
    if (index === -1) {
      return;
    }
    datasets.splice(index, 1);

    myChart.update();
  }
};

document.querySelector('.space').addEventListener('click', (e) => {
  if (e.target.className === 'one' || e.target.className === 'two' || e.target.className === 'three') {
    if (e.target.className === 'one' && e.target.className !== checkState) {
      divCanvas.style.display = '';
      chartConfig.data.datasets = [];
      myChart.update();
      nameTab.innerHTML = `Game results ${dataSours[1][0].game} 2018Q1`;
      table.innerHTML = resultNow;
      checkState = 'one';
    }

    if (e.target.className === 'two' && e.target.className !== checkState) {
      chartConfig.data.datasets = [];
      divCanvas.style.display = '';
      myChart.update();
      nameTab.innerHTML = `Game results ${dataSours[1][0].game} 2018Q3`;
      table.innerHTML = resultOld;
      checkState = 'two';
    }

    if (e.target.className === 'three' && e.target.className !== checkState) {
      chartConfig.data.datasets = [];
      divCanvas.style.display = 'none';
      myChart.update();
      nameTab.innerHTML = `Game results ${dataSours[1][0].game} 2018Q1 / 2018Q3`;
      table.innerHTML = setComparison(dataSours, dataSoursOld);
      checkState = 'three';
    }
    document.querySelector('body').insertBefore(nameTab, document.querySelector('body').firstChild);
    document.getElementById('draw').appendChild(table);
  }
});
document.querySelector('#draw').addEventListener('click', (e) => {
  if (e.target.checked && e.target.tagName === 'INPUT') {
    if (checkState === 'one' || checkState === 'two') {
      if (chartConfig.data.datasets.length < 10) {
        addUserToChart(chartConfig, e.target.className, e.target.value.split(','));
      } else alert('limit display charts finished');
    }
  } else if (checkState === 'one' || checkState === 'two') {
    removeUserToChart(chartConfig, e.target.className);
  }
});
