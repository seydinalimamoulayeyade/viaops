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
    fill.value = pct;
    fill.textContent = `${Math.round(pct)} %`;
    fill.setAttribute('aria-valuetext', `${count} modules sur ${total}`);
  }
  if (value) value.textContent = `${count}/${total}`;
}

function updateHomeProgressBar(count, total, pct) {
  const countEl = document.getElementById('home-progress-count');
  const progress = document.getElementById('home-progress-fill');

  if (countEl) countEl.textContent = `${count}/${total}`;
  if (!progress) return;
  progress.value = pct;
  progress.textContent = `${pct} %`;
  progress.setAttribute('aria-valuetext', `${count} fondamentaux sur ${total}`);
}

function getRecommendedModuleIndex() {
  const currentIsAvailable = !MODULES[State.currentModule]?.bonus
    && !Progress.has(State.currentModule);
  if (currentIsAvailable) return State.currentModule;

  const nextIndex = MODULES.findIndex((module, index) => (
    !module.bonus && !Progress.has(index)
  ));
  if (nextIndex >= 0) return nextIndex;
  return MODULES.findIndex(module => module.bonus);
}

function getResumeTitle(count, total) {
  if (count === total) return 'Fondamentaux terminés';
  if (count > 0) return 'Continuez sur votre lancée';
  return 'Prêt à démarrer';
}

function updateHomeRecommendation(count, total, recommendedIndex) {
  const recommended = MODULES[recommendedIndex];
  const title = document.getElementById('home-next-title');
  const copy = document.getElementById('home-next-copy');
  const resumeTitle = document.getElementById('home-resume-title');
  const nextButton = document.getElementById('btn-home-next');

  if (resumeTitle) resumeTitle.textContent = getResumeTitle(count, total);
  if (!recommended) return;
  if (title) {
    title.textContent = `${String(recommendedIndex + 1).padStart(2, '0')} · ${recommended.label}`;
  }
  if (copy) {
    copy.textContent = count === total
      ? 'Prolongez le parcours avec GitOps et le déploiement continu.'
      : `${recommended.tag} · ${recommended.time}`;
  }
  if (nextButton) {
    const action = count > 0 ? 'Continuer' : 'Commencer';
    nextButton.dataset.moduleIndex = String(recommendedIndex);
    nextButton.textContent = count === total
      ? 'Explorer ArgoCD →'
      : `${action} ${recommended.label} →`;
  }
}

function updateHomeActions(count) {
  const heroButton = document.getElementById('btn-hero-start');
  const navButton = document.getElementById('btn-navbar-start');
  if (heroButton) heroButton.textContent = count > 0 ? 'Reprendre le parcours' : 'Démarrer le parcours';
  if (navButton) navButton.textContent = count > 0 ? 'Reprendre →' : 'Démarrer →';
}

function updateHomeProgress(count, total, pct) {
  updateHomeProgressBar(count, total, pct);
  updateHomeRecommendation(count, total, getRecommendedModuleIndex());
  updateHomeActions(count);
}

const DASHBOARD_PHASES = [
  { id: 'foundations', indices: [0, 1, 2, 3] },
  { id: 'infrastructure', indices: [4, 5] },
  { id: 'operations', indices: [6, 7, 8] },
];

function updateDashboardPhase(phase) {
  const completed = phase.indices.filter(index => Progress.has(index)).length;
  const total = phase.indices.length;
  const pct = Math.round((completed / total) * 100);
  const progress = document.getElementById(`home-phase-${phase.id}`);
  const value = document.getElementById(`home-phase-${phase.id}-value`);

  if (progress) {
    progress.value = pct;
    progress.textContent = `${pct} %`;
  }
  if (value) value.textContent = `${completed}/${total}`;
}

function updateDashboardScores(coreModules, completedCount) {
  const scores = coreModules
    .map(item => Score.best(item.module.id))
    .filter(score => score > 0);
  const average = scores.length > 0
    ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    : null;
  const averageEl = document.getElementById('home-score-average');
  const copy = document.getElementById('home-score-copy');
  const validated = document.getElementById('home-validated-count');

  if (averageEl) averageEl.textContent = average === null ? '—' : String(average);
  if (copy) {
    const plural = scores.length > 1 ? 's' : '';
    copy.textContent = scores.length > 0
      ? `${scores.length} quiz enregistré${plural} sur cet appareil.`
      : 'Terminez un premier quiz pour afficher votre moyenne.';
  }
  if (validated) validated.textContent = String(completedCount);
}

function updateDashboardInsights(coreModules, completedCount, total) {
  DASHBOARD_PHASES.forEach(updateDashboardPhase);
  updateDashboardScores(coreModules, completedCount);
  const projectStep = document.getElementById('home-project-step');
  if (projectStep) projectStep.textContent = `${completedCount}/${total} étapes`;
}

function updateAllProgress() {
  const coreModules = MODULES
    .map((module, index) => ({ module, index }))
    .filter(item => !item.module.bonus);
  const count = coreModules.filter(item => Progress.has(item.index)).length;
  const total = coreModules.length;
  const pct = Math.round((count / total) * 100);

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
  updateHomeProgress(count, total, pct);
  updateDashboardInsights(coreModules, count, total);
}
