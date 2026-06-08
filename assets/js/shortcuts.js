/* ============================================================
   VIAOPS — shortcuts.js
   Keyboard shortcuts for navigation
   ============================================================ */

const Shortcuts = {
  init() {
    document.addEventListener('keydown', (e) => {
      // Ignore if user is typing in input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch(e.key) {
        case 'Escape':
          // ESC : Return to home
          Router.show('home');
          break;

        case 'ArrowLeft':
          // ← : Previous module
          this.navigatePrevModule();
          break;

        case 'ArrowRight':
          // → : Next module
          this.navigateNextModule();
          break;

        case 'h':
        case 'H':
          // H : Home
          if (!e.ctrlKey && !e.metaKey) {
            Router.show('home');
          }
          break;

        case 'm':
        case 'M':
          // M : Modules
          if (!e.ctrlKey && !e.metaKey) {
            Router.show('module');
          }
          break;

        case 'a':
        case 'A':
          // A : About
          if (!e.ctrlKey && !e.metaKey) {
            Router.show('about');
          }
          break;

        case '?':
          // ? : Show shortcuts help
          this.showHelp();
          break;
      }
    });

    console.log('⌨️ Shortcuts initialized. Press ? for help');
  },

  navigatePrevModule() {
    const currentView = document.querySelector('.view.active');
    if (currentView && currentView.id === 'view-module') {
      const currentModuleId = window.currentModuleId || 0;
      const prevId = currentModuleId > 0 ? currentModuleId - 1 : MODULES.length - 1;
      ModuleView.load(prevId);
    }
  },

  navigateNextModule() {
    const currentView = document.querySelector('.view.active');
    if (currentView && currentView.id === 'view-module') {
      const currentModuleId = window.currentModuleId || 0;
      const nextId = currentModuleId < MODULES.length - 1 ? currentModuleId + 1 : 0;
      ModuleView.load(nextId);
    }
  },

  showHelp() {
    const helpHTML = `
      <div class="shortcuts-overlay" id="shortcuts-help">
        <div class="shortcuts-modal">
          <div class="shortcuts-header">
            <h3>⌨️ Raccourcis clavier</h3>
            <button class="shortcuts-close" onclick="Shortcuts.closeHelp()">✕</button>
          </div>
          <div class="shortcuts-body">
            <div class="shortcuts-section">
              <div class="shortcuts-label">Navigation</div>
              <div class="shortcuts-list">
                <div class="shortcut-item">
                  <kbd>H</kbd>
                  <span>Accueil</span>
                </div>
                <div class="shortcut-item">
                  <kbd>M</kbd>
                  <span>Modules</span>
                </div>
                <div class="shortcut-item">
                  <kbd>A</kbd>
                  <span>À propos</span>
                </div>
                <div class="shortcut-item">
                  <kbd>ESC</kbd>
                  <span>Retour accueil</span>
                </div>
              </div>
            </div>
            <div class="shortcuts-section">
              <div class="shortcuts-label">Modules</div>
              <div class="shortcuts-list">
                <div class="shortcut-item">
                  <kbd>←</kbd>
                  <span>Module précédent</span>
                </div>
                <div class="shortcut-item">
                  <kbd>→</kbd>
                  <span>Module suivant</span>
                </div>
              </div>
            </div>
            <div class="shortcuts-section">
              <div class="shortcuts-label">Aide</div>
              <div class="shortcuts-list">
                <div class="shortcut-item">
                  <kbd>?</kbd>
                  <span>Afficher cette aide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Remove existing if any
    const existing = document.getElementById('shortcuts-help');
    if (existing) existing.remove();

    // Insert
    document.body.insertAdjacentHTML('beforeend', helpHTML);

    // Close on overlay click
    document.getElementById('shortcuts-help').addEventListener('click', (e) => {
      if (e.target.classList.contains('shortcuts-overlay')) {
        this.closeHelp();
      }
    });

    // Close on ESC
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        this.closeHelp();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  },

  closeHelp() {
    const help = document.getElementById('shortcuts-help');
    if (help) {
      help.classList.add('closing');
      setTimeout(() => help.remove(), 200);
    }
  }
};
