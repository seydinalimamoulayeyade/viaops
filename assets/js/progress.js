/* ============================================================
   VIAOPS — progress.js
   Progress tracking via localStorage
   ============================================================ */

const STORAGE_KEY = 'viaops_completed_v1';

const Progress = {
  get() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },

  add(idx) {
    const current = this.get();
    if (!current.includes(idx)) {
      current.push(idx);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      
      // Check for certificate eligibility
      if (current.length === MODULES.length) {
        setTimeout(() => Certificate.check(), 500);
      }
    }
  },

  has(idx) {
    return this.get().includes(idx);
  },

  count() {
    return this.get().length;
  },
  
  getCompleted() {
    return this.count();
  },

  reset() {
    localStorage.removeItem(STORAGE_KEY);
  },

  percent() {
    return Math.round((this.count() / MODULES.length) * 100);
  },

  // Export progress as JSON
  export() {
    const completed = this.get();
    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      totalModules: MODULES.length,
      completedModules: completed.length,
      completedIds: completed.map(idx => MODULES[idx].id),
      percentComplete: this.percent(),
      modules: MODULES.map((m, idx) => ({
        id: m.id,
        label: m.label,
        completed: completed.includes(idx)
      }))
    };
    return JSON.stringify(data, null, 2);
  },

  // Download progress as JSON file
  download() {
    const data = this.export();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    link.download = `viaops-progress-${date}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }
};

/* Update all progress indicators across the UI */
function updateAllProgress() {
  const count = Progress.count();
  const total = MODULES.length;
  const pct   = (count / total) * 100;

  // Navbar
  const fill = document.getElementById('nav-prog-fill');
  const val  = document.getElementById('nav-prog-val');
  if (fill) fill.style.width  = pct + '%';
  if (val)  val.textContent   = `${count}/${total}`;

  // Sidebar footer
  const sfill = document.getElementById('sidebar-prog-fill');
  const sval  = document.getElementById('sidebar-prog-val');
  if (sfill) sfill.style.width = pct + '%';
  if (sval)  sval.textContent  = `${count}/${total}`;
}
