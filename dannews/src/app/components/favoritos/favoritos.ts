import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasService, Noticia } from '../../noticias.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.html',
  styles: []
})
export class Favoritos implements OnInit {
  favoritos: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    this.favoritos = this.noticiasService.getNoticiasFavoritas();
  }

  quitarFavorito(id: number) {
    this.noticiasService.guardarFavorito(id);
    this.cargarFavoritos();
  }
}