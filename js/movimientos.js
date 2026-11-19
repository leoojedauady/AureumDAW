// ===== Datos =====

// Catálogo de categorías. Cada movimiento guarda una de estas.
const categorias = ["Nómina", "Alimentos", "Transporte", "Servicios", "Ocio", "Otros"];

// Cada usuario tiene sus propios movimientos en localStorage
const claveMovimientos = "movimientos_" + sessionStorage.getItem("usuario");

let movimientos = [];
let indiceEditando = -1; // -1 significa que no estamos editando nada

// Leemos los movimientos guardados. Si no hay, ponemos unos de ejemplo.
const guardados = localStorage.getItem(claveMovimientos);
if (guardados !== null) {
  movimientos = JSON.parse(guardados);
} else {
  movimientos = [
    { fecha: "2026-11-01", descripcion: "Pago de nómina", categoria: "Nómina", tipo: "ingreso", monto: 9500 },
    { fecha: "2026-11-05", descripcion: "Supermercado", categoria: "Alimentos", tipo: "gasto", monto: 1340.5 },
    { fecha: "2026-11-10", descripcion: "Recibo de luz", categoria: "Servicios", tipo: "gasto", monto: 430 }
  ];
  guardarMovimientos();
}

// ===== Elementos de la página =====
const formMovimiento = document.getElementById("formMovimiento");
const campoFecha = document.getElementById("fecha");
const campoDescripcion = document.getElementById("descripcion");
const campoCategoria = document.getElementById("categoria");
const campoTipo = document.getElementById("tipo");
const campoMonto = document.getElementById("monto");
const campoBuscar = document.getElementById("buscar");
const mensaje = document.getElementById("mensaje");

// ===== Al cargar la página =====
document.getElementById("saludo").textContent = "Hola, " + sessionStorage.getItem("nombre");

const visitaAnterior = sessionStorage.getItem("visitaAnterior");
if (visitaAnterior !== null) {
  document.getElementById("ultimaVisita").textContent = "Tu última visita fue el " + visitaAnterior;
}

// Llenamos el select con las categorías
for (let i = 0; i < categorias.length; i++) {
  campoCategoria.innerHTML += "<option>" + categorias[i] + "</option>";
}

mostrarMovimientos();

// ===== Funciones =====

function guardarMovimientos() {
  localStorage.setItem(claveMovimientos, JSON.stringify(movimientos));
}

// Dibuja la tabla y calcula el saldo
function mostrarMovimientos() {
  const textoBuscado = campoBuscar.value.toLowerCase();
  let filas = "";
  let saldo = 0;

  for (let i = 0; i < movimientos.length; i++) {
    const mov = movimientos[i];

    // El saldo siempre se calcula con todos los movimientos
    if (mov.tipo === "ingreso") {
      saldo = saldo + mov.monto;
    } else {
      saldo = saldo - mov.monto;
    }

    // En la tabla solo mostramos los que coinciden con la búsqueda
    if (mov.descripcion.toLowerCase().includes(textoBuscado)) {
      let montoTexto = "$" + mov.monto.toFixed(2);
      if (mov.tipo === "gasto") {
        montoTexto = "-" + montoTexto;
      }

      filas += `
        <tr>
          <td>${mov.fecha}</td>
          <td>${protegerTexto(mov.descripcion)}</td>
          <td>${mov.categoria}</td>
          <td class="${mov.tipo}">${montoTexto}</td>
          <td class="no-imprimir">
            <button onclick="editarMovimiento(${i})">Editar</button>
            <button class="boton-rojo" onclick="eliminarMovimiento(${i})">Eliminar</button>
          </td>
        </tr>`;
    }
  }

  if (filas === "") {
    filas = "<tr><td colspan='5'>No hay movimientos.</td></tr>";
  }

  document.getElementById("tabla").innerHTML = filas;
  document.getElementById("saldo").textContent = "$" + saldo.toFixed(2);
}

// Revisa que los datos del formulario estén bien
function validarFormulario() {
  if (campoFecha.value === "") {
    mensaje.textContent = "Escribe la fecha.";
    return false;
  }
  if (campoDescripcion.value.trim().length < 3) {
    mensaje.textContent = "La descripción debe tener al menos 3 letras.";
    return false;
  }
  const monto = Number(campoMonto.value);
  if (isNaN(monto) || monto <= 0) {
    mensaje.textContent = "El monto debe ser mayor a 0.";
    return false;
  }
  mensaje.textContent = "";
  return true;
}

// Guardar (sirve para agregar y para editar)
formMovimiento.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (!validarFormulario()) {
    return;
  }

  const movimiento = {
    fecha: campoFecha.value,
    descripcion: campoDescripcion.value.trim(),
    categoria: campoCategoria.value,
    tipo: campoTipo.value,
    monto: Number(campoMonto.value)
  };

  if (indiceEditando === -1) {
    movimientos.push(movimiento); // nuevo
  } else {
    movimientos[indiceEditando] = movimiento; // reemplaza el que se estaba editando
  }

  guardarMovimientos();
  limpiarFormulario();
  mostrarMovimientos();
});

// Pone los datos de un movimiento en el formulario
function editarMovimiento(indice) {
  const mov = movimientos[indice];
  campoFecha.value = mov.fecha;
  campoDescripcion.value = mov.descripcion;
  campoCategoria.value = mov.categoria;
  campoTipo.value = mov.tipo;
  campoMonto.value = mov.monto;

  indiceEditando = indice;
  document.getElementById("tituloFormulario").textContent = "Editar movimiento";
  document.getElementById("botonGuardar").textContent = "Guardar cambios";
  window.scrollTo(0, 0);
}

function eliminarMovimiento(indice) {
  if (confirm("¿Seguro que quieres eliminar este movimiento?")) {
    movimientos.splice(indice, 1); // quita 1 elemento en esa posición
    guardarMovimientos();
    limpiarFormulario();
    mostrarMovimientos();
  }
}

function limpiarFormulario() {
  formMovimiento.reset();
  indiceEditando = -1;
  mensaje.textContent = "";
  document.getElementById("tituloFormulario").textContent = "Agregar movimiento";
  document.getElementById("botonGuardar").textContent = "Guardar";
}

// Buscar mientras se escribe
campoBuscar.addEventListener("input", mostrarMovimientos);

// Imprimir (el CSS de @media print oculta el menú y los botones)
document.getElementById("botonImprimir").addEventListener("click", function () {
  window.print();
});
