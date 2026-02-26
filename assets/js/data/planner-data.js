/**
 * EnglishPath — Study Planner Data
 * Kurikulum milestone, jadwal belajar, dan data tes.
 */

const PlannerData = (() => {

  // ── Target Tes ────────────────────────────────────────────
  const TESTS = [
    {
      id: 'ielts',
      name: 'IELTS',
      icon: '🎯',
      description: 'International English Language Testing System',
      scores: ['Band 5.0', 'Band 5.5', 'Band 6.0', 'Band 6.5', 'Band 7.0', 'Band 7.5', 'Band 8.0+'],
      minWeeks: 8,
      recommendedLevel: 'B1',
      color: '#1a6cf0',
      skills: ['Reading', 'Listening', 'Speaking', 'Writing'],
    },
    {
      id: 'toeic',
      name: 'TOEIC',
      icon: '💼',
      description: 'Test of English for International Communication',
      scores: ['400+', '500+', '600+', '700+', '800+', '900+'],
      minWeeks: 6,
      recommendedLevel: 'A2',
      color: '#0ea5e9',
      skills: ['Listening', 'Reading'],
    },
    {
      id: 'toefl',
      name: 'TOEFL iBT',
      icon: '🎓',
      description: 'Test of English as a Foreign Language',
      scores: ['60+', '70+', '80+', '90+', '100+', '110+'],
      minWeeks: 10,
      recommendedLevel: 'B2',
      color: '#8b5cf6',
      skills: ['Reading', 'Listening', 'Speaking', 'Writing'],
    },
    {
      id: 'cambridge',
      name: 'Cambridge',
      icon: '🏛️',
      description: 'Cambridge English: B2 First & C1 Advanced',
      scores: ['B2 First (Grade C)', 'B2 First (Grade B)', 'B2 First (Grade A)', 'C1 Advanced (Grade C)', 'C1 Advanced (Grade B)', 'C1 Advanced (Grade A)'],
      minWeeks: 12,
      recommendedLevel: 'B2',
      color: '#10b981',
      skills: ['Reading', 'Listening', 'Speaking', 'Writing', 'Use of English'],
    },
    {
      id: 'general',
      name: 'Bahasa Inggris Umum',
      icon: '📚',
      description: 'Tingkatkan kemampuan Bahasa Inggris secara umum (A1→C2)',
      scores: ['A1 ke A2', 'A2 ke B1', 'B1 ke B2', 'B2 ke C1', 'C1 ke C2'],
      minWeeks: 4,
      recommendedLevel: 'A1',
      color: '#f59e0b',
      skills: ['Vocabulary', 'Grammar', 'Speaking', 'Listening', 'Reading', 'Writing'],
    },
  ];

  // ── Jadwal Harian per Test (menit per skill) ──────────────
  const DAILY_SCHEDULE = {
    ielts: {
      weekday: [
        { time: '07:00', duration: 15, skill: 'Vocabulary', activity: 'SRS Review + 5 kata baru', icon: '📚' },
        { time: '12:00', duration: 20, skill: 'Grammar', activity: 'Grammar review + 1 topik', icon: '📝' },
        { time: '20:00', duration: 25, skill: 'Reading', activity: 'IELTS Reading Practice', icon: '📖' },
      ],
      weekend: [
        { time: '09:00', duration: 30, skill: 'Listening', activity: 'IELTS Listening Practice', icon: '🎧' },
        { time: '10:00', duration: 30, skill: 'Writing', activity: 'IELTS Task 1 atau Task 2', icon: '✍️' },
        { time: '15:00', duration: 20, skill: 'Speaking', activity: 'IELTS Speaking Practice', icon: '🗣️' },
      ],
    },
    toeic: {
      weekday: [
        { time: '07:00', duration: 15, skill: 'Vocabulary', activity: 'Vocab bisnis + SRS', icon: '📚' },
        { time: '19:00', duration: 25, skill: 'Listening', activity: 'TOEIC Part 1–4 Practice', icon: '🎧' },
      ],
      weekend: [
        { time: '09:00', duration: 40, skill: 'Reading', activity: 'TOEIC Part 5–7 Practice', icon: '📖' },
        { time: '14:00', duration: 20, skill: 'Grammar', activity: 'Grammar untuk TOEIC', icon: '📝' },
      ],
    },
    toefl: {
      weekday: [
        { time: '07:00', duration: 20, skill: 'Vocabulary', activity: 'Academic vocabulary + SRS', icon: '📚' },
        { time: '12:00', duration: 20, skill: 'Reading', activity: 'Academic reading passage', icon: '📖' },
        { time: '20:00', duration: 20, skill: 'Grammar', activity: 'Complex grammar structures', icon: '📝' },
      ],
      weekend: [
        { time: '09:00', duration: 30, skill: 'Listening', activity: 'TOEFL Listening Practice', icon: '🎧' },
        { time: '10:00', duration: 30, skill: 'Writing', activity: 'Integrated + Independent Writing', icon: '✍️' },
        { time: '14:00', duration: 20, skill: 'Speaking', activity: 'TOEFL Speaking Tasks', icon: '🗣️' },
      ],
    },
    cambridge: {
      weekday: [
        { time: '07:00', duration: 15, skill: 'Vocabulary', activity: 'Vocab + collocations SRS', icon: '📚' },
        { time: '12:00', duration: 20, skill: 'Use of English', activity: 'Cambridge grammar & vocab', icon: '📝' },
        { time: '20:00', duration: 25, skill: 'Reading', activity: 'Cambridge Reading texts', icon: '📖' },
      ],
      weekend: [
        { time: '09:00', duration: 30, skill: 'Listening', activity: 'Cambridge Listening Practice', icon: '🎧' },
        { time: '10:00', duration: 30, skill: 'Writing', activity: 'Essay + Letter/Report writing', icon: '✍️' },
        { time: '14:00', duration: 20, skill: 'Speaking', activity: 'Cambridge Speaking Parts', icon: '🗣️' },
      ],
    },
    general: {
      weekday: [
        { time: '07:00', duration: 15, skill: 'Vocabulary', activity: 'Vocab baru + SRS review', icon: '📚' },
        { time: '20:00', duration: 20, skill: 'Grammar', activity: '1 topik grammar', icon: '📝' },
      ],
      weekend: [
        { time: '09:00', duration: 30, skill: 'Reading', activity: 'Artikel & latihan reading', icon: '📖' },
        { time: '10:00', duration: 20, skill: 'Listening', activity: 'Dialog & latihan listening', icon: '🎧' },
      ],
    },
  };

  // ── Milestone per Test ────────────────────────────────────
  // Tiap milestone adalah checkpoint mingguan
  const MILESTONES = {
    ielts: [
      { week: 1, title: 'Fondasi Vocabulary', desc: 'Kuasai 200 kata IELTS Academic Word List', skill: 'Vocabulary', target: '200 kata', icon: '📚' },
      { week: 2, title: 'Grammar Essentials', desc: 'Selesaikan topik: conditionals, passive, perfect tense', skill: 'Grammar', target: '3 topik grammar', icon: '📝' },
      { week: 3, title: 'IELTS Reading Intro', desc: 'Latih 4 tipe soal reading (MCQ, T/F/NG, matching)', skill: 'Reading', target: '4 passage', icon: '📖' },
      { week: 4, title: 'IELTS Listening Intro', desc: 'Latih Section 1–2 IELTS Listening', skill: 'Listening', target: '4 listening sets', icon: '🎧' },
      { week: 5, title: 'IELTS Writing Task 1', desc: 'Kuasai describe chart/graph/process (Academic)', skill: 'Writing', target: '3 Task 1 essays', icon: '✍️' },
      { week: 6, title: 'IELTS Writing Task 2', desc: 'Tulis essay opinion, discussion, problem/solution', skill: 'Writing', target: '3 Task 2 essays', icon: '✍️' },
      { week: 7, title: 'IELTS Speaking', desc: 'Latih Part 1 (intro), Part 2 (long turn), Part 3 (discussion)', skill: 'Speaking', target: '6 speaking sessions', icon: '🗣️' },
      { week: 8, title: 'Mock Test & Review', desc: 'Simulasi IELTS penuh + evaluasi + perbaikan', skill: 'All', target: '1 full mock test', icon: '🎯' },
    ],
    toeic: [
      { week: 1, title: 'Business Vocabulary', desc: 'Pelajari 150 kata kunci bisnis dan office', skill: 'Vocabulary', target: '150 kata', icon: '📚' },
      { week: 2, title: 'Grammar untuk TOEIC', desc: 'Verb tense, prepositions, connectors', skill: 'Grammar', target: '3 topik grammar', icon: '📝' },
      { week: 3, title: 'TOEIC Listening Part 1–2', desc: 'Foto dan question-response practice', skill: 'Listening', target: '40 soal Part 1–2', icon: '🎧' },
      { week: 4, title: 'TOEIC Listening Part 3–4', desc: 'Short conversations dan talks', skill: 'Listening', target: '40 soal Part 3–4', icon: '🎧' },
      { week: 5, title: 'TOEIC Reading Part 5–6', desc: 'Incomplete sentences dan error recognition', skill: 'Reading', target: '60 soal Part 5–6', icon: '📖' },
      { week: 6, title: 'TOEIC Reading Part 7 + Mock', desc: 'Reading comprehension + simulasi penuh', skill: 'Reading', target: '1 full mock test', icon: '🎯' },
    ],
    toefl: [
      { week: 1, title: 'Academic Vocabulary', desc: 'Kuasai 250 kata AWL (Academic Word List)', skill: 'Vocabulary', target: '250 kata', icon: '📚' },
      { week: 2, title: 'Complex Grammar', desc: 'Noun clauses, relative clauses, conditionals', skill: 'Grammar', target: '4 topik grammar', icon: '📝' },
      { week: 3, title: 'TOEFL Reading', desc: 'Latih 4 tipe soal: factual, inference, vocabulary in context', skill: 'Reading', target: '3 passages', icon: '📖' },
      { week: 4, title: 'TOEFL Listening', desc: 'Latih lecture dan conversation notes', skill: 'Listening', target: '4 audio sets', icon: '🎧' },
      { week: 5, title: 'TOEFL Speaking Task 1–2', desc: 'Independent & integrated speaking tasks', skill: 'Speaking', target: '6 speaking practice', icon: '🗣️' },
      { week: 6, title: 'TOEFL Writing Task 1', desc: 'Integrated writing: read + listen + respond', skill: 'Writing', target: '3 integrated essays', icon: '✍️' },
      { week: 7, title: 'TOEFL Writing Task 2', desc: 'Independent essay: agree/disagree, preferences', skill: 'Writing', target: '3 independent essays', icon: '✍️' },
      { week: 8, title: 'Full Practice', desc: 'Simulasi Reading + Listening', skill: 'All', target: 'Full section practice', icon: '🎯' },
      { week: 9, title: 'Speaking & Writing Drill', desc: 'Intensif practice speaking dan writing timed', skill: 'All', target: '10 timed tasks', icon: '🎯' },
      { week: 10, title: 'Mock Test & Review', desc: 'Simulasi TOEFL penuh + evaluasi komprehensif', skill: 'All', target: '1 full mock test', icon: '🎓' },
    ],
    cambridge: [
      { week: 1, title: 'Vocabulary B2–C1', desc: 'Idiom, phrasal verbs, collocations advanced', skill: 'Vocabulary', target: '200 ekspresi', icon: '📚' },
      { week: 2, title: 'Grammar B2–C1', desc: 'Inversion, cleft sentences, nominalization', skill: 'Grammar', target: '4 topik grammar', icon: '📝' },
      { week: 3, title: 'Use of English', desc: 'Open cloze, word formation, key word transformation', skill: 'Use of English', target: '40 soal UoE', icon: '📝' },
      { week: 4, title: 'Cambridge Reading', desc: 'Latih Part 1–3: multiple choice, headings, multiple matching', skill: 'Reading', target: '4 reading sets', icon: '📖' },
      { week: 5, title: 'Cambridge Listening', desc: 'Latih Part 1–4: monologue, conversation, interview', skill: 'Listening', target: '4 listening sets', icon: '🎧' },
      { week: 6, title: 'Cambridge Writing Part 1', desc: 'Essay writing: argument + counterargument', skill: 'Writing', target: '3 essays', icon: '✍️' },
      { week: 7, title: 'Cambridge Writing Part 2', desc: 'Report, letter, article, review', skill: 'Writing', target: '4 writing tasks', icon: '✍️' },
      { week: 8, title: 'Cambridge Speaking Part 1–2', desc: 'Introduction + long turn (describe & compare)', skill: 'Speaking', target: '6 sessions', icon: '🗣️' },
      { week: 9, title: 'Cambridge Speaking Part 3–4', desc: 'Discussion task + follow-up questions', skill: 'Speaking', target: '6 sessions', icon: '🗣️' },
      { week: 10, title: 'Full Paper Practice 1', desc: 'Simulasi Reading + Use of English + Writing', skill: 'All', target: 'Full paper', icon: '🎯' },
      { week: 11, title: 'Full Paper Practice 2', desc: 'Simulasi Listening + Speaking timed', skill: 'All', target: 'Full paper', icon: '🎯' },
      { week: 12, title: 'Final Mock & Review', desc: 'Simulasi Cambridge penuh + evaluasi akhir', skill: 'All', target: '1 full mock test', icon: '🏛️' },
    ],
    general: [
      { week: 1, title: 'Vocabulary Foundation', desc: 'Kuasai 100 kata A1–A2 dasar', skill: 'Vocabulary', target: '100 kata', icon: '📚' },
      { week: 2, title: 'Grammar Dasar', desc: 'Simple Present, Simple Past, To Be', skill: 'Grammar', target: '3 topik', icon: '📝' },
      { week: 3, title: 'Dialog & Speaking', desc: 'Kuasai 5 scene dialog A1–A2', skill: 'Speaking', target: '5 dialog', icon: '🗣️' },
      { week: 4, title: 'Reading & Review', desc: 'Baca artikel B1, evaluasi kemajuan', skill: 'Reading', target: '4 artikel', icon: '📖' },
    ],
  };

  // ── Tips belajar per skill ────────────────────────────────
  const SKILL_TIPS = {
    Vocabulary: [
      'Review SRS setiap hari, minimal 10 kartu',
      'Buat kalimat sendiri dengan kata baru',
      'Tonton film berbahasa Inggris untuk konteks vocab',
    ],
    Grammar: [
      'Pelajari 1 topik grammar per minggu, jangan terburu',
      'Praktek dengan menulis 5 kalimat per topik',
      'Gunakan grammar yang sudah dipelajari saat speaking',
    ],
    Reading: [
      'Baca artikel bahasa Inggris minimal 15 menit/hari',
      'Buat catatan kosa kata baru saat membaca',
      'Latih skimming (garis besar) dan scanning (detail)',
    ],
    Listening: [
      'Dengarkan podcast bahasa Inggris saat perjalanan',
      'Mulai dengan speed 0.75x, naikkan bertahap',
      'Latih shadow reading: ucapkan bersamaan dengan audio',
    ],
    Speaking: [
      'Berbicara sendiri (self-talk) minimal 5 menit/hari',
      'Rekam diri sendiri, dengarkan, dan evaluasi',
      'Jangan takut salah — fluency lebih penting dulu',
    ],
    Writing: [
      'Tulis diary berbahasa Inggris 3 kalimat/hari',
      'Minta feedback di platform seperti lang-8 atau iTalki',
      'Pelajari connectors: however, furthermore, in addition',
    ],
    'Use of English': [
      'Hafalkan kata yang sering muncul di cloze test',
      'Latih word formation: noun, verb, adjective, adverb',
      'Perhatikan collocations dan fixed phrases',
    ],
  };

  // ── Motivational quotes ───────────────────────────────────
  const QUOTES = [
    { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
    { text: 'Language is the road map of a culture.', author: 'Rita Mae Brown' },
    { text: "To have another language is to possess a second soul.", author: 'Charlemagne' },
    { text: 'One language sets you in a corridor for life. Two languages open every door along the way.', author: 'Frank Smith' },
    { text: 'The limits of my language mean the limits of my world.', author: 'Ludwig Wittgenstein' },
    { text: 'Learning a new language is becoming a new person.', author: 'Japanese Proverb' },
    { text: 'You live a new life for every new language you speak.', author: 'Czech Proverb' },
  ];

  // ── Hitung jadwal dari tanggal mulai & target ─────────────
  function generateWeeklyPlan(testId, startDate, targetDate) {
    const start = new Date(startDate);
    const target = new Date(targetDate);
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    const totalWeeks = Math.ceil((target - start) / msPerWeek);

    const milestones = MILESTONES[testId] || MILESTONES.general;
    const schedule = [];

    for (let w = 0; w < totalWeeks; w++) {
      const weekStart = new Date(start.getTime() + w * msPerWeek);
      const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
      const milestone = milestones[w] || milestones[milestones.length - 1];

      schedule.push({
        week: w + 1,
        weekStart: weekStart.toISOString().split('T')[0],
        weekEnd: weekEnd.toISOString().split('T')[0],
        milestone: { ...milestone, week: w + 1 },
        completed: false,
      });
    }

    return schedule;
  }

  // ── Hitung countdown ──────────────────────────────────────
  function getDaysUntil(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;
    return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
  }

  // ── Hitung progress % ─────────────────────────────────────
  function calcProgress(startDate, targetDate) {
    const now = new Date();
    const start = new Date(startDate);
    const target = new Date(targetDate);
    if (now <= start) return 0;
    if (now >= target) return 100;
    return Math.round(((now - start) / (target - start)) * 100);
  }

  // ── Format tanggal ID ─────────────────────────────────────
  function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  // ── Rekomendasi durasi belajar berdasarkan target ─────────
  function getRecommendedWeeks(testId, targetScore) {
    const test = TESTS.find(t => t.id === testId);
    if (!test) return 8;
    const scoreIndex = test.scores.indexOf(targetScore);
    const base = test.minWeeks;
    return base + (scoreIndex >= 0 ? scoreIndex * 2 : 0);
  }

  return {
    TESTS,
    DAILY_SCHEDULE,
    MILESTONES,
    SKILL_TIPS,
    QUOTES,
    generateWeeklyPlan,
    getDaysUntil,
    calcProgress,
    formatDate,
    getRecommendedWeeks,
  };
})();

window.PlannerData = PlannerData;
