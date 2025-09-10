// Dark Mode Toggle Functionality

class DarkModeManager {
    constructor() {
        this.isDarkMode = false;
        this.elements = [];
        this.init();
    }

    init() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            this.isDarkMode = savedTheme === 'dark';
        } else if (prefersDark) {
            this.isDarkMode = true;
        }

        // Apply initial theme
        this.applyTheme();

        // Create toggle button
        this.createToggleButton();

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.isDarkMode = e.matches;
                this.applyTheme();
            }
        });
    }

    createToggleButton() {
        // Find existing dark mode toggle button
        const toggleButton = document.getElementById('dark-mode-toggle');

        if (toggleButton) {
            // Update existing button
            toggleButton.innerHTML = this.isDarkMode ?
                '<i class="fas fa-sun"></i>' :
                '<i class="fas fa-moon"></i>';
            toggleButton.setAttribute('title', this.isDarkMode ? 'التبديل للوضع العادي' : 'التبديل للوضع المظلم');

            // Add click event
            toggleButton.addEventListener('click', () => {
                this.toggle();
            });

            // Store reference
            this.toggleButton = toggleButton;
        } else {
            // Fallback: Create dark mode toggle button if not found
            const newToggleButton = document.createElement('button');
            newToggleButton.className = 'dark-mode-toggle';
            newToggleButton.innerHTML = this.isDarkMode ?
                '<i class="fas fa-sun"></i>' :
                '<i class="fas fa-moon"></i>';
            newToggleButton.setAttribute('aria-label', 'تبديل الوضع المظلم');
            newToggleButton.setAttribute('title', this.isDarkMode ? 'التبديل للوضع العادي' : 'التبديل للوضع المظلم');

            // Add click event
            newToggleButton.addEventListener('click', () => {
                this.toggle();
            });

            // Add to page
            document.body.appendChild(newToggleButton);

            // Store reference
            this.toggleButton = newToggleButton;
        }
    }

    toggle() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        this.saveTheme();
        this.updateToggleButton();

        // Animate the toggle
        this.animateToggle();
    }

    applyTheme() {
        const elementsToTheme = [
            document.documentElement,
            document.body,
            ...document.querySelectorAll('.header'),
            ...document.querySelectorAll('.nav-link'),
            ...document.querySelectorAll('.hero'),
            ...document.querySelectorAll('.hero-card'),
            ...document.querySelectorAll('.btn-primary'),
            ...document.querySelectorAll('.btn-secondary'),
            ...document.querySelectorAll('.card-button'),
            ...document.querySelectorAll('.counters'),
            ...document.querySelectorAll('.counters-header'),
            ...document.querySelectorAll('.counter-card'),
            ...document.querySelectorAll('.steps'),
            ...document.querySelectorAll('.step-card'),
            ...document.querySelectorAll('.motivation'),
            ...document.querySelectorAll('.cta'),
            ...document.querySelectorAll('.cta-form'),
            ...document.querySelectorAll('.option-card'),
            ...document.querySelectorAll('.contact'),
            ...document.querySelectorAll('.footer'),
            ...document.querySelectorAll('.feature'),
            ...document.querySelectorAll('.contact-method'),
            ...document.querySelectorAll('.footer-section')
        ];

        elementsToTheme.forEach(element => {
            if (element) {
                if (this.isDarkMode) {
                    element.setAttribute('data-theme', 'dark');
                } else {
                    element.removeAttribute('data-theme');
                }
            }
        });

        // Debug: Check counters section specifically
        const countersSection = document.querySelector('.counters');
        if (countersSection) {
            console.log('🔍 Counters section theme:', countersSection.getAttribute('data-theme'));
            const countersHeader = countersSection.querySelector('.counters-header h2');
            if (countersHeader) {
                console.log('🔍 Counters header element found:', countersHeader);
                console.log('🔍 Current color:', window.getComputedStyle(countersHeader).color);
            }
        }

        // Update CSS custom properties for smooth transitions
        if (this.isDarkMode) {
            document.documentElement.style.setProperty('--transition-theme', 'all 0.3s ease');
        } else {
            document.documentElement.style.setProperty('--transition-theme', 'all 0.3s ease');
        }
    }

    saveTheme() {
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }

    updateToggleButton() {
        if (this.toggleButton) {
            this.toggleButton.innerHTML = this.isDarkMode ?
                '<i class="fas fa-sun"></i>' :
                '<i class="fas fa-moon"></i>';
            this.toggleButton.setAttribute('title',
                this.isDarkMode ? 'التبديل للوضع العادي' : 'التبديل للوضع المظلم'
            );
        }
    }

    animateToggle() {
        // Add a nice animation when toggling
        if (this.toggleButton) {
            this.toggleButton.style.transform = 'scale(0.8) rotate(180deg)';
            setTimeout(() => {
                this.toggleButton.style.transform = 'scale(1) rotate(0deg)';
            }, 150);
        }

        // Add a subtle flash effect to indicate the change
        const flashOverlay = document.createElement('div');
        flashOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${this.isDarkMode ? '#0F172A' : '#FFFFFF'};
            opacity: 0.3;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(flashOverlay);

        setTimeout(() => {
            flashOverlay.style.opacity = '0';
        }, 50);

        setTimeout(() => {
            document.body.removeChild(flashOverlay);
        }, 300);
    }

    // Method to programmatically set theme
    setTheme(theme) {
        this.isDarkMode = theme === 'dark';
        this.applyTheme();
        this.saveTheme();
        this.updateToggleButton();
    }

    // Method to get current theme
    getTheme() {
        return this.isDarkMode ? 'dark' : 'light';
    }
}

// Initialize dark mode when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeManager = new DarkModeManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeManager;
}
