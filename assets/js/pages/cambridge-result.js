/**
 * EnglishPath — Cambridge Result Module
 * Fase 16c-2: Halaman Hasil Simulasi Cambridge
 * Membaca dari sessionStorage: cambridge_sim_result
 * Membaca riwayat dari: ep_user_{id}_sim_results
 */
const CambridgeResult = (() => {

  function _uid() { const s = Auth.getSession(); return s ? s.userId : null; }

  function _fmtDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function _barHtml(score, max, label, color) {
    const pct = Math.round((score / max) * 100);
    return `
      <div class="res-bar-row">
        <span class="res-bar-label">${label}</span>
        <div class="res-bar-track">
          <div class="res-bar-fill" style="width:${pct}%;background:${color}"></div>
        </div>
        <span class="res-bar-val">${score}/${max}</span>
      </div>`;
  }

  function _scaleBarHtml(scale, label, color) {
    const pct = Math.round(((scale - 80) / 150) * 100);
    return `
      <div class="res-bar-row">
        <span class="res-bar-label">${label}</span>
        <div class="res-bar-track">
          <div class="res-bar-fill" style="width:${Math.max(2,pct)}%;background:${color}"></div>
        </div>
        <span class="res-bar-val">${scale}</span>
      </div>`;
  }

  function _selfBarHtml(self, max, label, color) {
    const pct = Math.round((self / max) * 100);
    return `
      <div class="res-bar-row">
        <span class="res-bar-label">${label}</span>
        <div class="res-bar-track">
          <div class="res-bar-fill" style="width:${pct}%;background:${color}"></div>
        </div>
        <span class="res-bar-val">${self}/${max}</span>
      </div>`;
  }

  function _getRecommendations(scores, overallScale, gradeInfo) {
    const recs = [];
    if ((scores.rueScale || 0) < 140) recs.push({ skill: '📖 Reading & Use of English', tip: 'Perbanyak latihan Part 1 (Multiple-Choice Cloze) dan Part 4 (Key Word Transformation). Baca teks akademis berbahasa Inggris setiap hari.' });
    if ((scores.writingScale || 0) < 140) recs.push({ skill: '✍️ Writing', tip: 'Fokus pada structure esai (introduction, body paragraphs, conclusion) dan gunakan linking words yang bervariasi. Latihan Part 2 dengan berbagai genre teks.' });
    if ((scores.listenScale || 0) < 140) recs.push({ skill: '🔊 Listening', tip: 'Dengarkan podcast berbahasa Inggris British setiap hari. Latih note-taking untuk Part 2 (Sentence Completion) dan matching untuk Part 4.' });
    if ((scores.speakingScale || 0) < 140) recs.push({ skill: '🗣️ Speaking', tip: 'Latihan berbicara selama 1–2 menit tanpa henti setiap hari. Rekam dirimu dan evaluasi kelancaran, kosakata, dan pronounciation.' });
    if (!gradeInfo.pass) recs.push({ skill: '📅 Persiapan Lanjutan', tip: `Score Cambridge kamu (${overallScale}) belum mencapai threshold kelulusan (169). Fokus pada semua 4 skills dan coba simulasi lagi setelah 2–4 minggu latihan intensif.` });
    if (recs.length === 0) recs.push({ skill: '🎉 Pertahankan!', tip: 'Semua skills kamu sudah di level yang baik! Terus berlatih untuk mempertahankan dan meningkatkan skor kamu.' });
    return recs;
  }

  function init() {
    Router.guard();
    App.init('cambridge-result');

    const rawData = sessionStorage.getItem('cambridge_sim_result');
    const c = document.getElementById('result-content');

    if (!rawData) {
      // Show history only
      _renderHistoryOnly(c);
      return;
    }

    const data = JSON.parse(rawData);
    const { level, scores, overallScale, gradeInfo } = data;

    const recs = _getRecommendations(scores, overallScale, gradeInfo);
    const uid = _uid();
    const history = uid ? (Storage.getUser(uid, 'sim_results') || { results: [] }).results.filter(r => r.testType === 'cambridge') : [];

    c.innerHTML = `
      <!-- HERO GRADE -->
      <div class="res-hero" style="border-color:${gradeInfo.color}">
        <div class="res-hero-level">${level === 'C1' ? 'C1 Advanced' : 'B2 First'}</div>
        <div class="res-grade" style="color:${gradeInfo.color}">${gradeInfo.grade}</div>
        <div class="res-grade-label">${gradeInfo.label}</div>
        <div class="res-scale">Cambridge Scale: <strong>${overallScale}</strong> / 230</div>
        <div class="res-grade-desc">${gradeInfo.desc}</div>
        ${gradeInfo.pass ? '<div class="res-badge-earned">🏅 Badge <strong>cambridge_ready</strong> berhasil dibuka!</div>' : ''}
        <div class="res-xp-earned">+100 XP diberikan!</div>
      </div>

      <!-- SCORE PER PAPER -->
      <div class="res-card">
        <h2 class="res-card-title">📊 Skor per Paper</h2>
        <div class="res-bars">
          ${_barHtml(scores.rueTotal || 0, scores.rueMax || 31, 'R&UoE Raw', '#6c3fc5')}
          ${_scaleBarHtml(scores.rueScale || 80, 'R&UoE Scale', '#6c3fc5')}
          ${_selfBarHtml(scores.writingSelfScore || 0, 5, 'Writing Self (1–5)', '#10b981')}
          ${_scaleBarHtml(scores.writingScale || 80, 'Writing Scale', '#10b981')}
          ${_barHtml(scores.listenTotal || 0, scores.listenMax || 18, 'Listening Raw', '#f59e0b')}
          ${_scaleBarHtml(scores.listenScale || 80, 'Listening Scale', '#f59e0b')}
          ${_selfBarHtml(scores.speakingSelfAvg || 0, 5, 'Speaking Self Avg', '#ef4444')}
          ${_scaleBarHtml(scores.speakingScale || 80, 'Speaking Scale', '#ef4444')}
        </div>
        <div class="res-scale-legend">
          <div>Cambridge Scale: <span style="color:#6b7280">80</span> ←──────→ <span style="color:#22c55e">230</span></div>
          <div class="res-grade-thresholds">
            <span style="color:#22c55e">A: 193–230</span>
            <span style="color:#84cc16">B: 180–192</span>
            <span style="color:#eab308">C: 169–179</span>
            <span style="color:#f97316">D: 160–168</span>
            <span style="color:#ef4444">E: 142–159</span>
            <span style="color:#6b7280">U: &lt;142</span>
          </div>
        </div>
      </div>

      <!-- READING DETAIL -->
      <div class="res-card">
        <h2 class="res-card-title">📖 Reading & Use of English — Detail</h2>
        <div class="res-detail-grid">
          <div class="res-detail-item"><span class="res-detail-label">Part 1 – Multiple-Choice Cloze</span><span class="res-detail-val">${(scores.rueRaw||{}).p1||0}/6</span></div>
          <div class="res-detail-item"><span class="res-detail-label">Part 2 – Open Cloze</span><span class="res-detail-val">${(scores.rueRaw||{}).p2||0}/7</span></div>
          <div class="res-detail-item"><span class="res-detail-label">Part 3 – Word Formation</span><span class="res-detail-val">${(scores.rueRaw||{}).p3||0}/8</span></div>
          <div class="res-detail-item"><span class="res-detail-label">Part 4 – Key Word Transformation</span><span class="res-detail-val">${(scores.rueRaw||{}).p4||0}/6</span></div>
          <div class="res-detail-item"><span class="res-detail-label">Part 5 – Reading MCQ</span><span class="res-detail-val">${(scores.rueRaw||{}).p5||0}/4</span></div>
        </div>
      </div>

      <!-- LISTENING DETAIL -->
      <div class="res-card">
        <h2 class="res-card-title">🔊 Listening — Detail</h2>
        <div class="res-detail-grid">
          <div class="res-detail-item"><span class="res-detail-label">Part 1 – Short Extracts MCQ</span><span class="res-detail-val">${(scores.listenRaw||{}).p1||0}/3</span></div>
          <div class="res-detail-item"><span class="res-detail-label">Part 2 – Sentence Completion</span><span class="res-detail-val">${(scores.listenRaw||{}).p2||0}/6</span></div>
          <div class="res-detail-item"><span class="res-detail-label">Part 3 – Interview MCQ</span><span class="res-detail-val">${(scores.listenRaw||{}).p3||0}/4</span></div>
          <div class="res-detail-item"><span class="res-detail-label">Part 4 – Multiple Matching</span><span class="res-detail-val">${(scores.listenRaw||{}).p4||0}/5</span></div>
        </div>
      </div>

      <!-- RECOMMENDATIONS -->
      <div class="res-card">
        <h2 class="res-card-title">🎯 Rekomendasi Belajar</h2>
        ${recs.map(r => `
          <div class="res-rec-item">
            <div class="res-rec-skill">${r.skill}</div>
            <div class="res-rec-tip">${r.tip}</div>
          </div>`).join('')}
      </div>

      <!-- HISTORY -->
      ${history.length > 0 ? `
      <div class="res-card">
        <h2 class="res-card-title">📅 Riwayat Simulasi Cambridge (5 Terakhir)</h2>
        <div class="res-history">
          ${history.map((h,i) => `
            <div class="res-history-item ${i===0?'latest':''}">
              <span class="res-history-num">${i===0?'Terbaru':'#'+(i+1)}</span>
              <span class="res-history-date">${_fmtDate(h.date)}</span>
              <span class="res-history-level">${h.level||'B2'}</span>
              <span class="res-history-score">Scale: ${h.cambridgeScale||'—'}</span>
              <span class="res-history-grade" style="color:${h.grade==='A'?'#22c55e':h.grade==='B'?'#84cc16':h.grade==='C'?'#eab308':h.grade==='D'?'#f97316':'#ef4444'}">${h.grade||'—'}</span>
            </div>`).join('')}
        </div>
      </div>` : ''}

      <!-- ACTIONS -->
      <div class="res-actions">
        <a href="simulation.html" class="btn btn-primary">🔄 Ulangi Simulasi</a>
        <a href="index.html" class="btn btn-outline">← Cambridge Hub</a>
        <a href="../dashboard.html" class="btn btn-outline">🏠 Dashboard</a>
      </div>
    `;
  }

  function _renderHistoryOnly(c) {
    const uid = _uid();
    const history = uid ? (Storage.getUser(uid, 'sim_results') || { results: [] }).results.filter(r => r.testType === 'cambridge') : [];
    c.innerHTML = `
      <div class="res-hero" style="border-color:#6c3fc5">
        <div class="res-hero-level">Cambridge Simulation</div>
        <div class="res-grade" style="color:#6c3fc5">—</div>
        <div class="res-grade-desc">Belum ada simulasi terbaru. Kerjakan simulasi untuk melihat hasilmu.</div>
      </div>
      ${history.length > 0 ? `
      <div class="res-card">
        <h2 class="res-card-title">📅 Riwayat Simulasi Cambridge</h2>
        <div class="res-history">
          ${history.map((h,i) => `
            <div class="res-history-item ${i===0?'latest':''}">
              <span class="res-history-date">${_fmtDate(h.date)}</span>
              <span class="res-history-level">${h.level||'B2'}</span>
              <span class="res-history-score">Scale: ${h.cambridgeScale||'—'}</span>
              <span class="res-history-grade">${h.grade||'—'}</span>
            </div>`).join('')}
        </div>
      </div>` : '<p style="text-align:center;color:var(--text-muted)">Belum ada riwayat simulasi.</p>'}
      <div class="res-actions">
        <a href="simulation.html" class="btn btn-primary">Mulai Simulasi</a>
        <a href="index.html" class="btn btn-outline">← Cambridge Hub</a>
      </div>`;
  }

  return { init };

})();
