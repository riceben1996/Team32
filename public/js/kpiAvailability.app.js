var kpiAvailabilityApp = new Vue({
  el: '#kpiAvailability',
  data: {
    sensorTimeSeries: [],
  },

  methods:{
    fetchSensorTimeSeries (turbineDeployedId){
      fetch('/api/sensorTimeSeries.php?turbineDeployedId='+turbineDeployedId)
      .then( response => response.json() )
      .then( json => {
        kpiAvailabilityApp.sensorTimeSeries = json;
        kpiAvailabilityApp.formatData();
        kpiAvailabilityApp.buildOutputChart();
      } )
      .catch( err => {
        console.log('Error getting data');
        console.log(err);
      })
    },

    formatData(){
      this.sensorTimeSeries.forEach(
        (entry, index, arr) => {
          entry.dateCollected = Date.parse(entry.dataCollectedDate);
          entry.availability = Number(entry.availability);
        }
      )
    },

    buildAvailabilityChart(){
        Highcharts.chart('availabilityChart', {
        xAxis: {
            enabled:true,
            type: 'datetime'
        },
        yAxis: {
            enabled:true
        },
        title: {
            text: 'Scatter plot with regression line'
        },
        series: [
        {
            type: 'scatter',
            name: 'Observations',
            data: kpiAvailabilityApp.sensorTime.map( entry=>
              [entry.dateCollected, entry.availability]
            ),
            marker: {
                radius: 4
            }
        }]
    });
    }
  },

  created () {

    const url = new URL(window.location.href);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    console.log('Turbine: '+ turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchSensorTimeSeries(turbineDeployedId);



  }
})