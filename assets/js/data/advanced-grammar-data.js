/**
 * EnglishPath — Advanced Grammar Data C1–C2
 * Fase 17b — v2.4.2
 *
 * 12 topik grammar C1–C2 dengan penjelasan mendalam + contoh + latihan
 * Tipe soal: mcq, fill, transform
 * Topik selesai jika skor terbaik ≥ 70%
 */

const ADVANCED_GRAMMAR_DATA = (function () {
  'use strict';

  const TOPICS = [

    // ══════════════════════════════════════════════════════════
    // TOPIK 1 — INVERSION
    // ══════════════════════════════════════════════════════════
    {
      id: 'inversion',
      level: 'C1',
      title: 'Inversion',
      icon: '🔄',
      shortDesc: 'Pembalikan urutan subjek-verba untuk penekanan formal.',
      sections: [
        {
          heading: 'Apa itu Inversion?',
          explanation: `Inversion adalah pembalikan urutan normal subjek + verba. Dalam bahasa Inggris formal dan sastra, inversion digunakan untuk memberikan penekanan atau mengikuti ungkapan negatif/pembatas tertentu.

**Struktur Dasar:**
Normal: Subject + Verb
Inversion: Auxiliary/Modal + Subject + Main Verb`,
          examples: [
            { en: 'Never have I seen such dedication.', id: 'Belum pernah saya melihat dedikasi seperti itu.' },
            { en: 'Rarely does she make mistakes.', id: 'Jarang sekali dia membuat kesalahan.' },
          ],
        },
        {
          heading: 'Inversion Setelah Ekspresi Negatif',
          explanation: `Kata/frasa negatif berikut memicu inversion:
• Never, Rarely, Seldom, Hardly, Scarcely, Barely
• Not only ... but also
• No sooner ... than
• Under no circumstances
• In no way
• On no account
• Little (bermakna negatif: "sedikit/hampir tidak")`,
          examples: [
            { en: 'Not only did he apologise, but he also sent flowers.', id: 'Tidak hanya dia meminta maaf, tetapi dia juga mengirim bunga.' },
            { en: 'Under no circumstances should you sign the document.', id: 'Dalam keadaan apapun kamu tidak boleh menandatangani dokumen itu.' },
            { en: 'No sooner had she arrived than the phone rang.', id: 'Baru saja dia tiba, telepon berdering.' },
            { en: 'Little did he know that his plan would fail.', id: 'Dia hampir tidak tahu bahwa rencananya akan gagal.' },
          ],
          tips: 'Setelah "No sooner", gunakan "than" (bukan "when"). Setelah "Hardly/Scarcely/Barely", gunakan "when" atau "before".',
        },
        {
          heading: 'Inversion dalam Conditional',
          explanation: `Inversion dapat menggantikan "if" dalam kondisional formal (terutama Type 2 dan 3):

• If I were → Were I
• If I had → Had I
• If it should → Should it`,
          examples: [
            { en: 'Were I in your position, I would resign.', id: 'Jika saya berada di posisimu, saya akan mengundurkan diri.' },
            { en: 'Had she known the truth, she would have acted differently.', id: 'Seandainya dia mengetahui kebenarannya, dia akan bertindak berbeda.' },
            { en: 'Should you need assistance, please call us.', id: 'Jika kamu membutuhkan bantuan, silakan hubungi kami.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: '_____ have I encountered such a talented musician.', answer: 'Never', options: ['Ever', 'Never', 'Always', 'Often'] },
        { type: 'mcq', question: 'Not only _____ the deadline, but he also exceeded expectations.', answer: 'did he meet', options: ['he met', 'did he meet', 'he has met', 'has he met'] },
        { type: 'transform', question: 'Ubah ke bentuk inversion:\n"If I had more time, I would study abroad."', answer: 'Had I more time, I would study abroad.' },
        { type: 'mcq', question: 'Rarely _____ the opportunity to work with such experts.', answer: 'do we get', options: ['we get', 'do we get', 'we are getting', 'did we getting'] },
        { type: 'fill', question: 'No sooner _____ (she / arrive) than the ceremony began.', answer: 'had she arrived' },
        { type: 'mcq', question: 'Under no circumstances _____ early.', answer: 'should you leave', options: ['you should leave', 'should you leave', 'you leave', 'leave you'] },
        { type: 'transform', question: 'Ubah ke bentuk inversion:\n"If it should rain, the event will be postponed."', answer: 'Should it rain, the event will be postponed.' },
        { type: 'mcq', question: 'Little _____ that his discovery would change history.', answer: 'did he realise', options: ['he realised', 'he does realise', 'did he realise', 'has he realised'] },
        { type: 'fill', question: 'Hardly _____ (we / begin) the meeting when the fire alarm went off.', answer: 'had we begun' },
        { type: 'mcq', question: 'On no account _____ the emergency exit during normal operation.', answer: 'should passengers use', options: ['passengers should use', 'should passengers use', 'passengers use', 'do passengers use'] },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // TOPIK 2 — CLEFT SENTENCES
    // ══════════════════════════════════════════════════════════
    {
      id: 'cleft-sentences',
      level: 'C1',
      title: 'Cleft Sentences',
      icon: '✂️',
      shortDesc: 'Memecah kalimat untuk memberikan fokus pada satu elemen.',
      sections: [
        {
          heading: 'It-Cleft',
          explanation: `It-cleft digunakan untuk menekankan subjek, objek, keterangan waktu, atau keterangan tempat.

**Struktur:** It + be + [elemen yang ditekankan] + that/who + sisa kalimat`,
          examples: [
            { en: 'It was John who broke the window.', id: 'Adalah John yang memecahkan jendela itu. (bukan orang lain)' },
            { en: 'It was in 1969 that humans first landed on the moon.', id: 'Pada tahun 1969-lah manusia pertama kali mendarat di bulan.' },
            { en: 'It is the quality of the data that matters most.', id: 'Kualitas data-lah yang paling penting.' },
          ],
        },
        {
          heading: 'Wh-Cleft (Pseudo-Cleft)',
          explanation: `Wh-cleft menggunakan "what" clause sebagai subjek untuk menekankan predikat.

**Struktur:** What + subject + verb + is/was + [elemen yang ditekankan]`,
          examples: [
            { en: 'What I need is a good night\'s sleep.', id: 'Yang saya butuhkan adalah tidur malam yang nyenyak.' },
            { en: 'What surprised me was his calmness.', id: 'Yang mengejutkan saya adalah ketenangannya.' },
            { en: 'What the company requires is more investment in R&D.', id: 'Yang dibutuhkan perusahaan adalah investasi lebih banyak di R&D.' },
          ],
          tips: 'Reversed wh-cleft: "A good night\'s sleep is what I need." — digunakan untuk penekanan yang lebih kuat.',
        },
        {
          heading: 'All-Cleft',
          explanation: `All-cleft menggunakan "all" untuk menyatakan bahwa hanya satu hal yang dilakukan atau dibutuhkan.

**Struktur:** All + subject + verb + is/was + [infinitive/noun phrase]`,
          examples: [
            { en: 'All you need to do is sign the form.', id: 'Yang perlu kamu lakukan hanyalah menandatangani formulir itu.' },
            { en: 'All that mattered was the safety of the passengers.', id: 'Yang terpenting hanyalah keselamatan penumpang.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'It was the lack of funding _____ caused the project to fail.', answer: 'that', options: ['who', 'which', 'that', 'what'] },
        { type: 'transform', question: 'Ubah ke it-cleft untuk menekankan "the high cost":\n"The high cost prevented many people from attending."', answer: 'It was the high cost that prevented many people from attending.' },
        { type: 'mcq', question: '_____ I find most challenging is maintaining consistency.', answer: 'What', options: ['That', 'It', 'What', 'Which'] },
        { type: 'fill', question: 'It was in this building _____ the negotiations took place.', answer: 'that' },
        { type: 'mcq', question: 'What the students needed was _____ clear explanation.', answer: 'a', options: ['the', 'a', 'an', '—'] },
        { type: 'transform', question: 'Ubah ke wh-cleft:\n"I enjoy problem-solving the most."', answer: 'What I enjoy most is problem-solving.' },
        { type: 'mcq', question: 'All you have to _____ is fill in this form.', answer: 'do', options: ['make', 'do', 'take', 'give'] },
        { type: 'mcq', question: 'It _____ the director who approved the budget.', answer: 'was', options: ['is', 'was', 'were', 'has been'] },
        { type: 'fill', question: 'What _____ (impress) the judges was her originality.', answer: 'impressed' },
        { type: 'mcq', question: 'It is the employees\' dedication _____ sets this company apart.', answer: 'that', options: ['what', 'which', 'that', 'who'] },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // TOPIK 3 — NOMINAL CLAUSES
    // ══════════════════════════════════════════════════════════
    {
      id: 'nominal-clauses',
      level: 'C1',
      title: 'Nominal Clauses',
      icon: '📦',
      shortDesc: 'Anak kalimat yang berfungsi sebagai nomina (subjek, objek, komplemen).',
      sections: [
        {
          heading: 'That-Clauses',
          explanation: `That-clauses berfungsi sebagai:
1. **Subjek:** That she lied was shocking.
2. **Objek:** I believe that honesty is the best policy.
3. **Komplemen predikat:** The truth is that we failed.
4. **Appositive:** The idea that knowledge is power is ancient.

Dalam bahasa formal, "that" tidak boleh dihilangkan saat digunakan sebagai subjek.`,
          examples: [
            { en: 'It is clear that further research is needed.', id: 'Jelas bahwa penelitian lebih lanjut diperlukan.' },
            { en: 'The fact that she succeeded surprised everyone.', id: 'Fakta bahwa dia berhasil mengejutkan semua orang.' },
          ],
        },
        {
          heading: 'Wh-Clauses (Indirect Questions)',
          explanation: `Wh-clauses (what, where, when, why, how, who, which, whether/if) sebagai nomina mengikuti urutan kalimat pernyataan (bukan pertanyaan):

**Langsung:** Where does she live?
**Tidak langsung (nominal):** I wonder where she lives.`,
          examples: [
            { en: 'Nobody knows why he resigned.', id: 'Tidak ada yang tahu mengapa dia mengundurkan diri.' },
            { en: 'Whether the plan succeeds depends on cooperation.', id: 'Apakah rencana itu berhasil bergantung pada kerja sama.' },
            { en: 'How the data was collected remains unclear.', id: 'Bagaimana data dikumpulkan masih belum jelas.' },
          ],
          tips: 'Gunakan "whether" (bukan "if") saat klausa nominal berfungsi sebagai subjek atau setelah preposisi.',
        },
        {
          heading: 'Gerund & Infinitive sebagai Nominal',
          explanation: `Gerund (-ing) dan to-infinitive juga berfungsi sebagai nomina:
• Gerund sebagai subjek: **Travelling abroad** broadens the mind.
• Infinitive sebagai subjek: **To understand** the problem is the first step.
• Formal preference: Gunakan gerund sebagai subjek untuk general truths.`,
          examples: [
            { en: 'Understanding complex systems requires patience.', id: 'Memahami sistem yang kompleks memerlukan kesabaran.' },
            { en: 'It is important to acknowledge different perspectives.', id: 'Penting untuk mengakui perspektif yang berbeda.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: '_____ the economy will recover depends on several factors.', answer: 'Whether', options: ['If', 'Whether', 'That', 'What'] },
        { type: 'fill', question: 'The report confirmed _____ the data had been manipulated.', answer: 'that' },
        { type: 'mcq', question: 'Nobody could explain _____ the error had occurred.', answer: 'how', options: ['what', 'that', 'how', 'which'] },
        { type: 'transform', question: 'Ubah ke indirect question (nominal clause):\n"What time does the meeting start?"', answer: 'I need to know what time the meeting starts.' },
        { type: 'mcq', question: 'It is essential _____ all employees complete the training.', answer: 'that', options: ['which', 'what', 'if', 'that'] },
        { type: 'mcq', question: 'The fact _____ she had no experience didn\'t discourage her.', answer: 'that', options: ['what', 'which', 'that', 'why'] },
        { type: 'fill', question: 'Whether we succeed or fail _____ (depend) on our preparation.', answer: 'depends' },
        { type: 'mcq', question: '_____ he said at the conference surprised the audience.', answer: 'What', options: ['That', 'Which', 'What', 'When'] },
        { type: 'mcq', question: 'The assumption _____ growth would continue proved wrong.', answer: 'that', options: ['which', 'that', 'what', 'how'] },
        { type: 'transform', question: 'Gunakan nominal clause sebagai subjek:\n"It is obvious. The situation has improved."', answer: 'That the situation has improved is obvious.' },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // TOPIK 4 — COMPLEX CONDITIONALS
    // ══════════════════════════════════════════════════════════
    {
      id: 'complex-conditionals',
      level: 'C1',
      title: 'Complex Conditionals',
      icon: '🔀',
      shortDesc: 'Mixed, inverted, dan conditional dengan unless/provided/as long as.',
      sections: [
        {
          heading: 'Mixed Conditionals',
          explanation: `Mixed conditional menggabungkan dua kondisi dari waktu yang berbeda:

**Type 2 present + Type 3 past:**
If + Past Perfect, would + V1 (present)
→ Akibat sekarang dari kondisi masa lalu yang tidak terjadi

**Type 3 past + Type 2 present:**
If + Past Simple, would have + V3 (past)
→ Akibat masa lalu dari kondisi sekarang yang tidak terjadi`,
          examples: [
            { en: 'If she had studied harder, she would be a doctor now.', id: 'Jika dia belajar lebih keras dulu, dia akan menjadi dokter sekarang.' },
            { en: 'If I were more confident, I would have applied for that job.', id: 'Jika saya lebih percaya diri, saya sudah melamar pekerjaan itu.' },
          ],
        },
        {
          heading: 'Inverted Conditionals',
          explanation: `Menggantikan "if" dengan inversi auxiliary untuk gaya formal (lihat juga topik Inversion):
• If I were → **Were I**
• If I had → **Had I**
• If it should → **Should it**`,
          examples: [
            { en: 'Were the situation different, we would reconsider.', id: 'Jika situasinya berbeda, kami akan mempertimbangkan ulang.' },
            { en: 'Had the proposal been accepted, the project would have started.', id: 'Seandainya proposal diterima, proyek sudah dimulai.' },
          ],
          tips: 'Inverted conditionals bersifat lebih formal. Tidak digunakan dalam percakapan sehari-hari.',
        },
        {
          heading: 'Alternatif Pengganti "If"',
          explanation: `Selain "if", kata/frasa berikut juga memperkenalkan kondisi:
• **Unless** = if not → "Unless it rains, we'll go."
• **Provided/Providing (that)** = hanya jika → formal
• **As long as** = selama, dengan syarat
• **On condition (that)** = dengan syarat
• **Suppose/Supposing (that)** = misalkan, bagaimana jika
• **In case** = antisipasi kemungkinan`,
          examples: [
            { en: 'Provided that all parties agree, the deal will be signed.', id: 'Asalkan semua pihak setuju, perjanjian akan ditandatangani.' },
            { en: 'Supposing the server crashes, do we have a backup?', id: 'Misalkan server crash, apakah kita punya cadangan?' },
            { en: 'Bring an umbrella in case it rains.', id: 'Bawa payung untuk jaga-jaga kalau hujan.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'If she had taken the job offer, she _____ in New York now.', answer: 'would be', options: ['would be', 'would have been', 'will be', 'had been'] },
        { type: 'mcq', question: 'If I _____ more organised, I would have finished the project on time.', answer: 'were', options: ['am', 'were', 'had been', 'would be'] },
        { type: 'transform', question: 'Ubah ke inverted conditional:\n"If the terms had been clearer, we would have agreed."', answer: 'Had the terms been clearer, we would have agreed.' },
        { type: 'mcq', question: '_____ that you follow the guidelines, the experiment should succeed.', answer: 'Provided', options: ['Unless', 'Provided', 'In case', 'Suppose'] },
        { type: 'fill', question: 'Supposing you _____ (be) the manager, what would you change?', answer: 'were' },
        { type: 'mcq', question: 'He wouldn\'t have failed _____ he had studied more consistently.', answer: 'if', options: ['unless', 'provided', 'if', 'supposing'] },
        { type: 'mcq', question: 'Save your work regularly _____ the computer crashes.', answer: 'in case', options: ['unless', 'provided', 'in case', 'as long as'] },
        { type: 'transform', question: 'Ubah ke mixed conditional:\n"She didn\'t invest early. She is not wealthy now."', answer: 'If she had invested early, she would be wealthy now.' },
        { type: 'fill', question: 'Were the evidence _____ (be) stronger, the court would convict him.', answer: 'stronger' },
        { type: 'mcq', question: 'I\'ll support the plan _____ you guarantee the budget.', answer: 'as long as', options: ['unless', 'in case', 'as long as', 'suppose'] },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // TOPIK 5 — SUBJUNCTIVE MOOD
    // ══════════════════════════════════════════════════════════
    {
      id: 'subjunctive',
      level: 'C1',
      title: 'Subjunctive Mood',
      icon: '🌀',
      shortDesc: 'Menyatakan saran, harapan, keinginan, atau kondisi hipotetis formal.',
      sections: [
        {
          heading: 'Mandative Subjunctive',
          explanation: `Digunakan setelah kata kerja/ekspresi yang menyatakan: perintah, saran, permintaan, keinginan, dan kebutuhan (ORSAICDE: order, recommend, suggest, ask, insist, command, demand, urge, require).

**Struktur:** [kata kerja utama] + that + subject + **base form** (tanpa to, tanpa -s, tanpa tense)`,
          examples: [
            { en: 'The doctor recommended that she take the medication twice daily.', id: 'Dokter merekomendasikan agar dia minum obat dua kali sehari.' },
            { en: 'The committee demands that the report be submitted by Friday.', id: 'Panitia menuntut agar laporan diserahkan pada hari Jumat.' },
            { en: 'I suggest that he review his contract before signing.', id: 'Saya menyarankan agar dia meninjau kontraknya sebelum menandatangani.' },
          ],
          tips: 'Perhatikan: "...that she take" (bukan "takes"), "...that he review" (bukan "reviews"). Ini berbeda dari bahasa Inggris British yang cenderung menggunakan "should" + infinitive.',
        },
        {
          heading: 'Formulaic Subjunctive',
          explanation: `Beberapa ungkapan tetap (formulaic) menggunakan subjunctive:
• **If I were you** (bukan "was")
• **As it were** (sepertinya; seolah-olah)
• **Be that as it may** (bagaimanapun juga)
• **Come what may** (apapun yang terjadi)
• **Suffice it to say** (cukuplah dikatakan)
• **So be it** (biarlah begitu)
• **God save the King** / **Long live the republic**`,
          examples: [
            { en: 'If I were in charge, I would restructure the team.', id: 'Jika saya yang bertanggung jawab, saya akan merestrukturisasi tim.' },
            { en: 'Be that as it may, we must proceed with caution.', id: 'Bagaimanapun juga, kita harus melanjutkan dengan hati-hati.' },
          ],
        },
        {
          heading: 'Past Subjunctive',
          explanation: `Digunakan setelah "wish", "if only", "as if/as though", "would rather", "it\'s time" untuk menyatakan kondisi hipotetis:
• **Wish/If only + past simple** → hipotetis di masa kini
• **Wish/If only + past perfect** → penyesalan di masa lalu
• **As if/as though + past simple** → perilaku seolah-olah`,
          examples: [
            { en: 'I wish I knew the answer.', id: 'Saya berharap tahu jawabannya. (tapi tidak tahu sekarang)' },
            { en: 'If only she had listened to us!', id: 'Seandainya dia mendengarkan kami! (tapi tidak mendengarkan)' },
            { en: 'He acts as if he owned the place.', id: 'Dia bertingkah seolah-olah dia memiliki tempat itu.' },
            { en: 'It\'s time we addressed this issue seriously.', id: 'Sudah waktunya kita menangani masalah ini dengan serius.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'The board insisted that the CEO _____ immediately.', answer: 'resign', options: ['resigns', 'resigned', 'resign', 'should resigned'] },
        { type: 'fill', question: 'It is essential that every employee _____ (attend) the safety training.', answer: 'attend' },
        { type: 'mcq', question: 'I wish I _____ more time to prepare for the presentation.', answer: 'had', options: ['have', 'had', 'have had', 'would have'] },
        { type: 'mcq', question: 'He speaks as if he _____ an expert, but he\'s actually a novice.', answer: 'were', options: ['is', 'was', 'were', 'would be'] },
        { type: 'transform', question: 'Ubah ke mandative subjunctive:\n"The judge said: \'The evidence must be reviewed.\'"', answer: 'The judge ordered that the evidence be reviewed.' },
        { type: 'mcq', question: 'If only she _____ the contract more carefully before signing!', answer: 'had read', options: ['read', 'reads', 'had read', 'would read'] },
        { type: 'mcq', question: 'The professor recommended that students _____ primary sources.', answer: 'consult', options: ['consults', 'consulted', 'consult', 'should consults'] },
        { type: 'fill', question: 'It\'s high time the government _____ (take) action on climate change.', answer: 'took' },
        { type: 'mcq', question: '_____ that as it may, the decision has already been made.', answer: 'Be', options: ['Being', 'Be', 'Been', 'Is'] },
        { type: 'mcq', question: 'I would rather she _____ until she had more information.', answer: 'waited', options: ['wait', 'waits', 'waited', 'has waited'] },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // TOPIK 6 — ADVANCED PASSIVE CONSTRUCTIONS
    // ══════════════════════════════════════════════════════════
    {
      id: 'advanced-passive',
      level: 'C1',
      title: 'Advanced Passive Constructions',
      icon: '🔁',
      shortDesc: 'Pasif dengan verb kompleks, say/believe/report, dan pasif stative.',
      sections: [
        {
          heading: 'Pasif dengan Reporting Verbs',
          explanation: `Digunakan saat sumber informasi tidak penting atau tidak diketahui:

**Struktur 1:** It + be + past participle + that-clause
→ *It is believed that the suspect fled the country.*

**Struktur 2:** Subject + be + past participle + to-infinitive
→ *The suspect is believed to have fled the country.*

Kata kerja umum: say, believe, report, claim, consider, know, expect, allege, think, understand`,
          examples: [
            { en: 'It is reported that over 10,000 people attended the rally.', id: 'Dilaporkan bahwa lebih dari 10.000 orang menghadiri rapat umum.' },
            { en: 'The ruins are thought to be over 2,000 years old.', id: 'Reruntuhan itu diyakini berusia lebih dari 2.000 tahun.' },
            { en: 'She is said to have resigned due to health reasons.', id: 'Dia dikabarkan mengundurkan diri karena alasan kesehatan.' },
          ],
        },
        {
          heading: 'Pasif Kompleks: Have/Get Something Done',
          explanation: `**Have something done:** subjek mengatur agar orang lain melakukan sesuatu (causative passive)
**Get something done:** serupa, tapi lebih informal/kolokial

**Struktur:** Subject + have/get + object + past participle`,
          examples: [
            { en: 'She had her car serviced at the garage.', id: 'Dia menyervis mobilnya di bengkel (meminta orang lain melakukannya).' },
            { en: 'You should get your eyes tested.', id: 'Kamu sebaiknya memeriksakan matamu.' },
            { en: 'The company had the building refurbished last year.', id: 'Perusahaan merenovasi gedung tahun lalu.' },
          ],
          tips: '"Have something done" juga bisa berarti pengalaman buruk: "She had her handbag stolen." (tasnya dicuri — bukan disengaja).',
        },
        {
          heading: 'Pasif Stative vs Pasif Dinamis',
          explanation: `**Pasif dinamis (be + past participle):** Menekankan proses/tindakan
→ "The window *was broken* by the storm."

**Pasif stative (remain/become/seem/stand + past participle):** Menekankan kondisi/keadaan
→ "The window *remained broken* for weeks."
→ "The building *stood abandoned* for decades."`,
          examples: [
            { en: 'The policy was revised following public criticism. (dynamic)', id: 'Kebijakan direvisi setelah kritik publik.' },
            { en: 'The matter remains unresolved after months of negotiation. (stative)', id: 'Masalah tetap tidak terselesaikan setelah berbulan-bulan negosiasi.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'It _____ that the company is planning major redundancies.', answer: 'is rumoured', options: ['rumoured', 'is rumoured', 'has rumoured', 'rumours'] },
        { type: 'transform', question: 'Ubah ke passive dengan reporting verb:\n"People believe that the ancient city lies beneath the desert."', answer: 'The ancient city is believed to lie beneath the desert.' },
        { type: 'mcq', question: 'She had her manuscript _____ before submitting it to publishers.', answer: 'edited', options: ['editing', 'to edit', 'edited', 'edit'] },
        { type: 'fill', question: 'The building is _____ (think) to have been constructed in the 12th century.', answer: 'thought' },
        { type: 'mcq', question: 'The issue _____ unresolved despite several meetings.', answer: 'remains', options: ['is remained', 'remains', 'remained', 'was remaining'] },
        { type: 'mcq', question: 'The CEO is expected _____ his resignation later today.', answer: 'to announce', options: ['announce', 'announcing', 'to announce', 'announced'] },
        { type: 'transform', question: 'Ubah ke have/get causative:\n"A professional cleaned my office."', answer: 'I had my office cleaned by a professional.' },
        { type: 'mcq', question: 'It was alleged _____ the funds had been misappropriated.', answer: 'that', options: ['what', 'that', 'which', 'how'] },
        { type: 'fill', question: 'The suspect is said _____ (escape) through the back entrance.', answer: 'to have escaped' },
        { type: 'mcq', question: 'They got their house _____ after the flood damage.', answer: 'repaired', options: ['repair', 'repairing', 'repaired', 'to repair'] },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // TOPIK 7 — PARTICIPLE CLAUSES
    // ══════════════════════════════════════════════════════════
    {
      id: 'participle-clauses',
      level: 'C1',
      title: 'Participle Clauses',
      icon: '🌿',
      shortDesc: 'Klausa dengan present atau past participle sebagai keterangan.',
      sections: [
        {
          heading: 'Present Participle Clauses',
          explanation: `Present Participle (-ing) clauses menyatakan:
1. **Simultaneous action** (dua tindakan bersamaan): *Sitting by the window, she read her book.*
2. **Reason/Cause** (sebab): *Feeling exhausted, he decided to rest.*
3. **Result** (akibat): *The factory closed, leaving hundreds unemployed.*
4. **Condition** (kondisi): *Working carefully, you can avoid mistakes.*`,
          examples: [
            { en: 'Having analysed the data, the researchers drew their conclusions.', id: 'Setelah menganalisis data, para peneliti menarik kesimpulan.' },
            { en: 'Not wanting to cause offence, she chose her words carefully.', id: 'Karena tidak ingin menyinggung perasaan, dia memilih kata-katanya dengan hati-hati.' },
          ],
          tips: 'Perhatian: subjek participle clause HARUS sama dengan subjek klausa utama. "Walking along the street, a dog bit me." — SALAH (dog bukan yang berjalan).',
        },
        {
          heading: 'Past Participle Clauses',
          explanation: `Past Participle clauses (V3) umumnya bersifat pasif:
1. **Reason/Cause (pasif):** *Defeated in the election, the party underwent major changes.*
2. **Condition (pasif):** *Translated into 30 languages, the book became a global bestseller.*
3. **Reduced relative clause:** *The report submitted by the team was comprehensive.*`,
          examples: [
            { en: 'Exhausted by the journey, she fell asleep immediately.', id: 'Kelelahan karena perjalanan, dia langsung tertidur.' },
            { en: 'Satisfied with the results, the manager praised the team.', id: 'Puas dengan hasilnya, manajer memuji tim.' },
          ],
        },
        {
          heading: 'Perfect Participle Clauses',
          explanation: `Perfect Participle "Having + V3" digunakan untuk menyatakan bahwa satu tindakan selesai sebelum tindakan utama:

**Active:** Having finished the report, he sent it immediately.
**Passive:** Having been rejected twice, she decided to try a different approach.`,
          examples: [
            { en: 'Having studied the proposal thoroughly, the board approved it.', id: 'Setelah mempelajari proposal secara menyeluruh, dewan menyetujuinya.' },
            { en: 'Having been warned of the risks, she proceeded nonetheless.', id: 'Setelah diperingatkan tentang risikonya, dia tetap melanjutkan.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: '_____ the research, the team published their findings.', answer: 'Having completed', options: ['Completing', 'Having completed', 'Being completed', 'Completed'] },
        { type: 'transform', question: 'Ubah ke participle clause:\n"Because she was tired, she decided to leave early."', answer: 'Feeling tired, she decided to leave early.' },
        { type: 'mcq', question: '_____ in the 19th century, the mansion has great historical value.', answer: 'Built', options: ['Building', 'Having building', 'Built', 'Being built'] },
        { type: 'fill', question: '_____ (Not know) what to say, he remained silent throughout the meeting.', answer: 'Not knowing' },
        { type: 'mcq', question: 'The scientist _____ the Nobel Prize gave a moving acceptance speech.', answer: 'awarded', options: ['awarding', 'who awarded', 'awarded', 'having awarded'] },
        { type: 'mcq', question: '_____ rejected by the committee, the architect revised his design.', answer: 'Having been', options: ['Being', 'Having been', 'Having', 'Been'] },
        { type: 'transform', question: 'Ubah ke past participle clause:\n"The policy, which was introduced in 2020, has been effective."', answer: 'The policy, introduced in 2020, has been effective.' },
        { type: 'mcq', question: '_____ the instructions carefully, he assembled the device correctly.', answer: 'Following', options: ['Followed', 'Having follow', 'Following', 'Follows'] },
        { type: 'fill', question: 'Impressed _____ the proposal, the investors decided to fund the project.', answer: 'by' },
        { type: 'mcq', question: '_____ a solution, she called an emergency meeting.', answer: 'Not having found', options: ['Not finding', 'Not found', 'Not having found', 'Having not find'] },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // TOPIK 8 — ELLIPSIS & SUBSTITUTION
    // ══════════════════════════════════════════════════════════
    {
      id: 'ellipsis-substitution',
      level: 'C1',
      title: 'Ellipsis & Substitution',
      icon: '💫',
      shortDesc: 'Menghilangkan atau menggantikan kata yang sudah diketahui konteksnya.',
      sections: [
        {
          heading: 'Ellipsis',
          explanation: `Ellipsis adalah menghilangkan kata/frasa yang bisa dipahami dari konteks untuk menghindari repetisi.

**Tipe-tipe ellipsis:**
1. **VP Ellipsis:** "She can sing, and he can too [sing]."
2. **Clause ellipsis:** "If [it is] possible, please respond by Friday."
3. **Nominal ellipsis:** "I like the blue car, but not the red [car]."
4. **Stranded preposition:** "Which meeting are you referring to [?]"`,
          examples: [
            { en: 'A: "Are you coming?" B: "I hope to [come]."', id: 'A: "Apakah kamu akan datang?" B: "Semoga bisa [datang]."' },
            { en: 'She finished her report, though [she was] exhausted.', id: 'Dia menyelesaikan laporannya, meski [dia] kelelahan.' },
          ],
        },
        {
          heading: 'Substitution dengan "do/so/not/one"',
          explanation: `Substitution menggantikan seluruh klausa atau frasa nomina agar tidak diulang:

**"Do so":** menggantikan verb phrase
→ "He promised to clean the office, and he did so promptly."

**"So":** menggantikan that-clause setelah think/believe/hope/say
→ "I think so." / "I don't think so." / "I'm afraid not."

**"One/ones":** menggantikan countable noun
→ "I need a pen. Do you have one?"`,
          examples: [
            { en: 'A: "Will it rain?" B: "I believe so." / "I don\'t think so."', id: 'A: "Akan hujan?" B: "Saya rasa iya." / "Saya rasa tidak."' },
            { en: 'The old guidelines were replaced by new ones.', id: 'Panduan lama digantikan oleh yang baru.' },
          ],
          tips: '"Do so" lebih formal dari "do it". Gunakan "so" (bukan "it") setelah think, believe, hope, expect, suppose, say, tell.',
        },
        {
          heading: 'Gapping & Comparative Ellipsis',
          explanation: `**Gapping:** Menghilangkan verba utama di klausa kedua dalam kalimat koordinat
→ "John ordered fish, and Mary [ordered] soup."

**Comparative ellipsis:**
→ "She works harder than I [work/do]."
→ "The results were better than expected [to be]."`,
          examples: [
            { en: 'He prefers classical music, and she [prefers] jazz.', id: 'Dia lebih suka musik klasik, dan dia [lebih suka] jazz.' },
            { en: 'The recovery was faster than anyone had anticipated [it to be].', id: 'Pemulihannya lebih cepat dari yang diperkirakan siapapun.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'A: "Can she present at the conference?" B: "I think ___."', answer: 'so', options: ['it', 'so', 'that', 'this'] },
        { type: 'fill', question: '"He said he would attend the meeting, and _____ (do) so on time."', answer: 'did' },
        { type: 'mcq', question: 'I need a better laptop. The current _____ is too slow.', answer: 'one', options: ['it', 'one', 'that', 'which'] },
        { type: 'mcq', question: 'She knew the answer but chose not to _____.', answer: 'say so', options: ['say it', 'say so', 'say that', 'say this'] },
        { type: 'transform', question: 'Gunakan ellipsis untuk menghindari repetisi:\n"She wanted to finish the project, and she managed to finish the project."', answer: 'She wanted to finish the project, and she managed to.' },
        { type: 'mcq', question: 'A: "Will the merger proceed?" B: "I\'m afraid ___."', answer: 'not', options: ['no', 'not', 'nothing', 'none'] },
        { type: 'mcq', question: 'The modern apartments are more expensive than the old _____.', answer: 'ones', options: ['one', 'ones', 'those', 'them'] },
        { type: 'fill', question: 'A: "Has the report been approved?" B: "I believe ___."', answer: 'so' },
        { type: 'transform', question: 'Gunakan gapping:\n"John prefers tea, and Maria prefers coffee."', answer: 'John prefers tea, and Maria coffee.' },
        { type: 'mcq', question: 'The deadline is earlier than I _____.', answer: 'expected', options: ['expected it', 'expected', 'expecting', 'have expected it'] },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // TOPIK 9 — ADVANCED ARTICLES & DETERMINERS
    // ══════════════════════════════════════════════════════════
    {
      id: 'advanced-articles',
      level: 'C1',
      title: 'Advanced Articles & Determiners',
      icon: '📌',
      shortDesc: 'Penggunaan artikel dan determiner tingkat lanjut dalam konteks formal.',
      sections: [
        {
          heading: 'Zero Article vs Definite Article',
          explanation: `**Zero article (tanpa artikel) digunakan dengan:**
• Nouns yang bersifat umum/generic: *Life is short. Science is fascinating.*
• Proper nouns: *London, Mount Everest, Lake Victoria*
• Meals: *Have you had breakfast?*
• Transport/travel: *by car, on foot, at sea*
• Institutions (generic function): *go to hospital, in prison, at university*

**The digunakan dengan:**
• Unique entities: *the sun, the internet, the government*
• Superlatives: *the most complex, the best solution*
• "The + adjective" untuk kelompok: *the elderly, the unemployed*
• Institutions dengan fungsi fisik/spesifik: *The hospital is on 5th Avenue.*`,
          examples: [
            { en: 'She went to university to study medicine. (generic)', id: 'Dia kuliah untuk belajar kedokteran.' },
            { en: 'The university where she studied is in Edinburgh. (specific)', id: 'Universitas tempat dia belajar ada di Edinburgh.' },
          ],
        },
        {
          heading: 'Determiner: Quantifiers Tingkat Lanjut',
          explanation: `**Much vs Many vs A great deal of vs Numerous:**
• *Much/Many* → lebih informal, lebih umum
• *A great deal of* → uncountable, formal
• *Numerous/A number of* → countable, formal/academic
• *The majority of / The bulk of* → formal, statistical

**Other vs Another vs The other:**
• *Another* (singular, satu lagi dari banyak)
• *The other* (singular, satu-satunya yang tersisa)
• *Other* (plural, beberapa yang lain)
• *The others* (plural, sisanya yang spesifik)`,
          examples: [
            { en: 'A great deal of research has been conducted on this topic.', id: 'Banyak penelitian telah dilakukan tentang topik ini.' },
            { en: 'The majority of participants reported positive outcomes.', id: 'Sebagian besar peserta melaporkan hasil yang positif.' },
          ],
        },
        {
          heading: 'Generic vs Specific Reference',
          explanation: `Cara menyatakan generik (jenis secara umum):
1. **Zero + plural:** *Dogs are loyal animals.*
2. **A/An + singular:** *A dog makes a good pet.*
3. **The + singular (formal/scientific):** *The dog has been domesticated for millennia.*

**Each vs Every:**
• *Each* → menekankan individualitas: "Each student must submit their own work."
• *Every* → menekankan totalitas: "Every student passed the exam."`,
          examples: [
            { en: 'The cheetah is the fastest land animal. (formal generic)', id: 'Cheetah adalah hewan darat tercepat. (generik formal)' },
            { en: 'Each of the proposals has its own merits.', id: 'Setiap proposal memiliki kelebihannya masing-masing.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'She was taken to ___ hospital after the accident.', answer: 'the', options: ['a', 'the', '—', 'an'] },
        { type: 'mcq', question: '_____ research has demonstrated the effectiveness of this treatment.', answer: 'A great deal of', options: ['Many', 'Numerous', 'A great deal of', 'Much of'] },
        { type: 'fill', question: '___ majority of respondents expressed satisfaction with the service.', answer: 'The' },
        { type: 'mcq', question: 'I don\'t like this proposal. Could you suggest _____ one?', answer: 'another', options: ['other', 'another', 'the other', 'the others'] },
        { type: 'mcq', question: '_____ of the two candidates was selected for the position.', answer: 'Neither', options: ['None', 'Neither', 'No one', 'Not any'] },
        { type: 'transform', question: 'Lengkapi dengan artikel yang tepat:\n"___ whale is an endangered species. Please protect ___ ocean."', answer: 'The whale is an endangered species. Please protect the ocean.' },
        { type: 'mcq', question: '_____ student must submit their assignment by noon.', answer: 'Every', options: ['All', 'Every', 'Each of', 'The all'] },
        { type: 'fill', question: 'A _____ deal of thought went into designing the curriculum.', answer: 'great' },
        { type: 'mcq', question: 'We have two options. One is expensive; _____ is time-consuming.', answer: 'the other', options: ['another', 'other', 'the other', 'the others'] },
        { type: 'mcq', question: '_____ unemployment affects both individuals and society as a whole.', answer: '—', options: ['The', 'A', '—', 'An'] },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // TOPIK 10 — DISCOURSE MARKERS & COHESION
    // ══════════════════════════════════════════════════════════
    {
      id: 'discourse-markers',
      level: 'C2',
      title: 'Discourse Markers & Cohesion',
      icon: '🔗',
      shortDesc: 'Menggunakan penghubung wacana tingkat lanjut untuk teks yang kohesif.',
      sections: [
        {
          heading: 'Discourse Markers Berdasarkan Fungsi',
          explanation: `**Menambahkan/Memperkuat:**
Furthermore, Moreover, In addition, What is more, Not only this, but also

**Membandingkan/Mengontraskan:**
Nevertheless, Nonetheless, Conversely, In contrast, By the same token, Yet, Notwithstanding this

**Memberikan Contoh/Ilustrasi:**
For instance, To illustrate, A case in point is, Specifically, Notably

**Menyimpulkan:**
In conclusion, To sum up, All things considered, On balance, Taking everything into account

**Menunjukkan Urutan:**
Initially, Subsequently, In due course, Prior to this, Following this`,
          examples: [
            { en: 'The policy is well-intentioned; nevertheless, its implementation has been problematic.', id: 'Kebijakannya bermaksud baik; namun, implementasinya bermasalah.' },
            { en: 'The data is compelling. Notwithstanding this, further verification is required.', id: 'Data tersebut meyakinkan. Meskipun demikian, verifikasi lebih lanjut diperlukan.' },
          ],
        },
        {
          heading: 'Referential Cohesion',
          explanation: `**Anaphora (backward reference):** merujuk ke sesuatu yang sudah disebutkan
→ *The scientist made a discovery. She published **it** immediately.*

**Cataphora (forward reference):** merujuk ke sesuatu yang akan disebutkan
→ *Here is the crucial point: **the data is unreliable.***

**Lexical cohesion:**
• Repetition, synonymy, antonymy
• Superordinate (umbrella terms): *cat, dog → animals*
• Collocation chains yang konsisten`,
          examples: [
            { en: 'The proposal was ambitious. It outlined three key strategies, each of which was backed by empirical evidence.', id: 'Proposalnya ambisius. Ini menguraikan tiga strategi utama, masing-masing didukung oleh bukti empiris.' },
          ],
          tips: 'Dalam tulisan akademik, variasikan antara "this/these", sinonim, dan istilah superordinat untuk menghindari repetisi yang berlebihan.',
        },
        {
          heading: 'Hedging & Stance Markers',
          explanation: `**Hedging (untuk mengurangi kepastian):**
*It would appear that, It seems likely that, There is evidence to suggest that, One might argue that*

**Boosters (untuk memperkuat klaim):**
*It is clear that, It is evident that, Undoubtedly, It is well established that*

**Attribution (mengatribusikan sumber):**
*According to, As stated by, Building on X's argument, Contrary to popular belief*`,
          examples: [
            { en: 'It would appear that the initial hypothesis requires revision.', id: 'Tampaknya hipotesis awal perlu direvisi.' },
            { en: 'As noted by Smith (2020), the relationship between the variables is complex.', id: 'Seperti dicatat oleh Smith (2020), hubungan antar variabel sangatlah kompleks.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'The findings are encouraging. _____, the sample size remains a limitation.', answer: 'Nevertheless', options: ['Furthermore', 'Nevertheless', 'As a result', 'Subsequently'] },
        { type: 'fill', question: '_____ the initial setbacks, the project was ultimately a success. (hint: despite)', answer: 'Notwithstanding' },
        { type: 'mcq', question: 'The argument is logically sound. _____, it is empirically unsupported.', answer: 'Conversely', options: ['Moreover', 'Conversely', 'Consequently', 'Namely'] },
        { type: 'mcq', question: 'Several factors contributed to the failure, _____ the lack of funding.', answer: 'notably', options: ['surprisingly', 'notably', 'eventually', 'furthermore'] },
        { type: 'transform', question: 'Tambahkan discourse marker yang tepat:\n"The project was delayed. It was eventually completed on budget."', answer: 'The project was delayed. It was, nonetheless, eventually completed on budget.' },
        { type: 'mcq', question: '_____ the data suggests, further investigation is warranted.', answer: 'As', options: ['Like', 'As', 'Same as', 'According'] },
        { type: 'mcq', question: 'The policy has had mixed results. _____, some improvements are evident.', answer: 'That said', options: ['That said', 'And so', 'Because of this', 'Likewise'] },
        { type: 'fill', question: 'The study was comprehensive. It would _____ that the results are reliable.', answer: 'appear' },
        { type: 'mcq', question: '_____ the increasing evidence, some researchers remain unconvinced.', answer: 'Notwithstanding', options: ['Although', 'Despite of', 'Notwithstanding', 'Nevertheless'] },
        { type: 'mcq', question: 'A _____ in point is the case of Finland\'s education system.', answer: 'case', options: 'case, point, example, fact'.split(', ') },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // TOPIK 11 — ADVANCED MODAL VERBS (EPISTEMIC)
    // ══════════════════════════════════════════════════════════
    {
      id: 'advanced-modals',
      level: 'C2',
      title: 'Advanced Modal Verbs',
      icon: '🧠',
      shortDesc: 'Modal epistemik, deontik, dan dinamik dalam konteks formal dan nuansanya.',
      sections: [
        {
          heading: 'Modal Epistemik (Derajat Kepastian)',
          explanation: `Modal epistemik menyatakan seberapa yakin pembicara tentang sebuah proposisi:

**Masa kini/Umum:**
• *must* → deduction kuat (sangat yakin positif): "She must be talented."
• *can't/couldn't* → deduction kuat negatif: "He can't be serious."
• *should/ought to* → expectation (seharusnya): "The package should arrive today."
• *might/may/could* → kemungkinan: "It might rain."
• *will* → confident prediction: "This will cause problems."

**Masa lalu:**
• *must have + V3, can't have + V3, might have + V3, should have + V3*`,
          examples: [
            { en: 'She must have left already — her coat isn\'t here.', id: 'Dia pasti sudah pergi — mantelnya tidak ada di sini.' },
            { en: 'They can\'t have finished the report already. It\'s only been two hours.', id: 'Mereka tidak mungkin sudah menyelesaikan laporannya. Baru dua jam.' },
          ],
        },
        {
          heading: 'Modal Deontik & Dinamik Tingkat Lanjut',
          explanation: `**Deontik (permission, obligation, prohibition):**
• *must* (obligation, formal): "All visitors must register."
• *need not/needn't* (absence of obligation): "You needn't submit a formal application."
• *may/might* (formal permission): "Candidates may use a calculator."

**Dinamik (ability, willingness):**
• *will/won't* (willingness/refusal): "The machine will not start."
• *can/could* (ability): "Could I have your attention, please?"

**Nuansa modal: should/ought to/had better:**
• *Should* (general obligation/advice)
• *Ought to* (moral expectation, slightly stronger)
• *Had better* (strong advice with implied negative consequence)`,
          examples: [
            { en: 'You needn\'t have brought wine — we already have plenty.', id: 'Kamu tidak perlu membawa anggur — kami sudah punya banyak.' },
            { en: 'You had better check the data again before presenting.', id: 'Sebaiknya kamu periksa data lagi sebelum presentasi. (ada konsekuensi jika tidak)' },
          ],
        },
        {
          heading: 'Modal Perfects & Counterfactual',
          explanation: `Modal perfect (modal + have + V3) menyatakan situasi di masa lalu yang berbeda dari kenyataan:

• *should have + V3* → kritik terhadap tindakan yang tidak dilakukan
• *could have + V3* → kemungkinan yang tidak dimanfaatkan
• *would have + V3* → hasil yang akan terjadi (dalam conditional)
• *might have + V3* → kemungkinan di masa lalu yang tidak pasti`,
          examples: [
            { en: 'They should have consulted a lawyer before signing the agreement.', id: 'Mereka seharusnya berkonsultasi dengan pengacara sebelum menandatangani perjanjian.' },
            { en: 'She could have applied for a grant, but she didn\'t know about it.', id: 'Dia bisa saja mendaftar hibah, tapi dia tidak tahu tentang itu.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'The lights are off. They _____ gone home already.', answer: 'must have', options: ['could have', 'must have', 'should have', 'would have'] },
        { type: 'mcq', question: 'You _____ brought such an expensive gift — it wasn\'t necessary!', answer: 'needn\'t have', options: ['shouldn\'t', 'needn\'t have', 'mustn\'t have', 'can\'t have'] },
        { type: 'mcq', question: 'She _____ the deadline, but she completely forgot about it.', answer: 'could have met', options: ['should have met', 'could have met', 'must have met', 'would meet'] },
        { type: 'fill', question: 'This report _____ (must / submit) by noon — no exceptions.', answer: 'must be submitted' },
        { type: 'mcq', question: 'You _____ check twice — the results are clearly wrong.', answer: 'ought to have', options: ['should', 'must', 'ought to have', 'had better'] },
        { type: 'transform', question: 'Ubah ke past modal:\n"He is probably delayed by traffic." (past inference)', answer: 'He must have been delayed by traffic.' },
        { type: 'mcq', question: 'He _____ be the author — the writing style is completely different from his.', answer: 'can\'t', options: ['mustn\'t', 'can\'t', 'shouldn\'t', 'needn\'t'] },
        { type: 'fill', question: 'You had _____ review the contract before signing — there may be hidden clauses.', answer: 'better' },
        { type: 'mcq', question: 'The patient _____ have taken the wrong dosage. Check the prescription.', answer: 'may', options: ['must', 'will', 'may', 'can'] },
        { type: 'mcq', question: 'She _____ have been more careful with the confidential documents.', answer: 'should', options: ['would', 'could', 'should', 'might'] },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // TOPIK 12 — EMPHASIS & FOCUS STRUCTURES
    // ══════════════════════════════════════════════════════════
    {
      id: 'emphasis-focus',
      level: 'C2',
      title: 'Emphasis & Focus Structures',
      icon: '🎯',
      shortDesc: 'Struktur penekanan: do-support, fronting, appositive, absolute constructions.',
      sections: [
        {
          heading: 'Do-Emphasis & Fronting',
          explanation: `**Do-emphasis (auxiliary "do" untuk menekankan verba):**
Digunakan dalam kalimat afirmatif untuk memberikan penekanan emosional atau untuk kontras.
→ "I *do* understand your concern." / "She *did* mention it, I assure you."

**Fronting (Topicalization):**
Memindahkan elemen dari posisi normal ke awal kalimat untuk penekanan:
• Objek: "That theory, I find completely unconvincing."
• Komplemen adjektiva: "Remarkable though it may seem, he survived."
• Keterangan: "In this country alone, over 50,000 cases were reported."`,
          examples: [
            { en: 'That he should have won, I have no doubt.', id: 'Bahwa dia seharusnya menang, saya tidak meragukan itu.' },
            { en: 'Complex as the situation is, a solution must be found.', id: 'Sesulit apapun situasinya, solusi harus ditemukan.' },
          ],
          tips: 'Fronting dalam bahasa formal/tulis berbeda dari cleft sentences: "The theory I find unconvincing" vs "It is the theory that I find unconvincing."',
        },
        {
          heading: 'Appositive Phrases',
          explanation: `Appositive adalah frasa nomina yang mengikuti nomina lain dan memberikan informasi tambahan (biasanya di antara koma, tanda hubung, atau titik dua):

**Restrictive (tanpa koma):** "The scientist *who discovered penicillin* changed medicine."
**Non-restrictive (dengan koma):** "Alexander Fleming, *the discoverer of penicillin*, was Scottish."

**Absolute appositives:** Frasa nomina yang memodifikasi seluruh kalimat
→ "His research complete, the professor turned his attention to teaching."`,
          examples: [
            { en: 'The proposal — an ambitious plan to revamp the entire system — was presented to the board.', id: 'Proposal itu — sebuah rencana ambisius untuk merombak seluruh sistem — dipresentasikan kepada dewan.' },
            { en: 'The solution, a compromise acceptable to all parties, was finally agreed upon.', id: 'Solusinya, sebuah kompromi yang dapat diterima semua pihak, akhirnya disepakati.' },
          ],
        },
        {
          heading: 'Absolute Constructions & Concessive Clauses',
          explanation: `**Absolute constructions** (Nominative Absolute): Menghubungkan dua tindakan berbeda subjek:
→ "Weather permitting, the event will take place outdoors."
→ "All things considered, the project was a success."

**Concessive clauses dengan inversion:**
→ "Try as he might, he couldn't solve the puzzle."
→ "Much as I admire her work, I cannot endorse her methods."
→ "Young as she is, she demonstrates remarkable wisdom."`,
          examples: [
            { en: 'Try as they might, the engineers could not identify the fault.', id: 'Bagaimanapun mereka berusaha, para insinyur tidak bisa mengidentifikasi kerusakan.' },
            { en: 'Much as I value your input, the decision has already been made.', id: 'Betapapun saya menghargai masukan Anda, keputusan sudah dibuat.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'I _____ appreciate your concern, but the decision is final.', answer: 'do', options: ['really', 'do', 'very much', 'extremely'] },
        { type: 'transform', question: 'Gunakan fronting untuk penekanan:\n"I find this particular argument convincing."', answer: 'This particular argument, I find convincing.' },
        { type: 'mcq', question: '_____ as it may seem, the evidence supports this conclusion.', answer: 'Unlikely', options: ['Unlikely', 'Unlike', 'Dislike', 'Unlikeness'] },
        { type: 'fill', question: 'Much _____ I respect her expertise, I question her methodology.', answer: 'as' },
        { type: 'mcq', question: 'The CEO, _____ architect of the company\'s success, retired last year.', answer: 'the', options: ['a', 'an', 'the', '—'] },
        { type: 'transform', question: 'Buat concessive clause dengan inversion:\n"Although he tried hard, he couldn\'t master the language."', answer: 'Try as he might, he couldn\'t master the language.' },
        { type: 'mcq', question: 'His confidence restored, he _____ the stage for his final performance.', answer: 'took', options: ['takes', 'took', 'has taken', 'taking'] },
        { type: 'mcq', question: 'Difficult _____ it may be, the reform is necessary.', answer: 'as', options: ['though', 'as', 'that', 'which'] },
        { type: 'fill', question: 'She _____ (do) mention the risk, but nobody listened.', answer: 'did' },
        { type: 'mcq', question: '_____ permitting, the outdoor ceremony will proceed as planned.', answer: 'Weather', options: ['If', 'Weather', 'Unless', 'Should'] },
      ],
    },

  ]; // end TOPICS

  // ── Public API ────────────────────────────────────────────

  function getTopics() {
    return TOPICS;
  }

  function getTopic(id) {
    return TOPICS.find(t => t.id === id) || null;
  }

  function getQuiz(topicId, n = 10) {
    const topic = getTopic(topicId);
    if (!topic) return [];
    const shuffled = [...topic.quiz].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(n, shuffled.length));
  }

  function getByLevel(level) {
    return level === 'all' ? TOPICS : TOPICS.filter(t => t.level === level);
  }

  return { getTopics, getTopic, getQuiz, getByLevel };

})();
