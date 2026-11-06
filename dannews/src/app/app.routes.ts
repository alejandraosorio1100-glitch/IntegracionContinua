import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Noticias } from './components/noticias/noticias';
import { Favoritos } from './components/favoritos/favoritos';
import { Contacto } from './components/contacto/contacto';
import { Gestion } from './components/gestion/gestion';
import { Detalle } from './components/detalle/detalle';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'noticias', component: Noticias },
  { path: 'favoritos', component: Favoritos },
  { path: 'contacto', component: Contacto },
  { path: 'gestion', component: Gestion },
  { path: 'detalle', component: Detalle },
  { path: '**', redirectTo: '' }
];