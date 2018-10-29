var turbineApp = new Vue({
  el: '#turbineMain',
  data: {
    turbine: [],
    sensor: [],
  },

methods: {

  fetchTurbines(){
    fetch('api/turbine.php')
    .then( response => response.json() )
    .then( json => {turbineApp.turbine = json} )
    .catch( err => {
      console.log('TURBINE FETCH ERROR:');
      console.log(err);
    })
  },

  fetchSensors(){
    fetch('api/sensor.php')
    .then( response => response.json() )
    .then( json => {turbineApp.sensor = json} )
    .catch( err => {
      console.log('SENSOR FETCH ERROR:');
      console.log(err);
    })
  }

},

  created () {

    this.fetchTurbines();
    this.fetchSensors();

  }
})
