var turbineApp = new Vue({
  el: '#turbineMain',
  data: {
    turbine: [],
  },

methods: {

  fetchSites(){
    fetch('api/turbine.php')
    .then( response => response.json() )
    .then( json => {turbineApp.turbine = json} )
    .catch( err => {
      console.log('TURBINE FETCH ERROR:');
      console.log(err);
    })
  },

  created () {

    this.fetchSites();

  }
})
