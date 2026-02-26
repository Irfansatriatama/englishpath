/**
 * EnglishPath — Cambridge Speaking Module
 * Fase 16c-1: Practice Writing & Speaking
 * localStorage: ep_user_{id}_cambridge_speaking
 */
const CambridgeSpeaking = (() => {

  // ── State ─────────────────────────────────────────────────────────────────
  let _state = {
    view: 'menu',      // menu | part1 | part2 | part3 | part4
    activePart: 'part1',
    topicId: null,
    taskId: null,
    questionIdx: 0,
    phase: 'intro',    // intro | question | model | result
    timerInterval: null,
    timerSeconds: 0,
    selfScores: {},    // { criterion_id: score }
    isPlaying: false
  };

  let _ttsBtnActive = null;

  // ── Helpers ───────────────────────────────────────────────────────────────
  function _uid() { const s = Auth.getSession(); return s ? s.userId : null; }
  function _c()   { return document.getElementById('speaking-content'); }

  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, 'cambridge_speaking') || {};
  }

  function _saveAttempt(partId, selfScores) {
    const uid = _uid();
    if (!uid) return;
    const data = _loadData();
    if (!data.results) data.results = {};
    const prev = data.results[partId] || { attempts: 0 };
    const avg = Object.values(selfScores).length
      ? Math.round(Object.values(selfScores).reduce((a, b) => a + b, 0) / Object.values(selfScores).length * 10) / 10
      : 0;
    data.results[partId] = {
      attempts: prev.attempts + 1,
      lastSelfScore: avg,
      lastScores: selfScores,
      lastDate: new Date().toISOString().split('T')[0]
    };
    if (!data.totalAttempts) data.totalAttempts = 0;
    data.totalAttempts++;
    Storage.setUser(uid, 'cambridge_speaking', data);
  }

  function _getAttempt(partId) {
    const data = _loadData();
    return (data.results || {})[partId] || null;
  }

  // ── Timer ─────────────────────────────────────────────────────────────────
  function _stopTimer() {
    if (_state.timerInterval) { clearInterval(_state.timerInterval); _state.timerInterval = null; }
  }

  function _startCountdown(seconds, displayId, onEnd) {
    _stopTimer();
    _state.timerSeconds = seconds;
    _tickDisplay(displayId);
    _state.timerInterval = setInterval(() => {
      _state.timerSeconds--;
      _tickDisplay(displayId);
      if (_state.timerSeconds <= 0) {
        _stopTimer();
        App.showToast('Waktu habis!', 'warning');
        if (onEnd) onEnd();
      }
    }, 1000);
  }

  function _tickDisplay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const m = Math.floor(_state.timerSeconds / 60);
    const s = _state.timerSeconds % 60;
    el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    el.className = 'csp-timer-display' +
      (_state.timerSeconds <= 15 ? ' urgent' : _state.timerSeconds <= 30 ? ' warning' : '');
  }

  // ── TTS ───────────────────────────────────────────────────────────────────
  function _speak(text, btnEl, lang) {
    if (!('speechSynthesis' in window)) { App.showToast('TTS tidak tersedia', 'error'); return; }
    speechSynthesis.cancel();
    if (_ttsBtnActive === btnEl) {
      _ttsBtnActive = null;
      if (btnEl) { btnEl.textContent = '🔊 Dengar Model'; btnEl.classList.remove('playing'); }
      return;
    }
    if (_ttsBtnActive) { _ttsBtnActive.textContent = '🔊 Dengar Model'; _ttsBtnActive.classList.remove('playing'); }
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = lang || 'en-GB'; utt.rate = 0.88; utt.pitch = 1;
    _ttsBtnActive = btnEl;
    if (btnEl) { btnEl.textContent = '⏸ Berhenti'; btnEl.classList.add('playing'); }
    utt.onend = utt.onerror = () => {
      _ttsBtnActive = null;
      if (btnEl) { btnEl.textContent = '🔊 Dengar Model'; btnEl.classList.remove('playing'); }
      _state.isPlaying = false;
    };
    _state.isPlaying = true;
    speechSynthesis.speak(utt);
  }

  // ── Event Delegation ──────────────────────────────────────────────────────
  function _handleClick(e) {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;
    const id = el.dataset.id;

    if (action === 'nav-part')      { _state.activePart = id; _renderMenu(); return; }
    if (action === 'open-p1-topic') { _openPart1(id); return; }
    if (action === 'p1-next-q')     { _nextPart1Question(); return; }
    if (action === 'p1-show-model') { _showPart1Model(); return; }
    if (action === 'tts-question')  { _speakCurrentQuestion(); return; }
    if (action === 'tts-model')     { _speakModel(el); return; }
    if (action === 'open-p2')       { _openPart2(id); return; }
    if (action === 'p2-start-timer'){ _startPart2Timer(); return; }
    if (action === 'p2-show-model') { _showPart2Model(); return; }
    if (action === 'open-p3')       { _openPart3(id); return; }
    if (action === 'p3-start-timer'){ _startPart3Timer(); return; }
    if (action === 'open-p4')       { _openPart4(id); return; }
    if (action === 'p4-next-q')     { _nextPart4Question(); return; }
    if (action === 'self-score')    { _setSelfScore(el.dataset.criterion, parseInt(el.dataset.score)); return; }
    if (action === 'save-scores')   { _saveSpeakingResult(el.dataset.partid); return; }
    if (action === 'back-menu')     { _goMenu(); return; }
  }

  // ── MENU ──────────────────────────────────────────────────────────────────
  function _renderMenu() {
    _stopTimer();
    if (window.speechSynthesis) speechSynthesis.cancel();
    _state.view = 'menu';

    const parts = [
      { id: 'part1', label: '👤 Part 1', sub: 'Interview' },
      { id: 'part2', label: '🖼️ Part 2', sub: 'Long Turn' },
      { id: 'part3', label: '🤝 Part 3', sub: 'Collaborative' },
      { id: 'part4', label: '💬 Part 4', sub: 'Discussion' }
    ];

    const navTabs = parts.map(p => `
      <button class="csp-part-tab${_state.activePart === p.id ? ' active' : ''}" data-action="nav-part" data-id="${p.id}">
        ${p.label}<br><small>${p.sub}</small>
      </button>`).join('');

    let content = '';

    if (_state.activePart === 'part1') {
      const topics = CambridgeSpeakingData.getPart1Topics();
      content = `
        <div class="csp-skill-desc">
          <strong>Part 1 — Interview:</strong> Examiner akan menanyakan pertanyaan tentang diri Anda, pengalaman, dan pendapat. Jawab setiap pertanyaan dengan 2–4 kalimat yang kohesif. Latih 5 topik × 3 pertanyaan.
        </div>
        <div class="csp-grid">
          ${topics.map(t => {
            const att = _getAttempt('p1_' + t.id);
            return `
              <div class="csp-card" data-action="open-p1-topic" data-id="${t.id}">
                <span class="csp-card-icon">${t.icon}</span>
                <div class="csp-card-title">${t.topic}</div>
                <div class="csp-card-meta">3 pertanyaan${att ? ` · Score ${att.lastSelfScore}/5` : ''}</div>
              </div>`;
          }).join('')}
        </div>`;
    } else if (_state.activePart === 'part2') {
      const tasks = CambridgeSpeakingData.getPart2Tasks();
      content = `
        <div class="csp-skill-desc">
          <strong>Part 2 — Individual Long Turn:</strong> Bandingkan dua foto dan jawab pertanyaan terkait. Bicara selama <strong>1 menit</strong> tanpa henti. Gunakan language of comparison (whereas, while, in contrast, similarly...).
        </div>
        <div class="csp-grid">
          ${tasks.map(t => {
            const att = _getAttempt('p2_' + t.id);
            return `
              <div class="csp-card" data-action="open-p2" data-id="${t.id}">
                <span class="csp-card-icon">${t.icon}</span>
                <div class="csp-card-title">${t.title}</div>
                <div class="csp-card-meta">Compare 2 foto · 1 menit${att ? ` · Score ${att.lastSelfScore}/5` : ''}</div>
              </div>`;
          }).join('')}
        </div>`;
    } else if (_state.activePart === 'part3') {
      const tasks = CambridgeSpeakingData.getPart3Tasks();
      content = `
        <div class="csp-skill-desc">
          <strong>Part 3 — Collaborative Task:</strong> Diskusikan 5 opsi dengan partner (atau latih sendiri). Berikan pendapat, setuju/tidak setuju, tanyakan pendapat partner. Timer: <strong>3 menit</strong>.
        </div>
        <div class="csp-grid">
          ${tasks.map(t => {
            const att = _getAttempt('p3_' + t.id);
            return `
              <div class="csp-card" data-action="open-p3" data-id="${t.id}">
                <span class="csp-card-icon">${t.icon}</span>
                <div class="csp-card-title">${t.title}</div>
                <div class="csp-card-meta">5 opsi · 3 menit${att ? ` · Score ${att.lastSelfScore}/5` : ''}</div>
              </div>`;
          }).join('')}
        </div>`;
    } else if (_state.activePart === 'part4') {
      const sets = CambridgeSpeakingData.getPart4Sets();
      content = `
        <div class="csp-skill-desc">
          <strong>Part 4 — Further Discussion:</strong> Examiner mengajukan pertanyaan diskusi lanjutan berdasarkan tema dari Part 3. Jawablah secara mendalam dengan opini, alasan, dan contoh.
        </div>
        <div class="csp-grid">
          ${sets.map(t => {
            const att = _getAttempt('p4_' + t.id);
            return `
              <div class="csp-card" data-action="open-p4" data-id="${t.id}">
                <span class="csp-card-icon">${t.icon}</span>
                <div class="csp-card-title">${t.theme}</div>
                <div class="csp-card-meta">4 pertanyaan diskusi${att ? ` · Score ${att.lastSelfScore}/5` : ''}</div>
              </div>`;
          }).join('')}
        </div>`;
    }

    _c().innerHTML = `
      <div class="csp-part-nav">${navTabs}</div>
      <div class="csp-menu-content">${content}</div>`;
  }

  // ── PART 1: Interview ─────────────────────────────────────────────────────
  function _openPart1(topicId) {
    const topic = CambridgeSpeakingData.getPart1ById(topicId);
    if (!topic) return;
    _state.topicId = topicId;
    _state.questionIdx = 0;
    _renderPart1Question(topic);
    ChallengeSystem.onModuleVisit('cambridge');
  }

  function _renderPart1Question(topic) {
    const q = topic.questions[_state.questionIdx];
    const isLast = _state.questionIdx === topic.questions.length - 1;

    _c().innerHTML = `
      <button class="csp-back-btn" data-action="back-menu">← Kembali</button>
      <div class="csp-part-header">
        <span class="csp-part-badge">Part 1 — Interview</span>
        <span class="csp-topic-name">${topic.icon} ${topic.topic}</span>
        <span class="csp-q-counter">Pertanyaan ${_state.questionIdx + 1} / ${topic.questions.length}</span>
      </div>

      <div class="csp-question-card">
        <div class="csp-question-label">🎙️ Pertanyaan Examiner:</div>
        <div class="csp-question-text" id="p1-question">${q.q}</div>
        <button class="btn btn-outline csp-tts-question-btn" data-action="tts-question">🔊 Dengar Pertanyaan</button>
      </div>

      <div class="csp-response-area">
        <div class="csp-response-label">💭 Jawab pertanyaan ini dengan lantang (2–4 kalimat)</div>
        <div class="csp-response-tips">
          <strong>Tips:</strong> Mulai dengan jawaban langsung → Beri alasan → Contoh spesifik → Simpulkan singkat
        </div>
      </div>

      <div class="csp-actions-row">
        <button class="btn btn-outline" data-action="p1-show-model" id="show-model-btn">💡 Lihat Model Jawaban</button>
        ${!isLast
          ? `<button class="btn btn-primary" data-action="p1-next-q">Pertanyaan Berikutnya →</button>`
          : `<button class="btn btn-primary" data-action="p1-next-q">Selesai & Nilai Diri</button>`}
      </div>

      <div class="csp-model-panel" id="model-panel" style="display:none">
        <div class="csp-model-label">✨ Model Jawaban</div>
        <div class="csp-model-text">${q.model}</div>
        <button class="btn btn-outline csp-tts-btn" data-action="tts-model" data-text="${q.model.replace(/"/g, '&quot;')}">🔊 Dengar Model</button>
      </div>`;
  }

  function _speakCurrentQuestion() {
    const el = document.getElementById('p1-question');
    if (!el) return;
    const btn = document.querySelector('[data-action="tts-question"]');
    _speak(el.textContent, btn);
  }

  function _speakModel(btnEl) {
    const text = btnEl.dataset.text;
    if (text) _speak(text, btnEl);
  }

  function _showPart1Model() {
    const panel = document.getElementById('model-panel');
    if (panel) panel.style.display = 'block';
    const btn = document.getElementById('show-model-btn');
    if (btn) btn.style.display = 'none';
  }

  function _nextPart1Question() {
    const topic = CambridgeSpeakingData.getPart1ById(_state.topicId);
    if (!topic) return;
    if (_state.questionIdx < topic.questions.length - 1) {
      _state.questionIdx++;
      _renderPart1Question(topic);
    } else {
      _renderSelfAssessment('p1_' + _state.topicId);
    }
  }

  // ── PART 2: Long Turn ─────────────────────────────────────────────────────
  function _openPart2(taskId) {
    const task = CambridgeSpeakingData.getPart2ById(taskId);
    if (!task) return;
    _state.taskId = 'p2_' + taskId;

    _c().innerHTML = `
      <button class="csp-back-btn" data-action="back-menu">← Kembali</button>
      <div class="csp-part-header">
        <span class="csp-part-badge">Part 2 — Long Turn</span>
        <span class="csp-topic-name">${task.icon} ${task.title}</span>
      </div>

      <div class="csp-photos-compare">
        <div class="csp-photo-card">
          <div class="csp-photo-label">${task.photoA.label}</div>
          <div class="csp-photo-desc">${task.photoA.description}</div>
        </div>
        <div class="csp-photo-vs">VS</div>
        <div class="csp-photo-card">
          <div class="csp-photo-label">${task.photoB.label}</div>
          <div class="csp-photo-desc">${task.photoB.description}</div>
        </div>
      </div>

      <div class="csp-task-prompt">
        <div class="csp-task-prompt-label">📋 Task:</div>
        <div class="csp-task-prompt-text">${task.task}</div>
      </div>

      <div class="csp-timer-section">
        <div class="csp-timer-label">⏱ Bicara selama 1 menit</div>
        <div class="csp-timer-display" id="p2-timer">1:00</div>
        <button class="btn btn-primary" data-action="p2-start-timer">▶ Mulai Timer</button>
      </div>

      <div class="csp-follow-up-box">
        <strong>Follow-up question:</strong> ${task.followUp}
      </div>

      <div class="csp-actions-row" style="margin-top:1.5rem">
        <button class="btn btn-outline" data-action="p2-show-model" id="show-model-btn">💡 Lihat Model Jawaban</button>
        <button class="btn btn-primary" data-action="save-scores" data-partid="${_state.taskId}" id="assess-btn" style="display:none">✅ Nilai Diri Sendiri</button>
      </div>

      <div class="csp-model-panel" id="model-panel" style="display:none">
        <div class="csp-model-label">✨ Model Jawaban</div>
        <div class="csp-model-text">${task.model}</div>
        <button class="btn btn-outline csp-tts-btn" data-action="tts-model" data-text="${task.model.replace(/"/g, '&quot;')}">🔊 Dengar Model</button>
      </div>`;

    ChallengeSystem.onModuleVisit('cambridge');
  }

  function _startPart2Timer() {
    _startCountdown(60, 'p2-timer', () => {
      const assessBtn = document.getElementById('assess-btn');
      if (assessBtn) assessBtn.style.display = 'inline-flex';
    });
    const startBtn = document.querySelector('[data-action="p2-start-timer"]');
    if (startBtn) startBtn.style.display = 'none';
  }

  function _showPart2Model() {
    const panel = document.getElementById('model-panel');
    if (panel) panel.style.display = 'block';
    const btn = document.getElementById('show-model-btn');
    if (btn) btn.style.display = 'none';
    const assessBtn = document.getElementById('assess-btn');
    if (assessBtn) assessBtn.style.display = 'inline-flex';
  }

  // ── PART 3: Collaborative ─────────────────────────────────────────────────
  function _openPart3(taskId) {
    const task = CambridgeSpeakingData.getPart3ById(taskId);
    if (!task) return;
    _state.taskId = 'p3_' + taskId;

    const promptsHTML = task.prompts.map(p => `
      <div class="csp-prompt-card">
        <span class="csp-prompt-icon">${p.icon}</span>
        <div class="csp-prompt-label">${p.label}</div>
        <div class="csp-prompt-desc">${p.desc}</div>
      </div>`).join('');

    _c().innerHTML = `
      <button class="csp-back-btn" data-action="back-menu">← Kembali</button>
      <div class="csp-part-header">
        <span class="csp-part-badge">Part 3 — Collaborative Task</span>
        <span class="csp-topic-name">${task.icon} ${task.title}</span>
      </div>

      <div class="csp-collab-intro">
        <div class="csp-collab-task">${task.taskPrompt}</div>
      </div>

      <div class="csp-prompts-grid">${promptsHTML}</div>

      <div class="csp-timer-section">
        <div class="csp-timer-label">⏱ Diskusi selama 3 menit</div>
        <div class="csp-timer-display" id="p3-timer">3:00</div>
        <button class="btn btn-primary" data-action="p3-start-timer">▶ Mulai Timer</button>
      </div>

      <div class="csp-followup-q">
        <strong>Follow-up (setelah timer):</strong> ${task.followUp}
      </div>

      <div class="csp-actions-row" style="margin-top:1.5rem">
        <button class="btn btn-primary" data-action="save-scores" data-partid="${_state.taskId}">✅ Nilai Diri Sendiri</button>
      </div>`;

    ChallengeSystem.onModuleVisit('cambridge');
  }

  function _startPart3Timer() {
    _startCountdown(180, 'p3-timer', () => {});
    const startBtn = document.querySelector('[data-action="p3-start-timer"]');
    if (startBtn) startBtn.style.display = 'none';
  }

  // ── PART 4: Discussion ────────────────────────────────────────────────────
  function _openPart4(setId) {
    const set = CambridgeSpeakingData.getPart4ById(setId);
    if (!set) return;
    _state.taskId = 'p4_' + setId;
    _state.questionIdx = 0;
    _renderPart4Question(set);
    ChallengeSystem.onModuleVisit('cambridge');
  }

  function _renderPart4Question(set) {
    const q = set.questions[_state.questionIdx];
    const isLast = _state.questionIdx === set.questions.length - 1;

    _c().innerHTML = `
      <button class="csp-back-btn" data-action="back-menu">← Kembali</button>
      <div class="csp-part-header">
        <span class="csp-part-badge">Part 4 — Further Discussion</span>
        <span class="csp-topic-name">${set.icon} ${set.theme}</span>
        <span class="csp-q-counter">Pertanyaan ${_state.questionIdx + 1} / ${set.questions.length}</span>
      </div>

      <div class="csp-question-card">
        <div class="csp-question-label">🎙️ Pertanyaan Examiner:</div>
        <div class="csp-question-text">${q.q}</div>
        <button class="btn btn-outline csp-tts-question-btn" data-action="tts-question">🔊 Dengar Pertanyaan</button>
      </div>

      <div class="csp-response-area">
        <div class="csp-response-label">💭 Jawab dengan mendalam — opini + alasan + contoh (4–6 kalimat)</div>
        <div class="csp-response-tips">
          <strong>Useful phrases:</strong> "I think... because...", "In my view...", "That's a good point, but...", "It depends on...", "On balance, I would say..."
        </div>
      </div>

      <div class="csp-actions-row">
        <button class="btn btn-outline" data-action="p1-show-model" id="show-model-btn">💡 Lihat Model</button>
        ${!isLast
          ? `<button class="btn btn-primary" data-action="p4-next-q">Pertanyaan Berikutnya →</button>`
          : `<button class="btn btn-primary" data-action="p4-next-q">Selesai & Nilai Diri</button>`}
      </div>

      <div class="csp-model-panel" id="model-panel" style="display:none">
        <div class="csp-model-label">✨ Model Jawaban</div>
        <div class="csp-model-text">${q.model}</div>
        <button class="btn btn-outline csp-tts-btn" data-action="tts-model" data-text="${q.model.replace(/"/g, '&quot;')}">🔊 Dengar Model</button>
      </div>`;
  }

  function _nextPart4Question() {
    const set = CambridgeSpeakingData.getPart4ById(_state.taskId.replace('p4_', ''));
    if (!set) return;
    if (_state.questionIdx < set.questions.length - 1) {
      _state.questionIdx++;
      _renderPart4Question(set);
    } else {
      _renderSelfAssessment(_state.taskId);
    }
  }

  // ── Self-Assessment ───────────────────────────────────────────────────────
  function _renderSelfAssessment(partId) {
    _stopTimer();
    _state.selfScores = {};
    const rubric = CambridgeSpeakingData.getRubric();

    const rubricHTML = rubric.map(r => {
      const scores = [1, 2, 3, 4, 5].map(n =>
        `<button class="csp-score-btn" data-action="self-score" data-criterion="${r.id}" data-score="${n}">${n}</button>`
      ).join('');
      return `
        <div class="csp-rubric-row">
          <div class="csp-rubric-info">
            <div class="csp-rubric-name">${r.label}</div>
            <div class="csp-rubric-desc">${r.desc}</div>
          </div>
          <div class="csp-score-row">${scores}</div>
        </div>`;
    }).join('');

    _c().innerHTML = `
      <button class="csp-back-btn" data-action="back-menu">← Kembali ke Menu</button>
      <div class="csp-assess-header">
        <div class="csp-assess-title">🎯 Nilai Penampilan Speaking Anda</div>
        <div class="csp-assess-sub">Gunakan rubrik Cambridge Speaking (skala 1–5 per kriteria)</div>
      </div>
      <div class="csp-rubric-grid">${rubricHTML}</div>
      <button class="btn btn-primary csp-save-btn" data-action="save-scores" data-partid="${partId}">💾 Simpan & Selesai</button>`;
  }

  function _setSelfScore(criterion, score) {
    _state.selfScores[criterion] = score;
    document.querySelectorAll(`[data-criterion="${criterion}"].csp-score-btn`).forEach(btn => {
      btn.classList.toggle('selected', parseInt(btn.dataset.score) === score);
    });
  }

  function _saveSpeakingResult(partId) {
    // If no criteria scored yet, show self-assessment
    if (Object.keys(_state.selfScores).length === 0) {
      _renderSelfAssessment(partId);
      return;
    }
    const rubric = CambridgeSpeakingData.getRubric();
    const scored = rubric.every(r => _state.selfScores[r.id] !== undefined);
    if (!scored) { App.showToast('Nilai semua kriteria terlebih dahulu', 'warning'); return; }

    _saveAttempt(partId, { ..._state.selfScores });

    const avg = Object.values(_state.selfScores).reduce((a, b) => a + b, 0) / Object.values(_state.selfScores).length;
    const xp = avg >= 4 ? 20 : avg >= 3 ? 14 : 8;
    XPSystem.awardXP(xp, 'Cambridge Speaking');
    ChallengeSystem.onQuizComplete(true);

    App.showToast(`+${xp} XP — Skor disimpan! Rata-rata: ${avg.toFixed(1)}/5`, 'success');
    _state.selfScores = {};
    _goMenu();
  }

  function _goMenu() {
    _stopTimer();
    if (window.speechSynthesis) speechSynthesis.cancel();
    _ttsBtnActive = null;
    _state.selfScores = {};
    _renderMenu();
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    const container = document.getElementById('speaking-content');
    if (!container) return;
    container.addEventListener('click', _handleClick);
    _renderMenu();
  }

  return { init };

})();
