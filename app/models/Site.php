<?php
class Site
{
  public $siteId;
  public $clientId;
  public $clientName;
  public $siteName;
  public $siteDescription;
  public $primaryContact;
  public $capacity;
  public $commercialDate;
  public $address;


  public function __construct($data) {
    $this->siteId = intval($data['siteId']);
    $this->clientId = intval($data['clientId']);
    $this->clientName = $data['clientName'];
    $this->siteName = $data['siteName'];
    $this->siteDescription = $data['siteDescription'];
    $this->primaryContact = $data['primaryContact'];
    $this->capacity = $data['capacity'];
    $this->commercialDate = $data['commercialDate'];
    $this->address = $data['Address'];
  }

  public static function fetchSites() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM site_endpoint';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSite =  new Site($row);
      array_push($arr, $theSite);
    }
    return $arr;
  }

  public static function fetchSite(int $siteId) {
    echo $siteId;
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM site_endpoint where siteId=?';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute(
      [$siteId]
    );
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSite =  new Site($row);
      array_push($arr, $theSite);
    }
    return $arr;
  }
}
