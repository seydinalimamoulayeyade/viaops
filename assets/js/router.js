/* ============================================================
   VIAOPS — router.js
   Simple view router — no framework needed
   ============================================================ */

const Router = {
  current: 'home',

  show(name) {
    // Hide all views
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    // Remove active nav state
    document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));

    // Show target view
    const view = document.getElementById('view-' + name);
    if (view) view.classList.add('active');

    // Activate nav link
    const navLink = document.getElementById('nav-' + name);
    if (navLink) navLink.classList.add('active');

    this.current = name;

    // View-specific init
    if (name === 'module') {
      Sidebar.build();
      ModuleView.render(State.currentModule);
    }

    if (name === 'home') {
      Pipeline.build();
    }

    window.scrollTo(0, 0);
  },
};

/* ── APP STATE ──────────────────────────────────────────────── */
const State = {
  currentModule: 0,
};
