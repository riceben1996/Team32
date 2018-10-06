var commentApp = new Vue({
  el: '#commentMain',
  data: {
    comment: [ ],
    commentForm: { },
  },

  methods: {
    handleCommentForm(e) {

      e.preventDefault();

      const url = new URL(window.location.href);
      //console.log(url);
      const clientId = url.searchParams.get("clientId");
      console.log(clientId);
      this.clientId = clientId;

      /////CREATE JSON OBJECT
      const s = JSON.stringify(this.commentForm);
      console.log(s);

      // POST to remote server
      fetch('api/comment.php', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: s // body data type must match "Content-Type" header
      })
      .then( response => response.json() )
      .then( json => {this.comment.push(json)})
      .catch( err => {
        console.error('COMMENT POST ERROR:');
        console.error(err);
      })

      // Reset form
      this.commentForm = this.getEmptyCommentForm();
    },

    getEmptyCommentForm() {
      return {
        commentId: 0,
        clientId: 0,
        comment: ''
        }
      },
    },


  created () {

    this.commentForm = this.getEmptyCommentForm();

    const url = new URL(window.location.href);
    //console.log(url);
    const clientId = url.searchParams.get("clientId");
    //console.log(clientId);
    this.clientId = clientId;

    fetch('api/comment.php?clientId='+clientId)
    .then( response => response.json() )
    .then( json => {commentApp.comment = json} )
    .catch( err => {
      console.log('ERROR:');
      console.log(err);
    })
  }
})
