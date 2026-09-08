// Definimos tu código de acceso (puedes cambiarlo aquí)
const PIN_CORRECTO = "1234";

// Al cargar la página, muestra la Splash Screen por 2.5 segundos
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    splash.style.opacity = '0';
    
    setTimeout(() => {
      splash.style.display = 'none';
      document.getElementById('login-screen').style.display = 'flex';
    }, 500); // Tiempo de desvanecimiento
  }, 2500); // 2.5 segundos de Splash Screen
});

function verificarPIN() {
  const pinIngresado = document.getElementById('pinInput').value;
  const errorMsg = document.getElementById('error-msg');

  if (pinIngresado === PIN_CORRECTO) {
    document.getElementById('login-screen').style.display = 'none';
  } else {
    errorMsg.textContent = "Código incorrecto. Intenta de nuevo.";
    document.getElementById('pinInput').value = "";
  }
}

function abrirReproductor(videoId) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('youtubeIframe');
  
  // Parámetros agregados:
  // controls=1 (mantiene solo barra de tiempo y play básicos)
  // modestbranding=1 (oculta el logo grande de YouTube)
  // rel=0 (evita que sugiera videos de otros canales al pausar/terminar)
  // fs=1 (permite botón de pantalla completa)
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&controls=1&fs=1`;
  
  modal.style.display = 'flex';
}

function cerrarReproductor() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('youtubeIframe');
  
  // Limpia el reproductor para que se corte el audio al cerrar
  iframe.src = '';
  modal.style.display = 'none';
}

// Cambiar entre Inicio, Películas y Series
function mostrarSeccion(seccion) {
  const secPeliculas = document.getElementById('sec-peliculas');
  const secSeries = document.getElementById('sec-series');
  
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  if (seccion === 'inicio') {
    secPeliculas.style.display = 'block';
    secSeries.style.display = 'block';
    document.getElementById('link-inicio').classList.add('active');
  } else if (seccion === 'peliculas') {
    secPeliculas.style.display = 'block';
    secSeries.style.display = 'none';
    document.getElementById('link-peliculas').classList.add('active');
  } else if (seccion === 'series') {
    secPeliculas.style.display = 'none';
    secSeries.style.display = 'block';
    document.getElementById('link-series').classList.add('active');
  }
}

// Ventana de Capítulos
function abrirCapitulos(tituloSerie) {
  document.getElementById('seriesTitle').textContent = tituloSerie;
  document.getElementById('episodesModal').style.display = 'flex';
}

function cerrarCapitulos() {
  document.getElementById('episodesModal').style.display = 'none';
}