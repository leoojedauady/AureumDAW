// Usuarios que pueden entrar al sistema
const usuarios = [
  { usuario: "demo", password: "1234", nombre: "Cliente Demo" },
  { usuario: "ana", password: "ana2026", nombre: "Ana López" }
];

const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que la página se recargue

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value;
  const mensaje = document.getElementById("mensaje");

  // Buscamos un usuario con ese nombre y esa contraseña
  let encontrado = null;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].usuario === usuario && usuarios[i].password === password) {
      encontrado = usuarios[i];
    }
  }

  if (encontrado === null) {
    mensaje.textContent = "Usuario o contraseña incorrectos.";
    return;
  }

  // Guardamos la fecha de la visita anterior antes de cambiar la cookie
  const visitaAnterior = leerCookie("ultimaVisita");
  if (visitaAnterior !== "") {
    sessionStorage.setItem("visitaAnterior", visitaAnterior);
  }

  // Cookie con la fecha de esta visita (dura 30 días)
  const fecha = new Date();
  const expira = new Date();
  expira.setDate(expira.getDate() + 30);
  document.cookie = "ultimaVisita=" + fecha.toLocaleString() + "; expires=" + expira.toUTCString() + "; path=/";

  // Iniciamos la sesión
  sessionStorage.setItem("usuario", encontrado.usuario);
  sessionStorage.setItem("nombre", encontrado.nombre);

  window.location.href = "movimientos.html";
});

// Regresa el valor de una cookie, o "" si no existe
function leerCookie(nombre) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const partes = cookies[i].split("=");
    if (partes[0] === nombre) {
      return partes[1];
    }
  }
  return "";
}
