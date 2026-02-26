/**
 * EnglishPath — IELTS Speaking Module
 * Fase 13c-1: Practice per Skill — Speaking
 * localStorage: ep_user_{id}_ielts_speaking
 */
const IELTSSpeaking = (() => {

  // ── State ──────────────────────────────────────────────
  let _state = {
    view: 'menu',      // menu | part1 | part2 | part3
    activeTab: 'part1',
    topicId: null,
    cardId: null,
    part3TopicId: null,
    timerInterval: null,
    timerSeconds: 0,
    timerRunning: false,
    timerMode: 'prep'  // prep | speak
  };

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  // ── Storage ────────────────────────────────────────────
  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, 'ielts_speaking') || {};
  }

  function _saveAttempt(part, itemId, selfBand) {
    const uid = _uid();
    if (!uid) return;
    const data = _loadData();
    if (!data.results) data.results = {};
    const key = `${part}_${itemId}`;
    const prev = data.results[key] || { attempts: 0 };
    data.results[key] = {
      attempts: prev.attempts + 1,
      lastSelfBand: selfBand,
      lastDate: new Date().toISOString().split('T')[0]
    };
    if (!data.totalAttempts) data.totalAttempts = 0;
    data.totalAttempts += 1;
    Storage.setUser(uid, 'ielts_speaking', data);
  }

  function _getAttempts(part, itemId) {
    const data = _loadData();
    if (!data.results) return null;
    return data.results[`${part}_${itemId}`] || null;
  }

  // ── TTS ─────────────────────────────────────────────────
  let _ttsPlaying = null;

  function _speak(text, btnEl) {
    if (!('speechSynthesis' in window)) {
      App.showToast('Browser kamu tidak mendukung Text-to-Speech', 'error');
      return;
    }
    speechSynthesis.cancel();
    if (_ttsPlaying === btnEl) {
      _ttsPlaying = null;
      if (btnEl) { btnEl.textContent = '🔊 Dengarkan'; btnEl.classList.remove('playing'); }
      return;
    }
    if (_ttsPlaying) {
      _ttsPlaying.textContent = '🔊 Dengarkan';
      _ttsPlaying.classList.remove('playing');
    }
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-GB';
    utt.rate = 0.88;
    utt.pitch = 1;
    _ttsPlaying = btnEl;
    if (btnEl) { btnEl.textContent = '⏸ Berhenti'; btnEl.classList.add('playing'); }
    utt.onend = () => {
      _ttsPlaying = null;
      if (btnEl) { btnEl.textContent = '🔊 Dengarkan'; btnEl.classList.remove('playing'); }
    };
    utt.onerror = () => {
      _ttsPlaying = null;
      if (btnEl) { btnEl.textContent = '🔊 Dengarkan'; btnEl.classList.remove('playing'); }
    };
    speechSynthesis.speak(utt);
  }

  // ── Timer ──────────────────────────────────────────────
  function _startTimer(seconds, displayId, onEnd) {
    _stopTimer();
    _state.timerSeconds = seconds;
    _state.timerRunning = true;
    _renderTimerDisplay(displayId);
    _state.timerInterval = setInterval(() => {
      _state.timerSeconds--;
      _renderTimerDisplay(displayId);
      if (_state.timerSeconds <= 0) {
        _stopTimer();
        const el = document.getElementById(displayId);
        if (el) { el.textContent = '0:00'; el.className = 'speaking-timer-display urgent'; }
        App.showToast('Waktu habis!', 'warning');
        if (onEnd) onEnd();
      }
    }, 1000);
  }

  function _stopTimer() {
    if (_state.timerInterval) {
      clearInterval(_state.timerInterval);
      _state.timerInterval = null;
    }
    _state.timerRunning = false;
  }

  function _renderTimerDisplay(displayId) {
    const el = document.getElementById(displayId);
    if (!el) return;
    const m = Math.floor(_state.timerSeconds / 60);
    const s = _state.timerSeconds % 60;
    el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    el.className = 'speaking-timer-display' +
      (_state.timerSeconds <= 30 ? ' urgent' : _state.timerSeconds <= 60 ? ' warning' : '');
  }

  // ── Main Content Container ─────────────────────────────
  function _container() {
    return document.getElementById('speaking-content');
  }

  // ── Menu / Hub ─────────────────────────────────────────
  function _renderMenu() {
    _stopTimer();
    speechSynthesis.cancel();
    _state.view = 'menu';
    const data = _loadData();
    const totalAttempts = data.totalAttempts || 0;

    const tabs = ['part1', 'part2', 'part3'];
    const tabLabels = { part1: 'Part 1 — Q&A', part2: 'Part 2 — Long Turn', part3: 'Part 3 — Discussion' };

    const tabHtml = tabs.map(t => `
      <button class="skill-part-tab ${_state.activeTab === t ? 'active' : ''}" data-tab="${t}">${tabLabels[t]}</button>
    `).join('');

    let contentHtml = '';

    if (_state.activeTab === 'part1') {
      const topics = IELTSSpeakingData.getPart1Topics();
      contentHtml = `
        <p class="section-description" style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1.25rem;line-height:1.6;">
          <strong>Part 1</strong> berlangsung 4–5 menit. Examiner menanyakan pertanyaan umum tentang dirimu dan topik sehari-hari.
          Klik topik di bawah untuk berlatih menjawab.
        </p>
        <div class="skill-grid">
          ${topics.map(t => {
            const done = data.results && Object.keys(data.results).some(k => k.startsWith(`part1_${t.id}`));
            return `
              <div class="skill-card" data-action="open-part1" data-id="${t.id}">
                <span class="skill-card-icon">${t.icon}</span>
                <div class="skill-card-title">${t.title}</div>
                <div class="skill-card-meta">
                  <span>${t.questions.length} pertanyaan</span>
                </div>
                ${done ? '<div class="skill-card-done">✓ Dikerjakan</div>' : ''}
              </div>`;
          }).join('')}
        </div>`;
    } else if (_state.activeTab === 'part2') {
      const cards = IELTSSpeakingData.getPart2Cards();
      contentHtml = `
        <p class="section-description" style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1.25rem;line-height:1.6;">
          <strong>Part 2</strong>: Kamu mendapat cue card, 1 menit untuk mempersiapkan, lalu bicara 1–2 menit. 
          Latih dengan timer untuk mensimulasikan kondisi nyata.
        </p>
        <div class="skill-grid">
          ${cards.map(c => {
            const done = data.results && data.results[`part2_${c.id}`];
            return `
              <div class="skill-card" data-action="open-part2" data-id="${c.id}">
                <span class="skill-card-icon">${c.icon}</span>
                <div class="skill-card-title">${c.title}</div>
                <div class="skill-card-meta">
                  <span>⏱ ${c.prepTime}s prep · ${c.speakTime}s speak</span>
                  ${done ? `<span style="color:var(--color-primary);font-weight:700;">Band ${done.lastSelfBand}</span>` : ''}
                </div>
                ${done ? '<div class="skill-card-done">✓ Dikerjakan</div>' : ''}
              </div>`;
          }).join('')}
        </div>`;
    } else {
      const topics = IELTSSpeakingData.getPart3Topics();
      contentHtml = `
        <p class="section-description" style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1.25rem;line-height:1.6;">
          <strong>Part 3</strong>: Diskusi mendalam 4–5 menit. Examiner membahas topik abstrak yang berkaitan dengan Part 2.
          Latih argumen yang terstruktur dan bernuansa.
        </p>
        <div class="skill-grid">
          ${topics.map(t => {
            const done = data.results && Object.keys(data.results).some(k => k.startsWith(`part3_${t.id}`));
            return `
              <div class="skill-card" data-action="open-part3" data-id="${t.id}">
                <span class="skill-card-icon">${t.icon}</span>
                <div class="skill-card-title">${t.title}</div>
                <div class="skill-card-meta"><span>${t.questions.length} pertanyaan diskusi</span></div>
                ${done ? '<div class="skill-card-done">✓ Dikerjakan</div>' : ''}
              </div>`;
          }).join('')}
        </div>`;
    }

    _container().innerHTML = `
      <div class="skill-hero" data-icon="🎤">
        <div class="skill-hero-label">IELTS · Speaking Practice</div>
        <div class="skill-hero-title">Latihan Speaking IELTS</div>
        <div class="skill-hero-sub">3 Part · TTS Model Answers · Self-Assessment Rubrik Band 1–9</div>
      </div>

      <div class="skill-stats-bar">
        <div class="skill-stat-chip">🎤 <strong>${totalAttempts}</strong> sesi selesai</div>
        <div class="skill-stat-chip">📋 <strong>${IELTSSpeakingData.getPart1Topics().length}</strong> topik Part 1</div>
        <div class="skill-stat-chip">🃏 <strong>${IELTSSpeakingData.getPart2Cards().length}</strong> cue card</div>
        <div class="skill-stat-chip">💬 <strong>${IELTSSpeakingData.getPart3Topics().length}</strong> topik Part 3</div>
      </div>

      <div class="skill-part-tabs">${tabHtml}</div>

      ${contentHtml}

      <div style="background:var(--bg-card);border:1.5px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem 1.5rem;">
        <div style="font-size:0.9rem;font-weight:700;color:var(--text-primary);margin-bottom:0.75rem;">📊 Rubrik Penilaian IELTS Speaking</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:0.75rem;">
          ${[['Fluency & Coherence','Kelancaran berbicara, tidak sering berhenti, ide terorganisir'],
             ['Lexical Resource','Kekayaan dan ketepatan kosakata yang digunakan'],
             ['Grammatical Range','Variasi dan akurasi struktur gramatikal'],
             ['Pronunciation','Kejelasan dan naturalnya pengucapan']].map(([n,d]) => `
            <div style="border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.75rem;">
              <div style="font-size:0.78rem;font-weight:700;color:var(--color-primary);margin-bottom:0.3rem;">${n}</div>
              <div style="font-size:0.78rem;color:var(--text-secondary);line-height:1.5;">${d}</div>
            </div>`).join('')}
        </div>
      </div>
    `;

    // Events
    _container().querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        _state.activeTab = btn.dataset.tab;
        _renderMenu();
      });
    });
    _container().querySelectorAll('[data-action="open-part1"]').forEach(el => {
      el.addEventListener('click', () => _openPart1(el.dataset.id));
    });
    _container().querySelectorAll('[data-action="open-part2"]').forEach(el => {
      el.addEventListener('click', () => _openPart2(el.dataset.id));
    });
    _container().querySelectorAll('[data-action="open-part3"]').forEach(el => {
      el.addEventListener('click', () => _openPart3(el.dataset.id));
    });
  }

  // ── Part 1 Practice ────────────────────────────────────
  function _openPart1(topicId) {
    _state.view = 'part1';
    _state.topicId = topicId;
    const topic = IELTSSpeakingData.getPart1Topic(topicId);
    if (!topic) return;

    const questionsHtml = topic.questions.map((q, i) => `
      <div class="speaking-q-card" id="q-card-${q.id}">
        <div class="speaking-q-header" data-qid="${q.id}">
          <div class="speaking-q-num">${i + 1}</div>
          <div class="speaking-q-text">${q.text}</div>
          <div class="speaking-q-actions">
            <button class="btn-tts" data-tts-q="${q.id}" title="Dengarkan pertanyaan">🔊 Soal</button>
            <button class="btn-tts" data-tts-a="${q.id}" title="Dengarkan model answer">🔊 Jawaban</button>
          </div>
        </div>
        <div class="speaking-q-answer" id="answer-${q.id}" style="display:none;">
          <div class="speaking-q-answer-label">💡 Model Answer (Band 8+)</div>
          <div class="speaking-q-answer-text">${q.model}</div>
        </div>
      </div>
    `).join('');

    _container().innerHTML = `
      <div class="skill-back-bar">
        <button class="btn-back" id="back-btn">← Kembali</button>
        <span class="skill-breadcrumb">Part 1 › ${topic.title}</span>
      </div>

      <div class="speaking-part-header">
        <div class="speaking-part-header-top">
          <span class="speaking-part-label">Part 1 — Short Q&A</span>
          <span style="font-size:1.5rem">${topic.icon}</span>
        </div>
        <div class="speaking-part-title">${topic.title}</div>
        <div class="speaking-part-desc">
          Baca pertanyaan lalu jawab dengan suara. Klik 🔊 Soal untuk mendengar pertanyaan, 🔊 Jawaban untuk model answer. 
          Klik kartu untuk toggle model answer.
        </div>
      </div>

      <div class="speaking-q-list">${questionsHtml}</div>

      ${_renderRubric('part1', topicId)}

      <button class="btn-back" id="back-btn-bottom" style="margin-top:0.5rem;">← Kembali ke Menu</button>
    `;

    _bindRubricEvents('part1', topicId);

    document.getElementById('back-btn').addEventListener('click', _renderMenu);
    document.getElementById('back-btn-bottom').addEventListener('click', _renderMenu);

    topic.questions.forEach(q => {
      // Toggle answer
      const header = _container().querySelector(`[data-qid="${q.id}"]`);
      if (header) {
        header.addEventListener('click', (e) => {
          if (e.target.closest('.btn-tts')) return;
          const ans = document.getElementById(`answer-${q.id}`);
          if (ans) ans.style.display = ans.style.display === 'none' ? 'block' : 'none';
        });
      }

      // TTS question
      const btnQ = _container().querySelector(`[data-tts-q="${q.id}"]`);
      if (btnQ) btnQ.addEventListener('click', () => _speak(q.text, btnQ));

      // TTS model answer
      const btnA = _container().querySelector(`[data-tts-a="${q.id}"]`);
      if (btnA) btnA.addEventListener('click', () => _speak(q.model, btnA));
    });

    XPSystem.addXP(5, 'IELTS Speaking Part 1');
    ChallengeSystem.onModuleVisit('ielts-speaking');
  }

  // ── Part 2 Practice ────────────────────────────────────
  function _openPart2(cardId) {
    _state.view = 'part2';
    _state.cardId = cardId;
    const card = IELTSSpeakingData.getPart2Card(cardId);
    if (!card) return;

    _container().innerHTML = `
      <div class="skill-back-bar">
        <button class="btn-back" id="back-btn">← Kembali</button>
        <span class="skill-breadcrumb">Part 2 — Long Turn</span>
      </div>

      <div class="speaking-part-header">
        <div class="speaking-part-header-top">
          <span class="speaking-part-label">Part 2 — Long Turn</span>
          <span style="font-size:1.5rem">${card.icon}</span>
        </div>
        <div class="speaking-part-title">${card.title}</div>
        <div class="speaking-part-desc">
          Persiapkan selama ${card.prepTime} detik (Phase 1), lalu bicara selama ${card.speakTime} detik (Phase 2). 
          Gunakan timer di bawah untuk mensimulasikan kondisi ujian nyata.
        </div>
      </div>

      <div class="cue-card">
        <div class="cue-card-header">🃏 Cue Card</div>
        <div class="cue-card-prompt">${card.prompt}</div>
        <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:0.5rem;">You should say:</div>
        <ul class="cue-card-points">
          ${card.cues.map(c => `<li>${c}</li>`).join('')}
        </ul>
        <div class="cue-card-note">Buat catatan singkat di kertas selama persiapan. Kamu boleh melihat catatan saat bicara.</div>
      </div>

      <div class="speaking-timer-wrap" id="timer-phase-1">
        <div>
          <div class="speaking-timer-label">⏱ Phase 1 — Preparation Time</div>
          <div style="font-size:0.75rem;color:var(--text-secondary);">Buat catatan singkat tentang apa yang akan kamu sampaikan</div>
        </div>
        <div class="speaking-timer-display" id="timer-display-1">${card.prepTime}:00</div>
        <button class="btn-timer-start" id="start-prep-btn">▶ Mulai</button>
        <button class="btn-timer-reset" id="reset-prep-btn">↺</button>
      </div>

      <div class="speaking-timer-wrap" id="timer-phase-2">
        <div>
          <div class="speaking-timer-label">🎤 Phase 2 — Speaking Time</div>
          <div style="font-size:0.75rem;color:var(--text-secondary);">Bicara selama ${Math.floor(card.speakTime/60)}–${Math.ceil(card.speakTime/60)} menit menggunakan catatan dari Phase 1</div>
        </div>
        <div class="speaking-timer-display" id="timer-display-2">${Math.floor(card.speakTime/60)}:00</div>
        <button class="btn-timer-start" id="start-speak-btn">▶ Mulai</button>
        <button class="btn-timer-reset" id="reset-speak-btn">↺</button>
      </div>

      <div class="model-answer-wrap">
        <button class="model-answer-toggle" id="model-toggle">
          💡 Lihat Model Answer (Band 8+)
          <span class="model-answer-toggle-icon">▼</span>
        </button>
        <div class="model-answer-body" id="model-body">
          <div style="padding-top:1rem;display:flex;gap:0.75rem;margin-bottom:0.75rem;">
            <button class="btn-tts" id="tts-model-btn">🔊 Dengarkan Model Answer</button>
          </div>
          <div class="model-answer-text">${card.model}</div>
        </div>
      </div>

      ${_renderRubric('part2', cardId)}

      <button class="btn-back" id="back-btn-bottom" style="margin-top:0.5rem;">← Kembali ke Menu</button>
    `;

    // Timer display init
    const disp1 = document.getElementById('timer-display-1');
    const disp2 = document.getElementById('timer-display-2');
    if (disp1) { const m = Math.floor(card.prepTime/60); const s = card.prepTime%60; disp1.textContent = `${m}:${s.toString().padStart(2,'0')}`; }
    if (disp2) { const m = Math.floor(card.speakTime/60); const s = card.speakTime%60; disp2.textContent = `${m}:${s.toString().padStart(2,'0')}`; }

    document.getElementById('back-btn').addEventListener('click', _renderMenu);
    document.getElementById('back-btn-bottom').addEventListener('click', _renderMenu);

    document.getElementById('start-prep-btn').addEventListener('click', () => {
      _startTimer(card.prepTime, 'timer-display-1', () => App.showToast('Waktu persiapan selesai! Mulai bicara.', 'info'));
    });
    document.getElementById('reset-prep-btn').addEventListener('click', () => {
      _stopTimer();
      const m = Math.floor(card.prepTime/60); const s = card.prepTime%60;
      if (disp1) { disp1.textContent = `${m}:${s.toString().padStart(2,'0')}`; disp1.className = 'speaking-timer-display'; }
    });
    document.getElementById('start-speak-btn').addEventListener('click', () => {
      _startTimer(card.speakTime, 'timer-display-2', () => App.showToast('Waktu bicara habis! Buat self-assessment di bawah.', 'info'));
    });
    document.getElementById('reset-speak-btn').addEventListener('click', () => {
      _stopTimer();
      const m = Math.floor(card.speakTime/60); const s = card.speakTime%60;
      if (disp2) { disp2.textContent = `${m}:${s.toString().padStart(2,'0')}`; disp2.className = 'speaking-timer-display'; }
    });

    const modelToggle = document.getElementById('model-toggle');
    const modelBody = document.getElementById('model-body');
    modelToggle.addEventListener('click', () => {
      modelToggle.classList.toggle('open');
      modelBody.classList.toggle('visible');
    });

    document.getElementById('tts-model-btn').addEventListener('click', () => {
      _speak(card.model, document.getElementById('tts-model-btn'));
    });

    _bindRubricEvents('part2', cardId);
    XPSystem.addXP(5, 'IELTS Speaking Part 2');
    ChallengeSystem.onModuleVisit('ielts-speaking');
  }

  // ── Part 3 Practice ────────────────────────────────────
  function _openPart3(topicId) {
    _state.view = 'part3';
    _state.part3TopicId = topicId;
    const topic = IELTSSpeakingData.getPart3Topic(topicId);
    if (!topic) return;

    const questionsHtml = topic.questions.map((q, i) => `
      <div class="speaking-q-card" id="q3-card-${q.id}">
        <div class="speaking-q-header" data-q3id="${q.id}">
          <div class="speaking-q-num">${i + 1}</div>
          <div class="speaking-q-text">${q.text}</div>
          <div class="speaking-q-actions">
            <button class="btn-tts" data-tts-q3="${q.id}">🔊 Soal</button>
            <button class="btn-tts" data-tts-a3="${q.id}">🔊 Jawaban</button>
          </div>
        </div>
        <div class="speaking-q-answer" id="answer3-${q.id}" style="display:none;">
          <div class="speaking-q-answer-label">💡 Model Answer (Band 8+)</div>
          <div class="speaking-q-answer-text">${q.model}</div>
        </div>
      </div>
    `).join('');

    _container().innerHTML = `
      <div class="skill-back-bar">
        <button class="btn-back" id="back-btn">← Kembali</button>
        <span class="skill-breadcrumb">Part 3 › ${topic.title}</span>
      </div>

      <div class="speaking-part-header">
        <div class="speaking-part-header-top">
          <span class="speaking-part-label">Part 3 — Discussion</span>
          <span style="font-size:1.5rem">${topic.icon}</span>
        </div>
        <div class="speaking-part-title">${topic.title}</div>
        <div class="speaking-part-desc">
          Part 3 menguji kemampuanmu berdiskusi tentang isu abstrak dan sosial. 
          Jawab dengan argumen yang terstruktur — berikan pandangan, jelaskan alasan, dan berikan contoh spesifik.
        </div>
      </div>

      <div style="background:var(--bg-card);border:1.5px solid var(--border);border-radius:var(--radius-lg);padding:1rem 1.25rem;margin-bottom:1.25rem;">
        <div style="font-size:0.82rem;font-weight:700;color:var(--text-primary);margin-bottom:0.5rem;">💡 Tips Part 3:</div>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.3rem;">
          ${['Berikan opini yang jelas lalu dukung dengan alasan kuat',
             'Gunakan structure: "I think... because... For example..."',
             'Gunakan hedging language: "It could be argued that...", "In many cases..."',
             'Perluas jawaban — jangan hanya ya/tidak, beri nuansa'].map(t => `
            <li style="font-size:0.8rem;color:var(--text-secondary);padding-left:1rem;position:relative;">
              <span style="position:absolute;left:0;color:var(--color-primary);">▸</span>${t}
            </li>`).join('')}
        </ul>
      </div>

      <div class="speaking-q-list">${questionsHtml}</div>

      ${_renderRubric('part3', topicId)}

      <button class="btn-back" id="back-btn-bottom" style="margin-top:0.5rem;">← Kembali ke Menu</button>
    `;

    document.getElementById('back-btn').addEventListener('click', _renderMenu);
    document.getElementById('back-btn-bottom').addEventListener('click', _renderMenu);

    topic.questions.forEach(q => {
      const header = _container().querySelector(`[data-q3id="${q.id}"]`);
      if (header) {
        header.addEventListener('click', (e) => {
          if (e.target.closest('.btn-tts')) return;
          const ans = document.getElementById(`answer3-${q.id}`);
          if (ans) ans.style.display = ans.style.display === 'none' ? 'block' : 'none';
        });
      }
      const btnQ = _container().querySelector(`[data-tts-q3="${q.id}"]`);
      if (btnQ) btnQ.addEventListener('click', () => _speak(q.text, btnQ));
      const btnA = _container().querySelector(`[data-tts-a3="${q.id}"]`);
      if (btnA) btnA.addEventListener('click', () => _speak(q.model, btnA));
    });

    _bindRubricEvents('part3', topicId);
    XPSystem.addXP(5, 'IELTS Speaking Part 3');
    ChallengeSystem.onModuleVisit('ielts-speaking');
  }

  // ── Self-Assessment Rubric ─────────────────────────────
  function _renderRubric(part, itemId) {
    const prev = _getAttempts(part, itemId);
    const prevBand = prev ? prev.lastSelfBand : null;

    const criteria = [
      { id: 'fluency', name: 'Fluency & Coherence', default: 5 },
      { id: 'vocab', name: 'Lexical Resource', default: 5 },
      { id: 'grammar', name: 'Grammatical Range', default: 5 },
      { id: 'pronunciation', name: 'Pronunciation', default: 5 }
    ];

    return `
      <div class="rubric-section" id="rubric-section">
        <div class="rubric-title">📊 Self-Assessment</div>
        <div class="rubric-subtitle">Nilai dirimu sendiri berdasarkan 4 kriteria IELTS Speaking (Skala 1–9)</div>
        <div class="rubric-criteria">
          ${criteria.map(c => `
            <div class="rubric-criterion">
              <div class="rubric-criterion-header">
                <div class="rubric-criterion-name">${c.name}</div>
                <div class="rubric-criterion-score" id="score-${c.id}">Band ${c.default}</div>
              </div>
              <input type="range" class="rubric-slider" id="slider-${c.id}"
                min="1" max="9" step="0.5" value="${c.default}" data-criterion="${c.id}">
              <div class="rubric-scale-labels">
                <span>1 (Non-user)</span>
                <span>5 (Modest)</span>
                <span>9 (Expert)</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="rubric-avg-band">
          <div class="rubric-avg-label">Estimasi Band Rata-rata</div>
          <div class="rubric-avg-value" id="rubric-avg-display">5.0</div>
        </div>
        ${prev ? `<div style="font-size:0.8rem;color:var(--text-secondary);margin-top:0.5rem;">Sesi sebelumnya: Band ${prev.lastSelfBand} · ${prev.attempts} kali percobaan</div>` : ''}
        <button class="btn-save-assessment" id="save-assessment-btn">✅ Simpan Self-Assessment</button>
      </div>
    `;
  }

  function _bindRubricEvents(part, itemId) {
    const criteria = ['fluency', 'vocab', 'grammar', 'pronunciation'];

    function _updateAvg() {
      let total = 0;
      criteria.forEach(c => {
        const slider = document.getElementById(`slider-${c}`);
        const scoreEl = document.getElementById(`score-${c}`);
        if (slider) {
          const val = parseFloat(slider.value);
          total += val;
          if (scoreEl) scoreEl.textContent = `Band ${val}`;
        }
      });
      const avg = (total / criteria.length).toFixed(1);
      const avgEl = document.getElementById('rubric-avg-display');
      if (avgEl) avgEl.textContent = avg;
      return avg;
    }

    criteria.forEach(c => {
      const slider = document.getElementById(`slider-${c}`);
      if (slider) slider.addEventListener('input', _updateAvg);
    });

    const saveBtn = document.getElementById('save-assessment-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const avgBand = parseFloat(_updateAvg());
        _saveAttempt(part, itemId, avgBand);
        XPSystem.addXP(10, 'IELTS Speaking Self-Assessment');
        ChallengeSystem.onQuizComplete('ielts-speaking', true, 10);
        App.showToast(`✅ Self-assessment disimpan! Estimasi Band: ${avgBand}`, 'success');
        saveBtn.textContent = '✅ Tersimpan!';
        saveBtn.disabled = true;
        setTimeout(() => { saveBtn.textContent = '✅ Simpan Self-Assessment'; saveBtn.disabled = false; }, 2000);
      });
    }
  }

  // ── Public API ─────────────────────────────────────────
  return {
    init() {
      Router.guard();
      App.init('ielts-speaking');
      ChallengeSystem.onModuleVisit('ielts-speaking');
      _renderMenu();
    }
  };

})();
