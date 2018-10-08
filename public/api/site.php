<?php
require '../../app/common.php';
// 1. Go to the database and get all turbines
$sites = Site::fetchSites();
// 2. Convert to JSON
$json = json_encode($sites, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
