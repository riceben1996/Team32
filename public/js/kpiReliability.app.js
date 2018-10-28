var kpiReliabilityApp = new Vue({
  el: '#kpiReliability',
  data: {
    sensorTimeSeries: [],
  },

  methods:{
    fetchSensorTimeSeries (turbineDeployedId){
      fetch('/api/sensorTimeSeries.php?turbineDeployedId='+turbineDeployedId)
      .then( response => response.json() )
      .then( json => {
        kpiReliabilityApp.sensorTimeSeries = json;
        kpiReliabilityApp.formatData();
        kpiReliabilityApp.buildReliabilityChart();
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
          entry.output = Number(entry.output);
        }
      )
    },

/////

  created () {

    const url = new URL(window.location.href);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    console.log('Turbine: '+ turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchSensorTimeSeries(turbineDeployedId);
    
  }
})
