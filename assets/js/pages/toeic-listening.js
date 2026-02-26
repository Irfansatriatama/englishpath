/**
 * EnglishPath — TOEIC Listening Module
 * Fase 14b: Practice Listening Parts 1–4
 * localStorage: ep_user_{id}_toeic_listening
 */
const TOEICListening = (() => {

  // ── State ──────────────────────────────────────────────
  let _state = {
    view: 'menu',        // menu | part-intro | practice | result
    part: null,          // 1 | 2 | 3 | 4
    items: [],           // items for current part
    currentIdx: 0,
    answers: {},
    submitted: false,
    isPlaying: false,
    hasPlayed: {},       // track which items have been played
    timerInterval: null,
    timerSeconds: 0,
    currentConvIdx: -1   // for part 3/4 audio line tracking
  };

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, 'toeic_listening') || {};
  }

  function _saveResult(part, correct, total) {
    const uid = _uid();
    if (!uid) return;
    const data = _loadData();
    if (!data.results) data.results = {};
    const key = 'part' + part;
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
    Storage.setUser(uid, 'toeic_listening', data);
  }

  // ── TTS ────────────────────────────────────────────────
  function _speak(text, rate, onEnd) {
    if (!window.speechSynthesis) { if (onEnd) onEnd(); return; }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US';
    utt.rate = rate || 0.88;
    utt.pitch = 1;
    if (onEnd) utt.onend = onEnd;
    utt.onerror = () => { if (onEnd) onEnd(); };
    window.speechSynthesis.speak(utt);
  }

  function _stopSpeech() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    _state.isPlaying = false;
    _renderPlayBtn();
  }

  // ── Timer ──────────────────────────────────────────────
  function _startTimer() {
    _state.timerSeconds = 0;
    if (_state.timerInterval) clearInterval(_state.timerInterval);
    _state.timerInterval = setInterval(() => {
      _state.timerSeconds++;
      const el = document.getElementById('tl-timer');
      if (el) {
        const m = Math.floor(_state.timerSeconds / 60).toString().padStart(2, '0');
        const s = (_state.timerSeconds % 60).toString().padStart(2, '0');
        el.textContent = m + ':' + s;
      }
    }, 1000);
  }

  function _stopTimer() {
    if (_state.timerInterval) clearInterval(_state.timerInterval);
    _state.timerInterval = null;
  }

  // ── Score ──────────────────────────────────────────────
  function _calcScore() {
    const items = _state.items;
    let correct = 0, total = 0;
    items.forEach((item, idx) => {
      if (_state.part === 3 || _state.part === 4) {
        item.questions.forEach((q, qi) => {
          total++;
          const key = idx + '_' + qi;
          if (_state.answers[key] === q.answer) correct++;
        });
      } else {
        total++;
        if (_state.answers[idx] === item.answer) correct++;
      }
    });
    return { correct, total };
  }

  // ── Render: Menu ───────────────────────────────────────
  function _renderMenu() {
    const data = _loadData();
    const parts = TOEICListeningData.getPartInfo();

    let cardsHtml = parts.map(p => {
      const res = data.results && data.results['part' + p.num];
      const badgeHtml = res
        ? `<span class="tl-best-badge">${res.best}% best</span>`
        : `<span class="tl-new-badge">Belum dimulai</span>`;
      return `
        <div class="tl-part-card" data-part="${p.num}">
          <div class="tl-part-icon">${p.icon}</div>
          <div class="tl-part-body">
            <div class="tl-part-title">${p.title}</div>
            <div class="tl-part-titleid">${p.titleID}</div>
            <div class="tl-part-desc">${p.descID}</div>
            <div class="tl-part-meta">
              <span class="tl-part-count">${p.count} soal latihan</span>
              ${badgeHtml}
            </div>
          </div>
          <button class="btn btn-primary tl-start-btn">Mulai →</button>
        </div>`;
    }).join('');

    const el = document.getElementById('tl-content');
    el.innerHTML = `
      <div class="tl-menu-hero">
        <div class="tl-menu-icon">🎧</div>
        <div>
          <h1 class="tl-menu-title">TOEIC Listening Practice</h1>
          <p class="tl-menu-sub">Latihan semua 4 bagian TOEIC Listening Section — Parts 1, 2, 3, dan 4 dengan audio TTS.</p>
        </div>
      </div>
      <div class="tl-tip-box">
        <strong>💡 Tips:</strong> Baca pertanyaan sebelum mendengarkan. Perhatikan kata kunci. Eliminasi jawaban yang jelas salah terlebih dahulu.
      </div>
      <div class="tl-parts-grid">
        ${cardsHtml}
      </div>`;

    el.querySelectorAll('.tl-part-card').forEach(card => {
      card.querySelector('.tl-start-btn').addEventListener('click', () => {
        _startPart(parseInt(card.dataset.part));
      });
    });

    ChallengeSystem.onModuleVisit('toeic_listening');
  }

  // ── Start Part ─────────────────────────────────────────
  function _startPart(partNum) {
    _state.part = partNum;
    _state.items = TOEICListeningData.getPart(partNum);
    _state.currentIdx = 0;
    _state.answers = {};
    _state.submitted = false;
    _state.hasPlayed = {};
    _state.isPlaying = false;
    _state.currentConvIdx = -1;
    _stopTimer();
    _startTimer();

    const partInfo = TOEICListeningData.getPartInfo().find(p => p.num === partNum);

    if (partNum === 1) _renderPart1Item(0);
    else if (partNum === 2) _renderPart2Item(0);
    else if (partNum === 3) _renderPart3Item(0);
    else if (partNum === 4) _renderPart4Item(0);
  }

  // ── Part 1 ─────────────────────────────────────────────
  function _renderPart1Item(idx) {
    _state.currentIdx = idx;
    const item = _state.items[idx];
    const total = _state.items.length;

    const choicesHtml = item.choices.map((c, i) => {
      const sel = _state.answers[idx] === i;
      const sub = _state.submitted;
      let cls = 'tl-choice';
      if (sub) {
        if (i === item.answer) cls += ' correct';
        else if (sel) cls += ' wrong';
        else cls += ' inactive';
      } else if (sel) cls += ' selected';
      return `<button class="${cls}" data-ci="${i}" ${sub ? 'disabled' : ''}>${'ABCD'[i]}. ${c}</button>`;
    }).join('');

    const played = _state.hasPlayed[idx];
    const playBtnLabel = _state.isPlaying ? '⏹ Hentikan' : (played ? '▶ Putar Ulang' : '▶ Putar Audio (TTS)');

    let explHtml = '';
    if (_state.submitted) {
      explHtml = `<div class="tl-explanation"><strong>Penjelasan:</strong> ${item.explanation}</div>`;
    }

    const el = document.getElementById('tl-content');
    el.innerHTML = `
      <div class="tl-practice-header">
        <button class="btn btn-ghost tl-back" id="tl-back">← Kembali</button>
        <div class="tl-progress-info">Part 1 &nbsp;·&nbsp; Soal ${idx + 1} / ${total}</div>
        <div class="tl-timer" id="tl-timer">00:00</div>
      </div>
      <div class="tl-progress-bar"><div class="tl-progress-fill" style="width:${((idx + 1) / total) * 100}%"></div></div>

      <div class="tl-item-card">
        <div class="tl-part-badge">🖼️ Part 1 — Photograph Description</div>
        <div class="tl-image-placeholder">
          <div class="tl-image-icon">🖼️</div>
          <div class="tl-image-desc">${item.imageDesc}</div>
        </div>
        <div class="tl-audio-section">
          <div class="tl-audio-hint">Klik Putar Audio untuk mendengarkan 4 pernyataan tentang foto ini. Lalu pilih jawaban yang paling sesuai.</div>
          <button class="btn btn-primary tl-play-btn" id="tl-play-btn">${playBtnLabel}</button>
        </div>
        <div class="tl-choices" id="tl-choices">${choicesHtml}</div>
        ${explHtml}
      </div>

      <div class="tl-nav-row">
        ${idx > 0 ? `<button class="btn btn-ghost" id="tl-prev">← Sebelumnya</button>` : '<div></div>'}
        ${!_state.submitted && _state.answers[idx] !== undefined
          ? `<button class="btn btn-success" id="tl-submit-item">Periksa Jawaban</button>` : ''}
        ${_state.submitted && idx < total - 1 ? `<button class="btn btn-primary" id="tl-next">Berikutnya →</button>` : ''}
        ${_state.submitted && idx === total - 1 ? `<button class="btn btn-success" id="tl-finish">Selesai & Lihat Hasil</button>` : ''}
      </div>`;

    _bindTimerDisplay();

    document.getElementById('tl-back').addEventListener('click', () => { _stopTimer(); _stopSpeech(); _renderMenu(); });
    document.getElementById('tl-play-btn').addEventListener('click', () => _playPart1Audio(idx));

    el.querySelectorAll('.tl-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        if (_state.submitted) return;
        _state.answers[idx] = parseInt(btn.dataset.ci);
        _renderPart1Item(idx);
      });
    });

    const si = el.querySelector('#tl-submit-item');
    if (si) si.addEventListener('click', () => { _state.submitted = true; _renderPart1Item(idx); });

    const nx = el.querySelector('#tl-next');
    if (nx) nx.addEventListener('click', () => { _state.submitted = false; _renderPart1Item(idx + 1); });

    const pr = el.querySelector('#tl-prev');
    if (pr) pr.addEventListener('click', () => { _state.submitted = false; _renderPart1Item(idx - 1); });

    const fi = el.querySelector('#tl-finish');
    if (fi) fi.addEventListener('click', () => { _stopTimer(); _stopSpeech(); _showResult(); });
  }

  function _playPart1Audio(idx) {
    const item = _state.items[idx];
    if (_state.isPlaying) { _stopSpeech(); return; }
    _state.isPlaying = true;
    _state.hasPlayed[idx] = true;
    _renderPlayBtn();
    const texts = [
      item.ttsPrompt,
      'Statement A. ' + item.choices[0],
      'Statement B. ' + item.choices[1],
      'Statement C. ' + item.choices[2],
      'Statement D. ' + item.choices[3]
    ];
    let i = 0;
    function next() {
      if (i >= texts.length || !_state.isPlaying) {
        _state.isPlaying = false;
        _renderPlayBtn();
        return;
      }
      _speak(texts[i], 0.88, () => { i++; setTimeout(next, 300); });
    }
    next();
  }

  // ── Part 2 ─────────────────────────────────────────────
  function _renderPart2Item(idx) {
    _state.currentIdx = idx;
    const item = _state.items[idx];
    const total = _state.items.length;

    const choicesHtml = item.choices.map((c, i) => {
      const sel = _state.answers[idx] === i;
      const sub = _state.submitted;
      let cls = 'tl-choice';
      if (sub) {
        if (i === item.answer) cls += ' correct';
        else if (sel) cls += ' wrong';
        else cls += ' inactive';
      } else if (sel) cls += ' selected';
      return `<button class="${cls}" data-ci="${i}" ${sub ? 'disabled' : ''}>${'ABC'[i]}. ${c}</button>`;
    }).join('');

    const played = _state.hasPlayed[idx];
    const playBtnLabel = _state.isPlaying ? '⏹ Hentikan' : (played ? '▶ Putar Ulang' : '▶ Putar Audio (TTS)');

    let explHtml = '';
    if (_state.submitted) {
      explHtml = `<div class="tl-explanation"><strong>Penjelasan:</strong> ${item.explanation}</div>`;
    }

    const el = document.getElementById('tl-content');
    el.innerHTML = `
      <div class="tl-practice-header">
        <button class="btn btn-ghost tl-back" id="tl-back">← Kembali</button>
        <div class="tl-progress-info">Part 2 &nbsp;·&nbsp; Soal ${idx + 1} / ${total}</div>
        <div class="tl-timer" id="tl-timer">00:00</div>
      </div>
      <div class="tl-progress-bar"><div class="tl-progress-fill" style="width:${((idx + 1) / total) * 100}%"></div></div>

      <div class="tl-item-card">
        <div class="tl-part-badge">💬 Part 2 — Question-Response</div>
        <div class="tl-audio-section">
          <div class="tl-audio-hint">Klik Putar Audio untuk mendengarkan pertanyaan dan tiga respons. Pilih respons yang paling tepat.</div>
          <button class="btn btn-primary tl-play-btn" id="tl-play-btn">${playBtnLabel}</button>
        </div>
        ${_state.hasPlayed[idx] || _state.submitted ? `
          <div class="tl-transcript-box">
            <div class="tl-transcript-label">Pertanyaan:</div>
            <div class="tl-transcript-text">${item.question}</div>
          </div>` : ''}
        <div class="tl-choices" id="tl-choices">${choicesHtml}</div>
        ${explHtml}
      </div>

      <div class="tl-nav-row">
        ${idx > 0 ? `<button class="btn btn-ghost" id="tl-prev">← Sebelumnya</button>` : '<div></div>'}
        ${!_state.submitted && _state.answers[idx] !== undefined
          ? `<button class="btn btn-success" id="tl-submit-item">Periksa Jawaban</button>` : ''}
        ${_state.submitted && idx < total - 1 ? `<button class="btn btn-primary" id="tl-next">Berikutnya →</button>` : ''}
        ${_state.submitted && idx === total - 1 ? `<button class="btn btn-success" id="tl-finish">Selesai & Lihat Hasil</button>` : ''}
      </div>`;

    _bindTimerDisplay();

    document.getElementById('tl-back').addEventListener('click', () => { _stopTimer(); _stopSpeech(); _renderMenu(); });
    document.getElementById('tl-play-btn').addEventListener('click', () => _playPart2Audio(idx));

    el.querySelectorAll('.tl-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        if (_state.submitted) return;
        _state.answers[idx] = parseInt(btn.dataset.ci);
        _renderPart2Item(idx);
      });
    });

    const si = el.querySelector('#tl-submit-item');
    if (si) si.addEventListener('click', () => { _state.submitted = true; _renderPart2Item(idx); });

    const nx = el.querySelector('#tl-next');
    if (nx) nx.addEventListener('click', () => { _state.submitted = false; _renderPart2Item(idx + 1); });

    const pr = el.querySelector('#tl-prev');
    if (pr) pr.addEventListener('click', () => { _state.submitted = false; _renderPart2Item(idx - 1); });

    const fi = el.querySelector('#tl-finish');
    if (fi) fi.addEventListener('click', () => { _stopTimer(); _stopSpeech(); _showResult(); });
  }

  function _playPart2Audio(idx) {
    const item = _state.items[idx];
    if (_state.isPlaying) { _stopSpeech(); return; }
    _state.isPlaying = true;
    _state.hasPlayed[idx] = true;
    _renderPlayBtn();
    const texts = [
      item.question,
      'Response A. ' + item.choices[0],
      'Response B. ' + item.choices[1],
      'Response C. ' + item.choices[2]
    ];
    let i = 0;
    function next() {
      if (i >= texts.length || !_state.isPlaying) {
        _state.isPlaying = false;
        _renderPlayBtn();
        _renderPart2Item(idx); // re-render to show transcript
        return;
      }
      _speak(texts[i], 0.88, () => { i++; setTimeout(next, 400); });
    }
    next();
  }

  // ── Part 3 & 4 ─────────────────────────────────────────
  function _renderConvItem(idx, partNum) {
    _state.currentIdx = idx;
    const item = _state.items[idx];
    const total = _state.items.length;
    const partLabel = partNum === 3 ? '🗣️ Part 3 — Short Conversation' : '📢 Part 4 — Short Talk';

    const questionsHtml = item.questions.map((q, qi) => {
      const key = idx + '_' + qi;
      const choicesHtml = q.choices.map((c, ci) => {
        const sel = _state.answers[key] === ci;
        const sub = _state.submitted;
        let cls = 'tl-choice tl-choice-sm';
        if (sub) {
          if (ci === q.answer) cls += ' correct';
          else if (sel) cls += ' wrong';
          else cls += ' inactive';
        } else if (sel) cls += ' selected';
        return `<button class="${cls}" data-qi="${qi}" data-ci="${ci}" ${sub ? 'disabled' : ''}>${'ABCD'[ci]}. ${c}</button>`;
      }).join('');
      return `
        <div class="tl-question-block">
          <div class="tl-question-label">Pertanyaan ${qi + 1}</div>
          <div class="tl-question-text">${q.question}</div>
          <div class="tl-choices">${choicesHtml}</div>
        </div>`;
    }).join('');

    const played = _state.hasPlayed[idx];
    const playBtnLabel = _state.isPlaying ? '⏹ Hentikan' : (played ? '▶ Putar Ulang' : '▶ Putar Audio (TTS)');

    const allAnswered = item.questions.every((q, qi) => _state.answers[idx + '_' + qi] !== undefined);

    const el = document.getElementById('tl-content');
    el.innerHTML = `
      <div class="tl-practice-header">
        <button class="btn btn-ghost tl-back" id="tl-back">← Kembali</button>
        <div class="tl-progress-info">Part ${partNum} &nbsp;·&nbsp; Set ${idx + 1} / ${total}</div>
        <div class="tl-timer" id="tl-timer">00:00</div>
      </div>
      <div class="tl-progress-bar"><div class="tl-progress-fill" style="width:${((idx + 1) / total) * 100}%"></div></div>

      <div class="tl-item-card">
        <div class="tl-part-badge">${partLabel}</div>
        <div class="tl-conv-title">${item.title}</div>
        <div class="tl-audio-section">
          <div class="tl-audio-hint">
            ${partNum === 3 ? 'Klik Putar untuk mendengarkan percakapan. Kemudian jawab 3 pertanyaan di bawah.' :
              'Klik Putar untuk mendengarkan monolog. Kemudian jawab 3 pertanyaan di bawah.'}
          </div>
          <button class="btn btn-primary tl-play-btn" id="tl-play-btn">${playBtnLabel}</button>
        </div>
        ${(_state.hasPlayed[idx] || _state.submitted) ? _renderTranscript(item) : ''}
        <div class="tl-questions-section">${questionsHtml}</div>
      </div>

      <div class="tl-nav-row">
        ${idx > 0 ? `<button class="btn btn-ghost" id="tl-prev">← Sebelumnya</button>` : '<div></div>'}
        ${!_state.submitted && allAnswered
          ? `<button class="btn btn-success" id="tl-submit-item">Periksa Jawaban</button>` : ''}
        ${_state.submitted && idx < total - 1 ? `<button class="btn btn-primary" id="tl-next">Berikutnya →</button>` : ''}
        ${_state.submitted && idx === total - 1 ? `<button class="btn btn-success" id="tl-finish">Selesai & Lihat Hasil</button>` : ''}
      </div>`;

    _bindTimerDisplay();

    document.getElementById('tl-back').addEventListener('click', () => { _stopTimer(); _stopSpeech(); _renderMenu(); });
    document.getElementById('tl-play-btn').addEventListener('click', () => _playConvAudio(idx, partNum));

    el.querySelectorAll('.tl-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        if (_state.submitted) return;
        const qi = parseInt(btn.dataset.qi);
        const ci = parseInt(btn.dataset.ci);
        _state.answers[idx + '_' + qi] = ci;
        _renderConvItem(idx, partNum);
      });
    });

    const si = el.querySelector('#tl-submit-item');
    if (si) si.addEventListener('click', () => { _state.submitted = true; _renderConvItem(idx, partNum); });

    const nx = el.querySelector('#tl-next');
    if (nx) nx.addEventListener('click', () => { _state.submitted = false; _renderConvItem(idx + 1, partNum); });

    const pr = el.querySelector('#tl-prev');
    if (pr) pr.addEventListener('click', () => { _state.submitted = false; _renderConvItem(idx - 1, partNum); });

    const fi = el.querySelector('#tl-finish');
    if (fi) fi.addEventListener('click', () => { _stopTimer(); _stopSpeech(); _showResult(); });
  }

  function _renderPart3Item(idx) { _renderConvItem(idx, 3); }
  function _renderPart4Item(idx) { _renderConvItem(idx, 4); }

  function _renderTranscript(item) {
    if (!item.audio) return '';
    const lines = item.audio.map(line =>
      `<div class="tl-transcript-line"><span class="tl-speaker">${line.label}:</span> <span class="tl-spoken">${line.text}</span></div>`
    ).join('');
    return `<div class="tl-transcript-box"><div class="tl-transcript-label">Transkrip Audio:</div>${lines}</div>`;
  }

  function _playConvAudio(idx, partNum) {
    const item = _state.items[idx];
    if (_state.isPlaying) { _stopSpeech(); return; }
    _state.isPlaying = true;
    _state.hasPlayed[idx] = true;
    _renderPlayBtn();

    const lines = item.audio;
    let i = 0;
    function next() {
      if (i >= lines.length || !_state.isPlaying) {
        _state.isPlaying = false;
        _renderPlayBtn();
        _renderConvItem(idx, partNum); // re-render to show transcript
        return;
      }
      _speak(lines[i].text, item.ttsRate || 0.88, () => { i++; setTimeout(next, 350); });
    }
    next();
  }

  // ── Result ─────────────────────────────────────────────
  function _showResult() {
    const { correct, total } = _calcScore();
    const pct = Math.round((correct / total) * 100);
    const part = _state.part;

    _saveResult(part, correct, total);

    const xp = correct * 3 + (pct === 100 ? 20 : 0);
    XPSystem.addXP(xp, 'TOEIC Listening Part ' + part);
    ChallengeSystem.onQuizComplete(pct);

    let emoji = '💪';
    if (pct === 100) emoji = '🏆';
    else if (pct >= 80) emoji = '🎉';
    else if (pct >= 60) emoji = '👍';

    const partNames = { 1: 'Photograph Description', 2: 'Question-Response', 3: 'Short Conversations', 4: 'Short Talks' };

    let itemReviewHtml = '';
    if (part === 1 || part === 2) {
      itemReviewHtml = _state.items.map((item, idx) => {
        const userAns = _state.answers[idx];
        const isCorrect = userAns === item.answer;
        return `
          <div class="tl-review-item ${isCorrect ? 'correct' : 'wrong'}">
            <div class="tl-review-num">Soal ${idx + 1}</div>
            <div class="tl-review-answer">
              <span class="${isCorrect ? 'tl-correct-label' : 'tl-wrong-label'}">${isCorrect ? '✓ Benar' : '✗ Salah'}</span>
              <span class="tl-correct-answer">Jawaban: ${'ABCD'[item.answer]}. ${item.choices[item.answer]}</span>
            </div>
            ${!isCorrect && item.explanation ? `<div class="tl-review-expl">${item.explanation}</div>` : ''}
          </div>`;
      }).join('');
    } else {
      itemReviewHtml = _state.items.map((item, idx) => {
        return item.questions.map((q, qi) => {
          const key = idx + '_' + qi;
          const userAns = _state.answers[key];
          const isCorrect = userAns === q.answer;
          return `
            <div class="tl-review-item ${isCorrect ? 'correct' : 'wrong'}">
              <div class="tl-review-num">Set ${idx + 1}, Q${qi + 1}</div>
              <div class="tl-review-answer">
                <span class="${isCorrect ? 'tl-correct-label' : 'tl-wrong-label'}">${isCorrect ? '✓ Benar' : '✗ Salah'}</span>
                <span class="tl-correct-answer">Jawaban: ${'ABCD'[q.answer]}. ${q.choices[q.answer]}</span>
              </div>
            </div>`;
        }).join('');
      }).join('');
    }

    const el = document.getElementById('tl-content');
    el.innerHTML = `
      <div class="tl-result-card">
        <div class="tl-result-emoji">${emoji}</div>
        <div class="tl-result-title">Hasil Latihan Selesai!</div>
        <div class="tl-result-part">Part ${part}: ${partNames[part]}</div>
        <div class="tl-result-score">${correct} / ${total}</div>
        <div class="tl-result-pct">${pct}%</div>
        <div class="tl-result-xp">+${xp} XP</div>
        <div class="tl-result-tips">
          ${pct < 60 ? '💡 Coba dengarkan ulang audio dan perhatikan kata kunci. Latihan Part ini lagi untuk meningkatkan skor.' :
            pct < 80 ? '👍 Bagus! Tingkatkan fokus pada detail — tanggal, angka, dan nama spesifik.' :
            '🎉 Hasil luar biasa! Kamu sudah sangat siap untuk bagian ini.'}
        </div>
      </div>
      <div class="tl-review-section">
        <h3 class="tl-review-title">Review Jawaban</h3>
        ${itemReviewHtml}
      </div>
      <div class="tl-result-actions">
        <button class="btn btn-ghost" id="tl-menu-btn">← Menu Utama</button>
        <button class="btn btn-primary" id="tl-retry-btn">🔄 Coba Lagi</button>
      </div>`;

    document.getElementById('tl-menu-btn').addEventListener('click', _renderMenu);
    document.getElementById('tl-retry-btn').addEventListener('click', () => _startPart(part));
  }

  // ── Helpers ────────────────────────────────────────────
  function _bindTimerDisplay() {
    const el = document.getElementById('tl-timer');
    if (el) {
      const m = Math.floor(_state.timerSeconds / 60).toString().padStart(2, '0');
      const s = (_state.timerSeconds % 60).toString().padStart(2, '0');
      el.textContent = m + ':' + s;
    }
  }

  function _renderPlayBtn() {
    const btn = document.getElementById('tl-play-btn');
    if (!btn) return;
    const played = _state.hasPlayed[_state.currentIdx];
    btn.textContent = _state.isPlaying ? '⏹ Hentikan' : (played ? '▶ Putar Ulang' : '▶ Putar Audio (TTS)');
  }

  // ── Init ───────────────────────────────────────────────
  function init() {
    Router.guard();
    App.init('toeic-listening');
    _renderMenu();
  }

  return { init };

})();

document.addEventListener('DOMContentLoaded', TOEICListening.init);
