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
    initHeroLiveBackground();
    setupDeliveryChip();
    setupSignals();
    setupEditionUnlocks();
    setupBriefingFilters();
    setupReferralCard();
    setupCountdownRibbon();
    setupSampleModal();
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

// Live hero background (canvas network pulses)
function initHeroLiveBackground() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return; // respect reduced motion
    }
    const canvas = document.getElementById('hero-live');
    const container = document.querySelector('.hero-live-container');
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes = [];
    let edges = [];
    let pulses = [];
    let rafId = 0;
    let lastTs = 0;

    function resize() {
        const rect = container.getBoundingClientRect();
        width = Math.max(1, Math.floor(rect.width));
        height = Math.max(1, Math.floor(rect.height));
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        buildScene();
    }

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    function buildScene() {
        const area = width * height;
        const targetNodes = Math.max(28, Math.min(80, Math.floor(area / 30000)));
        nodes = [];
        edges = [];
        pulses = [];
        // Seed nodes in a banded distribution to imply flows
        for (let i = 0; i < targetNodes; i++) {
            const nx = Math.random();
            const ny = Math.pow(Math.random(), 0.9); // slightly denser near top
            nodes.push({
                x: nx * width,
                y: ny * height,
                vx: randomInRange(-0.02, 0.02),
                vy: randomInRange(-0.02, 0.02),
                strength: randomInRange(0.6, 1)
            });
        }
        // Connect k nearest neighbors
        const k = 3;
        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            const dists = [];
            for (let j = 0; j < nodes.length; j++) {
                if (i === j) continue;
                const b = nodes[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                dists.push({ j, d2: dx*dx + dy*dy });
            }
            dists.sort((p,q) => p.d2 - q.d2);
            for (let n = 0; n < k; n++) {
                const j = dists[n].j;
                const key = i < j ? `${i}-${j}` : `${j}-${i}`;
                if (!edges.some(e => e.key === key)) {
                    edges.push({ a: i, b: j, key });
                }
            }
        }
        // Create pulses traversing edges
        const pulseCount = Math.max(8, Math.floor(edges.length * 0.35));
        for (let p = 0; p < pulseCount; p++) {
            const eIndex = Math.floor(Math.random() * edges.length);
            pulses.push({
                eIndex,
                t: Math.random(),
                speed: randomInRange(0.12, 0.45), // units per second
                size: randomInRange(2.2, 3.8),
                hue: Math.random() < 0.5 ? 155 : 45 // greenish or amber for "signals"
            });
        }
    }

    function step(dt) {
        // Gentle drift
        for (const n of nodes) {
            n.x += n.vx * dt;
            n.y += n.vy * dt;
            // bounce softly at edges
            if (n.x < 0) { n.x = 0; n.vx *= -1; }
            if (n.x > width) { n.x = width; n.vx *= -1; }
            if (n.y < 0) { n.y = 0; n.vy *= -1; }
            if (n.y > height) { n.y = height; n.vy *= -1; }
        }
        for (const pulse of pulses) {
            pulse.t += pulse.speed * dt / 1000;
            if (pulse.t > 1) {
                pulse.t = 0;
                pulse.eIndex = Math.floor(Math.random() * edges.length);
                pulse.speed = randomInRange(0.12, 0.45);
                pulse.size = randomInRange(2.2, 3.8);
            }
        }
    }

    function drawBackground() {
        // subtle gradient
        const g = ctx.createLinearGradient(0, 0, width, height);
        g.addColorStop(0, 'rgba(0,0,0,0.9)');
        g.addColorStop(1, 'rgba(0,0,0,0.7)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
        // grid
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        const spacing = 48;
        ctx.beginPath();
        for (let x = 0.5; x < width; x += spacing) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        for (let y = 0.5; y < height; y += spacing) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        ctx.stroke();
    }

    function drawNetwork() {
        // connections
        ctx.lineWidth = 1.2;
        for (const e of edges) {
            const a = nodes[e.a], b = nodes[e.b];
            const dx = a.x - b.x, dy = a.y - b.y;
                    const dist = Math.hypot(dx, dy);
            const alpha = Math.max(0, 0.14 - (dist / 600) * 0.14);
            if (alpha <= 0.01) continue;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
        // nodes
        for (const n of nodes) {
            ctx.fillStyle = 'rgba(255,255,255,0.22)';
            ctx.beginPath();
            ctx.arc(n.x, n.y, 2.0 + n.strength * 0.6, 0, Math.PI * 2);
            ctx.fill();
        }
        // pulses
        for (const pulse of pulses) {
            const e = edges[pulse.eIndex];
            const a = nodes[e.a], b = nodes[e.b];
            const x = a.x + (b.x - a.x) * pulse.t;
            const y = a.y + (b.y - a.y) * pulse.t;
            const grd = ctx.createRadialGradient(x, y, 0, x, y, pulse.size * 4);
            grd.addColorStop(0, `hsla(${pulse.hue}, 80%, 60%, 0.9)`);
            grd.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(x, y, pulse.size * 2.2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function frame(ts) {
        const dt = lastTs ? (ts - lastTs) : 16;
        lastTs = ts;
        ctx.clearRect(0, 0, width, height);
        drawBackground();
        step(dt);
        drawNetwork();
        rafId = requestAnimationFrame(frame);
                    }

    function start() {
        cancelAnimationFrame(rafId);
        lastTs = 0;
        rafId = requestAnimationFrame(frame);
    }

    resize();
    start();

    // Rebuild on resize
    let rTimer;
    window.addEventListener('resize', () => {
        clearTimeout(rTimer);
        rTimer = setTimeout(() => {
            resize();
        }, 120);
    });
}

// Hero delivery chip
function setupDeliveryChip() {
    const chip = document.getElementById('hero-delivery-chip');
    if (!chip) return;
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        chip.textContent = `Delivered daily at 7:00am • ${tz || 'Local time'}`;
    } catch {
        chip.textContent = 'Delivered daily at 7:00am • Local time';
    }
}

// Signals (rotating one-liners)
function setupSignals() {
    const line = document.getElementById('signals-line');
    if (!line) return;
    const items = [
        'New AMI tender in Kenya closes in 9 days.',
        'Tourism grant window reopened in Rwanda.',
        'ICT modernization RFP published in Ghana.',
        'SME payments pilot expands in Nigeria.',
        'AfDB corridor O&M partners: EOI open now.'
    ];
    let idx = 0;
    const render = () => {
        line.textContent = items[idx];
        idx = (idx + 1) % items.length;
    };
    render();
    setInterval(render, 4000);
}

// Today’s Briefing: inline unlock
function setupEditionUnlocks() {
    document.querySelectorAll('.unlock-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const uid = btn.getAttribute('data-uid');
            const panel = document.querySelector(`.unlock-inline[data-for="${uid}"]`);
            if (panel) panel.hidden = !panel.hidden;
        });
    });
    document.querySelectorAll('.unlock-inline .unlock-confirm').forEach(confirmBtn => {
        confirmBtn.addEventListener('click', (e) => {
            const panel = e.target.closest('.unlock-inline');
            if (!panel) return;
            const emailInput = panel.querySelector('.unlock-email');
            if (!emailInput || !emailInput.value) return;
            // prefill waitlist email if empty
            const wlEmail = document.querySelector('#waitlist-form input[type="email"]');
            if (wlEmail && !wlEmail.value) wlEmail.value = emailInput.value;
            const item = panel.closest('.edition-item');
            if (item) item.classList.add('unlocked');
            panel.hidden = true;
        });
    });
}

// Briefing filters
function setupBriefingFilters() {
    const bar = document.getElementById('briefing-filters');
    if (!bar) return;
    const items = Array.from(document.querySelectorAll('.edition-item'));
    function apply(filter) {
        items.forEach(li => {
            li.style.display = '';
            if (filter === 'all') return;
            const [key, val] = filter.split(':');
            const attr = key === 'sector' ? 'data-sector'
                : key === 'country' ? 'data-country'
                : key === 'size' ? 'data-size' : '';
            if (!attr) return;
            if ((li.getAttribute(attr) || '').toLowerCase() !== val.toLowerCase()) {
                li.style.display = 'none';
            }
        });
    }
    bar.querySelectorAll('.brief-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            bar.querySelectorAll('.brief-chip').forEach(x => x.classList.remove('is-active'));
            chip.classList.add('is-active');
            apply(chip.getAttribute('data-filter') || 'all');
        });
    });
}

// Referral boost card
function setupReferralCard() {
    const btn = document.getElementById('referral-copy-btn');
    const toast = document.getElementById('referral-toast');
    if (!btn || !toast) return;
    btn.addEventListener('click', async () => {
        const u = new URL(window.location.href);
        u.hash = 'join';
        u.searchParams.set('ref', 'you');
        try {
            await navigator.clipboard.writeText(u.toString());
            toast.hidden = false;
            toast.textContent = 'Link copied';
            setTimeout(() => { toast.hidden = true; }, 2000);
        } catch {
            toast.hidden = false;
            toast.textContent = u.toString();
            setTimeout(() => { toast.hidden = true; }, 4000);
        }
    });
}

// Countdown ribbon (defaults to 30 days from first visit)
function setupCountdownRibbon() {
    const el = document.getElementById('countdown-ribbon');
    if (!el) return;
    const key = 'bga_launch_ts';
    let ts = parseInt(localStorage.getItem(key) || '', 10);
    if (!ts || Number.isNaN(ts)) {
        const d = new Date();
        d.setDate(d.getDate() + 30);
        ts = d.getTime();
        try { localStorage.setItem(key, String(ts)); } catch {}
    }
    function tick() {
        const now = Date.now();
        const ms = Math.max(0, ts - now);
        const days = Math.floor(ms / (24*60*60*1000));
        const hours = Math.floor((ms % (24*60*60*1000)) / (60*60*1000));
        const mins = Math.floor((ms % (60*60*1000)) / (60*1000));
        el.textContent = `Launching in ${days}d ${hours}h ${mins}m • Join the waitlist`;
        el.style.display = 'block';
    }
    tick();
    setInterval(tick, 60000);
}

// Sample modal
function setupSampleModal() {
    const overlay = document.getElementById('sample-overlay');
    const closeBtn = document.getElementById('sample-close');
    const form = document.getElementById('sample-form');
    const success = document.getElementById('sample-success');
    if (!overlay || !closeBtn || !form || !success) return;
    // open triggers: reuse unlock buttons as “open sample”
    document.querySelectorAll('.unlock-btn').forEach(btn => {
        btn.addEventListener('contextmenu', (e) => {
            // alternate open via context click (hidden affordance to avoid cluttering UI)
            e.preventDefault();
            overlay.hidden = false;
            overlay.classList.add('active');
        });
    });
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        overlay.hidden = true;
    });
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            overlay.hidden = true;
        }
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        success.hidden = false;
        setTimeout(() => {
            overlay.classList.remove('active');
            overlay.hidden = true;
            success.hidden = true;
        }, 1500);
    });
}

// Sticky CTA removed
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

// (video poster removed since we no longer use a video background)