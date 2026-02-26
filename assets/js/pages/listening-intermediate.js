/**
 * EnglishPath — Listening Intermediate B1–B2 Page
 * Fase 9 — v1.0.0
 * IIFE module pattern
 */

(function ListeningIntermediatePage() {
  'use strict';

  Router.guard();
  App.init('intermediate-listening');

  const user        = Auth.getActiveUser();
  const STORAGE_KEY = 'listening_intermediate';

  // ── State ─────────────────────────────────────────────────
  let currentFilter  = 'all'; // 'all' | category string
  let currentTrack   = null;
  let currentMode    = 'listen'; // 'listen' | 'quiz'
  let transcriptShown = false;

  // Audio simulation state
  let ttsPlaying     = false;
  let ttsInstance    = null;
  let audioProgressTimer = null;
  let audioElapsed   = 0;
  let audioDuration  = 120; // seconds (estimated)

  // Quiz state
  let quizQuestions  = [];
  let quizIndex      = 0;
  let quizScore      = 0;
  let quizAnswered   = false;
  let currentQuizAudioText = '';

  // ── TTS ───────────────────────────────────────────────────
  const tts    = window.speechSynthesis;
  const hasTTS = !!tts;

  function getVoice() {
    const voices = tts.getVoices();
    return voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('uk'))
        || voices.find(v => v.lang.startsWith('en'))
        || null;
  }

  function speakText(text, rate, onEnd) {
    if (!hasTTS) { App.toast('Browser tidak mendukung TTS.', 'error'); return; }
    tts.cancel();
    const utt  = new SpeechSynthesisUtterance(text);
    utt.lang   = 'en-GB';
    utt.rate   = rate || 0.85;
    utt.pitch  = 1;
    const voice = getVoice();
    if (voice) utt.voice = voice;
    if (onEnd) utt.onend = onEnd;
    tts.speak(utt);
    ttsInstance = utt;
  }

  function stopTTS() {
    if (hasTTS) tts.cancel();
    ttsPlaying = false;
    ttsInstance = null;
    clearProgressTimer();
  }

  // ── Audio Progress Simulation ──────────────────────────────
  function startProgressTimer() {
    clearProgressTimer();
    audioElapsed = 0;
    audioProgressTimer = setInterval(() => {
      audioElapsed++;
      updateAudioProgress();
      if (audioElapsed >= audioDuration) {
        clearProgressTimer();
      }
    }, 1000);
  }

  function clearProgressTimer() {
    if (audioProgressTimer) {
      clearInterval(audioProgressTimer);
      audioProgressTimer = null;
    }
  }

  function updateAudioProgress() {
    const fill   = document.getElementById('audio-progress-fill');
    const elapsed = document.getElementById('audio-elapsed');
    const total   = document.getElementById('audio-total');
    const pct    = Math.min((audioElapsed / audioDuration) * 100, 100);

    if (fill) fill.style.width = pct + '%';
    if (elapsed) elapsed.textContent = formatTime(audioElapsed);
    if (total)   total.textContent   = formatTime(audioDuration);
  }

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  // ── Storage helpers ────────────────────────────────────────
  function loadProgress() {
    if (!user) return defaultProgress();
    return Storage.getUser(user.id, STORAGE_KEY, defaultProgress());
  }

  function defaultProgress() {
    return { completed: {}, scores: {}, totalListened: 0 };
  }

  function saveProgress(prog) {
    if (!user) return;
    Storage.setUser(user.id, STORAGE_KEY, prog);
  }

  function markTrackDone(trackId, score) {
    const prog   = loadProgress();
    const already = prog.completed[trackId];
    prog.completed[trackId] = true;
    if (!prog.scores[trackId] || score > prog.scores[trackId]) {
      prog.scores[trackId] = score;
    }
    if (!already) prog.totalListened = (prog.totalListened || 0) + 1;
    saveProgress(prog);
  }

  // ── Stats ──────────────────────────────────────────────────
  function renderStats() {
    const prog  = loadProgress();
    const all   = LISTENING_INTERMEDIATE_DATA.getAll();
    const done  = Object.keys(prog.completed).length;
    const scores = Object.values(prog.scores);
    const avg   = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

    const $s = id => document.getElementById(id);
    if ($s('stat-total'))   $s('stat-total').textContent   = all.length;
    if ($s('stat-done'))    $s('stat-done').textContent    = done;
    if ($s('stat-b1'))      $s('stat-b1').textContent      = LISTENING_INTERMEDIATE_DATA.getByLevel('B1').length;
    if ($s('stat-avg'))     $s('stat-avg').textContent     = avg + '%';
  }

  // ── List View ──────────────────────────────────────────────
  function renderList() {
    const prog   = loadProgress();
    const tracks = currentFilter === 'all'
      ? LISTENING_INTERMEDIATE_DATA.getAll()
      : LISTENING_INTERMEDIATE_DATA.getByCategory(currentFilter);

    const grid = document.getElementById('tracks-grid');
    if (!grid) return;

    grid.innerHTML = tracks.map(t => {
      const done  = prog.completed[t.id];
      const score = prog.scores[t.id];
      return `
        <div class="track-card ${done ? 'completed' : ''}" data-id="${t.id}">
          <div class="track-card-top">
            <div class="track-icon">${t.icon}</div>
            <div class="track-info">
              <h3>${t.title}</h3>
              <p>${t.description}</p>
            </div>
          </div>
          <div class="track-meta">
            <span class="level-badge ${t.level.toLowerCase()}">${t.level}</span>
            <span class="dur-badge">⏱ ${t.duration}</span>
            <span class="cat-badge">${t.category}</span>
            ${done ? `<span class="done-badge">✓ ${score}%</span>` : ''}
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.track-card').forEach(card => {
      card.addEventListener('click', () => openTrack(card.dataset.id));
    });
  }

  function buildCategoryFilter() {
    const cats = LISTENING_INTERMEDIATE_DATA.getCategories();
    const bar  = document.getElementById('cat-filter-bar');
    if (!bar) return;

    bar.innerHTML = cats.map(cat => `
      <button class="cat-tab-btn ${cat === 'all' ? 'active' : ''}" data-cat="${cat}">
        ${cat === 'all' ? '📋 Semua' : cat}
      </button>`).join('');

    bar.querySelectorAll('.cat-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.cat;
        bar.querySelectorAll('.cat-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderList();
      });
    });
  }

  // ── Detail View ────────────────────────────────────────────
  function openTrack(id) {
    currentTrack = LISTENING_INTERMEDIATE_DATA.getById(id);
    if (!currentTrack) return;

    stopTTS();
    transcriptShown = false;

    // Estimate duration from transcript word count (~130 words/min TTS)
    const words = currentTrack.transcript.join(' ').split(' ').length;
    audioDuration = Math.round((words / 130) * 60);

    // Module visit
    if (typeof ChallengeSystem !== 'undefined') {
      ChallengeSystem.onModuleVisit('listening_intermediate_' + id);
    }

    document.getElementById('list-view').style.display = 'none';
    const detail = document.getElementById('listening-detail');
    detail.classList.add('active');

    document.querySelector('.detail-back-bar h2').textContent =
      currentTrack.icon + ' ' + currentTrack.title;

    switchMode('listen');
    renderListenPanel();
    renderQuizPanel();
  }

  function closeDetail() {
    stopTTS();
    clearProgressTimer();
    document.getElementById('list-view').style.display = '';
    document.getElementById('listening-detail').classList.remove('active');
    currentTrack = null;
    renderList();
    renderStats();
  }

  // ── Mode Switching ─────────────────────────────────────────
  function switchMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    document.getElementById('panel-listen').classList.toggle('active', mode === 'listen');
    document.getElementById('panel-quiz').classList.toggle('active', mode === 'quiz');

    if (mode === 'quiz') {
      stopTTS();
      clearProgressTimer();
      updateAudioProgress();
    }
  }

  // ── Listen Panel ───────────────────────────────────────────
  function renderListenPanel() {
    const t = currentTrack;
    if (!t) return;

    const titleEl = document.getElementById('audio-track-title');
    if (titleEl) titleEl.textContent = t.title;

    const metaEl = document.getElementById('audio-meta');
    if (metaEl) metaEl.innerHTML = `<span>${t.level}</span><span>⏱ ${t.duration}</span><span>${t.category}</span>`;

    // Reset progress
    audioElapsed = 0;
    updateAudioProgress();

    // Waveform
    const waveform = document.getElementById('waveform');
    if (waveform) waveform.className = 'waveform';

    // Play button
    const btnPlay = document.getElementById('btn-play-main');
    if (btnPlay) {
      btnPlay.textContent = '▶';
      btnPlay.dataset.playing = 'false';
    }

    // Speed buttons
    document.querySelectorAll('.btn-speed').forEach(b => b.classList.remove('active'));
    const normalBtn = document.querySelector('.btn-speed[data-speed="0.85"]');
    if (normalBtn) normalBtn.classList.add('active');

    // Transcript
    renderTranscript();

    // Key phrases
    renderKeyPhrases();
  }

  function renderTranscript() {
    const t  = currentTrack;
    const el = document.getElementById('transcript-body');
    if (!el || !t) return;
    el.innerHTML = t.transcript.map(line =>
      `<p>${escHtml(line)}</p>`
    ).join('');
    el.classList.remove('revealed');

    const hint = document.getElementById('transcript-hint');
    if (hint) hint.style.display = 'block';

    const btnReveal = document.getElementById('btn-reveal-transcript');
    if (btnReveal) {
      btnReveal.textContent = '👁 Tampilkan Transkrip';
      transcriptShown = false;
    }
  }

  function renderKeyPhrases() {
    const t  = currentTrack;
    const el = document.getElementById('phrases-list');
    if (!el || !t) return;
    el.innerHTML = t.phrases.map(p => `
      <div class="phrase-item">
        <div class="phrase-en">${escHtml(p.en)}</div>
        <div class="phrase-id">${escHtml(p.id)}</div>
        <button class="btn-speak-phrase" data-phrase="${escHtml(p.en)}" title="Dengarkan">🔊</button>
      </div>`).join('');

    el.querySelectorAll('.btn-speak-phrase').forEach(btn => {
      btn.addEventListener('click', () => speakText(btn.dataset.phrase, 0.85));
    });
  }

  function playAudio(rate) {
    if (!currentTrack) return;
    const text = LISTENING_INTERMEDIATE_DATA.getTranscriptText(currentTrack.id);
    ttsPlaying = true;

    const waveform = document.getElementById('waveform');
    if (waveform) waveform.classList.add('playing');

    const btnPlay = document.getElementById('btn-play-main');
    if (btnPlay) { btnPlay.textContent = '⏸'; btnPlay.dataset.playing = 'true'; }

    startProgressTimer();

    speakText(text, rate, () => {
      ttsPlaying = false;
      if (waveform) waveform.classList.remove('playing');
      if (btnPlay) { btnPlay.textContent = '▶'; btnPlay.dataset.playing = 'false'; }
      clearProgressTimer();
    });
  }

  function pauseAudio() {
    stopTTS();
    clearProgressTimer();
    const waveform = document.getElementById('waveform');
    if (waveform) waveform.classList.remove('playing');
    const btnPlay = document.getElementById('btn-play-main');
    if (btnPlay) { btnPlay.textContent = '▶'; btnPlay.dataset.playing = 'false'; }
  }

  // ── Quiz Panel ─────────────────────────────────────────────
  function renderQuizPanel() {
    const t = currentTrack;
    if (!t) return;

    quizQuestions = LISTENING_INTERMEDIATE_DATA.getQuiz(t.id);
    quizIndex    = 0;
    quizScore    = 0;
    quizAnswered = false;

    const startScreen = document.getElementById('quiz-start-screen');
    const qScreen     = document.getElementById('quiz-question-screen');
    const rScreen     = document.getElementById('quiz-result-screen');

    if (startScreen) {
      startScreen.style.display = 'block';
      const prog = loadProgress();
      const prev = prog.scores[t.id];
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
    quizIndex    = 0;
    quizScore    = 0;
    quizAnswered = false;
    renderQuestion();
  }

  function renderQuestion() {
    const q  = quizQuestions[quizIndex];
    const el = document.getElementById('quiz-question-screen');
    if (!q || !el) return;

    // Store the audio context for this question
    currentQuizAudioText = q.audioRef || '';

    // Progress
    el.querySelector('.quiz-progress-info span:first-child').textContent =
      `Soal ${quizIndex + 1} / ${quizQuestions.length}`;
    el.querySelector('.quiz-progress-fill').style.width =
      ((quizIndex / quizQuestions.length) * 100) + '%';

    // Type label
    const typeMap = { mcq: 'Pilihan Ganda', fill: 'Isi Kosong', dictation: 'Dikte' };
    el.querySelector('.q-type-label').textContent = typeMap[q.type] || q.type.toUpperCase();

    // Audio ref
    const audioRef = el.querySelector('.q-audio-ref');
    if (audioRef && q.audioRef) {
      audioRef.innerHTML = `🎧 "${escHtml(q.audioRef)}" <button class="btn-replay-audio">▶ Dengarkan</button>`;
      const btnReplay = audioRef.querySelector('.btn-replay-audio');
      if (btnReplay) {
        btnReplay.addEventListener('click', () => speakText(q.audioRef, 0.8));
      }
    }

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
    } else if (q.type === 'dictation') {
      area.innerHTML = `<div class="dictation-wrap">
        <div class="dictation-hint">Ketik apa yang Anda dengar:</div>
        <textarea class="dictation-input" placeholder="Ketik kalimat yang didengar..."></textarea>
      </div>`;
    }

    // Reset feedback
    const fb = el.querySelector('.answer-feedback');
    fb.className = 'answer-feedback';
    fb.textContent = '';

    const btnCheck = el.querySelector('.btn-check');
    const btnNext  = el.querySelector('.btn-next');
    if (btnCheck) btnCheck.style.display = 'block';
    if (btnNext)  btnNext.style.display  = 'none';
    quizAnswered = false;

    // Auto-play audio ref
    if (q.audioRef) {
      setTimeout(() => speakText(q.audioRef, 0.8), 300);
    }
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

  function checkDictation() {
    if (quizAnswered) return;
    const q     = quizQuestions[quizIndex];
    const input = document.querySelector('.dictation-input');
    if (!input) return;
    // Normalize: lowercase, strip punctuation for comparison
    const normalize = str => str.toLowerCase().replace(/[.,!?'"]/g, '').trim();
    const val    = normalize(input.value);
    const ans    = normalize(q.answer);
    quizAnswered = true;

    // Allow partial match (>= 70% word match)
    const userWords = val.split(/\s+/);
    const ansWords  = ans.split(/\s+/);
    const matches   = userWords.filter(w => ansWords.includes(w)).length;
    const correct   = matches / ansWords.length >= 0.7;

    if (correct) {
      input.classList.add('correct');
      quizScore++;
      showFeedback(true, `✅ Benar! Jawaban: "${q.answer}"`);
    } else {
      input.classList.add('wrong');
      showFeedback(false, `❌ Jawaban benar: "${q.answer}"`);
    }
    input.disabled = true;
    showNextBtn();
  }

  function showFeedback(correct, msg) {
    const fb = document.querySelector('#quiz-question-screen .answer-feedback');
    if (!fb) return;
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

    const pct   = Math.round((quizScore / quizQuestions.length) * 100);
    const xp    = quizScore * 3 + (pct === 100 ? 20 : 0);
    const emoji = pct === 100 ? '🏆' : pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '🎧';

    rScreen.querySelector('.result-emoji').textContent  = emoji;
    rScreen.querySelector('.result-score').textContent  = pct + '%';
    rScreen.querySelector('.result-label').textContent  =
      `${quizScore} dari ${quizQuestions.length} soal benar`;
    rScreen.querySelector('.result-xp').textContent     = `+${xp} XP`;

    markTrackDone(currentTrack.id, pct);

    if (typeof XPSystem !== 'undefined') {
      XPSystem.addXP(xp, 'Selesaikan quiz listening: ' + currentTrack.title);
    }

    if (typeof ChallengeSystem !== 'undefined') {
      ChallengeSystem.onQuizComplete('listening_intermediate_' + currentTrack.id, pct);
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
    // Back button
    const btnBack = document.getElementById('btn-back');
    if (btnBack) btnBack.addEventListener('click', closeDetail);

    // Mode tabs
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchMode(btn.dataset.mode));
    });

    // Play/Pause main button
    const btnPlay = document.getElementById('btn-play-main');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        if (btnPlay.dataset.playing === 'true') {
          pauseAudio();
        } else {
          const activeSpeed = document.querySelector('.btn-speed.active');
          const rate = activeSpeed ? parseFloat(activeSpeed.dataset.speed) : 0.85;
          playAudio(rate);
        }
      });
    }

    // Speed buttons
    document.querySelectorAll('.btn-speed').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-speed').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (ttsPlaying) {
          pauseAudio();
          playAudio(parseFloat(btn.dataset.speed));
        }
      });
    });

    // Reveal transcript
    const btnReveal = document.getElementById('btn-reveal-transcript');
    if (btnReveal) {
      btnReveal.addEventListener('click', () => {
        transcriptShown = !transcriptShown;
        const body = document.getElementById('transcript-body');
        const hint = document.getElementById('transcript-hint');
        if (body) body.classList.toggle('revealed', transcriptShown);
        if (hint) hint.style.display = transcriptShown ? 'none' : 'block';
        btnReveal.textContent = transcriptShown ? '🙈 Sembunyikan Transkrip' : '👁 Tampilkan Transkrip';
      });
    }

    // Quiz start
    const btnStartQuiz = document.getElementById('btn-start-quiz');
    if (btnStartQuiz) btnStartQuiz.addEventListener('click', startQuiz);

    // Check button
    const btnCheck = document.querySelector('.btn-check');
    if (btnCheck) {
      btnCheck.addEventListener('click', () => {
        const q = quizQuestions[quizIndex];
        if (!q) return;
        if (q.type === 'fill') checkFill();
        else if (q.type === 'dictation') checkDictation();
        else App.toast('Klik salah satu pilihan jawaban.', 'info');
      });
    }

    // Next button
    const btnNext = document.querySelector('.btn-next');
    if (btnNext) btnNext.addEventListener('click', nextQuestion);

    // Retry
    const btnRetry = document.getElementById('btn-retry-quiz');
    if (btnRetry) btnRetry.addEventListener('click', startQuiz);

    // Done
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
    buildCategoryFilter();
    renderStats();
    renderList();
    bindEvents();
  }

  init();

})();
