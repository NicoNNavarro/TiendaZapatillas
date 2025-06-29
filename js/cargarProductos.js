let productos = []; // todos los productos cargados
let productosCargados = []; // productos filtrados para categoría (en páginas de categoría)
let productosMostrados = 0; // contador productos mostrados en categorías
const productosPorCarga = 8; // cuantos cargar con cada "ver más"

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  fetch('productos.json')
    .then(resp => resp.json())
    .then(data => {
      productos = data;

      // Detectar si estamos en página de categoría por data-categoria en body
      const categoriaActual = document.body.dataset.categoria || null;

      if (categoriaActual) {
        // Página categoría: cargar paginado y activar botón ver más
        cargarProductosCategoria(categoriaActual);
      } else {
        // Página index: cargar solo 4 productos por categoría, sin botón ver más
        cargarSeccionIndex("Running", "productosRunning");
        cargarSeccionIndex("Fútbol", "productosFutbol");
        cargarSeccionIndex("Urbanas", "productosUrbanas");
      }
    })
    .catch(err => console.error("Error al cargar productos:", err));

  // En páginas de categoría, botón "Ver más"
  const btnVerMas = document.getElementById('btnVerMas');
  if (btnVerMas) {
    btnVerMas.addEventListener('click', cargarMasProductos);
  }
});

// Cargar 4 productos en index para cada categoría
function cargarSeccionIndex(categoria, idContenedor) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  contenedor.innerHTML = ''; // limpiar contenedor
  // Asegurar que tenga clase row para bootstrap
  if (!contenedor.classList.contains('row')) contenedor.classList.add('row');

  const productosFiltrados = productos.filter(p => p.categoria === categoria).slice(0, 3);

  productosFiltrados.forEach(prod => {
    contenedor.insertAdjacentHTML('beforeend', crearCardHTML(prod, true));
  });

  agregarEventosProductos(productosFiltrados, true);
}

// Cargar productos en páginas de categoría (paginado)
function cargarProductosCategoria(categoria) {
  const section = document.getElementById('productosPorCategoria');
  if (!section) return;

  section.innerHTML = '';
  productosCargados = productos.filter(p => p.categoria === categoria);
  productosMostrados = 0;

  cargarMasProductos();
  actualizarBotonVerMas();
}

function cargarMasProductos() {
  const section = document.getElementById('productosPorCategoria');
  if (!section) return;

  const productosParaCargar = productosCargados.slice(productosMostrados, productosMostrados + productosPorCarga);

  productosParaCargar.forEach(prod => {
    section.insertAdjacentHTML('beforeend', crearCardHTML(prod, true));
  });

  agregarEventosProductos(productosParaCargar, true);

  productosMostrados += productosParaCargar.length;
  actualizarBotonVerMas();
}

function actualizarBotonVerMas() {
  const btnVerMas = document.getElementById('btnVerMas');
  if (!btnVerMas) return;

  if (productosMostrados >= productosCargados.length) {
    btnVerMas.style.display = 'none';
  } else {
    btnVerMas.style.display = 'inline-block';
  }
}

// Crear card HTML, con controles cantidad solo si conCantidad = true
function crearCardHTML(prod, conCantidad = true) {
  return `
    <div class="col-12 col-sm-6 col-md-3 mb-4">
      <div class="card card-custom h-100">
        <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text">$${prod.precio.toLocaleString()}</p>
          </div>
          ${conCantidad ? `
          <div class="cantidad-control mt-3 d-flex align-items-center justify-content-center gap-2">
            <button class="btn btn-sm btn-outline-primary btn-disminuir">-</button>
            <input type="text" class="cantidad form-control form-control-sm text-center" value="1" readonly style="width: 40px;">
            <button class="btn btn-sm btn-outline-primary btn-aumentar">+</button>
          </div>
          ` : ''}
          <a href="#" class="btn btn-primary mt-3 btn-comprar" data-id="${prod.id}">Agregar</a>
        </div>
      </div>
    </div>
  `;
}

// Eventos botones productos
function agregarEventosProductos(listaProductos, conCantidad) {
  listaProductos.forEach(prod => {
    const btnComprar = document.querySelector(`.btn-comprar[data-id="${prod.id}"]`);
    if (!btnComprar) return;
    const card = btnComprar.closest('.card');

    const btnDisminuir = card.querySelector('.btn-disminuir');
    const btnAumentar = card.querySelector('.btn-aumentar');
    const inputCantidad = card.querySelector('.cantidad');

    if (conCantidad && btnDisminuir && btnAumentar && inputCantidad) {
      btnDisminuir.addEventListener('click', () => {
        let val = parseInt(inputCantidad.value);
        if (val > 1) inputCantidad.value = val - 1;
      });

      btnAumentar.addEventListener('click', () => {
        let val = parseInt(inputCantidad.value);
        inputCantidad.value = val + 1;
      });
    }

    btnComprar.addEventListener('click', (e) => {
      e.preventDefault();

      const cantidad = conCantidad && inputCantidad ? parseInt(inputCantidad.value) : 1;

      const producto = {
        id: btnComprar.dataset.id,
        nombre: card.querySelector('.card-title').textContent,
        precio: parseFloat(card.querySelector('.card-text').textContent.replace(/\$|\,/g, '')),
        imagen: card.querySelector('img').src,
        cantidad: cantidad
      };

      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const existente = carrito.find(p => p.id === producto.id);

      if (existente) {
        existente.cantidad += producto.cantidad;
      } else {
        carrito.push(producto);
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));

      window.location.href = "carrito.html";
    });
  });
}