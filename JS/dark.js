const btnTema = document.querySelector('#btnTema');
const iconoTema = document.querySelector('#iconoTema');
const textoTema = document.querySelector('#textoTema');
const raiz = document.documentElement; // la etiqueta <html>

/**
 * Aplica un tema a la pagina y actualiza el boton.
 * @param {string} tema - 'light' o 'dark'
 */
function aplicarTema(tema) {
  
  raiz.setAttribute('data-bs-theme', tema);

  if (tema === 'dark') {
    iconoTema.className = 'bi bi-sun';
    textoTema.textContent = 'Modo claro';
  } else {
    iconoTema.className = 'bi bi-moon';
    textoTema.textContent = 'Modo oscuro';
  }
}

btnTema.addEventListener('click', function () {
  const temaActual = raiz.getAttribute('data-bs-theme');
  const temaNuevo = temaActual === 'dark' ? 'light' : 'dark';
  aplicarTema(temaNuevo);
});