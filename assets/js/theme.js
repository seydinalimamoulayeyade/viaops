/* ============================================================
   VIAOPS — theme.js
   Dark/Light mode toggle
   ============================================================ */

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
    toggle.innerHTML = '<span class="theme-icon">🌙</span>';
    
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
      const icon = theme === 'light' ? '🌙' : '☀️';
      toggleBtn.querySelector('.theme-icon').textContent = icon;
    }

    if (animate) {
      setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 300);
    }
  }
};
