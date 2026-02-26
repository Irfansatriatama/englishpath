/**
 * EnglishPath — TOEFL iBT Speaking Module
 * Fase 15c-1: Practice Speaking & Writing
 * localStorage: ep_user_{id}_toefl_speaking
 */
const TOEFLSpeaking = (() => {

  // ── State ──────────────────────────────────────────────
  let _state = {
    view: 'menu',       // menu | task1 | task2 | task3 | task4
    activeTab: 'task1',
    itemId: null,
    phase: 'reading',   // reading | listening | prep | speaking | result
    timerInterval: null,
    timerSeconds: 0
  };

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  // ── Storage ────────────────────────────────────────────
  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, 'toefl_speaking') || {};
  }

  function _saveAttempt(task, itemId, selfScore) {
    const uid = _uid();
    if (!uid) return;
    const data = _loadData();
    if (!data.results) data.results = {};
    const key = `${task}_${itemId}`;
    const prev = data.results[key] || { attempts: 0 };
    data.results[key] = {
      attempts: prev.attempts + 1,
      lastSelfScore: selfScore,
      lastDate: new Date().toISOString().split('T')[0]
    };
    if (!data.totalAttempts) data.totalAttempts = 0;
    data.totalAttempts += 1;
    Storage.setUser(uid, 'toefl_speaking', data);
  }

  function _getAttempt(task, itemId) {
    const data = _loadData();
    if (!data.results) return null;
    return data.results[`${task}_${itemId}`] || null;
  }

  // ── TTS ────────────────────────────────────────────────
  let _ttsBtnActive = null;

  function _speak(text, btnEl) {
    if (!('speechSynthesis' in window)) {
      App.showToast('Browser tidak mendukung Text-to-Speech', 'error'); return;
    }
    speechSynthesis.cancel();
    if (_ttsBtnActive === btnEl) {
      _ttsBtnActive = null;
      if (btnEl) { btnEl.textContent = '🔊 Putar'; btnEl.classList.remove('playing'); }
      return;
    }
    if (_ttsBtnActive) {
      _ttsBtnActive.textContent = '🔊 Putar';
      _ttsBtnActive.classList.remove('playing');
    }
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US'; utt.rate = 0.88; utt.pitch = 1;
    _ttsBtnActive = btnEl;
    if (btnEl) { btnEl.textContent = '⏸ Berhenti'; btnEl.classList.add('playing'); }
    utt.onend = utt.onerror = () => {
      _ttsBtnActive = null;
      if (btnEl) { btnEl.textContent = '🔊 Putar'; btnEl.classList.remove('playing'); }
    };
    speechSynthesis.speak(utt);
  }

  function _speakScript(lines, idx, onComplete) {
    if (idx >= lines.length) { if (onComplete) onComplete(); return; }
    const line = lines[idx];
    const utt = new SpeechSynthesisUtterance(line.speaker + '. ' + line.text);
    utt.lang = 'en-US'; utt.rate = 0.88; utt.pitch = 1;
    // Highlight active line
    document.querySelectorAll('.toefl-script-line').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });
    utt.onend = utt.onerror = () => { _speakScript(lines, idx + 1, onComplete); };
    speechSynthesis.speak(utt);
  }

  // ── Timer ──────────────────────────────────────────────
  function _stopTimer() {
    if (_state.timerInterval) { clearInterval(_state.timerInterval); _state.timerInterval = null; }
  }

  function _startTimer(seconds, displayId, onEnd) {
    _stopTimer();
    _state.timerSeconds = seconds;
    _tick(displayId);
    _state.timerInterval = setInterval(() => {
      _state.timerSeconds--;
      _tick(displayId);
      if (_state.timerSeconds <= 0) {
        _stopTimer();
        App.showToast('Waktu habis!', 'warning');
        if (onEnd) onEnd();
      }
    }, 1000);
  }

  function _tick(displayId) {
    const el = document.getElementById(displayId);
    if (!el) return;
    const m = Math.floor(_state.timerSeconds / 60);
    const s = _state.timerSeconds % 60;
    el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    el.className = 'toefl-timer-display' +
      (_state.timerSeconds <= 10 ? ' urgent' : _state.timerSeconds <= 20 ? ' warning' : '');
  }

  // ── Container ──────────────────────────────────────────
  function _c() { return document.getElementById('speaking-content'); }

  // ── SIDEBAR NAVIGATION ─────────────────────────────────
  function _sidebar() {
    const TASK_LABELS = {
      task1: 'Task 1 — Independent',
      task2: 'Task 2 — Campus Announcement',
      task3: 'Task 3 — Academic Concept',
      task4: 'Task 4 — Academic Lecture'
    };
    return `
      <div class="toefl-skill-tabs">
        ${Object.entries(TASK_LABELS).map(([k, v]) => `
          <button class="toefl-skill-tab ${_state.activeTab === k ? 'active' : ''}" data-tab="${k}">${v}</button>
        `).join('')}
      </div>`;
  }

  // ── MENU ───────────────────────────────────────────────
  function _renderMenu() {
    _stopTimer(); speechSynthesis.cancel();
    _state.view = 'menu';
    const data = _loadData();

    let content = '';

    if (_state.activeTab === 'task1') {
      const items = TOEFLSpeakingData.getTask1Prompts();
      content = `
        <div class="toefl-skill-desc">
          <strong>Task 1 — Independent Speaking:</strong> Kamu diberi sebuah pertanyaan atau topik, punya <strong>15 detik persiapan</strong> dan <strong>45 detik untuk berbicara</strong>. Nyatakan pendapat dengan jelas dan dukung dengan alasan spesifik.
        </div>
        <div class="toefl-skill-grid">
          ${items.map(item => {
            const att = _getAttempt('t1', item.id);
            return `<div class="toefl-skill-card" data-action="open-task1" data-id="${item.id}">
              <span class="toefl-skill-icon">${item.icon}</span>
              <div class="toefl-skill-title">${item.title}</div>
              <div class="toefl-skill-meta">
                <span>⏱ ${item.prepTime}s prep · ${item.speakTime}s speak</span>
                ${att ? `<span class="toefl-badge-score">Score ${att.lastSelfScore}/4</span>` : ''}
              </div>
              ${att ? '<div class="toefl-skill-done">✓ Dikerjakan</div>' : ''}
            </div>`;
          }).join('')}
        </div>`;
    } else if (_state.activeTab === 'task2') {
      const items = TOEFLSpeakingData.getTask2Items();
      content = `
        <div class="toefl-skill-desc">
          <strong>Task 2 — Campus Announcement:</strong> Baca pengumuman kampus (45 detik), dengarkan percakapan dua mahasiswa yang merespons pengumuman tersebut, kemudian bicara selama <strong>60 detik</strong> menyampaikan opini salah satu pembicara beserta alasannya.
        </div>
        <div class="toefl-skill-grid">
          ${items.map(item => {
            const att = _getAttempt('t2', item.id);
            return `<div class="toefl-skill-card" data-action="open-task2" data-id="${item.id}">
              <span class="toefl-skill-icon">${item.icon}</span>
              <div class="toefl-skill-title">${item.title}</div>
              <div class="toefl-skill-meta">
                <span>📖 Baca + 🎧 Dengar + ⏱ ${item.speakTime}s speak</span>
                ${att ? `<span class="toefl-badge-score">Score ${att.lastSelfScore}/4</span>` : ''}
              </div>
              ${att ? '<div class="toefl-skill-done">✓ Dikerjakan</div>' : ''}
            </div>`;
          }).join('')}
        </div>`;
    } else if (_state.activeTab === 'task3') {
      const items = TOEFLSpeakingData.getTask3Items();
      content = `
        <div class="toefl-skill-desc">
          <strong>Task 3 — Academic Concept:</strong> Baca teks pendek tentang konsep akademik (45 detik), dengarkan penjelasan profesor dengan contoh, kemudian bicara selama <strong>60 detik</strong> menjelaskan konsep menggunakan contoh-contoh dari kuliah.
        </div>
        <div class="toefl-skill-grid">
          ${items.map(item => {
            const att = _getAttempt('t3', item.id);
            return `<div class="toefl-skill-card" data-action="open-task3" data-id="${item.id}">
              <span class="toefl-skill-icon">${item.icon}</span>
              <div class="toefl-skill-title">${item.title}</div>
              <div class="toefl-skill-meta">
                <span>📖 Baca + 🎧 Dengar + ⏱ ${item.speakTime}s speak</span>
                ${att ? `<span class="toefl-badge-score">Score ${att.lastSelfScore}/4</span>` : ''}
              </div>
              ${att ? '<div class="toefl-skill-done">✓ Dikerjakan</div>' : ''}
            </div>`;
          }).join('')}
        </div>`;
    } else {
      const items = TOEFLSpeakingData.getTask4Items();
      content = `
        <div class="toefl-skill-desc">
          <strong>Task 4 — Academic Lecture:</strong> Dengarkan ceramah singkat akademik, kemudian bicara selama <strong>60 detik</strong> menyampaikan ringkasan poin-poin utama dari ceramah tersebut.
        </div>
        <div class="toefl-skill-grid">
          ${items.map(item => {
            const att = _getAttempt('t4', item.id);
            return `<div class="toefl-skill-card" data-action="open-task4" data-id="${item.id}">
              <span class="toefl-skill-icon">${item.icon}</span>
              <div class="toefl-skill-title">${item.title}</div>
              <div class="toefl-skill-meta">
                <span>🎧 Dengar + ⏱ ${item.speakTime}s speak</span>
                ${att ? `<span class="toefl-badge-score">Score ${att.lastSelfScore}/4</span>` : ''}
              </div>
              ${att ? '<div class="toefl-skill-done">✓ Dikerjakan</div>' : ''}
            </div>`;
          }).join('')}
        </div>`;
    }

    _c().innerHTML = `
      <div class="toefl-skill-header">
        <h1 class="toefl-skill-title-main">🗣️ TOEFL iBT — Speaking Practice</h1>
        <p class="toefl-skill-subtitle">Latih 4 task speaking TOEFL iBT · Rubrik 0–4 · Model answer dengan TTS</p>
        <div class="toefl-skill-stats">
          <div class="toefl-stat-chip">📊 Total Latihan: <strong>${_loadData().totalAttempts || 0}</strong></div>
        </div>
      </div>
      ${_sidebar()}
      ${content}`;
    _bindMenuEvents();
  }

  function _bindMenuEvents() {
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        _state.activeTab = btn.dataset.tab;
        _renderMenu();
      });
    });
    document.querySelectorAll('[data-action="open-task1"]').forEach(el => {
      el.addEventListener('click', () => { _state.itemId = el.dataset.id; _renderTask1(); });
    });
    document.querySelectorAll('[data-action="open-task2"]').forEach(el => {
      el.addEventListener('click', () => { _state.itemId = el.dataset.id; _renderTask2Reading(); });
    });
    document.querySelectorAll('[data-action="open-task3"]').forEach(el => {
      el.addEventListener('click', () => { _state.itemId = el.dataset.id; _renderTask3Reading(); });
    });
    document.querySelectorAll('[data-action="open-task4"]').forEach(el => {
      el.addEventListener('click', () => { _state.itemId = el.dataset.id; _renderTask4Listening(); });
    });
  }

  // ── TASK 1: INDEPENDENT ────────────────────────────────
  function _renderTask1() {
    const item = TOEFLSpeakingData.getTask1ById(_state.itemId);
    if (!item) return _renderMenu();
    _state.view = 'task1';
    _state.phase = 'prep';

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 1 — Independent Speaking</span>
      </div>
      <div class="toefl-task-card">
        <div class="toefl-task-icon">${item.icon}</div>
        <h2 class="toefl-task-title">${item.title}</h2>
        <div class="toefl-task-prompt">${item.prompt}</div>

        <div class="toefl-key-points">
          <div class="toefl-key-label">💡 Poin kunci yang perlu kamu cover:</div>
          <ul>${item.keyPoints.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>

        <div class="toefl-timer-section" id="timer-section">
          <div class="toefl-timer-phase" id="timer-phase">⏱ Fase Persiapan</div>
          <div class="toefl-timer-display" id="timer-display">${item.prepTime}:00</div>
          <div class="toefl-timer-desc">Siapkan poin-poinmu sebelum berbicara</div>
        </div>

        <div class="toefl-task-actions" id="task-actions">
          <button class="btn btn-primary btn-lg" id="btn-start-prep" data-action="start-prep">▶ Mulai Persiapan (${item.prepTime} detik)</button>
        </div>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => _renderMenu());

    document.getElementById('btn-start-prep').addEventListener('click', () => {
      document.getElementById('task-actions').innerHTML = `<div class="toefl-prep-note">Siapkan jawabanmu...</div>`;
      const p = document.getElementById('timer-phase');
      _startTimer(item.prepTime, 'timer-display', () => {
        // After prep → speaking phase
        p.textContent = '🎙️ Fase Berbicara';
        document.getElementById('timer-section').classList.add('speaking-phase');
        document.getElementById('task-actions').innerHTML = `<button class="btn btn-success btn-lg" id="btn-stop-speak" data-action="stop-speak">⏹ Selesai Berbicara</button>`;
        _startTimer(item.speakTime, 'timer-display', () => {
          _showTask1Result(item);
        });
        document.getElementById('btn-stop-speak').addEventListener('click', () => {
          _stopTimer();
          _showTask1Result(item);
        });
      });
    });
  }

  function _showTask1Result(item) {
    _stopTimer();
    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 1 — Evaluasi Diri</span>
      </div>
      <div class="toefl-task-card">
        <h2 class="toefl-task-title">📋 Nilai Responmu</h2>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1.5rem;">
          Bandingkan jawabanmu dengan rubrik dan model answer di bawah.
        </p>

        <div class="toefl-rubric-box">
          <div class="toefl-rubric-title">📐 Rubrik Penilaian (Skala 0–4)</div>
          ${item.rubric.map(r => `
            <div class="toefl-rubric-row">
              <div class="toefl-rubric-criterion">${r.criterion}</div>
              <div class="toefl-rubric-desc">${r.desc}</div>
            </div>`).join('')}
        </div>

        <div class="toefl-model-section">
          <div class="toefl-model-label">🎯 Model Answer</div>
          <div class="toefl-model-text">${item.model}</div>
          <button class="btn btn-secondary" id="btn-tts-model">🔊 Dengarkan Model Answer</button>
        </div>

        <div class="toefl-self-assess">
          <div class="toefl-self-label">🏅 Berikan skor untuk responmu:</div>
          <div class="toefl-score-buttons">
            ${[0,1,2,3,4].map(sc => `
              <button class="toefl-score-btn" data-score="${sc}">
                <span class="toefl-score-num">${sc}</span>
                <span class="toefl-score-label">${['Tidak Memadai','Terbatas','Berkembang','Cukup Baik','Sangat Baik'][sc]}</span>
              </button>`).join('')}
          </div>
        </div>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => _renderMenu());
    document.getElementById('btn-tts-model').addEventListener('click', function() {
      _speak(item.model, this);
    });
    document.querySelectorAll('.toefl-score-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sc = parseInt(btn.dataset.score);
        _saveAttempt('t1', item.id, sc);
        XPSystem.addXP(sc >= 3 ? 15 : sc >= 2 ? 10 : 5);
        ChallengeSystem.onModuleVisit('toefl-speaking');
        App.showToast(`Skor ${sc}/4 disimpan. +${sc >= 3 ? 15 : 10} XP!`, 'success');
        setTimeout(() => _renderMenu(), 1500);
      });
    });
  }

  // ── TASK 2: CAMPUS ANNOUNCEMENT ────────────────────────
  function _renderTask2Reading() {
    const item = TOEFLSpeakingData.getTask2ById(_state.itemId);
    if (!item) return _renderMenu();
    _state.view = 'task2'; _state.phase = 'reading';

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 2 — Baca Pengumuman</span>
        <div class="toefl-timer-inline">
          <div class="toefl-timer-display sm" id="timer-display">${item.readTime}</div>
        </div>
      </div>
      <div class="toefl-task-card">
        <h2 class="toefl-reading-title">${item.readingTitle}</h2>
        <div class="toefl-reading-body">${item.readingText}</div>
        <div class="toefl-reading-note">📌 Catat poin-poin utama pengumuman ini. Timer berjalan otomatis.</div>
        <button class="btn btn-primary" id="btn-next-listen">Lanjut ke Percakapan →</button>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => { _stopTimer(); _renderMenu(); });
    document.getElementById('btn-next-listen').addEventListener('click', () => { _stopTimer(); _renderTask2Listening(); });
    _startTimer(item.readTime, 'timer-display', () => _renderTask2Listening());
  }

  function _renderTask2Listening() {
    const item = TOEFLSpeakingData.getTask2ById(_state.itemId);
    _state.phase = 'listening';
    let audioPlayed = false;

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 2 — Percakapan Mahasiswa</span>
      </div>
      <div class="toefl-task-card">
        <div class="toefl-listen-note">🎧 Dengarkan percakapan dua mahasiswa yang membahas pengumuman tersebut. Catat opini dan alasan pembicara utama.</div>
        <div class="toefl-script-box" id="script-box">
          ${item.listenScript.map((l, i) => `
            <div class="toefl-script-line" id="line-${i}">
              <span class="toefl-script-speaker">${l.speaker}:</span>
              <span class="toefl-script-text">${l.text}</span>
            </div>`).join('')}
        </div>
        <div class="toefl-listen-actions">
          <button class="btn btn-secondary" id="btn-play-audio">🔊 Putar Percakapan</button>
          <button class="btn btn-primary" id="btn-next-speak" disabled>Lanjut ke Berbicara →</button>
        </div>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => { speechSynthesis.cancel(); _renderMenu(); });
    document.getElementById('btn-play-audio').addEventListener('click', function() {
      speechSynthesis.cancel();
      this.textContent = '⏸ Memutar...'; this.disabled = true;
      _speakScript(item.listenScript, 0, () => {
        this.textContent = '🔊 Putar Ulang'; this.disabled = false;
        audioPlayed = true;
        document.getElementById('btn-next-speak').disabled = false;
      });
    });
    document.getElementById('btn-next-speak').addEventListener('click', () => {
      speechSynthesis.cancel();
      _renderTask2Speaking();
    });
  }

  function _renderTask2Speaking() {
    const item = TOEFLSpeakingData.getTask2ById(_state.itemId);
    _state.phase = 'prep';

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 2 — Berbicara</span>
      </div>
      <div class="toefl-task-card">
        <div class="toefl-task-prompt">${item.prompt}</div>
        <div class="toefl-timer-section">
          <div class="toefl-timer-phase" id="timer-phase">⏱ Fase Persiapan (${item.prepTime}s)</div>
          <div class="toefl-timer-display" id="timer-display">${item.prepTime}</div>
        </div>
        <div id="task-actions">
          <button class="btn btn-primary btn-lg" id="btn-start-prep">▶ Mulai Persiapan</button>
        </div>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => { _stopTimer(); _renderMenu(); });
    document.getElementById('btn-start-prep').addEventListener('click', () => {
      document.getElementById('task-actions').innerHTML = '<div class="toefl-prep-note">Persiapkan responsmu...</div>';
      _startTimer(item.prepTime, 'timer-display', () => {
        document.getElementById('timer-phase').textContent = '🎙️ Fase Berbicara (60s)';
        document.getElementById('task-actions').innerHTML = `<button class="btn btn-success btn-lg" id="btn-stop">⏹ Selesai</button>`;
        _startTimer(item.speakTime, 'timer-display', () => _showIntegratedResult('t2', item));
        document.getElementById('btn-stop').addEventListener('click', () => { _stopTimer(); _showIntegratedResult('t2', item); });
      });
    });
  }

  // ── TASK 3: ACADEMIC CONCEPT ───────────────────────────
  function _renderTask3Reading() {
    const item = TOEFLSpeakingData.getTask3ById(_state.itemId);
    if (!item) return _renderMenu();
    _state.view = 'task3'; _state.phase = 'reading';

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 3 — Baca Teks Akademik</span>
        <div class="toefl-timer-inline">
          <div class="toefl-timer-display sm" id="timer-display">${item.readTime}</div>
        </div>
      </div>
      <div class="toefl-task-card">
        <h2 class="toefl-reading-title">${item.readingTitle}</h2>
        <div class="toefl-reading-body">${item.readingText}</div>
        <div class="toefl-reading-note">📌 Pahami konsep akademik dalam teks ini. Kamu akan diminta menjelaskannya menggunakan contoh dari kuliah.</div>
        <button class="btn btn-primary" id="btn-next-listen">Lanjut ke Kuliah →</button>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => { _stopTimer(); _renderMenu(); });
    document.getElementById('btn-next-listen').addEventListener('click', () => { _stopTimer(); _renderTask3Listening(); });
    _startTimer(item.readTime, 'timer-display', () => _renderTask3Listening());
  }

  function _renderTask3Listening() {
    const item = TOEFLSpeakingData.getTask3ById(_state.itemId);
    _state.phase = 'listening';

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 3 — Dengarkan Kuliah</span>
      </div>
      <div class="toefl-task-card">
        <div class="toefl-listen-note">🎧 Dengarkan profesor menjelaskan konsep dengan contoh konkret. Catat contoh-contoh yang diberikan.</div>
        <div class="toefl-script-box" id="script-box">
          ${item.listenScript.map((l, i) => `
            <div class="toefl-script-line" id="line-${i}">
              <span class="toefl-script-speaker">${l.speaker}:</span>
              <span class="toefl-script-text">${l.text}</span>
            </div>`).join('')}
        </div>
        <div class="toefl-listen-actions">
          <button class="btn btn-secondary" id="btn-play">🔊 Putar Kuliah</button>
          <button class="btn btn-primary" id="btn-next" disabled>Lanjut ke Berbicara →</button>
        </div>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => { speechSynthesis.cancel(); _renderMenu(); });
    document.getElementById('btn-play').addEventListener('click', function() {
      speechSynthesis.cancel();
      this.textContent = '⏸ Memutar...'; this.disabled = true;
      _speakScript(item.listenScript, 0, () => {
        this.textContent = '🔊 Putar Ulang'; this.disabled = false;
        document.getElementById('btn-next').disabled = false;
      });
    });
    document.getElementById('btn-next').addEventListener('click', () => { speechSynthesis.cancel(); _renderTask3Speaking(); });
  }

  function _renderTask3Speaking() {
    const item = TOEFLSpeakingData.getTask3ById(_state.itemId);
    _state.phase = 'prep';

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 3 — Berbicara</span>
      </div>
      <div class="toefl-task-card">
        <div class="toefl-task-prompt">${item.prompt}</div>
        <div class="toefl-timer-section">
          <div class="toefl-timer-phase" id="timer-phase">⏱ Persiapan (${item.prepTime}s)</div>
          <div class="toefl-timer-display" id="timer-display">${item.prepTime}</div>
        </div>
        <div id="task-actions">
          <button class="btn btn-primary btn-lg" id="btn-start-prep">▶ Mulai Persiapan</button>
        </div>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => { _stopTimer(); _renderMenu(); });
    document.getElementById('btn-start-prep').addEventListener('click', () => {
      document.getElementById('task-actions').innerHTML = '<div class="toefl-prep-note">Persiapkan responsmu...</div>';
      _startTimer(item.prepTime, 'timer-display', () => {
        document.getElementById('timer-phase').textContent = '🎙️ Berbicara (60s)';
        document.getElementById('task-actions').innerHTML = `<button class="btn btn-success btn-lg" id="btn-stop">⏹ Selesai</button>`;
        _startTimer(item.speakTime, 'timer-display', () => _showIntegratedResult('t3', item));
        document.getElementById('btn-stop').addEventListener('click', () => { _stopTimer(); _showIntegratedResult('t3', item); });
      });
    });
  }

  // ── TASK 4: ACADEMIC LECTURE ───────────────────────────
  function _renderTask4Listening() {
    const item = TOEFLSpeakingData.getTask4ById(_state.itemId);
    if (!item) return _renderMenu();
    _state.view = 'task4'; _state.phase = 'listening';

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 4 — Dengarkan Kuliah</span>
      </div>
      <div class="toefl-task-card">
        <div class="toefl-listen-note">🎧 Dengarkan ceramah akademik berikut. Setelah selesai, kamu akan diminta menyampaikan ringkasan dalam 60 detik.</div>
        <div class="toefl-script-box">
          ${item.listenScript.map((l, i) => `
            <div class="toefl-script-line" id="line-${i}">
              <span class="toefl-script-speaker">${l.speaker}:</span>
              <span class="toefl-script-text">${l.text}</span>
            </div>`).join('')}
        </div>
        <div class="toefl-listen-actions">
          <button class="btn btn-secondary" id="btn-play">🔊 Putar Ceramah</button>
          <button class="btn btn-primary" id="btn-next" disabled>Lanjut ke Berbicara →</button>
        </div>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => { speechSynthesis.cancel(); _renderMenu(); });
    document.getElementById('btn-play').addEventListener('click', function() {
      speechSynthesis.cancel();
      this.textContent = '⏸ Memutar...'; this.disabled = true;
      _speakScript(item.listenScript, 0, () => {
        this.textContent = '🔊 Putar Ulang'; this.disabled = false;
        document.getElementById('btn-next').disabled = false;
      });
    });
    document.getElementById('btn-next').addEventListener('click', () => { speechSynthesis.cancel(); _renderTask4Speaking(); });
  }

  function _renderTask4Speaking() {
    const item = TOEFLSpeakingData.getTask4ById(_state.itemId);
    _state.phase = 'prep';

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 4 — Berbicara</span>
      </div>
      <div class="toefl-task-card">
        <div class="toefl-task-prompt">${item.prompt}</div>
        <div class="toefl-timer-section">
          <div class="toefl-timer-phase" id="timer-phase">⏱ Persiapan (20s)</div>
          <div class="toefl-timer-display" id="timer-display">20</div>
        </div>
        <div id="task-actions">
          <button class="btn btn-primary btn-lg" id="btn-start-prep">▶ Mulai Persiapan</button>
        </div>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => { _stopTimer(); _renderMenu(); });
    document.getElementById('btn-start-prep').addEventListener('click', () => {
      document.getElementById('task-actions').innerHTML = '<div class="toefl-prep-note">Persiapkan ringkasanmu...</div>';
      _startTimer(20, 'timer-display', () => {
        document.getElementById('timer-phase').textContent = '🎙️ Berbicara (60s)';
        document.getElementById('task-actions').innerHTML = `<button class="btn btn-success btn-lg" id="btn-stop">⏹ Selesai</button>`;
        _startTimer(60, 'timer-display', () => _showIntegratedResult('t4', item));
        document.getElementById('btn-stop').addEventListener('click', () => { _stopTimer(); _showIntegratedResult('t4', item); });
      });
    });
  }

  // ── INTEGRATED RESULT (Tasks 2, 3, 4) ─────────────────
  function _showIntegratedResult(taskKey, item) {
    _stopTimer();
    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Evaluasi Diri</span>
      </div>
      <div class="toefl-task-card">
        <h2 class="toefl-task-title">📋 Nilai Responmu</h2>
        <div class="toefl-task-prompt" style="background:var(--bg-card);border-left:3px solid var(--color-primary);padding:1rem;border-radius:6px;margin-bottom:1.5rem;">
          <strong>Pertanyaan:</strong> ${item.prompt}
        </div>

        <div class="toefl-rubric-box">
          <div class="toefl-rubric-title">📐 Rubrik Penilaian (Skala 0–4)</div>
          ${item.rubric.map(r => `
            <div class="toefl-rubric-row">
              <div class="toefl-rubric-criterion">${r.criterion}</div>
              <div class="toefl-rubric-desc">${r.desc}</div>
            </div>`).join('')}
        </div>

        <div class="toefl-model-section">
          <div class="toefl-model-label">🎯 Model Answer</div>
          <div class="toefl-model-text">${item.model}</div>
          <button class="btn btn-secondary" id="btn-tts">🔊 Dengarkan Model Answer</button>
        </div>

        <div class="toefl-self-assess">
          <div class="toefl-self-label">🏅 Berikan skor untuk responmu:</div>
          <div class="toefl-score-buttons">
            ${[0,1,2,3,4].map(sc => `
              <button class="toefl-score-btn" data-score="${sc}">
                <span class="toefl-score-num">${sc}</span>
                <span class="toefl-score-label">${['Tidak Memadai','Terbatas','Berkembang','Cukup Baik','Sangat Baik'][sc]}</span>
              </button>`).join('')}
          </div>
        </div>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => _renderMenu());
    document.getElementById('btn-tts').addEventListener('click', function() { _speak(item.model, this); });
    document.querySelectorAll('.toefl-score-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sc = parseInt(btn.dataset.score);
        _saveAttempt(taskKey, item.id, sc);
        XPSystem.addXP(sc >= 3 ? 15 : 10);
        ChallengeSystem.onModuleVisit('toefl-speaking');
        App.showToast(`Skor ${sc}/4 disimpan. +${sc >= 3 ? 15 : 10} XP!`, 'success');
        setTimeout(() => _renderMenu(), 1500);
      });
    });
  }

  // ── INIT ───────────────────────────────────────────────
  return {
    init() {
      Router.guard();
      App.init('toefl-speaking');
      _renderMenu();
    }
  };

})();
