/**
 * EnglishPath — IELTS Writing Module
 * Fase 13c-1: Practice per Skill — Writing
 * localStorage: ep_user_{id}_ielts_writing
 */
const IELTSWriting = (() => {

  // ── State ──────────────────────────────────────────────
  let _state = {
    view: 'menu',        // menu | task1-academic | task1-general | task2
    activeTab: 'task1-academic',
    taskId: null,
    wordCountInterval: null
  };

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  // ── Storage ────────────────────────────────────────────
  function _loadData() {
    const uid = _uid();
    if (!uid) return {};
    return Storage.getUser(uid, 'ielts_writing') || {};
  }

  function _saveAttempt(taskType, taskId, wordCount, draft) {
    const uid = _uid();
    if (!uid) return;
    const data = _loadData();
    if (!data.results) data.results = {};
    const key = `${taskType}_${taskId}`;
    const prev = data.results[key] || { attempts: 0 };
    data.results[key] = {
      attempts: prev.attempts + 1,
      lastWordCount: wordCount,
      lastDate: new Date().toISOString().split('T')[0],
      lastDraft: draft.substring(0, 500)
    };
    if (!data.totalAttempts) data.totalAttempts = 0;
    data.totalAttempts += 1;
    Storage.setUser(uid, 'ielts_writing', data);
  }

  function _getAttempts(taskType, taskId) {
    const data = _loadData();
    if (!data.results) return null;
    return data.results[`${taskType}_${taskId}`] || null;
  }

  // ── Word Count Helper ──────────────────────────────────
  function _countWords(text) {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  }

  function _setupWordCount(textareaId, displayId, minWords) {
    const ta = document.getElementById(textareaId);
    const disp = document.getElementById(displayId);
    if (!ta || !disp) return;

    function _update() {
      const wc = _countWords(ta.value);
      const met = wc >= minWords;
      const over = wc > minWords * 1.5;
      disp.innerHTML = `<span class="wc-num ${met ? 'wc-met' : over ? 'wc-over' : 'wc-below'}">${wc}</span> <span class="wc-target">kata (min. ${minWords})</span>`;
    }

    ta.addEventListener('input', _update);
    _update();
  }

  // ── Main Container ──────────────────────────────────────
  function _container() {
    return document.getElementById('writing-content');
  }

  // ── Menu ───────────────────────────────────────────────
  function _renderMenu() {
    _state.view = 'menu';
    const data = _loadData();
    const totalAttempts = data.totalAttempts || 0;

    const tabs = [
      { id: 'task1-academic', label: 'Task 1 — Academic' },
      { id: 'task1-general', label: 'Task 1 — General Training' },
      { id: 'task2', label: 'Task 2 — Essay' }
    ];

    const tabHtml = tabs.map(t => `
      <button class="writing-filter-tab ${_state.activeTab === t.id ? 'active' : ''}" data-tab="${t.id}">${t.label}</button>
    `).join('');

    let contentHtml = '';

    if (_state.activeTab === 'task1-academic') {
      const tasks = IELTSWritingData.getTask1Academic();
      contentHtml = `
        <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1.25rem;line-height:1.6;">
          <strong>Task 1 Academic:</strong> Deskripsikan data dari grafik, diagram, atau tabel. Minimal <strong>150 kata</strong> dalam 20 menit.
          Tulis overview, lalu beri detil spesifik dengan angka.
        </p>
        <div class="skill-grid">
          ${tasks.map(t => {
            const done = _getAttempts('t1a', t.id);
            return `
              <div class="skill-card" data-action="open-task" data-type="t1a" data-id="${t.id}">
                <span class="skill-card-icon">${t.icon}</span>
                <div class="skill-card-title">${t.title}</div>
                <div class="skill-card-meta">
                  <span class="skill-card-badge badge-${t.difficulty}">${t.difficulty}</span>
                  <span>${t.type.replace('_', ' ')}</span>
                  <span>⏱ ${t.timeLimit} min</span>
                  ${done ? `<span style="color:var(--color-primary);">${done.lastWordCount} kata</span>` : ''}
                </div>
                ${done ? '<div class="skill-card-done">✓ Dikerjakan</div>' : ''}
              </div>`;
          }).join('')}
        </div>`;
    } else if (_state.activeTab === 'task1-general') {
      const tasks = IELTSWritingData.getTask1General();
      contentHtml = `
        <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1.25rem;line-height:1.6;">
          <strong>Task 1 General Training:</strong> Tulis surat (formal, semi-formal, atau informal) dengan minimal <strong>150 kata</strong> dalam 20 menit.
          Sesuaikan register dengan konteks dan penerima surat.
        </p>
        <div class="skill-grid">
          ${tasks.map(t => {
            const done = _getAttempts('t1g', t.id);
            const regClass = { formal: 'register-formal', 'semi-formal': 'register-semi', informal: 'register-informal' }[t.register] || '';
            return `
              <div class="skill-card" data-action="open-task" data-type="t1g" data-id="${t.id}">
                <span class="skill-card-icon">${t.icon}</span>
                <div class="skill-card-title">${t.title}</div>
                <div class="skill-card-meta">
                  <span class="register-tag ${regClass}">${t.register}</span>
                  <span>⏱ ${t.timeLimit} min</span>
                  ${done ? `<span style="color:var(--color-primary);">${done.lastWordCount} kata</span>` : ''}
                </div>
                ${done ? '<div class="skill-card-done">✓ Dikerjakan</div>' : ''}
              </div>`;
          }).join('')}
        </div>`;
    } else {
      const essays = IELTSWritingData.getTask2Essays();
      contentHtml = `
        <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1.25rem;line-height:1.6;">
          <strong>Task 2:</strong> Tulis esai argumentatif dengan minimal <strong>250 kata</strong> dalam 40 menit.
          Rencanakan argumen sebelum menulis — gunakan guided planning yang tersedia.
        </p>
        <div class="skill-grid">
          ${essays.map(e => {
            const done = _getAttempts('t2', e.id);
            return `
              <div class="skill-card" data-action="open-task" data-type="t2" data-id="${e.id}">
                <span class="skill-card-icon">${e.icon}</span>
                <div class="skill-card-title">${e.title}</div>
                <div class="skill-card-meta">
                  <span class="essay-type-tag">${e.type_label}</span>
                  <span>⏱ ${e.timeLimit} min</span>
                  ${done ? `<span style="color:var(--color-primary);">${done.lastWordCount} kata</span>` : ''}
                </div>
                ${done ? '<div class="skill-card-done">✓ Dikerjakan</div>' : ''}
              </div>`;
          }).join('')}
        </div>`;
    }

    _container().innerHTML = `
      <div class="skill-hero" data-icon="✍️">
        <div class="skill-hero-label">IELTS · Writing Practice</div>
        <div class="skill-hero-title">Latihan Writing IELTS</div>
        <div class="skill-hero-sub">Task 1 Academic · Task 1 General · Task 2 Essay · Word Count Real-time · Rubrik</div>
      </div>

      <div class="skill-stats-bar">
        <div class="skill-stat-chip">✍️ <strong>${totalAttempts}</strong> tugas selesai</div>
        <div class="skill-stat-chip">📊 <strong>${IELTSWritingData.getTask1Academic().length}</strong> Task 1 Academic</div>
        <div class="skill-stat-chip">📩 <strong>${IELTSWritingData.getTask1General().length}</strong> Task 1 General</div>
        <div class="skill-stat-chip">📝 <strong>${IELTSWritingData.getTask2Essays().length}</strong> Task 2 Essay</div>
      </div>

      <div class="writing-filter-tabs">${tabHtml}</div>

      ${contentHtml}

      <div style="background:var(--bg-card);border:1.5px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem 1.5rem;">
        <div style="font-size:0.9rem;font-weight:700;color:var(--text-primary);margin-bottom:0.75rem;">📊 Rubrik IELTS Writing (4 Kriteria)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0.75rem;">
          ${[['Task Achievement/Response','Sejauh mana tugas terpenuhi; relevansi ide'],
             ['Coherence & Cohesion','Logika paragraf; penggunaan kata penghubung'],
             ['Lexical Resource','Kosakata yang beragam, tepat, dan akurat'],
             ['Grammatical Range','Variasi dan akurasi struktur gramatikal']].map(([n,d]) => `
            <div style="border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.75rem;">
              <div style="font-size:0.78rem;font-weight:700;color:var(--color-primary);margin-bottom:0.3rem;">${n}</div>
              <div style="font-size:0.78rem;color:var(--text-secondary);line-height:1.5;">${d}</div>
            </div>`).join('')}
        </div>
      </div>
    `;

    _container().querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        _state.activeTab = btn.dataset.tab;
        _renderMenu();
      });
    });

    _container().querySelectorAll('[data-action="open-task"]').forEach(el => {
      el.addEventListener('click', () => {
        const type = el.dataset.type;
        const id = el.dataset.id;
        if (type === 't1a') _openTask1Academic(id);
        else if (type === 't1g') _openTask1General(id);
        else if (type === 't2') _openTask2(id);
      });
    });
  }

  // ── Task 1 Academic ────────────────────────────────────
  function _openTask1Academic(taskId) {
    _state.view = 'task1-academic';
    _state.taskId = taskId;
    const task = IELTSWritingData.getTask1AcademicById(taskId);
    if (!task) return;
    const prev = _getAttempts('t1a', taskId);

    const dataHtml = task.textData.map(d => `<li>${d}</li>`).join('');
    const keyFeaturesHtml = task.keyFeatures.map(f => `<li>${f}</li>`).join('');
    const tipsHtml = task.scoringTips.map(t => `<li>${t}</li>`).join('');

    _container().innerHTML = `
      <div class="skill-back-bar">
        <button class="btn-back" id="back-btn">← Kembali</button>
        <span class="skill-breadcrumb">Task 1 Academic › ${task.title}</span>
      </div>

      <div class="writing-task-info">
        <div class="writing-task-label">📊 Task 1 — Academic Writing · Min. ${task.minWords} kata · ${task.timeLimit} menit</div>
        <div class="writing-task-question">${task.description}</div>
      </div>

      <div class="writing-chart-visual">
        <div class="writing-chart-title">${task.icon} ${task.title} — Data</div>
        <ul class="writing-data-list">${dataHtml}</ul>
        <div class="writing-key-features">
          <div class="writing-key-features-label">Fitur Kunci yang Harus Disebutkan</div>
          <ul>${keyFeaturesHtml}</ul>
        </div>
      </div>

      <div class="writing-editor-wrap">
        <div class="writing-editor-toolbar">
          <div class="writing-word-count-display" id="wc-display-t1a">
            <span class="wc-num wc-below">0</span> <span class="wc-target">kata (min. ${task.minWords})</span>
          </div>
          <div style="margin-left:auto;font-size:0.78rem;color:var(--text-secondary);">⏱ ${task.timeLimit} menit</div>
        </div>
        <textarea class="writing-textarea" id="writing-ta-t1a"
          placeholder="Tulis jawaban Task 1 Academic kamu di sini. Mulai dengan overview, lalu beri detail spesifik dengan angka dari data..."
          rows="12">${prev && prev.lastDraft ? prev.lastDraft : ''}</textarea>
      </div>

      <div class="writing-action-bar">
        <button class="btn-submit-writing" id="submit-t1a-btn">✅ Simpan Jawaban</button>
        <button class="btn-clear-writing" id="clear-t1a-btn">🗑 Hapus</button>
      </div>

      ${_renderModelAnswer(task.model)}
      ${_renderScoringTips(tipsHtml)}

      <button class="btn-back" id="back-btn-bottom" style="margin-top:0.5rem;">← Kembali ke Menu</button>
    `;

    _setupWordCount('writing-ta-t1a', 'wc-display-t1a', task.minWords);
    _bindWritingEvents('t1a', taskId, 'writing-ta-t1a', task.minWords);
  }

  // ── Task 1 General Training ────────────────────────────
  function _openTask1General(taskId) {
    _state.view = 'task1-general';
    _state.taskId = taskId;
    const task = IELTSWritingData.getTask1GeneralById(taskId);
    if (!task) return;
    const prev = _getAttempts('t1g', taskId);

    const regClass = { formal: 'register-formal', 'semi-formal': 'register-semi', informal: 'register-informal' }[task.register] || '';
    const bulletHtml = task.bulletPoints.map(b => `<li>${b}</li>`).join('');
    const featuresHtml = task.features.map(f => `<li>${f}</li>`).join('');
    const tipsHtml = task.scoringTips.map(t => `<li>${t}</li>`).join('');

    _container().innerHTML = `
      <div class="skill-back-bar">
        <button class="btn-back" id="back-btn">← Kembali</button>
        <span class="skill-breadcrumb">Task 1 General › ${task.title}</span>
      </div>

      <div class="writing-task-info">
        <div class="writing-task-label">
          📩 Task 1 — General Training · <span class="register-tag ${regClass}">${task.register}</span> · Min. ${task.minWords} kata · ${task.timeLimit} menit
        </div>
        <div class="writing-task-question" style="margin-top:0.75rem;">${task.situation}</div>
        <div style="margin-top:0.75rem;font-size:0.82rem;font-weight:700;color:var(--text-secondary);">In your letter:</div>
        <ul class="writing-bullets">${bulletHtml}</ul>
      </div>

      <div class="writing-key-features" style="background:var(--bg-card);border:1.5px solid var(--border);border-radius:var(--radius-lg);padding:1rem 1.25rem;margin-bottom:1.25rem;">
        <div class="writing-key-features-label">📋 Fitur Kunci Surat ${task.register.charAt(0).toUpperCase() + task.register.slice(1)}</div>
        <ul>${featuresHtml}</ul>
      </div>

      <div class="writing-editor-wrap">
        <div class="writing-editor-toolbar">
          <div class="writing-word-count-display" id="wc-display-t1g">
            <span class="wc-num wc-below">0</span> <span class="wc-target">kata (min. ${task.minWords})</span>
          </div>
          <div style="margin-left:auto;font-size:0.78rem;color:var(--text-secondary);">⏱ ${task.timeLimit} menit</div>
        </div>
        <textarea class="writing-textarea" id="writing-ta-t1g"
          placeholder="Tulis surat kamu di sini. Gunakan register yang sesuai: ${task.register}..."
          rows="14">${prev && prev.lastDraft ? prev.lastDraft : ''}</textarea>
      </div>

      <div class="writing-action-bar">
        <button class="btn-submit-writing" id="submit-t1g-btn">✅ Simpan Jawaban</button>
        <button class="btn-clear-writing" id="clear-t1g-btn">🗑 Hapus</button>
      </div>

      ${_renderModelAnswer(task.model)}
      ${_renderScoringTips(tipsHtml)}

      <button class="btn-back" id="back-btn-bottom" style="margin-top:0.5rem;">← Kembali ke Menu</button>
    `;

    _setupWordCount('writing-ta-t1g', 'wc-display-t1g', task.minWords);
    _bindWritingEvents('t1g', taskId, 'writing-ta-t1g', task.minWords);
  }

  // ── Task 2 Essay ───────────────────────────────────────
  function _openTask2(taskId) {
    _state.view = 'task2';
    _state.taskId = taskId;
    const task = IELTSWritingData.getTask2EssayById(taskId);
    if (!task) return;
    const prev = _getAttempts('t2', taskId);

    const planPromptsHtml = task.planningPrompts.map(p => `<li>${p}</li>`).join('');
    const rubricHtml = task.rubric.map(r => `
      <div class="writing-rubric-item">
        <div class="writing-rubric-item-name">${r.criterion}</div>
        <div class="writing-rubric-item-desc">${r.description}</div>
      </div>`).join('');

    _container().innerHTML = `
      <div class="skill-back-bar">
        <button class="btn-back" id="back-btn">← Kembali</button>
        <span class="skill-breadcrumb">Task 2 › ${task.title}</span>
      </div>

      <div class="writing-task-info">
        <div class="writing-task-label">
          📝 Task 2 — Essay · <span class="essay-type-tag">${task.type_label}</span> · Min. ${task.minWords} kata · ${task.timeLimit} menit
        </div>
        <div class="writing-task-question" style="margin-top:0.75rem;">${task.question}</div>
      </div>

      <div class="writing-planning-wrap">
        <div class="writing-planning-title">🧠 Guided Planning (opsional)</div>
        <ul class="writing-planning-prompts">${planPromptsHtml}</ul>
        <textarea class="writing-planning-notes" id="planning-notes" placeholder="Buat outline atau catatan ide kamu di sini sebelum menulis esai..."></textarea>
      </div>

      <div class="writing-editor-wrap">
        <div class="writing-editor-toolbar">
          <div class="writing-word-count-display" id="wc-display-t2">
            <span class="wc-num wc-below">0</span> <span class="wc-target">kata (min. ${task.minWords})</span>
          </div>
          <div style="margin-left:auto;font-size:0.78rem;color:var(--text-secondary);">⏱ ${task.timeLimit} menit</div>
        </div>
        <textarea class="writing-textarea" id="writing-ta-t2"
          placeholder="Tulis esai Task 2 kamu di sini. Saran struktur: Intro (1 paragraf) → Body 1 (argumen utama) → Body 2 (sisi lain / pengembangan) → Conclusion..."
          rows="16">${prev && prev.lastDraft ? prev.lastDraft : ''}</textarea>
      </div>

      <div class="writing-action-bar">
        <button class="btn-submit-writing" id="submit-t2-btn">✅ Simpan Jawaban</button>
        <button class="btn-clear-writing" id="clear-t2-btn">🗑 Hapus</button>
      </div>

      <div class="writing-rubric-wrap">
        <div class="writing-rubric-title">📊 Rubrik Penilaian Task 2</div>
        <div class="writing-rubric-grid">${rubricHtml}</div>
      </div>

      ${_renderModelAnswer(task.model)}

      <button class="btn-back" id="back-btn-bottom" style="margin-top:0.5rem;">← Kembali ke Menu</button>
    `;

    _setupWordCount('writing-ta-t2', 'wc-display-t2', task.minWords);
    _bindWritingEvents('t2', taskId, 'writing-ta-t2', task.minWords);
  }

  // ── Shared Render Helpers ──────────────────────────────
  function _renderModelAnswer(modelText) {
    return `
      <div class="model-answer-wrap">
        <button class="model-answer-toggle" id="model-toggle">
          💡 Lihat Model Answer (Band 8+)
          <span class="model-answer-toggle-icon">▼</span>
        </button>
        <div class="model-answer-body" id="model-body">
          <div class="model-answer-text" style="margin-top:1rem;">${modelText.replace(/\n/g, '<br>')}</div>
        </div>
      </div>
    `;
  }

  function _renderScoringTips(tipsHtml) {
    return `
      <div class="writing-tips-wrap">
        <div class="writing-tips-title">💡 Tips Penilaian</div>
        <ul class="writing-tips-list">${tipsHtml}</ul>
      </div>
    `;
  }

  function _bindWritingEvents(taskType, taskId, taId, minWords) {
    document.getElementById('back-btn').addEventListener('click', _renderMenu);
    document.getElementById('back-btn-bottom').addEventListener('click', _renderMenu);

    const submitId = `submit-${taskType}-btn`;
    const clearId = `clear-${taskType}-btn`;

    document.getElementById(submitId).addEventListener('click', () => {
      const ta = document.getElementById(taId);
      if (!ta) return;
      const wc = _countWords(ta.value);
      if (wc < 10) { App.showToast('Tulis beberapa kalimat dulu sebelum menyimpan.', 'warning'); return; }
      _saveAttempt(taskType, taskId, wc, ta.value);
      XPSystem.addXP(15, `IELTS Writing ${taskType.toUpperCase()}`);
      ChallengeSystem.onQuizComplete('ielts-writing', wc >= minWords, wc);
      ChallengeSystem.onModuleVisit('ielts-writing');
      const met = wc >= minWords;
      App.showToast(
        met ? `✅ Tersimpan! ${wc} kata — memenuhi batas minimum ${minWords} kata.` :
              `💾 Tersimpan! ${wc} kata — perlu ${minWords - wc} kata lagi untuk mencapai minimum.`,
        met ? 'success' : 'warning'
      );

      // Show saved banner
      const actionBar = document.querySelector('.writing-action-bar');
      if (actionBar) {
        const banner = document.createElement('div');
        banner.className = 'writing-saved-banner';
        banner.innerHTML = `✅ Jawaban disimpan · ${wc} kata · ${new Date().toLocaleDateString('id-ID')}`;
        actionBar.insertAdjacentElement('afterend', banner);
      }
    });

    document.getElementById(clearId).addEventListener('click', () => {
      if (!confirm('Hapus semua teks yang sudah kamu tulis?')) return;
      const ta = document.getElementById(taId);
      if (ta) { ta.value = ''; ta.dispatchEvent(new Event('input')); }
    });

    const modelToggle = document.getElementById('model-toggle');
    const modelBody = document.getElementById('model-body');
    if (modelToggle && modelBody) {
      modelToggle.addEventListener('click', () => {
        modelToggle.classList.toggle('open');
        modelBody.classList.toggle('visible');
      });
    }
  }

  // ── Public API ─────────────────────────────────────────
  return {
    init() {
      Router.guard();
      App.init('ielts-writing');
      ChallengeSystem.onModuleVisit('ielts-writing');
      _renderMenu();
    }
  };

})();
