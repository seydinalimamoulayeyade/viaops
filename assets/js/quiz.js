/* ============================================================
   VIAOPS — quiz.js
   Moteur de quiz de validation (multi-questions, scoré, rejouable).
   Se monte dans <div id="quiz-mount" data-module="..."></div>.
   Au succès (score >= passingScore), complète le module.
   ============================================================ */

const Quiz = {
  state: null,

  /* Point d'entrée appelé par ModuleView.loadContent() */
  mount(idx) {
    const m    = MODULES[idx];
    const data = (typeof QUIZZES !== 'undefined') ? QUIZZES[m.id] : null;

    // Pas de quiz centralisé pour ce module → fallback legacy (ancien bloc en dur)
    if (!data || !Array.isArray(data.questions) || !data.questions.length) {
      ModuleView.initLegacyQuiz();
      return;
    }

    // Cherche le point de montage explicite ; sinon convertit l'ancien bloc quiz.
    let mountEl = document.getElementById('quiz-mount');
    if (!mountEl) {
      const legacy = document.querySelector('.quiz-block');
      if (legacy) {
        mountEl = document.createElement('div');
        mountEl.id = 'quiz-mount';
        legacy.replaceWith(mountEl);
      }
    }
    if (!mountEl) { ModuleView.initLegacyQuiz(); return; }

    // La complétion se fait via le quiz → neutralise le bouton « Marquer comme vu ».
    this.neutralizeMarkDone(data.passingScore || 75);

    this.state = {
      idx,
      moduleId:     m.id,
      passingScore: data.passingScore || 75,
      questions:    data.questions,
      answers:      new Array(data.questions.length).fill(null), // index choisi
      current:      0,
    };

    this.renderQuestion();
  },

  renderQuestion() {
    const s      = this.state;
    const mount  = document.getElementById('quiz-mount');
    if (!mount) return;

    const q       = s.questions[s.current];
    const total   = s.questions.length;
    const num      = s.current + 1;
    const progPct  = Math.round((num - 1) / total * 100);

    mount.innerHTML = `
      <div class="quiz-block">
        <div class="quiz-progress">
          <div class="quiz-progress-info">
            <span class="quiz-label">// question ${num} / ${total}</span>
            <span class="quiz-best">${this.bestLabel()}</span>
          </div>
          <div
            class="quiz-progress-track"
            role="progressbar"
            aria-label="Progression du quiz"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="${progPct}"
          >
            <div class="quiz-progress-fill" style="width:${progPct}%"></div>
          </div>
        </div>

        <h3 class="quiz-question" tabindex="-1">${q.q}</h3>

        <div class="quiz-options" id="quiz-options">
          ${q.options.map((o, i) => `
            <button type="button" class="quiz-option" data-i="${i}" data-correct="${o.correct}">
              ${o.text}
            </button>
          `).join('')}
        </div>

        <div class="quiz-feedback" role="status" aria-live="polite"></div>

        <div class="quiz-actions" id="quiz-actions" hidden>
          <button type="button" class="btn-nav primary" id="quiz-next">
            ${s.current === total - 1 ? 'Voir le résultat →' : 'Question suivante →'}
          </button>
        </div>
      </div>
    `;

    const opts     = mount.querySelectorAll('.quiz-option');
    const feedback = mount.querySelector('.quiz-feedback');
    const actions  = mount.querySelector('#quiz-actions');
    mount.querySelector('.quiz-question')?.focus();

    opts.forEach(btn => {
      btn.addEventListener('click', () => {
        if (s.answers[s.current] !== null) return; // déjà répondu

        const chosen  = Number.parseInt(btn.dataset.i, 10);
        const correct = btn.dataset.correct === 'true';
        s.answers[s.current] = chosen;

        opts.forEach(o => {
          o.disabled = true;
          if (o.dataset.correct === 'true') o.classList.add('correct');
        });
        if (!correct) btn.classList.add('wrong');

        feedback.textContent = q.options[chosen].feedback;
        feedback.className   = `quiz-feedback show ${correct ? 'ok' : 'ko'}`;

        actions.hidden = false;
        mount.querySelector('#quiz-next')
          ?.addEventListener('click', () => this.nextQuestion());
      });
    });
  },

  nextQuestion() {
    const s = this.state;
    if (s.current < s.questions.length - 1) {
      s.current++;
      this.renderQuestion();
    } else {
      this.renderResult();
    }
  },

  renderResult() {
    const s     = this.state;
    const mount = document.getElementById('quiz-mount');
    if (!mount) return;

    const total   = s.questions.length;
    const correct = s.answers.reduce((acc, ans, i) => {
      if (ans === null) return acc;
      return acc + (s.questions[i].options[ans].correct ? 1 : 0);
    }, 0);
    const pct    = Math.round(correct / total * 100);
    const passed = pct >= s.passingScore;

    // Sauvegarde du meilleur score
    Score.set(s.moduleId, pct);

    // Complétion du module si réussi
    if (passed && !Progress.has(s.idx)) {
      ModuleView.markDone(s.idx);
    }

    mount.innerHTML = `
      <div class="quiz-block quiz-result ${passed ? 'passed' : 'failed'}" role="status" aria-live="polite" tabindex="-1">
        <div class="quiz-result-icon">${passed
          ? '<svg viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>'
          : '<svg viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>'}</div>
        <div class="quiz-result-score">${correct} / ${total}</div>
        <div class="quiz-result-pct">${pct}%</div>
        <div class="quiz-result-badge ${passed ? 'ok' : 'ko'}">
          ${passed ? '✓ Module validé' : `Seuil non atteint (${s.passingScore}% requis)`}
        </div>
        <div class="quiz-result-msg">
          ${passed
            ? 'Bravo ! Ce module est marqué comme complété.'
            : 'Pas encore — relis les concepts clés puis retente le quiz.'}
        </div>
        <div class="quiz-actions center">
          <button class="btn-nav" id="quiz-retry">↻ Rejouer le quiz</button>
        </div>
      </div>
    `;

    mount.querySelector('#quiz-retry')
      ?.addEventListener('click', () => this.mount(s.idx));
    mount.querySelector('.quiz-result')?.focus();

    updateAllProgress();
  },

  // Remplace le bouton legacy « Marquer comme vu » par un indice : la complétion passe par le quiz.
  neutralizeMarkDone(passing) {
    const row = document.querySelector('.mark-done-row');
    if (row) {
      row.className = 'mark-done-hint';
      row.innerHTML = `<span class="hint-ico"><svg viewBox="0 0 24 24"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/></svg></span><span>Réussis le <strong>quiz de validation</strong> (≥ ${passing}%) pour compléter ce module.</span>`;
    }
  },

  bestLabel() {
    if (typeof Score === 'undefined') return '';
    const best = Score.best(this.state.moduleId);
    return best > 0 ? `meilleur : ${best}%` : '';
  },
};
