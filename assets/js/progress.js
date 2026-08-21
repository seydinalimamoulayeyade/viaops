/* ============================================================
   VIAOPS — progress.js
   Progress tracking via localStorage
   ============================================================ */

const STORAGE_KEY = 'viaops_completed_v1';
const SCORE_KEY   = 'viaops_scores_v1';

function readStoredValue(key, fallback, validate) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const value = JSON.parse(raw);
    if (validate(value)) return value;
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[ViaOps] Stockage local invalide pour ${key}; réinitialisation.`, error);
    try { localStorage.removeItem(key); } catch { /* stockage indisponible */ }
  }
  return fallback;
}

function writeStoredValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[ViaOps] Impossible d'enregistrer ${key}.`, error);
  }
}

const Score = {
  getAll() {
    return readStoredValue(SCORE_KEY, {}, value => (
      value !== null && typeof value === 'object' && !Array.isArray(value)
    ));
  },

  best(id) {
    const score = Number(this.getAll()[id]);
    return Number.isFinite(score) && score >= 0 && score <= 100 ? score : 0;
  },

  set(id, pct) {
    const all = this.getAll();
    if (Number.isFinite(pct) && pct > this.best(id) && pct <= 100) {
      all[id] = pct;
      writeStoredValue(SCORE_KEY, all);
    }
  },

  reset() {
    try { localStorage.removeItem(SCORE_KEY); } catch { /* stockage indisponible */ }
  },
};

const Progress = {
  get() {
    const stored = readStoredValue(STORAGE_KEY, [], Array.isArray);
    return [...new Set(stored)].filter(idx => (
      Number.isInteger(idx) && idx >= 0 && idx < MODULES.length
    ));
  },

  add(idx) {
    if (!Number.isInteger(idx) || idx < 0 || idx >= MODULES.length) return;
    const current = this.get();
    if (!current.includes(idx)) {
      current.push(idx);
      writeStoredValue(STORAGE_KEY, current);
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
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* stockage indisponible */ }
  },

  percent() {
    return Math.round((this.count() / MODULES.length) * 100);
  },

  export() {
    const completed = this.get();
    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      totalModules: MODULES.length,
      completedModules: completed.length,
      completedIds: completed.map(idx => MODULES[idx].id),
      percentComplete: this.percent(),
      modules: MODULES.map((module, idx) => ({
        id: module.id,
        label: module.label,
        completed: completed.includes(idx),
      })),
    };
    return JSON.stringify(data, null, 2);
  },

  download() {
    const blob = new Blob([this.export()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    link.download = `viaops-progress-${date}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  },
};

function updateProgressBar(fill, value, count, total, pct) {
  if (fill) {
    fill.style.width = `${pct}%`;
    fill.parentElement?.setAttribute('aria-valuenow', String(Math.round(pct)));
    fill.parentElement?.setAttribute('aria-valuetext', `${count} modules sur ${total}`);
  }
  if (value) value.textContent = `${count}/${total}`;
}

function updateAllProgress() {
  const count = Progress.count();
  const total = MODULES.length;
  const pct = (count / total) * 100;

  updateProgressBar(
    document.getElementById('nav-prog-fill'),
    document.getElementById('nav-prog-val'),
    count, total, pct,
  );
  updateProgressBar(
    document.getElementById('sidebar-prog-fill'),
    document.getElementById('sidebar-prog-val'),
    count, total, pct,
  );
}
