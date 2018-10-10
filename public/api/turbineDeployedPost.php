<?php

$turbineDeployed = new TurbineDeployed($_POST);

$turbineDeployed->create();

echo json_encode($turbineDeployed);
