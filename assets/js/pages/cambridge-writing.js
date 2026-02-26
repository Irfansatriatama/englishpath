/**
 * EnglishPath — Cambridge Writing Module
 * Fase 16c-1: Practice Writing & Speaking
 * localStorage: ep_user_{id}_cambridge_writing
 */
const CambridgeWriting = (() => {

  // ── State ─────────────────────────────────────────────────────────────────
  let _state = {
    view: 'menu',         // menu | part1 | part2
    activeTab: 'part1',   // part1 | part2
    activePart2Type: 'letter',
    taskId: null,
    phase: 'intro',       // intro | writing | result
    timerInterval: null,
    timerSeconds: 0,
    userText: '',
    selfScore: 0
  };

  let _ttsBtnActive = null;

  // ── Helpers ───────────────────────────────────────────────────────────────
  function _uid() { const s = Auth.getSession(); return s ? s.userId : null; }
  function _c()   { return document.getElementById('writing-content'); }

  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, 'cambridge_writing') || {};
  }

  function _saveAttempt(taskId, wordCount, selfScore, draft) {
    const uid = _uid();
    if (!uid) return;
    const data = _loadData();
    if (!data.results) data.results = {};
    const prev = data.results[taskId] || { attempts: 0 };
    data.results[taskId] = {
      attempts: prev.attempts + 1,
      lastWordCount: wordCount,
      lastSelfScore: selfScore,
      lastDraft: draft.substring(0, 500),
      lastDate: new Date().toISOString().split('T')[0]
    };
    if (!data.totalAttempts) data.totalAttempts = 0;
    data.totalAttempts++;
    Storage.setUser(uid, 'cambridge_writing', data);
  }

  function _getAttempt(taskId) {
    const data = _loadData();
    return (data.results || {})[taskId] || null;
  }

  function _countWords(text) {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  }

  // ── Timer ─────────────────────────────────────────────────────────────────
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
    el.className = 'cwr-timer-display' +
      (_state.timerSeconds <= 120 ? ' urgent' : _state.timerSeconds <= 300 ? ' warning' : '');
  }

  // ── TTS ───────────────────────────────────────────────────────────────────
  function _speak(text, btnEl) {
    if (!('speechSynthesis' in window)) { App.showToast('TTS tidak tersedia', 'error'); return; }
    speechSynthesis.cancel();
    if (_ttsBtnActive === btnEl) {
      _ttsBtnActive = null;
      if (btnEl) { btnEl.textContent = '🔊 Dengarkan Model'; btnEl.classList.remove('playing'); }
      return;
    }
    if (_ttsBtnActive) { _ttsBtnActive.textContent = '🔊 Dengarkan Model'; _ttsBtnActive.classList.remove('playing'); }
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-GB'; utt.rate = 0.88; utt.pitch = 1;
    _ttsBtnActive = btnEl;
    if (btnEl) { btnEl.textContent = '⏸ Berhenti'; btnEl.classList.add('playing'); }
    utt.onend = utt.onerror = () => {
      _ttsBtnActive = null;
      if (btnEl) { btnEl.textContent = '🔊 Dengarkan Model'; btnEl.classList.remove('playing'); }
    };
    speechSynthesis.speak(utt);
  }

  // ── Word Count Update ─────────────────────────────────────────────────────
  function _updateWordCount(textarea, displayId, min, max) {
    const count = _countWords(textarea.value);
    const el = document.getElementById(displayId);
    if (!el) return;
    el.textContent = `${count} kata`;
    el.className = 'cwr-wc-display' +
      (count >= min && count <= max ? ' wc-ok' : count < min ? ' wc-low' : ' wc-high');
  }

  // ── Event delegation ──────────────────────────────────────────────────────
  function _handleClick(e) {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;
    const id = el.dataset.id;
    const type = el.dataset.type;

    if (action === 'tab')       { _state.activeTab = id; _renderMenu(); return; }
    if (action === 'part2-type') { _state.activePart2Type = type; _renderMenu(); return; }
    if (action === 'open-p1')   { _openPart1(id); return; }
    if (action === 'open-p2')   { _openPart2(id); return; }
    if (action === 'start-writing') { _startWriting(); return; }
    if (action === 'submit-writing') { _submitWriting(); return; }
    if (action === 'self-score') { _setSelfScore(parseInt(el.dataset.score)); return; }
    if (action === 'save-result') { _saveAndExit(); return; }
    if (action === 'tts-model')  {
      const taskId = _state.taskId;
      const task = CambridgeWritingData.getPart1ById(taskId) ||
                   CambridgeWritingData.getPart2ById(taskId);
      if (task) _speak(task.model, el);
      return;
    }
    if (action === 'back-menu') { _goMenu(); return; }
  }

  // ── Menu ──────────────────────────────────────────────────────────────────
  function _renderMenu() {
    _stopTimer();
    if (window.speechSynthesis) speechSynthesis.cancel();
    _state.view = 'menu';
    _state.phase = 'intro';

    const tabs = `
      <div class="cwr-tabs">
        <button class="cwr-tab${_state.activeTab === 'part1' ? ' active' : ''}" data-action="tab" data-id="part1">✍️ Part 1 — Essay Wajib</button>
        <button class="cwr-tab${_state.activeTab === 'part2' ? ' active' : ''}" data-action="tab" data-id="part2">📝 Part 2 — Pilihan</button>
      </div>`;

    let content = '';

    if (_state.activeTab === 'part1') {
      const b2 = CambridgeWritingData.getPart1ByLevel('B2');
      const c1 = CambridgeWritingData.getPart1ByLevel('C1');

      content = `
        <div class="cwr-skill-desc">
          <strong>Part 1 — Compulsory Essay:</strong> Tulis esai berdasarkan pertanyaan yang diberikan, dengan semua catatan yang harus dijawab.
          <strong>B2 First:</strong> 140–190 kata · <strong>C1 Advanced:</strong> 220–260 kata.
        </div>
        <div class="cwr-level-section">
          <div class="cwr-level-badge b2">B2 First</div>
          <div class="cwr-task-grid">
            ${b2.map(t => _cardHTML(t)).join('')}
          </div>
        </div>
        <div class="cwr-level-section">
          <div class="cwr-level-badge c1">C1 Advanced</div>
          <div class="cwr-task-grid">
            ${c1.map(t => _cardHTML(t)).join('')}
          </div>
        </div>`;
    } else {
      const typeLabels = { letter: '✉️ Letter/Email', report: '📊 Report', review: '⭐ Review', article: '📰 Article', story: '📖 Story' };
      const typeTabs = Object.entries(typeLabels).map(([k, v]) =>
        `<button class="cwr-type-tab${_state.activePart2Type === k ? ' active' : ''}" data-action="part2-type" data-type="${k}">${v}</button>`
      ).join('');

      const tasks = CambridgeWritingData.getPart2ByType(_state.activePart2Type);
      content = `
        <div class="cwr-skill-desc">
          <strong>Part 2 — Optional Tasks:</strong> Pilih satu jenis tulisan: Letter/Email, Report, Review, Article, atau Story. Sesuaikan register (formal/semi-formal/informal) dengan tugas yang diberikan.
        </div>
        <div class="cwr-type-tabs">${typeTabs}</div>
        <div class="cwr-task-grid">
          ${tasks.map(t => _cardHTML(t, true)).join('')}
        </div>`;
    }

    _c().innerHTML = tabs + `<div class="cwr-menu-content">${content}</div>`;
  }

  function _cardHTML(t, isPart2 = false) {
    const att = _getAttempt(t.id);
    const action = isPart2 ? 'open-p2' : 'open-p1';
    return `
      <div class="cwr-task-card" data-action="${action}" data-id="${t.id}">
        <span class="cwr-task-icon">${t.icon}</span>
        <div class="cwr-task-title">${t.title}</div>
        <div class="cwr-task-meta">
          <span>${t.wordMin}–${t.wordMax} kata${isPart2 ? ' · ' + t.type.charAt(0).toUpperCase() + t.type.slice(1) : ''}</span>
          ${att ? `<span class="cwr-badge-score">Score ${att.lastSelfScore}/5</span>` : ''}
        </div>
        ${att ? `<div class="cwr-task-done">✓ ${att.lastWordCount} kata · ${att.lastDate}</div>` : ''}
      </div>`;
  }

  // ── Open Part 1 Task ──────────────────────────────────────────────────────
  function _openPart1(id) {
    const task = CambridgeWritingData.getPart1ById(id);
    if (!task) return;
    _state.view = 'part1';
    _state.taskId = id;
    _state.phase = 'intro';

    const att = _getAttempt(id);

    _c().innerHTML = `
      <button class="cwr-back-btn" data-action="back-menu">← Kembali</button>
      <div class="cwr-task-header">
        <span class="cwr-task-icon-lg">${task.icon}</span>
        <div>
          <div class="cwr-task-title-lg">${task.title}</div>
          <div class="cwr-task-level"><span class="cwr-level-badge ${task.level.toLowerCase()}">${task.level}</span> Part 1 — Essay Wajib · ${task.wordMin}–${task.wordMax} kata</div>
        </div>
      </div>

      <div class="cwr-task-body">
        <div class="cwr-stimulus-box">
          <div class="cwr-stimulus-label">📋 Konteks & Instruksi</div>
          <div class="cwr-stimulus-text">${task.stimulus}</div>
          <div class="cwr-prompt-text">${task.prompt.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}</div>
        </div>

        <div class="cwr-planner">
          <div class="cwr-planner-label">🗺️ Planning Guide</div>
          ${task.planningPrompts.map(p => `<div class="cwr-plan-step">${p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</div>`).join('')}
        </div>

        ${att ? `<div class="cwr-prev-attempt">📂 Percobaan sebelumnya: ${att.lastWordCount} kata · Score ${att.lastSelfScore}/5 · ${att.lastDate}</div>` : ''}

        <div class="cwr-writing-area-wrap" id="writing-area-wrap">
          <div class="cwr-writing-timer-bar">
            <div>✍️ Tulis esai Anda di bawah</div>
            <div class="cwr-timer-wrap">
              ⏱ <span class="cwr-timer-display" id="writing-timer">45:00</span>
            </div>
          </div>
          <textarea class="cwr-textarea" id="writing-textarea" placeholder="Mulai menulis esai Anda di sini..." rows="14">${att ? (att.lastDraft || '') : ''}</textarea>
          <div class="cwr-wc-bar">
            <span id="wc-display" class="cwr-wc-display">0 kata</span>
            <span class="cwr-wc-target">Target: ${task.wordMin}–${task.wordMax} kata</span>
          </div>
          <button class="btn btn-primary cwr-submit-btn" data-action="submit-writing">Selesai & Lihat Hasil</button>
        </div>
      </div>`;

    // Wire textarea
    const ta = document.getElementById('writing-textarea');
    if (ta) {
      ta.addEventListener('input', () => _updateWordCount(ta, 'wc-display', task.wordMin, task.wordMax));
      _updateWordCount(ta, 'wc-display', task.wordMin, task.wordMax);
    }

    _startTimer(45 * 60, 'writing-timer', () => _submitWriting());
    ChallengeSystem.onModuleVisit('cambridge');
  }

  // ── Open Part 2 Task ──────────────────────────────────────────────────────
  function _openPart2(id) {
    const task = CambridgeWritingData.getPart2ById(id);
    if (!task) return;
    _state.view = 'part2';
    _state.taskId = id;
    _state.phase = 'intro';

    const att = _getAttempt(id);
    const typeLabel = { letter: 'Letter/Email', report: 'Report', review: 'Review', article: 'Article', story: 'Story' }[task.type] || task.type;

    _c().innerHTML = `
      <button class="cwr-back-btn" data-action="back-menu">← Kembali</button>
      <div class="cwr-task-header">
        <span class="cwr-task-icon-lg">${task.icon}</span>
        <div>
          <div class="cwr-task-title-lg">${task.title}</div>
          <div class="cwr-task-level">Part 2 — ${typeLabel} · ${task.wordMin}–${task.wordMax} kata</div>
        </div>
      </div>

      <div class="cwr-task-body">
        <div class="cwr-stimulus-box">
          <div class="cwr-stimulus-label">📋 Situasi & Instruksi</div>
          <div class="cwr-stimulus-text">${task.stimulus}</div>
          <div class="cwr-prompt-text">${task.prompt.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}</div>
        </div>

        <div class="cwr-planner">
          <div class="cwr-planner-label">🗺️ Planning Guide</div>
          ${task.planningPrompts.map(p => `<div class="cwr-plan-step">${p}</div>`).join('')}
        </div>

        ${att ? `<div class="cwr-prev-attempt">📂 Percobaan sebelumnya: ${att.lastWordCount} kata · Score ${att.lastSelfScore}/5 · ${att.lastDate}</div>` : ''}

        <div class="cwr-writing-area-wrap" id="writing-area-wrap">
          <div class="cwr-writing-timer-bar">
            <div>✍️ Tulis ${typeLabel} Anda di bawah</div>
            <div class="cwr-timer-wrap">
              ⏱ <span class="cwr-timer-display" id="writing-timer">40:00</span>
            </div>
          </div>
          <textarea class="cwr-textarea" id="writing-textarea" placeholder="Mulai menulis di sini..." rows="14">${att ? (att.lastDraft || '') : ''}</textarea>
          <div class="cwr-wc-bar">
            <span id="wc-display" class="cwr-wc-display">0 kata</span>
            <span class="cwr-wc-target">Target: ${task.wordMin}–${task.wordMax} kata</span>
          </div>
          <button class="btn btn-primary cwr-submit-btn" data-action="submit-writing">Selesai & Lihat Hasil</button>
        </div>
      </div>`;

    const ta = document.getElementById('writing-textarea');
    if (ta) {
      ta.addEventListener('input', () => _updateWordCount(ta, 'wc-display', task.wordMin, task.wordMax));
      _updateWordCount(ta, 'wc-display', task.wordMin, task.wordMax);
    }

    _startTimer(40 * 60, 'writing-timer', () => _submitWriting());
    ChallengeSystem.onModuleVisit('cambridge');
  }

  // ── Submit Writing ────────────────────────────────────────────────────────
  function _submitWriting() {
    _stopTimer();
    const ta = document.getElementById('writing-textarea');
    _state.userText = ta ? ta.value : '';
    const wordCount = _countWords(_state.userText);

    const task = CambridgeWritingData.getPart1ById(_state.taskId) ||
                 CambridgeWritingData.getPart2ById(_state.taskId);
    if (!task) return;

    _state.phase = 'result';

    // Determine score colour
    const wcOk = wordCount >= task.wordMin && wordCount <= task.wordMax;
    const wcMsg = wordCount < task.wordMin
      ? `⚠️ Kurang dari minimum (${task.wordMin})`
      : wordCount > task.wordMax
      ? `⚠️ Melebihi maksimum (${task.wordMax})`
      : `✅ Dalam rentang target`;

    // Rubric
    const rubricHTML = task.rubric.map(r => `
      <div class="cwr-rubric-item">
        <div class="cwr-rubric-name">${r.criterion}</div>
        <div class="cwr-rubric-desc">${r.desc}</div>
      </div>`).join('');

    // Self-score buttons
    const scoreHTML = [1, 2, 3, 4, 5].map(n => `
      <button class="cwr-score-btn${_state.selfScore === n ? ' selected' : ''}" data-action="self-score" data-score="${n}">
        ${n}
      </button>`).join('');

    _c().innerHTML = `
      <button class="cwr-back-btn" data-action="back-menu">← Kembali ke Menu</button>
      <div class="cwr-result-header">
        <span class="cwr-task-icon-lg">${task.icon}</span>
        <div>
          <div class="cwr-task-title-lg">${task.title}</div>
          <div class="cwr-result-wc ${wcOk ? 'wc-ok' : 'wc-warn'}">${wordCount} kata · ${wcMsg}</div>
        </div>
      </div>

      <div class="cwr-result-body">
        <div class="cwr-draft-panel">
          <div class="cwr-section-label">📄 Tulisan Anda</div>
          <div class="cwr-draft-text">${_state.userText || '<em>(tidak ada tulisan)</em>'}</div>
        </div>

        <div class="cwr-rubric-panel">
          <div class="cwr-section-label">📏 Assessment Criteria</div>
          ${rubricHTML}
        </div>

        <div class="cwr-self-assess-panel">
          <div class="cwr-section-label">🎯 Nilai Diri Sendiri</div>
          <div class="cwr-self-desc">Berikan skor keseluruhan untuk tulisan Anda berdasarkan kriteria di atas (1 = Perlu banyak perbaikan, 5 = Sangat baik)</div>
          <div class="cwr-score-btns">${scoreHTML}</div>
        </div>

        <div class="cwr-model-panel">
          <div class="cwr-section-label">✨ Model Answer</div>
          <button class="btn btn-outline cwr-tts-btn" data-action="tts-model">🔊 Dengarkan Model</button>
          <div class="cwr-model-text">${task.model.replace(/\n\n/g, '</p><p>').replace(/^\n/, '')
            .replace(/^([^<])/, '<p>$1').replace(/([^>])$/, '$1</p>')}</div>
        </div>

        <button class="btn btn-primary cwr-save-btn" data-action="save-result">💾 Simpan & Selesai</button>
      </div>`;
  }

  function _setSelfScore(score) {
    _state.selfScore = score;
    document.querySelectorAll('.cwr-score-btn').forEach(btn => {
      btn.classList.toggle('selected', parseInt(btn.dataset.score) === score);
    });
  }

  function _saveAndExit() {
    if (_state.selfScore === 0) { App.showToast('Silakan beri nilai diri sendiri dulu', 'warning'); return; }
    const wordCount = _countWords(_state.userText);

    _saveAttempt(_state.taskId, wordCount, _state.selfScore, _state.userText);

    // XP
    const xp = _state.selfScore >= 4 ? 25 : _state.selfScore >= 3 ? 18 : 10;
    XPSystem.awardXP(xp, 'Cambridge Writing');
    ChallengeSystem.onQuizComplete(true);

    App.showToast(`+${xp} XP — Tulisan disimpan!`, 'success');
    _state.selfScore = 0;
    _goMenu();
  }

  function _goMenu() {
    _stopTimer();
    if (window.speechSynthesis) speechSynthesis.cancel();
    _ttsBtnActive = null;
    _state.selfScore = 0;
    _state.userText = '';
    _renderMenu();
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    const container = document.getElementById('writing-content');
    if (!container) return;
    container.addEventListener('click', _handleClick);
    _renderMenu();
  }

  return { init };

})();
