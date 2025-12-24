<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$enlace = mysqli_connect("localhost", "root", "", "gallery_web");

if (!$enlace) {
    echo "Error de depuración: " . mysqli_connect_error();
} else {
    echo "¡Conexión exitosa!";
}
?>