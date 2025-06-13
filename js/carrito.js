document.addEventListener("DOMContentLoaded", () => {
  const carritoVacio = document.getElementById("carritoVacio");
  const carritoItems = document.getElementById("carritoItems");
  const tablaCarrito = document.getElementById("tablaCarrito");
  const totalFinal = document.getElementById("totalFinal");
  const btnFinalizar = document.getElementById("btnFinalizar");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function renderizarCarrito() {
    tablaCarrito.innerHTML = "";
    if (carrito.length === 0) {
      carritoVacio.classList.remove("d-none");
      carritoItems.classList.add("d-none");
      return;
    }

    carritoVacio.classList.add("d-none");
    carritoItems.classList.remove("d-none");

    let total = 0;

    carrito.forEach((prod, i) => {
      const subtotal = prod.precio * prod.cantidad;
      total += subtotal;

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td><img src="${prod.imagen}" alt="${prod.nombre}" style="width: 60px;"></td>
        <td>${prod.nombre}</td>
        <td>$${prod.precio.toFixed(2)}</td>
        <td>
          <input type="number" min="1" value="${prod.cantidad}" class="form-control cantidad-input" data-index="${i}" style="width: 70px; margin: 0 auto;">
        </td>
        <td>$${subtotal.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm btnEliminar" data-index="${i}">Eliminar</button></td>
      `;

      tablaCarrito.appendChild(tr);
    });

    totalFinal.textContent = total.toFixed(2);

    // Añadir eventos a botones y inputs
    document.querySelectorAll(".btnEliminar").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        carrito.splice(index, 1);
        guardarYRenderizar();
      });
    });

    document.querySelectorAll(".cantidad-input").forEach(input => {
      input.addEventListener("change", () => {
        const index = parseInt(input.dataset.index);
        let nuevaCantidad = parseInt(input.value);
        if (isNaN(nuevaCantidad) || nuevaCantidad < 1) nuevaCantidad = 1;
        carrito[index].cantidad = nuevaCantidad;
        guardarYRenderizar();
      });
    });
  }

  function guardarYRenderizar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
  }

  btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    alert("¡Gracias por tu compra!");
    carrito = [];
    guardarYRenderizar();
  });

  renderizarCarrito();
});