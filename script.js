// Definimos tu código de acceso
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

// Reproductor de Video
function abrirReproductor(idVideo) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('youtubeIframe');

  // Si le pasas un ID simple o un enlace directo, lo convierte a formato embed
  let embedUrl = idVideo;
  if (!idVideo.startsWith('http')) {
    embedUrl = `https://www.youtube.com/embed/${idVideo}?autoplay=1&rel=0`;
  }

  iframe.src = embedUrl;
  modal.style.display = "flex";

  // Activa la pantalla completa nativa del monitor/navegador
  if (modal.requestFullscreen) {
    modal.requestFullscreen().catch(err => console.log(err));
  } else if (modal.webkitRequestFullscreen) { /* Safari */
    modal.webkitRequestFullscreen();
  }
}

function cerrarReproductor() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('youtubeIframe');

  iframe.src = "";
  modal.style.display = "none";

  // Sale del modo pantalla completa si está activo
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

// Detecta si se presiona la tecla ESC para cerrar el reproductor
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    cerrarReproductor();
    cerrarCapitulos();
  }
});

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