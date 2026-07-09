/* ============================================================
   VIAOPS — content-polish.js
   Post-traitement du contenu de module chargé via fetch() :
   - remplace les emojis des en-têtes de section par des icônes SVG
   - met les titres de section en casse normale (fini le tout-minuscule)
   - nettoie le label des blocs "Analogie"
   Appelé par ModuleView.loadContent() après injection du HTML.
   ============================================================ */

const ICONS = {
  problem:   '<svg viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  concepts:  '<svg viewBox="0 0 24 24"><path d="M12 3 2 8l10 5 10-5-10-5Z"/><path d="m2 13 10 5 10-5"/></svg>',
  commands:  '<svg viewBox="0 0 24 24"><path d="m4 17 6-6-6-6"/><path d="M12 19h8"/></svg>',
  pipeline:  '<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M6 9v6"/><path d="M18 6a3 3 0 0 1 0 6H9"/></svg>',
  quiz:      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  interview: '<svg viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  idea:      '<svg viewBox="0 0 24 24"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/></svg>',
};

const ContentPolish = {
  // Détermine l'icône + le titre propre à partir du texte du titre brut.
  resolve(raw) {
    const t = raw.toLowerCase();
    if (t.includes('problème'))               return { icon: ICONS.problem,   title: 'Le problème' };
    if (t.includes('concept'))                return { icon: ICONS.concepts,  title: 'Concepts clés' };
    if (t.includes('commande'))               return { icon: ICONS.commands,  title: 'Commandes de référence' };
    if (t.includes('place dans le pipeline')) return { icon: ICONS.pipeline,  title: 'Place dans le pipeline' };
    if (t.includes('quiz'))                   return { icon: ICONS.quiz,      title: 'Quiz de validation' };
    if (t.includes('entretien'))              return { icon: ICONS.interview, title: 'En entretien' };
    return null;
  },

  apply() {
    const zone = document.getElementById('module-body-content');
    if (!zone) return;

    // En-têtes de section
    zone.querySelectorAll('.panel-header').forEach(header => {
      const titleEl = header.querySelector('.panel-title');
      const iconEl  = header.querySelector('.panel-header-icon');
      if (!titleEl) return;

      const match = this.resolve(titleEl.textContent);
      if (!match) return;

      // Retire l'ancien préfixe numéroté "0X · " et applique le titre propre
      titleEl.textContent = match.title;
      if (iconEl) iconEl.innerHTML = match.icon;
    });

    // Label des blocs "Analogie" (💡 Analogie → icône + texte)
    zone.querySelectorAll('.analogy-label').forEach(label => {
      if (label.textContent.toLowerCase().includes('analogie')) {
        label.innerHTML = `${ICONS.idea}<span>Analogie</span>`;
        label.classList.add('has-icon');
      }
    });
  },
};
