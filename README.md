# EnglishPath — Belajar Bahasa Inggris dari Nol hingga Tes Internasional

Aplikasi web interaktif untuk mempelajari Bahasa Inggris — dari level A1 pemula hingga persiapan dan simulasi tes IELTS, TOEIC, TOEFL, dan Cambridge.  
**Offline-first · Pure localStorage · Tanpa server · Tanpa instalasi · PWA Ready**

---

## Daftar Isi

1. [Status & Versi](#1-status--versi)
2. [Deskripsi Proyek](#2-deskripsi-proyek)
3. [Target Pengguna & Pendekatan Belajar](#3-target-pengguna--pendekatan-belajar)
4. [Cara Menjalankan](#4-cara-menjalankan)
5. [Struktur Folder (Target Akhir)](#5-struktur-folder-target-akhir)
6. [Arsitektur & Pola Kode](#6-arsitektur--pola-kode)
7. [localStorage Key Reference](#7-localstorage-key-reference)
8. [Rencana Konten & Kurikulum](#8-rencana-konten--kurikulum)
9. [Riwayat Fase](#9-riwayat-fase)
10. [Roadmap Fase Mendatang](#10-roadmap-fase-mendatang)
11. [Panduan untuk Claude Selanjutnya](#11-panduan-untuk-claude-selanjutnya)
12. [Log Pengerjaan & Versi](#12-log-pengerjaan--versi)

---

## 1. Status & Versi

| Info | Detail |
|------|--------|
| **Nama Proyek** | EnglishPath |
| **Versi App** | 2.2.3 |
| **Fase Saat Ini** | FASE 15c-1 ✅ — TOEFL iBT: Practice Speaking & Writing |
| **Fase Berikutnya** | FASE 15c-2 — TOEFL iBT: Simulasi Full Test + Hasil (v2.2.4) |
| **Tech Stack** | HTML5 + CSS3 + JavaScript ES6+ (Vanilla, no framework) |
| **Storage** | `localStorage` 100% — tanpa server, tanpa database |
| **Target Bahasa** | Bahasa Inggris (British & American English) |
| **Level** | A1 → A2 → B1 → B2 → C1 → C2 (CEFR) |
| **Target Ujian** | IELTS, TOEIC, TOEFL iBT, Cambridge (B2 First, C1 Advanced) |
| **PWA** | ✅ Aktif sejak Fase 10 (manifest.json + sw.js) |
| **Deploy** | GitHub Pages / Netlify (butuh HTTPS untuk PWA penuh) |

---

## 2. Deskripsi Proyek

**EnglishPath** adalah aplikasi web belajar Bahasa Inggris yang berjalan **100% di browser** tanpa server, database, atau koneksi internet setelah diunduh. Seluruh data user tersimpan di `localStorage`.

### Keunggulan Utama

- **Jalur terstruktur A1→C2** — Kurikulum linier yang jelas, tidak membingungkan pemula
- **Persiapan tes internasional** — Simulasi nyata IELTS, TOEIC, TOEFL iBT, Cambridge
- **Skill-based learning** — 4 skill (Reading, Listening, Speaking, Writing) dilatih secara merata
- **Gamifikasi lengkap** — XP, Level, Badge, Streak, Challenge Harian, Mini Game
- **Offline-first** — Belajar di mana saja tanpa khawatir koneksi

---

## 3. Target Pengguna & Pendekatan Belajar

### Target Pengguna

- **Usia:** 18–35 tahun
- **Latar belakang:** Berbahasa Indonesia, ingin meningkatkan kemampuan bahasa Inggris
- **Tujuan bervariasi:** Pemula A1, peningkatan grammar/vocab, English for Work, persiapan tes

### Pendekatan Belajar

| Prinsip | Implementasi |
|---------|-------------|
| **Input Comprehensible** | Materi selalu sedikit di atas level user (i+1) |
| **Spaced Repetition** | Algoritma SM-2 untuk vocabulary dan grammar patterns |
| **Active Recall** | Quiz multi-mode: pilihan ganda, isi kosong, ketik jawaban |
| **Skill Integration** | Listening + Reading + Speaking + Writing dalam satu platform |
| **Test-oriented Practice** | Format soal mirip ujian asli sejak B1 |
| **Gamifikasi Intrinsik** | Reward berbasis progress nyata |

---

## 4. Cara Menjalankan

### Lokal (tanpa server)

```
1. Ekstrak zip ke folder manapun
2. Double klik index.html
3. Daftar akun baru → langsung bisa digunakan
4. Tidak perlu npm, pip, server, atau koneksi internet
```

### GitHub Pages / Netlify (untuk PWA penuh)

```
1. Upload folder ke repo GitHub
2. Aktifkan GitHub Pages dari root
3. Akses via HTTPS → PWA install prompt akan muncul (mulai Fase 10)
```

---

## 5. Struktur Folder (Saat Ini — Fase 14c-2)

```
englishpath/
├── index.html                          ← Splash screen + redirect
├── 404.html                            ← Halaman not found
├── README.md                           ← Dokumentasi ini
│
├── components/
│   └── sidebar.html                    ← Template referensi sidebar
│
├── pages/
│   ├── login.html                      ✅ Login (2 kolom, hero kiri)
│   ├── register.html                   ✅ Daftar akun → redirect onboarding
│   ├── onboarding.html                 ✅ Wizard 5-step + Placement Test
│   ├── dashboard.html                  ✅ Dashboard lengkap (Fase 3)
│   ├── profile.html                    ✅ Edit profil + avatar picker
│   ├── change-password.html            ✅ Ganti password
│   ├── settings.html                   ✅ Pengaturan tema, font, radius
│   ├── theme.html                      ✅ Kustomisasi UI lengkap (Fase 11)
│   ├── planner.html                    ✅ Study Planner (Fase 12)
│   ├── stats.html                      ✅ Placeholder → Fase 21 (lengkap)
│   ├── foundation/                     ✅ FASE 4–7 SELESAI
│   │   ├── vocabulary.html             ✅ Vocab A1–A2: browse/flashcard/quiz/SRS (Fase 4)
│   │   ├── pronunciation.html          ✅ Pronunciation & Phonetics (Fase 5)
│   │   ├── grammar.html                ✅ Grammar A1–A2: 12 topik, 120+ soal (Fase 6)
│   │   ├── dialog.html                 ✅ Dialog A1–A2: 9 scene, role-play, latihan (Fase 7)
│   │   └── quiz.html                   ✅ Quiz Foundation: 6 paket, 60 soal (Fase 7)
│   ├── intermediate/                   ✅ Fase 8a–9 (selesai)
│   │   ├── vocabulary.html             ✅ Vocab B1–B2: browse/flashcard/quiz/SRS/word families (Fase 8a)
│   │   ├── grammar.html                ✅ Grammar B1–B2: 12 topik, 120+ soal, 3 tipe quiz (Fase 8b)
│   │   ├── reading.html                ✅ Reading B1–B2: 8 artikel, key vocab, comprehension quiz (Fase 9)
│   │   └── listening.html              ✅ Listening B1–B2: 8 audio track TTS, transkrip, quiz (Fase 9)
│   ├── advanced/                       🔲 Fase 17–18
│   ├── ielts/                          ✅ Fase 13a–13c-2 (Hub + Vocab + Reading + Listening + Speaking + Writing + Simulasi + Hasil)
│   ├── toeic/                          ✅ Fase 14a–14c-2 SELESAI (Hub + Vocab + Listening + Reading + Simulasi + Hasil)
│   ├── toefl/                          ✅ Fase 15a–15c-1 (Hub + Vocab + Reading + Listening + Speaking + Writing) — Fase 15c-2 🔲
│   └── cambridge/                      🔲 Fase 16a–16b
│
└── assets/
    ├── css/
    │   ├── main.css                    ✅ Variables, reset, dark mode, color themes
    │   ├── layout.css                  ✅ Sidebar, topbar, page shell, bottom nav
    │   ├── auth.css                    ✅ Login & register pages
    │   ├── onboarding.css              ✅ Wizard onboarding styles
    │   ├── dashboard.css               ✅ Dashboard styles lengkap (Fase 3)
    │   ├── vocabulary.css              ✅ Vocabulary page styles (Fase 4)
    │   ├── grammar.css                 ✅ Grammar page styles (Fase 6)
    │   ├── dialog.css                  ✅ Dialog page styles (Fase 7)
    │   └── quiz-foundation.css         ✅ Quiz Foundation styles (Fase 7)
│   └── vocab-intermediate.css      ✅ Vocabulary Intermediate styles (Fase 8a)
│   └── grammar-intermediate.css    ✅ Grammar Intermediate styles (Fase 8b)
│   └── reading-intermediate.css    ✅ Reading Intermediate styles (Fase 9)
│   └── listening-intermediate.css  ✅ Listening Intermediate styles (Fase 9)
│   └── profile.css                 ✅ Profile & Settings styles (Fase 10)
│   └── theme.css                   ✅ Theme & Customization page styles (Fase 11)
│   └── planner.css                 ✅ Study Planner styles (Fase 12)
│   └── ielts.css                   ✅ IELTS Hub & Vocab styles (Fase 13a)
│   └── ielts-skill.css             ✅ IELTS Speaking & Writing styles (Fase 13c-1)
│   └── simulation.css              ✅ Simulation styles IELTS/TOEIC (Fase 13c-2)
│   └── toeic.css                   ✅ TOEIC Hub, Vocab, Practice styles (Fase 14a–14c-2)
│   └── toefl.css                   ✅ TOEFL Hub, Vocab, Reading, Listening styles (Fase 15a–15b)
    ├── icons/
    ├── manifest.json                   ✅ PWA manifest (Fase 10)
├── sw.js                           ✅ Service Worker (Fase 10)
│   ├── icon-192.png               ✅
    │   └── icon-512.png               ✅
    └── js/
        ├── core/
        │   ├── storage.js              ✅ localStorage wrapper (prefix ep_)
        │   ├── auth.js                 ✅ Register, login, logout, session, streak
        │   ├── router.js               ✅ guard(), guestOnly(), go(), setActiveNav()
        │   └── app.js                  ✅ Toast, sidebar, theme, renderUserInfo, init()
        ├── modules/
        │   ├── xp.js                       ✅ XP system, level calculation, XP history
        │   ├── challenge.js                ✅ Daily Challenge system (Fase 3)
        │   ├── badge.js                    ✅ Badge system, 15 badge, auto-check (Fase 3)
        │   └── srs.js                      ✅ SM-2 Spaced Repetition engine (Fase 4)
        ├── data/
        │   ├── placement-questions.js      ✅ 20 soal placement test A1–B2
        │   ├── vocabulary-data.js          ✅ 500+ kata A1–A2 (13 tema) — Fase 4
        │   ├── grammar-data.js             ✅ 12 topik grammar A1–A2 + 120 soal — Fase 6
        │   ├── dialog-data.js              ✅ 9 scene dialog A1–A2 + 45 latihan — Fase 7
        │   └── quiz-foundation-data.js     ✅ 6 paket quiz, 60 soal komprehensif — Fase 7
│   └── vocab-intermediate-data.js  ✅ 400+ kata B1–B2 (10 tema) + Word Families — Fase 8a
        │   └── grammar-intermediate-data.js ✅ 12 topik grammar B1–B2 + 120 soal — Fase 8b
        │   └── reading-intermediate-data.js ✅ 8 artikel B1–B2 + kosakata + 40 soal quiz — Fase 9
        │   └── listening-intermediate-data.js ✅ 8 audio track B1–B2 + frasa + 40 soal quiz — Fase 9
        │   └── planner-data.js             ✅ Study Planner: 5 tes, milestone, jadwal harian, tips (Fase 12)
        └── pages/
            ├── onboarding.js               ✅ Wizard onboarding logic
            ├── dashboard.js                ✅ Dashboard page logic (Fase 3)
            ├── vocabulary.js               ✅ Vocab page: browse/flashcard/quiz/SRS (Fase 4)
            ├── pronunciation.js            ✅ Pronunciation page logic (Fase 5)
            ├── grammar.js                  ✅ Grammar page logic (Fase 6)
            ├── dialog.js                   ✅ Dialog page logic (Fase 7)
            └── quiz-foundation.js          ✅ Quiz Foundation page logic (Fase 7)
            └── vocab-intermediate.js       ✅ Vocab Intermediate page logic (Fase 8a)
            ├── grammar-intermediate.js     ✅ Grammar Intermediate page logic (Fase 8b)
            ├── reading-intermediate.js     ✅ Reading Intermediate page logic (Fase 9)
            └── listening-intermediate.js   ✅ Listening Intermediate page logic (Fase 9)
            └── planner.js                  ✅ Study Planner page logic (Fase 12)
```

---

## 6. Arsitektur & Pola Kode

### Anti-FOUC (WAJIB di `<head>` setiap halaman)

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

### Init Halaman Protected

```javascript
Router.guard();        // Redirect ke login jika tidak authenticated
App.init('page-id'); // Init sidebar, toast, dark mode, theme
```

### Module Pattern

```javascript
const ModuleName = (function() {
  let _private = null;
  function _helper() {}
  return {
    init() {},
    publicMethod() {},
  };
})();
```

### Script Load Order

```html
<script src="../assets/js/core/storage.js"></script>
<script src="../assets/js/core/auth.js"></script>
<script src="../assets/js/core/router.js"></script>
<script src="../assets/js/core/app.js"></script>
<!-- modul lain setelah ini -->
```

### getBase() Helper

`getBase()` tersedia sebagai global function (didefinisikan di `auth.js`).
Menghitung path relatif ke root berdasarkan kedalaman folder.

---

## 7. localStorage Key Reference

### Prefix: `ep_`

### Keys Global

| Key | Deskripsi |
|-----|-----------|
| `ep_dark_mode` | `'true'` / `'false'` |
| `ep_color_theme` | string tema aktif: `'ocean'` / `'forest'` / `'sunset'` / `'violet'` |
| `ep_font` | string font: `'default'` / `'serif'` / `'mono'` |
| `ep_radius` | string radius: `'default'` / `'sharp'` / `'round'` |
| `ep_current_user` | userId yang sedang login |
| `ep_users` | JSON array semua user terdaftar |

### Keys Per-User (`ep_user_{id}_...`)

| Suffix | Tipe | Isi |
|--------|------|-----|
| `profile` | Object | name, email, avatar, bio, createdAt |
| `progress` | Object | progress semua modul |
| `favorites` | Object | bookmark per modul |
| `quiz_scores` | Array | riwayat skor quiz |
| `xp` | Number | total XP |
| `xp_history` | Array | {action, amount, label, date, totalAfter} |
| `level` | Number | level saat ini |
| `streak` | Number | hari berturut-turut |
| `last_active` | ISO date string | `'YYYY-MM-DD'` |
| `activity_log` | Array | {date, modules[]} |
| `badges` | Array | badge yang diraih |
| `settings` | Object | {darkMode, colorTheme, font, radius, ...} |
| `onboarding` | Object | {completed, level, targetTest, dailyGoal, testCorrect, testTotal, completedAt} |
| `challenge` | Object | {date, tasks[], completed, xpAwarded} |
| `challenge_log` | Array | tanggal challenge yang diselesaikan |
| `srs_vocab_foundation` | Object | SM-2 data per word id — {repetitions, interval, ef, nextReview, lastReview} |
| `grammar_foundation` | Object | {topicsStudied, quizResults{best,attempts,lastScore}, totalXP, quizzesDone} |
| `grammar_intermediate` | Object | {topicsStudied, quizResults{best,attempts,lastScore}, totalXP, quizzesDone} |
| `reading_intermediate` | Object | {completed{articleId:true}, scores{articleId:pct}, totalRead} |
| `listening_intermediate` | Object | {completed{trackId:true}, scores{trackId:pct}, totalListened} |
| `dialog_foundation` | Object | {scenesRead, exerciseResults{best,attempts}, totalXP, exercisesDone} |
| `quiz_foundation` | Object | {setResults{best,attempts,lastScore}, totalXP, attempts} |
| `customization` | Object | {colorTheme, font, radius} — preferensi tampilan per user |
| `planner_plan` | Object | {testId, targetScore, startDate, targetDate, weeklyPlan[], dailyChecks{}, milestoneCompleted{}, createdAt} |
| `srs_ielts_vocab` | Object | SM-2 data per IELTS word id — {repetitions, interval, ef, nextReview, lastReview} |
| `ielts_vocab` | Object | {domains studied, quiz results, flashcard progress} |
| `ielts_reading` | Object | {results: {passageId: {best, attempts, lastScore, lastDate}}, totalAttempts} |
| `ielts_listening` | Object | {results: {sectionId: {best, attempts, lastScore, lastDate}}, totalAttempts} |
| `ielts_speaking` | Object | {results: {part_itemId: {attempts, lastSelfBand, lastDate}}, totalAttempts} |
| `ielts_writing` | Object | {results: {taskType_taskId: {attempts, lastWordCount, lastDate, lastDraft}}, totalAttempts} |
| `sim_results` | Array | [{testType, date, bands: {listening, reading, writing, speaking}, overallBand, xpAwarded}] |
| `srs_toeic_vocab` | Object | SM-2 data per TOEIC word id — {repetitions, interval, ef, nextReview, lastReview} |
| `toeic_vocab` | Object | {wordId: {learnedAt, mastered?}} per TOEIC Business word |
| `toeic_listening` | Object | {results: {partN: {best, attempts, lastScore, lastCorrect, lastTotal, lastDate}}, totalAttempts} |
| `toeic_reading` | Object | {results: {part5/part6/part7: {best, attempts, lastScore, lastCorrect, lastTotal, lastDate}}, totalAttempts} |
| `srs_toefl_vocab` | Object | SM-2 data per TOEFL word id — {repetitions, interval, ef, nextReview, lastReview} |
| `toefl_vocab` | Object | {wordId: {learnedAt, mastered?}} per TOEFL Academic word |

---

## 8. Rencana Konten & Kurikulum

### Foundation (A1–A2)
- Vocabulary: 500+ kata tema greetings, family, food, numbers, colors, body, time
- Grammar: To Be, Simple Present, Simple Past, articles, prepositions
- Pronunciation: IPA basics, vowel/consonant sounds, stress patterns
- Dialog: 20+ situational dialogs (introducing yourself, shopping, directions)

### Intermediate (B1–B2)
- Vocabulary: 1000+ kata tema work, travel, news, environment, technology
- Grammar: Conditionals, Passive Voice, Perfect Tenses, Reported Speech
- Reading: articles, news excerpts, essays
- Listening: dialogs, monologs, podcast-style content

### Advanced (C1–C2)
- Vocabulary: Idioms, phrasal verbs, collocations, Academic Word List
- Grammar: Inversion, Cleft sentences, Nominal clauses
- Reading/Listening: Academic texts, debates, native-speed content

### Tes Internasional
- IELTS: Academic & General Training, 4 skills, Band 0–9
- TOEIC: Listening & Reading, Parts 1–7, score 10–990
- TOEFL iBT: Reading, Listening, Speaking, Writing, score 0–120
- Cambridge: B2 First & C1 Advanced

---

## 9. Riwayat Fase

### FASE 0 — Perencanaan & README ✅
**Versi:** v0.1.0 | **Tanggal:** 2026-02-26

Dokumen perencanaan lengkap dengan 23 fase roadmap.

---

### FASE 1 — Fondasi & Autentikasi ✅
**Versi:** v0.2.0 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `index.html` — Splash screen dengan loading animation, redirect ke login/dashboard
- `404.html` — Custom 404 page
- `assets/css/main.css` — Variables, reset, dark mode, 4 color themes, font, radius, toast
- `assets/css/layout.css` — Sidebar, topbar, page shell, bottom nav mobile, responsive
- `assets/css/auth.css` — Login & register pages, 2-column layout, form components
- `assets/js/core/storage.js` — localStorage wrapper dengan prefix `ep_`, getUser/setUser/delUser
- `assets/js/core/auth.js` — Register, login, logout, session, changePassword, updateProfile, streak
- `assets/js/core/router.js` — guard(), guestOnly(), go(), setActiveNav()
- `assets/js/core/app.js` — Toast, sidebar drawer, renderUserInfo, dark mode toggle, checkPasswordStrength
- `pages/login.html` — Login dua kolom: panel kiri dekoratif + form kanan, live validation
- `pages/register.html` — Register dengan password strength meter, live validation
- `pages/onboarding.html` — Placeholder (konten lengkap di Fase 2)
- `pages/dashboard.html` — Dashboard dengan welcome, stats dasar, CTA grid (konten penuh di Fase 3)
- `pages/profile.html` — Edit profil, avatar picker (16 avatar emoji), bio
- `pages/change-password.html` — Form ganti password dengan validasi lengkap
- `pages/settings.html` — Dark mode toggle, color theme picker, font, radius
- `pages/stats.html` — Stats ringkas (lengkap di Fase 21)
- `components/sidebar.html` — Template referensi sidebar
- `assets/icons/icon-192.png` & `icon-512.png` — App icons

**Fitur yang berfungsi:**
- ✅ Register akun baru (validasi nama, email, password)
- ✅ Login dengan email + password
- ✅ Logout
- ✅ Auth guard (redirect ke login jika belum login)
- ✅ Session management via `ep_current_user` di localStorage
- ✅ Streak tracker (harian, auto-update saat login)
- ✅ Edit profil + avatar picker
- ✅ Ganti password
- ✅ Dark mode toggle (persisten)
- ✅ 4 color themes: Ocean, Forest, Sunset, Violet
- ✅ Custom font & radius
- ✅ Anti-FOUC (4 properties)
- ✅ Sidebar + mobile drawer
- ✅ Bottom navigation mobile
- ✅ Toast notifications
- ✅ Password strength meter
- ✅ Responsive (mobile + desktop)

---


### FASE 2 — Onboarding & Placement Test ✅
**Versi:** v0.3.0 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `assets/css/onboarding.css` — Styles wizard: progress bar, cards, choice buttons, test UI, result
- `assets/js/modules/xp.js` — XP System: addXP(), level threshold, XP history, level names
- `assets/js/data/placement-questions.js` — 20 soal placement test A1–B2 + calculateLevel()
- `assets/js/pages/onboarding.js` — Wizard logic (IIFE module)

**File Diubah:**
- `pages/onboarding.html` — Placeholder diganti wizard 5-step lengkap

**Fitur yang berfungsi:**
- ✅ Redirect ke dashboard jika onboarding sudah selesai
- ✅ Step 1: Welcome screen dengan nama user + fitur utama
- ✅ Step 2: Pilih tujuan belajar (6 opsi: Umum, IELTS, TOEIC, TOEFL, Cambridge, Jelajahi)
- ✅ Step 3: Pilih target harian (5/10/15/20/30 menit)
- ✅ Step 4: Placement test — 20 soal A1–B2, feedback per jawaban + penjelasan
- ✅ Step 5: Hasil placement test — level CEFR, skor %, deskripsi jalur
- ✅ +50 XP awarded on completion (XPSystem.addXP)
- ✅ Data tersimpan: level, targetTest, dailyGoal, testCorrect, testTotal, completedAt
- ✅ Skip all → langsung dashboard (tetap dapat XP)
- ✅ Manual level picker (lewati test)
- ✅ Progress bar wizard + step indicator
- ✅ XP System: level threshold, level names ID, XP history

---


---

### FASE 3 — Dashboard & Gamifikasi Dasar ✅
**Versi:** v0.4.0 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `assets/css/dashboard.css` — Styles dashboard lengkap: welcome hero, stats grid, challenge, streak calendar, XP/level, badges, quick start
- `assets/js/modules/challenge.js` — Daily Challenge system (generate 3 task per hari, track progress, award XP +50)
- `assets/js/modules/badge.js` — Badge system (15 badge, auto-check & award, rarity tier)
- `assets/js/pages/dashboard.js` — Dashboard page logic (IIFE module)

**File Diubah:**
- `pages/dashboard.html` — Dashboard lengkap dengan semua fitur gamifikasi

**Fitur yang berfungsi:**
- ✅ Welcome Hero: sapaan waktu, nama user, avatar, level progress bar
- ✅ Stats Grid: streak, XP, level, jumlah badge
- ✅ Motivational Quote harian (bergilir per tanggal)
- ✅ Daily Challenge: 3 task harian bergilir per hari, progress tracker, +50 XP on complete
- ✅ Streak Calendar: 21 hari terakhir, hari aktif disorot, hari ini ditandai emas
- ✅ XP & Level card: level badge, nama level ID, progress bar, riwayat 5 XP terakhir
- ✅ Badge System: 15 badge (common/rare/epic/legendary), auto-check on login, modal lihat semua
- ✅ Quick Start grid: 6 shortcut ke modul belajar
- ✅ Toast notifikasi badge baru saat diraih

---

### FASE 4 — Foundation: Vocabulary A1–A2 ✅
**Versi:** v0.5.0 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `assets/js/data/vocabulary-data.js` — 500+ kata A1–A2 dalam 13 tema (Greetings, Family, Numbers, Colors, Food, Body, Time, Home, Transport, School, Weather, Work, Shopping + Adjectives & Verbs)
- `assets/js/modules/srs.js` — SRS engine SM-2 (Spaced Repetition): initCard, reviewCard, getDueCards, getStats, resetModule
- `assets/css/vocabulary.css` — Styles lengkap: theme grid, word list/table, flashcard 3D flip, quiz pilihan ganda, SRS review, word modal
- `pages/foundation/vocabulary.html` — Halaman belajar vocabulary dengan 4 mode
- `assets/js/pages/vocabulary.js` — Logic lengkap (IIFE module)

**Fitur yang berfungsi:**
- ✅ Mode Jelajah: grid 13 tema + progress bar per tema, word list dengan search, status badge (Baru/Belajar/Hafal)
- ✅ Mode Flashcard: 3D flip animation, pilih tema & jumlah kartu, tombol kualitas SM-2 (Susah/Ingat/Mudah)
- ✅ Mode Quiz: pilihan ganda 4 opsi, feedback per soal + contoh kalimat, skor akhir + bonus XP
- ✅ Mode SRS Review: review kartu yang jatuh tempo hari ini, kualitas 3 tombol
- ✅ Word Detail Modal: klik kata untuk lihat detail + IPA + contoh + tombol audio
- ✅ Web Speech API: tombol "Dengarkan" di setiap mode
- ✅ XP Awards: +5 vocab baru, +2 SRS review, +3 quiz benar, +20 quiz sempurna
- ✅ Challenge harian: onLearnItem, onSRSReview, onQuizComplete, onModuleVisit terhubung
- ✅ Stats bar: total kata, dipelajari, review hari ini, hafal
- ✅ SRS localStorage key: `ep_user_{id}_srs_vocab_foundation`

---

### FASE 5 — Foundation: Pronunciation & Phonetics ✅
**Versi:** v0.6.0 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `assets/js/data/phonetics-data.js` — Data lengkap: 12 vokal pendek/panjang, 8 diftong, 24 konsonan dengan IPA + tips, 5 kelompok minimal pairs, 6 tongue twisters, 4 pola word stress, 5 kesalahan umum penutur Indonesia, 12 soal quiz listen & choose
- `assets/css/pronunciation.css` — Styles lengkap: header gradient, tab system, IPA chart grid, IPA detail panel, minimal pairs, tongue twisters, word stress, common mistakes cards, quiz section
- `pages/foundation/pronunciation.html` — Halaman pronunciation dengan 6 tab mode
- `assets/js/pages/pronunciation.js` — Logic lengkap (IIFE module)

**Fitur yang berfungsi:**
- ✅ Tab IPA Chart: grid vokal pendek, vokal panjang, diftong, dan konsonan — total 44 fonem
- ✅ IPA Detail Panel: klik fonem → tampil simbol besar, nama, contoh kata, IPA, tips pengucapan, dan practice words
- ✅ Web Speech API: tombol 🔊 di setiap kartu IPA, practice word, minimal pair, tongue twister, word stress
- ✅ Tab Minimal Pairs: 5 kategori (V vs B, TH vs D/S/T, Short vs Long Vowel, P vs B, L vs R), tombol "Bandingkan" untuk dengar 2 kata berurutan
- ✅ Tab Tongue Twisters: 6 tongue twister, pilih kecepatan 🐢/🚶/🚀
- ✅ Tab Word Stress: 4 pola aturan stress, suku kata bertekanan ditampilkan KAPITAL dengan warna primary
- ✅ Tab Kesalahan Umum: 5 kesalahan khas penutur Indonesia, perbandingan salah vs benar, practice words
- ✅ Tab Quiz: 10 soal acak "Dengar & Pilih IPA", reveal word setelah listen, feedback per soal, hasil akhir + XP
- ✅ XP Awards: +3 per soal benar, +20 bonus sempurna
- ✅ Stats: fonem dipelajari, quiz selesai, skor terbaik, total dengar — semua tersimpan di localStorage
- ✅ Challenge harian: onModuleVisit + onQuizComplete terhubung
- ✅ localStorage key: `ep_user_{id}_pron_stats`

---

---

### FASE 6 — Foundation: Grammar A1–A2 ✅
**Versi:** v0.7.0 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `assets/js/data/grammar-data.js` — 12 topik grammar A1–A2 dengan penjelasan, contoh, dan 120+ soal quiz
- `assets/css/grammar.css` — Styles lengkap: header, topic grid, detail view, study mode, quiz mode (MCQ/fill/reorder), result screen
- `pages/foundation/grammar.html` — Halaman grammar dengan dua view: daftar topik & detail topik
- `assets/js/pages/grammar.js` — Logic lengkap (IIFE module)

**Topik Grammar yang Tersedia:**

A1: To Be (am/is/are), Simple Present Tense, Simple Past Tense, Articles (a/an/the), Prepositions (at/in/on), Nouns Plural, Pronouns, WH-Questions

A2: Adjectives (comparative/superlative), Modal Verbs (can/must/should/may), Present Continuous, Future (will/going to)

**Fitur yang berfungsi:**
- ✅ Daftar 12 topik grammar (8 A1 + 4 A2) dalam grid dengan progress indicator
- ✅ Filter topik per level: Semua / A1 / A2
- ✅ Progress overview: progress bar per topik berdasarkan skor terbaik quiz
- ✅ Stats bar: Topik Selesai, Quiz Selesai, Skor Terbaik, Total XP
- ✅ Mode Materi: penjelasan lengkap + contoh kalimat Indonesia/Inggris + tips + tombol 🔊 TTS
- ✅ Mode Latihan Soal: 10 soal acak per topik, 3 tipe soal (MCQ, isi kosong, susun kalimat)
- ✅ Sistem susun kalimat: klik kata dari word bank, klik lagi untuk hapus/kembalikan
- ✅ Feedback langsung per soal: warna correct/wrong + jawaban yang benar
- ✅ XP Awards: +3 per soal benar, +20 bonus sempurna (100%)
- ✅ Challenge harian: onModuleVisit + onQuizComplete terhubung
- ✅ localStorage key: `ep_user_{id}_grammar_foundation`
- ✅ Topik dianggap "selesai" jika skor terbaik ≥ 7/10 (70%)

### FASE 7 — Foundation: Dialog & Quiz ✅
**Versi:** v0.8.0 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `assets/js/data/dialog-data.js` — 9 scene dialog A1–A2 (5 kategori) + 45 soal latihan
- `assets/js/data/quiz-foundation-data.js` — 6 paket quiz komprehensif, 60 soal (vocab, grammar, dialog, mixed)
- `assets/css/dialog.css` — Styles lengkap halaman dialog: chat bubble, filter, scene grid, exercise
- `assets/css/quiz-foundation.css` — Styles halaman Quiz Foundation: set cards, quiz flow, result screen
- `pages/foundation/dialog.html` — Halaman Dialog A1–A2
- `pages/foundation/quiz.html` — Halaman Quiz Foundation
- `assets/js/pages/dialog.js` — Logic dialog (IIFE module)
- `assets/js/pages/quiz-foundation.js` — Logic quiz foundation (IIFE module)

**Kategori Dialog yang Tersedia:**
- 👋 Greetings & Introductions (2 scene: First Day at School, Meeting a Neighbour)
- 🌅 Daily Life (3 scene: At the Café, At the Supermarket, Making Plans)
- 💼 Work & School (2 scene: Job Interview, At the Office)
- ✈️ Travel & Directions (2 scene: Asking for Directions, At the Airport)
- 🏥 Health (1 scene: At the Doctor's)

**Paket Quiz Foundation:**
1. Vocabulary Challenge (A1–A2)
2. Grammar Mastery (A1–A2)
3. Dialog & Communication (A1–A2)
4. Foundation A1 Review
5. Foundation A2 Review
6. Grand Final Quiz (A1–A2 semua topik)

**Fitur yang Berfungsi:**

*Halaman Dialog:*
- ✅ 9 scene dialog A1–A2 dalam tampilan chat bubble realistis
- ✅ Filter per kategori: Semua / Greetings / Daily / Work / Travel / Health
- ✅ 3 mode per scene: Dialog (💬), Kosakata (📖), Latihan (✏️)
- ✅ Toggle terjemahan per baris dialog
- ✅ Tombol 🔊 per baris + tombol "Play Semua" (auto-play berurutan via Web Speech API)
- ✅ Tab Kosakata: kata penting per scene + tombol dengarkan
- ✅ Tab Latihan: MCQ + isi kosong, feedback per soal, skor, XP
- ✅ XP Awards: +5 saat membuka dialog (1x/hari), +3 per soal benar latihan, +20 bonus sempurna
- ✅ Challenge harian: onModuleVisit + onQuizComplete terhubung
- ✅ localStorage key: `ep_user_{id}_dialog_foundation`

*Halaman Quiz Foundation:*
- ✅ 6 paket quiz (10 soal per paket) dengan tampilan kartu
- ✅ Progress bar per paket berdasarkan skor terbaik
- ✅ Tampilkan skor sebelumnya di start screen
- ✅ Soal acak setiap percobaan (shuffle)
- ✅ 2 tipe soal: MCQ + isi kosong (fill)
- ✅ Hint untuk soal isi kosong
- ✅ Feedback warna per soal (hijau benar / merah salah)
- ✅ Result screen dengan emoji, skor, XP earned
- ✅ XP Awards: +3 per soal benar, +20 bonus sempurna (100%)
- ✅ Challenge harian terhubung
- ✅ localStorage key: `ep_user_{id}_quiz_foundation`

---

### FASE 11 — Tema & Kustomisasi UI ✅
**Versi:** v1.2.0 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `pages/theme.html` — Halaman kustomisasi UI dedicated dengan live preview, color picker, font, radius, dan preset
- `assets/css/theme.css` — Styles lengkap: color grid, font cards, radius options, preset cards, live preview, settings summary

**File Diubah:**
- `assets/css/main.css` — Tambah 2 tema warna baru: Teal & Midnight; update dark mode combo selector
- `assets/js/core/app.js` — Tambah `setColorTheme()`, `setFont()`, `setRadius()` sebagai public API
- `pages/settings.html` — Tambah link ke theme.html, tambah 2 tema baru di picker, update versi 1.2.0
- Semua 14 halaman authenticated — Update sidebar: tambah "🎨 Tema & Tampilan" di section Lainnya
- `sw.js` — Bump ke `englishpath-v2`, tambah `theme.css` dan `theme.html`

**Fitur yang Berfungsi:**
- ✅ Halaman `/pages/theme.html` — kustomisasi UI lengkap dalam satu halaman
- ✅ Live Preview: pratinjau tampilan langsung berubah saat pilih tema/font/radius
- ✅ 8 tema warna: Ocean, Forest, Sunset, Violet, Amber, Rose, **Teal** (baru), **Midnight** (baru)
- ✅ Setiap kartu tema menampilkan swatch primary, light, dan dark
- ✅ 3 pilihan font: Default (DM Sans), Serif (Georgia), Mono (JetBrains)
- ✅ 3 pilihan radius: Sharp, Default, Round — dengan demo visual
- ✅ 6 preset siap pakai: Ocean Day, Ocean Night, Forest Soft, Midnight Pro, Warm Amber, Violet Night
- ✅ Dark mode toggle terintegrasi di halaman tema
- ✅ Reset ke Default: satu klik kembalikan semua ke setting awal
- ✅ Settings Summary: ringkasan visual pengaturan aktif
- ✅ Active badge: menampilkan tema & mode yang sedang aktif
- ✅ App.setColorTheme(), App.setFont(), App.setRadius() — simpan ke localStorage + per-user settings + customization key
- ✅ ep_user_{id}_customization tersimpan saat ganti tema
- ✅ Anti-FOUC 4-property tetap berfungsi di semua halaman

**localStorage Baru:**
- `ep_user_{id}_customization` — {colorTheme, font, radius} — disimpan saat ganti via ThemePage atau settings



### FASE 12 — Study Planner ✅
**Versi:** v1.3.0 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `pages/planner.html` — Halaman Study Planner dengan setup wizard & dashboard aktif
- `assets/css/planner.css` — Styles lengkap: header, wizard setup, countdown, progress ring, jadwal harian, milestone timeline, tips, quote
- `assets/js/data/planner-data.js` — Data 5 target tes, milestone per tes, jadwal harian weekday/weekend, tips per skill, motivational quotes
- `assets/js/pages/planner.js` — Logic planner lengkap (IIFE module)

**File Diubah:**
- `sw.js` — Bump ke `englishpath-v3`, tambah planner.css, planner-data.js, planner.js, planner.html

**Fitur yang Berfungsi:**
- ✅ Setup Wizard 3 langkah: pilih target tes → pilih skor target → tentukan tanggal mulai & ujian
- ✅ 5 pilihan target: IELTS, TOEIC, TOEFL iBT, Cambridge, Bahasa Inggris Umum
- ✅ Rekomendasi durasi belajar berdasarkan tes dan skor yang dipilih
- ✅ Validasi tanggal: ujian harus setelah mulai
- ✅ Countdown ke ujian: hari/minggu/bulan tersisa
- ✅ Progress ring SVG: persentase waktu yang telah berlalu
- ✅ Jadwal harian otomatis: weekday vs weekend berbeda, per target tes
- ✅ Checklist jadwal harian: centang aktivitas selesai, +2 XP per item
- ✅ Timeline milestone mingguan: current/completed/upcoming dengan visual indicator
- ✅ Tandai milestone selesai: +20 XP per milestone
- ✅ Tips belajar per skill dengan tab filter
- ✅ Motivational quote harian (7 kutipan berganti per tanggal)
- ✅ Reset planner: hapus plan dan buat baru
- ✅ XP terintegrasi: checklist harian (+2 XP), milestone (+20 XP)
- ✅ ChallengeSystem.onModuleVisit terhubung

**localStorage Baru:**
- `ep_user_{id}_planner_plan` — Objek lengkap plan: testId, targetScore, startDate, targetDate, weeklyPlan[], dailyChecks{}, milestoneCompleted{}, createdAt


| Fase | Nama | Versi | Status |
|------|------|-------|--------|
| **2** | Onboarding & Placement Test | v0.3.0 | ✅ |
| **3** | Dashboard & Gamifikasi Dasar | v0.4.0 | ✅ |
| **4** | Foundation: Vocabulary A1–A2 | v0.5.0 | ✅ |
| **5** | Foundation: Pronunciation & Phonetics | v0.6.0 | ✅ |
| **6** | Foundation: Grammar A1–A2 | v0.7.0 | ✅ |
| **7** | Foundation: Dialog & Quiz | v0.8.0 | ✅ |
| **8a** | Intermediate: Vocabulary B1–B2 | v0.9.1 | ✅ |
| **8b** | Intermediate: Grammar B1–B2 | v0.9.2 | ✅ |
| **9** | Intermediate: Reading & Listening | v1.0.0 | ✅ |
| **10** | PWA, Profil & Settings | v1.1.0 | ✅ |
| **11** | Tema & Kustomisasi UI | v1.2.0 | ✅ |
| **12** | Study Planner | v1.3.0 | ✅ |
| **13a** | IELTS: Hub & Vocabulary | v2.0.1 | ✅ |
| **13b** | IELTS: Practice Reading & Listening | v2.0.2 | ✅ |
| **13c-1** | IELTS: Practice Speaking & Writing | v2.0.3 | ✅ |
| **13c-2** | IELTS: Simulasi Full Test + Halaman Hasil | v2.0.4 | ✅ |
| **14a** | TOEIC: Hub & Vocabulary | v2.1.1 | ✅ |
| **14b** | TOEIC: Practice Listening (Parts 1–4) | v2.1.2 | ✅ |
| **14c-1** | TOEIC: Practice Reading (Parts 5–7) | v2.1.3 | ✅ |
| **14c-2** | TOEIC: Simulasi Full Test + Halaman Hasil | v2.1.4 | ✅ |
| **15a** | TOEFL iBT: Hub & Vocabulary | v2.2.1 | ✅ |
| **15b** | TOEFL iBT: Practice Reading & Listening | v2.2.2 | ✅ |
| **15c-1** | TOEFL iBT: Practice Speaking & Writing | v2.2.3 | ✅ |
| **15c-2** | TOEFL iBT: Simulasi Full Test + Halaman Hasil | v2.2.4 | 🔲 |
| **16a** | Cambridge: Hub & Vocabulary | v2.3.1 | 🔲 |
| **16b** | Cambridge: Practice Reading & Use of English + Listening | v2.3.2 | 🔲 |
| **16c** | Cambridge: Practice Writing & Speaking + Simulasi Full Test | v2.3.3 | 🔲 |
| **17** | Advanced: Vocabulary & Grammar C1–C2 | v2.4.0 | 🔲 |
| **18** | Advanced: Reading & Listening | v2.5.0 | 🔲 |
| **19** | Speaking & Writing Modules | v2.6.0 | 🔲 |
| **20** | Mini Game (5 game) | v3.0.0 | 🔲 |
| **21** | Statistik, Backup & Laporan | v3.1.0 | 🔲 |
| **22** | Reminder & Notifikasi | v3.2.0 | 🔲 |
| **23** | Polish, Bug Fix & Optimasi Final | v3.3.0 | 🔲 |

### Scope Detail: Fase 13 (IELTS) — 3 Tahap

**Fase 13a — IELTS: Hub & Vocabulary (v2.0.1)**
- Halaman hub IELTS (`pages/ielts/index.html`) — overview format tes, Band score chart 0–9, navigasi 4 skill & simulasi
- IELTS Vocabulary (`pages/ielts/vocabulary.html`) — 300+ kata Academic Word List + domain-specific (science, business, law, environment), flashcard + SRS + quiz
- File baru: `ielts-vocab-data.js`, `ielts.css`, `ielts-vocab.js`
- localStorage baru: `ep_user_{id}_srs_ielts_vocab`, `ep_user_{id}_ielts_vocab`

**Fase 13b — IELTS: Practice Reading & Listening (v2.0.2)**
- Halaman practice Reading (`pages/ielts/reading.html`) — 4 passage Academic + 2 General Training, multiple choice / True-False-NG / matching, timer per passage
- Halaman practice Listening (`pages/ielts/listening.html`) — 4 section audio TTS (conversation, monolog, lecture, discussion), MCQ + form completion + matching
- File baru: `ielts-reading-data.js`, `ielts-listening-data.js`, `ielts-reading.js`, `ielts-listening.js`
- localStorage baru: `ep_user_{id}_ielts_reading`, `ep_user_{id}_ielts_listening`

**Fase 13c-1 — IELTS: Practice Speaking & Writing (v2.0.3)**
- Halaman practice Speaking (`pages/ielts/speaking.html`) — Part 1 (short Q&A, 8 topik, TTS soal), Part 2 (long turn + cue card + timer 2 menit countdown), Part 3 (discussion prompts), TTS model answer, self-assessment rubrik (Fluency, Vocabulary, Grammar, Pronunciation) skala 1–9
- Halaman practice Writing (`pages/ielts/writing.html`) — Task 1 Academic (describe graph/chart/diagram, 150 kata min), Task 1 General Training (letter: formal/semi-formal/informal), Task 2 Essay (argument/discussion/opinion, 250 kata min) — guided planning, model answers, word count tracker real-time, rubric display
- File baru: `ielts-speaking-data.js`, `ielts-writing-data.js`, `ielts-speaking.js`, `ielts-writing.js`, `ielts-skill.css`
- localStorage baru: `ep_user_{id}_ielts_speaking`, `ep_user_{id}_ielts_writing`

**Fase 13c-2 — IELTS: Simulasi Full Test + Halaman Hasil (v2.0.4)**
- Halaman simulasi full test (`pages/ielts/simulation.html`) — flow 4 skill timed: Listening (30 min) → Reading (60 min) → Writing (60 min, Task 1+2) → Speaking (cue card prompts, timer 2 min); progress bar overall, auto-advance antar section
- Halaman hasil (`pages/ielts/result.html`) — Band per section, estimated overall Band 0–9, rekomendasi belajar per skill, riwayat 5 simulasi terakhir
- Band Score calculator: raw score → Band 0–9 sesuai tabel IELTS resmi
- +100 XP on complete simulasi, badge `ielts_ready` jika estimated Band ≥ 6.0
- File baru: `ielts-simulation-data.js`, `ielts-simulation.js`, `ielts-result.js`, `simulation.css`
- localStorage baru: `ep_user_{id}_sim_results`

---

### Scope Detail: Fase 14 (TOEIC) — 3 Tahap

**Fase 14a — TOEIC: Hub & Vocabulary (v2.1.1)**
- Halaman hub TOEIC (`pages/toeic/index.html`) — overview format tes, score chart 10–990, struktur 7 parts (LC Parts 1–4, RC Parts 5–7)
- TOEIC Vocabulary (`pages/toeic/vocabulary.html`) — 300+ kata Business English (meetings, HR, finance, office, travel, logistics, customer service), flashcard + SRS + quiz
- File baru: `toeic-vocab-data.js`, `toeic.css`, `toeic-vocab.js`
- localStorage baru: `ep_user_{id}_srs_toeic_vocab`, `ep_user_{id}_toeic_vocab`

**Fase 14b — TOEIC: Practice Listening Parts 1–4 (v2.1.2)**
- Halaman practice Listening (`pages/toeic/listening.html`) — Part 1: Photograph Description (TTS), Part 2: Question-Response (TTS), Part 3: Short Conversations (TTS), Part 4: Short Talks (TTS)
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
- Halaman simulasi full test (`pages/toeic/simulation.html`) — Listening Section (45 menit, Parts 1–4) + Reading Section (75 menit, Parts 5–7), auto-advance antar section
- Halaman hasil (`pages/toeic/result.html`) — score Listening + Reading + Total (10–990), performa per Part, rekomendasi, riwayat 5 simulasi terakhir
- Score converter: jumlah benar → skala TOEIC 10–990 (Listening 5–495, Reading 5–495)
- +100 XP on complete simulasi, badge `toeic_ready` jika total ≥ 700
- File baru: `toeic-simulation-data.js`, `toeic-simulation.js`, `toeic-result.js`
- localStorage baru: tambah entry ke `ep_user_{id}_sim_results`

---

### Scope Detail: Fase 15 (TOEFL iBT) — 3 Tahap

**Fase 15a — TOEFL iBT: Hub & Vocabulary (v2.2.1)**
- Halaman hub TOEFL (`pages/toefl/index.html`) — overview format, score 0–120 (4×30), MyBest scores explanation
- TOEFL Vocabulary (`pages/toefl/vocabulary.html`) — 300+ kata AWL Tier 1–2 + scientific & academic domains (biology, economics, history, psychology), flashcard + SRS + quiz
- File baru: `toefl-vocab-data.js`, `toefl.css`, `toefl-vocab.js`
- localStorage baru: `ep_user_{id}_srs_toefl_vocab`, `ep_user_{id}_toefl_vocab`

**Fase 15b — TOEFL iBT: Practice Reading & Listening (v2.2.2)**
- Halaman practice Reading (`pages/toefl/reading.html`) — 3 passage akademik (500–700 kata), soal: factual info, inference, vocabulary in context, insert text, prose summary
- Halaman practice Listening (`pages/toefl/listening.html`) — 2 lecture + 1 conversation, soal: main idea, detail, function, attitude, organization
- File baru: `toefl-reading-data.js`, `toefl-listening-data.js`, `toefl-reading.js`, `toefl-listening.js`
- localStorage baru: `ep_user_{id}_toefl_reading`, `ep_user_{id}_toefl_listening`

**Fase 15c-1 — TOEFL iBT: Practice Speaking & Writing (v2.2.3)**
- Halaman practice Speaking (`pages/toefl/speaking.html`) — Task 1 Independent (timer 45 det prep + 60 det bicara), Tasks 2–4 Integrated, rubrik 0–4, model answers
- Halaman practice Writing (`pages/toefl/writing.html`) — Task 1 Integrated (baca + dengar → tulis 150–225 kata), Task 2 Academic Discussion (100+ kata), rubrik 0–5, word count tracker
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

### Scope Detail: Fase 16 (Cambridge) — 3 Tahap

**Fase 16a — Cambridge: Hub & Vocabulary (v2.3.1)**
- Halaman hub Cambridge (`pages/cambridge/index.html`) — overview B2 First (FCE) & C1 Advanced (CAE), grade A–U, struktur 4 papers, pilihan level
- Cambridge Vocabulary (`pages/cambridge/vocabulary.html`) — 300+ kata advanced: collocations, phrasal verbs, idioms, word formation (prefix/suffix), C1-level academic vocab, flashcard + SRS + quiz
- File baru: `cambridge-vocab-data.js`, `cambridge.css`, `cambridge-vocab.js`
- localStorage baru: `ep_user_{id}_srs_cambridge_vocab`, `ep_user_{id}_cambridge_vocab`

**Fase 16b — Cambridge: Practice Reading & Use of English + Listening (v2.3.2)**
- Halaman practice Reading & Use of English (`pages/cambridge/reading.html`) — Parts 1–4 (multiple-choice cloze, open cloze, word formation, key word transformation) + Parts 5–7/8 (reading comprehension, gapped text, multiple matching)
- Halaman practice Listening (`pages/cambridge/listening.html`) — 4 parts: MCQ short extracts, sentence completion, MCQ long text, multiple matching
- File baru: `cambridge-reading-data.js`, `cambridge-listening-data.js`, `cambridge-reading.js`, `cambridge-listening.js`
- localStorage baru: `ep_user_{id}_cambridge_reading`, `ep_user_{id}_cambridge_listening`

**Fase 16c — Cambridge: Practice Writing & Speaking + Simulasi Full Test (v2.3.3)**
- Halaman practice Writing (`pages/cambridge/writing.html`) — Part 1 (essay compulsory), Part 2 (letter/email, report, review, article, story), guided planning, sample answers, assessment criteria
- Halaman practice Speaking (`pages/cambridge/speaking.html`) — Part 1 (interview), Part 2 (compare photos, long turn), Part 3 (collaborative task), Part 4 (further discussion), TTS prompts
- Halaman simulasi full test (`pages/cambridge/simulation.html`) — Reading & Use of English (75 min) → Writing (80 min) → Listening (40 min) → Speaking prompts; pilihan level B2/C1
- Halaman hasil (`pages/cambridge/result.html`) — score per paper, Cambridge Scale score, estimated grade A–U
- Grade calculator: total mark → Cambridge Scale → Grade A/B/C/D/E/U; +100 XP, badge `cambridge_ready` jika grade ≥ C
- File baru: `cambridge-writing-data.js`, `cambridge-speaking-data.js`, `cambridge-simulation-data.js`, `cambridge-writing.js`, `cambridge-speaking.js`, `cambridge-simulation.js`, `cambridge-result.js`

---

## 11. Panduan untuk Claude Selanjutnya

### Konteks Penting

Kamu sedang mengembangkan **EnglishPath** — aplikasi web belajar bahasa Inggris vanilla JS, 100% localStorage, tanpa framework/server/build step.

Fase 1 sudah selesai. Fondasi tersedia:
- Core JS: `storage.js`, `auth.js`, `router.js`, `app.js`
- CSS: `main.css`, `layout.css`, `auth.css`
- Halaman: login, register, onboarding (placeholder), dashboard (dasar), profile, change-password, settings, stats (placeholder)

### Stack & Aturan

- Vanilla HTML + CSS + JavaScript ES6+ — TIDAK ada framework
- `ep_` prefix untuk semua localStorage keys
- Gunakan `Storage.getUser()` / `Storage.setUser()` — JANGAN `localStorage` langsung
- Gunakan `getBase()` untuk semua path relatif
- Anti-FOUC 4-property di `<head>` setiap halaman baru
- `Router.guard()` + `App.init('page-id')` di setiap halaman protected
- IIFE module pattern untuk semua JS baru

### Script Load Order (WAJIB)

```html
<script src="(base)assets/js/core/storage.js"></script>
<script src="(base)assets/js/core/auth.js"></script>
<script src="(base)assets/js/core/router.js"></script>
<script src="(base)assets/js/core/app.js"></script>
```

### Sidebar

Sidebar **harus inline** di setiap halaman (tidak di-fetch). Salin pola sidebar dari halaman yang sudah ada (dashboard.html, settings.html, dll). Path di href harus disesuaikan dengan kedalaman folder:
- `/pages/*.html` → `href="dashboard.html"`
- `/pages/foundation/*.html` → `href="../dashboard.html"`

### Page IDs untuk `App.init()`

| Halaman | Page ID |
|---------|---------|
| dashboard.html | `'dashboard'` |
| profile.html | `'profile'` |
| change-password.html | `'change-password'` |
| settings.html | `'settings'` |
| stats.html | `'stats'` |
| onboarding.html | `'onboarding'` |
| foundation/vocabulary.html | `'foundation-vocab'` |
| foundation/grammar.html | `'foundation-grammar'` |
| (dst sesuai pattern) | |

### Checklist Halaman Baru

- [ ] Anti-FOUC 4-property di `<head>`
- [ ] Load 4 core scripts sebelum `</body>`
- [ ] `Router.guard()` + `App.init('page-id')`
- [ ] Sidebar inline (copy dari halaman yang ada)
- [ ] Bottom nav inline
- [ ] `theme-toggle-btn` di topbar (desktop) dan mobile-topbar
- [ ] `hamburger` button untuk mobile drawer

---

## 12. Log Pengerjaan & Versi

| Versi / Fase | Tanggal | Yang Dikerjakan | Status |
|---|---|---|---|
| **v0.1.0 — Fase 0** | 2026-02-26 | Perencanaan proyek: README lengkap dengan 23 fase roadmap | ✅ |
| **v0.2.0 — Fase 1** | 2026-02-26 | Fondasi & Autentikasi: core JS, CSS, halaman auth + protected | ✅ |
| **v0.3.0 — Fase 2** | 2026-02-26 | Onboarding & Placement Test: wizard 5-step, XP system, 20 placement questions | ✅ |
| **v0.4.0 — Fase 3** | 2026-02-26 | Dashboard & Gamifikasi Dasar: challenge harian, badge system, streak calendar, XP progress | ✅ |
| **v0.5.0 — Fase 4** | 2026-02-26 | Foundation Vocabulary A1–A2: 500+ kata, SRS SM-2, 4 mode belajar | ✅ |
| **v0.6.0 — Fase 5** | 2026-02-26 | Foundation Pronunciation & Phonetics: IPA chart, minimal pairs, tongue twisters, word stress, quiz | ✅ |
| **v0.7.0 — Fase 6** | 2026-02-26 | Foundation Grammar A1–A2: 12 topik, 120+ soal, 3 mode quiz | ✅ |
| **v0.8.0 — Fase 7** | 2026-02-26 | Foundation Dialog & Quiz: 9 dialog scene, 6 quiz paket, 60 soal komprehensif | ✅ |
| **v0.9.1 — Fase 8a** | 2026-02-26 | Intermediate: Vocabulary B1–B2 (400+ kata, 10 tema, SRS, Word Families, 5 mode belajar) | ✅ |
| **v0.9.2 — Fase 8b** | 2026-02-26 | Intermediate: Grammar B1–B2 (12 topik B1+B2, 120 soal, 3 tipe quiz, progress tracker) | ✅ |
| **v1.0.0 — Fase 9** | 2026-02-26 | Intermediate: Reading & Listening (8 artikel B1–B2 + 8 audio track B1–B2, comprehension quiz, TTS player) | ✅ |
| **v1.1.0 — Fase 10** | 2026-02-26 | PWA (manifest.json + sw.js), Profile upgrade (stats, badges, XP bar), Settings upgrade (backup/restore, daily goal, color themes, reset progress, PWA install banner) | ✅ |
| **v1.2.0 — Fase 11** | 2026-02-26 | Tema & Kustomisasi UI: halaman theme.html dedicated, 8 tema warna (+ Teal & Midnight baru), live preview, font & radius picker, 6 preset siap pakai, App.setColorTheme/setFont/setRadius API, SW bump v2 | ✅ |
| **v1.3.0 — Fase 12** | 2026-02-26 | Study Planner: wizard setup, 5 target tes, countdown, progress ring, jadwal harian, milestone timeline, tips per skill, quote harian, XP terintegrasi, SW bump v3 | ✅ |
| **v2.0.1 — Fase 13a** | 2026-02-26 | IELTS: Hub & Vocabulary (300+ AWL, flashcard, SRS, quiz) | ✅ |
| **v2.0.2 — Fase 13b** | 2026-02-26 | IELTS: Practice Reading & Listening (4 Academic + 2 General Training passage, 4 Listening Sections TTS, MCQ, T/F/NG, form completion, timer, review jawaban) | ✅ |
| **v2.0.3 — Fase 13c-1** | 2026-02-26 | IELTS: Practice Speaking & Writing (Speaking: 8 topik Part 1, 6 cue card Part 2, 6 topik Part 3, TTS, rubrik Band 1–9; Writing: 4 Task 1 Academic, 3 Task 1 General, 4 Task 2 Essay, word count real-time, model answers, scoring tips) | ✅ |
| **v2.0.4 — Fase 13c-2** | 2026-02-26 | IELTS: Simulasi Full Test + Halaman Hasil (4 skill timed, Band calculator, riwayat 5 sim, +100 XP, badge ielts_ready, SW v6) | ✅ |
| **v2.1.1 — Fase 14a** | 2026-02-26 | TOEIC: Hub & Vocabulary (300+ Business English, 8 domain, flashcard, SRS, quiz) | ✅ |
| **v2.1.2 — Fase 14b** | 2026-02-26 | TOEIC: Practice Listening Parts 1–4 (TTS, MCQ, form completion, SW v8) | ✅ |
| **v2.1.3 — Fase 14c-1** | 2026-02-26 | TOEIC: Practice Reading Parts 5–7 (Part 5 Incomplete Sentences, Part 6 Text Completion, Part 7 Single & Double Passage) | ✅ |
| **v2.1.4 — Fase 14c-2** | 2026-02-26 | TOEIC: Simulasi Full Test (LC 45 min: Parts 1–4 TTS + RC 75 min: Parts 5–7) + Halaman Hasil (score 10–990, part breakdown, rekomendasi, riwayat 5 sim, badge toeic_ready, SW v10) | ✅ |
| **v2.2.1 — Fase 15a** | 2026-02-26 | TOEFL iBT: Hub & Vocabulary (300+ AWL Tier 1–2, 8 domain akademik, hub 4 sections, score chart 0–120, MyBest™, flashcard, SRS, quiz, toefl.css, SW v11) | ✅ |
| **v2.2.2 — Fase 15b** | 2026-02-26 | TOEFL iBT: Practice Reading (3 academic passages, 8Q each: factual, inference, vocab, insert, summary) + Listening (2 lectures + 1 conversation, 5-6Q each: main idea, detail, function, attitude, organization), toefl.css extended, SW v12 | ✅ |
| **v2.2.3 — Fase 15c-1** | 2026-02-26 | TOEFL iBT: Practice Speaking (4 tasks: 4 independent prompts, 2 campus announcements, 2 academic concepts, 2 academic lectures; TTS, rubrik 0–4, model answers) + Writing (Task 1 Integrated read→listen→write 150–225 kata, Task 2 Academic Discussion 100+ kata; word count tracker, rubrik 0–5, model answers, SW v13) | ✅ |
| **v2.2.4 — Fase 15c-2** | TBD | TOEFL iBT: Simulasi Full Test + Halaman Hasil (4 section timed, score 0–120, badge toefl_ready) | 🔲 |
| **v2.3.1 — Fase 16a** | TBD | Cambridge: Hub & Vocabulary (B2 First & C1 Advanced, 300+ advanced vocab, flashcard, SRS) | 🔲 |
| **v2.3.2 — Fase 16b** | TBD | Cambridge: Practice Reading & Use of English + Listening (Parts 1–7/8 + 4 Listening parts) | 🔲 |
| **v2.3.3 — Fase 16c** | TBD | Cambridge: Practice Writing & Speaking + Simulasi Full Test (timed, grade A–U) | 🔲 |
| **v2.4.0 — Fase 17** | TBD | Advanced: Vocabulary & Grammar C1–C2 | 🔲 |
| **v2.5.0 — Fase 18** | TBD | Advanced: Reading & Listening | 🔲 |
| **v2.6.0 — Fase 19** | TBD | Speaking & Writing Modules | 🔲 |
| **v3.0.0 — Fase 20** | TBD | Mini Game (5 game) | 🔲 |
| **v3.1.0 — Fase 21** | TBD | Statistik, Backup & Laporan PDF | 🔲 |
| **v3.2.0 — Fase 22** | TBD | Reminder & Notifikasi | 🔲 |
| **v3.3.0 — Fase 23** | TBD | Polish, Bug Fix, Optimasi Final | 🔲 |

---

> **Fase saat ini:** Fase 15c-1 ✅ TOEFL iBT: Practice Speaking & Writing → **Fase 15c-2** 🔲 (berikutnya: TOEFL iBT: Simulasi Full Test + Halaman Hasil)
>
> *EnglishPath — From A1 to IELTS, one word at a time.*
>
> *Dokumen ini adalah sumber kebenaran tunggal untuk proyek EnglishPath. Perbarui setiap selesai fase.*

---

### FASE 14a — TOEIC: Hub & Vocabulary ✅
**Versi:** v2.1.1 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `pages/toeic/index.html` — TOEIC Hub: overview format, 7 parts structure, score chart 10–990, strategi per section
- `pages/toeic/vocabulary.html` — TOEIC Vocabulary: 300+ Business English, 4 mode belajar
- `assets/css/toeic.css` — TOEIC styles: hub hero, nav cards, parts grid, score chart, flashcard 3D, quiz, SRS, word modal
- `assets/js/data/toeic-vocab-data.js` — 300+ kata Business English dalam 8 domain
- `assets/js/pages/toeic-vocab.js` — Logic vocabulary page (IIFE module)

**Domain Vocabulary:**
1. 🤝 Meetings & Presentations (25 kata)
2. 👥 Human Resources (25 kata)
3. 💰 Finance & Accounting (25 kata)
4. 🏢 Office & Administration (25 kata)
5. ✈️ Travel & Transportation (25 kata)
6. 📦 Logistics & Supply Chain (25 kata)
7. 🎯 Customer Service (25 kata)
8. 💼 General Business (30 kata)

**Fitur yang Berfungsi:**
- ✅ Hub TOEIC: overview, 7 parts detail (LC Parts 1–4 + RC Parts 5–7), score chart 10–990, strategi LC & RC
- ✅ Mode Browse: domain grid dengan progress bar, word list dengan search, klik kata untuk modal detail + TTS
- ✅ Mode Flashcard: pilih domain & jumlah kartu, 3D flip animation, SRS quality buttons (Susah/Ingat/Mudah)
- ✅ Mode Quiz: 10 soal pilihan ganda, feedback per soal, skor + XP, bonus sempurna
- ✅ Mode SRS Review: kartu yang jatuh tempo hari ini, reveal jawaban, quality rating
- ✅ Word Modal: klik kata → detail lengkap (IPA, terjemahan, category, contoh kalimat), TTS
- ✅ XP Awards: +5 vocab baru, +2 SRS review, +3 quiz benar, +20 quiz sempurna
- ✅ ChallengeSystem.onLearnItem() + onModuleVisit() + onQuizComplete() terhubung
- ✅ localStorage: `ep_user_{id}_toeic_vocab`, `ep_user_{id}_srs_toeic_vocab`
- ✅ SW bump ke englishpath-v7

**localStorage Baru:**
- `ep_user_{id}_toeic_vocab` — {wordId: {learnedAt}} — progress vocabulary TOEIC
- `ep_user_{id}_srs_toeic_vocab` — data SM-2 per word id

---

### FASE 14b — TOEIC: Practice Listening Parts 1–4 ✅

**File Dibuat:**
- `pages/toeic/listening.html` — Halaman TOEIC Listening Practice: menu 4 parts + dynamic practice area
- `assets/js/data/toeic-listening-data.js` — Data Part 1 (6 foto), Part 2 (10 Q-R), Part 3 (4 percakapan × 3 Q), Part 4 (4 monolog × 3 Q)
- `assets/js/pages/toeic-listening.js` — Logic lengkap (IIFE module)

**File Diubah:**
- `assets/css/toeic.css` — Tambah styles TOEIC Listening (menu, part cards, audio section, choices, transcript, result, review)
- `sw.js` — Bump ke `englishpath-v8`, tambah listening.html, toeic-listening-data.js, toeic-listening.js

**Konten Soal:**
- **Part 1** — 6 set: foto bisnis (whiteboard, meja kerja, gudang, bandara, restoran, kantor) + 4 pilihan TTS
- **Part 2** — 10 set: pertanyaan bisnis (when/who/could/have/why/where/how many/should/didn't/statement) + 3 respons TTS
- **Part 3** — 4 percakapan bisnis (kunjungan klien, diskusi anggaran, pengiriman, wawancara) × 3 pertanyaan MCQ
- **Part 4** — 4 monolog bisnis (pengumuman kantor, toko ritel, orientasi karyawan, pesan telepon) × 3 pertanyaan MCQ

**Fitur yang Berfungsi:**
- ✅ Menu Parts: 4 kartu dengan skor terbaik sebelumnya + tombol mulai
- ✅ Part 1: Deskripsi foto, play TTS 4 statements (A–D), pilih jawaban, cek + penjelasan per soal
- ✅ Part 2: Play TTS pertanyaan + 3 respons (A–C), transkrip muncul setelah play, pilih & cek jawaban
- ✅ Part 3: Play TTS audio percakapan multi-speaker, transkrip otomatis muncul, 3 pertanyaan per set
- ✅ Part 4: Play TTS monolog panjang, transkrip otomatis muncul, 3 pertanyaan per set
- ✅ Timer aktif per sesi latihan
- ✅ Progress bar soal saat ini / total
- ✅ Tombol Play / Stop / Putar Ulang
- ✅ Feedback jawaban benar/salah per soal (warna + penjelasan untuk Part 1 & 2)
- ✅ Result screen: skor, XP earned, tips, review semua jawaban
- ✅ XP Awards: +3 per soal benar, +20 bonus sempurna (100%)
- ✅ ChallengeSystem.onModuleVisit + onQuizComplete terhubung

**localStorage Baru:**
- `ep_user_{id}_toeic_listening` — {results: {part1/part2/part3/part4: {best, attempts, lastScore, lastCorrect, lastTotal, lastDate}}, totalAttempts}

---

### FASE 14c-1 — TOEIC: Practice Reading Parts 5–7 ✅
**Versi:** v2.1.3 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `pages/toeic/reading.html` — Halaman TOEIC Reading Practice: menu 3 parts + dynamic practice area
- `assets/js/data/toeic-reading-data.js` — Data Part 5 (10 Incomplete Sentences), Part 6 (4 teks × 4 blanks), Part 7 (3 single passage + 2 double passage, total 19 soal)
- `assets/js/pages/toeic-reading.js` — Logic lengkap (IIFE module)

**File Diubah:**
- `assets/css/toeic.css` — Tambah styles TOEIC Reading (menu, practice, passage box, blanks select, Part 6 results, Part 7 questions, result screen)
- `sw.js` — Bump ke `englishpath-v9`, tambah reading.html, toeic-reading-data.js, toeic-reading.js
- `README.md` — Update status fase, log pengerjaan, localStorage key reference
- `MASTER_PROMPT.md` — Fase 14c dipecah menjadi 14c-1 (v2.1.3) dan 14c-2 (v2.1.4)

**Konten Soal:**
- **Part 5** — 10 soal Incomplete Sentences: grammar (modal verbs, prepositions, word form, relative clause) + vocabulary collocations
- **Part 6** — 4 teks bisnis (memo HR, email customer service, notice renovasi, job posting) × 4 blanks per teks = 16 soal total
- **Part 7 Single** — 3 single passage (email konfirmasi konferensi, memo parking policy, artikel remote work) × 3–4 soal = 10 soal
- **Part 7 Double** — 2 double passage (job ad + application letter, product announcement + customer review) × 5 soal = 10 soal

**Fitur yang Berfungsi:**
- ✅ Menu Parts: 3 kartu (Part 5/6/7) dengan skor terbaik sebelumnya + tombol mulai
- ✅ Tips box strategi per Part di halaman menu
- ✅ Part 5: Tampilkan kalimat dengan blank highlight, 4 pilihan jawaban, cek per soal, penjelasan gramatikal lengkap
- ✅ Part 6: Teks bisnis dengan dropdown select inline untuk setiap blank, cek semua sekaligus, feedback per blank dengan penjelasan
- ✅ Part 7: Tampilkan passage (single/double) lengkap, jawab pertanyaan satu per satu dengan cek mandiri, penjelasan per soal
- ✅ Progress bar per bagian (soal/teks/passage)
- ✅ Timer aktif sepanjang sesi
- ✅ Result screen: skor, feedback, waktu, tips per Part, tombol retry
- ✅ XP Awards: +3 per soal benar, +20 bonus sempurna (100%)
- ✅ ChallengeSystem.onModuleVisit + onQuizComplete terhubung

**localStorage Baru:**
- `ep_user_{id}_toeic_reading` — {results: {part5/part6/part7: {best, attempts, lastScore, lastCorrect, lastTotal, lastDate}}, totalAttempts}

---

### FASE 14c-2 — TOEIC: Simulasi Full Test + Halaman Hasil ✅
**Versi:** v2.1.4 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `pages/toeic/simulation.html` — Simulasi Full Test: LC 45 menit + jeda 5 menit + RC 75 menit, timer aktif, step progress, TTS per bagian
- `pages/toeic/result.html` — Halaman Hasil: skor LC+RC+Total, performa per Part, rekomendasi, riwayat 5 simulasi terakhir
- `assets/js/data/toeic-simulation-data.js` — Data simulasi: Part 1 (6Q), Part 2 (25Q), Part 3 (13 set × 3Q = 39Q), Part 4 (10 set × 3Q = 30Q), Part 5 (30Q), Part 6 (4 teks × 4Q = 16Q), Part 7 (3 single + 2 double = 29Q)
- `assets/js/pages/toeic-simulation.js` — Logic simulasi (IIFE module): flow intro → LC Parts 1–4 → break → RC Parts 5–7 → submit → redirect result
- `assets/js/pages/toeic-result.js` — Logic hasil (IIFE module): baca sim_results, hitung level, rekomendasi per Part

**File Diubah:**
- `assets/css/toeic.css` — Tambah styles: sim-intro, sim-question-card, sim-choices, sim-p7-layout, result hero TOEIC, section scores, breakdown bars, recommendations, score guide table, history, action buttons
- `sw.js` — Bump ke `englishpath-v10`, tambah simulation.html, result.html, toeic-simulation-data.js, toeic-simulation.js, toeic-result.js
- `README.md` — Update status fase, struktur folder, log pengerjaan

**Konten Soal (Simulation):**
- **LC Part 1** — 6 soal: deskripsi foto bisnis (presenter, pengirim, resepsionis, kontraktor, chef, petugas kantor) + TTS 4 pilihan
- **LC Part 2** — 25 soal: pertanyaan-respons bisnis (when/who/could/where/have/why/how many + statement) + TTS per set
- **LC Part 3** — 13 percakapan bisnis × 3Q = 39 soal (rescheduling, supplies, performance review, travel, onboarding, budget, equipment, contract, complaint, interview, feedback, office move, quarterly review)
- **LC Part 4** — 10 monolog bisnis × 3Q = 30 soal (announcement, retail, voicemail, radio ad, training, airport, investor briefing, tour, HR policy, product recall)
- **RC Part 5** — 30 soal grammar + vocabulary
- **RC Part 6** — 4 teks bisnis (remote work memo, project email, job ad, customer newsletter) × 4 blanks = 16 soal
- **RC Part 7** — 3 single passage + 2 double passage = 29 soal (contract renewal email, renovation notice, workplace article; job posting + application, press release + customer review)

**Fitur yang Berfungsi:**
- ✅ Intro screen: overview 2 section + tips
- ✅ LC Part 1: foto deskripsi + TTS 4 choices + auto-advance
- ✅ LC Part 2: TTS pertanyaan + respons + transkrip toggle
- ✅ LC Part 3: TTS percakapan + transkrip toggle + 3 Q per set
- ✅ LC Part 4: TTS monolog + transkrip toggle + 3 Q per set
- ✅ Jeda 5 menit antara LC dan RC (countdown + tombol skip)
- ✅ RC Part 5: kalimat dengan blank highlight + 4 pilihan
- ✅ RC Part 6: teks bisnis + inline dropdown select untuk setiap blank
- ✅ RC Part 7: layout 2 kolom (passage scroll | pertanyaan), support single & double passage
- ✅ Timer terpisah LC (45 min) & RC (75 min), auto-advance saat habis
- ✅ Progress bar + step indicator (LC / RC)
- ✅ Score converter: raw correct → skala TOEIC 5–495 per section (non-linear curve)
- ✅ Halaman hasil: hero total score, LC + RC breakdown, performa 7 parts dengan bar chart, rekomendasi per weakness
- ✅ Tabel panduan skor TOEIC (highlight range skor saat ini)
- ✅ Riwayat 5 simulasi terakhir
- ✅ +100 XP on complete, badge `toeic_ready` jika total ≥ 700
- ✅ localStorage: tambah entry ke `ep_user_{id}_sim_results` (type: 'toeic')
- ✅ SW bump ke englishpath-v10

**localStorage Baru/Diperbarui:**
- `ep_user_{id}_sim_results` — Tambah entry `{type:'toeic', lc, rc, total, raw:{p1c..p7c, lcCorrect, rcCorrect...}, date, timestamp}`

---

### FASE 15a — TOEFL iBT: Hub & Vocabulary ✅
**Versi:** v2.2.1 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `pages/toefl/index.html` — TOEFL iBT Hub: hero, 6 nav cards, 4 section overview, score chart 0–120, MyBest™ explanation, strategi per section, format table
- `pages/toefl/vocabulary.html` — TOEFL Vocabulary: Browse + Flashcard + Quiz + SRS Review modes
- `assets/js/data/toefl-vocab-data.js` — 300 kata Academic Word List Tier 1–2 + 8 domain akademik
- `assets/css/toefl.css` — Styling TOEFL (tema hijau akademik) — hub + vocab page
- `assets/js/pages/toefl-vocab.js` — Logic vocabulary (IIFE module)

**File Diubah:**
- `sw.js` — Bump ke `englishpath-v11`, tambah toefl.css, toefl-vocab-data.js, toefl-vocab.js, toefl/index.html, toefl/vocabulary.html
- `README.md` — Update status fase, struktur folder, log pengerjaan, localStorage key reference
- `MASTER_PROMPT.md` — Tidak ada perubahan (scope sudah sesuai)

**Konten Vocabulary (300 kata, 8 domain):**
1. 🎓 Akademik Inti (AWL Tier 1) — 40 kata high-frequency academic
2. 📚 Akademik Lanjut (AWL Tier 2) — 40 kata advanced academic
3. 🧬 Biologi & Ilmu Kehidupan — 25 kata (adaptation, biodiversity, evolution, metabolism, dll)
4. 📈 Ekonomi & Perdagangan — 25 kata (aggregate, inflation, monopoly, scarcity, dll)
5. 🏛️ Sejarah & Peradaban — 25 kata (civilization, colonialism, dynasty, ideology, dll)
6. 🧠 Psikologi & Perilaku — 25 kata (cognition, empathy, resilience, trauma, dll)
7. 🔬 Sains & Teknologi — 25 kata (algorithm, empirical, innovation, simulation, dll)
8. 🎨 Seni & Humaniora — 25 kata (aesthetic, allegory, metaphor, rhetoric, dll)
9. ⚖️ Hukum & Masyarakat — 25 kata (accountability, constitution, jurisdiction, legislation, dll)

**Fitur yang Berfungsi:**
- ✅ Hub TOEFL: overview 4 sections (Reading/Listening/Speaking/Writing), score chart 0–120, MyBest™ Scores explanation, strategi per section, format table lengkap
- ✅ Mode Browse: domain grid dengan progress bar, word list dengan search, klik kata untuk modal detail + TTS
- ✅ Mode Flashcard: pilih domain & jumlah kartu, 3D flip animation, SRS quality buttons (Susah/Ingat/Mudah)
- ✅ Mode Quiz: 10 soal pilihan ganda (translate word → bahasa Indonesia), feedback per soal, skor + XP, bonus sempurna
- ✅ Mode SRS Review: kartu yang jatuh tempo hari ini, reveal jawaban, quality rating (SM-2 algorithm)
- ✅ Word Modal: klik kata → detail lengkap (IPA, terjemahan, category, contoh kalimat), TTS (en-US)
- ✅ XP Awards: +5 vocab baru, +2 SRS review, +3 quiz benar, +20 quiz sempurna
- ✅ ChallengeSystem.onLearnItem() + onModuleVisit() + onQuizComplete() terhubung
- ✅ localStorage: `ep_user_{id}_toefl_vocab`, `ep_user_{id}_srs_toefl_vocab`
- ✅ SW bump ke englishpath-v11
- ✅ Warna tema TOEFL: hijau akademik (#0d8f6e) — beda dari IELTS (biru) dan TOEIC (biru gelap)

**localStorage Baru:**
- `ep_user_{id}_toefl_vocab` — {wordId: {learnedAt}} — progress vocabulary TOEFL
- `ep_user_{id}_srs_toefl_vocab` — data SM-2 per word id

---

### FASE 15b — TOEFL iBT: Practice Reading & Listening ✅
**Versi:** v2.2.2 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `pages/toefl/reading.html` — TOEFL Reading Practice: menu passage + reading view + question view + result
- `pages/toefl/listening.html` — TOEFL Listening Practice: menu track + listen view + question view + result
- `assets/js/data/toefl-reading-data.js` — 3 academic passages (500–700 kata) + 8 soal masing-masing
- `assets/js/data/toefl-listening-data.js` — 2 lectures + 1 campus conversation, 5–6 soal masing-masing
- `assets/js/pages/toefl-reading.js` — Logic reading module (IIFE)
- `assets/js/pages/toefl-listening.js` — Logic listening module (IIFE, TTS)

**File Diubah:**
- `assets/css/toefl.css` — Append styles: hero, tips box, passage cards, passage body, question UI, choices, feedback, result screen, review items, listening track cards, audio controls, transcript
- `sw.js` — Bump ke `englishpath-v12`, tambah 6 file baru
- `README.md` — Update status fase, struktur folder, log pengerjaan, localStorage key reference

**Konten Reading (3 Passages):**
- **Passage 1: The Domestication of Dogs** (Biology & Evolution) — 8 soal: factual ×2, vocabulary ×1, inference ×1, negative factual ×1, rhetorical purpose ×1, insert text ×1, prose summary ×1
- **Passage 2: The Development of Written Language** (History & Civilization) — 8 soal: factual ×2, vocabulary ×2, inference ×1, rhetorical purpose ×1, negative factual ×1, prose summary ×1
- **Passage 3: Neuroplasticity and Learning** (Psychology & Neuroscience) — 8 soal: factual ×2, vocabulary ×2, inference ×1, rhetorical purpose ×1, negative factual... wait, factual ×1 + attitude ×1, prose summary ×1

**Konten Listening (3 Tracks):**
- **Lecture 1: The Columbian Exchange** (World History) — 7-segment TTS script, 6 soal: main idea, detail ×2, inference, function, attitude
- **Lecture 2: Behavioral Economics and Decision Making** (Economics) — 7-segment TTS, 6 soal: main idea, detail ×2, function, inference, organization
- **Conversation: Office Hours — Research Paper Advice** (Campus) — 14-line TTS dialog, 5 soal: main idea, detail ×2, attitude, inference

**Fitur yang Berfungsi:**
- ✅ Menu passage/track dengan best score & attempts dari localStorage
- ✅ Reading: baca passage akademik lengkap sebelum soal, tombol "Baca Ulang" kapan saja
- ✅ Question types Reading: factual, negative factual, inference, vocabulary in context, rhetorical purpose, insert text, prose summary (multi-select 3 dari 6)
- ✅ Question types Listening: main idea, detail, function, attitude, organization, inference
- ✅ TTS audio playback dengan highlight script real-time, toggle transcript tampilkan/sembunyikan
- ✅ Listening: tombol Lanjut ke Soal hanya aktif setelah audio diputar minimal sekali
- ✅ Feedback per soal: benar/salah + penjelasan lengkap dalam bahasa Indonesia
- ✅ Result screen: skor, waktu, XP earned, review semua jawaban dengan penjelasan
- ✅ XP Awards: +3 per soal benar, +20 bonus sempurna (100%)
- ✅ ChallengeSystem.onModuleVisit() + onQuizComplete() terhubung
- ✅ SW bump ke englishpath-v12

**localStorage Baru:**
- `ep_user_{id}_toefl_reading` — {results: {p1/p2/p3: {best, attempts, lastScore, lastCorrect, lastTotal, lastDate}}, totalAttempts}
- `ep_user_{id}_toefl_listening` — {results: {l1/l2/c1: {best, attempts, lastScore, lastCorrect, lastTotal, lastDate}}, totalAttempts}

---

### FASE 15c-1 — TOEFL iBT: Practice Speaking & Writing ✅
**Versi:** v2.2.3 | **Tanggal:** 2026-02-26

**File Dibuat:**
- `pages/toefl/speaking.html` — TOEFL Speaking Practice: menu 4 task, timer prep+speak, model answer TTS, self-assessment rubrik 0–4
- `pages/toefl/writing.html` — TOEFL Writing Practice: menu 2 task, writing area, word count tracker, rubrik 0–5, model answer TTS
- `assets/js/data/toefl-speaking-data.js` — Data 4 tasks speaking (Task1: 4 independent prompts; Task2: 2 campus announcements; Task3: 2 academic concepts; Task4: 2 academic lectures)
- `assets/js/data/toefl-writing-data.js` — Data 2 tasks writing (Task1: 3 integrated passages + lectures; Task2: 3 academic discussion threads dengan professor post + 2 student posts)
- `assets/js/pages/toefl-speaking.js` — Logic speaking module (IIFE): menu, task1 independent timer, task2-4 integrated read→listen→speak flow, TTS script playback, self-assessment
- `assets/js/pages/toefl-writing.js` — Logic writing module (IIFE): menu, task1 read→listen→write flow, task2 discussion writing, word count live tracker, result + rubrik

**File Diubah:**
- `assets/css/toefl.css` — Append styles: skill-header, skill-tabs, skill-grid, toefl-task-card, timer (prep/speak phases), script-box, reading-panel, rubric-box, model-section, self-assess score-buttons, writing-layout (2-kolom), discussion-thread, result-screens, responsive
- `sw.js` — Bump ke `englishpath-v13`, tambah toefl-speaking-data.js, toefl-writing-data.js, toefl-speaking.js, toefl-writing.js, pages/toefl/speaking.html, pages/toefl/writing.html
- `README.md` — Update status, struktur folder, versi, log pengerjaan

**Konten Speaking (4 Tasks):**

**Task 1 — Independent (4 prompts × 15s prep + 45s speak):**
- Living Alone or With Others, Technology in Education, Urban or Rural Living, Learning from Experience vs. Formal Education
- Setiap prompt: keyPoints panduan + rubrik 3 kriteria (Delivery, Language Use, Topic Development) + model answer lengkap + TTS

**Task 2 — Campus Announcement (2 items × 45s baca + listen + 30s prep + 60s speak):**
- Library Hours Change: pengumuman perubahan jam buka + percakapan 2 mahasiswa
- New Group Study Policy: kebijakan reservasi ruang belajar + percakapan 2 mahasiswa
- Flow lengkap: reading (timer) → percakapan TTS dengan highlight aktif → prep → speaking → rubrik + model

**Task 3 — Academic Concept (2 items × 45s baca + listen + 30s prep + 60s speak):**
- Cognitive Dissonance (Leon Festinger 1957): teks definisi + kuliah profesor dengan 2 contoh (perokok + environmentalist)
- The Sunk Cost Fallacy: teks konsep + kuliah profesor dengan 2 contoh (konser + korporat)
- Flow: reading → lecture TTS → prep → speaking → rubrik + model

**Task 4 — Academic Lecture (2 items × listen + 20s prep + 60s speak):**
- Mimicry in Nature: Batesian (hoverfly) vs Müllerian (poison dart frogs)
- The Broken Windows Theory (Wilson & Kelling 1982): NYC subway application
- Flow: lecture TTS dengan highlight → prep → speaking → rubrik + model

**Konten Writing (2 Tasks):**

**Task 1 — Integrated Writing (3 topics × baca 3 menit + dengar lecture + tulis 20 menit, 150–225 kata):**
- The Benefits of Urban Green Spaces: klaim air quality + mental health + biodiversity vs. sanggahan profesor
- Artificial Intelligence in the Workplace: klaim higher-value tasks + historical precedent + new industries vs. sanggahan profesor
- Genetic Engineering in Agriculture: klaim pest resistance + nutritional enhancement + climate resilience vs. sanggahan profesor
- Setiap item: passage teks lengkap + skrip lecture TTS + listening note + prompt + rubrik skor 0–5 + model answer lengkap

**Task 2 — Academic Discussion (3 topics × baca discussion + tulis 10 menit, 100+ kata):**
- Remote Work vs. Office Work: professor Dr. Sandra Mitchell + 2 student posts (Marcus, Priya)
- Should University Education Be Free?: professor Dr. James Okafor + 2 student posts (Sofia, Ethan)
- Individual Action vs. Systemic Change on Climate: professor Dr. Yuki Tanaka + 2 student posts (Anya, David)
- Layout 2-kolom: panel diskusi (professor + student posts) | panel menulis (prompt + textarea + word count)

**Fitur yang Berfungsi:**
- ✅ Task 1 Speaking: timer fase persiapan (15s) → fase berbicara (45s) → evaluasi diri
- ✅ Task 2–4 Speaking: reading panel (baca passage/pengumuman dengan timer) → TTS script dengan highlight baris aktif per kalimat → fase prep → fase speak → evaluasi diri
- ✅ TTS lecture playback: _speakScript() mengiterasikan setiap baris dengan delay natural, highlight baris aktif real-time
- ✅ Model answer TTS: tombol putar/berhenti dengan state toggle
- ✅ Rubrik self-assessment: skor 0–4 (Speaking) & 0–5 (Writing), tersimpan ke localStorage
- ✅ Task 1 Writing: baca passage 3 menit (timer) → dengar lecture TTS → writing area 20 menit dengan word count tracker real-time
- ✅ Task 2 Writing: layout 2-kolom (discussion thread professor+students | writing panel), timer 10 menit
- ✅ Word count display: hijau (dalam target), kuning (terlalu sedikit), merah (terlalu banyak)
- ✅ Result screen: tampilkan tulisan user, statistik kata, rubrik lengkap, model answer, self-assessment
- ✅ XP Awards: +15 XP score ≥ 3, +10 XP lainnya (speaking); +20 XP score ≥ 4 (writing)
- ✅ ChallengeSystem.onModuleVisit() + onQuizComplete() terhubung
- ✅ SW bump ke englishpath-v13
- ✅ TOEFL Hub sudah memiliki link ke speaking.html dan writing.html

**localStorage Baru:**
- `ep_user_{id}_toefl_speaking` — {results: {t1_id / t2_id / t3_id / t4_id: {attempts, lastSelfScore, lastDate}}, totalAttempts}
- `ep_user_{id}_toefl_writing` — {results: {w1_id / w2_id: {attempts, lastSelfScore, lastWordCount, lastDate}}, totalAttempts}
