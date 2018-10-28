var kpiTripsApp = new Vue({
  el: '#kpiTrips',
  data: {
    kpiViewTS: [],
  },

  methods: {
    fetchkpiViewTS(turbineDeployedId) {
      fetch('/api/kpiViewTS.php?turbineDeployedId=' + turbineDeployedId)
        .then(response => response.json())
        .then(json => {
          kpiTripsApp.kpiViewTS = json;
          kpiTripsApp.formatData();
          kpiTripsApp.buildTripsChart();
        })
        .catch(err => {
          console.log('Error getting data Gauge');
          console.log(err);
        })
    },

    formatData() {
      console.log(kpiTripsApp.kpiViewTS);
      console.log(kpiTripsApp.kpiViewTS.tripsPercentage);
      this.kpiViewTS.forEach(
        (entry, index, arr) => {
          entry.tripsPercentage = Number(entry.tripsPercentage);
        }
      )
    },

    buildTripsChart() {
      console.log(kpiTripsApp.kpiViewTS.tripsPercentage);
      Highcharts.chart('tripsChart', {

          chart: {
              type: 'gauge',
              plotBackgroundColor: null,
              plotBackgroundImage: null,
              plotBorderWidth: 0,
              plotShadow: false
          },

          title: {
              text: 'Percentage Chance the Turbine Trips on a Day'
          },

          pane: {
              startAngle: -150,
              endAngle: 150,
              background: [{
                  backgroundColor: {
                      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                      stops: [
                          [0, '#FFF'],
                          [1, '#333']
                      ]
                  },
                  borderWidth: 0,
                  outerRadius: '109%'
              }, {
                  backgroundColor: {
                      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                      stops: [
                          [0, '#333'],
                          [1, '#FFF']
                      ]
                  },
                  borderWidth: 1,
                  outerRadius: '107%'
              }, {
                  // default background
              }, {
                  backgroundColor: '#DDD',
                  borderWidth: 0,
                  outerRadius: '105%',
                  innerRadius: '103%'
              }]
          },

          // the value axis
          yAxis: {
              min: 0,
              max: 100,

              minorTickInterval: 'auto',
              minorTickWidth: 1,
              minorTickLength: 10,
              minorTickPosition: 'inside',
              minorTickColor: '#666',

              tickPixelInterval: 30,
              tickWidth: 2,
              tickPosition: 'inside',
              tickLength: 10,
              tickColor: '#666',
              labels: {
                  step: 2,
                  rotation: 'auto'
              },
              title: {
                  text: 'Trip Rate Percentage'
              },
              plotBands: [{
                  from: 0,
                  to: 5,
                  color: '#55BF3B' // green
              }, {
                  from: 5,
                  to: 15,
                  color: '#DDDF0D' // yellow
              }, {
                  from: 15,
                  to: 100,
                  color: '#DF5353' // red
              }]
          },

          series: [{
              name: 'Trip Rate %',
              data: [this.tripsPercentage],
              tooltip: {
                  valueSuffix: '%'
              }
          }]

      }
      // // Add some life
      // function (chart) {
      //   console.log("is this being hit function");
      //     if (!chart.renderer.forExport) {
      //         setInterval(function () {
      //             var point = chart.series[0].points[0],
      //                 newVal,
      //                 inc = Math.round((Math.random() - 0.5) * 20);
      //
      //             newVal = point.y + inc;
      //             if (newVal < 0 || newVal > 100) {
      //                 newVal = point.y - inc;
      //             }
      //
      //             point.update(newVal);
      //
      //         }, 3000);
      //     }
      // }
    );

    },
  },

  created() {

    const url = new URL(window.location.href);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    console.log('Turbine: ' + turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchkpiViewTS(turbineDeployedId);

  }
})
