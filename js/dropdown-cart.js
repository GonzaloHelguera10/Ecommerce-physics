// Función para cargar y renderizar el carrito desde localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemCount = document.getElementById('cart-item-count');
    const cartItemsList = document.getElementById('cart-items-list');
    cartItemCount.textContent = cart.length; // Actualiza la cantidad en el ícono del carrito

    // Limpiar lista de items previos
    cartItemsList.innerHTML = '';

    // Renderizar los elementos del carrito en el menú desplegable
    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `
            <div class="cart-item-content">
                <span class="cart-item-title">${item.title}</span>
                <span class="cart-item-quantity">Cantidad: ${item.quantity}</span>
                <span class="cart-item-price">Precio: $${item.price}</span>
            </div>
            <div class="cart-item-actions">
                <button class="btn btn-sm btn-danger remove-item-btn" data-title="${item.title}">X</button>
            </div>
        `;
        cartItemsList.appendChild(li);
    });

    updateTotal();
}

// Función para manejar el click en el icono del carrito
document.getElementById('cart-icon').addEventListener('click', () => {
    const cartDropdown = document.querySelector('.cart-dropdown');
    cartDropdown.classList.toggle('show');
});

// Función para limpiar el carrito
document.getElementById('clear-cart-btn').addEventListener('click', () => {
    clearCart();
});

// Función para eliminar un item del carrito
document.getElementById('cart-items-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn')) {
        const title = e.target.dataset.title;
        removeItemByTitle(title);
    }
});

// Función para limpiar el carrito
function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}

// Función para eliminar un producto del carrito por título
function removeItemByTitle(title) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.title !== title);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCart();
}

// Cargar el carrito cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});
