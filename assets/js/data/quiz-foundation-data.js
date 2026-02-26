/**
 * EnglishPath — Quiz Foundation Data (A1–A2)
 * Fase 7 — v0.8.0
 *
 * Quiz komprehensif Foundation: campuran vocabulary, grammar, & dialog A1–A2
 * Struktur soal: { id, category, level, type, question, answer, options?, hint? }
 * type: 'mcq' | 'fill' | 'translate' | 'listen'
 */

const QUIZ_FOUNDATION_DATA = (function () {
  'use strict';

  // ── Quiz Sets (Rounds) ────────────────────────────────────
  // Setiap set = 10 soal campuran topik A1–A2
  const QUIZ_SETS = [
    {
      id: 'set-vocabulary',
      title: 'Vocabulary Challenge',
      icon: '📚',
      desc: 'Uji penguasaan kosakata A1–A2 kamu.',
      level: 'A1–A2',
      questions: [
        { type: 'mcq', category: 'vocab', level: 'A1', question: 'What is the meaning of "beautiful"?', answer: 'indah / cantik', options: ['marah', 'indah / cantik', 'lelah', 'lapar'] },
        { type: 'mcq', category: 'vocab', level: 'A1', question: 'Choose the correct word: "I ___ hungry. Let\'s eat!"', answer: 'am', options: ['is', 'am', 'are', 'be'] },
        { type: 'fill', category: 'vocab', level: 'A1', question: 'The opposite of "hot" is ___.', answer: 'cold', hint: 'Lawan kata panas' },
        { type: 'mcq', category: 'vocab', level: 'A1', question: '"Brother" in Indonesian is:', answer: 'saudara laki-laki', options: ['saudara perempuan', 'saudara laki-laki', 'ayah', 'paman'] },
        { type: 'mcq', category: 'vocab', level: 'A2', question: 'What does "responsible" mean?', answer: 'bertanggung jawab', options: ['menyenangkan', 'bertanggung jawab', 'kreatif', 'pemalu'] },
        { type: 'fill', category: 'vocab', level: 'A2', question: '"I ___ to music every day." (listen)', answer: 'listen', hint: 'Verb sederhana' },
        { type: 'mcq', category: 'vocab', level: 'A1', question: '"Kitchen" is a room where you:', answer: 'cook food', options: ['sleep', 'cook food', 'wash clothes', 'study'] },
        { type: 'mcq', category: 'vocab', level: 'A2', question: 'The word "environment" means:', answer: 'lingkungan', options: ['pemerintah', 'pendidikan', 'lingkungan', 'ekonomi'] },
        { type: 'fill', category: 'vocab', level: 'A1', question: 'January is the ___ month of the year.', answer: 'first', hint: 'Urutan pertama' },
        { type: 'mcq', category: 'vocab', level: 'A2', question: '"Polite" means:', answer: 'sopan', options: ['kasar', 'sopan', 'berani', 'malas'] },
      ],
    },

    {
      id: 'set-grammar',
      title: 'Grammar Mastery',
      icon: '📝',
      desc: 'Uji penguasaan grammar A1–A2 kamu.',
      level: 'A1–A2',
      questions: [
        { type: 'mcq', category: 'grammar', level: 'A1', question: 'Choose the correct sentence:', answer: 'She is a doctor.', options: ['She are a doctor.', 'She is a doctor.', 'She am a doctor.', 'She be a doctor.'] },
        { type: 'fill', category: 'grammar', level: 'A1', question: 'He ___ not like coffee. (do/does)', answer: 'does', hint: 'Untuk He/She/It' },
        { type: 'mcq', category: 'grammar', level: 'A1', question: '"They ___ playing football now." — Present Continuous:', answer: 'are', options: ['is', 'am', 'are', 'be'] },
        { type: 'mcq', category: 'grammar', level: 'A1', question: 'Which is the correct plural?', answer: 'children', options: ['childs', 'childrens', 'children', 'child\'s'] },
        { type: 'fill', category: 'grammar', level: 'A1', question: 'I went to the market ___. (kemarin)', answer: 'yesterday', hint: 'Kata keterangan waktu lampau' },
        { type: 'mcq', category: 'grammar', level: 'A2', question: '"She ___ play the piano very well." — Modal ability:', answer: 'can', options: ['can', 'must', 'should', 'would'] },
        { type: 'mcq', category: 'grammar', level: 'A2', question: 'Choose the comparative form: "This book is ___ (interesting) than that one."', answer: 'more interesting', options: ['interestinger', 'most interesting', 'more interesting', 'interesting'] },
        { type: 'fill', category: 'grammar', level: 'A2', question: 'I ___ going to visit my grandparents this Sunday. (be)', answer: 'am', hint: 'Future: be going to' },
        { type: 'mcq', category: 'grammar', level: 'A2', question: '"You ___ see a doctor. You look pale." — Modal advice:', answer: 'should', options: ['can', 'will', 'should', 'may'] },
        { type: 'mcq', category: 'grammar', level: 'A1', question: 'Which sentence is in Simple Past?', answer: 'She visited Paris last year.', options: ['She visits Paris now.', 'She is visiting Paris.', 'She visited Paris last year.', 'She will visit Paris.'] },
      ],
    },

    {
      id: 'set-dialog',
      title: 'Dialog & Communication',
      icon: '💬',
      desc: 'Uji kemampuan komunikasi sehari-hari.',
      level: 'A1–A2',
      questions: [
        { type: 'mcq', category: 'dialog', level: 'A1', question: 'You meet someone for the first time. You say:', answer: 'Nice to meet you!', options: ['Goodbye!', 'Nice to meet you!', 'How are you?', 'See you later!'] },
        { type: 'fill', category: 'dialog', level: 'A1', question: 'Waiter: "What would you like?" You: "Can I ___ a coffee, please?"', answer: 'have', hint: 'Kata kerja untuk memesan' },
        { type: 'mcq', category: 'dialog', level: 'A1', question: 'You want to know the price. You ask:', answer: 'How much is it?', options: ['Where is it?', 'How much is it?', 'What is it?', 'When is it?'] },
        { type: 'mcq', category: 'dialog', level: 'A1', question: 'Someone helps you. You say "Thank you." They reply:', answer: 'You\'re welcome.', options: ['Sorry.', 'Excuse me.', 'You\'re welcome.', 'Never mind.'] },
        { type: 'fill', category: 'dialog', level: 'A1', question: '"___ me, where is the nearest hospital?" — Asking politely.', answer: 'Excuse', hint: 'Sapaan untuk menarik perhatian' },
        { type: 'mcq', category: 'dialog', level: 'A2', question: '"Are you free this Saturday?" The best response is:', answer: 'I think so. Why?', options: ['No, I am Saturday.', 'I think so. Why?', 'Free is Saturday yes.', 'Where are you?'] },
        { type: 'mcq', category: 'dialog', level: 'A2', question: 'At the airport, the agent asks "Window or aisle?" This is about:', answer: 'seat preference', options: ['luggage size', 'meal preference', 'seat preference', 'ticket price'] },
        { type: 'fill', category: 'dialog', level: 'A2', question: '"Tell me ___ yourself." — Job interview question.', answer: 'about', hint: 'Preposisi untuk menceritakan diri' },
        { type: 'mcq', category: 'dialog', level: 'A2', question: 'A doctor asks "What are your symptoms?" The correct meaning is:', answer: 'What health problems do you have?', options: ['What is your name?', 'How old are you?', 'What health problems do you have?', 'What medicine do you take?'] },
        { type: 'fill', category: 'dialog', level: 'A1', question: '"Go ___." — Giving direction to walk forward.', answer: 'straight', hint: 'Arah lurus ke depan' },
      ],
    },

    {
      id: 'set-mixed-a1',
      title: 'Foundation A1 Review',
      icon: '🌱',
      desc: 'Review komprehensif semua materi A1.',
      level: 'A1',
      questions: [
        { type: 'mcq', category: 'mixed', level: 'A1', question: '"___ you a student?" — Fill with correct to be.', answer: 'Are', options: ['Am', 'Is', 'Are', 'Be'] },
        { type: 'mcq', category: 'mixed', level: 'A1', question: 'What is the IPA symbol for the "sh" sound in "she"?', answer: '/ʃ/', options: ['/s/', '/ʃ/', '/tʃ/', '/z/'] },
        { type: 'fill', category: 'mixed', level: 'A1', question: '"I have ___ apple." — Use correct article.', answer: 'an', hint: 'Huruf vokal: a/e/i/o/u' },
        { type: 'mcq', category: 'mixed', level: 'A1', question: 'What does "pencil" mean?', answer: 'pensil', options: ['pulpen', 'pensil', 'kertas', 'buku'] },
        { type: 'mcq', category: 'mixed', level: 'A1', question: '"The children ___ playing in the garden." — Present Continuous:', answer: 'are', options: ['is', 'am', 'are', 'were'] },
        { type: 'fill', category: 'mixed', level: 'A1', question: 'Monday, ___, Wednesday, Thursday... (hari)', answer: 'Tuesday', hint: 'Hari setelah Senin' },
        { type: 'mcq', category: 'mixed', level: 'A1', question: 'Which word is a color?', answer: 'purple', options: ['circle', 'purple', 'table', 'window'] },
        { type: 'mcq', category: 'mixed', level: 'A1', question: '"She walked to school ___ morning." — Time expression:', answer: 'this', options: ['last', 'next', 'this', 'every'] },
        { type: 'fill', category: 'mixed', level: 'A1', question: 'Spring, ___, Autumn, Winter — Four seasons. (musim panas)', answer: 'Summer', hint: 'Musim kedua' },
        { type: 'mcq', category: 'mixed', level: 'A1', question: 'Which is the CORRECT plural?', answer: 'mice', options: ['mouses', 'mouse', 'mice', 'mooses'] },
      ],
    },

    {
      id: 'set-mixed-a2',
      title: 'Foundation A2 Review',
      icon: '🌿',
      desc: 'Review komprehensif semua materi A2.',
      level: 'A2',
      questions: [
        { type: 'mcq', category: 'mixed', level: 'A2', question: '"This movie is the ___ interesting." — Superlative:', answer: 'most', options: ['more', 'most', 'very', 'much'] },
        { type: 'fill', category: 'mixed', level: 'A2', question: '"You ___ not smoke here. It is not allowed." — Modal prohibition.', answer: 'must', hint: 'Modal larangan keras' },
        { type: 'mcq', category: 'mixed', level: 'A2', question: '"I ___ going to travel to London next year." — Future plan:', answer: 'am', options: ['is', 'am', 'are', 'will'] },
        { type: 'mcq', category: 'mixed', level: 'A2', question: 'What does "ambitious" mean?', answer: 'ambisius / berambisi', options: ['pemalu', 'ambisius / berambisi', 'sederhana', 'pemalas'] },
        { type: 'fill', category: 'mixed', level: 'A2', question: '"She is ___ than her brother." (tall → comparative)', answer: 'taller', hint: 'Tambahkan -er' },
        { type: 'mcq', category: 'mixed', level: 'A2', question: 'Which sentence uses "will" correctly?', answer: 'I will call you tomorrow.', options: ['I will going to school.', 'I will call you tomorrow.', 'She will is happy.', 'They will are here.'] },
        { type: 'mcq', category: 'mixed', level: 'A2', question: '"Can I help you?" is used to offer:', answer: 'assistance', options: ['food', 'money', 'assistance', 'information'] },
        { type: 'fill', category: 'mixed', level: 'A2', question: 'I ___ finish my homework before dinner. (modal obligation)', answer: 'must', hint: 'Harus / wajib' },
        { type: 'mcq', category: 'mixed', level: 'A2', question: 'Which word means "professional"?', answer: 'profesional', options: ['pribadi', 'profesional', 'pelanggan', 'pemerintah'] },
        { type: 'mcq', category: 'mixed', level: 'A2', question: '"How long have you been waiting?" refers to:', answer: 'duration of waiting', options: ['distance traveled', 'duration of waiting', 'number of people', 'future plans'] },
      ],
    },

    {
      id: 'set-final',
      title: 'Grand Final Quiz',
      icon: '🏆',
      desc: 'Ujian akhir Foundation — semua topik A1 & A2.',
      level: 'A1–A2',
      questions: [
        { type: 'mcq', category: 'mixed', level: 'A1', question: '"Nice to meet you!" is a greeting for:', answer: 'first meeting', options: ['saying goodbye', 'first meeting', 'asking directions', 'ordering food'] },
        { type: 'fill', category: 'grammar', level: 'A1', question: '"She ___ a beautiful dress." (to be)', answer: 'is', hint: 'He/She/It + ?' },
        { type: 'mcq', category: 'vocab', level: 'A2', question: 'What does "hardworking" mean?', answer: 'pekerja keras', options: ['pemalas', 'pekerja keras', 'keras kepala', 'kurang ajar'] },
        { type: 'mcq', category: 'grammar', level: 'A2', question: '"That is the ___ expensive hotel in the city." — Superlative:', answer: 'most', options: ['more', 'most', 'very', 'best'] },
        { type: 'fill', category: 'dialog', level: 'A1', question: '"Can I ___ a cup of tea, please?" — Ordering at a café.', answer: 'have', hint: 'Kata kerja untuk meminta' },
        { type: 'mcq', category: 'vocab', level: 'A1', question: 'The word "kitchen" refers to:', answer: 'a room for cooking', options: ['a bedroom', 'a bathroom', 'a room for cooking', 'a garden'] },
        { type: 'mcq', category: 'grammar', level: 'A1', question: 'Which article is correct? "___ umbrella"', answer: 'an', options: ['a', 'an', 'the', 'some'] },
        { type: 'fill', category: 'grammar', level: 'A2', question: 'She ___ visit her doctor tomorrow. (will — future)', answer: 'will', hint: 'Auxiliary future simple' },
        { type: 'mcq', category: 'dialog', level: 'A2', question: 'At the airport, "boarding pass" is:', answer: 'kartu naik pesawat', options: ['tiket pesawat', 'kartu identitas', 'kartu naik pesawat', 'paspor'] },
        { type: 'mcq', category: 'grammar', level: 'A2', question: '"You ___ exercise more. It\'s good for health." — Modal advice:', answer: 'should', options: ['must', 'should', 'can', 'will'] },
      ],
    },
  ];

  // ── Public API ────────────────────────────────────────────

  return {
    getSets() { return QUIZ_SETS; },

    getSet(id) { return QUIZ_SETS.find(s => s.id === id) || null; },

    getStats() {
      const totalQ = QUIZ_SETS.reduce((sum, s) => sum + s.questions.length, 0);
      return {
        sets: QUIZ_SETS.length,
        totalQuestions: totalQ,
      };
    },
  };
})();
