/**
 * EnglishPath — Grammar Data B1–B2
 * Fase 8b — v0.9.2
 *
 * Struktur:
 *  GRAMMAR_INTERMEDIATE_DATA  → module IIFE
 *  getTopics()  → array topic
 *  getTopic(id) → single topic
 *  getQuiz(id, n) → shuffled quiz questions (max n)
 *
 * 12 topik: 6 B1 + 6 B2
 * Setiap topik: 10 soal (mcq/fill/reorder)
 */

const GRAMMAR_INTERMEDIATE_DATA = (function () {
  'use strict';

  const TOPICS = [

    // ══════════════════════════════════════════════════════════
    // B1 TOPICS
    // ══════════════════════════════════════════════════════════

    // ── 1. Present Perfect ───────────────────────────────────
    {
      id: 'present-perfect',
      level: 'B1',
      title: 'Present Perfect',
      icon: '✅',
      shortDesc: 'Menghubungkan masa lalu dengan masa kini.',
      sections: [
        {
          heading: 'Penggunaan',
          explanation: `Present Perfect (have/has + V3) digunakan untuk:
1. Pengalaman hidup (tanpa menyebutkan waktu spesifik)
2. Aksi yang baru saja terjadi (just, recently, lately)
3. Aksi yang dimulai di masa lalu dan berlanjut sampai sekarang (for, since)
4. Aksi dengan dampak/relevansi di masa kini`,
          examples: [
            { en: 'I have visited Paris three times.', id: 'Saya telah mengunjungi Paris tiga kali.' },
            { en: 'She has just finished her homework.', id: 'Dia baru saja menyelesaikan PR-nya.' },
            { en: 'We have lived here since 2010.', id: 'Kami telah tinggal di sini sejak 2010.' },
            { en: 'He has lost his keys.', id: 'Dia telah kehilangan kuncinya. (dan masih hilang)' },
          ],
        },
        {
          heading: 'For vs Since',
          explanation: `• FOR → durasi (lama waktu): for two years, for a week, for ages
• SINCE → titik waktu awal: since Monday, since 2015, since I was born`,
          examples: [
            { en: 'I have worked here for five years.', id: 'Saya telah bekerja di sini selama lima tahun.' },
            { en: 'She has been ill since last Tuesday.', id: 'Dia sakit sejak Selasa lalu.' },
          ],
          tips: 'Gunakan "Have you ever...?" untuk menanyakan pengalaman. Gunakan "Have you ... yet?" untuk bertanya apakah sesuatu sudah selesai.',
        },
        {
          heading: 'Present Perfect vs Simple Past',
          explanation: `• Simple Past → waktu spesifik sudah selesai: I went to Paris in 2018.
• Present Perfect → waktu tidak disebutkan / relevan sekarang: I have been to Paris.`,
          examples: [
            { en: 'I saw that film last night. (Simple Past)', id: 'Saya menonton film itu semalam.' },
            { en: "I've already seen that film. (Present Perfect)", id: 'Saya sudah pernah menonton film itu.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'She ___ to Japan twice.', answer: 'has been', options: ['was', 'has been', 'have been', 'went'] },
        { type: 'mcq', question: 'I ___ my wallet! I can\'t find it.', answer: 'have lost', options: ['lose', 'lost', 'have lost', 'has lost'] },
        { type: 'fill', question: 'They ___ (live) in this city since 2015.', answer: 'have lived' },
        { type: 'fill', question: 'He ___ (just / finish) his presentation.', answer: 'has just finished' },
        { type: 'mcq', question: 'We have worked here ___ ten years.', answer: 'for', options: ['since', 'for', 'during', 'from'] },
        { type: 'mcq', question: 'Have you ___ tried sushi?', answer: 'ever', options: ['never', 'ever', 'already', 'yet'] },
        { type: 'mcq', question: 'I went to the cinema ___ Friday.', answer: 'last', options: ['since', 'for', 'last', 'ago'] },
        { type: 'fill', question: 'She has been a doctor ___ she graduated in 2005.', answer: 'since' },
        { type: 'reorder', question: 'Susun kalimat yang benar:', words: ['never', 'I', 'eaten', 'have', 'durian'], answer: 'I have never eaten durian.' },
        { type: 'mcq', question: 'Has he ___ his report yet?', answer: 'finished', options: ['finish', 'finishing', 'finished', 'finishes'] },
      ],
    },

    // ── 2. Conditionals (Type 0, 1, 2) ───────────────────────
    {
      id: 'conditionals-1-2',
      level: 'B1',
      title: 'Conditionals (Type 0, 1 & 2)',
      icon: '🔀',
      shortDesc: 'Kalimat pengandaian nyata dan tidak nyata.',
      sections: [
        {
          heading: 'Type 0 — Fakta Umum',
          explanation: `If + Simple Present, Simple Present
Digunakan untuk fakta ilmiah, kebenaran umum, atau sebab-akibat yang selalu terjadi.`,
          examples: [
            { en: 'If you heat water to 100°C, it boils.', id: 'Jika kamu memanaskan air hingga 100°C, air mendidih.' },
            { en: 'If it rains, the ground gets wet.', id: 'Jika hujan, tanah menjadi basah.' },
          ],
        },
        {
          heading: 'Type 1 — Kondisi Nyata / Kemungkinan Terjadi',
          explanation: `If + Simple Present, will + V1
Digunakan untuk kondisi yang mungkin atau bisa terjadi di masa depan.`,
          examples: [
            { en: 'If it rains tomorrow, I will stay at home.', id: 'Jika hujan besok, saya akan tinggal di rumah.' },
            { en: "If you study hard, you'll pass the exam.", id: 'Jika kamu belajar keras, kamu akan lulus ujian.' },
          ],
          tips: 'Klausa "if" bisa di awal atau di akhir kalimat. Jika di awal, gunakan koma.',
        },
        {
          heading: 'Type 2 — Kondisi Tidak Nyata / Hipotesis',
          explanation: `If + Simple Past, would + V1
Digunakan untuk situasi imajiner, tidak nyata, atau sangat tidak mungkin di masa kini/depan.`,
          examples: [
            { en: 'If I had a million dollars, I would travel the world.', id: 'Andai saya punya satu juta dolar, saya akan berkeliling dunia.' },
            { en: 'If she studied harder, she would get better grades.', id: 'Andai dia belajar lebih keras, nilainya akan lebih bagus.' },
          ],
          tips: 'Untuk "to be" di Type 2, gunakan "were" untuk semua subjek: If I were you, I would...',
        },
      ],
      quiz: [
        { type: 'mcq', question: 'If you ___ early, you will get a good seat.', answer: 'arrive', options: ['arrived', 'arrive', 'will arrive', 'arriving'] },
        { type: 'mcq', question: 'If I were rich, I ___ a big house.', answer: 'would buy', options: ['will buy', 'buy', 'would buy', 'bought'] },
        { type: 'fill', question: 'If you heat metal, it ___ (expand).', answer: 'expands' },
        { type: 'mcq', question: 'If it ___ tomorrow, we will cancel the trip.', answer: 'rains', options: ['rain', 'will rain', 'rains', 'rained'] },
        { type: 'fill', question: 'She ___ (travel) more if she had more holidays.', answer: 'would travel' },
        { type: 'mcq', question: 'Which is Type 1 conditional?', answer: 'If she calls, I will answer.', options: ['If she called, I would answer.', 'If she calls, I will answer.', 'If she had called, I would have answered.', 'If water freezes, it becomes ice.'] },
        { type: 'mcq', question: 'If I ___ you, I wouldn\'t do that.', answer: 'were', options: ['am', 'was', 'were', 'be'] },
        { type: 'reorder', question: 'Susun kalimat Type 1 yang benar:', words: ['will', 'you', 'study', 'pass', 'If', 'you', ',', 'hard'], answer: 'If you study hard, you will pass.' },
        { type: 'fill', question: 'If you mix blue and yellow, you ___ (get) green.', answer: 'get' },
        { type: 'mcq', question: 'He ___ if he practises every day.', answer: 'will improve', options: ['would improve', 'improves', 'will improve', 'improved'] },
      ],
    },

    // ── 3. Passive Voice (Present & Past) ────────────────────
    {
      id: 'passive-voice',
      level: 'B1',
      title: 'Passive Voice',
      icon: '🔄',
      shortDesc: 'Mengubah fokus dari pelaku ke objek aksi.',
      sections: [
        {
          heading: 'Pengertian & Rumus',
          explanation: `Passive Voice digunakan ketika:
• Pelaku tidak diketahui atau tidak penting
• Kita ingin memfokuskan pada objek/hasil aksi
• Gaya penulisan formal/ilmiah

Rumus: Subject + be (am/is/are/was/were) + V3 (+ by agent)`,
          examples: [
            { en: 'The cake is made by my mother.', id: 'Kue ini dibuat oleh ibuku.' },
            { en: 'English is spoken all over the world.', id: 'Bahasa Inggris diucapkan di seluruh dunia.' },
            { en: 'The letter was written yesterday.', id: 'Surat itu ditulis kemarin.' },
            { en: 'The windows were cleaned this morning.', id: 'Jendela-jendela dibersihkan pagi ini.' },
          ],
        },
        {
          heading: 'Mengubah Active → Passive',
          explanation: `Langkah:
1. Objek kalimat aktif → Subjek kalimat pasif
2. Kata kerja aktif → be + V3
3. Subjek aktif → "by ..." (boleh dihilangkan jika tidak penting)`,
          examples: [
            { en: 'Active: The chef cooks the meal. → Passive: The meal is cooked by the chef.', id: 'Active: Koki memasak makanan. → Passive: Makanan dimasak oleh koki.' },
            { en: 'Active: Someone stole my bike. → Passive: My bike was stolen.', id: 'Active: Seseorang mencuri sepedaku. → Passive: Sepedaku dicuri.' },
          ],
          tips: 'Frasa "by ..." sering dihilangkan jika pelaku tidak diketahui atau tidak relevan.',
        },
        {
          heading: 'Passive dengan Tenses Lain',
          explanation: `• Present Continuous Passive: is/are being + V3
• Present Perfect Passive: has/have been + V3
• Future Passive: will be + V3`,
          examples: [
            { en: 'The road is being repaired.', id: 'Jalan sedang diperbaiki.' },
            { en: 'The report has been submitted.', id: 'Laporan telah diserahkan.' },
            { en: 'The package will be delivered tomorrow.', id: 'Paket akan dikirim besok.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'The book ___ written by Tolkien.', answer: 'was', options: ['is', 'was', 'were', 'be'] },
        { type: 'mcq', question: 'English ___ spoken in many countries.', answer: 'is', options: ['are', 'is', 'be', 'was'] },
        { type: 'fill', question: 'The windows ___ (clean) every week.', answer: 'are cleaned' },
        { type: 'mcq', question: 'My car ___ repaired at the moment.', answer: 'is being', options: ['is been', 'is being', 'has been', 'was being'] },
        { type: 'mcq', question: '"Someone broke the window." → Passive: "The window ___."', answer: 'was broken', options: ['is broken', 'broke', 'was broken', 'has broken'] },
        { type: 'fill', question: 'The new hospital ___ (build) next year.', answer: 'will be built' },
        { type: 'reorder', question: 'Ubah ke passive:', words: ['was', 'The', 'by', 'cooked', 'chef', 'meal', 'the'], answer: 'The meal was cooked by the chef.' },
        { type: 'mcq', question: 'The report ___ already been sent.', answer: 'has', options: ['have', 'has', 'had', 'is'] },
        { type: 'fill', question: 'Mistakes ___ (make) by everyone sometimes.', answer: 'are made' },
        { type: 'mcq', question: 'Which sentence is passive?', answer: 'The letter was signed by the manager.', options: ['The manager signed the letter.', 'The letter was signed by the manager.', 'The manager is signing the letter.', 'The manager had signed the letter.'] },
      ],
    },

    // ── 4. Modal Verbs — Advanced ────────────────────────────
    {
      id: 'modal-verbs-advanced',
      level: 'B1',
      title: 'Modal Verbs (Advanced)',
      icon: '🎯',
      shortDesc: 'Kemungkinan, kesimpulan, dan kewajiban tingkat lanjut.',
      sections: [
        {
          heading: 'Deduction & Probability (Present)',
          explanation: `• must → sangat yakin (positif): He must be tired. (pasti lelah)
• can't / couldn't → sangat yakin (negatif): She can't be at home. (pasti tidak di rumah)
• might / may / could → kemungkinan: It might rain. (mungkin hujan)`,
          examples: [
            { en: "She must be the new teacher — she's carrying a lot of books.", id: 'Dia pasti guru baru — dia membawa banyak buku.' },
            { en: "He can't be serious! This is impossible.", id: 'Dia pasti tidak serius! Ini tidak mungkin.' },
            { en: 'It might snow tonight.', id: 'Mungkin akan bersalju malam ini.' },
          ],
        },
        {
          heading: 'Deduction about the Past',
          explanation: `• must have + V3 → sangat yakin tentang masa lalu: She must have forgotten.
• can't have + V3 → tidak mungkin di masa lalu: He can't have done it.
• might/may have + V3 → kemungkinan di masa lalu: They might have already left.`,
          examples: [
            { en: 'You must have been tired after that long journey.', id: 'Kamu pasti kelelahan setelah perjalanan panjang itu.' },
            { en: "She can't have passed — she didn't study at all.", id: 'Dia pasti tidak lulus — dia sama sekali tidak belajar.' },
          ],
          tips: '"Should have + V3" berarti sesuatu yang seharusnya dilakukan tapi tidak: I should have studied harder.',
        },
        {
          heading: 'Obligation & Advice',
          explanation: `• must → kewajiban kuat (dari pembicara): You must wear a seatbelt.
• have to → kewajiban dari aturan eksternal: I have to work on Saturdays.
• should/ought to → saran, rekomendasi: You should see a doctor.
• needn't / don't have to → tidak perlu: You needn't pay — it's free.`,
          examples: [
            { en: 'Passengers must show their tickets.', id: 'Penumpang harus menunjukkan tiket mereka.' },
            { en: 'You should apologise to her.', id: 'Kamu sebaiknya minta maaf padanya.' },
            { en: "You don't have to come if you don't want to.", id: 'Kamu tidak harus datang jika tidak mau.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: "He's not answering his phone. He ___ be sleeping.", answer: 'must', options: ['must', 'should', 'have to', 'can'] },
        { type: 'mcq', question: 'She ___ be your sister — you look nothing alike!', answer: "can't", options: ["mustn't", "can't", 'might not', 'should not'] },
        { type: 'fill', question: 'He ___ have forgotten the meeting — he never misses one.', answer: "can't" },
        { type: 'mcq', question: 'You ___ wear a helmet when cycling — it\'s the law.', answer: 'must', options: ['should', 'could', 'must', 'might'] },
        { type: 'mcq', question: "I ___ work late tonight — my boss said so.", answer: 'have to', options: ['must', 'should', 'have to', 'ought'] },
        { type: 'fill', question: 'She ___ have studied harder. Now she regrets it.', answer: 'should' },
        { type: 'mcq', question: 'You ___ come to the party if you\'re busy. No pressure.', answer: "don't have to", options: ["mustn't", "can't", "don't have to", 'needn\'t have'] },
        { type: 'reorder', question: 'Susun kalimat:', words: ['been', 'must', 'She', 'have', 'delighted'], answer: 'She must have been delighted.' },
        { type: 'mcq', question: '"It might rain." What does this express?', answer: 'Possibility', options: ['Certainty', 'Obligation', 'Possibility', 'Prohibition'] },
        { type: 'fill', question: 'They ___ have left already — the door is locked.', answer: 'might' },
      ],
    },

    // ── 5. Reported Speech ───────────────────────────────────
    {
      id: 'reported-speech',
      level: 'B1',
      title: 'Reported Speech',
      icon: '🗣️',
      shortDesc: 'Melaporkan ucapan orang lain secara tidak langsung.',
      sections: [
        {
          heading: 'Pengertian & Backshift',
          explanation: `Reported Speech (Indirect Speech) digunakan untuk menceritakan kembali apa yang dikatakan orang lain. Tenses biasanya bergeser ke belakang (backshift):

• Simple Present → Simple Past
• Present Continuous → Past Continuous
• Simple Past → Past Perfect
• Present Perfect → Past Perfect
• will → would / can → could / may → might`,
          examples: [
            { en: '"I am tired." → She said she was tired.', id: '"Saya lelah." → Dia berkata dia lelah.' },
            { en: '"I have finished." → He said he had finished.', id: '"Saya sudah selesai." → Dia berkata dia sudah selesai.' },
            { en: '"I will help you." → She said she would help me.', id: '"Saya akan membantu kamu." → Dia berkata dia akan membantuku.' },
          ],
        },
        {
          heading: 'Reporting Questions',
          explanation: `Untuk melaporkan pertanyaan, gunakan if/whether (yes/no) atau kata tanya (wh-):
• "Are you ready?" → He asked if I was ready.
• "Where do you live?" → She asked where I lived.

Catatan: Struktur kalimat kembali ke susunan normal (bukan inversi pertanyaan).`,
          examples: [
            { en: '"Do you like coffee?" → He asked if I liked coffee.', id: '"Apakah kamu suka kopi?" → Dia bertanya apakah saya suka kopi.' },
            { en: '"Where are you going?" → She asked where I was going.', id: '"Ke mana kamu pergi?" → Dia bertanya ke mana saya pergi.' },
          ],
          tips: 'Perubahan pronoun dan time/place expressions juga terjadi: "here" → "there", "now" → "then", "today" → "that day", "tomorrow" → "the next day".',
        },
        {
          heading: 'Reporting Commands & Requests',
          explanation: `Gunakan tell/ask + object + to-infinitive:
• "Close the door." → She told me to close the door.
• "Please help me." → He asked me to help him.
• "Don't be late." → She told me not to be late.`,
          examples: [
            { en: '"Study harder!" → The teacher told us to study harder.', id: '"Belajarlah lebih keras!" → Guru menyuruh kami belajar lebih keras.' },
            { en: '"Don\'t make noise." → He asked us not to make noise.', id: '"Jangan berisik." → Dia meminta kami untuk tidak berisik.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: '"I am hungry." → She said she ___ hungry.', answer: 'was', options: ['is', 'was', 'were', 'has been'] },
        { type: 'mcq', question: '"I will call you." → He said he ___ call me.', answer: 'would', options: ['will', 'would', 'should', 'could'] },
        { type: 'fill', question: '"I have finished." → She said she ___ finished.', answer: 'had' },
        { type: 'mcq', question: '"Do you speak French?" → He asked ___ I spoke French.', answer: 'if', options: ['that', 'if', 'what', 'which'] },
        { type: 'mcq', question: '"Where do you work?" → She asked where I ___.', answer: 'worked', options: ['work', 'worked', 'working', 'am working'] },
        { type: 'fill', question: '"Close the window." → He told me ___ the window.', answer: 'to close' },
        { type: 'mcq', question: '"Don\'t be late." → She told him ___ be late.', answer: 'not to', options: ['don\'t to', 'not to', 'to not', 'not'] },
        { type: 'reorder', question: 'Ubah ke reported speech:', words: ['she', 'She', 'tired', 'was', 'said'], answer: 'She said she was tired.' },
        { type: 'fill', question: '"I can swim." → He said he ___ swim.', answer: 'could' },
        { type: 'mcq', question: '"I was working." (reported) → He said he ___ working.', answer: 'had been', options: ['was', 'is', 'had been', 'has been'] },
      ],
    },

    // ── 6. Relative Clauses ───────────────────────────────────
    {
      id: 'relative-clauses',
      level: 'B1',
      title: 'Relative Clauses',
      icon: '🔗',
      shortDesc: 'Menambahkan informasi tentang noun dengan who, which, that, where.',
      sections: [
        {
          heading: 'Defining Relative Clauses',
          explanation: `Defining Relative Clauses memberikan informasi penting yang mengidentifikasi noun. Tanpa klausa ini, arti kalimat tidak jelas. Tidak menggunakan koma.

• who / that → untuk orang
• which / that → untuk benda
• where → untuk tempat
• whose → untuk kepemilikan`,
          examples: [
            { en: 'The man who lives next door is a doctor.', id: 'Pria yang tinggal di sebelah adalah dokter.' },
            { en: 'The book that I bought yesterday is very interesting.', id: 'Buku yang saya beli kemarin sangat menarik.' },
            { en: 'The town where I grew up has changed a lot.', id: 'Kota tempat saya tumbuh besar telah banyak berubah.' },
          ],
        },
        {
          heading: 'Non-Defining Relative Clauses',
          explanation: `Non-Defining Relative Clauses memberikan informasi tambahan (extra), bukan informasi penting. Selalu diapit koma, dan TIDAK menggunakan "that".

• who → untuk orang
• which → untuk benda`,
          examples: [
            { en: 'My sister, who lives in London, is a nurse.', id: 'Adik saya, yang tinggal di London, adalah perawat.' },
            { en: 'The Eiffel Tower, which was built in 1889, attracts millions of visitors.', id: 'Menara Eiffel, yang dibangun pada 1889, menarik jutaan pengunjung.' },
          ],
          tips: 'Cara mudah membedakan: Defining = informasi WAJIB. Non-defining = boleh dihapus, kalimat tetap masuk akal.',
        },
        {
          heading: 'Omitting the Relative Pronoun',
          explanation: `Relative pronoun bisa dihilangkan jika berperan sebagai objek kalimat (bukan subjek):`,
          examples: [
            { en: 'The film (that) I watched was amazing.', id: 'Film yang saya tonton sangat menakjubkan. ("that" bisa dihilangkan)' },
            { en: 'The man who called you is my uncle.', id: 'Pria yang meneleponmu adalah pamanku. ("who" tidak bisa dihilangkan — ini subjek)' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'The woman ___ works in the bank is very friendly.', answer: 'who', options: ['which', 'who', 'whose', 'where'] },
        { type: 'mcq', question: 'This is the house ___ I grew up.', answer: 'where', options: ['which', 'who', 'where', 'that'] },
        { type: 'fill', question: 'The student ___ exam results were best got a prize.', answer: 'whose' },
        { type: 'mcq', question: 'The book ___ you recommended is brilliant.', answer: 'that', options: ['who', 'where', 'whose', 'that'] },
        { type: 'mcq', question: 'My brother, ___ is a doctor, lives in Singapore.', answer: 'who', options: ['which', 'who', 'that', 'whose'] },
        { type: 'mcq', question: 'Which sentence uses a NON-DEFINING relative clause?', answer: 'My car, which is red, is very fast.', options: ['The man who called is my boss.', 'My car, which is red, is very fast.', 'The book that I read was good.', 'This is the place where we met.'] },
        { type: 'fill', question: 'The film ___ we watched last night was boring.', answer: 'that' },
        { type: 'reorder', question: 'Susun kalimat:', words: ['who', 'woman', 'is', 'The', 'kind', 'my', 'neighbour'], answer: 'The woman who is my neighbour is kind.' },
        { type: 'mcq', question: 'In a non-defining relative clause, you CANNOT use ___', answer: 'that', options: ['who', 'which', 'that', 'whose'] },
        { type: 'fill', question: 'The city ___ she was born is very famous.', answer: 'where' },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // B2 TOPICS
    // ══════════════════════════════════════════════════════════

    // ── 7. Conditional Type 3 & Mixed ───────────────────────
    {
      id: 'conditionals-3-mixed',
      level: 'B2',
      title: 'Conditional Type 3 & Mixed',
      icon: '⏳',
      shortDesc: 'Penyesalan masa lalu dan situasi campuran.',
      sections: [
        {
          heading: 'Type 3 — Kondisi Masa Lalu yang Tidak Terjadi',
          explanation: `If + Past Perfect (had + V3), would have + V3

Digunakan untuk mengekspresikan penyesalan atau situasi hipotetis di masa lalu — sesuatu yang TIDAK terjadi.`,
          examples: [
            { en: "If I had studied harder, I would have passed the exam.", id: 'Andai saya belajar lebih keras, saya pasti lulus ujian.' },
            { en: "If she had left earlier, she wouldn't have missed the train.", id: 'Andai dia pergi lebih awal, dia tidak akan ketinggalan kereta.' },
            { en: 'Would you have helped if I had asked?', id: 'Apakah kamu akan membantu jika saya meminta?' },
          ],
        },
        {
          heading: 'Mixed Conditionals',
          explanation: `Mixed Conditionals menggabungkan dua tipe berbeda untuk mengekspresikan hubungan yang lebih kompleks antara waktu:

Type 3 + Type 2 (Past unreal situation → Present result):
If + Past Perfect, would + V1

Type 2 + Type 3 (Present unreal state → Past result):
If + Simple Past, would have + V3`,
          examples: [
            { en: "If I had taken that job, I would be rich now. (past unreal → present result)", id: 'Andai saya menerima pekerjaan itu, saya pasti kaya sekarang.' },
            { en: "If I were more organised, I wouldn't have missed the deadline. (present unreal → past result)", id: 'Andai saya lebih terorganisir, saya tidak akan melewatkan tenggat waktu.' },
          ],
          tips: 'Kunci: Identifikasi dulu KAPAN kondisi terjadi (past/present) dan KAPAN hasilnya (past/present). Lalu pilih struktur yang tepat.',
        },
      ],
      quiz: [
        { type: 'mcq', question: 'If she ___ earlier, she would have caught the bus.', answer: 'had left', options: ['leaves', 'left', 'had left', 'would leave'] },
        { type: 'fill', question: 'If I had known, I ___ (tell) you.', answer: 'would have told' },
        { type: 'mcq', question: 'He would have come if you ___ invited him.', answer: 'had', options: ['has', 'have', 'had', 'would have'] },
        { type: 'mcq', question: '"If I had studied medicine, I would be a doctor now." This is a ___', answer: 'Mixed conditional', options: ['Type 1', 'Type 2', 'Type 3', 'Mixed conditional'] },
        { type: 'fill', question: 'If I ___ (be) braver, I would have asked for a promotion years ago.', answer: 'were' },
        { type: 'mcq', question: 'If he hadn\'t spent all his money, he ___ afford a car now.', answer: 'would', options: ['will', 'would', 'had', 'has'] },
        { type: 'reorder', question: 'Susun Type 3:', words: ['earlier,', 'left', 'have', 'would', 'they', 'If', 'had', 'they', 'arrived', 'on time'], answer: 'If they had left earlier, they would have arrived on time.' },
        { type: 'fill', question: 'She would have passed if she ___ (study) harder.', answer: 'had studied' },
        { type: 'mcq', question: 'Which expresses regret about the past?', answer: 'If I had saved money, I could have bought it.', options: ['If I save money, I can buy it.', 'If I saved money, I could buy it.', 'If I had saved money, I could have bought it.', 'If I save money, I will buy it.'] },
        { type: 'fill', question: 'If they had practised more, they ___ (win) the match.', answer: 'would have won' },
      ],
    },

    // ── 8. Perfect Tenses (Past Perfect & Future Perfect) ────
    {
      id: 'perfect-tenses',
      level: 'B2',
      title: 'Perfect Tenses (Past & Future)',
      icon: '⌚',
      shortDesc: 'Past Perfect dan Future Perfect untuk urutan waktu.',
      sections: [
        {
          heading: 'Past Perfect (had + V3)',
          explanation: `Past Perfect digunakan untuk aksi yang sudah selesai SEBELUM aksi lain di masa lalu. Ini menunjukkan urutan waktu.

Kata kunci: before, after, already, just, by the time, when`,
          examples: [
            { en: 'By the time I arrived, the party had already ended.', id: 'Saat saya tiba, pesta sudah berakhir.' },
            { en: 'She had never seen snow before she moved to Canada.', id: 'Dia belum pernah melihat salju sebelum pindah ke Kanada.' },
            { en: "When I called, he had already left the office.", id: 'Ketika saya menelepon, dia sudah meninggalkan kantor.' },
          ],
          tips: 'Aturan mudah: Dua aksi di masa lalu → yang lebih dulu = Past Perfect (had + V3), yang belakangan = Simple Past.',
        },
        {
          heading: 'Future Perfect (will have + V3)',
          explanation: `Future Perfect digunakan untuk aksi yang akan sudah selesai SEBELUM waktu atau aksi lain di masa depan.

Kata kunci: by, by the time, by next year/month, before`,
          examples: [
            { en: 'By 2030, scientists will have found a cure.', id: 'Pada 2030, para ilmuwan akan sudah menemukan obatnya.' },
            { en: 'She will have finished her degree by June.', id: 'Dia akan sudah menyelesaikan gelarnya pada bulan Juni.' },
            { en: 'By the time you arrive, I will have cooked dinner.', id: 'Saat kamu tiba, saya akan sudah memasak makan malam.' },
          ],
        },
        {
          heading: 'Past & Future Perfect Continuous',
          explanation: `• Past Perfect Continuous: had been + V-ing → menekankan durasi sebelum titik waktu di masa lalu
• Future Perfect Continuous: will have been + V-ing → durasi hingga titik waktu di masa depan`,
          examples: [
            { en: 'She had been waiting for two hours when he finally arrived.', id: 'Dia sudah menunggu selama dua jam ketika dia akhirnya tiba.' },
            { en: 'By next year, I will have been working here for a decade.', id: 'Pada tahun depan, saya akan sudah bekerja di sini selama satu dekade.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'By the time I arrived, the film ___.', answer: 'had already started', options: ['already started', 'has already started', 'had already started', 'was starting'] },
        { type: 'fill', question: 'She ___ (never / see) the ocean before she visited Bali.', answer: 'had never seen' },
        { type: 'mcq', question: 'By next summer, I ___ for this company for five years.', answer: 'will have worked', options: ['work', 'will work', 'will have worked', 'have worked'] },
        { type: 'mcq', question: 'When I woke up, someone ___ my car.', answer: 'had stolen', options: ['stole', 'has stolen', 'had stolen', 'was stealing'] },
        { type: 'fill', question: 'They ___ (wait) for three hours when the bus finally came.', answer: 'had been waiting' },
        { type: 'mcq', question: 'She ___ the book by the time the exam starts.', answer: "will have read", options: ['reads', 'has read', 'will have read', 'had read'] },
        { type: 'reorder', question: 'Susun kalimat Past Perfect:', words: ['eaten', 'He', 'arrived,', 'already', 'when', 'I', 'had'], answer: 'When I arrived, he had already eaten.' },
        { type: 'fill', question: 'Before the meeting started, everyone ___ (receive) the report.', answer: 'had received' },
        { type: 'mcq', question: 'Which tense: "By 2025, they will have completed the project."?', answer: 'Future Perfect', options: ['Future Simple', 'Future Continuous', 'Future Perfect', 'Present Perfect'] },
        { type: 'fill', question: 'By the time she graduates, she ___ (study) for six years.', answer: 'will have been studying' },
      ],
    },

    // ── 9. Inversion & Emphasis ──────────────────────────────
    {
      id: 'inversion-emphasis',
      level: 'B2',
      title: 'Inversion & Emphasis',
      icon: '🔍',
      shortDesc: 'Cleft sentences, fronting, dan inversion untuk penekanan.',
      sections: [
        {
          heading: 'Fronting & Inversion (Negative Adverbials)',
          explanation: `Ketika negative/limiting adverb (never, seldom, rarely, not only, hardly, no sooner, little) ditempatkan di awal kalimat untuk penekanan, struktur kalimat di-invert (dibalik seperti pertanyaan).`,
          examples: [
            { en: 'Never have I seen such a beautiful sunset.', id: 'Belum pernah saya melihat matahari terbenam seindah itu.' },
            { en: 'Seldom do we get such opportunities.', id: 'Jarang sekali kita mendapatkan kesempatan seperti ini.' },
            { en: 'Not only did she win the award, but she also gave a brilliant speech.', id: 'Tidak hanya dia memenangkan penghargaan, tetapi dia juga berpidato dengan brilian.' },
            { en: 'Hardly had I sat down when the phone rang.', id: 'Baru saja saya duduk, telepon berbunyi.' },
          ],
          tips: 'Pola: Negative adverb + auxiliary verb + subject + main verb (sama seperti struktur pertanyaan).',
        },
        {
          heading: 'Cleft Sentences (It is/was... who/that)',
          explanation: `Cleft sentences digunakan untuk menekankan bagian tertentu dari kalimat:
• It is/was + emphasized element + who/that + rest of sentence`,
          examples: [
            { en: 'It was John who broke the window. (bukan orang lain)', id: 'John-lah yang memecahkan jendela.' },
            { en: "It's the price that puts me off. (bukan hal lain)", id: 'Hargalah yang mengurungkan niat saya.' },
            { en: 'It was in Paris that they first met.', id: 'Di Paris-lah mereka pertama kali bertemu.' },
          ],
        },
        {
          heading: 'What-Clauses (Pseudo-Cleft)',
          explanation: `What + clause + is/was + emphasized element`,
          examples: [
            { en: 'What I need is a long holiday.', id: 'Yang saya butuhkan adalah liburan panjang.' },
            { en: "What surprised me was her reaction.", id: 'Yang mengejutkan saya adalah reaksinya.' },
          ],
          tips: '"Do/does/did" dapat digunakan untuk penekanan pada kata kerja: I DO love you. She DID warn us.',
        },
      ],
      quiz: [
        { type: 'mcq', question: '"Never ___ such a talented musician."', answer: 'have I heard', options: ['I have heard', 'have I heard', 'I heard', 'did I hear'] },
        { type: 'mcq', question: '"Not only ___ late, but he also forgot the report."', answer: 'did he arrive', options: ['he arrived', 'did he arrive', 'he did arrive', 'had he arrived'] },
        { type: 'fill', question: 'Hardly ___ (she / arrive) when the meeting started.', answer: 'had she arrived' },
        { type: 'mcq', question: '"It was ___ who solved the problem." (John)', answer: 'John', options: ['John', 'John that', 'Johns', 'by John'] },
        { type: 'mcq', question: '"What I need ___ is more time."', answer: 'is', options: ['are', 'is', 'was', 'have'] },
        { type: 'reorder', question: 'Susun inversion:', words: ['I', 'Never', 'such', 'kindness.', 'seen', 'have'], answer: 'Never have I seen such kindness.' },
        { type: 'fill', question: 'Seldom ___ (they / speak) to each other these days.', answer: 'do they speak' },
        { type: 'mcq', question: '"___ that she realised her mistake." (Only then)', answer: 'Only then did', options: ['Only then she', 'Only then did', 'Only then has', 'Did only then'] },
        { type: 'mcq', question: '"What ___ me was the price." (surprises)', answer: 'surprised', options: ['surprises', 'surprised', 'surprising', 'has surprised'] },
        { type: 'fill', question: 'No sooner ___ (he / leave) than it started raining.', answer: 'had he left' },
      ],
    },

    // ── 10. Wish, If Only & Other Subjunctives ────────────────
    {
      id: 'wish-subjunctive',
      level: 'B2',
      title: 'Wish, If Only & Subjunctive',
      icon: '🌟',
      shortDesc: 'Mengekspresikan keinginan, harapan, dan keadaan hipotetis.',
      sections: [
        {
          heading: 'Wish + Past Simple (Keinginan tentang Sekarang)',
          explanation: `Wish + Simple Past → menyatakan keinginan bahwa sesuatu yang TIDAK nyata bisa menjadi kenyataan sekarang atau di masa depan.`,
          examples: [
            { en: "I wish I spoke French. (but I don't)", id: 'Saya berharap bisa berbicara bahasa Perancis. (tapi tidak bisa)' },
            { en: 'She wishes she had a bigger flat.', id: 'Dia berharap punya apartemen yang lebih besar.' },
            { en: 'I wish it weren\'t so hot!', id: 'Saya berharap tidak sepanas ini!' },
          ],
          tips: 'Gunakan "were" untuk semua subjek setelah wish (bukan "was") dalam bahasa formal: I wish I were taller.',
        },
        {
          heading: 'Wish + Past Perfect (Penyesalan tentang Masa Lalu)',
          explanation: `Wish + Past Perfect → menyatakan penyesalan tentang sesuatu yang SUDAH terjadi (dan tidak bisa diubah).`,
          examples: [
            { en: "I wish I hadn't said that. (but I did)", id: 'Saya berharap tidak mengatakannya. (tapi sudah terlanjur)' },
            { en: 'She wishes she had studied harder.', id: 'Dia berharap telah belajar lebih keras.' },
          ],
        },
        {
          heading: 'Wish + Would (Keinginan tentang Perilaku Orang Lain)',
          explanation: `Wish + would → mengekspresikan keinginan agar seseorang atau sesuatu BERUBAH (sering mengandung frustasi).`,
          examples: [
            { en: "I wish you would listen to me.", id: 'Saya berharap kamu mau mendengarkan saya.' },
            { en: "I wish it would stop raining.", id: 'Saya berharap hujannya berhenti.' },
          ],
          tips: '"If only" lebih kuat/dramatis dari "wish": If only I had more time!',
        },
      ],
      quiz: [
        { type: 'mcq', question: '"I wish I ___ taller." (I\'m not tall)', answer: 'were', options: ['am', 'was', 'were', 'be'] },
        { type: 'fill', question: 'She wishes she ___ (not eat) so much at the party.', answer: "hadn't eaten" },
        { type: 'mcq', question: '"I wish you ___ make so much noise!" (annoyed)', answer: 'wouldn\'t', options: ["won't", "don't", "wouldn't", "hadn't"] },
        { type: 'mcq', question: '"I wish I ___ the winning ticket!" (I didn\'t have it)', answer: 'had had', options: ['have', 'had', 'had had', 'would have'] },
        { type: 'fill', question: 'I wish I ___ (can) speak Japanese.', answer: 'could' },
        { type: 'mcq', question: 'Which expresses regret about the past?', answer: "I wish I hadn't quit my job.", options: ['I wish I had more money.', "I wish you wouldn't do that.", "I wish I hadn't quit my job.", 'I wish it were summer.'] },
        { type: 'reorder', question: 'Susun kalimat wish:', words: ['spoken', 'I', 'had', 'so', 'I', 'wish', "hadn't", 'rudely'], answer: "I wish I hadn't spoken so rudely." },
        { type: 'fill', question: 'If only she ___ (listen) to my advice at the time.', answer: 'had listened' },
        { type: 'mcq', question: '"Wish + would" is used to express ___', answer: 'A desire for a change in behaviour', options: ['A past regret', 'A present wish about yourself', 'A desire for a change in behaviour', 'A future prediction'] },
        { type: 'fill', question: 'He wishes he ___ (live) closer to his family.', answer: 'lived' },
      ],
    },

    // ── 11. Noun Clauses & Gerunds vs Infinitives ────────────
    {
      id: 'noun-clauses-gerunds',
      level: 'B2',
      title: 'Gerunds vs Infinitives',
      icon: '📐',
      shortDesc: 'Memilih antara gerund (-ing) dan infinitive (to + V).',
      sections: [
        {
          heading: 'Gerund (V-ing) vs Infinitive (to + V)',
          explanation: `Beberapa kata kerja hanya diikuti gerund, beberapa hanya infinitive, dan beberapa bisa keduanya (dengan makna berbeda).

Kata kerja + Gerund: enjoy, avoid, consider, suggest, deny, mind, miss, practise, finish, imagine, keep, postpone, risk
Kata kerja + Infinitive: want, hope, decide, agree, promise, offer, refuse, manage, plan, arrange, seem, tend`,
          examples: [
            { en: 'I enjoy swimming in the sea.', id: 'Saya suka berenang di laut.' },
            { en: 'She decided to leave early.', id: 'Dia memutuskan untuk pergi lebih awal.' },
            { en: 'He avoided making eye contact.', id: 'Dia menghindari kontak mata.' },
            { en: 'They agreed to help us.', id: 'Mereka setuju untuk membantu kami.' },
          ],
        },
        {
          heading: 'Perbedaan Makna: Remember, Forget, Stop, Try',
          explanation: `• remember + gerund → mengingat aksi yang sudah terjadi
• remember + infinitive → mengingat untuk melakukan sesuatu (di masa depan)
• stop + gerund → berhenti melakukan sesuatu
• stop + infinitive → berhenti untuk melakukan sesuatu lain
• try + gerund → mencoba sesuatu sebagai eksperimen
• try + infinitive → berusaha keras melakukan sesuatu`,
          examples: [
            { en: 'I remember meeting her. (= I recall the meeting)', id: 'Saya ingat bertemu dengannya.' },
            { en: 'Remember to call me. (= Don\'t forget to call)', id: 'Ingat untuk menelepon saya.' },
            { en: 'He stopped smoking. (= gave it up)', id: 'Dia berhenti merokok.' },
            { en: 'He stopped to smoke. (= paused in order to smoke)', id: 'Dia berhenti (berjalan) untuk merokok.' },
          ],
          tips: '"Like, love, hate + gerund" = general attitude. "Would like/love/hate + infinitive" = specific occasion.',
        },
        {
          heading: 'Preposition + Gerund',
          explanation: `Setelah preposition, SELALU gunakan gerund (bukan infinitive):`,
          examples: [
            { en: 'She is good at singing.', id: 'Dia pandai menyanyi.' },
            { en: 'I\'m interested in learning photography.', id: 'Saya tertarik mempelajari fotografi.' },
            { en: 'He thanked us for helping him.', id: 'Dia berterima kasih kepada kami karena telah membantu.' },
            { en: 'She left without saying goodbye.', id: 'Dia pergi tanpa pamit.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'I enjoy ___ to music in the morning.', answer: 'listening', options: ['listen', 'to listen', 'listening', 'listened'] },
        { type: 'mcq', question: 'She decided ___ a new career.', answer: 'to start', options: ['starting', 'to start', 'start', 'started'] },
        { type: 'fill', question: 'I remember ___ (meet) her at the conference last year.', answer: 'meeting' },
        { type: 'mcq', question: '"He stopped ___ his phone and went to sleep."', answer: 'using', options: ['use', 'to use', 'using', 'used'] },
        { type: 'mcq', question: '"She stopped ___ buy a newspaper." (paused in order to buy)', answer: 'to buy', options: ['buying', 'to buy', 'buy', 'bought'] },
        { type: 'fill', question: 'He is very good at ___ (solve) problems.', answer: 'solving' },
        { type: 'mcq', question: 'They suggested ___ the meeting until next week.', answer: 'postponing', options: ['postpone', 'to postpone', 'postponing', 'postponed'] },
        { type: 'mcq', question: '"Without ___ a word, she walked out."', answer: 'saying', options: ['say', 'to say', 'said', 'saying'] },
        { type: 'reorder', question: 'Susun kalimat:', words: ['to', 'She', 'managed', 'the', 'finish', 'project', 'on', 'time'], answer: 'She managed to finish the project on time.' },
        { type: 'fill', question: 'He tried ___ (open) the jar but it was too tight.', answer: 'to open' },
      ],
    },

    // ── 12. Discourse Markers & Cohesion ─────────────────────
    {
      id: 'discourse-markers',
      level: 'B2',
      title: 'Discourse Markers & Cohesion',
      icon: '🧩',
      shortDesc: 'Menghubungkan ide dan menciptakan tulisan yang kohesif.',
      sections: [
        {
          heading: 'Adding & Contrasting',
          explanation: `Penambahan: furthermore, moreover, in addition, besides, what is more, not only ... but also
Kontras: however, nevertheless, nonetheless, on the other hand, in contrast, despite, although, even though, whereas, while`,
          examples: [
            { en: 'The job is well-paid; furthermore, it offers excellent benefits.', id: 'Pekerjaan itu bergaji tinggi; terlebih lagi, menawarkan tunjangan yang sangat baik.' },
            { en: 'Despite working hard, she failed the exam.', id: 'Meskipun bekerja keras, dia gagal ujian.' },
            { en: 'He is very talented; however, he lacks experience.', id: 'Dia sangat berbakat; namun, dia kurang pengalaman.' },
          ],
          tips: '"Although/even though" + clause. "Despite/in spite of" + noun/gerund. Jangan campurkan keduanya!',
        },
        {
          heading: 'Cause, Effect & Purpose',
          explanation: `Sebab: because, since, as, due to, owing to, as a result of
Akibat: therefore, as a result, consequently, hence, thus, so
Tujuan: so that, in order to, so as to, for the purpose of`,
          examples: [
            { en: 'Traffic was heavy; consequently, we arrived late.', id: 'Lalu lintas padat; akibatnya, kami tiba terlambat.' },
            { en: 'He studied hard so that he could pass the exam.', id: 'Dia belajar keras agar bisa lulus ujian.' },
            { en: 'Due to heavy rain, the match was cancelled.', id: 'Karena hujan deras, pertandingan dibatalkan.' },
          ],
        },
        {
          heading: 'Summarising & Structuring',
          explanation: `Awal: firstly/first of all, to begin with, initially
Urutan: secondly, then, subsequently, after that, following this
Akhir/kesimpulan: finally, lastly, in conclusion, to sum up, in summary, all in all, overall`,
          examples: [
            { en: 'To begin with, I would like to outline the key issues.', id: 'Pertama-tama, saya ingin menguraikan isu-isu utama.' },
            { en: 'In conclusion, renewable energy is the way forward.', id: 'Kesimpulannya, energi terbarukan adalah jalan ke depan.' },
          ],
          tips: '"However" bisa ditempatkan di awal, tengah, atau akhir kalimat. "Nevertheless" dan "nonetheless" biasanya di awal kalimat.',
        },
      ],
      quiz: [
        { type: 'mcq', question: '"The hotel was expensive. ___, the service was terrible."', answer: 'Moreover', options: ['However', 'Therefore', 'Moreover', 'Despite'] },
        { type: 'mcq', question: '"___ working hard, she didn\'t get the promotion."', answer: 'Despite', options: ['Although', 'Despite', 'However', 'Even though'] },
        { type: 'fill', question: 'Traffic was bad; ___, we missed the flight.', answer: 'consequently' },
        { type: 'mcq', question: '"He was ill. ___, he came to work."', answer: 'Nevertheless', options: ['Furthermore', 'Therefore', 'Nevertheless', 'Similarly'] },
        { type: 'mcq', question: '"___ to poor planning, the project failed."', answer: 'Due', options: ['Due', 'As a result', 'Consequently', 'Therefore'] },
        { type: 'fill', question: 'She left early ___ that she could catch the last train.', answer: 'so' },
        { type: 'mcq', question: '"___ the contract, please read it carefully."', answer: 'Before signing', options: ['Before to sign', 'Before signing', 'Despite signing', 'In spite of sign'] },
        { type: 'reorder', question: 'Susun kalimat:', words: ['noisy,', 'the', 'was', 'hotel', 'Nevertheless,', 'we', 'stayed.', 'The'], answer: 'The hotel was noisy. Nevertheless, we stayed.' },
        { type: 'mcq', question: '"In conclusion" is used to ___', answer: 'Summarise and close a piece of writing', options: ['Add a new point', 'Contrast two ideas', 'Summarise and close a piece of writing', 'Give a reason'] },
        { type: 'fill', question: 'She studies hard; ___, her grades keep improving.', answer: 'therefore' },
      ],
    },

  ]; // end TOPICS array

  // ── Public API ────────────────────────────────────────────
  function getTopics() {
    return TOPICS;
  }

  function getTopic(id) {
    return TOPICS.find(t => t.id === id) || null;
  }

  function getQuiz(topicId, n) {
    const topic = getTopic(topicId);
    if (!topic) return [];
    const all = [...topic.quiz];
    // Shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all.slice(0, n || all.length);
  }

  return { getTopics, getTopic, getQuiz };

})();
