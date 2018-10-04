var turbineApp = new Vue({
  el: '#turbineMain',
  data: {
    turbine: [ ],
  },


  computed: {
    workSpan () {
      return moment(this.workForm.stop +' ' + this.workForm.stop_time)
             .diff(moment(this.workForm.start+' ' + this.workForm.start_time), 'hours', true)
             .toFixed(1);
    }
  },


  methods: {
    handleWorkForm(e) {
      // TODO: Check validity in a better way
      if (this.computed <= 0) {
        console.error("invalid form");
      }

      this.workForm.task_id = this.taskId;
      this.workForm.hours = this.workSpan;
      this.workForm.start_date = this.workForm.start +' '+ this.workForm.start_time;

      const s = JSON.stringify(this.workForm);
      console.log(s);

      // POST to remote server
      fetch('api/turbine.php', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: s // body data type must match "Content-Type" header
      })
      .then( response => response.json() )
      .then( json => {this.work.push(json)})
      .catch( err => {
        console.error('WORK GET ERROR:');
        console.error(err);
      })
    },
    diffAsHours() {
      return 0 //moment().duration(end.diff(startTime)).asHours();
    },
    dateFormat(d) {
      d = d || moment();
      return moment(d).format('YYYY-MM-DD');
    },
    timeFormat(d) {
      d = d || moment();
      return moment(d).format('HH:mm');
    },
    prettyDate(d) {
      return moment(d).format('YYYY-MM-DD HH:mm')
    }
  },
  created () {
    // Populate workForm with default values
    this.workForm = this.getEmptyWorkForm();

    // Do data fetch
    const url = new URL(window.location.href);
    const taskId = url.searchParams.get('taskId');
    console.log('Task: '+ taskId);
    this.taskId = taskId;

    if (!taskId) {
      //TODO: Error? 404?
      //e.g., window.location = '404.html';
    }

    // TODO: Fetch task-specific data
    // fetch('api/task?id=4')
    fetch('api/work.php?taskId='+taskId)
    .then( response => response.json() )
    .then( json => {tasksApp.work = json} )
    .catch( err => {
      console.log('WORK FETCH ERROR:');
      console.log(err);
    })

    fetch('api/team.php')
    .then( response => response.json() )
    .then( json => {tasksApp.teamList = json} )
    .catch( err => {
      console.log('TEAM LIST ERROR:');
      console.log(err);
    })
  }
})
