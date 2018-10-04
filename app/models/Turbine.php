<?php
class Turbine
{
  public $turbineId;
  public $turbineName;
  public $turbineDescription;
  public $capacity;
  public $rampUpTime;
  public $maintenanceInterval;

  public function __construct($data) {
    $this->turbineId = intval($data['turbineId']);
    $this->turbineName = $data['turbineName'];
    $this->turbineDescription = $data['turbineDescription'];
    $this->capcity = intval($data['capcity']);
    $this->rampUpTime = intval($data['rampUpTime']);
    $this->maintenanceInterval = floatval($data['maintenanceInterval']);
  }

  public static function fetchTurbines() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM turbine';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theTurbine =  new Turbine($row);
      array_push($arr, $theTurbine);
    }
    return $arr;
  }
}
