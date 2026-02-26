/**
 * EnglishPath — IELTS Reading Module
 * Fase 13b: Practice per Skill — Reading
 * localStorage: ep_user_{id}_ielts_reading
 */
const IELTSReading = (() => {

  // ── State ──────────────────────────────────────────────
  let _state = {
    view: 'menu',          // menu | practice | result
    filter: 'all',         // all | academic | general
    passageId: null,
    passage: null,
    answers: {},           // { questionId: answerValue }
    submitted: false,
    score: 0,
    timerInterval: null,
    timeLeft: 0,           // seconds
    timerStarted: false
  };

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  // ── Storage ────────────────────────────────────────────
  function _getKey() { return 'ielts_reading'; }

  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, _getKey()) || {};
  }

  function _saveResult(passageId, score, total, pct) {
    const uid = _uid();
    if (!uid) return;
    const data = _loadData();
    if (!data.results) data.results = {};
    const prev = data.results[passageId] || { best: 0, attempts: 0 };
    data.results[passageId] = {
      best: Math.max(prev.best, pct),
      attempts: prev.attempts + 1,
      lastScore: pct,
      lastDate: new Date().toISOString().split('T')[0]
    };
    if (!data.totalAttempts) data.totalAttempts = 0;
    data.totalAttempts += 1;
    Storage.setUser(uid, _getKey(), data);
  }

  // ── Timer ──────────────────────────────────────────────
  function _startTimer(minutes) {
    _state.timeLeft = minutes * 60;
    _state.timerStarted = true;
    _renderTimer();
    _state.timerInterval = setInterval(() => {
      _state.timeLeft--;
      _renderTimer();
      if (_state.timeLeft <= 0) {
        clearInterval(_state.timerInterval);
        _state.timerInterval = null;
        _autoSubmit();
      }
    }, 1000);
  }

  function _stopTimer() {
    if (_state.timerInterval) {
      clearInterval(_state.timerInterval);
      _state.timerInterval = null;
    }
  }

  function _renderTimer() {
    const el = document.getElementById('reading-timer');
    if (!el) return;
    const m = Math.floor(_state.timeLeft / 60);
    const s = _state.timeLeft % 60;
    el.textContent = `${m}:${s.toString().padStart(2,'0')}`;
    el.className = 'ielts-timer' + (_state.timeLeft <= 120 ? ' timer-warning' : '');
  }

  function _autoSubmit() {
    if (!_state.submitted) {
      App.showToast('Waktu habis! Jawaban dikumpulkan otomatis.', 'warning');
      _submitAnswers();
    }
  }

  // ── Render Menu ────────────────────────────────────────
  function _renderMenu() {
    _state.view = 'menu';
    const data = _loadData();
    const passages = IELTSReadingData.getAll();

    const filtered = _state.filter === 'all' ? passages :
                     passages.filter(p => p.type === _state.filter);

    const cards = filtered.map(p => {
      const res = data.results && data.results[p.id];
      const bestBadge = res
        ? `<span class="ielts-score-badge ${res.best >= 70 ? 'badge-good' : 'badge-fair'}">${res.best}%</span>`
        : '<span class="ielts-score-badge badge-new">Baru</span>';
      const attempts = res ? `${res.attempts}x dicoba` : '';
      return `
        <div class="ielts-practice-card" data-passage="${p.id}">
          <div class="ipc-header">
            <span class="ipc-type ${p.type}">${p.type === 'academic' ? 'Academic' : 'General Training'}</span>
            ${bestBadge}
          </div>
          <div class="ipc-title">${p.title}</div>
          <div class="ipc-meta">
            <span>📖 ${p.wordCount} kata</span>
            <span>⏱ ${p.timeLimit} menit</span>
            <span>🎯 ${p.level}</span>
            <span>❓ ${p.questions.length} soal</span>
          </div>
          ${attempts ? `<div class="ipc-attempts">${attempts}</div>` : ''}
          <button class="btn-primary btn-sm start-passage-btn" data-passage="${p.id}">Mulai Latihan →</button>
        </div>`;
    }).join('');

    document.getElementById('reading-content').innerHTML = `
      <div class="ielts-section-header">
        <h2 class="ielts-section-title">📖 IELTS Reading Practice</h2>
        <p class="ielts-section-sub">Pilih passage untuk berlatih. Timer akan berjalan otomatis saat mulai.</p>
      </div>

      <div class="ielts-tip-bar">
        💡 <strong>Tips:</strong> Baca pertanyaan dahulu sebelum membaca passage. Kelola waktu: ~20 menit per passage.
      </div>

      <div class="ielts-filter-row">
        <button class="ielts-filter-btn ${_state.filter==='all'?'active':''}" data-filter="all">Semua</button>
        <button class="ielts-filter-btn ${_state.filter==='academic'?'active':''}" data-filter="academic">Academic</button>
        <button class="ielts-filter-btn ${_state.filter==='general'?'active':''}" data-filter="general">General Training</button>
      </div>

      <div class="ielts-passage-grid">${cards}</div>
    `;

    // events
    document.querySelectorAll('.ielts-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        _state.filter = btn.dataset.filter;
        _renderMenu();
      });
    });
    document.querySelectorAll('.start-passage-btn, .ielts-practice-card').forEach(el => {
      el.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-passage]');
        if (btn) _startPractice(btn.dataset.passage);
      });
    });
  }

  // ── Render Practice ────────────────────────────────────
  function _startPractice(passageId) {
    _state.passageId = passageId;
    _state.passage = IELTSReadingData.getById(passageId);
    _state.answers = {};
    _state.submitted = false;
    _state.score = 0;
    _state.view = 'practice';
    _stopTimer();
    _renderPractice();
    _startTimer(_state.passage.timeLimit);
  }

  function _renderPractice() {
    const p = _state.passage;

    const qHtml = p.questions.map((q, i) => {
      if (q.type === 'tfng') return _renderTFNG(q, i);
      if (q.type === 'mcq') return _renderMCQ(q, i);
      if (q.type === 'match_heading') return _renderMCQ(q, i);
      return '';
    }).join('');

    document.getElementById('reading-content').innerHTML = `
      <div class="reading-practice-wrap">

        <!-- Left: Passage -->
        <div class="reading-passage-col">
          <div class="reading-passage-header">
            <div class="reading-passage-meta">
              <span class="ipc-type ${p.type}">${p.type === 'academic' ? 'Academic' : 'General Training'}</span>
              <span class="passage-level">${p.level}</span>
              <span class="passage-wc">${p.wordCount} kata</span>
            </div>
            <div class="reading-timer-wrap">
              ⏱ <span id="reading-timer" class="ielts-timer">${p.timeLimit}:00</span>
            </div>
          </div>
          <h2 class="reading-passage-title">${p.title}</h2>
          <div class="reading-passage-topic">Topik: ${p.topic}</div>
          <div class="reading-passage-text">${_formatPassage(p.text)}</div>
        </div>

        <!-- Right: Questions -->
        <div class="reading-questions-col">
          <div class="reading-q-header">
            <div class="reading-q-title">Pertanyaan (${p.questions.length} soal)</div>
            <div id="reading-q-progress" class="reading-q-progress">0 / ${p.questions.length} dijawab</div>
          </div>
          <div class="reading-questions-list">
            ${qHtml}
          </div>
          <div class="reading-actions">
            <button id="submit-reading-btn" class="btn-primary">Kumpulkan Jawaban</button>
            <button id="back-reading-btn" class="btn-outline">← Kembali</button>
          </div>
        </div>

      </div>
    `;

    document.getElementById('submit-reading-btn').addEventListener('click', _submitAnswers);
    document.getElementById('back-reading-btn').addEventListener('click', () => {
      _stopTimer();
      _renderMenu();
    });

    // Answer listeners
    document.querySelectorAll('.tfng-btn').forEach(btn => {
      btn.addEventListener('click', _handleTFNGAnswer);
    });
    document.querySelectorAll('.reading-mcq-option').forEach(btn => {
      btn.addEventListener('click', _handleMCQAnswer);
    });
  }

  function _formatPassage(text) {
    return text.split('\n\n').map(para =>
      `<p>${para.trim().replace(/\n/g, ' ')}</p>`
    ).join('');
  }

  function _renderTFNG(q, i) {
    return `
      <div class="reading-question tfng-question" id="rq-${q.id}">
        <div class="rq-number">Q${i+1}</div>
        <div class="rq-text">${q.question}</div>
        <div class="tfng-buttons">
          <button class="tfng-btn" data-qid="${q.id}" data-val="TRUE">TRUE</button>
          <button class="tfng-btn" data-qid="${q.id}" data-val="FALSE">FALSE</button>
          <button class="tfng-btn" data-qid="${q.id}" data-val="NOT GIVEN">NOT GIVEN</button>
        </div>
      </div>`;
  }

  function _renderMCQ(q, i) {
    const opts = q.options.map((opt, idx) => `
      <button class="reading-mcq-option" data-qid="${q.id}" data-idx="${idx}">
        <span class="mcq-opt-label">${String.fromCharCode(65+idx)}</span>
        <span class="mcq-opt-text">${opt}</span>
      </button>`).join('');
    return `
      <div class="reading-question mcq-question" id="rq-${q.id}">
        <div class="rq-number">Q${i+1}</div>
        <div class="rq-text">${q.question}</div>
        <div class="reading-mcq-options">${opts}</div>
      </div>`;
  }

  function _handleTFNGAnswer(e) {
    const btn = e.currentTarget;
    const qid = btn.dataset.qid;
    const val = btn.dataset.val;
    _state.answers[qid] = val;

    // Visual feedback
    const container = document.getElementById(`rq-${qid}`);
    container.querySelectorAll('.tfng-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    _updateAnswerProgress();
  }

  function _handleMCQAnswer(e) {
    const btn = e.currentTarget;
    const qid = btn.dataset.qid;
    const idx = parseInt(btn.dataset.idx);
    _state.answers[qid] = idx;

    const container = document.getElementById(`rq-${qid}`);
    container.querySelectorAll('.reading-mcq-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    _updateAnswerProgress();
  }

  function _updateAnswerProgress() {
    const el = document.getElementById('reading-q-progress');
    if (!el) return;
    const total = _state.passage.questions.length;
    const answered = Object.keys(_state.answers).length;
    el.textContent = `${answered} / ${total} dijawab`;
    el.className = 'reading-q-progress' + (answered === total ? ' all-answered' : '');
  }

  // ── Submit & Result ────────────────────────────────────
  function _submitAnswers() {
    if (_state.submitted) return;

    const unanswered = _state.passage.questions.filter(q => _state.answers[q.id] === undefined);
    if (unanswered.length > 0 && !_state.timerInterval === null) {
      // timer still running — ask confirm
    }

    _stopTimer();
    _state.submitted = true;

    // Grade
    let score = 0;
    _state.passage.questions.forEach(q => {
      const userAns = _state.answers[q.id];
      let correct = false;
      if (q.type === 'tfng') correct = userAns === q.answer;
      else if (q.type === 'mcq' || q.type === 'match_heading') correct = userAns === q.answer;
      if (correct) score++;
    });
    _state.score = score;

    const total = _state.passage.questions.length;
    const pct = Math.round((score / total) * 100);
    _saveResult(_state.passageId, score, total, pct);

    // Award XP
    const uid = _uid();
    if (uid) {
      const xp = score * 3 + (pct === 100 ? 20 : 0);
      XPSystem.addXP(xp, `IELTS Reading: ${_state.passage.title}`);
      ChallengeSystem.onQuizComplete(_state.passageId);
    }

    _renderResult(score, total, pct);
  }

  function _renderResult(score, total, pct) {
    const p = _state.passage;
    const band = _scoreToBand(pct);
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '💪';

    const reviewHtml = p.questions.map((q, i) => {
      const userAns = _state.answers[q.id];
      let isCorrect = false;
      let userDisplay = '';
      let correctDisplay = '';

      if (q.type === 'tfng') {
        isCorrect = userAns === q.answer;
        userDisplay = userAns || 'Tidak dijawab';
        correctDisplay = q.answer;
      } else {
        isCorrect = userAns === q.answer;
        userDisplay = userAns !== undefined ? q.options[userAns] : 'Tidak dijawab';
        correctDisplay = q.options[q.answer];
      }

      return `
        <div class="review-item ${isCorrect ? 'correct' : 'wrong'}">
          <div class="review-q-header">
            <span class="review-num">Q${i+1}</span>
            <span class="review-status">${isCorrect ? '✓ Benar' : '✗ Salah'}</span>
          </div>
          <div class="review-q-text">${q.question}</div>
          ${!isCorrect ? `
            <div class="review-answers">
              <div class="your-answer">Jawabanmu: <strong>${userDisplay}</strong></div>
              <div class="correct-answer">Jawaban benar: <strong>${correctDisplay}</strong></div>
            </div>
            <div class="review-explanation">${q.explanation}</div>
          ` : ''}
        </div>`;
    }).join('');

    document.getElementById('reading-content').innerHTML = `
      <div class="ielts-result-wrap">
        <div class="ielts-result-hero">
          <div class="result-emoji">${emoji}</div>
          <div class="result-title">Latihan Selesai!</div>
          <div class="result-passage-name">${p.title}</div>
          <div class="result-score-big">${score} / ${total}</div>
          <div class="result-pct">${pct}%</div>
          <div class="result-band-estimate">Estimasi Band: <strong>${band}</strong></div>
          <div class="result-type-badge ${p.type}">${p.type === 'academic' ? 'Academic' : 'General Training'}</div>
        </div>

        <div class="ielts-result-feedback">
          ${_getFeedback(pct)}
        </div>

        <div class="result-review-section">
          <h3 class="review-section-title">📋 Review Jawaban</h3>
          ${reviewHtml}
        </div>

        <div class="result-actions">
          <button class="btn-primary" id="retry-passage-btn">🔄 Coba Lagi</button>
          <button class="btn-outline" id="back-to-menu-btn">← Pilih Passage Lain</button>
        </div>
      </div>
    `;

    document.getElementById('retry-passage-btn').addEventListener('click', () => _startPractice(_state.passageId));
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
    if (pct >= 80) return `<p class="feedback-good">🌟 Hasil sangat baik! Kemampuan reading kamu setara Band 7+. Terus latih kecepatan membaca dan pemahaman konteks.</p>`;
    if (pct >= 60) return `<p class="feedback-ok">👍 Hasil cukup baik. Fokus pada soal T/F/NG yang membutuhkan pemahaman nuansa teks, dan latih teknik skimming.</p>`;
    return `<p class="feedback-low">💪 Terus berlatih! Coba baca passage lebih lambat, tandai kata kunci, dan latih soal T/F/NG — bedakan antara FALSE dan NOT GIVEN.</p>`;
  }

  // ── Public API ─────────────────────────────────────────
  return {
    init() {
      Router.guard();
      App.init('ielts-reading');
      ChallengeSystem.onModuleVisit('ielts-reading');
      _renderMenu();
    }
  };

})();
