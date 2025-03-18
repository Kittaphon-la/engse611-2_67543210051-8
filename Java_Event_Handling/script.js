let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const thumbs = document.querySelectorAll('.thumb');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let slideInterval;

function showSlide(index) {
    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    thumbs[currentSlide].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    resetTimer();
});

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    resetTimer();
});

thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-index'));
        showSlide(slideIndex);
        resetTimer();
    });
});

function startSlideTimer() {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 3000);
}

function resetTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
}

startSlideTimer();
