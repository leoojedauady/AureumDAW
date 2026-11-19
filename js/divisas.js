// La API regresa un JSON como este:
// { "result": "success", "rates": { "MXN": 18.72, "EUR": 0.91, ... } }
const urlApi = "https://open.er-api.com/v6/latest/USD";

document.getElementById("formDivisas").addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const cantidad = Number(document.getElementById("cantidad").value);
  const moneda = document.getElementById("moneda").value;
  const resultado = document.getElementById("resultado");
  const mensaje = document.getElementById("mensaje");

  if (isNaN(cantidad) || cantidad <= 0) {
    mensaje.textContent = "Escribe una cantidad mayor a 0.";
    return;
  }

  resultado.textContent = "Cargando...";
  mensaje.textContent = "";

  try {
    const respuesta = await fetch(urlApi); // petición AJAX
    if (!respuesta.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const datos = await respuesta.json(); // convertimos el JSON en objeto

    const tasa = datos.rates[moneda];
    const total = cantidad * tasa;
    resultado.textContent = cantidad + " USD = " + total.toFixed(2) + " " + moneda;
  } catch (error) {
    resultado.textContent = "";
    mensaje.textContent = "No se pudo obtener el tipo de cambio. Revisa tu conexión.";
  }
});
