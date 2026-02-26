/**
 * EnglishPath — TOEIC Reading Module
 * Fase 14c-1: Practice Reading Parts 5–7
 * localStorage: ep_user_{id}_toeic_reading
 */
const TOEICReading = (() => {

  // ── State ──────────────────────────────────────────────
  let _state = {
    view: 'menu',       // menu | practice | result
    part: null,         // 5 | 6 | 7
    items: [],          // questions/passages for current part
    currentIdx: 0,      // current question index
    answers: {},        // {questionId: answerIndex}
    submitted: false,
    timerInterval: null,
    timerSeconds: 0,
    // Part 6 state
    p6BlankAnswers: {},  // {blankId: choiceIndex}
    p6CurrentText: null, // current passage for Part 6
    p6TextIdx: 0,        // current text index within part 6
    // Part 7 state
    p7Passage: null,    // current passage object
    p7QIdx: 0,          // current question within passage
    p7PassageIdx: 0     // current passage index
  };

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, 'toeic_reading') || {};
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
    Storage.setUser(uid, 'toeic_reading', data);
  }

  // ── Timer ──────────────────────────────────────────────
  function _startTimer() {
    _state.timerSeconds = 0;
    if (_state.timerInterval) clearInterval(_state.timerInterval);
    _state.timerInterval = setInterval(() => {
      _state.timerSeconds++;
      const el = document.getElementById('tr-timer');
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

  // ── Rendering ──────────────────────────────────────────
  function _setView(html) {
    const el = document.getElementById('tr-content');
    if (el) el.innerHTML = html;
  }

  // ── MENU VIEW ─────────────────────────────────────────
  function _renderMenu() {
    _state.view = 'menu';
    _stopTimer();
    const data = _loadData();
    const results = data.results || {};

    function _partCard(partNum, title, icon, desc, count) {
      const r = results['part' + partNum];
      const bestHtml = r
        ? `<span class="tr-best">Terbaik: ${r.best}% (${r.attempts}×)</span>`
        : `<span class="tr-best tr-best-none">Belum pernah</span>`;
      return `
        <div class="tr-part-card" data-part="${partNum}">
          <div class="tr-part-icon">${icon}</div>
          <div class="tr-part-info">
            <div class="tr-part-title">Part ${partNum}: ${title}</div>
            <div class="tr-part-desc">${desc}</div>
            <div class="tr-part-meta">${count} soal &nbsp;|&nbsp; ${bestHtml}</div>
          </div>
          <button class="btn btn-primary tr-start-btn" data-part="${partNum}">Mulai</button>
        </div>`;
    }

    _setView(`
      <div class="tr-menu">
        <div class="tr-menu-header">
          <h2>📖 TOEIC Reading Practice</h2>
          <p>Latihan soal Reading Comprehension (Parts 5–7). Pilih Part untuk memulai latihan.</p>
        </div>
        <div class="tr-tips-box">
          <strong>💡 Tips TOEIC Reading:</strong>
          <ul>
            <li><strong>Part 5</strong> — Fokus pada grammar & vocabulary. Perhatikan bagian kalimat sebelum & sesudah blank untuk petunjuk.</li>
            <li><strong>Part 6</strong> — Baca seluruh teks dulu sebelum mengisi blank. Konteks keseluruhan membantu memilih jawaban yang tepat.</li>
            <li><strong>Part 7</strong> — Baca soal terlebih dahulu, lalu cari jawabannya di teks (skimming & scanning).</li>
          </ul>
        </div>
        <div class="tr-parts-list">
          ${_partCard(5, 'Incomplete Sentences', '✏️', 'Pilih kata/frasa yang tepat untuk melengkapi kalimat.', '10')}
          ${_partCard(6, 'Text Completion', '📄', 'Isi blank dalam paragraf pendek berdasarkan konteks teks.', '4 teks × 4 soal')}
          ${_partCard(7, 'Reading Comprehension', '📰', 'Baca single & double passage lalu jawab pertanyaan.', '5 passage, 19 soal')}
        </div>
      </div>
    `);

    // Events
    document.querySelectorAll('.tr-start-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const part = parseInt(btn.dataset.part);
        _startPart(part);
      });
    });
  }

  // ── START PART ─────────────────────────────────────────
  function _startPart(part) {
    _state.part = part;
    _state.answers = {};
    _state.submitted = false;
    _state.currentIdx = 0;

    if (part === 5) {
      _state.items = TOEICReadingData.getPart5();
      _renderP5Question();
    } else if (part === 6) {
      _state.items = TOEICReadingData.getPart6();
      _state.p6TextIdx = 0;
      _state.p6BlankAnswers = {};
      _renderP6Text();
    } else if (part === 7) {
      _state.items = TOEICReadingData.getPart7();
      _state.p7PassageIdx = 0;
      _state.p7QIdx = 0;
      _renderP7Passage();
    }

    _startTimer();
  }

  // ── PART 5: Incomplete Sentences ──────────────────────
  function _renderP5Question() {
    _state.view = 'practice';
    const items = _state.items;
    const idx = _state.currentIdx;
    const item = items[idx];
    const total = items.length;
    const chosen = _state.answers[item.id];
    const isSubmitted = _state.submitted;

    // Build sentence with blank highlighted
    const sentenceHtml = item.sentence.replace('_____', '<span class="tr-blank">_____</span>');

    // Build choices
    const choicesHtml = item.choices.map((c, i) => {
      let cls = 'tr-choice';
      if (chosen === i) cls += ' selected';
      if (isSubmitted) {
        if (i === item.answer) cls += ' correct';
        else if (chosen === i) cls += ' wrong';
      }
      const label = String.fromCharCode(65 + i);
      return `<button class="tr-choice-btn ${cls}" data-idx="${i}">(${label}) ${c}</button>`;
    }).join('');

    const explanationHtml = isSubmitted ? `
      <div class="tr-explanation">
        <strong>💬 Penjelasan:</strong> ${item.explanation}
      </div>` : '';

    const progressPct = Math.round(((idx + 1) / total) * 100);
    const isLast = idx === total - 1;
    const nextLabel = isSubmitted ? (isLast ? 'Lihat Hasil' : 'Soal Berikutnya') : '';

    _setView(`
      <div class="tr-practice">
        <div class="tr-practice-header">
          <div class="tr-practice-title">Part 5 — Incomplete Sentences</div>
          <div class="tr-practice-meta">
            <span class="tr-progress-label">Soal ${idx + 1} / ${total}</span>
            <span class="tr-timer" id="tr-timer">${_formatTime(_state.timerSeconds)}</span>
          </div>
        </div>
        <div class="tr-progress-bar"><div class="tr-progress-fill" style="width:${progressPct}%"></div></div>

        <div class="tr-question-box">
          <div class="tr-question-label">Lengkapi kalimat berikut dengan pilihan yang tepat:</div>
          <div class="tr-sentence">${sentenceHtml}</div>
        </div>

        <div class="tr-choices">${choicesHtml}</div>
        ${explanationHtml}

        <div class="tr-actions">
          ${!isSubmitted
            ? `<button class="btn btn-primary" id="tr-check-btn" ${chosen === undefined ? 'disabled' : ''}>Cek Jawaban</button>`
            : `<button class="btn btn-primary" id="tr-next-btn">${nextLabel}</button>`
          }
          <button class="btn btn-ghost" id="tr-back-btn">← Kembali ke Menu</button>
        </div>
      </div>
    `);

    // Events
    document.querySelectorAll('.tr-choice-btn').forEach(btn => {
      if (!isSubmitted) {
        btn.addEventListener('click', () => {
          _state.answers[item.id] = parseInt(btn.dataset.idx);
          _renderP5Question();
        });
      }
    });

    const checkBtn = document.getElementById('tr-check-btn');
    if (checkBtn) checkBtn.addEventListener('click', () => {
      _state.submitted = true;
      const correct = _state.answers[item.id] === item.answer;
      if (correct) XPSystem.addXP(3, `TOEIC Part 5 benar`);
      _renderP5Question();
    });

    const nextBtn = document.getElementById('tr-next-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => {
      if (isLast) {
        _showResult();
      } else {
        _state.currentIdx++;
        _state.submitted = false;
        _renderP5Question();
      }
    });

    document.getElementById('tr-back-btn').addEventListener('click', () => {
      _stopTimer();
      _renderMenu();
    });
  }

  // ── PART 6: Text Completion ────────────────────────────
  function _renderP6Text() {
    _state.view = 'practice';
    const texts = _state.items;
    const tIdx = _state.p6TextIdx;
    const text = texts[tIdx];
    const isLast = tIdx === texts.length - 1;

    // Build passage HTML with selects for blanks
    let passageHtml = '';
    text.passage.forEach(segment => {
      if (segment.type === 'text') {
        passageHtml += `<span class="tr-passage-text">${segment.text.replace(/\n/g, '<br>')}</span>`;
      } else {
        const blank = text.blanks[segment.id];
        const chosen = _state.p6BlankAnswers[`${text.id}_${segment.id}`];
        const optionsHtml = blank.choices.map((c, i) => {
          const sel = chosen === i ? 'selected' : '';
          return `<option value="${i}" ${sel}>${String.fromCharCode(65 + i)}. ${c}</option>`;
        }).join('');
        passageHtml += `
          <select class="tr-blank-select" data-text="${text.id}" data-blank="${segment.id}">
            <option value="">-- pilih --</option>
            ${optionsHtml}
          </select>`;
      }
    });

    // Check if all blanks answered
    const blankKeys = Object.keys(text.blanks);
    const allAnswered = blankKeys.every(b => _state.p6BlankAnswers[`${text.id}_${b}`] !== undefined);

    // Check if submitted (checked)
    const isChecked = _state.answers[text.id] === 'checked';

    // If checked, show results
    let resultsHtml = '';
    if (isChecked) {
      const blankResults = blankKeys.map(b => {
        const blank = text.blanks[b];
        const chosen = _state.p6BlankAnswers[`${text.id}_${b}`];
        const correct = chosen === blank.answer;
        const icon = correct ? '✅' : '❌';
        const correctLabel = blank.choices[blank.answer];
        return `
          <div class="tr-p6-result-item ${correct ? 'correct' : 'wrong'}">
            ${icon} <strong>Blank (${b.toUpperCase()})</strong>: 
            Jawaban kamu: <em>${chosen !== undefined ? blank.choices[chosen] : '—'}</em>
            ${!correct ? ` → Benar: <strong>${correctLabel}</strong>` : ''}
            <br><small>${blank.explanation}</small>
          </div>`;
      }).join('');
      resultsHtml = `<div class="tr-p6-results">${blankResults}</div>`;
    }

    const progressPct = Math.round(((tIdx + 1) / texts.length) * 100);

    _setView(`
      <div class="tr-practice">
        <div class="tr-practice-header">
          <div class="tr-practice-title">Part 6 — Text Completion</div>
          <div class="tr-practice-meta">
            <span class="tr-progress-label">Teks ${tIdx + 1} / ${texts.length}</span>
            <span class="tr-timer" id="tr-timer">${_formatTime(_state.timerSeconds)}</span>
          </div>
        </div>
        <div class="tr-progress-bar"><div class="tr-progress-fill" style="width:${progressPct}%"></div></div>

        <div class="tr-passage-header">${text.title}</div>
        <div class="tr-passage-box tr-p6-passage">${passageHtml}</div>

        ${resultsHtml}

        <div class="tr-actions">
          ${!isChecked
            ? `<button class="btn btn-primary" id="tr-check-btn" ${!allAnswered ? 'disabled' : ''}>Cek Jawaban</button>`
            : `<button class="btn btn-primary" id="tr-next-btn">${isLast ? 'Lihat Hasil' : 'Teks Berikutnya'}</button>`
          }
          <button class="btn btn-ghost" id="tr-back-btn">← Kembali ke Menu</button>
        </div>
      </div>
    `);

    // Blank select events
    document.querySelectorAll('.tr-blank-select').forEach(sel => {
      if (!isChecked) {
        sel.addEventListener('change', () => {
          const val = sel.value;
          if (val !== '') {
            _state.p6BlankAnswers[`${sel.dataset.text}_${sel.dataset.blank}`] = parseInt(val);
          }
          _renderP6Text();
        });
      } else {
        sel.disabled = true;
      }
    });

    const checkBtn = document.getElementById('tr-check-btn');
    if (checkBtn) checkBtn.addEventListener('click', () => {
      _state.answers[text.id] = 'checked';
      // Award XP for correct blanks
      blankKeys.forEach(b => {
        const blank = text.blanks[b];
        const chosen = _state.p6BlankAnswers[`${text.id}_${b}`];
        if (chosen === blank.answer) XPSystem.addXP(3, 'TOEIC Part 6 benar');
      });
      _renderP6Text();
    });

    const nextBtn = document.getElementById('tr-next-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => {
      if (isLast) {
        _showResult();
      } else {
        _state.p6TextIdx++;
        _renderP6Text();
      }
    });

    document.getElementById('tr-back-btn').addEventListener('click', () => {
      _stopTimer();
      _renderMenu();
    });
  }

  // ── PART 7: Reading Comprehension ─────────────────────
  function _renderP7Passage() {
    _state.view = 'practice';
    const passages = _state.items;
    const pIdx = _state.p7PassageIdx;
    const passage = passages[pIdx];

    // Build passage text
    let passageTextHtml = '';
    if (passage.type === 'single') {
      passageTextHtml = `
        <div class="tr-passage-label">${passage.title}</div>
        <div class="tr-passage-box">${passage.passage.replace(/\n/g, '<br>')}</div>`;
    } else {
      passageTextHtml = passage.passages.map(p => `
        <div class="tr-passage-label">${p.label}</div>
        <div class="tr-passage-box">${p.text.replace(/\n/g, '<br>')}</div>
      `).join('');
    }

    const questions = passage.type === 'single' ? passage.questions : passage.questions;
    const totalPassages = passages.length;
    const progressPct = Math.round(((pIdx + 1) / totalPassages) * 100);

    // Build questions HTML
    const questionsHtml = questions.map((q, qi) => {
      const chosen = _state.answers[q.id];
      const isChecked = _state.answers[q.id + '_checked'];

      const choicesHtml = q.choices.map((c, i) => {
        let cls = 'tr-choice-btn';
        if (chosen === i) cls += ' selected';
        if (isChecked) {
          if (i === q.answer) cls += ' correct';
          else if (chosen === i) cls += ' wrong';
        }
        const label = String.fromCharCode(65 + i);
        return `<button class="${cls}" data-qid="${q.id}" data-idx="${i}" ${isChecked ? 'disabled' : ''}>(${label}) ${c}</button>`;
      }).join('');

      const explanationHtml = isChecked
        ? `<div class="tr-explanation"><strong>💬 Penjelasan:</strong> ${q.explanation}</div>`
        : '';

      const checkHtml = !isChecked
        ? `<button class="btn btn-sm btn-secondary tr-check-q-btn" data-qid="${q.id}" ${chosen === undefined ? 'disabled' : ''}>Cek</button>`
        : '';

      return `
        <div class="tr-question-item" data-qi="${qi}">
          <div class="tr-question-num">Pertanyaan ${qi + 1}</div>
          <div class="tr-question-text">${q.question}</div>
          <div class="tr-choices">${choicesHtml}</div>
          ${checkHtml}
          ${explanationHtml}
        </div>`;
    }).join('');

    const allChecked = questions.every(q => _state.answers[q.id + '_checked']);
    const isLastPassage = pIdx === passages.length - 1;

    _setView(`
      <div class="tr-practice">
        <div class="tr-practice-header">
          <div class="tr-practice-title">Part 7 — Reading Comprehension (${passage.type === 'double' ? 'Double Passage' : 'Single Passage'})</div>
          <div class="tr-practice-meta">
            <span class="tr-progress-label">Passage ${pIdx + 1} / ${totalPassages}</span>
            <span class="tr-timer" id="tr-timer">${_formatTime(_state.timerSeconds)}</span>
          </div>
        </div>
        <div class="tr-progress-bar"><div class="tr-progress-fill" style="width:${progressPct}%"></div></div>

        ${passageTextHtml}

        <div class="tr-questions-section">
          <div class="tr-questions-header">Pertanyaan (${questions.length} soal)</div>
          ${questionsHtml}
        </div>

        <div class="tr-actions">
          ${allChecked
            ? `<button class="btn btn-primary" id="tr-next-btn">${isLastPassage ? 'Lihat Hasil' : 'Passage Berikutnya'}</button>`
            : ''
          }
          <button class="btn btn-ghost" id="tr-back-btn">← Kembali ke Menu</button>
        </div>
      </div>
    `);

    // Choice events
    document.querySelectorAll('.tr-choice-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        _state.answers[qid] = parseInt(btn.dataset.idx);
        _renderP7Passage();
      });
    });

    // Check per-question events
    document.querySelectorAll('.tr-check-q-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        _state.answers[qid + '_checked'] = true;
        const q = questions.find(q => q.id === qid);
        if (q && _state.answers[qid] === q.answer) {
          XPSystem.addXP(3, 'TOEIC Part 7 benar');
        }
        _renderP7Passage();
      });
    });

    const nextBtn = document.getElementById('tr-next-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => {
      if (isLastPassage) {
        _showResult();
      } else {
        _state.p7PassageIdx++;
        _renderP7Passage();
      }
    });

    document.getElementById('tr-back-btn').addEventListener('click', () => {
      _stopTimer();
      _renderMenu();
    });
  }

  // ── RESULT VIEW ────────────────────────────────────────
  function _showResult() {
    _state.view = 'result';
    _stopTimer();

    const part = _state.part;
    let correct = 0, total = 0;

    if (part === 5) {
      const items = _state.items;
      total = items.length;
      items.forEach(item => {
        if (_state.answers[item.id] === item.answer) correct++;
      });
    } else if (part === 6) {
      const texts = _state.items;
      texts.forEach(text => {
        Object.keys(text.blanks).forEach(b => {
          total++;
          const blank = text.blanks[b];
          const chosen = _state.p6BlankAnswers[`${text.id}_${b}`];
          if (chosen === blank.answer) correct++;
        });
      });
    } else if (part === 7) {
      const passages = _state.items;
      passages.forEach(passage => {
        const qs = passage.questions;
        qs.forEach(q => {
          total++;
          if (_state.answers[q.id] === q.answer) correct++;
        });
      });
    }

    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    _saveResult(part, correct, total);

    // XP bonus for perfect score
    if (pct === 100) {
      XPSystem.addXP(20, `TOEIC Part ${part} perfect score!`);
      App.showToast('🎉 Sempurna! +20 XP bonus!', 'success');
    }

    // Challenge system
    if (typeof ChallengeSystem !== 'undefined') {
      ChallengeSystem.onQuizComplete('toeic-reading-p' + part, pct);
    }

    // Emoji based on score
    let emoji, feedback;
    if (pct >= 90) { emoji = '🏆'; feedback = 'Luar biasa! Performa sangat baik!'; }
    else if (pct >= 70) { emoji = '⭐'; feedback = 'Bagus! Terus tingkatkan!'; }
    else if (pct >= 50) { emoji = '📚'; feedback = 'Lumayan. Pelajari kembali soal yang salah.'; }
    else { emoji = '💪'; feedback = 'Perlu banyak latihan. Jangan menyerah!'; }

    // Part-specific tips
    const tips = {
      5: [
        'Perhatikan kata sebelum dan sesudah blank untuk clue grammatikal.',
        'Identifikasi part of speech yang dibutuhkan (noun, verb, adj, adv).',
        'Eliminasi pilihan yang jelas tidak sesuai konteks terlebih dahulu.'
      ],
      6: [
        'Baca seluruh teks sebelum mengisi blank untuk memahami konteks.',
        'Perhatikan tense dan subjek kalimat sebelumnya.',
        'Pilih kata yang sesuai register (formal/informal) teks tersebut.'
      ],
      7: [
        'Baca soal terlebih dahulu, lalu scan teks untuk jawaban.',
        'Untuk double passage, beberapa soal memerlukan info dari kedua teks.',
        'Perhatikan kata kunci dalam pertanyaan — paraphrase sering digunakan.'
      ]
    };

    const tipsHtml = (tips[part] || []).map(t => `<li>${t}</li>`).join('');

    _setView(`
      <div class="tr-result">
        <div class="tr-result-emoji">${emoji}</div>
        <div class="tr-result-title">Part ${part} Selesai!</div>
        <div class="tr-result-score">${correct} / ${total} benar &nbsp;·&nbsp; ${pct}%</div>
        <div class="tr-result-feedback">${feedback}</div>

        <div class="tr-result-time">⏱ Waktu: ${_formatTime(_state.timerSeconds)}</div>

        <div class="tr-tips-box" style="margin:1.5rem 0;">
          <strong>💡 Tips untuk meningkatkan skor Part ${part}:</strong>
          <ul>${tipsHtml}</ul>
        </div>

        <div class="tr-result-actions">
          <button class="btn btn-primary" id="tr-retry-btn">Ulangi Part ${part}</button>
          <button class="btn btn-secondary" id="tr-menu-btn">Kembali ke Menu</button>
        </div>
      </div>
    `);

    document.getElementById('tr-retry-btn').addEventListener('click', () => _startPart(part));
    document.getElementById('tr-menu-btn').addEventListener('click', () => _renderMenu());
  }

  // ── PUBLIC API ─────────────────────────────────────────
  return {
    init() {
      Router.guard();
      App.init('toeic-reading');
      if (typeof ChallengeSystem !== 'undefined') {
        ChallengeSystem.onModuleVisit('toeic-reading');
      }
      _renderMenu();
    }
  };

})();

document.addEventListener('DOMContentLoaded', () => TOEICReading.init());
