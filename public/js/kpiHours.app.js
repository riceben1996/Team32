var kpiHoursApp = new Vue({
  el: '#kpiHours',
  data: {
    sensorTimeSeries: [],
  },

  methods: {
    fetchSensorTimeSeries(turbineDeployedId) {
      fetch('/api/sensorTimeSeries.php?turbineDeployedId=' + turbineDeployedId)
        .then(response => response.json())
        .then(json => {
          kpiHoursApp.sensorTimeSeries = json;
          kpiHoursApp.formatData();
          kpiHoursApp.buildHoursChart();
        })
        .catch(err => {
          console.log('Error getting data');
          console.log(err);
        })
    },

    formatData() {
      this.sensorTimeSeries.forEach(
        (entry, index, arr) => {
          entry.heatRate = Number(entry.compressorEfficiency);
          entry.firedHours = Number(entry.firedHours);
        }
      )
    },

    buildHoursChart() {
      Highcharts.chart('hoursChart', {
          chart: {
              zoomType: 'x'
          },
          title: {
              text: 'Hours Over Time'
          },
          xAxis: {
              type: 'datetime',
              title: {
                text: 'Date'
              }
          },
          yAxis: {
              title: {
                  text: 'Hours'
              }
          },
          legend: {
              enabled: false
          },
          plotOptions: {
              area: {
                  fillColor: {
                      linearGradient: {
                          x1: 0,
                          y1: 0,
                          x2: 0,
                          y2: 1
                      },
                      stops: [
                          [0, Highcharts.getOptions().colors[0]],
                          [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                      ]
                  },
                  marker: {
                      radius: 2
                  },
                  lineWidth: 1,
                  states: {
                      hover: {
                          lineWidth: 1
                      }
                  },
                  threshold: null
              }
          },

          series: [{
              type: 'area',
              name: 'Hours/Date',
              data: kpiHoursApp.sensorTime.map( entry=>
                [entry.dateCollected, entry.firedHours]
              )
          }]
      });

    },
  },

  created() {

    const url = new URL(window.location.href);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    console.log('Turbine: ' + turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchSensorTimeSeries(turbineDeployedId);
  }
})
