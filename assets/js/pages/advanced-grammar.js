/**
 * EnglishPath — Advanced Grammar Module C1–C2
 * Fase 17b — v2.4.2
 * localStorage: ep_user_{id}_advanced_grammar
 */

(function AdvancedGrammarPage() {
  'use strict';

  Router.guard();
  App.init('advanced-grammar');

  const user       = Auth.getActiveUser();
  const STORE_KEY  = 'advanced_grammar';
  const PASS_PCT   = 70; // ≥70% = topic "selesai"

  // ── State ──────────────────────────────────────────────────
  let _currentTopicId = null;
  let _currentMode    = 'study';  // 'study' | 'quiz'
  let _levelFilter    = 'all';    // 'all' | 'C1' | 'C2'

  // Quiz state
  let _quizQ   = [];
  let _qIdx    = 0;
  let _qScore  = 0;
  let _qAnswered = false;
  let _qUserAns  = '';

  // ── Storage helpers ────────────────────────────────────────
  function _loadStats() {
    if (!user) return _defaultStats();
    return Storage.getUser(user.id, STORE_KEY, _defaultStats());
  }
  function _saveStats(s) {
    if (!user) return;
    Storage.setUser(user.id, STORE_KEY, s);
  }
  function _defaultStats() {
    return { topicsStudied: [], quizResults: {}, totalXP: 0, quizzesDone: 0 };
  }

  function _getBestScore(topicId) {
    const s = _loadStats();
    const r = s.quizResults[topicId];
    return r ? r.best : 0;
  }
  function _isCompleted(topicId) {
    return _getBestScore(topicId) >= PASS_PCT;
  }

  // ── TTS ───────────────────────────────────────────────────
  function _speak(text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-GB';
    u.rate = 0.9;
    speechSynthesis.speak(u);
  }

  // ── Render: Overview list ──────────────────────────────────
  function _renderOverview() {
    _currentTopicId = null;
    const overview  = document.getElementById('adv-gram-overview');
    const detail    = document.getElementById('adv-gram-detail');
    if (overview) overview.classList.remove('hidden');
    if (detail)   detail.classList.add('hidden');

    _renderStats();
    _renderTopicGrid();

    // Filter buttons
    document.querySelectorAll('.agr-level-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.level === _levelFilter);
      btn.onclick = () => {
        _levelFilter = btn.dataset.level;
        document.querySelectorAll('.agr-level-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        _renderTopicGrid();
      };
    });

    // Challenge & module visit
    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onModuleVisit('advanced_grammar');
  }

  function _renderStats() {
    const stats = _loadStats();
    const allTopics = ADVANCED_GRAMMAR_DATA.getTopics();
    const completedCount = allTopics.filter(t => _isCompleted(t.id)).length;
    const avgScore = stats.quizzesDone > 0
      ? Math.round(Object.values(stats.quizResults).reduce((sum, r) => sum + (r.best || 0), 0) / Object.values(stats.quizResults).length)
      : 0;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('agr-stat-topics', allTopics.length);
    set('agr-stat-completed', completedCount);
    set('agr-stat-quizzes', stats.quizzesDone);
    set('agr-stat-bestscore', stats.quizzesDone > 0 ? avgScore + '%' : '—');
    set('agr-stat-xp', stats.totalXP);
  }

  function _renderTopicGrid() {
    const grid = document.getElementById('agr-topic-grid');
    if (!grid) return;

    const topics = _levelFilter === 'all'
      ? ADVANCED_GRAMMAR_DATA.getTopics()
      : ADVANCED_GRAMMAR_DATA.getByLevel(_levelFilter);

    grid.innerHTML = topics.map(t => {
      const best    = _getBestScore(t.id);
      const done    = _isCompleted(t.id);
      const hasScore= best > 0;
      return `
        <div class="agr-topic-card ${done ? 'completed' : ''}" data-topic="${t.id}">
          <div class="agr-topic-icon">${t.icon}</div>
          <div class="agr-topic-level agr-lvl-${t.level.toLowerCase()}">${t.level}</div>
          <div class="agr-topic-title">${t.title}</div>
          <div class="agr-topic-desc">${t.shortDesc}</div>
          <div class="agr-topic-footer">
            ${hasScore ? `<div class="agr-score-bar">
              <div class="agr-score-fill" style="width:${best}%"></div>
            </div>
            <span class="agr-score-label">${best}%</span>` : '<span class="agr-score-label muted">Belum pernah</span>'}
            ${done ? '<span class="agr-done-badge">✅ Selesai</span>' : ''}
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.agr-topic-card').forEach(card => {
      card.addEventListener('click', () => _openTopic(card.dataset.topic));
    });
  }

  // ── Open topic detail ──────────────────────────────────────
  function _openTopic(topicId) {
    const topic = ADVANCED_GRAMMAR_DATA.getTopic(topicId);
    if (!topic) return;
    _currentTopicId = topicId;
    _currentMode    = 'study';

    const overview = document.getElementById('adv-gram-overview');
    const detail   = document.getElementById('adv-gram-detail');
    if (overview) overview.classList.add('hidden');
    if (detail)   detail.classList.remove('hidden');

    // Mark topic as studied
    const stats = _loadStats();
    if (!stats.topicsStudied.includes(topicId)) {
      stats.topicsStudied.push(topicId);
      _saveStats(stats);
    }

    _renderTopicHeader(topic);
    _renderStudyMode(topic);
  }

  function _renderTopicHeader(topic) {
    const el = document.getElementById('agr-topic-heading');
    if (el) el.innerHTML = `${topic.icon} ${topic.title} <span class="agr-lvl-badge agr-lvl-${topic.level.toLowerCase()}">${topic.level}</span>`;

    const descEl = document.getElementById('agr-topic-subdesc');
    if (descEl) descEl.textContent = topic.shortDesc;

    // Mode tabs
    document.querySelectorAll('.agr-mode-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        _currentMode = tab.dataset.mode;
        document.querySelectorAll('.agr-mode-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (_currentMode === 'study') _renderStudyMode(topic);
        else _initQuiz(topic);
      });
      tab.classList.toggle('active', tab.dataset.mode === 'study');
    });

    // Back button
    const backBtn = document.getElementById('agr-back-btn');
    if (backBtn) backBtn.onclick = _renderOverview;
  }

  // ── Study Mode ─────────────────────────────────────────────
  function _renderStudyMode(topic) {
    const container = document.getElementById('agr-study-panel');
    if (!container) return;
    container.innerHTML = '';

    topic.sections.forEach((sec, si) => {
      const div = document.createElement('div');
      div.className = 'agr-section';

      // Heading
      const h = document.createElement('h3');
      h.className = 'agr-section-heading';
      h.textContent = sec.heading;
      div.appendChild(h);

      // Explanation (parse bold **text**)
      const expDiv = document.createElement('div');
      expDiv.className = 'agr-explanation';
      expDiv.innerHTML = _parseMarkdown(sec.explanation);
      div.appendChild(expDiv);

      // Tips
      if (sec.tips) {
        const tipDiv = document.createElement('div');
        tipDiv.className = 'agr-tip-box';
        tipDiv.innerHTML = `<span class="agr-tip-label">💡 Tips:</span> ${_parseMarkdown(sec.tips)}`;
        div.appendChild(tipDiv);
      }

      // Examples
      if (sec.examples && sec.examples.length) {
        const exDiv = document.createElement('div');
        exDiv.className = 'agr-examples';
        sec.examples.forEach(ex => {
          const row = document.createElement('div');
          row.className = 'agr-example-row';
          row.innerHTML = `
            <div class="agr-ex-en">
              <button class="agr-tts-btn" title="Dengarkan" data-text="${ex.en.replace(/"/g, '&quot;')}">🔊</button>
              <span>${ex.en}</span>
            </div>
            <div class="agr-ex-id">${ex.id}</div>`;
          exDiv.appendChild(row);
        });
        div.appendChild(exDiv);
      }

      container.appendChild(div);

      // Divider
      if (si < topic.sections.length - 1) {
        const hr = document.createElement('hr');
        hr.className = 'agr-section-divider';
        container.appendChild(hr);
      }
    });

    // TTS listeners
    container.querySelectorAll('.agr-tts-btn').forEach(btn => {
      btn.addEventListener('click', () => _speak(btn.dataset.text));
    });

    // Best score display
    const best = _getBestScore(topic.id);
    const scoreEl = document.getElementById('agr-study-score');
    if (scoreEl) scoreEl.textContent = best > 0 ? `Skor terbaik: ${best}%` : 'Belum pernah latihan soal';

    // Show study panel, hide quiz panel
    document.getElementById('agr-study-panel').classList.remove('hidden');
    const qp = document.getElementById('agr-quiz-panel');
    if (qp) qp.classList.add('hidden');
  }

  function _parseMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  // ── Quiz Mode ──────────────────────────────────────────────
  function _initQuiz(topic) {
    document.getElementById('agr-study-panel').classList.add('hidden');
    const qp = document.getElementById('agr-quiz-panel');
    if (qp) qp.classList.remove('hidden');

    _quizQ    = ADVANCED_GRAMMAR_DATA.getQuiz(topic.id, 10);
    _qIdx     = 0;
    _qScore   = 0;
    _qAnswered= false;
    _qUserAns = '';

    _renderQuestion();
  }

  function _renderQuestion() {
    const qp = document.getElementById('agr-quiz-panel');
    if (!qp) return;

    if (_qIdx >= _quizQ.length) {
      _showResult();
      return;
    }

    const q = _quizQ[_qIdx];
    const pct = Math.round((_qIdx / _quizQ.length) * 100);

    qp.innerHTML = `
      <div class="agr-quiz-header">
        <div class="agr-quiz-progress-bar"><div class="agr-quiz-progress-fill" style="width:${pct}%"></div></div>
        <span class="agr-quiz-counter">Soal ${_qIdx + 1} / ${_quizQ.length}</span>
        <span class="agr-quiz-score-live">Skor: ${_qScore}</span>
      </div>
      <div class="agr-quiz-body" id="agr-qbody">
        <p class="agr-qtype-badge">${_qTypeLabel(q.type)}</p>
        <p class="agr-question-text">${_parseMarkdown(q.question)}</p>
        ${_renderInputArea(q)}
      </div>
      <div class="agr-quiz-actions">
        <button class="agr-btn-check" id="agr-check-btn" disabled>Cek Jawaban</button>
      </div>
      <div class="agr-feedback-box hidden" id="agr-feedback-box"></div>
      <button class="agr-btn-next hidden" id="agr-next-btn">${_qIdx + 1 < _quizQ.length ? 'Soal Berikutnya →' : 'Lihat Hasil'}</button>
    `;

    _attachQuizListeners(q);
  }

  function _qTypeLabel(type) {
    const map = { mcq: '🔵 Pilihan Ganda', fill: '✏️ Isi Kosong', transform: '🔄 Transform' };
    return map[type] || type;
  }

  function _renderInputArea(q) {
    if (q.type === 'mcq') {
      const opts = [...q.options].sort(() => Math.random() - 0.5);
      return `<div class="agr-choices" id="agr-choices">
        ${opts.map((o, i) => `<button class="agr-choice-btn" data-value="${o}">${_alpha(i)}. ${o}</button>`).join('')}
      </div>`;
    }
    if (q.type === 'fill') {
      return `<div class="agr-fill-area">
        <input type="text" class="agr-fill-input" id="agr-fill-input" placeholder="Ketik jawaban..." autocomplete="off" autocorrect="off" spellcheck="false">
        <div class="agr-hint-text">💡 Jawaban: masukkan kata/frasa yang tepat</div>
      </div>`;
    }
    if (q.type === 'transform') {
      return `<div class="agr-transform-area">
        <div class="agr-transform-hint">Tulis ulang kalimat berdasarkan instruksi di atas:</div>
        <textarea class="agr-transform-input" id="agr-transform-input" rows="3" placeholder="Tulis jawaban Anda di sini..." spellcheck="false"></textarea>
      </div>`;
    }
    return '';
  }

  function _alpha(i) { return ['A','B','C','D'][i] || i; }

  function _attachQuizListeners(q) {
    const checkBtn = document.getElementById('agr-check-btn');

    if (q.type === 'mcq') {
      document.querySelectorAll('.agr-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.agr-choice-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          _qUserAns = btn.dataset.value;
          if (checkBtn) checkBtn.disabled = false;
        });
      });
    } else if (q.type === 'fill') {
      const inp = document.getElementById('agr-fill-input');
      if (inp) {
        inp.addEventListener('input', () => {
          _qUserAns = inp.value.trim();
          if (checkBtn) checkBtn.disabled = _qUserAns.length === 0;
        });
        inp.addEventListener('keypress', e => {
          if (e.key === 'Enter' && !checkBtn.disabled) checkBtn.click();
        });
      }
    } else if (q.type === 'transform') {
      const ta = document.getElementById('agr-transform-input');
      if (ta) {
        ta.addEventListener('input', () => {
          _qUserAns = ta.value.trim();
          if (checkBtn) checkBtn.disabled = _qUserAns.length === 0;
        });
      }
    }

    if (checkBtn) checkBtn.addEventListener('click', () => _checkAnswer(q));

    const nextBtn = document.getElementById('agr-next-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => {
      _qIdx++;
      _renderQuestion();
    });
  }

  function _checkAnswer(q) {
    if (_qAnswered) return;
    _qAnswered = true;

    const correct = _isCorrect(q, _qUserAns);
    if (correct) _qScore++;

    const feedback = document.getElementById('agr-feedback-box');
    if (feedback) {
      feedback.classList.remove('hidden', 'correct', 'wrong');
      feedback.classList.add(correct ? 'correct' : 'wrong');
      feedback.innerHTML = correct
        ? `<strong>✅ Benar!</strong> Jawaban: <em>${q.answer}</em>`
        : `<strong>❌ Salah.</strong> Jawaban yang benar: <em>${q.answer}</em><br>Jawaban Anda: <em>${_qUserAns || '(kosong)'}</em>`;
    }

    // Highlight MCQ
    if (q.type === 'mcq') {
      document.querySelectorAll('.agr-choice-btn').forEach(btn => {
        if (btn.dataset.value === q.answer) btn.classList.add('correct');
        else if (btn.dataset.value === _qUserAns && !correct) btn.classList.add('wrong');
        btn.disabled = true;
      });
    }
    // Highlight fill/transform
    const fillInp = document.getElementById('agr-fill-input');
    const transInp = document.getElementById('agr-transform-input');
    if (fillInp) { fillInp.disabled = true; fillInp.classList.add(correct ? 'input-correct' : 'input-wrong'); }
    if (transInp) { transInp.disabled = true; transInp.classList.add(correct ? 'input-correct' : 'input-wrong'); }

    document.getElementById('agr-check-btn').disabled = true;
    const nextBtn = document.getElementById('agr-next-btn');
    if (nextBtn) nextBtn.classList.remove('hidden');

    // Re-render after state change
    _qAnswered = false; // reset for next question
  }

  function _isCorrect(q, userAns) {
    if (!userAns) return false;
    const clean = s => s.toLowerCase().trim().replace(/[.!?]$/, '').replace(/\s+/g, ' ');
    if (q.type === 'mcq') return clean(userAns) === clean(q.answer);
    if (q.type === 'fill') {
      // Accept multiple correct answers separated by /
      const accepted = q.answer.split('/').map(a => clean(a));
      return accepted.includes(clean(userAns));
    }
    if (q.type === 'transform') {
      // Flexible: check if user answer contains key words from correct answer
      const correctClean = clean(q.answer);
      const userClean    = clean(userAns);
      // Allow ≥80% word match
      const correctWords = correctClean.split(' ');
      const userWords    = userClean.split(' ');
      const matches = correctWords.filter(w => userWords.includes(w)).length;
      return matches / correctWords.length >= 0.75;
    }
    return false;
  }

  function _showResult() {
    const qp = document.getElementById('agr-quiz-panel');
    if (!qp) return;

    const total   = _quizQ.length;
    const pct     = Math.round((_qScore / total) * 100);
    const passed  = pct >= PASS_PCT;
    const topic   = ADVANCED_GRAMMAR_DATA.getTopic(_currentTopicId);

    // Save to storage
    const stats = _loadStats();
    const prev  = stats.quizResults[_currentTopicId] || { best: 0, attempts: 0, lastScore: 0 };
    const newBest = Math.max(prev.best, pct);
    stats.quizResults[_currentTopicId] = {
      best: newBest,
      attempts: prev.attempts + 1,
      lastScore: pct,
    };
    stats.quizzesDone++;

    // XP
    let xpEarned = 0;
    const xpPerCorrect = 3;
    const xpBonus = 20;
    xpEarned += _qScore * xpPerCorrect;
    if (pct === 100) xpEarned += xpBonus;
    stats.totalXP = (stats.totalXP || 0) + xpEarned;
    _saveStats(stats);

    if (typeof XPSystem !== 'undefined') {
      for (let i = 0; i < _qScore; i++) {
        XPSystem.addXP('QUIZ_CORRECT');
      }
      if (pct === 100) XPSystem.addXP('QUIZ_PERFECT');
    }
    if (typeof ChallengeSystem !== 'undefined') ChallengeSystem.onQuizComplete(_currentTopicId, _qScore, total);

    // Emoji rating
    const emoji = pct === 100 ? '🏆' : pct >= 80 ? '🌟' : pct >= 70 ? '✅' : pct >= 50 ? '📈' : '📖';

    qp.innerHTML = `
      <div class="agr-result">
        <div class="agr-result-emoji">${emoji}</div>
        <h2 class="agr-result-title">${topic ? topic.title : 'Quiz'}</h2>
        <div class="agr-result-score">${_qScore} / ${total}</div>
        <div class="agr-result-pct ${passed ? 'pass' : 'fail'}">${pct}%</div>
        <p class="agr-result-msg">${_resultMsg(pct)}</p>
        <div class="agr-result-xp">+${xpEarned} XP 🎉</div>
        ${passed ? '<div class="agr-result-badge">✅ Topik ini selesai!</div>' : `<p class="agr-result-hint">Skor minimum untuk selesai: ${PASS_PCT}%</p>`}
        <div class="agr-result-actions">
          <button class="agr-btn-retry">🔄 Coba Lagi</button>
          <button class="agr-btn-study">📖 Pelajari Materi</button>
          <button class="agr-btn-back">← Kembali ke Daftar</button>
        </div>
      </div>`;

    qp.querySelector('.agr-btn-retry').onclick = () => {
      const t = ADVANCED_GRAMMAR_DATA.getTopic(_currentTopicId);
      if (t) _initQuiz(t);
    };
    qp.querySelector('.agr-btn-study').onclick = () => {
      _currentMode = 'study';
      document.querySelectorAll('.agr-mode-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === 'study'));
      const t = ADVANCED_GRAMMAR_DATA.getTopic(_currentTopicId);
      if (t) _renderStudyMode(t);
    };
    qp.querySelector('.agr-btn-back').onclick = _renderOverview;
  }

  function _resultMsg(pct) {
    if (pct === 100) return 'Sempurna! Kamu menguasai topik ini sepenuhnya!';
    if (pct >= 90)  return 'Luar biasa! Hampir sempurna!';
    if (pct >= 80)  return 'Bagus sekali! Kamu memahami topik ini dengan baik.';
    if (pct >= 70)  return 'Cukup baik! Topik ini sudah selesai.';
    if (pct >= 50)  return 'Terus berlatih! Baca materi lagi dan coba kembali.';
    return 'Jangan menyerah! Pelajari materinya lebih dalam dan coba lagi.';
  }

  // ── Init ──────────────────────────────────────────────────
  _renderOverview();

})();
