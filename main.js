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



// Reveal Elements on Scroll
function initReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    startCountdowns();
    initReveal();
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

    // Universal Dropdown Logic (Desktop + Mobile)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent closing immediately

            const parent = toggle.closest('.dropdown');
            const menu = parent.querySelector('.dropdown-menu');
            const isOpen = menu.classList.contains('active');

            // Close all other dropdowns first
            document.querySelectorAll('.dropdown-menu.active').forEach(activeMenu => {
                if (activeMenu !== menu) {
                    activeMenu.classList.remove('active');
                    if (activeMenu.previousElementSibling) {
                        activeMenu.previousElementSibling.classList.remove('active');
                    }
                }
            });

            // Toggle current
            if (isOpen) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
            } else {
                menu.classList.add('active');
                toggle.classList.add('active');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        const isDropdown = e.target.closest('.dropdown');
        const isMenu = e.target.closest('.dropdown-menu');

        if (!isDropdown && !isMenu) {
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                menu.classList.remove('active');
                if (menu.previousElementSibling) {
                    menu.previousElementSibling.classList.remove('active');
                }
            });
            document.querySelectorAll('.dropdown-toggle.active').forEach(toggle => {
                toggle.classList.remove('active');
            });
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close menu when clicking links
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
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

    // Dashboard Sidebar Logic
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const dashboardSections = document.querySelectorAll('.tab-content');

    if (sidebarLinks.length > 0 && dashboardSections.length > 0) {
        // Handle Sidebar Toggle for Mobile
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.dashboard-overlay');

        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (sidebar && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    overlay?.classList.remove('active');
                }
            });
        });

        // Dashboard Scroll Spy
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPos = window.scrollY + 150; // Offset for dashboard header

            dashboardSections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            if (current) {
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // FAQ Accordion Logic
    const faqGrid = document.querySelector('.faq-grid');
    if (faqGrid) {
        faqGrid.addEventListener('click', (e) => {
            const question = e.target.closest('.faq-question');
            if (!question) return;

            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
            });

            // Toggle current if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }



    // View All Live Toggle
    const viewAllLiveBtn = document.getElementById('view-all-live-btn');
    const moreLiveAuctions = document.getElementById('more-live-auctions');

    if (viewAllLiveBtn && moreLiveAuctions) {
        viewAllLiveBtn.addEventListener('click', () => {
            const isActive = moreLiveAuctions.classList.contains('active');

            if (!isActive) {
                // Expanding
                moreLiveAuctions.style.display = 'grid';
                // Small delay to allow display change to register before triggering animation
                setTimeout(() => {
                    moreLiveAuctions.classList.add('active');
                    viewAllLiveBtn.textContent = 'Show Less';
                }, 10);
            } else {
                // Collapsing
                moreLiveAuctions.classList.remove('active');
                viewAllLiveBtn.textContent = 'View All Live';
                // Wait for animation to finish before hiding display
                setTimeout(() => {
                    if (!moreLiveAuctions.classList.contains('active')) {
                        moreLiveAuctions.style.display = 'none';
                    }
                }, 600); // Matches CSS transition time
            }
        });
    }

    // Platform Statistics Counter
    function initStatCounters() {
        const stats = document.querySelectorAll('.stat-value');
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-target'));
                    animateCount(target, countTo);
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        stats.forEach(stat => observer.observe(stat));
    }

    function animateCount(element, countTo) {
        let currentCount = 0;
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        const increment = countTo / totalFrames;

        const counter = setInterval(() => {
            currentCount += increment;
            if (currentCount >= countTo) {
                element.textContent = countTo.toLocaleString();
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(currentCount).toLocaleString();
            }
        }, frameDuration);
    }

    initStatCounters();

    // --- Enhanced Navigation Bar Logic ---

    /**
     * Highlights the active menu item based on current URL path
     */
    function handleActiveNav() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link, .auth-buttons .btn');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            const linkPath = href.split('/').pop();

            // Handle Home Page cases (index.html or empty)
            const isHome = currentPath === 'index.html' || currentPath === '';
            const isLinkHome = linkPath === 'index.html' || linkPath === 'index2.html';

            if (linkPath === currentPath || (isHome && isLinkHome)) {
                link.classList.add('active');
            } else {
                // Don't remove active if it's already set by scrollspy (fragment link)
                if (!href.includes('#')) {
                    link.classList.remove('active');
                }
            }
        });
    }

    /**
     * Updates navigation highlight based on scroll position for single-page sections
     */
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href*="#"]');

        if (sections.length === 0 || navLinks.length === 0) return;

        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            const scrollPos = window.scrollY + 120; // Offset for fixed header

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            if (currentSectionId) {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href.includes(`#${currentSectionId}`)) {
                        link.classList.add('active');
                        // Optional: remove active from non-hash links when in a section
                        document.querySelectorAll('.nav-link:not([href*="#"])').forEach(l => l.classList.remove('active'));
                    } else {
                        link.classList.remove('active');
                    }
                });
            } else {
                // If not in a specific section, fallback to URL-based highlighting
                handleActiveNav();
            }
        });
    }

    // Initialize Nav features
    handleActiveNav();
    initScrollSpy();

    // Smooth scroll for fragment links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const offset = 80; // Header height
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
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
