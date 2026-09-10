document.addEventListener('DOMContentLoaded', () => {
    const formContacto = document.getElementById('formContacto');
    if (!formContacto) return;

    formContacto.addEventListener('submit', (e) => {
        e.preventDefault();

        // Captura de valores
        const nombre = document.getElementById('nombreContacto').value.trim();
        const correo = document.getElementById('correoContacto').value.trim();
        const comentario = document.getElementById('comentarioContacto').value.trim();

        // Contenedores de error
        const errNombre = document.getElementById('errNombreContacto');
        const errCorreo = document.getElementById('errCorreoContacto');
        const errComentario = document.getElementById('errComentarioContacto');

        // Reset de mensajes
        errNombre.textContent = '';
        errCorreo.textContent = '';
        errComentario.textContent = '';

        let esValido = true;

        // Validación Nombre (máximo 100 caracteres)
        const regexNombreApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}(\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,})+$/;

        if (!nombre) {
            errNombre.textContent = 'El nombre es obligatorio.';
            esValido = false;
        } else if (nombre.length > 100) {
            errNombre.textContent = 'El nombre no puede superar los 100 caracteres.';
            esValido = false;
        } else if (!regexNombreApellido.test(nombre)) {
            errNombre.textContent = 'Ingresa tu nombre y apellido reales (solo letras, al menos 2 letras por palabra).';
            esValido = false;
        }

        // Validación Correo (Dominios permitidos: duoc.cl, profesor.duoc.cl, gmail.com, hortmail.com, outlook.com)
        const regexCorreo = /^[\w-\.]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com|hotmail\.com|outlook\.com)$/i;
        if (!correo) {
            errCorreo.textContent = 'El correo es obligatorio.';
            esValido = false;
        } else if (correo.length > 100) {
            errCorreo.textContent = 'El correo no puede superar los 100 caracteres.';
            esValido = false;
        } else if (!regexCorreo.test(correo)) {
            errCorreo.textContent = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl, @gmail.com, @hotmail.com o @outlook.com.';
            esValido = false;
        }

        // Validación Mensaje (máximo 500 caracteres)
        if (!comentario) {
            errComentario.textContent = 'El mensaje es obligatorio.';
            esValido = false;
        } else if (comentario.length > 500) {
            errComentario.textContent = 'El mensaje no puede superar los 500 caracteres.';
            esValido = false;
        }

        // Envío exitoso
        if (esValido) {
            alert('¡Mensaje enviado con éxito po!');
            formContacto.reset();
        }
    });
});