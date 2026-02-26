/**
 * EnglishPath — Auth Module
 * Handles register, login, logout, session, password change, profile update.
 * All data stored in localStorage via Storage module — no backend required.
 */
const Auth = (() => {

  // ── Helpers ──────────────────────────────────────────────

  function hashPassword(pass) {
    // Simple deterministic hash for client-side only (not cryptographic)
    let h = 0;
    for (let i = 0; i < pass.length; i++) {
      h = Math.imul(31, h) + pass.charCodeAt(i) | 0;
    }
    return 'h_' + Math.abs(h).toString(36) + '_' + pass.length;
  }

  function getAllUsers() {
    return Storage.get('users', []);
  }

  function saveUsers(users) {
    Storage.set('users', users);
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  // ── Register ─────────────────────────────────────────────

  function register({ name, email, password }) {
    const users = getAllUsers();

    if (!name || !email || !password) {
      return { ok: false, error: 'Semua kolom wajib diisi.' };
    }

    const emailLower = email.trim().toLowerCase();
    const nameTrim   = name.trim();

    if (nameTrim.length < 2) {
      return { ok: false, error: 'Nama minimal 2 karakter.' };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLower)) {
      return { ok: false, error: 'Format email tidak valid.' };
    }

    if (password.length < 6) {
      return { ok: false, error: 'Password minimal 6 karakter.' };
    }

    if (users.find(u => u.email === emailLower)) {
      return { ok: false, error: 'Email sudah terdaftar.' };
    }

    const user = {
      id:        generateId(),
      name:      nameTrim,
      email:     emailLower,
      password:  hashPassword(password),
      avatar:    '🇬🇧',
      createdAt: Date.now(),
    };

    users.push(user);
    saveUsers(users);

    // Init per-user data for new user
    Storage.setUser(user.id, 'progress', {});
    Storage.setUser(user.id, 'streak', 0);
    Storage.setUser(user.id, 'last_active', null);
    Storage.setUser(user.id, 'xp', 0);
    Storage.setUser(user.id, 'xp_history', []);
    Storage.setUser(user.id, 'level', 1);
    Storage.setUser(user.id, 'badges', []);
    Storage.setUser(user.id, 'quiz_scores', []);
    Storage.setUser(user.id, 'activity_log', []);
    Storage.setUser(user.id, 'favorites', {});
    Storage.setUser(user.id, 'settings', {
      darkMode: false,
      colorTheme: 'ocean',
      font: 'default',
      radius: 'default',
    });
    Storage.setUser(user.id, 'onboarding', { completed: false });
    Storage.setUser(user.id, 'profile', {
      name: nameTrim,
      email: emailLower,
      avatar: '🇬🇧',
      bio: '',
      createdAt: Date.now(),
    });

    return { ok: true, user: sanitize(user) };
  }

  // ── Login ────────────────────────────────────────────────

  function login({ email, password }) {
    if (!email || !password) {
      return { ok: false, error: 'Email dan password wajib diisi.' };
    }

    const users = getAllUsers();
    const user  = users.find(u => u.email === email.trim().toLowerCase());

    if (!user) {
      return { ok: false, error: 'Email tidak ditemukan.' };
    }

    if (user.password !== hashPassword(password)) {
      return { ok: false, error: 'Password salah.' };
    }

    Storage.set('current_user', user.id);
    updateStreak(user.id);

    return { ok: true, user: sanitize(user) };
  }

  // ── Logout ───────────────────────────────────────────────

  function logout() {
    Storage.remove('current_user');
    window.location.href = getBase() + 'pages/login.html';
  }

  // ── Session ──────────────────────────────────────────────

  function getSession() {
    const userId = Storage.get('current_user', null);
    if (!userId) return null;
    return { userId };
  }

  function getActiveUser() {
    const session = getSession();
    if (!session) return null;
    const users = getAllUsers();
    const user  = users.find(u => u.id === session.userId);
    return user ? sanitize(user) : null;
  }

  function isLoggedIn() {
    const userId = Storage.get('current_user', null);
    if (!userId) return false;
    const users = getAllUsers();
    return !!users.find(u => u.id === userId);
  }

  // ── Change Password ──────────────────────────────────────

  function changePassword(userId, { oldPassword, newPassword }) {
    if (!oldPassword || !newPassword) {
      return { ok: false, error: 'Semua kolom wajib diisi.' };
    }
    if (newPassword.length < 6) {
      return { ok: false, error: 'Password baru minimal 6 karakter.' };
    }

    const users = getAllUsers();
    const idx   = users.findIndex(u => u.id === userId);

    if (idx === -1) return { ok: false, error: 'User tidak ditemukan.' };

    if (users[idx].password !== hashPassword(oldPassword)) {
      return { ok: false, error: 'Password lama salah.' };
    }

    users[idx].password = hashPassword(newPassword);
    saveUsers(users);
    return { ok: true };
  }

  // ── Update Profile ───────────────────────────────────────

  function updateProfile(userId, { name, avatar, bio }) {
    const users = getAllUsers();
    const idx   = users.findIndex(u => u.id === userId);
    if (idx === -1) return { ok: false, error: 'User tidak ditemukan.' };

    if (name) {
      const n = name.trim();
      if (n.length < 2) return { ok: false, error: 'Nama minimal 2 karakter.' };
      users[idx].name = n;
    }
    if (avatar) users[idx].avatar = avatar;

    saveUsers(users);

    // Also update profile storage
    Storage.mergeUser(userId, 'profile', {
      name: users[idx].name,
      avatar: users[idx].avatar,
      bio: bio !== undefined ? bio.trim() : undefined,
    });

    return { ok: true, user: sanitize(users[idx]) };
  }

  // ── Streak ───────────────────────────────────────────────

  function updateStreak(userId) {
    const streak    = Storage.getUser(userId, 'streak', 0);
    const lastActive = Storage.getUser(userId, 'last_active', null);
    const today     = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (lastActive === today) return;

    let newStreak = streak;
    if (lastActive === yesterday) {
      newStreak = streak + 1;
    } else {
      newStreak = 1;
    }

    Storage.setUser(userId, 'streak', newStreak);
    Storage.setUser(userId, 'last_active', today);

    // XP for streak (will be wired in XPSystem later)
    if (typeof XPSystem !== 'undefined') {
      const result = XPSystem.addXP('STREAK_DAY', 10, 'Streak harian');
      if (typeof App !== 'undefined' && result) App.toastXP(result);
    }
  }

  // ── Internal ─────────────────────────────────────────────

  function sanitize(user) {
    const { password, ...safe } = user;
    return safe;
  }

  return {
    register, login, logout,
    getSession, getActiveUser, isLoggedIn,
    changePassword, updateProfile,
    updateStreak,
  };
})();

window.Auth = Auth;

// Helper: calculate path prefix back to root
// Works for local file, GitHub Pages subdirectory, and any folder depth.
function getBase() {
  const parts = window.location.pathname.split('/');
  const pagesIdx = parts.indexOf('pages');
  if (pagesIdx === -1) return ''; // At root (index.html)
  const afterPages = parts.slice(pagesIdx + 1).filter(p => p && !p.includes('.'));
  const depth = 1 + afterPages.length;
  return '../'.repeat(depth);
}

window.getBase = getBase;
