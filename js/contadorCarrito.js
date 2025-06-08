

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card").forEach(card => {
    const btnDisminuir = card.querySelector(".btn-disminuir");
    const btnAumentar = card.querySelector(".btn-aumentar");
    const inputCantidad = card.querySelector(".cantidad");

    if (btnDisminuir && btnAumentar && inputCantidad) {
      btnDisminuir.addEventListener("click", () => {
        let val = parseInt(inputCantidad.value);
        if (val > 1) inputCantidad.value = val - 1;
      });

      btnAumentar.addEventListener("click", () => {
        let val = parseInt(inputCantidad.value);
        inputCantidad.value = val + 1;
      });
    }
  });
});