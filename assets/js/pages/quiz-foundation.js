/**
 * EnglishPath — Quiz Foundation Page
 * Fase 7 — v0.8.0
 * IIFE module pattern
 */

(function QuizFoundationPage() {
  'use strict';

  Router.guard();
  App.init('foundation-quiz');

  const user = Auth.getActiveUser();
  const STORAGE_KEY = 'quiz_foundation';

  // ── State ─────────────────────────────────────────────────
  let currentSetId  = null;
  let questions     = [];
  let qIndex        = 0;
  let qScore        = 0;
  let qAnswered     = false;

  // ── Storage helpers ───────────────────────────────────────
  function loadStats() {
    if (!user) return getDefaultStats();
    return Storage.getUser(user.id, STORAGE_KEY, getDefaultStats());
  }

  function saveStats(data) {
    if (!user) return;
    Storage.setUser(user.id, STORAGE_KEY, data);
  }

  function getDefaultStats() {
    return {
      setResults: {},   // { setId: { best, attempts, lastScore } }
      totalXP:    0,
      attempts:   0,
    };
  }

  // ── Stats Bar ─────────────────────────────────────────────
  function renderStatsBar() {
    const stats    = loadStats();
    const sets     = QUIZ_FOUNDATION_DATA.getSets();
    const done     = sets.filter(s => {
      const r = stats.setResults[s.id];
      return r && r.best >= 7;
    }).length;

    document.getElementById('stat-sets-done').textContent  = done;
    document.getElementById('stat-attempts').textContent   = stats.attempts || 0;
    document.getElementById('stat-total-xp').textContent   = stats.totalXP || 0;
    document.getElementById('hdr-sets-done').textContent   = `${done} paket selesai`;

    const allBests = Object.values(stats.setResults).map(r => r.best || 0);
    const globalBest = allBests.length ? Math.max(...allBests) : null;
    document.getElementById('stat-best-score').textContent = globalBest !== null ? `${globalBest}/10` : '—';
  }

  // ── Sets Grid ─────────────────────────────────────────────
  function renderSetsGrid() {
    const stats = loadStats();
    const sets  = QUIZ_FOUNDATION_DATA.getSets();
    const grid  = document.getElementById('sets-grid');

    grid.innerHTML = sets.map(s => {
      const r    = stats.setResults[s.id];
      const best = r ? r.best : 0;
      const done = best >= 7;
      const pct  = Math.round((best / s.questions.length) * 100);

      return `
        <div class="set-card ${done ? 'completed' : ''}" data-set-id="${s.id}">
          <div class="set-card-top">
            <div class="set-icon">${s.icon}</div>
            <div class="set-info">
              <h3>${escapeHTML(s.title)}</h3>
              <p>${escapeHTML(s.desc)}</p>
            </div>
          </div>
          <div class="set-meta">
            <span class="set-level-badge">${escapeHTML(s.level)}</span>
            <span class="set-score-badge ${done ? 'done' : ''}">
              ${r ? `${best}/${s.questions.length}` : `0/${s.questions.length}`}
              ${done ? ' ✅' : ''}
            </span>
          </div>
          <div class="set-progress-bar">
            <div class="set-progress-fill" style="width:${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.set-card').forEach(el => {
      el.addEventListener('click', () => openSet(el.dataset.setId));
    });
  }

  // ── Open Set ──────────────────────────────────────────────
  function openSet(setId) {
    const set = QUIZ_FOUNDATION_DATA.getSet(setId);
    if (!set) return;

    currentSetId = setId;

    // Update start screen
    document.getElementById('qf-start-icon').textContent  = set.icon;
    document.getElementById('qf-start-title').textContent = set.title;
    document.getElementById('qf-start-desc').textContent  = set.desc;

    // Show previous score
    const stats = loadStats();
    const prev  = stats.setResults[setId];
    const prevEl = document.getElementById('qf-start-prev');
    if (prev) {
      prevEl.style.display = '';
      document.getElementById('qf-start-prev-score').textContent = `${prev.best}/${set.questions.length} (${Math.round((prev.best/set.questions.length)*100)}%)`;
    } else {
      prevEl.style.display = 'none';
    }

    // Show quiz view with start screen
    document.getElementById('sets-view').style.display = 'none';
    document.getElementById('quiz-view').classList.add('active');
    document.getElementById('qf-start-screen').style.display   = '';
    document.getElementById('qf-question-screen').classList.remove('active');
    document.getElementById('qf-result-screen').classList.remove('active');

    // Challenge tracking
    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onModuleVisit('quiz');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Start Quiz ────────────────────────────────────────────
  function startQuiz() {
    const set = QUIZ_FOUNDATION_DATA.getSet(currentSetId);
    if (!set) return;

    questions = shuffle([...set.questions]);
    qIndex    = 0;
    qScore    = 0;
    qAnswered = false;

    document.getElementById('qf-start-screen').style.display   = 'none';
    document.getElementById('qf-question-screen').classList.add('active');
    document.getElementById('qf-result-screen').classList.remove('active');

    renderQuestion();
  }

  // ── Render Question ───────────────────────────────────────
  function renderQuestion() {
    qAnswered = false;
    const q   = questions[qIndex];
    const tot = questions.length;

    // Progress
    document.getElementById('qf-progress-text').textContent = `Soal ${qIndex + 1} dari ${tot}`;
    document.getElementById('qf-score-text').textContent    = `Benar: ${qScore}`;
    document.getElementById('qf-progress-fill').style.width = `${(qIndex / tot) * 100}%`;

    // Type label
    const typeMap = { mcq: 'PILIHAN GANDA', fill: 'ISI KOSONG', translate: 'TERJEMAHAN', listen: 'DENGARKAN' };
    document.getElementById('qf-type-label').textContent = typeMap[q.type] || q.type.toUpperCase();

    // Question text
    document.getElementById('qf-question-text').textContent = q.question;

    // Reset feedback
    const fb = document.getElementById('qf-feedback');
    fb.className   = 'qf-feedback';
    fb.textContent = '';

    // Reset buttons
    document.getElementById('btn-qf-check').style.display = 'inline-flex';
    document.getElementById('btn-qf-next').style.display  = 'none';

    const mcqWrap  = document.getElementById('qf-mcq-wrap');
    const fillWrap = document.getElementById('qf-fill-wrap');

    if (q.type === 'mcq') {
      mcqWrap.style.display  = '';
      fillWrap.style.display = 'none';

      const opts = shuffle([...q.options]);
      mcqWrap.innerHTML = opts.map(opt => `
        <button class="qf-option" data-val="${escapeAttr(opt)}">${escapeHTML(opt)}</button>
      `).join('');

      mcqWrap.querySelectorAll('.qf-option').forEach(btn => {
        btn.addEventListener('click', () => {
          if (qAnswered) return;
          checkMCQ(btn, q.answer);
        });
      });

    } else {
      // fill / translate / listen
      mcqWrap.style.display  = 'none';
      fillWrap.style.display = '';

      const hint  = document.getElementById('qf-hint-text');
      const input = document.getElementById('qf-fill-input');
      hint.textContent   = q.hint ? `💡 Petunjuk: ${q.hint}` : '';
      input.value        = '';
      input.disabled     = false;
      input.className    = 'qf-fill-input';
      input.focus();

      input.onkeydown = (e) => {
        if (e.key === 'Enter' && !qAnswered) checkFill(q.answer);
      };
    }
  }

  function checkMCQ(btn, correct) {
    if (qAnswered) return;
    qAnswered = true;

    const selected = btn.getAttribute('data-val');
    const isOk     = selected.trim().toLowerCase() === correct.trim().toLowerCase();

    document.getElementById('qf-mcq-wrap').querySelectorAll('.qf-option').forEach(b => {
      b.disabled = true;
      if (b.getAttribute('data-val').trim().toLowerCase() === correct.trim().toLowerCase()) {
        b.classList.add('correct');
      }
    });

    if (!isOk) {
      btn.classList.add('wrong');
    } else {
      qScore++;
    }

    showFeedback(isOk, correct);
    document.getElementById('btn-qf-check').style.display = 'none';
    document.getElementById('btn-qf-next').style.display  = 'inline-flex';
  }

  function checkFill(correct) {
    if (qAnswered) return;
    qAnswered = true;

    const input   = document.getElementById('qf-fill-input');
    const userVal = input.value.trim().toLowerCase();
    const isOk    = userVal === correct.trim().toLowerCase();

    input.disabled = true;
    input.className = 'qf-fill-input ' + (isOk ? 'correct' : 'wrong');

    if (isOk) qScore++;
    showFeedback(isOk, correct);
    document.getElementById('btn-qf-check').style.display = 'none';
    document.getElementById('btn-qf-next').style.display  = 'inline-flex';
  }

  function showFeedback(isOk, correct) {
    const fb = document.getElementById('qf-feedback');
    fb.classList.add('show');
    if (isOk) {
      fb.classList.add('ok');
      fb.textContent = '✅ Benar! Bagus sekali!';
    } else {
      fb.classList.add('bad');
      fb.textContent = `❌ Jawaban yang benar: "${correct}"`;
    }
  }

  function nextQuestion() {
    qIndex++;
    if (qIndex >= questions.length) {
      showResult();
    } else {
      renderQuestion();
    }
  }

  // ── Show Result ───────────────────────────────────────────
  function showResult() {
    document.getElementById('qf-question-screen').classList.remove('active');
    document.getElementById('qf-result-screen').classList.add('active');

    const set   = QUIZ_FOUNDATION_DATA.getSet(currentSetId);
    const total = questions.length;
    const pct   = Math.round((qScore / total) * 100);

    // Emoji
    let emoji = '💪';
    if (pct === 100) emoji = '🏆';
    else if (pct >= 80) emoji = '🎉';
    else if (pct >= 60) emoji = '👍';
    else if (pct >= 40) emoji = '📚';

    document.getElementById('qf-result-emoji').textContent = emoji;
    document.getElementById('qf-result-score').textContent = `${qScore}/${total}`;
    document.getElementById('qf-result-label').textContent = `(${pct}%) — ${getResultLabel(pct)}`;

    let xp = qScore * 3;
    if (pct === 100) xp += 20;
    document.getElementById('qf-result-xp').textContent = `+${xp} XP`;

    // Save stats
    const stats = loadStats();
    const prev  = stats.setResults[currentSetId] || { best: 0, attempts: 0 };
    stats.setResults[currentSetId] = {
      best:      Math.max(prev.best, qScore),
      attempts:  (prev.attempts || 0) + 1,
      lastScore: qScore,
    };
    stats.attempts = (stats.attempts || 0) + 1;
    stats.totalXP  = (stats.totalXP || 0) + xp;
    saveStats(stats);

    // Award XP
    if (typeof XPSystem !== 'undefined') {
      XPSystem.addXP(xp, 'quiz', `Foundation Quiz: ${set ? set.title : ''}`);
    }

    // Challenge
    if (typeof ChallengeSystem !== 'undefined') {
      ChallengeSystem.onQuizComplete('quiz_foundation', qScore, total);
    }

    // Badge check (quiz_perfect if 100%)
    if (typeof BadgeSystem !== 'undefined' && pct === 100) {
      BadgeSystem.checkAndAward();
    }

    renderStatsBar();
    renderSetsGrid();
  }

  function getResultLabel(pct) {
    if (pct === 100) return 'Sempurna! Kamu luar biasa!';
    if (pct >= 80)   return 'Sangat bagus! Hampir sempurna!';
    if (pct >= 60)   return 'Bagus! Terus berlatih!';
    if (pct >= 40)   return 'Lumayan. Pelajari lagi materi yang kurang!';
    return 'Jangan menyerah! Yuk ulang pelajaran foundation-nya.';
  }

  // ── Utilities ─────────────────────────────────────────────
  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ── Event Listeners ───────────────────────────────────────
  function bindEvents() {
    // Back to sets list
    document.getElementById('btn-back-to-sets').addEventListener('click', () => {
      document.getElementById('sets-view').style.display = '';
      document.getElementById('quiz-view').classList.remove('active');
      currentSetId = null;
      renderStatsBar();
      renderSetsGrid();
    });

    // Start quiz
    document.getElementById('btn-start-qf').addEventListener('click', startQuiz);

    // Check answer
    document.getElementById('btn-qf-check').addEventListener('click', () => {
      if (qAnswered) return;
      const q = questions[qIndex];
      if (q.type === 'mcq') {
        App.toast('Pilih salah satu jawaban terlebih dahulu!', 'info');
      } else {
        checkFill(q.answer);
      }
    });

    // Next question
    document.getElementById('btn-qf-next').addEventListener('click', nextQuestion);

    // Retry
    document.getElementById('btn-qf-retry').addEventListener('click', startQuiz);

    // Back from result
    document.getElementById('btn-qf-back-result').addEventListener('click', () => {
      document.getElementById('sets-view').style.display = '';
      document.getElementById('quiz-view').classList.remove('active');
      currentSetId = null;
      renderStatsBar();
      renderSetsGrid();
    });
  }

  // ── Init ──────────────────────────────────────────────────
  function init() {
    const ds = QUIZ_FOUNDATION_DATA.getStats();
    document.getElementById('hdr-sets').textContent   = `${ds.sets} paket quiz`;
    document.getElementById('hdr-total-q').textContent = `${ds.totalQuestions} soal`;

    renderStatsBar();
    renderSetsGrid();
    bindEvents();
  }

  init();

})();
