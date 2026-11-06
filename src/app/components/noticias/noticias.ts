import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NoticiasService, Noticia } from '../../noticias.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './noticias.html',
  styles: []
})
export class Noticias implements OnInit {
  noticias: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.noticias = this.noticiasService.getNoticias();
  }

  guardarFavorito(id: number) {
    this.noticiasService.guardarFavorito(id);
  }
}