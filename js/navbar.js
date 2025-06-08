// Array de páginas para el navbar
const paginas = [
  { titulo: "Home", url: "index.html" },
  { titulo: "Running", url: "catRunning.html" },
  { titulo: "Urbanas", url: "catUrbanas.html" },
  { titulo: "Fútbol", url: "catFutbol.html" }
];

function crearNavbar() {
  const navbarLinks = document.getElementById("navbarLinks");
  navbarLinks.innerHTML = ""; // Limpiar contenido previo

  const logueado = localStorage.getItem("logueado") === "true";

  // Agregar páginas comunes
  paginas.forEach(p => {
    const li = document.createElement("li");
    li.classList.add("nav-item");

    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.href = p.url;
    a.textContent = p.titulo;

    // Marcar como activa si es la página actual
    if (window.location.pathname.endsWith(p.url)) {
      a.classList.add("active");
    }

    li.appendChild(a);
    navbarLinks.appendChild(li);
  });

  // Botón final: Iniciar sesión o Cerrar sesión
  const liAuth = document.createElement("li");
  liAuth.classList.add("nav-item");

  const aAuth = document.createElement("a");
  aAuth.classList.add("nav-link", "fw-bold");
  aAuth.style.cursor = "pointer";

  if (logueado) {
    aAuth.textContent = "Cerrar sesión";
    aAuth.addEventListener("click", () => {
      localStorage.removeItem("logueado");
      window.location.href = "index.html";;
    });
  } else {
    aAuth.textContent = "Iniciar sesión";
    aAuth.href = "login.html";
  }

  liAuth.appendChild(aAuth);
  navbarLinks.appendChild(liAuth);
}

document.addEventListener("DOMContentLoaded", crearNavbar);