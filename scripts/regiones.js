// Datos de regiones y comunas
const datosChile = [
    {
        region: "Región Metropolitana",
        comunas: ["Santiago", "Pudahuel", "Maipú", "Providencia", "Puente Alto"]
    },
    {
        region: "Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"]
    },
    {
        region: "Biobío",
        comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"]
    }
];

// Cargar Regiones al abrir la página
function cargarRegiones() {
    let selectRegion = document.getElementById("region");
    if (!selectRegion) return;

    // Opción por defecto
    selectRegion.innerHTML = `<option value="">Seleccione una región</option>`;

    datosChile.forEach((item, index) => {
        selectRegion.innerHTML += `<option value="${index}">${item.region}</option>`;
    });
}

// Cargar Comunas según la región elegida
function cargarComunas() {
    let selectRegion = document.getElementById("region");
    let selectComuna = document.getElementById("comuna");
    
    let indexSeleccionado = selectRegion.value;

    // Resetear el select de comuna
    selectComuna.innerHTML = `<option value="">Seleccione una comuna</option>`;

    if (indexSeleccionado === "") return;

    let comunas = datosChile[indexSeleccionado].comunas;

    comunas.forEach(comuna => {
        selectComuna.innerHTML += `<option value="${comuna}">${comuna}</option>`;
    });
}

// Ejecutar la carga inicial cuando abra la página
document.addEventListener("DOMContentLoaded", cargarRegiones);