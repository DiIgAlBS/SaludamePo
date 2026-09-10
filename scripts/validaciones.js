// ==========================================
// FUNCIONES DE VALIDACIÓN BASE
// ==========================================

function validarString(text, min, max) {
    if (typeof text !== "string") return false;
    let trimmedText = text.trim();
    return trimmedText.length >= min && trimmedText.length <= max;
}

function validarCorreo(value) {
    let trimmedValue = value.trim().toLowerCase();
    if (trimmedValue === "") return false;

    // Dominios requeridos por la pauta
    return (
        trimmedValue.endsWith("@duoc.cl") || 
        trimmedValue.endsWith("@profesor.duoc.cl") || 
        trimmedValue.endsWith("@gmail.com")
    );
}

function validarFecha(value) {
    if (!value || value === "") return false;

    let anioNacimiento = parseInt(value.slice(0, 4));
    let edad = 2026 - anioNacimiento; // Calculado para el año actual 2026

    return edad >= 18;
}

function validarRut(value) {
    let trimmed = value.trim().toUpperCase();
    // RUN sin puntos ni guión (7 a 8 dígitos + dígito verificador)
    let rutRegex = /^[0-9]{7,8}[0-9K]$/;
    return rutRegex.test(trimmed);
}

function validarClave(value, min = 4, max = 10) {
    if (!value) return false;
    let trimmed = value.trim();
    return trimmed.length >= min && trimmed.length <= max;
}

// ==========================================
// MANEJO DE INTERFAZ GRÁFICA (UI - BULMA)
// ==========================================

function aplicarError(inputElement, idError, mensaje) {
    if (inputElement) {
        inputElement.classList.add("is-danger"); // Clase de Bulma para borde rojo
    }
    const txtError = document.getElementById(idError);
    if (txtError) {
        txtError.textContent = mensaje;
    }
}

function limpiarError(inputElement, idError) {
    if (inputElement) {
        inputElement.classList.remove("is-danger");
    }
    const txtError = document.getElementById(idError);
    if (txtError) {
        txtError.textContent = "";
    }
}

// ==========================================
// VALIDACIÓN Y GUARDADO DE REGISTRO
// ==========================================

function validarFormularioRegistro(event) {
    if (event) {
        event.preventDefault();
    }

    // Captura de Elementos Input
    let nombreInput = document.getElementById("nombre");
    let apellidoInput = document.getElementById("apellido");
    let rutInput = document.getElementById("rut");
    let correoInput = document.getElementById("correo");
    let fechaInput = document.getElementById("fechaNacimiento");
    let regionInput = document.getElementById("region");
    let comunaInput = document.getElementById("comuna");
    let claveInput = document.getElementById("clave");
    let claveConfirmInput = document.getElementById("claveConfirm");

    // Limpiar errores previos
    limpiarError(nombreInput, "errNombre");
    limpiarError(apellidoInput, "errApellido");
    limpiarError(rutInput, "errRut");
    limpiarError(correoInput, "errCorreo");
    limpiarError(fechaInput, "errFechaNacimiento");
    limpiarError(regionInput, "errRegion");
    limpiarError(comunaInput, "errComuna");
    limpiarError(claveInput, "errClave");
    limpiarError(claveConfirmInput, "errClaveConfirm");

    let esValido = true;

    // 1. Nombre
    if (!nombreInput || !validarString(nombreInput.value, 2, 30)) {
        aplicarError(nombreInput, "errNombre", "Ingresa un nombre válido (mínimo 2 letras).");
        esValido = false;
    }

    // 2. Apellido
    if (!apellidoInput || !validarString(apellidoInput.value, 2, 30)) {
        aplicarError(apellidoInput, "errApellido", "Ingresa un apellido válido (mínimo 2 letras).");
        esValido = false;
    }

    // 3. RUT
    if (!rutInput || !validarRut(rutInput.value)) {
        aplicarError(rutInput, "errRut", "RUT inválido. Ingrésalo sin puntos ni guión (ej: 19011022K).");
        esValido = false;
    }

    // 4. Correo (y verificación de duplicados)
    let correoLimpio = correoInput ? correoInput.value.trim().toLowerCase() : "";
    if (!correoInput || !validarCorreo(correoInput.value)) {
        aplicarError(correoInput, "errCorreo", "El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.");
        esValido = false;
    } else {
        let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        let existeCorreo = usuariosGuardados.some(u => u.correo.toLowerCase() === correoLimpio);
        if (existeCorreo) {
            aplicarError(correoInput, "errCorreo", "Este correo ya se encuentra registrado.");
            esValido = false;
        }
    }

    // 5. Fecha de Nacimiento (Mayor de 18 años)
    if (!fechaInput || !validarFecha(fechaInput.value)) {
        aplicarError(fechaInput, "errFechaNacimiento", "Debes ser mayor de 18 años para registrarte.");
        esValido = false;
    }

    // 6. Región
    if (!regionInput || regionInput.value === "") {
        aplicarError(regionInput, "errRegion", "Selecciona una región de la lista.");
        esValido = false;
    }

    // 7. Comuna
    if (!comunaInput || comunaInput.value === "") {
        aplicarError(comunaInput, "errComuna", "Selecciona una comuna de la lista.");
        esValido = false;
    }

    // 8. Contraseña (4 a 10 caracteres)
    if (!claveInput || !validarClave(claveInput.value, 4, 10)) {
        aplicarError(claveInput, "errClave", "La contraseña debe tener entre 4 y 10 caracteres.");
        esValido = false;
    }

    // 9. Confirmación de Contraseña
    if (!claveConfirmInput || claveConfirmInput.value.trim() === "") {
        aplicarError(claveConfirmInput, "errClaveConfirm", "Debes confirmar tu contraseña.");
        esValido = false;
    } else if (claveInput && claveInput.value.trim() !== claveConfirmInput.value.trim()) {
        aplicarError(claveConfirmInput, "errClaveConfirm", "Las contraseñas no coinciden.");
        esValido = false;
    }

    // Guardar en localStorage si todo es correcto
    if (esValido) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let nuevoUsuario = {
            nombre: nombreInput.value.trim(),
            apellido: apellidoInput.value.trim(),
            rut: rutInput.value.trim().toUpperCase(),
            correo: correoLimpio,
            fechaNacimiento: fechaInput.value,
            region: regionInput.value,
            comuna: comunaInput.value,
            clave: claveInput.value.trim()
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("¡Registro realizado con éxito po! Ahora puedes iniciar sesión.");
        
        let form = document.getElementById("formRegistro") || (event ? event.target : null);
        if (form && typeof form.reset === "function") {
            form.reset();
        }
        window.location.href = "login.html"; // Redirección al inicio de sesión
        return true;
    }

    return false;
}

// Vincular automáticamente el evento de envío al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById("formRegistro");
    if (formRegistro) {
        formRegistro.addEventListener("submit", validarFormularioRegistro);
    }
});