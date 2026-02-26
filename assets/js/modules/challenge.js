/**
 * EnglishPath — Daily Challenge System
 * Generates and tracks daily learning challenges.
 * All data stored via Storage module.
 */
const ChallengeSystem = (() => {

  // Challenge task templates
  const TASK_TEMPLATES = [
    { id: 'learn_vocab',    label: 'Pelajari 5 vocab baru',       target: 5,  unit: 'vocab',   xp: 15 },
    { id: 'review_srs',    label: 'Review 3 kartu SRS',           target: 3,  unit: 'kartu',   xp: 10 },
    { id: 'quiz_session',  label: 'Selesaikan 1 sesi quiz',       target: 1,  unit: 'sesi',    xp: 15 },
    { id: 'visit_module',  label: 'Kunjungi 2 modul belajar',     target: 2,  unit: 'modul',   xp: 10 },
    { id: 'streak_keep',   label: 'Jaga streak hari ini',         target: 1,  unit: 'hari',    xp: 10 },
  ];

  function _getUserId() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  function _todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function _pickTasks() {
    // Rotate tasks by day-of-week so each day feels different
    const dow = new Date().getDay(); // 0–6
    const picks = [];
    const pool = [...TASK_TEMPLATES];
    const start = dow % pool.length;
    for (let i = 0; i < 3; i++) {
      picks.push(pool[(start + i) % pool.length]);
    }
    return picks.map(t => ({ ...t, progress: 0, done: false }));
  }

  // Get or create today's challenge
  function getChallenge() {
    const userId = _getUserId();
    if (!userId) return null;

    const today = _todayStr();
    const stored = Storage.getUser(userId, 'challenge', null);

    if (stored && stored.date === today) return stored;

    // New day: generate fresh challenge
    const challenge = {
      date:      today,
      tasks:     _pickTasks(),
      completed: false,
      xpAwarded: false,
    };
    Storage.setUser(userId, 'challenge', challenge);
    return challenge;
  }

  // Update progress for a task type
  function updateProgress(taskId, amount) {
    const userId = _getUserId();
    if (!userId) return null;

    const challenge = getChallenge();
    if (!challenge || challenge.completed) return challenge;

    const task = challenge.tasks.find(t => t.id === taskId);
    if (!task || task.done) return challenge;

    task.progress = Math.min(task.target, task.progress + amount);
    if (task.progress >= task.target) task.done = true;

    // Check if all tasks done
    const allDone = challenge.tasks.every(t => t.done);
    if (allDone && !challenge.completed) {
      challenge.completed = true;
      if (!challenge.xpAwarded) {
        challenge.xpAwarded = true;
        XPSystem.addXP('CHALLENGE_COMPLETE', null, 'Challenge Harian Selesai');
      }
    }

    Storage.setUser(userId, 'challenge', challenge);
    return challenge;
  }

  // Called when user learns a new vocab item
  function onLearnItem() {
    return updateProgress('learn_vocab', 1);
  }

  // Called when user reviews an SRS card
  function onSRSReview() {
    return updateProgress('review_srs', 1);
  }

  // Called when user completes a quiz session
  function onQuizComplete() {
    return updateProgress('quiz_session', 1);
  }

  // Called when user visits a learning module
  function onModuleVisit() {
    return updateProgress('visit_module', 1);
  }

  // Called to mark streak task done (called on login/active)
  function onStreakKept() {
    return updateProgress('streak_keep', 1);
  }

  // Get completion % of today's challenge
  function getProgress() {
    const ch = getChallenge();
    if (!ch) return 0;
    const done = ch.tasks.filter(t => t.done).length;
    return Math.round((done / ch.tasks.length) * 100);
  }

  return {
    getChallenge,
    updateProgress,
    onLearnItem,
    onSRSReview,
    onQuizComplete,
    onModuleVisit,
    onStreakKept,
    getProgress,
  };
})();

window.ChallengeSystem = ChallengeSystem;
