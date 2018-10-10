<?php

require '../../app/common.php';

$siteId = intval($_GET['siteId'] ?? 0);

// 1. Go to the database and get all turbines
$turbineDeployed = TurbineDeployed::fetchTurbineDeployed($siteId);
// 2. Convert to JSON
$json = json_encode($turbineDeployed, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
