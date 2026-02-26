/**
 * EnglishPath — Placement Test Questions
 * 20 questions covering A1–B2 range to determine starting level.
 * Each question has difficulty: 'A1', 'A2', 'B1', or 'B2'
 */
const PlacementData = (() => {

  const QUESTIONS = [
    // ── A1 (Q1–5) ──────────────────────────────────────────
    {
      id: 'pt_01',
      level: 'A1',
      type: 'multiple_choice',
      question: 'What is the correct sentence?',
      options: [
        'I am a student.',
        'I is a student.',
        'I are a student.',
        'Me is a student.',
      ],
      answer: 0,
      explanation: '"I am" is correct. "To be" with "I" is always "am".',
    },
    {
      id: 'pt_02',
      level: 'A1',
      type: 'multiple_choice',
      question: 'Choose the correct word: "She ___ a teacher."',
      options: ['am', 'is', 'are', 'be'],
      answer: 1,
      explanation: '"She is" — third person singular uses "is".',
    },
    {
      id: 'pt_03',
      level: 'A1',
      type: 'multiple_choice',
      question: 'What does "Hello" mean in Indonesian?',
      options: ['Selamat tinggal', 'Halo / Hai', 'Terima kasih', 'Maaf'],
      answer: 1,
      explanation: '"Hello" is a greeting, like "Halo" or "Hai" in Indonesian.',
    },
    {
      id: 'pt_04',
      level: 'A1',
      type: 'multiple_choice',
      question: 'How do you say the number 15?',
      options: ['Fifty', 'Five', 'Fifteen', 'Fifth'],
      answer: 2,
      explanation: '15 = fifteen. 50 = fifty. 5 = five.',
    },
    {
      id: 'pt_05',
      level: 'A1',
      type: 'multiple_choice',
      question: 'Which word is a colour?',
      options: ['Table', 'Blue', 'Walk', 'Happy'],
      answer: 1,
      explanation: '"Blue" is a colour. The others are: a noun, a verb, and an adjective.',
    },

    // ── A2 (Q6–10) ─────────────────────────────────────────
    {
      id: 'pt_06',
      level: 'A2',
      type: 'multiple_choice',
      question: 'Choose the correct past tense: "Yesterday I ___ to school."',
      options: ['go', 'goes', 'going', 'went'],
      answer: 3,
      explanation: '"Went" is the past tense of "go". It\'s an irregular verb.',
    },
    {
      id: 'pt_07',
      level: 'A2',
      type: 'multiple_choice',
      question: '"There ___ many books on the shelf."',
      options: ['is', 'are', 'was', 'am'],
      answer: 1,
      explanation: '"Books" is plural, so we use "are". "There are many books."',
    },
    {
      id: 'pt_08',
      level: 'A2',
      type: 'multiple_choice',
      question: 'What is the opposite of "cheap"?',
      options: ['Small', 'Fast', 'Expensive', 'Heavy'],
      answer: 2,
      explanation: 'The opposite of "cheap" (murah) is "expensive" (mahal).',
    },
    {
      id: 'pt_09',
      level: 'A2',
      type: 'multiple_choice',
      question: 'Choose the correct question: "___ you like coffee?"',
      options: ['Are', 'Is', 'Do', 'Does'],
      answer: 2,
      explanation: '"Do you like coffee?" — "do" is used with I/you/we/they for simple present questions.',
    },
    {
      id: 'pt_10',
      level: 'A2',
      type: 'multiple_choice',
      question: '"She has been studying English ___ five years."',
      options: ['since', 'for', 'ago', 'from'],
      answer: 1,
      explanation: '"For" is used with a duration (five years). "Since" is used with a point in time (2019).',
    },

    // ── B1 (Q11–16) ────────────────────────────────────────
    {
      id: 'pt_11',
      level: 'B1',
      type: 'multiple_choice',
      question: 'Choose the correct sentence:',
      options: [
        'If I have time, I will call you.',
        'If I will have time, I will call you.',
        'If I had time, I will call you.',
        'If I have time, I would call you.',
      ],
      answer: 0,
      explanation: 'First conditional: "If + present simple, will + base verb." Used for real future possibilities.',
    },
    {
      id: 'pt_12',
      level: 'B1',
      type: 'multiple_choice',
      question: '"The report ___ by the manager yesterday."',
      options: [
        'written',
        'was written',
        'is written',
        'has written',
      ],
      answer: 1,
      explanation: 'Past passive: "was/were + past participle." The report was written (by someone).',
    },
    {
      id: 'pt_13',
      level: 'B1',
      type: 'multiple_choice',
      question: 'What does "nevertheless" mean?',
      options: ['Because of this', 'Despite this / However', 'As a result', 'In addition'],
      answer: 1,
      explanation: '"Nevertheless" = however / despite that. It shows contrast.',
    },
    {
      id: 'pt_14',
      level: 'B1',
      type: 'multiple_choice',
      question: '"By the time she arrived, the meeting ___."',
      options: [
        'already finished',
        'has already finished',
        'had already finished',
        'already finishes',
      ],
      answer: 2,
      explanation: 'Past perfect: "had + past participle" — for an action completed before another past action.',
    },
    {
      id: 'pt_15',
      level: 'B1',
      type: 'multiple_choice',
      question: 'Choose the sentence with correct relative clause:',
      options: [
        'The woman who works here is very kind.',
        'The woman which works here is very kind.',
        'The woman that she works here is very kind.',
        'The woman whose works here is very kind.',
      ],
      answer: 0,
      explanation: '"Who" is used for people in relative clauses. "Which" is for things.',
    },
    {
      id: 'pt_16',
      level: 'B1',
      type: 'multiple_choice',
      question: '"She asked me where ___ from."',
      options: [
        'am I',
        'I am',
        'was I',
        'I were',
      ],
      answer: 1,
      explanation: 'In reported/indirect speech, we use normal word order: "where I am from" (not "where am I").',
    },

    // ── B2 (Q17–20) ────────────────────────────────────────
    {
      id: 'pt_17',
      level: 'B2',
      type: 'multiple_choice',
      question: '"___ she known about the party, she would have come."',
      options: ['If', 'Had', 'Should', 'Were'],
      answer: 1,
      explanation: 'Inverted third conditional: "Had she known..." = "If she had known..." — formal/literary style.',
    },
    {
      id: 'pt_18',
      level: 'B2',
      type: 'multiple_choice',
      question: 'What is the meaning of the idiom "to bite the bullet"?',
      options: [
        'To eat very fast',
        'To endure a painful or difficult situation',
        'To make a big mistake',
        'To argue aggressively',
      ],
      answer: 1,
      explanation: '"Bite the bullet" means to endure something difficult with courage.',
    },
    {
      id: 'pt_19',
      level: 'B2',
      type: 'multiple_choice',
      question: 'Choose the correct sentence:',
      options: [
        'I wish I can speak French fluently.',
        'I wish I could speak French fluently.',
        'I wish I would speak French fluently.',
        'I wish I will speak French fluently.',
      ],
      answer: 1,
      explanation: '"Wish + past simple" expresses an unreal wish. "I wish I could..." (but I can\'t now).',
    },
    {
      id: 'pt_20',
      level: 'B2',
      type: 'multiple_choice',
      question: '"The new policy has caused widespread ___."',
      options: ['controversy', 'controversial', 'controversially', 'controversies'],
      answer: 0,
      explanation: 'After "widespread" (adjective), we need a noun: "controversy". "Controversies" is plural and also correct, but "widespread controversy" is the more natural collocation.',
    },
  ];

  // Determine CEFR level from score
  function calculateLevel(answers) {
    // answers = array of booleans (correct/wrong) per question index
    let a1 = 0, a2 = 0, b1 = 0, b2 = 0;
    const counts = { A1: 5, A2: 5, B1: 6, B2: 4 };

    QUESTIONS.forEach((q, i) => {
      if (answers[i]) {
        if (q.level === 'A1') a1++;
        if (q.level === 'A2') a2++;
        if (q.level === 'B1') b1++;
        if (q.level === 'B2') b2++;
      }
    });

    const a1Pct = a1 / counts.A1;
    const a2Pct = a2 / counts.A2;
    const b1Pct = b1 / counts.B1;
    const b2Pct = b2 / counts.B2;

    // Level placement logic
    if (a1Pct < 0.6) return 'A1';
    if (a1Pct >= 0.6 && a2Pct < 0.6) return 'A1';
    if (a2Pct >= 0.6 && b1Pct < 0.5) return 'A2';
    if (b1Pct >= 0.5 && b2Pct < 0.5) return 'B1';
    return 'B2';
  }

  function getLevelDescription(level) {
    const map = {
      A1: {
        label: 'A1 — Pemula',
        desc: 'Kamu baru memulai perjalanan bahasa Inggris. Kita akan mulai dari fondasi: alfabet, kosakata dasar, dan percakapan sehari-hari.',
        emoji: '🌱',
        color: '#10b981',
        startPage: 'foundation/vocabulary.html',
      },
      A2: {
        label: 'A2 — Dasar',
        desc: 'Kamu sudah menguasai dasar-dasar. Kita akan memperkuat grammar, vocabulary sehari-hari, dan kalimat sederhana.',
        emoji: '🌿',
        color: '#3b82f6',
        startPage: 'foundation/grammar.html',
      },
      B1: {
        label: 'B1 — Menengah',
        desc: 'Level menengah! Kamu sudah bisa berkomunikasi dasar. Fokus kita: tata bahasa kompleks, reading, dan listening.',
        emoji: '🌳',
        color: '#8b5cf6',
        startPage: 'intermediate/vocabulary.html',
      },
      B2: {
        label: 'B2 — Atas Menengah',
        desc: 'Luar biasa! Level B2 berarti kamu siap untuk persiapan tes IELTS/TOEIC/TOEFL. Mari tingkatkan ke level mahir.',
        emoji: '🏆',
        color: '#f59e0b',
        startPage: 'ielts/overview.html',
      },
    };
    return map[level] || map['A1'];
  }

  return {
    QUESTIONS,
    calculateLevel,
    getLevelDescription,
  };
})();

window.PlacementData = PlacementData;
