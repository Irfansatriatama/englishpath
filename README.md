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
| **Versi App** | 1.1.0 |
| **Fase Saat Ini** | FASE 10 ✅ — PWA, Profil & Settings |
| **Fase Berikutnya** | FASE 11 — Tema & Kustomisasi UI |
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

## 5. Struktur Folder (Saat Ini — Fase 7)

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
│   ├── ielts/                          🔲 Fase 13
│   ├── toeic/                          🔲 Fase 14
│   ├── toefl/                          🔲 Fase 15
│   └── cambridge/                      🔲 Fase 16
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
| **11** | Tema & Kustomisasi UI | v1.2.0 | 🔲 |
| **12** | Study Planner | v1.3.0 | 🔲 |
| **13** | IELTS: Practice & Simulasi | v2.0.0 | 🔲 |
| **14** | TOEIC: Practice & Simulasi | v2.1.0 | 🔲 |
| **15** | TOEFL iBT: Practice & Simulasi | v2.2.0 | 🔲 |
| **16** | Cambridge: Practice & Simulasi | v2.3.0 | 🔲 |
| **17** | Advanced: Vocabulary & Grammar C1–C2 | v2.4.0 | 🔲 |
| **18** | Advanced: Reading & Listening | v2.5.0 | 🔲 |
| **19** | Speaking & Writing Modules | v2.6.0 | 🔲 |
| **20** | Mini Game (5 game) | v3.0.0 | 🔲 |
| **21** | Statistik, Backup & Laporan | v3.1.0 | 🔲 |
| **22** | Reminder & Notifikasi | v3.2.0 | 🔲 |
| **23** | Polish, Bug Fix & Optimasi Final | v3.3.0 | 🔲 |

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
| **v1.2.0 — Fase 11** | TBD | Tema & Kustomisasi UI | 🔲 |
| **v1.3.0 — Fase 12** | TBD | Study Planner | 🔲 |
| **v2.0.0 — Fase 13** | TBD | IELTS: Practice & Simulasi | 🔲 |
| **v2.1.0 — Fase 14** | TBD | TOEIC: Practice & Simulasi | 🔲 |
| **v2.2.0 — Fase 15** | TBD | TOEFL iBT: Practice & Simulasi | 🔲 |
| **v2.3.0 — Fase 16** | TBD | Cambridge: Practice & Simulasi | 🔲 |
| **v2.4.0 — Fase 17** | TBD | Advanced: Vocabulary & Grammar C1–C2 | 🔲 |
| **v2.5.0 — Fase 18** | TBD | Advanced: Reading & Listening | 🔲 |
| **v2.6.0 — Fase 19** | TBD | Speaking & Writing Modules | 🔲 |
| **v3.0.0 — Fase 20** | TBD | Mini Game (5 game) | 🔲 |
| **v3.1.0 — Fase 21** | TBD | Statistik, Backup & Laporan PDF | 🔲 |
| **v3.2.0 — Fase 22** | TBD | Reminder & Notifikasi | 🔲 |
| **v3.3.0 — Fase 23** | TBD | Polish, Bug Fix, Optimasi Final | 🔲 |

---

> **Fase saat ini:** Fase 10 ✅ PWA, Profil & Settings → **Fase 11** 🔲 (berikutnya)
>
> *EnglishPath — From A1 to IELTS, one word at a time.*
>
> *Dokumen ini adalah sumber kebenaran tunggal untuk proyek EnglishPath. Perbarui setiap selesai fase.*
