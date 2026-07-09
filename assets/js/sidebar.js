/* ============================================================
   VIAOPS — sidebar.js
   Builds and refreshes the module sidebar
   ============================================================ */

const Sidebar = {
  getStatusClass(idx) {
    if (Progress.has(idx))           return 's-passed';
    if (idx === State.currentModule) return 's-running';
    return '';
  },

  getCheckContent(idx) {
    if (Progress.has(idx))           return '✓';
    if (idx === State.currentModule) return '▶';
    return '';
  },

  build() {
    const list = document.getElementById('sidebar-list');
    if (!list) return;
    list.innerHTML = '';

    MODULES.forEach((m, i) => {
      const statusClass   = this.getStatusClass(i);
      const checkContent  = this.getCheckContent(i);
      const isActive      = i === State.currentModule;

      const el = document.createElement('div');
      el.className = `sidebar-item ${statusClass} ${isActive ? 'active' : ''}`;
      el.id        = `sb-${i}`;
      el.innerHTML = `
        <span class="sidebar-icon"><img src="assets/img/logos/${m.id}.svg" alt="${m.label}" loading="lazy" /></span>
        <div class="sidebar-meta">
          <div class="sidebar-name">${m.label}</div>
          <div class="sidebar-time">${m.time} · ${m.tag}</div>
        </div>
        <div class="sidebar-status">${checkContent}</div>
      `;
      el.addEventListener('click', () => {
        State.currentModule = i;
        ModuleView.render(i);
      });
      list.appendChild(el);
    });

    updateAllProgress();
  },
};
