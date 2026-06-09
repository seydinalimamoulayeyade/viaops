/* ============================================================
   VIAOPS — scroll-to-top.js
   Scroll to top button with smooth behavior
   ============================================================ */

const ScrollToTop = {
  init() {
    this.createButton();
    this.attachListeners();
    console.log('⬆️ Scroll to top initialized');
  },

  createButton() {
    const btn = document.createElement('button');
    btn.id = 'scroll-to-top';
    btn.className = 'scroll-to-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);
  },

  attachListeners() {
    const btn = document.getElementById('scroll-to-top');
    if (!btn) return;

    // Show/hide based on scroll position
    const handleScroll = () => {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if (scrolled > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Scroll to top on click
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Initial check
    handleScroll();

    // Also check on view change
    const observer = new MutationObserver(() => {
      setTimeout(handleScroll, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }
};
