/**
 * EnglishPath — Pronunciation & Phonetics Page
 * Fase 5 — v0.6.0
 * IIFE module pattern
 */

(function PronunciationPage() {
  'use strict';

  Router.guard();

  const user = Auth.getActiveUser();
  const STORAGE_KEY = `srs_vocab_pronunciation`;

  // ── State ─────────────────────────────────────────────────
  let currentTab = 'ipa';
  let selectedIPA = null;
  let quizState = null;

  // ── Speech Synthesis ──────────────────────────────────────
  const tts = window.speechSynthesis;
  const hasTTS = !!tts;

  function speak(text, rate = 1) {
    if (!hasTTS) { App.toast('Browser tidak mendukung Text-to-Speech', 'error'); return; }
    tts.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-GB';
    utter.rate = rate;
    utter.pitch = 1;
    // Prefer English voice
    const voices = tts.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('UK'))
                 || voices.find(v => v.lang.startsWith('en'));
    if (enVoice) utter.voice = enVoice;
    tts.speak(utter);
  }

  // ── Stats ─────────────────────────────────────────────────
  function loadStats() {
    if (!user) return;
    const stats = Storage.getUser(user.id, 'pron_stats', {
      phonemesExplored: 0,
      quizzesTaken: 0,
      bestScore: 0,
      totalListens: 0,
    });

    document.getElementById('stat-phonemes').textContent = stats.phonemesExplored;
    document.getElementById('stat-quizzes').textContent = stats.quizzesTaken;
    document.getElementById('stat-best').textContent = stats.bestScore > 0 ? stats.bestScore + '%' : '—';
    document.getElementById('stat-listens').textContent = stats.totalListens;
  }

  function updateStat(key, delta = 1) {
    if (!user) return;
    const stats = Storage.getUser(user.id, 'pron_stats', {
      phonemesExplored: 0, quizzesTaken: 0, bestScore: 0, totalListens: 0,
    });
    if (key === 'bestScore') {
      stats.bestScore = Math.max(stats.bestScore, delta);
    } else {
      stats[key] = (stats[key] || 0) + delta;
    }
    Storage.setUser(user.id, 'pron_stats', stats);
    loadStats();
  }

  // ── Tab System ────────────────────────────────────────────
  function initTabs() {
    document.querySelectorAll('.pron-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        switchTab(tab);
      });
    });
  }

  function switchTab(tabId) {
    currentTab = tabId;
    document.querySelectorAll('.pron-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabId);
    });
    document.querySelectorAll('.pron-panel').forEach(p => {
      p.classList.toggle('active', p.id === 'panel-' + tabId);
    });
  }

  // ── IPA Chart Tab ─────────────────────────────────────────
  function renderIPAChart() {
    renderIPASection('vowels-short-grid', PhoneticsData.VOWELS_SHORT, 'vowel');
    renderIPASection('vowels-long-grid',  PhoneticsData.VOWELS_LONG,  'vowel');
    renderIPASection('diphthongs-grid',   PhoneticsData.DIPHTHONGS,   'diphthong');
    renderConsonants();
  }

  function renderIPASection(gridId, items, kind) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = items.map(item => `
      <div class="ipa-card" data-symbol="${item.symbol}" data-kind="${kind}">
        <button class="ipa-listen-btn" data-word="${item.example}" title="Dengarkan">🔊</button>
        <div class="ipa-symbol">${item.symbol}</div>
        <div class="ipa-name">${item.name}</div>
        <div class="ipa-example">${item.example}</div>
        <div class="ipa-example-ipa">${item.ipa}</div>
      </div>
    `).join('');

    grid.querySelectorAll('.ipa-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.ipa-listen-btn')) {
          e.stopPropagation();
          const word = e.target.closest('.ipa-listen-btn').dataset.word;
          speak(word);
          updateStat('totalListens');
          return;
        }
        const sym = card.dataset.symbol;
        const found = [...PhoneticsData.VOWELS_SHORT, ...PhoneticsData.VOWELS_LONG, ...PhoneticsData.DIPHTHONGS]
          .find(i => i.symbol === sym);
        if (found) showIPADetail(found);
      });
    });
  }

  function renderConsonants() {
    const grid = document.getElementById('consonants-grid');
    if (!grid) return;
    grid.innerHTML = PhoneticsData.CONSONANTS.map(c => `
      <div class="ipa-card" data-symbol="${c.symbol}" data-kind="consonant">
        <button class="ipa-listen-btn" data-word="${c.example}" title="Dengarkan">🔊</button>
        <div class="ipa-symbol">${c.symbol}</div>
        <div class="ipa-name">${c.name}</div>
        <div class="ipa-example">${c.example}</div>
        <div class="ipa-example-ipa">${c.ipa}</div>
        <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap;">
          <span class="consonant-type-badge type-${c.type}">${c.type}</span>
          <span class="voiced-badge">${c.voiced ? '🔊 voiced' : '🔇 voiceless'}</span>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.ipa-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.ipa-listen-btn')) {
          e.stopPropagation();
          speak(e.target.closest('.ipa-listen-btn').dataset.word);
          updateStat('totalListens');
          return;
        }
        const sym = card.dataset.symbol;
        const found = PhoneticsData.CONSONANTS.find(c => c.symbol === sym);
        if (found) showIPADetail(found);
      });
    });
  }

  function showIPADetail(item) {
    const panel = document.getElementById('ipa-detail-panel');
    if (!panel) return;

    const practiceWords = PhoneticsData.getPracticeWords(item.symbol);

    panel.innerHTML = `
      <div class="ipa-detail-header">
        <div class="ipa-detail-symbol">${item.symbol}</div>
        <div class="ipa-detail-info">
          <h3>${item.name}</h3>
          <div class="ipa-detail-example">
            <span>${item.example}</span>
            <span style="color:var(--text-muted);font-size:0.9em"> ${item.ipa}</span>
            — <span style="color:var(--text-secondary);font-size:0.9em">${item.translation}</span>
            <button onclick="PronPage.speakWord('${item.example}')" style="background:none;border:none;cursor:pointer;font-size:1.1rem;padding:0 4px;" title="Dengarkan">🔊</button>
          </div>
        </div>
      </div>
      <div class="ipa-detail-tip">💡 ${item.tip}</div>
      ${practiceWords.length > 0 ? `
        <div style="margin-bottom:var(--space-2);font-size:var(--text-sm);font-weight:600;color:var(--text-secondary);">Latih dengan kata-kata ini:</div>
        <div class="ipa-practice-words">
          ${practiceWords.map(w => `
            <button class="ipa-practice-word" onclick="PronPage.speakWord('${w}')">
              🔊 ${w}
            </button>
          `).join('')}
        </div>
      ` : ''}
    `;

    panel.classList.add('visible');
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    updateStat('phonemesExplored');

    // Highlight selected card
    document.querySelectorAll('.ipa-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll(`.ipa-card[data-symbol="${item.symbol}"]`).forEach(c => c.classList.add('selected'));
  }

  // ── Minimal Pairs Tab ─────────────────────────────────────
  function renderMinimalPairs() {
    const container = document.getElementById('minimal-pairs-container');
    if (!container) return;

    container.innerHTML = PhoneticsData.MINIMAL_PAIRS.map(mp => `
      <div class="mp-category">
        <div class="mp-header">
          <div class="mp-header-left">
            <div>
              <div class="mp-title">${mp.category}</div>
              <div class="mp-desc">${mp.description}</div>
            </div>
          </div>
          <span class="mp-difficulty difficulty-${mp.difficulty}">${mp.difficulty}</span>
        </div>
        <div class="mp-body">
          <div class="mp-pairs-grid">
            ${mp.pairs.map(pair => `
              <div class="mp-pair-card">
                <div class="mp-word-block" onclick="PronPage.speakWord('${pair.word1}')">
                  <div class="mp-word">${pair.word1}</div>
                  <div class="mp-ipa">${pair.ipa1}</div>
                  <div class="mp-meaning">${pair.meaning1}</div>
                </div>
                <div class="mp-vs">VS</div>
                <div class="mp-word-block" onclick="PronPage.speakWord('${pair.word2}')">
                  <div class="mp-word">${pair.word2}</div>
                  <div class="mp-ipa">${pair.ipa2}</div>
                  <div class="mp-meaning">${pair.meaning2}</div>
                </div>
                <button class="mp-listen-pair-btn" onclick="PronPage.speakPair('${pair.word1}', '${pair.word2}')">
                  🔊 Bandingkan
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  function speakPair(word1, word2) {
    if (!hasTTS) return;
    tts.cancel();
    const u1 = new SpeechSynthesisUtterance(word1);
    u1.lang = 'en-GB'; u1.rate = 0.85;
    const pause = new SpeechSynthesisUtterance('...');
    pause.volume = 0;
    const u2 = new SpeechSynthesisUtterance(word2);
    u2.lang = 'en-GB'; u2.rate = 0.85;
    tts.speak(u1);
    tts.speak(pause);
    tts.speak(u2);
    updateStat('totalListens');
  }

  // ── Tongue Twisters Tab ────────────────────────────────────
  function renderTongueTwisters() {
    const container = document.getElementById('tongue-twisters-container');
    if (!container) return;

    container.innerHTML = `<div class="tt-grid">` + PhoneticsData.TONGUE_TWISTERS.map(tt => `
      <div class="tt-card">
        <div class="tt-meta">
          <div class="tt-focus">🎯 ${tt.focus}</div>
          <span class="mp-difficulty difficulty-${tt.difficulty}">${tt.difficulty}</span>
        </div>
        <div class="tt-text">"${tt.text}"</div>
        <div class="tt-tip">💡 ${tt.tips}</div>
        <div class="tt-actions">
          <button class="tt-speed-btn slow" onclick="PronPage.speakTT('${tt.text.replace(/'/g, "\\'")}', 0.6)">🐢 Lambat</button>
          <button class="tt-speed-btn normal" onclick="PronPage.speakTT('${tt.text.replace(/'/g, "\\'")}', 0.9)">🚶 Normal</button>
          <button class="tt-speed-btn fast" onclick="PronPage.speakTT('${tt.text.replace(/'/g, "\\'")}', 1.2)">🚀 Cepat</button>
        </div>
      </div>
    `).join('') + `</div>`;
  }

  function speakTT(text, rate) {
    speak(text, rate);
    updateStat('totalListens');
  }

  // ── Word Stress Tab ────────────────────────────────────────
  function renderWordStress() {
    const container = document.getElementById('word-stress-container');
    if (!container) return;

    container.innerHTML = PhoneticsData.STRESS_PATTERNS.map(sp => `
      <div class="stress-rule-card">
        <div class="stress-rule-title">${sp.category}</div>
        <div class="stress-rule-text">📌 ${sp.rule}</div>
        <div class="stress-examples">
          ${sp.examples.map(ex => {
            // Render word with stressed syllables highlighted
            // Stressed syllable is uppercase in the word string
            const wordHtml = ex.word.replace(/([A-Z]+)/g, '<span class="stressed">$1</span>');
            return `
              <div class="stress-word-block" onclick="PronPage.speakWord('${ex.word.toLowerCase().replace(/[A-Z]+/g, m => m.toLowerCase())}')">
                <div class="stress-word">${wordHtml}</div>
                <div class="stress-ipa">${ex.ipa}</div>
                <div class="stress-meaning">${ex.meaning}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');
  }

  // ── Common Mistakes Tab ────────────────────────────────────
  function renderCommonMistakes() {
    const container = document.getElementById('common-mistakes-container');
    if (!container) return;

    container.innerHTML = PhoneticsData.COMMON_MISTAKES.map((cm, idx) => `
      <div class="mistake-card">
        <div class="mistake-title">❌ Kesalahan ${idx + 1}: ${cm.mistake}</div>
        <div class="mistake-compare">
          <div class="mistake-wrong">
            <div class="mistake-label">❌ Salah</div>
            <div class="mistake-value">${cm.example_wrong}</div>
          </div>
          <div class="mistake-right">
            <div class="mistake-label">✅ Benar</div>
            <div class="mistake-value">${cm.example_right}</div>
          </div>
        </div>
        <div class="mistake-explanation">${cm.explanation}</div>
        <div style="font-size:var(--text-xs);font-weight:600;color:var(--text-secondary);margin-bottom:var(--space-2);">Latih kata-kata ini:</div>
        <div class="mistake-practice-words">
          ${cm.words.map(w => `
            <button class="mistake-word-btn" onclick="PronPage.speakWord('${w.split('/')[0]}')">
              🔊 ${w}
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // ── Quiz Tab ───────────────────────────────────────────────
  function initQuiz() {
    const startBtn = document.getElementById('quiz-start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', startQuiz);
    }
  }

  function startQuiz() {
    // Shuffle and pick 10 questions
    const questions = [...PhoneticsData.LISTEN_QUIZ].sort(() => Math.random() - 0.5).slice(0, 10);
    quizState = {
      questions,
      current: 0,
      score: 0,
      answered: false,
    };

    document.querySelector('.pron-quiz-start').style.display = 'none';
    document.querySelector('.pron-quiz-results') && (document.querySelector('.pron-quiz-results').style.display = 'none');

    const quizCard = document.getElementById('quiz-question-card');
    quizCard.style.display = 'block';

    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const state = quizState;
    const q = state.questions[state.current];
    const card = document.getElementById('quiz-question-card');

    const total = state.questions.length;
    const progress = ((state.current) / total) * 100;

    // Build options: correct + 3 distractors, shuffled
    const options = [
      { ipa: q.ipa, meaning: q.meaning, correct: true },
      ...q.distractors.map((ipa, i) => ({ ipa, meaning: q.distractor_meanings[i], correct: false })),
    ].sort(() => Math.random() - 0.5);

    card.innerHTML = `
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${progress}%"></div>
      </div>
      <div class="quiz-question-meta">Soal ${state.current + 1} dari ${total}</div>
      <div class="quiz-listen-area">
        <div class="quiz-listen-word" id="quiz-word-display">???</div>
        <button class="quiz-listen-btn" id="quiz-listen-btn">
          🔊 Dengarkan kata
        </button>
      </div>
      <div class="quiz-question-text">Pilih transkripsi IPA yang benar:</div>
      <div class="quiz-options" id="quiz-options">
        ${options.map((opt, i) => `
          <button class="quiz-option-btn" data-correct="${opt.correct}" data-idx="${i}">
            <div>${opt.ipa}</div>
            ${opt.meaning ? `<div style="font-size:0.75em;font-weight:400;color:var(--text-muted);margin-top:2px">${opt.meaning}</div>` : ''}
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quiz-feedback"></div>
      <button class="quiz-next-btn" id="quiz-next-btn">
        ${state.current + 1 < total ? 'Soal Berikutnya →' : 'Lihat Hasil'}
      </button>
    `;

    // Show word only after first listen
    let listened = false;
    document.getElementById('quiz-listen-btn').addEventListener('click', () => {
      speak(q.word);
      updateStat('totalListens');
      if (!listened) {
        document.getElementById('quiz-word-display').textContent = q.word;
        listened = true;
      }
    });

    // Options
    document.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (quizState.answered) return;
        quizState.answered = true;

        const correct = btn.dataset.correct === 'true';
        if (correct) {
          btn.classList.add('correct');
          quizState.score++;
          showQuizFeedback(true, `✅ Benar! "${q.word}" dibaca ${q.ipa} = ${q.meaning}`);
        } else {
          btn.classList.add('wrong');
          // Reveal correct
          document.querySelectorAll('.quiz-option-btn').forEach(b => {
            if (b.dataset.correct === 'true') b.classList.add('correct');
          });
          showQuizFeedback(false, `❌ Kurang tepat. Jawaban benar: ${q.ipa} (${q.meaning})`);
        }

        document.querySelectorAll('.quiz-option-btn').forEach(b => b.disabled = true);
        document.getElementById('quiz-next-btn').style.display = 'block';
      });
    });

    document.getElementById('quiz-next-btn').addEventListener('click', () => {
      quizState.current++;
      quizState.answered = false;
      if (quizState.current < quizState.questions.length) {
        renderQuizQuestion();
      } else {
        showQuizResults();
      }
    });
  }

  function showQuizFeedback(correct, message) {
    const fb = document.getElementById('quiz-feedback');
    fb.className = 'quiz-feedback ' + (correct ? 'correct' : 'wrong');
    fb.textContent = message;
    fb.style.display = 'block';
  }

  function showQuizResults() {
    document.getElementById('quiz-question-card').style.display = 'none';

    const total = quizState.questions.length;
    const score = quizState.score;
    const pct = Math.round((score / total) * 100);

    const emoji = pct === 100 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '💪';
    const label = pct === 100 ? 'Sempurna!' : pct >= 70 ? 'Bagus sekali!' : pct >= 50 ? 'Cukup baik!' : 'Terus berlatih!';

    // XP
    let xpGained = score * 3;
    if (pct === 100) xpGained += 20;
    let result = null;
    if (typeof XPSystem !== 'undefined') {
      result = XPSystem.addXP(xpGained, 'quiz_pronunciation');
    }

    updateStat('quizzesTaken');
    updateStat('bestScore', pct);

    // Connect daily challenge
    if (typeof Challenge !== 'undefined') {
      Challenge.onModuleVisit && Challenge.onModuleVisit('pronunciation');
      Challenge.onQuizComplete && Challenge.onQuizComplete();
    }

    const resultsEl = document.getElementById('quiz-results');
    resultsEl.innerHTML = `
      <div class="quiz-results-emoji">${emoji}</div>
      <div class="quiz-results-score">${score}/${total}</div>
      <div class="quiz-results-label">${label}</div>
      <div class="quiz-results-sub">${pct}% jawaban benar</div>
      <div class="quiz-results-xp">+${xpGained} XP</div>
      <button class="quiz-retry-btn" id="quiz-retry-btn">Coba Lagi</button>
    `;
    resultsEl.style.display = 'block';

    document.getElementById('quiz-retry-btn').addEventListener('click', () => {
      resultsEl.style.display = 'none';
      document.querySelector('.pron-quiz-start').style.display = 'block';
    });

    if (result) App.toastXP(result);
    loadStats();
  }

  // ── TTS availability notice ────────────────────────────────
  function renderTTSNotice() {
    if (!hasTTS) {
      document.querySelectorAll('.tts-notice-target').forEach(el => {
        el.insertAdjacentHTML('beforebegin', `
          <div class="speech-unavailable">
            ⚠️ Browser kamu tidak mendukung Text-to-Speech. Gunakan Chrome/Edge untuk pengalaman terbaik.
          </div>
        `);
      });
    }
  }

  // ── Dashboard Challenge init ───────────────────────────────
  function trackVisit() {
    if (typeof Challenge !== 'undefined' && Challenge.onModuleVisit) {
      Challenge.onModuleVisit('pronunciation');
    }
  }

  // ── Public API ─────────────────────────────────────────────
  window.PronPage = {
    speakWord(word) { speak(word); updateStat('totalListens'); },
    speakPair,
    speakTT,
  };

  // ── Init ──────────────────────────────────────────────────
  function init() {
    App.init('foundation-pronunciation');
    loadStats();
    initTabs();
    renderIPAChart();
    renderMinimalPairs();
    renderTongueTwisters();
    renderWordStress();
    renderCommonMistakes();
    initQuiz();
    renderTTSNotice();
    trackVisit();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
