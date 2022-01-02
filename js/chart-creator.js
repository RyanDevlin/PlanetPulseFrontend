const ctx = document.getElementById('myChart');

const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    theme_red: 'rgb(200, 75, 49)',
    theme_cream: 'rgb(236, 219, 186)',
    theme_black: 'rgb(25, 25, 25)',
    theme_yellow: 'rgb(238, 187, 77)',
};

const NAMED_COLORS = [
    CHART_COLORS.red,
    CHART_COLORS.orange,
    CHART_COLORS.yellow,
    CHART_COLORS.green,
    CHART_COLORS.blue,
    CHART_COLORS.purple,
    CHART_COLORS.grey,
    CHART_COLORS.theme_red,
    CHART_COLORS.theme_cream,
    CHART_COLORS.theme_black,
    CHART_COLORS.theme_yellow,
];

const plugin = {
    id: 'custom_canvas_background_color',
    backgroundColor: "transparent",
};

async function fetchAsync (url) {
  fetch(url)
      .then(response => {
          if (!response.ok) {
              if (response.status == 404) {
                  return "HTTP error " + response.status
              } else if (response.status == 400) {
                  return response.json(); // The API server handles 400 requests gracefully
              }
              throw new Error("HTTP error " + response.status);
          }
          return response.json();
      })
      .then(data => {
          // ...use the data here...
          let results = data["Results"];
          var  datapoints = [];
          for(var i = 0; i < results.length; i++) {
            var obj = results[i];
            //console.log(obj.Average);
            datapoints.push(obj.Average)
          }
          return datapoints
      })
      .catch(error => {
          // ...show/handle error here...
          //drawChart(error.message)
          console.log(error)
      });
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

function roundTo(n, digits) {
  if (digits === undefined) {
      digits = 0;
  }

  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  return Math.round(n) / multiplicator;
}

const drawChart = async () => {
  try {
    var response = await fetch("https://planetpulse.io/v1/co2/?year=2021&limit=200")
    var jsonData = await response.json()

    var results = jsonData["Results"];
    var  data2021 = [];
    var month = 1;
    var sum = 0;
    var count = 0;
    for(var i = 0; i < results.length; i++) {
      var obj = results[i];
      if (obj.Month == month) {
        sum += obj.Average;
        count += 1;
      } else {
        data2021.push(roundTo(sum/count,2))
        month = obj.Month;
        sum = 0;
        count = 0;
      }
    }
    data2021.push(roundTo(sum/count,2))
    
    var response = await fetch("https://planetpulse.io/v1/co2?year=2020&limit=200")
    var jsonData = await response.json()

    var results = jsonData["Results"];
    var  data2020 = [];
    var month = 1;
    var sum = 0;
    var count = 0;
    for(var i = 0; i < results.length; i++) {
      var obj = results[i];
      if (obj.Month == month) {
        sum += obj.Average;
        count += 1;
      } else {
        data2020.push(roundTo(sum/count,2))
        month = obj.Month;
        sum = 0;
        count = 0;
      }
    }
    data2020.push(roundTo(sum/count,2))
    
    var data = {
      labels: months,
      datasets: [
        {
          label: '2020',
          data: data2020,
          borderColor: CHART_COLORS.theme_yellow,
          fill: false,
          cubicInterpolationMode: 'monotone',
          tension: 0.4
        }, {
          label: '2021',
          data: data2021,
          borderColor: CHART_COLORS.theme_red,
          fill: false,
          tension: 0.4
        }
      ]
    };
    console.log(data)

    const myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'NOAA Atmospheric Data',
            color: CHART_COLORS.theme_cream,
            font: {
              size: 30,
              family: "'Robato', monospace",
              weight: 'bold',
            }
          },
          legend: {
            labels: {
              color: CHART_COLORS.theme_cream,
              font: {
                size: 15,
                family: "'Robato', monospace",
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
              color: CHART_COLORS.theme_cream,
              font: {
                size: 20,
                family: "'Robato', monospace",
                weight: 'bold',
              }
            },
            grid: {
              color: 'theme_black'
            },
            ticks: {
              color: CHART_COLORS.theme_cream,
              font: {
                size: 15,
                family: "'Robato', monospace",
                weight: 'bold',
              }
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'CO2 (PPM)',
              color: CHART_COLORS.theme_cream,
              font: {
                size: 20,
                family: "'Robato', monospace",
                weight: 'bold',
              }
            },
            grid: {
              color: 'theme_black'
            },
            ticks: {
              color: CHART_COLORS.theme_cream,
              font: {
                size: 15,
                family: "'Robato', monospace",
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

  } catch (err) {
     console.log(err)
  }
}

drawChart();