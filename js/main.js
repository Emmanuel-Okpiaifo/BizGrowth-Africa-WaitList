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
    setupDeepLinkScroll();
    setupReferralAttribution();
    setupSheetRelay();
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

// Allow anchorless deep links to newsletter
function setupDeepLinkScroll() {
    const go = () => {
        const el = document.getElementById('newsletter');
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    try {
        const url = new URL(window.location.href);
        const path = url.pathname.replace(/\/+$/, '');
        if (url.hash === '#newsletter' || url.searchParams.has('newsletter') || path === '/newsletter') {
            // wait a tick to ensure layout is ready
            setTimeout(go, 50);
        }
    } catch {
        // no-op
    }
}

// (video poster removed since we no longer use a video background)

// -----------------------------
// Referral: IDs and attribution
// -----------------------------
function generateUUIDv4() {
    // RFC4122-ish UUID v4 (not cryptographically strong)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getOrCreateUserId() {
    const key = 'bga_user_id';
    try {
        let id = localStorage.getItem(key);
        if (!id) {
            id = generateUUIDv4();
            localStorage.setItem(key, id);
        }
        return id;
    } catch {
        // Storage blocked — fallback to ephemeral id (resets per session)
        if (!window.__bga_ephemeral_id) window.__bga_ephemeral_id = generateUUIDv4();
        return window.__bga_ephemeral_id;
    }
}

function getReferrerId() {
    const key = 'bga_referrer_id';
    try {
        const url = new URL(window.location.href);
        const fromUrl = url.searchParams.get('ref') || '';
        if (fromUrl) {
            localStorage.setItem(key, fromUrl);
            return fromUrl;
        }
        const stored = localStorage.getItem(key) || '';
        return stored;
    } catch {
        return '';
    }
}

function setupReferralAttribution() {
    const myId = getOrCreateUserId();
    const refId = getReferrerId();
    // Populate hidden fields on the waitlist form
    const userIdInput = document.getElementById('userId');
    const referrerIdInput = document.getElementById('referrerId');
    if (userIdInput) userIdInput.value = myId;
    if (referrerIdInput && refId) referrerIdInput.value = refId;
    // Ensure values are present at submit time too
    const form = document.getElementById('waitlist-form');
    if (form) {
        form.addEventListener('submit', () => {
            if (userIdInput && !userIdInput.value) userIdInput.value = getOrCreateUserId();
            if (referrerIdInput && !referrerIdInput.value) referrerIdInput.value = getReferrerId();
        });
    }
}

// Override referral copy to use the real user id
(function enhanceReferralCopy() {
    document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('referral-copy-btn');
        const toast = document.getElementById('referral-toast');
        if (!btn || !toast) return;
        btn.addEventListener('click', async () => {
            const u = new URL(window.location.href);
            u.hash = ''; // no hash
            u.searchParams.set('ref', getOrCreateUserId());
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
    });
})();

// Relay submissions to Google Sheets via Apps Script without changing the form
function setupSheetRelay() {
    // Replace with your deployed Apps Script Web App URL
    const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbw6IyBFIF0qLhH1qXctH58GBTPFj2wrqv9oZJqUGXGxJ7y5Ti0Gm8ubrXgNvh6I-LdiLA/exec';
    if (!SHEET_WEBHOOK_URL || SHEET_WEBHOOK_URL.includes('YOUR_DEPLOYMENT_ID')) return;

    function showSubmitOverlay(title, message, extraHTML) {
        const overlay = document.getElementById('submit-overlay');
        const closeBtn = document.getElementById('submit-close');
        const t = document.getElementById('submit-title');
        const m = document.getElementById('submit-message');
        const extra = document.getElementById('submit-extra');
        if (!overlay || !t || !m) return;
        t.textContent = title || 'Success';
        m.textContent = message || '';
        if (extra && extraHTML) {
            extra.hidden = false;
            extra.innerHTML = extraHTML;
        } else if (extra) {
            extra.hidden = true;
            extra.innerHTML = '';
        }
        overlay.hidden = false;
        overlay.classList.add('active');
        const close = () => {
            overlay.classList.remove('active');
            overlay.hidden = true;
        };
        closeBtn && closeBtn.addEventListener('click', close, { once: true });
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); }, { once: true });
    }

    async function postJSON(url, payload) {
        const resp = await fetch(url, {
            method: 'POST',
            // Use a "simple" content-type to avoid CORS preflight (OPTIONS) with Apps Script
            headers: { 'Content-Type': 'text/plain;charset=utf-8', 'Accept': 'application/json' },
            body: JSON.stringify(payload), // still sending JSON string
            keepalive: true,
            mode: 'cors'
        });
        let data = null;
        let text = '';
        let ok = false;
        try {
            data = await resp.json();
            ok = resp.ok && (data && (data.success === true || data.ok === true));
        } catch {
            try {
                text = await resp.text();
                ok = resp.ok && /"success"\s*:\s*true/i.test(text);
            } catch {
                ok = resp.ok; // fall back: treat 2xx as success
            }
        }
        return { ok, status: resp.status, data: data ?? text };
    }

    // Waitlist form
    const wl = document.getElementById('waitlist-form');
    if (wl) {
        wl.addEventListener('submit', async (e) => {
            e.preventDefault();
            const payload = {
                form: 'waitlist',
                ts: new Date().toISOString(),
                userId: (document.getElementById('userId') || {}).value || getOrCreateUserId(),
                referrerId: (document.getElementById('referrerId') || {}).value || getReferrerId(),
                firstName: (document.getElementById('firstName') || {}).value || '',
                lastName: (document.getElementById('lastName') || {}).value || '',
                phone: (document.getElementById('phone') || {}).value || '',
                email: (document.getElementById('email') || {}).value || '',
                country: (document.getElementById('country') || {}).value || '',
                interest: (document.getElementById('interest') || {}).value || '',
                userAgent: navigator.userAgent || '',
                page: window.location.href
            };
            try {
                const result = await postJSON(SHEET_WEBHOOK_URL, payload);
                if (result.ok) {
                    wl.reset();
                    showSubmitOverlay(
                        'You’re on the membership list 🎉',
                        'Thanks for joining BizGrowth Africa. We’ll notify you at launch and send key updates.',
                        ''
                    );
                } else {
                    const msg = (result.data && result.data.error) ? String(result.data.error) : `Request failed (${result.status})`;
                    showSubmitOverlay(
                        'Couldn’t complete signup',
                        `Please try again in a moment. Details: ${msg}`,
                        ''
                    );
                }
            } catch (err) {
                showSubmitOverlay(
                    'Network error',
                    'We could not reach the server. Check your connection and try again.',
                    ''
                );
            }
        });
    }

    // Newsletter form
    const nl = document.querySelector('form[name="bga-newsletter"]');
    if (nl) {
        nl.addEventListener('submit', async (e) => {
            e.preventDefault();
            const payload = {
                form: 'newsletter',
                ts: new Date().toISOString(),
                userId: getOrCreateUserId(),
                referrerId: getReferrerId(),
                name: (nl.querySelector('input[name="name"]') || {}).value || '',
                email: (nl.querySelector('input[name="email"]') || {}).value || '',
                userAgent: navigator.userAgent || '',
                page: window.location.href
            };
            try {
                const result = await postJSON(SHEET_WEBHOOK_URL, payload);
                if (result.ok) {
                    nl.reset();
                    showSubmitOverlay(
                        'You’re subscribed ✅',
                        'You’ll receive BizGrowth newsletter updates in your inbox.',
                        ''
                    );
                } else {
                    const msg = (result.data && result.data.error) ? String(result.data.error) : `Request failed (${result.status})`;
                    showSubmitOverlay(
                        'Subscription failed',
                        `Please try again in a moment. Details: ${msg}`,
                        ''
                    );
                }
            } catch (err) {
                showSubmitOverlay(
                    'Network error',
                    'We could not reach the server. Check your connection and try again.',
                    ''
                );
            }
        });
    }
}