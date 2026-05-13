document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Scroll Reveal System
    const revealElements = document.querySelectorAll('.reveal');
    
    const checkReveal = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Trigger initial check

    // 3. Floating Navbar Styling
    const navbar = document.querySelector('.navbar');
    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    // 4. Glass Cards Glow Effect (Mouse Move Tracking)
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 5. Installation Steps Interactive System
    const stepCards = document.querySelectorAll('.step-card');
    const mockupLines = document.querySelectorAll('.mockup-line');
    const mockupSidebar = document.querySelector('.mockup-sidebar');
    
    const setActiveStep = (stepIndex) => {
        stepCards.forEach((card, idx) => {
            if (idx === stepIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Modify Mockup state based on index
        if (stepIndex === 0) {
            // Step 1: Download Manifest/Bridge
            mockupSidebar.style.opacity = '0.3';
            mockupSidebar.style.transform = 'scale(0.95)';
        } else if (stepIndex === 1) {
            // Step 2: Run Local Bridge
            mockupSidebar.style.opacity = '0.5';
            mockupSidebar.style.transform = 'scale(0.98)';
            mockupSidebar.style.borderColor = 'var(--accent-secondary)';
        } else if (stepIndex === 2) {
            // Step 3: Trust Center settings
            mockupSidebar.style.opacity = '0.8';
            mockupSidebar.style.transform = 'scale(1)';
            mockupSidebar.style.borderColor = 'var(--accent-gold)';
        } else if (stepIndex === 3) {
            // Step 4: Enjoy inside Word
            mockupSidebar.style.opacity = '1';
            mockupSidebar.style.transform = 'scale(1.02)';
            mockupSidebar.style.borderColor = 'var(--accent-primary)';
            mockupSidebar.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.4)';
        }
    };

    stepCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            setActiveStep(index);
        });
        
        // Let's auto-rotate slowly unless user interacts? Just manual interaction is fine.
    });
    
    // Set default
    setActiveStep(0);

    // 6. Active Link on Scroll (Tying navbar to sections)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
