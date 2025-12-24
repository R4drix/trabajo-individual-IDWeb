
        const form = document.getElementById('registerForm');
        const passwordInput = document.getElementById('contrasena');
        const confirmarInput = document.getElementById('confirmar');
        const errorMessage = document.getElementById('errorMessage');
        const registerBtn = document.getElementById('registerBtn');

        // Validación de contraseña en tiempo real
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const reqLength = document.getElementById('reqLength');
            const reqLetter = document.getElementById('reqLetter');
            const reqNumber = document.getElementById('reqNumber');

            // Validar longitud
            if (password.length >= 6) {
                reqLength.classList.add('valid');
                reqLength.classList.remove('invalid');
            } else {
                reqLength.classList.add('invalid');
                reqLength.classList.remove('valid');
            }

            // Validar letra
            if (/[a-zA-Z]/.test(password)) {
                reqLetter.classList.add('valid');
                reqLetter.classList.remove('invalid');
            } else {
                reqLetter.classList.add('invalid');
                reqLetter.classList.remove('valid');
            }

            // Validar número
            if (/[0-9]/.test(password)) {
                reqNumber.classList.add('valid');
                reqNumber.classList.remove('invalid');
            } else {
                reqNumber.classList.add('invalid');
                reqNumber.classList.remove('valid');
            }
        });

        // Validar que las contraseñas coincidan
        confirmarInput.addEventListener('input', function() {
            if (this.value !== passwordInput.value) {
                this.setCustomValidity('Las contraseñas no coinciden');
            } else {
                this.setCustomValidity('');
            }
        });

        // Manejar envío del formulario
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const usuario = document.getElementById('usuario').value;
            const contrasena = passwordInput.value;
            const confirmar = confirmarInput.value;

            // Validaciones
            if (contrasena !== confirmar) {
                showError('Las contraseñas no coinciden');
                return;
            }

            if (contrasena.length < 6) {
                showError('La contraseña debe tener al menos 6 caracteres');
                return;
            }

            if (!/[a-zA-Z]/.test(contrasena)) {
                showError('La contraseña debe contener al menos una letra');
                return;
            }

            if (!/[0-9]/.test(contrasena)) {
                showError('La contraseña debe contener al menos un número');
                return;
            }

            // Simular registro exitoso
            registerBtn.disabled = true;
            registerBtn.textContent = 'Creando cuenta...';

            // Guardar datos en localStorage (solo para demo)
            const userData = {
                nombre: nombre,
                email: email,
                usuario: usuario,
                contrasena: contrasena
            };

            localStorage.setItem('userData', JSON.stringify(userData));

            // Simular delay y redirigir
            setTimeout(() => {
                alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
                window.location.href = 'index.html';
            }, 1500);
        });

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.classList.add('show');
            
            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 5000);
        }
