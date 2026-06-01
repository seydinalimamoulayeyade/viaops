/* ============================================================
   VIAOPS — modules.js
   Renders module content into #module-main
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

        <!-- Breadcrumbs -->
        <div class="module-crumbs">
          <span class="crumb" id="crumb-home">Accueil</span>
          <span class="crumb-sep">/</span>
          <span class="crumb">Modules</span>
          <span class="crumb-sep">/</span>
          <span class="crumb-active">${m.label}</span>
        </div>

        <!-- Sentry status bar -->
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

          <!-- Header panel -->
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
                <span class="panel-badge amber">fondamental</span>
              </div>
            </div>
          </div>

          <!-- Content placeholder — Phase 2 -->
          <div class="panel">
            <div class="panel-header">
              <span class="panel-header-icon">📄</span>
              <span class="panel-title">contenu du module</span>
              <span class="panel-badge amber">phase 2</span>
            </div>
            <div class="module-placeholder">
              <div class="placeholder-icon">${m.icon}</div>
              <div class="placeholder-title">Contenu en cours de rédaction</div>
              <div class="placeholder-sub">
                Le module <strong>${m.label}</strong> sera disponible en Phase 2.<br>
                Structure, navigation et design : opérationnels ✓
              </div>
              <button
                class="btn-mark"
                id="btn-mark-${idx}"
                ${isDone ? 'disabled' : ''}
              >
                ${isDone ? '✓ Module complété' : '✓ Marquer comme vu'}
              </button>
            </div>
          </div>

          <!-- Navigation -->
          <div class="mod-nav">
            <button class="btn-nav" id="btn-prev" ${idx === 0 ? 'disabled' : ''}>
              ← Précédent
            </button>
            <span class="mod-nav-center">${idx + 1} / ${MODULES.length}</span>
            <button class="btn-nav primary" id="btn-next"
              ${idx === MODULES.length - 1 ? 'disabled' : ''}>
              Suivant →
            </button>
          </div>

        </div>
      </div>
    `;

    // Event listeners
    document.getElementById('crumb-home')
      ?.addEventListener('click', () => Router.show('home'));

    document.getElementById(`btn-mark-${idx}`)
      ?.addEventListener('click', () => this.markDone(idx));

    document.getElementById('btn-prev')
      ?.addEventListener('click', () => this.prev());

    document.getElementById('btn-next')
      ?.addEventListener('click', () => this.next());

    Sidebar.build();
    updateAllProgress();
    main.scrollTop = 0;
  },

  markDone(idx) {
    Progress.add(idx);

    // Update mark button
    const btn = document.getElementById(`btn-mark-${idx}`);
    if (btn) { btn.textContent = '✓ Module complété'; btn.disabled = true; }

    // Update status badge
    const badge = document.getElementById('status-badge');
    if (badge) {
      badge.className   = 'panel-badge green';
      badge.textContent = 'passed';
    }

    // Update status bar
    const bar = document.querySelector('.status-bar');
    if (bar && !bar.classList.contains('success')) {
      bar.classList.replace('info', 'success');
      const span = document.createElement('span');
      span.style.cssText  = 'margin-left:auto;color:var(--passed);font-weight:600;';
      span.textContent    = '✓ complété';
      bar.appendChild(span);
    }

    Sidebar.build();
    Pipeline.build();
    updateAllProgress();
  },

  next() {
    if (State.currentModule < MODULES.length - 1) {
      this.render(State.currentModule + 1);
    }
  },

  prev() {
    if (State.currentModule > 0) {
      this.render(State.currentModule - 1);
    }
  },
};
