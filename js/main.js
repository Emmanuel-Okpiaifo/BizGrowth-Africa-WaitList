// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('header nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
const setupMobileMenu = () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('header nav ul');
    const body = document.body;

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !e.target.closest('nav') && 
                !e.target.closest('.nav-toggle')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Close mobile menu when clicking a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
};

// Scroll reveal functionality with IntersectionObserver
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once revealed
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
});

function setupReveal() {
    document.querySelectorAll('.reveal').forEach(element => {
        revealObserver.observe(element);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupReveal();
    // Initialize intersection observer for .animate-on-scroll elements
    animateOnScroll();
    setupLogoSwitcher();
    setupHeroPoster();
});

// Podcast notification popup functionality
const podcastForm = document.getElementById('podcast-notify-form');
const popupOverlay = document.querySelector('.popup-overlay');

if (podcastForm) {
    podcastForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show the popup
        popupOverlay.classList.add('active');
        
        // Clear the form
        podcastForm.reset();
    });
}

// Close popup when clicking outside
if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
        }
    });
}

// Guide Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const guidePopup = document.querySelector('.guide-popup-overlay');
    const guidePopupClose = document.querySelector('.guide-popup-close');
    const guidePopupForm = document.querySelector('.guide-popup-form');

    // Only auto-show if explicitly enabled with data-autoshow
    if (guidePopup && guidePopup.hasAttribute('data-autoshow')) {
        setTimeout(() => {
            guidePopup.classList.add('active');
        }, 1000);
    }

    // Close popup when clicking the close button
    guidePopupClose.addEventListener('click', () => {
        guidePopup.classList.remove('active');
    });

    // Close popup when clicking outside
    guidePopup.addEventListener('click', (e) => {
        if (e.target === guidePopup) {
            guidePopup.classList.remove('active');
        }
    });

    // Handle form submission
    guidePopupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = guidePopupForm.querySelector('input[type="email"]').value;
        
        // Here you can add your email collection logic
        console.log('Email collected:', email);
        
        // Show success message
        const content = guidePopup.querySelector('.guide-popup-content');
        content.innerHTML = `
            <h2 class="guide-popup-title">Thank You!</h2>
            <p class="guide-popup-message">Your guide is being sent to your email. Check your inbox!</p>
        `;
        
        // Close popup after 3 seconds
        setTimeout(() => {
            guidePopup.classList.remove('active');
        }, 3000);
    });
});

// Program cards will now display normally in mobile view without carousel functionality

// Markets ticker removed per request

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
};

// (removed) optimizeVideo: no longer needed since hero video was replaced with canvas

// Handle form submission
const setupForm = () => {
    const form = document.getElementById('waitlist-form');
    if (form) {
        // If using Netlify Forms, let the browser perform a normal POST
        if (!form.hasAttribute('data-netlify')) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Form submitted');
            });
        }
    }
};

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize animations if needed
        animateOnScroll();
    }, 250);
});

// Handle scroll performance
let scrollTimer;
window.addEventListener('scroll', () => {
    if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
            scrollTimer = null;
            // Add any scroll-based animations here
        }, 100);
    }
}, { passive: true });

// Hero canvas animation removed (video background in use)

// Logo switching shared setup
function setupLogoSwitcher() {
    const logo = document.querySelector('.logo-img');
    if (!logo) return;
    const darkLogo = logo.getAttribute('data-logo-dark') || logo.src;
    const lightLogo = logo.getAttribute('data-logo-light') || logo.src;
    const apply = () => {
        if (window.scrollY > 50) {
            logo.src = lightLogo;
        } else {
            logo.src = darkLogo;
        }
    };
    apply();
    window.addEventListener('scroll', apply, { passive: true });
}

// Generate and persist hero video poster as JPEG
function setupHeroPoster() {
    const video = document.querySelector('.hero-video');
    if (!video) return;
    // Use cached poster if available
    try {
        const cached = localStorage.getItem('bga_hero_poster');
        if (cached) {
            video.setAttribute('poster', cached);
        }
    } catch (e) {}
    const capture = () => {
        try {
            const width = video.videoWidth;
            const height = video.videoHeight;
            if (!width || !height) return;
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
            if (dataUrl) {
                video.setAttribute('poster', dataUrl);
                try { localStorage.setItem('bga_hero_poster', dataUrl); } catch (e) {}
            }
        } catch (e) {
            // noop
        }
    };
    if (video.readyState >= 2) {
        capture();
    } else {
        video.addEventListener('loadeddata', capture, { once: true });
    }
}