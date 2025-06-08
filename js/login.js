document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#loginForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // Aquí podés validar con valores fijos o más adelante contra localStorage si hacés registro
    if (email && password) {
      // Simulación de login exitoso
      localStorage.setItem("logueado", "true");
      window.location.href = "index.html";
    } else {
      alert("Email y contraseña requeridos");
    }
  });
});