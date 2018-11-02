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
          kpiTripsApp.buildTripsChart();
        })
        .catch(err => {
          console.log('No Data for Gauge');
          // console.log(err);
        })
    },

    buildTripsChart() {
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
                  to: 10,
                  color: '#55BF3B' // green
              }, {
                  from: 10,
                  to: 25,
                  color: '#DDDF0D' // yellow
              }, {
                  from: 25,
                  to: 100,
                  color: '#DF5353' // red
              }]
          },

          series: [{
              name: 'Trip Rate %',
              data: [Number(kpiTripsApp.kpiViewTS[0].tripsPercentage)],
              tooltip: {
                  valueSuffix: '%'
              }
          }]
      }
    );

    },
  },

  created() {

    const url = new URL(window.location.href);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
  //  console.log('Turbine: ' + turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchkpiViewTS(turbineDeployedId);

  }
})
