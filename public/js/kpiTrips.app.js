var kpiTripsApp = new Vue({
  el: '#kpiTrips',
  data: {
    sensorTimeSeries: [],
  },

  methods:{
    fetchSensorTimeSeries (turbineDeployedId){
      fetch('/api/sensorTimeSeries.php?turbineDeployedId='+turbineDeployedId)
      .then( response => response.json() )
      .then( json => {
        kpiTripsApp.sensorTimeSeries = json;
        kpiTripsApp.formatData();
        kpiTripsApp.buildTripsChart();
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
          entry.trips = Number(entry.trips);
        }
      )
    },



  created () {

    const url = new URL(window.location.href);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    console.log('Turbine: '+ turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchSensorTimeSeries(turbineDeployedId);

  }
})
