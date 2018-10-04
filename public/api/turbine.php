<?php
require '../../app/common.php';
// 1. Go to the database and get all turbines
$turbines = Turbine::fetchTurbines();
// 2. Convert to JSON
$json = json_encode($turbines, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
