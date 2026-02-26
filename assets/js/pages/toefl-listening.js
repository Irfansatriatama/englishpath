/**
 * EnglishPath — TOEFL Listening Module
 * Fase 15b: Practice Listening
 * 2 Lectures + 1 Conversation with TOEFL question types
 * localStorage: ep_user_{id}_toefl_listening
 */
const TOEFLListening = (() => {

  // ── State ──────────────────────────────────────────────
  let _state = {
    view: 'menu',         // menu | listen | questions | result
    track: null,          // current lecture/conversation object
    trackIdx: 0,
    scriptIdx: 0,         // current script line being played
    isPlaying: false,
    hasListened: false,   // whether user has played the audio
    questionIdx: 0,
    answers: {},
    submitted: {},
    timerInterval: null,
    timerSeconds: 0,
    ttsQueue: null
  };

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, 'toefl_listening') || {};
  }

  function _saveResult(trackId, correct, total) {
    const uid = _uid();
    if (!uid) return;
    const data = _loadData();
    if (!data.results) data.results = {};
    const prev = data.results[trackId] || { best: 0, attempts: 0 };
    const pct = Math.round((correct / total) * 100);
    data.results[trackId] = {
      best: Math.max(prev.best, pct),
      attempts: prev.attempts + 1,
      lastScore: pct,
      lastCorrect: correct,
      lastTotal: total,
      lastDate: new Date().toISOString().split('T')[0]
    };
    if (!data.totalAttempts) data.totalAttempts = 0;
    data.totalAttempts++;
    Storage.setUser(uid, 'toefl_listening', data);
  }

  // ── TTS ────────────────────────────────────────────────
  function _speak(text, onEnd) {
    if (!window.speechSynthesis) {
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US';
    utt.rate = 0.88;
    utt.pitch = 1.0;
    utt.onend = onEnd || null;
    window.speechSynthesis.speak(utt);
  }

  function _stopSpeech() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    _state.isPlaying = false;
  }

  function _playScript(script, onComplete) {
    _state.isPlaying = true;
    _state.scriptIdx = 0;
    _updatePlayBtn(true);

    function playNext() {
      if (!_state.isPlaying || _state.scriptIdx >= script.length) {
        _state.isPlaying = false;
        _state.hasListened = true;
        _updatePlayBtn(false);
        _updateTranscriptHighlight(-1);
        if (onComplete) onComplete();
        return;
      }
      const line = script[_state.scriptIdx];
      _updateTranscriptHighlight(_state.scriptIdx);
      _speak(line.text, () => {
        _state.scriptIdx++;
        playNext();
      });
    }
    playNext();
  }

  function _updatePlayBtn(playing) {
    const btn = document.getElementById('tls-play-btn');
    if (btn) {
      btn.textContent = playing ? '⏹ Hentikan' : '▶ Putar Audio';
      btn.classList.toggle('tls-btn-playing', playing);
    }
    const listenBtn = document.getElementById('tls-proceed-btn');
    if (listenBtn) listenBtn.disabled = !_state.hasListened;
  }

  function _updateTranscriptHighlight(idx) {
    document.querySelectorAll('.tls-transcript-line').forEach((el, i) => {
      el.classList.toggle('tls-transcript-active', i === idx);
    });
  }

  // ── Timer ──────────────────────────────────────────────
  function _startTimer() {
    _state.timerSeconds = 0;
    if (_state.timerInterval) clearInterval(_state.timerInterval);
    _state.timerInterval = setInterval(() => {
      _state.timerSeconds++;
      const el = document.getElementById('tls-timer');
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

  function _setView(html) {
    const el = document.getElementById('tls-content');
    if (el) el.innerHTML = html;
  }

  function _scrollTop() {
    const mc = document.getElementById('main-content');
    if (mc) mc.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  // ── MENU ───────────────────────────────────────────────
  function _renderMenu() {
    _state.view = 'menu';
    _stopTimer();
    _stopSpeech();
    const data = _loadData();
    const results = data.results || {};
    const all = TOEFLListeningData.getAll();

    const cards = all.map((t, i) => {
      const r = results[t.id];
      const bestHtml = r
        ? `<span class="tls-best">Terbaik: ${r.best}% · ${r.attempts}× latihan</span>`
        : `<span class="tls-best tls-best-none">Belum pernah dicoba</span>`;
      const typeBadge = t.type === 'lecture'
        ? `<span class="tls-type-badge tls-type-lecture">🎓 Lecture</span>`
        : `<span class="tls-type-badge tls-type-conv">💬 Conversation</span>`;
      return `
        <div class="tls-track-card">
          <div class="tls-track-card-top">
            <span class="tls-track-icon">${t.icon}</span>
            <div class="tls-track-meta">
              ${typeBadge}
              <div class="tls-track-title">${t.title}</div>
              <div class="tls-track-topic">${t.type === 'lecture' ? `Course: ${t.course}` : t.setting ? t.setting.slice(0, 60) + '...' : 'Campus'}</div>
              ${bestHtml}
            </div>
          </div>
          <div class="tls-track-card-info">
            <span>⏱ ~${t.estimatedTime} menit</span>
            <span>📝 ${t.questions.length} soal</span>
            <span>🎙 ${t.script.length} baris dialog</span>
          </div>
          <button class="btn btn-primary tls-start-btn" onclick="TOEFLListening.startTrack(${i})">
            ${r ? '🔄 Coba Lagi' : '▶ Mulai Latihan'}
          </button>
        </div>`;
    }).join('');

    _setView(`
      <div class="tls-menu">
        <div class="tls-hero">
          <div class="tls-hero-label">TOEFL iBT</div>
          <div class="tls-hero-title">🎧 Listening Practice</div>
          <div class="tls-hero-sub">Latihan mendengarkan lecture akademik dan percakapan kampus dengan tipe soal TOEFL iBT: main idea, detail, function, attitude, organization, dan inference.</div>
        </div>

        <div class="tls-tips-box">
          <div class="tls-tips-title">💡 Strategi TOEFL Listening</div>
          <div class="tls-tips-list">
            <div class="tls-tip-item">✏️ <strong>Catat catatan singkat</strong> saat mendengarkan: siapa, apa, mengapa, bagaimana.</div>
            <div class="tls-tip-item">🎯 <strong>Fokus pada transisi</strong> seperti "however," "in contrast," atau "the key point is..." — sering muncul di soal.</div>
            <div class="tls-tip-item">💡 <strong>Soal function</strong>: tanya MENGAPA pembicara mengatakan sesuatu, bukan apa yang dikatakan.</div>
            <div class="tls-tip-item">😊 <strong>Soal attitude</strong>: perhatikan nada suara dan kata-kata emosi (unfortunately, surprisingly, fortunately).</div>
            <div class="tls-tip-item">🏗 <strong>Soal organization</strong>: perhatikan bagaimana lecture disusun — problem/solution, cause/effect, comparison.</div>
          </div>
        </div>

        <div class="tls-tracks-header">
          <h2 class="tls-section-title">Pilih Track</h2>
          <a href="index.html" class="tls-back-link">← Kembali ke Hub TOEFL</a>
        </div>
        <div class="tls-track-cards">${cards}</div>
      </div>`);
  }

  // ── LISTEN VIEW ────────────────────────────────────────
  function _renderListen() {
    _state.view = 'listen';
    _startTimer();
    const t = _state.track;

    const transcriptLines = t.script.map((line, i) => `
      <div class="tls-transcript-line" id="tls-line-${i}">
        <span class="tls-speaker">${line.speaker}:</span>
        <span class="tls-line-text">${line.text}</span>
      </div>`).join('');

    const typeBadge = t.type === 'lecture'
      ? `<span class="tls-type-badge tls-type-lecture">🎓 Academic Lecture</span>`
      : `<span class="tls-type-badge tls-type-conv">💬 Campus Conversation</span>`;

    _setView(`
      <div class="tls-listen">
        <div class="tls-listen-header">
          <button class="trd-btn-back" onclick="TOEFLListening.backToMenu()">← Menu</button>
          <div class="tls-listen-meta">
            ${typeBadge}
            <span class="trd-timer-badge">⏱ <span id="tls-timer">00:00</span></span>
          </div>
        </div>

        <div class="tls-listen-card">
          <div class="tls-listen-icon">${t.icon}</div>
          <div class="tls-listen-info">
            <div class="tls-listen-title">${t.title}</div>
            <div class="tls-listen-sub">${t.type === 'lecture' ? `${t.professor} · ${t.course}` : 'Office Hours'}</div>
          </div>
        </div>

        <div class="tls-audio-controls">
          <button id="tls-play-btn" class="btn btn-primary tls-play-btn" onclick="TOEFLListening.togglePlay()">
            ▶ Putar Audio
          </button>
          <p class="tls-audio-note">Audio diputar menggunakan Web Speech API (TTS). Dengarkan baik-baik sebelum menjawab soal.</p>
        </div>

        <div class="tls-transcript-section">
          <div class="tls-transcript-header">
            <span>📝 Transkrip</span>
            <button class="tls-transcript-toggle" onclick="TOEFLListening.toggleTranscript()">Tampilkan/Sembunyikan</button>
          </div>
          <div class="tls-transcript-body" id="tls-transcript" style="display:none">
            ${transcriptLines}
          </div>
        </div>

        <div class="tls-listen-footer">
          <p class="tls-listen-note">Dengarkan audio setidaknya sekali sebelum melanjutkan ke soal.</p>
          <button id="tls-proceed-btn" class="btn btn-primary" disabled onclick="TOEFLListening.startQuestions()">
            Lanjut ke Soal →
          </button>
        </div>
      </div>`);
  }

  // ── QUESTION VIEW ───────────────────────────────────────
  function _renderQuestion() {
    _state.view = 'questions';
    const t = _state.track;
    const qi = _state.questionIdx;
    const q = t.questions[qi];
    const total = t.questions.length;
    const answered = _state.answers[q.id];
    const submitted = _state.submitted[q.id];
    const progress = Math.round((qi / total) * 100);

    const typeLabels = {
      main_idea: '🎯 Main Idea',
      detail: '📌 Detail',
      function: '💬 Speaker Function',
      attitude: '😊 Speaker Attitude',
      organization: '🏗 Lecture Organization',
      inference: '💡 Inference'
    };
    const typeLabel = typeLabels[q.type] || q.type;

    const choicesHtml = q.choices.map((c, idx) => {
      let cls = '';
      if (submitted) {
        if (idx === q.answer) cls = 'trd-choice-correct';
        else if (idx === answered) cls = 'trd-choice-wrong';
      } else if (idx === answered) {
        cls = 'trd-choice-selected';
      }
      return `<button class="trd-choice ${cls}" ${submitted ? 'disabled' : ''}
        onclick="TOEFLListening.selectChoice(${idx})">
        <span class="trd-choice-letter">${String.fromCharCode(65+idx)}</span>
        <span class="trd-choice-text">${c}</span>
      </button>`;
    }).join('');

    let feedbackHtml = '';
    if (submitted) {
      const isCorrect = answered === q.answer;
      feedbackHtml = `
        <div class="trd-feedback ${isCorrect ? 'trd-feedback-correct' : 'trd-feedback-wrong'}">
          <span class="trd-feedback-icon">${isCorrect ? '✅' : '❌'}</span>
          <div>
            <strong>${isCorrect ? 'Jawaban Benar!' : 'Belum Tepat'}</strong>
            <p>${q.explanation}</p>
          </div>
        </div>`;
    }

    const isLast = qi === total - 1;
    const actionBtn = !submitted
      ? `<button class="btn btn-primary" ${answered === undefined ? 'disabled' : ''} onclick="TOEFLListening.submitAnswer()">Cek Jawaban</button>`
      : isLast
        ? `<button class="btn btn-primary" onclick="TOEFLListening.showResult()">Lihat Hasil →</button>`
        : `<button class="btn btn-primary" onclick="TOEFLListening.nextQuestion()">Soal Berikutnya →</button>`;

    _setView(`
      <div class="trd-questions">
        <div class="trd-q-header">
          <button class="trd-btn-back-sm" onclick="TOEFLListening.backToListen()">← Dengar Ulang</button>
          <div class="trd-q-progress-wrap">
            <div class="trd-q-progress-label">Soal ${qi+1} / ${total}</div>
            <div class="trd-q-bar"><div class="trd-q-bar-fill" style="width:${progress}%"></div></div>
          </div>
          <span class="trd-timer-badge">⏱ <span id="tls-timer-q">${_formatTime(_state.timerSeconds)}</span></span>
        </div>

        <div class="trd-q-type-badge">${typeLabel}</div>
        <div class="trd-q-text">${q.question}</div>
        <div class="trd-choices">${choicesHtml}</div>
        ${feedbackHtml}
        <div class="trd-q-actions">${actionBtn}</div>
      </div>`);
  }

  // ── RESULT VIEW ────────────────────────────────────────
  function _renderResult() {
    _state.view = 'result';
    _stopTimer();
    const t = _state.track;
    let correct = 0;
    t.questions.forEach(q => {
      if (_state.answers[q.id] === q.answer) correct++;
    });
    const total = t.questions.length;
    const pct = Math.round((correct / total) * 100);
    _saveResult(t.id, correct, total);

    let xpEarned = correct * 3;
    if (pct === 100) xpEarned += 20;
    if (typeof XPSystem !== 'undefined') {
      const r = XPSystem.addXP('QUIZ_CORRECT', xpEarned);
      if (r && typeof App !== 'undefined') App.toastXP(r);
    }
    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onQuizComplete(pct >= 70);

    const grade = pct >= 90 ? 'Luar Biasa! 🏆' : pct >= 70 ? 'Bagus! 👍' : pct >= 50 ? 'Cukup 📝' : 'Perlu Latihan Lebih 💪';

    const reviewHtml = t.questions.map((q, i) => {
      const ans = _state.answers[q.id];
      const isCorrect = ans === q.answer;
      return `
        <div class="trd-review-item ${isCorrect ? 'trd-review-correct' : 'trd-review-wrong'}">
          <div class="trd-review-q-num">${isCorrect ? '✅' : '❌'} Soal ${i+1}</div>
          <div class="trd-review-question">${q.question}</div>
          ${!isCorrect ? `<div class="trd-review-your">Jawaban Anda: <em>${ans !== undefined ? `(${String.fromCharCode(65+ans)}) ${q.choices[ans]}` : '—'}</em></div>` : ''}
          <div class="trd-review-correct-ans">Jawaban Benar: <em>(${String.fromCharCode(65+q.answer)}) ${q.choices[q.answer]}</em></div>
          <div class="trd-review-exp">${q.explanation}</div>
        </div>`;
    }).join('');

    _setView(`
      <div class="trd-result">
        <div class="trd-result-hero">
          <div class="trd-result-emoji">${pct >= 70 ? '🎉' : '📚'}</div>
          <div class="trd-result-title">${grade}</div>
          <div class="trd-result-passage">${t.icon} ${t.title}</div>
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
          <button class="btn btn-primary" onclick="TOEFLListening.restartTrack()">🔄 Coba Lagi</button>
          <button class="btn btn-outline" onclick="TOEFLListening.backToMenu()">← Pilih Track Lain</button>
        </div>

        <div class="trd-review-section">
          <h3 class="trd-review-title">📋 Review Jawaban</h3>
          ${reviewHtml}
        </div>
      </div>`);
  }

  // ── PUBLIC API ─────────────────────────────────────────
  return {
    init() {
      if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onModuleVisit();
      _renderMenu();
    },

    startTrack(idx) {
      const all = TOEFLListeningData.getAll();
      _state.track = all[idx];
      _state.trackIdx = idx;
      _state.questionIdx = 0;
      _state.answers = {};
      _state.submitted = {};
      _state.hasListened = false;
      _state.timerSeconds = 0;
      _stopSpeech();
      _renderListen();
      _scrollTop();
    },

    togglePlay() {
      if (_state.isPlaying) {
        _stopSpeech();
        _updateTranscriptHighlight(-1);
      } else {
        _playScript(_state.track.script, () => {
          const btn = document.getElementById('tls-proceed-btn');
          if (btn) btn.disabled = false;
        });
      }
    },

    toggleTranscript() {
      const el = document.getElementById('tls-transcript');
      if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
    },

    startQuestions() {
      _renderQuestion();
      _scrollTop();
    },

    backToListen() {
      _stopSpeech();
      _renderListen();
      _scrollTop();
    },

    backToMenu() {
      _stopTimer();
      _stopSpeech();
      _renderMenu();
      _scrollTop();
    },

    selectChoice(idx) {
      const q = _state.track.questions[_state.questionIdx];
      if (_state.submitted[q.id]) return;
      _state.answers[q.id] = idx;
      _renderQuestion();
    },

    submitAnswer() {
      const q = _state.track.questions[_state.questionIdx];
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

    restartTrack() {
      this.startTrack(_state.trackIdx);
    }
  };

})();
