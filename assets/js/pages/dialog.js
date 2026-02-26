/**
 * EnglishPath — Dialog A1–A2 Page
 * Fase 7 — v0.8.0
 * IIFE module pattern
 */

(function DialogPage() {
  'use strict';

  Router.guard();
  App.init('foundation-dialog');

  const user = Auth.getActiveUser();
  const STORAGE_KEY = 'dialog_foundation';

  // ── State ─────────────────────────────────────────────────
  let currentSceneId    = null;
  let currentFilter     = 'all';
  let currentMode       = 'dialog'; // 'dialog' | 'vocab' | 'exercise'
  let showTranslation   = false;
  let playAllIndex      = 0;
  let playAllTimer      = null;

  // Exercise state
  let exQuestions  = [];
  let exIndex      = 0;
  let exScore      = 0;
  let exAnswered   = false;

  // ── Speech ────────────────────────────────────────────────
  const tts    = window.speechSynthesis;
  const hasTTS = !!tts;

  function speak(text, onEnd) {
    if (!hasTTS) return;
    tts.cancel();
    const utter   = new SpeechSynthesisUtterance(text);
    utter.lang    = 'en-GB';
    utter.rate    = 0.85;
    utter.pitch   = 1;
    const voices  = tts.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('uk'))
                 || voices.find(v => v.lang.startsWith('en'));
    if (enVoice) utter.voice = enVoice;
    if (onEnd) utter.onend = onEnd;
    tts.speak(utter);
  }

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
      scenesRead:      {},  // { sceneId: true }
      exerciseResults: {},  // { sceneId: { best, attempts } }
      totalXP:         0,
      exercisesDone:   0,
    };
  }

  // ── Stats Bar ─────────────────────────────────────────────
  function renderStatsBar() {
    const stats   = loadStats();
    const scenes  = DIALOG_DATA.getScenes();
    const done    = scenes.filter(s => {
      const r = stats.exerciseResults[s.id];
      return r && r.best >= Math.ceil(s.exercises.length * 0.6);
    }).length;

    document.getElementById('stat-scenes-done').textContent   = done;
    document.getElementById('stat-exercises-done').textContent = stats.exercisesDone || 0;
    document.getElementById('stat-total-xp').textContent      = stats.totalXP || 0;

    const allBests = scenes.map(s => {
      const r = stats.exerciseResults[s.id];
      return r ? Math.round((r.best / s.exercises.length) * 100) : null;
    }).filter(v => v !== null);
    const bestPct = allBests.length ? Math.max(...allBests) : null;
    document.getElementById('stat-best-score').textContent = bestPct !== null ? `${bestPct}%` : '—';

    // header
    document.getElementById('hdr-completed').textContent = `${done} selesai`;
  }

  // ── Filter bar ────────────────────────────────────────────
  function renderFilterBar() {
    const bar  = document.getElementById('filter-bar');
    const cats = DIALOG_DATA.getCategories();
    const extra = cats.map(c => `
      <button class="filter-btn" data-filter="${c.id}">${c.icon} ${c.label}</button>
    `).join('');
    bar.innerHTML = `<button class="filter-btn active" data-filter="all">Semua</button>${extra}`;

    bar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderScenesGrid();
      });
    });
  }

  // ── Scenes Grid ───────────────────────────────────────────
  function renderScenesGrid() {
    const stats   = loadStats();
    const scenes  = DIALOG_DATA.getByCategory(currentFilter);
    const grid    = document.getElementById('scenes-grid');
    const cats    = DIALOG_DATA.getCategories();
    const catMap  = {};
    cats.forEach(c => { catMap[c.id] = c.label; });

    grid.innerHTML = scenes.map(s => {
      const r    = stats.exerciseResults[s.id];
      const done = r && r.best >= Math.ceil(s.exercises.length * 0.6);
      const read = stats.scenesRead[s.id];
      const pct  = r ? Math.round((r.best / s.exercises.length) * 100) : 0;

      return `
        <div class="scene-card ${done ? 'completed' : ''}" data-scene-id="${s.id}">
          <div class="scene-card-top">
            <div class="scene-icon">${s.icon}</div>
            <div class="scene-info">
              <h3>${escapeHTML(s.title)}</h3>
              <p>${escapeHTML(s.desc)}</p>
            </div>
          </div>
          <div class="scene-meta">
            <span class="scene-badge level-${s.level.toLowerCase()}">${s.level}</span>
            <span class="scene-badge cat">${escapeHTML(catMap[s.category] || s.category)}</span>
            ${read ? '<span class="scene-badge cat" style="color:var(--color-primary)">📖 Dibaca</span>' : ''}
            ${r ? `<span class="scene-badge cat">🏆 ${pct}%</span>` : ''}
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.scene-card').forEach(el => {
      el.addEventListener('click', () => openScene(el.dataset.sceneId));
    });
  }

  // ── Open Scene ────────────────────────────────────────────
  function openScene(sceneId) {
    const scene = DIALOG_DATA.getScene(sceneId);
    if (!scene) return;

    currentSceneId  = sceneId;
    currentMode     = 'dialog';
    showTranslation = false;

    // Mark as read
    const stats = loadStats();
    stats.scenesRead[sceneId] = true;
    saveStats(stats);

    // Update header
    document.getElementById('detail-icon').textContent    = scene.icon;
    document.getElementById('detail-title').textContent   = scene.title;
    document.getElementById('detail-desc').textContent    = scene.desc;
    document.getElementById('detail-setting').textContent = '📍 ' + scene.setting;

    // Show detail, hide list
    document.getElementById('scenes-view').style.display = 'none';
    document.getElementById('detail-view').classList.add('active');

    switchMode('dialog');
    renderDialogLines(scene);

    // Challenge tracking
    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onModuleVisit('dialog');

    // XP for reading a dialog (one-time per scene per day)
    const todayKey = 'dialog_xp_' + sceneId + '_' + new Date().toDateString();
    if (!sessionStorage.getItem(todayKey)) {
      sessionStorage.setItem(todayKey, '1');
      if (typeof XPSystem !== 'undefined') XPSystem.addXP(5, 'study', `Dialog: ${scene.title}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Render Dialog Lines ───────────────────────────────────
  function renderDialogLines(scene) {
    const container = document.getElementById('dialog-lines');
    container.innerHTML = scene.lines.map((line, idx) => {
      const initial = line.name.charAt(0).toUpperCase();
      const isB     = line.speaker === 'B';
      return `
        <div class="dialog-line ${isB ? 'speaker-b' : 'speaker-a'}" data-idx="${idx}">
          <div class="speaker-avatar">${escapeHTML(initial)}</div>
          <div class="dialog-bubble-wrap">
            <div class="speaker-name">${escapeHTML(line.name)}</div>
            <div class="dialog-bubble">
              <div class="bubble-text">${escapeHTML(line.text)}</div>
              <div class="bubble-translation ${showTranslation ? 'show' : ''}">${escapeHTML(line.translation)}</div>
              <div class="bubble-actions">
                <button class="btn-speak-line" data-text="${escapeAttr(line.text)}">🔊 Dengarkan</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Speak buttons
    container.querySelectorAll('.btn-speak-line').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-text');
        speak(text);
      });
    });

    // Update translation button
    const toggleBtn = document.getElementById('btn-toggle-translation');
    toggleBtn.textContent  = showTranslation ? 'Sembunyikan' : 'Tampilkan';
    toggleBtn.className    = 'toggle-translation-btn ' + (showTranslation ? 'on' : '');
  }

  // ── Render Vocab ──────────────────────────────────────────
  function renderVocab(scene) {
    const container = document.getElementById('vocab-list');
    container.innerHTML = scene.vocabulary.map(v => `
      <div class="vocab-item">
        <div>
          <div class="vocab-word">${escapeHTML(v.word)}</div>
          <div class="vocab-meaning">${escapeHTML(v.meaning)}</div>
        </div>
        <button class="btn-speak-vocab" data-text="${escapeAttr(v.word)}">🔊</button>
      </div>
    `).join('');

    container.querySelectorAll('.btn-speak-vocab').forEach(btn => {
      btn.addEventListener('click', () => speak(btn.getAttribute('data-text')));
    });
  }

  // ── Switch Mode ───────────────────────────────────────────
  function switchMode(mode) {
    currentMode = mode;
    const scene = DIALOG_DATA.getScene(currentSceneId);

    // Tab buttons
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    // Panels
    document.getElementById('panel-dialog').classList.toggle('active',   mode === 'dialog');
    document.getElementById('panel-vocab').classList.toggle('active',    mode === 'vocab');
    document.getElementById('panel-exercise').classList.toggle('active', mode === 'exercise');

    if (mode === 'vocab' && scene) renderVocab(scene);
    if (mode === 'exercise' && scene) initExercise(scene);
  }

  // ── Exercise ──────────────────────────────────────────────
  function initExercise(scene) {
    exQuestions = shuffle([...scene.exercises]);
    exIndex     = 0;
    exScore     = 0;
    exAnswered  = false;

    // Show start screen
    document.getElementById('ex-start-screen').style.display   = '';
    document.getElementById('ex-question-screen').classList.remove('active');
    document.getElementById('ex-result-screen').classList.remove('active');

    document.getElementById('ex-start-title').textContent = 'Latihan: ' + scene.title;
    document.getElementById('ex-start-desc').textContent  = `Uji pemahamanmu tentang dialog "${scene.title}" dengan ${exQuestions.length} soal.`;
    document.getElementById('ex-start-count').textContent = exQuestions.length;
  }

  function startExercise() {
    exIndex    = 0;
    exScore    = 0;
    exAnswered = false;

    document.getElementById('ex-start-screen').style.display   = 'none';
    document.getElementById('ex-question-screen').classList.add('active');
    document.getElementById('ex-result-screen').classList.remove('active');

    renderExerciseQuestion();
  }

  function renderExerciseQuestion() {
    exAnswered = false;
    const q    = exQuestions[exIndex];
    const total = exQuestions.length;

    // Progress
    document.getElementById('ex-progress-text').textContent = `Soal ${exIndex + 1} dari ${total}`;
    document.getElementById('ex-score-text').textContent    = `Benar: ${exScore}`;
    document.getElementById('ex-progress-fill').style.width = `${(exIndex / total) * 100}%`;

    // Type label
    document.getElementById('ex-type-label').textContent = q.type === 'mcq' ? 'PILIHAN GANDA' : 'ISI KOSONG';

    // Question
    document.getElementById('ex-question-text').textContent = q.question;

    // Reset feedback
    const fb = document.getElementById('ex-feedback');
    fb.className = 'qf-feedback';
    fb.textContent = '';

    // Reset buttons
    document.getElementById('ex-btn-check').style.display = 'inline-flex';
    document.getElementById('ex-btn-next').style.display  = 'none';

    // MCQ
    const mcqWrap  = document.getElementById('ex-mcq-wrap');
    const fillWrap = document.getElementById('ex-fill-wrap');

    if (q.type === 'mcq') {
      mcqWrap.style.display  = '';
      fillWrap.style.display = 'none';
      const opts = shuffle([...q.options]);
      mcqWrap.innerHTML = opts.map(opt => `
        <button class="qf-option" data-val="${escapeAttr(opt)}">${escapeHTML(opt)}</button>
      `).join('');
      mcqWrap.querySelectorAll('.qf-option').forEach(btn => {
        btn.addEventListener('click', () => {
          if (exAnswered) return;
          checkExerciseMCQ(btn, q.answer);
        });
      });
    } else {
      mcqWrap.style.display  = 'none';
      fillWrap.style.display = '';
      const input = document.getElementById('ex-fill-input');
      input.value    = '';
      input.disabled = false;
      input.className = 'qf-fill-input';
      input.focus();
      input.onkeydown = (e) => {
        if (e.key === 'Enter' && !exAnswered) checkExerciseFill(q.answer);
      };
    }
  }

  function checkExerciseMCQ(btn, correct) {
    if (exAnswered) return;
    exAnswered = true;
    const selected = btn.getAttribute('data-val');
    const isOk     = selected.trim().toLowerCase() === correct.trim().toLowerCase();

    document.getElementById('ex-mcq-wrap').querySelectorAll('.qf-option').forEach(b => {
      b.disabled = true;
      if (b.getAttribute('data-val').trim().toLowerCase() === correct.trim().toLowerCase()) {
        b.classList.add('correct');
      }
    });

    if (!isOk) {
      btn.classList.add('wrong');
    } else {
      exScore++;
    }

    showExFeedback(isOk, correct);
    document.getElementById('ex-btn-check').style.display = 'none';
    document.getElementById('ex-btn-next').style.display  = 'inline-flex';
  }

  function checkExerciseFill(correct) {
    if (exAnswered) return;
    exAnswered = true;
    const input    = document.getElementById('ex-fill-input');
    const userVal  = input.value.trim().toLowerCase();
    const isOk     = userVal === correct.trim().toLowerCase();

    input.disabled = true;
    input.className = 'qf-fill-input ' + (isOk ? 'correct' : 'wrong');

    if (isOk) exScore++;
    showExFeedback(isOk, correct);
    document.getElementById('ex-btn-check').style.display = 'none';
    document.getElementById('ex-btn-next').style.display  = 'inline-flex';
  }

  function showExFeedback(isOk, correct) {
    const fb = document.getElementById('ex-feedback');
    fb.classList.add('show');
    if (isOk) {
      fb.classList.add('ok');
      fb.textContent = '✅ Benar! Bagus sekali!';
    } else {
      fb.classList.add('bad');
      fb.textContent = `❌ Kurang tepat. Jawaban: "${correct}"`;
    }
  }

  function nextExercise() {
    exIndex++;
    if (exIndex >= exQuestions.length) {
      showExerciseResult();
    } else {
      renderExerciseQuestion();
    }
  }

  function showExerciseResult() {
    document.getElementById('ex-question-screen').classList.remove('active');
    document.getElementById('ex-result-screen').classList.add('active');

    const total = exQuestions.length;
    const pct   = Math.round((exScore / total) * 100);
    const scene = DIALOG_DATA.getScene(currentSceneId);

    // Emoji
    let emoji = '💪';
    if (pct === 100) emoji = '🏆';
    else if (pct >= 80) emoji = '🎉';
    else if (pct >= 60) emoji = '👍';
    else if (pct >= 40) emoji = '📚';

    document.getElementById('ex-result-emoji').textContent = emoji;
    document.getElementById('ex-result-score').textContent = `${exScore}/${total}`;
    document.getElementById('ex-result-label').textContent = `(${pct}%) — ${getResultLabel(pct)}`;

    let xp = exScore * 3;
    if (pct === 100) xp += 20;
    document.getElementById('ex-result-xp').textContent = `+${xp} XP`;

    // Save
    const stats = loadStats();
    const prev  = stats.exerciseResults[currentSceneId] || { best: 0, attempts: 0 };
    stats.exerciseResults[currentSceneId] = {
      best:     Math.max(prev.best, exScore),
      attempts: (prev.attempts || 0) + 1,
    };
    stats.exercisesDone = (stats.exercisesDone || 0) + 1;
    stats.totalXP       = (stats.totalXP || 0) + xp;
    saveStats(stats);

    // Award XP
    if (typeof XPSystem !== 'undefined') {
      XPSystem.addXP(xp, 'quiz', `Dialog exercise: ${scene ? scene.title : ''}`);
    }

    // Challenge
    if (typeof ChallengeSystem !== 'undefined') {
      ChallengeSystem.onQuizComplete('dialog', exScore, total);
    }

    // Badge check
    if (typeof BadgeSystem !== 'undefined') BadgeSystem.checkAndAward();

    renderStatsBar();
    renderScenesGrid();
  }

  function getResultLabel(pct) {
    if (pct === 100) return 'Sempurna!';
    if (pct >= 80)   return 'Sangat bagus!';
    if (pct >= 60)   return 'Bagus! Terus berlatih!';
    if (pct >= 40)   return 'Lumayan, coba lagi ya!';
    return 'Yuk baca dialognya dulu!';
  }

  // ── Play All ──────────────────────────────────────────────
  function playAllLines(scene) {
    if (playAllTimer) clearTimeout(playAllTimer);
    playAllIndex = 0;

    function playNext() {
      if (playAllIndex >= scene.lines.length) return;
      const line = scene.lines[playAllIndex];
      playAllIndex++;
      speak(line.text, () => {
        playAllTimer = setTimeout(playNext, 400);
      });
    }

    playNext();
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
    // Back button
    document.getElementById('btn-back-to-scenes').addEventListener('click', () => {
      if (playAllTimer) { clearTimeout(playAllTimer); tts && tts.cancel(); }
      document.getElementById('scenes-view').style.display = '';
      document.getElementById('detail-view').classList.remove('active');
      currentSceneId = null;
      renderStatsBar();
      renderScenesGrid();
    });

    // Mode tabs
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchMode(btn.dataset.mode));
    });

    // Toggle translation
    document.getElementById('btn-toggle-translation').addEventListener('click', () => {
      showTranslation = !showTranslation;
      const scene = DIALOG_DATA.getScene(currentSceneId);
      if (scene) renderDialogLines(scene);
    });

    // Play all
    document.getElementById('btn-play-all').addEventListener('click', () => {
      const scene = DIALOG_DATA.getScene(currentSceneId);
      if (scene) playAllLines(scene);
    });

    // Go to vocab
    document.getElementById('btn-go-to-vocab').addEventListener('click', () => switchMode('vocab'));

    // Go to exercise
    document.getElementById('btn-go-to-exercise').addEventListener('click', () => switchMode('exercise'));

    // Exercise start
    document.getElementById('btn-start-exercise').addEventListener('click', startExercise);

    // Exercise check
    document.getElementById('ex-btn-check').addEventListener('click', () => {
      if (exAnswered) return;
      const q = exQuestions[exIndex];
      if (q.type === 'fill') {
        checkExerciseFill(q.answer);
      } else {
        App.toast('Pilih salah satu jawaban!', 'info');
      }
    });

    // Exercise next
    document.getElementById('ex-btn-next').addEventListener('click', nextExercise);

    // Exercise retry
    document.getElementById('ex-btn-retry').addEventListener('click', () => {
      const scene = DIALOG_DATA.getScene(currentSceneId);
      if (scene) initExercise(scene);
    });

    // Exercise back from result
    document.getElementById('ex-btn-back-result').addEventListener('click', () => switchMode('dialog'));
  }

  // ── Init ──────────────────────────────────────────────────
  function init() {
    const stats_global = DIALOG_DATA.getStats();

    document.getElementById('hdr-scenes').textContent    = `${stats_global.total} dialog`;
    document.getElementById('hdr-exercises').textContent = `${stats_global.totalExercises}+ latihan`;

    renderFilterBar();
    renderScenesGrid();
    renderStatsBar();
    bindEvents();
  }

  init();

})();
