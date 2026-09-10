const listaProductos = [
  {
    id: 1,
    nombre: "Barney",
    categoria: "Personajes Animados",
    descripcion: "Canciones y saludos llenos de amor y cariño para los más pequeños.",
    precio: 15000,
    imagen: "../imagenes/barney.webp"
  },
  {
    id: 2,
    nombre: "Bob Esponja",
    categoria: "Personajes Animados",
    descripcion: "¡Un saludo alegre y lleno de energía directo desde Fondo de Bikini!",
    precio: 20000,
    imagen: "../imagenes/bob esponja.png",
    video: "../videos/promocionales/bob esponja.mp4"
  },
  {
    id: 3,
    nombre: "Burbuja",
    categoria: "Personajes Animados",
    descripcion: "Tierno saludo con la voz oficial de Las Chicas Superpoderosas.",
    precio: 18000,
    imagen: "../imagenes/burbuja.webp",
    video:"../videos/burbuja.mp4"
  },
  {
    id: 4,
    nombre: "Eric Cartman",
    categoria: "Caricaturas",
    descripcion: "Saludo humorístico e irreverente al estilo de South Park.",
    precio: 20000,
    imagen: "../imagenes/cartman.webp",
    video: "../videos/cartman.mp4"
  },
  {
    id: 5,
    nombre: "Dora la Exploradora",
    categoria: "Personajes Animados",
    descripcion: "¡Una gran aventura interactiva para felicitar en su día!",
    precio: 15000,
    imagen: "../imagenes/dora.webp"
  },
  {
    id: 6,
    nombre: "Elmo",
    categoria: "Personajes Animados",
    descripcion: "¡Un saludo muy feliz y divertido directo desde Plaza Sésamo!",
    precio: 15000,
    imagen: "../imagenes/elmo.png",
    video: "../videos/elmo.mp4",
    
  },
  {
    id: 7,
    nombre: "Naruto Uzumaki",
    categoria: "Anime / Doblaje",
    descripcion: "¡Un saludo ninja lleno de energía y determinación, de veras!",
    precio: 22000,
    imagen: "../imagenes/naruto.webp",
    video: "../videos/promocionales/naruto.mp4"
  },
  {
    id: 8,
    nombre: "Pablo",
    categoria: "Personajes Animados",
    descripcion: "Saludos musicales para vivir aventuras imaginarias e inolvidables.",
    precio: 16000,
    imagen: "../imagenes/pablo.webp"
  },
  {
    id: 9,
    nombre: "Peppa Pig",
    categoria: "Personajes Animados",
    descripcion: "Un dulce saludo lleno de risas para celebrar a los más pequeños.",
    precio: 15000,
    imagen: "../imagenes/peppa.webp"
  },
  {
    id: 10,
    nombre: "Shrek",
    categoria: "Personajes Animados",
    descripcion: "Un saludo directo desde el pantano con mucho humor y carisma.",
    precio: 20000,
    imagen: "../imagenes/shrek.webp",
    video: "../videos/shrek.mp4"
  },
  {
    id: 11,
    nombre: "Botota Fox",
    categoria: "Famosos Nacionales",
    descripcion: "Saludos desinhibidos, llenos de chispa y buen humor.",
    precio: 25000,
    imagen: "../imagenes/famosos/botota.jpeg",
    video: "../videos/botota.mp4"
  },
  {
    id: 12,
    nombre: "Che Copete",
    categoria: "Humor Nacional",
    descripcion: "¡El rey de la noche! Saludos pícaros e inolvidables.",
    precio: 25000,
    imagen: "../imagenes/famosos/checopete.png"
  },
  {
    id: 13,
    nombre: "La Chilindrina",
    categoria: "Personajes Icónicos",
    descripcion: "Un saludo nostálgico e ingenioso directo de la vecindad.",
    precio: 20000,
    imagen: "../imagenes/famosos/chilindrina.avif",
    video: "../videos/chilindrina.mp4"
  },
  {
    id: 14,
    nombre: "El Chino (Atletas de la Risa)",
    categoria: "Humor Nacional",
    descripcion: "Risas garantizadas y chistes rápidos con la chispa del Chino.",
    precio: 25000,
    imagen: "../imagenes/famosos/chino.png"
  },
  {
    id: 15,
    nombre: "Huaso Filomeno",
    categoria: "Humor Nacional",
    descripcion: "Típico humor sureño, dichos campesinos y buenas historias.",
    precio: 22000,
    imagen: "../imagenes/famosos/filomeno.png",
    video: "../videos/filomeno.mp4",
    video: "../videos/filomeno.mp4"
  },
  {
    id: 16,
    nombre: "Kena Larraín",
    categoria: "Personajes TV",
    descripcion: "¡Un saludo icónico e histriónico al más puro estilo Casado con Hijos!",
    precio: 25000,
    imagen: "../imagenes/famosos/kena.jpg"
  },
  {
    id: 17,
    nombre: "Stefan Kramer",
    categoria: "Famosos Nacionales",
    descripcion: "Imitaciones personalizadas para sorprender en cualquier ocasión.",
    precio: 30000,
    imagen: "../imagenes/famosos/kramer.webp"
    
  },
  {
    id: 18,
    nombre: "Miguelito",
    categoria: "Humor Nacional",
    descripcion: "Toda la picardía y travesuras del personaje estelar de la TV.",
    precio: 22000,
    imagen: "../imagenes/famosos/miguelito.jpg"
  },
  {
    id: 19,
    nombre: "Naya Fácil",
    categoria: "Famosos / Influencers",
    descripcion: "¡Un saludo facilín lleno de energía, frases típicas y buena onda!",
    precio: 25000,
    imagen: "../imagenes/famosos/naya.webp"
  },
  {
    id: 20,
    nombre: "El Pato (Atletas de la Risa)",
    categoria: "Humor Nacional",
    descripcion: "Toda la buena onda del Pato con el sello único de Los Atletas de la Risa.",
    precio: 25000,
    imagen: "../imagenes/famosos/pato.png"
  }
];


function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito_saludame_po")) || [];
}

function actualizarContadorCarrito() {
    const contador = document.getElementById("cart-count");
    if (!contador) return;

    let carrito = obtenerCarrito();
    let totalItems = 0;
    carrito.forEach(item => totalItems += item.cantidad);
    contador.innerText = totalItems;
}

function renderizarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    listaProductos.forEach(prod => {
        contenedor.innerHTML += `
            <div class="column is-12-mobile is-6-tablet is-3-desktop">
                <div class="card">
                    <div class="card-image">
                        <figure class="image">
                            <img src="${prod.imagen}" alt="${prod.nombre}">
                        </figure>
                    </div>
                    <div class="card-content">
                        <span class="tag is-danger is-light mb-2">${prod.categoria}</span>
                        <p class="title is-5 mb-1">${prod.nombre}</p>
                        <p class="is-size-7 mb-2">${prod.descripcion}</p>
                        <p class="text-price">$${prod.precio.toLocaleString('es-CL')} CLP</p>
                    </div>
                    <div class="card-footer">
                        <a href="detalle-producto.html?id=${prod.id}" class="card-footer-item has-text-info">Ver Detalle</a>
                        <button onclick="agregarAlCarrito(${prod.id})" class="card-footer-item button is-danger is-light border-0">
                            Agregar 🛒
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function agregarAlCarrito(id) {
    let carrito = obtenerCarrito();
    let famoso = listaProductos.find(p => p.id === id);
    if (!famoso) return;

    let existe = carrito.find(item => item.id === id);
    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ id: famoso.id, nombre: famoso.nombre, precio: famoso.precio, cantidad: 1 });
    }

    localStorage.setItem("carrito_saludame_po", JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert("¡" + famoso.nombre + " agregado al carrito po!");
}

function renderizarDetalle() {
    const contenedor = document.getElementById("detalle-producto");
    if (!contenedor) return;

    const params = new URLSearchParams(window.location.search);
    const idProducto = parseInt(params.get("id")) || 1;
    const producto = listaProductos.find(p => p.id === idProducto) || listaProductos[0];

    contenedor.innerHTML = `
    <div class="columns is-vcentered">
        <div class="column is-6">
            <figure class="image is-4by3 mb-4">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="border-radius: 8px; object-fit: cover;">
            </figure>
            <div class="box has-background-light">
                <p class="has-text-weight-bold mb-2">🎬 Muestra de Saludo en Video:</p>
                ${producto.video ? `
                    <video controls width="100%" style="border-radius: 8px; max-height: 350px; background: #000;">
                        <source src="${producto.video}" type="video/mp4">
                        Tu navegador no soporta la reproducción de video.
                    </video>
                ` : `
                    <p class="has-text-grey p-3">Muestra de video no disponible actualmente.</p>
                `}
            </div>
        </div>
        <div class="column is-6">
            <span class="tag is-danger is-medium mb-3">${producto.categoria}</span>
            <h1 class="title is-2">${producto.nombre}</h1>
            <p class="subtitle is-4 text-price">$${producto.precio.toLocaleString('es-CL')} CLP</p>
            <p class="content">${producto.descripcion}</p>

            <div class="box">
                <h3 class="title is-5">Personaliza tu Saludo</h3>
                <div class="field">
                    <label class="label">¿Para quién es el saludo?</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Ej: Para Carlos">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Instrucciones o mensaje especial</label>
                    <div class="control">
                        <textarea class="textarea" rows="2" placeholder="Ej: Dile feliz cumpleaños y que siga entrenando como Saiyajin..."></textarea>
                    </div>
                </div>
                <button onclick="agregarAlCarrito(${producto.id})" class="button is-danger is-fullwidth is-medium mt-4">
                    🛒 Agregar al Carrito
                </button>
            </div>
        </div>
        </div>
    `;
}

function renderizarCarrito() {
    const tablaBody = document.getElementById("tabla-carrito");
    const totalElement = document.getElementById("total-carrito");
    if (!tablaBody) return;

    let carrito = obtenerCarrito();
    tablaBody.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        tablaBody.innerHTML = `
            <tr>
                <td colspan="5" class="has-text-centered py-5">
                    <p class="is-size-5">Tu carrito está vacío po 🛒</p>
                    <a href="productos.html" class="button is-danger is-outlined mt-3">Ver Catálogo</a>
                </td>
            </tr>
        `;
        if (totalElement) totalElement.innerText = "$0 CLP";
        return;
    }

    carrito.forEach((item, index) => {
        let subtotal = item.precio * item.cantidad;
        total += subtotal;
        tablaBody.innerHTML += `
            <tr>
                <td class="has-text-weight-bold">${item.nombre}</td>
                <td>$${item.precio.toLocaleString('es-CL')}</td>
                <td>${item.cantidad}</td>
                <td class="has-text-weight-bold text-price">$${subtotal.toLocaleString('es-CL')}</td>
                <td>
                    <button onclick="eliminarDelCarrito(${index})" class="button is-small is-danger is-light">
                        ❌ Eliminar
                    </button>
                </td>
            </tr>
        `;
    });

    if (totalElement) totalElement.innerText = `$${total.toLocaleString('es-CL')} CLP`;
}

function eliminarDelCarrito(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1);
    localStorage.setItem("carrito_saludame_po", JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito_saludame_po");
    renderizarCarrito();
    actualizarContadorCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
    renderizarDetalle();
    renderizarCarrito();
    actualizarContadorCarrito();
});