// Función para crear una tarjeta de producto minimalista
function createProductCard(product) {
    // Verifica si todos los campos necesarios existen y tienen datos válidos
    if (!product.image || !product.title || !product.price) {
        console.error('Faltan datos necesarios para crear la tarjeta de producto:', product);
        return '';
    }

    console.log('Creando tarjeta para producto:', product);

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
    try {
        console.log('Fetching products from endpoint:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const products = await response.json();
        console.log('Productos obtenidos:', products);

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
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.parentElement;
                const title = productCard.dataset.title;
                const price = productCard.dataset.price;
                const image = productCard.dataset.image;

                console.log('Producto seleccionado:', { title, price, image });

                // Obtener productos del carrito de localStorage o inicializar vacío
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                console.log('Carrito antes de agregar el producto:', cart);

                // Agregar el producto al carrito
                cart.push({ title, price: parseFloat(price), image });
                console.log('Carrito después de agregar el producto:', cart);

                // Guardar en localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
                console.log('Carrito guardado en localStorage.');

                alert('Producto agregado al carrito!');
            });
        });

    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

// Llamar a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', renderProductCards);

