/**
 * EnglishPath — IELTS Vocabulary Module
 * Fase 13a: Flashcard, SRS Review, Quiz, Browse mode
 * localStorage: ep_user_{id}_srs_ielts_vocab, ep_user_{id}_ielts_vocab
 */
const IELTSVocab = (() => {

  // ── State ───────────────────────────────────────────────
  let _state = {
    mode: 'browse',          // browse | flashcard | quiz | srs
    domain: 'all',
    words: [],
    filteredWords: [],
    searchQuery: '',
    // Flashcard state
    fc: { index: 0, flipped: false, queue: [] },
    // Quiz state
    quiz: { index: 0, questions: [], score: 0, answered: false, selected: null, done: false },
    // SRS state
    srs: { cards: [], index: 0, revealed: false }
  };

  function _getUserId() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  // ── Data helpers ────────────────────────────────────────

  function _getIELTSVocabKey() { return 'ielts_vocab'; }
  function _getSRSKey() { return 'srs_ielts_vocab'; }

  function _getProgress() {
    const uid = _getUserId();
    if (!uid) return {};
    return Storage.getUser(uid, _getIELTSVocabKey(), {});
  }

  function _markLearned(wordId) {
    const uid = _getUserId();
    if (!uid) return;
    const prog = _getProgress();
    if (!prog[wordId]) {
      prog[wordId] = { learnedAt: new Date().toISOString() };
      Storage.setUser(uid, _getIELTSVocabKey(), prog);
      // Award XP for first time learning
      if (typeof XPSystem !== 'undefined') {
        const result = XPSystem.addXP('VOCAB_NEW');
        if (result) App.toastXP(result);
      }
    }
    // Also init SRS
    if (typeof SRSSystem !== 'undefined') {
      SRSSystem.initCard('ielts_vocab', wordId);
    }
  }

  function _isLearned(wordId) {
    const prog = _getProgress();
    return !!prog[wordId];
  }

  // ── Build filtered word list ─────────────────────────────

  function _buildWordList() {
    let words;
    if (_state.domain === 'all') {
      words = IELTSVocabData.getAllWords();
    } else {
      const dom = IELTSVocabData.getDomain(_state.domain);
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

  // ── Stats ───────────────────────────────────────────────

  function _updateStats() {
    const allWords = IELTSVocabData.getAllWords();
    const total = allWords.length;
    const prog = _getProgress();
    const learned = Object.keys(prog).length;
    let dueCount = 0, mastered = 0;
    if (typeof SRSSystem !== 'undefined') {
      const stats = SRSSystem.getStats('ielts_vocab');
      dueCount = stats.due;
      mastered = stats.mastered;
    }

    const elTotal    = document.getElementById('iv-stat-total');
    const elLearned  = document.getElementById('iv-stat-learned');
    const elDue      = document.getElementById('iv-stat-due');
    const elMastered = document.getElementById('iv-stat-mastered');
    if (elTotal)    elTotal.textContent = total;
    if (elLearned)  elLearned.textContent = learned;
    if (elDue)      elDue.textContent = dueCount;
    if (elMastered) elMastered.textContent = mastered;
  }

  // ══════════════════════════════════════════════════════
  // ── Render: Browse Mode ────────────────────────────────
  // ══════════════════════════════════════════════════════

  function _renderBrowse() {
    const cont = document.getElementById('iv-content');
    if (!cont) return;

    if (_state.filteredWords.length === 0) {
      cont.innerHTML = `
        <div class="ielts-empty">
          <div class="ielts-empty-icon">🔍</div>
          <div class="ielts-empty-title">Tidak ada kata ditemukan</div>
          <div class="ielts-empty-sub">Coba ganti filter atau kata kunci pencarian.</div>
        </div>`;
      return;
    }

    const prog = _getProgress();
    let html = '<div class="ielts-word-grid">';
    _state.filteredWords.forEach(w => {
      const learned = !!prog[w.id];
      html += `
        <div class="ielts-word-card ${learned ? 'learned' : ''}" data-word-id="${w.id}" onclick="IELTSVocab.showWordModal('${w.id}')">
          <div class="ielts-word-top">
            <div class="ielts-word-text">${w.word}</div>
            <div class="ielts-band-badge">B${w.band}</div>
          </div>
          <div class="ielts-word-ipa">${w.ipa}</div>
          <div class="ielts-word-trans">${w.translation}</div>
          <div class="ielts-word-example">${w.example}</div>
          <div class="ielts-word-footer">
            <span class="ielts-word-domain">${w.domainName || ''}</span>
            ${learned ? '<span class="ielts-learned-check">✓ Dipelajari</span>' : ''}
          </div>
        </div>`;
    });
    html += '</div>';
    cont.innerHTML = html;
  }

  // ══════════════════════════════════════════════════════
  // ── Render: Flashcard Mode ─────────────────────────────
  // ══════════════════════════════════════════════════════

  function _initFlashcard() {
    _state.fc = {
      index: 0,
      flipped: false,
      queue: [..._state.filteredWords]
    };
    // Shuffle
    for (let i = _state.fc.queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [_state.fc.queue[i], _state.fc.queue[j]] = [_state.fc.queue[j], _state.fc.queue[i]];
    }
    _renderFlashcard();
  }

  function _renderFlashcard() {
    const cont = document.getElementById('iv-content');
    if (!cont) return;

    const { queue, index } = _state.fc;
    if (queue.length === 0) {
      cont.innerHTML = `
        <div class="ielts-empty">
          <div class="ielts-empty-icon">🎉</div>
          <div class="ielts-empty-title">Tidak ada kata untuk dipelajari</div>
          <div class="ielts-empty-sub">Pilih domain atau tambahkan kata terlebih dahulu.</div>
        </div>`;
      return;
    }

    if (index >= queue.length) {
      cont.innerHTML = `
        <div class="ielts-flashcard-wrap">
          <div class="ielts-flashcard" style="min-height:200px;">
            <div class="ielts-fc-front">
              <div style="font-size:3rem;">🎉</div>
              <div class="ielts-fc-word">Selesai!</div>
              <div class="ielts-fc-ipa">${index} dari ${queue.length} kata diulas</div>
            </div>
          </div>
          <div class="ielts-fc-actions">
            <button class="ielts-fc-btn learn" onclick="IELTSVocab.restartFlashcard()">🔄 Ulangi</button>
          </div>
        </div>`;
      return;
    }

    const word = queue[index];
    const progress = Math.round((index / queue.length) * 100);
    const flipped = _state.fc.flipped;

    let familyHtml = '';
    if (word.family) {
      const parts = [];
      if (word.family.verb) parts.push(`verb: <em>${word.family.verb}</em>`);
      if (word.family.noun) parts.push(`noun: <em>${word.family.noun}</em>`);
      if (word.family.adjective) parts.push(`adj: <em>${word.family.adjective}</em>`);
      if (word.family.adverb) parts.push(`adv: <em>${word.family.adverb}</em>`);
      if (parts.length) familyHtml = `<div class="ielts-fc-family">Word family: ${parts.join(' · ')}</div>`;
    }

    cont.innerHTML = `
      <div class="ielts-flashcard-wrap">
        <div class="ielts-flashcard-counter">${index + 1} / ${queue.length}</div>
        <div class="ielts-fc-progress" style="width:100%;max-width:480px;">
          <div class="ielts-fc-progress-bar" style="width:${progress}%"></div>
        </div>
        ${!flipped ? `
        <div class="ielts-flashcard" onclick="IELTSVocab.flipCard()">
          <div class="ielts-fc-front">
            <div class="ielts-fc-domain-badge">${word.domainName || ''} · Band ${word.band}</div>
            <div class="ielts-fc-word">${word.word}</div>
            <div class="ielts-fc-ipa">${word.ipa}</div>
            <div class="ielts-fc-hint">Klik kartu untuk melihat arti 👆</div>
          </div>
        </div>
        <div class="ielts-fc-actions">
          <button class="ielts-fc-btn skip" onclick="IELTSVocab.nextCard(false)">⏭ Lewati</button>
          <button class="ielts-fc-btn learn" onclick="IELTSVocab.flipCard()">Lihat Arti</button>
        </div>` : `
        <div class="ielts-flashcard">
          <div class="ielts-fc-back">
            <div class="ielts-fc-trans">${word.translation}</div>
            <div class="ielts-fc-example">${word.example}</div>
            ${familyHtml}
          </div>
        </div>
        <div class="ielts-fc-actions">
          <button class="ielts-fc-btn skip" onclick="IELTSVocab.nextCard(false)">❌ Belum Hafal</button>
          <button class="ielts-fc-btn learn" onclick="IELTSVocab.nextCard(true)">✅ Sudah Hafal</button>
        </div>`}
      </div>`;
  }

  function flipCard() {
    _state.fc.flipped = !_state.fc.flipped;
    _renderFlashcard();
  }

  function nextCard(learned) {
    if (learned) {
      _markLearned(_state.fc.queue[_state.fc.index].id);
    }
    _state.fc.index++;
    _state.fc.flipped = false;
    _renderFlashcard();
    _updateStats();
  }

  function restartFlashcard() {
    _initFlashcard();
  }

  // ══════════════════════════════════════════════════════
  // ── Render: Quiz Mode ──────────────────────────────────
  // ══════════════════════════════════════════════════════

  function _initQuiz() {
    const words = [..._state.filteredWords];
    if (words.length < 4) {
      document.getElementById('iv-content').innerHTML = `
        <div class="ielts-empty">
          <div class="ielts-empty-icon">⚠️</div>
          <div class="ielts-empty-title">Kata terlalu sedikit</div>
          <div class="ielts-empty-sub">Butuh minimal 4 kata untuk quiz. Pilih domain yang lebih besar.</div>
        </div>`;
      return;
    }

    // Build 10 MCQ questions
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const pool = shuffled.slice(0, Math.min(20, shuffled.length));
    const questions = [];
    const qCount = Math.min(10, pool.length);

    for (let i = 0; i < qCount; i++) {
      const correct = pool[i];
      const type = Math.random() > 0.5 ? 'en_to_id' : 'id_to_en';

      // Pick 3 wrong options
      const others = words.filter(w => w.id !== correct.id).sort(() => Math.random() - 0.5).slice(0, 3);
      let options;
      if (type === 'en_to_id') {
        options = [
          { text: correct.translation, correct: true },
          ...others.map(w => ({ text: w.translation, correct: false }))
        ].sort(() => Math.random() - 0.5);
        questions.push({
          question: `Apa arti kata: "${correct.word}"?`,
          options,
          word: correct,
          type
        });
      } else {
        options = [
          { text: correct.word, correct: true },
          ...others.map(w => ({ text: w.word, correct: false }))
        ].sort(() => Math.random() - 0.5);
        questions.push({
          question: `Kata apa dalam bahasa Inggris yang berarti: "${correct.translation}"?`,
          options,
          word: correct,
          type
        });
      }
    }

    _state.quiz = { index: 0, questions, score: 0, answered: false, selected: null, done: false };
    _renderQuiz();
  }

  function _renderQuiz() {
    const cont = document.getElementById('iv-content');
    if (!cont) return;

    const { index, questions, score, answered, selected, done } = _state.quiz;

    if (done) {
      const pct = Math.round((score / questions.length) * 100);
      let emoji = pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪';
      cont.innerHTML = `
        <div class="ielts-quiz-card">
          <div class="ielts-quiz-result">
            <div style="font-size:3rem;margin-bottom:0.5rem;">${emoji}</div>
            <div class="ielts-quiz-result-score">${score}/${questions.length}</div>
            <div class="ielts-quiz-result-label">${pct}% Benar</div>
            <div class="ielts-quiz-result-sub">${
              pct >= 80 ? 'Luar biasa! Kamu menguasai kosakata ini.' :
              pct >= 50 ? 'Bagus! Terus latihan untuk hasil lebih baik.' :
              'Terus semangat! Pelajari lagi dengan flashcard.'
            }</div>
            <button class="ielts-quiz-retry-btn" onclick="IELTSVocab.initQuizPublic()">🔄 Quiz Lagi</button>
          </div>
        </div>`;
      // Award XP
      if (score > 0 && typeof XPSystem !== 'undefined') {
        const result = XPSystem.addXP(null, score * 3, 'IELTS Quiz');
        if (result) App.toastXP(result);
      }
      return;
    }

    const q = questions[index];
    const progress = Math.round((index / questions.length) * 100);

    let optHtml = '';
    q.options.forEach((opt, i) => {
      let cls = '';
      if (answered) {
        if (opt.correct) cls = 'correct';
        else if (i === selected && !opt.correct) cls = 'wrong';
      }
      optHtml += `<button class="ielts-quiz-opt ${cls}" onclick="IELTSVocab.selectAnswer(${i})" ${answered ? 'disabled' : ''}>${opt.text}</button>`;
    });

    let feedbackHtml = '';
    if (answered) {
      const isCorrect = q.options[selected] && q.options[selected].correct;
      feedbackHtml = `
        <div class="ielts-quiz-feedback ${isCorrect ? 'correct' : 'wrong'}">
          ${isCorrect ? '✅ Benar!' : `❌ Salah. Jawaban: <strong>${q.options.find(o => o.correct)?.text}</strong>`}
        </div>
        <button class="ielts-quiz-next-btn" onclick="IELTSVocab.nextQuestion()">
          ${index + 1 < questions.length ? 'Soal Berikutnya →' : 'Lihat Hasil'}
        </button>`;
    }

    cont.innerHTML = `
      <div class="ielts-quiz-card">
        <div class="ielts-quiz-progress-row">
          <span>Soal ${index + 1} / ${questions.length}</span>
          <span>Benar: ${score}</span>
        </div>
        <div class="ielts-quiz-bar-wrap">
          <div class="ielts-quiz-bar" style="width:${progress}%"></div>
        </div>
        <div class="ielts-quiz-q">${q.question}</div>
        <div class="ielts-quiz-options">${optHtml}</div>
        ${feedbackHtml}
      </div>`;
  }

  function selectAnswer(optIndex) {
    if (_state.quiz.answered) return;
    _state.quiz.answered = true;
    _state.quiz.selected = optIndex;
    const q = _state.quiz.questions[_state.quiz.index];
    if (q.options[optIndex] && q.options[optIndex].correct) {
      _state.quiz.score++;
      _markLearned(q.word.id);
    }
    _renderQuiz();
    _updateStats();
  }

  function nextQuestion() {
    const { index, questions } = _state.quiz;
    if (index + 1 >= questions.length) {
      _state.quiz.done = true;
    } else {
      _state.quiz.index++;
      _state.quiz.answered = false;
      _state.quiz.selected = null;
    }
    _renderQuiz();
  }

  // ══════════════════════════════════════════════════════
  // ── Render: SRS Review Mode ────────────────────────────
  // ══════════════════════════════════════════════════════

  function _initSRS() {
    const cont = document.getElementById('iv-content');
    if (!cont) return;

    let dueCards = [];
    if (typeof SRSSystem !== 'undefined') {
      dueCards = SRSSystem.getDueCards('ielts_vocab');
    }

    if (dueCards.length === 0) {
      cont.innerHTML = `
        <div class="ielts-empty">
          <div class="ielts-empty-icon">✅</div>
          <div class="ielts-empty-title">Tidak ada review hari ini</div>
          <div class="ielts-empty-sub">Bagus! Semua kata sudah direview. Kunjungi lagi besok, atau pelajari kata baru di mode Flashcard.</div>
        </div>`;
      return;
    }

    // Get full word data for due cards
    const allWords = IELTSVocabData.getAllWords();
    const wordMap = {};
    allWords.forEach(w => wordMap[w.id] = w);

    const cards = dueCards.map(c => wordMap[c.wordId]).filter(Boolean);
    _state.srs = { cards, index: 0, revealed: false };
    _renderSRS();
  }

  function _renderSRS() {
    const cont = document.getElementById('iv-content');
    if (!cont) return;
    const { cards, index, revealed } = _state.srs;

    if (index >= cards.length) {
      cont.innerHTML = `
        <div class="ielts-empty">
          <div class="ielts-empty-icon">🎉</div>
          <div class="ielts-empty-title">Review selesai!</div>
          <div class="ielts-empty-sub">Kamu telah mereview ${cards.length} kata hari ini. Kembali besok untuk review berikutnya.</div>
        </div>`;
      _updateStats();
      return;
    }

    const word = cards[index];
    const counter = `${index + 1} / ${cards.length}`;

    cont.innerHTML = `
      <div style="max-width:480px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:0.75rem;font-size:0.85rem;color:var(--text-secondary);">SRS Review · ${counter}</div>
        <div class="ielts-srs-card">
          <div class="ielts-srs-word">${word.word}</div>
          <div class="ielts-srs-ipa">${word.ipa}</div>
          ${!revealed ? `
          <button class="ielts-srs-reveal-btn" onclick="IELTSVocab.revealSRS()">Tampilkan Jawaban</button>
          ` : `
          <div class="ielts-srs-answer">
            <div class="ielts-srs-trans">${word.translation}</div>
            <div class="ielts-srs-example">"${word.example}"</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:0.5rem;">Seberapa mudah kamu mengingat kata ini?</div>
            <div class="ielts-srs-quality-btns">
              <button class="ielts-srs-q-btn again" onclick="IELTSVocab.rateSRS(1)">😵 Lupa</button>
              <button class="ielts-srs-q-btn hard" onclick="IELTSVocab.rateSRS(3)">😅 Susah</button>
              <button class="ielts-srs-q-btn good" onclick="IELTSVocab.rateSRS(5)">😊 Mudah</button>
            </div>
          </div>
          `}
        </div>
      </div>`;
  }

  function revealSRS() {
    _state.srs.revealed = true;
    _renderSRS();
  }

  function rateSRS(quality) {
    const word = _state.srs.cards[_state.srs.index];
    if (typeof SRSSystem !== 'undefined') {
      SRSSystem.reviewCard('ielts_vocab', word.id, quality);
      if (typeof XPSystem !== 'undefined') {
        const result = XPSystem.addXP('SRS_REVIEW');
        if (result) App.toastXP(result);
      }
    }
    _state.srs.index++;
    _state.srs.revealed = false;
    _renderSRS();
    _updateStats();
  }

  // ── Word Detail Modal ────────────────────────────────────

  function showWordModal(wordId) {
    const allWords = IELTSVocabData.getAllWords();
    const word = allWords.find(w => w.id === wordId);
    if (!word) return;

    const overlay = document.getElementById('iv-modal-overlay');
    const modal   = document.getElementById('iv-modal');
    if (!overlay || !modal) return;

    let familyHtml = '';
    if (word.family) {
      const items = [];
      const parts = [['Verb', word.family.verb], ['Noun', word.family.noun], ['Adjective', word.family.adjective], ['Adverb', word.family.adverb]];
      parts.forEach(([label, val]) => {
        if (val) items.push(`<div class="ielts-modal-family-item">${label}: <span>${val}</span></div>`);
      });
      if (items.length) {
        familyHtml = `
          <div class="ielts-modal-family">
            <div class="ielts-modal-family-title">Word Family</div>
            <div class="ielts-modal-family-grid">${items.join('')}</div>
          </div>`;
      }
    }

    modal.innerHTML = `
      <button class="ielts-modal-close" onclick="IELTSVocab.closeModal()">✕</button>
      <div class="ielts-modal-badges">
        <span class="ielts-modal-badge band">Band ${word.band}</span>
        <span class="ielts-modal-badge domain">${word.domainName || ''}</span>
      </div>
      <div class="ielts-modal-word">${word.word}</div>
      <div class="ielts-modal-ipa">${word.ipa}</div>
      <div class="ielts-modal-trans">${word.translation}</div>
      <div class="ielts-modal-example">"${word.example}"</div>
      ${familyHtml}
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
        <button class="ielts-modal-tts-btn" onclick="IELTSVocab.speakWord('${word.word}')">🔊 Dengarkan</button>
        ${!_isLearned(word.id) ? `<button style="background:var(--color-primary);color:#fff;border:none;border-radius:2rem;padding:0.4rem 1rem;font-size:0.85rem;font-weight:700;cursor:pointer;" onclick="IELTSVocab.learnWord('${word.id}')">+ Tambah ke SRS</button>` : '<span style="color:#22c55e;font-size:0.85rem;font-weight:700;">✓ Sudah dipelajari</span>'}
      </div>`;

    overlay.classList.add('open');
  }

  function closeModal() {
    const overlay = document.getElementById('iv-modal-overlay');
    if (overlay) overlay.classList.remove('open');
  }

  function learnWord(wordId) {
    _markLearned(wordId);
    _updateStats();
    closeModal();
    App.toast('Kata ditambahkan ke SRS! ✅', 'success');
    _renderBrowse();
  }

  function speakWord(word) {
    if (!('speechSynthesis' in window)) {
      App.toast('Browser tidak mendukung TTS', 'error');
      return;
    }
    const utt = new SpeechSynthesisUtterance(word);
    utt.lang = 'en-GB';
    utt.rate = 0.9;
    speechSynthesis.speak(utt);
  }

  // ── Tab & Domain Switch ──────────────────────────────────

  function setMode(mode) {
    _state.mode = mode;
    document.querySelectorAll('.ielts-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.mode === mode);
    });
    _renderMode();
  }

  function setDomain(domainId) {
    _state.domain = domainId;
    document.querySelectorAll('.ielts-domain-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.domain === domainId);
    });
    _buildWordList();
    _renderMode();
  }

  function _renderMode() {
    switch (_state.mode) {
      case 'browse':    _renderBrowse(); break;
      case 'flashcard': _initFlashcard(); break;
      case 'quiz':      _initQuiz(); break;
      case 'srs':       _initSRS(); break;
    }
  }

  // ── Init ─────────────────────────────────────────────────

  function init() {
    Router.guard();
    App.init('ielts-vocab');
    _buildWordList();
    _updateStats();
    _renderBrowse();

    // Tab listeners
    document.querySelectorAll('.ielts-tab').forEach(tab => {
      tab.addEventListener('click', () => setMode(tab.dataset.mode));
    });

    // Domain button listeners
    document.querySelectorAll('.ielts-domain-btn').forEach(btn => {
      btn.addEventListener('click', () => setDomain(btn.dataset.domain));
    });

    // Search
    const searchInput = document.getElementById('iv-search');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        _state.searchQuery = searchInput.value.trim();
        _buildWordList();
        if (_state.mode === 'browse') _renderBrowse();
      });
    }

    // Modal overlay close
    const overlay = document.getElementById('iv-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });
    }
  }

  // public wrappers for quiz/fc buttons
  function initQuizPublic() { _initQuiz(); }

  return {
    init,
    setMode,
    setDomain,
    flipCard,
    nextCard,
    restartFlashcard,
    selectAnswer,
    nextQuestion,
    revealSRS,
    rateSRS,
    showWordModal,
    closeModal,
    learnWord,
    speakWord,
    initQuizPublic,
  };
})();

window.IELTSVocab = IELTSVocab;
