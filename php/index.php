<?php

define('DNS', 'mysql:host=mysql;dbname=database1');
define('USER', 'user');
define('PASS', 'userpass');

class DataBase{
  private $_pdo;
  public function __construct(){
    try {
      $this->_pdo = new \PDO(DNS, USER, PASS);
      $this->_pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    } catch (\Exception $e) {
      echo $e->getMessage();
      exit;
    }
  }
  public function getData(){
    $stmt = $this->_pdo->query("select * from animals");
    return $stmt->fetchAll(\PDO::FETCH_OBJ);
  }
}

  $data = new DataBase();
  $animal = $data->getData();
  header('Content-type:application/json; cahrset=UTF-8');
  header("Access-Control-Allow-Origin: *");
  echo json_encode($animal);
  exit;
?>
