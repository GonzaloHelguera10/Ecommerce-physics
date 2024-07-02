// Función para cargar y renderizar el carrito desde localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Limpiar contenido previo

    // Consolidar productos duplicados en el carrito
    const consolidatedCart = consolidateCart(cart);

    consolidatedCart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div>
                <h2>${item.title}</h2>
                <p>Precio: $${item.price}</p>
                <p>Cantidad: <span class="item-quantity">${item.quantity}</span></p>
            </div>
            <div>
                <button class="increase" data-index="${index}">+</button>
                <button class="decrease" data-index="${index}">-</button>
                <button class="remove" data-index="${index}">Eliminar</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    updateTotal();
}

// Función para consolidar el carrito
function consolidateCart(cart) {
    const consolidated = {};
    cart.forEach(item => {
        const key = item.title;
        if (consolidated[key]) {
            consolidated[key].quantity++;
        } else {
            consolidated[key] = { ...item, quantity: 1 };
        }
    });
    return Object.values(consolidated);
}

// Función para actualizar el total
function updateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Función para aumentar la cantidad de un producto
function increaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Función para disminuir la cantidad de un producto
function decreaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1); // Eliminar si la cantidad es 0
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Función para eliminar un producto del carrito
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Función para limpiar el carrito
function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}

// Manejo de eventos
document.getElementById('cart-items').addEventListener('click', (e) => {
    if (e.target.classList.contains('increase')) {
        increaseQuantity(e.target.dataset.index);
    } else if (e.target.classList.contains('decrease')) {
        decreaseQuantity(e.target.dataset.index);
    } else if (e.target.classList.contains('remove')) {
        removeItem(e.target.dataset.index);
    }
});

document.getElementById('clear-cart').addEventListener('click', clearCart);

// Cargar el carrito cuando se cargue la página
document.addEventListener('DOMContentLoaded', loadCart);