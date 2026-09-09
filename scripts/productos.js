const listaProductos = [
    {
        id: 1,
        nombre: "Mario Castañeda",
        categoria: "Actores de Doblaje",
        descripcion: "Voz icónica de Goku en Z/Super. ¡Frase saiyajin personalizada!",
        precio: 25000,
        imagen: "https://placehold.co/300x200/e53935/white?text=Mario+Casta%C3%B1eda"
    },
    {
        id: 2,
        nombre: "Stefan Kramer",
        categoria: "Famosos Nacionales",
        descripcion: "Imitaciones personalizadas y felicitaciones de cumpleaños inolvidables.",
        precio: 30000,
        imagen: "https://placehold.co/300x200/e53935/white?text=Stefan+Kramer"
    },
    {
        id: 3,
        nombre: "René García",
        categoria: "Actores de Doblaje",
        descripcion: "Voz icónica de Vegeta. Saludos cargados de orgullo saiyajin.",
        precio: 25000,
        imagen: "https://placehold.co/300x200/e53935/white?text=Ren%C3%A9+Garc%C3%ADa"
    },
    {
        id: 4,
        nombre: "Héroe Animado 3D",
        categoria: "Personajes Animados",
        descripcion: "Video digital interactivo animado para sorpresas infantiles.",
        precio: 18000,
        imagen: "https://placehold.co/300x200/e53935/white?text=Personaje+Animado"
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
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="border-radius: 8px;">
                </figure>
                <div class="box has-background-light">
                    <p class="has-text-weight-bold mb-2">🎬 Muestra de Saludo en Video:</p>
                    <figure class="image is-16by9">
                        <iframe class="has-ratio" width="640" height="360" src="https://www.youtube.com/embed/L_LUpnjgPso" frameborder="0" allowfullscreen></iframe>
                    </figure>
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