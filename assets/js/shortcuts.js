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
          // ESC : ferme d'abord les dialogues, sinon retourne à l'accueil
          if (!document.querySelector('.shortcuts-overlay, .cert-overlay')) {
            Router.show('home');
          }
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

        case 'p':
        case 'P':
          // P : Projet (parcours fil rouge)
          if (!e.ctrlKey && !e.metaKey) {
            Router.show('capstone');
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
      if (State.currentModule > 0) {
        ModuleView.render(State.currentModule - 1);
      }
    }
  },

  navigateNextModule() {
    const currentView = document.querySelector('.view.active');
    if (currentView && currentView.id === 'view-module') {
      if (State.currentModule < MODULES.length - 1) {
        ModuleView.render(State.currentModule + 1);
      }
    }
  },

  showHelp() {
    const helpHTML = `
      <div class="shortcuts-overlay" id="shortcuts-help">
        <div class="shortcuts-modal" role="dialog" aria-modal="true" aria-labelledby="shortcuts-title">
          <div class="shortcuts-header">
            <h3 id="shortcuts-title"><svg class="h3-ico" viewBox="0 0 24 24"><path d="m4 17 6-6-6-6"/><path d="M12 19h8"/></svg> Raccourcis clavier</h3>
            <button type="button" class="shortcuts-close" id="shortcuts-close" aria-label="Fermer l'aide">✕</button>
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
                  <kbd>P</kbd>
                  <span>Projet</span>
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
    this.lastFocused = document.activeElement;

    // Insert
    document.body.insertAdjacentHTML('beforeend', helpHTML);
    document.getElementById('shortcuts-close')
      ?.addEventListener('click', () => this.closeHelp());
    document.getElementById('shortcuts-close')?.focus();

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
      setTimeout(() => {
        help.remove();
        this.lastFocused?.focus();
      }, 200);
    }
  }
};
