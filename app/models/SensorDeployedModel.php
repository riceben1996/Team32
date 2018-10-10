<?php

///////////TANU UPLOAD THIS FILE///////////////////////////////////////////////////

class SensorDeployed
{
  public $sensorDeployedId;
  public $sensorId;
  public $turbineDeployedId;
  public $serialNumber;
  public $deployedDate;

  public function __construct($data) {
    $this->sensorDeployedId = $data['sensorDeployedId'];
    $this->sensorId = $data['sensorId'];
    $this->turbineDeployedId = $data['turbineDeployedId'];
    $this->serialNumber = $data['serialNumber'];
    $this->deployedDate = $data['deployedDate'];
  }

  public static function fetchSensorDeployed() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM sensorDeployed';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSensorDeployed =  new SensorDeployed($row);
      array_push($arr, $theSensorDeployed);
    }
    return $arr;
  }
}
