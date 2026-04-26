document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Scroll Reveal Animation using IntersectionObserver
    const scrollElements = document.querySelectorAll('.section-scroll');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    }

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Trigger once on load
    handleScrollAnimation();

    // Form submission to Formspree
    const form = document.getElementById('partnerForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            btn.textContent = 'Sending...';
            btn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const statusEl = document.getElementById('formStatus');
                    statusEl.textContent = "Thanks for reaching out! We'll be in touch shortly.";
                    statusEl.style.display = 'block';
                    form.reset();
                } else {
                    const statusEl = document.getElementById('formStatus');
                    statusEl.textContent = "Oops! There was a problem submitting your form.";
                    statusEl.style.color = "red";
                    statusEl.style.display = 'block';
                }
            } catch (error) {
                const statusEl = document.getElementById('formStatus');
                statusEl.textContent = "Oops! There was a problem submitting your form.";
                statusEl.style.color = "red";
                statusEl.style.display = 'block';
            } finally {
                btn.textContent = 'Sign Up';
                btn.disabled = false;
                
                // Hide success/error message after 5 seconds
                setTimeout(() => {
                    const statusEl = document.getElementById('formStatus');
                    statusEl.style.display = 'none';
                    statusEl.style.color = "var(--primary-green)"; // reset color
                }, 5000);
            }
        });
    }
});
