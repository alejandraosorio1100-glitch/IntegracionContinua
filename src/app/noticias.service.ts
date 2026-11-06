import { Injectable } from '@angular/core';

export interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  contenido?: string;
  imagen: string;
  destacado?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private noticiasIniciales: Noticia[] = [
    {
      id: 1,
      titulo: "Novedades en Desarrollo Front-End",
      resumen: "Nuevas herramientas y formas de maquetar páginas web este semestre.",
      contenido: "El desarrollo web sigue cambiando. Ahora con HTML5 y JavaScript básico podemos hacer cosas súper dinámicas sin complicarnos tanto.",
      imagen: "noticia1.jpg",
      destacado: true
    },
    {
      id: 2,
      titulo: "Uso de Inteligencia Artificial en la Web",
      resumen: "Cómo usar IA directo desde el navegador sin tanta enredadera.",
      contenido: "Las nuevas herramientas permiten procesar datos rápido y directo en el navegador del usuario sin saturar ningún servidor.",
      imagen: "noticia2.jpg",
      destacado: true
    },
    {
      id: 3,
      titulo: "Tips para maquetar mejor en CSS",
      resumen: "Consejos sencillos para que la página no se desbarate en el celular.",
      contenido: "Usar etiquetas semánticas e investigar sobre Flexbox te ahorra un buen de dolores de cabeza al acomodar las tarjetas.",
      imagen: "noticia3.jpg",
      destacado: true
    },
    {
      id: 4,
      titulo: "Buenas prácticas con LocalStorage y JavaScript",
      resumen: "Aprende a guardar la información del usuario directamente en el navegador.",
      contenido: "El uso de LocalStorage nos permite persistir datos como listas de favoritos sin necesidad de conectar bases de datos complejas.",
      imagen: "noticia4.jpg",
      destacado: false
    },
    {
      id: 5,
      titulo: "Organización de proyectos Front-End en GitHub",
      resumen: "Estructura limpia de carpetas para mantener tu código ordenado y legible.",
      contenido: "Mantener carpetas separadas para CSS, JS e imágenes facilita el trabajo en equipo y la publicación en servidores remotos.",
      imagen: "noticia5.jpg",
      destacado: false
    }
  ];

  getNoticias(): Noticia[] {
    return this.noticiasIniciales;
  }

  getNoticiaPorId(id: number): Noticia | undefined {
    return this.noticiasIniciales.find(n => n.id === id);
  }

  getFavoritosIds(): number[] {
    const favs = localStorage.getItem('misFavoritos');
    return favs ? JSON.parse(favs) : [];
  }

  getNoticiasFavoritas(): Noticia[] {
    const ids = this.getFavoritosIds();
    return this.noticiasIniciales.filter(n => ids.includes(n.id));
  }

  guardarFavorito(idNoticia: number) {
    let favoritos = this.getFavoritosIds();
    if (favoritos.includes(idNoticia)) {
      favoritos = favoritos.filter(id => id !== idNoticia);
      alert('Noticia quitada de favoritos');
    } else {
      favoritos.push(idNoticia);
      alert('¡Noticia guardada en favoritos!');
    }
    localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
  }
}