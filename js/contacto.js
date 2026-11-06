document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-contacto');
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const mensaje = document.getElementById('mensaje');
  const alertaExito = document.getElementById('alerta-exito');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let esValido = true;

      // Limpiar errores
      document.getElementById('error-nombre').textContent = '';
      document.getElementById('error-email').textContent = '';
      document.getElementById('error-mensaje').textContent = '';

      // Validar Nombre
      if (!nombre.value.trim() || nombre.value.trim().length < 3) {
        document.getElementById('error-nombre').textContent = 'El nombre es obligatorio (mínimo 3 caracteres).';
        esValido = false;
      }

      // Validar Email
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(email.value.trim())) {
        document.getElementById('error-email').textContent = 'Ingresa un correo electrónico válido.';
        esValido = false;
      }

      // Validar Mensaje
      if (!mensaje.value.trim()) {
        document.getElementById('error-mensaje').textContent = 'El mensaje no puede estar vacío.';
        esValido = false;
      }

      // Mostrar confirmación si todo es válido
      if (esValido) {
        alertaExito.style.display = 'block';
        form.reset();
        setTimeout(() => {
          alertaExito.style.display = 'none';
        }, 4000);
      }
    });
  }
});