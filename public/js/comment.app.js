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
        commentId: 0,
        clientId: 0,
        comment: ''
        }
      },
    },


  created () {

    this.commentForm = this.getEmptyCommentForm();

    var url_string = "http://www.mywebsite.com/myapp?brand=nameOfBrand&user=0123456&type=comm"; //window.location.href
    var url = new URL(url_string);
    var brand = url.searchParams.get("brand");
    console.log(brand);

    // const url = new URL(window.location.href);
    // console.log(url);
    // const clientId = url.serachParams.get("pleasework");
    // console.log(clientId);
    // this.clientId = clientId;

    const clientId = 1;

    fetch('api/comment.php?clientId='+clientId)
    .then( response => response.json() )
    .then( json => {commentApp.comment = json} )
    .catch( err => {
      console.log('ERROR:');
      console.log(err);
    })
  }
})
