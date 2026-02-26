/**
 * EnglishPath — TOEIC Result Module
 * Fase 14c-2: Halaman Hasil Simulasi TOEIC
 * Reads from: ep_user_{id}_sim_results (type: 'toeic')
 */
const TOEICResult = (() => {

  function _uid() {
    const s = Auth.getSession();
    return s ? s.userId : null;
  }

  function _getTOEICResults() {
    const uid = _uid();
    if (!uid) return [];
    const all = Storage.getUser(uid, 'sim_results') || [];
    return all.filter(r => r.type === 'toeic');
  }

  // ── Score level helpers ───────────────────────────────────────
  function _levelClass(score) {
    if (score >= 800) return 'level-excellent';
    if (score >= 600) return 'level-good';
    if (score >= 400) return 'level-fair';
    return 'level-improve';
  }

  function _levelLabel(score) {
    if (score >= 800) return 'Sangat Baik';
    if (score >= 600) return 'Baik';
    if (score >= 400) return 'Cukup';
    return 'Perlu Latihan';
  }

  function _scoreDesc(total) {
    if (total >= 900) return 'Kemampuan profesional tinggi — setara penutur asli dalam konteks bisnis.';
    if (total >= 800) return 'Kemampuan profesional — komunikasi bisnis internasional dengan nyaman.';
    if (total >= 700) return 'Kemampuan operasional efektif — mampu bekerja dalam lingkungan berbahasa Inggris.';
    if (total >= 600) return 'Kemampuan fungsional — bisa berkomunikasi dalam sebagian besar konteks bisnis.';
    if (total >= 500) return 'Kemampuan berkembang — perlu peningkatan untuk lingkungan kerja profesional.';
    if (total >= 400) return 'Kemampuan dasar — fokus pada grammar, vocabulary, dan listening intensif.';
    return 'Kemampuan pemula — lanjutkan latihan secara konsisten untuk perkembangan nyata.';
  }

  function _proficiencyLevel(total) {
    if (total >= 855) return 'C1–C2 (Advanced)';
    if (total >= 705) return 'B2 (Upper-Intermediate)';
    if (total >= 540) return 'B1 (Intermediate)';
    if (total >= 405) return 'A2 (Elementary)';
    return 'A1 (Beginner)';
  }

  function _recommendations(raw) {
    const recs = [];
    const lcPct = raw.lcCorrect / raw.lcTotal;
    const rcPct = raw.rcCorrect / raw.rcTotal;
    const p1Pct = raw.p1c / raw.p1total;
    const p2Pct = raw.p2c / raw.p2total;
    const p3Pct = raw.p3c / raw.p3total;
    const p4Pct = raw.p4c / raw.p4total;
    const p5Pct = raw.p5c / raw.p5total;
    const p6Pct = raw.p6c / raw.p6total;
    const p7Pct = raw.p7c / raw.p7total;

    if (lcPct < 0.6) {
      recs.push({ icon: '🎧', title: 'Perkuat Listening', tip: 'Latih mendengarkan percakapan dan monolog bisnis setiap hari. Fokus pada Part 3 & 4 yang lebih kompleks.' });
    }
    if (p1Pct < 0.6) {
      recs.push({ icon: '🖼', title: 'Part 1 — Photo Description', tip: 'Pelajari vocabulary deskriptif untuk orang, benda, dan lokasi. Latih prediksi jawaban sebelum mendengar.' });
    }
    if (p2Pct < 0.6) {
      recs.push({ icon: '💬', title: 'Part 2 — Question-Response', tip: 'Perhatikan WH-question words dan jenis pertanyaan. Waspadai distractor yang mirip.' });
    }
    if (rcPct < 0.6) {
      recs.push({ icon: '📖', title: 'Perkuat Reading', tip: 'Tingkatkan kecepatan membaca dengan latihan skimming dan scanning. Baca artikel bisnis setiap hari.' });
    }
    if (p5Pct < 0.6) {
      recs.push({ icon: '📝', title: 'Part 5 — Grammar & Vocab', tip: 'Fokus pada grammar: word form, prepositions, conjunctions. Pelajari collocations bisnis umum.' });
    }
    if (p6Pct < 0.6) {
      recs.push({ icon: '📄', title: 'Part 6 — Text Completion', tip: 'Baca keseluruhan teks dulu untuk memahami konteks sebelum mengisi blank.' });
    }
    if (p7Pct < 0.6) {
      recs.push({ icon: '📰', title: 'Part 7 — Reading Comprehension', tip: 'Latih teknik membaca: baca pertanyaan dulu, lalu cari jawaban di teks. Perhatikan single vs double passage.' });
    }
    if (recs.length === 0) {
      recs.push({ icon: '🌟', title: 'Pertahankan Performa!', tip: 'Skor sangat baik! Terus latihan dengan materi TOEIC lanjutan dan tingkatkan kecepatan untuk skor yang lebih tinggi.' });
    }
    return recs;
  }

  // ── Render ────────────────────────────────────────────────────
  function _render() {
    const results = _getTOEICResults();
    const container = document.getElementById('result-container');
    if (!container) return;

    if (!results.length) {
      container.innerHTML = `
        <div class="result-no-data">
          <div style="font-size:4rem;margin-bottom:1rem;">📋</div>
          <h2>Belum Ada Hasil Simulasi</h2>
          <p>Kamu belum menyelesaikan simulasi TOEIC. Kerjakan dulu untuk melihat hasilmu!</p>
          <a href="simulation.html" class="btn-result btn-result-primary" style="display:inline-block;margin-top:1.5rem;">Mulai Simulasi TOEIC →</a>
        </div>`;
      return;
    }

    const latest = results[0];
    const { lc, rc, total, raw, date } = latest;
    const uid = _uid();
    const badges = uid ? (Storage.getUser(uid, 'badges') || []) : [];
    const hasBadge = badges.includes('toeic_ready');

    container.innerHTML = `
      <!-- HERO -->
      <div class="result-hero toeic-hero">
        <div class="result-hero-content">
          <div class="result-test-label">TOEIC Estimated Total Score</div>
          <div class="result-total-display">${total}</div>
          <div class="result-scale-label">dari 990 · ${date}</div>
          <div class="result-proficiency">${_proficiencyLevel(total)}</div>
          <div class="result-score-desc">${_scoreDesc(total)}</div>
          ${hasBadge ? `<div class="result-badge-earned">🏅 Badge TOEIC Ready Diraih!</div>` : ''}
          ${total >= 700 && !hasBadge ? `<div class="result-badge-earned">🎉 Selamat! Kamu memenuhi syarat badge TOEIC Ready!</div>` : ''}
        </div>
      </div>

      <!-- SECTION SCORES -->
      <div class="result-section-scores">
        <div class="result-section-card">
          <div class="result-section-icon">🎧</div>
          <div class="result-section-name">Listening</div>
          <div class="result-section-score">${lc}</div>
          <div class="result-section-max">dari 495</div>
          <span class="result-level-badge ${_levelClass(lc)}">${_levelLabel(lc)}</span>
        </div>
        <div class="result-section-plus">+</div>
        <div class="result-section-card">
          <div class="result-section-icon">📖</div>
          <div class="result-section-name">Reading</div>
          <div class="result-section-score">${rc}</div>
          <div class="result-section-max">dari 495</div>
          <span class="result-level-badge ${_levelClass(rc)}">${_levelLabel(rc)}</span>
        </div>
        <div class="result-section-equals">=</div>
        <div class="result-section-card result-total-card">
          <div class="result-section-icon">🎯</div>
          <div class="result-section-name">Total</div>
          <div class="result-section-score">${total}</div>
          <div class="result-section-max">dari 990</div>
          <span class="result-level-badge ${_levelClass(total)}">${_levelLabel(total)}</span>
        </div>
      </div>

      <!-- PART BREAKDOWN -->
      ${raw ? `
      <div class="result-breakdown-card">
        <h3>📊 Performa Per Part</h3>
        <div class="result-parts-grid">
          ${[
            { label:'Part 1 Photograph', c: raw.p1c, t: raw.p1total, section:'LC' },
            { label:'Part 2 Q-Response', c: raw.p2c, t: raw.p2total, section:'LC' },
            { label:'Part 3 Conversations', c: raw.p3c, t: raw.p3total, section:'LC' },
            { label:'Part 4 Short Talks', c: raw.p4c, t: raw.p4total, section:'LC' },
            { label:'Part 5 Sentences', c: raw.p5c, t: raw.p5total, section:'RC' },
            { label:'Part 6 Text Completion', c: raw.p6c, t: raw.p6total, section:'RC' },
            { label:'Part 7 Comprehension', c: raw.p7c, t: raw.p7total, section:'RC' }
          ].map(p => {
            const pct = Math.round(p.c / p.t * 100);
            const cls = pct >= 70 ? 'bar-good' : pct >= 50 ? 'bar-fair' : 'bar-weak';
            return `
              <div class="result-part-row">
                <div class="result-part-info">
                  <span class="result-part-badge ${p.section === 'LC' ? 'lc-badge-sm' : 'rc-badge-sm'}">${p.section}</span>
                  <span class="result-part-name">${p.label}</span>
                </div>
                <div class="result-part-bar-wrap">
                  <div class="result-part-bar">
                    <div class="result-part-bar-fill ${cls}" style="width:${pct}%"></div>
                  </div>
                  <span class="result-part-score">${p.c}/${p.t} (${pct}%)</span>
                </div>
              </div>`;
          }).join('')}
        </div>
        <div class="result-raw-totals">
          <span>🎧 LC Total: <strong>${raw.lcCorrect}/${raw.lcTotal}</strong></span>
          <span>📖 RC Total: <strong>${raw.rcCorrect}/${raw.rcTotal}</strong></span>
        </div>
      </div>
      ` : ''}

      <!-- RECOMMENDATIONS -->
      <div class="result-recs-card">
        <h3>💡 Rekomendasi Belajar</h3>
        <div class="result-recs-grid">
          ${_recommendations(raw).map(r => `
            <div class="result-rec-item">
              <div class="result-rec-icon">${r.icon}</div>
              <div class="result-rec-body">
                <div class="result-rec-title">${r.title}</div>
                <div class="result-rec-tip">${r.tip}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SCORE GUIDE -->
      <div class="result-guide-card">
        <h3>📈 Panduan Skor TOEIC</h3>
        <div class="result-score-table">
          ${[
            { range:'905–990', level:'C2', desc:'Expert — Profesional tingkat tinggi' },
            { range:'785–900', level:'C1', desc:'Advanced — Lingkungan bisnis internasional' },
            { range:'665–780', level:'B2', desc:'Upper-Int. — Mampu bekerja secara mandiri' },
            { range:'525–660', level:'B1', desc:'Intermediate — Komunikasi bisnis dasar' },
            { range:'385–520', level:'A2', desc:'Elementary — Komunikasi terbatas' },
            { range:'255–380', level:'A1', desc:'Beginner — Pemahaman sangat terbatas' }
          ].map(row => {
            const inRange = total >= parseInt(row.range.split('–')[0]);
            return `<div class="result-score-row ${inRange && total <= parseInt(row.range.split('–')[1]) ? 'current-range' : ''}">
              <span class="score-range">${row.range}</span>
              <span class="score-level">${row.level}</span>
              <span class="score-desc-text">${row.desc}</span>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- HISTORY -->
      ${results.length > 1 ? `
      <div class="result-history-card">
        <h3>🗓 Riwayat Simulasi (${results.length} terakhir)</h3>
        <div class="result-history-list">
          ${results.slice(0, 5).map((r, i) => `
            <div class="result-history-item ${i === 0 ? 'latest' : ''}">
              <span class="history-date">${r.date}</span>
              <span class="history-detail">LC: ${r.lc} | RC: ${r.rc}</span>
              <span class="history-total ${_levelClass(r.total)}">${r.total}</span>
              ${i === 0 ? '<span class="history-tag">Terbaru</span>' : ''}
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- ACTIONS -->
      <div class="result-actions">
        <a href="simulation.html" class="btn-result btn-result-primary">🔄 Ulangi Simulasi</a>
        <a href="index.html" class="btn-result btn-result-secondary">← TOEIC Hub</a>
        <a href="../dashboard.html" class="btn-result btn-result-ghost">🏠 Dashboard</a>
      </div>`;
  }

  function init() {
    Router.guard();
    App.init('toeic-result');
    _render();
  }

  return { init };

})();
