/**
 * EnglishPath — IELTS Listening Module
 * Fase 13b: Practice per Skill — Listening
 * localStorage: ep_user_{id}_ielts_listening
 */
const IELTSListening = (() => {

  // ── State ──────────────────────────────────────────────
  let _state = {
    view: 'menu',            // menu | practice | result
    sectionId: null,
    section: null,
    answers: {},
    submitted: false,
    audioIndex: -1,          // current audio line
    isPlaying: false,
    speechQueue: [],
    currentUtterance: null,
    playCount: 0             // IELTS: played only once
  };

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  function _getKey() { return 'ielts_listening'; }

  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, _getKey()) || {};
  }

  function _saveResult(sectionId, score, total, pct) {
    const uid = _uid();
    if (!uid) return;
    const data = _loadData();
    if (!data.results) data.results = {};
    const prev = data.results[sectionId] || { best: 0, attempts: 0 };
    data.results[sectionId] = {
      best: Math.max(prev.best, pct),
      attempts: prev.attempts + 1,
      lastScore: pct,
      lastDate: new Date().toISOString().split('T')[0]
    };
    if (!data.totalAttempts) data.totalAttempts = 0;
    data.totalAttempts++;
    Storage.setUser(uid, _getKey(), data);
  }

  // ── TTS Helpers ────────────────────────────────────────
  function _speak(text, rate, onEnd) {
    if (!window.speechSynthesis) { if (onEnd) onEnd(); return; }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-GB';
    utt.rate = rate || 0.88;
    utt.pitch = 1;
    if (onEnd) utt.onend = onEnd;
    utt.onerror = () => { if (onEnd) onEnd(); };
    _state.currentUtterance = utt;
    window.speechSynthesis.speak(utt);
  }

  function _stopSpeech() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    _state.isPlaying = false;
    _state.audioIndex = -1;
    _updateAudioUI();
  }

  function _playAudioSequence(startIdx) {
    if (_state.submitted) return;
    const sec = _state.section;
    if (startIdx >= sec.audio.length) {
      _state.isPlaying = false;
      _state.audioIndex = -1;
      _updateAudioUI();
      App.showToast('Audio selesai diputar. Jawab pertanyaan di bawah.', 'success');
      return;
    }
    _state.isPlaying = true;
    _state.audioIndex = startIdx;
    _updateAudioUI();

    const line = sec.audio[startIdx];
    const speakerName = sec.speakers[line.speaker] || '';
    const textToSpeak = sec.speakers.length > 1
      ? `${speakerName} says: ${line.text}`
      : line.text;

    _speak(textToSpeak, sec.ttsRate, () => {
      setTimeout(() => _playAudioSequence(startIdx + 1), 400);
    });
  }

  function _updateAudioUI() {
    const playBtn = document.getElementById('play-audio-btn');
    const stopBtn = document.getElementById('stop-audio-btn');
    const statusEl = document.getElementById('audio-status');
    if (!playBtn) return;

    if (_state.isPlaying) {
      playBtn.disabled = true;
      playBtn.textContent = '▶ Memutar...';
      if (stopBtn) stopBtn.disabled = false;
      if (statusEl) statusEl.textContent = `Baris ${_state.audioIndex + 1} / ${_state.section.audio.length}`;
    } else {
      playBtn.disabled = _state.playCount >= 2;
      playBtn.textContent = _state.playCount >= 2 ? '▶ Audio sudah diputar 2x' : `▶ Putar Audio (${2 - _state.playCount}x tersisa)`;
      if (stopBtn) stopBtn.disabled = true;
      if (statusEl) statusEl.textContent = _state.playCount > 0 ? 'Audio selesai' : 'Siap diputar';
    }
  }

  // ── Render Menu ────────────────────────────────────────
  function _renderMenu() {
    _state.view = 'menu';
    _stopSpeech();
    const data = _loadData();
    const sections = IELTSListeningData.getAll();

    const cards = sections.map(sec => {
      const res = data.results && data.results[sec.id];
      const bestBadge = res
        ? `<span class="ielts-score-badge ${res.best >= 70 ? 'badge-good' : 'badge-fair'}">${res.best}%</span>`
        : '<span class="ielts-score-badge badge-new">Baru</span>';
      const typeIcon = { conversation: '🗣️', monologue: '📢', lecture: '🎓' };
      return `
        <div class="ielts-practice-card listening-card">
          <div class="ipc-header">
            <span class="ipc-section-num">Section ${sec.section}</span>
            ${bestBadge}
          </div>
          <div class="ipc-type-icon">${typeIcon[sec.type] || '🎧'}</div>
          <div class="ipc-title">${sec.title}</div>
          <div class="ipc-desc">${sec.description}</div>
          <div class="ipc-meta">
            <span>🎧 ${sec.audio.length} baris</span>
            <span>❓ ${sec.questions.length} soal</span>
          </div>
          ${res ? `<div class="ipc-attempts">${res.attempts}x dicoba</div>` : ''}
          <button class="btn-primary btn-sm" data-section="${sec.id}">Mulai Section ${sec.section} →</button>
        </div>`;
    }).join('');

    document.getElementById('listening-content').innerHTML = `
      <div class="ielts-section-header">
        <h2 class="ielts-section-title">🎧 IELTS Listening Practice</h2>
        <p class="ielts-section-sub">Dengarkan audio sekali (seperti tes asli), lalu jawab pertanyaan.</p>
      </div>

      <div class="ielts-tip-bar">
        💡 <strong>Tips:</strong> Baca soal SEBELUM memutar audio. Di tes asli, audio hanya diputar sekali. Latih konsentrasi penuh!
      </div>

      <div class="ielts-sections-grid">${cards}</div>
    `;

    document.querySelectorAll('[data-section]').forEach(btn => {
      btn.addEventListener('click', () => _startPractice(btn.dataset.section));
    });
  }

  // ── Render Practice ────────────────────────────────────
  function _startPractice(sectionId) {
    _state.sectionId = sectionId;
    _state.section = IELTSListeningData.getById(sectionId);
    _state.answers = {};
    _state.submitted = false;
    _state.audioIndex = -1;
    _state.isPlaying = false;
    _state.playCount = 0;
    _stopSpeech();
    _renderPractice();
  }

  function _renderPractice() {
    const sec = _state.section;
    const typeLabel = { conversation: 'Percakapan', monologue: 'Monolog', lecture: 'Kuliah' };
    const speakersHtml = sec.speakers.map((sp, i) =>
      `<span class="speaker-badge">🎙️ ${sp}</span>`).join('');

    const qHtml = sec.questions.map((q, i) => {
      if (q.type === 'form') return _renderForm(q, i);
      if (q.type === 'mcq') return _renderMCQ(q, i);
      return '';
    }).join('');

    document.getElementById('listening-content').innerHTML = `
      <div class="listening-practice-wrap">

        <!-- Audio Player -->
        <div class="listening-audio-panel">
          <div class="lap-header">
            <span class="lap-section">Section ${sec.section}</span>
            <span class="lap-type">${typeLabel[sec.type] || 'Audio'}</span>
          </div>
          <div class="lap-title">${sec.title}</div>
          <div class="lap-desc">${sec.description}</div>
          <div class="lap-speakers">${speakersHtml}</div>

          <div class="lap-controls">
            <button id="play-audio-btn" class="btn-primary btn-audio">▶ Putar Audio (2x tersisa)</button>
            <button id="stop-audio-btn" class="btn-outline btn-audio" disabled>⏹ Stop</button>
          </div>
          <div id="audio-status" class="audio-status">Siap diputar — baca soal dulu!</div>

          <div class="audio-transcript-section">
            <button class="transcript-toggle-btn" id="transcript-toggle">📝 Lihat Transkrip (setelah selesai)</button>
            <div id="audio-transcript" class="audio-transcript hidden">
              ${sec.audio.map((line, i) => `
                <div class="transcript-line ${i === _state.audioIndex ? 'active' : ''}">
                  <span class="transcript-speaker">${sec.speakers[line.speaker] || ''}:</span>
                  <span class="transcript-text">${line.text}</span>
                </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Questions -->
        <div class="listening-questions-panel">
          <div class="listening-q-header">
            <div class="listening-q-title">Pertanyaan (${sec.questions.length} soal)</div>
            <div id="listening-q-progress" class="reading-q-progress">0 / ${sec.questions.length} dijawab</div>
          </div>
          <div class="listening-questions-list">
            ${qHtml}
          </div>
          <div class="reading-actions">
            <button id="submit-listening-btn" class="btn-primary">Kumpulkan Jawaban</button>
            <button id="back-listening-btn" class="btn-outline">← Kembali</button>
          </div>
        </div>

      </div>
    `;

    // Audio controls
    document.getElementById('play-audio-btn').addEventListener('click', () => {
      if (_state.playCount >= 2 || _state.isPlaying) return;
      _state.playCount++;
      _playAudioSequence(0);
    });
    document.getElementById('stop-audio-btn').addEventListener('click', _stopSpeech);
    document.getElementById('transcript-toggle').addEventListener('click', () => {
      const t = document.getElementById('audio-transcript');
      if (!_state.submitted && _state.playCount === 0) {
        App.showToast('Putar audio dulu sebelum melihat transkrip!', 'warning');
        return;
      }
      t.classList.toggle('hidden');
      document.getElementById('transcript-toggle').textContent =
        t.classList.contains('hidden') ? '📝 Lihat Transkrip' : '📝 Sembunyikan Transkrip';
    });
    document.getElementById('submit-listening-btn').addEventListener('click', _submitAnswers);
    document.getElementById('back-listening-btn').addEventListener('click', () => {
      _stopSpeech();
      _renderMenu();
    });

    // Answer events
    document.querySelectorAll('.listening-mcq-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const b = e.currentTarget;
        const qid = b.dataset.qid;
        const idx = parseInt(b.dataset.idx);
        _state.answers[qid] = idx;
        document.querySelectorAll(`[data-qid="${qid}"].listening-mcq-option`).forEach(x => x.classList.remove('selected'));
        b.classList.add('selected');
        _updateAnswerProgress();
      });
    });
    document.querySelectorAll('.listening-form-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        _state.answers[e.target.dataset.qid] = e.target.value.trim();
        _updateAnswerProgress();
      });
    });
  }

  function _renderMCQ(q, i) {
    const opts = q.options.map((opt, idx) => `
      <button class="listening-mcq-option reading-mcq-option" data-qid="${q.id}" data-idx="${idx}">
        <span class="mcq-opt-label">${String.fromCharCode(65+idx)}</span>
        <span class="mcq-opt-text">${opt}</span>
      </button>`).join('');
    return `
      <div class="reading-question mcq-question" id="lq-${q.id}">
        <div class="rq-number">Q${i+1}</div>
        <div class="rq-text">${q.question}</div>
        <div class="reading-mcq-options">${opts}</div>
      </div>`;
  }

  function _renderForm(q, i) {
    return `
      <div class="reading-question form-question" id="lq-${q.id}">
        <div class="rq-number">Q${i+1}</div>
        <div class="rq-text">${q.label}</div>
        <div class="form-hint">${q.hint}</div>
        <input type="text" class="listening-form-input form-answer-input"
          data-qid="${q.id}"
          placeholder="Tulis jawabanmu..."
          autocomplete="off">
      </div>`;
  }

  function _updateAnswerProgress() {
    const el = document.getElementById('listening-q-progress');
    if (!el) return;
    const total = _state.section.questions.length;
    const answered = Object.keys(_state.answers).filter(k => _state.answers[k] !== '' && _state.answers[k] !== undefined).length;
    el.textContent = `${answered} / ${total} dijawab`;
    el.className = 'reading-q-progress' + (answered === total ? ' all-answered' : '');
  }

  // ── Submit & Result ────────────────────────────────────
  function _submitAnswers() {
    if (_state.submitted) return;
    _stopSpeech();
    _state.submitted = true;

    let score = 0;
    _state.section.questions.forEach(q => {
      const ans = _state.answers[q.id];
      let correct = false;
      if (q.type === 'mcq') {
        correct = ans === q.answer;
      } else if (q.type === 'form') {
        const expected = q.answer.toLowerCase().trim();
        const given = (ans || '').toLowerCase().trim();
        correct = given === expected || given.includes(expected.split(' ')[0].replace(/[^a-z]/g,''));
      }
      if (correct) score++;
    });

    const total = _state.section.questions.length;
    const pct = Math.round((score / total) * 100);
    _saveResult(_state.sectionId, score, total, pct);

    const uid = _uid();
    if (uid) {
      const xp = score * 3 + (pct === 100 ? 20 : 0);
      XPSystem.addXP(xp, `IELTS Listening: ${_state.section.title}`);
      ChallengeSystem.onQuizComplete(_state.sectionId);
    }

    _renderResult(score, total, pct);
  }

  function _renderResult(score, total, pct) {
    const sec = _state.section;
    const band = _scoreToBand(pct);
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '💪';

    const reviewHtml = sec.questions.map((q, i) => {
      const userAns = _state.answers[q.id];
      let isCorrect = false;
      let userDisplay = '';
      let correctDisplay = '';

      if (q.type === 'mcq') {
        isCorrect = userAns === q.answer;
        userDisplay = userAns !== undefined ? q.options[userAns] : 'Tidak dijawab';
        correctDisplay = q.options[q.answer];
      } else {
        const expected = (q.answer || '').toLowerCase().trim();
        const given = (userAns || '').toLowerCase().trim();
        isCorrect = given === expected || given.includes(expected.split(' ')[0].replace(/[^a-z]/g,''));
        userDisplay = userAns || 'Tidak dijawab';
        correctDisplay = q.answer;
      }

      return `
        <div class="review-item ${isCorrect ? 'correct' : 'wrong'}">
          <div class="review-q-header">
            <span class="review-num">Q${i+1}</span>
            <span class="review-status">${isCorrect ? '✓ Benar' : '✗ Salah'}</span>
          </div>
          <div class="review-q-text">${q.label || q.question}</div>
          ${!isCorrect ? `
            <div class="review-answers">
              <div class="your-answer">Jawabanmu: <strong>${userDisplay}</strong></div>
              <div class="correct-answer">Jawaban benar: <strong>${correctDisplay}</strong></div>
            </div>
          ` : ''}
        </div>`;
    }).join('');

    document.getElementById('listening-content').innerHTML = `
      <div class="ielts-result-wrap">
        <div class="ielts-result-hero">
          <div class="result-emoji">${emoji}</div>
          <div class="result-title">Section Selesai!</div>
          <div class="result-passage-name">${sec.title}</div>
          <div class="result-score-big">${score} / ${total}</div>
          <div class="result-pct">${pct}%</div>
          <div class="result-band-estimate">Estimasi Band: <strong>${band}</strong></div>
        </div>

        <div class="ielts-result-feedback">
          ${_getFeedback(pct)}
        </div>

        <div class="result-review-section">
          <h3 class="review-section-title">📋 Review Jawaban</h3>
          ${reviewHtml}
        </div>

        <div class="result-actions">
          <button class="btn-primary" id="retry-section-btn">🔄 Coba Lagi</button>
          <button class="btn-outline" id="back-to-menu-btn">← Pilih Section Lain</button>
        </div>
      </div>
    `;

    document.getElementById('retry-section-btn').addEventListener('click', () => _startPractice(_state.sectionId));
    document.getElementById('back-to-menu-btn').addEventListener('click', _renderMenu);
  }

  function _scoreToBand(pct) {
    if (pct >= 90) return '8.0–9.0';
    if (pct >= 80) return '7.0–7.5';
    if (pct >= 70) return '6.0–6.5';
    if (pct >= 60) return '5.0–5.5';
    if (pct >= 50) return '4.0–4.5';
    return '3.5 ke bawah';
  }

  function _getFeedback(pct) {
    if (pct >= 80) return `<p class="feedback-good">🌟 Luar biasa! Kemampuan listening kamu sudah sangat baik. Terus latih concentration dan note-taking.</p>`;
    if (pct >= 60) return `<p class="feedback-ok">👍 Cukup baik. Fokus pada soal form completion — perhatikan ejaan dan angka. Latih mendengar dengan satu kali play.</p>`;
    return `<p class="feedback-low">💪 Terus berlatih! Tips: baca soal dulu sebelum audio mulai, dan latih menebak konteks dari kata kunci yang kamu dengar.</p>`;
  }

  // ── Public API ─────────────────────────────────────────
  return {
    init() {
      Router.guard();
      App.init('ielts-listening');
      ChallengeSystem.onModuleVisit('ielts-listening');
      _renderMenu();
    }
  };

})();
