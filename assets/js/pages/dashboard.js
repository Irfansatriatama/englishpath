/**
 * EnglishPath — Dashboard Page Logic
 * Handles all dashboard rendering: stats, challenge, streak calendar,
 * XP progress, badges, quick start, quotes, XP history.
 */
const DashboardPage = (() => {

  // Motivational quotes
  const QUOTES = [
    { text: "The limits of my language mean the limits of my world.", author: "Ludwig Wittgenstein" },
    { text: "One language sets you in a corridor for life. Two languages open every door along the way.", author: "Frank Smith" },
    { text: "Language is the road map of a culture. It tells you where its people come from and where they are going.", author: "Rita Mae Brown" },
    { text: "To have another language is to possess a second soul.", author: "Charlemagne" },
    { text: "A different language is a different vision of life.", author: "Federico Fellini" },
    { text: "The more languages you know, the more you are human.", author: "Tomáš Masaryk" },
    { text: "Every language is a world. Without translation, we would inhabit parishes bordering on silence.", author: "George Steiner" },
    { text: "Learning another language is not only learning different words for the same things, but learning another way to think about things.", author: "Flora Lewis" },
    { text: "Language shapes the way we think, and determines what we can think about.", author: "Benjamin Lee Whorf" },
    { text: "You live a new life for every new language you speak. If you know only one language, you live only once.", author: "Czech Proverb" },
  ];

  let _userId = null;

  function _init() {
    const s = Auth.getSession();
    if (!s) return;
    _userId = s.userId;

    _renderWelcome();
    _renderStats();
    _renderQuote();
    _renderLevelXP();
    _renderChallenge();
    _renderStreakCalendar();
    _renderBadges();
    _renderXPHistory();

    // Mark streak kept
    ChallengeSystem.onStreakKept();

    // Check badges
    const newBadges = BadgeSystem.checkAll();
    newBadges.forEach(b => {
      setTimeout(() => {
        App.toast(`🏆 Badge baru: ${b.nameID}!`, 'success', 4000);
      }, 1200);
    });
  }

  function _renderWelcome() {
    const user = Auth.getActiveUser();
    if (!user) return;

    const hour = new Date().getHours();
    let greeting = 'Halo';
    if (hour < 5)       greeting = 'Selamat Dini Hari';
    else if (hour < 12) greeting = 'Selamat Pagi';
    else if (hour < 15) greeting = 'Selamat Siang';
    else if (hour < 19) greeting = 'Selamat Sore';
    else                greeting = 'Selamat Malam';

    const el = document.getElementById('welcome-greeting');
    const nameEl = document.getElementById('welcome-name');
    const avatarEl = document.getElementById('welcome-avatar');

    if (el) el.textContent = greeting + ',';
    if (nameEl) nameEl.textContent = user.name + '! 👋';
    if (avatarEl) avatarEl.textContent = user.avatar || '🇬🇧';

    // Tagline based on level
    const onb = Storage.getUser(_userId, 'onboarding', {});
    const level = onb.level || 'A1';
    const tagEl = document.getElementById('welcome-tagline');
    if (tagEl) {
      tagEl.textContent = `Level ${level} · Lanjutkan perjalananmu hari ini!`;
    }
  }

  function _renderStats() {
    const streak = Storage.getUser(_userId, 'streak', 0);
    const xp     = Storage.getUser(_userId, 'xp', 0);
    const level  = Storage.getUser(_userId, 'level', 1);
    const badges = Storage.getUser(_userId, 'badges', []);

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    set('stat-streak', streak);
    set('stat-xp', xp.toLocaleString('id'));
    set('stat-level', level);
    set('stat-badges', badges.length);
  }

  function _renderQuote() {
    const el = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    if (!el) return;

    const q = QUOTES[new Date().getDate() % QUOTES.length];
    el.textContent = '"' + q.text + '"';
    if (authorEl) authorEl.textContent = '— ' + q.author;
  }

  function _renderLevelXP() {
    const lvlInfo = XPSystem.getCurrentLevel();

    const levelBadgeEl = document.getElementById('xp-level-badge');
    const levelNameEl  = document.getElementById('xp-level-name');
    const levelSubEl   = document.getElementById('xp-level-sub');
    const barFillEl    = document.getElementById('xp-bar-fill');
    const barLabelEl   = document.getElementById('xp-bar-label');

    if (levelBadgeEl) levelBadgeEl.textContent = lvlInfo.level;
    if (levelNameEl)  levelNameEl.textContent  = 'Lv.' + lvlInfo.level + ' — ' + lvlInfo.nameID;
    if (levelSubEl) {
      if (lvlInfo.level >= 10) {
        levelSubEl.textContent = 'Level Maksimum! ' + lvlInfo.currentXP.toLocaleString('id') + ' XP';
      } else {
        levelSubEl.textContent = lvlInfo.currentXP.toLocaleString('id') + ' / ' + lvlInfo.xpForNext.toLocaleString('id') + ' XP ke Level ' + (lvlInfo.level + 1);
      }
    }
    if (barFillEl) barFillEl.style.width = lvlInfo.progress + '%';
    if (barLabelEl) barLabelEl.textContent = lvlInfo.progress + '% menuju Level ' + (lvlInfo.level + 1);

    // Also update welcome bar
    const wBarFill = document.getElementById('welcome-bar-fill');
    const wBarLabel = document.getElementById('welcome-bar-label');
    if (wBarFill) wBarFill.style.width = lvlInfo.progress + '%';
    if (wBarLabel) wBarLabel.innerHTML =
      '<span>Lv.' + lvlInfo.level + '</span><span>' + lvlInfo.progress + '%</span><span>Lv.' + (lvlInfo.level + 1) + '</span>';
  }

  function _renderChallenge() {
    const ch = ChallengeSystem.getChallenge();
    const container = document.getElementById('challenge-tasks');
    const progressBar = document.getElementById('challenge-bar-fill');
    const progressLabel = document.getElementById('challenge-bar-label');
    if (!container || !ch) return;

    const pct = ChallengeSystem.getProgress();

    if (progressBar) progressBar.style.width = pct + '%';
    if (progressLabel) progressLabel.textContent = pct + '% selesai';

    if (ch.completed) {
      container.innerHTML = '<div class="challenge-complete-msg">🎉 Challenge hari ini selesai! +50 XP diraih!</div>';
      return;
    }

    container.innerHTML = ch.tasks.map(t => `
      <div class="challenge-task ${t.done ? 'done' : ''}">
        <div class="task-check">${t.done ? '✓' : ''}</div>
        <div class="task-info">
          <div class="task-label">${t.label}</div>
          <div class="task-progress-text">${t.progress} / ${t.target} ${t.unit}</div>
        </div>
        <div class="task-xp">+${t.xp} XP</div>
      </div>
    `).join('');
  }

  function _renderStreakCalendar() {
    const container = document.getElementById('streak-calendar');
    const streakInfoEl = document.getElementById('streak-info');
    if (!container) return;

    const streak = Storage.getUser(_userId, 'streak', 0);
    const lastActive = Storage.getUser(_userId, 'last_active', null);
    const activityLog = Storage.getUser(_userId, 'activity_log', []);

    // Build set of active dates from activity log (last 28 days)
    const activeDates = new Set(activityLog.map(e => e.date));

    // Generate last 21 days
    const today = new Date();
    today.setHours(0,0,0,0);

    const days = [];
    for (let i = 20; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const str = d.toISOString().slice(0, 10);
      days.push({
        date: str,
        label: d.getDate(),
        isToday: i === 0,
        isActive: activeDates.has(str),
      });
    }

    const DAY_ABBR = ['M','S','R','K','J','S','M'];

    container.innerHTML = days.map(d => {
      let cls = 'streak-day';
      if (d.isActive) cls += ' active';
      if (d.isToday) cls += ' today';
      return `<div class="${cls}" title="${d.date}">${d.label}</div>`;
    }).join('');

    if (streakInfoEl) {
      streakInfoEl.innerHTML = `
        <div class="streak-stat">🔥 <span class="val">${streak}</span> hari streak</div>
        <div class="streak-stat">📅 Terakhir aktif: <span class="val">${lastActive || '—'}</span></div>
      `;
    }
  }

  function _renderBadges() {
    const container = document.getElementById('badges-preview');
    if (!container) return;

    const earned = BadgeSystem.getUserBadges();
    const all    = BadgeSystem.getAll();

    if (earned.length === 0) {
      container.innerHTML = '<p class="no-badges-yet">Belum ada badge. Mulai belajar untuk meraih badge! 🏆</p>';
      return;
    }

    // Show last 6 earned badges
    const recent = [...earned].reverse().slice(0, 6);
    container.innerHTML = recent.map(b => `
      <div class="badge-mini" title="${b.desc}">
        <span class="badge-mini-icon">${b.icon}</span>
        <span class="badge-mini-name">${b.nameID}</span>
      </div>
    `).join('');

    // Update badge count
    const countEl = document.getElementById('stat-badges');
    if (countEl) countEl.textContent = earned.length;

    const totalEl = document.getElementById('badges-count');
    if (totalEl) totalEl.textContent = earned.length + ' / ' + all.length;
  }

  function _renderXPHistory() {
    const container = document.getElementById('xp-history-list');
    if (!container) return;

    const history = Storage.getUser(_userId, 'xp_history', []);
    const recent = [...history].reverse().slice(0, 5);

    if (recent.length === 0) {
      container.innerHTML = '<p style="color:var(--text-3);font-size:0.85rem;">Belum ada aktivitas XP.</p>';
      return;
    }

    container.innerHTML = recent.map(h => {
      const dateStr = h.date ? h.date.slice(0, 10) : '';
      return `
        <div class="xp-history-item">
          <span class="xp-history-label">${h.label || h.action}</span>
          <span class="xp-history-amount">+${h.amount} XP</span>
          <span class="xp-history-date">${dateStr}</span>
        </div>
      `;
    }).join('');
  }

  function openBadgeModal() {
    const all    = BadgeSystem.getAll();
    const earned = BadgeSystem.getUserBadges();
    const earnedIds = new Set(earned.map(b => b.id));

    const overlay = document.createElement('div');
    overlay.className = 'badge-modal-overlay';
    overlay.innerHTML = `
      <div class="badge-modal">
        <div class="badge-modal-title">🏆 Semua Badge (${earned.length} / ${all.length})</div>
        <div class="badge-list-full">
          ${all.map(b => {
            const isEarned = earnedIds.has(b.id);
            const rarityColor = BadgeSystem.getRarityColor(b.rarity);
            return `
              <div class="badge-full-item ${isEarned ? '' : 'locked'}">
                <div class="badge-full-icon">${b.icon}</div>
                <div>
                  <div class="badge-full-name">${b.nameID}</div>
                  <div class="badge-full-desc">${b.desc}</div>
                  <div class="badge-full-rarity" style="color:${rarityColor}">${b.rarity}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <button class="modal-close-btn" id="badge-modal-close">Tutup</button>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('badge-modal-close').onclick = () => overlay.remove();
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  }

  return { init: _init, openBadgeModal };
})();

window.DashboardPage = DashboardPage;
