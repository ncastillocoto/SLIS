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