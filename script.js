// Definimos tu código de acceso
const PIN_CORRECTO = "1234";

// Variable global para controlar la instancia activa de HLS (¡Esto faltaba arriba del todo!)
let hlsInstance = null;

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

// Reproductor de Video (YouTube / Películas / Series)
function abrirReproductor(idVideo) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('youtubeIframe');
  const videoPlayer = document.getElementById('html5VideoPlayer');

  // Si había una transmisión de IPTV activa, la cerramos y destruimos HLS limpiamente
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }

  if (videoPlayer) {
    videoPlayer.pause();
    videoPlayer.src = "";
    videoPlayer.style.display = 'none';
  }
  
  if (iframe) {
    iframe.style.display = 'block';
    let embedUrl = idVideo;
    if (!idVideo.startsWith('http')) {
      embedUrl = `https://www.youtube.com/embed/${idVideo}?autoplay=1&rel=0`;
    }
    iframe.src = embedUrl;
  }

  modal.style.display = "flex";

  // Activa la pantalla completa nativa
  if (modal.requestFullscreen) {
    modal.requestFullscreen().catch(err => console.log(err));
  } else if (modal.webkitRequestFullscreen) { /* Safari */
    modal.webkitRequestFullscreen();
  }
}

// Reproductor de Canales IPTV en Vivo (.m3u8) optimizado
function reproducirCanal(urlCanal, nombreCanal) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('youtubeIframe');

  // Ocultamos el iframe de YouTube
  if (iframe) {
    iframe.src = "";
    iframe.style.display = 'none';
  }
  
  // Obtenemos o creamos el elemento de video HTML5 para el stream IPTV
  let videoPlayer = document.getElementById('html5VideoPlayer');
  if (!videoPlayer) {
    videoPlayer = document.createElement('video');
    videoPlayer.id = 'html5VideoPlayer';
    videoPlayer.controls = true;
    videoPlayer.autoplay = true;
    videoPlayer.style.width = '100%';
    videoPlayer.style.height = '100%';
    videoPlayer.style.backgroundColor = '#000';
    iframe.parentNode.appendChild(videoPlayer);
  }
  videoPlayer.style.display = 'block';

  // Si ya existía una sesión de HLS abierta, la destruimos antes de cargar el nuevo canal
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }

  // Reproducción con HLS.js o soporte nativo
  if (Hls.isSupported()) {
    hlsInstance = new Hls({
      xhrSetup: function (xhr, url) {
        xhr.withCredentials = false;
      }
    });
    hlsInstance.loadSource(urlCanal);
    hlsInstance.attachMedia(videoPlayer);
    
    hlsInstance.on(Hls.Events.MANIFEST_PARSED, function() {
      videoPlayer.play().catch(err => {
        console.log("Autoplay bloqueado:", err);
      });
    });

    hlsInstance.on(Hls.Events.FRAG_LOADED, function() {
      if (videoPlayer.paused) {
        videoPlayer.play().catch(e => console.log(e));
      }
    });

    hlsInstance.on(Hls.Events.ERROR, function(event, data) {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hlsInstance.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            hlsInstance.recoverMediaError();
            break;
          default:
            hlsInstance.destroy();
            break;
        }
      }
    });
  } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
    videoPlayer.src = urlCanal;
    videoPlayer.addEventListener('loadedmetadata', function() {
      videoPlayer.play().catch(err => console.log(err));
    });
  }

  modal.style.display = "flex";

  if (modal.requestFullscreen) {
    modal.requestFullscreen().catch(err => console.log(err));
  } else if (modal.webkitRequestFullscreen) {
    modal.webkitRequestFullscreen();
  }
}

function cerrarReproductor() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('youtubeIframe');
  const videoPlayer = document.getElementById('html5VideoPlayer');

  if (iframe) {
    iframe.src = "";
    iframe.style.display = "block";
  }
  
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }

  if (videoPlayer) {
    videoPlayer.pause();
    videoPlayer.src = "";
    videoPlayer.style.display = "none";
  }

  if (modal) modal.style.display = "none";

  if (document.fullscreenElement || document.webkitFullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

// Cambiar entre Inicio, Películas, Series y TV en Vivo
function mostrarSeccion(seccion) {
  const secPeliculas = document.getElementById('sec-peliculas');
  const secSeries = document.getElementById('sec-series');
  const secTv = document.getElementById('sec-tv');
  
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  if (seccion === 'inicio') {
    if (secPeliculas) secPeliculas.style.display = 'block';
    if (secSeries) secSeries.style.display = 'block';
    if (secTv) secTv.style.display = 'none';
    document.getElementById('link-inicio').classList.add('active');
  } else if (seccion === 'peliculas') {
    if (secPeliculas) secPeliculas.style.display = 'block';
    if (secSeries) secSeries.style.display = 'none';
    if (secTv) secTv.style.display = 'none';
    document.getElementById('link-peliculas').classList.add('active');
  } else if (seccion === 'series') {
    if (secPeliculas) secPeliculas.style.display = 'none';
    if (secSeries) secSeries.style.display = 'block';
    if (secTv) secTv.style.display = 'none';
    document.getElementById('link-series').classList.add('active');
  } else if (seccion === 'tv') {
    if (secPeliculas) secPeliculas.style.display = 'none';
    if (secSeries) secSeries.style.display = 'none';
    if (secTv) secTv.style.display = 'block';
    document.getElementById('link-tv').classList.add('active');
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

  if (event.key === 'Enter' && document.activeElement && document.activeElement.tagName !== 'INPUT') {
    document.activeElement.click();
  }

  if (event.key === 'Escape' || event.key === 'Backspace') {
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