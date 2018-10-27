var siteDetailsApp = new Vue({
  el: '#siteDetailsMain',
  data: {
    siteDetails: [],
  },

  methods: {

    gotoTurbine(tid) {
      console.log('TEST');
      window.location = 'dashboard.html?turbineDeployedId=' + tid;
    }
  },

  created() {

    const url = new URL(window.location.href);
    console.log(url);
    const siteId = url.searchParams.get("siteId");
    console.log(siteId);
    this.siteId = siteId;

    fetch('api/turbineDeployed.php?siteId=' + siteId)
      .then(response => response.json())
      .then(json => {
        siteDetailsApp.siteDetails = json
      })
      .catch(err => {
        console.log('ERROR:');
        console.log(err);
      })
  }
})
