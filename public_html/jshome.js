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
function fetchFun (infoData){
  fetch('http://localhost:3000/registerCustomer', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(infoData)
     })
     .then(response => response.json())
     .then(data => {
         if (data.success) {
             Swal.fire({
                 icon: 'success',
                 title: 'Registro exitoso',
                 text: 'El registro ha sido insertado exitosamente.',
             });
         } else {
             Swal.fire({
                 icon: 'error',
                 title: 'Error en el registro',
                 text: 'Error en el registro: ' + data.message,
             });
         }
     })
     .catch(error => {
         console.error('Error:', error);
         Swal.fire({
             icon: 'error',
             title: 'Error en el registro',
             text: 'Error en el registro. Por favor, intente de nuevo más tarde.',
         });
     });
}

function registrarCliente(event) { 
     var nomReg = document.getElementById('regNom').value;
     var apeReg = document.getElementById('regApe').value;
     var emailReg = document.getElementById('regMail').value;
     var dirReg = document.getElementById('regDir').value;
     var celReg = document.getElementById('regCel').value;
     var customerData = {
         name: nomReg,
         apel: apeReg,
         mail: emailReg,
         direc: dirReg,
         cel : celReg
     };
     fetchFun(customerData);
 }
 function registrarLibro(event) { 
  var titReg = document.getElementById('regTittle').value;
  var genReg = document.getElementById('regGen').value;
  var autReg = document.getElementById('regAut').value;
  var ediReg = document.getElementById('regedi').value;
  var descReg = document.getElementById('regDesc').value;
  var libroData = {
      tit: titReg,
      aut: genReg,
      gene: autReg,
      edit: ediReg,
      desc : descReg
  };
  fetchFun(libroData);
}
