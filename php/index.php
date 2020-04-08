<?php

require_once(__DIR__ . '/config.php');
header('Content-type:application/json; cahrset=UTF-8');
header("Access-Control-Allow-Origin: http://localhost:3000");

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
  public function postData($name, $age){
    $stmt = $this->_pdo->prepare("insert into animals (name, age)  values (?, ?)");
    $stmt->execute([$name, $age]);
  }
  public function editData($id, $name, $age){
    $stmt = $this->_pdo->prepare("update animals set name = ?, age = ? where id = ?");
    $stmt->execute([$name, $age, $id]);
  }
  public function deleteData($id){
    $stmt = $this->_pdo->query("delete from animals where id = " . $id);
  }
}

  $data = new DataBase();

  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $animal = $data->getData();
    echo json_encode($animal);
  }

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id;
    $name;
    $age;
    if(isset($_POST["id"])){
      $id = $_POST["id"];
    } else {
      $id = "";
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
    switch ($_POST["type"]) {
      case 'post':
        $data->postData($name, $age);
        break;
      case 'edit':
        $data->editData($id, $name, $age);
        break;
      case 'delete':
        $data->deleteData($id);
        break;
      default:
        // code...
        break;
    }
  }

?>
