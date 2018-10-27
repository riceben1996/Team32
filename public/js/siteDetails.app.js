var siteDetailsApp = new Vue({
  el: '#siteDetailsMain',
  data: {
    siteDetails: [],
    siteDetailsForm: {},
  },

  methods: {

    getEmptySiteDetailsForm() {
      return {
        turbineDeployedId: '',
        turbineId: '',
        siteId: 0,
        serialNumber: '',
        deployedDate: '',
        totalFiredHours: '',
        totalStarts: '',
        lastPlannedOutageDate: '',
        lastUnplannedOutageDate: '',
      }
    },

    gotoTurbine(tid) {
      window.location = 'dashboard.html?turbineDeployedId=' + tid;
    }
  },

  created() {

    this.siteDetailsForm = this.getEmptySiteDetailsForm();

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
