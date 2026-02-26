/**
 * EnglishPath — App Core
 * Toast notifications, shared UI, global init helpers.
 */
const App = (() => {

  // ── Toast ────────────────────────────────────────────────

  function toast(message, type = 'default', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const el = document.createElement('div');
    el.className = 'toast ' + type;
    el.textContent = message;
    container.appendChild(el);

    setTimeout(() => {
      el.classList.add('hide');
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  // ── Sidebar / Drawer (Mobile) ─────────────────────────────

  function initSidebar() {
    const hamburger = document.getElementById('hamburger');
    const overlay   = document.getElementById('drawer-overlay');
    const sidebar   = document.getElementById('sidebar');
    if (!hamburger || !overlay || !sidebar) return;

    hamburger.addEventListener('click', () => {
      sidebar.classList.add('drawer-open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    overlay.addEventListener('click', closeSidebar);

    function closeSidebar() {
      sidebar.classList.remove('drawer-open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Close on nav item click (mobile)
    sidebar.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 768) closeSidebar();
      });
    });
  }

  // ── Render sidebar user info ─────────────────────────────

  function renderUserInfo() {
    const user = Auth.getActiveUser();
    if (!user) return;

    document.querySelectorAll('[data-user-name]').forEach(el => {
      el.textContent = user.name;
    });
    document.querySelectorAll('[data-user-email]').forEach(el => {
      if (typeof XPSystem !== 'undefined') {
        const lvl = XPSystem.getCurrentLevel();
        el.textContent = 'Lv.' + lvl.level + ' — ' + lvl.nameID;
      } else {
        el.textContent = user.email;
      }
    });
    document.querySelectorAll('[data-user-avatar]').forEach(el => {
      el.textContent = user.avatar || '🇬🇧';
    });
  }

  // ── Theme (Dark Mode) ─────────────────────────────────────

  function loadTheme() {
    const user = Auth.getActiveUser();
    let isDark;
    if (user) {
      const s = Storage.getUser(user.id, 'settings', {});
      isDark = s.darkMode !== undefined
        ? s.darkMode
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      try {
        const raw = localStorage.getItem('ep_dark_mode');
        isDark = raw === 'true'
          || (raw === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
      } catch(e) {
        isDark = false;
      }
    }

    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    _updateThemeToggleBtns(isDark);

    // Apply color theme, font, radius
    try {
      const ct = localStorage.getItem('ep_color_theme') || 'ocean';
      document.documentElement.setAttribute('data-color-theme', ct);
      const font = localStorage.getItem('ep_font');
      if (font && font !== 'default') document.documentElement.setAttribute('data-font', font);
      const radius = localStorage.getItem('ep_radius');
      if (radius && radius !== 'default') document.documentElement.setAttribute('data-radius', radius);
    } catch(e) {}
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const isDark = current !== 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    _updateThemeToggleBtns(isDark);

    // Save to user settings
    const user = Auth.getActiveUser();
    if (user) {
      Storage.mergeUser(user.id, 'settings', { darkMode: isDark });
    }
    try { localStorage.setItem('ep_dark_mode', isDark ? 'true' : 'false'); } catch(e) {}
  }

  function _updateThemeToggleBtns(isDark) {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.textContent = isDark ? '☀️' : '🌙';
      btn.title = isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap';
    });
    const settingsToggle = document.getElementById('toggle-darkmode');
    if (settingsToggle) settingsToggle.checked = isDark;
  }

  // ── Init shared elements ─────────────────────────────────

  function init(pageId) {
    loadTheme();
    initSidebar();
    renderUserInfo();
    if (pageId) Router.setActiveNav(pageId);

    // Theme toggle buttons in topbar
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // Logout buttons
    document.querySelectorAll('[data-action="logout"]').forEach(btn => {
      btn.addEventListener('click', () => Auth.logout());
    });
  }

  // ── Password strength checker ────────────────────────────

  function checkPasswordStrength(password) {
    if (password.length < 6) return { score: 0, label: 'Terlalu pendek', cls: 'weak' };
    let score = 0;
    if (password.length >= 8)        score++;
    if (/[A-Z]/.test(password))      score++;
    if (/[0-9]/.test(password))      score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score: 1, label: 'Lemah',  cls: 'weak'   };
    if (score <= 2) return { score: 2, label: 'Sedang', cls: 'medium' };
    return             { score: 3, label: 'Kuat',   cls: 'strong' };
  }

  // ── Form validation helpers ──────────────────────────────

  function showError(inputEl, errorEl, msg) {
    inputEl.classList.add('error');
    inputEl.classList.remove('valid');
    if (errorEl) {
      const span = errorEl.querySelector('span') || errorEl;
      span.textContent = msg;
      errorEl.classList.add('show');
    }
  }

  function clearError(inputEl, errorEl) {
    inputEl.classList.remove('error');
    if (errorEl) errorEl.classList.remove('show');
  }

  function setValid(inputEl) {
    inputEl.classList.remove('error');
    inputEl.classList.add('valid');
  }

  function clearAllErrors(form) {
    form.querySelectorAll('.form-control').forEach(el => {
      el.classList.remove('error', 'valid');
    });
    form.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));
    const alert = form.querySelector('.form-alert');
    if (alert) alert.classList.remove('show');
  }

  function showFormAlert(formOrEl, msg, type = 'alert-error') {
    let alert = typeof formOrEl === 'string'
      ? document.getElementById(formOrEl)
      : formOrEl.querySelector('.form-alert') || formOrEl;
    if (!alert) return;
    alert.className = 'form-alert alert ' + type;
    const msgEl = alert.querySelector('[data-msg]') || alert.querySelector('span:last-child') || alert;
    msgEl.textContent = msg;
    alert.classList.add('show');
  }

  // ── XP Toast ─────────────────────────────────────────────

  function toastXP(result) {
    if (!result) return;
    toast(`+${result.xpGained} XP`, 'xp');
    if (result.leveledUp && result.newLevel) {
      setTimeout(() => {
        toast(`🎉 Level Naik! Level ${result.newLevel.level} — ${result.newLevel.nameID}`, 'levelup', 4000);
      }, 600);
    }
  }

  return {
    toast, toastXP, init,
    loadTheme, toggleTheme,
    checkPasswordStrength,
    showError, clearError, setValid, clearAllErrors, showFormAlert,
    renderUserInfo,
  };
})();

window.App = App;
