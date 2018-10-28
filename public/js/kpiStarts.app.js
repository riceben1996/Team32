var kpiStartsApp = new Vue({
  el: '#kpiStarts',
  data: {
    kpiViewTS: [],
  },

  methods: {
    fetchkpiViewTS(turbineDeployedId) {
      fetch('/api/kpiViewTS.php?turbineDeployedId=' + turbineDeployedId)
        .then(response => response.json())
        .then(json => {
          kpiStartsApp.kpiViewTS = json;
          kpiStartsApp.buildStartsChart();
        })
        .catch(err => {
          console.log('Error getting data Gauge');
          console.log(err);
        })
    },

    buildStartsChart() {
      Highcharts.chart('startsChart', {

          chart: {
              type: 'gauge',
              plotBackgroundColor: null,
              plotBackgroundImage: null,
              plotBorderWidth: 0,
              plotShadow: false
          },

          title: {
              text: 'Percentage Chance the Turbine Starts on a Day'
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
                  text: 'Start Rate Percentage'
              },
              plotBands: [{
                  from: 75,
                  to: 100,
                  color: '#55BF3B' // green
              }, {
                  from: 60,
                  to: 75,
                  color: '#DDDF0D' // yellow
              }, {
                  from: 0,
                  to: 75,
                  color: '#DF5353' // red
              }]
          },

          series: [{
              name: 'Start Rate %',
              data: [Number(kpiStartsApp.kpiViewTS[0].startsPercentage)],
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
    console.log('Turbine: ' + turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchkpiViewTS(turbineDeployedId);

  }
  })
