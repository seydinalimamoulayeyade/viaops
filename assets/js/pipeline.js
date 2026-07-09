/* ============================================================
   VIAOPS — pipeline.js
   Rail schématique "blueprint" de la Home (nœuds + fils annotés)
   ============================================================ */

const Pipeline = {
  getStatus(idx) {
    if (Progress.has(idx))           return 'passed';
    if (idx === State.currentModule) return 'running';
    return 'pending';
  },

  buildNode(idx) {
    const m      = MODULES[idx];
    const status = this.getStatus(idx);
    const ref    = String(idx + 1).padStart(2, '0');

    const node = document.createElement('div');
    node.className = `bp-node status-${status}`;
    node.innerHTML = `
      <span class="bp-ref">REF.${ref}</span>
      <div class="bp-cell">
        <img src="assets/img/logos/${m.id}.svg" alt="${m.label}" loading="lazy" />
        <span class="bp-st"></span>
      </div>
      <span class="bp-nm">${m.label}</span>
      <span class="bp-tg">${m.tag}</span>
    `;
    node.addEventListener('click', () => {
      State.currentModule = idx;
      Router.show('module');
    });
    return node;
  },

  build() {
    const rail = document.getElementById('pipeline-stages');
    if (!rail) return;
    rail.innerHTML = '';

    MODULES.forEach((m, idx) => {
      // Fil de liaison entre les nœuds (coloré si l'étape précédente est validée)
      if (idx > 0) {
        const wire = document.createElement('div');
        wire.className = 'bp-wire';
        if (Progress.has(idx - 1)) wire.classList.add('hot');
        rail.appendChild(wire);
      }
      rail.appendChild(this.buildNode(idx));
    });
  },
};
