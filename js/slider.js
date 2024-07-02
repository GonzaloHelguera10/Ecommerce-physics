// slider.js
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slides');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    const images = [
        'images/telescope1.jpg',
        'images/microscopio.jpg',
        'images/luna.jpg'
    ];

    let currentIndex = 0;

    // Inserta las imágenes en el slider
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        sliderContainer.appendChild(img);
    });

    const totalImages = images.length;

    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function showNextImage() {
        currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }

    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
        updateSlider();
    });

    nextButton.addEventListener('click', function() {
        showNextImage();
    });

    // Inicia el slider
    updateSlider();

    // Configura el intervalo para cambiar de imagen automáticamente
    setInterval(showNextImage, 3000); // Cambia la imagen cada 3 segundos
});
