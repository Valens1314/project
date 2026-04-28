// ===================================
// CAROUSEL / GALÉRIA
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    
    if (carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.carousel-next');
        const prevButton = carousel.querySelector('.carousel-prev');
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');
        
        let currentIndex = 0;
        
        // Vytvorenie indikátorov
        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('aria-label', `Prejsť na obrázok ${index + 1}`);
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = Array.from(indicatorsContainer.children);
        
        function updateSlide(index) {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${slideWidth * index}px)`;
            
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        }
        
        function goToSlide(index) {
            updateSlide(index);
        }
        
        function nextSlide() {
            const newIndex = (currentIndex + 1) % slides.length;
            updateSlide(newIndex);
        }
        
        function prevSlide() {
            const newIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlide(newIndex);
        }
        
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
        
        // Auto-play
        let autoplayInterval = setInterval(nextSlide, 5000);
        
        // Zastavenie autoplay pri hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    }
});

// ===================================
// ACCORDION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Zavrieť všetky ostatné položky
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Prepnúť aktuálnu položku
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
});

// ===================================
// KONTAKTNÝ FORMULÁR
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Live validácia počas písania
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('was-validated')) {
                    validateField(this);
                }
            });
        });
        
        function validateField(field) {
            field.classList.add('was-validated');
            
            const formGroup = field.closest('.form-group');
            if (!formGroup) return;
            
            if (field.validity.valid) {
                formGroup.classList.remove('invalid');
                formGroup.classList.add('valid');
            } else {
                formGroup.classList.remove('valid');
                formGroup.classList.add('invalid');
            }
        }
        
        // Odoslanie formulára
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validácia všetkých polí
            let isValid = true;
            inputs.forEach(input => {
                validateField(input);
                if (!input.validity.valid) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Simulácia odoslania formulára
                showToast();
                
                // Reset formulára po 2 sekundách
                setTimeout(() => {
                    contactForm.reset();
                    inputs.forEach(input => {
                        input.classList.remove('was-validated');
                        const formGroup = input.closest('.form-group');
                        if (formGroup) {
                            formGroup.classList.remove('valid', 'invalid');
                        }
                    });
                }, 2000);
            } else {
                // Scroll k prvému chybnému poľu
                const firstInvalid = contactForm.querySelector(':invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalid.focus();
                }
            }
        });
    }
});

// ===================================
// TOAST NOTIFIKÁCIA
// ===================================

function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    // Zobraziť toast
    toast.classList.add('show');
    
    // Automaticky skryť po 5 sekundách
    const hideTimeout = setTimeout(() => {
        hideToast();
    }, 5000);
    
    // Tlačidlo na zavrenie
    const closeButton = toast.querySelector('.toast-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            hideToast();
        });
    }
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('show');
    }
}

// ===================================
// SMOOTH SCROLL PRE NAVIGÁCIU
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===================================
// NAVBAR SCROLL EFEKT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
});

// ===================================
// ANIMÁCIE PRI SCROLLOVANÍ
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elementy na animáciu
    const animatedElements = document.querySelectorAll('.card, .about-content, .accordion-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// LAZY LOADING PRE OBRÁZKY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ===================================
// RESPONSÍVNE MENU (pre mobilné zariadenia)
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Táto časť sa dá rozšíriť pre hamburger menu na mobiloch
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Označenie aktívnej stránky
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});