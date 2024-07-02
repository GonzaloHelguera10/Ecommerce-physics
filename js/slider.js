// slider
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

    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
        updateSlider();
    });

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Inicia el slider
    updateSlider();
});
