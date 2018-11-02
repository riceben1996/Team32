var dashboardApp = new Vue({
  el: '#dashboardApp',
  data: {
    dashboard: [
      [{
        "turbineSerialNumber": ""
      }]
    ],
    dashboardSite: [
      [{
        "siteName": ""
      }]
    ],
    kpiViewTs: []
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
    // console.log(turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    fetch('/api/sensorTimeSeries.php?turbineDeployedId=' + turbineDeployedId)
      .then(response => response.json())
      .then(json => {
        dashboardApp.dashboard = json
      })
      .then( test => {
        console.log("outside if")
        if (dashboardApp.dashboard === undefined || dashboardApp.dashboard.length == 0) {
          dashboardApp.dashboard.turbineSerialNumber === "(NO DATA)"
          console.log("inside if")
        }}
      )
      .catch(err => {
        console.log('ERROR:');
        console.log(err);
      })

    const siteId = url.searchParams.get("siteId");
    // console.log(siteId);
    this.siteId = siteId;

    fetch('/api/siteName.php?siteId=' + siteId)
      .then(response => response.json())
      .then(json => {
        // console.log('TESTING THIS BITCH')
        dashboardApp.dashboardSite = json
      })
      .catch(err => {
        console.log('ERROR: is this failing');
        console.log(err);
      })
  }
})
