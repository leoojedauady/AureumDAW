# Aureum Bank

Proyecto final de Desarrollo de Aplicaciones Web. Banco ficticio hecho con HTML, CSS y JavaScript.

- Edrei Lizama
- Juan Vargas
- Leonardo Ojeda

## Archivos

| Archivo | Qué hace |
|---------|----------|
| `index.html` + `js/login.js` | Inicio de sesión. Guarda la sesión en sessionStorage y la fecha de la visita en una cookie. |
| `js/sesion.js` | Se incluye en todas las páginas: si no hay sesión regresa al login, cierra sesión y tiene `protegerTexto()` contra XSS. |
| `movimientos.html` + `js/movimientos.js` | Agregar, ver, buscar, editar y eliminar movimientos. Se guardan en localStorage. Cada movimiento usa una categoría del catálogo `categorias`. |
| `comprobantes.html` + `js/comprobantes.js` | Subir archivos (PDF, PNG o JPG de máximo 1 MB) y descargarlos. |
| `divisas.html` + `js/divisas.js` | Conversor de dólares usando la API pública open.er-api.com con fetch y JSON. |
| `css/estilos.css` | Estilos, media query para celular y media query print para imprimir los movimientos. |

## Puntos de la rúbrica

1. Sesiones: `sessionStorage` en `login.js` y `sesion.js`.
2. Ataques básicos: `protegerTexto()` evita XSS; validación de formularios y de archivos.
3. Catálogo con búsqueda: movimientos con categoría (`movimientos.js`).
5. Cookies y localStorage: cookie `ultimaVisita`; movimientos y comprobantes en localStorage.
6. Subir y descargar archivos: `comprobantes.js`.
8. AJAX + JSON: `divisas.js`.
9. Validación y contenido dinámico: `validarFormulario()` y las tablas que se generan con JavaScript.
10. Media query print: final de `estilos.css`.
