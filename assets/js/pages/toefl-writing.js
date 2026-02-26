/**
 * EnglishPath — TOEFL iBT Writing Module
 * Fase 15c-1: Practice Speaking & Writing
 * localStorage: ep_user_{id}_toefl_writing
 */
const TOEFLWriting = (() => {

  // ── State ──────────────────────────────────────────────
  let _state = {
    view: 'menu',
    activeTab: 'task1',
    itemId: null,
    phase: 'reading',   // reading | listening | writing | result
    timerInterval: null,
    timerSeconds: 0,
    userText: '',
    audioPlayed: false
  };

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  // ── Storage ────────────────────────────────────────────
  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, 'toefl_writing') || {};
  }

  function _saveAttempt(task, itemId, wordCount, selfScore) {
    const uid = _uid();
    if (!uid) return;
    const data = _loadData();
    if (!data.results) data.results = {};
    const key = `${task}_${itemId}`;
    const prev = data.results[key] || { attempts: 0 };
    data.results[key] = {
      attempts: prev.attempts + 1,
      lastSelfScore: selfScore,
      lastWordCount: wordCount,
      lastDate: new Date().toISOString().split('T')[0]
    };
    if (!data.totalAttempts) data.totalAttempts = 0;
    data.totalAttempts += 1;
    Storage.setUser(uid, 'toefl_writing', data);
  }

  function _getAttempt(task, itemId) {
    const data = _loadData();
    if (!data.results) return null;
    return data.results[`${task}_${itemId}`] || null;
  }

  // ── TTS ────────────────────────────────────────────────
  let _ttsBtnActive = null;

  function _speak(text, btnEl) {
    if (!('speechSynthesis' in window)) { App.showToast('TTS tidak tersedia', 'error'); return; }
    speechSynthesis.cancel();
    if (_ttsBtnActive === btnEl) {
      _ttsBtnActive = null;
      if (btnEl) { btnEl.textContent = '🔊 Putar'; btnEl.classList.remove('playing'); }
      return;
    }
    if (_ttsBtnActive) { _ttsBtnActive.textContent = '🔊 Putar'; _ttsBtnActive.classList.remove('playing'); }
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
    document.querySelectorAll('.toefl-script-line').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });
    utt.onend = utt.onerror = () => _speakScript(lines, idx + 1, onComplete);
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
      if (_state.timerSeconds <= 0) { _stopTimer(); App.showToast('Waktu habis!', 'warning'); if (onEnd) onEnd(); }
    }, 1000);
  }

  function _tick(displayId) {
    const el = document.getElementById(displayId);
    if (!el) return;
    const m = Math.floor(_state.timerSeconds / 60);
    const s = _state.timerSeconds % 60;
    el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    el.className = 'toefl-timer-display' +
      (_state.timerSeconds <= 60 ? ' urgent' : _state.timerSeconds <= 180 ? ' warning' : '');
  }

  function _countWords(text) {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  }

  // ── Container ──────────────────────────────────────────
  function _c() { return document.getElementById('writing-content'); }

  // ── MENU ───────────────────────────────────────────────
  function _renderMenu() {
    _stopTimer(); speechSynthesis.cancel();
    _state.view = 'menu';
    const data = _loadData();

    let content = '';
    if (_state.activeTab === 'task1') {
      const items = TOEFLWritingData.getTask1Items();
      content = `
        <div class="toefl-skill-desc">
          <strong>Task 1 — Integrated Writing:</strong> Baca passage akademik, dengarkan ceramah yang menyanggahnya, lalu tulis respons <strong>150–225 kata</strong> dalam 20 menit yang merangkum argumen ceramah dan menjelaskan bagaimana argumen tersebut menyanggah bacaan.
        </div>
        <div class="toefl-skill-grid">
          ${items.map(item => {
            const att = _getAttempt('w1', item.id);
            return `<div class="toefl-skill-card" data-action="open-w1" data-id="${item.id}">
              <span class="toefl-skill-icon">${item.icon}</span>
              <div class="toefl-skill-title">${item.title}</div>
              <div class="toefl-skill-meta">
                <span>📖 Baca + 🎧 Dengar + ✍️ ${item.wordMin}–${item.wordMax} kata</span>
                ${att ? `<span class="toefl-badge-score">Score ${att.lastSelfScore}/5</span>` : ''}
              </div>
              ${att ? `<div class="toefl-skill-done">✓ ${att.lastWordCount} kata · Dikerjakan</div>` : ''}
            </div>`;
          }).join('')}
        </div>`;
    } else {
      const items = TOEFLWritingData.getTask2Items();
      content = `
        <div class="toefl-skill-desc">
          <strong>Task 2 — Academic Discussion:</strong> Baca posting diskusi dari profesor dan dua mahasiswa, lalu tulis respons <strong>minimal 100 kata</strong> dalam 10 menit yang berkontribusi pada diskusi akademik tersebut.
        </div>
        <div class="toefl-skill-grid">
          ${items.map(item => {
            const att = _getAttempt('w2', item.id);
            return `<div class="toefl-skill-card" data-action="open-w2" data-id="${item.id}">
              <span class="toefl-skill-icon">${item.icon}</span>
              <div class="toefl-skill-title">${item.title}</div>
              <div class="toefl-skill-meta">
                <span>💬 Diskusi Akademik · 100+ kata · ${item.timeLimit} menit</span>
                ${att ? `<span class="toefl-badge-score">Score ${att.lastSelfScore}/5</span>` : ''}
              </div>
              ${att ? `<div class="toefl-skill-done">✓ ${att.lastWordCount} kata · Dikerjakan</div>` : ''}
            </div>`;
          }).join('')}
        </div>`;
    }

    _c().innerHTML = `
      <div class="toefl-skill-header">
        <h1 class="toefl-skill-title-main">✍️ TOEFL iBT — Writing Practice</h1>
        <p class="toefl-skill-subtitle">Latih 2 task writing TOEFL iBT · Rubrik 0–5 · Model answer</p>
        <div class="toefl-skill-stats">
          <div class="toefl-stat-chip">📊 Total Latihan: <strong>${data.totalAttempts || 0}</strong></div>
        </div>
      </div>
      <div class="toefl-skill-tabs">
        <button class="toefl-skill-tab ${_state.activeTab === 'task1' ? 'active' : ''}" data-tab="task1">Task 1 — Integrated</button>
        <button class="toefl-skill-tab ${_state.activeTab === 'task2' ? 'active' : ''}" data-tab="task2">Task 2 — Academic Discussion</button>
      </div>
      ${content}`;

    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => { _state.activeTab = btn.dataset.tab; _renderMenu(); });
    });
    document.querySelectorAll('[data-action="open-w1"]').forEach(el => {
      el.addEventListener('click', () => { _state.itemId = el.dataset.id; _renderTask1Reading(); });
    });
    document.querySelectorAll('[data-action="open-w2"]').forEach(el => {
      el.addEventListener('click', () => { _state.itemId = el.dataset.id; _renderTask2Writing(); });
    });
  }

  // ── TASK 1: INTEGRATED ─────────────────────────────────
  function _renderTask1Reading() {
    const item = TOEFLWritingData.getTask1ById(_state.itemId);
    if (!item) return _renderMenu();
    _state.phase = 'reading';

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 1 — Baca Passage (3 menit)</span>
        <div class="toefl-timer-inline">
          <div class="toefl-timer-display sm" id="timer-display">3:00</div>
        </div>
      </div>
      <div class="toefl-task-card">
        <h2 class="toefl-reading-title">${item.readingTitle}</h2>
        <div class="toefl-reading-body">${item.readingText}</div>
        <div class="toefl-reading-note">📌 Catat argumen utama dan 3 poin pendukung dalam bacaan ini.</div>
        <button class="btn btn-primary" id="btn-next">Lanjut ke Ceramah →</button>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => { _stopTimer(); _renderMenu(); });
    document.getElementById('btn-next').addEventListener('click', () => { _stopTimer(); _renderTask1Listening(); });
    _startTimer(180, 'timer-display', () => _renderTask1Listening());
  }

  function _renderTask1Listening() {
    const item = TOEFLWritingData.getTask1ById(_state.itemId);
    _state.phase = 'listening';
    _state.audioPlayed = false;

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 1 — Dengarkan Ceramah</span>
      </div>
      <div class="toefl-task-card">
        <div class="toefl-listen-note">🎧 Dengarkan ceramah profesor. Perhatikan bagaimana setiap argumennya merespons poin dalam bacaan.</div>
        <div class="toefl-listen-note toefl-listen-highlight">📌 ${item.listenNote}</div>
        <div class="toefl-script-box">
          ${item.listenScript.map((l, i) => `
            <div class="toefl-script-line" id="line-${i}">
              <span class="toefl-script-speaker">${l.speaker}:</span>
              <span class="toefl-script-text">${l.text}</span>
            </div>`).join('')}
        </div>
        <div class="toefl-listen-actions">
          <button class="btn btn-secondary" id="btn-play">🔊 Putar Ceramah</button>
          <button class="btn btn-primary" id="btn-next" disabled>Lanjut ke Menulis →</button>
        </div>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => { speechSynthesis.cancel(); _renderMenu(); });
    document.getElementById('btn-play').addEventListener('click', function() {
      speechSynthesis.cancel();
      this.textContent = '⏸ Memutar...'; this.disabled = true;
      _speakScript(item.listenScript, 0, () => {
        this.textContent = '🔊 Putar Ulang'; this.disabled = false;
        _state.audioPlayed = true;
        document.getElementById('btn-next').disabled = false;
      });
    });
    document.getElementById('btn-next').addEventListener('click', () => { speechSynthesis.cancel(); _renderTask1Writing(); });
  }

  function _renderTask1Writing() {
    const item = TOEFLWritingData.getTask1ById(_state.itemId);
    _state.phase = 'writing';

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" id="btn-back">← Kembali</button>
        <span class="toefl-task-label">Task 1 — Menulis (${item.timeLimit} menit)</span>
        <div class="toefl-timer-inline">
          <div class="toefl-timer-display sm" id="timer-display">${item.timeLimit}:00</div>
        </div>
      </div>
      <div class="toefl-writing-layout">
        <div class="toefl-writing-reading-panel">
          <div class="toefl-panel-title">📖 Passage (Referensi)</div>
          <div class="toefl-reading-body sm">${item.readingText}</div>
        </div>
        <div class="toefl-writing-panel">
          <div class="toefl-writing-prompt">${item.prompt}</div>
          <div class="toefl-word-targets">
            <span>Target: <strong>${item.wordMin}–${item.wordMax} kata</strong></span>
            <span id="word-count-display" class="toefl-word-count">0 kata</span>
          </div>
          <textarea
            id="writing-area"
            class="toefl-textarea"
            placeholder="Tulis responsmu di sini..."
            spellcheck="false"
          ></textarea>
          <button class="btn btn-success btn-lg" id="btn-submit">✓ Selesai &amp; Evaluasi</button>
        </div>
      </div>`;

    const textarea = document.getElementById('writing-area');
    const wcDisplay = document.getElementById('word-count-display');

    textarea.addEventListener('input', () => {
      const wc = _countWords(textarea.value);
      wcDisplay.textContent = `${wc} kata`;
      wcDisplay.className = 'toefl-word-count' +
        (wc >= item.wordMin && wc <= item.wordMax ? ' ok' :
         wc > item.wordMax ? ' over' : ' under');
    });

    document.getElementById('btn-back').addEventListener('click', () => { _stopTimer(); speechSynthesis.cancel(); _renderMenu(); });
    document.getElementById('btn-submit').addEventListener('click', () => {
      _stopTimer();
      _state.userText = textarea.value;
      _showTask1Result(item);
    });
    _startTimer(item.timeLimit * 60, 'timer-display', () => {
      _state.userText = textarea.value;
      _showTask1Result(item);
    });
  }

  function _showTask1Result(item) {
    _stopTimer();
    const wc = _countWords(_state.userText);
    const withinRange = wc >= item.wordMin && wc <= item.wordMax;

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 1 — Evaluasi</span>
      </div>
      <div class="toefl-task-card">
        <div class="toefl-result-stats">
          <div class="toefl-result-stat ${withinRange ? 'ok' : 'warn'}">
            <div class="toefl-result-stat-num">${wc}</div>
            <div class="toefl-result-stat-label">Kata Ditulis</div>
          </div>
          <div class="toefl-result-stat">
            <div class="toefl-result-stat-num">${item.wordMin}–${item.wordMax}</div>
            <div class="toefl-result-stat-label">Target Kata</div>
          </div>
        </div>

        ${!withinRange ? `<div class="toefl-warning-box">${wc < item.wordMin ? `⚠️ Tulisanmu terlalu pendek. Target minimum ${item.wordMin} kata.` : `⚠️ Tulisanmu terlalu panjang. Target maksimum ${item.wordMax} kata.`}</div>` : ''}

        <div class="toefl-your-text-box">
          <div class="toefl-your-text-label">✏️ Tulisanmu:</div>
          <div class="toefl-your-text">${_state.userText.replace(/\n/g, '<br>') || '<em style="color:var(--text-secondary)">Tidak ada teks</em>'}</div>
        </div>

        <div class="toefl-rubric-box">
          <div class="toefl-rubric-title">📐 Rubrik Penilaian (Skala 0–5)</div>
          ${Object.entries(item.rubric).map(([sc, desc]) => `
            <div class="toefl-rubric-row">
              <div class="toefl-rubric-criterion">Skor ${sc}</div>
              <div class="toefl-rubric-desc">${desc}</div>
            </div>`).join('')}
        </div>

        <div class="toefl-model-section">
          <div class="toefl-model-label">🎯 Model Answer</div>
          <div class="toefl-model-text">${item.modelAnswer.replace(/\n\n/g, '<br><br>')}</div>
          <button class="btn btn-secondary" id="btn-tts">🔊 Dengarkan Model Answer</button>
        </div>

        <div class="toefl-self-assess">
          <div class="toefl-self-label">🏅 Berikan skor untuk tulisanmu:</div>
          <div class="toefl-score-buttons">
            ${[0,1,2,3,4,5].map(sc => `
              <button class="toefl-score-btn" data-score="${sc}">
                <span class="toefl-score-num">${sc}</span>
                <span class="toefl-score-label">${['—','Terbatas','Berkembang','Cukup Baik','Baik','Sangat Baik'][sc]}</span>
              </button>`).join('')}
          </div>
        </div>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => _renderMenu());
    document.getElementById('btn-tts').addEventListener('click', function() { _speak(item.modelAnswer, this); });
    document.querySelectorAll('.toefl-score-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sc = parseInt(btn.dataset.score);
        _saveAttempt('w1', item.id, wc, sc);
        XPSystem.addXP(sc >= 4 ? 20 : sc >= 3 ? 15 : 10);
        ChallengeSystem.onModuleVisit('toefl-writing');
        ChallengeSystem.onQuizComplete(sc >= 4);
        App.showToast(`Skor ${sc}/5 disimpan. +${sc >= 4 ? 20 : 15} XP!`, 'success');
        setTimeout(() => _renderMenu(), 1500);
      });
    });
  }

  // ── TASK 2: ACADEMIC DISCUSSION ────────────────────────
  function _renderTask2Writing() {
    const item = TOEFLWritingData.getTask2ById(_state.itemId);
    if (!item) return _renderMenu();
    _state.phase = 'writing';

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" id="btn-back">← Kembali</button>
        <span class="toefl-task-label">Task 2 — Academic Discussion (${item.timeLimit} menit)</span>
        <div class="toefl-timer-inline">
          <div class="toefl-timer-display sm" id="timer-display">${item.timeLimit}:00</div>
        </div>
      </div>
      <div class="toefl-writing-layout">
        <div class="toefl-writing-reading-panel">
          <div class="toefl-panel-title">💬 Diskusi Kelas</div>
          <div class="toefl-discussion-thread">
            <div class="toefl-discussion-post professor">
              <div class="toefl-post-avatar">${item.professorPost.avatar}</div>
              <div class="toefl-post-body">
                <div class="toefl-post-name">${item.professorPost.name} <span class="toefl-post-role">${item.professorPost.subject}</span></div>
                <div class="toefl-post-text">${item.professorPost.prompt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
              </div>
            </div>
            ${item.studentPosts.map(p => `
              <div class="toefl-discussion-post student">
                <div class="toefl-post-avatar">${p.avatar}</div>
                <div class="toefl-post-body">
                  <div class="toefl-post-name">${p.name}</div>
                  <div class="toefl-post-text">${p.post}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
        <div class="toefl-writing-panel">
          <div class="toefl-writing-prompt">${item.prompt}</div>
          <div class="toefl-word-targets">
            <span>Minimum: <strong>${item.wordMin} kata</strong></span>
            <span id="word-count-display" class="toefl-word-count">0 kata</span>
          </div>
          <textarea
            id="writing-area"
            class="toefl-textarea"
            placeholder="Tulis kontribusimu pada diskusi di sini..."
            spellcheck="false"
          ></textarea>
          <button class="btn btn-success btn-lg" id="btn-submit">✓ Selesai &amp; Evaluasi</button>
        </div>
      </div>`;

    const textarea = document.getElementById('writing-area');
    const wcDisplay = document.getElementById('word-count-display');

    textarea.addEventListener('input', () => {
      const wc = _countWords(textarea.value);
      wcDisplay.textContent = `${wc} kata`;
      wcDisplay.className = 'toefl-word-count' + (wc >= item.wordMin ? ' ok' : ' under');
    });

    document.getElementById('btn-back').addEventListener('click', () => { _stopTimer(); _renderMenu(); });
    document.getElementById('btn-submit').addEventListener('click', () => {
      _stopTimer();
      _state.userText = textarea.value;
      _showTask2Result(item);
    });
    _startTimer(item.timeLimit * 60, 'timer-display', () => {
      _state.userText = textarea.value;
      _showTask2Result(item);
    });
  }

  function _showTask2Result(item) {
    _stopTimer();
    const wc = _countWords(_state.userText);
    const meetsMin = wc >= item.wordMin;

    _c().innerHTML = `
      <div class="toefl-task-header">
        <button class="toefl-back-btn" data-action="back">← Kembali</button>
        <span class="toefl-task-label">Task 2 — Evaluasi</span>
      </div>
      <div class="toefl-task-card">
        <div class="toefl-result-stats">
          <div class="toefl-result-stat ${meetsMin ? 'ok' : 'warn'}">
            <div class="toefl-result-stat-num">${wc}</div>
            <div class="toefl-result-stat-label">Kata Ditulis</div>
          </div>
          <div class="toefl-result-stat">
            <div class="toefl-result-stat-num">${item.wordMin}+</div>
            <div class="toefl-result-stat-label">Target Minimum</div>
          </div>
        </div>

        ${!meetsMin ? `<div class="toefl-warning-box">⚠️ Tulisanmu belum memenuhi minimum ${item.wordMin} kata.</div>` : ''}

        <div class="toefl-your-text-box">
          <div class="toefl-your-text-label">✏️ Kontribusimu:</div>
          <div class="toefl-your-text">${_state.userText.replace(/\n/g, '<br>') || '<em style="color:var(--text-secondary)">Tidak ada teks</em>'}</div>
        </div>

        <div class="toefl-rubric-box">
          <div class="toefl-rubric-title">📐 Rubrik Penilaian (Skala 0–5)</div>
          ${Object.entries(item.rubric).map(([sc, desc]) => `
            <div class="toefl-rubric-row">
              <div class="toefl-rubric-criterion">Skor ${sc}</div>
              <div class="toefl-rubric-desc">${desc}</div>
            </div>`).join('')}
        </div>

        <div class="toefl-model-section">
          <div class="toefl-model-label">🎯 Model Answer</div>
          <div class="toefl-model-text">${item.modelAnswer.replace(/\n\n/g, '<br><br>')}</div>
          <button class="btn btn-secondary" id="btn-tts">🔊 Dengarkan Model Answer</button>
        </div>

        <div class="toefl-self-assess">
          <div class="toefl-self-label">🏅 Berikan skor untuk tulisanmu:</div>
          <div class="toefl-score-buttons">
            ${[0,1,2,3,4,5].map(sc => `
              <button class="toefl-score-btn" data-score="${sc}">
                <span class="toefl-score-num">${sc}</span>
                <span class="toefl-score-label">${['—','Terbatas','Berkembang','Cukup Baik','Baik','Sangat Baik'][sc]}</span>
              </button>`).join('')}
          </div>
        </div>
      </div>`;

    document.querySelector('[data-action="back"]').addEventListener('click', () => _renderMenu());
    document.getElementById('btn-tts').addEventListener('click', function() { _speak(item.modelAnswer, this); });
    document.querySelectorAll('.toefl-score-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sc = parseInt(btn.dataset.score);
        _saveAttempt('w2', item.id, wc, sc);
        XPSystem.addXP(sc >= 4 ? 20 : 15);
        ChallengeSystem.onModuleVisit('toefl-writing');
        ChallengeSystem.onQuizComplete(sc >= 4);
        App.showToast(`Skor ${sc}/5 disimpan. +${sc >= 4 ? 20 : 15} XP!`, 'success');
        setTimeout(() => _renderMenu(), 1500);
      });
    });
  }

  // ── INIT ───────────────────────────────────────────────
  return {
    init() {
      Router.guard();
      App.init('toefl-writing');
      _renderMenu();
    }
  };

})();
