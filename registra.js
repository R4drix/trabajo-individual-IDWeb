const form = document.getElementById('registerForm');
const passwordInput = document.getElementById('contrasena');
const confirmarInput = document.getElementById('confirmar');
const errorMessage = document.getElementById('errorMessage');
const registerBtn = document.getElementById('registerBtn');

// Validación de contraseña en tiempo real
passwordInput.addEventListener('input', function () {
    const password = this.value;
    const reqLength = document.getElementById('reqLength');
    const reqLetter = document.getElementById('reqLetter');
    const reqNumber = document.getElementById('reqNumber');

    reqLength.classList.toggle('valid', password.length >= 6);
    reqLength.classList.toggle('invalid', password.length < 6);

    reqLetter.classList.toggle('valid', /[a-zA-Z]/.test(password));
    reqLetter.classList.toggle('invalid', !/[a-zA-Z]/.test(password));

    reqNumber.classList.toggle('valid', /[0-9]/.test(password));
    reqNumber.classList.toggle('invalid', !/[0-9]/.test(password));
});

// Validar coincidencia de contraseñas
confirmarInput.addEventListener('input', function () {
    this.setCustomValidity(
        this.value !== passwordInput.value ? 'Las contraseñas no coinciden' : ''
    );
});

// Envío del formulario
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const contrasena = passwordInput.value;
    const confirmar = confirmarInput.value;

    // Validaciones finales
    if (contrasena !== confirmar) {
        showError('Las contraseñas no coinciden');
        return;
    }

    if (!/[a-zA-Z]/.test(contrasena) || !/[0-9]/.test(contrasena)) {
        showError('La contraseña debe tener letras y números');
        return;
    }

    registerBtn.disabled = true;
    registerBtn.textContent = 'Creando cuenta...';

    // Enviar datos al servidor
    fetch('registra.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            nombre,
            email,
            usuario,
            contrasena
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Cuenta creada exitosamente');
                window.location.href = 'index.html';
            } else {
                showError(data.message || 'Error al registrar');
                registerBtn.disabled = false;
                registerBtn.textContent = 'Crear cuenta';
            }
        })
        .catch(() => {
            showError('Error de conexión con el servidor');
            registerBtn.disabled = false;
            registerBtn.textContent = 'Crear cuenta';
        });
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');

    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}
