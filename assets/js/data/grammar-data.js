/**
 * EnglishPath — Grammar Data A1–A2
 * Fase 6 — v0.7.0
 *
 * Struktur:
 *  GRAMMAR_TOPICS  → array of topic objects
 *  GRAMMAR_EXERCISES → fill-in-blank & reorder sentences per topic
 */

const GRAMMAR_DATA = (function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // TOPICS
  // Setiap topic: { id, level, title, icon, shortDesc, sections[], quiz[] }
  // section: { heading, explanation, examples[], tips? }
  // quiz: { type:'mcq'|'fill'|'reorder', question, answer, options?, words? }
  // ─────────────────────────────────────────────────────────────
  const TOPICS = [
    // ── 1. To Be (am / is / are) ─────────────────────────────
    {
      id: 'to-be',
      level: 'A1',
      title: 'To Be (am / is / are)',
      icon: '🔵',
      shortDesc: 'Kata kerja paling dasar dalam bahasa Inggris.',
      sections: [
        {
          heading: 'Penggunaan',
          explanation: `"To be" digunakan untuk menjelaskan identitas, kondisi, atau sifat seseorang/sesuatu. Bentuknya bergantung pada subjek:
• I → am
• You / We / They → are
• He / She / It → is`,
          examples: [
            { en: 'I am a student.', id: 'Saya adalah seorang pelajar.' },
            { en: 'She is happy.', id: 'Dia (perempuan) bahagia.' },
            { en: 'They are doctors.', id: 'Mereka adalah dokter.' },
            { en: 'It is a cat.', id: 'Itu adalah seekor kucing.' },
          ],
        },
        {
          heading: 'Kalimat Negatif',
          explanation: 'Tambahkan "not" setelah to be untuk membuat kalimat negatif. Bentuk singkat (contraction) sangat umum dipakai.',
          examples: [
            { en: 'I am not tired. (I\'m not tired.)', id: 'Saya tidak lelah.' },
            { en: 'He is not a teacher. (He\'s not / He isn\'t a teacher.)', id: 'Dia bukan seorang guru.' },
            { en: 'We are not late. (We\'re not / We aren\'t late.)', id: 'Kami tidak terlambat.' },
          ],
        },
        {
          heading: 'Kalimat Tanya',
          explanation: 'Balikkan posisi subjek dan to be untuk membentuk pertanyaan yes/no.',
          examples: [
            { en: 'Are you a student?', id: 'Apakah kamu seorang pelajar?' },
            { en: 'Is she your sister?', id: 'Apakah dia (perempuan) saudarimu?' },
            { en: 'Are they at home?', id: 'Apakah mereka di rumah?' },
          ],
          tips: 'Jawab dengan: Yes, I am. / No, I\'m not. (Jangan pernah: Yes, I\'m. ❌)',
        },
      ],
      quiz: [
        { type: 'mcq', question: 'She ___ a nurse.', answer: 'is', options: ['am', 'is', 'are', 'be'] },
        { type: 'mcq', question: 'We ___ students.', answer: 'are', options: ['am', 'is', 'are', 'be'] },
        { type: 'mcq', question: 'I ___ not happy today.', answer: 'am', options: ['am', 'is', 'are', 'were'] },
        { type: 'fill', question: 'They ___ at school right now.', answer: 'are' },
        { type: 'fill', question: 'He ___ my best friend.', answer: 'is' },
        { type: 'mcq', question: '___  you a doctor?', answer: 'Are', options: ['Am', 'Is', 'Are', 'Do'] },
        { type: 'reorder', question: 'Susun menjadi kalimat yang benar:', words: ['is', 'She', 'teacher', 'a'], answer: 'She is a teacher.' },
        { type: 'mcq', question: 'It ___ a beautiful day.', answer: 'is', options: ['am', 'is', 'are', 'be'] },
        { type: 'fill', question: 'I ___ fifteen years old.', answer: 'am' },
        { type: 'reorder', question: 'Susun menjadi kalimat tanya:', words: ['are', 'late', 'you', '?'], answer: 'Are you late?' },
      ],
    },

    // ── 2. Simple Present Tense ───────────────────────────────
    {
      id: 'simple-present',
      level: 'A1',
      title: 'Simple Present Tense',
      icon: '🟢',
      shortDesc: 'Menyatakan kebiasaan, fakta umum, dan rutinitas.',
      sections: [
        {
          heading: 'Penggunaan',
          explanation: `Simple Present digunakan untuk:
1. Kebiasaan / rutinitas (sering dengan: always, usually, often, sometimes, never)
2. Fakta umum dan kebenaran tetap
3. Jadwal tetap`,
          examples: [
            { en: 'I drink coffee every morning.', id: 'Saya minum kopi setiap pagi.' },
            { en: 'The sun rises in the east.', id: 'Matahari terbit di timur.' },
            { en: 'She works in a hospital.', id: 'Dia (perempuan) bekerja di rumah sakit.' },
            { en: 'The train leaves at 7 AM.', id: 'Kereta berangkat pukul 7 pagi.' },
          ],
        },
        {
          heading: 'Rumus',
          explanation: `(+) Subject + V1 (He/She/It: V1+s/es)
(−) Subject + do/does + not + V1
(?) Do/Does + Subject + V1?`,
          examples: [
            { en: 'I eat rice. / She eats rice.', id: 'Saya makan nasi. / Dia makan nasi.' },
            { en: 'They do not (don\'t) watch TV.', id: 'Mereka tidak menonton TV.' },
            { en: 'Does he play football?', id: 'Apakah dia bermain sepak bola?' },
          ],
          tips: 'Tambahkan -s atau -es pada kata kerja jika subjeknya He, She, atau It. Contoh: play → plays, go → goes, watch → watches.',
        },
        {
          heading: 'Aturan penambahan -s/-es',
          explanation: `• Kata kerja biasa → + s (eat → eats, drink → drinks)
• Berakhir -o, -sh, -ch, -ss, -x → + es (go → goes, watch → watches)
• Berakhir konsonan + y → ganti y menjadi i + es (study → studies)
• Have → has (irregular)`,
          examples: [
            { en: 'He goes to school by bus.', id: 'Dia pergi ke sekolah naik bus.' },
            { en: 'She studies English every day.', id: 'Dia belajar bahasa Inggris setiap hari.' },
            { en: 'My father has a car.', id: 'Ayahku memiliki sebuah mobil.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'She ___ (go) to work by train.', answer: 'goes', options: ['go', 'goes', 'is go', 'going'] },
        { type: 'mcq', question: 'They ___ (not/like) spicy food.', answer: "don't like", options: ["don't like", "doesn't like", "isn't like", "not like"] },
        { type: 'fill', question: 'He ___ (study) English every day.', answer: 'studies' },
        { type: 'mcq', question: '___ she work at a bank?', answer: 'Does', options: ['Do', 'Does', 'Is', 'Are'] },
        { type: 'fill', question: 'I ___ (drink) coffee every morning.', answer: 'drink' },
        { type: 'mcq', question: 'The cat ___ (sleep) a lot.', answer: 'sleeps', options: ['sleep', 'sleeps', 'is sleep', 'sleeping'] },
        { type: 'reorder', question: 'Susun menjadi kalimat negatif:', words: ['not', 'She', 'does', 'eat', 'meat'], answer: 'She does not eat meat.' },
        { type: 'mcq', question: 'My brother ___ (have) two dogs.', answer: 'has', options: ['have', 'has', 'haves', 'is have'] },
        { type: 'fill', question: 'We ___ (live) in Jakarta.', answer: 'live' },
        { type: 'reorder', question: 'Susun menjadi kalimat tanya:', words: ['you', 'Do', 'like', 'music', '?'], answer: 'Do you like music?' },
      ],
    },

    // ── 3. Simple Past Tense ──────────────────────────────────
    {
      id: 'simple-past',
      level: 'A1',
      title: 'Simple Past Tense',
      icon: '🟡',
      shortDesc: 'Menceritakan kejadian yang sudah selesai di masa lalu.',
      sections: [
        {
          heading: 'Penggunaan',
          explanation: `Simple Past digunakan untuk:
1. Kejadian yang sudah selesai di masa lalu
2. Serangkaian kejadian masa lalu
3. Kebiasaan masa lalu (sering dengan "used to")
Kata kunci: yesterday, last night, last week, ago, in 2010, when I was young`,
          examples: [
            { en: 'I watched a movie yesterday.', id: 'Saya menonton film kemarin.' },
            { en: 'She studied English last night.', id: 'Dia belajar bahasa Inggris tadi malam.' },
            { en: 'We went to Bali last year.', id: 'Kami pergi ke Bali tahun lalu.' },
          ],
        },
        {
          heading: 'Regular Verbs (Kata Kerja Beraturan)',
          explanation: `Tambahkan -ed atau -d pada kata kerja bentuk dasar.
• Biasa: walk → walked, clean → cleaned
• Berakhir -e: love → loved, dance → danced
• Satu suku kata, konsonan tunggal: stop → stopped, plan → planned
• Berakhir konsonan + y: study → studied, carry → carried`,
          examples: [
            { en: 'He walked to school this morning.', id: 'Dia berjalan ke sekolah pagi ini.' },
            { en: 'They played football in the park.', id: 'Mereka bermain sepak bola di taman.' },
            { en: 'I studied all night for the exam.', id: 'Saya belajar sepanjang malam untuk ujian.' },
          ],
        },
        {
          heading: 'Irregular Verbs (Kata Kerja Tidak Beraturan)',
          explanation: 'Banyak kata kerja umum yang bentuk past-nya tidak mengikuti aturan -ed. Harus dihafal!',
          examples: [
            { en: 'go → went | She went to the market.', id: 'Dia pergi ke pasar.' },
            { en: 'eat → ate | I ate rice for breakfast.', id: 'Saya makan nasi untuk sarapan.' },
            { en: 'see → saw | We saw a beautiful sunset.', id: 'Kami melihat matahari terbenam yang indah.' },
            { en: 'buy → bought | He bought a new phone.', id: 'Dia membeli ponsel baru.' },
            { en: 'come → came | They came late to class.', id: 'Mereka datang terlambat ke kelas.' },
          ],
          tips: 'Irregular verbs lainnya: be→was/were, have→had, do→did, make→made, take→took, give→gave, get→got, think→thought, say→said, know→knew.',
        },
        {
          heading: 'Kalimat Negatif & Tanya',
          explanation: `(−) Subject + did not (didn't) + V1
(?) Did + Subject + V1?
Perhatikan: gunakan V1 (bukan V2) setelah did/didn't!`,
          examples: [
            { en: 'She didn\'t go to school yesterday.', id: 'Dia tidak pergi ke sekolah kemarin.' },
            { en: 'Did you eat breakfast this morning?', id: 'Apakah kamu sarapan pagi ini?' },
            { en: 'We didn\'t see him at the party.', id: 'Kami tidak melihatnya di pesta.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'She ___ (go) to the market yesterday.', answer: 'went', options: ['go', 'goes', 'went', 'gone'] },
        { type: 'fill', question: 'I ___ (watch) TV last night.', answer: 'watched' },
        { type: 'mcq', question: 'They ___ (not/come) to the party.', answer: "didn't come", options: ["don't come", "didn't come", "weren't come", "not came"] },
        { type: 'mcq', question: '___ he study for the exam?', answer: 'Did', options: ['Do', 'Does', 'Did', 'Was'] },
        { type: 'fill', question: 'We ___ (eat) pizza for dinner.', answer: 'ate' },
        { type: 'mcq', question: 'The past form of "buy" is:', answer: 'bought', options: ['buyed', 'buyd', 'bought', 'boughted'] },
        { type: 'reorder', question: 'Susun menjadi kalimat:', words: ['played', 'the', 'park', 'in', 'Children'], answer: 'Children played in the park.' },
        { type: 'mcq', question: 'I ___ (not/see) him last week.', answer: "didn't see", options: ["don't see", "didn't see", "saw not", "not saw"] },
        { type: 'fill', question: 'She ___ (make) a cake for the birthday.', answer: 'made' },
        { type: 'reorder', question: 'Susun menjadi kalimat tanya:', words: ['you', 'Did', 'finish', 'homework', 'your', '?'], answer: 'Did you finish your homework?' },
      ],
    },

    // ── 4. Articles (a, an, the) ──────────────────────────────
    {
      id: 'articles',
      level: 'A1',
      title: 'Articles (a, an, the)',
      icon: '🔤',
      shortDesc: 'Cara menggunakan a, an, dan the dengan benar.',
      sections: [
        {
          heading: 'A dan An (Indefinite Article)',
          explanation: `"A" dan "an" digunakan sebelum kata benda tunggal yang dapat dihitung, ketika menyebut sesuatu untuk pertama kali atau sesuatu yang tidak spesifik.
• A → sebelum kata yang dimulai dengan bunyi konsonan
• An → sebelum kata yang dimulai dengan bunyi vokal (a, e, i, o, u)`,
          examples: [
            { en: 'I have a cat. (cat → bunyi /k/)', id: 'Saya memiliki seekor kucing.' },
            { en: 'She is an engineer. (engineer → bunyi /ɛ/)', id: 'Dia seorang insinyur.' },
            { en: 'He ate an apple.', id: 'Dia makan sebuah apel.' },
            { en: 'It is a university. (university → bunyi /juː/, bukan vokal!)', id: 'Itu sebuah universitas.' },
            { en: 'Wait an hour. (hour → bunyi /aʊ/, h tidak berbunyi!)', id: 'Tunggu satu jam.' },
          ],
          tips: 'Yang penting adalah BUNYI, bukan huruf! "A university" karena berbunyi /j/, bukan /u/. "An hour" karena h-nya bisu dan terdengar vokal.',
        },
        {
          heading: 'The (Definite Article)',
          explanation: `"The" digunakan ketika pembicara dan pendengar sama-sama tahu benda yang dimaksud:
1. Disebut untuk kedua kalinya (sudah diperkenalkan sebelumnya)
2. Benda yang unik/satu-satunya di dunia
3. Benda yang spesifik/sudah diketahui`,
          examples: [
            { en: 'I saw a dog. The dog was big.', id: 'Saya melihat seekor anjing. Anjing itu besar.' },
            { en: 'The sun rises in the east.', id: 'Matahari terbit di timur.' },
            { en: 'Please close the door.', id: 'Tolong tutup pintunya.' },
            { en: 'The President of Indonesia lives in Jakarta.', id: 'Presiden Indonesia tinggal di Jakarta.' },
          ],
        },
        {
          heading: 'Tanpa Article (Zero Article)',
          explanation: `Jangan gunakan artikel untuk:
• Kata benda jamak yang umum
• Kata benda tak dapat dihitung (uncountable) yang umum
• Nama orang, kota, negara (sebagian besar)
• Olahraga, makanan, bahasa (secara umum)`,
          examples: [
            { en: 'I like cats. (bukan: the cats secara umum)', id: 'Saya suka kucing.' },
            { en: 'Water is important.', id: 'Air itu penting.' },
            { en: 'She speaks English.', id: 'Dia berbicara bahasa Inggris.' },
            { en: 'He plays football.', id: 'Dia bermain sepak bola.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'She is ___ teacher.', answer: 'a', options: ['a', 'an', 'the', '—'] },
        { type: 'mcq', question: 'I have ___ umbrella.', answer: 'an', options: ['a', 'an', 'the', '—'] },
        { type: 'mcq', question: 'Look at ___ moon tonight!', answer: 'the', options: ['a', 'an', 'the', '—'] },
        { type: 'fill', question: 'He is ___ honest man.', answer: 'an' },
        { type: 'mcq', question: 'I saw ___ cat. ___ cat was black.', answer: 'a, The', options: ['a, The', 'the, The', 'an, A', 'a, A'] },
        { type: 'fill', question: 'She drinks ___ coffee every morning.', answer: '—' },
        { type: 'mcq', question: 'It is ___ university in Jakarta.', answer: 'a', options: ['a', 'an', 'the', '—'] },
        { type: 'fill', question: 'I love ___ music.', answer: '—' },
        { type: 'mcq', question: 'Can you open ___ window, please?', answer: 'the', options: ['a', 'an', 'the', '—'] },
        { type: 'mcq', question: 'He plays ___ guitar.', answer: 'the', options: ['a', 'an', 'the', '—'] },
      ],
    },

    // ── 5. Prepositions of Time & Place ──────────────────────
    {
      id: 'prepositions',
      level: 'A1',
      title: 'Prepositions (at, in, on)',
      icon: '📍',
      shortDesc: 'Preposisi waktu dan tempat yang paling sering dipakai.',
      sections: [
        {
          heading: 'Preposisi Waktu',
          explanation: `AT — waktu yang spesifik/tepat:
  • Jam: at 7 o'clock, at midnight, at noon
  • Momen tertentu: at the weekend, at Christmas, at night

IN — periode waktu yang lebih panjang:
  • Bulan: in January, in March
  • Tahun: in 2024, in the 1990s
  • Musim: in summer, in winter
  • Bagian hari: in the morning, in the afternoon, in the evening

ON — hari dan tanggal:
  • Hari: on Monday, on weekdays
  • Tanggal: on 17 August, on New Year's Day`,
          examples: [
            { en: 'The class starts at 8 o\'clock.', id: 'Kelas dimulai pukul 8.' },
            { en: 'She was born in 1998.', id: 'Dia lahir pada tahun 1998.' },
            { en: 'We have a meeting on Friday.', id: 'Kami ada rapat pada hari Jumat.' },
            { en: 'I study in the morning.', id: 'Saya belajar di pagi hari.' },
          ],
          tips: 'Trik: AT = jam tepat (kecil & spesifik), IN = periode lama (bulan/tahun/musim), ON = hari & tanggal.',
        },
        {
          heading: 'Preposisi Tempat',
          explanation: `AT — lokasi/titik tertentu:
  • at school, at work, at home, at the station

IN — di dalam ruang/area:
  • in the room, in Jakarta, in Indonesia, in the box

ON — di atas permukaan:
  • on the table, on the wall, on the floor, on the bus`,
          examples: [
            { en: 'She is at the doctor\'s.', id: 'Dia sedang di dokter.' },
            { en: 'The keys are on the table.', id: 'Kuncinya ada di atas meja.' },
            { en: 'We live in Bandung.', id: 'Kami tinggal di Bandung.' },
            { en: 'The cat is in the box.', id: 'Kucingnya ada di dalam kotak.' },
          ],
        },
        {
          heading: 'Preposisi Lain yang Umum',
          explanation: `• UNDER: di bawah (under the bed)
• NEXT TO / BESIDE: di sebelah (next to the bank)
• BEHIND: di belakang (behind the house)
• IN FRONT OF: di depan (in front of the school)
• BETWEEN: di antara dua benda (between the chair and the table)
• NEAR: dekat (near the park)`,
          examples: [
            { en: 'The cat is under the chair.', id: 'Kucing itu ada di bawah kursi.' },
            { en: 'The pharmacy is next to the bank.', id: 'Apotek itu ada di sebelah bank.' },
            { en: 'My school is near my house.', id: 'Sekolahku dekat dengan rumahku.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'The meeting is ___ Monday.', answer: 'on', options: ['at', 'in', 'on', 'by'] },
        { type: 'mcq', question: 'She was born ___ 1995.', answer: 'in', options: ['at', 'in', 'on', 'from'] },
        { type: 'fill', question: 'The class starts ___ 9 o\'clock.', answer: 'at' },
        { type: 'mcq', question: 'I study ___ the morning.', answer: 'in', options: ['at', 'in', 'on', 'by'] },
        { type: 'fill', question: 'The book is ___ the table.', answer: 'on' },
        { type: 'mcq', question: 'She lives ___ Jakarta.', answer: 'in', options: ['at', 'in', 'on', 'to'] },
        { type: 'mcq', question: 'The cat is ___ the bed.', answer: 'under', options: ['on', 'in', 'under', 'behind'] },
        { type: 'fill', question: 'We\'ll see you ___ Christmas.', answer: 'at' },
        { type: 'mcq', question: 'The bank is ___ the pharmacy ___ the supermarket.', answer: 'between, and', options: ['between, and', 'next to, and', 'in front of, behind', 'behind, and'] },
        { type: 'reorder', question: 'Susun menjadi kalimat:', words: ['at', 'is', 'She', 'the', 'moment', 'home', 'the'], answer: 'She is at home at the moment.' },
      ],
    },

    // ── 6. Nouns: Singular & Plural ───────────────────────────
    {
      id: 'nouns-plural',
      level: 'A1',
      title: 'Nouns: Singular & Plural',
      icon: '📦',
      shortDesc: 'Cara membentuk kata benda tunggal dan jamak.',
      sections: [
        {
          heading: 'Aturan Umum Plural',
          explanation: `Sebagian besar kata benda → tambahkan -s:
• book → books, car → cars, dog → dogs

Berakhir -s, -ss, -sh, -ch, -x, -z → tambahkan -es:
• bus → buses, class → classes, dish → dishes, watch → watches, box → boxes

Berakhir konsonan + y → ganti y dengan -ies:
• city → cities, baby → babies, country → countries

Berakhir -f atau -fe → ganti dengan -ves (beberapa):
• leaf → leaves, knife → knives, wife → wives
(Pengecualian: roof → roofs, belief → beliefs)

Berakhir -o → beberapa tambah -es:
• tomato → tomatoes, potato → potatoes
• (Tapi: photo → photos, piano → pianos)`,
          examples: [
            { en: 'one book → two books', id: 'satu buku → dua buku' },
            { en: 'one city → five cities', id: 'satu kota → lima kota' },
            { en: 'one leaf → many leaves', id: 'satu daun → banyak daun' },
            { en: 'one box → three boxes', id: 'satu kotak → tiga kotak' },
          ],
        },
        {
          heading: 'Irregular Plurals',
          explanation: 'Beberapa kata benda punya bentuk jamak yang tidak beraturan. Harus dihafal!',
          examples: [
            { en: 'man → men', id: 'laki-laki → laki-laki (jamak)' },
            { en: 'woman → women', id: 'perempuan → perempuan (jamak)' },
            { en: 'child → children', id: 'anak → anak-anak' },
            { en: 'tooth → teeth', id: 'gigi → gigi (jamak)' },
            { en: 'foot → feet', id: 'kaki → kaki (jamak)' },
            { en: 'mouse → mice', id: 'tikus → tikus (jamak)' },
            { en: 'person → people', id: 'orang → orang-orang' },
          ],
        },
        {
          heading: 'Uncountable Nouns',
          explanation: `Kata benda tak dapat dihitung (uncountable) tidak bisa dibuat jamak dan selalu dianggap tunggal:
• water, milk, rice, sugar, money, information, advice, furniture, homework, news`,
          examples: [
            { en: 'Water is important. (bukan: waters)', id: 'Air itu penting.' },
            { en: 'I need some information.', id: 'Saya butuh beberapa informasi.' },
            { en: 'The furniture is expensive.', id: 'Furniturnya mahal.' },
          ],
          tips: 'Gunakan "some" untuk uncountable dan jamak. Gunakan "much" untuk uncountable, "many" untuk countable.',
        },
      ],
      quiz: [
        { type: 'mcq', question: 'Apa bentuk jamak dari "child"?', answer: 'children', options: ['childs', 'childes', 'children', 'childrens'] },
        { type: 'fill', question: 'Bentuk jamak dari "city" adalah ___', answer: 'cities' },
        { type: 'mcq', question: 'Apa bentuk jamak dari "knife"?', answer: 'knives', options: ['knifes', 'knives', 'knife', 'knifees'] },
        { type: 'mcq', question: '"Information" adalah kata benda ___', answer: 'uncountable', options: ['countable', 'uncountable', 'irregular', 'plural'] },
        { type: 'fill', question: 'Bentuk jamak dari "tooth" adalah ___', answer: 'teeth' },
        { type: 'mcq', question: 'Kalimat yang benar adalah:', answer: 'There are three boxes on the table.', options: ['There are three boxs on the table.', 'There are three boxies on the table.', 'There are three boxes on the table.', 'There are three box on the table.'] },
        { type: 'fill', question: 'Bentuk jamak dari "photo" adalah ___', answer: 'photos' },
        { type: 'mcq', question: 'Apa bentuk jamak dari "woman"?', answer: 'women', options: ['womans', 'womes', 'women', 'womens'] },
        { type: 'fill', question: 'Bentuk jamak dari "watch" adalah ___', answer: 'watches' },
        { type: 'mcq', question: 'Pilih yang benar:', answer: 'The news is good today.', options: ['The news are good today.', 'The news is good today.', 'The newses are good today.', 'The new is good today.'] },
      ],
    },

    // ── 7. Pronouns ──────────────────────────────────────────
    {
      id: 'pronouns',
      level: 'A1',
      title: 'Pronouns (Kata Ganti)',
      icon: '👤',
      shortDesc: 'Personal, possessive, dan object pronouns.',
      sections: [
        {
          heading: 'Personal Pronouns (Subjek)',
          explanation: `Digunakan sebagai subjek kalimat:
I (saya), You (kamu/Anda), He (dia ♂), She (dia ♀), It (itu/benda), We (kami/kita), They (mereka)`,
          examples: [
            { en: 'I am a student. She is my friend.', id: 'Saya pelajar. Dia temanku.' },
            { en: 'They are from Surabaya.', id: 'Mereka dari Surabaya.' },
            { en: 'It is very hot today.', id: 'Hari ini sangat panas.' },
          ],
        },
        {
          heading: 'Object Pronouns',
          explanation: `Digunakan sebagai objek kalimat (setelah kata kerja atau preposisi):
me, you, him, her, it, us, them`,
          examples: [
            { en: 'Can you help me?', id: 'Bisakah kamu membantuku?' },
            { en: 'I like him a lot.', id: 'Saya sangat menyukainya.' },
            { en: 'She gave us a gift.', id: 'Dia memberi kami hadiah.' },
            { en: 'Look at them!', id: 'Lihat mereka!' },
          ],
        },
        {
          heading: 'Possessive Adjectives & Pronouns',
          explanation: `Possessive Adjectives (sebelum kata benda):
my, your, his, her, its, our, their

Possessive Pronouns (berdiri sendiri, tanpa kata benda):
mine, yours, his, hers, its, ours, theirs`,
          examples: [
            { en: 'This is my book. → This book is mine.', id: 'Ini bukuku. → Buku ini milikku.' },
            { en: 'Is this your bag? → Is this bag yours?', id: 'Apakah ini tasmu? → Apakah tas ini milikmu?' },
            { en: 'Her phone is new. → That phone is hers.', id: 'Ponselnya baru. → Ponsel itu miliknya (perempuan).' },
          ],
        },
        {
          heading: 'Reflexive Pronouns',
          explanation: `Digunakan ketika subjek dan objek adalah orang yang sama:
myself, yourself, himself, herself, itself, ourselves, yourselves, themselves`,
          examples: [
            { en: 'I hurt myself.', id: 'Saya melukai diri sendiri.' },
            { en: 'She made the cake herself.', id: 'Dia membuat kue itu sendiri.' },
            { en: 'They enjoyed themselves at the party.', id: 'Mereka menikmati diri mereka sendiri di pesta.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: '___ is my best friend. (Referring to a male)', answer: 'He', options: ['She', 'He', 'They', 'It'] },
        { type: 'fill', question: 'Can you help ___ ? (referring to me)', answer: 'me' },
        { type: 'mcq', question: 'This is not my phone. It\'s ___ (milik dia, perempuan).', answer: 'hers', options: ['her', 'his', 'hers', 'their'] },
        { type: 'mcq', question: 'She cut ___ while cooking.', answer: 'herself', options: ['her', 'herself', 'hers', 'she'] },
        { type: 'fill', question: 'I like ___ dog. It\'s very cute.', answer: 'my' },
        { type: 'mcq', question: 'These are not your shoes. They\'re ___ (milik kami).', answer: 'ours', options: ['us', 'our', 'ours', 'we'] },
        { type: 'fill', question: 'Please give ___ the book. (referring to him)', answer: 'him' },
        { type: 'mcq', question: 'The dog wagged ___ tail.', answer: 'its', options: ['it', 'his', 'its', 'their'] },
        { type: 'reorder', question: 'Susun menjadi kalimat:', words: ['gave', 'us', 'She', 'gift', 'a'], answer: 'She gave us a gift.' },
        { type: 'fill', question: 'We painted the house ___. (kita sendiri)', answer: 'ourselves' },
      ],
    },

    // ── 8. Adjectives ─────────────────────────────────────────
    {
      id: 'adjectives',
      level: 'A2',
      title: 'Adjectives (Kata Sifat)',
      icon: '🎨',
      shortDesc: 'Menggunakan dan membandingkan kata sifat.',
      sections: [
        {
          heading: 'Penggunaan Adjective',
          explanation: `Adjective mendeskripsikan kata benda. Letaknya:
1. Sebelum kata benda (attributive): a beautiful flower
2. Setelah to be (predicative): The flower is beautiful.

Urutan adjective sebelum kata benda:
Opinion → Size → Age → Shape → Colour → Origin → Material → Noun`,
          examples: [
            { en: 'It is a beautiful, small, old, round, red, French, wooden table.', id: 'Itu meja kayu, Prancis, merah, bulat, tua, kecil yang indah.' },
            { en: 'She wore a lovely blue dress.', id: 'Dia memakai gaun biru yang indah.' },
            { en: 'The food is hot and delicious.', id: 'Makanannya panas dan lezat.' },
          ],
        },
        {
          heading: 'Comparative (Perbandingan)',
          explanation: `Membandingkan dua benda/orang:
• Adjective pendek (1 suku kata): + -er + than
  (big → bigger, tall → taller, hot → hotter)
• Adjective panjang (2+ suku kata): more + adj + than
  (beautiful → more beautiful, expensive → more expensive)
• Irregular: good → better, bad → worse, far → farther/further`,
          examples: [
            { en: 'He is taller than his brother.', id: 'Dia lebih tinggi dari saudaranya.' },
            { en: 'This phone is more expensive than that one.', id: 'Ponsel ini lebih mahal dari yang itu.' },
            { en: 'The weather is better today.', id: 'Cuaca lebih baik hari ini.' },
          ],
        },
        {
          heading: 'Superlative (Paling...)',
          explanation: `Menyatakan yang paling di antara semua:
• Adjective pendek: the + adj + -est
  (big → the biggest, tall → the tallest)
• Adjective panjang: the most + adj
  (beautiful → the most beautiful)
• Irregular: good → the best, bad → the worst`,
          examples: [
            { en: 'She is the smartest student in class.', id: 'Dia murid terpandai di kelas.' },
            { en: 'Mount Everest is the highest mountain in the world.', id: 'Gunung Everest adalah gunung tertinggi di dunia.' },
            { en: 'This is the most delicious cake I have ever eaten.', id: 'Ini kue paling lezat yang pernah saya makan.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: 'She has a ___ red dress. (beautiful)', answer: 'beautiful red', options: ['red beautiful', 'beautiful red', 'red beauty', 'beautifully red'] },
        { type: 'fill', question: 'He is ___ (tall) than his father.', answer: 'taller' },
        { type: 'mcq', question: 'This exercise is ___ (difficult) than the last one.', answer: 'more difficult', options: ['difficulter', 'more difficult', 'most difficult', 'difficultly'] },
        { type: 'fill', question: 'She is the ___ (good) student in the class.', answer: 'best' },
        { type: 'mcq', question: 'This is the ___ (bad) film I have ever seen.', answer: 'worst', options: ['baddest', 'more bad', 'most bad', 'worst'] },
        { type: 'fill', question: 'Today is ___ (hot) than yesterday.', answer: 'hotter' },
        { type: 'mcq', question: 'She speaks ___ (fluent) English than me.', answer: 'more fluent', options: ['fluenter', 'most fluent', 'more fluent', 'fluentest'] },
        { type: 'reorder', question: 'Susun menjadi kalimat:', words: ['fastest', 'the', 'is', 'He', 'runner', 'in', 'school', 'the'], answer: 'He is the fastest runner in the school.' },
        { type: 'fill', question: 'Gold is ___ (expensive) than silver.', answer: 'more expensive' },
        { type: 'mcq', question: 'Which is correct?', answer: 'She is the most intelligent person I know.', options: ['She is the intelligentest person I know.', 'She is more intelligent person I know.', 'She is the most intelligent person I know.', 'She is most intelligent person I know.'] },
      ],
    },

    // ── 9. Question Words (WH-Questions) ──────────────────────
    {
      id: 'wh-questions',
      level: 'A1',
      title: 'WH-Questions',
      icon: '❓',
      shortDesc: 'Cara membuat pertanyaan dengan what, where, when, dll.',
      sections: [
        {
          heading: 'Kata Tanya',
          explanation: `• WHAT — apa / apakah (benda, informasi)
• WHERE — di mana (tempat)
• WHEN — kapan (waktu)
• WHO — siapa (orang, sebagai subjek)
• WHOM — siapa (orang, sebagai objek) — formal
• WHICH — yang mana (pilihan)
• WHY — mengapa (alasan)
• HOW — bagaimana (cara, kondisi)
• HOW MANY — berapa banyak (countable)
• HOW MUCH — berapa banyak (uncountable) / berapa harganya`,
          examples: [
            { en: 'What is your name?', id: 'Siapa namamu?' },
            { en: 'Where do you live?', id: 'Di mana kamu tinggal?' },
            { en: 'When is your birthday?', id: 'Kapan ulang tahunmu?' },
            { en: 'Who is your teacher?', id: 'Siapa gurumu?' },
            { en: 'Why are you late?', id: 'Kenapa kamu terlambat?' },
            { en: 'How are you?', id: 'Bagaimana kabarmu?' },
          ],
        },
        {
          heading: 'Struktur WH-Questions',
          explanation: `WH-word + auxiliary + subject + main verb?

Untuk Present Simple: WH-word + do/does + subject + V1?
Untuk Past Simple: WH-word + did + subject + V1?
Untuk To Be: WH-word + am/is/are + subject?`,
          examples: [
            { en: 'What do you eat for breakfast?', id: 'Apa yang kamu makan untuk sarapan?' },
            { en: 'Where did she go last night?', id: 'Ke mana dia pergi tadi malam?' },
            { en: 'How many brothers do you have?', id: 'Berapa saudara laki-laki yang kamu punya?' },
            { en: 'How much does this cost?', id: 'Berapa harga ini?' },
          ],
          tips: 'Jika WH-word adalah SUBJEK kalimat (menggantikan subjek), tidak perlu do/does/did: "Who called you?" (Who = subjek, bukan "Who did call you?")',
        },
      ],
      quiz: [
        { type: 'mcq', question: '___ is your name?', answer: 'What', options: ['Where', 'What', 'Who', 'When'] },
        { type: 'mcq', question: '___ do you live? — I live in Bandung.', answer: 'Where', options: ['When', 'Why', 'Where', 'Which'] },
        { type: 'fill', question: '___ is she crying? — Because she is sad.', answer: 'Why' },
        { type: 'mcq', question: '___ did you go last weekend?', answer: 'Where', options: ['Who', 'Where', 'What', 'How'] },
        { type: 'fill', question: '___ many students are in the class?', answer: 'How' },
        { type: 'mcq', question: '___ is your birthday? — It\'s on 15 March.', answer: 'When', options: ['Where', 'What', 'Who', 'When'] },
        { type: 'mcq', question: '___ much does the ticket cost?', answer: 'How', options: ['What', 'Which', 'How', 'Where'] },
        { type: 'fill', question: '___ called you? — My mother did.', answer: 'Who' },
        { type: 'reorder', question: 'Susun menjadi pertanyaan:', words: ['you', 'do', 'What', 'do', 'job', 'your', 'for', '?'], answer: 'What do you do for your job?' },
        { type: 'mcq', question: '___ book do you prefer — the red one or the blue one?', answer: 'Which', options: ['What', 'Who', 'Which', 'How'] },
      ],
    },

    // ── 10. Modal Verbs (can, must, should) ──────────────────
    {
      id: 'modal-verbs',
      level: 'A2',
      title: 'Modal Verbs',
      icon: '⚙️',
      shortDesc: 'Can, could, must, have to, should, may, might.',
      sections: [
        {
          heading: 'CAN & COULD',
          explanation: `CAN → kemampuan saat ini, izin informal
COULD → kemampuan masa lalu, permintaan sopan`,
          examples: [
            { en: 'She can speak three languages.', id: 'Dia bisa berbicara tiga bahasa.' },
            { en: 'Can I use your pen?', id: 'Bolehkah saya memakai penamu?' },
            { en: 'I could swim when I was five.', id: 'Saya bisa berenang ketika saya berumur lima tahun.' },
            { en: 'Could you help me, please?', id: 'Bisakah kamu membantuku?' },
          ],
        },
        {
          heading: 'MUST & HAVE TO',
          explanation: `Keduanya menyatakan kewajiban, tapi:
MUST → kewajiban dari diri sendiri atau pembicara (internal)
HAVE TO → kewajiban dari luar (aturan, orang lain)

Negatif berbeda maknanya!
MUST NOT (mustn't) → DILARANG (prohibition)
DON'T HAVE TO → tidak wajib (tidak harus)`,
          examples: [
            { en: 'You must stop smoking. (kewajiban moral)', id: 'Kamu harus berhenti merokok.' },
            { en: 'I have to wear a uniform at work. (aturan kantor)', id: 'Saya harus memakai seragam di tempat kerja.' },
            { en: 'You mustn\'t park here. (DILARANG)', id: 'Kamu dilarang parkir di sini.' },
            { en: 'You don\'t have to come. (tidak wajib, tapi boleh)', id: 'Kamu tidak harus datang.' },
          ],
        },
        {
          heading: 'SHOULD',
          explanation: `SHOULD → saran, rekomendasi, atau hal yang dianggap benar
SHOULDN'T → saran untuk tidak melakukan sesuatu`,
          examples: [
            { en: 'You should drink more water.', id: 'Kamu sebaiknya minum lebih banyak air.' },
            { en: 'She shouldn\'t eat too much sugar.', id: 'Dia sebaiknya tidak makan terlalu banyak gula.' },
            { en: 'Should I call the doctor?', id: 'Haruskah saya menghubungi dokter?' },
          ],
        },
        {
          heading: 'MAY & MIGHT',
          explanation: `MAY → kemungkinan sekitar 50%, izin formal
MIGHT → kemungkinan lebih kecil (<50%)`,
          examples: [
            { en: 'It may rain tomorrow.', id: 'Mungkin akan hujan besok.' },
            { en: 'She might be at home. (tidak yakin)', id: 'Mungkin dia ada di rumah.' },
            { en: 'May I come in?', id: 'Bolehkah saya masuk?' },
          ],
          tips: 'Modal verbs selalu diikuti V1 (bare infinitive) tanpa to. Selalu: can do, must do, should do — BUKAN can to do ❌',
        },
      ],
      quiz: [
        { type: 'mcq', question: 'She ___ speak English very well.', answer: 'can', options: ['can', 'cans', 'is able', 'could to'] },
        { type: 'mcq', question: 'You ___ smoke in this area. (DILARANG)', answer: "mustn't", options: ["don't have to", "mustn't", "shouldn't", "can't"] },
        { type: 'fill', question: 'You ___ drink more water. It\'s good for your health.', answer: 'should' },
        { type: 'mcq', question: 'I ___ wear a tie at work. It\'s a rule.', answer: 'have to', options: ['must', 'have to', 'should', 'might'] },
        { type: 'fill', question: 'It ___ rain tomorrow. I\'m not sure.', answer: 'might' },
        { type: 'mcq', question: 'You ___ bring your umbrella. It\'s optional.', answer: "don't have to", options: ["mustn't", "can't", "don't have to", "shouldn't"] },
        { type: 'fill', question: '___ you help me with this, please?', answer: 'Could' },
        { type: 'mcq', question: 'She ___ cook very well when she was young.', answer: 'could', options: ['can', 'could', 'must', 'should'] },
        { type: 'reorder', question: 'Susun menjadi kalimat:', words: ['should', 'You', "n't", 'late', 'be'], answer: "You shouldn't be late." },
        { type: 'mcq', question: '___ I borrow your book? (formal/polite)', answer: 'May', options: ['Can', 'May', 'Must', 'Should'] },
      ],
    },

    // ── 11. Present Continuous Tense ──────────────────────────
    {
      id: 'present-continuous',
      level: 'A2',
      title: 'Present Continuous Tense',
      icon: '🔄',
      shortDesc: 'Menyatakan kejadian yang sedang berlangsung sekarang.',
      sections: [
        {
          heading: 'Penggunaan',
          explanation: `Present Continuous (be + V-ing) digunakan untuk:
1. Kejadian yang sedang berlangsung SEKARANG
2. Situasi sementara (bukan kebiasaan)
3. Rencana yang sudah pasti di masa depan (dengan kata waktu)
Kata kunci: now, at the moment, right now, today, this week`,
          examples: [
            { en: 'She is reading a book right now.', id: 'Dia sedang membaca buku sekarang.' },
            { en: 'I am studying English this semester. (sementara)', id: 'Saya sedang belajar bahasa Inggris semester ini.' },
            { en: 'We are meeting them tomorrow. (rencana)', id: 'Kami akan menemui mereka besok.' },
          ],
        },
        {
          heading: 'Rumus',
          explanation: `(+) Subject + am/is/are + V-ing
(−) Subject + am/is/are + not + V-ing
(?) Am/Is/Are + Subject + V-ing?`,
          examples: [
            { en: 'He is working late tonight.', id: 'Dia bekerja larut malam ini.' },
            { en: 'They are not watching TV.', id: 'Mereka tidak sedang menonton TV.' },
            { en: 'Are you listening to me?', id: 'Apakah kamu mendengarkanku?' },
          ],
        },
        {
          heading: 'Aturan Penulisan -ing',
          explanation: `• Kebanyakan kata kerja: tambah -ing (eat → eating, read → reading)
• Berakhir -e (silent): hapus e + ing (make → making, write → writing)
• Satu suku kata, KVK: dobel konsonan akhir + ing (run → running, sit → sitting, swim → swimming)
• Berakhir -ie: ganti ie → y + ing (lie → lying, die → dying)`,
          examples: [
            { en: 'come → coming (bukan comeing)', id: '' },
            { en: 'sit → sitting (bukan siting)', id: '' },
            { en: 'study → studying (y dipertahankan)', id: '' },
          ],
        },
        {
          heading: 'Stative Verbs (Tidak Dipakai dalam Continuous)',
          explanation: `Beberapa kata kerja "keadaan" (bukan aksi) tidak bisa dipakai dalam bentuk continuous:
• Perasaan/emosi: love, hate, like, prefer, want, need
• Pikiran/pendapat: know, believe, think (berpendapat), understand, remember, forget
• Indera: see, hear, smell, taste
• Kepemilikan: have, own, belong to, possess`,
          examples: [
            { en: 'I know the answer. (bukan: I am knowing ❌)', id: 'Saya tahu jawabannya.' },
            { en: 'She loves chocolate. (bukan: She is loving ❌)', id: 'Dia suka coklat.' },
          ],
          tips: '"Think" bisa jadi continuous jika berarti "sedang berpikir" bukan "berpendapat": I am thinking about you. vs I think it\'s a good idea.',
        },
      ],
      quiz: [
        { type: 'mcq', question: 'She ___ (read) a book right now.', answer: 'is reading', options: ['reads', 'is reading', 'reading', 'are reading'] },
        { type: 'fill', question: 'I ___ (study) for the exam at the moment.', answer: 'am studying' },
        { type: 'mcq', question: 'They ___ (not/watch) TV now.', answer: "aren't watching", options: ["don't watch", "aren't watching", "not watching", "isn't watching"] },
        { type: 'mcq', question: '___ (run) → correct -ing form', answer: 'running', options: ['runing', 'running', 'runeing', 'runng'] },
        { type: 'fill', question: '___ you coming to the party tonight?', answer: 'Are' },
        { type: 'mcq', question: 'I ___ the answer. (know — stative verb)', answer: 'know', options: ['am knowing', 'know', 'knowing', 'knows'] },
        { type: 'fill', question: 'She ___ (make) dinner right now.', answer: 'is making' },
        { type: 'mcq', question: 'We ___ (go) to Bali next week. (rencana)', answer: 'are going', options: ['go', 'going', 'are going', 'will going'] },
        { type: 'reorder', question: 'Susun menjadi kalimat:', words: ['is', 'right', 'He', 'now', 'sleeping'], answer: 'He is sleeping right now.' },
        { type: 'mcq', question: '___ (sit) → correct -ing form', answer: 'sitting', options: ['siting', 'sitting', 'siteing', 'sits'] },
      ],
    },

    // ── 12. Future: will & going to ───────────────────────────
    {
      id: 'future',
      level: 'A2',
      title: 'Future: will & going to',
      icon: '🔮',
      shortDesc: 'Dua cara utama menyatakan masa depan.',
      sections: [
        {
          heading: 'WILL — Future Spontan & Prediksi',
          explanation: `Gunakan WILL untuk:
1. Keputusan spontan (dibuat saat berbicara)
2. Prediksi tanpa bukti nyata (perasaan/opini)
3. Janji, tawaran, ancaman
4. Fakta masa depan yang pasti

Rumus: Subject + will + V1`,
          examples: [
            { en: 'I\'ll have the coffee, please. (keputusan spontan)', id: 'Saya mau kopi, tolong.' },
            { en: 'I think it will rain tomorrow. (prediksi)', id: 'Saya pikir besok akan hujan.' },
            { en: 'I\'ll call you later. (janji)', id: 'Saya akan meneleponmu nanti.' },
          ],
        },
        {
          heading: 'GOING TO — Rencana & Prediksi Berdasarkan Bukti',
          explanation: `Gunakan GOING TO untuk:
1. Rencana yang sudah diputuskan sebelumnya
2. Prediksi berdasarkan bukti yang terlihat sekarang

Rumus: Subject + am/is/are + going to + V1`,
          examples: [
            { en: 'I\'m going to visit my parents this weekend. (rencana)', id: 'Saya akan mengunjungi orang tuaku akhir pekan ini.' },
            { en: 'Look at those clouds! It\'s going to rain. (bukti nyata)', id: 'Lihat awan itu! Akan hujan.' },
            { en: 'She\'s going to have a baby. (rencana/situasi nyata)', id: 'Dia akan punya bayi.' },
          ],
          tips: 'Cara mudah: "Will" = spontan atau janji. "Going to" = sudah direncanakan sebelumnya atau ada bukti nyata.',
        },
        {
          heading: 'Kalimat Negatif & Tanya',
          explanation: `WILL:
(−) Subject + will not (won't) + V1
(?) Will + Subject + V1?

GOING TO:
(−) Subject + am/is/are + not + going to + V1
(?) Am/Is/Are + Subject + going to + V1?`,
          examples: [
            { en: 'I won\'t be late, I promise.', id: 'Saya tidak akan terlambat, saya janji.' },
            { en: 'Will you come to my party?', id: 'Apakah kamu akan datang ke pestaku?' },
            { en: 'She\'s not going to study tonight.', id: 'Dia tidak akan belajar malam ini.' },
          ],
        },
      ],
      quiz: [
        { type: 'mcq', question: '"I\'m cold." → "I ___ get you a blanket."', answer: "I'll", options: ["I'm going to", "I'll", "I going to", "I will to"] },
        { type: 'mcq', question: 'She ___ (study) in London next year. (sudah direncanakan)', answer: 'is going to study', options: ['will study', 'is going to study', 'studies', 'going to study'] },
        { type: 'fill', question: 'Look! He ___ (fall)! (bukti nyata, pakai going to)', answer: 'is going to fall' },
        { type: 'mcq', question: 'I think Real Madrid ___ win the match. (prediksi opini)', answer: 'will', options: ['are going to', 'will', 'going to', 'is going to'] },
        { type: 'fill', question: 'They ___ not come to the meeting. (will negative)', answer: "won't" },
        { type: 'mcq', question: '___ you help me with this? (spontan, tawaran)', answer: 'Will', options: ['Are you going to', 'Will', 'Going to', 'Shall to'] },
        { type: 'fill', question: 'I ___ (visit) my grandmother this Sunday. (rencana)', answer: "am going to visit" },
        { type: 'mcq', question: 'She ___ not ___ study tonight. (going to negatif)', answer: 'is, going to', options: ['will, to', 'is, going to', "won't", 'are, going to'] },
        { type: 'reorder', question: 'Susun menjadi kalimat:', words: ['going', 'are', 'We', 'to', 'Paris', 'next', 'to', 'go', 'month'], answer: 'We are going to go to Paris next month.' },
        { type: 'mcq', question: 'Prediksi berdasarkan bukti: "Those bags look very heavy. She ___ drop them."', answer: "is going to", options: ["will", "is going to", "going to", "shall"] },
      ],
    },
  ];

  // ─────────────────────────────────────────────────────────────
  // Public API
  // ─────────────────────────────────────────────────────────────
  return {
    getTopics() {
      return TOPICS;
    },
    getTopic(id) {
      return TOPICS.find(t => t.id === id) || null;
    },
    getTopicsByLevel(level) {
      return TOPICS.filter(t => t.level === level);
    },
    getLevels() {
      const lvls = [...new Set(TOPICS.map(t => t.level))];
      return lvls;
    },
    /** Return quiz questions shuffled */
    getQuiz(topicId, count = 10) {
      const topic = this.getTopic(topicId);
      if (!topic) return [];
      const all = [...topic.quiz];
      for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]];
      }
      return all.slice(0, Math.min(count, all.length));
    },
  };
})();
