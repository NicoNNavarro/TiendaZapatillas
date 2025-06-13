function cargarProductos() {
    const categoriaActual = document.body.dataset.categoria || null;

    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            const section = document.getElementById('productosPorCategoria');
            section.innerHTML = '';

            // Si hay categoría en la página (cat específicas), sólo esa
            // Si no, muestra todas las categorías
            const categorias = categoriaActual ? [categoriaActual] : ['Fútbol', 'Running', 'Urbanas'];

                categorias.forEach(categoria => {
                    let productosFiltrados = data.filter(prod => prod.categoria === categoria);

                    if (categoriaActual && ['Fútbol', 'Running', 'Urbanas'].includes(categoria)) {
                        productosFiltrados = productosFiltrados.slice(0, 8);
                    } else {
                            productosFiltrados = productosFiltrados.slice(0, 4); // Mostrar solo 4 en index
                         }

                // En la página index mostramos el título, en las categorías no
                if (!categoriaActual) {
                    section.insertAdjacentHTML('beforeend', `
                        <h2 class="categoria-header text-center mb-4">${categoria}</h2>
                        <div class="row justify-content-center"></div>
                    `);
                } else {
                    // Sólo agregamos la fila para las cards, sin título
                    section.insertAdjacentHTML('beforeend', `<div class="row justify-content-center"></div>`);
                }

                const row = section.querySelector('.row:last-child');

                productosFiltrados.forEach(prod => {
                    const cardHTML = `
                        <div class="col-md-3 d-flex justify-content-center">
                            <div class="card card-custom mb-4" style="width: 18rem;">
                                <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 class="card-title">${prod.nombre}</h5>
                                        <p class="card-text">$${prod.precio}</p>
                                    </div>
                                    <div class="cantidad-control mt-3 d-flex align-items-center justify-content-center gap-2">
                                        <button class="btn btn-sm btn-outline-primary btn-disminuir">-</button>
                                        <input type="text" class="cantidad form-control form-control-sm text-center" value="1" readonly style="width: 40px;">
                                        <button class="btn btn-sm btn-outline-primary btn-aumentar">+</button>
                                    </div>
                                   <a href="carrito.html" class="btn btn-primary mt-3 btn-comprar" data-id="${prod.id}">Comprar</a>
                                </div>
                            </div>
                        </div>
                    `;
                    row.insertAdjacentHTML('beforeend', cardHTML);
                });

                // Eventos + y - para cada card cargada
                const cards = row.querySelectorAll('.card');
                cards.forEach(card => {
                    const btnDisminuir = card.querySelector('.btn-disminuir');
                    const btnAumentar = card.querySelector('.btn-aumentar');
                    const inputCantidad = card.querySelector('.cantidad');

                    btnDisminuir.addEventListener('click', () => {
                        let valor = parseInt(inputCantidad.value);
                        if (valor > 1) inputCantidad.value = valor - 1;
                    });

                    btnAumentar.addEventListener('click', () => {
                        let valor = parseInt(inputCantidad.value);
                        inputCantidad.value = valor + 1;
                    });
                });
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

document.addEventListener('DOMContentLoaded', cargarProductos);