/**
 * EnglishPath — XP System
 * Handles XP awarding, level calculation, and XP history.
 * All data stored via Storage module.
 */
const XPSystem = (() => {

  // XP reward table
  const XP_TABLE = {
    VOCAB_NEW:          5,
    SRS_REVIEW:         2,
    QUIZ_CORRECT:       3,
    LISTENING_CORRECT:  5,
    DIALOG_COMPLETE:    5,
    CHALLENGE_COMPLETE: 50,
    ONBOARDING_DONE:    50,
    QUIZ_PERFECT:       20,
    SIM_COMPLETE:       100,
    STREAK_DAY:         10,
  };

  // Level names (English theme)
  const LEVEL_NAMES = [
    '', // index 0 unused
    'Beginner',      // 1
    'Explorer',      // 2
    'Learner',       // 3
    'Practitioner',  // 4
    'Communicator',  // 5
    'Achiever',      // 6
    'Proficient',    // 7
    'Expert',        // 8
    'Master',        // 9
    'Champion',      // 10
  ];

  const LEVEL_NAMES_ID = [
    '',
    'Pemula',
    'Penjelajah',
    'Pelajar',
    'Praktisi',
    'Komunikator',
    'Berprestasi',
    'Mahir',
    'Ahli',
    'Master',
    'Juara',
  ];

  function _getLevel(xp) {
    if (xp < 100)   return 1;
    if (xp < 300)   return 2;
    if (xp < 600)   return 3;
    if (xp < 1000)  return 4;
    if (xp < 1500)  return 5;
    if (xp < 2200)  return 6;
    if (xp < 3200)  return 7;
    if (xp < 4500)  return 8;
    if (xp < 6000)  return 9;
    return Math.min(10, Math.floor(1 + Math.sqrt(xp / 50)));
  }

  function _getLevelThreshold(level) {
    const thresholds = [0, 0, 100, 300, 600, 1000, 1500, 2200, 3200, 4500, 6000];
    return thresholds[Math.min(level, thresholds.length - 1)] || 6000;
  }

  function _nextThreshold(level) {
    return _getLevelThreshold(level + 1);
  }

  function _getUserId() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  // Add XP by action key or custom amount
  function addXP(actionKey, customAmount, label) {
    const userId = _getUserId();
    if (!userId) return null;

    const amount = customAmount !== undefined
      ? customAmount
      : (XP_TABLE[actionKey] || 0);

    if (amount <= 0) return null;

    const currentXP = Storage.getUser(userId, 'xp', 0);
    const newXP     = currentXP + amount;
    const oldLevel  = _getLevel(currentXP);
    const newLevel  = _getLevel(newXP);

    Storage.setUser(userId, 'xp', newXP);
    Storage.setUser(userId, 'level', newLevel);

    // Log history
    const history = Storage.getUser(userId, 'xp_history', []);
    history.push({
      action:     actionKey || 'CUSTOM',
      amount:     amount,
      label:      label || actionKey || 'XP',
      date:       new Date().toISOString(),
      totalAfter: newXP,
    });
    // Keep last 500 entries
    if (history.length > 500) history.splice(0, history.length - 500);
    Storage.setUser(userId, 'xp_history', history);

    const leveledUp = newLevel > oldLevel;

    return {
      xpGained: amount,
      totalXP:  newXP,
      leveledUp,
      newLevel:  leveledUp ? getLevelInfo(newLevel) : null,
      oldLevel,
    };
  }

  function getCurrentXP() {
    const userId = _getUserId();
    if (!userId) return 0;
    return Storage.getUser(userId, 'xp', 0);
  }

  function getCurrentLevel() {
    const xp = getCurrentXP();
    const level = _getLevel(xp);
    return getLevelInfo(level);
  }

  function getLevelInfo(level) {
    const l = Math.min(Math.max(1, level), 10);
    const xpForNext  = _nextThreshold(l);
    const xpForThis  = _getLevelThreshold(l);
    const currentXP  = getCurrentXP();
    const progress   = l >= 10 ? 100
      : Math.min(100, Math.round(((currentXP - xpForThis) / (xpForNext - xpForThis)) * 100));

    return {
      level,
      name:     LEVEL_NAMES[l]    || 'Champion',
      nameID:   LEVEL_NAMES_ID[l] || 'Juara',
      xpForNext,
      xpForThis,
      currentXP,
      progress,
    };
  }

  function getXPForAction(actionKey) {
    return XP_TABLE[actionKey] || 0;
  }

  return {
    addXP,
    getCurrentXP,
    getCurrentLevel,
    getLevelInfo,
    getXPForAction,
    XP_TABLE,
  };
})();

window.XPSystem = XPSystem;
