<?php

require_once(__DIR__ . '/Database.php');
require_once(__DIR__ . '/S3.php');
header('Content-type:application/json; cahrset=UTF-8');
header("Access-Control-Allow-Origin: *");

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
