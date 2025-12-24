const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Creamos el objeto con los datos del formulario
    const formData = new FormData(loginForm);

    // Enviamos los datos a login.php
    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(res => {
        // Verificamos si la respuesta es un JSON válido
        if (!res.ok) {
            throw new Error('Respuesta de red no válida');
        }
        return res.json();
    })
    .then(data => {
        if (data.status === 'success') {
            // Si el login es correcto, redirigimos
            window.location.href = 'fotos.html'; 
        } else {
            // Mostramos el mensaje de error (usuario no existe o clave mal)
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error detallado:', error);
        alert('Hubo un error al intentar iniciar sesión');
    });
});