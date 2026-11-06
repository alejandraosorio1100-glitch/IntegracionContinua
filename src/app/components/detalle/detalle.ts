import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NoticiasService, Noticia } from '../../noticias.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.html',
  styles: []
})
export class Detalle implements OnInit {
  noticia: Noticia | undefined;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = parseInt(params['id']);
      if (id) {
        this.noticia = this.noticiasService.getNoticiaPorId(id);
      }
    });
  }
}