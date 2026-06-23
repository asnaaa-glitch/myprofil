/* =======================
   HUSNA PORTFOLIO v2.0 - SCRIPT LENGKAP
======================= */
console.log("🚀 Husna's Portfolio v2.0 Loaded Successfully! ✨");

// =======================
// MOBILE MENU TOGGLE
// =======================
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;
    
    sidebar.classList.toggle('open');
    body.classList.toggle('sidebar-open');
}

// =======================
// LOADING SCREEN
// =======================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    
    // Hide loader after 1.8s
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Trigger initial animations
        setTimeout(() => {
            animateSkillBars();
            animateCounters();
        }, 200);
    }, 1800);
});

// =======================
// SMOOTH SCROLL TO SECTION
// =======================
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close mobile sidebar
        document.querySelector('.sidebar')?.classList.remove('open');
        document.body.classList.remove('sidebar-open');
    }
}

// All anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// =======================
// ACTIVE NAVIGATION
// =======================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let currentSection = '';
    const scrollY = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        if (scrollY >= section.offsetTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// =======================
// SCROLL REVEAL ANIMATIONS
// =======================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // Optional: remove class when scrolling up
            // entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// =======================
// STATS COUNTER ANIMATION
// =======================
function animateCounters() {
    const counters = document.querySelectorAll('h3[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// =======================
// SKILL BARS ANIMATION
// =======================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill[data-width]');
    
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
    });
}

// =======================
// INIT SCROLL ANIMATIONS
// =======================
const initObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger counters
            if (entry.target.querySelector('.stat-item')) {
                animateCounters();
            }
            
            // Trigger skill bars
            if (entry.target.querySelector('.skill-fill')) {
                animateSkillBars();
            }
            
            // Unobserve after animation
            initObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.3 
});

document.querySelectorAll('.card').forEach(card => {
    initObserver.observe(card);
});

// =======================
// PROJECT FILTER
// =======================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects with stagger animation
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                // Show with stagger delay
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
                
            } else {
                // Hide with animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 400);
            }
        });
    });
});

// =======================
// CV DOWNLOAD
// =======================
function downloadCV() {
    // Simulate download (ganti dengan link CV asli)
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Husna-Portfolio-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show notification
    showNotification('📥 CV Download started!', 'success');
}

// =======================
// NOTIFICATION SYSTEM
// =======================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// =======================
// MOBILE OPTIMIZATIONS
// =======================
document.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.sidebar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    // Close sidebar when clicking outside
    if (window.innerWidth <= 992 &&
        !sidebar.contains(e.target) &&
        !mobileBtn.contains(e.target) &&
        sidebar.classList.contains('open')) {
        toggleSidebar();
    }
});

// Prevent body scroll when sidebar open
document.addEventListener('sidebarToggle', (e) => {
    const body = document.body;
    if (e.detail.isOpen) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
});

// =======================
// PARALLAX EFFECT (Optional subtle)
// =======================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// =======================
// HERO BUTTONS SHORTCUT
// =======================
document.addEventListener('DOMContentLoaded', () => {
    // Hero buttons
    document.querySelector('.btn-primary')?.addEventListener('click', () => scrollToSection('about'));
    document.querySelector('.btn-secondary')?.addEventListener('click', () => scrollToSection('projects'));
    
    // Update nav on load
    updateActiveNav();
    
    console.log("✅ All features initialized!");
});

// =======================
// WINDOW RESIZE HANDLER
// =======================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reset sidebar on resize
        if (window.innerWidth > 992) {
            document.querySelector('.sidebar')?.classList.remove('open');
            document.body.classList.remove('sidebar-open');
        }
    }, 250);
});

// =======================
// PERFORMANCE OPTIMIZATION
// =======================
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', () => {
    requestTick();
}, { passive: true });

// =======================
// PWA READY (Bonus)
// =======================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}
// =======================
// CV DOWNLOAD & PRINT
// =======================
function downloadCV() {
    // Buat link download (ganti dengan file CV asli kamu)
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Husna CV Portfolio\nDownload file PDF asli dari hosting kamu!';
    link.download = 'Husna-CV-2024.pdf';
    link.click();
    
    showNotification('📥 CV berhasil diunduh!', 'success');
}

function printCV() {
    window.print();
    showNotification('🖨️ CV siap dicetak!', 'success');
}
// =======================
// EMAIL CONTACT FORM
// =======================
function openEmailForm() {
    scrollToSection('contact');
    document.getElementById('contactForm').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center' 
    });
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const button = this.querySelector('button');
        const originalText = button.innerHTML;
        
        // Loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;
        
        // Ambil data form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Buat email body
        const emailBody = `
        New message from Portfolio Website!
        
        From: ${name} (${email})
        Subject: ${subject || 'Portfolio Inquiry'}
        
        Message:
        ${message}
        
        ---
        Sent from Husna's Portfolio
        `;
        
        // Kirim email via mailto (langsung buka email client)
        const mailtoLink = `mailto:as.husna06@gmail.com?subject=${encodeURIComponent('Portfolio: ' + (subject || 'New Message'))}&body=${encodeURIComponent(emailBody)}`;
        
        // Buka email client
        window.location.href = mailtoLink;
        
        // Reset form & show success
        setTimeout(() => {
            this.reset();
            button.innerHTML = originalText;
            button.disabled = false;
            showNotification('✉️ Email client opened! Check your email.', 'success');
        }, 1000);
    });
}

// =======================
// AUTO-FOCUS FORM ON CLICK
// =======================
document.querySelectorAll('a[href="mailto:as.husna06@gmail.com"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openEmailForm();
    });
});
// =======================
// CONTACT ICON ANIMATIONS
// =======================
document.querySelectorAll('.contact-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
    });
});
console.log("🎉 Portfolio fully loaded and optimized!");
