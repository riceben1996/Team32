var commentApp = new Vue({
  el: '#commentMain',
  data: {
    comment: [ ],
    commentForm: { },
  },

  methods: {
    handleCommentForm(e) {
      e.preventDefault();

      const s = JSON.stringify(this.commentForm);
      //console.log(s);

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
        comment: null
        }
      },
    },


  created () {

    this.commentForm = this.getEmptyCommentForm();

    fetch('api/comment.php')
    .then( response => response.json() )
    .then( json => {commentApp.comment = json} )
    .catch( err => {
      console.log('ERROR:');
      console.log(err);
    })
  }
})
