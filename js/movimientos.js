// ===== Al cargar la página =====
document.getElementById("saludo").textContent = "Hola, " + sessionStorage.getItem("nombre");

const visitaAnterior = sessionStorage.getItem("visitaAnterior");
if (visitaAnterior !== null) {
  document.getElementById("ultimaVisita").textContent = "Tu última visita fue el " + visitaAnterior;
}
