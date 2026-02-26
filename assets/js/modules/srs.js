/**
 * EnglishPath — SRS (Spaced Repetition System)
 * Implementasi algoritma SM-2 untuk review kartu vocabulary.
 * Semua data tersimpan via Storage module dengan key: srs_{moduleId}
 *
 * SM-2 Algorithm:
 *   - EF (Easiness Factor): mulai dari 2.5, minimum 1.3
 *   - Interval: jumlah hari hingga review berikutnya
 *   - Repetitions: berapa kali sudah direview dengan benar
 *   - Quality: 0–5 (0–2 = gagal, 3–5 = berhasil)
 */
const SRSSystem = (() => {

  const MIN_EF = 1.3;
  const DEFAULT_EF = 2.5;

  // Hitung interval dan EF baru setelah satu review (SM-2)
  function _sm2(card, quality) {
    // quality: 0–5
    let { repetitions = 0, interval = 1, ef = DEFAULT_EF } = card;

    if (quality >= 3) {
      // Jawaban benar
      if (repetitions === 0)       interval = 1;
      else if (repetitions === 1)  interval = 6;
      else                         interval = Math.round(interval * ef);

      repetitions += 1;
    } else {
      // Jawaban salah → reset
      repetitions = 0;
      interval = 1;
    }

    // Update EF
    ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    ef = Math.max(MIN_EF, ef);

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    return {
      repetitions,
      interval,
      ef,
      nextReview: nextReview.toISOString().slice(0, 10),
      lastReview: new Date().toISOString().slice(0, 10),
      lastQuality: quality,
    };
  }

  function _getUserId() {
    const s = typeof Auth !== 'undefined' ? Auth.getSession() : null;
    return s ? s.userId : null;
  }

  function _storageKey(moduleId) {
    return `srs_${moduleId}`;
  }

  // Ambil semua data SRS untuk sebuah modul
  function getModuleData(moduleId) {
    const userId = _getUserId();
    if (!userId) return {};
    return Storage.getUser(userId, _storageKey(moduleId), {});
  }

  // Ambil data satu kartu
  function getCard(moduleId, wordId) {
    const data = getModuleData(moduleId);
    return data[wordId] || null;
  }

  // Catat hasil review satu kartu
  function reviewCard(moduleId, wordId, quality) {
    const userId = _getUserId();
    if (!userId) return null;

    const data = getModuleData(moduleId);
    const existing = data[wordId] || { repetitions: 0, interval: 1, ef: DEFAULT_EF };
    const updated = _sm2(existing, quality);

    data[wordId] = { ...existing, ...updated };
    Storage.setUser(userId, _storageKey(moduleId), data);

    return updated;
  }

  // Tandai kata sebagai "baru dipelajari" (belum pernah review)
  function initCard(moduleId, wordId) {
    const userId = _getUserId();
    if (!userId) return null;

    const data = getModuleData(moduleId);
    if (!data[wordId]) {
      data[wordId] = {
        repetitions: 0,
        interval: 1,
        ef: DEFAULT_EF,
        nextReview: new Date().toISOString().slice(0, 10),
        lastReview: null,
        lastQuality: null,
        learnedAt: new Date().toISOString(),
      };
      Storage.setUser(userId, _storageKey(moduleId), data);
    }
    return data[wordId];
  }

  // Cek apakah sebuah kata sudah dipelajari (ada di SRS)
  function isLearned(moduleId, wordId) {
    const card = getCard(moduleId, wordId);
    return card !== null;
  }

  // Ambil kartu-kartu yang jatuh tempo review hari ini atau sebelumnya
  function getDueCards(moduleId) {
    const data = getModuleData(moduleId);
    const today = new Date().toISOString().slice(0, 10);
    return Object.entries(data)
      .filter(([, card]) => card.nextReview <= today)
      .map(([wordId, card]) => ({ wordId, ...card }));
  }

  // Ambil kartu-kartu yang sudah dipelajari (semua)
  function getLearnedCards(moduleId) {
    const data = getModuleData(moduleId);
    return Object.entries(data).map(([wordId, card]) => ({ wordId, ...card }));
  }

  // Jumlah kata yang sudah dipelajari di modul
  function getLearnedCount(moduleId) {
    return Object.keys(getModuleData(moduleId)).length;
  }

  // Jumlah kata yang jatuh tempo hari ini
  function getDueCount(moduleId) {
    return getDueCards(moduleId).length;
  }

  // Statistik ringkasan SRS untuk modul
  function getStats(moduleId) {
    const data = getModuleData(moduleId);
    const cards = Object.values(data);
    const today = new Date().toISOString().slice(0, 10);

    const learned   = cards.length;
    const due       = cards.filter(c => c.nextReview <= today).length;
    const mastered  = cards.filter(c => c.repetitions >= 3).length;

    return { learned, due, mastered };
  }

  // Reset semua data SRS untuk modul (untuk keperluan reset belajar)
  function resetModule(moduleId) {
    const userId = _getUserId();
    if (!userId) return;
    Storage.setUser(userId, _storageKey(moduleId), {});
  }

  // Konversi nilai kualitas 0–5 ke label
  function qualityLabel(q) {
    if (q === 0) return 'Tidak Tahu';
    if (q === 1) return 'Salah';
    if (q === 2) return 'Hampir';
    if (q === 3) return 'Susah';
    if (q === 4) return 'Ingat';
    return 'Mudah';
  }

  return {
    reviewCard,
    initCard,
    isLearned,
    getDueCards,
    getLearnedCards,
    getLearnedCount,
    getDueCount,
    getStats,
    getCard,
    getModuleData,
    resetModule,
    qualityLabel,
  };
})();

window.SRSSystem = SRSSystem;
