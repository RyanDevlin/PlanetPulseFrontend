const ctx = document.getElementById('myChart');
//const DATA_COUNT = 12;
//const labels = [];
//for (let i = 0; i < DATA_COUNT; ++i) {
//  labels.push(i.toString());
//}

const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

const NAMED_COLORS = [
    CHART_COLORS.red,
    CHART_COLORS.orange,
    CHART_COLORS.yellow,
    CHART_COLORS.green,
    CHART_COLORS.blue,
    CHART_COLORS.purple,
    CHART_COLORS.grey,
];

const plugin = {
    id: 'custom_canvas_background_color',
    backgroundColor: "transparent",
    //beforeDraw: (chart) => {
    //const ctx = chart.canvas.getContext('2d');
    //ctx.save();
    //ctx.globalCompositeOperation = 'destination-over';
    //ctx.fillStyle = 'lightGreen';
    //ctx.fillRect(0, 0, chart.width, chart.height);
    //ctx.restore();
    //}
};

const datapoints2020 = [415.38, 416.92, 416.94, 419.28, 419.53, 419.47, NaN, NaN, NaN, NaN, NaN, NaN];
const datapoints2021 = [413.6, 414.53, 414.09, 416.68, 417.06, 416.58, 415.47, 413.4, 411.6, 411.28, 411.99, 413.63];
var months = luxon.Info.months('short')
for (let i = 0; i < 12; i++) {
  //months.push(moment().month(i+1).date(0).startOf('month'))
  months.push(luxon.DateTime.DATETIME_SHORT.month())
}

//console.log(moment.monthsShort())
console.log(months)

const data = {
  labels: months,
  datasets: [
    {
      label: '2020',
      data: datapoints2020,
      borderColor: CHART_COLORS.purple,
      fill: false,
      cubicInterpolationMode: 'monotone',
      tension: 0.4
    }, {
      label: '2021',
      data: datapoints2021,
      borderColor: CHART_COLORS.red,
      fill: false,
      tension: 0.4
    }
  ]
};

const myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: 'NOAA Atmospheric Data',
          color: 'black',
          font: {
            size: 30,
            family: "'Courier New', monospace",
            weight: 'bold',
          }
        },
        legend: {
          labels: {
            color: 'black',
            font: {
              size: 15,
              family: "'Courier New', monospace",
              weight: 'bold',
            }
          }
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Month",
            color: 'black',
            font: {
              size: 20,
              family: "'Courier New', monospace",
              weight: 'bold',
            }
          },
          type: 'time',
          time: {
            unit: 'month'
          },
          grid: {
            color: 'black'
          },
          ticks: {
            color: 'black',
            font: {
              size: 15,
              family: "'Courier New', monospace",
              weight: 'bold',
            }
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'CO2 (PPM)',
            color: 'black',
            font: {
              size: 20,
              family: "'Courier New', monospace",
              weight: 'bold',
            }
          },
          grid: {
            color: 'black'
          },
          ticks: {
            color: 'black',
            font: {
              size: 15,
              family: "'Courier New', monospace",
              weight: 'bold',
            }
          },
          suggestedMin: 410,
          suggestedMax: 420
        },
      }
    },
    plugins: [plugin],
  });