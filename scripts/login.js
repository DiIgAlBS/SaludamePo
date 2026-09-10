document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formLogin');
    if (!formLogin) return;

    // Si ya hay sesión iniciada, redirige directamente al Home
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (usuarioActivo) {
        window.location.href = '../index.html';
        return;
    }

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const correoInput = document.getElementById('correoLogin');
        const claveInput = document.getElementById('claveLogin');

        const correo = correoInput.value.trim().toLowerCase();
        const clave = claveInput.value.trim();

        const errCorreo = document.getElementById('errCorreoLogin');
        const errClave = document.getElementById('errClaveLogin');

        // Limpiar errores previos
        errCorreo.textContent = '';
        errClave.textContent = '';
        correoInput.classList.remove('is-danger');
        claveInput.classList.remove('is-danger');

        let esValido = true;

        // Validar formato del correo
        const regexCorreo = /^[\w-\.]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
        if (!correo) {
            errCorreo.textContent = 'El correo es obligatorio.';
            correoInput.classList.add('is-danger');
            esValido = false;
        } else if (!regexCorreo.test(correo)) {
            errCorreo.textContent = 'Correo inválido (Permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com).';
            correoInput.classList.add('is-danger');
            esValido = false;
        }

        // Validar formato de la contraseña
        if (!clave) {
            errClave.textContent = 'La contraseña es obligatoria.';
            claveInput.classList.add('is-danger');
            esValido = false;
        } else if (clave.length < 4 || clave.length > 10) {
            errClave.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
            claveInput.classList.add('is-danger');
            esValido = false;
        }

        if (esValido) {
            // Buscar si la cuenta existe en localStorage
            const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

            const usuarioEncontrado = usuariosGuardados.find(
                u => u.correo.toLowerCase() === correo && u.clave === clave
            );

            if (!usuarioEncontrado) {
                errClave.textContent = 'Correo o contraseña incorrectos, o el usuario no existe.';
                correoInput.classList.add('is-danger');
                claveInput.classList.add('is-danger');
                return;
            }

            // Iniciar sesión con los datos reales guardados al registrarse
            const datosSesion = {
                correo: usuarioEncontrado.correo,
                nombre: usuarioEncontrado.nombre,
                apellido: usuarioEncontrado.apellido
            };

            localStorage.setItem('usuarioLogueado', JSON.stringify(datosSesion));

            alert(`¡Sesión iniciada correctamente! Bienvenid@ ${datosSesion.nombre}`);
            window.location.href = '../index.html';
        }
    });
});