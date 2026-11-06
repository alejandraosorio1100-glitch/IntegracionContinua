document.addEventListener('DOMContentLoaded', () => {
  const contenedorNoticias = document.getElementById('contenedor-noticias');

  if (!contenedorNoticias) return;

  // 1. Cargar noticias base del JSON
  fetch('data/noticias.json')
    .then(response => response.json())
    .then(noticiasJSON => {
      // 2. Obtener noticias agregadas desde Gestión
      const noticiasCRUD = JSON.parse(localStorage.getItem('noticias_crud')) || [];
      
      // Asegurarle un id único a las noticias del CRUD para que puedan verse en detalle.html
      const noticiasCRUDConID = noticiasCRUD.map((noticia, index) => ({
        ...noticia,
        id: noticia.id || (1000 + index)
      }));

      // Combinar ambos arrays
      const todasLasNoticias = [...noticiasCRUDConID, ...noticiasJSON];

      // Si estamos en index.html, mostramos solo las primeras 3 destacadas
      const esIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
      const noticiasAMostrar = esIndex ? todasLasNoticias.slice(0, 3) : todasLasNoticias;

      renderizarTarjetas(noticiasAMostrar);
    })
    .catch(error => {
      console.error('Error al cargar noticias:', error);
      const noticiasCRUD = JSON.parse(localStorage.getItem('noticias_crud')) || [];
      if (noticiasCRUD.length > 0) renderizarTarjetas(noticiasCRUD);
    });

  function renderizarTarjetas(lista) {
    contenedorNoticias.innerHTML = '';
    const favoritos = JSON.parse(localStorage.getItem('noticias_favoritas')) || [];

    lista.forEach(noticia => {
      const esFavorito = favoritos.some(fav => fav.titulo === noticia.titulo);
      
      const tarjeta = document.createElement('article');
      tarjeta.className = 'tarjeta-noticia';
      
      // Se agregan enlaces <a> envolviendo la imagen y el título para abrir detalle.html
      tarjeta.innerHTML = `
        <a href="detalle.html?id=${noticia.id}" style="text-decoration: none; color: inherit; display: block;">
          <img src="${noticia.imagen || 'img/noticia1.jpg'}" alt="${noticia.titulo}" onerror="this.src='https://via.placeholder.com/300x150'">
          <h3 style="cursor: pointer;">${noticia.titulo}</h3>
        </a>
        <p>${noticia.resumen || noticia.contenido}</p>
        <button class="btn-favorito ${esFavorito ? 'agregado' : ''}" data-titulo="${noticia.titulo}">
          ${esFavorito ? '⭐ En Favoritos' : '⭐ Guardar en favoritos'}
        </button>
      `;

      // Evento para el botón de favoritos
      const btnFav = tarjeta.querySelector('.btn-favorito');
      btnFav.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita abrir el detalle al hacer clic en el botón
        toggleFavorito(noticia, btnFav);
      });

      contenedorNoticias.appendChild(tarjeta);
    });
  }

  function toggleFavorito(noticia, boton) {
    let favoritos = JSON.parse(localStorage.getItem('noticias_favoritas')) || [];
    const existe = favoritos.some(fav => fav.titulo === noticia.titulo);

    if (existe) {
      favoritos = favoritos.filter(fav => fav.titulo !== noticia.titulo);
      boton.textContent = '⭐ Guardar en favoritos';
      boton.classList.remove('agregado');
    } else {
      favoritos.push(noticia);
      boton.textContent = '⭐ En Favoritos';
      boton.classList.add('agregado');
    }

    localStorage.setItem('noticias_favoritas', JSON.stringify(favoritos));
  }
});