<?php
$conexion = new mysqli("localhost", "root", "", "gallery_web");

if ($conexion->connect_error) {
    echo json_encode(["status"=>"error","message"=>"Error de conexión"]);
    exit;
}

$nombre = $_POST['nombre'];
$usuario = $_POST['usuario'];
$email = $_POST['email'];
$contrasena = $_POST['contrasena'];

$hash = password_hash($contrasena, PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (nombre, usuario, email, contrasena) VALUES (?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ssss", $nombre, $usuario, $email, $hash);

if($stmt->execute()) {
    echo json_encode(["status"=>"success"]);
} else {
    echo json_encode(["status"=>"error","message"=>"Usuario o correo ya existe"]);
}

$stmt->close();
$conexion->close();
?>
