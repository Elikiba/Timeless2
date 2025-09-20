// Timeless Luxury - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize preloader
    initPreloader();
    
    // Navigation functionality
    initNavigation();
    
    // Form handling
    initForms();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Animations
    initAnimations();
    
    // Mobile menu
    initMobileMenu();
    
    // Dynamic content
    initDynamicContent();
    
    // Menu tabs (for restaurant page)
    initMenuTabs();
    
    // Counter animations
    initCounters();
    
    // Events ticker (for nightclub page)
    initEventsTicker();
    
    // Scroll to top functionality
    initScrollToTop();
    
    // Enhanced animations
    initEnhancedAnimations();
});

// Initialize preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        // Simulate loading time
        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            // Remove preloader from DOM after fade out
            setTimeout(() => {
                preloader.remove();
                // Trigger entrance animations
                document.body.classList.add('loaded');
            }, 500);
        }, 2000); // Show preloader for 2 seconds
    }
}

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting based on page
    const currentPage = window.location.pathname.split('/').pop() || 'restaurant.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'restaurant.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// Form handling
function initForms() {
    // Main reservation form
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
    }
    
    // Rooftop reservation form
    const rooftopForm = document.getElementById('rooftop-reservation-form');
    if (rooftopForm) {
        rooftopForm.addEventListener('submit', handleReservationSubmit);
    }
    
    // Bar reservation form
    const barForm = document.getElementById('bar-reservation-form');
    if (barForm) {
        barForm.addEventListener('submit', handleReservationSubmit);
    }
    
    // Restaurant reservation form
    const restaurantForm = document.getElementById('restaurant-reservation-form');
    if (restaurantForm) {
        restaurantForm.addEventListener('submit', handleReservationSubmit);
    }
    
    // Nightclub reservation form
    const nightclubForm = document.getElementById('nightclub-reservation-form');
    if (nightclubForm) {
        nightclubForm.addEventListener('submit', handleReservationSubmit);
    }
    
    // Membership form
    const membershipForm = document.getElementById('membership-form');
    if (membershipForm) {
        membershipForm.addEventListener('submit', handleMembershipSubmit);
    }
    
    // Set minimum date to today for all date inputs
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
}

// Handle reservation form submissions
function handleReservationSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic form validation
    if (!validateReservationForm(data)) {
        return;
    }
    
    // Show success message
    showNotification('success', 'Reservation request submitted successfully! We will contact you shortly to confirm.');
    
    // Reset form
    form.reset();
    
    // In a real application, this would send data to a server
    console.log('Reservation data:', data);
}

// Handle membership form submission
function handleMembershipSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic form validation
    if (!validateMembershipForm(data)) {
        return;
    }
    
    // Show success message
    showNotification('success', 'Membership application submitted successfully! Our membership team will review your application and contact you within 48 hours.');
    
    // Reset form
    form.reset();
    
    // In a real application, this would send data to a server
    console.log('Membership application data:', data);
}

// Validate reservation form
function validateReservationForm(data) {
    const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification('error', `Please fill in the ${field} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('error', 'Please enter a valid email address.');
        return false;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
        showNotification('error', 'Please enter a valid phone number.');
        return false;
    }
    
    // Date validation (not in the past)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('error', 'Please select a date that is today or in the future.');
        return false;
    }
    
    return true;
}

// Validate membership form
function validateMembershipForm(data) {
    const requiredFields = ['name', 'email', 'phone', 'membership-tier', 'occupation', 'message'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            const fieldName = field.replace('-', ' ');
            showNotification('error', `Please fill in the ${fieldName} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('error', 'Please enter a valid email address.');
        return false;
    }
    
    return true;
}

// Show notifications
function showNotification(type, message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✗'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add notification styles to head if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .notification-icon {
                font-weight: bold;
                font-size: 18px;
            }
            .notification-message {
                flex: 1;
                line-height: 1.4;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize animations on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.dish-card, .cocktail-card, .service-card, .offering-card, .feature-card, .venue-card, .tier-card, .benefit-item, .fade-in-element, .menu-item, .event-card, .package-card, .dj-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize dynamic content
function initDynamicContent() {
    // Dynamic text animation
    const dynamicTexts = document.querySelectorAll('.dynamic-text');
    dynamicTexts.forEach(text => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            text.style.transition = 'all 1s ease-out';
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        }, 300);
    });
    
    // Pulse animations
    const pulseElements = document.querySelectorAll('.pulse-animation, .pulse-icon');
    pulseElements.forEach(element => {
        setInterval(() => {
            element.style.transform = 'scale(1.05)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }, 2000);
    });
    
    // Glow effects
    const glowElements = document.querySelectorAll('.glow-effect, .neon-text');
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 20px var(--gold), 0 0 30px var(--gold), 0 0 40px var(--gold)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
        });
    });
}

// Initialize menu tabs (restaurant page)
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (menuTabs.length === 0) return;
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding category
            this.classList.add('active');
            const targetCategory = document.getElementById(category);
            if (targetCategory) {
                targetCategory.classList.add('active');
                
                // Animate menu items
                const menuItems = targetCategory.querySelectorAll('.menu-item');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease-out';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
}

// Initialize counter animations
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize events ticker (nightclub page)
function initEventsTicker() {
    const ticker = document.querySelector('.ticker-content');
    if (!ticker) return;
    
    // Clone ticker content for seamless loop
    const tickerItems = ticker.innerHTML;
    ticker.innerHTML = tickerItems + tickerItems;
    
    // Start animation
    let position = 0;
    const speed = 1; // pixels per frame
    
    function animateTicker() {
        position -= speed;
        ticker.style.transform = `translateX(${position}px)`;
        
        // Reset position when first set of items is completely off screen
        if (Math.abs(position) >= ticker.scrollWidth / 2) {
            position = 0;
        }
        
        requestAnimationFrame(animateTicker);
    }
    
    animateTicker();
}

// Initialize scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize enhanced animations
function initEnhancedAnimations() {
    // Stagger animations for cards
    const cardElements = document.querySelectorAll('.dish-card, .cocktail-card, .service-card, .offering-card, .feature-card, .venue-card, .tier-card, .package-card, .event-card, .dj-card, .menu-item');
    
    cardElements.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add parallax effect to hero images
    const heroImages = document.querySelectorAll('.hero-image img');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        heroImages.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight && img.getBoundingClientRect().bottom > 0) {
                img.style.transform = `translateY(${rate}px)`;
            }
        });
    });
    
    // Add floating animation to feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon, index) => {
        icon.style.animation = `logoFloat 3s ease-in-out infinite ${index * 0.5}s`;
    });
    
    // Add typewriter effect to hero titles
    const heroTitles = document.querySelectorAll('.hero-title');
    heroTitles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid var(--gold)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typewriter effect after preloader
        setTimeout(typeWriter, 2500);
    });
}

// Button click handlers
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        const button = e.target;
        const buttonText = button.textContent;
        
        // Handle different button types
        if (buttonText.includes('Menu')) {
            // Scroll to menu section or show menu modal
            const menuSection = document.querySelector('.dishes-grid, .cocktails-grid, .menu-categories');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (buttonText.includes('Reservation') || buttonText.includes('Reserve') || buttonText.includes('Book')) {
            // Scroll to contact form
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (buttonText.includes('Apply')) {
            // Scroll to membership form for club page
            const membershipForm = document.querySelector('#membership-form');
            if (membershipForm) {
                membershipForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (buttonText.includes('Venues')) {
            // Scroll to venues section
            const venuesSection = document.querySelector('.venues');
            if (venuesSection) {
                venuesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (buttonText.includes('Events')) {
            // Scroll to events section
            const eventsSection = document.querySelector('.upcoming-events');
            if (eventsSection) {
                eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
});

// Enhanced form experience
document.addEventListener('input', function(e) {
    if (e.target.matches('input, select, textarea')) {
        const field = e.target;
        field.classList.remove('error');
        
        // Real-time validation feedback
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.classList.add('error');
            }
        }
        
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                field.classList.add('error');
            }
        }
    }
});

// Add CSS for error states and animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #EF4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
    }
    
    .fade-in {
        animation: fadeInUp 0.8s ease-out;
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    .pulse-animation {
        transition: transform 0.2s ease;
    }
    
    .glow-effect {
        transition: all 0.3s ease;
    }
    
    .neon-text {
        transition: text-shadow 0.3s ease;
    }
    
    .dynamic-text {
        transition: all 1s ease-out;
    }
    
    /* Enhanced card hover effects */
    .dish-card:hover,
    .cocktail-card:hover,
    .service-card:hover,
    .offering-card:hover {
        transform: translateY(-15px) scale(1.02);
        box-shadow: 0 20px 40px rgba(2, 3, 53, 0.3);
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
    }
    
    /* Loading state for images */
    img {
        transition: opacity 0.3s ease;
    }
    
    img[loading="lazy"] {
        opacity: 0;
    }
    
    img[loading="lazy"].loaded {
        opacity: 1;
    }
`;
document.head.appendChild(dynamicStyles);

// Add image loading animation
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// Add smooth page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(-20px)';
});

// Enhanced form interactions
document.addEventListener('focus', function(e) {
    if (e.target.matches('input, select, textarea')) {
        e.target.parentElement.classList.add('focused');
    }
}, true);

document.addEventListener('blur', function(e) {
    if (e.target.matches('input, select, textarea')) {
        e.target.parentElement.classList.remove('focused');
    }
}, true);