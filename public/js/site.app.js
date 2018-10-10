var siteApp = new Vue({
  el: '#siteMain',
  data: {
    site: [],
    siteForm: { },
  },

methods: {

  fetchSites(){
    fetch('api/site.php')
    .then( response => response.json() )
    .then( json => {siteApp.site = json} )
    .catch( err => {
      console.log('SITE FETCH ERROR:');
      console.log(err);
    })
  },

  gotoSite(sid) {
      window.location = 'siteDetails.html?siteId=' + sid;
    }
},

  created () {

    this.fetchSites();

  }
})
