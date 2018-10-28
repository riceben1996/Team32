var dashboardApp = new Vue({
  el: '#dashboardApp',
  data: {
        dashboard: [],
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
    const turbineDeployedId = url.searchParams.get("turbineDeployedId");
    console.log(turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    fetch('/api/sensorTimeSeries.php?turbineDeployedId=' + turbineDeployedId)
      .then(response => response.json())
      .then(json => {
        dashboardApp.dashboard = json
      })
      .catch(err => {
        console.log('ERROR:');
        console.log(err);
      })

  }
})
