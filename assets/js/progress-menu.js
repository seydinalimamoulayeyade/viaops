/* ============================================================
   VIAOPS — progress-menu.js
   Progress actions menu (export, reset)
   ============================================================ */

const ProgressMenu = {
  init() {
    this.createButton();
    console.log('📊 Progress menu initialized');
  },

  createButton() {
    const btn = document.createElement('button');
    btn.id = 'progress-menu-btn';
    btn.className = 'progress-menu-btn';
    btn.setAttribute('aria-label', 'Menu progression');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'progress-menu');
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/></svg>';
    btn.title = 'Actions progression';

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Insert after theme toggle
    const navRight = document.querySelector('.nav-right');
    const themeToggle = document.getElementById('theme-toggle');
    if (navRight && themeToggle) {
      themeToggle.insertAdjacentElement('afterend', btn);
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const menu = document.getElementById('progress-menu');
      if (menu && !menu.contains(e.target)) {
        this.closeMenu();
      }
    });
  },

  toggleMenu() {
    let menu = document.getElementById('progress-menu');
    
    if (menu) {
      this.closeMenu();
      return;
    }

    const completed = Progress.count();
    const total = MODULES.length;
    const percent = Progress.percent();

    menu = document.createElement('div');
    menu.id = 'progress-menu';
    menu.className = 'progress-menu';
    menu.setAttribute('role', 'menu');
    menu.innerHTML = `
      <div class="progress-menu-header">
        <span class="progress-menu-title">Progression</span>
        <span class="progress-menu-stat">${completed}/${total} (${percent}%)</span>
      </div>
      <div class="progress-menu-divider"></div>
      <button type="button" class="progress-menu-item" id="progress-export" role="menuitem">
        <span class="menu-icon"><svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg></span>
        <span>Exporter (JSON)</span>
      </button>
      <button type="button" class="progress-menu-item" id="progress-share" role="menuitem">
        <span class="menu-icon"><svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/></svg></span>
        <span>Partager</span>
      </button>
      <div class="progress-menu-divider"></div>
      <button type="button" class="progress-menu-item danger" id="progress-reset" role="menuitem">
        <span class="menu-icon"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></span>
        <span>Réinitialiser</span>
      </button>
    `;

    menu.querySelector('#progress-export')
      ?.addEventListener('click', () => this.exportProgress());
    menu.querySelector('#progress-share')
      ?.addEventListener('click', () => this.shareProgress());
    menu.querySelector('#progress-reset')
      ?.addEventListener('click', () => this.resetProgress());

    const btn = document.getElementById('progress-menu-btn');
    if (btn) {
      btn.insertAdjacentElement('afterend', menu);
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      menu.querySelector('[role="menuitem"]')?.focus();
    }
  },

  closeMenu() {
    const menu = document.getElementById('progress-menu');
    const btn = document.getElementById('progress-menu-btn');
    
    if (menu) {
      menu.classList.add('closing');
      setTimeout(() => menu.remove(), 150);
    }
    
    if (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    }
  },

  exportProgress() {
    Progress.download();
    this.showToast('✓ Progression exportée');
    this.closeMenu();
  },

  shareProgress() {
    const completed = Progress.count();
    const percent = Progress.percent();
    const text = `J'ai complété ${completed}/${MODULES.length} modules ViaOps (${percent}%) ! 🚀\n\nviaops.dev`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Ma progression ViaOps',
        text: text,
      }).catch(() => {
        this.copyToClipboard(text);
      });
    } else {
      this.copyToClipboard(text);
    }
    
    this.closeMenu();
  },

  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast('✓ Copié dans le presse-papier');
    }).catch(() => {
      this.showToast('✕ Erreur de copie');
    });
  },

  resetProgress() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ? Cette action est irréversible.')) {
      Progress.reset();
      if (typeof Score !== 'undefined') Score.reset();
      updateAllProgress();
      Pipeline.build();
      Sidebar.build();
      this.showToast('✓ Progression réinitialisée');
      this.closeMenu();
      
      // Refresh current view
      if (Router.current === 'module') {
        ModuleView.render(State.currentModule);
      }
    }
  },

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'progress-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
};
