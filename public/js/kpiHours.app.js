var kpiHoursApp = new Vue({
  el: '#kpiHours',
  data: {
    sensorTimeSeries: [],
  },

  methods: {
    fetchSensorTimeSeries(turbineDeployedId) {
      fetch('/api/sensorTimeSeries.php?turbineDeployedId=' + turbineDeployedId)
        .then(response => response.json())
        .then(json => {
          kpiHoursApp.sensorTimeSeries = json;
          kpiHoursApp.formatData();
          kpiHoursApp.buildHoursChart();
        })
        .catch(err => {
          console.log('Error getting data');
          console.log(err);
        })
    },

    formatData() {
      this.sensorTimeSeries.forEach(
        (entry, index, arr) => {
          entry.heatRate = Number(entry.compressorEfficiency);
          entry.output = Number(entry.output);
        }
      )
    },

    /////////

  created() {

    const url = new URL(window.location.href);
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    console.log('Turbine: ' + turbineDeployedId);
    this.turbineDeployedId = turbineDeployedId;

    this.fetchSensorTimeSeries(turbineDeployedId);
  }
})
