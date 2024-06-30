//Seccion navbar facundo
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navbg = document.querySelector('.nav-bg');


menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    navbg.classList.toggle('active');
});

//Pagina Estatica Carrito (Imagenes y links de Ejemplo)

const products = [
    {
        id: 1,
        name: 'Procesador Amd Ryzen 7 8700F 5.0 Ghz - AM5 Sin Video',
        price: 399769,
        quantity: 1,
        image: 'https://mexx-img-2019.s3.amazonaws.com/Procesador-Amd-Ryzen-7-8700F-5-Ghz-AM5-Sin-Video_47373_1.jpeg'
    },
    {
        id: 2,
        name: 'Motherboard AM5 - Gigabyte GA-B650 GAMING X',
        price: 286899,
        quantity: 1,
        image: 'https://mexx-img-2019.s3.amazonaws.com/Motherboard-AM5-Gigabyte-GA-B650-Gaming-X_47075_1.jpeg'
    },
    {
        id: 3,
        name: 'Memoria Ram DDR5 - 8Gb 4800 Mhz Kingston Fury Beast Rgb',
        price: 53999,
        quantity: 2,
        image: 'https://mexx-img-2019.s3.amazonaws.com/Memoria-Ram-DDR5-8Gb-4800Mhz-Kingston-Fury-Beast-Rgb_44121_1.jpeg'
    },
    {
        id: 4,
        name: 'Disco Solido Ssd M2 Pci-E Nvme 2Tb Kingston Nv2',
        price: 169999,
        quantity: 1,
        image: 'https://mexx-img-2019.s3.amazonaws.com/Disco-Solido-Ssd-M2-Pci-E-Nvme-2Tb-Kingston-Nv2_44401_1.jpeg'
    },
    {
        id: 5,
        name: 'Fuente Cooler Master V2 750W 80 Plus Bronze',
        price: 119999,
        quantity: 1,
        image: 'https://mexx-img-2019.s3.amazonaws.com/fuente-coolermaster-750w-80plus_42196_1.jpeg'
    },
    {
        id: 6,
        name: 'Gabinete Mid Tower Msi Forge M100A Rgb',
        price: 65999,
        quantity: 1,
        image: 'https://mexx-img-2019.s3.amazonaws.com/Gabinete-Mid-Tower-Msi-Forge-M100A-Rgb_47199_1.jpeg'
    },
    {
        id: 7,
        name: 'Cooler Cpu Watercooler Msi Mag Coreliquid E240 Rgb 200W',
        price: 153539,
        quantity: 1,
        image: 'https://mexx-img-2019.s3.amazonaws.com/Cooler-Cpu-Watercooler-Msi-Mag-Coreliquid-E240-Rgb-200W_47165_1.jpeg'
    },
];

function renderCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        productElement.appendChild(img);

        const details = document.createElement('div');
        details.className = 'details';

        const name = document.createElement('h3');
        name.textContent = product.name;
        details.appendChild(name);

        const price = document.createElement('p');
        price.textContent = `Precio: $${product.price}`;
        details.appendChild(price);

        const quantity = document.createElement('p');
        quantity.textContent = `Cantidad: ${product.quantity}`;
        details.appendChild(quantity);

        productElement.appendChild(details);

        const actions = document.createElement('div');
        actions.className = 'actions';

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.onclick = () => updateQuantity(product.id, -1);
        actions.appendChild(minusButton);

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.onclick = () => updateQuantity(product.id, 1);
        actions.appendChild(plusButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => removeProduct(product.id);
        actions.appendChild(removeButton);

        productElement.appendChild(actions);

        cartContainer.appendChild(productElement);
    });

    updateTotal();
}

function updateQuantity(productId, change) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity < 1) {
            product.quantity = 1;
        }
    }
    renderCart();
}

function removeProduct(productId) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
    }
    renderCart();
}

function updateTotal() {
    const totalPrice = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    document.getElementById('totalPrice').innerText = totalPrice.toLocaleString('es-AR');
}

function realizarCompra() {
    alert('Compra realizada con éxito!');
}

document.addEventListener('DOMContentLoaded', renderCart());


// inicio del formulario de frijol

const url = 'https://667a0a1018a459f639522931.mockapi.io/contact';
const form = document.getElementById('contactForm');

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('btn');

    btn.addEventListener('click', async function (event) {
        event.preventDefault();

        // Obtengo los datos del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Creo el objeto de datos
        const contactData = {
            name: name,
            email: email,
            message: message,
        };

        try {
            // Envío los datos al endpoint usando fetch
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });
            console.log('Datos enviados con exito');

            // Proceso la respuesta del servidor
            const result = await response.json();
            console.log('Respuesta del servidor:', result);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    });
});

// fin del formulario

