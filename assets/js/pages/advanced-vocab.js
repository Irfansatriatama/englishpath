/**
 * EnglishPath — Advanced Vocabulary Module
 * Fase 17a: Browse, Flashcard, Quiz, SRS Review, Word Family Explorer
 * localStorage: ep_user_{id}_srs_advanced_vocab, ep_user_{id}_advanced_vocab
 */
const AdvancedVocab = (() => {

  let _state = {
    mode: 'browse',
    domain: 'all',
    searchQuery: '',
    words: [],
    // Flashcard
    fc: { queue: [], index: 0, flipped: false, domainId: 'all' },
    // Quiz
    quiz: { questions: [], index: 0, score: 0, answered: false, selected: null, done: false, type: 'translate' },
    // SRS
    srs: { cards: [], index: 0, revealed: false },
    // Family Explorer
    family: { filter: '' },
    // Modal
    modalWord: null,
  };

  // ── Helpers ──────────────────────────────────────────────
  function _uid() { const s = Auth.getSession(); return s ? s.userId : null; }

  function _getProgress() { return Storage.getUser(_uid(), 'advanced_vocab', {}); }
  function _setProgress(p) { Storage.setUser(_uid(), 'advanced_vocab', p); }
  function _isLearned(id)  { return !!_getProgress()[id]; }

  function _markLearned(wordId) {
    const prog = _getProgress();
    if (!prog[wordId]) {
      prog[wordId] = { learnedAt: new Date().toISOString() };
      _setProgress(prog);
      if (typeof XPSystem !== 'undefined') {
        const r = XPSystem.addXP('VOCAB_NEW');
        if (r) App.toastXP && App.toastXP(r);
      }
      if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onLearnItem();
    }
    if (typeof SRSSystem !== 'undefined') SRSSystem.initCard('srs_advanced_vocab', wordId);
  }

  function _speak(text) {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-GB';
    u.rate = 0.88;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  function _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function _getStats() {
    const allWords = AdvancedVocabData.getAllWords();
    const total    = allWords.length;
    const prog     = _getProgress();
    const learned  = Object.keys(prog).length;
    let due = 0;
    if (typeof SRSSystem !== 'undefined') {
      due = SRSSystem.getDueCards('srs_advanced_vocab', allWords.map(w => w.id)).length;
    }
    let mastered = 0;
    const srsData = Storage.getUser(_uid(), 'srs_advanced_vocab', {});
    Object.values(srsData).forEach(c => { if (c && c.interval >= 7) mastered++; });
    return { total, learned, due, mastered };
  }

  function _updateStats() {
    const s = _getStats();
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('stat-total', s.total);
    set('stat-learned', s.learned);
    set('stat-due', s.due);
    set('stat-mastered', s.mastered);
  }

  // ── MODE SWITCHING ────────────────────────────────────────
  function _setMode(mode) {
    _state.mode = mode;
    document.querySelectorAll('.adv-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === mode);
    });
    document.querySelectorAll('[data-panel]').forEach(p => {
      p.classList.toggle('hidden', p.dataset.panel !== mode);
    });
    if (mode === 'browse')  _renderBrowse();
    if (mode === 'flashcard') _renderFlashcardStart();
    if (mode === 'quiz')    _initQuiz();
    if (mode === 'srs')     _initSRS();
    if (mode === 'family')  _renderFamilies();
  }

  // ── BROWSE MODE ──────────────────────────────────────────
  function _renderBrowse() {
    _buildWordList();
    _renderDomainFilter();
    _renderWordGrid();
  }

  function _buildWordList() {
    let words;
    if (_state.domain === 'all') {
      words = AdvancedVocabData.getAllWords();
    } else {
      const d = AdvancedVocabData.getDomain(_state.domain);
      words = d ? d.words.map(w => ({ ...w, domainId: d.id, domainName: d.nameID })) : [];
    }
    if (_state.searchQuery) {
      const q = _state.searchQuery.toLowerCase();
      words = words.filter(w =>
        w.word.toLowerCase().includes(q) ||
        w.translation.toLowerCase().includes(q)
      );
    }
    _state.words = words;
  }

  function _renderDomainFilter() {
    const container = document.getElementById('domain-filter');
    if (!container) return;
    const domains = AdvancedVocabData.getAllDomains();
    const prog = _getProgress();
    let html = `<button class="adv-domain-btn ${_state.domain === 'all' ? 'active' : ''}" data-domain="all">🌐 Semua <span class="domain-count">${AdvancedVocabData.getAllWords().length}</span></button>`;
    domains.forEach(d => {
      const learnedCount = d.words.filter(w => prog[w.id]).length;
      html += `<button class="adv-domain-btn ${_state.domain === d.id ? 'active' : ''}" data-domain="${d.id}">${d.icon} ${d.nameID} <span class="domain-count">${learnedCount}/${d.words.length}</span></button>`;
    });
    container.innerHTML = html;
    container.querySelectorAll('.adv-domain-btn').forEach(b => {
      b.addEventListener('click', () => {
        _state.domain = b.dataset.domain;
        _renderBrowse();
      });
    });
  }

  function _renderWordGrid() {
    const grid = document.getElementById('word-grid');
    if (!grid) return;
    if (!_state.words.length) {
      grid.innerHTML = '<div style="text-align:center;padding:2rem;opacity:.6">Tidak ada kata ditemukan.</div>';
      return;
    }
    grid.innerHTML = _state.words.map(w => `
      <div class="adv-word-card ${_isLearned(w.id) ? 'learned' : ''}" data-word-id="${w.id}">
        <span class="wc-type">${w.wordType}</span>
        <div class="wc-word">${w.word}</div>
        <div class="wc-ipa">${w.ipa}</div>
        <div class="wc-trans">${w.translation}</div>
      </div>
    `).join('');
    grid.querySelectorAll('.adv-word-card').forEach(card => {
      card.addEventListener('click', () => {
        const word = _state.words.find(w => w.id === card.dataset.wordId);
        if (word) _openModal(word);
      });
    });
  }

  // ── WORD MODAL ───────────────────────────────────────────
  function _openModal(word) {
    _state.modalWord = word;
    const m = document.getElementById('word-modal');
    if (!m) return;
    document.getElementById('modal-word').textContent = word.word;
    document.getElementById('modal-ipa').textContent  = word.ipa;
    document.getElementById('modal-type').textContent = word.wordType;
    document.getElementById('modal-trans').textContent = word.translation;
    document.getElementById('modal-domain').textContent = word.domainName || '—';
    document.getElementById('modal-example').textContent = `"${word.example}"`;
    document.getElementById('modal-family').innerHTML = word.family ? `<span>Keluarga kata:</span> ${word.family}` : '';
    const learnBtn = document.getElementById('modal-learn-btn');
    if (_isLearned(word.id)) {
      learnBtn.textContent = '✅ Sudah Dipelajari';
      learnBtn.disabled = true;
    } else {
      learnBtn.textContent = '📌 Tandai Dipelajari';
      learnBtn.disabled = false;
    }
    m.classList.remove('hidden');
    _markLearned(word.id);
    _updateStats();
    _renderWordGrid();
  }

  function _closeModal() {
    const m = document.getElementById('word-modal');
    if (m) m.classList.add('hidden');
    _state.modalWord = null;
  }

  // ── FLASHCARD MODE ───────────────────────────────────────
  function _renderFlashcardStart() {
    const panel = document.querySelector('[data-panel="flashcard"]');
    if (!panel) return;
    const domains = AdvancedVocabData.getAllDomains();
    const optHtml = `<option value="all">Semua Domain</option>` +
      domains.map(d => `<option value="${d.id}">${d.icon} ${d.nameID}</option>`).join('');
    const sel = document.getElementById('fc-domain-select');
    if (sel && !sel.innerHTML.trim()) sel.innerHTML = optHtml;
    _startFlashcards();
  }

  function _startFlashcards() {
    const domSel = document.getElementById('fc-domain-select');
    const domId  = domSel ? domSel.value : 'all';
    let words;
    if (domId === 'all') {
      words = AdvancedVocabData.getAllWords();
    } else {
      const d = AdvancedVocabData.getDomain(domId);
      words = d ? d.words.map(w => ({ ...w, domainId: d.id, domainName: d.nameID })) : [];
    }
    _state.fc.queue = _shuffle(words);
    _state.fc.index = 0;
    _state.fc.flipped = false;
    _renderFlashcard();
  }

  function _renderFlashcard() {
    const fc = _state.fc;
    if (!fc.queue.length) return;
    const prog = document.getElementById('fc-progress');
    if (prog) prog.textContent = `${fc.index + 1} / ${fc.queue.length}`;
    const word = fc.queue[fc.index];
    const front = document.getElementById('fc-front');
    const back  = document.getElementById('fc-back');
    if (front) {
      front.querySelector('.fc-word').textContent = word.word;
      front.querySelector('.fc-ipa').textContent  = word.ipa;
      front.querySelector('.fc-type').textContent = word.wordType;
    }
    if (back) {
      back.querySelector('.fc-trans').textContent   = word.translation;
      back.querySelector('.fc-example').textContent = `"${word.example}"`;
    }
    const card = document.getElementById('flashcard');
    if (card) {
      card.classList.remove('flipped');
      _state.fc.flipped = false;
    }
    // hide quality btns until flipped
    const qbtns = document.getElementById('fc-quality-btns');
    if (qbtns) qbtns.classList.add('hidden');
  }

  function _flipFlashcard() {
    const card = document.getElementById('flashcard');
    if (!card) return;
    _state.fc.flipped = !_state.fc.flipped;
    card.classList.toggle('flipped', _state.fc.flipped);
    if (_state.fc.flipped) {
      const qbtns = document.getElementById('fc-quality-btns');
      if (qbtns) qbtns.classList.remove('hidden');
      // mark learned
      const word = _state.fc.queue[_state.fc.index];
      _markLearned(word.id);
      _updateStats();
    }
  }

  function _fcQuality(q) {
    // 0=hard, 1=ok, 2=easy → map to SRS quality 2, 3, 5
    const word = _state.fc.queue[_state.fc.index];
    const qualityMap = { 0: 2, 1: 3, 2: 5 };
    if (typeof SRSSystem !== 'undefined') {
      SRSSystem.reviewCard('srs_advanced_vocab', word.id, qualityMap[q]);
      if (q >= 1) {
        if (typeof XPSystem !== 'undefined') {
          const r = XPSystem.addXP('SRS_REVIEW');
          if (r) App.toastXP && App.toastXP(r);
        }
      }
    }
    _state.fc.index++;
    if (_state.fc.index >= _state.fc.queue.length) {
      _showFlashcardDone();
    } else {
      _renderFlashcard();
    }
    _updateStats();
  }

  function _showFlashcardDone() {
    const panel = document.querySelector('[data-panel="flashcard"]');
    if (!panel) return;
    panel.innerHTML = `
      <div class="adv-result-card">
        <div class="adv-result-emoji">🎉</div>
        <div class="adv-result-score">${_state.fc.queue.length}</div>
        <div class="adv-result-label">kartu selesai dipelajari</div>
        <div style="margin-top:1.5rem;display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap">
          <button class="adv-btn adv-btn-primary" id="fc-restart-btn">🔄 Ulangi</button>
          <button class="adv-btn adv-btn-outline" id="fc-browse-btn">📚 Ke Browse</button>
        </div>
      </div>
    `;
    document.getElementById('fc-restart-btn')?.addEventListener('click', () => {
      _setMode('flashcard');
    });
    document.getElementById('fc-browse-btn')?.addEventListener('click', () => {
      _setMode('browse');
    });
  }

  // ── QUIZ MODE ────────────────────────────────────────────
  function _initQuiz() {
    const allWords = _shuffle(AdvancedVocabData.getAllWords()).slice(0, 12);
    _state.quiz = { questions: _buildQuestions(allWords), index: 0, score: 0, answered: false, selected: null, done: false };
    _renderQuiz();
  }

  function _buildQuestions(words) {
    const allWords = AdvancedVocabData.getAllWords();
    return words.map((w, i) => {
      // Alternate quiz types
      const type = i % 3 === 0 ? 'fill' : i % 3 === 1 ? 'context' : 'translate';
      // Build wrong options
      const others = _shuffle(allWords.filter(x => x.id !== w.id)).slice(0, 3);
      const choices = _shuffle([w, ...others]);
      return { word: w, type, choices, correctId: w.id };
    });
  }

  function _renderQuiz() {
    const panel = document.querySelector('[data-panel="quiz"]');
    if (!panel) return;
    const q = _state.quiz;
    if (q.done) { _renderQuizResult(); return; }

    const current = q.questions[q.index];
    const total   = q.questions.length;
    const pct     = Math.round((q.index / total) * 100);

    let questionHtml = '';
    if (current.type === 'fill') {
      questionHtml = `
        <div class="adv-quiz-qtype">📝 Ketik terjemahan</div>
        <div class="adv-quiz-word">${current.word.word}</div>
        <div class="adv-quiz-ipa">${current.word.ipa}</div>
        <input class="adv-quiz-fill-input" type="text" id="quiz-fill" placeholder="Terjemahan dalam bahasa Indonesia..." autocomplete="off">
        <button class="adv-btn adv-btn-primary" id="quiz-fill-submit" style="margin-top:.5rem">Cek Jawaban</button>
      `;
    } else if (current.type === 'context') {
      // Fill-in-context: show example with blank
      const blanked = current.word.example.replace(new RegExp(`\\b${current.word.word}\\b`, 'i'), '________');
      questionHtml = `
        <div class="adv-quiz-qtype">🔍 Pilih kata yang tepat</div>
        <div class="adv-quiz-context">${blanked}</div>
        <div class="adv-quiz-choices" id="quiz-choices">
          ${current.choices.map(c => `<button class="adv-quiz-choice" data-id="${c.id}">${c.word}</button>`).join('')}
        </div>
      `;
    } else {
      questionHtml = `
        <div class="adv-quiz-qtype">🔤 Pilih terjemahan</div>
        <div class="adv-quiz-word">${current.word.word}</div>
        <div class="adv-quiz-ipa">${current.word.ipa}</div>
        <div class="adv-quiz-choices" id="quiz-choices">
          ${current.choices.map(c => `<button class="adv-quiz-choice" data-id="${c.id}">${c.translation}</button>`).join('')}
        </div>
      `;
    }

    panel.innerHTML = `
      <div class="adv-quiz-header">
        <span class="quiz-progress-label">Soal ${q.index + 1} / ${total}</span>
        <span class="quiz-score-label">Skor: ${q.score}</span>
      </div>
      <div class="adv-quiz-progressbar"><div class="adv-quiz-bar" style="width:${pct}%"></div></div>
      <div class="adv-quiz-question-card">
        ${questionHtml}
      </div>
      <div id="quiz-feedback-area"></div>
      <div id="quiz-next-area"></div>
    `;

    // Bind events
    if (current.type === 'fill') {
      document.getElementById('quiz-fill-submit')?.addEventListener('click', _submitFill);
      document.getElementById('quiz-fill')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') _submitFill();
      });
    } else {
      panel.querySelectorAll('.adv-quiz-choice').forEach(btn => {
        btn.addEventListener('click', () => _submitChoice(btn.dataset.id, current));
      });
    }
  }

  function _submitChoice(selectedId, current) {
    if (_state.quiz.answered) return;
    _state.quiz.answered = true;
    const correct = selectedId === current.correctId;
    if (correct) { _state.quiz.score++; _awardQuizXP(true); }

    document.querySelectorAll('.adv-quiz-choice').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.id === current.correctId) btn.classList.add('correct');
      if (btn.dataset.id === selectedId && !correct) btn.classList.add('wrong');
    });

    _showFeedback(correct, current.word);
  }

  function _submitFill() {
    if (_state.quiz.answered) return;
    const input = document.getElementById('quiz-fill');
    if (!input) return;
    const answer = input.value.trim().toLowerCase();
    const current = _state.quiz.questions[_state.quiz.index];
    // Check if any part of translation is in the answer
    const correct = current.word.translation.toLowerCase().split(/[\/,;]/).some(t =>
      answer.includes(t.trim().slice(0, 8))
    );
    _state.quiz.answered = true;
    if (correct) { _state.quiz.score++; _awardQuizXP(true); }
    input.classList.add(correct ? 'correct' : 'wrong');
    input.disabled = true;
    document.getElementById('quiz-fill-submit').disabled = true;
    _showFeedback(correct, current.word);
  }

  function _awardQuizXP(correct) {
    if (correct && typeof XPSystem !== 'undefined') {
      const r = XPSystem.addXP('QUIZ_CORRECT');
      if (r) App.toastXP && App.toastXP(r);
    }
  }

  function _showFeedback(correct, word) {
    const area = document.getElementById('quiz-feedback-area');
    if (!area) return;
    area.innerHTML = `
      <div class="adv-quiz-feedback ${correct ? 'correct-fb' : 'wrong-fb'}">
        ${correct ? '✅ Benar!' : `❌ Salah. Jawaban: <strong>${word.translation}</strong>`}<br>
        <em>"${word.example}"</em>
      </div>
    `;
    const nextArea = document.getElementById('quiz-next-area');
    if (nextArea) {
      nextArea.innerHTML = `<button class="adv-btn adv-btn-primary" id="quiz-next-btn" style="width:100%">${_state.quiz.index + 1 >= _state.quiz.questions.length ? 'Lihat Hasil' : 'Soal Berikutnya →'}</button>`;
      document.getElementById('quiz-next-btn')?.addEventListener('click', _nextQuestion);
    }
  }

  function _nextQuestion() {
    _state.quiz.index++;
    _state.quiz.answered = false;
    if (_state.quiz.index >= _state.quiz.questions.length) {
      _state.quiz.done = true;
    }
    _renderQuiz();
  }

  function _renderQuizResult() {
    const panel = document.querySelector('[data-panel="quiz"]');
    if (!panel) return;
    const q = _state.quiz;
    const pct = Math.round((q.score / q.questions.length) * 100);
    let emoji = pct >= 90 ? '🏆' : pct >= 70 ? '⭐' : pct >= 50 ? '👍' : '💪';
    let xpMsg = '';
    if (pct === 100 && typeof XPSystem !== 'undefined') {
      const r = XPSystem.addXP('QUIZ_PERFECT');
      if (r) { xpMsg = `+${r.amount} XP Bonus Sempurna!`; App.toastXP && App.toastXP(r); }
    }
    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onQuizComplete(pct / 100, q.questions.length);
    panel.innerHTML = `
      <div class="adv-result-card">
        <div class="adv-result-emoji">${emoji}</div>
        <div class="adv-result-score">${q.score} / ${q.questions.length}</div>
        <div class="adv-result-label">${pct}% benar</div>
        ${xpMsg ? `<div class="adv-result-xp">${xpMsg}</div>` : ''}
        <div style="margin-top:1.5rem;display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap">
          <button class="adv-btn adv-btn-primary" id="quiz-retry-btn">🔄 Coba Lagi</button>
          <button class="adv-btn adv-btn-outline" id="quiz-browse-btn">📚 Ke Browse</button>
        </div>
      </div>
    `;
    document.getElementById('quiz-retry-btn')?.addEventListener('click', () => _setMode('quiz'));
    document.getElementById('quiz-browse-btn')?.addEventListener('click', () => _setMode('browse'));
    _updateStats();
  }

  // ── SRS REVIEW ──────────────────────────────────────────
  function _initSRS() {
    const allWords = AdvancedVocabData.getAllWords();
    let due = [];
    if (typeof SRSSystem !== 'undefined') {
      due = SRSSystem.getDueCards('srs_advanced_vocab', allWords.map(w => w.id));
    }
    _state.srs.cards = due.map(id => allWords.find(w => w.id === id)).filter(Boolean);
    _state.srs.index = 0;
    _state.srs.revealed = false;
    _renderSRS();
  }

  function _renderSRS() {
    const panel = document.querySelector('[data-panel="srs"]');
    if (!panel) return;
    const { cards, index } = _state.srs;
    if (!cards.length) {
      panel.innerHTML = `
        <div class="adv-srs-empty">
          <span class="srs-empty-icon">✅</span>
          <div style="font-size:1.2rem;font-weight:700;margin-bottom:.5rem">Tidak ada review hari ini!</div>
          <div>Semua kartu sudah diulang. Datang lagi besok.</div>
        </div>
      `;
      return;
    }
    if (index >= cards.length) {
      panel.innerHTML = `
        <div class="adv-result-card">
          <div class="adv-result-emoji">🎊</div>
          <div class="adv-result-score">${cards.length}</div>
          <div class="adv-result-label">kartu berhasil direview!</div>
          <button class="adv-btn adv-btn-primary" id="srs-restart-btn" style="margin-top:1.5rem">🔄 Review Lagi</button>
        </div>
      `;
      document.getElementById('srs-restart-btn')?.addEventListener('click', _initSRS);
      return;
    }
    const word = cards[index];
    panel.innerHTML = `
      <div style="text-align:center;margin-bottom:.75rem;font-size:.85rem;opacity:.6">${index + 1} / ${cards.length} kartu</div>
      <div class="adv-flashcard-wrap">
        <div class="adv-flashcard ${_state.srs.revealed ? 'flipped' : ''}" id="srs-card">
          <div class="adv-fc-front" id="srs-front">
            <div class="fc-word">${word.word}</div>
            <div class="fc-ipa">${word.ipa}</div>
            <div class="fc-type">${word.wordType}</div>
          </div>
          <div class="adv-fc-back" id="srs-back">
            <div class="fc-trans">${word.translation}</div>
            <div class="fc-example">"${word.example}"</div>
          </div>
        </div>
      </div>
      <div class="adv-fc-hint">Klik kartu untuk membalik</div>
      ${_state.srs.revealed ? `
        <div class="adv-quality-btns" id="srs-quality-btns">
          <button class="adv-quality-btn hard" data-q="2">😓 Sulit</button>
          <button class="adv-quality-btn ok"   data-q="3">🙂 Ingat</button>
          <button class="adv-quality-btn easy" data-q="5">😄 Mudah</button>
        </div>
      ` : ''}
    `;
    document.getElementById('srs-card')?.addEventListener('click', () => {
      if (!_state.srs.revealed) {
        _state.srs.revealed = true;
        _renderSRS();
      }
    });
    panel.querySelectorAll('[data-q]').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = parseInt(btn.dataset.q);
        if (typeof SRSSystem !== 'undefined') SRSSystem.reviewCard('srs_advanced_vocab', word.id, q);
        if (q >= 3 && typeof XPSystem !== 'undefined') {
          const r = XPSystem.addXP('SRS_REVIEW');
          if (r) App.toastXP && App.toastXP(r);
        }
        _state.srs.index++;
        _state.srs.revealed = false;
        _renderSRS();
        _updateStats();
      });
    });
  }

  // ── WORD FAMILY EXPLORER ─────────────────────────────────
  function _renderFamilies() {
    const panel = document.querySelector('[data-panel="family"]');
    if (!panel) return;
    const families = AdvancedVocabData.getWordFamilies();
    const filter   = _state.family.filter.toLowerCase();

    const filteredFamilies = Object.entries(families).filter(([root]) =>
      !filter || root.toLowerCase().includes(filter)
    );

    panel.innerHTML = `
      <div class="adv-family-search">
        <input class="adv-search-input" id="family-search" placeholder="🔍 Cari akar kata..." value="${_state.family.filter}">
      </div>
      ${filteredFamilies.length ? `
        <div class="adv-family-grid" id="family-grid">
          ${filteredFamilies.map(([root, words]) => `
            <div class="adv-family-card">
              <div class="fc-root">Akar: ${root}</div>
              <div class="adv-family-words">
                ${words.map(w => `<span class="adv-family-word-chip" data-word-id="${w.id}">${w.word}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      ` : '<div style="text-align:center;padding:2rem;opacity:.6">Tidak ada hasil.</div>'}
    `;

    document.getElementById('family-search')?.addEventListener('input', e => {
      _state.family.filter = e.target.value;
      _renderFamilies();
    });

    panel.querySelectorAll('.adv-family-word-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const allWords = AdvancedVocabData.getAllWords();
        const word = allWords.find(w => w.id === chip.dataset.wordId);
        if (word) _openModal(word);
      });
    });
  }

  // ── INIT ─────────────────────────────────────────────────
  function init() {
    _updateStats();

    // Tab buttons
    document.querySelectorAll('.adv-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => _setMode(btn.dataset.mode));
    });

    // Search input
    const searchInput = document.getElementById('browse-search');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        _state.searchQuery = e.target.value;
        _renderBrowse();
      });
    }

    // Flashcard controls
    const fcDomSel = document.getElementById('fc-domain-select');
    if (fcDomSel) fcDomSel.addEventListener('change', _startFlashcards);

    const fcCard = document.getElementById('flashcard');
    if (fcCard) fcCard.addEventListener('click', _flipFlashcard);

    const fcQBtns = document.getElementById('fc-quality-btns');
    if (fcQBtns) {
      fcQBtns.addEventListener('click', e => {
        if (e.target.dataset.quality !== undefined) _fcQuality(parseInt(e.target.dataset.quality));
      });
    }

    // Speak buttons in modal
    document.getElementById('modal-speak-btn')?.addEventListener('click', () => {
      if (_state.modalWord) _speak(_state.modalWord.word);
    });
    document.getElementById('modal-close-btn')?.addEventListener('click', _closeModal);
    document.getElementById('modal-learn-btn')?.addEventListener('click', () => {
      if (_state.modalWord) { _markLearned(_state.modalWord.id); _updateStats(); _renderWordGrid(); }
    });
    document.getElementById('word-modal')?.addEventListener('click', e => {
      if (e.target === document.getElementById('word-modal')) _closeModal();
    });

    // Default mode
    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onModuleVisit('advanced-vocab');
    _setMode('browse');
  }

  return { init };
})();
