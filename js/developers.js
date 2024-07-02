const urlDevelopers = "https://6682c8534102471fa4c83a78.mockapi.io/developers";

// Función para cargar los datos de los desarrolladores desde la API
async function fetchDevelopers() {
    try {
        const response = await fetch(urlDevelopers);
        if (!response.ok) {
            throw new Error('La solicitud HTTP ha fallado');
        }
        const data = await response.json();
        updateDeveloperCards(data);
    } catch (error) {
        console.error('Error al obtener datos de los desarrolladores:', error);
    }
}
// Función para actualizar las tarjetas de desarrolladores con los datos obtenidos
function updateDeveloperCards(developers) {
    const developerCards = document.querySelectorAll('.developer-card');
    developerCards.forEach((card, index) => {
        const developer = developers[index];
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
        mailLink.target = ""; // No abrir en una nueva pestaña
        mailLink.innerHTML = `<i class='bx bx-mail-send icon'></i> <span class="small-text">${mail}</span>`; // Texto de correo con clase
    });
}

// Cargar los datos de los desarrolladores al cargar la página
fetchDevelopers();
