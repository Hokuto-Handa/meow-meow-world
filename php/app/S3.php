<?php

// require_once(__DIR__ . '/config.php');
require './vendor/autoload.php';
// header('Content-type:application/json; cahrset=UTF-8');
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: http://localhost:3000");
use Aws\S3\S3Client;
use Aws\Exception\AwsException;

class MyS3Client{
  private $_client;
  public function __construct(){
    try {
        //Create a S3Client
        $this->_client = new S3Client([
            'profile' => 'default',
            'region' => 'ap-northeast-1',
            'version' => 'latest'
        ]);
    } catch (S3Exception $e) {
        echo $e->getMessage();
    }
  }
  public function putFileToS3($key, $file){
    $result = $this->_client->putObject([
        'ACL' => 'public-read',
        'Bucket' => 'meow-bucket',
        'Key' => $key,
        'SourceFile' => $file,
    ]);
  }
}
