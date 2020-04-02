<?php

require_once(__DIR__ . '/config.php');

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

  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $animal = $data->getData();
    header('Content-type:application/json; cahrset=UTF-8');
    header("Access-Control-Allow-Origin: *");
    echo json_encode($animal);
    exit;
  }

  //mysqlから帰ってくる型
  // if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  //   $post = [
  //     [
  //       "id" => "0",
  //       "age" => "3",
  //       "name" => "namename"
  //     ],
  //     [
  //       "id" => "3",
  //       "age" => "34",
  //       "name" => "na242mename"
  //     ],
  //   ];
  // }

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id;
    $name;
    $age;
    if(isset($_POST["id"])){
      $id = $_POST["id"];
    } else {
      $id = 11999;
    }
    if(isset($_POST["name"])){
      $name = $_POST["name"];
    } else {
      $name = "no_name";
    }
    if (isset($_POST["age"])) {
      $age = $_POST["age"];
    } else {
      $age = 0;
    }

    $post = [[
      "id" => $id,
      "age" => $age,
      "name" => $name
    ]];


    header('Content-type:application/json; cahrset=UTF-8');
    header("Access-Control-Allow-Origin: *");
    echo json_encode($post);
    exit;
  }

?>
