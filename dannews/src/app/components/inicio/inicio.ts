import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NoticiasService, Noticia } from '../../noticias.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styles: []
})
export class Inicio implements OnInit {
  noticias: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    // Muestra solo las noticias destacadas igual que en main.js
    this.noticias = this.noticiasService.getNoticias().filter(n => n.destacado === true);
  }

  guardarFavorito(id: number) {
    this.noticiasService.guardarFavorito(id);
  }
}