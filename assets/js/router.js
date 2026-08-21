/* ============================================================
   VIAOPS — router.js
   Simple view router — no framework needed
   ============================================================ */

const Router = {
  current: 'home',

  show(name) {
    const view = document.getElementById(`view-${name}`);
    if (!view) return;

    document.querySelectorAll('.view').forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-hidden', 'true');
    });
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      item.removeAttribute('aria-current');
    });

    view.classList.add('active');
    view.setAttribute('aria-hidden', 'false');

    const navLink = document.getElementById(`nav-${name}`);
    if (navLink) {
      navLink.classList.add('active');
      navLink.setAttribute('aria-current', 'page');
    }

    this.current = name;

    if (name === 'module') {
      Sidebar.build();
      ModuleView.render(State.currentModule);
      ModuleSearch.init();
    } else if (name === 'home') {
      Pipeline.build();
    }

    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      const focusTarget = view.querySelector('h1, h2, main') || view;
      focusTarget.setAttribute('tabindex', '-1');
      focusTarget.focus({ preventScroll: true });
    });
  },
};

const State = {
  currentModule: 0,
};
