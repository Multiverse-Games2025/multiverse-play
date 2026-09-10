// Definimos tu código de acceso
const PIN_CORRECTO = "1234";

// Variable global para controlar la instancia activa de HLS
let hlsInstance = null;

// ==========================================
// BASE DE DATOS LOCAL DE SERIES Y CAPÍTULOS
// ==========================================
const baseDatosSeries = {
  "Saint Seiya: The Lost Canvas": [
    { temporada: 1, cap: 1, titulo: "Capítulo 1: La promesa", videoId: "4pIw2LQkpdI" },
    { temporada: 1, cap: 2, titulo: "Capítulo 2: El despertar de Hades", videoId: "6Vbl9PMI2sg" },
    { temporada: 1, cap: 3, titulo: "Capítulo 3: Comienza la guerra santa", videoId: "a5YpTdLk7Ko" },
    { temporada: 1, cap: 4, titulo: "Capítulo 4: La pulsera de oración", videoId: "o3G6Duxl6aY" },
    { temporada: 1, cap: 5, titulo: "Capítulo 5: La rosa venenosa", videoId: "YOUWw2_A_-I" },
    { temporada: 1, cap: 6, titulo: "Capítulo 6: Funeral de flores", videoId: "n8JyhO7pckM" },
    { temporada: 1, cap: 7, titulo: "Capítulo 7: El árbol de los frutos sagrados", videoId: "_-sTAWvaKnY" },
    { temporada: 1, cap: 8, titulo: "Capítulo 8: Un día con viento suave", videoId: "C8aMbLygxKo" },
    { temporada: 1, cap: 9, titulo: "Capítulo 9: Una gran estrella", videoId: "vqToy-O__UM" },
    { temporada: 1, cap: 10, titulo: "Capítulo 10: Advenimento", videoId: "E2HHQmmkdXI" },
    { temporada: 1, cap: 11, titulo: "Capítulo 11: Inalcanzable", videoId: "WAVQPLI5afA" },
    { temporada: 1, cap: 12, titulo: "Capítulo 12: Sacrificios interminables", videoId: "zdjPsLvKzt8" },
    { temporada: 1, cap: 13, titulo: "Capítulo 13: El viaje", videoId: "Fjj8SGhLXrk" },
    { temporada: 2, cap: 14, titulo: "Capítulo 14: El Bosque de la Muerte", videoId: "_fNC-e0DRfU" },
    { temporada: 2, cap: 15, titulo: "Capítulo 15: Si pudiera regresar aquel dia", videoId: "H1HAw_ZUEV8" },
    { temporada: 2, cap: 16, titulo: "Capítulo 16: Dioses y peones", videoId: "aHPEldewjHU" },
    { temporada: 2, cap: 17, titulo: "Capítulo 17: Basura", videoId: "TD3Fg9sIHOs" },
    { temporada: 2, cap: 18, titulo: "Capítulo 18: Solo deseo que vivas", videoId: "wrY5h-HIr8g" },
    { temporada: 2, cap: 19, titulo: "Capítulo 19: Espada solitaria", videoId: "ukyXYVAAUFo" },
    { temporada: 2, cap: 20, titulo: "Capítulo 20: La prision de los sueño", videoId: "jtG_ASx8Heg" },
    { temporada: 2, cap: 21, titulo: "Capítulo 21: Más alla del sueño", videoId: "sUinsvmafkk" },
    { temporada: 2, cap: 22, titulo: "Capítulo 22: Un arduo Camino", videoId: "KkhvIzO8tno" },
    { temporada: 2, cap: 23, titulo: "Capítulo 23: La Espada Sagrada", videoId: "ypbL-FkmcRs" },
    { temporada: 2, cap: 24, titulo: "Capítulo 24: Hora de una sangrienta batalla", videoId: "k1AzzLbNXyY" },
    { temporada: 2, cap: 25, titulo: "Capítulo 25: Hace muchas lunas", videoId: "MI0j2-X-t9o" },
    { temporada: 2, cap: 26, titulo: "Capítulo 26: Sé tú mismo", videoId: "A9drym9D3EM" },
    // Puedes seguir agregando más capítulos aquí fácilmente con formato JSON
  ],
  "El Puntero": [
    { temporada: 1, cap: 1, titulo: "Capítulo 1:", videoId: "0ACtdIJUyMU" },
    { temporada: 1, cap: 2, titulo: "Capítulo 2:", videoId: "FabhCvTZkXU" },
    { temporada: 1, cap: 3, titulo: "Capítulo 3:", videoId: "EM5ZSfw75hE" },
    { temporada: 1, cap: 4, titulo: "Capítulo 4:", videoId: "Owc7Jx1wJVI" },
    { temporada: 1, cap: 5, titulo: "Capítulo 5:", videoId: "04RajiZ3Qk0" },
    { temporada: 1, cap: 6, titulo: "Capítulo 6:", videoId: "Vk76C_a4I" },
    { temporada: 1, cap: 7, titulo: "Capítulo 7:", videoId: "merfdypbQho" },
    { temporada: 1, cap: 8, titulo: "Capítulo 8:", videoId: "RtXB2K6Mt3Q" },
    { temporada: 1, cap: 9, titulo: "Capítulo 9:", videoId: "DnXrVCj--0" },
    { temporada: 1, cap: 10, titulo: "Capítulo 10:", videoId: "b67xjtCUMGo" },
    { temporada: 1, cap: 11, titulo: "Capítulo 11:", videoId: "Yz3643T9tKI" },
    { temporada: 1, cap: 12, titulo: "Capítulo 12:", videoId: "1MDS6NmGSNc" },
    { temporada: 1, cap: 13, titulo: "Capítulo 13:", videoId: "dL79EYdLNPc" },
    { temporada: 1, cap: 14, titulo: "Capítulo 14:", videoId: "g4wFesEwHSA" },
    { temporada: 1, cap: 15, titulo: "Capítulo 15:", videoId: "uEJKmMQ2Lr4" },
    { temporada: 1, cap: 16, titulo: "Capítulo 16:", videoId: "9nAgYIF9dec" },
    { temporada: 1, cap: 17, titulo: "Capítulo 17:", videoId: "1mt82gWtwas" },
    { temporada: 1, cap: 18, titulo: "Capítulo 18:", videoId: "ojeG6CoUqEY" },
    { temporada: 1, cap: 19, titulo: "Capítulo 19:", videoId: "LRbrhllQk2w" },
    { temporada: 1, cap: 20, titulo: "Capítulo 20:", videoId: "tpVjva0C8XQ" },
    { temporada: 1, cap: 21, titulo: "Capítulo 21:", videoId: "ZOFt2yTowJM" },
    { temporada: 1, cap: 22, titulo: "Capítulo 22:", videoId: "6x8a6tP6E9k" },
    { temporada: 1, cap: 23, titulo: "Capítulo 23:", videoId: "F_JcZIX8rzQ" },
    { temporada: 1, cap: 24, titulo: "Capítulo 24:", videoId: "HYjT4T-N1eg" },
    { temporada: 1, cap: 25, titulo: "Capítulo 25:", videoId: "aJ13e6r3NeE" },
    { temporada: 1, cap: 26, titulo: "Capítulo 26:", videoId: "ujcrtK1tEGI" },
    { temporada: 1, cap: 27, titulo: "Capítulo 27:", videoId: "tJA7rt_0DFA" },
    { temporada: 1, cap: 28, titulo: "Capítulo 28:", videoId: "q3g6sE7qhaQ" },
    { temporada: 1, cap: 29, titulo: "Capítulo 29:", videoId: "fMTTVmKU8ds" },
    { temporada: 1, cap: 30, titulo: "Capítulo 30:", videoId: "ZqO-xIiWRXc" },
    { temporada: 1, cap: 31, titulo: "Capítulo 31:", videoId: "OH7Tk9A6Hlc" },
    { temporada: 1, cap: 32, titulo: "Capítulo 32:", videoId: "OlnHBclr4r4" },
    { temporada: 1, cap: 33, titulo: "Capítulo 33:", videoId: "j1qhfynqSOQ" },
    { temporada: 1, cap: 34, titulo: "Capítulo 34:", videoId: "FNyVxjD42Zk" },
    { temporada: 1, cap: 35, titulo: "Capítulo 35:", videoId: "WPX2S2kkJO0" },
    { temporada: 1, cap: 36, titulo: "Capítulo 36:", videoId: "DF57vHhJz_c" },
    { temporada: 1, cap: 37, titulo: "Capítulo 37:", videoId: "4pbotQkUz14" },
    { temporada: 1, cap: 38, titulo: "Capítulo 38:", videoId: "91RbJrI6pRY" },
    { temporada: 1, cap: 39, titulo: "Capítulo 39:", videoId: "SjVJ8FADurk" },
  ]
};

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

// ==========================================
// ABRIR REPRODUCTOR DE YOUTUBE
// ==========================================
function abrirReproductor(videoId) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('youtubeIframe');
  const videoPlayer = document.getElementById('html5VideoPlayer');

  // Ocultamos el reproductor de IPTV por si estuviera activo
  if (videoPlayer) {
    videoPlayer.pause();
    videoPlayer.src = "";
    videoPlayer.style.display = 'none';
  }

  // Si ya existía una sesión HLS abierta, la destruimos
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }

  // Configuramos y mostramos el iframe de YouTube con autoplay
  if (iframe) {
    iframe.style.display = 'block';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
  }

  if (modal) {
    modal.style.display = "flex";
  }

  // Pantalla completa automática (compatible con TV Box y navegadores)
  if (modal.requestFullscreen) {
    modal.requestFullscreen().catch(err => console.log(err));
  } else if (modal.webkitRequestFullscreen) {
    modal.webkitRequestFullscreen();
  }
}

// Reproductor de Canales IPTV en Vivo (.m3u8) compatible con Android
function reproducirCanal(urlCanal, nombreCanal) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('youtubeIframe');

  // Ocultamos el iframe de YouTube
  if (iframe) {
    iframe.src = "";
    iframe.style.display = 'none';
  }
  
  // Obtenemos o creamos el elemento de video HTML5
  let videoPlayer = document.getElementById('html5VideoPlayer');
  if (!videoPlayer) {
    videoPlayer = document.createElement('video');
    videoPlayer.id = 'html5VideoPlayer';
    videoPlayer.controls = true;
    videoPlayer.autoplay = true;
    videoPlayer.playsInline = true; // Vital para dispositivos móviles Android/iOS
    videoPlayer.style.width = '100%';
    videoPlayer.style.height = '100%';
    videoPlayer.style.backgroundColor = '#000';
    iframe.parentNode.appendChild(videoPlayer);
  }
  videoPlayer.style.display = 'block';

  // Si ya existía una sesión de HLS abierta, la destruimos
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }

  // Reproducción adaptada para Android
  if (Hls.isSupported()) {
    hlsInstance = new Hls({
      debug: false,
      xhrSetup: function (xhr, url) {
        xhr.withCredentials = false;
      }
    });
    hlsInstance.loadSource(urlCanal);
    hlsInstance.attachMedia(videoPlayer);
    
    hlsInstance.on(Hls.Events.MANIFEST_PARSED, function() {
      const playPromise = videoPlayer.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevenido por Android, esperando interacción del usuario.");
        });
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

  // Vaciamos el src del iframe para matar el video y el audio de YouTube al instante
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

// ==========================================
// GESTIÓN DINÁMICA DE CAPÍTULOS DE SERIES
// ==========================================
function abrirCapitulos(tituloSerie) {
  document.getElementById('seriesTitle').textContent = tituloSerie;
  const contenedorLista = document.getElementById('lista-episodios');
  
  // Limpiamos la lista previa
  contenedorLista.innerHTML = '';

  // Buscamos los episodios en nuestra base de datos local
  const episodios = baseDatosSeries[tituloSerie];

  if (episodios && episodios.length > 0) {
    episodios.forEach(ep => {
      const itemEpisodio = document.createElement('div');
      itemEpisodio.className = 'episode-item';
      itemEpisodio.innerHTML = `
        <div class="episode-info">
          <span class="episode-number">T${ep.temporada} · C${ep.cap}</span>
          <span class="episode-title">${ep.titulo}</span>
        </div>
        <button class="play-episode-btn" onclick="abrirReproductor('${ep.videoId}')">▶ Reproducir</button>
      `;
      contenedorLista.appendChild(itemEpisodio);
    });
  } else {
    contenedorLista.innerHTML = '<p style="color: #aaa; text-align: center; padding: 20px;">No hay capítulos disponibles para esta serie todavía.</p>';
  }

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