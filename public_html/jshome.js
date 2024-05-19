/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

// Puedes añadir funcionalidad a los botones aquí si lo necesitas
// Redireccionar al hacer clic en los botones
// Obtener referencias a los botones y las secciones de contenido
function updatemenu() {
  if (document.getElementById('responsive-menu').checked == true) {
    document.getElementById('menu').style.borderBottomRightRadius = '0';
    document.getElementById('menu').style.borderBottomLeftRadius = '0';
  }else{
    document.getElementById('menu').style.borderRadius = '35px';
  }
}
function showForm(formId) {
            // Oculta todos los formularios
            const forms = document.querySelectorAll('.form-container');
            forms.forEach(form => {
                form.style.display = 'none';
            });

            // Muestra el formulario correspondiente al formId
            const selectedForm = document.getElementById(formId);
            if (selectedForm) {
                selectedForm.style.display = 'block';
            }
        }