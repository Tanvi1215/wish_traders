// ========================================
// Wish Traders - Modern Interactive JavaScript
// ========================================

// === MOBILE MENU TOGGLE ===
const mobileToggle = document.getElementById('mobile-toggle');
const navigation = document.getElementById('nav');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navigation.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navigation.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
}

// === SMOOTH SCROLLING FOR NAVIGATION ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#' || targetId === '') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 90;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navigation && navigation.classList.contains('active')) {
                navigation.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        }
    });
});

// === HEADER SCROLL EFFECT ===
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// === ACTIVE NAVIGATION LINK ON SCROLL ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                link.style.background = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--primary-color)';
                    link.style.background = 'var(--bg-light)';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// === SCROLL TO TOP BUTTON ===
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in classes
document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(element => {
    observer.observe(element);
});

// === EMAILJS INITIALIZATION ===
// Replace these with your EmailJS credentials from https://www.emailjs.com/
const EMAILJS_PUBLIC_KEY = 'Qn9PMELOAdhjR84W3';
const EMAILJS_SERVICE_ID = 'service_6a9fn56';
const EMAILJS_TEMPLATE_ID = 'template_zl8bt4n';

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// === CONTACT FORM HANDLING ===
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('Thank you! Your inquiry has been sent successfully. We will get back to you within 24 hours.', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('FAILED...', error);
                showNotification('Sorry, something went wrong. Please try again or contact us directly at info@wishtraders.com', 'error');
            })
            .finally(() => {
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// === PRODUCT INQUIRY BUTTONS ===
const inquiryButtons = document.querySelectorAll('.btn-add-cart');

inquiryButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        
        // Show notification
        showNotification(`Inquiry added for ${productTitle}. Please contact us for pricing details.`, 'info');
        
        // Update cart count
        updateCartCount();
    });
});

// === CART COUNT UPDATER ===
let cartCount = 0;

function updateCartCount() {
    cartCount++;
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.animation = 'none';
        setTimeout(() => {
            cartCountElement.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
}

// === NOTIFICATION SYSTEM ===
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    const styles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex: 1;
        }
        
        .notification-content i {
            font-size: 1.25rem;
        }
        
        .notification-success .notification-content i {
            color: #10b981;
        }
        
        .notification-info .notification-content i {
            color: #2563eb;
        }
        
        .notification-warning .notification-content i {
            color: #f59e0b;
        }
        
        .notification-close {
            background: transparent;
            border: none;
            cursor: pointer;
            color: #6b7280;
            padding: 0.25rem;
            transition: color 0.2s;
        }
        
        .notification-close:hover {
            color: #1f2937;
        }
    `;
    
    // Add styles to document if not already present
    if (!document.getElementById('notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-info-circle';
    }
}

// === PERFORMANCE: LAZY LOAD IMAGES (if added later) ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// === ANALYTICS: TRACK PAGE INTERACTIONS (placeholder) ===
function trackEvent(category, action, label) {
    console.log(`Analytics: ${category} - ${action} - ${label}`);
    // In production, integrate with Google Analytics or similar
}

// Track button clicks
document.querySelectorAll('.btn, .nav-link, .category-link').forEach(element => {
    element.addEventListener('click', function() {
        const category = this.classList.contains('btn') ? 'Button' : 
                        this.classList.contains('nav-link') ? 'Navigation' : 'Link';
        const action = 'Click';
        const label = this.textContent.trim() || this.getAttribute('aria-label') || 'Unknown';
        trackEvent(category, action, label);
    });
});

// === ACCESSIBILITY ENHANCEMENTS ===
// Add keyboard navigation for cards
document.querySelectorAll('.product-card, .category-card, .value-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const link = card.querySelector('a, button');
            if (link) link.click();
        }
    });
});

// === PRODUCT CAROUSEL ===
function initProductCarousels() {
    const carousels = document.querySelectorAll('.product-carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-img');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dots = carousel.querySelectorAll('.dot');
        let currentSlide = 0;
        
        function showSlide(n) {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            if (n >= images.length) currentSlide = 0;
            if (n < 0) currentSlide = images.length - 1;
            
            images[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide++;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide--;
            showSlide(currentSlide);
        }
        
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto-slide every 3 seconds
        setInterval(nextSlide, 3000);
    });
}

// === INITIALIZE ON PAGE LOAD ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🎉 Wish Traders Website Loaded Successfully!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%c📦 Premium Packaging Solutions - Since 2023', 'color: #10b981; font-size: 12px;');
    
    // Initial highlight of current section
    highlightNavigation();
    
    // Initialize product carousels
    initProductCarousels();
});

// === PREVENT DEFAULT LOGIN/CART ACTIONS (PLACEHOLDER) ===
document.querySelectorAll('a[href="#login"], a[href="#cart"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const action = link.getAttribute('href').replace('#', '');
        showNotification(`${action.charAt(0).toUpperCase() + action.slice(1)} functionality coming soon!`, 'info');
    });
});
