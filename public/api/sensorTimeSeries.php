<?php

require '../../app/common.php';
// 1. Go to the database and get all turbines
$sensorTimeSeries = SensorTimeSeries::fetchSensorTimeSeries();
// 2. Convert to JSON
$json = json_encode($sensorTimeSeries, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
