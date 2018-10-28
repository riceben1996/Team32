<?php

class kpiViewTS
{
  public $turbineDeployedId;
  public $tripsPercentage;
  public $startsPercentage;

  public function __construct($data) {
    $this->turbineDeployedId = $data['turbineDeployedId'];
    $this->tripsPercentage = $data['tripsPercentage'];
    $this->startsPercentage = $data['startsPercentage'];
  }

  public static function fetchkpiViewTS(int $turbineDeployedId) {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM kpiViewTS where turbineDeployedId=?';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute(
      [$turbineDeployedId]
    );
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $thekpiViewTS =  new kpiViewTS($row);
      array_push($arr, $thekpiViewTS);
    }
    return $arr;
  }
}
