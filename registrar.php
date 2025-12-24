<?php
// Datos de conexión a InfinityFree
$host = "sql304.infinityfree.com";
$user = "if0_40756399";
$pass = "TnQyZzb1Hq2L300";
$db   = "if0_40756399_gallery";

// Conexión
$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión");
}

// Recibir datos del formulario
$nombre     = $_POST['nombre'];
$email      = $_POST['email'];
$usuario    = $_POST['usuario'];
$contrasena = $_POST['contrasena'];

// Encriptar contraseña (MUY IMPORTANTE)
$hash = password_hash($contrasena, PASSWORD_DEFAULT);

// Insertar datos usando consulta preparada (seguridad)
$sql = "INSERT INTO usuarios (nombre, email, usuario, contrasena)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nombre, $email, $usuario, $hash);

// Ejecutar
if ($stmt->execute()) {
    echo "Registro exitoso 🎉";
} else {
    echo "Error: el correo o usuario ya existe ⚠️";
}

// Cerrar conexión
$stmt->close();
$conn->close();
?>
