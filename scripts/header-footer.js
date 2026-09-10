function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    window.location.reload();
}

function inyectarHeader() {
    const headerElement = document.getElementById("header");
    if (!headerElement) return;

    const esSubcarpeta = window.location.pathname.includes("/paginas/");
    const rutaHome = esSubcarpeta ? "../index.html" : "index.html";
    const rutaPagina = esSubcarpeta ? "" : "paginas/";

    // Verificar si hay sesión activa en localStorage
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioLogueado'));

    // Generar botones según la sesión
    let botonesAuth = '';
    if (usuarioActivo) {
        botonesAuth = `
            <span class="navbar-item has-text-weight-bold has-text-white">
                👋 Hola, ${usuarioActivo.nombre}
            </span>
            <button class="button is-dark is-outlined" onclick="cerrarSesion()">
                Cerrar Sesión
            </button>
        `;
    } else {
        botonesAuth = `
            <a class="button is-light" href="${rutaPagina}login.html">
                Iniciar Sesión
            </a>
        `;
    }

    headerElement.innerHTML = `
        <nav class="navbar is-danger" role="navigation" aria-label="main navigation">
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item has-text-weight-bold is-size-4" href="${rutaHome}">
                        Saludame Po
                    </a>
                </div>

                <div class="navbar-menu is-active">
                    <div class="navbar-start">
                        <a class="navbar-item" href="${rutaHome}">Home</a>
                        <a class="navbar-item" href="${rutaPagina}productos.html">Catálogo</a>
                        <a class="navbar-item" href="${rutaPagina}nosotros.html">Nosotros</a>
                        <a class="navbar-item" href="${rutaPagina}blogs.html">Blogs</a>
                        <a class="navbar-item" href="${rutaPagina}contacto.html">Contacto</a>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                ${botonesAuth}
                                <a class="button is-warning" href="${rutaPagina}carrito.html">
                                    🛒 Cart (<span id="cart-count">0</span>)
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;
}

function inyectarFooter() {
    const footerElement = document.getElementById("footer");
    if (!footerElement) return;

    footerElement.innerHTML = `
        <footer class="footer has-background-dark has-text-white">
            <div class="content has-text-centered">
                <p class="has-text-white">
                    <strong class="has-text-white">Saludame Po</strong> - Proyecto Frontend &copy; 2026.
                </p>
                <p>
                    <a class="has-text-link-light" href="#">Términos y Condiciones</a> | 
                    <a class="has-text-link-light" href="#">Privacidad</a>
                </p>
            </div>
        </footer>
    `;
}

inyectarHeader();
inyectarFooter();