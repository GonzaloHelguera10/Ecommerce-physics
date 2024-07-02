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
                <img src="${item.image}" alt="${item.title}" />
                <div>
                    <h2>${item.title}</h2>
                    <p>Precio: $${item.price}</p>
                    <p>Cantidad: <span class="item-quantity">${item.quantity}</span></p>
                </div>
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
    const consolidatedCart = consolidateCart(cart);
    const total = consolidatedCart.reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Función para aumentar la cantidad de un producto
function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const consolidatedCart = consolidateCart(cart);

    // Aumentar la cantidad en el carrito consolidado
    consolidatedCart[index].quantity++;

    // Actualizar el carrito original
    cart = expandCart(consolidatedCart);

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Función para disminuir la cantidad de un producto
function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const consolidatedCart = consolidateCart(cart);

    // Disminuir la cantidad en el carrito consolidado
    if (consolidatedCart[index].quantity > 1) {
        consolidatedCart[index].quantity--;
    } else {
        consolidatedCart.splice(index, 1); // Eliminar si la cantidad es 0
    }

    // Actualizar el carrito original
    cart = expandCart(consolidatedCart);

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Función para eliminar un producto del carrito
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const consolidatedCart = consolidateCart(cart);

    consolidatedCart.splice(index, 1);

    // Actualizar el carrito original
    cart = expandCart(consolidatedCart);

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Función para expandir el carrito consolidado a su forma original
function expandCart(consolidatedCart) {
    return consolidatedCart.flatMap(item => 
        Array(item.quantity).fill({ title: item.title, price: item.price, image: item.image })
    );
}

// Función para limpiar el carrito
function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}

// Manejo de eventos
document.getElementById('cart-items').addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('increase')) {
        increaseQuantity(index);
    } else if (e.target.classList.contains('decrease')) {
        decreaseQuantity(index);
    } else if (e.target.classList.contains('remove')) {
        removeItem(index);
    }
});

document.getElementById('clear-cart').addEventListener('click', clearCart);

// Cargar el carrito cuando se cargue la página
document.addEventListener('DOMContentLoaded', loadCart);
