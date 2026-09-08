function abrirReproductor(videoId) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('youtubeIframe');
  
  // Asigna el video con reproducción automática (autoplay)
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  modal.style.display = 'flex';
}

function cerrarReproductor() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('youtubeIframe');
  
  // Limpia el reproductor para que se corte el audio al cerrar
  iframe.src = '';
  modal.style.display = 'none';
}