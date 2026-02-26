/**
 * EnglishPath — IELTS Simulation Module
 * Fase 13c-2: Simulasi Full Test (4 skill timed)
 * localStorage: ep_user_{id}_sim_results
 *
 * Flow:
 *   intro → listening (30 min) → reading (60 min) → writing (60 min) → speaking (14 min) → submit → result.html
 */
const IELTSSimulation = (() => {

  // ── State ─────────────────────────────────────────────────────
  let _state = {
    phase: 'intro',   // intro | listening | reading | writing | speaking | submitting
    listeningSection: 0,   // 0-3
    readingPassage:   0,   // 0-2
    writingTask:      0,   // 0-1
    speakingPart:     0,   // 0-2
    timerInterval:    null,
    secondsLeft:      0,
    answers:          {},  // {questionId: value}
    writingTexts:     { w_t1: '', w_t2: '' },
    writingRubric:    { w_t1: [0,0,0,0], w_t2: [0,0,0,0] }, // criterion bands
    speakingRubric:   [0, 0, 0, 0],   // Fluency, Vocab, Grammar, Pronunciation
    ttsPlaying:       false
  };

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
        _autoAdvance();
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
    el.classList.toggle('danger',  _state.secondsLeft <= 60);
  }

  function _autoAdvance() {
    App.showToast('Waktu habis! Melanjutkan ke bagian berikutnya...', 'info');
    setTimeout(_nextPhaseOrSection, 1500);
  }

  // ── Progress bar ─────────────────────────────────────────────
  function _updateProgress() {
    const phases = ['listening','reading','writing','speaking'];
    const phaseIdx = phases.indexOf(_state.phase);
    if (phaseIdx < 0) return;
    const totalSteps = 4;
    const pct = Math.round(((phaseIdx + 0.5) / totalSteps) * 100);
    const fill = document.getElementById('sim-progress-fill');
    const label = document.getElementById('sim-progress-label');
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = `${pct}% selesai`;
    // Steps
    const steps = ['step-listening','step-reading','step-writing','step-speaking'];
    steps.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('active','completed');
      if (i < phaseIdx) el.classList.add('completed');
      else if (i === phaseIdx) el.classList.add('active');
    });
  }

  // ── TTS ───────────────────────────────────────────────────────
  function _speak(text) {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-GB';
    utt.rate = 0.85;
    utt.onstart = () => { _state.ttsPlaying = true; };
    utt.onend   = () => { _state.ttsPlaying = false; _updateListenBtnState(); };
    utt.onerror = () => { _state.ttsPlaying = false; _updateListenBtnState(); };
    speechSynthesis.speak(utt);
  }

  function _stopSpeak() {
    if (window.speechSynthesis) speechSynthesis.cancel();
    _state.ttsPlaying = false;
    _updateListenBtnState();
  }

  function _updateListenBtnState() {
    const btn = document.getElementById('btn-listen');
    if (!btn) return;
    if (_state.ttsPlaying) {
      btn.innerHTML = '⏹ Stop Audio';
      btn.classList.add('playing');
    } else {
      btn.innerHTML = '▶ Putar Audio';
      btn.classList.remove('playing');
    }
  }

  // ── INTRO SCREEN ──────────────────────────────────────────────
  function _renderIntro() {
    _state.phase = 'intro';
    const body = document.getElementById('sim-body');
    if (!body) return;
    const sections = [
      { icon:'🎧', name:'Listening', time:'30 menit', desc:'4 section, 40 soal. MCQ & isi kosong.' },
      { icon:'📖', name:'Reading',   time:'60 menit', desc:'3 passage Academic, 40 soal. MCQ & T/F/NG.' },
      { icon:'✍️', name:'Writing',   time:'60 menit', desc:'Task 1 (grafik) + Task 2 (essay).' },
      { icon:'🎤', name:'Speaking',  time:'14 menit', desc:'Part 1, 2 (cue card), dan Part 3.' }
    ];
    body.innerHTML = `
      <div class="sim-intro">
        <div class="sim-intro-icon">🎯</div>
        <h1>IELTS Full Test Simulation</h1>
        <p>Simulasi ujian IELTS lengkap selama <strong>≈ 2 jam 44 menit</strong>. Siapkan tempat yang tenang.</p>
        <div class="sim-intro-cards">
          ${sections.map(s => `
            <div class="sim-section-card">
              <div class="sim-section-card-icon">${s.icon}</div>
              <h3>${s.name} — ${s.time}</h3>
              <p>${s.desc}</p>
            </div>
          `).join('')}
        </div>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
          <button class="btn-sim btn-sim-primary" onclick="IELTSSimulation.startListening()">Mulai Simulasi ▶</button>
          <a href="index.html" class="btn-sim btn-sim-secondary">Kembali ke IELTS Hub</a>
        </div>
        <p style="margin-top:1.5rem;font-size:0.82rem;color:var(--text-secondary);">
          📋 Jawabanmu akan disimpan secara otomatis. Jika browser ditutup, simulasi akan hilang.
        </p>
      </div>
    `;
    // Hide steps and timer in intro
    document.getElementById('sim-steps-wrap').style.display = 'none';
    document.getElementById('sim-timer-wrap').style.display = 'none';
  }

  // ── LISTENING ─────────────────────────────────────────────────
  function startListening() {
    _state.phase = 'listening';
    _state.listeningSection = 0;
    document.getElementById('sim-steps-wrap').style.display = '';
    document.getElementById('sim-timer-wrap').style.display = '';
    _updateProgress();
    _startTimer(30 * 60);
    _renderListeningSection();
  }

  function _renderListeningSection() {
    const data = IELTSSimulationData.getListening();
    const sec = data.sections[_state.listeningSection];
    const body = document.getElementById('sim-body');
    const isLast = _state.listeningSection === data.sections.length - 1;

    body.innerHTML = `
      <div class="sim-section-header">
        <div class="sim-section-badge listening">🎧 Listening — ${sec.title}</div>
        <h2>${sec.title}: ${sec.type === 'conversation' ? 'Conversation' : sec.type === 'monolog' ? 'Monologue' : sec.type === 'discussion' ? 'Discussion' : 'Lecture'}</h2>
        <p>${sec.description}</p>
      </div>

      <div class="sim-audio-panel">
        <div class="sim-audio-header">
          <div class="sim-audio-title">🎙 Audio — ${sec.title}</div>
          <div class="sim-audio-btns">
            <button class="btn-listen" id="btn-listen" onclick="IELTSSimulation.toggleAudio()">▶ Putar Audio</button>
            <button class="sim-sample-toggle" onclick="IELTSSimulation.toggleScript()">📄 Lihat Script</button>
          </div>
        </div>
        <div class="sim-audio-script" id="audio-script">${sec.audioScript.replace(/\n/g,'<br>')}</div>
      </div>

      <div class="sim-questions" id="sim-questions">
        ${sec.questions.map((q,i) => _renderQuestion(q, i + 1)).join('')}
      </div>

      <div class="sim-nav">
        <div class="sim-nav-info">Section ${_state.listeningSection + 1} dari ${data.sections.length}</div>
        <div class="sim-nav-btns">
          ${_state.listeningSection > 0 ? `<button class="btn-sim btn-sim-secondary" onclick="IELTSSimulation.prevListeningSection()">← Sebelumnya</button>` : ''}
          <button class="btn-sim btn-sim-primary" onclick="IELTSSimulation.nextListeningSection()">
            ${isLast ? 'Selesai Listening ✓' : 'Section Berikutnya →'}
          </button>
        </div>
      </div>
    `;
    _restoreAnswers(sec.questions);
  }

  function _renderQuestion(q, num) {
    const saved = _state.answers[q.id];
    if (q.type === 'mcq' || q.type === 'tfng') {
      const labels = q.type === 'tfng' ? ['True','False','Not Given'] : q.options;
      return `
        <div class="sim-question">
          <div class="sim-question-num">Soal ${num}</div>
          <div class="sim-question-text">${q.text}</div>
          <div class="sim-options">
            ${labels.map((opt, i) => `
              <label class="sim-option ${saved === i ? 'selected' : ''}" onclick="IELTSSimulation.selectMCQ('${q.id}', ${i}, this)">
                <input type="radio" name="${q.id}" value="${i}" ${saved === i ? 'checked' : ''}>
                <span>${opt}</span>
              </label>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      return `
        <div class="sim-question">
          <div class="sim-question-num">Soal ${num}</div>
          <div class="sim-question-text">${q.text}</div>
          <input type="text" class="sim-fill-input" id="fill_${q.id}"
            placeholder="Ketik jawaban..."
            value="${saved || ''}"
            oninput="IELTSSimulation.saveFill('${q.id}', this.value)">
        </div>
      `;
    }
  }

  function _restoreAnswers(questions) {
    questions.forEach(q => {
      if (q.type === 'form') {
        const el = document.getElementById(`fill_${q.id}`);
        if (el && _state.answers[q.id]) el.value = _state.answers[q.id];
      }
    });
  }

  function selectMCQ(qId, idx, labelEl) {
    _state.answers[qId] = idx;
    // Update UI
    const parent = labelEl.closest('.sim-options');
    if (parent) parent.querySelectorAll('.sim-option').forEach(el => el.classList.remove('selected'));
    labelEl.classList.add('selected');
    labelEl.querySelector('input').checked = true;
  }

  function saveFill(qId, value) {
    _state.answers[qId] = value;
  }

  function toggleAudio() {
    const sec = IELTSSimulationData.getListening().sections[_state.listeningSection];
    if (_state.ttsPlaying) {
      _stopSpeak();
    } else {
      _speak(sec.audioScript);
      _updateListenBtnState();
    }
  }

  function toggleScript() {
    const el = document.getElementById('audio-script');
    if (el) el.classList.toggle('visible');
  }

  function nextListeningSection() {
    _stopSpeak();
    const data = IELTSSimulationData.getListening();
    if (_state.listeningSection < data.sections.length - 1) {
      _state.listeningSection++;
      _renderListeningSection();
    } else {
      _state.phase = 'reading';
      _state.readingPassage = 0;
      _clearTimer();
      _updateProgress();
      _startTimer(60 * 60);
      _renderReadingPassage();
    }
  }

  function prevListeningSection() {
    _stopSpeak();
    if (_state.listeningSection > 0) {
      _state.listeningSection--;
      _renderListeningSection();
    }
  }

  // ── READING ───────────────────────────────────────────────────
  function _renderReadingPassage() {
    const data = IELTSSimulationData.getReading();
    const passage = data.passages[_state.readingPassage];
    const body = document.getElementById('sim-body');
    const isLast = _state.readingPassage === data.passages.length - 1;

    body.innerHTML = `
      <div class="sim-section-header">
        <div class="sim-section-badge reading">📖 Reading — Passage ${_state.readingPassage + 1}</div>
        <h2>${passage.title}</h2>
        <p>${passage.type} Reading</p>
      </div>

      <div class="sim-passage-wrap">
        <div class="sim-passage">
          <h4>📄 ${passage.title}</h4>
          ${passage.text.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>
        <div>
          <div class="sim-questions" id="sim-questions">
            ${passage.questions.map((q,i) => _renderQuestion(q, i+1)).join('')}
          </div>
        </div>
      </div>

      <div class="sim-nav">
        <div class="sim-nav-info">Passage ${_state.readingPassage + 1} dari ${data.passages.length}</div>
        <div class="sim-nav-btns">
          ${_state.readingPassage > 0 ? `<button class="btn-sim btn-sim-secondary" onclick="IELTSSimulation.prevPassage()">← Sebelumnya</button>` : ''}
          <button class="btn-sim btn-sim-primary" onclick="IELTSSimulation.nextPassage()">
            ${isLast ? 'Selesai Reading ✓' : 'Passage Berikutnya →'}
          </button>
        </div>
      </div>
    `;
    _restoreAnswers(passage.questions);
  }

  function nextPassage() {
    const data = IELTSSimulationData.getReading();
    if (_state.readingPassage < data.passages.length - 1) {
      _state.readingPassage++;
      _renderReadingPassage();
    } else {
      _state.phase = 'writing';
      _state.writingTask = 0;
      _clearTimer();
      _updateProgress();
      _startTimer(60 * 60);
      _renderWritingTask();
    }
  }

  function prevPassage() {
    if (_state.readingPassage > 0) {
      _state.readingPassage--;
      _renderReadingPassage();
    }
  }

  // ── WRITING ───────────────────────────────────────────────────
  function _renderWritingTask() {
    const data = IELTSSimulationData.getWriting();
    const task = data.tasks[_state.writingTask];
    const body = document.getElementById('sim-body');
    const isLast = _state.writingTask === data.tasks.length - 1;
    const savedText = _state.writingTexts[task.id] || '';
    const savedRubric = _state.writingRubric[task.id] || [0,0,0,0];
    const bands = [1,2,3,4,5,6,7,8,9];

    body.innerHTML = `
      <div class="sim-section-header">
        <div class="sim-section-badge writing">✍️ Writing — Task ${_state.writingTask + 1}</div>
        <h2>${task.title}</h2>
        <p>Direkomendasikan: ${task.timeRecommended} menit · Minimum ${task.minWords} kata</p>
      </div>

      <div class="sim-writing-wrap">
        <div class="sim-writing-prompt">
          <h4>📋 Soal</h4>
          <p>${task.prompt}</p>
        </div>

        <div class="sim-textarea-wrap">
          <textarea class="sim-textarea" id="writing-area" placeholder="Mulai menulis jawaban Anda di sini..."
            oninput="IELTSSimulation.onWritingInput('${task.id}', this.value)">${savedText}</textarea>
          <div class="sim-wordcount">
            Jumlah kata: <span class="sim-wordcount-num" id="wc-num">0</span>
            <span style="color:var(--text-secondary)">/ ${task.minWords} min</span>
          </div>
        </div>

        <div class="sim-writing-rubric">
          <h4>📊 Self-Assessment Rubrik (setelah menulis)</h4>
          <div class="sim-rubric-rows">
            ${task.rubric.map((r, ri) => `
              <div class="sim-rubric-row">
                <div class="sim-rubric-label">
                  <strong>${r.criterion}</strong>
                  ${r.desc}
                </div>
                <div class="sim-rubric-band-select">
                  ${bands.map(b => `
                    <button class="sim-band-btn ${savedRubric[ri] === b ? 'selected' : ''}"
                      onclick="IELTSSimulation.setWritingBand('${task.id}', ${ri}, ${b}, this)">
                      ${b}
                    </button>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
          <button class="sim-sample-toggle" onclick="IELTSSimulation.toggleSample('writing-sample')">
            💡 Lihat Contoh Jawaban
          </button>
        </div>
        <div class="sim-sample-answer" id="writing-sample">${task.sampleAnswer}</div>
      </div>

      <div class="sim-nav">
        <div class="sim-nav-info">Task ${_state.writingTask + 1} dari ${data.tasks.length}</div>
        <div class="sim-nav-btns">
          ${_state.writingTask > 0 ? `<button class="btn-sim btn-sim-secondary" onclick="IELTSSimulation.prevWritingTask()">← Sebelumnya</button>` : ''}
          <button class="btn-sim btn-sim-primary" onclick="IELTSSimulation.nextWritingTask()">
            ${isLast ? 'Selesai Writing ✓' : 'Task Berikutnya →'}
          </button>
        </div>
      </div>
    `;
    _updateWordCount(savedText, task.minWords);
  }

  function onWritingInput(taskId, value) {
    _state.writingTexts[taskId] = value;
    const task = IELTSSimulationData.getWriting().tasks.find(t => t.id === taskId);
    if (task) _updateWordCount(value, task.minWords);
  }

  function _updateWordCount(text, minWords) {
    const el = document.getElementById('wc-num');
    if (!el) return;
    const count = text.trim() ? text.trim().split(/\s+/).length : 0;
    el.textContent = count;
    el.classList.toggle('ok', count >= minWords);
    el.classList.toggle('warn', count > 0 && count < minWords);
  }

  function setWritingBand(taskId, critIdx, band, btn) {
    if (!_state.writingRubric[taskId]) _state.writingRubric[taskId] = [0,0,0,0];
    _state.writingRubric[taskId][critIdx] = band;
    // Update UI siblings
    const row = btn.closest('.sim-rubric-band-select');
    if (row) row.querySelectorAll('.sim-band-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }

  function toggleSample(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('visible');
  }

  function nextWritingTask() {
    const data = IELTSSimulationData.getWriting();
    if (_state.writingTask < data.tasks.length - 1) {
      _state.writingTask++;
      _renderWritingTask();
    } else {
      _state.phase = 'speaking';
      _state.speakingPart = 0;
      _clearTimer();
      _updateProgress();
      _startTimer(14 * 60);
      _renderSpeakingPart();
    }
  }

  function prevWritingTask() {
    if (_state.writingTask > 0) {
      _state.writingTask--;
      _renderWritingTask();
    }
  }

  // ── SPEAKING ──────────────────────────────────────────────────
  function _renderSpeakingPart() {
    const data = IELTSSimulationData.getSpeaking();
    const part = data.parts[_state.speakingPart];
    const body = document.getElementById('sim-body');
    const isLast = _state.speakingPart === data.parts.length - 1;

    let content = '';

    if (part.part === 1 || part.part === 3) {
      content = `
        <div class="sim-speaking-part-header">
          <h3>${part.title}</h3>
          <p>${part.description}</p>
        </div>
        <div class="sim-speaking-questions">
          ${part.questions.map((q,i) => `
            <div class="sim-speak-q">
              <div class="sim-speak-q-text"><strong>Q${i+1}.</strong> ${q.text}</div>
              <button class="btn-speak-q" onclick="IELTSSimulation.speakQuestion('${q.id.replace(/'/g,"\\'")}', \`${q.text.replace(/`/g,'\\`')}\`)">🔊 Dengar</button>
            </div>
            ${q.model ? `<div style="margin:0 0 0.5rem 0;display:none;" id="model_${q.id}"><div class="sim-sample-answer visible" style="margin-top:0;">${q.model}</div></div>` : ''}
          `).join('')}
        </div>
      `;
    } else if (part.part === 2) {
      const cc = part.cueCard;
      content = `
        <div class="sim-speaking-part-header">
          <h3>${part.title}</h3>
          <p>${part.description}</p>
        </div>
        <div class="sim-cue-card">
          <h4>Cue Card</h4>
          <div class="cue-topic">${cc.topic}</div>
          <ul>${cc.points.map(p => `<li>${p}</li>`).join('')}</ul>
          <div style="color:var(--text-secondary);font-size:0.85rem;">Follow-up: ${cc.followUp}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1rem 0;">
          <div style="text-align:center;">
            <button class="btn-sim btn-sim-secondary" id="btn-prep" onclick="IELTSSimulation.startPrepTimer()">⏱ Mulai Prep (1 menit)</button>
            <div style="font-size:1.5rem;font-weight:700;color:var(--primary);margin-top:0.5rem;" id="prep-countdown"></div>
          </div>
          <div style="text-align:center;">
            <button class="btn-sim btn-sim-secondary" id="btn-speak-timer" onclick="IELTSSimulation.startSpeakTimer()">🎤 Mulai Bicara (2 menit)</button>
            <div style="font-size:1.5rem;font-weight:700;color:var(--primary);margin-top:0.5rem;" id="speak-countdown"></div>
          </div>
        </div>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
          <button class="btn-speak-q" onclick="IELTSSimulation.speakQuestion('cue_topic', \`${cc.topic.replace(/`/g,'\\`')}\`)">🔊 Dengar Topik</button>
          <button class="sim-sample-toggle" onclick="IELTSSimulation.toggleSample('p2-model')">💡 Contoh Jawaban</button>
        </div>
        <div class="sim-sample-answer" id="p2-model">${cc.modelAnswer}</div>
      `;
    }

    // Rubrik only at last speaking part
    const rubrikSection = isLast ? `
      <div class="sim-self-assess">
        <h4>📊 Self-Assessment Speaking (Overall)</h4>
        <div class="sim-rubric-rows">
          ${['Fluency & Coherence', 'Lexical Resource', 'Grammatical Range & Accuracy', 'Pronunciation'].map((label, i) => `
            <div class="sim-rubric-row">
              <div class="sim-rubric-label"><strong>${label}</strong></div>
              <div class="sim-rubric-band-select">
                ${[1,2,3,4,5,6,7,8,9].map(b => `
                  <button class="sim-band-btn ${_state.speakingRubric[i] === b ? 'selected' : ''}"
                    onclick="IELTSSimulation.setSpeakingBand(${i}, ${b}, this)">${b}</button>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    body.innerHTML = `
      <div class="sim-section-header">
        <div class="sim-section-badge speaking">🎤 Speaking</div>
        <h2>Part ${part.part}</h2>
        <p>${part.description}</p>
      </div>
      <div class="sim-speaking-wrap">
        ${content}
        ${rubrikSection}
      </div>
      <div class="sim-nav">
        <div class="sim-nav-info">Part ${_state.speakingPart + 1} dari ${data.parts.length}</div>
        <div class="sim-nav-btns">
          ${_state.speakingPart > 0 ? `<button class="btn-sim btn-sim-secondary" onclick="IELTSSimulation.prevSpeakingPart()">← Sebelumnya</button>` : ''}
          <button class="btn-sim btn-sim-primary" onclick="IELTSSimulation.nextSpeakingPart()">
            ${isLast ? '✅ Selesai & Hitung Skor' : 'Part Berikutnya →'}
          </button>
        </div>
      </div>
    `;
  }

  let _partTimerInterval = null;

  function startPrepTimer() {
    const btn = document.getElementById('btn-prep');
    const cd  = document.getElementById('prep-countdown');
    if (!btn || !cd) return;
    btn.disabled = true;
    let sec = 60;
    cd.textContent = '1:00';
    _partTimerInterval = setInterval(() => {
      sec--;
      const m = Math.floor(sec/60), s = sec%60;
      cd.textContent = `${m}:${String(s).padStart(2,'0')}`;
      if (sec <= 0) {
        clearInterval(_partTimerInterval);
        cd.textContent = '⏰ Mulai bicara!';
        App.showToast('Waktu persiapan selesai! Mulai bicara.', 'info');
      }
    }, 1000);
  }

  function startSpeakTimer() {
    const btn = document.getElementById('btn-speak-timer');
    const cd  = document.getElementById('speak-countdown');
    if (!btn || !cd) return;
    btn.disabled = true;
    let sec = 120;
    cd.textContent = '2:00';
    _partTimerInterval = setInterval(() => {
      sec--;
      const m = Math.floor(sec/60), s = sec%60;
      cd.textContent = `${m}:${String(s).padStart(2,'0')}`;
      if (sec <= 0) {
        clearInterval(_partTimerInterval);
        cd.textContent = '⏰ Waktu habis!';
        App.showToast('Waktu bicara selesai!', 'info');
      }
    }, 1000);
  }

  function speakQuestion(id, text) {
    _speak(text);
  }

  function setSpeakingBand(critIdx, band, btn) {
    _state.speakingRubric[critIdx] = band;
    const row = btn.closest('.sim-rubric-band-select');
    if (row) row.querySelectorAll('.sim-band-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }

  function nextSpeakingPart() {
    const data = IELTSSimulationData.getSpeaking();
    if (_state.speakingPart < data.parts.length - 1) {
      _state.speakingPart++;
      _renderSpeakingPart();
    } else {
      _submitSimulation();
    }
  }

  function prevSpeakingPart() {
    if (_state.speakingPart > 0) {
      _state.speakingPart--;
      _renderSpeakingPart();
    }
  }

  // ── Auto-advance from timer ──────────────────────────────────
  function _nextPhaseOrSection() {
    if (_state.phase === 'listening') nextListeningSection();
    else if (_state.phase === 'reading') nextPassage();
    else if (_state.phase === 'writing') nextWritingTask();
    else if (_state.phase === 'speaking') nextSpeakingPart();
  }

  // ── SUBMIT & CALCULATE ────────────────────────────────────────
  function _submitSimulation() {
    _clearTimer();
    _stopSpeak();

    const body = document.getElementById('sim-body');
    body.innerHTML = `
      <div class="sim-loading">
        <div class="sim-loading-spinner"></div>
        <h3>Menghitung skor IELTS...</h3>
        <p>Harap tunggu sebentar.</p>
      </div>
    `;

    setTimeout(() => {
      const result = _calculateResult();
      _saveResult(result);
      // Navigate to result page
      window.location.href = 'result.html';
    }, 2000);
  }

  function _calculateResult() {
    const listenData = IELTSSimulationData.getListening();
    const readData   = IELTSSimulationData.getReading();

    // Listening: count correct
    let listenCorrect = 0;
    let listenTotal   = 0;
    listenData.sections.forEach(sec => {
      sec.questions.forEach(q => {
        listenTotal++;
        const saved = _state.answers[q.id];
        if (q.type === 'mcq' || q.type === 'tfng') {
          if (saved === q.answer) listenCorrect++;
        } else {
          // form — case-insensitive trim match
          const ans = (saved || '').trim().toLowerCase();
          const exp = (q.answer || '').trim().toLowerCase();
          if (ans === exp || ans.includes(exp) || exp.includes(ans)) listenCorrect++;
        }
      });
    });

    // Reading: count correct
    let readCorrect = 0;
    let readTotal   = 0;
    readData.passages.forEach(p => {
      p.questions.forEach(q => {
        readTotal++;
        const saved = _state.answers[q.id];
        if (q.type === 'mcq' || q.type === 'tfng') {
          if (saved === q.answer) readCorrect++;
        } else {
          const ans = (saved || '').trim().toLowerCase();
          const exp = (q.answer || '').trim().toLowerCase();
          if (ans === exp) readCorrect++;
        }
      });
    });

    // Writing: avg of rubric bands, or 5.0 if not set
    const wr1 = _state.writingRubric['w_t1'] || [0,0,0,0];
    const wr2 = _state.writingRubric['w_t2'] || [0,0,0,0];
    const allWriting = [...wr1, ...wr2];
    const writingSet = allWriting.filter(b => b > 0);
    const writingBand = writingSet.length > 0
      ? Math.round((writingSet.reduce((a,b)=>a+b,0) / writingSet.length) * 2) / 2
      : 5.0;

    // Speaking: avg of 4 rubric criteria
    const speakSet = _state.speakingRubric.filter(b => b > 0);
    const speakingBand = speakSet.length > 0
      ? Math.round((speakSet.reduce((a,b)=>a+b,0) / speakSet.length) * 2) / 2
      : 5.0;

    const listeningBand = IELTSSimulationData.rawToListeningBand(listenCorrect);
    const readingBand   = IELTSSimulationData.rawToReadingBand(readCorrect);
    const overallBand   = IELTSSimulationData.calcOverallBand(listeningBand, readingBand, writingBand, speakingBand);

    return {
      listening: listeningBand,
      reading:   readingBand,
      writing:   writingBand,
      speaking:  speakingBand,
      overall:   overallBand,
      raw: {
        listeningCorrect: listenCorrect,
        listeningTotal:   listenTotal,
        readingCorrect:   readCorrect,
        readingTotal:     readTotal
      },
      date: new Date().toISOString().split('T')[0],
      testType: 'IELTS'
    };
  }

  function _saveResult(result) {
    const uid = _uid();
    if (!uid) return;

    // Save to sim_results (up to 10 entries)
    const existing = Storage.getUser(uid, 'sim_results') || [];
    existing.unshift(result);
    if (existing.length > 10) existing.pop();
    Storage.setUser(uid, 'sim_results', existing);

    // Award XP
    XPSystem.addXP(100, 'Simulasi IELTS selesai', uid);

    // Award badge if band >= 6.0
    if (result.overall >= 6.0) {
      const badges = Storage.getUser(uid, 'badges') || [];
      if (!badges.includes('ielts_ready')) {
        badges.push('ielts_ready');
        Storage.setUser(uid, 'badges', badges);
      }
    }

    // Challenge
    if (window.ChallengeSystem) ChallengeSystem.onModuleVisit('ielts-simulation');
  }

  // ── INIT ──────────────────────────────────────────────────────
  function init() {
    Router.guard();
    App.init('ielts-simulation');
    _renderIntro();
  }

  return {
    init,
    startListening,
    toggleAudio,
    toggleScript,
    selectMCQ,
    saveFill,
    nextListeningSection,
    prevListeningSection,
    nextPassage,
    prevPassage,
    onWritingInput,
    setWritingBand,
    toggleSample,
    nextWritingTask,
    prevWritingTask,
    speakQuestion,
    setSpeakingBand,
    startPrepTimer,
    startSpeakTimer,
    nextSpeakingPart,
    prevSpeakingPart
  };
})();
