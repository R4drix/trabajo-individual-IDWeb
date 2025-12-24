<?php
session_start();
// Configuración de la conexión (asegúrate que coincida con registra.php)
$conexion = new mysqli("localhost", "root", "", "gallery_web");

if ($conexion->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error de conexión"]);
    exit;
}

$user = $_POST['usuario'];
$pass = $_POST['contrasena'];

// Buscamos al usuario por nombre de usuario
$sql = "SELECT id, usuario, contrasena FROM usuarios WHERE usuario = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $user);
$stmt->execute();
$resultado = $stmt->get_result();

if ($usuario_datos = $resultado->fetch_assoc()) {
    // Verificamos la contraseña hash
    if (password_verify($pass, $usuario_datos['contrasena'])) {
        // Guardamos la sesión
        $_SESSION['usuario_id'] = $usuario_datos['id'];
        $_SESSION['usuario_nombre'] = $usuario_datos['usuario'];
        
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Contraseña incorrecta"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "El usuario no existe"]);
}

$stmt->close();
$conexion->close();
?>