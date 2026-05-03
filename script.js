/* =======================
   INIT & DEBUG
======================= */
console.log("🚀 Husna's Portfolio Loaded Successfully! ✨");

/* =======================
   LOADING SCREEN
======================= */
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
});

/* =======================
   SMOOTH SCROLL
======================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* =======================
   HERO BUTTONS
======================= */
document.querySelector('.btn-primary')?.addEventListener('click', () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.btn-secondary')?.addEventListener('click', () => {
    // Download CV logic
    console.log('📥 CV Download clicked!');
});

/* =======================
   ACTIVE NAVIGATION
======================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        if (scrollY >= section.offsetTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

/* =======================
   SCROLL ANIMATIONS
======================= */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* =======================
   ANIMATED COUNTERS
======================= */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3[data-target]');
    
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 30);
    };

    counters.forEach(counter => animateCounter(counter));
}

/* =======================
   SKILL BARS ANIMATION
======================= */
function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-fill');
    bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

/* =======================
   FORM HANDLING
======================= */
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('button');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    button.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('✨ Pesan berhasil dikirim! Terima kasih sudah menghubungi saya ♡');
        this.reset();
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
});

/* =======================
   INIT ANIMATIONS ON SCROLL
======================= */
const initAnimations = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.querySelector('.stat-box')) {
                animateCounters();
            }
            if (entry.target.querySelector('.skill-fill')) {
                animateSkillBars();
            }
            initAnimations.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.card').forEach(card => {
    initAnimations.observe(card);
});

/* =======================
   PARTICLE BACKGROUND (OPTIONAL)
======================= */
function createParticles() {
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        document.body.appendChild(particle);
        particles.push(particle);
    }
}

// Uncomment to enable particles
// createParticles();
function scrollToSection(id){
    const el = document.getElementById(id);
    if(el){
        el.scrollIntoView({ behavior: "smooth" });
    }
}

function downloadCV(){
    alert("CV belum tersedia 😅");
}
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // aktif button
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        projects.forEach(card => {
            const category = card.getAttribute("data-category");

            if(filter === "all" || category === filter){
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});