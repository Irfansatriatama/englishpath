/**
 * EnglishPath — TOEIC Simulation Module
 * Fase 14c-2: Simulasi Full Test TOEIC
 * localStorage: ep_user_{id}_sim_results
 *
 * Flow:
 *   intro → listening (45 min, Parts 1–4) → break (5 min) → reading (75 min, Parts 5–7) → submit → result.html
 */
const TOEICSimulation = (() => {

  // ── State ─────────────────────────────────────────────────────
  let _state = {
    phase: 'intro',       // intro | lc_part1 | lc_part2 | lc_part3 | lc_part4 | break | rc_part5 | rc_part6 | rc_part7 | submitting
    // Listening
    lc_p1_idx: 0,         // current question index in Part 1
    lc_p2_idx: 0,
    lc_p3_set: 0,         // current set index in Part 3
    lc_p3_q:   0,         // current question within set
    lc_p4_set: 0,
    lc_p4_q:   0,
    // Reading
    rc_p5_idx: 0,
    rc_p6_text: 0,        // current text index in Part 6
    rc_p6_blank: 0,       // current blank within text (for review)
    rc_p7_idx: 0,         // current passage index in Part 7
    rc_p7_q:   0,         // current question within passage
    // Timer
    timerInterval: null,
    secondsLeft: 0,
    // Answers
    answers: {},          // { questionId: answerIndex }
    p6Answers: {},        // { 'textIdx_blankIdx': answerIndex }
    // TTS
    ttsPlaying: false
  };

  const LC_TIME = 45 * 60;   // 45 minutes
  const RC_TIME = 75 * 60;   // 75 minutes
  const BREAK_TIME = 5 * 60; // 5 min break between sections

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  // ── Timer ─────────────────────────────────────────────────────
  function _startTimer(seconds) {
    _clearTimer();
    _state.secondsLeft = seconds;
    _updateTimerUI();
    _state.timerInterval = setInterval(() => {
      _state.secondsLeft--;
      _updateTimerUI();
      if (_state.secondsLeft <= 0) {
        _clearTimer();
        _onTimerEnd();
      }
    }, 1000);
  }

  function _clearTimer() {
    if (_state.timerInterval) {
      clearInterval(_state.timerInterval);
      _state.timerInterval = null;
    }
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

  function _onTimerEnd() {
    App.showToast('Waktu habis! Melanjutkan ke bagian berikutnya...', 'info');
    const lcPhases = ['lc_part1','lc_part2','lc_part3','lc_part4'];
    const rcPhases = ['rc_part5','rc_part6','rc_part7'];
    if (_state.phase === 'lc_part4') {
      setTimeout(_startBreak, 1500);
    } else if (_state.phase === 'break') {
      setTimeout(_startRC, 1500);
    } else if (_state.phase === 'rc_part7') {
      setTimeout(_submitSim, 1500);
    }
  }

  // ── Progress ──────────────────────────────────────────────────
  function _updateProgress() {
    const phases = ['lc_part1','lc_part2','lc_part3','lc_part4','break','rc_part5','rc_part6','rc_part7'];
    const idx = phases.indexOf(_state.phase);
    if (idx < 0) return;
    const pct = Math.round(((idx + 0.5) / phases.length) * 100);
    const fill = document.getElementById('sim-progress-fill');
    const label = document.getElementById('sim-progress-label');
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = `${pct}% selesai`;

    // Section step indicators
    const lcActive = ['lc_part1','lc_part2','lc_part3','lc_part4'].includes(_state.phase);
    const rcActive = ['rc_part5','rc_part6','rc_part7'].includes(_state.phase);
    const lcDone = ['break','rc_part5','rc_part6','rc_part7'].includes(_state.phase);
    const rcDone = false;

    const stepLC = document.getElementById('step-lc');
    const stepRC = document.getElementById('step-rc');
    if (stepLC) stepLC.classList.toggle('active', lcActive), stepLC.classList.toggle('completed', lcDone);
    if (stepRC) stepRC.classList.toggle('active', rcActive), stepRC.classList.toggle('completed', rcDone);
  }

  // ── TTS ───────────────────────────────────────────────────────
  function _speak(text) {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US';
    utt.rate = 0.88;
    utt.onstart = () => { _state.ttsPlaying = true; _updatePlayBtn(); };
    utt.onend   = () => { _state.ttsPlaying = false; _updatePlayBtn(); };
    utt.onerror = () => { _state.ttsPlaying = false; _updatePlayBtn(); };
    speechSynthesis.speak(utt);
  }

  function _stopSpeak() {
    if (window.speechSynthesis) speechSynthesis.cancel();
    _state.ttsPlaying = false;
    _updatePlayBtn();
  }

  function _updatePlayBtn() {
    const btn = document.getElementById('btn-play-audio');
    if (!btn) return;
    btn.innerHTML = _state.ttsPlaying ? '⏹ Stop' : '▶ Putar Audio';
    btn.classList.toggle('playing', _state.ttsPlaying);
  }

  // ── INTRO ─────────────────────────────────────────────────────
  function _renderIntro() {
    _state.phase = 'intro';
    const body = document.getElementById('sim-body');
    if (!body) return;
    body.innerHTML = `
      <div class="sim-intro">
        <div class="sim-intro-icon">🎯</div>
        <h1>TOEIC Full Test Simulation</h1>
        <p>Simulasi ujian TOEIC lengkap mencakup <strong>Listening &amp; Reading Section</strong>.<br>Siapkan tempat yang tenang dan earphone jika memungkinkan.</p>
        <div class="sim-intro-cards">
          <div class="sim-section-card lc-card">
            <div class="sim-section-card-icon">🎧</div>
            <h3>Listening Section — 45 Menit</h3>
            <p>Part 1: Photograph Description (6 soal)<br>
               Part 2: Question-Response (25 soal)<br>
               Part 3: Short Conversations (39 soal)<br>
               Part 4: Short Talks (30 soal)<br>
               <strong>Total: 100 soal</strong></p>
          </div>
          <div class="sim-section-card rc-card">
            <div class="sim-section-card-icon">📖</div>
            <h3>Reading Section — 75 Menit</h3>
            <p>Part 5: Incomplete Sentences (30 soal)<br>
               Part 6: Text Completion (16 soal)<br>
               Part 7: Reading Comprehension (29 soal)<br>
               <strong>Total: 75 soal</strong></p>
          </div>
        </div>
        <div class="sim-intro-tips">
          <h3>💡 Tips Sebelum Mulai</h3>
          <ul>
            <li>Listening Section dimulai duluan — dengarkan TTS dengan saksama, karena audio hanya diputar satu kali di ujian asli.</li>
            <li>Ada jeda 5 menit antara Listening dan Reading Section.</li>
            <li>Kerjakan soal yang mudah lebih dulu, jangan terpaku di satu soal.</li>
            <li>Timer akan berjalan otomatis sesuai waktu per section.</li>
          </ul>
        </div>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem;">
          <button class="btn-sim btn-sim-primary" onclick="TOEICSimulation.startLC()">Mulai Simulasi ▶</button>
          <a href="index.html" class="btn-sim btn-sim-secondary">Kembali ke TOEIC Hub</a>
        </div>
      </div>`;
  }

  // ── LISTENING SECTION ─────────────────────────────────────────

  function startLC() {
    _state.phase = 'lc_part1';
    _state.lc_p1_idx = 0;
    _state.lc_p2_idx = 0;
    _state.lc_p3_set = 0;
    _state.lc_p3_q = 0;
    _state.lc_p4_set = 0;
    _state.lc_p4_q = 0;
    _startTimer(LC_TIME);
    _updateProgress();
    _renderLC_Part1();
  }

  function _renderLC_Part1() {
    _state.phase = 'lc_part1';
    const data = TOEICSimData.getPart1();
    const idx = _state.lc_p1_idx;
    const item = data[idx];
    if (!item) { _advanceToLC_Part2(); return; }

    const body = document.getElementById('sim-body');
    body.innerHTML = `
      <div class="sim-phase-header">
        <span class="sim-phase-badge lc-badge">🎧 Listening Section</span>
        <span class="sim-part-label">Part 1: Photograph Description</span>
        <span class="sim-q-counter">Soal ${idx + 1} dari ${data.length}</span>
      </div>
      <div class="sim-question-card">
        <div class="sim-photo-desc">
          <div class="sim-photo-icon">🖼</div>
          <div class="sim-photo-desc-text">${item.imageDesc}</div>
        </div>
        <p class="sim-instruction">Dengarkan 4 pernyataan berikut. Pilih pernyataan yang paling tepat mendeskripsikan foto.</p>
        <div class="sim-audio-row">
          <button class="btn-audio" id="btn-play-audio" onclick="TOEICSimulation.playP1Audio('${item.id}')">▶ Putar Audio</button>
          <span class="sim-audio-label">Pertanyaan ${idx + 1}</span>
        </div>
        <div class="sim-choices" id="sim-choices">
          ${item.choices.map((c, i) => `
            <button class="sim-choice-btn" onclick="TOEICSimulation.answerP1(${i})" data-idx="${i}">
              <span class="choice-letter">${String.fromCharCode(65+i)}</span> ${c}
            </button>
          `).join('')}
        </div>
      </div>
      ${idx > 0 ? '' : ''}
      <div class="sim-nav-row">
        ${idx > 0 ? `<button class="btn-sim btn-sim-ghost" onclick="TOEICSimulation.prevP1()">← Sebelumnya</button>` : '<span></span>'}
        <button class="btn-sim btn-sim-secondary" onclick="TOEICSimulation.skipToLC_P2()">Lewati ke Part 2 ›</button>
      </div>`;

    // Highlight saved answer
    const saved = _state.answers[item.id];
    if (saved !== undefined) {
      document.querySelectorAll('.sim-choice-btn').forEach(btn => {
        if (parseInt(btn.dataset.idx) === saved) btn.classList.add('selected');
      });
    }
  }

  function playP1Audio(itemId) {
    if (_state.ttsPlaying) { _stopSpeak(); return; }
    const data = TOEICSimData.getPart1();
    const item = data.find(d => d.id === itemId);
    if (!item) return;
    const text = item.choices.map((c,i) => `${String.fromCharCode(65+i)}. ${c}`).join('. ');
    _speak(text);
  }

  function answerP1(choiceIdx) {
    const data = TOEICSimData.getPart1();
    const item = data[_state.lc_p1_idx];
    _state.answers[item.id] = choiceIdx;
    document.querySelectorAll('.sim-choice-btn').forEach(btn => {
      btn.classList.remove('selected');
      if (parseInt(btn.dataset.idx) === choiceIdx) btn.classList.add('selected');
    });
    // Auto advance after short delay
    setTimeout(() => {
      _state.lc_p1_idx++;
      if (_state.lc_p1_idx >= data.length) _advanceToLC_Part2();
      else _renderLC_Part1();
    }, 400);
  }

  function prevP1() {
    if (_state.lc_p1_idx > 0) { _state.lc_p1_idx--; _renderLC_Part1(); }
  }

  function _advanceToLC_Part2() {
    _state.phase = 'lc_part2';
    _state.lc_p2_idx = 0;
    _renderLC_Part2();
  }

  function skipToLC_P2() { _advanceToLC_Part2(); }

  // Part 2
  function _renderLC_Part2() {
    _state.phase = 'lc_part2';
    const data = TOEICSimData.getPart2();
    const idx = _state.lc_p2_idx;
    const item = data[idx];
    if (!item) { _advanceToLC_Part3(); return; }

    const body = document.getElementById('sim-body');
    body.innerHTML = `
      <div class="sim-phase-header">
        <span class="sim-phase-badge lc-badge">🎧 Listening Section</span>
        <span class="sim-part-label">Part 2: Question-Response</span>
        <span class="sim-q-counter">Soal ${idx + 1} dari ${data.length}</span>
      </div>
      <div class="sim-question-card">
        <p class="sim-instruction">Dengarkan pertanyaan dan pilih respons yang paling tepat.</p>
        <div class="sim-audio-row">
          <button class="btn-audio" id="btn-play-audio" onclick="TOEICSimulation.playP2Audio('${item.id}')">▶ Putar Audio</button>
        </div>
        <div class="sim-transcript-box" id="transcript-box" style="display:none;">
          <strong>Pertanyaan:</strong> ${item.question}
        </div>
        <div class="sim-choices" id="sim-choices">
          ${item.choices.map((c, i) => `
            <button class="sim-choice-btn" onclick="TOEICSimulation.answerP2(${i})" data-idx="${i}">
              <span class="choice-letter">${String.fromCharCode(65+i)}</span> ${c}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="sim-nav-row">
        ${idx > 0 ? `<button class="btn-sim btn-sim-ghost" onclick="TOEICSimulation.prevP2()">← Sebelumnya</button>` : '<span></span>'}
        <button class="btn-sim btn-sim-secondary" onclick="TOEICSimulation.skipToLC_P3()">Lewati ke Part 3 ›</button>
      </div>`;

    const saved = _state.answers[item.id];
    if (saved !== undefined) {
      document.querySelectorAll('.sim-choice-btn').forEach(btn => {
        if (parseInt(btn.dataset.idx) === saved) btn.classList.add('selected');
      });
    }
  }

  function playP2Audio(itemId) {
    if (_state.ttsPlaying) { _stopSpeak(); return; }
    const data = TOEICSimData.getPart2();
    const item = data.find(d => d.id === itemId);
    if (!item) return;
    const transcript = document.getElementById('transcript-box');
    if (transcript) transcript.style.display = 'block';
    const text = item.question + ' . ' + item.choices.map((c,i) => `${String.fromCharCode(65+i)}. ${c}`).join('. ');
    _speak(text);
  }

  function answerP2(choiceIdx) {
    const data = TOEICSimData.getPart2();
    const item = data[_state.lc_p2_idx];
    _state.answers[item.id] = choiceIdx;
    document.querySelectorAll('.sim-choice-btn').forEach(btn => {
      btn.classList.remove('selected');
      if (parseInt(btn.dataset.idx) === choiceIdx) btn.classList.add('selected');
    });
    setTimeout(() => {
      _state.lc_p2_idx++;
      if (_state.lc_p2_idx >= data.length) _advanceToLC_Part3();
      else _renderLC_Part2();
    }, 400);
  }

  function prevP2() {
    if (_state.lc_p2_idx > 0) { _state.lc_p2_idx--; _renderLC_Part2(); }
  }

  function _advanceToLC_Part3() {
    _state.phase = 'lc_part3';
    _state.lc_p3_set = 0;
    _state.lc_p3_q = 0;
    _renderLC_Part3();
  }

  function skipToLC_P3() { _advanceToLC_Part3(); }

  // Part 3
  function _renderLC_Part3() {
    _state.phase = 'lc_part3';
    const sets = TOEICSimData.getPart3();
    const setIdx = _state.lc_p3_set;
    const qIdx = _state.lc_p3_q;
    const set = sets[setIdx];
    if (!set) { _advanceToLC_Part4(); return; }
    const q = set.questions[qIdx];
    const totalSets = sets.length;
    const totalQ = sets.reduce((a, s) => a + s.questions.length, 0);
    const doneQ = sets.slice(0, setIdx).reduce((a, s) => a + s.questions.length, 0) + qIdx;
    const qId = `${set.id}_q${qIdx}`;

    const body = document.getElementById('sim-body');
    body.innerHTML = `
      <div class="sim-phase-header">
        <span class="sim-phase-badge lc-badge">🎧 Listening Section</span>
        <span class="sim-part-label">Part 3: Short Conversations</span>
        <span class="sim-q-counter">Percakapan ${setIdx+1}/${totalSets} · Pertanyaan ${qIdx+1}/3</span>
      </div>
      <div class="sim-question-card">
        <div class="sim-audio-row">
          <button class="btn-audio" id="btn-play-audio" onclick="TOEICSimulation.playP3Audio('${set.id}')">▶ Putar Audio</button>
          <span class="sim-audio-label">${set.title}</span>
        </div>
        <div class="sim-transcript-box" id="transcript-box" style="display:none;">${set.ttsScript}</div>
        <div class="sim-q-text"><strong>Q${doneQ+1}.</strong> ${q.text}</div>
        <div class="sim-choices" id="sim-choices">
          ${q.choices.map((c, i) => `
            <button class="sim-choice-btn" onclick="TOEICSimulation.answerP3(${i})" data-idx="${i}">
              <span class="choice-letter">${String.fromCharCode(65+i)}</span> ${c}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="sim-nav-row">
        <span></span>
        <button class="btn-sim btn-sim-secondary" onclick="TOEICSimulation.skipToLC_P4()">Lewati ke Part 4 ›</button>
      </div>`;

    const saved = _state.answers[qId];
    if (saved !== undefined) {
      document.querySelectorAll('.sim-choice-btn').forEach(btn => {
        if (parseInt(btn.dataset.idx) === saved) btn.classList.add('selected');
      });
    }
  }

  function playP3Audio(setId) {
    if (_state.ttsPlaying) { _stopSpeak(); return; }
    const sets = TOEICSimData.getPart3();
    const set = sets.find(s => s.id === setId);
    if (!set) return;
    const t = document.getElementById('transcript-box');
    if (t) t.style.display = 'block';
    _speak(set.ttsScript);
  }

  function answerP3(choiceIdx) {
    const sets = TOEICSimData.getPart3();
    const set = sets[_state.lc_p3_set];
    const qId = `${set.id}_q${_state.lc_p3_q}`;
    _state.answers[qId] = choiceIdx;
    document.querySelectorAll('.sim-choice-btn').forEach(btn => {
      btn.classList.remove('selected');
      if (parseInt(btn.dataset.idx) === choiceIdx) btn.classList.add('selected');
    });
    setTimeout(() => {
      _state.lc_p3_q++;
      if (_state.lc_p3_q >= set.questions.length) {
        _state.lc_p3_set++;
        _state.lc_p3_q = 0;
        if (_state.lc_p3_set >= sets.length) _advanceToLC_Part4();
        else _renderLC_Part3();
      } else {
        _renderLC_Part3();
      }
    }, 400);
  }

  function _advanceToLC_Part4() {
    _state.phase = 'lc_part4';
    _state.lc_p4_set = 0;
    _state.lc_p4_q = 0;
    _renderLC_Part4();
  }

  function skipToLC_P4() { _advanceToLC_Part4(); }

  // Part 4
  function _renderLC_Part4() {
    _state.phase = 'lc_part4';
    const sets = TOEICSimData.getPart4();
    const setIdx = _state.lc_p4_set;
    const qIdx = _state.lc_p4_q;
    const set = sets[setIdx];
    if (!set) { _startBreak(); return; }
    const q = set.questions[qIdx];
    const totalSets = sets.length;
    const doneQ = sets.slice(0, setIdx).reduce((a, s) => a + s.questions.length, 0) + qIdx;
    const qId = `${set.id}_q${qIdx}`;

    const body = document.getElementById('sim-body');
    body.innerHTML = `
      <div class="sim-phase-header">
        <span class="sim-phase-badge lc-badge">🎧 Listening Section</span>
        <span class="sim-part-label">Part 4: Short Talks</span>
        <span class="sim-q-counter">Monolog ${setIdx+1}/${totalSets} · Pertanyaan ${qIdx+1}/3</span>
      </div>
      <div class="sim-question-card">
        <div class="sim-audio-row">
          <button class="btn-audio" id="btn-play-audio" onclick="TOEICSimulation.playP4Audio('${set.id}')">▶ Putar Audio</button>
          <span class="sim-audio-label">${set.title}</span>
        </div>
        <div class="sim-transcript-box" id="transcript-box" style="display:none;">${set.ttsScript}</div>
        <div class="sim-q-text"><strong>Q${doneQ+1}.</strong> ${q.text}</div>
        <div class="sim-choices" id="sim-choices">
          ${q.choices.map((c, i) => `
            <button class="sim-choice-btn" onclick="TOEICSimulation.answerP4(${i})" data-idx="${i}">
              <span class="choice-letter">${String.fromCharCode(65+i)}</span> ${c}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="sim-nav-row">
        <span></span>
        <button class="btn-sim btn-sim-primary" onclick="TOEICSimulation.finishLC()">Selesai Listening →</button>
      </div>`;

    const saved = _state.answers[qId];
    if (saved !== undefined) {
      document.querySelectorAll('.sim-choice-btn').forEach(btn => {
        if (parseInt(btn.dataset.idx) === saved) btn.classList.add('selected');
      });
    }
  }

  function playP4Audio(setId) {
    if (_state.ttsPlaying) { _stopSpeak(); return; }
    const sets = TOEICSimData.getPart4();
    const set = sets.find(s => s.id === setId);
    if (!set) return;
    const t = document.getElementById('transcript-box');
    if (t) t.style.display = 'block';
    _speak(set.ttsScript);
  }

  function answerP4(choiceIdx) {
    const sets = TOEICSimData.getPart4();
    const set = sets[_state.lc_p4_set];
    const qId = `${set.id}_q${_state.lc_p4_q}`;
    _state.answers[qId] = choiceIdx;
    document.querySelectorAll('.sim-choice-btn').forEach(btn => {
      btn.classList.remove('selected');
      if (parseInt(btn.dataset.idx) === choiceIdx) btn.classList.add('selected');
    });
    setTimeout(() => {
      _state.lc_p4_q++;
      if (_state.lc_p4_q >= set.questions.length) {
        _state.lc_p4_set++;
        _state.lc_p4_q = 0;
        if (_state.lc_p4_set >= sets.length) _startBreak();
        else _renderLC_Part4();
      } else {
        _renderLC_Part4();
      }
    }, 400);
  }

  function finishLC() { _startBreak(); }

  // ── BREAK ─────────────────────────────────────────────────────
  function _startBreak() {
    _clearTimer();
    _state.phase = 'break';
    _startTimer(BREAK_TIME);
    _updateProgress();
    const body = document.getElementById('sim-body');
    body.innerHTML = `
      <div class="sim-break-screen">
        <div class="sim-break-icon">☕</div>
        <h2>Listening Section Selesai!</h2>
        <p>Istirahat sebentar. Reading Section akan dimulai dalam <strong id="break-countdown"></strong>.</p>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-top:0.5rem;">Gunakan waktu ini untuk mengatur ulang konsentrasi.</p>
        <button class="btn-sim btn-sim-primary" style="margin-top:1.5rem;" onclick="TOEICSimulation.startRC()">Mulai Reading Sekarang →</button>
      </div>`;

    // Override timer to show in break countdown
    clearInterval(_state.timerInterval);
    _state.timerInterval = setInterval(() => {
      _state.secondsLeft--;
      const el = document.getElementById('break-countdown');
      if (el) {
        const m = Math.floor(_state.secondsLeft / 60);
        const s = _state.secondsLeft % 60;
        el.textContent = `${m}:${String(s).padStart(2,'0')}`;
      }
      const timer = document.getElementById('sim-timer');
      if (timer) timer.textContent = '--:--';
      if (_state.secondsLeft <= 0) {
        _clearTimer();
        _startRC();
      }
    }, 1000);
  }

  // ── READING SECTION ───────────────────────────────────────────

  function startRC() {
    _clearTimer();
    _state.phase = 'rc_part5';
    _state.rc_p5_idx = 0;
    _state.rc_p6_text = 0;
    _state.rc_p6_blank = 0;
    _state.rc_p7_idx = 0;
    _state.rc_p7_q = 0;
    _startTimer(RC_TIME);
    _updateProgress();
    _renderRC_Part5();
  }

  function _renderRC_Part5() {
    _state.phase = 'rc_part5';
    const data = TOEICSimData.getPart5();
    const idx = _state.rc_p5_idx;
    const item = data[idx];
    if (!item) { _advanceToRC_Part6(); return; }

    const body = document.getElementById('sim-body');
    // Highlight blank with bold underline
    const sentence = item.sentence.replace('_____', '<span class="sim-blank-highlight">_____</span>');
    body.innerHTML = `
      <div class="sim-phase-header">
        <span class="sim-phase-badge rc-badge">📖 Reading Section</span>
        <span class="sim-part-label">Part 5: Incomplete Sentences</span>
        <span class="sim-q-counter">Soal ${idx+1} dari ${data.length}</span>
      </div>
      <div class="sim-question-card">
        <div class="sim-sentence-box">${sentence}</div>
        <div class="sim-choices" id="sim-choices">
          ${item.choices.map((c, i) => `
            <button class="sim-choice-btn" onclick="TOEICSimulation.answerP5(${i})" data-idx="${i}">
              <span class="choice-letter">${String.fromCharCode(65+i)}</span> ${c}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="sim-nav-row">
        ${idx > 0 ? `<button class="btn-sim btn-sim-ghost" onclick="TOEICSimulation.prevP5()">← Sebelumnya</button>` : '<span></span>'}
        <button class="btn-sim btn-sim-secondary" onclick="TOEICSimulation.skipToRC_P6()">Lewati ke Part 6 ›</button>
      </div>`;

    const saved = _state.answers[item.id];
    if (saved !== undefined) {
      document.querySelectorAll('.sim-choice-btn').forEach(btn => {
        if (parseInt(btn.dataset.idx) === saved) btn.classList.add('selected');
      });
    }
  }

  function answerP5(choiceIdx) {
    const data = TOEICSimData.getPart5();
    const item = data[_state.rc_p5_idx];
    _state.answers[item.id] = choiceIdx;
    document.querySelectorAll('.sim-choice-btn').forEach(btn => {
      btn.classList.remove('selected');
      if (parseInt(btn.dataset.idx) === choiceIdx) btn.classList.add('selected');
    });
    setTimeout(() => {
      _state.rc_p5_idx++;
      if (_state.rc_p5_idx >= data.length) _advanceToRC_Part6();
      else _renderRC_Part5();
    }, 400);
  }

  function prevP5() {
    if (_state.rc_p5_idx > 0) { _state.rc_p5_idx--; _renderRC_Part5(); }
  }

  function _advanceToRC_Part6() {
    _state.phase = 'rc_part6';
    _state.rc_p6_text = 0;
    _renderRC_Part6();
  }

  function skipToRC_P6() { _advanceToRC_Part6(); }

  function _renderRC_Part6() {
    _state.phase = 'rc_part6';
    const texts = TOEICSimData.getPart6();
    const tIdx = _state.rc_p6_text;
    const text = texts[tIdx];
    if (!text) { _advanceToRC_Part7(); return; }

    // Build text with selects for each blank
    let bodyText = text.text;
    text.blanks.forEach((blank, bIdx) => {
      const key = `${tIdx}_${bIdx}`;
      const saved = _state.p6Answers[key] !== undefined ? _state.p6Answers[key] : '';
      const opts = blank.choices.map((c, i) =>
        `<option value="${i}" ${saved === i ? 'selected' : ''}>${c}</option>`
      ).join('');
      bodyText = bodyText.replace(`{${blank.id}}`,
        `<select class="sim-inline-select" data-key="${key}" onchange="TOEICSimulation.answerP6('${key}', this.value)">
          <option value="">—</option>${opts}
        </select>`
      );
    });

    const body = document.getElementById('sim-body');
    body.innerHTML = `
      <div class="sim-phase-header">
        <span class="sim-phase-badge rc-badge">📖 Reading Section</span>
        <span class="sim-part-label">Part 6: Text Completion</span>
        <span class="sim-q-counter">Teks ${tIdx+1} dari ${texts.length}</span>
      </div>
      <div class="sim-question-card">
        <h4 style="font-size:0.95rem;font-weight:700;color:var(--text-secondary);margin-bottom:1rem;">${text.title}</h4>
        <div class="sim-passage-box sim-p6-text">${bodyText}</div>
      </div>
      <div class="sim-nav-row">
        ${tIdx > 0 ? `<button class="btn-sim btn-sim-ghost" onclick="TOEICSimulation.prevP6()">← Teks Sebelumnya</button>` : '<span></span>'}
        <div style="display:flex;gap:0.75rem;">
          ${tIdx < texts.length - 1 ? `<button class="btn-sim btn-sim-secondary" onclick="TOEICSimulation.nextP6()">Teks Berikutnya ›</button>` : ''}
          <button class="btn-sim btn-sim-secondary" onclick="TOEICSimulation.skipToRC_P7()">Lewati ke Part 7 ›</button>
        </div>
      </div>`;
  }

  function answerP6(key, val) {
    if (val === '') return;
    _state.p6Answers[key] = parseInt(val);
  }

  function prevP6() {
    if (_state.rc_p6_text > 0) { _state.rc_p6_text--; _renderRC_Part6(); }
  }

  function nextP6() {
    const texts = TOEICSimData.getPart6();
    _state.rc_p6_text++;
    if (_state.rc_p6_text >= texts.length) _advanceToRC_Part7();
    else _renderRC_Part6();
  }

  function _advanceToRC_Part7() {
    _state.phase = 'rc_part7';
    _state.rc_p7_idx = 0;
    _state.rc_p7_q = 0;
    _renderRC_Part7();
  }

  function skipToRC_P7() { _advanceToRC_Part7(); }

  function _renderRC_Part7() {
    _state.phase = 'rc_part7';
    const passages = TOEICSimData.getPart7();
    const pIdx = _state.rc_p7_idx;
    const qIdx = _state.rc_p7_q;
    const passage = passages[pIdx];
    if (!passage) { _submitSim(); return; }
    const q = passage.questions[qIdx];
    const totalPassages = passages.length;
    const qId = `${passage.id}_q${qIdx}`;

    let passageHTML;
    if (passage.type === 'single') {
      passageHTML = `<div class="sim-passage-box"><pre style="white-space:pre-wrap;font-family:inherit;">${passage.passage}</pre></div>`;
    } else {
      passageHTML = `
        <div class="sim-passage-box">
          <div class="sim-double-label">Teks 1</div>
          <pre style="white-space:pre-wrap;font-family:inherit;">${passage.passage1}</pre>
        </div>
        <div class="sim-passage-box" style="margin-top:1rem;">
          <div class="sim-double-label">Teks 2</div>
          <pre style="white-space:pre-wrap;font-family:inherit;">${passage.passage2}</pre>
        </div>`;
    }

    const body = document.getElementById('sim-body');
    body.innerHTML = `
      <div class="sim-phase-header">
        <span class="sim-phase-badge rc-badge">📖 Reading Section</span>
        <span class="sim-part-label">Part 7: Reading Comprehension · ${passage.type === 'single' ? 'Single' : 'Double'} Passage</span>
        <span class="sim-q-counter">Passage ${pIdx+1}/${totalPassages} · Q${qIdx+1}/${passage.questions.length}</span>
      </div>
      <div class="sim-p7-layout">
        <div class="sim-p7-passage">${passageHTML}</div>
        <div class="sim-p7-questions">
          <div class="sim-q-text"><strong>${q.text}</strong></div>
          <div class="sim-choices" id="sim-choices">
            ${q.choices.map((c, i) => `
              <button class="sim-choice-btn" onclick="TOEICSimulation.answerP7(${i})" data-idx="${i}">
                <span class="choice-letter">${String.fromCharCode(65+i)}</span> ${c}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="sim-nav-row">
        <span></span>
        <button class="btn-sim btn-sim-primary" onclick="TOEICSimulation.submitSim()">Selesai & Lihat Hasil →</button>
      </div>`;

    const saved = _state.answers[qId];
    if (saved !== undefined) {
      document.querySelectorAll('.sim-choice-btn').forEach(btn => {
        if (parseInt(btn.dataset.idx) === saved) btn.classList.add('selected');
      });
    }
  }

  function answerP7(choiceIdx) {
    const passages = TOEICSimData.getPart7();
    const passage = passages[_state.rc_p7_idx];
    const qId = `${passage.id}_q${_state.rc_p7_q}`;
    _state.answers[qId] = choiceIdx;
    document.querySelectorAll('.sim-choice-btn').forEach(btn => {
      btn.classList.remove('selected');
      if (parseInt(btn.dataset.idx) === choiceIdx) btn.classList.add('selected');
    });
    setTimeout(() => {
      _state.rc_p7_q++;
      if (_state.rc_p7_q >= passage.questions.length) {
        _state.rc_p7_idx++;
        _state.rc_p7_q = 0;
        if (_state.rc_p7_idx >= passages.length) _submitSim();
        else _renderRC_Part7();
      } else {
        _renderRC_Part7();
      }
    }, 400);
  }

  function submitSim() { _submitSim(); }

  // ── SUBMIT & SCORE ─────────────────────────────────────────────
  function _submitSim() {
    _clearTimer();
    _stopSpeak();
    _state.phase = 'submitting';

    const ans = _state.answers;
    const p6ans = _state.p6Answers;

    // Part 1 scoring
    const p1data = TOEICSimData.getPart1();
    let p1c = 0;
    p1data.forEach(item => { if (ans[item.id] === item.answer) p1c++; });

    // Part 2 scoring
    const p2data = TOEICSimData.getPart2();
    let p2c = 0;
    p2data.forEach(item => { if (ans[item.id] === item.answer) p2c++; });

    // Part 3 scoring
    const p3data = TOEICSimData.getPart3();
    let p3c = 0;
    p3data.forEach(set => {
      set.questions.forEach((q, qi) => {
        const qId = `${set.id}_q${qi}`;
        if (ans[qId] === q.answer) p3c++;
      });
    });

    // Part 4 scoring
    const p4data = TOEICSimData.getPart4();
    let p4c = 0;
    p4data.forEach(set => {
      set.questions.forEach((q, qi) => {
        const qId = `${set.id}_q${qi}`;
        if (ans[qId] === q.answer) p4c++;
      });
    });

    // Total LC
    const lcCorrect = p1c + p2c + p3c + p4c;
    const p1total = p1data.length;
    const p2total = p2data.length;
    const p3total = p3data.reduce((a, s) => a + s.questions.length, 0);
    const p4total = p4data.reduce((a, s) => a + s.questions.length, 0);
    const lcTotal = p1total + p2total + p3total + p4total;

    // Part 5 scoring
    const p5data = TOEICSimData.getPart5();
    let p5c = 0;
    p5data.forEach(item => { if (ans[item.id] === item.answer) p5c++; });

    // Part 6 scoring
    const p6texts = TOEICSimData.getPart6();
    let p6c = 0;
    let p6total = 0;
    p6texts.forEach((text, tIdx) => {
      text.blanks.forEach((blank, bIdx) => {
        p6total++;
        const key = `${tIdx}_${bIdx}`;
        if (p6ans[key] === blank.answer) p6c++;
      });
    });

    // Part 7 scoring
    const p7data = TOEICSimData.getPart7();
    let p7c = 0;
    let p7total = 0;
    p7data.forEach(passage => {
      passage.questions.forEach((q, qi) => {
        p7total++;
        const qId = `${passage.id}_q${qi}`;
        if (ans[qId] === q.answer) p7c++;
      });
    });

    // Total RC
    const rcCorrect = p5c + p6c + p7c;
    const rcTotal = p5data.length + p6total + p7total;

    // Convert to TOEIC scale
    const lcScore = TOEICSimData.convertScore(lcCorrect, lcTotal, 'lc');
    const rcScore = TOEICSimData.convertScore(rcCorrect, rcTotal, 'rc');
    const total = lcScore + rcScore;

    // Save result
    const uid = _uid();
    const result = {
      type: 'toeic',
      date: new Date().toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' }),
      timestamp: Date.now(),
      lc: lcScore,
      rc: rcScore,
      total,
      raw: {
        p1c, p1total, p2c, p2total, p3c, p3total, p4c, p4total,
        lcCorrect, lcTotal,
        p5c, p5total: p5data.length, p6c, p6total, p7c, p7total,
        rcCorrect, rcTotal
      }
    };

    if (uid) {
      let simResults = Storage.getUser(uid, 'sim_results') || [];
      // Keep only 5 TOEIC results + others
      const others = simResults.filter(r => r.type !== 'toeic');
      const toeicResults = simResults.filter(r => r.type === 'toeic').slice(0, 4);
      simResults = [result, ...toeicResults, ...others];
      Storage.setUser(uid, 'sim_results', simResults);

      // XP
      XPSystem.addXP(uid, 100, 'TOEIC Simulasi Full Test');
      ChallengeSystem.onModuleVisit('toeic_simulation');

      // Badge
      if (total >= 700) {
        const badges = Storage.getUser(uid, 'badges') || [];
        if (!badges.includes('toeic_ready')) {
          badges.push('toeic_ready');
          Storage.setUser(uid, 'badges', badges);
          App.showToast('🏅 Badge TOEIC Ready diraih! Skor ≥ 700!', 'success');
        }
      }
    }

    // Redirect to result page
    const body = document.getElementById('sim-body');
    body.innerHTML = `
      <div class="sim-submitting">
        <div class="sim-submitting-icon">⏳</div>
        <h2>Menghitung Skor...</h2>
        <p>Hasilmu sedang disiapkan. Sebentar lagi...</p>
      </div>`;
    setTimeout(() => {
      window.location.href = 'result.html';
    }, 2000);
  }

  // ── INIT ──────────────────────────────────────────────────────
  function init() {
    Router.guard();
    App.init('toeic-simulation');
    _renderIntro();
  }

  return {
    init,
    startLC,
    startRC,
    submitSim,
    // Part 1
    playP1Audio,
    answerP1,
    prevP1,
    skipToLC_P2,
    // Part 2
    playP2Audio,
    answerP2,
    prevP2,
    skipToLC_P3,
    // Part 3
    playP3Audio,
    answerP3,
    skipToLC_P4,
    // Part 4
    playP4Audio,
    answerP4,
    finishLC,
    // Reading
    answerP5,
    prevP5,
    skipToRC_P6,
    answerP6,
    prevP6,
    nextP6,
    skipToRC_P7,
    answerP7
  };

})();
