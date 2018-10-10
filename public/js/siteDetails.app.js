var siteDetailsApp = new Vue({
  el: '#siteDetailsMain',
  data: {
    siteDetails: [ ],
    siteDetailsForm: { },
  },

  methods: {

    getEmptySiteDetailsForm() {
      return {
        turbineDeployedId: '',
        turbineId: '',
        siteId: '',
        serialNumber: '',
        deployedDate: '',
        totalFiredHours: '',
        totalStarts: '',
        lastPlannedOutageDate: '',
        lastUnplannedOutageDate: '',
        }
      },
    },


  created () {

    this.siteDetailsForm = this.getEmptySiteDetailsForm();

    const url = new URL(window.location.href);
    //console.log(url);
    const siteId = url.searchParams.get("siteId");
    //console.log(clientId);
    this.siteId = siteId;

    fetch('api/siteDetails.php?siteId='+siteId)
    .then( response => response.json() )
    .then( json => {siteDetailsApp.siteDetails = json} )
    .catch( err => {
      console.log('ERROR:');
      console.log(err);
    })
  }
})