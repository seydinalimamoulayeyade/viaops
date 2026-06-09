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
    btn.innerHTML = '⋮';
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
    menu.innerHTML = `
      <div class="progress-menu-header">
        <span class="progress-menu-title">Progression</span>
        <span class="progress-menu-stat">${completed}/${total} (${percent}%)</span>
      </div>
      <div class="progress-menu-divider"></div>
      <button class="progress-menu-item" onclick="ProgressMenu.exportProgress()">
        <span class="menu-icon">💾</span>
        <span>Exporter (JSON)</span>
      </button>
      <button class="progress-menu-item" onclick="ProgressMenu.shareProgress()">
        <span class="menu-icon">📤</span>
        <span>Partager</span>
      </button>
      <div class="progress-menu-divider"></div>
      <button class="progress-menu-item danger" onclick="ProgressMenu.resetProgress()">
        <span class="menu-icon">🔄</span>
        <span>Réinitialiser</span>
      </button>
    `;

    const btn = document.getElementById('progress-menu-btn');
    if (btn) {
      btn.insertAdjacentElement('afterend', menu);
      btn.classList.add('active');
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
      this.showToast('❌ Erreur de copie');
    });
  },

  resetProgress() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ? Cette action est irréversible.')) {
      Progress.reset();
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
