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

      const el = document.createElement('button');
      el.type = 'button';
      el.className = `sidebar-item ${statusClass} ${isActive ? 'active' : ''}`;
      el.id = `sb-${i}`;
      el.setAttribute('aria-label', `Ouvrir le module ${i + 1} : ${m.label}`);
      if (isActive) el.setAttribute('aria-current', 'step');
      el.innerHTML = `
        <span class="sidebar-ref">${String(i + 1).padStart(2, '0')}</span>
        <span class="sidebar-icon"><img src="assets/img/logos/${m.id}.svg" alt="" loading="lazy" /></span>
        <span class="sidebar-meta">
          <span class="sidebar-name">${m.label}</span>
          <span class="sidebar-time">${m.time} · ${m.tag}</span>
        </span>
        <span class="sidebar-status" aria-hidden="true">${checkContent}</span>
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
