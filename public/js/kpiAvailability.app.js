var kpiAvailabilityApp = new Vue({
  el: '#kpiAvailability',
  data: {
    sensorTimeSeries: [],
  },

  methods: {
    fetchSensorTimeSeries(turbineDeployedId) {
      fetch('/api/sensorTimeSeries.php?turbineDeployedId=' + turbineDeployedId)
        .then(response => response.json())
        .then(json => {
          kpiAvailabilityApp.sensorTimeSeries = json;
          kpiAvailabilityApp.formatData();
          kpiAvailabilityApp.buildDataSeries();
          kpiAvailabilityApp.buildAvailabilityChart();
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
          entry.availability = Number(entry.availability);
        }
      )
    },

    buildDataSeries() {
      var series = {};
      console.log(series);

      series.foreach(function(i) {

        console.log("FOR EACH BEFORE IF");

        if (!(i.sensorDeployedId in series)) {
          series[i.sensorDeployedId] = {
            name: i.sensorSerialNumber + '(' + i.sensorName + ')',
            data: []
          };
          console.log("IF STATEMENT")
        }
        series[i.sensorDeployedId].data.push([i.dateCollected, i.availability]);
        console.log("FOR EACH AFTER IF");
      });

      console.log(series);

    },

    // buildAvailabilityChart() {
    //
    //   // var series = {};
    //   //
    //   // series.forEach( function(i) {
    //   //
    //   //       //$.getJSON('https://www.highcharts.com/samples/data/' + name.toLowerCase() + '-c.json', function(data) {
    //   //       if (!(i.sensorDeployedId in series)) {
    //   //         series[i.sensorDeployedId] = { name: i.sensorSerialNumber + '('+i.sensorName+')', data:[]};
    //   //       }
    //   //     series[i.sensorDeployedId].data.push([i.dateCollected, i.availability]);
    //   // });



    buildAvailabilityChart() {

      Highcharts.chart('availabilityChart', {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: 'Availability Over Time'
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Availability Percentage Over Time'
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

        series: Object.values(series)
      });
    },
  },

  created() {

    const url = new URL(window.location.href);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    //  console.log('Turbine: ' + turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchSensorTimeSeries(turbineDeployedId);



  }
})
