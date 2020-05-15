<?php

require_once(__DIR__ . '/config.php');
header('Content-type:application/json; cahrset=UTF-8');
header("Access-Control-Allow-Origin: http://ec2-13-114-28-204.ap-northeast-1.compute.amazonaws.com");

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

  public function initDB(){
    $this->_pdo->exec('drop table animals');
    $this->_pdo->exec('create table animals (id int auto_increment primary key,name varchar(255),age int,image varchar(255) default "no_image.png");');
    $this->_pdo->exec('insert into animals (name, age, image) values ("にゃんこ", 4, "cat.png");');
    $this->_pdo->exec('insert into animals (name, age, image) values ("うさ太郎", 2, "rabbit.png");');
    $this->_pdo->exec('insert into animals (name, age, image) values ("ふくすけ", 2, "fuku.png");');
    $this->_pdo->exec('insert into animals (name, age, image) values ("みゃあにゃん", 4, "cat2.png");');
    $this->_pdo->exec('insert into animals (name, age, image) values ("うさうさ", 2, "rabbit2.png");');
  }
  public function getData(){
    $stmt = $this->_pdo->query("select * from animals");
    return $stmt->fetchAll(\PDO::FETCH_OBJ);
  }
}

  $data = new DataBase();
  $data->initDB();

  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $animal = $data->getData();
    echo json_encode($animal);
  }
