/* ============================================================
   VIAOPS — theme.js
   Dark/Light mode toggle
   ============================================================ */

const THEME_ICONS = {
  moon: '<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  sun:  '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></svg>',
};

const ThemeManager = {
  init() {
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('viaops-theme') || 'dark';
    this.setTheme(savedTheme, false);

    // Create toggle button
    this.createToggle();

    console.log('🎨 Theme manager initialized:', savedTheme);
  },

  createToggle() {
    const toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle theme');
    toggle.innerHTML = `<span class="theme-icon">${THEME_ICONS.moon}</span>`;
    
    toggle.addEventListener('click', () => this.toggle());

    // Insert in navbar right section
    const navRight = document.querySelector('.nav-right');
    if (navRight) {
      navRight.insertBefore(toggle, navRight.firstChild);
    }
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    this.setTheme(next, true);
  },

  setTheme(theme, animate = true) {
    const root = document.documentElement;
    
    if (animate) {
      root.classList.add('theme-transitioning');
    }

    root.setAttribute('data-theme', theme);
    localStorage.setItem('viaops-theme', theme);

    // Update toggle icon
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      const icon = theme === 'light' ? THEME_ICONS.moon : THEME_ICONS.sun;
      toggleBtn.querySelector('.theme-icon').innerHTML = icon;
    }

    if (animate) {
      setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 300);
    }
  }
};
