/**
 * EnglishPath — Grammar Intermediate B1–B2 Page
 * Fase 8b — v0.9.2
 * IIFE module pattern
 */

(function GrammarIntermediatePage() {
  'use strict';

  Router.guard();
  App.init('intermediate-grammar');

  const user         = Auth.getActiveUser();
  const STORAGE_KEY  = 'grammar_intermediate';

  // ── State ─────────────────────────────────────────────────
  let currentTopicId = null;
  let currentMode    = 'study'; // 'study' | 'quiz'
  let currentLevel   = 'all';  // 'all' | 'B1' | 'B2'

  // Quiz state
  let quizQuestions  = [];
  let quizIndex      = 0;
  let quizScore      = 0;
  let quizAnswered   = false;
  let reorderAnswer  = []; // words placed in answer area

  // ── TTS ───────────────────────────────────────────────────
  const tts    = window.speechSynthesis;
  const hasTTS = !!tts;

  function speak(text) {
    if (!hasTTS) { App.toast('Browser tidak mendukung TTS.', 'error'); return; }
    tts.cancel();
    const utter  = new SpeechSynthesisUtterance(text);
    utter.lang   = 'en-GB';
    utter.rate   = 0.95;
    utter.pitch  = 1;
    const voices = tts.getVoices();
    const voice  = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('uk'))
                || voices.find(v => v.lang.startsWith('en'));
    if (voice) utter.voice = voice;
    tts.speak(utter);
  }

  // ── Storage helpers ───────────────────────────────────────
  function loadStats() {
    if (!user) return defaultStats();
    return Storage.getUser(user.id, STORAGE_KEY, defaultStats());
  }

  function saveStats(data) {
    if (!user) return;
    Storage.setUser(user.id, STORAGE_KEY, data);
  }

  function defaultStats() {
    return {
      topicsStudied: {},  // { topicId: true }
      quizResults:   {},  // { topicId: { best, attempts, lastScore } }
      totalXP:       0,
      quizzesDone:   0,
    };
  }

  // ── Stats Bar ─────────────────────────────────────────────
  function renderStatsBar() {
    const stats  = loadStats();
    const topics = GRAMMAR_INTERMEDIATE_DATA.getTopics();

    const done    = Object.keys(stats.quizResults).filter(id => {
      const r = stats.quizResults[id];
      return r && r.best >= 7;
    }).length;

    const allBests   = Object.values(stats.quizResults).map(r => r.best || 0);
    const globalBest = allBests.length ? Math.max(...allBests) : null;

    document.getElementById('stat-topics-done').textContent   = done;
    document.getElementById('stat-quizzes-done').textContent  = stats.quizzesDone || 0;
    document.getElementById('stat-best-score').textContent    = globalBest !== null ? `${globalBest}/10` : '—';
    document.getElementById('stat-total-xp').textContent      = stats.totalXP || 0;
    document.getElementById('hdr-completed').textContent      = `${done} topik selesai`;
    document.getElementById('hdr-topics').textContent         = `${topics.length} topik`;
    const totalQ = topics.reduce((s, t) => s + t.quiz.length, 0);
    document.getElementById('hdr-total-quiz').textContent     = `${totalQ}+ soal latihan`;
  }

  // ── Progress Overview ─────────────────────────────────────
  function renderProgressOverview() {
    const stats     = loadStats();
    const topics    = GRAMMAR_INTERMEDIATE_DATA.getTopics();
    const container = document.getElementById('topic-progress-list');

    container.innerHTML = topics.map(t => {
      const r   = stats.quizResults[t.id];
      const best = r ? r.best : 0;
      const pct  = Math.round((best / 10) * 100);
      return `
        <div class="topic-progress-row" data-topic-id="${t.id}">
          <div class="topic-progress-icon">${t.icon}</div>
          <div class="topic-progress-info">
            <div class="topic-progress-name">${escapeHTML(t.title)}</div>
            <div class="topic-progress-bar-wrap">
              <div class="topic-progress-bar-fill" style="width:${pct}%"></div>
            </div>
          </div>
          <div class="topic-progress-pct">${pct}%</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.topic-progress-row').forEach(el => {
      el.addEventListener('click', () => openTopic(el.dataset.topicId));
    });
  }

  // ── Topics Grid ───────────────────────────────────────────
  function renderTopicsGrid() {
    const stats    = loadStats();
    const topics   = GRAMMAR_INTERMEDIATE_DATA.getTopics();
    const filtered = currentLevel === 'all' ? topics : topics.filter(t => t.level === currentLevel);
    const grid     = document.getElementById('topics-grid');

    grid.innerHTML = filtered.map(t => {
      const r       = stats.quizResults[t.id];
      const best    = r ? r.best : 0;
      const done    = best >= 7;
      const studied = stats.topicsStudied[t.id];
      return `
        <div class="topic-card ${done ? 'completed' : ''}" data-topic-id="${t.id}">
          <div class="topic-icon">${t.icon}</div>
          <div class="topic-info">
            <h3>${escapeHTML(t.title)}</h3>
            <p>${escapeHTML(t.shortDesc)}</p>
            <div class="topic-meta">
              <span class="level-badge">${t.level}</span>
              <span class="quiz-count">❓ ${t.quiz.length} soal</span>
              ${studied ? '<span class="quiz-count" style="color:var(--color-primary)">📖 Sudah dibaca</span>' : ''}
              ${r ? `<span class="quiz-count" style="color:var(--color-text)">🏆 ${best}/10</span>` : ''}
              ${done ? '<span class="quiz-count" style="color:var(--color-success,#22c55e)">✅ Selesai</span>' : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.topic-card').forEach(el => {
      el.addEventListener('click', () => openTopic(el.dataset.topicId));
    });
  }

  // ── Open Topic ────────────────────────────────────────────
  function openTopic(topicId) {
    const topic = GRAMMAR_INTERMEDIATE_DATA.getTopic(topicId);
    if (!topic) return;

    currentTopicId = topicId;
    currentMode    = 'study';

    // mark studied
    const stats = loadStats();
    stats.topicsStudied[topicId] = true;
    saveStats(stats);

    // update header
    document.getElementById('detail-icon').textContent  = topic.icon;
    document.getElementById('detail-title').textContent = topic.title;
    document.getElementById('detail-desc').textContent  = topic.shortDesc;

    // show detail view
    document.getElementById('topics-view').style.display = 'none';
    document.getElementById('detail-view').classList.add('active');

    switchMode('study');
    renderStudyContent(topic);

    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onModuleVisit('grammar');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Render Study Content ──────────────────────────────────
  function renderStudyContent(topic) {
    const container = document.getElementById('study-content');
    container.innerHTML = topic.sections.map(sec => {
      const examplesHTML = sec.examples.map(ex => {
        // Extract spoken text — remove parenthetical alternatives for cleaner speech
        const spokenRaw = ex.en.split('(')[0].split(' →')[0].trim().replace(/\*/g, '');
        return `
          <li class="example-item">
            <div class="example-content">
              <div class="example-en">${escapeHTML(ex.en)}</div>
              ${ex.id ? `<div class="example-id">${escapeHTML(ex.id)}</div>` : ''}
            </div>
            <button class="speak-mini-btn" data-speak="${escapeAttr(spokenRaw)}" title="Dengarkan">🔊</button>
          </li>
        `;
      }).join('');

      const tipHTML = sec.tips ? `<div class="tip-box">${escapeHTML(sec.tips)}</div>` : '';

      return `
        <div class="grammar-section">
          <h3>${escapeHTML(sec.heading)}</h3>
          <div class="explanation-text">${escapeHTML(sec.explanation)}</div>
          <ul class="examples-list">${examplesHTML}</ul>
          ${tipHTML}
        </div>
      `;
    }).join('');

    container.querySelectorAll('[data-speak]').forEach(btn => {
      btn.addEventListener('click', () => speak(btn.getAttribute('data-speak')));
    });
  }

  // ── Mode Switch ───────────────────────────────────────────
  function switchMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    document.getElementById('panel-study').classList.toggle('active', mode === 'study');
    document.getElementById('panel-quiz').classList.toggle('active',  mode === 'quiz');

    if (mode === 'quiz') resetQuizUI();
  }

  // ── Quiz Start ────────────────────────────────────────────
  function resetQuizUI() {
    document.getElementById('quiz-start-screen').style.display    = 'block';
    document.getElementById('quiz-question-screen').style.display = 'none';
    document.getElementById('quiz-result-screen').classList.remove('active');

    const topic = GRAMMAR_INTERMEDIATE_DATA.getTopic(currentTopicId);
    if (topic) {
      document.getElementById('quiz-start-title').textContent = `Latihan: ${topic.title}`;
    }

    // Show previous best if any
    const stats = loadStats();
    const prev  = stats.quizResults[currentTopicId];
    const prevEl = document.getElementById('quiz-prev-best');
    if (prev && prevEl) {
      prevEl.textContent = `Skor terbaik sebelumnya: ${prev.best}/10 (${prev.attempts} percobaan)`;
      prevEl.style.display = 'block';
    } else if (prevEl) {
      prevEl.style.display = 'none';
    }
  }

  function startQuiz() {
    quizQuestions = GRAMMAR_INTERMEDIATE_DATA.getQuiz(currentTopicId, 10);
    quizIndex     = 0;
    quizScore     = 0;
    quizAnswered  = false;

    document.getElementById('quiz-start-screen').style.display    = 'none';
    document.getElementById('quiz-result-screen').classList.remove('active');
    document.getElementById('quiz-question-screen').style.display = 'block';
    document.getElementById('quiz-question-screen').classList.add('active');

    renderQuestion();
  }

  // ── Render Question ───────────────────────────────────────
  function renderQuestion() {
    if (quizIndex >= quizQuestions.length) { showResult(); return; }

    quizAnswered  = false;
    reorderAnswer = [];

    const q     = quizQuestions[quizIndex];
    const total = quizQuestions.length;
    const pct   = Math.round((quizIndex / total) * 100);

    document.getElementById('q-progress-fill').style.width = pct + '%';
    document.getElementById('q-progress-text').textContent = `Soal ${quizIndex + 1} dari ${total}`;
    document.getElementById('q-score-text').textContent    = `Benar: ${quizScore}`;

    const typeLabels = { mcq: 'PILIHAN GANDA', fill: 'ISI KOSONG', reorder: 'SUSUN KALIMAT' };
    document.getElementById('q-type-label').textContent    = typeLabels[q.type] || '';
    document.getElementById('q-question-text').textContent = q.question;

    // Reset feedback
    const fb       = document.getElementById('q-feedback');
    fb.className   = 'answer-feedback';
    fb.textContent = '';

    // Reset buttons
    document.getElementById('btn-check').style.display = 'inline-flex';
    document.getElementById('btn-next').style.display  = 'none';

    // Hide all input areas
    document.getElementById('q-mcq-wrap').style.display     = 'none';
    document.getElementById('q-fill-wrap').style.display    = 'none';
    document.getElementById('q-reorder-wrap').style.display = 'none';

    if (q.type === 'mcq')     renderMCQ(q);
    else if (q.type === 'fill')    renderFill(q);
    else if (q.type === 'reorder') renderReorder(q);
  }

  // ── MCQ ───────────────────────────────────────────────────
  function renderMCQ(q) {
    const wrap         = document.getElementById('q-mcq-wrap');
    wrap.style.display = 'flex';
    wrap.innerHTML     = q.options.map(opt => `
      <button class="mcq-option-btn" data-option="${escapeAttr(opt)}">${escapeHTML(opt)}</button>
    `).join('');

    wrap.querySelectorAll('.mcq-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (quizAnswered) return;
        checkMCQ(btn, q.answer, wrap);
      });
    });
  }

  function checkMCQ(clickedBtn, correctAnswer, wrap) {
    quizAnswered       = true;
    const chosen       = clickedBtn.getAttribute('data-option');
    const isCorrect    = chosen === correctAnswer;

    wrap.querySelectorAll('.mcq-option-btn').forEach(btn => {
      btn.disabled = true;
      const o = btn.getAttribute('data-option');
      if (o === correctAnswer) btn.classList.add('correct');
      else if (o === chosen)   btn.classList.add('wrong');
    });

    showFeedback(isCorrect, correctAnswer);
    if (isCorrect) quizScore++;
    showNextBtn();
  }

  // ── Fill ──────────────────────────────────────────────────
  function renderFill(q) {
    const wrap         = document.getElementById('q-fill-wrap');
    wrap.style.display = 'flex';
    const input        = document.getElementById('q-fill-input');
    input.value        = '';
    input.className    = 'fill-blank-input';
    input.disabled     = false;
    input.focus();
    input.onkeydown    = (e) => { if (e.key === 'Enter' && !quizAnswered) checkFill(q.answer); };
  }

  function checkFill(correctAnswer) {
    if (quizAnswered) return;
    quizAnswered = true;

    const input      = document.getElementById('q-fill-input');
    const chosen     = input.value.trim().toLowerCase();
    const correct    = correctAnswer.toLowerCase().trim();
    const isCorrect  = chosen === correct;

    input.disabled   = true;
    input.classList.add(isCorrect ? 'correct' : 'wrong');
    showFeedback(isCorrect, correctAnswer);
    if (isCorrect) quizScore++;
    showNextBtn();
  }

  // ── Reorder ───────────────────────────────────────────────
  function renderReorder(q) {
    const wrap         = document.getElementById('q-reorder-wrap');
    wrap.style.display = 'block';

    const answerArea   = document.getElementById('q-reorder-answer');
    const wordBank     = document.getElementById('q-word-bank');
    answerArea.innerHTML = '';
    wordBank.innerHTML   = '';
    answerArea.className = 'reorder-area';
    reorderAnswer        = [];

    const shuffled = shuffle([...q.words].map((w, i) => ({ w, i })));

    shuffled.forEach(({ w, i }) => {
      const chip               = document.createElement('span');
      chip.className           = 'word-chip';
      chip.textContent         = w;
      chip.dataset.wordIdx     = i;
      chip.addEventListener('click', () => placeWord(chip, w, i));
      wordBank.appendChild(chip);
    });

    function placeWord(chip, word, idx) {
      if (quizAnswered) return;
      chip.classList.add('placed');
      reorderAnswer.push({ word, idx });

      const placed               = document.createElement('span');
      placed.className           = 'answer-word-chip';
      placed.textContent         = word;
      placed.dataset.wordIdx     = idx;
      placed.addEventListener('click', () => {
        if (quizAnswered) return;
        reorderAnswer = reorderAnswer.filter(r => r.idx !== parseInt(idx));
        placed.remove();
        chip.classList.remove('placed');
      });
      answerArea.appendChild(placed);
    }
  }

  function checkReorder(correctAnswer) {
    if (quizAnswered) return;
    quizAnswered     = true;

    const userAnswer = reorderAnswer.map(r => r.word).join(' ');
    const norm       = s => s.trim().toLowerCase().replace(/\s+/g, ' ');
    const isCorrect  = norm(userAnswer) === norm(correctAnswer);

    document.getElementById('q-reorder-answer').classList.add(isCorrect ? 'correct' : 'wrong');
    document.getElementById('q-word-bank').querySelectorAll('.word-chip').forEach(c => {
      c.style.pointerEvents = 'none';
    });
    document.getElementById('q-reorder-answer').querySelectorAll('.answer-word-chip').forEach(c => {
      c.style.pointerEvents = 'none';
    });

    showFeedback(isCorrect, correctAnswer);
    if (isCorrect) quizScore++;
    showNextBtn();
  }

  // ── Feedback & Nav ────────────────────────────────────────
  function showFeedback(isCorrect, correctAnswer) {
    const fb       = document.getElementById('q-feedback');
    fb.classList.add('show');
    if (isCorrect) {
      fb.classList.add('correct-feedback');
      fb.textContent = '✅ Benar! Bagus sekali!';
    } else {
      fb.classList.add('wrong-feedback');
      fb.textContent = `❌ Kurang tepat. Jawaban: "${correctAnswer}"`;
    }
  }

  function showNextBtn() {
    document.getElementById('btn-check').style.display = 'none';
    document.getElementById('btn-next').style.display  = 'inline-flex';
  }

  function nextQuestion() {
    quizIndex++;
    if (quizIndex >= quizQuestions.length) showResult();
    else renderQuestion();
  }

  // ── Show Result ───────────────────────────────────────────
  function showResult() {
    document.getElementById('quiz-question-screen').style.display = 'none';
    const result = document.getElementById('quiz-result-screen');
    result.classList.add('active');

    const total = quizQuestions.length;
    const pct   = Math.round((quizScore / total) * 100);

    let emoji = '💪';
    if (pct === 100)     emoji = '🏆';
    else if (pct >= 80)  emoji = '🎉';
    else if (pct >= 60)  emoji = '👍';
    else if (pct >= 40)  emoji = '📚';

    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('result-score').textContent = `${quizScore}/${total}`;
    document.getElementById('result-label').textContent = `(${pct}%) — ${getResultLabel(pct)}`;

    let xp = quizScore * 3;
    if (pct === 100) xp += 20;
    document.getElementById('result-xp').textContent = `+${xp} XP`;

    // Save
    const stats      = loadStats();
    const prev       = stats.quizResults[currentTopicId] || { best: 0, attempts: 0 };
    stats.quizResults[currentTopicId] = {
      best:      Math.max(prev.best, quizScore),
      attempts:  (prev.attempts || 0) + 1,
      lastScore: quizScore,
    };
    stats.quizzesDone = (stats.quizzesDone || 0) + 1;
    stats.totalXP     = (stats.totalXP     || 0) + xp;
    saveStats(stats);

    // Award XP
    if (typeof XPSystem !== 'undefined') {
      const topic = GRAMMAR_INTERMEDIATE_DATA.getTopic(currentTopicId);
      XPSystem.addXP(xp, 'quiz', `Grammar B1-B2: ${topic ? topic.title : ''}`);
    }

    // Challenge
    if (typeof ChallengeSystem !== 'undefined') {
      ChallengeSystem.onQuizComplete('grammar', quizScore, total);
    }

    // Badge check
    if (typeof BadgeSystem !== 'undefined' && quizScore === total) {
      BadgeSystem.checkAndAward();
    }

    renderStatsBar();
    renderProgressOverview();
    renderTopicsGrid();
  }

  function getResultLabel(pct) {
    if (pct === 100) return 'Sempurna! Kamu menguasai topik ini!';
    if (pct >= 80)   return 'Sangat bagus! Hampir sempurna!';
    if (pct >= 60)   return 'Bagus! Terus berlatih!';
    if (pct >= 40)   return 'Lumayan. Coba baca materinya lagi ya!';
    return 'Yuk, pelajari materinya dulu sebelum latihan!';
  }

  // ── Utilities ─────────────────────────────────────────────
  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
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

  // ── Event Binding ─────────────────────────────────────────
  function bindEvents() {
    // Level filter
    document.querySelectorAll('.level-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.level-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLevel = btn.dataset.level;
        renderTopicsGrid();
      });
    });

    // Back to topics
    document.getElementById('btn-back-to-topics').addEventListener('click', () => {
      document.getElementById('topics-view').style.display = '';
      document.getElementById('detail-view').classList.remove('active');
      currentTopicId = null;
      renderStatsBar();
      renderTopicsGrid();
      renderProgressOverview();
    });

    // Mode tabs
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchMode(btn.dataset.mode));
    });

    // Study → quiz shortcut
    document.getElementById('btn-go-to-quiz').addEventListener('click', () => switchMode('quiz'));

    // Start quiz
    document.getElementById('btn-start-quiz').addEventListener('click', startQuiz);

    // Check answer
    document.getElementById('btn-check').addEventListener('click', () => {
      if (quizAnswered) return;
      const q = quizQuestions[quizIndex];
      if (q.type === 'mcq') {
        App.toast('Pilih salah satu jawaban terlebih dahulu.', 'info');
        return;
      }
      if (q.type === 'fill')    checkFill(q.answer);
      if (q.type === 'reorder') {
        if (reorderAnswer.length === 0) {
          App.toast('Susun kata-kata menjadi kalimat terlebih dahulu.', 'info');
          return;
        }
        checkReorder(q.answer);
      }
    });

    // Next
    document.getElementById('btn-next').addEventListener('click', nextQuestion);

    // Retry
    document.getElementById('btn-retry-quiz').addEventListener('click', startQuiz);

    // Back from result
    document.getElementById('btn-back-from-result').addEventListener('click', () => switchMode('study'));
  }

  // ── Init ──────────────────────────────────────────────────
  function init() {
    renderStatsBar();
    renderProgressOverview();
    renderTopicsGrid();
    bindEvents();
  }

  init();

})();
