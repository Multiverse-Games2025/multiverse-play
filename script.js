// Definimos tu código de acceso
const PIN_CORRECTO = "1234";

// Al cargar la página, muestra la Splash Screen por 2.5 segundos
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    splash.style.opacity = '0';
    
    setTimeout(() => {
      splash.style.display = 'none';
      const loginScreen = document.getElementById('login-screen');
      loginScreen.style.display = 'flex';
      
      // Dar foco al input del PIN al aparecer el login
      const pinInput = document.getElementById('pinInput');
      if (pinInput) pinInput.focus();
    }, 500); // Tiempo de desvanecimiento
  }, 2500); // 2.5 segundos de Splash Screen
});

// Listener para presionar Enter en la pantalla de PIN
document.addEventListener('DOMContentLoaded', () => {
  const pinInput = document.getElementById('pinInput');
  if (pinInput) {
    pinInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        verificarPIN();
      }
    });
  }
});

function verificarPIN() {
  const pinIngresado = document.getElementById('pinInput').value;
  const errorMsg = document.getElementById('error-msg');

  if (pinIngresado === PIN_CORRECTO) {
    document.getElementById('login-screen').style.display = 'none';
    
    // Auto-seleccionar el primer elemento navegable al entrar
    const firstFocusable = document.querySelector('.nav-links a, .card, input');
    if (firstFocusable) {
      firstFocusable.focus();
    }
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

  if (iframe) iframe.src = "";
  if (modal) modal.style.display = "none";

  // Sale del modo pantalla completa si está activo
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
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
  const modal = document.getElementById('episodesModal');
  if (modal) modal.style.display = 'none';
}

// Control por Teclado / Control Remoto (Navegación Smart TV)
document.addEventListener('keydown', function(event) {
  const videoModal = document.getElementById('videoModal');
  const episodesModal = document.getElementById('episodesModal');

  // Tecla ENTER o Botón OK del control remoto sobre elementos enfocados
  if (event.key === 'Enter' && document.activeElement && document.activeElement.tagName !== 'INPUT') {
    document.activeElement.click();
  }

  // Tecla ESCAPE o BACKSPACE para cerrar reproductores o modales
  if (event.key === 'Escape' || event.key === 'Backspace') {
    // Si se está escribiendo en un input, se respeta la tecla borrar
    if (document.activeElement.tagName === 'INPUT') return;

    if (videoModal && videoModal.style.display === 'flex') {
      cerrarReproductor();
      event.preventDefault();
    } else if (episodesModal && episodesModal.style.display === 'flex') {
      cerrarCapitulos();
      event.preventDefault();
    }
  }
});

// --- Funcionalidad del Buscador en Tiempo Real ---
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const busqueda = e.target.value.toLowerCase().trim();
      const tarjetas = document.querySelectorAll('.card');

      tarjetas.forEach(tarjeta => {
        const textoTarjeta = tarjeta.textContent.toLowerCase();

        if (textoTarjeta.includes(busqueda)) {
          tarjeta.style.display = '';
        } else {
          tarjeta.style.display = 'none';
        }
      });
    });
  }
});