function createProductCard(product) {
    // Verifica si todos los campos necesarios existen y tienen datos válidos
    if (!product.image || !product.title || !product.price) {
        return '';
    }

    return `
        <div class="product-card" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">
            <img src="${product.image}" alt="${product.title}" />
            <h2>${product.title}</h2>
            <p>Precio: $${product.price}</p>
            <button class="add-to-cart">Agregar al carrito</button>
        </div>
    `;
}

const endpoint = "https://668177d804acc3545a06c523.mockapi.io/api/products";

// Función para obtener los productos y renderizar las tarjetas
async function renderProductCards() {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const products = await response.json();

    const productContainer = document.getElementById('product-container');
    if (!productContainer) {
        console.error('No se encontró el contenedor con id "product-container".');
        return;
    }
    productContainer.innerHTML = ''; // Limpiar contenido previo

    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.innerHTML += productCard;

        // Agregar eventos a los botones de "Agregar al carrito"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const card = this.parentElement;
                const title = card.getAttribute('data-title');
                const price = card.getAttribute('data-price');
                const image = card.getAttribute('data-image'); // Obtener la URL de la imagen

                // Obtener productos del carrito de localStorage o inicializar vacío
                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                // Agregar el producto al carrito
                cart.push({ title, price, image });

                // Guardar en localStorage
                localStorage.setItem('cart', JSON.stringify(cart));

                alert('Producto agregado al carrito!');
            });

        });
    });
}

// Llamar a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', renderProductCards);