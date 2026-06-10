/* ============================================================
   VIAOPS — modules.js
   Renders module content — loads from modules/*.html via fetch
   ============================================================ */

const ModuleView = {

  render(idx) {
    State.currentModule = idx;
    const m      = MODULES[idx];
    const isDone = Progress.has(idx);
    const main   = document.getElementById('module-main');
    if (!main) return;

    main.innerHTML = `
      <div class="animate">

        <div class="module-crumbs">
          <span class="crumb" id="crumb-home">Accueil</span>
          <span class="crumb-sep">/</span>
          <span class="crumb">Modules</span>
          <span class="crumb-sep">/</span>
          <span class="crumb-active">${m.label}</span>
        </div>

        <div class="status-bar ${isDone ? 'success' : 'info'}">
          <span>⚙️</span>
          <span>
            Module <strong>${String(idx + 1).padStart(2, '0')}</strong>
            · ${m.label}
            · Stage : <strong>${m.stage}</strong>
            · ${m.time}
          </span>
          ${isDone
            ? '<span style="margin-left:auto;color:var(--passed);font-weight:600;">✓ complété</span>'
            : ''}
        </div>

        <div class="module-panels">

          <div class="panel mod-header-panel">
            <div class="panel-header">
              <span class="panel-header-icon">${m.icon}</span>
              <span class="panel-title">module · ${m.label.toLowerCase()}</span>
              <div class="panel-actions">
                <span class="panel-badge violet">${m.tag}</span>
                <span class="panel-badge ${isDone ? 'green' : 'amber'}" id="status-badge">
                  ${isDone ? 'passed' : 'pending'}
                </span>
              </div>
            </div>
            <div class="panel-body">
              <div class="mod-num">
                // module ${String(idx + 1).padStart(2, '0')} of ${MODULES.length} · viaops pipeline
              </div>
              <h2 class="mod-title">
                ${m.icon} <span class="accent">${m.label}</span>
              </h2>
              <div class="mod-tags">
                <span class="panel-badge cyan">⏱ ${m.time}</span>
                <span class="panel-badge violet">${m.tag}</span>
                <span class="panel-badge ${m.bonus ? 'green' : 'amber'}">${m.bonus ? 'bonus' : 'fondamental'}</span>
              </div>
            </div>
          </div>

          <div id="module-body-content">
            <div class="module-loading">
              <div class="loading-bar"></div>
              <span>Chargement...</span>
            </div>
          </div>

          <div class="mod-nav">
            <button class="btn-nav" id="btn-prev"
              ${idx === 0 ? 'disabled' : ''}>← Précédent</button>
            <span class="mod-nav-center">${idx + 1} / ${MODULES.length}</span>
            <button class="btn-nav primary" id="btn-next"
              ${idx === MODULES.length - 1 ? 'disabled' : ''}>Suivant →</button>
          </div>

        </div>
      </div>
    `;

    document.getElementById('crumb-home')
      ?.addEventListener('click', () => Router.show('home'));
    document.getElementById('btn-prev')
      ?.addEventListener('click', () => this.prev());
    document.getElementById('btn-next')
      ?.addEventListener('click', () => this.next());

    this.loadContent(idx);
    Sidebar.build();
    updateAllProgress();
    main.scrollTop = 0;
  },

  async loadContent(idx) {
    const m    = MODULES[idx];
    const zone = document.getElementById('module-body-content');
    if (!zone) return;

    // Chemin relatif depuis la racine du site
    const url  = `modules/${m.id}.html`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      zone.innerHTML = html;
      this.initQuiz();
      this.initMarkDone(idx);
    } catch (e) {
      console.error(`[ViaOps] Impossible de charger modules/${m.id}.html`, e);
      zone.innerHTML = this.placeholder(m, idx);
      document.getElementById(`btn-mark-${idx}`)
        ?.addEventListener('click', () => this.markDone(idx));
    }
  },

  placeholder(m, idx) {
    return `
      <div class="panel">
        <div class="panel-header">
          <span class="panel-header-icon">📄</span>
          <span class="panel-title">contenu du module</span>
          <span class="panel-badge amber">à venir</span>
        </div>
        <div class="module-placeholder">
          <div class="placeholder-icon">${m.icon}</div>
          <div class="placeholder-title">Contenu en cours de rédaction</div>
          <div class="placeholder-sub">
            Le module <strong>${m.label}</strong> arrive bientôt.
          </div>
          <button class="btn-mark" id="btn-mark-${idx}"
            ${Progress.has(idx) ? 'disabled' : ''}>
            ${Progress.has(idx) ? '✓ Module complété' : '✓ Marquer comme vu'}
          </button>
        </div>
      </div>
    `;
  },

  initMarkDone(idx) {
    if (Progress.has(idx)) {
      const btn = document.getElementById(`btn-mark-${idx}`);
      if (btn) { btn.textContent = '✓ Module complété'; btn.disabled = true; }
    }
    document.getElementById(`btn-mark-${idx}`)
      ?.addEventListener('click', () => this.markDone(idx));
  },

  initQuiz() {
    document.querySelectorAll('.quiz-block').forEach(block => {
      block.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
          if (block.dataset.answered) return;
          block.dataset.answered = 'true';

          const correct  = btn.dataset.correct === 'true';
          const feedback = block.querySelector('.quiz-feedback');

          block.querySelectorAll('.quiz-option').forEach(o => {
            o.disabled = true;
            if (o.dataset.correct === 'true') o.classList.add('correct');
          });

          if (!correct) btn.classList.add('wrong');
          if (feedback) {
            feedback.textContent = btn.dataset.feedback;
            feedback.className   = `quiz-feedback show ${correct ? 'ok' : 'ko'}`;
          }
        });
      });
    });
  },

  markDone(idx) {
    Progress.add(idx);

    const btn = document.getElementById(`btn-mark-${idx}`);
    if (btn) { btn.textContent = '✓ Module complété'; btn.disabled = true; }

    const badge = document.getElementById('status-badge');
    if (badge) { badge.className = 'panel-badge green'; badge.textContent = 'passed'; }

    const bar = document.querySelector('.status-bar');
    if (bar && !bar.classList.contains('success')) {
      bar.classList.replace('info', 'success');
      const s = document.createElement('span');
      s.style.cssText = 'margin-left:auto;color:var(--passed);font-weight:600;';
      s.textContent   = '✓ complété';
      bar.appendChild(s);
    }

    Sidebar.build();
    Pipeline.build();
    updateAllProgress();

    // Trigger certificate check when all CORE modules completed (exclude bonus)
    const coreModules = MODULES.filter(m => !m.bonus);
    const coreCompleted = coreModules.filter((_, idx) => Progress.has(idx));
    if (coreCompleted.length === coreModules.length) {
      setTimeout(() => Certificate.check(), 500);
    }
  },

  next() {
    if (State.currentModule < MODULES.length - 1)
      this.render(State.currentModule + 1);
  },

  prev() {
    if (State.currentModule > 0)
      this.render(State.currentModule - 1);
  },
};