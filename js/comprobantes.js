// Los comprobantes se guardan en localStorage como una lista de objetos:
// { nombre: "ticket.pdf", contenido: "data:application/pdf;base64,..." }
const claveComprobantes = "comprobantes_" + sessionStorage.getItem("usuario");

let comprobantes = [];
const guardados = localStorage.getItem(claveComprobantes);
if (guardados !== null) {
  comprobantes = JSON.parse(guardados);
}

const mensaje = document.getElementById("mensaje");

mostrarComprobantes();

// ===== Subir =====
document.getElementById("formArchivo").addEventListener("submit", function (evento) {
  evento.preventDefault();

  const archivo = document.getElementById("archivo").files[0];

  // Validaciones: tipo de archivo y tamaño (1 MB = 1024 * 1024 bytes)
  if (archivo.type !== "application/pdf" && archivo.type !== "image/png" && archivo.type !== "image/jpeg") {
    mensaje.textContent = "Solo se permiten archivos PDF, PNG o JPG.";
    return;
  }
  if (archivo.size > 1024 * 1024) {
    mensaje.textContent = "El archivo pesa más de 1 MB.";
    return;
  }

  // FileReader convierte el archivo en texto para poder guardarlo en localStorage
  const lector = new FileReader();
  lector.onload = function () {
    comprobantes.push({ nombre: archivo.name, contenido: lector.result });
    localStorage.setItem(claveComprobantes, JSON.stringify(comprobantes));
    mensaje.textContent = "";
    document.getElementById("formArchivo").reset();
    mostrarComprobantes();
  };
  lector.readAsDataURL(archivo);
});

// ===== Mostrar la lista con enlaces para descargar =====
function mostrarComprobantes() {
  let filas = "";

  for (let i = 0; i < comprobantes.length; i++) {
    filas += `
      <tr>
        <td>${protegerTexto(comprobantes[i].nombre)}</td>
        <td>
          <a href="${comprobantes[i].contenido}" download="${protegerTexto(comprobantes[i].nombre)}">Descargar</a>
          <button class="boton-rojo" onclick="eliminarComprobante(${i})">Eliminar</button>
        </td>
      </tr>`;
  }

  if (filas === "") {
    filas = "<tr><td colspan='2'>Todavía no hay comprobantes.</td></tr>";
  }

  document.getElementById("tabla").innerHTML = filas;
}

function eliminarComprobante(indice) {
  if (confirm("¿Eliminar este comprobante?")) {
    comprobantes.splice(indice, 1);
    localStorage.setItem(claveComprobantes, JSON.stringify(comprobantes));
    mostrarComprobantes();
  }
}
