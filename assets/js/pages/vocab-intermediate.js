/**
 * EnglishPath — Vocabulary Page Logic (Intermediate B1–B2)
 * 5 mode: Browse, Flashcard, Quiz, SRS Review, Word Families
 * IIFE module pattern
 */
const VocabIntermediatePage = (() => {

  const MODULE_ID = 'vocab_intermediate';

  let _state = {
    mode: 'browse',
    browseTheme: null,
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
    // Word Families
    familyFilter: 'all',   // 'all' | 'b1' | 'b2'
    familySearch: '',
  };

  // ── Audio ────────────────────────────────────────────────

  function _speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-GB';
    utt.rate = 0.85;
    window.speechSynthesis.speak(utt);
  }

  // ── Util ─────────────────────────────────────────────────

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
    const words = VocabIntermediateData.getWordsByTheme(themeId);
    let count = 0;
    words.forEach(w => {
      if (SRSSystem.isLearned(MODULE_ID, w.id)) count++;
    });
    return count;
  }

  function _updateStatsBar() {
    const allWords = VocabIntermediateData.getAllWords();
    const srsStats = SRSSystem.getStats(MODULE_ID);
    const total    = allWords.length;
    const learned  = srsStats.learned;
    const due      = srsStats.due;
    const mastered = srsStats.mastered;

    const el = id => document.getElementById(id);
    if (el('stat-total'))    el('stat-total').textContent    = total;
    if (el('stat-learned'))  el('stat-learned').textContent  = learned;
    if (el('stat-due'))      el('stat-due').textContent      = due;
    if (el('stat-mastered')) el('stat-mastered').textContent = mastered;
  }

  // ── Mode Switching ───────────────────────────────────────

  function _setMode(mode) {
    _state.mode = mode;
    document.querySelectorAll('.vocab-mode-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.mode === mode);
    });
    _renderContent();
  }

  function _renderContent() {
    const container = document.getElementById('vocab-content');
    if (!container) return;
    switch (_state.mode) {
      case 'browse':   _renderBrowse(container); break;
      case 'flashcard': _renderFlashcardSetup(container); break;
      case 'quiz':      _renderQuizSetup(container); break;
      case 'srs':       _renderSRS(container); break;
      case 'families':  _renderWordFamilies(container); break;
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
    const themes = VocabIntermediateData.getThemes();
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
    const theme = VocabIntermediateData.getThemeById(themeId);
    if (!theme) return;

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
      _renderWordTableRows(theme.words.filter(w =>
        w.word.toLowerCase().includes(q) ||
        w.translation.toLowerCase().includes(q)
      ));
    });

    _renderWordTableRows(theme.words);
  }

  function _renderWordTableRows(words) {
    const body = document.getElementById('word-table-body');
    if (!body) return;
    body.innerHTML = '';

    if (words.length === 0) {
      body.innerHTML = '<div style="padding:var(--space-8);text-align:center;color:var(--text-muted);">Tidak ada kata ditemukan</div>';
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
        <div class="word-en">
          ${word.word}
          <span class="${word.level === 'B1' ? 'level-badge-b1' : 'level-badge-b2'}" style="margin-left:4px">${word.level}</span>
        </div>
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
    const modal   = document.getElementById('word-modal');
    const overlay = document.getElementById('word-modal-overlay');
    if (!modal || !overlay) return;

    const card = SRSSystem.getCard(MODULE_ID, word.id);
    let srsInfo = '';
    if (card) {
      srsInfo = `<span class="word-modal-tag">Review: ${card.nextReview}</span>
                 <span class="word-modal-tag">Repetisi: ${card.repetitions}</span>`;
    }

    // Word family section
    let familyHtml = '';
    if (word.family) {
      const f = word.family;
      const parts = [
        f.verb      ? `<div class="family-modal-form-row"><div class="family-modal-pos">Kata Kerja (Verb)</div><div class="family-modal-word">${f.verb}</div></div>` : '',
        f.noun      ? `<div class="family-modal-form-row"><div class="family-modal-pos">Kata Benda (Noun)</div><div class="family-modal-word">${f.noun}</div></div>` : '',
        f.adjective ? `<div class="family-modal-form-row"><div class="family-modal-pos">Kata Sifat (Adj)</div><div class="family-modal-word">${f.adjective}</div></div>` : '',
        f.adverb    ? `<div class="family-modal-form-row"><div class="family-modal-pos">Kata Keterangan (Adv)</div><div class="family-modal-word">${f.adverb}</div></div>` : '',
      ].filter(Boolean).join('');
      if (parts) {
        familyHtml = `<div style="margin-top:var(--space-4)">
          <div style="font-size:var(--text-sm);font-weight:600;color:var(--text-secondary);margin-bottom:var(--space-2)">🔗 Word Family</div>
          <div class="family-modal-forms">${parts}</div>
        </div>`;
      }
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
      ${familyHtml}
      <div class="word-modal-actions">
        <button class="btn btn-outline btn-sm" id="modal-audio-btn">🔊 Dengarkan</button>
        <button class="btn btn-primary btn-sm" id="modal-learn-btn">${card ? '⟳ Review SRS' : '+ Pelajari'}</button>
      </div>
    `;

    document.getElementById('modal-close-btn').addEventListener('click', () => overlay.classList.remove('open'));
    document.getElementById('modal-audio-btn').addEventListener('click', () => _speak(word.word));
    document.getElementById('modal-learn-btn').addEventListener('click', () => {
      overlay.classList.remove('open');
      if (!card) {
        SRSSystem.initCard(MODULE_ID, word.id);
        const xpResult = XPSystem.addXP('VOCAB_NEW', undefined, `B1–B2: ${word.word}`);
        App.toastXP(xpResult);
        ChallengeSystem.onLearnItem();
        _updateStatsBar();
        if (_state.mode === 'browse' && _state.browseTheme) {
          const theme = VocabIntermediateData.getThemeById(_state.browseTheme);
          if (theme) _renderWordTableRows(theme.words);
        }
      } else {
        _setMode('srs');
      }
    });

    overlay.classList.add('open');
  }

  // ── FLASHCARD MODE ───────────────────────────────────────

  function _renderFlashcardSetup(container) {
    const themes  = VocabIntermediateData.getThemes();
    const options = themes.map(t =>
      `<option value="${t.id}">${t.icon} ${t.name} (${t.words.length} kata)</option>`
    ).join('');

    container.innerHTML = `
      <div class="session-starter">
        <span class="session-starter-icon">🃏</span>
        <h2>Mode Flashcard</h2>
        <p>Belajar kata B1–B2 baru dengan kartu yang bisa dibalik. Klik kartu untuk melihat artinya!</p>
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
    let words     = VocabIntermediateData.getWordsByTheme(themeId);
    const countSel = document.getElementById('fc-count-select');
    const count    = countSel ? countSel.value : '20';

    words = _shuffle(words);
    if (count !== 'all') words = words.slice(0, parseInt(count));

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
    const card     = SRSSystem.getCard(MODULE_ID, word.id);

    // Word family hint
    let familyHint = '';
    if (word.family && isFlipped) {
      const f     = word.family;
      const parts = [];
      if (f.verb)      parts.push(`<span><strong>V:</strong> ${f.verb}</span>`);
      if (f.noun)      parts.push(`<span><strong>N:</strong> ${f.noun}</span>`);
      if (f.adjective) parts.push(`<span><strong>Adj:</strong> ${f.adjective}</span>`);
      if (f.adverb)    parts.push(`<span><strong>Adv:</strong> ${f.adverb}</span>`);
      if (parts.length) {
        familyHint = `<div class="card-family-hint">🔗 ${parts.join(' · ')}</div>`;
      }
    }

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
                ${VocabIntermediateData.getThemeById(_state.fcThemeId)?.nameID || ''}
              </div>
              ${familyHint}
              ${!card ? `<button class="btn btn-outline btn-sm" id="card-learn-btn" style="margin-top:var(--space-3)">+ Tambah ke SRS</button>` : ''}
            </div>
          </div>
        </div>

        <div class="flashcard-controls">
          <button class="btn btn-outline" id="fc-prev-btn" ${idx === 0 ? 'disabled' : ''}>← Prev</button>
          <button class="btn btn-outline" id="fc-restart-btn">↺ Ulangi</button>
          <button class="btn btn-primary" id="fc-next-btn">${idx === total - 1 ? '✓ Selesai' : 'Next →'}</button>
        </div>
      </div>
    `;

    const flashcardEl = document.getElementById('flashcard-el');
    flashcardEl.addEventListener('click', e => {
      if (e.target.closest('button')) return;
      _state.fcFlipped = !_state.fcFlipped;
      _renderFlashcardSession();
    });

    document.getElementById('card-speak-btn').addEventListener('click', e => {
      e.stopPropagation();
      _speak(word.word);
    });

    document.getElementById('fc-prev-btn')?.addEventListener('click', () => {
      _state.fcIndex   = Math.max(0, _state.fcIndex - 1);
      _state.fcFlipped = false;
      _renderFlashcardSession();
    });

    document.getElementById('fc-next-btn').addEventListener('click', () => {
      _state.fcIndex++;
      _state.fcFlipped = false;
      _renderFlashcardSession();
    });

    document.getElementById('fc-restart-btn').addEventListener('click', () => {
      _state.fcIndex   = 0;
      _state.fcFlipped = false;
      _state.fcWords   = _shuffle(_state.fcWords);
      _renderFlashcardSession();
    });

    document.getElementById('card-learn-btn')?.addEventListener('click', e => {
      e.stopPropagation();
      SRSSystem.initCard(MODULE_ID, word.id);
      const xpResult = XPSystem.addXP('VOCAB_NEW', undefined, `B1–B2: ${word.word}`);
      App.toastXP(xpResult);
      ChallengeSystem.onLearnItem();
      _updateStatsBar();
      _renderFlashcardSession();
    });
  }

  function _renderFlashcardComplete() {
    const container = document.getElementById('vocab-content');
    const total = _state.fcWords.length;
    container.innerHTML = `
      <div class="quiz-result">
        <span class="quiz-result-emoji">🎊</span>
        <div class="quiz-result-score">${total}</div>
        <div class="quiz-result-label">Flashcard Selesai!</div>
        <div class="quiz-result-desc">Kamu sudah melewati ${total} kartu B1–B2. Bagus sekali!</div>
        <div class="quiz-result-actions">
          <button class="btn btn-outline" id="fc-repeat-btn">↺ Ulangi</button>
          <button class="btn btn-primary" id="fc-srs-btn">⟳ Mulai SRS Review</button>
        </div>
      </div>
    `;
    document.getElementById('fc-repeat-btn').addEventListener('click', () => {
      _state.fcIndex   = 0;
      _state.fcFlipped = false;
      _state.fcWords   = _shuffle(_state.fcWords);
      _renderFlashcardSession();
    });
    document.getElementById('fc-srs-btn').addEventListener('click', () => _setMode('srs'));
  }

  // ── QUIZ MODE ────────────────────────────────────────────

  function _renderQuizSetup(container) {
    const themes  = VocabIntermediateData.getThemes();
    const options = themes.map(t =>
      `<option value="${t.id}">${t.icon} ${t.name} (${t.words.length} kata)</option>`
    ).join('');

    container.innerHTML = `
      <div class="session-starter">
        <span class="session-starter-icon">📝</span>
        <h2>Mode Quiz</h2>
        <p>Uji penguasaan kosakata B1–B2 kamu dengan pilihan ganda.</p>
        <div class="session-theme-selector">
          <label>Pilih Tema:</label>
          <select id="quiz-theme-select">
            <option value="all">🌐 Semua Tema (campur)</option>
            ${options}
          </select>
        </div>
        <div class="session-theme-selector">
          <label>Jumlah Soal:</label>
          <select id="quiz-count-select">
            <option value="10" selected>10 soal</option>
            <option value="20">20 soal</option>
            <option value="30">30 soal</option>
          </select>
        </div>
        <button class="btn btn-primary btn-lg" id="start-quiz-btn" style="width:100%">Mulai Quiz →</button>
      </div>
    `;

    document.getElementById('start-quiz-btn').addEventListener('click', () => {
      const themeId = document.getElementById('quiz-theme-select').value;
      const count   = parseInt(document.getElementById('quiz-count-select').value);
      _startQuiz(themeId, count);
    });
  }

  function _startQuiz(themeId, count) {
    let words = themeId === 'all'
      ? VocabIntermediateData.getAllWords()
      : VocabIntermediateData.getWordsByTheme(themeId);

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

    const words = _state.quizWords;
    const idx   = _state.quizIndex;

    if (idx >= words.length) {
      _renderQuizResult();
      return;
    }

    const word    = words[idx];
    const allWords = VocabIntermediateData.getAllWords();
    const wrongs  = _getWrongOptions(word, allWords);
    const options = _shuffle([word.translation, ...wrongs]);
    const pct     = Math.round((idx / words.length) * 100);

    container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-progress-wrap">
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width:${pct}%"></div>
          </div>
          <span class="quiz-progress-text">${idx + 1} / ${words.length} · Skor: ${_state.quizScore}</span>
        </div>

        <div class="quiz-question-card">
          <div class="quiz-question-label">Apa arti kata berikut?</div>
          <div class="quiz-question-word">
            ${word.word}
            <span class="${word.level === 'B1' ? 'level-badge-b1' : 'level-badge-b2'}" style="font-size:12px;margin-left:6px">${word.level}</span>
          </div>
          <div class="quiz-question-ipa">${word.ipa}</div>
          <button class="quiz-audio-btn" id="quiz-speak-btn">🔊</button>
        </div>

        <div class="quiz-options" id="quiz-options">
          ${options.map(opt => `
            <button class="quiz-option" data-answer="${opt}">${opt}</button>
          `).join('')}
        </div>

        <div class="quiz-feedback" id="quiz-feedback"></div>

        <button class="btn btn-primary" id="quiz-next-btn" style="display:none;width:100%;margin-top:var(--space-4)">
          ${idx === words.length - 1 ? 'Lihat Hasil →' : 'Soal Berikutnya →'}
        </button>
      </div>
    `;

    document.getElementById('quiz-speak-btn').addEventListener('click', () => _speak(word.word));

    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (_state.quizAnswered) return;
        _state.quizAnswered = true;

        const chosen  = btn.dataset.answer;
        const correct = word.translation;
        const isRight = chosen === correct;

        document.querySelectorAll('.quiz-option').forEach(b => {
          b.disabled = true;
          if (b.dataset.answer === correct) b.classList.add('correct');
          else if (b === btn && !isRight) b.classList.add('wrong');
        });

        if (isRight) {
          _state.quizScore++;
          const xpResult = XPSystem.addXP('QUIZ_CORRECT', undefined, `Quiz B1–B2: ${word.word}`);
          App.toastXP(xpResult);
          ChallengeSystem.onQuizComplete();
          document.getElementById('quiz-feedback').innerHTML =
            `<span class="feedback-correct">✓ Benar! "${word.example}"</span>`;
        } else {
          document.getElementById('quiz-feedback').innerHTML =
            `<span class="feedback-wrong">✗ Salah. Jawaban: <strong>${correct}</strong></span>`;
        }

        document.getElementById('quiz-next-btn').style.display = 'block';
      });
    });

    document.getElementById('quiz-next-btn').addEventListener('click', () => {
      _state.quizIndex++;
      _state.quizAnswered = false;
      _renderQuizQuestion();
    });
  }

  function _renderQuizResult() {
    const container = document.getElementById('vocab-content');
    const score  = _state.quizScore;
    const total  = _state.quizTotal;
    const pct    = Math.round((score / total) * 100);

    let emoji = '😐';
    if (pct >= 90) emoji = '🏆';
    else if (pct >= 70) emoji = '🎉';
    else if (pct >= 50) emoji = '👍';

    if (pct === 100) {
      const bonusXP = XPSystem.addXP('QUIZ_PERFECT', undefined, 'Skor sempurna quiz B1–B2!');
      App.toastXP(bonusXP);
    }

    container.innerHTML = `
      <div class="quiz-result">
        <span class="quiz-result-emoji">${emoji}</span>
        <div class="quiz-result-score">${score}/${total}</div>
        <div class="quiz-result-label">${pct >= 70 ? 'Kerja Bagus!' : 'Terus Belajar!'}</div>
        <div class="quiz-result-desc">Kamu menjawab benar ${score} dari ${total} soal (${pct}%).</div>
        <div class="quiz-result-actions">
          <button class="btn btn-outline" id="quiz-retry-btn">↺ Coba Lagi</button>
          <button class="btn btn-primary" id="quiz-browse-btn">📚 Jelajah Kata</button>
        </div>
      </div>
    `;

    document.getElementById('quiz-retry-btn').addEventListener('click', () => {
      _startQuiz(_state.quizThemeId, _state.quizTotal);
    });
    document.getElementById('quiz-browse-btn').addEventListener('click', () => _setMode('browse'));
  }

  // ── SRS MODE ─────────────────────────────────────────────

  function _renderSRS(container) {
    const dueCards = SRSSystem.getDueCards(MODULE_ID);

    if (dueCards.length === 0) {
      container.innerHTML = `
        <div class="session-starter">
          <span class="session-starter-icon">✅</span>
          <h2>Semua Beres!</h2>
          <p>Tidak ada kartu yang perlu direview hari ini. Kamu keren! Mau tambah kosakata baru?</p>
          <div class="quiz-result-actions" style="margin-top:var(--space-4)">
            <button class="btn btn-outline" id="srs-browse-btn">📚 Jelajah Kata Baru</button>
            <button class="btn btn-primary" id="srs-quiz-btn">📝 Coba Quiz</button>
          </div>
        </div>
      `;
      document.getElementById('srs-browse-btn').addEventListener('click', () => _setMode('browse'));
      document.getElementById('srs-quiz-btn').addEventListener('click', () => _setMode('quiz'));
      return;
    }

    const queue = _shuffle(dueCards);
    _state.srsQueue   = queue;
    _state.srsIndex   = 0;
    _state.srsFlipped = false;
    _renderSRSCard();
  }

  function _renderSRSCard() {
    const container = document.getElementById('vocab-content');
    if (!container) return;

    const queue = _state.srsQueue;
    const idx   = _state.srsIndex;

    if (idx >= queue.length) {
      _renderSRSComplete();
      return;
    }

    const cardData = queue[idx];
    const word     = VocabIntermediateData.getWordById(cardData.itemId);
    if (!word) {
      _state.srsIndex++;
      _renderSRSCard();
      return;
    }

    const total = queue.length;
    const pct   = Math.round((idx / total) * 100);
    const isFlipped = _state.srsFlipped;

    let familyHint = '';
    if (word.family && isFlipped) {
      const f    = word.family;
      const parts = [];
      if (f.verb)      parts.push(`<span><strong>V:</strong> ${f.verb}</span>`);
      if (f.noun)      parts.push(`<span><strong>N:</strong> ${f.noun}</span>`);
      if (f.adjective) parts.push(`<span><strong>Adj:</strong> ${f.adjective}</span>`);
      if (f.adverb)    parts.push(`<span><strong>Adv:</strong> ${f.adverb}</span>`);
      if (parts.length) familyHint = `<div class="card-family-hint" style="margin-top:var(--space-3)">🔗 ${parts.join(' · ')}</div>`;
    }

    container.innerHTML = `
      <div class="flashcard-container">
        <div class="flashcard-progress">
          <div class="flashcard-progress-bar">
            <div class="flashcard-progress-fill" style="width:${pct}%"></div>
          </div>
          <span class="flashcard-count">SRS: ${idx + 1} / ${total}</span>
        </div>

        <div class="flashcard ${isFlipped ? 'flipped' : ''}" id="srs-card-el">
          <div class="flashcard-inner">
            <div class="flashcard-front">
              <div class="card-word">${word.word}</div>
              <div class="card-ipa">${word.ipa}</div>
              <button class="card-audio-btn" id="srs-speak-btn">🔊 Dengarkan</button>
              <div class="card-hint">Ingat artinya? Klik kartu untuk cek</div>
            </div>
            <div class="flashcard-back">
              <div class="card-translation">${word.translation}</div>
              <div class="card-example">"${word.example}"</div>
              ${familyHint}
            </div>
          </div>
        </div>

        <button class="btn btn-outline" id="srs-flip-btn" style="width:100%;margin-bottom:var(--space-4)" ${isFlipped ? 'style="display:none"' : ''}>
          Balik Kartu 👀
        </button>

        <div class="srs-quality-btns ${isFlipped ? 'visible' : ''}" id="srs-quality-btns">
          <p style="text-align:center;color:var(--text-secondary);font-size:var(--text-sm);margin:0 0 var(--space-3)">Seberapa ingat kamu?</p>
          <div class="srs-btn-row">
            <button class="srs-btn srs-btn-again" data-quality="1">😵 Lupa</button>
            <button class="srs-btn srs-btn-hard" data-quality="2">😕 Sulit</button>
            <button class="srs-btn srs-btn-good" data-quality="4">🙂 Ingat</button>
            <button class="srs-btn srs-btn-easy" data-quality="5">😄 Mudah</button>
          </div>
        </div>
      </div>
    `;

    const cardEl = document.getElementById('srs-card-el');
    cardEl.addEventListener('click', e => {
      if (e.target.closest('button')) return;
      _state.srsFlipped = !_state.srsFlipped;
      _renderSRSCard();
    });

    document.getElementById('srs-speak-btn').addEventListener('click', e => {
      e.stopPropagation();
      _speak(word.word);
    });

    document.getElementById('srs-flip-btn')?.addEventListener('click', () => {
      _state.srsFlipped = true;
      _renderSRSCard();
    });

    document.querySelectorAll('.srs-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const quality = parseInt(btn.dataset.quality);
        SRSSystem.updateCard(MODULE_ID, word.id, quality);
        if (quality >= 3) {
          const xpResult = XPSystem.addXP('SRS_REVIEW', undefined, `SRS: ${word.word}`);
          App.toastXP(xpResult);
        }
        _state.srsIndex++;
        _state.srsFlipped = false;
        _renderSRSCard();
      });
    });
  }

  function _renderSRSComplete() {
    const container = document.getElementById('vocab-content');
    container.innerHTML = `
      <div class="quiz-result">
        <span class="quiz-result-emoji">🎊</span>
        <div class="quiz-result-score">${_state.srsQueue.length}</div>
        <div class="quiz-result-label">SRS Review Selesai!</div>
        <div class="quiz-result-desc">Semua kartu B1–B2 hari ini telah direview. Hebat!</div>
        <div class="quiz-result-actions">
          <button class="btn btn-outline" id="srs-browse-btn">📚 Pelajari Lebih</button>
          <button class="btn btn-primary" id="srs-quiz-btn">📝 Coba Quiz</button>
        </div>
      </div>
    `;
    document.getElementById('srs-browse-btn').addEventListener('click', () => _setMode('browse'));
    document.getElementById('srs-quiz-btn').addEventListener('click', () => _setMode('quiz'));
  }

  // ── WORD FAMILIES MODE ───────────────────────────────────

  function _renderWordFamilies(container) {
    const allGroups = VocabIntermediateData.getFamilyGroups();

    container.innerHTML = `
      <div style="margin-bottom:var(--space-4)">
        <div class="vocab-header" style="margin-bottom:var(--space-4)">
          <div class="vocab-header-icon">🔗</div>
          <div class="vocab-header-text">
            <h2 style="font-size:var(--text-xl);font-weight:700;margin:0 0 4px">Word Families</h2>
            <p style="margin:0;color:var(--text-secondary);font-size:var(--text-sm)">
              Pelajari keluarga kata — verb, noun, adjective, adverb dari akar kata yang sama
            </p>
          </div>
        </div>

        <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-bottom:var(--space-4)">
          <input type="text" id="family-search" placeholder="🔍 Cari kata..." style="
            flex:1;min-width:180px;padding:var(--space-2) var(--space-3);
            border:1px solid var(--border);border-radius:var(--radius-lg);
            background:var(--surface);color:var(--text-primary);font-size:var(--text-sm)
          ">
          <div style="display:flex;gap:var(--space-2)">
            <button class="btn btn-sm ${_state.familyFilter === 'all' ? 'btn-primary' : 'btn-outline'}" data-filter="all">Semua</button>
            <button class="btn btn-sm ${_state.familyFilter === 'b1' ? 'btn-primary' : 'btn-outline'}" data-filter="b1">B1</button>
            <button class="btn btn-sm ${_state.familyFilter === 'b2' ? 'btn-primary' : 'btn-outline'}" data-filter="b2">B2</button>
          </div>
        </div>
      </div>

      <div class="family-grid" id="family-grid"></div>
    `;

    document.getElementById('family-search').addEventListener('input', e => {
      _state.familySearch = e.target.value.toLowerCase().trim();
      _renderFamilyGrid(allGroups);
    });

    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        _state.familyFilter = btn.dataset.filter;
        _renderWordFamilies(container);
      });
    });

    _renderFamilyGrid(allGroups);
  }

  function _renderFamilyGrid(groups) {
    const grid = document.getElementById('family-grid');
    if (!grid) return;

    let filtered = groups;

    if (_state.familyFilter !== 'all') {
      const lvl = _state.familyFilter.toUpperCase();
      filtered = filtered.filter(g => g.word.level === lvl);
    }

    if (_state.familySearch) {
      filtered = filtered.filter(g =>
        g.root.toLowerCase().includes(_state.familySearch) ||
        g.translation.toLowerCase().includes(_state.familySearch) ||
        (g.verb && g.verb.toLowerCase().includes(_state.familySearch)) ||
        (g.noun && g.noun.toLowerCase().includes(_state.familySearch)) ||
        (g.adjective && g.adjective.toLowerCase().includes(_state.familySearch)) ||
        (g.adverb && g.adverb.toLowerCase().includes(_state.familySearch))
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="padding:var(--space-8);text-align:center;color:var(--text-muted);">Tidak ada keluarga kata ditemukan.</div>';
      return;
    }

    grid.innerHTML = '';
    filtered.forEach(g => {
      const f    = g;
      const posLabels = {
        verb: { class: 'wfb-verb', label: 'Verb' },
        noun: { class: 'wfb-noun', label: 'Noun' },
        adjective: { class: 'wfb-adjective', label: 'Adj' },
        adverb: { class: 'wfb-adverb', label: 'Adv' },
      };

      const formsHtml = ['verb', 'noun', 'adjective', 'adverb'].map(pos => {
        if (!f[pos]) return '';
        const { class: cls, label } = posLabels[pos];
        return `
          <div class="family-form-item">
            <span class="word-family-badge ${cls}">${label}</span>
            <span class="family-form-word">${f[pos]}</span>
          </div>
        `;
      }).join('');

      const card = document.createElement('div');
      card.className = 'family-card';
      card.innerHTML = `
        <div class="family-card-head">
          <div>
            <div class="family-card-root">${g.root}</div>
            <div class="family-card-translation">${g.translation}</div>
          </div>
          <button class="family-card-audio" data-word="${g.root}">🔊</button>
        </div>
        <div class="family-card-forms">${formsHtml}</div>
      `;

      card.querySelector('.family-card-audio').addEventListener('click', e => {
        e.stopPropagation();
        _speak(g.root);
      });

      card.addEventListener('click', () => _openFamilyModal(g));
      grid.appendChild(card);
    });
  }

  function _openFamilyModal(g) {
    const modal   = document.getElementById('word-modal');
    const overlay = document.getElementById('word-modal-overlay');
    if (!modal || !overlay) return;

    const posInfo = {
      verb:      { label: 'Kata Kerja (Verb)',        cls: 'wfb-verb' },
      noun:      { label: 'Kata Benda (Noun)',         cls: 'wfb-noun' },
      adjective: { label: 'Kata Sifat (Adjective)',    cls: 'wfb-adjective' },
      adverb:    { label: 'Kata Keterangan (Adverb)',  cls: 'wfb-adverb' },
    };

    const formsHtml = ['verb', 'noun', 'adjective', 'adverb'].map(pos => {
      if (!g[pos]) return '';
      const { label, cls } = posInfo[pos];
      return `
        <div class="family-modal-form-row">
          <div class="family-modal-pos">
            <span class="word-family-badge ${cls}">${label}</span>
          </div>
          <div class="family-modal-word">${g[pos]}</div>
        </div>
      `;
    }).join('');

    modal.innerHTML = `
      <div class="word-modal-top">
        <div>
          <div class="word-modal-word">🔗 ${g.root}</div>
          <div class="word-modal-ipa">${g.word.ipa}</div>
        </div>
        <button class="word-modal-close" id="modal-close-btn">✕ Tutup</button>
      </div>
      <div class="word-modal-translation">${g.translation}</div>
      <div style="margin-top:var(--space-4)">
        <div style="font-size:var(--text-sm);font-weight:600;color:var(--text-secondary);margin-bottom:var(--space-3)">Semua bentuk kata:</div>
        <div class="family-modal-forms">${formsHtml}</div>
      </div>
      <div class="family-modal-example">"${g.word.example}"</div>
      <div class="word-modal-actions">
        <button class="btn btn-outline btn-sm" id="modal-audio-btn">🔊 Dengarkan</button>
        <button class="btn btn-primary btn-sm" id="modal-learn-btn">
          ${SRSSystem.getCard(MODULE_ID, g.word.id) ? '⟳ SRS Review' : '+ Pelajari'}
        </button>
      </div>
    `;

    document.getElementById('modal-close-btn').addEventListener('click', () => overlay.classList.remove('open'));
    document.getElementById('modal-audio-btn').addEventListener('click', () => _speak(g.root));
    document.getElementById('modal-learn-btn').addEventListener('click', () => {
      overlay.classList.remove('open');
      const card = SRSSystem.getCard(MODULE_ID, g.word.id);
      if (!card) {
        SRSSystem.initCard(MODULE_ID, g.word.id);
        const xpResult = XPSystem.addXP('VOCAB_NEW', undefined, `Family: ${g.root}`);
        App.toastXP(xpResult);
        ChallengeSystem.onLearnItem();
        _updateStatsBar();
      } else {
        _setMode('srs');
      }
    });

    overlay.classList.add('open');
  }

  // ── Public Init ──────────────────────────────────────────

  function init() {
    Router.guard();
    App.init('intermediate-vocab');

    document.querySelectorAll('.vocab-mode-tab').forEach(tab => {
      tab.addEventListener('click', () => _setMode(tab.dataset.mode));
    });

    const overlay = document.getElementById('word-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.classList.remove('open');
      });
    }

    _updateStatsBar();
    _renderContent();

    if (typeof ChallengeSystem !== 'undefined' && ChallengeSystem.onModuleVisit) {
      ChallengeSystem.onModuleVisit();
    }
  }

  return { init };
})();

// Auto-init
document.addEventListener('DOMContentLoaded', VocabIntermediatePage.init);
