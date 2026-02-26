/**
 * EnglishPath — TOEFL Reading Module
 * Fase 15b: Practice Reading
 * 3 Academic Passages with TOEFL question types
 * localStorage: ep_user_{id}_toefl_reading
 */
const TOEFLReading = (() => {

  // ── State ──────────────────────────────────────────────
  let _state = {
    view: 'menu',         // menu | intro | reading | questions | result
    passage: null,        // current passage object
    passageIdx: 0,        // index in passages array
    questionIdx: 0,       // current question index
    answers: {},          // {questionId: answerIndex or answerArray}
    submitted: {},        // {questionId: true}
    timerInterval: null,
    timerSeconds: 0,
    score: 0,
    total: 0
  };

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, 'toefl_reading') || {};
  }

  function _saveResult(passageId, correct, total) {
    const uid = _uid();
    if (!uid) return;
    const data = _loadData();
    if (!data.results) data.results = {};
    const prev = data.results[passageId] || { best: 0, attempts: 0 };
    const pct = Math.round((correct / total) * 100);
    data.results[passageId] = {
      best: Math.max(prev.best, pct),
      attempts: prev.attempts + 1,
      lastScore: pct,
      lastCorrect: correct,
      lastTotal: total,
      lastDate: new Date().toISOString().split('T')[0]
    };
    if (!data.totalAttempts) data.totalAttempts = 0;
    data.totalAttempts++;
    Storage.setUser(uid, 'toefl_reading', data);
  }

  // ── Timer ──────────────────────────────────────────────
  function _startTimer() {
    _state.timerSeconds = 0;
    if (_state.timerInterval) clearInterval(_state.timerInterval);
    _state.timerInterval = setInterval(() => {
      _state.timerSeconds++;
      const el = document.getElementById('trd-timer');
      if (el) el.textContent = _formatTime(_state.timerSeconds);
    }, 1000);
  }

  function _stopTimer() {
    if (_state.timerInterval) clearInterval(_state.timerInterval);
    _state.timerInterval = null;
  }

  function _formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }

  // ── Render helpers ──────────────────────────────────────
  function _setView(html) {
    const el = document.getElementById('trd-content');
    if (el) el.innerHTML = html;
  }

  function _scrollTop() {
    const mc = document.getElementById('main-content');
    if (mc) mc.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  // ── MENU VIEW ──────────────────────────────────────────
  function _renderMenu() {
    _state.view = 'menu';
    _stopTimer();
    const passages = TOEFLReadingData.getPassages();
    const data = _loadData();
    const results = data.results || {};

    const cards = passages.map((p, i) => {
      const r = results[p.id];
      const bestHtml = r
        ? `<span class="trd-best">Terbaik: ${r.best}% · ${r.attempts}× latihan</span>`
        : `<span class="trd-best trd-best-none">Belum pernah dicoba</span>`;
      return `
        <div class="trd-passage-card">
          <div class="trd-passage-card-top">
            <span class="trd-passage-icon">${p.icon}</span>
            <div class="trd-passage-meta">
              <div class="trd-passage-topic">${p.topic}</div>
              <div class="trd-passage-title">${p.title}</div>
              ${bestHtml}
            </div>
          </div>
          <div class="trd-passage-card-info">
            <span>⏱ ~${p.estimatedTime} menit</span>
            <span>📝 ${p.questions.length} soal</span>
            <span>📖 Academic</span>
          </div>
          <button class="btn btn-primary trd-start-btn" onclick="TOEFLReading.startPassage(${i})">
            ${r ? '🔄 Coba Lagi' : '▶ Mulai Latihan'}
          </button>
        </div>`;
    }).join('');

    _setView(`
      <div class="trd-menu">
        <div class="trd-hero">
          <div class="trd-hero-label">TOEFL iBT</div>
          <div class="trd-hero-title">📖 Reading Practice</div>
          <div class="trd-hero-sub">Latihan membaca teks akademik panjang dengan tipe soal TOEFL iBT: factual, inference, vocabulary in context, insert text, dan prose summary.</div>
        </div>

        <div class="trd-tips-box">
          <div class="trd-tips-title">💡 Strategi TOEFL Reading</div>
          <div class="trd-tips-list">
            <div class="trd-tip-item">📌 <strong>Baca heading & paragraf pertama</strong> dulu untuk memahami struktur bacaan sebelum ke soal.</div>
            <div class="trd-tip-item">🎯 <strong>Soal factual</strong>: scan teks untuk kata kunci dari soal, jangan baca ulang keseluruhan.</div>
            <div class="trd-tip-item">🔍 <strong>Soal vocabulary</strong>: cari clue konteks di kalimat sekitar kata tersebut, bukan arti kamus semata.</div>
            <div class="trd-tip-item">✏️ <strong>Soal insert text</strong>: perhatikan kata penghubung (however, therefore, also) untuk menentukan posisi kalimat baru.</div>
            <div class="trd-tip-item">📋 <strong>Soal prose summary</strong>: pilih 3 ide utama — hindari detail kecil atau informasi yang tidak tepat.</div>
          </div>
        </div>

        <div class="trd-passages-header">
          <h2 class="trd-section-title">Pilih Passage</h2>
          <a href="index.html" class="trd-back-link">← Kembali ke Hub TOEFL</a>
        </div>
        <div class="trd-passage-cards">${cards}</div>
      </div>`);
  }

  // ── READING VIEW ───────────────────────────────────────
  function _renderReading() {
    _state.view = 'reading';
    _startTimer();
    const p = _state.passage;

    _setView(`
      <div class="trd-reading">
        <div class="trd-reading-header">
          <button class="trd-btn-back" onclick="TOEFLReading.backToMenu()">← Menu</button>
          <div class="trd-reading-meta">
            <span class="trd-passage-badge">${p.icon} ${p.topic}</span>
            <span class="trd-timer-badge">⏱ <span id="trd-timer">00:00</span></span>
          </div>
        </div>
        <h2 class="trd-passage-heading">${p.title}</h2>
        <div class="trd-passage-body">${p.passage}</div>
        <div class="trd-reading-footer">
          <p class="trd-reading-note">Setelah selesai membaca, klik tombol di bawah untuk menjawab soal. Kamu masih bisa kembali ke bacaan saat menjawab.</p>
          <button class="btn btn-primary trd-proceed-btn" onclick="TOEFLReading.startQuestions()">
            Lanjut ke Soal →
          </button>
        </div>
      </div>`);
  }

  // ── QUESTIONS VIEW ─────────────────────────────────────
  function _renderQuestion() {
    _state.view = 'questions';
    const p = _state.passage;
    const qi = _state.questionIdx;
    const q = p.questions[qi];
    const total = p.questions.length;
    const answered = _state.answers[q.id];
    const submitted = _state.submitted[q.id];

    // Progress
    const progress = Math.round(((qi) / total) * 100);

    // Question type label
    const typeLabels = {
      factual: '📌 Factual Information',
      negative: '❌ Negative Factual',
      inference: '💡 Inference',
      vocab: '🔤 Vocabulary in Context',
      rhetorical: '🎯 Rhetorical Purpose',
      insert: '➕ Insert Text',
      summary: '📋 Prose Summary',
      reference: '🔗 Reference'
    };
    const typeLabel = typeLabels[q.type] || q.type;

    // Choices HTML
    let choicesHtml = '';
    if (q.type === 'summary') {
      // Multi-select: pick 3
      choicesHtml = `<div class="trd-summary-note">Pilih <strong>3 jawaban</strong> yang paling mewakili ide utama bacaan.</div>
        <div class="trd-choices-multi">` +
        q.choices.map((c, idx) => {
          const selected = Array.isArray(answered) && answered.includes(idx);
          const cls = submitted
            ? (Array.isArray(q.answer) && q.answer.includes(idx) ? 'trd-choice-correct' : (selected ? 'trd-choice-wrong' : ''))
            : (selected ? 'trd-choice-selected' : '');
          return `<label class="trd-choice-multi ${cls}">
            <input type="checkbox" ${selected ? 'checked' : ''} ${submitted ? 'disabled' : ''}
              onchange="TOEFLReading.toggleSummaryChoice(${idx})">
            <span class="trd-choice-letter">${String.fromCharCode(65+idx)}</span>
            <span class="trd-choice-text">${c}</span>
          </label>`;
        }).join('') + `</div>`;
    } else {
      choicesHtml = `<div class="trd-choices">` +
        q.choices.map((c, idx) => {
          let cls = '';
          if (submitted) {
            if (idx === q.answer) cls = 'trd-choice-correct';
            else if (idx === answered) cls = 'trd-choice-wrong';
          } else if (idx === answered) {
            cls = 'trd-choice-selected';
          }
          return `<button class="trd-choice ${cls}" ${submitted ? 'disabled' : ''}
            onclick="TOEFLReading.selectChoice(${idx})">
            <span class="trd-choice-letter">${String.fromCharCode(65+idx)}</span>
            <span class="trd-choice-text">${c}</span>
          </button>`;
        }).join('') + `</div>`;
    }

    // Feedback
    let feedbackHtml = '';
    if (submitted) {
      let isCorrect;
      if (q.type === 'summary') {
        const ans = Array.isArray(answered) ? answered : [];
        const correct = Array.isArray(q.answer) ? q.answer : [];
        isCorrect = correct.length === ans.length && correct.every(a => ans.includes(a));
      } else {
        isCorrect = answered === q.answer;
      }
      feedbackHtml = `
        <div class="trd-feedback ${isCorrect ? 'trd-feedback-correct' : 'trd-feedback-wrong'}">
          <span class="trd-feedback-icon">${isCorrect ? '✅' : '❌'}</span>
          <div>
            <strong>${isCorrect ? 'Jawaban Benar!' : 'Belum Tepat'}</strong>
            <p>${q.explanation}</p>
          </div>
        </div>`;
    }

    // Nav buttons
    const isLast = qi === total - 1;
    const canSubmit = q.type === 'summary'
      ? (Array.isArray(answered) && answered.length === 3)
      : (answered !== undefined);

    const actionBtn = !submitted
      ? `<button class="btn btn-primary" ${!canSubmit ? 'disabled' : ''} onclick="TOEFLReading.submitAnswer()">Cek Jawaban</button>`
      : isLast
        ? `<button class="btn btn-primary" onclick="TOEFLReading.showResult()">Lihat Hasil →</button>`
        : `<button class="btn btn-primary" onclick="TOEFLReading.nextQuestion()">Soal Berikutnya →</button>`;

    _setView(`
      <div class="trd-questions">
        <div class="trd-q-header">
          <button class="trd-btn-back-sm" onclick="TOEFLReading.backToReading()">← Baca Ulang</button>
          <div class="trd-q-progress-wrap">
            <div class="trd-q-progress-label">Soal ${qi+1} / ${total}</div>
            <div class="trd-q-bar"><div class="trd-q-bar-fill" style="width:${progress}%"></div></div>
          </div>
          <span class="trd-timer-badge">⏱ <span id="trd-timer">_formatTimer</span></span>
        </div>

        <div class="trd-q-type-badge">${typeLabel}</div>

        <div class="trd-q-text">${q.question}</div>

        ${choicesHtml}
        ${feedbackHtml}

        <div class="trd-q-actions">${actionBtn}</div>
      </div>`);

    // Update timer display
    const timerEl = document.getElementById('trd-timer');
    if (timerEl) timerEl.textContent = _formatTime(_state.timerSeconds);
  }

  // ── RESULT VIEW ────────────────────────────────────────
  function _renderResult() {
    _state.view = 'result';
    _stopTimer();
    const p = _state.passage;
    const questions = p.questions;

    let correct = 0;
    questions.forEach(q => {
      const ans = _state.answers[q.id];
      if (q.type === 'summary') {
        const a = Array.isArray(ans) ? ans : [];
        const expected = Array.isArray(q.answer) ? q.answer : [];
        if (expected.length === a.length && expected.every(x => a.includes(x))) correct++;
      } else {
        if (ans === q.answer) correct++;
      }
    });

    const total = questions.length;
    const pct = Math.round((correct / total) * 100);
    _saveResult(p.id, correct, total);

    // Award XP
    let xpEarned = correct * 3;
    if (pct === 100) xpEarned += 20;
    if (typeof XPSystem !== 'undefined') {
      const r = XPSystem.addXP('QUIZ_CORRECT', xpEarned);
      if (r && typeof App !== 'undefined') App.toastXP(r);
    }
    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onQuizComplete(pct >= 70);

    const grade = pct >= 90 ? 'Luar Biasa! 🏆' : pct >= 70 ? 'Bagus! 👍' : pct >= 50 ? 'Cukup 📝' : 'Perlu Latihan Lebih 💪';

    // Answer review
    const reviewHtml = questions.map((q, i) => {
      const ans = _state.answers[q.id];
      let isCorrect;
      let yourAnswer, correctAnswer;
      if (q.type === 'summary') {
        const a = Array.isArray(ans) ? ans : [];
        const expected = Array.isArray(q.answer) ? q.answer : [];
        isCorrect = expected.length === a.length && expected.every(x => a.includes(x));
        yourAnswer = a.map(x => `(${String.fromCharCode(65+x)}) ${q.choices[x]}`).join(', ') || '—';
        correctAnswer = expected.map(x => `(${String.fromCharCode(65+x)}) ${q.choices[x]}`).join(', ');
      } else {
        isCorrect = ans === q.answer;
        yourAnswer = ans !== undefined ? `(${String.fromCharCode(65+ans)}) ${q.choices[ans]}` : '—';
        correctAnswer = `(${String.fromCharCode(65+q.answer)}) ${q.choices[q.answer]}`;
      }
      return `
        <div class="trd-review-item ${isCorrect ? 'trd-review-correct' : 'trd-review-wrong'}">
          <div class="trd-review-q-num">${isCorrect ? '✅' : '❌'} Soal ${i+1}</div>
          <div class="trd-review-question">${q.question.slice(0, 120)}${q.question.length > 120 ? '...' : ''}</div>
          ${!isCorrect ? `<div class="trd-review-your">Jawaban Anda: <em>${yourAnswer}</em></div>` : ''}
          <div class="trd-review-correct-ans">Jawaban Benar: <em>${correctAnswer}</em></div>
          <div class="trd-review-exp">${q.explanation}</div>
        </div>`;
    }).join('');

    _setView(`
      <div class="trd-result">
        <div class="trd-result-hero">
          <div class="trd-result-emoji">${pct >= 70 ? '🎉' : '📚'}</div>
          <div class="trd-result-title">${grade}</div>
          <div class="trd-result-passage">${p.icon} ${p.title}</div>
          <div class="trd-result-score">${correct}<span>/${total}</span></div>
          <div class="trd-result-pct">${pct}% benar</div>
          <div class="trd-result-xp">+${xpEarned} XP didapat</div>
        </div>

        <div class="trd-result-stats">
          <div class="trd-result-stat">
            <span class="trd-stat-val">${correct}</span>
            <span class="trd-stat-label">Benar</span>
          </div>
          <div class="trd-result-stat">
            <span class="trd-stat-val">${total - correct}</span>
            <span class="trd-stat-label">Salah</span>
          </div>
          <div class="trd-result-stat">
            <span class="trd-stat-val">${_formatTime(_state.timerSeconds)}</span>
            <span class="trd-stat-label">Waktu</span>
          </div>
        </div>

        <div class="trd-result-actions">
          <button class="btn btn-primary" onclick="TOEFLReading.restartPassage()">🔄 Coba Lagi</button>
          <button class="btn btn-outline" onclick="TOEFLReading.backToMenu()">← Pilih Passage Lain</button>
        </div>

        <div class="trd-review-section">
          <h3 class="trd-review-title">📋 Review Jawaban</h3>
          ${reviewHtml}
        </div>
      </div>`);
  }

  // ── PUBLIC METHODS ─────────────────────────────────────
  return {
    init() {
      if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onModuleVisit();
      _renderMenu();
    },

    startPassage(idx) {
      const passages = TOEFLReadingData.getPassages();
      _state.passage = passages[idx];
      _state.passageIdx = idx;
      _state.questionIdx = 0;
      _state.answers = {};
      _state.submitted = {};
      _state.timerSeconds = 0;
      _renderReading();
      _scrollTop();
    },

    startQuestions() {
      _state.view = 'questions';
      _renderQuestion();
      _scrollTop();
    },

    backToReading() {
      _renderReading();
      _scrollTop();
    },

    backToMenu() {
      _stopTimer();
      _renderMenu();
      _scrollTop();
    },

    selectChoice(idx) {
      const q = _state.passage.questions[_state.questionIdx];
      if (_state.submitted[q.id]) return;
      _state.answers[q.id] = idx;
      _renderQuestion();
    },

    toggleSummaryChoice(idx) {
      const q = _state.passage.questions[_state.questionIdx];
      if (_state.submitted[q.id]) return;
      let current = Array.isArray(_state.answers[q.id]) ? [..._state.answers[q.id]] : [];
      if (current.includes(idx)) {
        current = current.filter(x => x !== idx);
      } else if (current.length < 3) {
        current.push(idx);
      }
      _state.answers[q.id] = current;
      _renderQuestion();
    },

    submitAnswer() {
      const q = _state.passage.questions[_state.questionIdx];
      _state.submitted[q.id] = true;
      _renderQuestion();
      _scrollTop();
    },

    nextQuestion() {
      _state.questionIdx++;
      _renderQuestion();
      _scrollTop();
    },

    showResult() {
      _renderResult();
      _scrollTop();
    },

    restartPassage() {
      this.startPassage(_state.passageIdx);
    }
  };

})();
