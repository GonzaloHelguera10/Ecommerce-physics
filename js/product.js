document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("submitForm");
    const productContainer = document.getElementById("productContainer");
    const endpoint = "https://668177d804acc3545a06c523.mockapi.io/api/products";

    // Manejar el envío del formulario
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío estándar del formulario

        const productData = {
            title: document.getElementById("productTitle").value,
            description: document.getElementById("productDescription").value,
            stock: parseInt(document.getElementById("productStock").value, 10),
            category: document.getElementById("productCategory").value,
            image: document.getElementById("productImage").value,
            idProduct: Date.now(), // Generar un ID único (o puede ser manejado por el backend)
            price: parseFloat(document.getElementById("productPrice").value)
        };

        // Enviar los datos al servidor
        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Producto añadido:", data);
            alert('¡Se creo un nuevo prodcuto con éxito!');
            form.reset(); // Reiniciar el formulario
            fetchProducts(); // Actualizar la lista de productos
        })
        .catch(error => console.error("Error al añadir el producto:", error));
    });

    
});

