// Fade in scroll
const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
faders.forEach(el => appearOnScroll.observe(el));

// Música
function toggleAudio() {
  const audio = document.getElementById('space-audio');
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

// Carrusel de galaxias
let currentSlide = 0;
const container = document.querySelector('.galaxy-container');
const slides = document.querySelectorAll('.galaxy-slide');

function moveCarousel(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  updateCarousel();
}

function updateCarousel() {
  const slideWidth = slides[0].offsetWidth;
  const offset = -currentSlide * slideWidth;
  
  // Aplicar la transición
  container.style.transition = 'transform 0.5s ease-in-out';
  container.style.transform = `translateX(${offset}px)`;
}

// Clonar slides para el efecto infinito
function setupInfiniteCarousel() {
  const firstSlide = slides[0].cloneNode(true);
  const lastSlide = slides[slides.length - 1].cloneNode(true);
  
  container.appendChild(firstSlide);
  container.insertBefore(lastSlide, slides[0]);
  
  // Ajustar la posición inicial
  currentSlide = 1;
  updateCarousel();
}

// Manejar la transición cuando llega al final o inicio
container.addEventListener('transitionend', () => {
  if (currentSlide === 0) {
    container.style.transition = 'none';
    currentSlide = slides.length;
    updateCarousel();
  } else if (currentSlide === slides.length + 1) {
    container.style.transition = 'none';
    currentSlide = 1;
    updateCarousel();
  }
});

// Inicializar el carrusel
window.addEventListener('load', () => {
  setupInfiniteCarousel();
});

// Animaciones al hacer scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.constellation-card, .phenomenon-card, .timeline-item').forEach(element => {
    observer.observe(element);
});

// Efecto parallax para las constelaciones
document.querySelectorAll('.constellation-animation').forEach(constellation => {
    constellation.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = constellation.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const stars = constellation.querySelector('.stars-container');
        const lines = constellation.querySelector('.constellation-lines');
        
        stars.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        lines.style.transform = `rotate(${x * 10}deg)`;
    });
});

// Control de música espacial
const musicButton = document.querySelector('.music-button');
const spaceMusic = document.querySelector('#space-music');
let isPlaying = false;

// Función para manejar el estado de la música
function toggleMusic() {
    try {
        if (isPlaying) {
            spaceMusic.pause();
            musicButton.classList.remove('playing');
            musicButton.querySelector('.music-text').textContent = 'Activar música espacial';
        } else {
            // Intentar reproducir la música
            const playPromise = spaceMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicButton.classList.add('playing');
                    musicButton.querySelector('.music-text').textContent = 'Pausar música';
                }).catch(error => {
                    console.error('Error al reproducir la música:', error);
                    alert('No se pudo reproducir la música. Por favor, intenta de nuevo.');
                });
            }
        }
        isPlaying = !isPlaying;
    } catch (error) {
        console.error('Error al controlar la música:', error);
    }
}

// Agregar evento de clic al botón
musicButton.addEventListener('click', toggleMusic);

// Manejar la visibilidad del botón cuando la música termina
spaceMusic.addEventListener('ended', () => {
    isPlaying = false;
    musicButton.classList.remove('playing');
    musicButton.querySelector('.music-text').textContent = 'Activar música espacial';
});

// Efecto de hover para los fenómenos espaciales
document.querySelectorAll('.phenomenon-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const animation = card.querySelector('.phenomenon-animation');
        animation.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        const animation = card.querySelector('.phenomenon-animation');
        animation.style.transform = 'scale(1)';
    });
}); 