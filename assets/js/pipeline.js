/* ============================================================
   VIAOPS — pipeline.js
   Builds the GitLab CI-style pipeline on the home view
   ============================================================ */

const Pipeline = {
  getStatus(idx) {
    if (Progress.has(idx))           return 'passed';
    if (idx === State.currentModule) return 'running';
    return 'pending';
  },

  getStatusLabel(status) {
    return {
      passed:  '✓ passed',
      running: '▶ active',
      pending: '● pending',
    }[status];
  },

  buildJob(idx) {
    const m      = MODULES[idx];
    const status = this.getStatus(idx);
    const label  = this.getStatusLabel(status);

    const job = document.createElement('div');
    job.className = `job status-${status}`;
    job.innerHTML = `
      <span class="job-icon"><img src="assets/img/logos/${m.id}.svg" alt="${m.label}" loading="lazy" /></span>
      <div class="job-info">
        <div class="job-name">${m.label}</div>
        <div class="job-tag">${m.tag}</div>
      </div>
      <div class="job-status">
        <div class="status-dot"></div>
        <span>${label}</span>
      </div>
    `;
    job.addEventListener('click', () => {
      State.currentModule = idx;
      Router.show('module');
    });
    return job;
  },

  build() {
    const wrap = document.getElementById('pipeline-stages');
    if (!wrap) return;
    wrap.innerHTML = '';

    STAGES.forEach((stage, sIdx) => {
      const stageEl = document.createElement('div');
      stageEl.className = 'pipeline-stage';

      const lbl = document.createElement('div');
      lbl.className   = 'stage-label';
      lbl.textContent = stage.label;
      stageEl.appendChild(lbl);

      const jobs = document.createElement('div');
      jobs.className = 'stage-jobs';
      stage.jobs.forEach(idx => jobs.appendChild(this.buildJob(idx)));

      stageEl.appendChild(jobs);
      wrap.appendChild(stageEl);

      // Connecteur entre les stages (flux du pipeline)
      if (sIdx < STAGES.length - 1) {
        const conn = document.createElement('div');
        conn.className = 'stage-connector';
        // Coloré si tous les modules du stage sont complétés
        if (stage.jobs.every(j => Progress.has(j))) {
          conn.classList.add('done');
        }
        conn.innerHTML = '<span class="connector-line"></span><span class="connector-arrow">▸</span>';
        wrap.appendChild(conn);
      }
    });
  },
};
