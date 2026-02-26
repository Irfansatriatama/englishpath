/**
 * EnglishPath — TOEFL iBT Simulation Module
 * Fase 15c-2: Simulasi Full Test TOEFL iBT
 * localStorage: ep_user_{id}_sim_results
 *
 * Flow:
 *   intro → reading (54 min, 2 passages × 10Q)
 *         → listening (41 min, 2 lectures × 6Q + 1 conv × 5Q)
 *         → break (10 min)
 *         → speaking (17 min, 4 tasks with timers + self-assess)
 *         → writing (50 min, task1 integrated + task2 discussion)
 *         → submit → result.html
 */
const TOEFLSimulation = (() => {

  // ── State ─────────────────────────────────────────────────────
  let _state = {
    phase: 'intro',
    // Reading
    rd_passage: 0,    // current passage index
    rd_q: 0,          // current question within passage
    rdAnswers: {},    // { questionId: answerIdx or [arr for summary] }
    // Listening
    lt_track: 0,      // current track index
    lt_q: 0,          // current question within track
    ltAnswers: {},
    ltAudioPlayed: false,
    // Speaking
    sp_task: 0,       // 0=task1, 1=task2, 2=task3, 3=task4
    sp_phase: 'ready', // ready | reading | listening | prep | speaking | assess
    sp_selfScores: [null, null, null, null],
    sp_timerInterval: null,
    sp_secondsLeft: 0,
    sp_scriptIdx: 0,
    sp_ttsPlaying: false,
    // Writing
    wr_task: 0,       // 0=task1, 1=task2
    wr_phase: 'ready', // ready | reading | listening | writing
    wr_texts: ['', ''],
    wr_selfScores: [null, null],
    wr_timerInterval: null,
    wr_secondsLeft: 0,
    wr_scriptIdx: 0,
    // Main timer
    timerInterval: null,
    secondsLeft: 0,
    // TTS
    ttsPlaying: false
  };

  const READING_TIME  = 54 * 60;
  const LISTENING_TIME = 41 * 60;
  const BREAK_TIME    = 10 * 60;
  const SPEAKING_TIME = 17 * 60;
  const WRITING_TIME  = 50 * 60;

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  // ── Main Timer ────────────────────────────────────────────────
  function _startTimer(seconds) {
    _clearTimer();
    _state.secondsLeft = seconds;
    _updateTimerUI();
    _state.timerInterval = setInterval(() => {
      _state.secondsLeft--;
      _updateTimerUI();
      if (_state.secondsLeft <= 0) {
        _clearTimer();
        _onMainTimerEnd();
      }
    }, 1000);
  }

  function _clearTimer() {
    if (_state.timerInterval) { clearInterval(_state.timerInterval); _state.timerInterval = null; }
  }

  function _updateTimerUI() {
    const el = document.getElementById('sim-timer');
    if (!el) return;
    const m = Math.floor(_state.secondsLeft / 60);
    const s = _state.secondsLeft % 60;
    el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    el.classList.toggle('warning', _state.secondsLeft <= 300 && _state.secondsLeft > 60);
    el.classList.toggle('danger', _state.secondsLeft <= 60);
  }

  function _onMainTimerEnd() {
    App.showToast('Waktu habis! Melanjutkan ke bagian berikutnya...', 'info');
    if (_state.phase === 'reading') {
      setTimeout(_startListening, 1500);
    } else if (_state.phase === 'listening') {
      setTimeout(_startBreak, 1500);
    } else if (_state.phase === 'break') {
      setTimeout(_startSpeaking, 1500);
    } else if (_state.phase === 'writing') {
      setTimeout(_submitSim, 1500);
    }
  }

  // ── Small task timer (speaking/writing per-task) ──────────────
  function _startTaskTimer(seconds, onEndCb) {
    if (_state.sp_timerInterval) { clearInterval(_state.sp_timerInterval); _state.sp_timerInterval = null; }
    _state.sp_secondsLeft = seconds;
    _updateTaskTimerUI();
    _state.sp_timerInterval = setInterval(() => {
      _state.sp_secondsLeft--;
      _updateTaskTimerUI();
      if (_state.sp_secondsLeft <= 0) {
        clearInterval(_state.sp_timerInterval);
        _state.sp_timerInterval = null;
        if (onEndCb) onEndCb();
      }
    }, 1000);
  }

  function _clearTaskTimer() {
    if (_state.sp_timerInterval) { clearInterval(_state.sp_timerInterval); _state.sp_timerInterval = null; }
  }

  function _updateTaskTimerUI() {
    const el = document.getElementById('task-timer');
    if (!el) return;
    const m = Math.floor(_state.sp_secondsLeft / 60);
    const s = _state.sp_secondsLeft % 60;
    el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    el.classList.toggle('warning', _state.sp_secondsLeft <= 10 && _state.sp_secondsLeft > 5);
    el.classList.toggle('danger', _state.sp_secondsLeft <= 5);
  }

  function _startWritingTimer(seconds, onEndCb) {
    if (_state.wr_timerInterval) { clearInterval(_state.wr_timerInterval); _state.wr_timerInterval = null; }
    _state.wr_secondsLeft = seconds;
    _updateWritingTimerUI();
    _state.wr_timerInterval = setInterval(() => {
      _state.wr_secondsLeft--;
      _updateWritingTimerUI();
      if (_state.wr_secondsLeft <= 0) {
        clearInterval(_state.wr_timerInterval);
        _state.wr_timerInterval = null;
        if (onEndCb) onEndCb();
      }
    }, 1000);
  }

  function _clearWritingTimer() {
    if (_state.wr_timerInterval) { clearInterval(_state.wr_timerInterval); _state.wr_timerInterval = null; }
  }

  function _updateWritingTimerUI() {
    const el = document.getElementById('writing-timer');
    if (!el) return;
    const m = Math.floor(_state.wr_secondsLeft / 60);
    const s = _state.wr_secondsLeft % 60;
    el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    el.classList.toggle('warning', _state.wr_secondsLeft <= 300 && _state.wr_secondsLeft > 60);
    el.classList.toggle('danger', _state.wr_secondsLeft <= 60);
  }

  // ── Progress ──────────────────────────────────────────────────
  function _updateProgress() {
    const phases = ['reading', 'listening', 'break', 'speaking', 'writing'];
    const idx = phases.indexOf(_state.phase);
    if (idx < 0) return;
    const pct = Math.round(((idx + 0.5) / phases.length) * 100);
    const fill = document.getElementById('sim-progress-fill');
    const label = document.getElementById('sim-progress-label');
    const pname = document.getElementById('sim-phase-name');
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = `${pct}% selesai`;
    const labels = { reading: 'Reading Section', listening: 'Listening Section', break: 'Jeda 10 Menit', speaking: 'Speaking Section', writing: 'Writing Section' };
    if (pname) pname.textContent = labels[_state.phase] || '';

    const phases2 = ['reading','listening','speaking','writing'];
    const ids = ['step-reading','step-listening','step-speaking','step-writing'];
    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const ph = phases2[i];
      el.classList.toggle('active', _state.phase === ph);
      el.classList.toggle('completed', phases.indexOf(_state.phase) > phases.indexOf(ph));
    });
  }

  // ── TTS ───────────────────────────────────────────────────────
  function _speak(text, onEnd) {
    if (!window.speechSynthesis) { if (onEnd) onEnd(); return; }
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US';
    utt.rate = 0.88;
    utt.onstart = () => { _state.ttsPlaying = true; };
    utt.onend = () => { _state.ttsPlaying = false; if (onEnd) onEnd(); };
    utt.onerror = () => { _state.ttsPlaying = false; if (onEnd) onEnd(); };
    speechSynthesis.speak(utt);
  }

  function _stopSpeak() {
    if (window.speechSynthesis) speechSynthesis.cancel();
    _state.ttsPlaying = false;
    _state.sp_ttsPlaying = false;
  }

  async function _playScript(lines, onComplete) {
    for (let i = 0; i < lines.length; i++) {
      _state.sp_scriptIdx = i;
      _highlightScriptLine(i);
      await new Promise(resolve => _speak(lines[i].text, resolve));
      await new Promise(r => setTimeout(r, 400));
    }
    if (onComplete) onComplete();
  }

  function _highlightScriptLine(idx) {
    document.querySelectorAll('.script-line').forEach((el, i) => {
      el.classList.toggle('active-line', i === idx);
    });
  }

  // ── INTRO ─────────────────────────────────────────────────────
  function _renderIntro() {
    _state.phase = 'intro';
    const body = document.getElementById('sim-body');
    if (!body) return;
    body.innerHTML = `
      <div class="sim-intro">
        <div class="sim-intro-icon">🎓</div>
        <h1>TOEFL iBT Full Test Simulation</h1>
        <p>Simulasi ujian TOEFL iBT lengkap mencakup <strong>keempat seksi</strong>. Siapkan tempat yang tenang, earphone, dan waktu sekitar 3 jam.</p>
        <div class="sim-intro-cards">
          <div class="sim-section-card" style="border-left:4px solid #0d8f6e">
            <div class="sim-section-card-icon">📖</div>
            <h3>Reading — 54 Menit</h3>
            <p>2 passage akademik<br>10 soal per passage<br><strong>Total: 20 soal</strong></p>
          </div>
          <div class="sim-section-card" style="border-left:4px solid #1e7abf">
            <div class="sim-section-card-icon">🎧</div>
            <h3>Listening — 41 Menit</h3>
            <p>2 lectures + 1 conversation<br>5–6 soal per track<br><strong>Total: 17 soal</strong></p>
          </div>
          <div class="sim-section-card" style="border-left:4px solid #b8860b">
            <div class="sim-section-card-icon">🎤</div>
            <h3>Speaking — 17 Menit</h3>
            <p>4 task (Independent, Campus, Academic, Lecture)<br>Timer prep + bicara per task</p>
          </div>
          <div class="sim-section-card" style="border-left:4px solid #8b5e3c">
            <div class="sim-section-card-icon">✍️</div>
            <h3>Writing — 50 Menit</h3>
            <p>Task 1: Integrated (20 min)<br>Task 2: Academic Discussion (10 min)</p>
          </div>
        </div>
        <div class="sim-intro-tips">
          <h3>💡 Tips Sebelum Mulai</h3>
          <ul>
            <li>Ada jeda 10 menit setelah Listening — gunakan untuk istirahat sebelum Speaking.</li>
            <li>Speaking dan Writing menggunakan self-assessment untuk menghitung skor akhir.</li>
            <li>Timer per seksi berjalan otomatis. Kerjakan dengan serius agar skor mencerminkan kemampuan nyata.</li>
            <li>Total estimasi waktu: sekitar 2,5–3 jam termasuk jeda.</li>
          </ul>
        </div>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem;">
          <button class="btn-sim btn-sim-primary" onclick="TOEFLSimulation.startReading()">Mulai Simulasi ▶</button>
          <a href="index.html" class="btn-sim btn-sim-secondary">Kembali ke TOEFL Hub</a>
        </div>
      </div>`;
  }

  // ═══════════════════════════════════════════════════════════════
  // READING SECTION
  // ═══════════════════════════════════════════════════════════════

  function startReading() {
    _state.phase = 'reading';
    _state.rd_passage = 0;
    _state.rd_q = 0;
    _state.rdAnswers = {};
    _startTimer(READING_TIME);
    _updateProgress();
    _renderReadingPassage();
  }

  function _renderReadingPassage() {
    const passages = TOEFLSimData.getReadingPassages();
    const p = passages[_state.rd_passage];
    if (!p) { _startListening(); return; }
    const body = document.getElementById('sim-body');
    if (!body) return;
    body.innerHTML = `
      <div class="sim-reading-layout">
        <div class="sim-passage-panel">
          <div class="sim-passage-header">
            <span class="sim-passage-tag">${p.topic}</span>
            <span class="sim-passage-counter">Passage ${_state.rd_passage + 1} of ${passages.length}</span>
          </div>
          <h2 class="sim-passage-title">${p.title}</h2>
          <div class="sim-passage-body">${p.passage}</div>
        </div>
        <div class="sim-question-panel" id="sim-question-panel">
          ${_buildReadingQuestion(p)}
        </div>
      </div>`;
  }

  function _buildReadingQuestion(p) {
    const q = p.questions[_state.rd_q];
    if (!q) return '';
    const total = p.questions.length;
    const current = _state.rd_q + 1;

    if (q.type === 'prose_summary') {
      const selected = _state.rdAnswers[q.id] || [];
      return `
        <div class="sim-q-header">
          <span class="sim-q-num">Q${current} / ${total}</span>
          <span class="sim-q-type">Prose Summary</span>
        </div>
        <p class="sim-q-text">${q.question}</p>
        <p class="sim-intro-sentence"><em>${q.intro}</em></p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.5rem">Pilih <strong>3</strong> jawaban:</p>
        <div class="sim-choices">
          ${q.choices.map((c, i) => `
            <button class="sim-choice-btn ${selected.includes(i) ? 'selected' : ''}"
              onclick="TOEFLSimulation.toggleSummaryChoice('${p.id}', ${i})"
              data-idx="${i}">${String.fromCharCode(65+i)}. ${c}</button>
          `).join('')}
        </div>
        <button class="btn-sim btn-sim-primary" onclick="TOEFLSimulation.submitReadingQ()" style="margin-top:1rem" ${selected.length < 3 ? 'disabled' : ''}>
          ${_state.rd_q + 1 < total ? 'Soal Berikutnya →' : (_state.rd_passage + 1 < TOEFLSimData.getReadingPassages().length ? 'Passage Berikutnya →' : 'Lanjut ke Listening →')}
        </button>`;
    }

    const selectedIdx = _state.rdAnswers[q.id];
    return `
      <div class="sim-q-header">
        <span class="sim-q-num">Q${current} / ${total}</span>
        <span class="sim-q-type">${_qTypeLabel(q.type)}</span>
      </div>
      <p class="sim-q-text">${q.question}</p>
      <div class="sim-choices">
        ${q.choices.map((c, i) => `
          <button class="sim-choice-btn ${selectedIdx === i ? 'selected' : ''}"
            onclick="TOEFLSimulation.answerReadingQ('${p.id}', '${q.id}', ${i})"
            data-idx="${i}">${String.fromCharCode(65+i)}. ${c}</button>
        `).join('')}
      </div>`;
  }

  function _qTypeLabel(type) {
    const map = { factual:'Factual Info', negative_factual:'Negative Factual', inference:'Inference', vocab:'Vocabulary', rhetorical_purpose:'Rhetorical Purpose', prose_summary:'Prose Summary' };
    return map[type] || type;
  }

  function answerReadingQ(passageId, qId, choiceIdx) {
    _state.rdAnswers[qId] = choiceIdx;
    // Re-render question panel
    const passages = TOEFLSimData.getReadingPassages();
    const p = passages[_state.rd_passage];
    const panel = document.getElementById('sim-question-panel');
    if (panel) panel.innerHTML = _buildReadingQuestion(p);
    // Auto advance after short delay
    setTimeout(() => submitReadingQ(), 500);
  }

  function toggleSummaryChoice(passageId, idx) {
    const passages = TOEFLSimData.getReadingPassages();
    const p = passages[_state.rd_passage];
    const q = p.questions[_state.rd_q];
    let selected = _state.rdAnswers[q.id] || [];
    if (selected.includes(idx)) {
      selected = selected.filter(i => i !== idx);
    } else if (selected.length < 3) {
      selected = [...selected, idx];
    }
    _state.rdAnswers[q.id] = selected;
    const panel = document.getElementById('sim-question-panel');
    if (panel) panel.innerHTML = _buildReadingQuestion(p);
  }

  function submitReadingQ() {
    const passages = TOEFLSimData.getReadingPassages();
    const p = passages[_state.rd_passage];
    _state.rd_q++;
    if (_state.rd_q >= p.questions.length) {
      _state.rd_q = 0;
      _state.rd_passage++;
      if (_state.rd_passage >= passages.length) {
        _clearTimer();
        _startListening();
        return;
      }
    }
    _renderReadingPassage();
  }

  // ═══════════════════════════════════════════════════════════════
  // LISTENING SECTION
  // ═══════════════════════════════════════════════════════════════

  function _startListening() {
    _state.phase = 'listening';
    _state.lt_track = 0;
    _state.lt_q = 0;
    _state.ltAnswers = {};
    _state.ltAudioPlayed = false;
    _startTimer(LISTENING_TIME);
    _updateProgress();
    _renderListeningTrack();
  }

  function _renderListeningTrack() {
    const tracks = TOEFLSimData.getListeningTracks();
    const t = tracks[_state.lt_track];
    if (!t) { _clearTimer(); _startBreak(); return; }
    const body = document.getElementById('sim-body');
    if (!body) return;
    const typeLabel = t.type === 'lecture' ? `Lecture ${_state.lt_track + 1}` : 'Campus Conversation';

    body.innerHTML = `
      <div class="sim-listening-wrap">
        <div class="sim-listen-header">
          <span class="sim-passage-tag">${t.topic}</span>
          <span class="sim-passage-counter">${typeLabel} — Track ${_state.lt_track + 1} of ${tracks.length}</span>
        </div>
        <div class="sim-listen-info">
          <div class="sim-listen-icon">${t.icon}</div>
          <div>
            <div class="sim-listen-title">${t.title}</div>
            <div class="sim-listen-course">${t.course || t.type === 'conversation' ? 'Campus Conversation' : t.course}</div>
          </div>
        </div>
        <div class="script-box" id="script-box">
          ${t.script.map((line, i) => `
            <div class="script-line" data-idx="${i}">
              <span class="script-speaker">${line.speaker}:</span>
              <span class="script-text">${line.text}</span>
            </div>`).join('')}
        </div>
        <div class="sim-audio-controls">
          <button class="btn-sim btn-sim-primary" id="btn-play-audio" onclick="TOEFLSimulation.playListeningAudio()">▶ Putar Audio</button>
          <button class="btn-sim btn-sim-secondary" id="btn-to-questions" onclick="TOEFLSimulation.goToListeningQuestions()" ${_state.ltAudioPlayed ? '' : 'disabled'}>
            Lanjut ke Soal →
          </button>
        </div>
        <p style="font-size:0.8rem;color:var(--text-muted);text-align:center;margin-top:0.5rem">
          Di TOEFL asli, audio hanya diputar sekali. Dengarkan dengan saksama.
        </p>
      </div>`;
  }

  function playListeningAudio() {
    const tracks = TOEFLSimData.getListeningTracks();
    const t = tracks[_state.lt_track];
    const btn = document.getElementById('btn-play-audio');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Memutar...'; }
    _stopSpeak();
    _playScript(t.script, () => {
      _state.ltAudioPlayed = true;
      if (btn) { btn.disabled = false; btn.textContent = '▶ Putar Ulang'; }
      const nextBtn = document.getElementById('btn-to-questions');
      if (nextBtn) nextBtn.disabled = false;
    });
  }

  function goToListeningQuestions() {
    if (!_state.ltAudioPlayed) {
      App.showToast('Putar audio dulu sebelum menjawab soal.', 'warning');
      return;
    }
    _state.lt_q = 0;
    _renderListeningQuestion();
  }

  function _renderListeningQuestion() {
    const tracks = TOEFLSimData.getListeningTracks();
    const t = tracks[_state.lt_track];
    const q = t.questions[_state.lt_q];
    if (!q) {
      // Move to next track
      _state.lt_track++;
      _state.lt_q = 0;
      _state.ltAudioPlayed = false;
      _renderListeningTrack();
      return;
    }
    const body = document.getElementById('sim-body');
    if (!body) return;
    const total = t.questions.length;
    const current = _state.lt_q + 1;
    const selectedIdx = _state.ltAnswers[q.id];

    body.innerHTML = `
      <div class="sim-question-card">
        <div class="sim-q-header">
          <span class="sim-q-num">Soal ${current} / ${total} — Track ${_state.lt_track + 1}</span>
          <span class="sim-q-type">${_qTypeLabel(q.type)}</span>
        </div>
        <p class="sim-q-text">${q.question}</p>
        <div class="sim-choices">
          ${q.choices.map((c, i) => `
            <button class="sim-choice-btn ${selectedIdx === i ? 'selected' : ''}"
              onclick="TOEFLSimulation.answerListeningQ('${q.id}', ${i})"
              data-idx="${i}">${String.fromCharCode(65+i)}. ${c}</button>
          `).join('')}
        </div>
      </div>`;
  }

  function answerListeningQ(qId, choiceIdx) {
    _state.ltAnswers[qId] = choiceIdx;
    _renderListeningQuestion();
    setTimeout(() => {
      _state.lt_q++;
      _renderListeningQuestion();
    }, 400);
  }

  // ═══════════════════════════════════════════════════════════════
  // BREAK
  // ═══════════════════════════════════════════════════════════════

  function _startBreak() {
    _state.phase = 'break';
    _updateProgress();
    _startTimer(BREAK_TIME);
    const body = document.getElementById('sim-body');
    if (!body) return;
    body.innerHTML = `
      <div class="sim-break">
        <div class="sim-break-icon">☕</div>
        <h2>Jeda 10 Menit</h2>
        <p>Kamu telah menyelesaikan Reading dan Listening Section. Gunakan waktu ini untuk istirahat sejenak.</p>
        <p>Selanjutnya: <strong>Speaking Section</strong> (4 task dengan timer bicara)</p>
        <div class="sim-break-timer">Sisa jeda: <span id="break-countdown"></span></div>
        <button class="btn-sim btn-sim-primary" onclick="TOEFLSimulation.skipBreak()" style="margin-top:1.5rem">
          Lewati Jeda — Mulai Speaking →
        </button>
      </div>`;
    _updateBreakCountdown();
  }

  function _updateBreakCountdown() {
    const el = document.getElementById('break-countdown');
    if (!el) return;
    const m = Math.floor(_state.secondsLeft / 60);
    const s = _state.secondsLeft % 60;
    el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if (_state.secondsLeft > 0) requestAnimationFrame(_updateBreakCountdown);
  }

  function skipBreak() {
    _clearTimer();
    _startSpeaking();
  }

  // ═══════════════════════════════════════════════════════════════
  // SPEAKING SECTION
  // ═══════════════════════════════════════════════════════════════

  function _startSpeaking() {
    _state.phase = 'speaking';
    _state.sp_task = 0;
    _state.sp_selfScores = [null, null, null, null];
    _startTimer(SPEAKING_TIME);
    _updateProgress();
    _renderSpeakingTask();
  }

  function _renderSpeakingTask() {
    const tasks = TOEFLSimData.getSpeakingTasks();
    const taskKeys = ['task1', 'task2', 'task3', 'task4'];
    const task = tasks[taskKeys[_state.sp_task]];
    if (!task) { _clearTimer(); _startWriting(); return; }
    _state.sp_phase = 'ready';
    _clearTaskTimer();
    const body = document.getElementById('sim-body');
    if (!body) return;

    body.innerHTML = `
      <div class="sim-speaking-wrap">
        <div class="sim-speak-header">
          <span class="sim-passage-tag">Speaking Task ${_state.sp_task + 1} / 4</span>
          <span class="sim-passage-counter">${task.title}</span>
        </div>
        <div id="speaking-content">
          ${_buildSpeakingReady(task)}
        </div>
      </div>`;
  }

  function _buildSpeakingReady(task) {
    if (task.type === 'independent') {
      return `
        <div class="sim-task-card">
          <h3>${task.icon} ${task.title}</h3>
          <p class="sim-prompt-text">${task.prompt}</p>
          <div class="sim-task-times">
            <span>⏱ Persiapan: <strong>${task.prepTime} detik</strong></span>
            <span>🎤 Bicara: <strong>${task.speakTime} detik</strong></span>
          </div>
          <button class="btn-sim btn-sim-primary" onclick="TOEFLSimulation.startSpeakingPrep()">
            Mulai Persiapan →
          </button>
        </div>`;
    }
    if (task.type === 'campus') {
      return `
        <div class="sim-task-card">
          <h3>${task.icon} ${task.title}</h3>
          <p>Baca pengumuman berikut, lalu dengarkan percakapan dua mahasiswa. Kemudian jawab pertanyaan.</p>
          <p class="sim-task-question"><strong>Pertanyaan:</strong> ${task.promptQuestion}</p>
          <button class="btn-sim btn-sim-primary" onclick="TOEFLSimulation.startSpeakingRead()">
            Mulai Membaca (${task.readingTime} detik) →
          </button>
        </div>`;
    }
    if (task.type === 'academic') {
      return `
        <div class="sim-task-card">
          <h3>${task.icon} ${task.title}</h3>
          <p>Baca konsep akademik berikut, lalu dengarkan lecture profesor. Kemudian jawab pertanyaan.</p>
          <p class="sim-task-question"><strong>Pertanyaan:</strong> ${task.promptQuestion}</p>
          <button class="btn-sim btn-sim-primary" onclick="TOEFLSimulation.startSpeakingRead()">
            Mulai Membaca (${task.readingTime} detik) →
          </button>
        </div>`;
    }
    if (task.type === 'lecture_only') {
      return `
        <div class="sim-task-card">
          <h3>${task.icon} ${task.title}</h3>
          <p>Dengarkan lecture profesor, lalu jawab pertanyaan.</p>
          <p class="sim-task-question"><strong>Pertanyaan:</strong> ${task.promptQuestion}</p>
          <button class="btn-sim btn-sim-primary" onclick="TOEFLSimulation.startSpeakingListen()">
            Dengarkan Lecture →
          </button>
        </div>`;
    }
    return '';
  }

  function startSpeakingPrep() {
    const tasks = TOEFLSimData.getSpeakingTasks();
    const taskKeys = ['task1','task2','task3','task4'];
    const task = tasks[taskKeys[_state.sp_task]];
    _state.sp_phase = 'prep';
    const content = document.getElementById('speaking-content');
    if (!content) return;
    content.innerHTML = `
      <div class="sim-timer-phase">
        <div class="sim-timer-phase-icon">💭</div>
        <div class="sim-timer-phase-label">Persiapan</div>
        <div class="sim-task-timer" id="task-timer">${task.prepTime}</div>
        <p>Pikirkan jawaban kamu. Timer akan beralih ke fase bicara otomatis.</p>
        ${task.type === 'independent' ? `<div class="sim-prompt-reminder">${task.prompt}</div>` : `<div class="sim-prompt-reminder"><em>${task.promptQuestion}</em></div>`}
      </div>`;
    _startTaskTimer(task.prepTime, () => startSpeakingSpeak());
  }

  function startSpeakingRead() {
    const tasks = TOEFLSimData.getSpeakingTasks();
    const taskKeys = ['task1','task2','task3','task4'];
    const task = tasks[taskKeys[_state.sp_task]];
    _state.sp_phase = 'reading';
    const content = document.getElementById('speaking-content');
    if (!content) return;
    const text = task.readingText || task.readingText;
    content.innerHTML = `
      <div class="sim-reading-phase">
        <div class="sim-timer-row">
          <span>⏱ Waktu Membaca</span>
          <strong id="task-timer"></strong>
        </div>
        <div class="sim-reading-title">${task.readingTitle}</div>
        <div class="sim-reading-body">${text}</div>
      </div>`;
    _startTaskTimer(task.readingTime, () => startSpeakingListen());
  }

  function startSpeakingListen() {
    const tasks = TOEFLSimData.getSpeakingTasks();
    const taskKeys = ['task1','task2','task3','task4'];
    const task = tasks[taskKeys[_state.sp_task]];
    _state.sp_phase = 'listening';
    const script = task.script || [];
    const content = document.getElementById('speaking-content');
    if (!content) return;
    content.innerHTML = `
      <div class="sim-listen-phase">
        <div class="sim-listen-info">
          <div class="sim-listen-icon">${task.icon}</div>
          <div><div class="sim-listen-title">Dengarkan dengan saksama</div></div>
        </div>
        <div class="script-box" id="task-script-box">
          ${script.map((line, i) => `
            <div class="script-line" data-idx="${i}">
              <span class="script-speaker">${line.speaker}:</span>
              <span class="script-text">${line.text}</span>
            </div>`).join('')}
        </div>
        <p style="font-size:0.8rem;color:var(--text-muted);text-align:center">Audio diputar otomatis...</p>
      </div>`;
    _playScript(script, () => startSpeakingPrep());
  }

  function startSpeakingSpeak() {
    _clearTaskTimer();
    const tasks = TOEFLSimData.getSpeakingTasks();
    const taskKeys = ['task1','task2','task3','task4'];
    const task = tasks[taskKeys[_state.sp_task]];
    _state.sp_phase = 'speaking';
    const content = document.getElementById('speaking-content');
    if (!content) return;
    content.innerHTML = `
      <div class="sim-timer-phase">
        <div class="sim-timer-phase-icon">🎤</div>
        <div class="sim-timer-phase-label">Waktu Bicara</div>
        <div class="sim-task-timer danger" id="task-timer">${task.speakTime}</div>
        <p>Bicara selama <strong>${task.speakTime} detik</strong>. Jawab pertanyaan dengan jelas.</p>
        <div class="sim-prompt-reminder"><em>${task.promptQuestion || task.prompt}</em></div>
      </div>`;
    _startTaskTimer(task.speakTime, () => _renderSpeakingAssess());
  }

  function _renderSpeakingAssess() {
    _clearTaskTimer();
    const tasks = TOEFLSimData.getSpeakingTasks();
    const taskKeys = ['task1','task2','task3','task4'];
    const task = tasks[taskKeys[_state.sp_task]];
    _state.sp_phase = 'assess';
    const content = document.getElementById('speaking-content');
    if (!content) return;
    content.innerHTML = `
      <div class="sim-assess-wrap">
        <h3>📋 Penilaian Mandiri — Task ${_state.sp_task + 1}</h3>
        <p>Berikan skor untuk jawaban kamu berdasarkan kriteria di bawah:</p>
        <div class="sim-rubric-box">
          ${task.rubric.map(r => `<div class="rubric-row"><strong>${r.criterion}:</strong> ${r.desc}</div>`).join('')}
        </div>
        <div class="sim-self-score">
          <p><strong>Berapa skor keseluruhan kamu? (0–4)</strong></p>
          <div class="sim-score-btns">
            ${[0,1,2,3,4].map(s => `
              <button class="score-btn" onclick="TOEFLSimulation.rateSpeaking(${s})">${s}
                <span class="score-label">${['Tidak Menjawab','Kurang','Cukup','Baik','Sangat Baik'][s]}</span>
              </button>`).join('')}
          </div>
        </div>
        <div class="sim-model-answer">
          <button class="btn-sim btn-sim-secondary" onclick="TOEFLSimulation.toggleModel('model-ans')">
            Lihat Model Answer
          </button>
          <div id="model-ans" style="display:none;margin-top:1rem;" class="sim-model-text">
            <p><em>${task.model || 'Model answer tidak tersedia.'}</em></p>
          </div>
        </div>
      </div>`;
  }

  function rateSpeaking(score) {
    _state.sp_selfScores[_state.sp_task] = score;
    document.querySelectorAll('.score-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.score-btn')[score]?.classList.add('selected');
    // Move to next task after brief delay
    setTimeout(() => {
      _state.sp_task++;
      if (_state.sp_task >= 4) {
        _clearTimer();
        _startWriting();
      } else {
        _renderSpeakingTask();
      }
    }, 800);
  }

  function toggleModel(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }

  // ═══════════════════════════════════════════════════════════════
  // WRITING SECTION
  // ═══════════════════════════════════════════════════════════════

  function _startWriting() {
    _state.phase = 'writing';
    _state.wr_task = 0;
    _state.wr_texts = ['', ''];
    _state.wr_selfScores = [null, null];
    _startTimer(WRITING_TIME);
    _updateProgress();
    _renderWritingTask();
  }

  function _renderWritingTask() {
    const tasks = TOEFLSimData.getWritingTasks();
    const taskKeys = ['task1', 'task2'];
    const task = tasks[taskKeys[_state.wr_task]];
    if (!task) { _clearTimer(); _clearWritingTimer(); _submitSim(); return; }
    _state.wr_phase = 'ready';
    _clearWritingTimer();
    const body = document.getElementById('sim-body');
    if (!body) return;

    if (task.type === 'integrated') {
      body.innerHTML = `
        <div class="sim-writing-wrap">
          <div class="sim-speak-header">
            <span class="sim-passage-tag">Writing Task 1 — Integrated</span>
            <span class="sim-passage-counter">Baca → Dengar → Tulis (20 menit)</span>
          </div>
          <div id="writing-content">
            ${_buildWritingReady(task)}
          </div>
        </div>`;
    } else {
      body.innerHTML = `
        <div class="sim-writing-wrap">
          <div class="sim-speak-header">
            <span class="sim-passage-tag">Writing Task 2 — Academic Discussion</span>
            <span class="sim-passage-counter">Baca diskusi → Tulis respons (10 menit)</span>
          </div>
          <div id="writing-content">
            ${_buildWritingDiscussion(task)}
          </div>
        </div>`;
    }
  }

  function _buildWritingReady(task) {
    return `
      <div class="sim-task-card">
        <h3>${task.icon} ${task.title}</h3>
        <p>Baca passage, dengarkan lecture, lalu tulis essay merangkum poin-poin lecture dan hubungannya dengan reading.</p>
        <ul style="font-size:0.9rem;line-height:1.7;margin:0.5rem 0 1rem">
          <li>Membaca passage: 3 menit</li>
          <li>Mendengarkan lecture: otomatis setelah membaca</li>
          <li>Menulis: 20 menit (150–225 kata)</li>
        </ul>
        <button class="btn-sim btn-sim-primary" onclick="TOEFLSimulation.startWritingRead()">
          Mulai Membaca →
        </button>
      </div>`;
  }

  function _buildWritingDiscussion(task) {
    return `
      <div class="sim-task-card">
        <h3>${task.icon} ${task.title}</h3>
        <p>Baca thread diskusi akademik dan tuliskan respons kamu (minimal ${task.wordMin} kata, 10 menit).</p>
        <button class="btn-sim btn-sim-primary" onclick="TOEFLSimulation.startWritingDiscussion()">
          Mulai Menulis →
        </button>
      </div>`;
  }

  function startWritingRead() {
    const task = TOEFLSimData.getWritingTasks().task1;
    _state.wr_phase = 'reading';
    const content = document.getElementById('writing-content');
    if (!content) return;
    content.innerHTML = `
      <div class="sim-reading-phase">
        <div class="sim-timer-row">
          <span>⏱ Waktu Membaca</span>
          <strong id="writing-timer"></strong>
        </div>
        <div class="sim-reading-title">${task.readingTitle}</div>
        <div class="sim-reading-body">${task.readingText}</div>
      </div>`;
    _startWritingTimer(task.readingTime, () => startWritingListen());
  }

  function startWritingListen() {
    _clearWritingTimer();
    const task = TOEFLSimData.getWritingTasks().task1;
    _state.wr_phase = 'listening';
    const content = document.getElementById('writing-content');
    if (!content) return;
    content.innerHTML = `
      <div class="sim-listen-phase">
        <div class="sim-listen-info">
          <div class="sim-listen-icon">🎓</div>
          <div><div class="sim-listen-title">Dengarkan lecture professor</div></div>
        </div>
        <div class="script-box" id="writing-script-box">
          ${task.listenScript.map((line, i) => `
            <div class="script-line" data-idx="${i}">
              <span class="script-speaker">${line.speaker}:</span>
              <span class="script-text">${line.text}</span>
            </div>`).join('')}
        </div>
        <p style="font-size:0.8rem;color:var(--text-muted);text-align:center">Audio diputar otomatis...</p>
      </div>`;
    _playScript(task.listenScript, () => startWritingWrite());
  }

  function startWritingWrite() {
    _clearWritingTimer();
    const task = TOEFLSimData.getWritingTasks().task1;
    _state.wr_phase = 'writing';
    const content = document.getElementById('writing-content');
    if (!content) return;
    content.innerHTML = `
      <div class="sim-write-phase">
        <div class="sim-write-toolbar">
          <div>
            <span id="word-count-display">0 kata</span>
            <span style="color:var(--text-muted);font-size:0.8rem"> (target: ${task.wordMin}–${task.wordMax})</span>
          </div>
          <div class="sim-timer-row">
            <span>⏱</span>
            <strong id="writing-timer"></strong>
          </div>
        </div>
        <div class="sim-write-prompt">${task.prompt}</div>
        <textarea id="writing-area" class="sim-write-area"
          placeholder="Tulis jawaban kamu di sini..."
          oninput="TOEFLSimulation.updateWordCount(this)">${_state.wr_texts[0]}</textarea>
        <button class="btn-sim btn-sim-primary" onclick="TOEFLSimulation.submitWritingTask1()" style="margin-top:1rem">
          Selesai & Lanjut ke Task 2 →
        </button>
      </div>`;
    _startWritingTimer(task.timeLimit * 60, () => submitWritingTask1());
  }

  function updateWordCount(textarea) {
    const text = textarea.value;
    const wc = text.trim() ? text.trim().split(/\s+/).length : 0;
    const el = document.getElementById('word-count-display');
    if (el) {
      el.textContent = `${wc} kata`;
      el.style.color = wc >= 150 && wc <= 225 ? 'var(--color-success)' : wc < 150 ? 'var(--color-warning)' : 'var(--color-error)';
    }
    _state.wr_texts[0] = text;
  }

  function submitWritingTask1() {
    _clearWritingTimer();
    const ta = document.getElementById('writing-area');
    if (ta) _state.wr_texts[0] = ta.value;
    const wc = _state.wr_texts[0].trim() ? _state.wr_texts[0].trim().split(/\s+/).length : 0;
    _renderWritingAssess1(wc);
  }

  function _renderWritingAssess1(wordCount) {
    const task = TOEFLSimData.getWritingTasks().task1;
    const content = document.getElementById('writing-content');
    if (!content) return;
    content.innerHTML = `
      <div class="sim-assess-wrap">
        <h3>📋 Penilaian Mandiri — Writing Task 1</h3>
        <p>Jumlah kata: <strong>${wordCount}</strong></p>
        <div class="sim-rubric-box">
          ${Object.entries(task.rubric || {}).map(([score, desc]) => `<div class="rubric-row"><strong>${score}:</strong> ${desc}</div>`).join('')}
        </div>
        <div class="sim-self-score">
          <p><strong>Berapa skor kamu? (0–5)</strong></p>
          <div class="sim-score-btns">
            ${[0,1,2,3,4,5].map(s => `
              <button class="score-btn" onclick="TOEFLSimulation.rateWriting1(${s})">${s}
                <span class="score-label">${['Tidak Menjawab','Sangat Kurang','Kurang','Cukup','Baik','Sangat Baik'][s]}</span>
              </button>`).join('')}
          </div>
        </div>
        <div style="margin-top:1rem">
          <button class="btn-sim btn-sim-secondary" onclick="TOEFLSimulation.toggleModel('model-ans-w1')">Lihat Model Answer</button>
          <div id="model-ans-w1" style="display:none;margin-top:1rem" class="sim-model-text">
            <p>${task.modelAnswer.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      </div>`;
  }

  function rateWriting1(score) {
    _state.wr_selfScores[0] = score;
    _state.wr_task = 1;
    setTimeout(() => _renderWritingTask(), 600);
  }

  function startWritingDiscussion() {
    const task = TOEFLSimData.getWritingTasks().task2;
    _state.wr_phase = 'writing';
    const content = document.getElementById('writing-content');
    if (!content) return;
    content.innerHTML = `
      <div class="sim-discussion-layout">
        <div class="sim-discussion-panel">
          <div class="discussion-prof">
            <div class="discussion-avatar">👩‍🏫</div>
            <div>
              <div class="discussion-name">${task.professor.name} (Professor)</div>
              <div class="discussion-text">${task.professor.post}</div>
            </div>
          </div>
          ${task.students.map(s => `
            <div class="discussion-student">
              <div class="discussion-avatar">👤</div>
              <div>
                <div class="discussion-name">${s.name}</div>
                <div class="discussion-text">${s.post}</div>
              </div>
            </div>`).join('')}
        </div>
        <div class="sim-write-panel">
          <div class="sim-write-toolbar">
            <div>
              <span id="word-count-display">0 kata</span>
              <span style="color:var(--text-muted);font-size:0.8rem"> (min ${task.wordMin})</span>
            </div>
            <div class="sim-timer-row">
              <span>⏱</span>
              <strong id="writing-timer"></strong>
            </div>
          </div>
          <div class="sim-write-prompt">${task.prompt}</div>
          <textarea id="writing-area-2" class="sim-write-area"
            placeholder="Tulis respons kamu di sini..."
            oninput="TOEFLSimulation.updateWordCount2(this)">${_state.wr_texts[1]}</textarea>
          <button class="btn-sim btn-sim-primary" onclick="TOEFLSimulation.submitWritingTask2()" style="margin-top:1rem">
            Selesai — Submit Simulasi ✓
          </button>
        </div>
      </div>`;
    _startWritingTimer(task.timeLimit * 60, () => submitWritingTask2());
  }

  function updateWordCount2(textarea) {
    const text = textarea.value;
    const wc = text.trim() ? text.trim().split(/\s+/).length : 0;
    const el = document.getElementById('word-count-display');
    if (el) {
      el.textContent = `${wc} kata`;
      el.style.color = wc >= 100 ? 'var(--color-success)' : 'var(--color-warning)';
    }
    _state.wr_texts[1] = text;
  }

  function submitWritingTask2() {
    _clearWritingTimer();
    const ta = document.getElementById('writing-area-2');
    if (ta) _state.wr_texts[1] = ta.value;
    const wc = _state.wr_texts[1].trim() ? _state.wr_texts[1].trim().split(/\s+/).length : 0;
    _renderWritingAssess2(wc);
  }

  function _renderWritingAssess2(wordCount) {
    const task = TOEFLSimData.getWritingTasks().task2;
    const content = document.getElementById('writing-content') || document.getElementById('sim-body');
    if (!content) return;
    const body = document.getElementById('sim-body');
    if (body) body.innerHTML = `
      <div class="sim-writing-wrap">
        <div class="sim-assess-wrap">
          <h3>📋 Penilaian Mandiri — Writing Task 2</h3>
          <p>Jumlah kata: <strong>${wordCount}</strong></p>
          <div class="sim-rubric-box">
            ${Object.entries(task.rubric || {}).map(([score, desc]) => `<div class="rubric-row"><strong>${score}:</strong> ${desc}</div>`).join('')}
          </div>
          <div class="sim-self-score">
            <p><strong>Berapa skor kamu? (0–5)</strong></p>
            <div class="sim-score-btns">
              ${[0,1,2,3,4,5].map(s => `
                <button class="score-btn" onclick="TOEFLSimulation.rateWriting2(${s})">${s}
                  <span class="score-label">${['Tidak Menjawab','Sangat Kurang','Kurang','Cukup','Baik','Sangat Baik'][s]}</span>
                </button>`).join('')}
            </div>
          </div>
        </div>
      </div>`;
  }

  function rateWriting2(score) {
    _state.wr_selfScores[1] = score;
    setTimeout(() => _submitSim(), 600);
  }

  // ═══════════════════════════════════════════════════════════════
  // SUBMIT & SCORE
  // ═══════════════════════════════════════════════════════════════

  function _submitSim() {
    _clearTimer();
    _clearTaskTimer();
    _clearWritingTimer();
    _stopSpeak();
    _state.phase = 'submitting';

    // READING SCORE
    const passages = TOEFLSimData.getReadingPassages();
    let rdCorrect = 0;
    let rdTotal = 0;
    passages.forEach(p => {
      p.questions.forEach(q => {
        rdTotal++;
        const ans = _state.rdAnswers[q.id];
        if (q.type === 'prose_summary') {
          // Each correct choice in a summary = partial credit
          const selected = Array.isArray(ans) ? ans : [];
          const correct = q.answers || [];
          const matches = selected.filter(i => correct.includes(i)).length;
          if (matches === 3) rdCorrect += 1;
          else if (matches >= 2) rdCorrect += 0.67;
          else if (matches === 1) rdCorrect += 0.33;
        } else {
          if (ans === q.answer) rdCorrect++;
        }
      });
    });
    const rdScore = TOEFLSimData.convertReadingScore(Math.round(rdCorrect));

    // LISTENING SCORE
    const tracks = TOEFLSimData.getListeningTracks();
    let ltCorrect = 0;
    let ltTotal = 0;
    tracks.forEach(t => {
      t.questions.forEach(q => {
        ltTotal++;
        if (_state.ltAnswers[q.id] === q.answer) ltCorrect++;
      });
    });
    const ltScore = TOEFLSimData.convertListeningScore(ltCorrect);

    // SPEAKING SCORE
    const spScore = TOEFLSimData.convertSpeakingScore(_state.sp_selfScores);

    // WRITING SCORE
    const wrScore = TOEFLSimData.convertWritingScore(_state.wr_selfScores);

    const total = rdScore + ltScore + spScore + wrScore;

    // Save result
    const uid = _uid();
    const result = {
      type: 'toefl',
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      timestamp: Date.now(),
      reading: rdScore,
      listening: ltScore,
      speaking: spScore,
      writing: wrScore,
      total,
      raw: {
        rdCorrect: Math.round(rdCorrect),
        rdTotal,
        ltCorrect,
        ltTotal,
        sp_selfScores: _state.sp_selfScores,
        wr_selfScores: _state.wr_selfScores
      }
    };

    if (uid) {
      let simResults = Storage.getUser(uid, 'sim_results') || [];
      const others = simResults.filter(r => r.type !== 'toefl');
      const toeflResults = simResults.filter(r => r.type === 'toefl').slice(0, 4);
      simResults = [result, ...toeflResults, ...others];
      Storage.setUser(uid, 'sim_results', simResults);

      XPSystem.addXP(uid, 100, 'TOEFL iBT Simulasi Full Test');
      ChallengeSystem.onModuleVisit('toefl_simulation');

      if (total >= 80) {
        const badges = Storage.getUser(uid, 'badges') || [];
        if (!badges.includes('toefl_ready')) {
          badges.push('toefl_ready');
          Storage.setUser(uid, 'badges', badges);
          App.showToast('🏅 Badge TOEFL Ready diraih! Total ≥ 80!', 'success');
        }
      }
    }

    const body = document.getElementById('sim-body');
    if (body) body.innerHTML = `
      <div class="sim-submitting">
        <div class="sim-submitting-icon">⏳</div>
        <h2>Menghitung Skor...</h2>
        <p>Hasilmu sedang disiapkan. Sebentar lagi...</p>
      </div>`;
    setTimeout(() => { window.location.href = 'result.html'; }, 2000);
  }

  // ── INIT ──────────────────────────────────────────────────────
  function init() {
    Router.guard();
    App.init('toefl-simulation');
    _renderIntro();
  }

  return {
    init,
    startReading,
    // Reading
    answerReadingQ,
    toggleSummaryChoice,
    submitReadingQ,
    // Listening
    playListeningAudio,
    goToListeningQuestions,
    answerListeningQ,
    // Break
    skipBreak,
    // Speaking
    startSpeakingPrep,
    startSpeakingRead,
    startSpeakingListen,
    startSpeakingSpeak,
    rateSpeaking,
    toggleModel,
    // Writing
    startWritingRead,
    startWritingListen,
    startWritingWrite,
    updateWordCount,
    submitWritingTask1,
    rateWriting1,
    startWritingDiscussion,
    updateWordCount2,
    submitWritingTask2,
    rateWriting2
  };

})();
