var dashboardApp = new Vue({
  el: '#dashboardApp',
  data: {

    sensorTime: [],

  },

  methods: {
    fetchSensorTime(turbineDeployedId) {
      fetch('api/sensorTime.php?turbineDeployedId=' + turbineDeployedId)
        .then(response => response.json())
        .then(json => {
          dashboardApp.sensorTime = json;
          dashboardApp.formatSensorTime();
          dashboardApp.buildHeatChart();
        })
        .catch(err => {
          console.log('Time Series Get ERROR:');
          console.log(err);
        })
    },

    formatSensorTime() {
      this.sensorTime.forEach(
        (entry, index, arr) => {
          entry.heatRate = Number(entry.heatRate);
          entry.output = Number(entry.output);
        }
      )
    },

    //Output Chart
    buildHeatChart() {

      Highcharts.chart('heatChart', {
        chart: {
          type: 'scatter',
          zoomType: 'xy'
        },
        title: {
          text: ''
        },
        xAxis: {
          enabled: true,
          title: {
            enabled: true,
            text: 'Heat Rate'
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true
        },
        yAxis: {
          title: {
            text: 'Output'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          scatter: {
            marker: {
              radius: 5,
              states: {
                hover: {
                  enabled: true,
                  lineColor: 'rgb(100,100,100)'
                }
              }
            },
            states: {
              hover: {
                marker: {
                  enabled: false
                }
              }
            }
          }
        },
        series: [{
          color: 'rgba(223, 83, 83, .5)',
          data: dashboardApp.sensorTime.map(entry => [entry.heatRate, entry.output])

        }]
      })
    }
  },

  created() {

    // Do data fetch
    const url = new URL(window.location.href);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    console.log('Turbine: ' + turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchSensorTime(turbineDeployedId);



  }
})
