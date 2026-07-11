document.addEventListener('DOMContentLoaded', () => {

    // --- NAVIGATION SYNC & HEADER SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightNavOnScroll();
    });

    // --- MOBILE HAMBURGER MENU ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close menu when clicking navigation items on mobile devices
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // --- SCROLL ACTIVE LINK HIGHLIGHTING ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    function highlightNavOnScroll() {
        let scrollPosition = window.scrollY + 120; // offset

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < (section.offsetTop + section.offsetHeight)) {
                const currentId = section.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${currentId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // --- SKILLS PROGRESS BAR ANIMATION ---
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');
    let animated = false;

    function checkSkillsVisibility() {
        if (!skillsSection) return;
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight - 100;

        if (sectionPos < screenPos && !animated) {
            progressBars.forEach(bar => {
                const targetWidth = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            });
            animated = true;
        }
    }
    window.addEventListener('scroll', checkSkillsVisibility);
    checkSkillsVisibility(); // Initial check

    // --- TOAST NOTIFICATIONS PIPELINE ---
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = '<i class="fa-solid fa-circle-check" style="color: var(--success-color)"></i>';
        if (type === 'error') {
            icon = '<i class="fa-solid fa-circle-exclamation" style="color: var(--error-color)"></i>';
        }

        toast.innerHTML = `${icon} <span>${message}</span>`;
        toastContainer.appendChild(toast);

        // Clear notification item after 4 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    }

    // --- CV DOWNLOAD INTERACTION ---
    const downloadBtn = document.getElementById('download-cv-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            // Check if the actual file resource is placed in the local execution directory
            // The download attribute will take care of downloading. We inject a status toast.
            showToast('Starting direct secure download of Zainab Munawar\'s CV...', 'success');
        });
    }

    // --- FORM VALIDATION & HANDLING ---
    const contactForm = document.getElementById('portfolio-contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Intercept real document navigation submission
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;

            // Name Field Check
            if (nameInput.value.trim() === '') {
                nameInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('invalid');
            }

            // Email Regex Formatting Check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('invalid');
            }

            // Message Field Check
            if (messageInput.value.trim() === '') {
                messageInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                messageInput.parentElement.classList.remove('invalid');
            }

            if (isValid) {
                const btnText = document.getElementById('btn-text');
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                
                // UX Feedback processing state update
                submitBtn.style.pointerEvents = 'none';
                btnText.textContent = 'Sending Message...';

                // Simulate secure asynchronous external mail processor delivery
                setTimeout(() => {
                    showToast('Thank you! Your message has been sent successfully. I will get back to you shortly.', 'success');
                    contactForm.reset();
                    btnText.textContent = 'Send Message';
                    submitBtn.style.pointerEvents = 'auto';
                }, 1500);
            } else {
                showToast('Please correct validation errors on the form inputs.', 'error');
            }
        });

        // Clean validation error classes when user re-enters values into inputs
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    input.parentElement.classList.remove('invalid');
                }
            });
        });
    }
});