import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../../noticias.service';

interface NotaGestion {
  titulo: string;
  resumen: string;
  esNueva?: boolean;
}

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion.html',
  styles: []
})
export class Gestion implements OnInit {
  titulo = '';
  resumen = '';
  listaGestion: NotaGestion[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    // Carga las 5 noticias iniciales
    const iniciales = this.noticiasService.getNoticias();
    this.listaGestion = iniciales.map(n => ({ titulo: n.titulo, resumen: n.resumen }));
  }

  agregarNota() {
    if (this.titulo && this.resumen) {
      this.listaGestion.unshift({
        titulo: this.titulo,
        resumen: this.resumen,
        esNueva: true
      });
      this.titulo = '';
      this.resumen = '';
      alert('Noticia agregada a la lista de gestión.');
    }
  }

  eliminarNota(index: number) {
    this.listaGestion.splice(index, 1);
  }
}