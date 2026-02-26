/**
 * EnglishPath — Cambridge Listening Module
 * Fase 16b: Practice Listening (Parts 1–4)
 * localStorage: ep_user_{id}_cambridge_listening
 */
const CambridgeListening = (() => {

  // ── State ─────────────────────────────────────────────────────────────────
  let _state = {
    view: 'menu',
    part: null,
    trackIdx: 0,
    scriptIdx: 0,
    isPlaying: false,
    hasListened: false,
    questionIdx: 0,
    answers: {},
    submitted: false,
    timerInterval: null,
    timerSeconds: 0,
    currentData: null,
    ttsTimeout: null
  };

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, 'cambridge_listening') || {};
  }

  function _saveResult(key, correct, total) {
    const uid = _uid();
    if (!uid) return;
    const data = _loadData();
    if (!data.results) data.results = {};
    const prev = data.results[key] || { best: 0, attempts: 0 };
    const pct = Math.round((correct / total) * 100);
    data.results[key] = {
      best: Math.max(prev.best, pct),
      attempts: prev.attempts + 1,
      lastScore: pct,
      lastCorrect: correct,
      lastTotal: total,
      lastDate: new Date().toISOString().split('T')[0]
    };
    if (!data.totalAttempts) data.totalAttempts = 0;
    data.totalAttempts++;
    Storage.setUser(uid, 'cambridge_listening', data);
  }

  // ── TTS ───────────────────────────────────────────────────────────────────
  function _speak(text, rate, onEnd) {
    if (!window.speechSynthesis) { if (onEnd) onEnd(); return; }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-GB';
    utt.rate = rate || 0.88;
    utt.pitch = 1.0;
    utt.onend = onEnd || null;
    window.speechSynthesis.speak(utt);
  }

  function _stopSpeech() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (_state.ttsTimeout) clearTimeout(_state.ttsTimeout);
    _state.isPlaying = false;
    _state.scriptIdx = 0;
  }

  function _playScript(lines, onComplete) {
    _state.isPlaying = true;
    _state.scriptIdx = 0;

    function _next() {
      if (_state.scriptIdx >= lines.length) {
        _state.isPlaying = false;
        _state.hasListened = true;
        _updatePlayBtn(false);
        if (onComplete) onComplete();
        return;
      }
      const line = lines[_state.scriptIdx];
      const text = typeof line === 'string' ? line : (line.speaker ? `${line.speaker}. ${line.text}` : line.text);

      // Highlight current line
      const allLines = document.querySelectorAll('.clt-script-line');
      allLines.forEach((el, i) => el.classList.toggle('clt-script-active', i === _state.scriptIdx));

      _speak(text, 0.85, () => {
        _state.scriptIdx++;
        _state.ttsTimeout = setTimeout(_next, 400);
      });
    }
    _next();
  }

  function _updatePlayBtn(playing) {
    const btn = document.getElementById('clt-play-btn');
    if (btn) btn.textContent = playing ? '⏹ Stop' : '▶ Dengarkan';
  }

  // ── Timer ─────────────────────────────────────────────────────────────────
  function _startTimer() {
    _state.timerSeconds = 0;
    if (_state.timerInterval) clearInterval(_state.timerInterval);
    _state.timerInterval = setInterval(() => {
      _state.timerSeconds++;
      const el = document.getElementById('clt-timer');
      if (el) el.textContent = _fmtTime(_state.timerSeconds);
    }, 1000);
  }

  function _stopTimer() {
    if (_state.timerInterval) clearInterval(_state.timerInterval);
    _state.timerInterval = null;
  }

  function _fmtTime(s) {
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }

  // ── Render helpers ────────────────────────────────────────────────────────
  function _set(html) {
    const el = document.getElementById('clt-content');
    if (el) el.innerHTML = html;
  }

  function _scrollTop() {
    const mc = document.getElementById('main-content');
    if (mc) mc.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  // ── MENU VIEW ─────────────────────────────────────────────────────────────
  function _renderMenu() {
    _state.view = 'menu';
    _stopTimer();
    _stopSpeech();
    const parts = CambridgeListeningData.getAllParts();
    const data = _loadData();
    const results = data.results || {};

    const cards = parts.map(p => {
      const keys = Object.keys(results).filter(k => k.startsWith(`l${p.num}_`));
      const done = keys.length;
      const bestArr = keys.map(k => results[k].best);
      const avgBest = done ? Math.round(bestArr.reduce((a, b) => a + b, 0) / done) : 0;
      const progressHtml = done
        ? `<span class="clt-best">${done} set selesai · Terbaik: ${avgBest}%</span>`
        : `<span class="clt-best clt-best-none">Belum dicoba</span>`;

      return `
      <div class="clt-card" data-part="${p.num}">
        <div class="clt-card-icon">${p.icon}</div>
        <div class="clt-card-body">
          <div class="clt-card-title">${p.label}</div>
          <div class="clt-card-desc">${p.desc}</div>
          ${progressHtml}
        </div>
        <button class="btn btn-primary btn-sm" onclick="CambridgeListening.selectPart(${p.num})">Mulai</button>
      </div>`;
    }).join('');

    _set(`
      <div class="clt-header">
        <a href="index.html" class="btn btn-ghost btn-sm">← Cambridge Hub</a>
        <h1 class="clt-title">🎧 Listening Practice</h1>
        <p class="clt-subtitle">4 Parts — Short Extracts · Sentence Completion · Interview · Multiple Matching</p>
      </div>
      <div class="clt-overview-badges">
        <div class="clt-badge-item"><span class="clt-badge-icon">🔊</span><span>TTS en-GB</span><small>British English</small></div>
        <div class="clt-badge-item"><span class="clt-badge-icon">📝</span><span>4 Tipe Soal</span><small>Cambridge Format</small></div>
        <div class="clt-badge-item"><span class="clt-badge-icon">⏱️</span><span>40 menit</span><small>Waktu ujian asli</small></div>
      </div>
      <div class="clt-cards">${cards}</div>
    `);
  }

  // ── PART MENU ─────────────────────────────────────────────────────────────
  function _renderPartMenu(part) {
    _state.part = part;
    const data = _loadData();
    const results = data.results || {};
    const partMeta = CambridgeListeningData.getAllParts().find(p => p.num === part);

    let tracks = [];
    if (part === 1) tracks = CambridgeListeningData.getPart1Extracts();
    else if (part === 2) tracks = CambridgeListeningData.getPart2Tracks();
    else if (part === 3) tracks = CambridgeListeningData.getPart3Tracks();
    else if (part === 4) tracks = CambridgeListeningData.getPart4Tracks();

    const trackCards = tracks.map((t, i) => {
      const r = results[t.id];
      const progressHtml = r
        ? `<span class="clt-best">Terbaik: ${r.best}% · ${r.attempts}× latihan</span>`
        : `<span class="clt-best clt-best-none">Belum dicoba</span>`;
      return `
        <div class="clt-set-card">
          <div class="clt-set-icon">${partMeta.icon}</div>
          <div class="clt-set-body">
            <div class="clt-set-title">${t.title || t.label}</div>
            ${t.speaker ? `<div class="clt-set-speaker">🎙️ ${t.speaker}</div>` : ''}
            ${progressHtml}
          </div>
          <button class="btn btn-primary btn-sm" onclick="CambridgeListening.startExercise(${part}, ${i})">Mulai</button>
        </div>`;
    }).join('');

    _set(`
      <div class="clt-header">
        <button class="btn btn-ghost btn-sm" onclick="CambridgeListening.showMenu()">← Kembali</button>
        <h2 class="clt-title">${partMeta.icon} ${partMeta.label}</h2>
        <p class="clt-subtitle">${partMeta.desc}</p>
      </div>
      <div class="clt-set-cards">${trackCards}</div>
    `);
  }

  // ── PART 1: Short Extracts ─────────────────────────────────────────────────
  function _renderPart1(extractIdx) {
    const extracts = CambridgeListeningData.getPart1Extracts();
    const extract = extracts[extractIdx];
    _state.currentData = extract;
    _state.trackIdx = extractIdx;
    _state.answers = {};
    _state.hasListened = false;
    _startTimer();
    _scrollTop();

    const scriptLines = extract.script.map((line, i) =>
      `<div class="clt-script-line" id="clt-sl${i}">
        <span class="clt-script-speaker">${line.speaker}:</span>
        <span class="clt-script-text">${line.text}</span>
      </div>`).join('');

    const choices = extract.choices.map((c, ci) => `
      <label class="clt-choice">
        <input type="radio" name="p1q" value="${ci}"
          onchange="CambridgeListening.setAnswer('main', ${ci})">
        <span class="clt-choice-letter">${String.fromCharCode(65 + ci)}</span>
        <span>${c}</span>
      </label>`).join('');

    _set(`
      <div class="clt-ex-header">
        <button class="btn btn-ghost btn-sm" onclick="CambridgeListening.selectPart(1)">← Kembali</button>
        <div class="clt-ex-title">${extract.label}</div>
        <div class="clt-timer-wrap">⏱️ <span id="clt-timer">00:00</span></div>
      </div>
      <div class="clt-audio-panel">
        <div class="clt-script-box">${scriptLines}</div>
        <button class="btn btn-cambridge clt-play-btn" id="clt-play-btn"
          onclick="CambridgeListening.togglePlay()">▶ Dengarkan</button>
        <div class="clt-listen-note">💡 Dengarkan percakapan lalu jawab pertanyaan di bawah.</div>
      </div>
      <div class="clt-q-section">
        <div class="clt-q-text">${extract.question}</div>
        <div class="clt-choices">${choices}</div>
        <button class="btn btn-primary" onclick="CambridgeListening.submitPart1()">Periksa</button>
      </div>
    `);
  }

  // ── PART 2: Sentence Completion ────────────────────────────────────────────
  function _renderPart2(trackIdx) {
    const tracks = CambridgeListeningData.getPart2Tracks();
    const track = tracks[trackIdx];
    _state.currentData = track;
    _state.trackIdx = trackIdx;
    _state.answers = {};
    _state.hasListened = false;
    _startTimer();
    _scrollTop();

    const scriptLines = track.script.map((line, i) =>
      `<div class="clt-script-line" id="clt-sl${i}"><span class="clt-script-text">${line.text}</span></div>`
    ).join('');

    const questionsHtml = track.questions.map((q, qi) => `
      <div class="clt-sc-q">
        <span class="clt-sc-num">${qi + 1}.</span>
        <span class="clt-sc-sentence">${q.sentence.replace('__', `<input type="text" class="clt-sc-input" placeholder="tulis jawaban"
          oninput="CambridgeListening.setAnswer('q${qi}', this.value.trim().toLowerCase())">`)}</span>
      </div>`).join('');

    _set(`
      <div class="clt-ex-header">
        <button class="btn btn-ghost btn-sm" onclick="CambridgeListening.selectPart(2)">← Kembali</button>
        <div class="clt-ex-title">${track.title}</div>
        <div class="clt-timer-wrap">⏱️ <span id="clt-timer">00:00</span></div>
      </div>
      <div class="clt-sc-speaker">🎙️ ${track.speaker}</div>
      <div class="clt-audio-panel">
        <div class="clt-script-box">${scriptLines}</div>
        <button class="btn btn-cambridge clt-play-btn" id="clt-play-btn"
          onclick="CambridgeListening.togglePlay()">▶ Dengarkan</button>
      </div>
      <div class="clt-sc-section">
        <div class="clt-sc-title">Lengkapi kalimat berikut (satu kata atau frasa pendek):</div>
        ${questionsHtml}
        <button class="btn btn-primary" onclick="CambridgeListening.submitPart2()">Periksa Jawaban</button>
      </div>
    `);
  }

  // ── PART 3: Long Interview ─────────────────────────────────────────────────
  function _renderPart3(trackIdx) {
    const tracks = CambridgeListeningData.getPart3Tracks();
    const track = tracks[trackIdx];
    _state.currentData = track;
    _state.trackIdx = trackIdx;
    _state.answers = {};
    _state.hasListened = false;
    _startTimer();
    _scrollTop();

    const scriptLines = track.script.map((line, i) =>
      `<div class="clt-script-line" id="clt-sl${i}">
        <span class="clt-script-speaker">${line.speaker}:</span>
        <span class="clt-script-text">${line.text}</span>
      </div>`).join('');

    const questionsHtml = track.questions.map((q, qi) => {
      const choices = q.choices.map((c, ci) => `
        <label class="clt-choice">
          <input type="radio" name="p3q${qi}" value="${ci}"
            onchange="CambridgeListening.setAnswer('q${qi}', ${ci})">
          <span class="clt-choice-letter">${String.fromCharCode(65 + ci)}</span>
          <span>${c}</span>
        </label>`).join('');
      return `
        <div class="clt-question">
          <div class="clt-q-num">Pertanyaan ${qi + 1}</div>
          <div class="clt-q-text">${q.question}</div>
          <div class="clt-choices">${choices}</div>
        </div>`;
    }).join('');

    _set(`
      <div class="clt-ex-header">
        <button class="btn btn-ghost btn-sm" onclick="CambridgeListening.selectPart(3)">← Kembali</button>
        <div class="clt-ex-title">${track.title}</div>
        <div class="clt-timer-wrap">⏱️ <span id="clt-timer">00:00</span></div>
      </div>
      <div class="clt-audio-panel">
        <div class="clt-script-box">${scriptLines}</div>
        <button class="btn btn-cambridge clt-play-btn" id="clt-play-btn"
          onclick="CambridgeListening.togglePlay()">▶ Dengarkan</button>
      </div>
      <div class="clt-q-section">
        ${questionsHtml}
        <button class="btn btn-primary crm-submit-btn" onclick="CambridgeListening.submitPart3()">Periksa Jawaban</button>
      </div>
    `);
  }

  // ── PART 4: Multiple Matching ──────────────────────────────────────────────
  function _renderPart4(trackIdx) {
    const tracks = CambridgeListeningData.getPart4Tracks();
    const track = tracks[trackIdx];
    _state.currentData = track;
    _state.trackIdx = trackIdx;
    _state.answers = {};
    _state.hasListened = false;
    _startTimer();
    _scrollTop();

    // Build combined script from all speakers
    const allLines = track.speakers.map(s => ({
      speaker: s.label,
      text: s.script
    }));

    const scriptLines = allLines.map((line, i) =>
      `<div class="clt-script-line" id="clt-sl${i}">
        <span class="clt-script-speaker">${line.speaker}:</span>
        <span class="clt-script-text">${line.text}</span>
      </div>`).join('');

    const optionsHtml = track.options.map(o =>
      `<div class="clt-mm-option"><span class="clt-mm-opt-id">${o.id}</span> ${o.text}</div>`
    ).join('');

    const questionsHtml = track.speakers.map((s, si) => `
      <div class="clt-mm-q">
        <div class="clt-mm-q-label">${s.label}</div>
        <select class="crm-gap-select" onchange="CambridgeListening.setAnswer('s${si}', this.value)">
          <option value="">— pilih —</option>
          ${track.options.map(o => `<option value="${o.id}">${o.id}: ${o.text}</option>`).join('')}
        </select>
      </div>`).join('');

    _set(`
      <div class="clt-ex-header">
        <button class="btn btn-ghost btn-sm" onclick="CambridgeListening.selectPart(4)">← Kembali</button>
        <div class="clt-ex-title">${track.title}</div>
        <div class="clt-timer-wrap">⏱️ <span id="clt-timer">00:00</span></div>
      </div>
      <div class="clt-mm-intro">${track.intro}</div>
      <div class="clt-audio-panel">
        <div class="clt-script-box">${scriptLines}</div>
        <button class="btn btn-cambridge clt-play-btn" id="clt-play-btn"
          onclick="CambridgeListening.togglePlay()">▶ Dengarkan</button>
      </div>
      <div class="clt-mm-options-panel">
        <div class="clt-mm-opts-title">Pilihan:</div>
        ${optionsHtml}
      </div>
      <div class="clt-mm-questions">
        <div class="clt-mm-q-title">Cocokkan setiap pembicara dengan pernyataan yang tepat:</div>
        ${questionsHtml}
        <button class="btn btn-primary" onclick="CambridgeListening.submitPart4()">Periksa Jawaban</button>
      </div>
    `);
  }

  // ── SUBMIT LOGIC ──────────────────────────────────────────────────────────
  function _showResultScreen(correct, total, key, partLabel, feedbackHtml) {
    _stopTimer();
    _stopSpeech();
    const pct = Math.round((correct / total) * 100);
    _saveResult(key, correct, total);
    const xp = pct >= 80 ? 20 : pct >= 60 ? 12 : 7;
    if (typeof XPSystem !== 'undefined') XPSystem.add(xp, `Cambridge Listening`);
    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onQuizComplete(pct >= 60);

    const grade = pct >= 80 ? '🏆 Sangat Baik' : pct >= 60 ? '👍 Cukup Baik' : '📚 Perlu Latihan';
    _set(`
      <div class="crm-result">
        <div class="crm-result-header">
          <div class="crm-result-icon">${pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}</div>
          <div class="crm-result-title">Hasil ${partLabel}</div>
          <div class="crm-result-score">${correct} / ${total} benar</div>
          <div class="crm-result-pct">${pct}%</div>
          <div class="crm-result-grade">${grade}</div>
          <div class="crm-result-xp">+${xp} XP</div>
        </div>
        <div class="crm-feedback">${feedbackHtml}</div>
        <div class="crm-result-actions">
          <button class="btn btn-ghost" onclick="CambridgeListening.showMenu()">Menu</button>
          <button class="btn btn-primary" onclick="CambridgeListening.selectPart(${_state.part})">Coba Lagi</button>
        </div>
      </div>`);
    _scrollTop();
  }

  // ── PUBLIC API ─────────────────────────────────────────────────────────────
  return {
    init() {
      if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onModuleVisit('cambridge-listening');
      _renderMenu();
    },

    showMenu() { _stopSpeech(); _renderMenu(); },

    selectPart(part) {
      _stopTimer();
      _stopSpeech();
      _state.part = part;
      _renderPartMenu(part);
    },

    startExercise(part, idx) {
      _stopSpeech();
      _state.answers = {};
      _state.submitted = false;
      if (part === 1) _renderPart1(idx);
      else if (part === 2) _renderPart2(idx);
      else if (part === 3) _renderPart3(idx);
      else if (part === 4) _renderPart4(idx);
    },

    setAnswer(key, value) {
      _state.answers[key] = value;
    },

    togglePlay() {
      if (_state.isPlaying) {
        _stopSpeech();
        _updatePlayBtn(false);
        return;
      }
      const data = _state.currentData;
      let lines = [];
      if (data.script) lines = data.script;
      else if (data.speakers) lines = data.speakers.map(s => ({ speaker: s.label, text: s.script }));

      _updatePlayBtn(true);
      _playScript(lines, () => {
        _updatePlayBtn(false);
        const noteEl = document.querySelector('.clt-listen-note');
        if (noteEl) noteEl.textContent = '✅ Audio selesai. Jawab pertanyaan di bawah.';
      });
    },

    // ── Submit Part 1
    submitPart1() {
      const extract = _state.currentData;
      const userAns = _state.answers['main'];
      const isCorrect = parseInt(userAns) === extract.answer;
      const feedbackHtml = `
        <div class="crm-fb-row ${isCorrect ? 'crm-fb-correct' : 'crm-fb-wrong'}">
          <div class="crm-fb-user">${isCorrect ? '✅' : '❌'} ${userAns !== undefined ? extract.choices[parseInt(userAns)] : '—'}</div>
          ${!isCorrect ? `<div class="crm-fb-correct-ans">→ ${extract.choices[extract.answer]}</div>` : ''}
          <div class="crm-fb-explain">${extract.explanation}</div>
        </div>`;
      _showResultScreen(isCorrect ? 1 : 0, 1, extract.id, 'Part 1 — Short Extract', feedbackHtml);
    },

    // ── Submit Part 2
    submitPart2() {
      const track = _state.currentData;
      let correct = 0;
      const rows = track.questions.map((q, qi) => {
        const userAns = (_state.answers[`q${qi}`] || '').toLowerCase().trim();
        const correctAns = q.answer.toLowerCase().trim();
        const isCorrect = userAns === correctAns;
        if (isCorrect) correct++;
        return `
          <div class="crm-fb-row ${isCorrect ? 'crm-fb-correct' : 'crm-fb-wrong'}">
            <div class="crm-fb-num">Q${qi + 1}</div>
            <div class="crm-fb-user">${isCorrect ? '✅' : '❌'} "${userAns || '—'}"</div>
            ${!isCorrect ? `<div class="crm-fb-correct-ans">→ "${q.answer}"</div>` : ''}
            <div class="crm-fb-explain">${q.explanation}</div>
          </div>`;
      }).join('');
      _showResultScreen(correct, track.questions.length, track.id, 'Part 2 — Sentence Completion', rows);
    },

    // ── Submit Part 3
    submitPart3() {
      const track = _state.currentData;
      let correct = 0;
      const rows = track.questions.map((q, qi) => {
        const userAns = _state.answers[`q${qi}`];
        const isCorrect = parseInt(userAns) === q.answer;
        if (isCorrect) correct++;
        return `
          <div class="crm-fb-row ${isCorrect ? 'crm-fb-correct' : 'crm-fb-wrong'}">
            <div class="crm-fb-num">Q${qi + 1}</div>
            <div class="crm-fb-user">${isCorrect ? '✅' : '❌'} ${userAns !== undefined ? q.choices[parseInt(userAns)] : '—'}</div>
            ${!isCorrect ? `<div class="crm-fb-correct-ans">→ ${q.choices[q.answer]}</div>` : ''}
            <div class="crm-fb-explain">${q.explanation}</div>
          </div>`;
      }).join('');
      _showResultScreen(correct, track.questions.length, track.id, 'Part 3 — Long Interview', rows);
    },

    // ── Submit Part 4
    submitPart4() {
      const track = _state.currentData;
      let correct = 0;
      const rows = track.speakers.map((s, si) => {
        const userAns = _state.answers[`s${si}`];
        const isCorrect = userAns === s.answer;
        if (isCorrect) correct++;
        return `
          <div class="crm-fb-row ${isCorrect ? 'crm-fb-correct' : 'crm-fb-wrong'}">
            <div class="crm-fb-num">${s.label}</div>
            <div class="crm-fb-user">${isCorrect ? '✅' : '❌'} Opsi ${userAns || '—'}</div>
            ${!isCorrect ? `<div class="crm-fb-correct-ans">→ Opsi ${s.answer}: ${track.options.find(o => o.id === s.answer)?.text || ''}</div>` : ''}
            <div class="crm-fb-explain">${s.explanation}</div>
          </div>`;
      }).join('');
      _showResultScreen(correct, track.speakers.length, track.id, 'Part 4 — Multiple Matching', rows);
    }
  };

})();
