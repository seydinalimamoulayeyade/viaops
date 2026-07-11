/* ============================================================
   VIAOPS — search.js
   Module search functionality in sidebar
   ============================================================ */

const ModuleSearch = {
  init() {
    this.createSearchInput();
    console.log('🔍 Module search initialized');
  },

  createSearchInput() {
    const sidebar = document.querySelector('.module-sidebar');
    if (!sidebar) return;

    // Éviter les doublons : ne rien faire si la barre existe déjà
    if (sidebar.querySelector('.module-search')) return;

    const searchHTML = `
      <div class="module-search">
        <input 
          type="text" 
          id="module-search-input" 
          class="module-search-input" 
          placeholder="Rechercher un module..."
          autocomplete="off"
        />
        <span class="search-icon"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></span>
      </div>
    `;

    const label = sidebar.querySelector('.sidebar-section-label');
    if (label) {
      label.insertAdjacentHTML('afterend', searchHTML);
      this.attachListeners();
    }
  },

  attachListeners() {
    const input = document.getElementById('module-search-input');
    if (!input) return;

    input.addEventListener('input', (e) => {
      this.filterModules(e.target.value.toLowerCase().trim());
    });

    // Clear on ESC
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        input.value = '';
        this.filterModules('');
        input.blur();
      }
    });
  },

  filterModules(query) {
    const items = document.querySelectorAll('.sidebar-item');
    let visibleCount = 0;

    items.forEach((item, idx) => {
      const module = MODULES[idx];
      const searchText = `${module.label} ${module.tag} ${module.stage}`.toLowerCase();
      const matches = !query || searchText.includes(query);

      if (matches) {
        item.style.display = 'flex';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    // Show "no results" message if needed
    this.updateNoResults(visibleCount === 0, query);
  },

  updateNoResults(show, query) {
    let noResults = document.getElementById('search-no-results');

    if (show && query) {
      if (!noResults) {
        noResults = document.createElement('div');
        noResults.id = 'search-no-results';
        noResults.className = 'search-no-results';
        noResults.innerHTML = `
          <div class="no-results-icon"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div>
          <div class="no-results-text">Aucun module trouvé</div>
        `;
        const list = document.getElementById('sidebar-list');
        if (list) list.appendChild(noResults);
      }
    } else {
      if (noResults) noResults.remove();
    }
  }
};
