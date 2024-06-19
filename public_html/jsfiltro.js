/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


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
function fetchBooks() {
  fetch('http://localhost:3000/getBooks')
    .then(response => response.json())
    .then(data => {
      const librosTable = document.getElementById('librosTable').getElementsByTagName('tbody')[0];
      librosTable.innerHTML = '';
      data.forEach(book => {
        const row = librosTable.insertRow();
        row.insertCell(0).innerText = book.titulo;
        row.insertCell(1).innerText = book.genero;
        row.insertCell(2).innerText = book.autor;
        row.insertCell(3).innerText = book.editorial;
        row.insertCell(4).innerText = book.descripcion;
        row.insertCell(5).innerText = book.estado || 'Disponible';
      });
    })
    .catch(error => console.error('Error fetching books:', error));
}

function fetchCustomers() {
  fetch('http://localhost:3000/getCustomers')
    .then(response => response.json())
    .then(data => {
      const clientesTable = document.getElementById('clientesTable').getElementsByTagName('tbody')[0];
      clientesTable.innerHTML = '';
      data.forEach(customer => {
        const row = clientesTable.insertRow();
        row.insertCell(0).innerText = customer.nombre;
        row.insertCell(1).innerText = customer.apellido;
        row.insertCell(2).innerText = customer.direccion;
        row.insertCell(3).innerText = customer.celular;
        row.insertCell(4).innerText = customer.mail;
      });
    })
    .catch(error => console.error('Error fetching customers:', error));
}