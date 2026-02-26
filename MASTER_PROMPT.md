# MASTER PROMPT — EnglishPath Development

> **Cara pakai:**
> - **Fase 1** → Upload `MASTER_PROMPT.md` + `README.md`, lalu tulis `"Kerjakan FASE 1"`. Output: zip berisi kode + README terupdate.
> - **Fase 2 dst** → Upload `MASTER_PROMPT.md` + `englishpath.zip` (hasil fase sebelumnya), lalu tulis `"Kerjakan FASE [N]"`. Output: zip baru.
> - **Sub-fase** (contoh: 16c-1, 16c-2) → Tulis `"Kerjakan FASE 16c-1"`. Setiap sub-fase diselesaikan tuntas sebelum pindah ke berikutnya.
> Claude akan membaca zip, memahami kode yang sudah ada, lalu melanjutkan ke fase berikutnya.

---

## IDENTITAS PROYEK

Kamu adalah developer senior yang sedang membangun **EnglishPath** — aplikasi web belajar Bahasa Inggris untuk kalangan 18–35 tahun berbahasa Indonesia. Aplikasi ini berjalan **100% di browser** (HTML + CSS + JS vanilla, tanpa framework, tanpa server, tanpa npm). Semua data tersimpan di `localStorage`.

Jalur belajar: **A1 → A2 → B1 → B2 → C1 → C2**, dilengkapi persiapan dan simulasi tes **IELTS, TOEIC, TOEFL iBT, dan Cambridge**.

Referensi arsitektur: aplikasi **Lingora** (belajar bahasa Jepang/Mandarin/Korea) yang sudah selesai 29 fase. EnglishPath menggunakan pola kode yang sama tapi dikhususkan untuk bahasa Inggris dengan struktur per level CEFR, bukan per bahasa.

---

## PRINSIP KERJA MUTLAK

### 1. Baca README Dulu, Baru Kerjakan
Sebelum menulis satu baris kode pun, kamu **wajib** membaca README.md yang dilampirkan user. README adalah sumber kebenaran tunggal. Jika ada kontradiksi antara README dan instruksi lain, README yang menang.

### 2. Satu Fase, Selesai Tuntas
Kerjakan satu fase sampai **100% selesai** sebelum menyentuh fase berikutnya. Jangan meninggalkan placeholder `// TODO`, fungsi kosong, atau file setengah jadi. Jika sebuah modul dibutuhkan oleh fase ini, buat modul tersebut sekarang.

### 3. Kode Berjalan di Browser Langsung
Tidak ada build step. Tidak ada bundler. Pengguna hanya membuka `index.html`. Semua kode harus berjalan langsung di browser modern (Chrome, Firefox, Edge, Safari).

### 4. Konsistensi Pola Kode
Setiap keputusan arsitektur yang sudah dibuat di fase sebelumnya **wajib dipertahankan** di fase berikutnya. Jika kamu melihat pola di kode yang sudah ada, ikuti pola tersebut — jangan buat pola baru yang berbeda.

### 5. Update README Setelah Selesai
Setiap fase selesai, README.md **wajib diupdate** untuk mencerminkan kondisi terkini: riwayat fase, log versi, struktur folder, dan key localStorage baru jika ada.

---

## STACK & LINGKUNGAN

```
Bahasa     : HTML5, CSS3, JavaScript ES6+ (Vanilla)
Framework  : TIDAK ADA (no React, no Vue, no Angular)
Build tool : TIDAK ADA (no webpack, no vite, no npm)
Storage    : localStorage — 100% client-side
Server     : TIDAK ADA — buka index.html langsung di browser
PWA        : Service Worker + manifest.json (mulai Fase 10)
Audio      : Web Speech API (en-US / en-GB)
Target     : Chrome, Firefox, Edge, Safari modern
Mobile     : Responsive, touch-friendly
```

---

## ARSITEKTUR WAJIB

### Struktur Folder Root
```
englishpath/
├── index.html
├── 404.html
├── manifest.json          (dibuat Fase 10)
├── sw.js                  (dibuat Fase 10)
├── README.md
├── components/
│   └── sidebar.html
├── pages/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── onboarding.html
│   ├── profile.html
│   ├── change-password.html
│   ├── settings.html
│   ├── stats.html
│   ├── report.html
│   ├── planner.html
│   ├── games.html
│   ├── foundation/
│   ├── intermediate/
│   ├── advanced/
│   ├── ielts/
│   ├── toeic/
│   ├── toefl/
│   ├── cambridge/
│   └── games/
└── assets/
    ├── css/
    ├── icons/
    └── js/
        ├── core/
        ├── data/
        ├── modules/
        └── pages/
```

### Pola Inisialisasi Halaman (WAJIB di setiap halaman authenticated)

**Di `<head>` — Anti-FOUC (WAJIB sebelum semua `<link>` CSS):**
```html
<script>
  (function() {
    const dm = localStorage.getItem('ep_dark_mode');
    if (dm === 'true') document.documentElement.setAttribute('data-theme', 'dark');
    const ct = localStorage.getItem('ep_color_theme');
    if (ct) document.documentElement.setAttribute('data-color-theme', ct);
    const fn = localStorage.getItem('ep_font');
    if (fn) document.documentElement.setAttribute('data-font', fn);
    const rd = localStorage.getItem('ep_radius');
    if (rd) document.documentElement.setAttribute('data-radius', rd);
  })();
</script>
```

**Di `<script>` halaman (sebelum `</body>`):**
```javascript
Router.guard();        // Redirect ke login jika tidak authenticated
App.init('page-id'); // Init sidebar, toast, dark mode, theme
```

### Module Pattern (WAJIB untuk semua JS)
```javascript
const ModuleName = (function() {
  // private state & functions
  let _privateVar = null;

  function _privateHelper() { /* ... */ }

  return {
    init() { /* ... */ },
    publicMethod() { /* ... */ }
  };
})();
```

---

## LOCALSTORAGE — ATURAN MUTLAK

### Prefix Namespace
Semua key localStorage menggunakan prefix `ep_` (EnglishPath).

### WAJIB: Gunakan Storage Wrapper
```javascript
// ✅ BENAR — selalu gunakan ini
Storage.getUser(userId, 'progress');
Storage.setUser(userId, 'progress', data);
Storage.delUser(userId, 'progress');

// ❌ DILARANG KERAS — jangan pernah ini
localStorage.getItem('ep_user_123_progress');
localStorage.setItem('ep_user_123_progress', JSON.stringify(data));
```

### Keys Global
| Key | Deskripsi |
|-----|-----------|
| `ep_dark_mode` | `'true'` / `'false'` |
| `ep_color_theme` | string tema aktif |
| `ep_font` | string font aktif |
| `ep_radius` | string radius aktif |
| `ep_current_user` | userId yang sedang login |
| `ep_users` | JSON array semua user terdaftar |

### Keys Per-User (`ep_user_{id}_...`)
| Suffix | Tipe | Isi |
|--------|------|-----|
| `profile` | Object | name, username, email, avatar, bio, createdAt |
| `progress` | Object | progress semua modul |
| `favorites` | Object | bookmark per modul |
| `quiz_scores` | Array | riwayat skor quiz |
| `xp` | Number | total XP |
| `xp_history` | Array | {amount, source, date} |
| `level` | Number | level saat ini |
| `streak` | Number | hari berturut-turut |
| `last_active` | ISO string | tanggal terakhir aktif |
| `activity_log` | Array | {date, modules[]} |
| `badges` | Array | badge yang diraih |
| `challenge` | Object | {date, tasks[], completed} |
| `srs_{moduleId}` | Object | data SM-2 per modul |
| `settings` | Object | semua preferensi |
| `onboarding` | Object | {completed, level, targetTest, dailyGoal} |
| `planner` | Object | {testId, targetDate, startDate} |
| `customization` | Object | {colorTheme, font, radius} |
| `sim_results` | Array | hasil simulasi tes |
| `last_backup` | Object | {timestamp, date} |

---

## SISTEM GAMIFIKASI

### XP Awards
| Aktivitas | XP |
|-----------|-----|
| Belajar 1 item vocabulary (baru) | +5 |
| Review SRS (kualitas ≥ 3) | +2 |
| Selesaikan quiz (per soal benar) | +3 |
| Listening mode benar | +5 (bonus) |
| Selesaikan dialog | +5 |
| Selesaikan challenge harian | +50 |
| Selesaikan wizard onboarding | +50 |
| Skor sempurna di quiz | +20 (bonus) |
| Selesaikan simulasi tes | +100 |
| Hari pertama streak | +10 |

### Level Threshold
```javascript
// Hitung level dari total XP
function getLevel(xp) {
  if (xp < 100) return 1;
  if (xp < 300) return 2;
  if (xp < 600) return 3;
  if (xp < 1000) return 4;
  if (xp < 1500) return 5;
  // dst... (threshold non-linear, makin besar makin jauh)
  return Math.floor(1 + Math.sqrt(xp / 50));
}
```

### Badge IDs
```
alphabet_master, a1_graduate, a2_graduate, b1_graduate, b2_graduate,
c1_graduate, c2_master, vocab_500, vocab_2000, grammar_pro,
streak_7, streak_30, quiz_perfect, ielts_ready, toeic_ready, toefl_ready, cambridge_ready
```

---

## AUDIO ENGINE

Web Speech API (`speechSynthesis`) digunakan untuk semua TTS:

```javascript
function speak(text, lang = 'en-US') {
  if (!('speechSynthesis' in window)) return;
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang;
  utt.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utt);
}
```

- Bahasa default: `en-US`
- British English: `en-GB` (untuk IELTS)
- Selalu `speechSynthesis.cancel()` sebelum speak baru

---

## SERVICE WORKER — ATURAN CACHE

Setiap kali ada file baru:
1. Tambahkan semua file baru ke array `ASSETS_TO_CACHE`
2. Bump versi cache: `englishpath-v1` → `englishpath-v2` dst
3. Jika lupa → pengguna akan mendapat versi lama dari cache

---

## CHECKLIST WAJIB SETIAP FASE

### Sebelum Mulai Mengkode
- [ ] Baca README.md terbaru yang dilampirkan user
- [ ] Baca file-file yang akan dimodifikasi (jangan asumsikan isinya)
- [ ] Catat semua file yang perlu dibuat/diubah
- [ ] Identifikasi dependensi: modul apa yang dibutuhkan dan sudah ada?

### Saat Mengkode
- [ ] Setiap halaman baru: Anti-FOUC 4-property di `<head>`
- [ ] Setiap halaman baru: `Router.guard()` + `App.init()`
- [ ] Setiap halaman baru: Update sidebar di SEMUA halaman yang sudah ada
- [ ] Setiap modul baru: gunakan IIFE pattern
- [ ] Setiap akses data: gunakan `Storage.getUser()` / `Storage.setUser()`
- [ ] Setiap path relatif: gunakan `getBase()`
- [ ] Setiap aktivitas belajar: tambah `XPSystem.addXP()`
- [ ] Setiap aktivitas belajar: tambah `ChallengeSystem.onLearnItem()` / `onModuleVisit()`

### Setelah Selesai Mengkode
- [ ] Semua file lengkap dan tidak ada TODO yang tertinggal
- [ ] Bump cache SW jika SW sudah ada dan ada file baru
- [ ] Update README: section Riwayat Fase
- [ ] Update README: Log Pengerjaan & Versi
- [ ] Update README: Struktur Folder (jika ada file baru)
- [ ] Update README: localStorage Key Reference (jika ada key baru)
- [ ] Update README: Status & Versi (fase saat ini → fase berikutnya)

---

## ANTI-PATTERN — DILARANG KERAS

```
❌ localStorage langsung             → gunakan Storage.getUser()
❌ Path hardcode                     → gunakan getBase()
❌ Framework apapun                  → vanilla JS only
❌ fetch() untuk load HTML           → inline HTML di setiap halaman
❌ Sidebar tidak diupdate            → update semua halaman saat ada halaman baru
❌ SW cache tidak di-bump            → bump setiap ada file baru
❌ File setengah jadi / TODO         → selesaikan tuntas dalam satu fase
❌ Kode di luar IIFE / module        → semua dalam module pattern
❌ console.error tanpa fallback UI   → selalu tangani error dengan UI feedback
❌ Nama "Lingora" / "NihonHan"       → gunakan nama proyek EnglishPath
❌ Prefix 'nh_' di localStorage      → gunakan 'ep_'
```

---

## FORMAT OUTPUT YANG DIHARAPKAN

Saat mengerjakan satu fase, outputmu harus:

1. **Deklarasikan file yang akan dibuat/diubah** di awal
2. **Tulis kode lengkap** untuk setiap file — tidak ada bagian yang dipotong atau di-skip
3. **Urutkan file** dari core → modules → data → pages → CSS
4. **Sertakan README yang sudah diupdate** di akhir output
5. **Beri summary singkat** di bagian akhir: apa yang sudah dikerjakan, file apa yang dibuat/diubah, dan instruksi cara menjalankan/test fase ini

### Template Summary Akhir Fase
```
=== FASE [N] SELESAI ===

File Baru:
- path/ke/file.html
- path/ke/file.js
- path/ke/file.css

File Diubah:
- path/ke/file.html (update sidebar)
- README.md (update fase, log, struktur)

Cara Test:
1. Buka index.html di browser
2. [langkah spesifik untuk fase ini]
3. [hal yang perlu dicek]

Versi: v[X.Y.Z]
Cache SW: englishpath-v[N] (jika berlaku)
```

---

## CARA MEMULAI SESI BARU

### FASE 1 — Belum ada zip EnglishPath
```
Upload 3 file:
  1. MASTER_PROMPT.md   ← file ini
  2. README.md          ← README proyek EnglishPath
  3. lingora.zip        ← referensi arsitektur & pola kode

Tulis di chat:
  "Kerjakan FASE 1"

Output yang diminta dari Claude:
  → englishpath.zip berisi semua file hasil Fase 1 + README.md yang sudah diupdate
```

### FASE 2–3 — Ada zip EnglishPath, fondasi belum lengkap
```
Upload 3 file:
  1. MASTER_PROMPT.md   ← file ini
  2. englishpath.zip    ← zip hasil fase sebelumnya
  3. lingora.zip        ← masih dibutuhkan sebagai referensi

Tulis di chat:
  "Kerjakan FASE [2 atau 3]"

Output yang diminta dari Claude:
  → englishpath.zip baru berisi semua file (lama + baru) + README.md yang sudah diupdate
```

### FASE 4 dan Seterusnya — Fondasi EnglishPath sudah solid
```
Upload 2 file saja:
  1. MASTER_PROMPT.md   ← file ini (tidak pernah berubah)
  2. englishpath.zip    ← zip hasil fase sebelumnya

Tulis di chat:
  "Kerjakan FASE [N]"

Output yang diminta dari Claude:
  → englishpath.zip baru berisi semua file (lama + baru) + README.md yang sudah diupdate

Lingora.zip tidak perlu lagi — EnglishPath sudah punya fondasinya sendiri.
```

### Ringkasan Upload per Fase

| Fase | MASTER_PROMPT.md | README.md | englishpath.zip | lingora.zip |
|------|:---:|:---:|:---:|:---:|
| 1 | ✅ | ✅ | ❌ | ✅ |
| 2–3 | ✅ | ❌ (ada di zip) | ✅ | ✅ |
| 4–23 (termasuk sub-fase 16c-1, 16c-2 dst) | ✅ | ❌ (ada di zip) | ✅ | ❌ |

### Catatan Penting untuk Claude saat Menerima lingora.zip
Lingora adalah **referensi arsitektur**, bukan kode yang di-copy-paste.
Yang dipelajari dari Lingora:
- Pola `storage.js`, `auth.js`, `router.js`, `app.js`
- Pola sidebar inline HTML
- Anti-FOUC implementation
- SRS SM-2 algorithm di `srs.js`
- XP system di `xp.js`
- Challenge system di `challenge.js`
- Pola IIFE module di semua JS

Yang **tidak** diambil dari Lingora:
- Konten bahasa (hiragana, kanji, hanzi, hangul — semua dibuang)
- Prefix `nh_` → ganti dengan `ep_`
- Nama "Lingora" / "NihonHan" → ganti dengan nama proyek EnglishPath
- Struktur halaman per bahasa → ganti dengan struktur per level CEFR

### Catatan Penting untuk Claude saat Menerima englishpath.zip
Ketika menerima `englishpath.zip`:
1. **Ekstrak dan baca README.md** di dalamnya — ini sumber kebenaran kondisi proyek saat ini
2. **Baca file-file yang akan dimodifikasi** — jangan asumsikan isinya
3. **Pertahankan semua file lama** — zip output harus berisi file lama + file baru fase ini
4. **Jangan hapus atau overwrite** file dari fase sebelumnya kecuali memang harus diubah
5. **README di dalam zip output** harus sudah terupdate mencerminkan fase yang baru selesai

### Catatan Opsional
```
Jika ada keperluan khusus, tambahkan setelah perintah fase:

"Kerjakan FASE [N]. [catatan tambahan, misal: nama proyek sudah final 
jadi EnglishPro, gunakan tema warna biru sebagai default, dll]"
```

---

## KONTEKS TAMBAHAN: PERBEDAAN DENGAN LINGORA

EnglishPath terinspirasi dari Lingora (belajar JP/ZH/KR) tapi memiliki perbedaan mendasar:

| Aspek | Lingora | EnglishPath |
|-------|---------|-------------|
| Target bahasa | JP + ZH + KR | Bahasa Inggris |
| localStorage prefix | `nh_` | `ep_` |
| Struktur halaman | Per bahasa | Per level CEFR + per tes |
| Modul khusus | Kana, Kanji, Hanzi, dll | 4 Skills + Test Simulation |
| Timer engine | Tidak ada | `timer.js` untuk simulasi |
| Skill separation | Tidak (reading/listening/speaking/writing jadi satu) | Terpisah per skill |
| Test section | Tidak ada | IELTS, TOEIC, TOEFL, Cambridge |

Jangan copy-paste kode dari Lingora secara membabi buta. Ambil **pola arsitekturnya** (storage wrapper, IIFE module, anti-FOUC, SRS SM-2, XP system, challenge system) tapi adaptasi untuk konteks bahasa Inggris.

---

## DAFTAR FASE (REFERENSI CEPAT)

| Fase | Nama | Versi |
|------|------|-------|
| 1 | Fondasi & Autentikasi | v0.2.0 |
| 2 | Onboarding & Placement Test | v0.3.0 |
| 3 | Dashboard & Gamifikasi Dasar | v0.4.0 |
| 4 | Foundation: Vocabulary A1–A2 | v0.5.0 |
| 5 | Foundation: Pronunciation & Phonetics | v0.6.0 |
| 6 | Foundation: Grammar A1–A2 | v0.7.0 |
| 7 | Foundation: Dialog & Quiz | v0.8.0 |
| 8a | Intermediate: Vocabulary B1–B2 | v0.9.1 |
| 8b | Intermediate: Grammar B1–B2 | v0.9.2 |
| 9 | Intermediate: Reading & Listening | v1.0.0 |
| 10 | PWA, Profil & Settings | v1.1.0 |
| 11 | Tema & Kustomisasi UI | v1.2.0 |
| 12 | Study Planner | v1.3.0 |
| **13a** | **IELTS: Hub & Vocabulary** | **v2.0.1** |
| **13b** | **IELTS: Practice per Skill (Reading & Listening)** | **v2.0.2** |
| **13c-1** | **IELTS: Practice per Skill (Speaking & Writing)** | **v2.0.3** |
| **13c-2** | **IELTS: Simulasi Full Test + Halaman Hasil** | **v2.0.4** |
| **14a** | **TOEIC: Hub & Vocabulary** | **v2.1.1** |
| **14b** | **TOEIC: Practice per Part (Listening Parts 1–4)** | **v2.1.2** |
| **14c-1** | **TOEIC: Practice Reading (Parts 5–7)** | **v2.1.3** |
| **14c-2** | **TOEIC: Simulasi Full Test + Halaman Hasil** | **v2.1.4** |
| **15a** | **TOEFL iBT: Hub & Vocabulary** | **v2.2.1** |
| **15b** | **TOEFL iBT: Practice (Reading & Listening)** | **v2.2.2** |
| **15c-1** | **TOEFL iBT: Practice Speaking & Writing** | **v2.2.3** |
| **15c-2** | **TOEFL iBT: Simulasi Full Test + Halaman Hasil** | **v2.2.4** |
| **16a** | **Cambridge: Hub & Vocabulary** | **v2.3.1** |
| **16b** | **Cambridge: Practice (Reading & Use of English + Listening)** | **v2.3.2** |
| **16c-1** | **Cambridge: Practice Writing & Speaking** | **v2.3.3** |
| **16c-2** | **Cambridge: Simulasi Full Test + Halaman Hasil** | **v2.3.4** |
| **17a** | **Advanced: Vocabulary C1–C2** ✅ | **v2.4.1** |
| **17b** | **Advanced: Grammar C1–C2** | **v2.4.2** |
| 18 | Advanced: Reading & Listening | v2.5.0 |
| 19 | Speaking & Writing Modules | v2.6.0 |
| 20 | Mini Game (5 game) | v3.0.0 |
| 21 | Statistik, Backup & Laporan | v3.1.0 |
| 22 | Reminder & Notifikasi | v3.2.0 |
| 23 | Polish, Bug Fix & Optimasi Final | v3.3.0 |

---

## SCOPE DETAIL PER FASE TEST (13–16)

### FASE 13 — IELTS (3 Tahap)

**Fase 13a — IELTS: Hub & Vocabulary (v2.0.1)**
- Halaman hub IELTS (`pages/ielts/index.html`) — overview format tes, Band score chart 0–9, navigasi ke 4 skill & simulasi
- IELTS Vocabulary (`pages/ielts/vocabulary.html`) — 300+ kata Academic Word List + domain-specific (science, business, law, environment), flashcard + SRS + quiz
- Materi & strategi overview per skill (Reading, Listening, Speaking, Writing) ditampilkan di hub
- File baru: `ielts-vocab-data.js`, `ielts.css`, `ielts-vocab.js`
- localStorage baru: `ep_user_{id}_srs_ielts_vocab`, `ep_user_{id}_ielts_vocab`

**Fase 13b — IELTS: Practice Reading & Listening (v2.0.2)**
- Halaman practice Reading (`pages/ielts/reading.html`) — 4 passage Academic + 2 General Training, multiple choice / True-False-NG / matching, timer per passage
- Halaman practice Listening (`pages/ielts/listening.html`) — 4 section audio TTS (conversation, monolog, lecture, discussion), MCQ + form completion + matching
- File baru: `ielts-reading-data.js`, `ielts-listening-data.js`, `ielts-reading.js`, `ielts-listening.js`
- localStorage baru: `ep_user_{id}_ielts_reading`, `ep_user_{id}_ielts_listening`

**Fase 13c-1 — IELTS: Practice Speaking & Writing (v2.0.3)**
- Halaman practice Speaking (`pages/ielts/speaking.html`) — Part 1 (short Q&A, 8 topik, TTS soal), Part 2 (long turn + cue card + timer 2 menit countdown), Part 3 (discussion prompts), TTS model answer per pertanyaan, self-assessment rubrik (Fluency, Vocabulary, Grammar, Pronunciation) skala 1–9
- Halaman practice Writing (`pages/ielts/writing.html`) — Task 1 Academic (describe graph/chart/diagram, sample data visual teks, 150 kata min), Task 1 General Training (letter writing: formal/semi-formal/informal), Task 2 Essay (argument/discussion/opinion, 250 kata min) — guided planning (mind map prompt), model answers, word count tracker real-time, scoring rubric display
- File baru: `ielts-speaking-data.js`, `ielts-writing-data.js`, `ielts-speaking.js`, `ielts-writing.js`, `ielts-skill.css`
- localStorage baru: `ep_user_{id}_ielts_speaking`, `ep_user_{id}_ielts_writing`

**Fase 13c-2 — IELTS: Simulasi Full Test + Halaman Hasil (v2.0.4)**
- Halaman simulasi full test (`pages/ielts/simulation.html`) — flow 4 skill timed: Listening (30 min, 4 section TTS MCQ) → Reading (60 min, 3 passage MCQ+T/F/NG) → Writing (60 min, Task 1 + Task 2 text area + word counter) → Speaking (cue card prompts, timer 2 min per Part); navigasi antar section otomatis, progress bar overall
- Halaman hasil (`pages/ielts/result.html`) — Band per section (Listening/Reading dihitung dari raw score, Writing/Speaking dari self-assessment), estimated overall Band 0–9 (rata-rata 4 section, dibulatkan ke 0.5), rekomendasi belajar per skill, riwayat simulasi (5 hasil terakhir)
- Band Score calculator: raw score → Band 0–9 sesuai tabel IELTS resmi
- +100 XP on complete simulasi, badge `ielts_ready` jika estimated Band ≥ 6.0
- File baru: `ielts-simulation-data.js`, `ielts-simulation.js`, `ielts-result.js`, `simulation.css`
- localStorage baru: `ep_user_{id}_sim_results`

---

### FASE 14 — TOEIC (3 Tahap)

**Fase 14a — TOEIC: Hub & Vocabulary (v2.1.1)**
- Halaman hub TOEIC (`pages/toeic/index.html`) — overview format tes, score chart 10–990, struktur 7 parts (LC Parts 1–4, RC Parts 5–7)
- TOEIC Vocabulary (`pages/toeic/vocabulary.html`) — 300+ kata Business English (meetings, HR, finance, office, travel, logistics, customer service), flashcard + SRS + quiz
- File baru: `toeic-vocab-data.js`, `toeic.css`, `toeic-vocab.js`
- localStorage baru: `ep_user_{id}_srs_toeic_vocab`, `ep_user_{id}_toeic_vocab`

**Fase 14b — TOEIC: Practice Listening (Parts 1–4) (v2.1.2)**
- Halaman practice Listening (`pages/toeic/listening.html`) — semua 4 Parts:
  - Part 1: Photograph Description (gambar → pilih kalimat deskripsi terbaik, TTS)
  - Part 2: Question-Response (pertanyaan → pilih respons terbaik, TTS)
  - Part 3: Short Conversations (dialog → MCQ, TTS)
  - Part 4: Short Talks (monolog → MCQ, TTS)
- Timer per set latihan, feedback per soal
- File baru: `toeic-listening-data.js`, `toeic-listening.js`
- localStorage baru: `ep_user_{id}_toeic_listening`

**Fase 14c-1 — TOEIC: Practice Reading Parts 5–7 (v2.1.3)**
- Halaman practice Reading (`pages/toeic/reading.html`) — semua 3 Parts:
  - Part 5: Incomplete Sentences (pilih kata/frasa yang tepat, 10 soal)
  - Part 6: Text Completion (isi blank dalam paragraf pendek, 4 teks × 4 blanks)
  - Part 7: Reading Comprehension (single + double passage, MCQ, 3 single + 2 double passage)
- Timer per set latihan, feedback per soal, review jawaban di akhir
- File baru: `toeic-reading-data.js`, `toeic-reading.js`
- localStorage baru: `ep_user_{id}_toeic_reading`

**Fase 14c-2 — TOEIC: Simulasi Full Test + Halaman Hasil (v2.1.4)**
- Halaman simulasi full test (`pages/toeic/simulation.html`) — Listening Section (45 menit, Parts 1–4) + Reading Section (75 menit, Parts 5–7), auto-advance antar section, progress bar per section
- Halaman hasil (`pages/toeic/result.html`) — score Listening + Reading + Total (10–990), performa per Part, rekomendasi belajar, riwayat 5 simulasi terakhir
- Score converter: jumlah benar → skala TOEIC 10–990 (Listening 5–495, Reading 5–495)
- +100 XP on complete simulasi, badge `toeic_ready` jika total ≥ 700
- File baru: `toeic-simulation-data.js`, `toeic-simulation.js`, `toeic-result.js`
- localStorage baru: tambah entry ke `ep_user_{id}_sim_results`

---

### FASE 15 — TOEFL iBT (3 Tahap)

**Fase 15a — TOEFL iBT: Hub & Vocabulary (v2.2.1)**
- Halaman hub TOEFL (`pages/toefl/index.html`) — overview format tes, score 0–120 (4×30), MyBest scores explanation, section breakdown
- TOEFL Vocabulary (`pages/toefl/vocabulary.html`) — 300+ kata Academic Word List Tier 1–2 + scientific & academic domains (biology, economics, history, psychology), flashcard + SRS + quiz
- File baru: `toefl-vocab-data.js`, `toefl.css`, `toefl-vocab.js`
- localStorage baru: `ep_user_{id}_srs_toefl_vocab`, `ep_user_{id}_toefl_vocab`

**Fase 15b — TOEFL iBT: Practice Reading & Listening (v2.2.2)**
- Halaman practice Reading (`pages/toefl/reading.html`) — 3 passage akademik (500–700 kata), soal: factual info, inference, vocabulary in context, insert text, prose summary
- Halaman practice Listening (`pages/toefl/listening.html`) — 2 lecture + 1 conversation, soal: main idea, detail, function, attitude, organization
- File baru: `toefl-reading-data.js`, `toefl-listening-data.js`, `toefl-reading.js`, `toefl-listening.js`
- localStorage baru: `ep_user_{id}_toefl_reading`, `ep_user_{id}_toefl_listening`

**Fase 15c-1 — TOEFL iBT: Practice Speaking & Writing (v2.2.3)**
- Halaman practice Speaking (`pages/toefl/speaking.html`) — Task 1 Independent (pilih & defend pendapat, timer 45 det persiapan + 60 det bicara), Tasks 2–4 Integrated (baca/dengar → bicara), rubrik 0–4, model answers
- Halaman practice Writing (`pages/toefl/writing.html`) — Task 1 Integrated (baca passage + dengar lecture → tulis 150–225 kata, word count tracker), Task 2 Academic Discussion (balas post diskusi akademik, 100+ kata), rubrik 0–5
- File baru: `toefl-speaking-data.js`, `toefl-writing-data.js`, `toefl-speaking.js`, `toefl-writing.js`
- localStorage baru: `ep_user_{id}_toefl_speaking`, `ep_user_{id}_toefl_writing`

**Fase 15c-2 — TOEFL iBT: Simulasi Full Test + Halaman Hasil (v2.2.4)**
- Halaman simulasi full test (`pages/toefl/simulation.html`) — Reading (54 min) → Listening (41 min) → 10-min break → Speaking (17 min) → Writing (50 min); navigasi antar section otomatis, progress bar overall
- Halaman hasil (`pages/toefl/result.html`) — score per section (0–30 each), total 0–120, diagnostic per skill, next steps rekomendasi, riwayat 5 simulasi terakhir
- Score calculator: raw correct → skala 0–30 per section, total 0–120 (sesuai rubrik TOEFL iBT)
- +100 XP on complete, badge `toefl_ready` jika total ≥ 80
- File baru: `toefl-simulation-data.js`, `toefl-simulation.js`, `toefl-result.js`
- localStorage baru: tambah entry ke `ep_user_{id}_sim_results`

---

### FASE 16 — Cambridge (3 Tahap)

**Fase 16a — Cambridge: Hub & Vocabulary (v2.3.1)**
- Halaman hub Cambridge (`pages/cambridge/index.html`) — overview B2 First (FCE) & C1 Advanced (CAE), grade A–U, struktur 4 papers, pilihan level
- Cambridge Vocabulary (`pages/cambridge/vocabulary.html`) — 300+ kata advanced: collocations, phrasal verbs, idioms, word formation (prefix/suffix/conversion), C1-level academic vocabulary, flashcard + SRS + quiz
- File baru: `cambridge-vocab-data.js`, `cambridge.css`, `cambridge-vocab.js`
- localStorage baru: `ep_user_{id}_srs_cambridge_vocab`, `ep_user_{id}_cambridge_vocab`

**Fase 16b — Cambridge: Practice Reading & Use of English + Listening (v2.3.2)**
- Halaman practice Reading & Use of English (`pages/cambridge/reading.html`) — 7 parts (B2) / 8 parts (C1):
  - Part 1: Multiple-choice cloze
  - Part 2: Open cloze
  - Part 3: Word formation
  - Part 4: Key word transformation
  - Part 5–7/8: Reading comprehension (multiple choice, gapped text, multiple matching)
- Halaman practice Listening (`pages/cambridge/listening.html`) — 4 parts: MCQ short extracts, sentence completion, MCQ long text, multiple matching
- File baru: `cambridge-reading-data.js`, `cambridge-listening-data.js`, `cambridge-reading.js`, `cambridge-listening.js`
- localStorage baru: `ep_user_{id}_cambridge_reading`, `ep_user_{id}_cambridge_listening`

**Fase 16c-1 — Cambridge: Practice Writing & Speaking (v2.3.3)** ✅ SELESAI 2026-02-26
- Halaman practice Writing (`pages/cambridge/writing.html`) — Part 1 (essay compulsory, guided planning, word count tracker real-time, min 140/220 kata), Part 2 (pilihan: letter/email, report, review, article, story — per task: stimulus + prompt + planning prompts + writing area + word count + model answer + TTS), rubrik assessment criteria per task (Content, Communicative Achievement, Organisation, Language)
- Halaman practice Speaking (`pages/cambridge/speaking.html`) — Part 1 (interview, 5 topik × 3 soal, TTS soal + model answer), Part 2 (individual long turn, compare 2 foto via teks deskripsi, timer 1 menit, model answer), Part 3 (collaborative task, 5 prompt diskusi + timer 3 menit), Part 4 (further discussion, 4 soal open-ended follow-up), self-assessment rubrik (Grammar & Vocabulary, Discourse Management, Pronunciation, Interactive Communication) skala 0–5
- File baru: `cambridge-writing-data.js`, `cambridge-speaking-data.js`, `cambridge-writing.js`, `cambridge-speaking.js`
- localStorage baru: `ep_user_{id}_cambridge_writing` — {results: {taskId: {attempts, lastWordCount, lastSelfScore, lastDraft, lastDate}}, totalAttempts}, `ep_user_{id}_cambridge_speaking` — {results: {partId: {attempts, lastSelfScore, lastDate}}, totalAttempts}

✅ **Fase 16c-2 — Cambridge: Simulasi Full Test + Halaman Hasil (v2.3.4)** ✅ SELESAI 2026-02-26
- Halaman simulasi full test (`pages/cambridge/simulation.html`) — pilihan level B2/C1 di awal; flow 4 section timed: Reading & Use of English (75 min, Parts 1–4 Use of English + Part 5–7/8 Reading, soal subset) → Writing (80 min, Part 1 Essay wajib + Part 2 pilihan satu dari 3 opsi, word count tracker) → Listening (40 min, 4 parts TTS MCQ + sentence completion + matching) → Speaking (prompts self-paced, 4 parts dengan timer visual); navigasi antar section otomatis, progress bar overall, warning sebelum submit
- Halaman hasil (`pages/cambridge/result.html`) — score per paper (Use of English raw, Reading raw, Writing self-score 1–5, Listening raw, Speaking self-score 1–5), konversi ke Cambridge Scale 80–230, estimated grade A/B/C/D/E/U, performa per skill dalam grafik bar teks, rekomendasi belajar per skill, riwayat 5 simulasi terakhir, +100 XP on complete, badge `cambridge_ready` jika estimated grade ≥ C
- Grade calculator: Cambridge Scale → Grade (A: 193–230, B: 180–192, C: 169–179, D: 160–168, E: 142–159, U: <142)
- File baru: `cambridge-simulation-data.js`, `cambridge-simulation.js`, `cambridge-result.js`
- localStorage baru: tambah entry ke `ep_user_{id}_sim_results` — {testType:'cambridge', date, level:'B2'/'C1', scores:{reading, uoe, writing, listening, speaking}, cambridgeScale, grade, xpAwarded}

---

### FASE 17 — Advanced C1–C2 (2 Tahap)

✅ **Fase 17a — Advanced: Vocabulary C1–C2 (v2.4.1)** ✅ SELESAI 2026-02-26
- Halaman hub Advanced (`pages/advanced/index.html`) — overview modul Advanced (C1–C2), jalur dari test-prep ke mastery, navigasi ke Vocabulary, Grammar, Reading, Listening
- Halaman Vocabulary Advanced (`pages/advanced/vocabulary.html`) — 400+ kata C1–C2 dalam 8 domain (Academic & Intellectual, Formal & Written English, Idioms & Fixed Expressions, Collocations Advanced, Phrasal Verbs C1–C2, Word Formation Patterns, Nuanced Adjectives & Adverbs, Specialized Domains: Science/Law/Business), 5 mode belajar: Browse (search + domain filter + progress badge) / Flashcard (3D flip, SRS quality) / Quiz (translate + fill-in-context + word family) / SRS Review (SM-2 due cards) / Word Family Explorer (cluster kata per root/family)
- File baru: `advanced-vocab-data.js`, `advanced.css`, `advanced-vocab.js`
- localStorage baru: `ep_user_{id}_srs_advanced_vocab`, `ep_user_{id}_advanced_vocab`
- XP: +5 vocab baru, +2 SRS review, +3 quiz benar, +20 quiz sempurna
- SW bump: `englishpath-v19`

**Fase 17b — Advanced: Grammar C1–C2 (v2.4.2)**
- Halaman Grammar Advanced (`pages/advanced/grammar.html`) — 12 topik grammar C1–C2 dengan penjelasan mendalam + contoh + latihan 3 tipe soal (MCQ, fill-in, transform/rewrite)
- Topik wajib:
  1. Inversion (Negative Adverbials: Not only...but, Hardly...when, No sooner...than, dll)
  2. Cleft Sentences (It is...that, What...is/are, All that, The reason why)
  3. Nominal Clauses (that-clause, wh-clause, whether/if)
  4. Complex Conditionals (Mixed, Inverted: Had I known, Were it not for, Should you need)
  5. Subjunctive Mood (It is essential that, Wish/If only, as if/as though)
  6. Advanced Passive Constructions (passive infinitive, passive with modals, get-passive)
  7. Participle Clauses (present/past/perfect participle, dangling modifier avoidance)
  8. Ellipsis & Substitution (so/not/do so, auxiliary substitution, pro-form)
  9. Advanced Articles & Determiners (zero article with abstract nouns, generic reference)
  10. Discourse Markers & Cohesion (stance markers, hedging language, academic discourse)
  11. Advanced Modal Verbs (epistemic modality, must have, should have, needn't have)
  12. Emphasis & Focus Structures (fronting, thematic progression, end-focus)
- Setiap topik: 10 soal latihan acak, 3 tipe: MCQ, isi kosong (typed), transform kalimat
- File baru: `advanced-grammar-data.js`, `advanced-grammar.js`
- localStorage baru: `ep_user_{id}_advanced_grammar`
- XP: +3 soal benar, +20 bonus sempurna; topik selesai jika skor terbaik ≥ 70%
- SW bump: `englishpath-v20`

---

*EnglishPath — From A1 to IELTS, one word at a time.*
*Master prompt ini adalah panduan pengembangan. Baca sebelum mengerjakan fase apapun.*
