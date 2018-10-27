<?php

///////////MEG UPLOAD THIS FILE///////////////////////////////////////////////////

class SensorTimeSeries
{
  public $turbineName;
  public $turbineSerialNumber;
  public $sensorName;
  public $sensorSerialNumber;
  public $recordId;
  public $sensorDeployedId;
  public $dataCollectedDate;
  public $output;
  public $heatRate;
  public $compressorEfficiency;
  public $availability;
  public $reliability;
  public $firedHours;
  public $trips;
  public $starts;

  public function __construct($data) {
    $this->turbineName = $data['turbineName'];
    $this->turbineSerialNumber = $data['turbineSerialNumber'];
    $this->sensorName = $data['sensorName'];
    $this->sensorSerialNumber = $data['sensorSerialNumber'];
    $this->recordId = $data['recordId'];
    $this->sensorDeployedId = $data['sensorDeployedId'];
    $this->dataCollectedDate = $data['dataCollectedDate'];
    $this->output = $data['output'];
    $this->heatRate = $data['heatRate'];
    $this->compressorEfficiency = $data['compressorEfficiency'];
    $this->availability = $data['availability'];
    $this->reliability = $data['reliability'];
    $this->firedHours = $data['firedHours'];
    $this->trips = $data['trips'];
    $this->starts = $data['starts'];
  }

  public static function fetchSensorTimeSeries() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM kpiView';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSensorTimeSeries =  new SensorTimeSeries($row);
      array_push($arr, $theSensorTimeSeries);
    }
    return $arr;
  }
}
