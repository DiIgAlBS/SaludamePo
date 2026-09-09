// ==========================================
// FUNCIONES DE VALIDACIÓN BASE (Vistas en Clase)
// ==========================================

function validarString(text, min, max) {
    if (typeof text !== "string") return false;
    let trimmedText = text.trim();
    return trimmedText.length >= min && trimmedText.length <= max;
}

function validarCorreo(value) {
    let trimmedValue = value.trim().toLowerCase();

    if (trimmedValue === "") {
        return false;
    }

    // Dominios requeridos por la rúbrica
    if (
        trimmedValue.endsWith("@duoc.cl") || 
        trimmedValue.endsWith("@profesor.duoc.cl") || 
        trimmedValue.endsWith("@gmail.com")
    ) {
        return true;
    } else {
        return false;
    }
}

function validarFecha(value) {
    if (!value || value === "") {
        return false;
    }

    let anioNacimiento = parseInt(value.slice(0, 4));
    let edad = 2026 - anioNacimiento; // Basado en el año actual 2026

    if (edad >= 18) {
        return true;
    } else {
        return false;
    }
}

function validarRut(value) {
    let trimmed = value.trim().toUpperCase();
    // Requisito de la pauta: RUN sin puntos ni guión (7 a 9 caracteres)
    let rutRegex = /^[0-9]{7,8}[0-9K]$/;
    return rutRegex.test(trimmed);
}

// ==========================================
// FUNCION AUXILIAR PARA MANEJO DE INTERFAZ (UI)
// ==========================================

function apuntarInput(elemento, variable, esValido) {
    if (esValido) {
        elemento.classList.remove("border-red");
        return true;
    } else {
        alert(variable + " no válido");
        elemento.classList.add("border-red");
        elemento.focus();
        return false;
    }
}

// ==========================================
// VALIDACIÓN DEL FORMULARIO DE REGISTRO
// ==========================================

function validarFormularioRegistro(event) {
    // Evita que la página se recargue automáticamente al presionar el botón
    if (event) {
        event.preventDefault();
    }

    let nombreInput = document.getElementById("nombre");
    let apellidoInput = document.getElementById("apellido");
    let rutInput = document.getElementById("rut");
    let correoInput = document.getElementById("correo");
    let fechaInput = document.getElementById("fechaNacimiento");

    // 1. Validar Nombre
    let nombreValido = validarString(nombreInput.value, 2, 30);
    if (!apuntarInput(nombreInput, "Nombre", nombreValido)) return false;

    // 2. Validar Apellido
    let apellidoValido = validarString(apellidoInput.value, 2, 30);
    if (!apuntarInput(apellidoInput, "Apellido", apellidoValido)) return false;

    // 3. Validar RUT (Sin puntos ni guión)
    let rutValido = validarRut(rutInput.value);
    if (!apuntarInput(rutInput, "RUT (Sin puntos ni guión, Ej: 19011022K)", rutValido)) return false;

    // 4. Validar Correo
    let correoValido = validarCorreo(correoInput.value);
    if (!apuntarInput(correoInput, "Correo (@duoc.cl, @profesor.duoc.cl o @gmail.com)", correoValido)) return false;

    // 5. Validar Fecha de Nacimiento (Mayor de 18 años)
    let fechaValida = validarFecha(fechaInput.value);
    if (!apuntarInput(fechaInput, "Fecha de nacimiento (Debes ser mayor de 18 años)", fechaValida)) return false;

    alert("¡Registro realizado con éxito po!");
    return true;
}