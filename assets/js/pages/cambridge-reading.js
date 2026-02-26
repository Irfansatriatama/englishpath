/**
 * EnglishPath — Cambridge Reading & Use of English Module
 * Fase 16b: Practice Reading & Use of English (Parts 1–7)
 * localStorage: ep_user_{id}_cambridge_reading
 */
const CambridgeReading = (() => {

  // ── State ─────────────────────────────────────────────────────────────────
  let _state = {
    view: 'menu',          // menu | part_menu | exercise | result
    part: null,            // 1–7
    setIdx: 0,
    itemIdx: 0,            // for kwt & part4
    answers: {},           // {gapNum or questionId: answer}
    submitted: false,
    score: 0,
    total: 0,
    timerInterval: null,
    timerSeconds: 0,
    currentData: null
  };

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, 'cambridge_reading') || {};
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
    Storage.setUser(uid, 'cambridge_reading', data);
  }

  // ── Timer ─────────────────────────────────────────────────────────────────
  function _startTimer() {
    _state.timerSeconds = 0;
    if (_state.timerInterval) clearInterval(_state.timerInterval);
    _state.timerInterval = setInterval(() => {
      _state.timerSeconds++;
      const el = document.getElementById('crm-timer');
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

  // ── Render helper ─────────────────────────────────────────────────────────
  function _set(html) {
    const el = document.getElementById('crm-content');
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
    const parts = CambridgeReadingData.getAllParts();
    const data = _loadData();
    const results = data.results || {};

    const cards = parts.map(p => {
      const keys = Object.keys(results).filter(k => k.startsWith(`p${p.num}_`));
      const done = keys.length;
      const bestArr = keys.map(k => results[k].best);
      const avgBest = done ? Math.round(bestArr.reduce((a, b) => a + b, 0) / done) : 0;
      const progressHtml = done
        ? `<span class="crm-best">${done} set selesai · Rata-rata terbaik: ${avgBest}%</span>`
        : `<span class="crm-best crm-best-none">Belum pernah dicoba</span>`;

      return `
      <div class="crm-card" data-part="${p.num}">
        <div class="crm-card-icon">${p.icon}</div>
        <div class="crm-card-body">
          <div class="crm-card-title">${p.label}</div>
          <div class="crm-card-desc">${p.desc}</div>
          ${progressHtml}
        </div>
        <button class="btn btn-primary btn-sm" onclick="CambridgeReading.selectPart(${p.num})">Mulai</button>
      </div>`;
    }).join('');

    _set(`
      <div class="crm-header">
        <a href="index.html" class="btn btn-ghost btn-sm">← Cambridge Hub</a>
        <h1 class="crm-title">📖 Reading & Use of English</h1>
        <p class="crm-subtitle">7 Parts — Use of English (Parts 1–4) + Reading Comprehension (Parts 5–7)</p>
      </div>
      <div class="crm-overview-badges">
        <div class="crm-badge-item"><span class="crm-badge-icon">🔤</span><span>Use of English</span><small>Parts 1–4</small></div>
        <div class="crm-badge-item"><span class="crm-badge-icon">📚</span><span>Reading</span><small>Parts 5–7</small></div>
        <div class="crm-badge-item"><span class="crm-badge-icon">⏱️</span><span>75 menit</span><small>Waktu ujian asli</small></div>
      </div>
      <div class="crm-cards">${cards}</div>
    `);
  }

  // ── PART MENU ─────────────────────────────────────────────────────────────
  function _renderPartMenu(part) {
    _state.part = part;
    _state.view = 'part_menu';
    const data = _loadData();
    const results = data.results || {};

    let sets = [];
    let introHtml = '';

    if (part === 1) {
      sets = CambridgeReadingData.getPart1Sets();
      introHtml = `<p>Baca teks dengan 6 kata yang hilang. Pilih kata yang paling tepat dari pilihan A, B, C, atau D untuk setiap nomor.</p>`;
    } else if (part === 2) {
      sets = CambridgeReadingData.getPart2Sets();
      introHtml = `<p>Baca teks dengan 7 kata yang hilang. Tulis satu kata yang paling tepat untuk setiap nomor (grammar atau kosakata fungsi).</p>`;
    } else if (part === 3) {
      sets = CambridgeReadingData.getPart3Sets();
      introHtml = `<p>Baca teks dengan 8 kata yang hilang. Gunakan kata dasar yang diberikan untuk membentuk kata yang tepat (noun, adjective, dll).</p>`;
    } else if (part === 4) {
      sets = CambridgeReadingData.getPart4Sets();
      introHtml = `<p>Tulis ulang kalimat menggunakan kata kunci yang diberikan. Gunakan 2–5 kata termasuk kata kunci. Jangan ubah kata kuncinya.</p>`;
    } else if (part === 5) {
      sets = CambridgeReadingData.getReadingPassages().filter(p => p.part === 5);
      introHtml = `<p>Baca teks panjang dan jawab 4 soal pilihan ganda. Baca teks dengan seksama sebelum menjawab.</p>`;
    } else if (part === 6) {
      sets = CambridgeReadingData.getReadingPassages().filter(p => p.part === 6);
      introHtml = `<p>Baca teks dengan 4 paragraf yang dihilangkan. Pilih paragraf mana (A–F) yang tepat untuk setiap celah. Ada 2 pilihan yang tidak digunakan.</p>`;
    } else if (part === 7) {
      sets = CambridgeReadingData.getReadingPassages().filter(p => p.part === 7);
      introHtml = `<p>Baca beberapa teks pendek, lalu jawab pertanyaan dengan mencocokkan ke teks yang tepat. Satu teks bisa cocok untuk lebih dari satu pertanyaan.</p>`;
    }

    const partMeta = CambridgeReadingData.getAllParts().find(p => p.num === part);

    const setCards = sets.map((s, i) => {
      const r = results[s.id];
      const progressHtml = r
        ? `<span class="crm-best">Terbaik: ${r.best}% · ${r.attempts}× latihan</span>`
        : `<span class="crm-best crm-best-none">Belum dicoba</span>`;
      return `
      <div class="crm-set-card">
        <div class="crm-set-icon">${s.icon || partMeta.icon}</div>
        <div class="crm-set-body">
          <div class="crm-set-title">${s.title || s.label || `Set ${i + 1}`}</div>
          <div class="crm-set-level">${s.level || 'B2/C1'}</div>
          ${progressHtml}
        </div>
        <button class="btn btn-primary btn-sm" onclick="CambridgeReading.startExercise(${part}, ${i})">Mulai</button>
      </div>`;
    }).join('');

    _set(`
      <div class="crm-header">
        <button class="btn btn-ghost btn-sm" onclick="CambridgeReading.showMenu()">← Kembali</button>
        <h2 class="crm-title">${partMeta.icon} ${partMeta.label}</h2>
        <div class="crm-intro">${introHtml}</div>
      </div>
      <div class="crm-set-cards">${setCards}</div>
    `);
  }

  // ── EXERCISES ─────────────────────────────────────────────────────────────
  function _renderPart1(setIdx) {
    const sets = CambridgeReadingData.getPart1Sets();
    const set = sets[setIdx];
    _state.currentData = set;
    _state.answers = {};
    _state.submitted = false;
    _startTimer();
    _scrollTop();

    // Replace __(N)__ with styled selects
    let textHtml = set.text.replace(/__\((\d+)\)__/g, (match, num) => {
      const gap = set.gaps.find(g => g.num === parseInt(num));
      const opts = gap.options.map((o, i) => `<option value="${i}">${String.fromCharCode(65 + i)}) ${o}</option>`).join('');
      return `<select class="crm-gap-select" data-gap="${num}" onchange="CambridgeReading.setAnswer(${num}, this.value)">
        <option value="">— pilih —</option>${opts}
      </select>`;
    });

    _set(`
      <div class="crm-ex-header">
        <button class="btn btn-ghost btn-sm" onclick="CambridgeReading.selectPart(1)">← Kembali</button>
        <div class="crm-ex-title">Part 1: ${set.title}</div>
        <div class="crm-timer-wrap"><span class="crm-timer-icon">⏱️</span><span id="crm-timer">00:00</span></div>
      </div>
      <div class="crm-passage">${textHtml}</div>
      <button class="btn btn-primary crm-submit-btn" onclick="CambridgeReading.submitPart1()">Periksa Jawaban</button>
    `);
  }

  function _renderPart2(setIdx) {
    const sets = CambridgeReadingData.getPart2Sets();
    const set = sets[setIdx];
    _state.currentData = set;
    _state.answers = {};
    _state.submitted = false;
    _startTimer();
    _scrollTop();

    let textHtml = set.text.replace(/__\((\d+)\)__/g, (match, num) => {
      return `<input type="text" class="crm-gap-input" data-gap="${num}" placeholder="(${num})"
        oninput="CambridgeReading.setAnswer(${num}, this.value.trim().toLowerCase())">`;
    });

    _set(`
      <div class="crm-ex-header">
        <button class="btn btn-ghost btn-sm" onclick="CambridgeReading.selectPart(2)">← Kembali</button>
        <div class="crm-ex-title">Part 2: ${set.title}</div>
        <div class="crm-timer-wrap"><span class="crm-timer-icon">⏱️</span><span id="crm-timer">00:00</span></div>
      </div>
      <div class="crm-instruction">Tulis <strong>satu kata</strong> untuk setiap celah.</div>
      <div class="crm-passage">${textHtml}</div>
      <button class="btn btn-primary crm-submit-btn" onclick="CambridgeReading.submitPart2()">Periksa Jawaban</button>
    `);
  }

  function _renderPart3(setIdx) {
    const sets = CambridgeReadingData.getPart3Sets();
    const set = sets[setIdx];
    _state.currentData = set;
    _state.answers = {};
    _state.submitted = false;
    _startTimer();
    _scrollTop();

    let textHtml = set.text.replace(/__\((\d+)(\w+)__/g, (match, num, base) => {
      return `<span class="crm-gap-wf">
        <input type="text" class="crm-gap-input crm-gap-wf-input" data-gap="${num}" placeholder="(${num})"
          oninput="CambridgeReading.setAnswer(${num}, this.value.trim().toLowerCase())">
        <span class="crm-gap-base">${base}</span>
      </span>`;
    });

    _set(`
      <div class="crm-ex-header">
        <button class="btn btn-ghost btn-sm" onclick="CambridgeReading.selectPart(3)">← Kembali</button>
        <div class="crm-ex-title">Part 3: ${set.title}</div>
        <div class="crm-timer-wrap"><span class="crm-timer-icon">⏱️</span><span id="crm-timer">00:00</span></div>
      </div>
      <div class="crm-instruction">Gunakan kata dasar dalam <strong>HURUF KAPITAL</strong> untuk membentuk kata yang tepat.</div>
      <div class="crm-passage">${textHtml}</div>
      <button class="btn btn-primary crm-submit-btn" onclick="CambridgeReading.submitPart3()">Periksa Jawaban</button>
    `);
  }

  function _renderPart4(setIdx, itemIdx) {
    const sets = CambridgeReadingData.getPart4Sets();
    const set = sets[setIdx];
    _state.currentData = set;
    _state.setIdx = setIdx;
    _state.itemIdx = itemIdx || 0;
    _state.answers = _state.answers || {};
    _state.submitted = false;
    _startTimer();
    _scrollTop();

    const item = set.items[_state.itemIdx];
    const progress = `${_state.itemIdx + 1} / ${set.items.length}`;

    _set(`
      <div class="crm-ex-header">
        <button class="btn btn-ghost btn-sm" onclick="CambridgeReading.selectPart(4)">← Kembali</button>
        <div class="crm-ex-title">Part 4: Key Word Transformation</div>
        <div class="crm-timer-wrap"><span class="crm-timer-icon">⏱️</span><span id="crm-timer">00:00</span></div>
      </div>
      <div class="crm-kwt-progress">${progress}</div>
      <div class="crm-kwt-card">
        <div class="crm-kwt-original">${item.original}</div>
        <div class="crm-kwt-keyword">Kata kunci: <strong>${item.keyword}</strong></div>
        <div class="crm-kwt-hint">Tulis ulang kalimat di atas menggunakan kata kunci (2–5 kata termasuk kata kunci):</div>
        <textarea class="crm-kwt-input" rows="2" placeholder="Tulis jawaban kamu di sini..."
          oninput="CambridgeReading.setAnswer('kwt', this.value.trim())"></textarea>
      </div>
      <div class="crm-kwt-actions">
        <button class="btn btn-primary" onclick="CambridgeReading.checkKWT()">Periksa</button>
      </div>
    `);
  }

  function _renderPart5(passageIdx) {
    const passages = CambridgeReadingData.getReadingPassages().filter(p => p.part === 5);
    const passage = passages[passageIdx];
    _state.currentData = passage;
    _state.answers = {};
    _state.submitted = false;
    _state.questionIdx = 0;
    _startTimer();
    _scrollTop();

    const qHtml = passage.questions.map((q, qi) => {
      const choices = q.choices.map((c, ci) => `
        <label class="crm-choice">
          <input type="radio" name="q${qi}" value="${ci}"
            onchange="CambridgeReading.setAnswer('q${qi}', ${ci})">
          <span class="crm-choice-letter">${String.fromCharCode(65 + ci)}</span>
          <span>${c}</span>
        </label>`).join('');
      return `
        <div class="crm-question" id="crmq${qi}">
          <div class="crm-q-num">Pertanyaan ${qi + 1}</div>
          <div class="crm-q-text">${q.question}</div>
          <div class="crm-choices">${choices}</div>
        </div>`;
    }).join('');

    _set(`
      <div class="crm-ex-header">
        <button class="btn btn-ghost btn-sm" onclick="CambridgeReading.selectPart(5)">← Kembali</button>
        <div class="crm-ex-title">${passage.icon} ${passage.title}</div>
        <div class="crm-timer-wrap"><span class="crm-timer-icon">⏱️</span><span id="crm-timer">00:00</span></div>
      </div>
      <div class="crm-reading-layout">
        <div class="crm-passage-panel">${passage.passage}</div>
        <div class="crm-questions-panel">
          ${qHtml}
          <button class="btn btn-primary crm-submit-btn" onclick="CambridgeReading.submitReading()">Periksa Jawaban</button>
        </div>
      </div>
    `);
  }

  function _renderPart6(passageIdx) {
    const passages = CambridgeReadingData.getReadingPassages().filter(p => p.part === 6);
    const passage = passages[passageIdx];
    _state.currentData = passage;
    _state.answers = {};
    _state.submitted = false;
    _startTimer();
    _scrollTop();

    const mainText = passage.passage.map(block => {
      if (block.text.startsWith('[GAP')) {
        const gapNum = parseInt(block.text.match(/\d+/)[0]);
        return `<div class="crm-gap-block">
          <div class="crm-gap-label">Celah ${gapNum}</div>
          <select class="crm-gap-select crm-gapped-select" data-gap="${gapNum}"
            onchange="CambridgeReading.setAnswer(${gapNum}, this.value)">
            <option value="">— pilih paragraf —</option>
            ${passage.removed_paragraphs.map(p => `<option value="${p.id}">${p.id}</option>`).join('')}
          </select>
        </div>`;
      }
      return `<p>${block.text}</p>`;
    }).join('');

    const removedHtml = passage.removed_paragraphs.map(p => `
      <div class="crm-removed-para">
        <div class="crm-removed-label">Paragraf ${p.id}</div>
        <p>${p.text}</p>
      </div>`).join('');

    _set(`
      <div class="crm-ex-header">
        <button class="btn btn-ghost btn-sm" onclick="CambridgeReading.selectPart(6)">← Kembali</button>
        <div class="crm-ex-title">${passage.icon} ${passage.title}</div>
        <div class="crm-timer-wrap"><span class="crm-timer-icon">⏱️</span><span id="crm-timer">00:00</span></div>
      </div>
      <div class="crm-instruction">${passage.passage_intro}</div>
      <div class="crm-gapped-layout">
        <div class="crm-gapped-main">${mainText}</div>
        <div class="crm-gapped-removed">
          <div class="crm-removed-title">Paragraf yang Dihilangkan</div>
          ${removedHtml}
        </div>
      </div>
      <button class="btn btn-primary crm-submit-btn" onclick="CambridgeReading.submitGapped()">Periksa Jawaban</button>
    `);
  }

  function _renderPart7(passageIdx) {
    const passages = CambridgeReadingData.getReadingPassages().filter(p => p.part === 7);
    const passage = passages[passageIdx];
    _state.currentData = passage;
    _state.answers = {};
    _state.submitted = false;
    _startTimer();
    _scrollTop();

    const textsHtml = passage.texts.map(t => `
      <div class="crm-mm-text">
        <div class="crm-mm-text-label">Teks ${t.id} — ${t.author}</div>
        <p>${t.text}</p>
      </div>`).join('');

    const questionsHtml = passage.questions.map((q, qi) => {
      const opts = passage.texts.map(t => `<option value="${t.id}">${t.id}</option>`).join('');
      return `
        <div class="crm-mm-q">
          <div class="crm-q-num">Q${qi + 1}</div>
          <div class="crm-q-text">${q.question}</div>
          <select class="crm-gap-select" data-qid="${q.id}"
            onchange="CambridgeReading.setAnswer('${q.id}', this.value)">
            <option value="">— pilih teks —</option>
            ${opts}
          </select>
        </div>`;
    }).join('');

    _set(`
      <div class="crm-ex-header">
        <button class="btn btn-ghost btn-sm" onclick="CambridgeReading.selectPart(7)">← Kembali</button>
        <div class="crm-ex-title">${passage.icon} ${passage.title}</div>
        <div class="crm-timer-wrap"><span class="crm-timer-icon">⏱️</span><span id="crm-timer">00:00</span></div>
      </div>
      <div class="crm-instruction">${passage.intro}</div>
      <div class="crm-mm-layout">
        <div class="crm-mm-texts">${textsHtml}</div>
        <div class="crm-mm-questions">
          <div class="crm-mm-q-title">Pertanyaan</div>
          ${questionsHtml}
          <button class="btn btn-primary crm-submit-btn" onclick="CambridgeReading.submitMultipleMatching()">Periksa Jawaban</button>
        </div>
      </div>
    `);
  }

  // ── SUBMIT LOGIC ──────────────────────────────────────────────────────────
  function _renderFeedbackBlock(gaps, answers, type) {
    // type: 'select' (index) or 'text' (string)
    let correct = 0;
    const rows = gaps.map(g => {
      const userAns = answers[g.num];
      let isCorrect = false;
      let userDisplay = '—';
      let correctDisplay = '';

      if (type === 'select') {
        isCorrect = parseInt(userAns) === g.answer;
        userDisplay = userAns !== undefined ? g.options[parseInt(userAns)] : '—';
        correctDisplay = g.options[g.answer];
      } else if (type === 'text') {
        const correct_lower = (g.answer || '').toLowerCase().trim();
        const user_lower = (userAns || '').toLowerCase().trim();
        isCorrect = user_lower === correct_lower;
        userDisplay = userAns || '—';
        correctDisplay = g.answer;
      } else if (type === 'wf') {
        const correct_lower = (g.answer || '').toLowerCase().trim();
        const user_lower = (userAns || '').toLowerCase().trim();
        isCorrect = user_lower === correct_lower;
        userDisplay = userAns || '—';
        correctDisplay = g.answer;
      }

      if (isCorrect) correct++;
      return `
        <div class="crm-fb-row ${isCorrect ? 'crm-fb-correct' : 'crm-fb-wrong'}">
          <div class="crm-fb-num">(${g.num})</div>
          <div class="crm-fb-user">${isCorrect ? '✅' : '❌'} ${userDisplay}</div>
          ${!isCorrect ? `<div class="crm-fb-correct-ans">→ ${correctDisplay}</div>` : ''}
          <div class="crm-fb-explain">${g.explanation}</div>
        </div>`;
    });
    return { html: rows.join(''), correct };
  }

  function _showResultScreen(correct, total, key, partLabel, feedbackHtml) {
    _stopTimer();
    const pct = Math.round((correct / total) * 100);
    _saveResult(key, correct, total);

    const xp = pct >= 80 ? 20 : pct >= 60 ? 12 : 7;
    if (typeof XPSystem !== 'undefined') XPSystem.add(xp, `Cambridge Reading Part`);
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
          <button class="btn btn-ghost" onclick="CambridgeReading.showMenu()">Kembali ke Menu</button>
          <button class="btn btn-primary" onclick="CambridgeReading.selectPart(${_state.part})">Coba Lagi</button>
        </div>
      </div>
    `);
    _scrollTop();
  }

  // ── KWT CHECK ─────────────────────────────────────────────────────────────
  function _checkKWT() {
    const set = _state.currentData;
    const item = set.items[_state.itemIdx];
    const userAnswer = _state.answers['kwt'] || '';

    // Show answer & explanation
    const userEl = document.querySelector('.crm-kwt-input');

    let feedbackHtml = `
      <div class="crm-kwt-feedback">
        <div class="crm-kwt-fb-label">Jawaban Referensi:</div>
        <div class="crm-kwt-fb-answer">${item.answer}</div>
        <div class="crm-kwt-fb-explain">${item.explanation}</div>
        <div class="crm-kwt-fb-yours"><strong>Jawaban kamu:</strong> ${userAnswer || '(kosong)'}</div>
      </div>`;

    const actionsEl = document.querySelector('.crm-kwt-actions');
    if (actionsEl) {
      actionsEl.innerHTML = feedbackHtml;
      const isLast = _state.itemIdx >= set.items.length - 1;
      if (isLast) {
        actionsEl.innerHTML += `
          <div class="crm-kwt-nav">
            <button class="btn btn-ghost" onclick="CambridgeReading.selectPart(4)">← Kembali</button>
            <button class="btn btn-primary" onclick="CambridgeReading.selectPart(4)">Selesai ✓</button>
          </div>`;
        // Save some XP
        const xp = 10;
        if (typeof XPSystem !== 'undefined') XPSystem.add(xp, 'Cambridge KWT');
      } else {
        actionsEl.innerHTML += `
          <button class="btn btn-primary" onclick="CambridgeReading.nextKWT()">Lanjut →</button>`;
      }
    }
  }

  // ── PUBLIC API ─────────────────────────────────────────────────────────────
  return {
    init() {
      if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onModuleVisit('cambridge-reading');
      _renderMenu();
    },

    showMenu() { _renderMenu(); },

    selectPart(part) {
      _stopTimer();
      _state.part = part;
      _renderPartMenu(part);
    },

    startExercise(part, idx) {
      _state.setIdx = idx;
      _state.answers = {};
      _state.submitted = false;
      if (part === 1) _renderPart1(idx);
      else if (part === 2) _renderPart2(idx);
      else if (part === 3) _renderPart3(idx);
      else if (part === 4) _renderPart4(idx, 0);
      else if (part === 5) _renderPart5(idx);
      else if (part === 6) _renderPart6(idx);
      else if (part === 7) _renderPart7(idx);
    },

    setAnswer(key, value) {
      _state.answers[key] = value;
    },

    // ── Submit Part 1
    submitPart1() {
      const set = _state.currentData;
      const { html, correct } = _renderFeedbackBlock(set.gaps, _state.answers, 'select');
      _showResultScreen(correct, set.gaps.length, set.id, 'Part 1 — Multiple-Choice Cloze', html);
    },

    // ── Submit Part 2
    submitPart2() {
      const set = _state.currentData;
      const { html, correct } = _renderFeedbackBlock(set.gaps, _state.answers, 'text');
      _showResultScreen(correct, set.gaps.length, set.id, 'Part 2 — Open Cloze', html);
    },

    // ── Submit Part 3
    submitPart3() {
      const set = _state.currentData;
      const { html, correct } = _renderFeedbackBlock(set.gaps, _state.answers, 'wf');
      _showResultScreen(correct, set.gaps.length, set.id, 'Part 3 — Word Formation', html);
    },

    // ── KWT
    checkKWT() { _checkKWT(); },

    nextKWT() {
      _state.itemIdx++;
      _renderPart4(_state.setIdx, _state.itemIdx);
    },

    // ── Submit Part 5 (multiple choice reading)
    submitReading() {
      const passage = _state.currentData;
      let correct = 0;
      const rows = passage.questions.map((q, qi) => {
        const userAns = _state.answers[`q${qi}`];
        const isCorrect = parseInt(userAns) === q.answer;
        if (isCorrect) correct++;
        const userText = userAns !== undefined ? q.choices[parseInt(userAns)] : '—';
        return `
          <div class="crm-fb-row ${isCorrect ? 'crm-fb-correct' : 'crm-fb-wrong'}">
            <div class="crm-fb-num">Q${qi + 1}</div>
            <div class="crm-fb-user">${isCorrect ? '✅' : '❌'} ${userText}</div>
            ${!isCorrect ? `<div class="crm-fb-correct-ans">→ ${q.choices[q.answer]}</div>` : ''}
            <div class="crm-fb-explain">${q.explanation}</div>
          </div>`;
      }).join('');
      _showResultScreen(correct, passage.questions.length, passage.id, 'Part 5 — Reading: Multiple Choice', rows);
    },

    // ── Submit Part 6 (gapped text)
    submitGapped() {
      const passage = _state.currentData;
      const correctAnswers = passage.answers;
      let correct = 0;
      const gapNums = Object.keys(correctAnswers).map(Number);
      const rows = gapNums.map(num => {
        const userAns = _state.answers[num];
        const isCorrect = userAns === correctAnswers[num];
        if (isCorrect) correct++;
        return `
          <div class="crm-fb-row ${isCorrect ? 'crm-fb-correct' : 'crm-fb-wrong'}">
            <div class="crm-fb-num">Celah ${num}</div>
            <div class="crm-fb-user">${isCorrect ? '✅' : '❌'} Paragraf ${userAns || '—'}</div>
            ${!isCorrect ? `<div class="crm-fb-correct-ans">→ Paragraf ${correctAnswers[num]}</div>` : ''}
          </div>
          <div class="crm-fb-explain">${passage.explanation}</div>`;
      }).join('');
      _showResultScreen(correct, gapNums.length, passage.id, 'Part 6 — Gapped Text', rows);
    },

    // ── Submit Part 7 (multiple matching)
    submitMultipleMatching() {
      const passage = _state.currentData;
      let correct = 0;
      const rows = passage.questions.map((q, qi) => {
        const userAns = _state.answers[q.id];
        const isCorrect = q.answers.includes(userAns);
        if (isCorrect) correct++;
        return `
          <div class="crm-fb-row ${isCorrect ? 'crm-fb-correct' : 'crm-fb-wrong'}">
            <div class="crm-fb-num">Q${qi + 1}</div>
            <div class="crm-fb-user">${isCorrect ? '✅' : '❌'} Teks ${userAns || '—'}</div>
            ${!isCorrect ? `<div class="crm-fb-correct-ans">→ Teks ${q.answers.join(' / ')}</div>` : ''}
            <div class="crm-fb-explain">${q.explanation}</div>
          </div>`;
      }).join('');
      _showResultScreen(correct, passage.questions.length, passage.id, 'Part 7 — Multiple Matching', rows);
    }
  };

})();
