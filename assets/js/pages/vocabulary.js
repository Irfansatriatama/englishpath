/**
 * EnglishPath — Vocabulary Page Logic (Foundation A1–A2)
 * Modul: IIFE pattern, 4 mode belajar (Browse, Flashcard, Quiz, SRS Review)
 */
const VocabPage = (() => {

  const MODULE_ID = 'vocab_foundation';

  let _state = {
    mode: 'browse',           // 'browse' | 'flashcard' | 'quiz' | 'srs'
    browseTheme: null,        // null = theme list, string = selected themeId
    // Flashcard
    fcWords: [],
    fcIndex: 0,
    fcFlipped: false,
    fcThemeId: null,
    // Quiz
    quizWords: [],
    quizIndex: 0,
    quizScore: 0,
    quizTotal: 0,
    quizAnswered: false,
    quizThemeId: null,
    // SRS
    srsQueue: [],
    srsIndex: 0,
    srsFlipped: false,
  };

  // ── Audio (Web Speech API) ───────────────────────────────

  function _speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US';
    utt.rate = 0.85;
    window.speechSynthesis.speak(utt);
  }

  // ── Util ────────────────────────────────────────────────

  function _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function _getWrongOptions(correctWord, allWords, count = 3) {
    const others = allWords.filter(w => w.id !== correctWord.id);
    const shuffled = _shuffle(others);
    return shuffled.slice(0, count).map(w => w.translation);
  }

  function _getLearnedCountForTheme(themeId) {
    const words = VocabData.getWordsByTheme(themeId);
    let count = 0;
    words.forEach(w => {
      if (SRSSystem.isLearned(MODULE_ID, w.id)) count++;
    });
    return count;
  }

  function _updateStatsBar() {
    const allWords = VocabData.getAllWords();
    const srsStats = SRSSystem.getStats(MODULE_ID);
    const total = allWords.length;
    const learned = srsStats.learned;
    const due = srsStats.due;
    const mastered = srsStats.mastered;

    const el = id => document.getElementById(id);
    if (el('stat-total'))   el('stat-total').textContent   = total;
    if (el('stat-learned')) el('stat-learned').textContent = learned;
    if (el('stat-due'))     el('stat-due').textContent     = due;
    if (el('stat-mastered')) el('stat-mastered').textContent = mastered;
  }

  // ── Mode Tab Switching ───────────────────────────────────

  function _setMode(mode) {
    _state.mode = mode;
    document.querySelectorAll('.vocab-mode-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.mode === mode);
    });
    _renderContent();
  }

  // ── Master Render ────────────────────────────────────────

  function _renderContent() {
    const container = document.getElementById('vocab-content');
    if (!container) return;

    switch (_state.mode) {
      case 'browse':    _renderBrowse(container); break;
      case 'flashcard': _renderFlashcardSetup(container); break;
      case 'quiz':      _renderQuizSetup(container); break;
      case 'srs':       _renderSRS(container); break;
    }
  }

  // ── BROWSE MODE ──────────────────────────────────────────

  function _renderBrowse(container) {
    if (_state.browseTheme) {
      _renderWordList(container, _state.browseTheme);
    } else {
      _renderThemeGrid(container);
    }
  }

  function _renderThemeGrid(container) {
    const themes = VocabData.getThemes();

    container.innerHTML = `<div class="vocab-themes-grid" id="themes-grid"></div>`;
    const grid = container.querySelector('#themes-grid');

    themes.forEach(theme => {
      const total   = theme.words.length;
      const learned = _getLearnedCountForTheme(theme.id);
      const pct     = total > 0 ? Math.round((learned / total) * 100) : 0;

      const card = document.createElement('div');
      card.className = 'theme-card';
      card.innerHTML = `
        <span class="theme-card-icon">${theme.icon}</span>
        <div class="theme-card-level-badge">${theme.level}</div>
        <div class="theme-card-title">${theme.name}</div>
        <div class="theme-card-subtitle">${theme.nameID}</div>
        <div class="theme-card-footer">
          <div class="theme-card-count">${learned}/${total} kata</div>
          <div class="theme-card-progress-wrap">
            <div class="theme-card-progress-bar">
              <div class="theme-card-progress-fill" style="width:${pct}%"></div>
            </div>
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        _state.browseTheme = theme.id;
        _renderBrowse(container);
      });
      grid.appendChild(card);
    });
  }

  function _renderWordList(container, themeId) {
    const theme = VocabData.getThemeById(themeId);
    if (!theme) return;

    let words = theme.words;

    container.innerHTML = `
      <div class="word-list-header">
        <button class="word-list-back-btn" id="browse-back-btn">← Kembali</button>
        <div class="word-list-title">${theme.icon} ${theme.name}</div>
        <div class="word-list-actions">
          <button class="btn btn-primary btn-sm" id="learn-theme-btn">Belajar Tema Ini</button>
        </div>
      </div>
      <div class="word-search">
        <input type="text" id="word-search-input" placeholder="Cari kata...">
      </div>
      <div class="word-table">
        <div class="word-table-header">
          <span>Kata</span>
          <span>Pelafalan</span>
          <span>Arti</span>
          <span>Contoh</span>
          <span>Status</span>
        </div>
        <div id="word-table-body"></div>
      </div>
    `;

    document.getElementById('browse-back-btn').addEventListener('click', () => {
      _state.browseTheme = null;
      _renderBrowse(container);
    });

    document.getElementById('learn-theme-btn').addEventListener('click', () => {
      _state.mode = 'flashcard';
      _state.fcThemeId = themeId;
      document.querySelectorAll('.vocab-mode-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.mode === 'flashcard');
      });
      _startFlashcard(themeId);
    });

    const searchInput = document.getElementById('word-search-input');
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      _renderWordTableRows(words.filter(w =>
        w.word.toLowerCase().includes(q) ||
        w.translation.toLowerCase().includes(q)
      ));
    });

    _renderWordTableRows(words);
  }

  function _renderWordTableRows(words) {
    const body = document.getElementById('word-table-body');
    if (!body) return;

    body.innerHTML = '';
    if (words.length === 0) {
      body.innerHTML = '<div style="padding: var(--space-8); text-align:center; color: var(--text-muted);">Tidak ada kata ditemukan</div>';
      return;
    }

    words.forEach(word => {
      const card = SRSSystem.getCard(MODULE_ID, word.id);
      let statusClass = 'new', statusLabel = 'Baru';
      if (card) {
        if (card.repetitions >= 3) { statusClass = 'mastered'; statusLabel = '✓ Hafal'; }
        else { statusClass = 'learning'; statusLabel = '⟳ Belajar'; }
      }

      const row = document.createElement('div');
      row.className = 'word-row';
      row.innerHTML = `
        <div class="word-en">${word.word}</div>
        <div class="word-ipa">${word.ipa}</div>
        <div class="word-id">${word.translation}</div>
        <div class="word-example">${word.example}</div>
        <div><span class="word-status-badge ${statusClass}">${statusLabel}</span></div>
      `;
      row.addEventListener('click', () => _openWordModal(word));
      body.appendChild(row);
    });
  }

  // ── WORD DETAIL MODAL ────────────────────────────────────

  function _openWordModal(word) {
    const modal = document.getElementById('word-modal');
    const overlay = document.getElementById('word-modal-overlay');
    if (!modal || !overlay) return;

    const card = SRSSystem.getCard(MODULE_ID, word.id);
    let srsInfo = '';
    if (card) {
      srsInfo = `<span class="word-modal-tag">Review: ${card.nextReview}</span>
                 <span class="word-modal-tag">Repetisi: ${card.repetitions}</span>`;
    }

    modal.innerHTML = `
      <div class="word-modal-top">
        <div>
          <div class="word-modal-word">${word.word}</div>
          <div class="word-modal-ipa">${word.ipa}</div>
        </div>
        <button class="word-modal-close" id="modal-close-btn">✕ Tutup</button>
      </div>
      <div class="word-modal-translation">${word.translation}</div>
      <div class="word-modal-example">"${word.example}"</div>
      <div class="word-modal-meta">
        <span class="word-modal-tag">${word.level}</span>
        ${srsInfo}
      </div>
      <div class="word-modal-actions">
        <button class="btn btn-outline btn-sm" id="modal-audio-btn">🔊 Dengarkan</button>
        <button class="btn btn-primary btn-sm" id="modal-learn-btn">${card ? '⟳ Review SRS' : '+ Pelajari'}</button>
      </div>
    `;

    document.getElementById('modal-close-btn').addEventListener('click', () => {
      overlay.classList.remove('open');
    });
    document.getElementById('modal-audio-btn').addEventListener('click', () => {
      _speak(word.word);
    });
    document.getElementById('modal-learn-btn').addEventListener('click', () => {
      overlay.classList.remove('open');
      if (!card) {
        SRSSystem.initCard(MODULE_ID, word.id);
        const xpResult = XPSystem.addXP('VOCAB_NEW', undefined, `Belajar: ${word.word}`);
        App.toastXP(xpResult);
        ChallengeSystem.onLearnItem();
        _updateStatsBar();
        if (_state.mode === 'browse' && _state.browseTheme) {
          const theme = VocabData.getThemeById(_state.browseTheme);
          if (theme) _renderWordTableRows(theme.words);
        }
      } else {
        _state.mode = 'srs';
        document.querySelectorAll('.vocab-mode-tab').forEach(t => {
          t.classList.toggle('active', t.dataset.mode === 'srs');
        });
        _renderContent();
      }
    });

    overlay.classList.add('open');
  }

  // ── FLASHCARD MODE ───────────────────────────────────────

  function _renderFlashcardSetup(container) {
    const themes = VocabData.getThemes();
    const options = themes.map(t =>
      `<option value="${t.id}">${t.icon} ${t.name} (${t.words.length} kata)</option>`
    ).join('');

    container.innerHTML = `
      <div class="session-starter">
        <span class="session-starter-icon">🃏</span>
        <h2>Mode Flashcard</h2>
        <p>Belajar kata baru dengan kartu yang bisa dibalik. Klik kartu untuk melihat artinya!</p>
        <div class="session-theme-selector">
          <label>Pilih Tema:</label>
          <select id="fc-theme-select">${options}</select>
        </div>
        <div class="session-theme-selector">
          <label>Jumlah Kartu:</label>
          <select id="fc-count-select">
            <option value="10">10 kartu</option>
            <option value="20" selected>20 kartu</option>
            <option value="30">30 kartu</option>
            <option value="all">Semua kartu</option>
          </select>
        </div>
        <button class="btn btn-primary btn-lg" id="start-fc-btn" style="width:100%">Mulai Flashcard →</button>
      </div>
    `;

    if (_state.fcThemeId) {
      const sel = document.getElementById('fc-theme-select');
      if (sel) sel.value = _state.fcThemeId;
    }

    document.getElementById('start-fc-btn').addEventListener('click', () => {
      const themeId = document.getElementById('fc-theme-select').value;
      _startFlashcard(themeId);
    });
  }

  function _startFlashcard(themeId) {
    let words = VocabData.getWordsByTheme(themeId);
    const countSel = document.getElementById('fc-count-select');
    const count = countSel ? countSel.value : '20';

    words = _shuffle(words);
    if (count !== 'all') {
      words = words.slice(0, parseInt(count));
    }

    _state.fcWords   = words;
    _state.fcIndex   = 0;
    _state.fcFlipped = false;
    _state.fcThemeId = themeId;

    _renderFlashcardSession();
  }

  function _renderFlashcardSession() {
    const container = document.getElementById('vocab-content');
    if (!container) return;

    const words = _state.fcWords;
    const idx   = _state.fcIndex;

    if (idx >= words.length) {
      _renderFlashcardComplete();
      return;
    }

    const word     = words[idx];
    const total    = words.length;
    const pct      = Math.round((idx / total) * 100);
    const isFlipped = _state.fcFlipped;
    const card = SRSSystem.getCard(MODULE_ID, word.id);

    container.innerHTML = `
      <div class="flashcard-container">
        <div class="flashcard-progress">
          <div class="flashcard-progress-bar">
            <div class="flashcard-progress-fill" style="width:${pct}%"></div>
          </div>
          <span class="flashcard-count">${idx + 1} / ${total}</span>
        </div>

        <div class="flashcard ${isFlipped ? 'flipped' : ''}" id="flashcard-el">
          <div class="flashcard-inner">
            <div class="flashcard-front">
              <div class="card-word">${word.word}</div>
              <div class="card-ipa">${word.ipa}</div>
              <button class="card-audio-btn" id="card-speak-btn">🔊 Dengarkan</button>
              <div class="card-hint">Klik kartu untuk melihat arti</div>
            </div>
            <div class="flashcard-back">
              <div class="card-translation">${word.translation}</div>
              <div class="card-example">"${word.example}"</div>
              <div class="card-theme-tag">
                ${VocabData.getThemeById(_state.fcThemeId)?.nameID || ''}
              </div>
              <button class="card-audio-btn" id="card-speak-back-btn">🔊 Dengarkan</button>
            </div>
          </div>
        </div>

        <div class="flashcard-quality-buttons ${isFlipped ? 'visible' : ''}" id="quality-btns">
          <button class="quality-btn q-hard" data-q="1">😓 Susah</button>
          <button class="quality-btn q-ok"   data-q="3">🤔 Ingat</button>
          <button class="quality-btn q-easy" data-q="5">😊 Mudah</button>
        </div>

        <div class="flashcard-navigation">
          ${idx > 0 ? '<button class="flashcard-nav-btn" id="fc-prev-btn">← Sebelumnya</button>' : ''}
          ${!isFlipped
            ? '<button class="flashcard-nav-btn primary" id="fc-flip-btn">Balik Kartu →</button>'
            : '<button class="flashcard-nav-btn" id="fc-skip-btn">Lewati →</button>'
          }
        </div>
      </div>
    `;

    // Events
    document.getElementById('flashcard-el').addEventListener('click', (e) => {
      if (e.target.closest('.card-audio-btn')) return;
      _flipCard();
    });

    const speakBtn = document.getElementById('card-speak-btn');
    if (speakBtn) speakBtn.addEventListener('click', (e) => { e.stopPropagation(); _speak(word.word); });

    const speakBack = document.getElementById('card-speak-back-btn');
    if (speakBack) speakBack.addEventListener('click', (e) => { e.stopPropagation(); _speak(word.word); });

    const flipBtn = document.getElementById('fc-flip-btn');
    if (flipBtn) flipBtn.addEventListener('click', _flipCard);

    const prevBtn = document.getElementById('fc-prev-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => {
      _state.fcIndex--;
      _state.fcFlipped = false;
      _renderFlashcardSession();
    });

    const skipBtn = document.getElementById('fc-skip-btn');
    if (skipBtn) skipBtn.addEventListener('click', () => {
      _state.fcIndex++;
      _state.fcFlipped = false;
      _renderFlashcardSession();
    });

    document.querySelectorAll('.quality-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = parseInt(btn.dataset.q);
        _processFlashcardQuality(word, q);
      });
    });
  }

  function _flipCard() {
    _state.fcFlipped = !_state.fcFlipped;
    const card = document.getElementById('flashcard-el');
    const btns = document.getElementById('quality-btns');
    const flipBtn = document.getElementById('fc-flip-btn');
    const skipBtn = document.getElementById('fc-skip-btn');

    if (card) card.classList.toggle('flipped', _state.fcFlipped);
    if (btns) btns.classList.toggle('visible', _state.fcFlipped);
    if (flipBtn) flipBtn.style.display = _state.fcFlipped ? 'none' : '';
    if (skipBtn) skipBtn.style.display = _state.fcFlipped ? '' : 'none';
  }

  function _processFlashcardQuality(word, quality) {
    // Init card if new
    const wasNew = !SRSSystem.isLearned(MODULE_ID, word.id);
    SRSSystem.initCard(MODULE_ID, word.id);
    SRSSystem.reviewCard(MODULE_ID, word.id, quality);

    if (wasNew) {
      const xpResult = XPSystem.addXP('VOCAB_NEW', undefined, `Belajar: ${word.word}`);
      App.toastXP(xpResult);
      ChallengeSystem.onLearnItem();
    } else {
      const xpResult = XPSystem.addXP('SRS_REVIEW', undefined, `Review: ${word.word}`);
      App.toastXP(xpResult);
      ChallengeSystem.onSRSReview();
    }

    _state.fcIndex++;
    _state.fcFlipped = false;
    _updateStatsBar();
    _renderFlashcardSession();
  }

  function _renderFlashcardComplete() {
    const container = document.getElementById('vocab-content');
    container.innerHTML = `
      <div class="quiz-result">
        <span class="quiz-result-emoji">🎉</span>
        <div class="quiz-result-score">${_state.fcWords.length}</div>
        <div class="quiz-result-label">Kartu Selesai!</div>
        <div class="quiz-result-desc">Kamu telah menyelesaikan semua flashcard sesi ini.</div>
        <div class="quiz-result-actions">
          <button class="btn btn-outline" id="fc-retry-btn">🔄 Ulangi</button>
          <button class="btn btn-primary" id="fc-quiz-btn">→ Coba Quiz</button>
        </div>
      </div>
    `;

    document.getElementById('fc-retry-btn').addEventListener('click', () => {
      _startFlashcard(_state.fcThemeId);
    });
    document.getElementById('fc-quiz-btn').addEventListener('click', () => {
      _state.mode = 'quiz';
      _state.quizThemeId = _state.fcThemeId;
      document.querySelectorAll('.vocab-mode-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.mode === 'quiz');
      });
      _startQuiz(_state.fcThemeId);
    });
  }

  // ── QUIZ MODE ────────────────────────────────────────────

  function _renderQuizSetup(container) {
    const themes = VocabData.getThemes();
    const options = themes.map(t =>
      `<option value="${t.id}">${t.icon} ${t.name} (${t.words.length} kata)</option>`
    ).join('');

    container.innerHTML = `
      <div class="session-starter">
        <span class="session-starter-icon">📝</span>
        <h2>Mode Quiz</h2>
        <p>Uji pemahamanmu dengan soal pilihan ganda. Pilih arti kata yang benar!</p>
        <div class="session-theme-selector">
          <label>Pilih Tema:</label>
          <select id="quiz-theme-select">${options}</select>
        </div>
        <div class="session-theme-selector">
          <label>Jumlah Soal:</label>
          <select id="quiz-count-select">
            <option value="5">5 soal</option>
            <option value="10" selected>10 soal</option>
            <option value="20">20 soal</option>
          </select>
        </div>
        <button class="btn btn-primary btn-lg" id="start-quiz-btn" style="width:100%">Mulai Quiz →</button>
      </div>
    `;

    if (_state.quizThemeId) {
      const sel = document.getElementById('quiz-theme-select');
      if (sel) sel.value = _state.quizThemeId;
    }

    document.getElementById('start-quiz-btn').addEventListener('click', () => {
      const themeId = document.getElementById('quiz-theme-select').value;
      const count   = parseInt(document.getElementById('quiz-count-select').value);
      _startQuiz(themeId, count);
    });
  }

  function _startQuiz(themeId, count = 10) {
    let words = VocabData.getWordsByTheme(themeId);
    words = _shuffle(words).slice(0, count);

    _state.quizWords    = words;
    _state.quizIndex    = 0;
    _state.quizScore    = 0;
    _state.quizTotal    = words.length;
    _state.quizAnswered = false;
    _state.quizThemeId  = themeId;

    _renderQuizQuestion();
  }

  function _renderQuizQuestion() {
    const container = document.getElementById('vocab-content');
    if (!container) return;

    const idx   = _state.quizIndex;
    const total = _state.quizTotal;

    if (idx >= total) {
      _renderQuizResult();
      return;
    }

    const word = _state.quizWords[idx];
    const pct  = Math.round((idx / total) * 100);
    const allWords = VocabData.getAllWords();
    const wrongs   = _getWrongOptions(word, allWords, 3);
    const options  = _shuffle([word.translation, ...wrongs]);

    container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <div class="flashcard-progress" style="flex:1; margin-right: var(--space-4)">
            <div class="flashcard-progress-bar">
              <div class="flashcard-progress-fill" style="width:${pct}%"></div>
            </div>
            <span class="flashcard-count">${idx + 1}/${total}</span>
          </div>
          <div class="quiz-score-display">⭐ ${_state.quizScore} benar</div>
        </div>

        <div class="quiz-question-card">
          <div class="quiz-question-type">Pilih arti yang tepat:</div>
          <div class="quiz-question-word">${word.word}</div>
          <div class="quiz-question-ipa">${word.ipa}</div>
          <button class="card-audio-btn" id="quiz-speak-btn" style="margin:var(--space-3) auto 0">
            🔊 Dengarkan
          </button>
        </div>

        <div class="quiz-options" id="quiz-options">
          ${options.map(opt => `
            <button class="quiz-option-btn" data-answer="${opt}">${opt}</button>
          `).join('')}
        </div>

        <div class="quiz-feedback" id="quiz-feedback">
          <div class="quiz-feedback-title" id="quiz-feedback-title"></div>
          <div class="quiz-feedback-example" id="quiz-feedback-example"></div>
        </div>

        <div style="text-align:center; display:none" id="quiz-next-wrap">
          <button class="btn btn-primary" id="quiz-next-btn">
            ${idx + 1 < total ? 'Soal Berikutnya →' : 'Lihat Hasil →'}
          </button>
        </div>
      </div>
    `;

    document.getElementById('quiz-speak-btn').addEventListener('click', () => _speak(word.word));

    document.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (_state.quizAnswered) return;
        _checkQuizAnswer(btn, word, btn.dataset.answer);
      });
    });
  }

  function _checkQuizAnswer(clickedBtn, word, chosen) {
    _state.quizAnswered = true;
    const correct = chosen === word.translation;

    document.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.answer === word.translation) btn.classList.add('correct');
      else if (btn === clickedBtn && !correct) btn.classList.add('wrong');
    });

    const feedback = document.getElementById('quiz-feedback');
    const title    = document.getElementById('quiz-feedback-title');
    const example  = document.getElementById('quiz-feedback-example');

    feedback.classList.add('visible');
    if (correct) {
      _state.quizScore++;
      feedback.classList.add('correct-feedback');
      title.textContent = '✓ Benar! +3 XP';
      example.textContent = `"${word.example}"`;
      SRSSystem.initCard(MODULE_ID, word.id);
      SRSSystem.reviewCard(MODULE_ID, word.id, 4);
      const xpResult = XPSystem.addXP('QUIZ_CORRECT', undefined, `Quiz: ${word.word}`);
      App.toastXP(xpResult);
    } else {
      feedback.classList.add('wrong-feedback');
      title.textContent = `✗ Salah! Jawaban: "${word.translation}"`;
      example.textContent = `"${word.example}"`;
      SRSSystem.initCard(MODULE_ID, word.id);
      SRSSystem.reviewCard(MODULE_ID, word.id, 1);
    }

    const nextWrap = document.getElementById('quiz-next-wrap');
    nextWrap.style.display = 'block';

    document.getElementById('quiz-next-btn').addEventListener('click', () => {
      _state.quizIndex++;
      _state.quizAnswered = false;
      _updateStatsBar();
      _renderQuizQuestion();
    });
  }

  function _renderQuizResult() {
    const container = document.getElementById('vocab-content');
    const score    = _state.quizScore;
    const total    = _state.quizTotal;
    const pct      = Math.round((score / total) * 100);
    const perfect  = score === total;

    let emoji = '😊', label = 'Bagus!';
    if (pct === 100)     { emoji = '🏆'; label = 'Sempurna!'; }
    else if (pct >= 80)  { emoji = '🎉'; label = 'Sangat Bagus!'; }
    else if (pct >= 60)  { emoji = '😊'; label = 'Lumayan!'; }
    else                 { emoji = '📚'; label = 'Terus Berlatih!'; }

    if (perfect) {
      const xpResult = XPSystem.addXP('QUIZ_PERFECT', undefined, 'Quiz Sempurna!');
      App.toastXP(xpResult);
    }

    ChallengeSystem.onQuizComplete();
    _updateStatsBar();

    container.innerHTML = `
      <div class="quiz-result">
        <span class="quiz-result-emoji">${emoji}</span>
        <div class="quiz-result-score">${score}/${total}</div>
        <div class="quiz-result-label">${label}</div>
        <div class="quiz-result-desc">${pct}% benar${perfect ? ' — Bonus XP sudah ditambahkan!' : ''}</div>
        <div class="quiz-result-actions">
          <button class="btn btn-outline" id="quiz-retry-btn">🔄 Ulangi</button>
          <button class="btn btn-primary"  id="quiz-srs-btn">⟳ Review SRS</button>
        </div>
      </div>
    `;

    document.getElementById('quiz-retry-btn').addEventListener('click', () => {
      _startQuiz(_state.quizThemeId, _state.quizTotal);
    });
    document.getElementById('quiz-srs-btn').addEventListener('click', () => {
      _setMode('srs');
    });
  }

  // ── SRS REVIEW MODE ─────────────────────────────────────

  function _renderSRS(container) {
    const dueCards = SRSSystem.getDueCards(MODULE_ID);
    if (dueCards.length === 0) {
      container.innerHTML = `
        <div class="srs-empty-state">
          <span class="srs-empty-icon">✅</span>
          <div class="srs-empty-title">Tidak ada kartu yang perlu direview!</div>
          <p>Semua kartu sudah direview. Kembali lagi besok atau pelajari kata baru.</p>
          <button class="btn btn-primary" id="srs-to-browse">Pelajari Kata Baru</button>
        </div>
      `;
      document.getElementById('srs-to-browse')?.addEventListener('click', () => _setMode('browse'));
      return;
    }

    // Map due cards to word objects
    const allWords = VocabData.getAllWords();
    _state.srsQueue = _shuffle(dueCards)
      .map(dc => allWords.find(w => w.id === dc.wordId))
      .filter(Boolean);
    _state.srsIndex   = 0;
    _state.srsFlipped = false;

    _renderSRSCard();
  }

  function _renderSRSCard() {
    const container = document.getElementById('vocab-content');
    if (!container) return;

    const idx   = _state.srsIndex;
    const queue = _state.srsQueue;

    if (idx >= queue.length) {
      _renderSRSComplete();
      return;
    }

    const word    = queue[idx];
    const total   = queue.length;
    const pct     = Math.round((idx / total) * 100);
    const flipped = _state.srsFlipped;
    const card    = SRSSystem.getCard(MODULE_ID, word.id);

    container.innerHTML = `
      <div class="flashcard-container">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:var(--space-3)">
          <div style="font-size:var(--text-sm); color:var(--text-muted)">
            ⟳ SRS Review — ${idx + 1}/${total} kartu
          </div>
          <div style="font-size:var(--text-xs); color:var(--text-muted)">
            EF: ${(card?.ef || 2.5).toFixed(1)} | Rep: ${card?.repetitions || 0}
          </div>
        </div>
        <div class="flashcard-progress">
          <div class="flashcard-progress-bar">
            <div class="flashcard-progress-fill" style="width:${pct}%"></div>
          </div>
        </div>

        <div class="flashcard ${flipped ? 'flipped' : ''}" id="srs-card-el">
          <div class="flashcard-inner">
            <div class="flashcard-front">
              <div class="card-word">${word.word}</div>
              <div class="card-ipa">${word.ipa}</div>
              <button class="card-audio-btn" id="srs-speak-btn">🔊 Dengarkan</button>
              <div class="card-hint">Klik kartu untuk melihat arti</div>
            </div>
            <div class="flashcard-back">
              <div class="card-translation">${word.translation}</div>
              <div class="card-example">"${word.example}"</div>
            </div>
          </div>
        </div>

        <div class="flashcard-quality-buttons ${flipped ? 'visible' : ''}" id="srs-quality-btns">
          <button class="quality-btn q-hard" data-q="1">😓 Lupa</button>
          <button class="quality-btn q-ok"   data-q="3">🤔 Ingat</button>
          <button class="quality-btn q-easy" data-q="5">😊 Hafal</button>
        </div>

        <div class="flashcard-navigation">
          ${!flipped
            ? '<button class="flashcard-nav-btn primary" id="srs-flip-btn">Balik Kartu →</button>'
            : ''
          }
        </div>
      </div>
    `;

    document.getElementById('srs-card-el').addEventListener('click', (e) => {
      if (e.target.closest('#srs-speak-btn')) return;
      _flipSRSCard();
    });

    const speakBtn = document.getElementById('srs-speak-btn');
    if (speakBtn) speakBtn.addEventListener('click', (e) => { e.stopPropagation(); _speak(word.word); });

    const flipBtn = document.getElementById('srs-flip-btn');
    if (flipBtn) flipBtn.addEventListener('click', _flipSRSCard);

    document.querySelectorAll('#srs-quality-btns .quality-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = parseInt(btn.dataset.q);
        SRSSystem.reviewCard(MODULE_ID, word.id, q);
        XPSystem.addXP('SRS_REVIEW', undefined, `SRS: ${word.word}`);
        ChallengeSystem.onSRSReview();
        _state.srsIndex++;
        _state.srsFlipped = false;
        _updateStatsBar();
        _renderSRSCard();
      });
    });
  }

  function _flipSRSCard() {
    _state.srsFlipped = !_state.srsFlipped;
    const card = document.getElementById('srs-card-el');
    const btns = document.getElementById('srs-quality-btns');
    const flipBtn = document.getElementById('srs-flip-btn');
    if (card) card.classList.toggle('flipped', _state.srsFlipped);
    if (btns) btns.classList.toggle('visible', _state.srsFlipped);
    if (flipBtn) flipBtn.style.display = _state.srsFlipped ? 'none' : '';
  }

  function _renderSRSComplete() {
    const container = document.getElementById('vocab-content');
    container.innerHTML = `
      <div class="quiz-result">
        <span class="quiz-result-emoji">🎊</span>
        <div class="quiz-result-score">${_state.srsQueue.length}</div>
        <div class="quiz-result-label">SRS Review Selesai!</div>
        <div class="quiz-result-desc">Semua kartu hari ini telah direview. Kerja bagus!</div>
        <div class="quiz-result-actions">
          <button class="btn btn-outline" id="srs-browse-btn">📚 Pelajari Lebih</button>
          <button class="btn btn-primary" id="srs-quiz-btn">📝 Coba Quiz</button>
        </div>
      </div>
    `;

    document.getElementById('srs-browse-btn').addEventListener('click', () => _setMode('browse'));
    document.getElementById('srs-quiz-btn').addEventListener('click', () => _setMode('quiz'));
  }

  // ── Public Init ─────────────────────────────────────────

  function init() {
    Router.guard();
    App.init('foundation-vocab');

    // ChallengeSystem methods sudah tersedia di challenge.js

    // Mode tabs
    document.querySelectorAll('.vocab-mode-tab').forEach(tab => {
      tab.addEventListener('click', () => _setMode(tab.dataset.mode));
    });

    // Modal overlay close
    const overlay = document.getElementById('word-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('open');
      });
    }

    _updateStatsBar();
    _renderContent();

    // Module visit challenge
    if (typeof ChallengeSystem !== 'undefined' && ChallengeSystem.onModuleVisit) {
      ChallengeSystem.onModuleVisit();
    }
  }

  return { init };
})();

// Auto-init
document.addEventListener('DOMContentLoaded', VocabPage.init);
