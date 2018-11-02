var kpiOutputApp = new Vue({
  el: '#kpiOutput',
  data: {
    sensorTimeSeries: [],
  },

  methods: {
    fetchSensorTimeSeries(turbineDeployedId) {
      fetch('/api/sensorTimeSeries.php?turbineDeployedId=' + turbineDeployedId)
        .then(response => response.json())
        .then(json => {
          kpiOutputApp.sensorTimeSeries = json;
          kpiOutputApp.formatData();
          kpiOutputApp.buildOutputChart();
        })
        .catch(err => {
          console.log('Error getting data');
          console.log(err);
        })
    },

    formatData() {
      this.sensorTimeSeries.forEach(
        (entry, index, arr) => {
          entry.serialNumber = entry.serialNumber
          entry.dateCollected = Date.parse(entry.dataCollectedDate);
          entry.output = Number(entry.output);
        }
      )
    },

    //Output Chart
    buildOutputChart() {

      var series = {};
      // console.log(series);

      Array.prototype.forEach.call(this.sensorTimeSeries, function(i) {

        if (!(i.sensorDeployedId in series)) {
          series[i.sensorDeployedId] = {
            name: i.sensorSerialNumber + '(' + i.sensorName + ')',
            data: []
          };
        }
        series[i.sensorDeployedId].data.push([i.dateCollected, i.output]);
      });

      // console.log(Object.values(series));

      Highcharts.chart('outputChart', {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: 'Output over Time'
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Output'
          }
        },
        legend: {
          enabled: true
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

        series: Object.values(series)
      });
    },
  },

  created() {

    const url = new URL(window.location.href);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    //    console.log('Turbine: '+ turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchSensorTimeSeries(turbineDeployedId);



  }
})
