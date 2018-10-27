var dashboardApp = new Vue({
  el: '#dashboardApp',
  data: {

    dashboardAppForm: [],

  },

  methods: {
    goBackSite() {
      const url = new URL(window.location.href);
      const siteId = url.searchParams.get("siteId");
      console.log(siteId);
      window.location = 'siteDetails.html?siteId=' + siteId;
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
