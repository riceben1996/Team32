<?php

require '../../app/common.php';
// 1. Go to the database and get all turbines
$sensors = Sensor::fetchSensors();
// 2. Convert to JSON
$json = json_encode($sensors, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
