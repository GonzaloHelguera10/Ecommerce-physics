//  Crracion de usuario y admin frijol
const flag = false;
let urlUsers = 'https://667a0a1018a459f639522931.mockapi.io/users';

const users = [
    {
        name: "Juan",
        lastname: "Perez",
        email: "juan.doe@example.com",
        password: "contra234",
        role: "User"
    },
    {
        name: "Pedro",
        lastname: "Perez",
        email: "pedro@example.com",
        password: "contra123",
        role: "Admin"
    }
];

users.forEach(async (user) => {
    try {
        const response = await fetch(urlUsers, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const result = await response.json();
        console.log('Usuario creado:', result);
    } catch (error) {
        console.error('Error al crear usuario:', error);
    }
});

// Vincular login con mockapi para validar

// Función para mostrar el botón de crear producto si es admin
function mostrarCrearProductoSiAdmin() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const createProductBtn = document.getElementById('create_product');

    if (loggedInUser && loggedInUser.role === 'Admin') {
        createProductBtn.style.display = 'block';
    } else {
        createProductBtn.style.display = 'none';
    }
}

const loginForm = document.getElementById('formLogin');
const loginUrl = 'https://667a0a1018a459f639522931.mockapi.io/users';
const registerLink = document.getElementById('registerLink');

async function loginUser(event) {
    event.preventDefault();

    const nombre = document.getElementById('loginNombre').value;
    const apellido = document.getElementById('loginApellido').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(loginUrl);
        if (!response.ok) {
            throw new Error('Error al obtener la lista de usuarios');
        }
        const users = await response.json();

        const user = users.find(u => u.name === nombre && u.lastname === apellido && u.password === password);
        
        if (user) {
            alert('¡Inicio de sesión exitoso!');
            // Guardo los datos del usuario en localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            // Redirecciono a la página de inicio
            window.location.href = "../index.html";
        } else {
            console.error('Inicio de sesión fallido: Nombre, Apellido o Contraseña incorrectos.');
            alert('Nombre, Apellido o Contraseña incorrectos.');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Ocurrió un error al intentar iniciar sesión.');
    }
}


// Verifico si hay un usuario logueado al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const registerLink = document.getElementById('registerLink');
    const logoutBtn = document.getElementById('logout-btn');
    const createProductBtn = document.getElementById('create_product');

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log(loggedInUser);

    if (loggedInUser) {
        // Actualizo el enlace de "Registrarse" con el nombre del usuario
        registerLink.textContent = `${loggedInUser.name} ${loggedInUser.lastname}`;
        registerLink.href = "#"; // Desactivo el enlace
        logoutBtn.style.display = 'block'; // Muestro el botón de cerrar sesión
        mostrarCrearProductoSiAdmin();

        // Muestro el botón de crear producto si el rol es Admin
        if (loggedInUser && loggedInUser.role === 'Admin') {
             flag = true; // Asegúrate de que la variable flag esté declarada
            console.log('Flag es verdadero:', flag);
        } else {
            // Puedes manejar otros roles o casos en este bloque else si es necesario
            console.log('Usuario no es Admin o loggedInUser no está definido');
        }
    } else {
        // Aseguro que el botón de crear producto esté oculto si no hay usuario logueado
        createProductBtn.style.display = 'none';
    }
});


// Asigno la función de login al formulario

// logout frijol

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.classList.add('btn', 'btn-danger');
    logoutBtn.style.marginLeft = '10px';
    const registerLink = document.getElementById('registerLink');

    


    // Función para cerrar la sesión
    function cerrarSesion() {
        // Borrar todos los datos del localStorage
        localStorage.clear('loggedInUser');

        // Cambiar el texto del elemento <a> a "Registrarse"
        registerLink.textContent = "Registrarse";
        registerLink.href="../pages/login.html"
        logoutBtn.style.display = 'none';
        window.location.href = "../index.html";
    }

    // Asignar la función cerrarSesion al evento click del botón
    logoutBtn.addEventListener('click', cerrarSesion);
});

loginForm.addEventListener('submit', loginUser);

