// Countdown Timer Logic
function startCountdowns() {
    const countdowns = document.querySelectorAll('[data-countdown]');
    countdowns.forEach(counter => {
        const endTime = new Date(counter.dataset.countdown).getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                counter.innerHTML = "EXPIRED";
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            counter.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
        };

        setInterval(updateTimer, 1000);
        updateTimer();
    });
}

// Animate Stats on Scroll
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const increment = target / 50;

                    const updateCount = () => {
                        const count = +counter.innerText.replace(/,/g, ''); // Simple cleanup
                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                observer.unobserve(statsSection);
            }
        });
    });
    observer.observe(statsSection);
}

document.addEventListener('DOMContentLoaded', () => {
    startCountdowns();
    // Theme Switcher
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn?.querySelector('i');

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        // Assuming FontAwesome usage or simple text
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // Mobile Menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Hamburger animation
            const bars = menuBtn.querySelectorAll('.bar');
            bars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 6px)' : 'none';
            bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            bars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(5px, -6px)' : 'none';
        });
    }

    // Dropdown Logic
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                // Close other dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });
                dropdown.classList.toggle('active');
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });

    // Footer Accordion Logic
    const accHeaders = document.querySelectorAll('.footer-accordion-header');
    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all others (optional, but cleaner)
            document.querySelectorAll('.footer-accordion-item').forEach(i => {
                i.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Modal Logic
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal-overlay');
    const closeButtons = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const targetModal = document.getElementById(`modal-${modalId}`);
            if (targetModal) {
                targetModal.classList.add('active');
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal-overlay').classList.remove('active');
        });
    });

    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Dashboard Tab Logic
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only handle if it's an internal dashboard switching link (id based)
            const targetId = link.getAttribute('href').replace('#', '');
            if (targetId && document.getElementById(targetId)) {
                e.preventDefault();

                // Update active link
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Show target content
                document.querySelectorAll('.tab-content').forEach(tab => {
                    tab.classList.remove('active');
                });
                document.getElementById(targetId).classList.add('active');
            }
        });
    });

    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('active');

            // Optional: Close other FAQs
            document.querySelectorAll('.faq-item').forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
        });
    });

    // Simulated Dashboard Button Actions
    const genericButtons = document.querySelectorAll('.tab-content .btn, .tab-content .icon-btn');
    genericButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!btn.closest('form')) { // Only for non-form buttons
                const btnText = btn.innerText.trim() || 'Action';
                const toast = document.createElement('div');
                toast.style.cssText = `
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    background: var(--primary-color);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    z-index: 9999;
                    animation: slideIn 0.3s ease-out;
                `;
                toast.innerHTML = `<i class="fas fa-info-circle"></i> Simulated: ${btnText}`;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 3000);
            }
        });
    });

    // Simple Carousel Logic for Home Style 2
    const carousel = document.querySelector('.flex-scroll');
    if (carousel) {
        const leftBtn = carousel.parentElement.querySelector('.icon-btn:first-child');
        const rightBtn = carousel.parentElement.querySelector('.icon-btn:last-child');

        if (leftBtn && rightBtn) {
            leftBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: -350, behavior: 'smooth' });
            });
            rightBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: 350, behavior: 'smooth' });
            });
        }
    }
});

// Animation for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
