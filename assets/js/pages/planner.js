/**
 * EnglishPath — Study Planner Page Logic
 * Fase 12 — v1.3.0
 */
const PlannerPage = (() => {

  let _userId = null;
  let _plan = null; // { testId, targetScore, startDate, targetDate, weeklyPlan[], dailyChecks{} }

  // ── Load planner from storage ─────────────────────────────
  function _loadPlan() {
    if (!_userId) return null;
    return Storage.getUser(_userId, 'planner_plan', null);
  }

  function _savePlan(plan) {
    Storage.setUser(_userId, 'planner_plan', plan);
    _plan = plan;
  }

  // ── Render main page ──────────────────────────────────────
  function _render() {
    const container = document.getElementById('planner-content');
    if (!container) return;

    _plan = _loadPlan();

    if (!_plan) {
      container.innerHTML = _renderSetupWizard();
      _bindSetupEvents();
    } else {
      container.innerHTML = _renderActivePlanner();
      _bindPlannerEvents();
    }
  }

  // ── Setup Wizard HTML ─────────────────────────────────────
  function _renderSetupWizard() {
    const tests = PlannerData.TESTS;
    const today = new Date();
    const defaultStart = today.toISOString().split('T')[0];
    const defaultTarget = new Date(today.getTime() + 8 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const testCardsHTML = tests.map(t => `
      <div class="test-card" data-testid="${t.id}">
        <div class="test-card-icon">${t.icon}</div>
        <div class="test-card-name">${t.name}</div>
        <div class="test-card-desc">${t.description}</div>
      </div>
    `).join('');

    return `
      <div class="planner-empty" id="planner-empty-intro" style="display:none">
        <div class="planner-empty-icon">📅</div>
        <h3>Buat Study Plan Kamu</h3>
        <p>Tentukan target tes dan tanggal ujian untuk mendapatkan jadwal belajar yang personal.</p>
      </div>

      <div class="planner-setup" id="planner-setup-form">
        <div class="setup-step active" id="step-1">
          <div class="setup-step-header">
            <div class="step-number" id="step1-num">1</div>
            <h3>Pilih Target Tes atau Tujuan Belajar</h3>
          </div>
          <div class="test-cards" id="test-cards-grid">
            ${testCardsHTML}
          </div>
        </div>

        <div class="setup-step" id="step-2">
          <div class="setup-step-header">
            <div class="step-number" id="step2-num">2</div>
            <h3>Pilih Target Skor</h3>
          </div>
          <select class="score-select" id="score-select">
            <option value="">— Pilih target skor —</option>
          </select>
        </div>

        <div class="setup-step" id="step-3">
          <div class="setup-step-header">
            <div class="step-number" id="step3-num">3</div>
            <h3>Tentukan Tanggal</h3>
          </div>
          <div class="date-row">
            <div class="date-field">
              <label>Mulai Belajar</label>
              <input type="date" id="start-date" value="${defaultStart}" min="${defaultStart}">
            </div>
            <div class="date-field">
              <label>Tanggal Ujian</label>
              <input type="date" id="target-date" value="${defaultTarget}" min="${defaultStart}">
            </div>
          </div>
          <div class="rec-weeks" id="rec-weeks">
            💡 Pilih tes dan skor terlebih dahulu untuk melihat rekomendasi durasi belajar.
          </div>
        </div>

        <div class="setup-actions">
          <button class="btn-setup-reset" id="btn-setup-cancel" style="display:none">Batal</button>
          <button class="btn-setup-primary" id="btn-create-plan" disabled>Buat Study Plan →</button>
        </div>
      </div>
    `;
  }

  function _bindSetupEvents() {
    let selectedTest = null;
    let selectedScore = null;

    // Test card selection
    document.querySelectorAll('.test-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.test-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedTest = card.dataset.testid;

        // Populate score options
        const test = PlannerData.TESTS.find(t => t.id === selectedTest);
        const scoreSelect = document.getElementById('score-select');
        scoreSelect.innerHTML = '<option value="">— Pilih target skor —</option>';
        if (test && test.scores) {
          test.scores.forEach(s => {
            scoreSelect.innerHTML += `<option value="${s}">${s}</option>`;
          });
        }

        // Activate step 2
        document.getElementById('step-2').classList.add('active');
        selectedScore = null;
        _updateCreateBtn();
      });
    });

    // Score select
    document.getElementById('score-select').addEventListener('change', function() {
      selectedScore = this.value || null;
      if (selectedTest && selectedScore) {
        document.getElementById('step-3').classList.add('active');
        _updateRecWeeks(selectedTest, selectedScore);
        _updateCreateBtn();
      }
    });

    // Date inputs
    ['start-date', 'target-date'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => {
        if (selectedTest && selectedScore) _updateRecWeeks(selectedTest, selectedScore);
        _updateCreateBtn();
      });
    });

    // Create plan button
    document.getElementById('btn-create-plan').addEventListener('click', () => {
      const startDate = document.getElementById('start-date').value;
      const targetDate = document.getElementById('target-date').value;

      if (!selectedTest || !selectedScore || !startDate || !targetDate) return;
      if (new Date(targetDate) <= new Date(startDate)) {
        App.toast('Tanggal ujian harus setelah tanggal mulai', 'error');
        return;
      }

      const weeklyPlan = PlannerData.generateWeeklyPlan(selectedTest, startDate, targetDate);
      const plan = {
        testId: selectedTest,
        targetScore: selectedScore,
        startDate,
        targetDate,
        weeklyPlan,
        dailyChecks: {},
        milestoneCompleted: {},
        createdAt: new Date().toISOString(),
      };

      _savePlan(plan);

      // Save also in onboarding planner key (for compatibility with existing key)
      Storage.mergeUser(_userId, 'planner', { testId: selectedTest, targetDate, startDate });

      App.toast('Study Plan berhasil dibuat! 🎉', 'success');
      _render();
    });

    function _updateCreateBtn() {
      const startDate = document.getElementById('start-date').value;
      const targetDate = document.getElementById('target-date').value;
      const btn = document.getElementById('btn-create-plan');
      const valid = selectedTest && selectedScore && startDate && targetDate &&
        new Date(targetDate) > new Date(startDate);
      btn.disabled = !valid;
    }

    function _updateRecWeeks(testId, score) {
      const recWeeks = PlannerData.getRecommendedWeeks(testId, score);
      const startDate = document.getElementById('start-date').value;
      const targetDate = document.getElementById('target-date').value;
      let actualWeeks = 0;
      if (startDate && targetDate) {
        actualWeeks = Math.ceil((new Date(targetDate) - new Date(startDate)) / (7 * 24 * 60 * 60 * 1000));
      }
      const recEl = document.getElementById('rec-weeks');
      if (recEl) {
        let msg = `💡 Rekomendasi untuk skor ini: <strong>${recWeeks} minggu</strong> belajar.`;
        if (actualWeeks > 0 && actualWeeks < recWeeks) {
          msg += ` <span style="color:var(--danger,#ef4444)">Jadwalmu ${actualWeeks} minggu — mungkin kurang. Pertimbangkan tambah waktu.</span>`;
        } else if (actualWeeks >= recWeeks) {
          msg += ` <span style="color:var(--success,#10b981)">Jadwalmu ${actualWeeks} minggu — cukup!</span>`;
        }
        recEl.innerHTML = msg;
      }
    }
  }

  // ── Active Planner HTML ───────────────────────────────────
  function _renderActivePlanner() {
    if (!_plan) return '';

    const test = PlannerData.TESTS.find(t => t.id === _plan.testId) || {};
    const daysLeft = PlannerData.getDaysUntil(_plan.targetDate);
    const progress = PlannerData.calcProgress(_plan.startDate, _plan.targetDate);
    const totalWeeks = _plan.weeklyPlan.length;
    const completedMilestones = Object.values(_plan.milestoneCompleted || {}).filter(Boolean).length;

    // Today schedule
    const today = new Date();
    const isWeekend = today.getDay() === 0 || today.getDay() === 6;
    const dayKey = isWeekend ? 'weekend' : 'weekday';
    const scheduleItems = (PlannerData.DAILY_SCHEDULE[_plan.testId] || PlannerData.DAILY_SCHEDULE.general)[dayKey] || [];

    const todayKey = today.toISOString().split('T')[0];
    const todayChecks = (_plan.dailyChecks && _plan.dailyChecks[todayKey]) || {};

    const scheduleHTML = scheduleItems.map((item, idx) => {
      const isChecked = !!todayChecks[idx];
      return `
        <div class="schedule-item ${isChecked ? 'done' : ''}" data-sched-idx="${idx}">
          <span class="schedule-item-time">${item.time}</span>
          <span class="schedule-item-icon">${item.icon}</span>
          <div class="schedule-item-info">
            <div class="schedule-item-skill">${item.skill}</div>
            <div class="schedule-item-activity">${item.activity}</div>
          </div>
          <span class="schedule-item-duration">${item.duration} mnt</span>
          <div class="schedule-check ${isChecked ? 'checked' : ''}" data-check-idx="${idx}">
            ${isChecked ? '✓' : ''}
          </div>
        </div>
      `;
    }).join('');

    // Milestone timeline
    const currentWeekNum = Math.floor((today - new Date(_plan.startDate)) / (7 * 24 * 60 * 60 * 1000)) + 1;
    const milestoneHTML = _plan.weeklyPlan.map((week, idx) => {
      const isCurrent = week.week === currentWeekNum;
      const isPast = week.week < currentWeekNum;
      const isDone = !!(_plan.milestoneCompleted && _plan.milestoneCompleted[idx]);
      const dotClass = isDone ? 'completed' : (isCurrent ? 'current' : 'upcoming');
      const weekLabel = isCurrent ? '← Minggu ini' : (isPast ? 'Selesai' : `Minggu ${week.week}`);

      return `
        <div class="milestone-item">
          <div class="milestone-dot ${dotClass}">${isDone ? '✓' : week.milestone.icon}</div>
          <div class="milestone-week-badge ${isCurrent ? 'current' : ''}">${weekLabel} · ${PlannerData.formatDate(week.weekStart)} – ${PlannerData.formatDate(week.weekEnd)}</div>
          <div class="milestone-title">${week.milestone.title}</div>
          <div class="milestone-desc">${week.milestone.desc}</div>
          <div class="milestone-target">🎯 Target: ${week.milestone.target}</div>
          ${(isCurrent || isPast) ? `
            <button class="milestone-check-btn ${isDone ? 'done' : ''}" data-milestone-idx="${idx}">
              ${isDone ? '✅ Selesai' : '✔ Tandai Selesai'}
            </button>
          ` : ''}
        </div>
      `;
    }).join('');

    // Tips section
    const skills = test.skills || ['Vocabulary', 'Grammar'];
    const tipsHTML = skills.map(skill => {
      const tips = PlannerData.SKILL_TIPS[skill] || [];
      return tips.map(tip => `<div class="tip-item" data-skill="${skill}">${tip}</div>`).join('');
    }).join('');
    const tipTabsHTML = skills.map((s, i) =>
      `<button class="tip-tab ${i === 0 ? 'active' : ''}" data-skill="${s}">${s}</button>`
    ).join('');

    // Motivational quote
    const quotes = PlannerData.QUOTES;
    const quote = quotes[today.getDate() % quotes.length];

    // Progress ring calculation
    const circumference = 2 * Math.PI * 36; // r=36
    const offset = circumference - (progress / 100) * circumference;

    return `
      <!-- Quote -->
      <div class="planner-quote">
        <blockquote>"${quote.text}"</blockquote>
        <cite>— ${quote.author}</cite>
      </div>

      <!-- Dashboard cards -->
      <div class="planner-dashboard">
        <!-- Countdown -->
        <div class="planner-card">
          <h3>⏳ Countdown ke Ujian</h3>
          <div class="countdown-display">
            <div class="countdown-num">
              <div class="countdown-val">${Math.floor(daysLeft / 30)}</div>
              <div class="countdown-label">Bulan</div>
            </div>
            <div class="countdown-divider">:</div>
            <div class="countdown-num">
              <div class="countdown-val">${Math.floor((daysLeft % 30) / 7)}</div>
              <div class="countdown-label">Minggu</div>
            </div>
            <div class="countdown-divider">:</div>
            <div class="countdown-num">
              <div class="countdown-val">${daysLeft % 7}</div>
              <div class="countdown-label">Hari</div>
            </div>
          </div>
          <div class="countdown-sub">
            ${test.icon || '🎯'} Target: <strong>${_plan.targetScore}</strong> (${test.name || _plan.testId})<br>
            📅 Ujian: <strong>${PlannerData.formatDate(_plan.targetDate)}</strong>
          </div>
        </div>

        <!-- Progress -->
        <div class="planner-card">
          <h3>📈 Progress Keseluruhan</h3>
          <div class="progress-ring-wrap">
            <svg class="progress-ring-svg" width="88" height="88" viewBox="0 0 88 88">
              <circle class="progress-ring-track" cx="44" cy="44" r="36"/>
              <circle class="progress-ring-fill"
                cx="44" cy="44" r="36"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}"
                id="progress-ring-fill"/>
              <text class="progress-ring-text" x="44" y="41">${progress}%</text>
              <text class="progress-ring-label" x="44" y="53">selesai</text>
            </svg>
            <div class="progress-details">
              <div class="detail-row">
                <span class="detail-label">Mulai</span>
                <span class="detail-value">${PlannerData.formatDate(_plan.startDate)}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Milestone</span>
                <span class="detail-value green">${completedMilestones}/${totalWeeks}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Sisa waktu</span>
                <span class="detail-value blue">${daysLeft} hari</span>
              </div>
            </div>
          </div>
          <div class="week-progress-bar" style="margin-top:.75rem">
            <div class="week-progress-fill" style="width:${progress}%"></div>
          </div>
        </div>
      </div>

      <!-- Today's Schedule -->
      <div class="today-schedule">
        <h2>📋 Jadwal Hari Ini</h2>
        <div class="schedule-day-label">${isWeekend ? '🏖️ Akhir Pekan' : '💼 Hari Kerja'} · ${today.toLocaleDateString('id-ID', {weekday:'long', day:'numeric', month:'long'})}</div>
        <div class="schedule-items" id="schedule-items">
          ${scheduleHTML || '<div style="color:var(--text-muted);font-size:.875rem;padding:.5rem">Tidak ada jadwal hari ini.</div>'}
        </div>
      </div>

      <!-- Milestone Timeline -->
      <div class="milestone-section">
        <h2>🗓️ Timeline Milestone (${totalWeeks} Minggu)</h2>
        <div class="milestone-timeline">
          ${milestoneHTML}
        </div>
      </div>

      <!-- Tips -->
      <div class="tips-section">
        <h2>💡 Tips Belajar per Skill</h2>
        <div class="tips-tabs">${tipTabsHTML}</div>
        <div class="tips-list" id="tips-list">
          ${skills.length > 0 ? (PlannerData.SKILL_TIPS[skills[0]] || []).map(t => `<div class="tip-item">${t}</div>`).join('') : ''}
        </div>
      </div>

      <!-- Reset -->
      <div class="planner-reset-section">
        <button class="btn-reset-planner" id="btn-reset-plan">🗑️ Reset & Buat Plan Baru</button>
      </div>
    `;
  }

  function _bindPlannerEvents() {
    // Daily check toggles
    document.querySelectorAll('.schedule-check').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.checkIdx);
        _toggleDailyCheck(idx, btn);
      });
    });

    // Milestone complete buttons
    document.querySelectorAll('.milestone-check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.milestoneIdx);
        _toggleMilestone(idx, btn);
      });
    });

    // Tips tabs
    document.querySelectorAll('.tip-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tip-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const skill = tab.dataset.skill;
        const tips = PlannerData.SKILL_TIPS[skill] || [];
        const list = document.getElementById('tips-list');
        if (list) {
          list.innerHTML = tips.map(t => `<div class="tip-item">${t}</div>`).join('') ||
            '<div style="color:var(--text-muted);font-size:.875rem">Belum ada tips untuk skill ini.</div>';
        }
      });
    });

    // Reset plan
    const resetBtn = document.getElementById('btn-reset-plan');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (!confirm('Yakin ingin menghapus Study Plan ini? Semua progress planner akan hilang.')) return;
        Storage.delUser(_userId, 'planner_plan');
        _plan = null;
        App.toast('Study Plan dihapus.', 'info');
        _render();
      });
    }
  }

  function _toggleDailyCheck(idx, btn) {
    const today = new Date().toISOString().split('T')[0];
    if (!_plan.dailyChecks) _plan.dailyChecks = {};
    if (!_plan.dailyChecks[today]) _plan.dailyChecks[today] = {};

    const current = !!_plan.dailyChecks[today][idx];
    _plan.dailyChecks[today][idx] = !current;
    _savePlan(_plan);

    const parentItem = btn.closest('.schedule-item');
    if (!current) {
      btn.classList.add('checked');
      btn.textContent = '✓';
      if (parentItem) parentItem.classList.add('done');
      App.toast('Aktivitas selesai! +2 XP', 'success');
      if (typeof XPSystem !== 'undefined') {
        const res = XPSystem.addXP(2, 'Jadwal harian selesai');
        if (res) App.toastXP(res);
      }
    } else {
      btn.classList.remove('checked');
      btn.textContent = '';
      if (parentItem) parentItem.classList.remove('done');
    }
  }

  function _toggleMilestone(idx, btn) {
    if (!_plan.milestoneCompleted) _plan.milestoneCompleted = {};
    const current = !!_plan.milestoneCompleted[idx];

    if (!current) {
      _plan.milestoneCompleted[idx] = true;
      _savePlan(_plan);
      btn.textContent = '✅ Selesai';
      btn.classList.add('done');
      btn.closest('.milestone-item').querySelector('.milestone-dot').className = 'milestone-dot completed';
      App.toast('Milestone selesai! +20 XP 🎉', 'success');
      if (typeof XPSystem !== 'undefined') {
        const res = XPSystem.addXP(20, 'Milestone study planner selesai');
        if (res) App.toastXP(res);
      }
      if (typeof ChallengeSystem !== 'undefined') {
        ChallengeSystem.onModuleVisit('planner');
      }
    } else {
      _plan.milestoneCompleted[idx] = false;
      _savePlan(_plan);
      btn.textContent = '✔ Tandai Selesai';
      btn.classList.remove('done');
      // Restore dot state
      const currentWeekNum = Math.floor((new Date() - new Date(_plan.startDate)) / (7 * 24 * 60 * 60 * 1000)) + 1;
      const week = _plan.weeklyPlan[idx];
      const isCurrent = week && week.week === currentWeekNum;
      const dot = btn.closest('.milestone-item').querySelector('.milestone-dot');
      dot.className = 'milestone-dot ' + (isCurrent ? 'current' : 'upcoming');
    }
  }

  // ── Init ──────────────────────────────────────────────────
  function init() {
    Router.guard();
    App.init('planner');

    const user = Auth.getActiveUser();
    if (!user) return;
    _userId = user.id;

    _render();

    // ChallengeSystem visit
    if (typeof ChallengeSystem !== 'undefined') {
      ChallengeSystem.onModuleVisit('planner');
    }
  }

  return { init };
})();

PlannerPage.init();
