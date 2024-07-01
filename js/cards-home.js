// Cards home

document.addEventListener('DOMContentLoaded', function() {
    const products = [
        {
            title: 'Producto 1',
            image: './images/microscopio.jpg',
            price: 99.99,
        },
        {
            title: 'Producto 2',
            image: './images/telescope1.jpg',
            price: 149.99,
        },
        {
            title: 'Producto 3',
            image: './images/luna.jpg',
            price: 199.99,
        },
        {
            title: 'Producto 1',
            image: './images/microscopio.jpg',
            price: 99.99,
        },
        {
            title: 'Producto 2',
            image: './images/telescope1.jpg',
            price: 149.99,
        },
        {
            title: 'Producto 3',
            image: './images/luna.jpg',
            price: 199.99,
        },
        {
            title: 'Producto 1',
            image: './images/microscopio.jpg',
            price: 99.99,
        },
        {
            title: 'Producto 2',
            image: './images/telescope1.jpg',
            price: 149.99,
        },
        {
            title: 'Producto 3',
            image: './images/luna.jpg',
            price: 199.99,
        },
        // Agrega más productos según sea necesario
    ];

    const productsContainer = document.getElementById('products-container');

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">Precio: $${product.price}</p>
                <a href="#" class="btn btn-primary">Ingresar al producto</a>
            </div>
        `;
        productsContainer.appendChild(card);
    });
});
