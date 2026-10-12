/* ============================================================
   KIRIMART — JAVASCRIPT UTAMA
   Daftar bagian: utilitas, intro, animasi, navigasi, modal,
   pencarian, dan efek kartu.
   ============================================================ */

// 01. UTILITAS DOM
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// 02. INTRO / LOADING SCREEN
window.addEventListener('load', () => {
    window.setTimeout(() => {
        $('#intro')?.classList.add('done');
        $('#site')?.classList.add('show');
    }, 3900);

    revealSections();
    animateCounters();
});

// 03. ANIMASI SAAT BAGIAN MASUK KE LAYAR
function revealSections() {
    if (!('IntersectionObserver' in window)) {
        $$('.reveal').forEach((element) => element.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12 });

    $$('.reveal').forEach((element) => observer.observe(element));
}

// 04. ANIMASI ANGKA STATISTIK
function animateCounters() {
    const counters = $$('.stats b');
    if (!('IntersectionObserver' in window)) {
        counters.forEach((element) => {
            element.textContent = `${element.dataset.count}+`;
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const element = entry.target;
            if (!entry.isIntersecting || element.dataset.done) return;

            element.dataset.done = '1';
            const target = Number(element.dataset.count) || 0;
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 45));
            const timer = window.setInterval(() => {
                current = Math.min(target, current + step);
                element.textContent = `${current}+`;
                if (current >= target) window.clearInterval(timer);
            }, 30);
        });
    }, { threshold: 0.5 });

    counters.forEach((element) => observer.observe(element));
}

// 05. NAVIGASI DESKTOP DAN MENU HP
$('#hamburger')?.addEventListener('click', () => {
    $('#navMenu')?.classList.toggle('open');
});

$$('nav a').forEach((link) => {
    link.addEventListener('click', () => $('#navMenu')?.classList.remove('open'));
});

// Sorot menu berdasarkan posisi halaman
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    $$('nav a').forEach((link) => {
        const section = $(link.getAttribute('href'));
        if (!section) return;

        const isActive = section.offsetTop - 120 <= scrollPosition
            && section.offsetTop + section.offsetHeight - 120 > scrollPosition;
        if (isActive) {
            $$('nav a').forEach((item) => item.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// 06. EFEK KURSOR
const cursorGlow = $('#cursorGlow');
window.addEventListener('pointermove', (event) => {
    if (window.innerWidth <= 900 || !cursorGlow) return;
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
});

// 07. NOTIFIKASI TOAST
function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(window.toastTimer);
    window.toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3000);
}

// 08. MODAL LOGIN, UMKM, DAN KURIR
function openModal(id) {
    const modal = $(`#${id}`);
    if (!modal) return;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    $(`#${id}`)?.classList.remove('show');
    if (!$('.modal.show')) document.body.style.overflow = '';
}

$$('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal(modal.id);
    });
});

// Tutup modal dengan tombol Escape
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        $$('.modal.show').forEach((modal) => closeModal(modal.id));
    }
});

// 09. PENCARIAN SEDERHANA
$('.search input')?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    const query = event.target.value.trim();
    showToast(query ? `Mencari: ${query}` : 'Silakan ketik layanan yang dicari.');
});

// 10. EFEK TILT KARTU (AKTIF DI PERANGKAT YANG MENDUKUNG POINTER)
$$('.photo-card, .service-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
        if (window.innerWidth <= 900) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(700px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-5px)`;
    });

    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});
