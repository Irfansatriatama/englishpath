/**
 * EnglishPath — Badge System
 * Defines all badges and checks/awards them based on user data.
 * All data stored via Storage module.
 */
const BadgeSystem = (() => {

  // Complete badge registry
  const BADGES = {
    // --- Onboarding ---
    first_step: {
      id: 'first_step',
      icon: '🎉',
      name: 'First Step',
      nameID: 'Langkah Pertama',
      desc: 'Selesaikan onboarding pertama kali',
      rarity: 'common',
    },

    // --- Streak ---
    streak_3: {
      id: 'streak_3',
      icon: '🔥',
      name: '3-Day Streak',
      nameID: 'Streak 3 Hari',
      desc: 'Belajar 3 hari berturut-turut',
      rarity: 'common',
    },
    streak_7: {
      id: 'streak_7',
      icon: '🔥',
      name: 'Week Warrior',
      nameID: 'Pejuang Mingguan',
      desc: 'Belajar 7 hari berturut-turut',
      rarity: 'rare',
    },
    streak_30: {
      id: 'streak_30',
      icon: '💎',
      name: 'Monthly Master',
      nameID: 'Master Bulanan',
      desc: 'Belajar 30 hari berturut-turut',
      rarity: 'epic',
    },

    // --- Level ---
    level_5: {
      id: 'level_5',
      icon: '⭐',
      name: 'Rising Star',
      nameID: 'Bintang Baru',
      desc: 'Capai Level 5',
      rarity: 'common',
    },
    level_10: {
      id: 'level_10',
      icon: '👑',
      name: 'Champion',
      nameID: 'Juara',
      desc: 'Capai Level 10',
      rarity: 'epic',
    },

    // --- XP ---
    xp_500: {
      id: 'xp_500',
      icon: '⚡',
      name: 'Energy Surge',
      nameID: 'Penuh Energi',
      desc: 'Kumpulkan 500 XP',
      rarity: 'common',
    },
    xp_2000: {
      id: 'xp_2000',
      icon: '🌟',
      name: 'Star Learner',
      nameID: 'Pelajar Bintang',
      desc: 'Kumpulkan 2000 XP',
      rarity: 'rare',
    },
    xp_5000: {
      id: 'xp_5000',
      icon: '🏆',
      name: 'XP Legend',
      nameID: 'Legenda XP',
      desc: 'Kumpulkan 5000 XP',
      rarity: 'legendary',
    },

    // --- Challenge ---
    challenge_1: {
      id: 'challenge_1',
      icon: '✅',
      name: 'Daily Achiever',
      nameID: 'Pencapaian Harian',
      desc: 'Selesaikan challenge harian pertama',
      rarity: 'common',
    },
    challenge_7: {
      id: 'challenge_7',
      icon: '🎯',
      name: 'Consistent',
      nameID: 'Konsisten',
      desc: 'Selesaikan 7 challenge harian',
      rarity: 'rare',
    },

    // --- Tes ---
    ielts_ready: {
      id: 'ielts_ready',
      icon: '📋',
      name: 'IELTS Ready',
      nameID: 'Siap IELTS',
      desc: 'Selesaikan simulasi IELTS pertama',
      rarity: 'rare',
    },
    toeic_ready: {
      id: 'toeic_ready',
      icon: '💼',
      name: 'TOEIC Ready',
      nameID: 'Siap TOEIC',
      desc: 'Selesaikan simulasi TOEIC pertama',
      rarity: 'rare',
    },
    toefl_ready: {
      id: 'toefl_ready',
      icon: '🎓',
      name: 'TOEFL Ready',
      nameID: 'Siap TOEFL',
      desc: 'Selesaikan simulasi TOEFL pertama',
      rarity: 'rare',
    },

    // --- CEFR Graduate ---
    a1_graduate: {
      id: 'a1_graduate',
      icon: '🌱',
      name: 'A1 Graduate',
      nameID: 'Lulus A1',
      desc: 'Selesaikan semua modul A1',
      rarity: 'common',
    },
    a2_graduate: {
      id: 'a2_graduate',
      icon: '🌿',
      name: 'A2 Graduate',
      nameID: 'Lulus A2',
      desc: 'Selesaikan semua modul A2',
      rarity: 'common',
    },
    b1_graduate: {
      id: 'b1_graduate',
      icon: '🌳',
      name: 'B1 Graduate',
      nameID: 'Lulus B1',
      desc: 'Selesaikan semua modul B1',
      rarity: 'rare',
    },

    // --- Quiz ---
    quiz_perfect: {
      id: 'quiz_perfect',
      icon: '💯',
      name: 'Perfect Score',
      nameID: 'Nilai Sempurna',
      desc: 'Raih skor 100% di sebuah quiz',
      rarity: 'rare',
    },
  };

  const RARITY_ORDER = { common: 1, rare: 2, epic: 3, legendary: 4 };

  function _getUserId() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  function _getUserBadges(userId) {
    return Storage.getUser(userId, 'badges', []);
  }

  function _hasBadge(userId, badgeId) {
    return _getUserBadges(userId).some(b => b.id === badgeId);
  }

  // Award a badge if not already earned
  function award(badgeId) {
    const userId = _getUserId();
    if (!userId) return null;

    const def = BADGES[badgeId];
    if (!def) return null;
    if (_hasBadge(userId, badgeId)) return null;

    const badge = {
      ...def,
      earnedAt: new Date().toISOString(),
    };

    const badges = _getUserBadges(userId);
    badges.push(badge);
    Storage.setUser(userId, 'badges', badges);

    return badge;
  }

  // Check all conditions and auto-award earned badges
  function checkAll() {
    const userId = _getUserId();
    if (!userId) return [];

    const awarded = [];

    const xp     = Storage.getUser(userId, 'xp', 0);
    const level  = Storage.getUser(userId, 'level', 1);
    const streak = Storage.getUser(userId, 'streak', 0);
    const onb    = Storage.getUser(userId, 'onboarding', {});
    const chLog  = Storage.getUser(userId, 'challenge_log', []);
    const quizScores = Storage.getUser(userId, 'quiz_scores', []);

    // Onboarding
    if (onb.completed && !_hasBadge(userId, 'first_step')) {
      const b = award('first_step'); if (b) awarded.push(b);
    }

    // Streak
    if (streak >= 3 && !_hasBadge(userId, 'streak_3')) {
      const b = award('streak_3'); if (b) awarded.push(b);
    }
    if (streak >= 7 && !_hasBadge(userId, 'streak_7')) {
      const b = award('streak_7'); if (b) awarded.push(b);
    }
    if (streak >= 30 && !_hasBadge(userId, 'streak_30')) {
      const b = award('streak_30'); if (b) awarded.push(b);
    }

    // Level
    if (level >= 5 && !_hasBadge(userId, 'level_5')) {
      const b = award('level_5'); if (b) awarded.push(b);
    }
    if (level >= 10 && !_hasBadge(userId, 'level_10')) {
      const b = award('level_10'); if (b) awarded.push(b);
    }

    // XP
    if (xp >= 500 && !_hasBadge(userId, 'xp_500')) {
      const b = award('xp_500'); if (b) awarded.push(b);
    }
    if (xp >= 2000 && !_hasBadge(userId, 'xp_2000')) {
      const b = award('xp_2000'); if (b) awarded.push(b);
    }
    if (xp >= 5000 && !_hasBadge(userId, 'xp_5000')) {
      const b = award('xp_5000'); if (b) awarded.push(b);
    }

    // Challenge count
    const challengeDone = chLog.filter(Boolean).length;
    if (challengeDone >= 1 && !_hasBadge(userId, 'challenge_1')) {
      const b = award('challenge_1'); if (b) awarded.push(b);
    }
    if (challengeDone >= 7 && !_hasBadge(userId, 'challenge_7')) {
      const b = award('challenge_7'); if (b) awarded.push(b);
    }

    // Quiz perfect
    if (quizScores.some(s => s.score === 100) && !_hasBadge(userId, 'quiz_perfect')) {
      const b = award('quiz_perfect'); if (b) awarded.push(b);
    }

    return awarded;
  }

  function getAll() {
    return Object.values(BADGES);
  }

  function getUserBadges() {
    const userId = _getUserId();
    if (!userId) return [];
    return _getUserBadges(userId);
  }

  function getRarityColor(rarity) {
    const map = {
      common:    'var(--text-3)',
      rare:      'var(--primary)',
      epic:      '#7c3aed',
      legendary: 'var(--gold-dark)',
    };
    return map[rarity] || 'var(--text-3)';
  }

  return {
    BADGES,
    award,
    checkAll,
    getAll,
    getUserBadges,
    getRarityColor,
  };
})();

window.BadgeSystem = BadgeSystem;
