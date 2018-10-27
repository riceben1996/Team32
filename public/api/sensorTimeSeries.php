<?php

require '../../app/common.php';

$turbineDeployedId = intval($_GET['turbineDeployedId'] ?? 0);

// 1. Go to the database and get all teams
$sensorTimeSeries = SensorTimeSeries::fetchSensorTimeSeries($turbineDeployedId);
// 2. Convert to JSON
$json = json_encode($sensorTimeSeries, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
