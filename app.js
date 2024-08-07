
//Pagina Estatica Carrito 


// inicio del formulario de frijol

const url = 'https://667a0a1018a459f639522931.mockapi.io/contact';
const form = document.getElementById('contactForm');

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('btn');

    btn.addEventListener('click', async function (event) {
        event.preventDefault();

        // Obtengo los datos del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Creo el objeto de datos
        const contactData = {
            name: name,
            email: email,
            message: message,
        };

        try {
            // Envío los datos al endpoint usando fetch
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });
            console.log('Datos enviados con exito');

            // Proceso la respuesta del servidor
            const result = await response.json();
            console.log('Respuesta del servidor:', result);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    });
});

// fin del formulario

