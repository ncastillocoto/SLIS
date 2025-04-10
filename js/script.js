// Script principal para el sitio web de Saint Lawrence School

document.addEventListener('DOMContentLoaded', function() {
    // Inicialización del menú móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });
    }
    
    // Marcar el enlace activo en el menú de navegación
    markActiveLink();
    
    // Inicializar slider si existe en la página
    initSlider();
    
    // Inicializar contador de estadísticas si existe en la página
    initCounters();
    
    // Inicializar lightbox para galería si existe en la página
    initLightbox();
    
    // Manejar formularios de contacto si existen
    initContactForm();
});

// Función para marcar el enlace activo en la navegación
function markActiveLink() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Si la ruta actual coincide con el href del enlace
        if (currentLocation === linkPath || 
            (linkPath !== 'index.html' && currentLocation.includes(linkPath))) {
            link.classList.add('active');
        }
    });
}

// Función para inicializar slider si existe
function initSlider() {
    const slider = document.querySelector('.slider-container');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    const interval = 5000; // Cambio de slide cada 5 segundos
    
    // Mostrar primer slide
    slides[0].classList.add('active');
    
    // Función para cambiar al siguiente slide
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    }
    
    // Iniciar slider automático
    let slideInterval = setInterval(nextSlide, interval);
    
    // Añadir controles de navegación si existen
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function() {
            clearInterval(slideInterval);
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
            slideInterval = setInterval(nextSlide, interval);
        });
        
        nextButton.addEventListener('click', function() {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, interval);
        });
    }
}

// Función para inicializar contadores animados
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // Duración de la animación en ms
                let start = 0;
                const startTime = Date.now();
                
                function updateCounter() {
                    const currentTime = Date.now();
                    const elapsedTime = currentTime - startTime;
                    
                    if (elapsedTime < duration) {
                        const progress = elapsedTime / duration;
                        const current = Math.floor(progress * target);
                        counter.textContent = current;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Función para inicializar lightbox para galería
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!galleryItems.length) return;
    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    lightbox.appendChild(lightboxContent);
    
    const lightboxClose = document.createElement('span');
    lightboxClose.className = 'lightbox-close';
    lightboxClose.innerHTML = '&times;';
    lightbox.appendChild(lightboxClose);
    
    const lightboxImage = document.createElement('img');
    lightboxContent.appendChild(lightboxImage);
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const image = this.querySelector('img');
            const imageSrc = image.getAttribute('src');
            const imageAlt = image.getAttribute('alt');
            
            lightboxImage.setAttribute('src', imageSrc);
            lightboxImage.setAttribute('alt', imageAlt);
            
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    lightboxClose.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Función para manejar el formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validación básica
        if (!name || !email || !message) {
            alert('Por favor complete todos los campos requeridos.');
            return;
        }
        
        // Aquí normalmente enviarías los datos al servidor
        // Para este ejemplo, mostraremos un mensaje de éxito
        
        // Crear mensaje de éxito
        const successMessage = document.createElement('div');
        successMessage.className = 'alert-success';
        successMessage.textContent = '¡Gracias por tu mensaje! Te contactaremos pronto.';
        
        // Mostrar mensaje y resetear formulario
        contactForm.reset();
        contactForm.insertAdjacentElement('beforebegin', successMessage);
        
        // Eliminar mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}