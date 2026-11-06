document.addEventListener('DOMContentLoaded', () => {
  const formCRUD = document.getElementById('form-crud');
  const contenedor = document.getElementById('contenedor-crud');

  function obtenerNoticias() {
    const noticiasGuardadas = localStorage.getItem('noticias_crud');
    return noticiasGuardadas ? JSON.parse(noticiasGuardadas) : [];
  }

  function guardarNoticias(noticias) {
    localStorage.setItem('noticias_crud', JSON.stringify(noticias));
    renderizarNoticias();
  }

  function renderizarNoticias() {
    if (!contenedor) return;
    
    const noticias = obtenerNoticias();
    contenedor.innerHTML = '';

    if (noticias.length === 0) {
      contenedor.innerHTML = '<p style="color: #666; font-style: italic;">No hay noticias creadas en el panel.</p>';
      return;
    }

    noticias.forEach((noticia, index) => {
      const card = document.createElement('article');
      card.className = 'tarjeta-noticia';
      card.style.cssText = 'background: #fff; padding: 15px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 15px; text-align: left;';
      
      card.innerHTML = `
        <img src="${noticia.imagen || 'img/noticia1.jpg'}" alt="${noticia.titulo}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;" onerror="this.src='https://via.placeholder.com/300x150'">
        <h4 style="margin: 0 0 8px 0; color: #333;">${noticia.titulo}</h4>
        <p style="font-size: 13px; color: #666; margin-bottom: 12px;">${noticia.resumen}</p>
        <button class="btn-eliminar" data-index="${index}" style="background-color: #ff85a1; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">Eliminar</button>
      `;
      contenedor.appendChild(card);
    });

    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        eliminarNoticia(idx);
      });
    });
  }

  if (formCRUD) {
    formCRUD.addEventListener('submit', (e) => {
      e.preventDefault();
      const titulo = document.getElementById('crud-titulo').value.trim();
      const resumen = document.getElementById('crud-resumen').value.trim();
      const imagen = document.getElementById('crud-imagen').value.trim();

      if (titulo && resumen) {
        const noticias = obtenerNoticias();
        noticias.push({ titulo, resumen, imagen });
        guardarNoticias(noticias);
        formCRUD.reset();
      }
    });
  }

  function eliminarNoticia(index) {
    const noticias = obtenerNoticias();
    noticias.splice(index, 1);
    guardarNoticias(noticias);
  }

  renderizarNoticias();
});