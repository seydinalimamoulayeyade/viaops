/* ============================================================
   VIAOPS — capstone.js
   Rend le parcours fil rouge « De zéro à la prod » (vue Projet).
   ============================================================ */

const Capstone = {
  esc(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
  },

  logo(id, label) {
    return `<img src="assets/img/logos/${id}.svg" alt="${this.esc(label)}" loading="lazy" />`;
  },

  flowShort(tool) {
    const map = {
      devops: 'Source', docker: 'Docker', jenkins: 'Jenkins', sonarqube: 'Sonar',
      trivy: 'Trivy', terraform: 'Terraform', kubernetes: 'K8s', argocd: 'ArgoCD',
      prometheus: 'Prometheus', 'ia-devops': 'IA/Ops',
    };
    return map[tool] || tool;
  },

  render() {
    const main = document.getElementById('capstone-main');
    if (!main || typeof CAPSTONE === 'undefined') return;

    const flow = CAPSTONE.steps.map((s, i) => `
      ${i > 0 ? '<span class="cap-arrow">→</span>' : ''}
      <span class="cap-flow-node" title="${this.esc(s.title)}">
        <span class="cap-flow-tile">${this.logo(s.tool, s.title)}</span>
        <span class="cap-flow-lbl">${this.esc(this.flowShort(s.tool))}</span>
      </span>
    `).join('');

    const stations = CAPSTONE.steps.map(s => `
      <div class="cap-step">
        <div class="cap-step-side">
          <span class="cap-step-ref">${s.ref}</span>
          <span class="cap-step-logo">${this.logo(s.tool, s.title)}</span>
        </div>
        <div class="cap-step-body">
          <div class="cap-step-head">
            <h3>${this.esc(s.title)}</h3>
            <button class="cap-step-link" data-mod="${s.moduleIdx}">Ouvrir le module →</button>
          </div>
          <p class="cap-step-desc">${this.esc(s.desc)}</p>
          <div class="cap-code">
            <div class="cap-code-head">${this.esc(s.lang)}</div>
            <pre>${this.esc(s.code)}</pre>
          </div>
        </div>
      </div>
    `).join('');

    const t = CAPSTONE.transversal;

    main.innerHTML = `
      <div class="bp-home animate">

        <!-- HERO -->
        <section class="cap-hero">
          <div class="bp-eyebrow">// projet fil rouge</div>
          <h1 class="bp-h1">De zéro <span class="cy">à la prod</span></h1>
          <p class="bp-lead">
            Un seul scénario qui relie les 10 modules : déployer
            <strong>${this.esc(CAPSTONE.app.name)}</strong> (${this.esc(CAPSTONE.app.stack)})
            à travers un pipeline CI/CD complet, du <code>git push</code> à la production observée.
          </p>
          <a class="cap-repo" href="${this.esc(CAPSTONE.app.repo)}" target="_blank" rel="noopener">
            <span class="cap-repo-k">REPO</span>
            <span class="cap-repo-v">${this.esc(CAPSTONE.app.repo.replace('https://', ''))}</span>
          </a>
        </section>

        <!-- FLUX -->
        <div class="bp-sheet-tag">Flux CI/CD complet</div>
        <section class="cap-flow">${flow}</section>

        <!-- STATIONS -->
        <div class="bp-sheet-tag">Étapes du déploiement</div>
        <section class="cap-steps">${stations}</section>

        <!-- TRANSVERSAL -->
        <section class="cap-transversal">
          <span class="cap-step-logo">${this.logo(t.tool, t.title)}</span>
          <div>
            <h3>${this.esc(t.title)}</h3>
            <p>${this.esc(t.desc)}</p>
            <button class="cap-step-link" data-mod="${t.moduleIdx}">Ouvrir le module →</button>
          </div>
        </section>

      </div>
    `;

    // Liens vers les modules
    main.querySelectorAll('.cap-step-link').forEach(btn => {
      btn.addEventListener('click', () => {
        State.currentModule = Number.parseInt(btn.dataset.mod, 10);
        Router.show('module');
      });
    });
  },
};
