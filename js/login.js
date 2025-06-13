document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validación básica simulada
    if (email && password) {
      sessionStorage.setItem("usuarioLogueado", email); 
      window.location.href = "index.html";
    } else {
      alert("Email o contraseña incorrectos.");
    }
  });
});