// Guarda o quita una noticia de la lista de favoritos en LocalStorage
function guardarFavorito(idNoticia) {
  let favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];

  if (favoritos.includes(idNoticia)) {
    // Si ya estaba, la quitamos
    favoritos = favoritos.filter(id => id !== idNoticia);
    alert('Noticia quitada de favoritos');
  } else {
    // Si no estaba, la agregamos
    favoritos.push(idNoticia);
    alert('¡Noticia guardada en favoritos!');
  }

  // Guardamos la lista actualizada en el navegador
  localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
}

// Muestra las noticias guardadas en la página de favoritos.html
document.addEventListener('DOMContentLoaded', () => {
  const contenedorFavs = document.getElementById('contenedor-favoritos');

  if (contenedorFavs) {
    const favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];

    fetch('data/noticias.json')
      .then(res => res.json())
      .then(noticias => {
        contenedorFavs.innerHTML = '';
        
        // Filtramos solo las noticias guardadas
        const listaFavs = noticias.filter(n => favoritos.includes(n.id));

        if (listaFavs.length === 0) {
          contenedorFavs.innerHTML = '<p>Aún no has guardado noticias favoritas.</p>';
          return;
        }

        listaFavs.forEach(noticia => {
          const tarjeta = document.createElement('article');
          tarjeta.classList.add('tarjeta-noticia');
          tarjeta.innerHTML = `
            <img src="${noticia.imagen}" alt="${noticia.titulo}">
            <h3>${noticia.titulo}</h3>
            <p>${noticia.resumen}</p>
            <button onclick="guardarFavorito(${noticia.id}); location.reload();">❌ Quitar</button>
          `;
          contenedorFavs.appendChild(tarjeta);
        });
      });
  }
});