// incio seccion formulario frijol
const url = 'https://667a0a1018a459f639522931.mockapi.io/contact';
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        
        // Obtengo los datos del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value; }
        
        // Creo el objeto de datos
        const contactData = {
            name: name,
            email: email,
            message: message
        };
        
        try {
            // Envio los datos al endpoint usando fetch
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });

            // Procesar la respuesta del servidor
            const result = await response.json();
            console.log('Respuesta del servidor:', result);

    });
});
