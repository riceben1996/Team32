var kpiReliabilityApp = new Vue({
  el: '#kpiReliability',
  data: {
    sensorTimeSeries: [],
  },

  methods: {
    fetchSensorTimeSeries(turbineDeployedId) {
      fetch('/api/sensorTimeSeries.php?turbineDeployedId=' + turbineDeployedId)
        .then(response => response.json())
        .then(json => {
          kpiReliabilityApp.sensorTimeSeries = json;
          kpiReliabilityApp.formatData();
          kpiReliabilityApp.buildReliabilityChart();
        })
        .catch(err => {
          console.log('Error getting data');
          console.log(err);
        })
    },

    formatData() {
      this.sensorTimeSeries.forEach(
        (entry, index, arr) => {
          entry.dateCollected = Date.parse(entry.dataCollectedDate);
          entry.reliability = Number(entry.reliability);
        }
      )
    },

    buildReliabilityChart() {

      var series = {};
      console.log(series);

      Array.prototype.forEach.call(this.sensorTimeSeries, function(i) {

        if (!(i.sensorDeployedId in series)) {
          series[i.sensorDeployedId] = {
            name: i.sensorSerialNumber + '(' + i.sensorName + ')',
            data: []
          };
        }
        series[i.sensorDeployedId].data.push([i.dateCollected, i.reliability]);
      });

      console.log(Object.values(series));

      Highcharts.chart('reliabilityChart', {
        chart: {
        zoomType: 'x'
        },
        xAxis: {
          enabled: true,
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          enabled: true,
          title: {
            text: 'Reliability'
          }
        },
        title: {
          text: 'Scatter plot of Reliability'
        },
        series: Object.values(series)
      });
    }
  },

  created() {

    const url = new URL(window.location.href);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    //  console.log('Turbine: '+ turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchSensorTimeSeries(turbineDeployedId);

  }
})
