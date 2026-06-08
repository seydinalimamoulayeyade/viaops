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
