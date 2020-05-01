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
  public function postData($name, $age){
    $imageName = $this->_saveImage();
    $stmt = $this->_pdo->prepare("insert into animals (name, age, image)  values (?, ?, ?)");
    $stmt->execute([$name, $age, $imageName]);
  }
  public function editDataWithoutImage($id, $name, $age){
    $stmt = $this->_pdo->prepare("update animals set name = ?, age = ? where id = ?");
    $stmt->execute([$name, $age, $id]);
  }
  public function editDataWithImage($id, $name, $age){
    //古いイメージの削除
    $this->_removeImage($id);
    //新しいイメージの保存
    $imageName = $this->_saveImage();
    $stmt = $this->_pdo->prepare("update animals set name = ?, age = ?, image = ? where id = ?");
    $stmt->execute([$name, $age, $imageName, $id]);
  }
  public function deleteData($id){
    //イメージの削除
    $this->_removeImage($id);
    //sqlから削除
    $stmt = $this->_pdo->query("delete from animals where id = " . $id);
  }

  private function _removeImage($id){
    $stmt = $this->_pdo->query("select image from animals where id = " . $id);
    $imageName = $stmt->fetchColumn();
    $imagePath = "./images/" . $imageName;
    //imagePathの先頭6文字が数値だったらイメージを消す[cat.png等は消さない]
    $pathLength = strlen($imageName);
    $headPath = substr($imageName, 0, -1 * $pathLength + 6);
    if (is_numeric($headPath)) {
      unlink($imagePath);
    }
  }
  private function _saveImage(){
    $image = $_FILES["image"]["tmp_name"];
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
    return $imageName;
  }

//   public function initializeData() {
//     $stmt = $this->_pdo->query("select id from animals");
//     $animals = $stmt->fetchAll();
//     foreach ($animals as $animal) {
//       $this->deleteData($animal["id"]);
//     }
//     $stmt = $this->_pdo->prepare("insert into animals (name, age, image)  values (?, ?, ?)");
//     $stmt->execute(["にゃんこ", "3", "cat.png"]);
//     $stmt->execute(["うさこ", "2", "rabbit.png"]);
//     $stmt->execute(["みゃーちゃん", "4", "cat2.png"]);
//     $stmt->execute(["うさピョン", "3", "rabbit2.png"]);
//   }
}

  $data = new DataBase();
  $id;
  $name;
  $age;
  $image;



  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $animal = $data->getData();
    echo json_encode($animal);
  }

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(isset($_POST["id"])){
      $id = $_POST["id"];
    }
    if(isset($_POST["name"])){
      $name = $_POST["name"];
    }
    if (isset($_POST["age"])) {
      $age = $_POST["age"];
    }

    switch ($_POST["type"]) {
      case 'post':
        $data->postData($name, $age);
        break;
      case 'edit':
        if (!isset($_FILES["image"]["tmp_name"])) {
          $data->editDataWithoutImage($id, $name, $age);
        }else{
          $data->editDataWithImage($id, $name, $age);
        }
        break;
      case 'delete':
        $data->deleteData($id);
        break;
      default:
        break;
    }
  }

?>
