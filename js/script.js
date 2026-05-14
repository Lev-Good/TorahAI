document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        try {
            lucide.createIcons();
        } catch (e) { console.error('Lucide error:', e); }
    }

    // 2. Scroll Reveal System
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements && revealElements.length > 0) {
        const checkReveal = () => {
            const triggerBottom = window.innerHeight * 0.85;
            revealElements.forEach(el => {
                if (!el) return;
                const boxTop = el.getBoundingClientRect().top;
                if (boxTop < triggerBottom) {
                    el.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', checkReveal);
        checkReveal();
    }

    // 3. Floating Navbar Styling
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const handleNavScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleNavScroll);
        handleNavScroll();
    }

    // 4. Glass Cards Glow Effect
    const cards = document.querySelectorAll('.glass-card');
    if (cards && cards.length > 0) {
        cards.forEach(card => {
            if (!card) return;
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // 5. Installation Steps Interactive System
    const stepCards = document.querySelectorAll('.step-card');
    const mockupSidebar = document.querySelector('.mockup-sidebar');
    
    const setActiveStep = (stepIndex) => {
        if (stepCards && stepCards.length > 0) {
            stepCards.forEach((card, idx) => {
                if (card) {
                    if (idx === stepIndex) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                }
            });
        }

        // Safe check for mockupSidebar to prevent crashes
        if (mockupSidebar) {
            if (stepIndex === 0) {
                mockupSidebar.style.opacity = '0.3';
                mockupSidebar.style.transform = 'scale(0.95)';
            } else if (stepIndex === 1) {
                mockupSidebar.style.opacity = '0.5';
                mockupSidebar.style.transform = 'scale(0.98)';
                mockupSidebar.style.borderColor = 'var(--accent-secondary)';
            } else if (stepIndex === 2) {
                mockupSidebar.style.opacity = '0.8';
                mockupSidebar.style.transform = 'scale(1)';
                mockupSidebar.style.borderColor = 'var(--accent-gold)';
            } else if (stepIndex === 3) {
                mockupSidebar.style.opacity = '1';
                mockupSidebar.style.transform = 'scale(1.02)';
                mockupSidebar.style.borderColor = 'var(--accent-primary)';
                mockupSidebar.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.4)';
            }
        }
    };

    if (stepCards && stepCards.length > 0) {
        stepCards.forEach((card, index) => {
            if (card) {
                card.addEventListener('click', () => setActiveStep(index));
            }
        });
        setActiveStep(0);
    }

    // 6. Active Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections && sections.length > 0 && navLinks && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollYPosition = window.scrollY || document.documentElement.scrollTop;
            
            sections.forEach(section => {
                if (!section) return;
                const sectionTop = section.offsetTop;
                if (scrollYPosition >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                if (!link) return;
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // 7. Light/Dark Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    if (themeToggleBtn && bodyElement) {
        const updateThemeState = (isLightMode) => {
            if (isLightMode) {
                bodyElement.classList.add('light-theme');
                themeToggleBtn.innerHTML = '<i data-lucide="moon"></i>';
                localStorage.setItem('torahai-theme', 'light');
            } else {
                bodyElement.classList.remove('light-theme');
                themeToggleBtn.innerHTML = '<i data-lucide="sun"></i>';
                localStorage.setItem('torahai-theme', 'dark');
            }
            
            if (typeof lucide !== 'undefined') {
                try { lucide.createIcons(); } catch(e){}
            }
        };

        const savedTheme = localStorage.getItem('torahai-theme');
        if (savedTheme === 'light') {
            updateThemeState(true);
        } else {
            updateThemeState(false);
        }

        themeToggleBtn.addEventListener('click', () => {
            const isCurrentlyLight = bodyElement.classList.contains('light-theme');
            updateThemeState(!isCurrentlyLight);
        });
    }

    // ==========================================
    // 8. Interactive Simulator Engine
    // ==========================================
    const demoTabs = document.querySelectorAll('.demo-tab');
    const simPageContent = document.getElementById('sim-page-content');
    const simSidebarContent = document.getElementById('sim-sidebar-content');

    if (demoTabs && demoTabs.length > 0 && simPageContent && simSidebarContent) {
        const demoStates = {
            proof: {
                docBefore: `אמר רב יהודה אמר רב: מאי דכתיב "בכל עת יהיו בגדיך לבנים ושמן על ראשך אל יחסר"? אלו בגדי כבוד שמתכבדין בהם. מעשה <span class="typo-underline" id="proof-typo">בראבי</span> אליעזר שקרא לתלמידו בשעת תפילה.`,
                docAfter: `אמר רב יהודה אמר רב: מאי דכתיב "בכל עת יהיו בגדיך לבנים ושמן על ראשך אל יחסר"? אלו בגדי כבוד שמתכבדין בהם. מעשה <span class="highlight-success">ברבי</span> אליעזר שקרא לתלמידו בשעת תפילה.`,
                sidebarInitial: `
                    <div class="sim-suggestion-card">
                        <div class="sim-card-tag">הגהה והחלפה</div>
                        <div class="sim-card-text">נמצאה שגיאת הקלדה אפשרית:</div>
                        <div style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: 0.5rem; background: rgba(239,68,68,0.1); padding: 4px; border-radius: 4px; text-decoration:line-through; direction:rtl;">בראבי</div>
                        <div style="font-size: 0.75rem; color: #4ade80; font-weight: bold; margin-bottom: 0.5rem; background: rgba(34,197,94,0.1); padding: 4px; border-radius: 4px; direction:rtl;">ברבי</div>
                        <button class="sim-btn-apply" id="sim-apply-btn"><i data-lucide="check" style="width: 12px;"></i> החל תיקון</button>
                    </div>
                `,
                sidebarSuccess: `
                    <div class="sim-suggestion-card" style="border-color: rgba(34,197,94,0.4); background: rgba(34,197,94,0.03);">
                        <div class="sim-card-tag" style="color: #4ade80;">בוצע בהצלחה!</div>
                        <div class="sim-card-text" style="margin-bottom: 0;">הטקסט עודכן בהצלחה במסמך הוורד. לא נמצאו שגיאות נוספות.</div>
                    </div>
                `
            },
            punct: {
                docBefore: `תנו רבנן שבעה דברים מכוסים מבני אדם אלו הן יום המיתה ויום הנחמה ועומק הדין ואין אדם יודע מה בלבו של חבירו ואין אדם יודע במה משתכר ומתי מלכות בית דוד תחזור ומתי מלכות הרשעה נופלת`,
                docAfter: `תנו רבנן: שבעה דברים מכוסים מבני אדם, אלו הן: יום המיתה, ויום הנחמה, ועומק הדין. ואין אדם יודע מה בלבו של חבירו, ואין אדם יודע במה משתכר, ומתי מלכות בית דוד תחזור, ומתי מלכות הרשעה נופלת.`,
                sidebarInitial: `
                    <div class="sim-suggestion-card">
                        <div class="sim-card-tag">פיסוק ועימוד</div>
                        <div class="sim-card-text">זוהה טקסט רציף ללא סימני פיסוק. המערכת יכולה להוסיף:</div>
                        <ul style="font-size: 0.65rem; color: var(--text-muted); padding-right: 1rem; margin-bottom: 0.5rem; direction:rtl;">
                            <li>• נקודתיים לאחר פתיחה</li>
                            <li>• פסיקים מפרידים ברשימה</li>
                            <li>• נקודות בסיום משפט</li>
                        </ul>
                        <button class="sim-btn-apply" id="sim-apply-btn"><i data-lucide="check" style="width: 12px;"></i> הוסף פיסוק</button>
                    </div>
                `,
                sidebarSuccess: `
                    <div class="sim-suggestion-card" style="border-color: rgba(34,197,94,0.4); background: rgba(34,197,94,0.03);">
                        <div class="sim-card-tag" style="color: #4ade80;">הושלם</div>
                        <div class="sim-card-text" style="margin-bottom: 0;">נוספו בהצלחה 6 סימני פיסוק לשיפור הקריאות.</div>
                    </div>
                `
            },
            source: {
                docBefore: `כך דרשה תורה כבד את אביך ואת אמך למען יאריכון ימיך. ושמרו בני ישראל את השבת לעשות את השבת לדורותם ברית עולם.`,
                docAfter: `כך דרשה תורה כבד את אביך ואת אמך למען יאריכון ימיך <span class="source-marker">(שמות כ, יא)</span>. ושמרו בני ישראל את השבת לעשות את השבת לדורותם ברית עולם <span class="source-marker">(שמות לא, טז)</span>.`,
                sidebarInitial: `
                    <div class="sim-suggestion-card">
                        <div class="sim-card-tag">איתור מקורות</div>
                        <div class="sim-card-text">נמצאו 2 ציטוטים ללא מקור:</div>
                        <div style="font-size: 0.65rem; color: var(--text-muted); margin-bottom: 0.5rem; direction:rtl; line-height:1.4;">
                            1. "כבד את אביך..."
                            <br>2. "ושמרו בני ישראל..."
                        </div>
                        <button class="sim-btn-apply" id="sim-apply-btn"><i data-lucide="plus" style="width: 12px;"></i> הוסף מראי מקומות</button>
                    </div>
                `,
                sidebarSuccess: `
                    <div class="sim-suggestion-card" style="border-color: rgba(34,197,94,0.4); background: rgba(34,197,94,0.03);">
                        <div class="sim-card-tag" style="color: #4ade80;">נמצאו מקורות</div>
                        <div class="sim-card-text" style="margin-bottom: 0;">2 מראי מקומות הוטמעו בהצלחה בתוך סוגריים במסמך.</div>
                    </div>
                `
            }
        };

        let currentDemo = 'proof';

        const loadDemo = (type) => {
            currentDemo = type;
            const state = demoStates[type];
            if (!state) return;
            
            demoTabs.forEach(tab => {
                if (tab) {
                    if (tab.getAttribute('data-demo') === type) {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                    }
                }
            });

            simPageContent.innerHTML = state.docBefore;
            simSidebarContent.innerHTML = state.sidebarInitial;
            if (typeof lucide !== 'undefined') {
                try { lucide.createIcons(); } catch(e){}
            }

            const applyBtn = document.getElementById('sim-apply-btn');
            if (applyBtn) {
                applyBtn.addEventListener('click', () => {
                    applyBtn.innerHTML = '<span class="animate-spin" style="display:inline-block; margin-left:4px;">↻</span> מנתח...';
                    applyBtn.disabled = true;
                    setTimeout(() => {
                        simPageContent.innerHTML = state.docAfter;
                        simSidebarContent.innerHTML = state.sidebarSuccess;
                        if (typeof lucide !== 'undefined') {
                            try { lucide.createIcons(); } catch(e){}
                        }
                    }, 1000);
                });
            }
        };

        demoTabs.forEach(tab => {
            if (tab) {
                tab.addEventListener('click', () => {
                    const type = tab.getAttribute('data-demo');
                    if (type && type !== currentDemo) {
                        loadDemo(type);
                    }
                });
            }
        });

        loadDemo('proof');
    }
});
