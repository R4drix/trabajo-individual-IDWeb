<?php
session_start();
$conexion = new mysqli("localhost", "root", "", "gallery_web");

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["status" => "error", "message" => "Sesión no iniciada"]);
    exit;
}

if ($_FILES['foto']['error'] === 0) {
    $dir = "uploads/";
    if (!file_exists($dir)) { mkdir($dir, 0777, true); }

    $nombre = time() . "_" . basename($_FILES["foto"]["name"]);
    $ruta_db = $dir . $nombre;

    if (move_uploaded_file($_FILES["foto"]["tmp_name"], $ruta_db)) {
        $stmt = $conexion->prepare("INSERT INTO imagenes (usuario_id, ruta, titulo) VALUES (?, ?, ?)");
        $stmt->bind_param("iss", $_SESSION['usuario_id'], $ruta_db, $_POST['titulo']);
        
        if($stmt->execute()) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error en BD"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Error al mover archivo"]);
    }
}
?>