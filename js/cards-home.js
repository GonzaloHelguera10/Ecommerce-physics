function createProductCard(product) {
    // Verifica si todos los campos necesarios existen y tienen datos válidos
    if (!product.image || !product.title || !product.price) {
        return '';
    }

    return `
        <div class="product-card">
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
        const addToCartButton = productContainer.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', function() {
            // Aquí podrías agregar la lógica para manejar la acción de agregar al carrito
            // Por ejemplo, guardar el producto en el localStorage
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            alert('Producto agregado al carrito!');
        });
    });
}

// Llamar a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', renderProductCards);