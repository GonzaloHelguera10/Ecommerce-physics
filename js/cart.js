document.addEventListener("DOMContentLoaded", function() {
    const registerLink = document.getElementById("register-link");
    const logoutBtn = document.getElementById("logout-btn");

    // Obtener el usuario logueado desde localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser && loggedInUser.name && loggedInUser.lastname) {
        // Si el usuario está logueado y tiene nombre y apellido, muestra su nombre completo
        registerLink.textContent = `${loggedInUser.name} ${loggedInUser.lastname}`;
        // Mostrar el botón de cerrar sesión
        logoutBtn.style.display = "block";
    } else {
        // Si no está logueado, muestra "Registrarse"
        registerLink.textContent = "Registrarse";
        registerLink.url="../login.html"
    }

    // Evento de clic en el botón de cerrar sesión
    logoutBtn.addEventListener("click", function() {
        // Eliminar el usuario logueado de localStorage
        localStorage.removeItem("loggedInUser");
        // Recargar la página para reflejar los cambios
        location.reload();
    });
});