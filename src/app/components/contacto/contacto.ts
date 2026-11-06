import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styles: []
})
export class Contacto {
  nombre = '';
  email = '';
  telefono = '';
  mensaje = '';

  enviar() {
    alert('¡Gracias por contactarnos! Hemos recibido tu mensaje correctamente.');
    this.nombre = '';
    this.email = '';
    this.telefono = '';
    this.mensaje = '';
  }
}