<?php

// Database details

$host = "localhost";
$user = "root";
$password = "";
$database = "bejjacredit";


// Create connection

$conn = new mysqli(
    $host,
    $user,
    $password,
    $database
);


// Check connection

if($conn->connect_error){

    die("Database Connection Failed: " . $conn->connect_error);

}


?>
