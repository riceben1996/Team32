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

        buildAvailabilityChart() {

          var series = {};

          series.forEach( function(i) {

                //$.getJSON('https://www.highcharts.com/samples/data/' + name.toLowerCase() + '-c.json', function(data) {
                if (!(i.sensorDeployedId in series)) {
                  series[i.sensorDeployedId] = { name: i.sensorSerialNumber + '('+i.sensorName+')', data:[]};
                }
              series[i.sensorDeployedId].data.push([i.dateCollected, i.availability]);
          });



                Highcharts.chart('availabilityChart', {
                  xAxis: {
                    enabled: true,
                    type: 'datetime',
                    title: {
                      text: 'Date'
                    }
                  },
                  yAxis: {
                    enabled: true,
                    title: {
                      text: 'Availability Percentage'
                    }
                  },
                  title: {
                    text: 'Scatter Plot of Availability'
                  },
                  // series: [{
                  //   type: 'scatter',
                  //   name: 'Observations',
                  //   data: kpiAvailabilityApp.sensorTimeSeries.map(entry => [entry.dateCollected, entry.availability]),
                  //   marker: {
                  //     radius: 4
                  //   }
                  // }]
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
