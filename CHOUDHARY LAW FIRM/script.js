// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const sliderWrapper = document.getElementById('sliderWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');
const testimonialsSlider = document.getElementById('testimonialsSlider');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
const testimonialDots = document.getElementById('testimonialDots');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = document.getElementById('navIcon');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = document.getElementById('navIcon');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Hero Slider
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const totalHeroSlides = heroSlides.length;

function updateHeroSlider() {
    heroSlides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentHeroSlide) {
            slide.classList.add('active');
        }
    });
}

function nextHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
    updateHeroSlider();
}

// Auto-play hero slider
setInterval(nextHeroSlide, 4000);

// WhatsApp Integration
function openWhatsApp(message) {
    const phoneNumber = '+918690152856'; // Replace with actual WhatsApp number
    const encodedMessage = encodeURIComponent('I have a legal issue');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .contact-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const text = counter.textContent.trim();
        const numberMatch = text.match(/\d+/); // find the first number

        if (!numberMatch) {
            // No number → leave text as is
            return;
        }

        const numberPart = parseInt(numberMatch[0], 10); // numeric value
        const suffix = text.replace(numberMatch[0], ''); // everything except number
        const target = numberPart;
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix; // final value
            }
        };

        // Animate only when element comes into view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counterObserver.observe(counter);
    });
}

// Initialize counter animation
animateCounters();

// Button click effects
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            img.style.opacity = '1';
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Contact form validation and submission (if needed in future)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Image slider keyboard navigation
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
    
    // Testimonials keyboard navigation
    if (e.key === 'ArrowUp') {
        prevTestimonial();
    } else if (e.key === 'ArrowDown') {
        nextTestimonial();
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar scroll effect with throttling
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 16)); // ~60fps

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Preload critical images
    const criticalImages = [
        'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg',
        'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});


const sliderTrack = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function getSlidesPerView() {
  return window.innerWidth <= 768 ? 1 : 3;
}

function slide() {
  const slidesPerView = getSlidesPerView();
  const totalSlides = slides.length;

  currentIndex++;
  if (currentIndex > totalSlides - slidesPerView) {
    currentIndex = 0;
  }

  const slideWidthPercent = 100 / slidesPerView;
  const translateX = -(slideWidthPercent * currentIndex);
  sliderTrack.style.transform = `translateX(${translateX}%)`;
}

let slideInterval = setInterval(slide, 2000);

window.addEventListener('resize', () => {
  sliderTrack.style.transition = 'none';
  sliderTrack.style.transform = 'translateX(0)';
  currentIndex = 0;
  setTimeout(() => {
    sliderTrack.style.transition = 'transform 0.5s ease-in-out';
  }, 50);
});