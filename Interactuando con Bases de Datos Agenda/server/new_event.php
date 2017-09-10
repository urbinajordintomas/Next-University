<?php

// Connexion à la base de données
require_once('bdd.php');
//echo $_POST['title'];
if (isset($_POST['titulo']) && isset($_POST['start_date']) && isset($_POST['end_date']) && isset($_POST['start_hour'])&& isset($_POST['end_hour'])){

	$title = $_POST['titulo'];
	$start = $_POST['start_date'];
	$end = $_POST['end_date'];
  $horainicio = $_POST['start_hour'];
	$horafin = $_POST['end_hour'];
	session_start();
	$usuarioID=$_SESSION['id'];
	$sql = "INSERT INTO evento(title, fechainicio,horainicio, fechafin,horafin,idusuario) values ('$title', '$start','$horainicio', '$end','$horafin', '$usuarioID')";
	//$req = $bdd->prepare($sql);
	//$req->execute();

	echo "OK";

  $query = $bdd->prepare( $sql );
	if ($query == false) {
	 print_r($bdd->errorInfo());
	 die ('Erreur prepare');
	}
	$sth = $query->execute();
	if ($sth == false) {
	 print_r($query->errorInfo());
	 die ('Erreur execute');
	}

}



?>
