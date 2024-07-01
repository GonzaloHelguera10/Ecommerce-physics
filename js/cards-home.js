function createProductCard(product) {
    // Verifica si todos los campos necesarios existen y tienen datos válidos
    if (!product.image || !product.title || !product.price) {
        console.error('Faltan datos necesarios para crear la tarjeta de producto:', product);
        return '';
    }

    return `
        <div class="product-card" data-id="${product.id}">
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
    try {
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
        });

        // Agregar eventos a los botones de "Agregar al carrito"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productId = productCard.getAttribute('data-id');
                addToCart(productId, products);
            });
        });

    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

// Función para agregar productos al carrito
function addToCart(productId, products) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);

    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Producto agregado al carrito!');
    } else {
        console.error('Producto no encontrado:', productId);
    }
}

// Llamar a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', renderProductCards);
