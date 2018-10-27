var dashboardApp = new Vue({
  el: '#dashboardApp',
  data: {

    dashboardAppForm: [],

  },

  methods: {
    goBackSite(sid) {
      console.log('TEST');
      window.location = 'siteDetails.html?siteId=' + sid;
    }
  },


  created() {

    const url = new URL(window.location.href);
    console.log(url);
    const turbineDeployedId = url.searchParams.get("turbineDeployedId");
    console.log(turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    fetch('api/turbineDeployed.php?siteId=' + turbineDeployedId)
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
