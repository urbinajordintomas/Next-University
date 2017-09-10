<?php
require_once('bdd.php');

$usuario= $_POST['username'];
$clave= $_POST['password'];
$sql = "SELECT * FROM usuarios WHERE email='".$usuario."' and psw='".$clave."'";

$req = $bdd->prepare($sql);
$req->execute();

$events = $req->fetch(PDO::FETCH_OBJ);

 if (count($events) != 0) {
   session_start();
   $_SESSION['id']=$events->id;
  echo ("OK");
 }else {
   echo ("error");
 }


?>
