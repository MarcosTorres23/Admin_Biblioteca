//Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

//Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

//FUNCIONES
async function login() {
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
    //validaciones de carga de datos
    if (user === '' && pass === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'Por favor, ingrese los valores.',
            confirmButtonText: 'Ok'
        });
    } else if (user === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'Por favor, ingrese el usuario.',
            confirmButtonText: 'Ok'
        });
    } else if (pass === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'Por favor, ingrese la contraseña.',
            confirmButtonText: 'Ok'
        });
    } else {
        try {
            //llama al servidor para consultar a la base de datos
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, pass }),
            });
            
            const result = await response.json();
            
            if (response.ok) {
               window.location.href = "home.html";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message,
                    confirmButtonText: 'Ok'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error en la conexión con el servidor.',
                confirmButtonText: 'Ok'
            });
        }
    }
}

function userRegister(event) {
   // event.preventDefault(); // Prevenir el envío del formulario por defecto

    var userReg = document.getElementById('regUser').value;
    var nameReg = document.getElementById('regName').value;
    var emailReg = document.getElementById('regEmail').value;
    var passReg = document.getElementById('regPass').value;

     // Validación de la contraseña (al menos una letra mayúscula, un número y 8 caracteres)
     var passPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
     if (!passReg.match(passPattern)) {
         Swal.fire({
             icon: 'error',
             title: 'Contraseña inválida',
             text: 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número.',
         });
         return;
     }

    var userData = {
        user: userReg,
        nombre: nameReg,
        correo: emailReg,
        pass: passReg
    };
    //llama al servidor para insertar en base de datos
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Tu cuenta ha sido creada exitosamente.',
            });
            limpiarCamposRegistro();
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

function anchoPage() {
    if (window.innerWidth > 850) {
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";   
    }
}

anchoPage();

function iniciarSesion() {
    if (window.innerWidth > 850) {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "10px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}

function register() {
    if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}

function limpiarCamposRegistro() {
    document.getElementById('regName').value = ''; 
    document.getElementById('regEmail').value = ''; 
    document.getElementById('regUser').value = ''; 
    document.getElementById('regPass').value = ''; 
}
