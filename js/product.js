document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    
    // Función para obtener los productos desde la API
    async function fetchProducts() {
        try {
            const response = await fetch('https://668177d804acc3545a06c523.mockapi.io/api/products'); // Reemplaza con tu URL de MockAPI
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Función para mostrar los productos en la página
    function displayProducts(products) {
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Stock: ${product.stock}</p>
                <p>Category: ${product.category}</p>
                <p>Price: $${product.price}</p>
            `;
            productList.appendChild(productItem);
        });
    }

    // Llamar a la función para obtener y mostrar los productos
    fetchProducts();
});
