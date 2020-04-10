<?php

require_once(__DIR__ . '/config.php');
header('Content-type:application/json; cahrset=UTF-8');
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: http://localhost:3000");

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
  public function postData($name, $age, $imageName){
    $stmt = $this->_pdo->prepare("insert into animals (name, age, image)  values (?, ?, ?)");
    $stmt->execute([$name, $age, $imageName]);
  }
  public function editData($id, $name, $age){
    $stmt = $this->_pdo->prepare("update animals set name = ?, age = ? where id = ?");
    $stmt->execute([$name, $age, $id]);
  }
  public function deleteData($id){
    $stmt = $this->_pdo->query("select image from animals where id = " . $id);
    $imageName = $stmt->fetchColumn();
    $imagePath = "./images/" . $imageName;
    if (unlink($imagePath)){
      echo '削除に成功しました。';
    }else{
      echo '削除に失敗しました。';
    }
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
    $image;
    if(isset($_POST["id"])){
      $id = $_POST["id"];
    }
    if(isset($_POST["name"])){
      $name = $_POST["name"];
    }
    if (isset($_POST["age"])) {
      $age = $_POST["age"];
    }
    if (isset($_FILES["image"]["tmp_name"])) {
      $image = $_FILES["image"]["tmp_name"];
    }
    switch ($_POST["type"]) {
      case 'post':
      //image を imagesフォルダへ
      // echo $_POST["image"];
      // $data = [
      //   "name" => $name,
      //   "age" => $age,
      //   "image" => $image,
      // ];
      // echo json_encode($_FILES["image"]["tmp_name"]);
        $imageName;
        if ($image == null) {
          $imageName = "no_image.png";
        } else {
          $imageName = sprintf(
            '%s_%s.png',
            time(),
            sha1(uniqid(mt_rand(), true))
          );
          $path = __DIR__ . "/images" . "/" . $imageName;
          $res = move_uploaded_file($_FILES["image"]["tmp_name"], $path);
          if ($res === false) {
            throw new \Exception('Could not upload!');
          }
        }
        $data->postData($name, $age, $imageName);
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
