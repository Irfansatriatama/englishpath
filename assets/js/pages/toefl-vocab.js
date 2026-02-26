/**
 * EnglishPath — TOEFL Vocabulary Module
 * Fase 15a: Browse, Flashcard, SRS Review, Quiz modes
 * localStorage: ep_user_{id}_srs_toefl_vocab, ep_user_{id}_toefl_vocab
 */
const TOEFLVocab = (() => {

  // ── State ───────────────────────────────────────────────
  let _state = {
    mode: 'browse',        // browse | flashcard | quiz | srs
    domain: 'all',
    words: [],
    filteredWords: [],
    searchQuery: '',
    // Flashcard
    fc: { index: 0, flipped: false, queue: [] },
    // Quiz
    quiz: { index: 0, questions: [], score: 0, answered: false, selected: null, done: false },
    // SRS
    srs: { cards: [], index: 0, revealed: false }
  };

  function _getUserId() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  // ── Data helpers ─────────────────────────────────────────

  function _getVocabKey() { return 'toefl_vocab'; }
  function _getSRSKey()   { return 'srs_toefl_vocab'; }

  function _getProgress() {
    const uid = _getUserId();
    if (!uid) return {};
    return Storage.getUser(uid, _getVocabKey(), {});
  }

  function _markLearned(wordId) {
    const uid = _getUserId();
    if (!uid) return;
    const prog = _getProgress();
    if (!prog[wordId]) {
      prog[wordId] = { learnedAt: new Date().toISOString() };
      Storage.setUser(uid, _getVocabKey(), prog);
      if (typeof XPSystem !== 'undefined') {
        const r = XPSystem.addXP('VOCAB_NEW');
        if (r) App.toastXP(r);
      }
      if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onLearnItem();
    }
    if (typeof SRSSystem !== 'undefined') SRSSystem.initCard(_getSRSKey(), wordId);
  }

  function _isLearned(wordId) { return !!_getProgress()[wordId]; }

  // ── Build word list ───────────────────────────────────────

  function _buildWordList() {
    let words;
    if (_state.domain === 'all') {
      words = TOEFLVocabData.getAllWords();
    } else {
      const dom = TOEFLVocabData.getDomain(_state.domain);
      words = dom ? dom.words.map(w => ({ ...w, domainId: dom.id, domainName: dom.nameID })) : [];
    }
    if (_state.searchQuery) {
      const q = _state.searchQuery.toLowerCase();
      words = words.filter(w =>
        w.word.toLowerCase().includes(q) ||
        w.translation.toLowerCase().includes(q)
      );
    }
    _state.words = words;
    _state.filteredWords = words;
  }

  // ── Stats helpers ─────────────────────────────────────────

  function _getStats() {
    const prog = _getProgress();
    const total = TOEFLVocabData.getTotalCount();
    const learned = Object.keys(prog).length;
    let srsToday = 0;
    if (typeof SRSSystem !== 'undefined') {
      const due = SRSSystem.getDueCards(_getSRSKey());
      srsToday = due.length;
    }
    const mastered = Object.values(prog).filter(v => v.mastered).length;
    return { total, learned, srsToday, mastered };
  }

  function _renderStats() {
    const { total, learned, srsToday, mastered } = _getStats();
    const el = id => document.getElementById(id);
    if (el('stat-total'))   el('stat-total').textContent   = total;
    if (el('stat-learned')) el('stat-learned').textContent = learned;
    if (el('stat-srs'))     el('stat-srs').textContent     = srsToday;
    if (el('stat-mastered'))el('stat-mastered').textContent= mastered;
  }

  // ── BROWSE MODE ───────────────────────────────────────────

  function _renderBrowse() {
    _renderDomainGrid();
    _renderWordList();
  }

  function _renderDomainGrid() {
    const prog = _getProgress();
    const container = document.getElementById('domain-grid');
    if (!container) return;
    const domains = TOEFLVocabData.getDomains();
    container.innerHTML = domains.map(d => {
      const learnedCount = d.words.filter(w => prog[w.id]).length;
      const pct = Math.round((learnedCount / d.words.length) * 100);
      const isActive = _state.domain === d.id ? 'active' : '';
      return `
        <div class="toefl-domain-card ${isActive}" data-domain="${d.id}">
          <div class="toefl-domain-top">
            <div class="toefl-domain-icon">${d.icon}</div>
            <div>
              <div class="toefl-domain-name">${d.nameID}</div>
            </div>
          </div>
          <div class="toefl-domain-progress">
            <div class="toefl-domain-bar" style="width:${pct}%"></div>
          </div>
          <div class="toefl-domain-meta">
            <span>${d.words.length} kata</span>
            <span>${pct}% selesai</span>
          </div>
        </div>`;
    }).join('');

    // Add "All" card at start
    const totalPct = Math.round((Object.keys(prog).length / TOEFLVocabData.getTotalCount()) * 100);
    const allCard = `
      <div class="toefl-domain-card ${_state.domain === 'all' ? 'active' : ''}" data-domain="all">
        <div class="toefl-domain-top">
          <div class="toefl-domain-icon">📚</div>
          <div><div class="toefl-domain-name">Semua Kategori</div></div>
        </div>
        <div class="toefl-domain-progress">
          <div class="toefl-domain-bar" style="width:${totalPct}%"></div>
        </div>
        <div class="toefl-domain-meta">
          <span>${TOEFLVocabData.getTotalCount()} kata</span>
          <span>${totalPct}% selesai</span>
        </div>
      </div>`;
    container.innerHTML = allCard + container.innerHTML;

    container.querySelectorAll('.toefl-domain-card').forEach(card => {
      card.addEventListener('click', () => {
        _state.domain = card.dataset.domain;
        _state.searchQuery = '';
        const search = document.getElementById('word-search');
        if (search) search.value = '';
        _buildWordList();
        _renderBrowse();
      });
    });
  }

  function _renderWordList() {
    const container = document.getElementById('word-list');
    if (!container) return;
    const prog = _getProgress();
    if (!_state.words.length) {
      container.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-secondary);">Tidak ada kata ditemukan.</div>';
      return;
    }
    container.innerHTML = _state.words.map(w => {
      const learned = !!prog[w.id];
      const statusClass = learned ? 'learned' : '';
      return `
        <div class="toefl-word-item" data-word-id="${w.id}">
          <div class="toefl-word-status ${statusClass}"></div>
          <div class="toefl-word-main">
            <div class="toefl-word-text">${w.word}</div>
            <div class="toefl-word-ipa">${w.ipa}</div>
          </div>
          <div class="toefl-word-trans">${w.translation}</div>
          <button class="toefl-word-audio" data-speak="${w.word}">🔊</button>
        </div>`;
    }).join('');

    container.querySelectorAll('.toefl-word-item').forEach(item => {
      item.addEventListener('click', e => {
        if (e.target.closest('.toefl-word-audio')) return;
        _openWordModal(item.dataset.wordId);
      });
    });
    container.querySelectorAll('[data-speak]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        _speak(btn.dataset.speak);
      });
    });
  }

  function _openWordModal(wordId) {
    const w = TOEFLVocabData.getWordById(wordId);
    if (!w) return;
    _markLearned(wordId);
    const overlay = document.getElementById('word-modal-overlay');
    if (!overlay) return;
    overlay.querySelector('#modal-word').textContent = w.word;
    overlay.querySelector('#modal-ipa').textContent = w.ipa;
    overlay.querySelector('#modal-trans').textContent = w.translation;
    overlay.querySelector('#modal-cat').textContent = w.category;
    overlay.querySelector('#modal-example').textContent = w.example;
    overlay.classList.add('show');
    _renderStats();
    _renderDomainGrid();
  }

  // ── FLASHCARD MODE ────────────────────────────────────────

  function _initFlashcard() {
    let words;
    const domSel = document.getElementById('fc-domain-select');
    const countSel = document.getElementById('fc-count-select');
    const domain = domSel ? domSel.value : 'all';
    const count = countSel ? parseInt(countSel.value) : 15;
    if (domain === 'all') {
      words = TOEFLVocabData.getAllWords();
    } else {
      const d = TOEFLVocabData.getDomain(domain);
      words = d ? d.words.map(w => ({ ...w, domainId: d.id })) : [];
    }
    const queue = [...words].sort(() => Math.random() - 0.5).slice(0, Math.min(count, words.length));
    _state.fc = { index: 0, flipped: false, queue };
    _renderFlashcard();
  }

  function _renderFlashcard() {
    const { index, flipped, queue } = _state.fc;
    const countEl = document.getElementById('fc-count');
    if (countEl) countEl.textContent = `${index + 1} / ${queue.length}`;
    if (!queue.length) return;
    const w = queue[index];
    const card = document.getElementById('fc-card');
    if (!card) return;
    card.classList.toggle('flipped', flipped);
    const frontWord = document.getElementById('fc-front-word');
    const frontIpa  = document.getElementById('fc-front-ipa');
    const backTrans = document.getElementById('fc-back-trans');
    const backExample = document.getElementById('fc-back-example');
    const backCat   = document.getElementById('fc-back-cat');
    if (frontWord) frontWord.textContent = w.word;
    if (frontIpa)  frontIpa.textContent  = w.ipa;
    if (backTrans) backTrans.textContent  = w.translation;
    if (backExample) backExample.textContent = w.example;
    if (backCat) backCat.textContent = w.category;

    const flipBtn = document.getElementById('fc-flip-btn');
    const srsButtons = document.getElementById('fc-srs-buttons');
    if (flipBtn) flipBtn.style.display = flipped ? 'none' : 'inline-block';
    if (srsButtons) srsButtons.style.display = flipped ? 'flex' : 'none';
  }

  function _fcFlip() {
    _state.fc.flipped = true;
    const w = _state.fc.queue[_state.fc.index];
    if (w) _markLearned(w.id);
    _renderFlashcard();
  }

  function _fcNext(quality) {
    const { index, queue } = _state.fc;
    const w = queue[index];
    if (w && typeof SRSSystem !== 'undefined') {
      SRSSystem.reviewCard(_getSRSKey(), w.id, quality);
      const r = XPSystem.addXP('SRS_REVIEW');
      if (r) App.toastXP(r);
    }
    if (index + 1 >= queue.length) {
      _showFcComplete();
      return;
    }
    _state.fc.index++;
    _state.fc.flipped = false;
    _renderFlashcard();
  }

  function _showFcComplete() {
    const area = document.getElementById('fc-area');
    if (!area) return;
    area.innerHTML = `
      <div style="text-align:center;padding:2rem;">
        <div style="font-size:2.5rem;margin-bottom:0.75rem;">🎉</div>
        <div style="font-size:1.3rem;font-weight:800;margin-bottom:0.5rem;">Sesi Selesai!</div>
        <div style="color:var(--text-secondary);margin-bottom:1.5rem;">Kamu telah meninjau ${_state.fc.queue.length} kata TOEFL.</div>
        <button class="toefl-fc-btn flip" id="fc-restart-btn">Mulai Lagi</button>
      </div>`;
    document.getElementById('fc-restart-btn')?.addEventListener('click', _initFlashcard);
  }

  // ── QUIZ MODE ─────────────────────────────────────────────

  function _buildQuiz(domainId, count) {
    let pool;
    if (domainId === 'all') {
      pool = TOEFLVocabData.getAllWords();
    } else {
      const d = TOEFLVocabData.getDomain(domainId);
      pool = d ? d.words.map(w => ({ ...w, domainId: d.id })) : [];
    }
    const allWords = TOEFLVocabData.getAllWords();
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
    return shuffled.map(w => {
      const distractors = allWords
        .filter(x => x.id !== w.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(x => x.translation);
      const options = [...distractors, w.translation].sort(() => Math.random() - 0.5);
      return { ...w, options, correctAnswer: w.translation };
    });
  }

  function _initQuiz() {
    const domSel = document.getElementById('quiz-domain-select');
    const domain = domSel ? domSel.value : 'all';
    const questions = _buildQuiz(domain, 10);
    _state.quiz = { index: 0, questions, score: 0, answered: false, selected: null, done: false };
    _renderQuizQuestion();
  }

  function _renderQuizQuestion() {
    const { index, questions, score } = _state.quiz;
    const progressBar = document.getElementById('quiz-progress-fill');
    const questionNum = document.getElementById('quiz-question-num');
    const resultArea  = document.getElementById('quiz-result');
    const questionArea = document.getElementById('quiz-question-area');

    if (_state.quiz.done || index >= questions.length) {
      if (questionArea) questionArea.style.display = 'none';
      if (resultArea)   resultArea.classList.add('show');
      _renderQuizResult();
      return;
    }

    if (progressBar) progressBar.style.width = `${((index) / questions.length) * 100}%`;
    if (questionNum) questionNum.textContent = `${index + 1} / ${questions.length}`;

    const q = questions[index];
    const quizWord = document.getElementById('quiz-word');
    const quizIpa  = document.getElementById('quiz-ipa');
    const quizEx   = document.getElementById('quiz-example');
    const optContainer = document.getElementById('quiz-options');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn  = document.getElementById('quiz-next-btn');

    if (quizWord) quizWord.textContent = q.word;
    if (quizIpa)  quizIpa.textContent  = q.ipa;
    if (quizEx)   quizEx.textContent   = q.example;
    if (feedback) { feedback.classList.remove('show'); feedback.textContent = ''; }
    if (nextBtn)  nextBtn.classList.remove('show');

    if (optContainer) {
      optContainer.innerHTML = q.options.map(opt =>
        `<button class="toefl-quiz-option" data-opt="${opt.replace(/"/g,'&quot;')}">${opt}</button>`
      ).join('');
      optContainer.querySelectorAll('.toefl-quiz-option').forEach(btn => {
        btn.addEventListener('click', () => _answerQuiz(btn.dataset.opt));
      });
    }
    _state.quiz.answered = false;
  }

  function _answerQuiz(selected) {
    if (_state.quiz.answered) return;
    _state.quiz.answered = true;
    _state.quiz.selected = selected;
    const q = _state.quiz.questions[_state.quiz.index];
    const isCorrect = selected === q.correctAnswer;
    if (isCorrect) {
      _state.quiz.score++;
      const r = XPSystem.addXP('QUIZ_CORRECT');
      if (r) App.toastXP(r);
    }
    document.querySelectorAll('.toefl-quiz-option').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.opt === q.correctAnswer) btn.classList.add('correct');
      else if (btn.dataset.opt === selected && !isCorrect) btn.classList.add('wrong');
    });
    const feedback = document.getElementById('quiz-feedback');
    if (feedback) {
      feedback.textContent = isCorrect
        ? `✅ Benar! "${q.word}" artinya "${q.correctAnswer}".`
        : `❌ Salah. Jawaban yang benar: "${q.correctAnswer}".\nContoh: ${q.example}`;
      feedback.classList.add('show');
    }
    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) nextBtn.classList.add('show');
    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onQuizComplete();
  }

  function _nextQuestion() {
    _state.quiz.index++;
    if (_state.quiz.index >= _state.quiz.questions.length) {
      _state.quiz.done = true;
    }
    _renderQuizQuestion();
  }

  function _renderQuizResult() {
    const { score, questions } = _state.quiz;
    const pct = Math.round((score / questions.length) * 100);
    const emojis = pct === 100 ? '🏆' : pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '📚';
    if (pct === 100) {
      const r = XPSystem.addXP('QUIZ_PERFECT');
      if (r) App.toastXP(r);
    }
    const resultEl = document.getElementById('quiz-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="toefl-quiz-result-emoji">${emojis}</div>
        <div class="toefl-quiz-result-title">${pct === 100 ? 'Sempurna!' : pct >= 80 ? 'Bagus Sekali!' : pct >= 60 ? 'Cukup Baik!' : 'Perlu Latihan Lagi'}</div>
        <div class="toefl-quiz-result-score">${score} / ${questions.length}</div>
        <div class="toefl-quiz-result-xp">+${score * 3}${pct === 100 ? ' + 20 bonus' : ''} XP</div>
        <div>
          <button class="toefl-quiz-result-btn" id="quiz-retry-btn">🔄 Coba Lagi</button>
          <button class="toefl-quiz-result-btn" onclick="TOEFLVocab.switchMode('browse')">📚 Browse Kata</button>
        </div>`;
      resultEl.classList.add('show');
    }
    document.getElementById('quiz-retry-btn')?.addEventListener('click', _initQuiz);
  }

  // ── SRS MODE ──────────────────────────────────────────────

  function _initSRS() {
    if (typeof SRSSystem === 'undefined') {
      _renderSRSEmpty('SRS engine tidak tersedia.');
      return;
    }
    const dueIds = SRSSystem.getDueCards(_getSRSKey());
    if (!dueIds.length) {
      _renderSRSEmpty('Tidak ada kartu untuk direview hari ini. 🎉');
      return;
    }
    const cards = dueIds.map(id => TOEFLVocabData.getWordById(id)).filter(Boolean);
    _state.srs = { cards, index: 0, revealed: false };
    _renderSRSCard();
  }

  function _renderSRSEmpty(msg) {
    const area = document.getElementById('srs-area');
    if (!area) return;
    area.innerHTML = `
      <div class="toefl-srs-empty">
        <div class="toefl-srs-empty-icon">✅</div>
        <div style="font-weight:700;margin-bottom:0.5rem;">${msg}</div>
        <div style="font-size:0.85rem;">Kembali besok untuk review selanjutnya.</div>
      </div>`;
  }

  function _renderSRSCard() {
    const { cards, index, revealed } = _state.srs;
    const area = document.getElementById('srs-area');
    if (!area) return;
    if (index >= cards.length) {
      area.innerHTML = `
        <div class="toefl-srs-empty">
          <div class="toefl-srs-empty-icon">🎉</div>
          <div style="font-weight:700;margin-bottom:0.5rem;">Review Selesai!</div>
          <div style="font-size:0.85rem;">Kamu telah mereview ${cards.length} kartu hari ini.</div>
        </div>`;
      return;
    }
    const w = cards[index];
    area.innerHTML = `
      <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:0.75rem;text-align:center;">${index + 1} / ${cards.length} kartu</div>
      <div class="toefl-srs-card">
        <div class="toefl-srs-word">${w.word}</div>
        <div class="toefl-srs-ipa">${w.ipa}</div>
        <button class="toefl-srs-reveal-btn" id="srs-reveal-btn">🔍 Tampilkan Jawaban</button>
        <div class="toefl-srs-answer ${revealed ? 'show' : ''}" id="srs-answer">
          <div class="toefl-srs-translation">${w.translation}</div>
          <div class="toefl-srs-example">"${w.example}"</div>
          <div class="toefl-srs-buttons">
            <button class="toefl-fc-btn hard" id="srs-hard-btn">😓 Susah</button>
            <button class="toefl-fc-btn okay" id="srs-okay-btn">🤔 Ingat</button>
            <button class="toefl-fc-btn easy" id="srs-easy-btn">😊 Mudah</button>
          </div>
        </div>
      </div>`;
    document.getElementById('srs-reveal-btn')?.addEventListener('click', () => {
      _state.srs.revealed = true;
      document.getElementById('srs-answer')?.classList.add('show');
      document.getElementById('srs-reveal-btn').style.display = 'none';
    });
    const reviewAndNext = (quality) => {
      SRSSystem.reviewCard(_getSRSKey(), w.id, quality);
      const r = XPSystem.addXP('SRS_REVIEW');
      if (r) App.toastXP(r);
      _state.srs.index++;
      _state.srs.revealed = false;
      _renderSRSCard();
    };
    document.getElementById('srs-hard-btn')?.addEventListener('click', () => reviewAndNext(1));
    document.getElementById('srs-okay-btn')?.addEventListener('click', () => reviewAndNext(3));
    document.getElementById('srs-easy-btn')?.addEventListener('click', () => reviewAndNext(5));
  }

  // ── UI helpers ────────────────────────────────────────────

  function _speak(text) {
    if (!('speechSynthesis' in window)) return;
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US';
    utt.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(utt);
  }

  function _switchMode(mode) {
    _state.mode = mode;
    document.querySelectorAll('.toefl-vocab-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.mode === mode);
    });
    ['browse-panel', 'flashcard-panel', 'quiz-panel', 'srs-panel'].forEach(p => {
      const el = document.getElementById(p);
      if (el) el.style.display = 'none';
    });
    const panel = document.getElementById(`${mode}-panel`);
    if (panel) panel.style.display = 'block';

    if (mode === 'browse') { _buildWordList(); _renderBrowse(); }
    else if (mode === 'flashcard') _initFlashcard();
    else if (mode === 'quiz') _initQuiz();
    else if (mode === 'srs') _initSRS();
    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onModuleVisit();
  }

  // ── Init ──────────────────────────────────────────────────

  function init() {
    _buildWordList();
    _renderStats();
    _renderBrowse();

    document.querySelectorAll('.toefl-vocab-tab').forEach(tab => {
      tab.addEventListener('click', () => _switchMode(tab.dataset.mode));
    });

    const searchInput = document.getElementById('word-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        _state.searchQuery = e.target.value.trim();
        _buildWordList();
        _renderWordList();
      });
    }

    document.getElementById('fc-domain-select')?.addEventListener('change', _initFlashcard);
    document.getElementById('fc-count-select')?.addEventListener('change', _initFlashcard);
    document.getElementById('fc-flip-btn')?.addEventListener('click', _fcFlip);
    document.getElementById('fc-card')?.addEventListener('click', () => {
      if (!_state.fc.flipped) _fcFlip();
    });
    document.getElementById('fc-hard-btn')?.addEventListener('click', () => _fcNext(1));
    document.getElementById('fc-okay-btn')?.addEventListener('click', () => _fcNext(3));
    document.getElementById('fc-easy-btn')?.addEventListener('click', () => _fcNext(5));
    document.getElementById('fc-prev-btn')?.addEventListener('click', () => {
      if (_state.fc.index > 0) {
        _state.fc.index--;
        _state.fc.flipped = false;
        _renderFlashcard();
      }
    });
    document.getElementById('fc-next-btn')?.addEventListener('click', () => {
      if (_state.fc.index < _state.fc.queue.length - 1) {
        _state.fc.index++;
        _state.fc.flipped = false;
        _renderFlashcard();
      }
    });

    document.getElementById('quiz-domain-select')?.addEventListener('change', _initQuiz);
    document.getElementById('quiz-next-btn')?.addEventListener('click', _nextQuestion);

    const overlay = document.getElementById('word-modal-overlay');
    if (overlay) {
      document.getElementById('modal-close-btn')?.addEventListener('click', () => overlay.classList.remove('show'));
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('show');
      });
      document.getElementById('modal-audio-btn')?.addEventListener('click', () => {
        const word = document.getElementById('modal-word')?.textContent;
        if (word) _speak(word);
      });
    }

    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onModuleVisit();
  }

  return {
    init,
    switchMode: _switchMode,
    speak: _speak
  };
})();

document.addEventListener('DOMContentLoaded', TOEFLVocab.init);
