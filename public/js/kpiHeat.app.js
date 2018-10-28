var kpiHeatApp = new Vue({
  el: '#kpiHeat',
  data: {
    sensorTimeSeries: [],
  },

  methods: {
    fetchSensorTimeSeries(turbineDeployedId) {
      fetch('/api/sensorTimeSeries.php?turbineDeployedId=' + turbineDeployedId)
        .then(response => response.json())
        .then(json => {
          kpiHeatApp.sensorTimeSeries = json;
          kpiHeatApp.formatData();
          kpiHeatApp.buildHeatChart();
        })
        .catch(err => {
          console.log('Error getting data');
          console.log(err);
        })
    },

    formatData() {
      this.sensorTimeSeries.forEach(
        (entry, index, arr) => {
          entry.heatRate = Number(entry.heatRate);
          entry.output = Number(entry.output);
        }
      )
    },

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
          data: kpiHeatApp.sensorTimeSeries.map(entry => [entry.heatRate, entry.output])

        }]
      })
    }
  },

  created() {

    const url = new URL(window.location.href);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    console.log('Turbine: ' + turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchSensorTimeSeries(turbineDeployedId);
  }
})
