/* ============================================================
   VIAOPS — app.js
   Point d'entrée et branchement des contrôles statiques
   ============================================================ */

const routeButtons = {
  'logo-home': 'home',
  'nav-home': 'home',
  'nav-module': 'module',
  'nav-capstone': 'capstone',
  'nav-about': 'about',
  'btn-navbar-start': 'module',
  'btn-hero-start': 'module',
};

Object.entries(routeButtons).forEach(([id, route]) => {
  document.getElementById(id)?.addEventListener('click', () => Router.show(route));
});

document.getElementById('btn-home-next')?.addEventListener('click', event => {
  const moduleIndex = Number(event.currentTarget.dataset.moduleIndex);
  if (Number.isInteger(moduleIndex) && MODULES[moduleIndex]) {
    State.currentModule = moduleIndex;
  }
  Router.show('module');
});

document.getElementById('nav-help')?.addEventListener('click', () => Shortcuts.showHelp());
document.getElementById('btn-hero-scroll')?.addEventListener('click', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('pipeline-panel')?.scrollIntoView({
    behavior: reducedMotion ? 'auto' : 'smooth',
  });
});

Pipeline.build();
Capstone.render();
updateAllProgress();
ThemeManager.init();
Shortcuts.init();
ScrollToTop.init();
ProgressMenu.init();
