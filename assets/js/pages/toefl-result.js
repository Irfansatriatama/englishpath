/**
 * EnglishPath — TOEFL iBT Result Module
 * Fase 15c-2: Halaman Hasil Simulasi TOEFL iBT
 * Reads from: ep_user_{id}_sim_results (type: 'toefl')
 */
const TOEFLResult = (() => {

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  function _getTOEFLResults() {
    const uid = _uid();
    if (!uid) return [];
    const all = Storage.getUser(uid, 'sim_results') || [];
    return all.filter(r => r.type === 'toefl');
  }

  // ── Score helpers ─────────────────────────────────────────────
  function _levelClass(score) {
    if (score >= 24) return 'level-excellent';
    if (score >= 18) return 'level-good';
    if (score >= 12) return 'level-fair';
    return 'level-improve';
  }

  function _levelLabel(score) {
    if (score >= 24) return 'Advanced';
    if (score >= 18) return 'High Intermediate';
    if (score >= 12) return 'Low Intermediate';
    return 'Below Intermediate';
  }

  function _totalLevelClass(total) {
    if (total >= 95) return 'level-excellent';
    if (total >= 72) return 'level-good';
    if (total >= 42) return 'level-fair';
    return 'level-improve';
  }

  function _totalLevelLabel(total) {
    if (total >= 95) return 'Advanced';
    if (total >= 72) return 'Upper-Intermediate';
    if (total >= 42) return 'Intermediate';
    return 'Below Intermediate';
  }

  function _cefrLevel(total) {
    if (total >= 95) return 'C1–C2';
    if (total >= 72) return 'B2';
    if (total >= 42) return 'B1';
    if (total >= 0) return 'A2';
    return 'A1';
  }

  function _scoreDesc(total) {
    if (total >= 110) return 'Skor luar biasa — setara penutur yang sangat mahir. Siap untuk program universitas paling kompetitif.';
    if (total >= 95) return 'Skor sangat baik — memenuhi syarat masuk sebagian besar universitas internasional. Kemampuan akademik Inggris sangat kuat.';
    if (total >= 80) return 'Skor baik — umumnya memenuhi syarat masuk universitas di Amerika, Kanada, dan Australia. Terus tingkatkan.';
    if (total >= 60) return 'Skor cukup — masih perlu peningkatan untuk persyaratan masuk universitas internasional. Fokus pada skill terlemah.';
    if (total >= 42) return 'Skor berkembang — fondasi sudah ada tapi perlu latihan intensif di semua section.';
    return 'Skor dasar — fokus pada penguasaan kosakata akademik, grammatik, dan latihan reading intensif.';
  }

  function _recommendations(r) {
    const recs = [];
    if (r.reading < 15) recs.push({ icon: '📖', title: 'Perkuat Reading', tip: 'Baca artikel akademik setiap hari. Latih soal inference dan prose summary — dua tipe yang paling menantang di TOEFL.' });
    if (r.listening < 15) recs.push({ icon: '🎧', title: 'Tingkatkan Listening', tip: 'Dengarkan lecture akademik bahasa Inggris (TED, Khan Academy, university lectures). Fokus pada main idea dan organization questions.' });
    if (r.speaking < 18) recs.push({ icon: '🎤', title: 'Latih Speaking', tip: 'Rekam diri sendiri menjawab TOEFL speaking prompts. Fokus pada delivery — pacing, clarity, dan completeness jawaban.' });
    if (r.writing < 18) recs.push({ icon: '✍️', title: 'Perkuat Writing', tip: 'Latih Task 1 Integrated — pastikan kamu bisa summarize poin lecture dan menghubungkannya dengan reading dengan akurat. Untuk Task 2, latih menjawab dalam 10 menit secara rutin.' });
    if (recs.length === 0) recs.push({ icon: '🌟', title: 'Performa Sangat Baik!', tip: 'Skor di semua section sangat baik. Untuk mempertahankan, latihan rutin dengan materi TOEFL lanjutan dan praktik speaking spontan.' });
    return recs;
  }

  // ── Score guide table ─────────────────────────────────────────
  function _buildScoreGuide(total) {
    const ranges = [
      { range: '110–120', label: 'Excellent', cefr: 'C2', uni: 'Top universities globally' },
      { range: '95–109', label: 'Advanced', cefr: 'C1', uni: 'Most competitive universities' },
      { range: '80–94', label: 'Upper-Intermediate', cefr: 'B2+', uni: 'Most universities in US/UK/AUS' },
      { range: '60–79', label: 'Intermediate', cefr: 'B1–B2', uni: 'Some universities, conditional' },
      { range: '0–59', label: 'Below Intermediate', cefr: 'Below B1', uni: 'More preparation needed' }
    ];
    return `
      <table class="score-guide-table">
        <thead><tr><th>Skor</th><th>Level</th><th>CEFR</th><th>Keterangan</th></tr></thead>
        <tbody>
          ${ranges.map(row => {
            const [min, max] = row.range.split('–').map(Number);
            const isCurrent = total >= min && total <= max;
            return `<tr class="${isCurrent ? 'current-range' : ''}">
              <td>${row.range}</td>
              <td>${row.label}</td>
              <td>${row.cefr}</td>
              <td>${row.uni}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>`;
  }

  // ── History ───────────────────────────────────────────────────
  function _buildHistory(results) {
    if (results.length <= 1) return '';
    const history = results.slice(1, 6);
    return `
      <div class="result-history">
        <h3>📅 Riwayat Simulasi Terakhir</h3>
        <div class="history-list">
          ${history.map((r, i) => `
            <div class="history-item">
              <div class="history-rank">#${i + 2}</div>
              <div class="history-info">
                <div class="history-date">${r.date}</div>
                <div class="history-scores">R:${r.reading} · L:${r.listening} · S:${r.speaking} · W:${r.writing}</div>
              </div>
              <div class="history-total ${_totalLevelClass(r.total)}">${r.total}</div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  // ── Render ────────────────────────────────────────────────────
  function _render() {
    const results = _getTOEFLResults();
    const container = document.getElementById('result-container');
    if (!container) return;

    if (!results.length) {
      container.innerHTML = `
        <div class="result-no-data">
          <div class="result-no-data-icon">📊</div>
          <h2>Belum Ada Data Simulasi</h2>
          <p>Kamu belum menyelesaikan simulasi TOEFL iBT. Kerjakan simulasi untuk melihat hasilmu di sini.</p>
          <a href="simulation.html" class="btn-sim btn-sim-primary">Mulai Simulasi Sekarang →</a>
        </div>`;
      return;
    }

    const r = results[0];
    const recs = _recommendations(r);

    container.innerHTML = `
      <!-- Hero Result -->
      <div class="result-hero toefl-result-hero">
        <div class="result-hero-badge">🎓</div>
        <div class="result-hero-title">TOEFL iBT Simulation Result</div>
        <div class="result-hero-date">${r.date}</div>
        <div class="result-total-score ${_totalLevelClass(r.total)}">${r.total}</div>
        <div class="result-total-label">Total Score (0–120)</div>
        <div class="result-cefr-badge">${_cefrLevel(r.total)} — ${_totalLevelLabel(r.total)}</div>
        <p class="result-score-desc">${_scoreDesc(r.total)}</p>
      </div>

      <!-- Section Scores -->
      <div class="result-section-scores">
        <h3>Skor Per Section</h3>
        <div class="result-sections-grid">
          ${[
            { icon: '📖', label: 'Reading', score: r.reading, detail: `${r.raw?.rdCorrect || '—'}/${r.raw?.rdTotal || 20} benar` },
            { icon: '🎧', label: 'Listening', score: r.listening, detail: `${r.raw?.ltCorrect || '—'}/${r.raw?.ltTotal || 17} benar` },
            { icon: '🎤', label: 'Speaking', score: r.speaking, detail: 'Self-assessed' },
            { icon: '✍️', label: 'Writing', score: r.writing, detail: 'Self-assessed' }
          ].map(sec => `
            <div class="result-section-card ${_levelClass(sec.score)}">
              <div class="result-section-icon">${sec.icon}</div>
              <div class="result-section-name">${sec.label}</div>
              <div class="result-section-score">${sec.score}</div>
              <div class="result-section-max">/30</div>
              <div class="result-section-bar">
                <div class="result-section-fill" style="width:${Math.round((sec.score/30)*100)}%"></div>
              </div>
              <div class="result-section-detail">${sec.detail}</div>
              <div class="result-section-level">${_levelLabel(sec.score)}</div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Self-Assessment Detail (Speaking & Writing) -->
      ${r.raw?.sp_selfScores ? `
      <div class="result-self-detail">
        <h3>Detail Self-Assessment</h3>
        <div class="self-detail-grid">
          <div>
            <h4>🎤 Speaking Tasks</h4>
            ${['Independent', 'Campus Announcement', 'Academic Concept', 'Lecture'].map((task, i) => `
              <div class="self-detail-row">
                <span>Task ${i+1}: ${task}</span>
                <span class="self-score-badge">${r.raw.sp_selfScores[i] ?? '—'} / 4</span>
              </div>`).join('')}
          </div>
          <div>
            <h4>✍️ Writing Tasks</h4>
            ${['Integrated Writing', 'Academic Discussion'].map((task, i) => `
              <div class="self-detail-row">
                <span>${task}</span>
                <span class="self-score-badge">${r.raw.wr_selfScores?.[i] ?? '—'} / 5</span>
              </div>`).join('')}
          </div>
        </div>
      </div>` : ''}

      <!-- Recommendations -->
      <div class="result-recommendations">
        <h3>🎯 Rekomendasi Belajar</h3>
        <div class="recommendations-grid">
          ${recs.map(rec => `
            <div class="rec-card">
              <div class="rec-icon">${rec.icon}</div>
              <div>
                <div class="rec-title">${rec.title}</div>
                <div class="rec-tip">${rec.tip}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Score Guide -->
      <div class="result-score-guide">
        <h3>📊 Panduan Skor TOEFL iBT</h3>
        ${_buildScoreGuide(r.total)}
      </div>

      ${_buildHistory(results)}

      <!-- Actions -->
      <div class="result-actions">
        <a href="simulation.html" class="btn-sim btn-sim-primary">🔄 Simulasi Lagi</a>
        <a href="index.html" class="btn-sim btn-sim-secondary">← Kembali ke Hub TOEFL</a>
        <a href="../dashboard.html" class="btn-sim btn-sim-secondary">🏠 Dashboard</a>
      </div>`;
  }

  function init() {
    Router.guard();
    App.init('toefl-result');
    _render();
  }

  return { init };
})();
