/**
 * EnglishPath — Reading Intermediate B1–B2 Page
 * Fase 9 — v1.0.0
 * IIFE module pattern
 */

(function ReadingIntermediatePage() {
  'use strict';

  Router.guard();
  App.init('intermediate-reading');

  const user        = Auth.getActiveUser();
  const STORAGE_KEY = 'reading_intermediate';

  // ── State ─────────────────────────────────────────────────
  let currentFilter   = 'all';  // 'all' | 'B1' | 'B2'
  let currentArticle  = null;
  let currentMode     = 'read'; // 'read' | 'quiz'

  // Quiz state
  let quizQuestions   = [];
  let quizIndex       = 0;
  let quizScore       = 0;
  let quizAnswered    = false;
  let ttsPlaying      = false;
  let ttsUtterance    = null;
  let ttsProgress     = 0;

  // ── TTS ───────────────────────────────────────────────────
  const tts    = window.speechSynthesis;
  const hasTTS = !!tts;

  function speak(text, onEnd) {
    if (!hasTTS) { App.toast('Browser tidak mendukung TTS.', 'error'); return; }
    tts.cancel();
    const utt  = new SpeechSynthesisUtterance(text);
    utt.lang   = 'en-GB';
    utt.rate   = 0.9;
    utt.pitch  = 1;
    const voices = tts.getVoices();
    const voice  = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('uk'))
                || voices.find(v => v.lang.startsWith('en'));
    if (voice) utt.voice = voice;
    if (onEnd) utt.onend = onEnd;
    tts.speak(utt);
    ttsUtterance = utt;
  }

  function stopTTS() {
    if (hasTTS) tts.cancel();
    ttsPlaying = false;
    ttsUtterance = null;
  }

  // ── Storage helpers ────────────────────────────────────────
  function loadProgress() {
    if (!user) return defaultProgress();
    return Storage.getUser(user.id, STORAGE_KEY, defaultProgress());
  }

  function defaultProgress() {
    return { completed: {}, scores: {}, totalRead: 0 };
  }

  function saveProgress(prog) {
    if (!user) return;
    Storage.setUser(user.id, STORAGE_KEY, prog);
  }

  function markArticleDone(articleId, score, total) {
    const prog = loadProgress();
    const already = prog.completed[articleId];
    prog.completed[articleId] = true;
    if (!prog.scores[articleId] || score > prog.scores[articleId]) {
      prog.scores[articleId] = score;
    }
    if (!already) prog.totalRead = (prog.totalRead || 0) + 1;
    saveProgress(prog);
  }

  // ── Stats ──────────────────────────────────────────────────
  function renderStats() {
    const prog  = loadProgress();
    const all   = READING_INTERMEDIATE_DATA.getAll();
    const done  = Object.keys(prog.completed).length;
    const scores = Object.values(prog.scores);
    const avgScore = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

    const $s = id => document.getElementById(id);
    if ($s('stat-total'))    $s('stat-total').textContent    = all.length;
    if ($s('stat-done'))     $s('stat-done').textContent     = done;
    if ($s('stat-b1'))       $s('stat-b1').textContent       = READING_INTERMEDIATE_DATA.countByLevel('B1');
    if ($s('stat-avg'))      $s('stat-avg').textContent      = avgScore + '%';
  }

  // ── List View ──────────────────────────────────────────────
  function renderList() {
    const prog     = loadProgress();
    const articles = READING_INTERMEDIATE_DATA.getByLevel(currentFilter);
    const grid     = document.getElementById('articles-grid');
    if (!grid) return;

    grid.innerHTML = articles.map(a => {
      const done     = prog.completed[a.id];
      const score    = prog.scores[a.id];
      return `
        <div class="article-card ${done ? 'completed' : ''}" data-id="${a.id}">
          <div class="article-card-top">
            <div class="article-icon">${a.icon}</div>
            <div class="article-info">
              <h3>${a.title}</h3>
              <p>${a.subtitle}</p>
            </div>
          </div>
          <div class="article-meta">
            <span class="level-badge ${a.level.toLowerCase()}">${a.level}</span>
            <span class="time-badge">⏱ ${a.readTime}</span>
            <span class="question-count">📝 ${a.quiz.length} soal</span>
            ${done ? `<span class="done-badge">✓ ${score}%</span>` : ''}
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.article-card').forEach(card => {
      card.addEventListener('click', () => {
        openArticle(card.dataset.id);
      });
    });
  }

  // ── Detail View ────────────────────────────────────────────
  function openArticle(id) {
    currentArticle = READING_INTERMEDIATE_DATA.getById(id);
    if (!currentArticle) return;

    stopTTS();

    // Track module visit
    if (typeof ChallengeSystem !== 'undefined') {
      ChallengeSystem.onModuleVisit('reading_intermediate_' + id);
    }

    document.getElementById('list-view').style.display = 'none';
    const detail = document.getElementById('reading-detail');
    detail.classList.add('active');

    document.getElementById('detail-title').textContent = currentArticle.title;
    document.querySelector('.detail-back-bar h2').textContent = currentArticle.icon + ' ' + currentArticle.title;

    switchMode('read');
    renderReadPanel();
    renderQuizPanel();
  }

  function closeDetail() {
    stopTTS();
    document.getElementById('list-view').style.display = '';
    document.getElementById('reading-detail').classList.remove('active');
    currentArticle = null;
    renderList();
    renderStats();
  }

  // ── Mode Switching ─────────────────────────────────────────
  function switchMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    document.getElementById('panel-read').classList.toggle('active', mode === 'read');
    document.getElementById('panel-quiz').classList.toggle('active', mode === 'quiz');
    if (mode === 'quiz') {
      stopTTS();
      renderQuizPanel();
    }
  }

  // ── Read Panel ─────────────────────────────────────────────
  function renderReadPanel() {
    const a = currentArticle;
    if (!a) return;

    // Render article body
    const bodyEl = document.getElementById('article-body');
    if (bodyEl) {
      bodyEl.innerHTML = a.paragraphs.map(p => `<p>${escHtml(p)}</p>`).join('');
    }

    // Article title
    const titleEl = document.getElementById('article-read-title');
    if (titleEl) titleEl.textContent = a.title;

    const bylineEl = document.getElementById('article-byline');
    if (bylineEl) bylineEl.innerHTML = `<span>${a.level}</span> <span>⏱ ${a.readTime}</span> <span>📌 ${a.topic}</span>`;

    // Key vocab
    renderKeyVocab();

    // TTS button reset
    const btn = document.getElementById('btn-read-aloud');
    if (btn) btn.classList.remove('playing');
    ttsPlaying = false;
  }

  function renderKeyVocab() {
    const a  = currentArticle;
    const el = document.getElementById('key-vocab-list');
    if (!el || !a) return;
    el.innerHTML = a.vocab.map(v => `
      <div class="vocab-item">
        <div class="vocab-word">${escHtml(v.word)}</div>
        <div class="vocab-def">${escHtml(v.def)}</div>
        <button class="btn-speak-vocab" data-word="${escHtml(v.word)}" title="Dengarkan">🔊</button>
      </div>`).join('');

    el.querySelectorAll('.btn-speak-vocab').forEach(btn => {
      btn.addEventListener('click', () => speak(btn.dataset.word));
    });
  }

  // ── Quiz Panel ─────────────────────────────────────────────
  function renderQuizPanel() {
    const a = currentArticle;
    if (!a) return;

    quizQuestions = READING_INTERMEDIATE_DATA.getQuiz(a.id);
    quizIndex   = 0;
    quizScore   = 0;
    quizAnswered = false;

    const startScreen = document.getElementById('quiz-start-screen');
    const qScreen     = document.getElementById('quiz-question-screen');
    const rScreen     = document.getElementById('quiz-result-screen');

    if (startScreen) {
      startScreen.style.display = 'block';
      const prog = loadProgress();
      const prev = prog.scores[a.id];
      startScreen.querySelector('.quiz-prev-score').textContent =
        prev !== undefined ? `Skor terbaik: ${prev}%` : 'Belum pernah dikerjakan';
    }
    if (qScreen) qScreen.classList.remove('active');
    if (rScreen) rScreen.classList.remove('active');
  }

  function startQuiz() {
    document.getElementById('quiz-start-screen').style.display = 'none';
    document.getElementById('quiz-result-screen').classList.remove('active');
    document.getElementById('quiz-question-screen').classList.add('active');
    quizIndex   = 0;
    quizScore   = 0;
    quizAnswered = false;
    renderQuestion();
  }

  function renderQuestion() {
    const q   = quizQuestions[quizIndex];
    const el  = document.getElementById('quiz-question-screen');
    if (!q || !el) return;

    // Progress
    el.querySelector('.quiz-progress-info span:first-child').textContent =
      `Soal ${quizIndex + 1} / ${quizQuestions.length}`;
    el.querySelector('.quiz-progress-fill').style.width =
      ((quizIndex / quizQuestions.length) * 100) + '%';

    // Type label
    const typeMap = { mcq: 'Pilihan Ganda', fill: 'Isi Kosong', tf: 'Benar / Salah' };
    el.querySelector('.q-type-label').textContent = typeMap[q.type] || q.type.toUpperCase();

    // Passage reference
    const passRef = el.querySelector('.q-passage-ref');
    if (passRef) passRef.textContent = '📖 "' + q.passageRef + '"';

    // Question
    el.querySelector('.q-question-text').textContent = q.question;

    // Answer area
    const area = el.querySelector('.answer-area');
    area.innerHTML = '';
    if (q.type === 'mcq') {
      area.innerHTML = `<div class="mcq-options">${
        q.options.map(opt =>
          `<button class="mcq-option-btn" data-val="${escHtml(opt)}">${escHtml(opt)}</button>`
        ).join('')
      }</div>`;
      area.querySelectorAll('.mcq-option-btn').forEach(btn => {
        btn.addEventListener('click', () => handleMCQ(btn, q));
      });
    } else if (q.type === 'fill') {
      area.innerHTML = `<div class="fill-input-wrap">
        <input class="fill-blank-input" type="text" placeholder="Ketik jawaban...">
      </div>`;
    } else if (q.type === 'tf') {
      area.innerHTML = `<div class="tf-options">
        <button class="tf-btn" data-val="true">✅ Benar (True)</button>
        <button class="tf-btn" data-val="false">❌ Salah (False)</button>
      </div>`;
      area.querySelectorAll('.tf-btn').forEach(btn => {
        btn.addEventListener('click', () => handleTF(btn, q));
      });
    }

    // Reset feedback
    const fb = el.querySelector('.answer-feedback');
    fb.className = 'answer-feedback';
    fb.textContent = '';

    // Check/Next buttons
    const btnCheck = el.querySelector('.btn-check');
    const btnNext  = el.querySelector('.btn-next');
    btnCheck.style.display = 'block';
    btnNext.style.display  = 'none';
    quizAnswered = false;
  }

  function handleMCQ(btn, q) {
    if (quizAnswered) return;
    quizAnswered = true;
    const correct = btn.dataset.val === q.answer;
    if (correct) {
      btn.classList.add('correct');
      quizScore++;
    } else {
      btn.classList.add('wrong');
      document.querySelectorAll('.mcq-option-btn').forEach(b => {
        if (b.dataset.val === q.answer) b.classList.add('correct');
      });
    }
    document.querySelectorAll('.mcq-option-btn').forEach(b => b.disabled = true);
    showFeedback(correct, correct ? '✅ Benar!' : `❌ Salah. Jawaban benar: "${q.answer}"`);
    showNextBtn();
  }

  function handleTF(btn, q) {
    if (quizAnswered) return;
    quizAnswered = true;
    const userAns   = btn.dataset.val === 'true';
    const correct   = userAns === q.answer;
    if (correct) {
      btn.classList.add('correct');
      quizScore++;
    } else {
      btn.classList.add('wrong');
      document.querySelectorAll('.tf-btn').forEach(b => {
        if ((b.dataset.val === 'true') === q.answer) b.classList.add('correct');
      });
    }
    document.querySelectorAll('.tf-btn').forEach(b => b.disabled = true);
    const correctLabel = q.answer ? 'Benar (True)' : 'Salah (False)';
    showFeedback(correct, correct ? '✅ Benar!' : `❌ Salah. Jawaban: "${correctLabel}"`);
    showNextBtn();
  }

  function checkFill() {
    if (quizAnswered) return;
    const q     = quizQuestions[quizIndex];
    const input = document.querySelector('.fill-blank-input');
    if (!input) return;
    const val   = input.value.trim().toLowerCase();
    const ans   = q.answer.toLowerCase();
    quizAnswered = true;

    if (val === ans) {
      input.classList.add('correct');
      quizScore++;
      showFeedback(true, '✅ Benar!');
    } else {
      input.classList.add('wrong');
      showFeedback(false, `❌ Salah. Jawaban benar: "${q.answer}"`);
    }
    input.disabled = true;
    showNextBtn();
  }

  function showFeedback(correct, msg) {
    const fb = document.querySelector('#quiz-question-screen .answer-feedback');
    fb.textContent = msg;
    fb.className   = 'answer-feedback show ' + (correct ? 'correct-feedback' : 'wrong-feedback');
  }

  function showNextBtn() {
    const btnCheck = document.querySelector('.btn-check');
    const btnNext  = document.querySelector('.btn-next');
    if (btnCheck) btnCheck.style.display = 'none';
    if (btnNext)  btnNext.style.display  = 'block';
  }

  function nextQuestion() {
    quizIndex++;
    if (quizIndex >= quizQuestions.length) {
      showResult();
    } else {
      renderQuestion();
    }
  }

  function showResult() {
    document.getElementById('quiz-question-screen').classList.remove('active');
    const rScreen = document.getElementById('quiz-result-screen');
    rScreen.classList.add('active');

    const pct  = Math.round((quizScore / quizQuestions.length) * 100);
    const xp   = quizScore * 3 + (pct === 100 ? 20 : 0);
    const emoji = pct === 100 ? '🏆' : pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '📚';

    rScreen.querySelector('.result-emoji').textContent = emoji;
    rScreen.querySelector('.result-score').textContent = pct + '%';
    rScreen.querySelector('.result-label').textContent =
      `${quizScore} dari ${quizQuestions.length} soal benar`;
    rScreen.querySelector('.result-xp').textContent = `+${xp} XP`;

    // Save progress
    markArticleDone(currentArticle.id, pct, quizQuestions.length);

    // Award XP
    if (typeof XPSystem !== 'undefined') {
      XPSystem.addXP(xp, 'Selesaikan quiz reading: ' + currentArticle.title);
    }

    // Badge check
    if (typeof BadgeSystem !== 'undefined') {
      const prog = loadProgress();
      if (Object.keys(prog.completed).length >= 4) {
        BadgeSystem.award('vocab_500');
      }
    }

    // Challenge
    if (typeof ChallengeSystem !== 'undefined') {
      ChallengeSystem.onQuizComplete('reading_intermediate_' + currentArticle.id, pct);
    }
  }

  // ── Helpers ────────────────────────────────────────────────
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Event Wiring ───────────────────────────────────────────
  function bindEvents() {
    // Difficulty filter tabs
    document.querySelectorAll('.diff-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.level;
        document.querySelectorAll('.diff-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderList();
      });
    });

    // Back button
    const btnBack = document.getElementById('btn-back');
    if (btnBack) btnBack.addEventListener('click', closeDetail);

    // Mode tabs
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchMode(btn.dataset.mode));
    });

    // Read aloud
    const btnReadAloud = document.getElementById('btn-read-aloud');
    if (btnReadAloud) {
      btnReadAloud.addEventListener('click', () => {
        if (ttsPlaying) {
          stopTTS();
          btnReadAloud.classList.remove('playing');
          btnReadAloud.textContent = '▶ Baca Keras';
        } else {
          if (!currentArticle) return;
          const text = currentArticle.paragraphs.join(' ');
          ttsPlaying = true;
          btnReadAloud.classList.add('playing');
          btnReadAloud.textContent = '⏸ Stop';
          speak(text, () => {
            ttsPlaying = false;
            btnReadAloud.classList.remove('playing');
            btnReadAloud.textContent = '▶ Baca Keras';
          });
        }
      });
    }

    // Quiz start button
    const btnStartQuiz = document.getElementById('btn-start-quiz');
    if (btnStartQuiz) btnStartQuiz.addEventListener('click', startQuiz);

    // Check button
    const btnCheck = document.querySelector('.btn-check');
    if (btnCheck) {
      btnCheck.addEventListener('click', () => {
        const q = quizQuestions[quizIndex];
        if (!q) return;
        if (q.type === 'fill') checkFill();
        else if (q.type === 'mcq' || q.type === 'tf') {
          App.toast('Klik salah satu pilihan jawaban.', 'info');
        }
      });
    }

    // Next button
    const btnNext = document.querySelector('.btn-next');
    if (btnNext) btnNext.addEventListener('click', nextQuestion);

    // Retry
    const btnRetry = document.getElementById('btn-retry-quiz');
    if (btnRetry) btnRetry.addEventListener('click', startQuiz);

    // Back from result to list
    const btnDone = document.getElementById('btn-quiz-done');
    if (btnDone) btnDone.addEventListener('click', closeDetail);

    // Enter key for fill
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' && currentMode === 'quiz' && !quizAnswered) {
        const q = quizQuestions[quizIndex];
        if (q && q.type === 'fill') checkFill();
      }
    });
  }

  // ── Init ───────────────────────────────────────────────────
  function init() {
    renderStats();
    renderList();
    bindEvents();
  }

  init();

})();
