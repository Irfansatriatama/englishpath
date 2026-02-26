/**
 * EnglishPath — Onboarding Wizard
 * 5-step wizard: Welcome → Target → Daily Goal → Placement Test → Result
 */

// Auth guard
Router.guard();

// Redirect if already completed
(function() {
  const session = Auth.getSession();
  if (session) {
    const ob = Storage.getUser(session.userId, 'onboarding', {});
    if (ob.completed) {
      window.location.href = getBase() + 'pages/dashboard.html';
    }
  }
})();

const Onboarding = (function() {

  const TOTAL_STEPS  = 5;
  const STEP_LABELS  = ['Selamat Datang', 'Tujuan Belajar', 'Target Harian', 'Placement Test', 'Hasil'];

  let currentStep    = 1;
  let selectedTarget = null;
  let selectedGoal   = null;
  let testAnswers    = [];
  let selectedOpt    = null;
  let currentQIdx    = 0;
  let answered       = false;

  // ── Utility ──────────────────────────────────────────────
  function _esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function $(id) { return document.getElementById(id); }

  // ── Progress ──────────────────────────────────────────────
  function updateProgress(step) {
    const pct = Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100);
    $('ob-progress-fill').style.width    = pct + '%';
    $('ob-progress-pct').textContent     = pct + '%';
    $('ob-step-text').textContent        = `Langkah ${step} dari ${TOTAL_STEPS}`;
    $('ob-progress-label').textContent   = STEP_LABELS[step - 1] || '';
  }

  // ── Container render ──────────────────────────────────────
  function setHTML(html) {
    $('ob-step-container').innerHTML = html;
  }

  // ── STEP 1: Welcome ───────────────────────────────────────
  function renderWelcome() {
    const user = Auth.getActiveUser();
    const name = user ? user.name.split(' ')[0] : 'Kamu';
    setHTML(`
<div class="ob-card">
  <div class="ob-welcome-icon">👋</div>
  <h1 class="ob-welcome-title">Selamat Datang, ${_esc(name)}!</h1>
  <p class="ob-welcome-sub">
    Sebelum mulai belajar, kami akan membantu kamu memilih jalur yang tepat
    dan mengukur level bahasa Inggrismu saat ini.
  </p>
  <ul class="ob-feature-list">
    <li class="ob-feature-item">
      <span class="ob-feature-icon">🎯</span>
      <div class="ob-feature-text">
        <strong>Jalur A1 hingga C2</strong>
        <span>Kurikulum terstruktur sesuai standar CEFR internasional</span>
      </div>
    </li>
    <li class="ob-feature-item">
      <span class="ob-feature-icon">📊</span>
      <div class="ob-feature-text">
        <strong>Placement Test</strong>
        <span>20 soal untuk menentukan level awal belajarmu</span>
      </div>
    </li>
    <li class="ob-feature-item">
      <span class="ob-feature-icon">🏆</span>
      <div class="ob-feature-text">
        <strong>Persiapan Tes Internasional</strong>
        <span>IELTS, TOEIC, TOEFL iBT, dan Cambridge</span>
      </div>
    </li>
    <li class="ob-feature-item">
      <span class="ob-feature-icon">✨</span>
      <div class="ob-feature-text">
        <strong>Gamifikasi Lengkap</strong>
        <span>XP, Level, Badge, Streak — belajar jadi menyenangkan</span>
      </div>
    </li>
  </ul>
  <button class="ob-btn-primary" id="btn-welcome-next">Ayo Mulai! →</button>
  <div class="ob-skip-link">
    <button id="btn-skip-all">Lewati semua — langsung ke dashboard</button>
  </div>
</div>`);

    $('btn-welcome-next').onclick = () => goStep(2);
    $('btn-skip-all').onclick     = () => skipAll();
  }

  // ── STEP 2: Target ────────────────────────────────────────
  function renderGoals() {
    const targets = [
      { key:'general',   icon:'🌍', label:'Bahasa Inggris Umum', sub:'Percakapan sehari-hari &amp; pekerjaan' },
      { key:'ielts',     icon:'🎓', label:'IELTS',               sub:'Studi atau emigrasi ke luar negeri' },
      { key:'toeic',     icon:'💼', label:'TOEIC',               sub:'Karier &amp; dunia kerja internasional' },
      { key:'toefl',     icon:'🏛️', label:'TOEFL iBT',           sub:'Universitas Amerika / Kanada' },
      { key:'cambridge', icon:'📜', label:'Cambridge',           sub:'B2 First / C1 Advanced' },
      { key:'explore',   icon:'🔍', label:'Jelajahi Dulu',       sub:'Belum tahu — ingin lihat semua fitur' },
    ];

    setHTML(`
<div class="ob-card">
  <h2 class="ob-step-title">🎯 Apa Tujuan Belajarmu?</h2>
  <p class="ob-step-sub">Pilih satu tujuan utama. Kamu bisa mengubahnya nanti di Pengaturan.</p>
  <div class="ob-choice-grid" id="target-grid">
    ${targets.map(t => `
    <button class="ob-choice-btn${selectedTarget===t.key?' selected':''}" data-target="${t.key}">
      <span class="choice-icon">${t.icon}</span>
      <span class="choice-label">${t.label}</span>
      <span class="choice-sub">${t.sub}</span>
    </button>`).join('')}
  </div>
  <div class="ob-btn-row">
    <button class="ob-btn-secondary" id="btn-goals-back">← Kembali</button>
    <button class="ob-btn-primary" id="btn-goals-next"${!selectedTarget?' disabled':''}>Lanjut →</button>
  </div>
</div>`);

    document.querySelectorAll('[data-target]').forEach(btn => {
      btn.onclick = () => {
        selectedTarget = btn.dataset.target;
        document.querySelectorAll('[data-target]').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        $('btn-goals-next').disabled = false;
      };
    });

    $('btn-goals-back').onclick = () => goStep(1);
    $('btn-goals-next').onclick = () => { if (selectedTarget) goStep(3); };
  }

  // ── STEP 3: Daily Goal ────────────────────────────────────
  function renderDailyGoal() {
    const goals = [
      { min:5,  icon:'🌱', label:'5 menit / hari',  sub:'Santai — cocok untuk pemula atau jadwal padat' },
      { min:10, icon:'☀️', label:'10 menit / hari', sub:'Ringan — progres stabil tanpa tekanan' },
      { min:15, icon:'🏃', label:'15 menit / hari', sub:'Standar — direkomendasikan untuk kebanyakan user' },
      { min:20, icon:'💪', label:'20 menit / hari', sub:'Serius — progres lebih cepat' },
      { min:30, icon:'🔥', label:'30 menit / hari', sub:'Intensif — untuk yang punya target tes mendesak' },
    ];

    setHTML(`
<div class="ob-card">
  <h2 class="ob-step-title">⏱️ Berapa Lama Kamu Bisa Belajar?</h2>
  <p class="ob-step-sub">Target waktu belajar harian membantumu tetap konsisten. Pilih yang realistis untukmu.</p>
  <div class="ob-goal-list" id="goal-list">
    ${goals.map(g => `
    <button class="ob-goal-option${selectedGoal===String(g.min)?' selected':''}" data-goal="${g.min}">
      <span class="goal-icon">${g.icon}</span>
      <div class="goal-info">
        <strong>${g.label}</strong>
        <span>${g.sub}</span>
      </div>
    </button>`).join('')}
  </div>
  <div class="ob-btn-row">
    <button class="ob-btn-secondary" id="btn-daily-back">← Kembali</button>
    <button class="ob-btn-primary" id="btn-daily-next"${!selectedGoal?' disabled':''}>Lanjut ke Placement Test →</button>
  </div>
</div>`);

    document.querySelectorAll('[data-goal]').forEach(btn => {
      btn.onclick = () => {
        selectedGoal = btn.dataset.goal;
        document.querySelectorAll('[data-goal]').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        $('btn-daily-next').disabled = false;
      };
    });

    $('btn-daily-back').onclick = () => goStep(2);
    $('btn-daily-next').onclick = () => { if (selectedGoal) renderTestIntro(); };
  }

  // ── STEP 4: Test Intro ────────────────────────────────────
  function renderTestIntro() {
    updateProgress(4);
    setHTML(`
<div class="ob-card">
  <div class="ob-welcome-icon">📝</div>
  <h2 class="ob-step-title" style="text-align:center">Placement Test</h2>
  <p class="ob-step-sub" style="text-align:center">
    20 soal pilihan ganda untuk mengukur level bahasa Inggrismu saat ini.<br><br>
    Tidak ada salah atau benar yang buruk — jawab sejujurnya agar jalur belajarmu tepat.
  </p>
  <ul class="ob-feature-list">
    <li class="ob-feature-item">
      <span class="ob-feature-icon">📚</span>
      <div class="ob-feature-text">
        <strong>20 Soal</strong>
        <span>Mencakup Grammar, Vocabulary, dan Reading (A1–B2)</span>
      </div>
    </li>
    <li class="ob-feature-item">
      <span class="ob-feature-icon">⏰</span>
      <div class="ob-feature-text">
        <strong>~5–10 Menit</strong>
        <span>Tidak ada batas waktu — santai saja</span>
      </div>
    </li>
    <li class="ob-feature-item">
      <span class="ob-feature-icon">💡</span>
      <div class="ob-feature-text">
        <strong>Penjelasan per Soal</strong>
        <span>Setiap jawaban dilengkapi penjelasan singkat</span>
      </div>
    </li>
  </ul>
  <div class="ob-btn-row">
    <button class="ob-btn-secondary" id="btn-test-back">← Kembali</button>
    <button class="ob-btn-primary" id="btn-test-start">Mulai Test →</button>
  </div>
  <div class="ob-skip-link">
    <button id="btn-skip-test">Lewati test — tentukan level sendiri</button>
  </div>
</div>`);

    $('btn-test-back').onclick  = () => goStep(3);
    $('btn-test-start').onclick = () => {
      testAnswers = [];
      showQuestion(0);
    };
    $('btn-skip-test').onclick  = () => renderManualLevel();
  }

  // ── Question ──────────────────────────────────────────────
  function showQuestion(qIdx) {
    currentQIdx = qIdx;
    selectedOpt = null;
    answered    = false;

    const q      = PlacementData.QUESTIONS[qIdx];
    const total  = PlacementData.QUESTIONS.length;
    const pct    = Math.round((qIdx / total) * 100);
    const OPTS   = ['A','B','C','D'];

    setHTML(`
<div class="ob-card">
  <div class="ob-test-meta">
    <span class="ob-test-counter">Soal ${qIdx + 1} dari ${total}</span>
    <span class="ob-test-level-badge">${q.level}</span>
  </div>
  <div class="ob-test-progress">
    <div class="ob-test-progress-fill" style="width:${pct}%"></div>
  </div>
  <p class="ob-question-text">${_esc(q.question)}</p>
  <div class="ob-options-list" id="options-list">
    ${q.options.map((opt, i) => `
    <button class="ob-option-btn" data-idx="${i}" id="opt-${i}">
      <span class="opt-letter">${OPTS[i]}</span>
      <span>${_esc(opt)}</span>
    </button>`).join('')}
  </div>
  <div id="explanation-wrap"></div>
  <button class="ob-btn-primary" id="btn-confirm" disabled>Konfirmasi Jawaban</button>
</div>`);

    const confirmBtn = $('btn-confirm');

    document.querySelectorAll('.ob-option-btn').forEach(btn => {
      btn.onclick = () => {
        if (answered) return;
        selectedOpt = parseInt(btn.dataset.idx);
        document.querySelectorAll('.ob-option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        confirmBtn.disabled = false;
      };
    });

    confirmBtn.onclick = () => {
      if (selectedOpt === null || answered) return;
      answered = true;
      confirmBtn.disabled = true;

      const isCorrect = selectedOpt === q.answer;
      testAnswers.push(isCorrect);

      // Mark answers
      document.querySelectorAll('.ob-option-btn').forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answer)                    btn.classList.add('correct');
        else if (i === selectedOpt && !isCorrect) btn.classList.add('wrong');
      });

      // Show explanation
      $('explanation-wrap').innerHTML =
        `<div class="ob-explanation">💡 ${_esc(q.explanation)}</div>`;

      // Next / finish
      if (qIdx < total - 1) {
        confirmBtn.disabled   = false;
        confirmBtn.textContent = 'Soal Berikutnya →';
        confirmBtn.onclick    = () => showQuestion(qIdx + 1);
      } else {
        confirmBtn.disabled   = false;
        confirmBtn.textContent = 'Lihat Hasil →';
        confirmBtn.onclick    = () => {
          const level        = PlacementData.calculateLevel(testAnswers);
          const correctCount = testAnswers.filter(Boolean).length;
          renderResult(level, correctCount, total);
        };
      }
    };
  }

  // ── Manual level picker ───────────────────────────────────
  function renderManualLevel() {
    const levels = [
      { key:'A1', icon:'🌱', label:'A1 — Pemula',          sub:'Baru mulai, belum banyak tahu tentang bahasa Inggris' },
      { key:'A2', icon:'🌿', label:'A2 — Dasar',            sub:'Bisa kalimat sederhana, tahu beberapa kosakata dasar' },
      { key:'B1', icon:'🌳', label:'B1 — Menengah',         sub:'Bisa berkomunikasi dalam situasi umum dengan cukup baik' },
      { key:'B2', icon:'🏆', label:'B2 — Atas Menengah',   sub:'Fasih untuk sebagian besar topik, siap persiapan tes' },
    ];

    setHTML(`
<div class="ob-card">
  <h2 class="ob-step-title">Pilih Level Awal</h2>
  <p class="ob-step-sub">Pilih level yang paling sesuai dengan kemampuanmu saat ini.</p>
  <div class="ob-goal-list">
    ${levels.map(l => `
    <button class="ob-goal-option" data-level="${l.key}">
      <span class="goal-icon">${l.icon}</span>
      <div class="goal-info">
        <strong>${l.label}</strong>
        <span>${l.sub}</span>
      </div>
    </button>`).join('')}
  </div>
  <div class="ob-skip-link">
    <button id="btn-back-test">← Kembali ke placement test</button>
  </div>
</div>`);

    document.querySelectorAll('[data-level]').forEach(btn => {
      btn.onclick = () => renderResult(btn.dataset.level, null, null);
    });
    $('btn-back-test').onclick = () => renderTestIntro();
  }

  // ── STEP 5: Result ────────────────────────────────────────
  function renderResult(levelCode, correctCount, total) {
    updateProgress(5);

    const lvl     = PlacementData.getLevelDescription(levelCode || 'A1');
    const pct     = (total && correctCount !== null)
      ? Math.round((correctCount / total) * 100)
      : null;
    const degStr  = pct !== null ? `style="--score-pct: ${pct * 3.6}deg"` : '';

    setHTML(`
<div class="ob-card">
  <div style="text-align:center; margin-bottom:8px;">
    <div class="ob-result-badge" style="background:${lvl.color}22; color:${lvl.color}; display:inline-flex; align-items:center; gap:10px; padding:10px 24px; border-radius:999px; font-size:1.1rem; font-weight:700; margin:0 auto 16px;">
      <span>${lvl.emoji}</span>
      <span>${lvl.label}</span>
    </div>
  </div>
  ${pct !== null ? `
  <div class="ob-result-score-ring" ${degStr}>
    <div class="ob-result-score-inner">
      <div class="ob-result-score-number">${pct}%</div>
      <div class="ob-result-score-label">${correctCount}/${total} benar</div>
    </div>
  </div>` : ''}
  <h2 class="ob-result-level-label">Level Awal: ${lvl.label}</h2>
  <p class="ob-result-desc">${lvl.desc}</p>
  <div class="ob-xp-award">
    <span>🎉</span>
    <span>+50 XP — Onboarding selesai!</span>
  </div>
  <button class="ob-btn-primary" id="btn-finish">Mulai Belajar →</button>
</div>`);

    // Award XP & save
    const xpResult = XPSystem.addXP('ONBOARDING_DONE', 50, 'Onboarding selesai');
    if (xpResult) App.toastXP(xpResult);

    const session = Auth.getSession();
    if (session) {
      Storage.mergeUser(session.userId, 'onboarding', {
        completed:   true,
        level:       levelCode || 'A1',
        targetTest:  selectedTarget,
        dailyGoal:   selectedGoal ? parseInt(selectedGoal) : 10,
        testCorrect: correctCount,
        testTotal:   total,
        completedAt: new Date().toISOString(),
      });
    }

    $('btn-finish').onclick = () => {
      window.location.href = getBase() + 'pages/dashboard.html';
    };
  }

  // ── Skip all ──────────────────────────────────────────────
  function skipAll() {
    const session = Auth.getSession();
    if (session) {
      Storage.mergeUser(session.userId, 'onboarding', {
        completed:   true,
        level:       'A1',
        targetTest:  null,
        dailyGoal:   10,
        completedAt: new Date().toISOString(),
      });
      const xpResult = XPSystem.addXP('ONBOARDING_DONE', 50, 'Onboarding selesai');
      if (xpResult) App.toastXP(xpResult);
    }
    setTimeout(() => {
      window.location.href = getBase() + 'pages/dashboard.html';
    }, 800);
  }

  // ── goStep ────────────────────────────────────────────────
  function goStep(step) {
    currentStep = step;
    updateProgress(step);
    switch (step) {
      case 1: renderWelcome();   break;
      case 2: renderGoals();     break;
      case 3: renderDailyGoal(); break;
      case 4: renderTestIntro(); break;
    }
  }

  // ── Init ──────────────────────────────────────────────────
  function init() {
    App.init('onboarding');
    renderWelcome();
  }

  return { init };
})();

Onboarding.init();
