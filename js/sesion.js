// Este archivo se usa en todas las páginas, menos en el login.

// Si no hay sesión, regresamos al login
if (sessionStorage.getItem("usuario") === null) {
  window.location.href = "index.html";
}

// Botón "Cerrar sesión" del menú
document.getElementById("salir").addEventListener("click", function (evento) {
  evento.preventDefault();
  sessionStorage.clear();
  window.location.href = "index.html";
});

// Protección contra XSS: convierte < > & " ' en texto normal
// para que lo que escribe el usuario nunca se ejecute como HTML.
function protegerTexto(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
