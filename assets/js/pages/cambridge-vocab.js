/**
 * EnglishPath — Cambridge Vocabulary Module
 * Fase 16a: Browse, Flashcard, SRS Review, Quiz modes
 * localStorage: ep_user_{id}_srs_cambridge_vocab, ep_user_{id}_cambridge_vocab
 */
const CambridgeVocab = (() => {

  // ── State ────────────────────────────────────────────────
  let _state = {
    mode: 'browse',
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

  // ── Storage helpers ──────────────────────────────────────
  function _getVocabKey()  { return 'cambridge_vocab'; }
  function _getSRSKey()    { return 'srs_cambridge_vocab'; }

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

  // ── Build word list ──────────────────────────────────────
  function _buildWordList() {
    let words;
    if (_state.domain === 'all') {
      words = CambridgeVocabData.getAllWords();
    } else {
      const dom = CambridgeVocabData.getDomain(_state.domain);
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

  // ── Stats ────────────────────────────────────────────────
  function _getStats() {
    const prog = _getProgress();
    const allWords = CambridgeVocabData.getAllWords();
    const total = allWords.length;
    const learned = Object.keys(prog).length;
    let due = 0;
    if (typeof SRSSystem !== 'undefined') {
      due = SRSSystem.getDueCards(_getSRSKey(), allWords.map(w => w.id)).length;
    }
    // "mastered" = SRS interval >= 7
    let mastered = 0;
    const srsData = Storage.getUser(_getUserId(), _getSRSKey(), {});
    Object.values(srsData).forEach(card => {
      if (card && card.interval >= 7) mastered++;
    });
    return { total, learned, due, mastered };
  }

  function _updateStatsBar() {
    const s = _getStats();
    document.getElementById('stat-total').textContent = s.total;
    document.getElementById('stat-learned').textContent = s.learned;
    document.getElementById('stat-due').textContent = s.due;
    document.getElementById('stat-mastered').textContent = s.mastered;
  }

  // ── TTS ──────────────────────────────────────────────────
  function _speak(text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-GB';
    utt.rate = 0.9;
    speechSynthesis.speak(utt);
  }

  // ── Mode switching ───────────────────────────────────────
  function _switchMode(mode) {
    _state.mode = mode;
    const modes = ['browse', 'flashcard', 'quiz', 'srs'];
    modes.forEach(m => {
      const el = document.getElementById(`mode-${m}`);
      if (el) el.classList.toggle('hidden', m !== mode);
    });
    document.querySelectorAll('.cam-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    if (mode === 'browse') _renderBrowse();
    if (mode === 'flashcard') _renderFCSetup();
    if (mode === 'quiz') _renderQuizStart();
    if (mode === 'srs') _initSRS();
  }

  // ════════════════════════════════════════════════════════
  //  BROWSE MODE
  // ════════════════════════════════════════════════════════
  function _renderBrowse() {
    _renderDomainGrid();
    _buildWordList();
    _renderWordList();
  }

  function _renderDomainGrid() {
    const domains = CambridgeVocabData.getDomains();
    const prog = _getProgress();
    const grid = document.getElementById('domain-grid');
    if (!grid) return;
    grid.innerHTML = domains.map(d => {
      const learnedCount = d.words.filter(w => prog[w.id]).length;
      const pct = d.words.length ? Math.round((learnedCount / d.words.length) * 100) : 0;
      const isActive = _state.domain === d.id ? 'active' : '';
      return `
        <div class="cam-domain-card ${isActive}" data-domain="${d.id}">
          <span class="cam-domain-icon">${d.icon}</span>
          <div class="cam-domain-name">${d.nameID}</div>
          <div class="cam-domain-count">${learnedCount}/${d.words.length} kata</div>
          <div class="cam-domain-progress-bar">
            <div class="cam-domain-progress-fill" style="width:${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');

    // All domains card prepend
    const allCard = `
      <div class="cam-domain-card ${_state.domain === 'all' ? 'active' : ''}" data-domain="all">
        <span class="cam-domain-icon">🌐</span>
        <div class="cam-domain-name">Semua Domain</div>
        <div class="cam-domain-count">${Object.keys(prog).length}/${CambridgeVocabData.getTotalCount()} kata</div>
        <div class="cam-domain-progress-bar">
          <div class="cam-domain-progress-fill" style="width:${CambridgeVocabData.getTotalCount() ? Math.round((Object.keys(prog).length/CambridgeVocabData.getTotalCount())*100) : 0}%"></div>
        </div>
      </div>
    `;
    grid.insertAdjacentHTML('afterbegin', allCard);

    grid.querySelectorAll('.cam-domain-card').forEach(card => {
      card.addEventListener('click', () => {
        _state.domain = card.dataset.domain;
        _state.searchQuery = '';
        const si = document.getElementById('search-input');
        if (si) si.value = '';
        _renderBrowse();
      });
    });
  }

  function _renderWordList() {
    const list = document.getElementById('word-list');
    const titleEl = document.getElementById('domain-title-browse');
    if (!list) return;
    const prog = _getProgress();

    if (titleEl) {
      if (_state.domain === 'all') {
        titleEl.textContent = 'Semua Kata';
      } else {
        const dom = CambridgeVocabData.getDomain(_state.domain);
        titleEl.textContent = dom ? dom.nameID : '';
      }
    }

    if (_state.filteredWords.length === 0) {
      list.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--text-secondary);">Tidak ada kata yang cocok.</div>';
      return;
    }

    list.innerHTML = _state.filteredWords.map(w => {
      const learned = _isLearned(w.id);
      const srsData = Storage.getUser(_getUserId(), _getSRSKey(), {});
      const card = srsData[w.id];
      let statusClass = 'new';
      let statusLabel = 'Baru';
      if (learned) {
        if (card && card.interval >= 7) { statusClass = 'mastered'; statusLabel = 'Hafal'; }
        else { statusClass = 'learning'; statusLabel = 'Belajar'; }
      }
      const typeBadge = w.wordType ? `<span class="cam-word-type-badge">${w.wordType}</span>` : '';
      return `
        <div class="cam-word-item" data-id="${w.id}">
          <div class="cam-word-main">${w.word}</div>
          <div class="cam-word-translation">${w.translation}</div>
          ${typeBadge}
          <div class="cam-word-status ${statusClass}">${statusLabel}</div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.cam-word-item').forEach(item => {
      item.addEventListener('click', () => {
        const word = _state.filteredWords.find(w => w.id === item.dataset.id);
        if (word) _openModal(word);
      });
    });
  }

  // ── Modal ─────────────────────────────────────────────────
  function _openModal(word) {
    document.getElementById('modal-word').textContent = word.word;
    document.getElementById('modal-ipa').textContent = word.ipa || '';
    document.getElementById('modal-type').textContent = word.category || '';
    document.getElementById('modal-translation').textContent = word.translation;
    document.getElementById('modal-word-type').textContent = word.wordType ? `✦ ${word.wordType}` : '';
    document.getElementById('modal-example').textContent = `"${word.example}"`;

    const learnBtn = document.getElementById('modal-learn-btn');
    if (_isLearned(word.id)) {
      learnBtn.textContent = '✅ Sudah Dipelajari';
      learnBtn.disabled = true;
    } else {
      learnBtn.textContent = '✅ Tandai Dipelajari';
      learnBtn.disabled = false;
    }

    learnBtn.onclick = () => {
      _markLearned(word.id);
      learnBtn.textContent = '✅ Sudah Dipelajari';
      learnBtn.disabled = true;
      _updateStatsBar();
      _renderBrowse();
    };

    document.getElementById('modal-speak-btn').onclick = () => _speak(word.word);
    document.getElementById('word-modal').classList.remove('hidden');
  }

  // ════════════════════════════════════════════════════════
  //  FLASHCARD MODE
  // ════════════════════════════════════════════════════════
  function _renderFCSetup() {
    const sel = document.getElementById('fc-domain-select');
    if (!sel || sel.options.length > 1) {
      // already populated
    } else {
      CambridgeVocabData.getDomains().forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = `${d.icon} ${d.nameID}`;
        sel.appendChild(opt);
      });
    }
    document.getElementById('fc-setup').classList.remove('hidden');
    document.getElementById('fc-play').classList.add('hidden');
  }

  function _startFlashcard() {
    const domainId = document.getElementById('fc-domain-select').value;
    const countVal = document.getElementById('fc-count-select').value;

    let words;
    if (domainId === 'all') {
      words = CambridgeVocabData.getAllWords();
    } else {
      const dom = CambridgeVocabData.getDomain(domainId);
      words = dom ? dom.words.map(w => ({ ...w, domainId: dom.id, domainName: dom.nameID })) : [];
    }

    // Shuffle
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }

    const count = countVal === 'all' ? words.length : Math.min(parseInt(countVal), words.length);
    _state.fc = { index: 0, flipped: false, queue: words.slice(0, count) };

    document.getElementById('fc-setup').classList.add('hidden');
    document.getElementById('fc-play').classList.remove('hidden');
    document.getElementById('fc-done').classList.add('hidden');
    document.getElementById('fc-card').classList.remove('hidden');
    document.getElementById('fc-progress').classList.remove('hidden');

    _renderFCCard();
  }

  function _renderFCCard() {
    const { index, queue } = _state.fc;
    if (index >= queue.length) {
      // Done
      document.getElementById('fc-card').classList.add('hidden');
      document.getElementById('fc-quality-btns').classList.add('hidden');
      document.getElementById('fc-progress').classList.add('hidden');
      document.getElementById('fc-done').classList.remove('hidden');
      return;
    }
    const word = queue[index];
    document.getElementById('fc-progress').textContent = `Kartu ${index + 1} / ${queue.length}`;
    document.getElementById('fc-front-word').textContent = word.word;
    document.getElementById('fc-front-ipa').textContent = word.ipa || '';
    document.getElementById('fc-back-trans').textContent = word.translation;
    document.getElementById('fc-back-type').textContent = word.wordType ? `✦ ${word.wordType}` : word.category || '';
    document.getElementById('fc-back-example').textContent = `"${word.example}"`;

    // Reset flip
    _state.fc.flipped = false;
    document.getElementById('fc-card').classList.remove('flipped');
    document.getElementById('fc-quality-btns').classList.add('hidden');
  }

  // ════════════════════════════════════════════════════════
  //  QUIZ MODE
  // ════════════════════════════════════════════════════════
  function _renderQuizStart() {
    const sel = document.getElementById('quiz-domain-select');
    if (sel && sel.options.length <= 1) {
      CambridgeVocabData.getDomains().forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = `${d.icon} ${d.nameID}`;
        sel.appendChild(opt);
      });
    }
    document.getElementById('quiz-start').classList.remove('hidden');
    document.getElementById('quiz-play').classList.add('hidden');
    document.getElementById('quiz-result').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
  }

  function _startQuiz() {
    const domainId = document.getElementById('quiz-domain-select').value;
    let words;
    if (domainId === 'all') {
      words = CambridgeVocabData.getAllWords();
    } else {
      const dom = CambridgeVocabData.getDomain(domainId);
      words = dom ? dom.words.map(w => ({ ...w })) : [];
    }

    if (words.length < 4) {
      App.toast('Butuh minimal 4 kata untuk quiz.', 'error');
      return;
    }

    // Shuffle and pick 10
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    const pool = words.slice(0, Math.min(10, words.length));
    const allWords = CambridgeVocabData.getAllWords();

    const questions = pool.map(w => {
      const distractors = allWords.filter(x => x.id !== w.id);
      for (let i = distractors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
      }
      const choices = [w, ...distractors.slice(0, 3)];
      for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
      }
      return { word: w, choices };
    });

    _state.quiz = { index: 0, questions, score: 0, answered: false, selected: null, done: false };

    document.getElementById('quiz-start').classList.add('hidden');
    document.getElementById('quiz-play').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');

    _renderQuizQuestion();
  }

  function _renderQuizQuestion() {
    const { index, questions } = _state.quiz;
    if (index >= questions.length) {
      _showQuizResult();
      return;
    }
    const q = questions[index];
    const total = questions.length;

    document.getElementById('quiz-num').textContent = `${index + 1}/${total}`;
    document.getElementById('quiz-score-display').textContent = `Skor: ${_state.quiz.score}`;
    const pct = ((index + 1) / total) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${pct}%`;

    document.getElementById('quiz-q-word').textContent = q.word.word;
    document.getElementById('quiz-q-ipa').textContent = q.word.ipa || '';

    const choicesEl = document.getElementById('quiz-choices');
    choicesEl.innerHTML = q.choices.map((c, i) => `
      <button class="cam-quiz-choice" data-index="${i}" data-correct="${c.id === q.word.id}">
        ${c.translation}
      </button>
    `).join('');

    document.getElementById('quiz-feedback').className = 'cam-quiz-feedback';
    document.getElementById('quiz-feedback').innerHTML = '';
    document.getElementById('quiz-next-btn').classList.add('hidden');
    _state.quiz.answered = false;

    choicesEl.querySelectorAll('.cam-quiz-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        if (_state.quiz.answered) return;
        _state.quiz.answered = true;
        const isCorrect = btn.dataset.correct === 'true';

        choicesEl.querySelectorAll('.cam-quiz-choice').forEach(b => {
          b.disabled = true;
          if (b.dataset.correct === 'true') b.classList.add('correct');
        });
        if (!isCorrect) btn.classList.add('wrong');

        if (isCorrect) {
          _state.quiz.score++;
          if (typeof XPSystem !== 'undefined') {
            const r = XPSystem.addXP('QUIZ_CORRECT');
            if (r) App.toastXP(r);
          }
          document.getElementById('quiz-feedback').className = 'cam-quiz-feedback correct';
          document.getElementById('quiz-feedback').innerHTML = `✅ Benar! <span class="cam-quiz-example">"${q.word.example}"</span>`;
        } else {
          document.getElementById('quiz-feedback').className = 'cam-quiz-feedback wrong';
          document.getElementById('quiz-feedback').innerHTML = `❌ Kurang tepat. Jawaban: <strong>${q.word.translation}</strong><span class="cam-quiz-example"> — "${q.word.example}"</span>`;
        }

        document.getElementById('quiz-next-btn').classList.remove('hidden');
        _markLearned(q.word.id);
        _updateStatsBar();
      });
    });
  }

  function _showQuizResult() {
    document.getElementById('quiz-play').classList.add('hidden');
    document.getElementById('quiz-result').classList.remove('hidden');

    const { score, questions } = _state.quiz;
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const emojis = ['😔', '😅', '🙂', '😊', '🎉'];
    const emojiIdx = Math.floor(pct / 25);

    document.getElementById('quiz-result-emoji').textContent = emojis[Math.min(emojiIdx, 4)];
    document.getElementById('quiz-result-score').textContent = `${score}/${total}`;
    document.getElementById('quiz-result-msg').textContent =
      pct === 100 ? 'Luar biasa! Skor sempurna! 🌟' :
      pct >= 80 ? 'Bagus sekali! Kamu menguasai sebagian besar kata!' :
      pct >= 60 ? 'Cukup baik. Terus latihan untuk meningkatkan!' :
      'Masih perlu banyak latihan. Jangan menyerah!';

    if (pct === 100 && typeof XPSystem !== 'undefined') {
      const r = XPSystem.addXP('QUIZ_PERFECT');
      if (r) App.toastXP(r);
    }

    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onQuizComplete();

    document.getElementById('quiz-retry-btn').onclick = _startQuiz;
    document.getElementById('quiz-browse-btn').onclick = () => _switchMode('browse');
  }

  // ════════════════════════════════════════════════════════
  //  SRS REVIEW MODE
  // ════════════════════════════════════════════════════════
  function _initSRS() {
    const allWords = CambridgeVocabData.getAllWords();
    let dueCards = [];
    if (typeof SRSSystem !== 'undefined') {
      const dueIds = SRSSystem.getDueCards(_getSRSKey(), allWords.map(w => w.id));
      dueCards = dueIds.map(id => allWords.find(w => w.id === id)).filter(Boolean);
    }

    _state.srs = { cards: dueCards, index: 0, revealed: false };

    const emptyEl = document.getElementById('srs-empty');
    const playEl = document.getElementById('srs-play');

    if (dueCards.length === 0) {
      emptyEl.classList.remove('hidden');
      playEl.classList.add('hidden');
    } else {
      emptyEl.classList.add('hidden');
      playEl.classList.remove('hidden');
      _renderSRSCard();
    }
  }

  function _renderSRSCard() {
    const { cards, index } = _state.srs;
    if (index >= cards.length) {
      document.getElementById('srs-empty').classList.remove('hidden');
      document.getElementById('srs-play').classList.add('hidden');
      return;
    }
    const word = cards[index];
    _state.srs.revealed = false;

    document.getElementById('srs-progress').textContent = `${index + 1} / ${cards.length} kartu untuk review`;
    document.getElementById('srs-word').textContent = word.word;
    document.getElementById('srs-ipa').textContent = word.ipa || '';
    document.getElementById('srs-reveal').classList.remove('visible');
    document.getElementById('srs-reveal-type').textContent = word.wordType ? `✦ ${word.wordType}` : '';
    document.getElementById('srs-reveal-trans').textContent = word.translation;
    document.getElementById('srs-reveal-example').textContent = `"${word.example}"`;
    document.getElementById('srs-quality-btns').classList.add('hidden');
    document.getElementById('srs-reveal-btn').classList.remove('hidden');
  }

  // ════════════════════════════════════════════════════════
  //  INIT
  // ════════════════════════════════════════════════════════
  function init() {
    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onModuleVisit();

    // Mode tabs
    document.querySelectorAll('.cam-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => _switchMode(btn.dataset.mode));
    });

    // Search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        _state.searchQuery = e.target.value;
        _buildWordList();
        _renderWordList();
      });
    }

    // Modal close
    document.getElementById('modal-close-btn')?.addEventListener('click', () => {
      document.getElementById('word-modal').classList.add('hidden');
    });
    document.getElementById('word-modal')?.addEventListener('click', e => {
      if (e.target === e.currentTarget) e.currentTarget.classList.add('hidden');
    });

    // Flashcard events
    document.getElementById('fc-start-btn')?.addEventListener('click', _startFlashcard);
    document.getElementById('fc-card')?.addEventListener('click', () => {
      if (_state.fc.index >= _state.fc.queue.length) return;
      _state.fc.flipped = !_state.fc.flipped;
      document.getElementById('fc-card').classList.toggle('flipped', _state.fc.flipped);
      if (_state.fc.flipped) {
        document.getElementById('fc-quality-btns').classList.remove('hidden');
        _markLearned(_state.fc.queue[_state.fc.index].id);
      }
    });
    document.getElementById('fc-speak-btn')?.addEventListener('click', e => {
      e.stopPropagation();
      const w = _state.fc.queue[_state.fc.index];
      if (w) _speak(w.word);
    });
    document.querySelectorAll('#fc-quality-btns .cam-fc-quality-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const quality = parseInt(btn.dataset.quality);
        const word = _state.fc.queue[_state.fc.index];
        if (typeof SRSSystem !== 'undefined') {
          SRSSystem.reviewCard(_getSRSKey(), word.id, quality);
          if (typeof XPSystem !== 'undefined') {
            const r = XPSystem.addXP('SRS_REVIEW');
            if (r) App.toastXP(r);
          }
          if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onSRSReview();
        }
        _state.fc.index++;
        _state.fc.flipped = false;
        document.getElementById('fc-quality-btns').classList.add('hidden');
        _renderFCCard();
        _updateStatsBar();
      });
    });
    document.getElementById('fc-restart-btn')?.addEventListener('click', _startFlashcard);
    document.getElementById('fc-back-setup-btn')?.addEventListener('click', _renderFCSetup);

    // Quiz events
    document.getElementById('quiz-start-btn')?.addEventListener('click', _startQuiz);
    document.getElementById('quiz-next-btn')?.addEventListener('click', () => {
      _state.quiz.index++;
      _renderQuizQuestion();
    });

    // SRS events
    document.getElementById('srs-reveal-btn')?.addEventListener('click', () => {
      _state.srs.revealed = true;
      document.getElementById('srs-reveal').classList.add('visible');
      document.getElementById('srs-reveal-btn').classList.add('hidden');
      document.getElementById('srs-quality-btns').classList.remove('hidden');
    });
    document.getElementById('srs-speak-btn')?.addEventListener('click', () => {
      const w = _state.srs.cards[_state.srs.index];
      if (w) _speak(w.word);
    });
    document.querySelectorAll('#srs-quality-btns .cam-fc-quality-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const quality = parseInt(btn.dataset.quality);
        const word = _state.srs.cards[_state.srs.index];
        if (typeof SRSSystem !== 'undefined') {
          SRSSystem.reviewCard(_getSRSKey(), word.id, quality);
          if (typeof XPSystem !== 'undefined') {
            const r = XPSystem.addXP('SRS_REVIEW');
            if (r) App.toastXP(r);
          }
          if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onSRSReview();
        }
        _state.srs.index++;
        _state.srs.revealed = false;
        document.getElementById('srs-quality-btns').classList.add('hidden');
        _renderSRSCard();
        _updateStatsBar();
      });
    });

    // Initial render
    _updateStatsBar();
    _renderBrowse();
  }

  return { init };
})();
