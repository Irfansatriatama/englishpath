/**
 * EnglishPath — Cambridge Simulation Module
 * Fase 16c-2: Simulasi Full Test Cambridge B2 First / C1 Advanced
 * localStorage: ep_user_{id}_sim_results
 */
const CambridgeSimulation = (() => {

  // ── State ─────────────────────────────────────────────────────────────────
  let _state = {
    phase: 'level_select', // level_select | intro | reading | writing | listening | speaking | submitting
    level: null,           // 'B2' | 'C1'
    sectionTimer: null,
    sectionSeconds: 0,
    sectionMax: 0,
    tts: null,
    ttsActive: false,

    // Reading & UoE answers
    rueAnswers: {
      p1: {},   // {gapNum: choiceIdx}
      p2: {},   // {gapNum: userText}
      p3: {},   // {gapNum: userText}
      p4: {},   // {num: userText}
      p5: {}    // {questionId: choiceIdx}
    },

    // Writing
    writingP1Text: '',
    writingP2ChoiceId: null,
    writingP2Text: '',
    writingSelfScore: 0,

    // Listening
    listeningAnswers: {
      p1: {},   // {extractId: choiceIdx}
      p2: {},   // {num: userText}
      p3: {},   // {questionId: choiceIdx}
      p4: {}    // {speakerId: statementId}
    },
    listeningTTSActive: false,
    listeningTTSSection: null,

    // Speaking
    speakingPart: 0,  // 0–3
    speakingSelfScores: {},  // {partIdx: score 1–5}
    speakingTimers: {},

    // Computed scores
    scores: null
  };

  function _uid() { const s = Auth.getSession(); return s ? s.userId : null; }
  function _c()   { return document.getElementById('sim-content'); }

  // ── Helpers ────────────────────────────────────────────────────────────────
  function _fmtTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2,'0')}`;
  }

  function _stopTTS() {
    if (_state.tts) { speechSynthesis.cancel(); _state.tts = null; _state.ttsActive = false; }
  }

  function _speak(text, rate=0.88) {
    _stopTTS();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-GB'; utt.rate = rate;
    utt.onend = () => { _state.tts = null; _state.ttsActive = false; };
    _state.tts = utt; _state.ttsActive = true;
    speechSynthesis.speak(utt);
  }

  function _speakScript(lines, onDone) {
    let idx = 0;
    function speakNext() {
      if (idx >= lines.length) { _state.ttsActive = false; if (onDone) onDone(); return; }
      const line = lines[idx++];
      const utt = new SpeechSynthesisUtterance(line.text || line);
      utt.lang = 'en-GB'; utt.rate = 0.88;
      utt.onend = () => setTimeout(speakNext, 350);
      _state.tts = utt;
      speechSynthesis.speak(utt);
    }
    _state.ttsActive = true;
    speakNext();
  }

  function _stopSectionTimer() {
    if (_state.sectionTimer) { clearInterval(_state.sectionTimer); _state.sectionTimer = null; }
  }

  function _startSectionTimer(seconds, onTick, onExpire) {
    _stopSectionTimer();
    _state.sectionSeconds = seconds;
    _state.sectionMax = seconds;
    _state.sectionTimer = setInterval(() => {
      _state.sectionSeconds--;
      if (onTick) onTick(_state.sectionSeconds);
      if (_state.sectionSeconds <= 0) {
        _stopSectionTimer();
        if (onExpire) onExpire();
      }
    }, 1000);
  }

  function _timerEl() { return document.getElementById('sim-timer'); }
  function _updateTimerEl(sec) {
    const el = _timerEl();
    if (!el) return;
    el.textContent = _fmtTime(sec);
    el.className = 'sim-timer' + (sec < 300 ? ' warning' : '');
  }

  // ── Sidebar helper ─────────────────────────────────────────────────────────
  function _sidebarList() {
    return [
      { phase: 'reading',   icon: '📖', label: 'Reading & UoE', time: '75 min' },
      { phase: 'writing',   icon: '✍️',  label: 'Writing',       time: '80 min' },
      { phase: 'listening', icon: '🔊', label: 'Listening',      time: '40 min' },
      { phase: 'speaking',  icon: '🗣️',  label: 'Speaking',      time: 'Self-paced' }
    ];
  }

  function _renderSectionNav(active) {
    return `<div class="sim-section-nav">
      ${_sidebarList().map(s => `
        <div class="sim-sec-item ${s.phase === active ? 'active' : ''} ${_sectionDone(s.phase) ? 'done' : ''}">
          <span class="sim-sec-icon">${s.icon}</span>
          <span class="sim-sec-label">${s.label}</span>
          <span class="sim-sec-time">${s.time}</span>
          ${_sectionDone(s.phase) ? '<span class="sim-sec-check">✅</span>' : ''}
        </div>`).join('')}
    </div>`;
  }

  function _sectionDone(phase) {
    const phases = ['level_select','intro','reading','writing','listening','speaking','submitting'];
    const current = phases.indexOf(_state.phase);
    const check = phases.indexOf(phase);
    return check > 0 && current > check;
  }

  // ── Phase Renders ──────────────────────────────────────────────────────────

  function _renderLevelSelect() {
    _c().innerHTML = `
      <div class="sim-welcome">
        <div class="sim-welcome-icon">🎓</div>
        <h1 class="sim-welcome-title">Cambridge Full Test Simulation</h1>
        <p class="sim-welcome-desc">Pilih level untuk memulai simulasi. Soal dan waktu disesuaikan dengan target ujian kamu.</p>
        <div class="sim-level-cards">
          <div class="sim-level-card" data-level="B2" tabindex="0">
            <div class="sim-level-badge b2">B2</div>
            <div class="sim-level-name">B2 First (FCE)</div>
            <div class="sim-level-desc">Cambridge B2 First — target untuk pengguna dengan kemampuan intermediate-upper.</div>
            <ul class="sim-level-details">
              <li>Reading & Use of English: 75 menit</li>
              <li>Writing: 80 menit (essay 140–190 kata)</li>
              <li>Listening: 40 menit</li>
              <li>Speaking: Self-paced (4 parts)</li>
            </ul>
            <button class="btn btn-primary sim-start-btn" data-level="B2">Mulai B2 First</button>
          </div>
          <div class="sim-level-card" data-level="C1" tabindex="0">
            <div class="sim-level-badge c1">C1</div>
            <div class="sim-level-name">C1 Advanced (CAE)</div>
            <div class="sim-level-desc">Cambridge C1 Advanced — target untuk pengguna dengan kemampuan advanced.</div>
            <ul class="sim-level-details">
              <li>Reading & Use of English: 75 menit</li>
              <li>Writing: 80 menit (essay 220–260 kata)</li>
              <li>Listening: 40 menit</li>
              <li>Speaking: Self-paced (4 parts)</li>
            </ul>
            <button class="btn btn-primary sim-start-btn" data-level="C1">Mulai C1 Advanced</button>
          </div>
        </div>
        <div class="sim-tip">💡 <strong>Tips:</strong> Kerjakan di tempat tenang tanpa gangguan. Simulasi ini memakan waktu sekitar 4 jam total. Kamu bisa menjawab dalam Bahasa Inggris atau menilai dirimu sendiri di bagian Writing & Speaking.</div>
      </div>`;

    _c().querySelectorAll('.sim-start-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        _state.level = btn.dataset.level;
        _state.phase = 'intro';
        _renderIntro();
      });
    });
  }

  function _renderIntro() {
    _c().innerHTML = `
      <div class="sim-intro">
        <div class="sim-intro-badge">${_state.level === 'C1' ? 'C1 Advanced' : 'B2 First'}</div>
        <h2 class="sim-intro-title">Cambridge Full Simulation — ${_state.level === 'C1' ? 'C1 Advanced' : 'B2 First'}</h2>
        <p class="sim-intro-sub">Simulasi ini terdiri dari 4 section dengan total waktu ±4 jam.</p>
        <div class="sim-intro-sections">
          ${_sidebarList().map((s,i) => `
            <div class="sim-intro-section">
              <span class="sim-intro-num">${i+1}</span>
              <span class="sim-intro-icon">${s.icon}</span>
              <div>
                <div class="sim-intro-section-name">${s.label}</div>
                <div class="sim-intro-section-time">⏱ ${s.time}</div>
              </div>
            </div>`).join('')}
        </div>
        <div class="sim-intro-rules">
          <h3>Sebelum memulai:</h3>
          <ul>
            <li>Pastikan kamu berada di tempat tenang dan tidak akan terganggu.</li>
            <li>Setiap section mempunyai timer — jawab sebelum waktu habis.</li>
            <li>Writing & Speaking dinilai dengan self-assessment (1–5).</li>
            <li>Hasil dan grade dihitung otomatis di akhir.</li>
          </ul>
        </div>
        <button class="btn btn-primary btn-lg" id="sim-begin-btn">Mulai Section 1: Reading & Use of English</button>
      </div>`;
    document.getElementById('sim-begin-btn').addEventListener('click', () => {
      _state.phase = 'reading';
      _renderReading();
    });
  }

  // ── SECTION 1: Reading & Use of English ─────────────────────────────────
  function _renderReading() {
    const d = CambridgeSimulationData;
    _c().innerHTML = `
      <div class="sim-section-wrapper">
        ${_renderSectionNav('reading')}
        <div class="sim-section-header">
          <div class="sim-section-title">📖 Section 1: Reading & Use of English</div>
          <div class="sim-timer" id="sim-timer">75:00</div>
        </div>
        <div class="sim-section-body" id="sim-rue-body">
          ${_renderPart1Block(d.getSimPart1())}
          ${_renderPart2Block(d.getSimPart2())}
          ${_renderPart3Block(d.getSimPart3())}
          ${_renderPart4Block(d.getSimPart4())}
          ${_renderPart5Block(d.getSimPart5())}
          <div class="sim-submit-row">
            <button class="btn btn-success btn-lg" id="sim-rue-submit">Submit & Proceed to Writing →</button>
          </div>
        </div>
      </div>`;

    _startSectionTimer(75*60, _updateTimerEl, () => {
      Toast.show('Waktu Reading & Use of English habis! Melanjutkan ke Writing...', 'warning');
      setTimeout(() => { _state.phase = 'writing'; _renderWriting(); }, 2000);
    });

    document.getElementById('sim-rue-submit').addEventListener('click', () => _submitReading());

    // Attach input listeners
    _c().querySelectorAll('.sim-p1-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const gapNum = +btn.dataset.gap;
        const idx = +btn.dataset.idx;
        if (!_state.rueAnswers.p1) _state.rueAnswers.p1 = {};
        _state.rueAnswers.p1[gapNum] = idx;
        btn.closest('.sim-gap-options').querySelectorAll('.sim-p1-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    _c().querySelectorAll('.sim-open-input').forEach(inp => {
      inp.addEventListener('input', () => {
        const part = inp.dataset.part;
        const num = +inp.dataset.num;
        if (!_state.rueAnswers[part]) _state.rueAnswers[part] = {};
        _state.rueAnswers[part][num] = inp.value.trim();
      });
    });
    _c().querySelectorAll('.sim-p5-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.dataset.qid;
        const idx = +btn.dataset.idx;
        if (!_state.rueAnswers.p5) _state.rueAnswers.p5 = {};
        _state.rueAnswers.p5[qId] = idx;
        btn.closest('.sim-p5-choices').querySelectorAll('.sim-p5-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  }

  function _renderPart1Block(d) {
    const textWithBlanks = d.text.replace(/__([\d]+)__/g, (_, n) => {
      const gap = d.gaps.find(g => g.num === +n);
      const opts = gap.options.map((o,i) => `<button class="sim-p1-option" data-gap="${gap.num}" data-idx="${i}">${o}</button>`).join('');
      return `<span class="sim-gap-inline">[${n}]<span class="sim-gap-options">${opts}</span></span>`;
    });
    return `
      <div class="sim-part-block">
        <div class="sim-part-header"><span class="sim-part-num">Part 1</span><span class="sim-part-name">Multiple-Choice Cloze</span><span class="sim-part-instruction">Choose the best word for each gap.</span></div>
        <div class="sim-passage-title">${d.title}</div>
        <div class="sim-part1-text">${textWithBlanks}</div>
      </div>`;
  }

  function _renderPart2Block(d) {
    const gapHtml = d.gaps.map(g => `
      <div class="sim-open-gap">
        <span class="sim-open-num">(${g.num})</span>
        <input class="sim-open-input" data-part="p2" data-num="${g.num}" type="text" placeholder="Type answer..." maxlength="20">
      </div>`).join('');
    const textWithNums = d.text.replace(/__([\d]+)__/g, (_, n) => `<strong>__(${n})__</strong>`);
    return `
      <div class="sim-part-block">
        <div class="sim-part-header"><span class="sim-part-num">Part 2</span><span class="sim-part-name">Open Cloze</span><span class="sim-part-instruction">Write one word for each gap.</span></div>
        <div class="sim-passage-title">${d.title}</div>
        <div class="sim-part2-text">${textWithNums}</div>
        <div class="sim-open-gaps">${gapHtml}</div>
      </div>`;
  }

  function _renderPart3Block(d) {
    const gapHtml = d.gaps.map(g => `
      <div class="sim-open-gap">
        <span class="sim-open-num">(${g.num})</span>
        <span class="sim-open-base">[${g.base}]</span>
        <input class="sim-open-input" data-part="p3" data-num="${g.num}" type="text" placeholder="Correct form..." maxlength="25">
      </div>`).join('');
    const textWithNums = d.text.replace(/__([\d]+)__\s*\([A-Z]+\)/g, (match, n) => {
      const g = d.gaps.find(x => x.num === +n);
      return `<strong>__(${n})__ [${g ? g.base : ''}]</strong>`;
    });
    return `
      <div class="sim-part-block">
        <div class="sim-part-header"><span class="sim-part-num">Part 3</span><span class="sim-part-name">Word Formation</span><span class="sim-part-instruction">Use the word in brackets to form the correct word for each gap.</span></div>
        <div class="sim-passage-title">${d.title}</div>
        <div class="sim-part2-text">${textWithNums}</div>
        <div class="sim-open-gaps">${gapHtml}</div>
      </div>`;
  }

  function _renderPart4Block(d) {
    const items = d.items.map(item => `
      <div class="sim-kwt-item">
        <div class="sim-kwt-num">${item.num}</div>
        <div class="sim-kwt-body">
          <div class="sim-kwt-original">${item.original}</div>
          <div class="sim-kwt-keyword">Keyword: <strong>${item.keyword}</strong></div>
          <input class="sim-open-input" data-part="p4" data-num="${item.num}" type="text" placeholder="Rewrite the sentence using the keyword..." style="width:100%">
        </div>
      </div>`).join('');
    return `
      <div class="sim-part-block">
        <div class="sim-part-header"><span class="sim-part-num">Part 4</span><span class="sim-part-name">Key Word Transformation</span><span class="sim-part-instruction">Complete the second sentence using the word given. Do not change the word.</span></div>
        <div class="sim-kwt-list">${items}</div>
      </div>`;
  }

  function _renderPart5Block(d) {
    const qHtml = d.questions.map(q => {
      const choices = q.choices.map((c,i) => `<button class="sim-p5-option" data-qid="${q.id}" data-idx="${i}"><span class="sim-p5-letter">${'ABCD'[i]}</span>${c}</button>`).join('');
      return `<div class="sim-p5-question"><div class="sim-p5-qtext">${q.question}</div><div class="sim-p5-choices">${choices}</div></div>`;
    }).join('');
    return `
      <div class="sim-part-block">
        <div class="sim-part-header"><span class="sim-part-num">Part 5</span><span class="sim-part-name">Reading: Multiple Choice</span><span class="sim-part-instruction">Read the text and answer the questions.</span></div>
        <div class="sim-reading-passage">${d.text.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>
        <div class="sim-p5-questions">${qHtml}</div>
      </div>`;
  }

  function _submitReading() {
    _stopSectionTimer();
    // Score Part 1
    const d = CambridgeSimulationData;
    let p1Raw = 0;
    d.getSimPart1().gaps.forEach(g => { if (_state.rueAnswers.p1[g.num] === g.answer) p1Raw++; });
    // Part 2
    let p2Raw = 0;
    d.getSimPart2().gaps.forEach(g => {
      const ua = (_state.rueAnswers.p2[g.num] || '').toLowerCase().trim();
      if (ua === g.answer.toLowerCase()) p2Raw++;
    });
    // Part 3
    let p3Raw = 0;
    d.getSimPart3().gaps.forEach(g => {
      const ua = (_state.rueAnswers.p3[g.num] || '').toLowerCase().trim();
      if (ua === g.answer.toLowerCase()) p3Raw++;
    });
    // Part 4 (no auto-score, give credit if non-empty)
    let p4Raw = 0;
    d.getSimPart4().items.forEach(it => { if ((_state.rueAnswers.p4[it.num] || '').trim().length > 5) p4Raw++; });
    // Part 5
    let p5Raw = 0;
    d.getSimPart5().questions.forEach(q => { if (_state.rueAnswers.p5[q.id] === q.answer) p5Raw++; });

    if (!_state.scores) _state.scores = {};
    _state.scores.rueRaw = { p1: p1Raw, p2: p2Raw, p3: p3Raw, p4: p4Raw, p5: p5Raw };
    _state.scores.rueTotal = p1Raw + p2Raw + p3Raw + p4Raw + p5Raw;
    _state.scores.rueMax = 31;
    _state.scores.rueScale = CambridgeSimulationData.calcReadingUoEScore(p1Raw, p2Raw, p3Raw, p4Raw, p5Raw);

    Toast.show(`Section 1 selesai! Skor R&UoE: ${_state.scores.rueTotal}/31`, 'success');
    _state.phase = 'writing';
    setTimeout(() => _renderWriting(), 800);
  }

  // ── SECTION 2: Writing ───────────────────────────────────────────────────
  function _renderWriting() {
    const p1 = CambridgeSimulationData.getSimWritingP1(_state.level);
    const p2Opts = CambridgeSimulationData.getSimWritingP2Options();
    _c().innerHTML = `
      <div class="sim-section-wrapper">
        ${_renderSectionNav('writing')}
        <div class="sim-section-header">
          <div class="sim-section-title">✍️ Section 2: Writing</div>
          <div class="sim-timer" id="sim-timer">80:00</div>
        </div>
        <div class="sim-section-body">
          <!-- Part 1 -->
          <div class="sim-part-block">
            <div class="sim-part-header"><span class="sim-part-num">Part 1</span><span class="sim-part-name">Compulsory Essay</span><span class="sim-part-instruction">${p1.wordMin}–${p1.wordMax} words</span></div>
            <div class="sim-w-stimulus">${p1.stimulus}</div>
            <div class="sim-w-prompt">${(p1.prompt || '').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>')}</div>
            <div class="sim-planning-box">
              <div class="sim-planning-title">📋 Planning Guide</div>
              ${p1.planningPrompts.map(pr=>`<div class="sim-planning-item">${pr}</div>`).join('')}
            </div>
            <textarea id="sim-w1-text" class="sim-w-area" placeholder="Write your essay here..." rows="12">${_state.writingP1Text || ''}</textarea>
            <div class="sim-wc-row"><span id="sim-w1-wc">0</span> words <span class="sim-wc-target">(target: ${p1.wordMin}–${p1.wordMax})</span></div>
          </div>
          <!-- Part 2 -->
          <div class="sim-part-block">
            <div class="sim-part-header"><span class="sim-part-num">Part 2</span><span class="sim-part-name">Optional Task</span><span class="sim-part-instruction">Choose ONE task</span></div>
            <div class="sim-w2-options">
              ${p2Opts.map((opt,i) => `
                <div class="sim-w2-opt-card ${_state.writingP2ChoiceId === opt.id ? 'selected' : ''}" data-id="${opt.id}" tabindex="0">
                  <span class="sim-w2-opt-icon">${opt.icon}</span>
                  <div>
                    <div class="sim-w2-opt-title">${opt.title}</div>
                    <div class="sim-w2-opt-desc">${opt.stimulus}</div>
                  </div>
                </div>`).join('')}
            </div>
            <div id="sim-w2-prompt-area" class="sim-w2-prompt-area" style="display:${_state.writingP2ChoiceId ? 'block' : 'none'}">
              <div id="sim-w2-prompt-text" class="sim-w-prompt"></div>
              <textarea id="sim-w2-text" class="sim-w-area" placeholder="Write your response here..." rows="10">${_state.writingP2Text || ''}</textarea>
              <div class="sim-wc-row"><span id="sim-w2-wc">0</span> words <span class="sim-wc-target">(target: 140–190)</span></div>
            </div>
          </div>
          <!-- Self Assessment -->
          <div class="sim-part-block">
            <div class="sim-part-header"><span class="sim-part-num">✅</span><span class="sim-part-name">Self-Assessment</span><span class="sim-part-instruction">How well did you write overall?</span></div>
            <div class="sim-self-assess-row">
              ${[1,2,3,4,5].map(n => `<button class="sim-self-btn ${_state.writingSelfScore===n?'active':''}" data-score="${n}">${n}</button>`).join('')}
            </div>
            <div class="sim-self-labels"><span>Needs work</span><span>Excellent</span></div>
            <div class="sim-rubric-mini">
              ${(CambridgeSimulationData.getSimWritingP1(_state.level).rubric || []).map(r => `<div class="sim-rubric-item"><strong>${r.criterion}:</strong> ${r.desc}</div>`).join('')}
            </div>
          </div>
          <div class="sim-submit-row">
            <button class="btn btn-success btn-lg" id="sim-w-submit">Submit & Proceed to Listening →</button>
          </div>
        </div>
      </div>`;

    _startSectionTimer(80*60, _updateTimerEl, () => {
      Toast.show('Waktu Writing habis! Melanjutkan ke Listening...', 'warning');
      setTimeout(() => _submitWriting(), 500);
    });

    // Word count listeners
    const ta1 = document.getElementById('sim-w1-text');
    const wc1 = document.getElementById('sim-w1-wc');
    const p1data = CambridgeSimulationData.getSimWritingP1(_state.level);
    ta1.addEventListener('input', () => {
      _state.writingP1Text = ta1.value;
      const wc = ta1.value.trim().split(/\s+/).filter(Boolean).length;
      wc1.textContent = wc;
      wc1.className = wc >= p1data.wordMin && wc <= p1data.wordMax ? 'wc-good' : wc < p1data.wordMin ? 'wc-low' : 'wc-high';
    });
    // Init wc1 if text exists
    if (_state.writingP1Text) { ta1.dispatchEvent(new Event('input')); }

    // Part 2 option select
    const p2Opts2 = CambridgeSimulationData.getSimWritingP2Options();
    _c().querySelectorAll('.sim-w2-opt-card').forEach(card => {
      card.addEventListener('click', () => {
        _c().querySelectorAll('.sim-w2-opt-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const optId = card.dataset.id;
        _state.writingP2ChoiceId = optId;
        const opt = p2Opts2.find(o => o.id === optId);
        const promptArea = document.getElementById('sim-w2-prompt-area');
        const promptText = document.getElementById('sim-w2-prompt-text');
        promptText.innerHTML = `<strong>${opt.title}</strong><br><em>${opt.stimulus}</em><br><br>${(opt.prompt||'').replace(/\n/g,'<br>')}`;
        promptArea.style.display = 'block';
        const ta2 = document.getElementById('sim-w2-text');
        const wc2el = document.getElementById('sim-w2-wc');
        ta2.addEventListener('input', () => {
          _state.writingP2Text = ta2.value;
          const wc = ta2.value.trim().split(/\s+/).filter(Boolean).length;
          wc2el.textContent = wc;
        });
      });
    });

    // Self-assess
    _c().querySelectorAll('.sim-self-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        _state.writingSelfScore = +btn.dataset.score;
        _c().querySelectorAll('.sim-self-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    document.getElementById('sim-w-submit').addEventListener('click', () => {
      if (!_state.writingSelfScore) { Toast.show('Berikan self-assessment dulu (1–5)', 'warning'); return; }
      _submitWriting();
    });
  }

  function _submitWriting() {
    _stopSectionTimer();
    if (!_state.scores) _state.scores = {};
    _state.scores.writingSelfScore = _state.writingSelfScore || 1;
    _state.scores.writingScale = CambridgeSimulationData.calcWritingScore(_state.writingSelfScore || 1);
    Toast.show('Section 2 selesai! Melanjutkan ke Listening...', 'success');
    _state.phase = 'listening';
    setTimeout(() => _renderListening(), 800);
  }

  // ── SECTION 3: Listening ─────────────────────────────────────────────────
  function _renderListening() {
    const p1 = CambridgeSimulationData.getSimListeningP1();
    const p2 = CambridgeSimulationData.getSimListeningP2();
    const p3 = CambridgeSimulationData.getSimListeningP3();
    const p4 = CambridgeSimulationData.getSimListeningP4();
    _c().innerHTML = `
      <div class="sim-section-wrapper">
        ${_renderSectionNav('listening')}
        <div class="sim-section-header">
          <div class="sim-section-title">🔊 Section 3: Listening</div>
          <div class="sim-timer" id="sim-timer">40:00</div>
        </div>
        <div class="sim-section-body">
          <!-- Part 1 -->
          <div class="sim-part-block">
            <div class="sim-part-header"><span class="sim-part-num">Part 1</span><span class="sim-part-name">Short Extracts — Multiple Choice</span></div>
            ${p1.map(ext => `
              <div class="sim-listen-extract" data-id="${ext.id}">
                <div class="sim-listen-label">${ext.label}</div>
                <button class="sim-tts-btn" data-script="${ext.id}">▶ Play Extract</button>
                <div class="sim-listen-q">${ext.question}</div>
                <div class="sim-p1-choices">
                  ${ext.choices.map((c,i) => `<button class="sim-listen-choice" data-eid="${ext.id}" data-idx="${i}"><span>${'ABCD'[i]}</span>${c}</button>`).join('')}
                </div>
              </div>`).join('')}
          </div>
          <!-- Part 2 -->
          <div class="sim-part-block">
            <div class="sim-part-header"><span class="sim-part-num">Part 2</span><span class="sim-part-name">Sentence Completion</span></div>
            <div class="sim-listen-label">${p2.label}</div>
            <div class="sim-listen-intro">${p2.intro}</div>
            <button class="sim-tts-btn" data-script="p2">▶ Play Talk</button>
            <div class="sim-sent-complete-list">
              ${p2.questions.map(q => `
                <div class="sim-sent-item">
                  <span class="sim-sent-num">${q.num}.</span>
                  <span class="sim-sent-stem">${q.stem.replace('________', '<input class="sim-sc-input sim-open-input" data-part="p2sc" data-num="' + q.num + '" type="text" placeholder="..." maxlength="30">')}</span>
                </div>`).join('')}
            </div>
          </div>
          <!-- Part 3 -->
          <div class="sim-part-block">
            <div class="sim-part-header"><span class="sim-part-num">Part 3</span><span class="sim-part-name">Interview — Multiple Choice</span></div>
            <div class="sim-listen-label">${p3.label}</div>
            <div class="sim-listen-intro">${p3.intro}</div>
            <button class="sim-tts-btn" data-script="p3">▶ Play Interview</button>
            ${p3.questions.map(q => `
              <div class="sim-listen-extract">
                <div class="sim-listen-q">${q.question}</div>
                <div class="sim-p1-choices">
                  ${q.choices.map((c,i) => `<button class="sim-listen-choice" data-eid="${q.id}" data-idx="${i}"><span>${'ABCD'[i]}</span>${c}</button>`).join('')}
                </div>
              </div>`).join('')}
          </div>
          <!-- Part 4 -->
          <div class="sim-part-block">
            <div class="sim-part-header"><span class="sim-part-num">Part 4</span><span class="sim-part-name">Multiple Matching</span></div>
            <div class="sim-listen-label">${p4.label}</div>
            <button class="sim-tts-btn" data-script="p4">▶ Play Speakers</button>
            <div class="sim-matching-layout">
              <div class="sim-matching-statements">
                <div class="sim-matching-title">Statements</div>
                ${p4.statements.map(s => `<div class="sim-statement-item"><span class="sim-stmt-letter">${s.id}</span> ${s.text}</div>`).join('')}
              </div>
              <div class="sim-matching-selects">
                <div class="sim-matching-title">Speaker → Statement</div>
                ${p4.speakers.map(sp => `
                  <div class="sim-matching-row">
                    <span class="sim-matching-spk">${sp.label}</span>
                    <select class="sim-matching-sel" data-speaker="${sp.id}">
                      <option value="">— Choose —</option>
                      ${p4.statements.map(s => `<option value="${s.id}">${s.id}</option>`).join('')}
                    </select>
                  </div>`).join('')}
              </div>
            </div>
          </div>
          <div class="sim-submit-row">
            <button class="btn btn-success btn-lg" id="sim-listen-submit">Submit & Proceed to Speaking →</button>
          </div>
        </div>
      </div>`;

    _startSectionTimer(40*60, _updateTimerEl, () => {
      Toast.show('Waktu Listening habis! Melanjutkan ke Speaking...', 'warning');
      setTimeout(() => _submitListening(), 500);
    });

    // TTS for extracts/scripts
    _c().querySelectorAll('.sim-tts-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.script;
        _stopTTS();
        if (key === 'p2') {
          const lines = CambridgeSimulationData.getSimListeningP2().script;
          btn.textContent = '⏹ Stop';
          _speakScript(lines, () => { btn.textContent = '▶ Play Talk'; });
        } else if (key === 'p3') {
          const lines = CambridgeSimulationData.getSimListeningP3().script;
          btn.textContent = '⏹ Stop';
          _speakScript(lines, () => { btn.textContent = '▶ Play Interview'; });
        } else if (key === 'p4') {
          const speakers = CambridgeSimulationData.getSimListeningP4().speakers;
          const allLines = speakers.flatMap(s => [{ text: `${s.label}.` }, { text: s.script }]);
          btn.textContent = '⏹ Stop';
          _speakScript(allLines, () => { btn.textContent = '▶ Play Speakers'; });
        } else {
          // Part 1 extract
          const ext = CambridgeSimulationData.getSimListeningP1().find(e => e.id === key);
          if (!ext) return;
          btn.textContent = '⏹ Stop';
          _speakScript(ext.script, () => { btn.textContent = '▶ Play Extract'; });
        }
      });
    });

    // MCQ choices for Part 1
    _c().querySelectorAll('.sim-listen-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        const eid = btn.dataset.eid;
        const idx = +btn.dataset.idx;
        if (!_state.listeningAnswers.p1) _state.listeningAnswers.p1 = {};
        _state.listeningAnswers.p1[eid] = idx;
        btn.closest('.sim-p1-choices').querySelectorAll('.sim-listen-choice').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // Sentence completion
    _c().querySelectorAll('.sim-sc-input').forEach(inp => {
      inp.addEventListener('input', () => {
        if (!_state.listeningAnswers.p2) _state.listeningAnswers.p2 = {};
        _state.listeningAnswers.p2[+inp.dataset.num] = inp.value.trim();
      });
    });

    // Part 3 MCQ (reuse sim-listen-choice with qId)
    // The part3 choices already use data-eid = q.id
    _c().querySelectorAll('.sim-listen-choice').forEach(btn => {
      // second binding for p3 questions — overwrite only if different eid pattern
      btn.addEventListener('click', () => {
        const eid = btn.dataset.eid;
        // Detect if this belongs to p3 (eid starts with sl3)
        if (eid && eid.startsWith('sl3')) {
          if (!_state.listeningAnswers.p3) _state.listeningAnswers.p3 = {};
          _state.listeningAnswers.p3[eid] = +btn.dataset.idx;
        }
      });
    });

    // Part 4 matching selects
    _c().querySelectorAll('.sim-matching-sel').forEach(sel => {
      sel.addEventListener('change', () => {
        if (!_state.listeningAnswers.p4) _state.listeningAnswers.p4 = {};
        _state.listeningAnswers.p4[sel.dataset.speaker] = sel.value;
      });
    });

    document.getElementById('sim-listen-submit').addEventListener('click', () => _submitListening());
  }

  function _submitListening() {
    _stopSectionTimer();
    _stopTTS();
    const d = CambridgeSimulationData;
    // Score Part 1
    let p1Raw = 0;
    d.getSimListeningP1().forEach(ext => {
      if ((_state.listeningAnswers.p1 || {})[ext.id] === ext.answer) p1Raw++;
    });
    // Part 2
    let p2Raw = 0;
    d.getSimListeningP2().questions.forEach(q => {
      const ua = ((_state.listeningAnswers.p2 || {})[q.num] || '').toLowerCase().trim();
      const expected = q.answer.toLowerCase().split('/').map(s => s.trim());
      if (expected.some(e => ua.includes(e))) p2Raw++;
    });
    // Part 3
    let p3Raw = 0;
    d.getSimListeningP3().questions.forEach(q => {
      if ((_state.listeningAnswers.p3 || {})[q.id] === q.answer) p3Raw++;
    });
    // Part 4
    let p4Raw = 0;
    d.getSimListeningP4().speakers.forEach(sp => {
      if ((_state.listeningAnswers.p4 || {})[sp.id] === sp.answer) p4Raw++;
    });

    if (!_state.scores) _state.scores = {};
    _state.scores.listenRaw = { p1: p1Raw, p2: p2Raw, p3: p3Raw, p4: p4Raw };
    _state.scores.listenTotal = p1Raw + p2Raw + p3Raw + p4Raw;
    _state.scores.listenMax = 18;
    _state.scores.listenScale = d.calcListeningScore(p1Raw, p2Raw, p3Raw, p4Raw);

    Toast.show(`Section 3 selesai! Skor Listening: ${_state.scores.listenTotal}/18`, 'success');
    _state.phase = 'speaking';
    setTimeout(() => _renderSpeaking(), 800);
  }

  // ── SECTION 4: Speaking ──────────────────────────────────────────────────
  function _renderSpeaking() {
    const parts = CambridgeSimulationData.getSimSpeakingParts();
    _renderSpeakingPart(0, parts);
  }

  function _renderSpeakingPart(partIdx, parts) {
    _state.speakingPart = partIdx;
    const part = parts[partIdx];
    const isLast = partIdx === parts.length - 1;
    _c().innerHTML = `
      <div class="sim-section-wrapper">
        ${_renderSectionNav('speaking')}
        <div class="sim-section-header">
          <div class="sim-section-title">🗣️ Section 4: Speaking — ${part.title}</div>
          <div class="sim-timer" id="sim-timer">${_fmtTime(part.duration)}</div>
        </div>
        <div class="sim-section-body">
          <div class="sim-part-block">
            <div class="sim-speak-instructions">${part.instructions}</div>
            ${_renderSpeakingPartContent(part)}
          </div>
          <!-- Self Assessment -->
          <div class="sim-part-block">
            <div class="sim-part-header"><span class="sim-part-num">✅</span><span class="sim-part-name">Self-Assessment — ${part.title}</span></div>
            <div class="sim-self-assess-row">
              ${[1,2,3,4,5].map(n => `<button class="sim-self-btn ${(_state.speakingSelfScores[partIdx]||0)===n?'active':''}" data-score="${n}">${n}</button>`).join('')}
            </div>
            <div class="sim-self-labels"><span>1 – Needs work</span><span>5 – Excellent</span></div>
          </div>
          <div class="sim-submit-row">
            <button class="btn btn-success btn-lg" id="sim-speak-next">
              ${isLast ? 'Submit & See Results 🎉' : `Proceed to ${parts[partIdx+1].title} →`}
            </button>
          </div>
        </div>
      </div>`;

    // Timer
    let timerRunning = false;
    const timerBtn = document.getElementById('sim-speak-timer-btn');
    let timerSec = part.duration;
    let timerInterval = null;
    if (timerBtn) {
      timerBtn.addEventListener('click', () => {
        if (!timerRunning) {
          timerRunning = true;
          timerBtn.textContent = '⏹ Stop Timer';
          timerInterval = setInterval(() => {
            timerSec--;
            _updateTimerEl(timerSec);
            if (timerSec <= 0) { clearInterval(timerInterval); timerBtn.textContent = '⏱ Time Up!'; }
          }, 1000);
        } else {
          timerRunning = false;
          clearInterval(timerInterval);
          timerBtn.textContent = '▶ Start Timer';
        }
      });
    }

    // TTS questions
    _c().querySelectorAll('.sim-speak-tts').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.text;
        _speak(text, 0.85);
        btn.textContent = '🔊 Playing...';
        setTimeout(() => { btn.textContent = '🔊 Read aloud'; }, 3000);
      });
    });

    // Self assess
    _c().querySelectorAll('.sim-self-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        _state.speakingSelfScores[partIdx] = +btn.dataset.score;
        _c().querySelectorAll('.sim-self-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    document.getElementById('sim-speak-next').addEventListener('click', () => {
      if (!_state.speakingSelfScores[partIdx]) { Toast.show('Berikan self-assessment dulu (1–5)', 'warning'); return; }
      if (timerInterval) clearInterval(timerInterval);
      if (isLast) {
        _submitSpeaking(parts);
      } else {
        _renderSpeakingPart(partIdx + 1, parts);
      }
    });
  }

  function _renderSpeakingPartContent(part) {
    if (part.part === 1) {
      return `
        <div class="sim-speak-qs">
          ${part.questions.map((q,i) => `
            <div class="sim-speak-q-card">
              <span class="sim-speak-qnum">Q${i+1}</span>
              <span class="sim-speak-qtext">${q.q}</span>
              <button class="sim-speak-tts" data-text="${q.q}">🔊 Read aloud</button>
            </div>`).join('')}
        </div>
        <button class="btn btn-outline btn-sm" id="sim-speak-timer-btn">▶ Start Timer (${_fmtTime(part.duration)})</button>`;
    }
    if (part.part === 2) {
      const t = part.task;
      return `
        <div class="sim-speak-task">
          <div class="sim-speak-task-prompt">${t.prompt}</div>
          <div class="sim-speak-compare-grid">
            <div class="sim-speak-photo-card">
              <span class="sim-photo-icon">${t.optionA.icon}</span>
              <div class="sim-photo-label">${t.optionA.label}</div>
              <div class="sim-photo-desc">${t.optionA.desc}</div>
            </div>
            <div class="sim-speak-photo-card">
              <span class="sim-photo-icon">${t.optionB.icon}</span>
              <div class="sim-photo-label">${t.optionB.label}</div>
              <div class="sim-photo-desc">${t.optionB.desc}</div>
            </div>
          </div>
          <div class="sim-follow-up"><strong>Follow-up question:</strong> ${part.followUp}</div>
        </div>
        <button class="btn btn-outline btn-sm" id="sim-speak-timer-btn">▶ Start Timer (${_fmtTime(part.duration)})</button>`;
    }
    if (part.part === 3) {
      const t = part.task;
      return `
        <div class="sim-speak-task">
          <div class="sim-speak-task-prompt">${t.main}</div>
          <div class="sim-collab-prompts">
            ${t.prompts.map(p => `
              <div class="sim-collab-card">
                <span class="sim-collab-icon">${p.icon}</span>
                <div>
                  <div class="sim-collab-label">${p.label}</div>
                  <div class="sim-collab-desc">${p.desc}</div>
                </div>
              </div>`).join('')}
          </div>
          <div class="sim-follow-up"><strong>Follow-up question:</strong> ${part.followUp}</div>
        </div>
        <button class="btn btn-outline btn-sm" id="sim-speak-timer-btn">▶ Start Timer (${_fmtTime(part.duration)})</button>`;
    }
    if (part.part === 4) {
      return `
        <div class="sim-speak-qs">
          ${part.questions.map((q,i) => `
            <div class="sim-speak-q-card">
              <span class="sim-speak-qnum">Q${i+1}</span>
              <span class="sim-speak-qtext">${q.q}</span>
              <button class="sim-speak-tts" data-text="${q.q}">🔊 Read aloud</button>
            </div>`).join('')}
        </div>
        <button class="btn btn-outline btn-sm" id="sim-speak-timer-btn">▶ Start Timer (${_fmtTime(part.duration)})</button>`;
    }
    return '';
  }

  function _submitSpeaking(parts) {
    _stopTTS();
    const avgScore = Object.values(_state.speakingSelfScores).reduce((a,b) => a+b, 0) / (parts.length || 1);
    if (!_state.scores) _state.scores = {};
    _state.scores.speakingSelfAvg = parseFloat(avgScore.toFixed(2));
    _state.scores.speakingScale = CambridgeSimulationData.calcSpeakingScore(avgScore);
    _state.phase = 'submitting';
    _saveResultAndShowResult();
  }

  // ── Save & Result ─────────────────────────────────────────────────────────
  function _saveResultAndShowResult() {
    const uid = _uid();
    const d = CambridgeSimulationData;
    const sc = _state.scores;

    const overallScale = d.calcOverallScale(sc.rueScale || 125, sc.writingScale || 125, sc.listenScale || 125, sc.speakingScale || 125);
    const gradeInfo = d.cambridgeScaleToGrade(overallScale);

    // XP & Badge
    if (uid) {
      XP.add(100);
      if (gradeInfo.pass) Badge.unlock('cambridge_ready');
    }

    // Save to sim_results
    if (uid) {
      const existing = Storage.getUser(uid, 'sim_results') || { results: [] };
      existing.results.unshift({
        testType: 'cambridge',
        date: new Date().toISOString().split('T')[0],
        level: _state.level,
        scores: {
          rue: sc.rueTotal || 0,
          rueMax: sc.rueMax || 31,
          rueScale: sc.rueScale || 0,
          writing: sc.writingSelfScore || 0,
          writingScale: sc.writingScale || 0,
          listening: sc.listenTotal || 0,
          listenMax: sc.listenMax || 18,
          listenScale: sc.listenScale || 0,
          speakingAvg: sc.speakingSelfAvg || 0,
          speakingScale: sc.speakingScale || 0
        },
        cambridgeScale: overallScale,
        grade: gradeInfo.grade,
        xpAwarded: true
      });
      if (existing.results.length > 5) existing.results = existing.results.slice(0, 5);
      Storage.setUser(uid, 'sim_results', existing);
    }

    ChallengeSystem.onQuizComplete(100, 100);

    // Redirect to result page with state
    sessionStorage.setItem('cambridge_sim_result', JSON.stringify({
      level: _state.level,
      scores: sc,
      overallScale,
      gradeInfo
    }));
    window.location.href = 'result.html';
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  return {
    init() {
      Router.guard();
      App.init('cambridge-simulation');
      _renderLevelSelect();
    }
  };

})();
