/**
 * EnglishPath — IELTS Result Module
 * Fase 13c-2: Halaman Hasil Simulasi IELTS
 * Reads from: ep_user_{id}_sim_results
 */
const IELTSResult = (() => {

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  function _getResults() {
    const uid = _uid();
    if (!uid) return [];
    return Storage.getUser(uid, 'sim_results') || [];
  }

  // ── Band description ─────────────────────────────────────────
  function _bandDesc(band) {
    if (band >= 8.5) return 'Expert — Pengguna yang sangat fasih dan akurat.';
    if (band >= 7.5) return 'Very Good — Penguasaan operasional yang baik dengan kesalahan sesekali.';
    if (band >= 6.5) return 'Competent — Kemampuan operasional yang efektif meskipun ada beberapa kesalahan.';
    if (band >= 5.5) return 'Modest — Kemampuan parsial, mengatasi makna keseluruhan dalam sebagian besar situasi.';
    if (band >= 4.5) return 'Limited — Kompetensi dasar terbatas pada situasi yang familiar.';
    return 'Elementary — Kesulitan besar dalam memahami dan mengekspresikan bahasa Inggris.';
  }

  function _levelClass(band) {
    if (band >= 7.0) return 'level-excellent';
    if (band >= 6.0) return 'level-good';
    if (band >= 5.0) return 'level-fair';
    return 'level-improve';
  }

  function _levelLabel(band) {
    if (band >= 7.0) return 'Sangat Baik';
    if (band >= 6.0) return 'Baik';
    if (band >= 5.0) return 'Cukup';
    return 'Perlu Latihan';
  }

  // ── Render ────────────────────────────────────────────────────
  function _render() {
    const results = _getResults();
    if (!results.length) {
      _renderNoResult();
      return;
    }

    const latest = results[0];
    const { listening, reading, writing, speaking, overall, raw, date } = latest;

    const sections = [
      { key: 'listening', label: 'Listening', icon: '🎧', band: listening },
      { key: 'reading',   label: 'Reading',   icon: '📖', band: reading },
      { key: 'writing',   label: 'Writing',   icon: '✍️', band: writing },
      { key: 'speaking',  label: 'Speaking',  icon: '🎤', band: speaking }
    ];

    const uid = _uid();
    const badges = uid ? (Storage.getUser(uid, 'badges') || []) : [];
    const hasIELTSBadge = badges.includes('ielts_ready');

    const container = document.getElementById('result-container');
    if (!container) return;

    container.innerHTML = `
      <!-- Hero -->
      <div class="result-hero">
        <div class="result-hero-content">
          <div class="result-test-label">IELTS Estimated Overall Band</div>
          <div class="result-band-display">${overall}</div>
          <div class="result-band-label">dari 9.0 · ${date}</div>
          <div class="result-band-desc">${_bandDesc(overall)}</div>
          ${hasIELTSBadge ? `<div class="result-ielts-ready">🏅 Badge IELTS Ready Diraih!</div>` : ''}
          ${overall >= 6.0 && !hasIELTSBadge ? `<div class="result-ielts-ready">🎉 Selamat! Kamu memenuhi syarat badge IELTS Ready!</div>` : ''}
        </div>
      </div>

      <!-- Section bands -->
      <div class="result-bands">
        ${sections.map(s => `
          <div class="result-band-card">
            <div class="result-band-card-icon">${s.icon}</div>
            <div class="result-band-card-section">${s.label}</div>
            <div class="result-band-card-score">${s.band}</div>
            <span class="result-band-card-level ${_levelClass(s.band)}">${_levelLabel(s.band)}</span>
          </div>
        `).join('')}
      </div>

      ${raw ? `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;margin-bottom:2rem;">
          <h3 style="font-size:1rem;font-weight:700;color:var(--text-primary);margin-bottom:0.75rem;">📊 Raw Scores (Objektif)</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;font-size:0.9rem;">
            <div>🎧 Listening: <strong>${raw.listeningCorrect}/${raw.listeningTotal}</strong> benar</div>
            <div>📖 Reading: <strong>${raw.readingCorrect}/${raw.readingTotal}</strong> benar</div>
            <div style="color:var(--text-secondary);font-size:0.82rem;">Band dari tabel konversi IELTS resmi</div>
            <div style="color:var(--text-secondary);font-size:0.82rem;">Writing & Speaking dari self-assessment</div>
          </div>
        </div>
      ` : ''}

      <!-- Recommendations -->
      <div class="result-recs">
        <h3>💡 Rekomendasi Belajar per Skill</h3>
        <div class="result-rec-items">
          ${sections.map(s => {
            const rec = IELTSSimulationData.getRecommendation(s.label, s.band);
            return `
              <div class="result-rec-item">
                <div class="result-rec-icon">${s.icon}</div>
                <div class="result-rec-text">
                  <h4>${s.label} — Band ${s.band} (${rec.level})</h4>
                  <p>${rec.text}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- History -->
      <div class="result-history">
        <h3>📅 Riwayat Simulasi (5 terakhir)</h3>
        ${results.length === 0 ? '<p class="result-history-empty">Belum ada riwayat simulasi.</p>' : `
          <table class="result-history-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Overall</th>
                <th>L</th>
                <th>R</th>
                <th>W</th>
                <th>S</th>
              </tr>
            </thead>
            <tbody>
              ${results.slice(0,5).map((r, i) => `
                <tr>
                  <td>${r.date}</td>
                  <td><span class="result-history-band">${r.overall}</span></td>
                  <td>${r.listening}</td>
                  <td>${r.reading}</td>
                  <td>${r.writing}</td>
                  <td>${r.speaking}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `}
      </div>

      <!-- Actions -->
      <div class="result-actions">
        <a href="simulation.html" class="btn-result btn-result-primary">🔄 Ulangi Simulasi</a>
        <a href="index.html" class="btn-result btn-result-secondary">🏠 IELTS Hub</a>
        <a href="../dashboard.html" class="btn-result btn-result-secondary">📊 Dashboard</a>
      </div>

      <!-- XP Notice -->
      <div style="text-align:center;color:var(--text-secondary);font-size:0.85rem;margin-bottom:2rem;">
        ✅ +100 XP diperoleh dari menyelesaikan simulasi
        ${overall >= 6.0 ? ' · 🏅 Badge <strong>ielts_ready</strong> diraih!' : ''}
      </div>
    `;
  }

  function _renderNoResult() {
    const container = document.getElementById('result-container');
    if (!container) return;
    container.innerHTML = `
      <div style="text-align:center;padding:4rem 2rem;">
        <div style="font-size:4rem;margin-bottom:1rem;">📋</div>
        <h2 style="color:var(--text-primary);margin-bottom:0.5rem;">Belum Ada Hasil Simulasi</h2>
        <p style="color:var(--text-secondary);margin-bottom:2rem;">Kamu belum menyelesaikan simulasi IELTS. Mulailah sekarang!</p>
        <a href="simulation.html" class="btn-result btn-result-primary">🎯 Mulai Simulasi</a>
      </div>
    `;
  }

  function init() {
    Router.guard();
    App.init('ielts-result');
    _render();
  }

  return { init };
})();
