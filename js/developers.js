// URL de la API
const urlDevelopers = "https://6682c8534102471fa4c83a78.mockapi.io/developers";

// Función para obtener los desarrolladores desde la API
async function fetchDevelopers() {
    try {
        const response = await fetch(urlDevelopers);
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        const developers = await response.json();
        updateDeveloperCards(developers);
    } catch (error) {
        console.error('Error al obtener los desarrolladores:', error);
    }
}

// Función para actualizar las tarjetas de desarrolladores con los datos obtenidos
function updateDeveloperCards(developers) {
    const developerCards = document.querySelectorAll('.developer-card');
    developerCards.forEach((card, index) => {
        const developer = developers[index];
        if (!developer) return; // Si no hay suficientes desarrolladores, salir de la función

        const name = developer.name;
        const surname = developer.surname;
        const github = developer.github;
        const mail = developer.mail;

        const h3 = card.querySelector('h3');
        h3.textContent = `${name} ${surname}`;

        const githubLink = card.querySelector('.contact-link:nth-of-type(1)');
        githubLink.href = github;
        githubLink.target = "_blank"; // Abrir en una nueva pestaña
        githubLink.innerHTML = `<i class='bx bxl-github icon'></i> GitHub`;

        const mailLink = card.querySelector('.contact-link:nth-of-type(2)');
        mailLink.href = "#"; // No redirigir a ninguna parte
        mailLink.innerHTML = `<i class='bx bx-mail-send icon'></i> ${mail}`; // Mostrar el correo en el texto
    });
}

// Cargar los datos de los desarrolladores al cargar la página
fetchDevelopers();