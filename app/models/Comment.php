<?php
class Comment
{
  public $commentId;
  public $clientId;
  public $comment;

  public function __construct($data) {
    $this->commentId = isset($data['commentId']) ? $data['commentId'] : null;
    $this->clientId = intval($data['clientId']);
    $this->comment = $data['comment'];
  }

  public function create() {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT INTO comment (clientId, comment) VALUES (?, ?)';

    $statement = $db->prepare($sql);

    $success = $statement->execute([
      $this->clientId,
      $this->comment,
    ]);

    if (!$success) {
      // TODO: Better error handling
      die('SQL error');
    }
    $this->commentId = $db->lastInsertId();
  }

  public static function fetchComments(int $clientId) {
      // 1. Connect to the database
      $db = new PDO(DB_SERVER, DB_USER, DB_PW);
      // 2. Prepare the query
      $sql = 'SELECT * FROM comment WHERE clientId =?';
      $statement = $db->prepare($sql);
      // 3. Run the query
      $success = $statement->execute(
        [$clientId]
      );
      // 4. Handle the results
      $arr = [];
      while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $theComment =  new Comment($row);
        array_push($arr, $theComment);
      }
      return $arr;
    }
}
