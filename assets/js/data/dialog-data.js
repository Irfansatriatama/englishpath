/**
 * EnglishPath — Dialog Data A1–A2
 * Fase 7 — v0.8.0
 *
 * Struktur:
 *  DIALOG_DATA.getScenes()        → array semua scene
 *  DIALOG_DATA.getScene(id)       → satu scene by id
 *  DIALOG_DATA.getByCategory(cat) → filter by category
 *
 * Scene: { id, category, level, title, icon, desc, setting,
 *          lines[], vocabulary[], exercises[] }
 *
 * line:    { speaker:'A'|'B', name, text, translation }
 * exercise: { type:'mcq'|'fill'|'roleplay', question, answer, options? }
 */

const DIALOG_DATA = (function () {
  'use strict';

  const SCENES = [

    // ═══════════════════════════════════════════════════════
    // CATEGORY: Greetings & Introductions
    // ═══════════════════════════════════════════════════════

    {
      id: 'greet-01',
      category: 'greetings',
      level: 'A1',
      title: 'First Day at School',
      icon: '🏫',
      desc: 'Perkenalan pertama kali di sekolah.',
      setting: 'Di kelas baru — hari pertama semester',
      lines: [
        { speaker: 'A', name: 'Sarah', text: 'Hi! I\'m Sarah. What\'s your name?', translation: 'Hai! Saya Sarah. Siapa namamu?' },
        { speaker: 'B', name: 'Tom', text: 'Hi Sarah! I\'m Tom. Nice to meet you.', translation: 'Hai Sarah! Saya Tom. Senang bertemu denganmu.' },
        { speaker: 'A', name: 'Sarah', text: 'Nice to meet you too! Where are you from?', translation: 'Senang bertemu denganmu juga! Kamu dari mana?' },
        { speaker: 'B', name: 'Tom', text: 'I\'m from Bandung. How about you?', translation: 'Saya dari Bandung. Bagaimana denganmu?' },
        { speaker: 'A', name: 'Sarah', text: 'I\'m from Jakarta. Is this your first day?', translation: 'Saya dari Jakarta. Apakah ini harimu yang pertama?' },
        { speaker: 'B', name: 'Tom', text: 'Yes, it is. I\'m a little nervous!', translation: 'Ya, betul. Saya sedikit gugup!' },
        { speaker: 'A', name: 'Sarah', text: 'Don\'t worry. This school is great!', translation: 'Jangan khawatir. Sekolah ini luar biasa!' },
      ],
      vocabulary: [
        { word: 'nice to meet you', meaning: 'senang bertemu denganmu (sapaan formal)' },
        { word: 'where are you from?', meaning: 'kamu dari mana?' },
        { word: 'nervous', meaning: 'gugup' },
        { word: 'don\'t worry', meaning: 'jangan khawatir' },
      ],
      exercises: [
        { type: 'mcq', question: 'Tom is from ___', answer: 'Bandung', options: ['Jakarta', 'Bandung', 'Surabaya', 'Bali'] },
        { type: 'mcq', question: 'How does Tom feel on his first day?', answer: 'nervous', options: ['happy', 'bored', 'nervous', 'angry'] },
        { type: 'fill', question: '"___ to meet you!" — Complete the greeting.', answer: 'Nice' },
        { type: 'fill', question: 'Sarah: "Where are you ___?" Tom: "I\'m from Bandung."', answer: 'from' },
        { type: 'mcq', question: '"Is this your first day?" → The correct answer is:', answer: 'Yes, it is.', options: ['Yes, I am.', 'Yes, it is.', 'Yes, they are.', 'Yes, I do.'] },
      ],
    },

    {
      id: 'greet-02',
      category: 'greetings',
      level: 'A1',
      title: 'Meeting a Neighbour',
      icon: '🏠',
      desc: 'Berkenalan dengan tetangga baru.',
      setting: 'Di depan rumah — pagi hari',
      lines: [
        { speaker: 'A', name: 'Mr. Rudi', text: 'Good morning! Are you the new neighbour?', translation: 'Selamat pagi! Apakah kamu tetangga baru?' },
        { speaker: 'B', name: 'Lisa', text: 'Good morning! Yes, I am. My name is Lisa.', translation: 'Selamat pagi! Ya, betul. Nama saya Lisa.' },
        { speaker: 'A', name: 'Mr. Rudi', text: 'Welcome to the neighbourhood! I\'m Rudi.', translation: 'Selamat datang di lingkungan ini! Saya Rudi.' },
        { speaker: 'B', name: 'Lisa', text: 'Thank you, Mr. Rudi. It\'s a nice area.', translation: 'Terima kasih, Pak Rudi. Daerah ini bagus.' },
        { speaker: 'A', name: 'Mr. Rudi', text: 'Do you live alone?', translation: 'Apakah kamu tinggal sendiri?' },
        { speaker: 'B', name: 'Lisa', text: 'No, I live with my family — my husband and two children.', translation: 'Tidak, saya tinggal bersama keluarga saya — suami dan dua anak.' },
        { speaker: 'A', name: 'Mr. Rudi', text: 'Wonderful! If you need anything, please knock on my door.', translation: 'Luar biasa! Jika kamu membutuhkan sesuatu, ketuk saja pintuku.' },
        { speaker: 'B', name: 'Lisa', text: 'Thank you so much! You\'re very kind.', translation: 'Terima kasih banyak! Anda sangat baik.' },
      ],
      vocabulary: [
        { word: 'neighbour', meaning: 'tetangga' },
        { word: 'welcome', meaning: 'selamat datang' },
        { word: 'neighbourhood', meaning: 'lingkungan tempat tinggal' },
        { word: 'knock on the door', meaning: 'mengetuk pintu' },
        { word: 'kind', meaning: 'baik hati' },
      ],
      exercises: [
        { type: 'mcq', question: 'Lisa lives with her ___', answer: 'family', options: ['friends', 'family', 'colleagues', 'alone'] },
        { type: 'fill', question: '"Welcome to the ___!" — Mr. Rudi greets Lisa.', answer: 'neighbourhood' },
        { type: 'mcq', question: '"Do you live alone?" Lisa answers:', answer: 'No, I live with my family.', options: ['Yes, I do.', 'No, I live with my family.', 'No, I am alone.', 'Yes, it is.'] },
        { type: 'fill', question: 'Mr. Rudi says: "If you need anything, please ___ on my door."', answer: 'knock' },
        { type: 'mcq', question: 'The time of this conversation is:', answer: 'morning', options: ['night', 'afternoon', 'morning', 'evening'] },
      ],
    },

    // ═══════════════════════════════════════════════════════
    // CATEGORY: Daily Life
    // ═══════════════════════════════════════════════════════

    {
      id: 'daily-01',
      category: 'daily',
      level: 'A1',
      title: 'At the Café',
      icon: '☕',
      desc: 'Memesan minuman di kafe.',
      setting: 'Sebuah kafe — siang hari',
      lines: [
        { speaker: 'A', name: 'Waiter', text: 'Good afternoon! What would you like?', translation: 'Selamat siang! Apa yang ingin Anda pesan?' },
        { speaker: 'B', name: 'Andi', text: 'Can I have a cup of coffee, please?', translation: 'Bolehkah saya pesan secangkir kopi?' },
        { speaker: 'A', name: 'Waiter', text: 'Hot or iced?', translation: 'Panas atau es?' },
        { speaker: 'B', name: 'Andi', text: 'Iced, please. And how much is it?', translation: 'Es, tolong. Dan berapa harganya?' },
        { speaker: 'A', name: 'Waiter', text: 'It\'s thirty thousand rupiah.', translation: 'Harganya tiga puluh ribu rupiah.' },
        { speaker: 'B', name: 'Andi', text: 'Here you go. Thank you!', translation: 'Ini dia. Terima kasih!' },
        { speaker: 'A', name: 'Waiter', text: 'Thank you! Your coffee will be ready in a few minutes.', translation: 'Terima kasih! Kopi Anda akan siap dalam beberapa menit.' },
      ],
      vocabulary: [
        { word: 'what would you like?', meaning: 'apa yang ingin Anda pesan/inginkan?' },
        { word: 'can I have...?', meaning: 'bolehkah saya mendapatkan...?' },
        { word: 'how much is it?', meaning: 'berapa harganya?' },
        { word: 'here you go', meaning: 'ini dia (menyerahkan sesuatu)' },
        { word: 'in a few minutes', meaning: 'dalam beberapa menit' },
      ],
      exercises: [
        { type: 'mcq', question: 'Andi orders ___ coffee.', answer: 'iced', options: ['hot', 'iced', 'cold', 'warm'] },
        { type: 'fill', question: '"Can I ___ a cup of coffee, please?" — Andi orders.', answer: 'have' },
        { type: 'mcq', question: '"How much is it?" is used to ask about:', answer: 'price', options: ['time', 'distance', 'price', 'weight'] },
        { type: 'fill', question: 'The waiter says: "Your coffee will be ___ in a few minutes."', answer: 'ready' },
        { type: 'mcq', question: 'Andi says "Here you go" when:', answer: 'paying money', options: ['ordering food', 'saying goodbye', 'paying money', 'asking a question'] },
      ],
    },

    {
      id: 'daily-02',
      category: 'daily',
      level: 'A1',
      title: 'At the Supermarket',
      icon: '🛒',
      desc: 'Berbelanja dan bertanya lokasi barang.',
      setting: 'Di supermarket',
      lines: [
        { speaker: 'B', name: 'Dina', text: 'Excuse me. Where is the milk?', translation: 'Permisi. Di mana susunya?' },
        { speaker: 'A', name: 'Staff', text: 'It\'s in aisle three, on the left side.', translation: 'Ada di lorong tiga, di sebelah kiri.' },
        { speaker: 'B', name: 'Dina', text: 'Thank you. Do you have fresh milk?', translation: 'Terima kasih. Apakah ada susu segar?' },
        { speaker: 'A', name: 'Staff', text: 'Yes, we do. It\'s in the refrigerator at the back.', translation: 'Ya, ada. Ada di lemari es di bagian belakang.' },
        { speaker: 'B', name: 'Dina', text: 'Great! How about bread? Is there a bakery here?', translation: 'Bagus! Bagaimana dengan roti? Apakah ada toko roti di sini?' },
        { speaker: 'A', name: 'Staff', text: 'Yes, the bakery is near the entrance.', translation: 'Ya, toko roti ada di dekat pintu masuk.' },
        { speaker: 'B', name: 'Dina', text: 'Perfect. Thank you for your help!', translation: 'Sempurna. Terima kasih atas bantuanmu!' },
        { speaker: 'A', name: 'Staff', text: 'You\'re welcome. Enjoy your shopping!', translation: 'Sama-sama. Selamat berbelanja!' },
      ],
      vocabulary: [
        { word: 'excuse me', meaning: 'permisi (untuk menarik perhatian)' },
        { word: 'aisle', meaning: 'lorong (di supermarket)' },
        { word: 'refrigerator', meaning: 'lemari es / kulkas' },
        { word: 'bakery', meaning: 'toko roti' },
        { word: 'entrance', meaning: 'pintu masuk' },
        { word: 'you\'re welcome', meaning: 'sama-sama (respons dari "thank you")' },
      ],
      exercises: [
        { type: 'mcq', question: 'The milk is in aisle ___', answer: 'three', options: ['one', 'two', 'three', 'four'] },
        { type: 'fill', question: '"___ me. Where is the milk?" — Dina asks politely.', answer: 'Excuse' },
        { type: 'mcq', question: 'The fresh milk is in the ___', answer: 'refrigerator', options: ['shelf', 'bakery', 'refrigerator', 'entrance'] },
        { type: 'fill', question: 'The bakery is near the ___.', answer: 'entrance' },
        { type: 'mcq', question: '"You\'re welcome" is a response to:', answer: 'Thank you', options: ['Hello', 'Sorry', 'Thank you', 'Goodbye'] },
      ],
    },

    {
      id: 'daily-03',
      category: 'daily',
      level: 'A2',
      title: 'Making Plans',
      icon: '📅',
      desc: 'Membuat rencana bersama teman.',
      setting: 'Di telepon — sore hari',
      lines: [
        { speaker: 'A', name: 'Reza', text: 'Hey Mia! Are you free this Saturday?', translation: 'Hei Mia! Apakah kamu bebas Sabtu ini?' },
        { speaker: 'B', name: 'Mia', text: 'I think so. Why? What\'s up?', translation: 'Sepertinya iya. Kenapa? Ada apa?' },
        { speaker: 'A', name: 'Reza', text: 'I\'m going to visit the new museum. Do you want to come?', translation: 'Saya akan mengunjungi museum baru itu. Apakah kamu ingin ikut?' },
        { speaker: 'B', name: 'Mia', text: 'That sounds fun! What time are you going?', translation: 'Kedengarannya menyenangkan! Jam berapa kamu pergi?' },
        { speaker: 'A', name: 'Reza', text: 'I\'m planning to leave at ten in the morning.', translation: 'Saya berencana berangkat jam sepuluh pagi.' },
        { speaker: 'B', name: 'Mia', text: 'Perfect. Should we meet at the museum or at your house?', translation: 'Sempurna. Haruskah kita bertemu di museum atau di rumahmu?' },
        { speaker: 'A', name: 'Reza', text: 'Let\'s meet at the museum entrance. It\'s easier.', translation: 'Ayo bertemu di pintu masuk museum. Lebih mudah.' },
        { speaker: 'B', name: 'Mia', text: 'Okay, see you Saturday! I\'m really looking forward to it.', translation: 'Oke, sampai Sabtu! Saya benar-benar menantikannya.' },
      ],
      vocabulary: [
        { word: 'are you free?', meaning: 'apakah kamu bebas/tidak ada acara?' },
        { word: 'what\'s up?', meaning: 'ada apa? (informal)' },
        { word: 'that sounds fun', meaning: 'kedengarannya menyenangkan' },
        { word: 'I\'m planning to...', meaning: 'saya berencana untuk...' },
        { word: 'looking forward to', meaning: 'menantikan dengan senang hati' },
      ],
      exercises: [
        { type: 'mcq', question: 'Reza is going to visit a ___', answer: 'museum', options: ['park', 'museum', 'mall', 'cinema'] },
        { type: 'fill', question: 'Reza: "I\'m ___ to leave at ten in the morning."', answer: 'planning' },
        { type: 'mcq', question: 'They decide to meet at:', answer: 'the museum entrance', options: ['Reza\'s house', 'Mia\'s house', 'the museum entrance', 'a café'] },
        { type: 'fill', question: '"That ___ fun!" — Mia is excited about the plan.', answer: 'sounds' },
        { type: 'mcq', question: '"I\'m really looking forward to it" means:', answer: 'I\'m excited about it', options: ['I forgot about it', 'I\'m excited about it', 'I\'m worried about it', 'I don\'t want to go'] },
      ],
    },

    // ═══════════════════════════════════════════════════════
    // CATEGORY: Work & School
    // ═══════════════════════════════════════════════════════

    {
      id: 'work-01',
      category: 'work',
      level: 'A2',
      title: 'Job Interview',
      icon: '💼',
      desc: 'Wawancara kerja singkat.',
      setting: 'Di kantor — ruang wawancara',
      lines: [
        { speaker: 'A', name: 'Interviewer', text: 'Good morning! Please, take a seat.', translation: 'Selamat pagi! Silakan duduk.' },
        { speaker: 'B', name: 'Budi', text: 'Good morning. Thank you.', translation: 'Selamat pagi. Terima kasih.' },
        { speaker: 'A', name: 'Interviewer', text: 'So, tell me about yourself.', translation: 'Jadi, ceritakan tentang dirimu.' },
        { speaker: 'B', name: 'Budi', text: 'My name is Budi. I graduated from ITB two years ago. I have experience in software development.', translation: 'Nama saya Budi. Saya lulus dari ITB dua tahun lalu. Saya memiliki pengalaman di bidang pengembangan perangkat lunak.' },
        { speaker: 'A', name: 'Interviewer', text: 'Why do you want to work here?', translation: 'Mengapa kamu ingin bekerja di sini?' },
        { speaker: 'B', name: 'Budi', text: 'Because this company has a great reputation and I want to grow professionally.', translation: 'Karena perusahaan ini memiliki reputasi yang baik dan saya ingin berkembang secara profesional.' },
        { speaker: 'A', name: 'Interviewer', text: 'What are your strengths?', translation: 'Apa kelebihan-kelebihanmu?' },
        { speaker: 'B', name: 'Budi', text: 'I\'m hardworking, detail-oriented, and I work well in a team.', translation: 'Saya pekerja keras, teliti, dan bekerja dengan baik dalam tim.' },
        { speaker: 'A', name: 'Interviewer', text: 'Great! We will contact you within a week.', translation: 'Bagus! Kami akan menghubungimu dalam satu minggu.' },
      ],
      vocabulary: [
        { word: 'take a seat', meaning: 'silakan duduk' },
        { word: 'tell me about yourself', meaning: 'ceritakan tentang dirimu' },
        { word: 'graduated', meaning: 'lulus (dari universitas/sekolah)' },
        { word: 'reputation', meaning: 'reputasi' },
        { word: 'strengths', meaning: 'kelebihan / kekuatan' },
        { word: 'hardworking', meaning: 'pekerja keras' },
        { word: 'detail-oriented', meaning: 'teliti / memperhatikan detail' },
        { word: 'contact', meaning: 'menghubungi' },
      ],
      exercises: [
        { type: 'mcq', question: 'Budi graduated from ITB ___ years ago.', answer: 'two', options: ['one', 'two', 'three', 'four'] },
        { type: 'fill', question: '"Tell me ___ yourself." — Common interview question.', answer: 'about' },
        { type: 'mcq', question: 'Budi wants to work there because of the company\'s:', answer: 'reputation', options: ['location', 'salary', 'reputation', 'size'] },
        { type: 'fill', question: 'Budi says he is ___, detail-oriented, and works well in a team.', answer: 'hardworking' },
        { type: 'mcq', question: 'The interviewer says they will contact Budi:', answer: 'within a week', options: ['today', 'tomorrow', 'within a week', 'next month'] },
      ],
    },

    {
      id: 'work-02',
      category: 'work',
      level: 'A2',
      title: 'At the Office',
      icon: '🏢',
      desc: 'Percakapan sehari-hari di kantor.',
      setting: 'Di kantor — jam kerja',
      lines: [
        { speaker: 'A', name: 'Manager', text: 'Sari, did you finish the report?', translation: 'Sari, sudahkah kamu menyelesaikan laporan itu?' },
        { speaker: 'B', name: 'Sari', text: 'Almost. I need one more hour.', translation: 'Hampir selesai. Saya butuh satu jam lagi.' },
        { speaker: 'A', name: 'Manager', text: 'Okay. The meeting is at three o\'clock. Can you send it before then?', translation: 'Oke. Rapatnya pukul tiga. Bisakah kamu mengirimnya sebelum itu?' },
        { speaker: 'B', name: 'Sari', text: 'Yes, I will send it by two-thirty.', translation: 'Ya, saya akan mengirimnya pukul dua tiga puluh.' },
        { speaker: 'A', name: 'Manager', text: 'Perfect. Also, don\'t forget to add the sales figures.', translation: 'Sempurna. Juga, jangan lupa tambahkan angka penjualan.' },
        { speaker: 'B', name: 'Sari', text: 'Of course. I already have them.', translation: 'Tentu saja. Saya sudah memilikinya.' },
        { speaker: 'A', name: 'Manager', text: 'Great. See you at the meeting.', translation: 'Bagus. Sampai jumpa di rapat.' },
      ],
      vocabulary: [
        { word: 'did you finish...?', meaning: 'sudahkah kamu menyelesaikan...?' },
        { word: 'almost', meaning: 'hampir' },
        { word: 'meeting', meaning: 'rapat / pertemuan' },
        { word: 'by (time)', meaning: 'paling lambat (waktu tertentu)' },
        { word: 'sales figures', meaning: 'angka / data penjualan' },
        { word: 'of course', meaning: 'tentu saja' },
      ],
      exercises: [
        { type: 'mcq', question: 'The meeting is at:', answer: 'three o\'clock', options: ['two o\'clock', 'two-thirty', 'three o\'clock', 'four o\'clock'] },
        { type: 'fill', question: 'Sari will send the report by ___.', answer: 'two-thirty' },
        { type: 'mcq', question: '"Almost" means:', answer: 'not yet done, but close', options: ['completely done', 'not started yet', 'not yet done, but close', 'doing right now'] },
        { type: 'fill', question: 'The manager says: "Don\'t ___ to add the sales figures."', answer: 'forget' },
        { type: 'mcq', question: 'Does Sari have the sales figures?', answer: 'Yes, she already has them.', options: ['No, she needs to find them.', 'Yes, she already has them.', 'She forgot them.', 'She needs to check.'] },
      ],
    },

    // ═══════════════════════════════════════════════════════
    // CATEGORY: Travel & Directions
    // ═══════════════════════════════════════════════════════

    {
      id: 'travel-01',
      category: 'travel',
      level: 'A1',
      title: 'Asking for Directions',
      icon: '🗺️',
      desc: 'Bertanya arah ke suatu tempat.',
      setting: 'Di jalan — siang hari',
      lines: [
        { speaker: 'A', name: 'Tourist', text: 'Excuse me! Can you help me?', translation: 'Permisi! Bisakah kamu membantuku?' },
        { speaker: 'B', name: 'Local', text: 'Sure! What do you need?', translation: 'Tentu! Apa yang kamu butuhkan?' },
        { speaker: 'A', name: 'Tourist', text: 'I\'m looking for the train station. Is it far from here?', translation: 'Saya mencari stasiun kereta. Apakah jauh dari sini?' },
        { speaker: 'B', name: 'Local', text: 'Not very far. Go straight, then turn left at the traffic light.', translation: 'Tidak terlalu jauh. Lurus saja, lalu belok kiri di lampu merah.' },
        { speaker: 'A', name: 'Tourist', text: 'Turn left at the traffic light. Got it! How many minutes?', translation: 'Belok kiri di lampu merah. Mengerti! Berapa menit?' },
        { speaker: 'B', name: 'Local', text: 'About ten minutes on foot.', translation: 'Sekitar sepuluh menit berjalan kaki.' },
        { speaker: 'A', name: 'Tourist', text: 'Thank you so much!', translation: 'Terima kasih banyak!' },
        { speaker: 'B', name: 'Local', text: 'No problem. Have a good trip!', translation: 'Tidak masalah. Selamat bepergian!' },
      ],
      vocabulary: [
        { word: 'I\'m looking for...', meaning: 'saya sedang mencari...' },
        { word: 'is it far?', meaning: 'apakah itu jauh?' },
        { word: 'go straight', meaning: 'jalan lurus' },
        { word: 'turn left / right', meaning: 'belok kiri / kanan' },
        { word: 'traffic light', meaning: 'lampu merah / lampu lalu lintas' },
        { word: 'on foot', meaning: 'berjalan kaki' },
        { word: 'no problem', meaning: 'tidak masalah / sama-sama (informal)' },
      ],
      exercises: [
        { type: 'mcq', question: 'The tourist is looking for the ___', answer: 'train station', options: ['bus stop', 'hospital', 'train station', 'hotel'] },
        { type: 'fill', question: '"Go ___, then turn left at the traffic light."', answer: 'straight' },
        { type: 'mcq', question: 'How long does it take to walk to the station?', answer: 'About ten minutes', options: ['About five minutes', 'About ten minutes', 'About twenty minutes', 'About one hour'] },
        { type: 'fill', question: '"___ left at the traffic light." — Direction instruction.', answer: 'Turn' },
        { type: 'mcq', question: '"On foot" means:', answer: 'by walking', options: ['by car', 'by taxi', 'by walking', 'by bus'] },
      ],
    },

    {
      id: 'travel-02',
      category: 'travel',
      level: 'A2',
      title: 'At the Airport',
      icon: '✈️',
      desc: 'Percakapan di bandara saat check-in.',
      setting: 'Di bandara — konter check-in',
      lines: [
        { speaker: 'A', name: 'Agent', text: 'Good morning! Can I see your passport and ticket, please?', translation: 'Selamat pagi! Bolehkah saya melihat paspor dan tiketmu?' },
        { speaker: 'B', name: 'Rina', text: 'Of course. Here they are.', translation: 'Tentu saja. Ini dia.' },
        { speaker: 'A', name: 'Agent', text: 'Thank you. How many bags are you checking in?', translation: 'Terima kasih. Berapa banyak tas yang akan kamu check in?' },
        { speaker: 'B', name: 'Rina', text: 'Just one suitcase.', translation: 'Hanya satu koper.' },
        { speaker: 'A', name: 'Agent', text: 'Okay. Do you have a window or aisle seat preference?', translation: 'Oke. Apakah kamu punya preferensi kursi jendela atau lorong?' },
        { speaker: 'B', name: 'Rina', text: 'A window seat, please. I love looking at the clouds!', translation: 'Kursi jendela, tolong. Saya suka melihat awan!' },
        { speaker: 'A', name: 'Agent', text: 'I can give you 18A. Here is your boarding pass. The gate is B7.', translation: 'Saya bisa memberikan 18A. Ini boarding pass kamu. Gerbangnya B7.' },
        { speaker: 'B', name: 'Rina', text: 'Thank you! What time does boarding start?', translation: 'Terima kasih! Jam berapa boarding dimulai?' },
        { speaker: 'A', name: 'Agent', text: 'Boarding starts at 9:45. Please be at the gate by 9:30.', translation: 'Boarding dimulai pukul 9:45. Tolong sudah ada di gerbang pukul 9:30.' },
      ],
      vocabulary: [
        { word: 'check in', meaning: 'proses pendaftaran sebelum naik pesawat' },
        { word: 'passport', meaning: 'paspor' },
        { word: 'suitcase', meaning: 'koper' },
        { word: 'window seat', meaning: 'kursi di sebelah jendela' },
        { word: 'aisle seat', meaning: 'kursi di sebelah lorong' },
        { word: 'boarding pass', meaning: 'kartu naik pesawat' },
        { word: 'gate', meaning: 'gerbang keberangkatan' },
        { word: 'boarding', meaning: 'proses naik pesawat' },
      ],
      exercises: [
        { type: 'mcq', question: 'Rina checks in ___ bag(s).', answer: 'one', options: ['one', 'two', 'three', 'no'] },
        { type: 'fill', question: 'Rina wants a ___ seat because she loves looking at clouds.', answer: 'window' },
        { type: 'mcq', question: 'The boarding gate is:', answer: 'B7', options: ['A7', 'B7', '18A', 'B17'] },
        { type: 'fill', question: 'Rina gets seat number ___.', answer: '18A' },
        { type: 'mcq', question: 'Rina should be at the gate by:', answer: '9:30', options: ['9:00', '9:15', '9:30', '9:45'] },
      ],
    },

    // ═══════════════════════════════════════════════════════
    // CATEGORY: Health & Emergency
    // ═══════════════════════════════════════════════════════

    {
      id: 'health-01',
      category: 'health',
      level: 'A2',
      title: 'At the Doctor\'s',
      icon: '🏥',
      desc: 'Konsultasi dengan dokter.',
      setting: 'Di klinik — ruang dokter',
      lines: [
        { speaker: 'A', name: 'Doctor', text: 'Good morning! How can I help you today?', translation: 'Selamat pagi! Ada yang bisa saya bantu hari ini?' },
        { speaker: 'B', name: 'Patient', text: 'Good morning, Doctor. I haven\'t been feeling well for three days.', translation: 'Selamat pagi, Dokter. Saya tidak merasa baik selama tiga hari.' },
        { speaker: 'A', name: 'Doctor', text: 'I\'m sorry to hear that. What are your symptoms?', translation: 'Saya ikut prihatin mendengar itu. Apa gejalamu?' },
        { speaker: 'B', name: 'Patient', text: 'I have a headache, a sore throat, and I feel tired all the time.', translation: 'Saya sakit kepala, radang tenggorokan, dan merasa lelah sepanjang waktu.' },
        { speaker: 'A', name: 'Doctor', text: 'Do you have a fever?', translation: 'Apakah kamu demam?' },
        { speaker: 'B', name: 'Patient', text: 'Yes. My temperature was 38 degrees this morning.', translation: 'Ya. Suhu saya 38 derajat tadi pagi.' },
        { speaker: 'A', name: 'Doctor', text: 'I see. I think you have the flu. I\'ll prescribe some medicine.', translation: 'Saya mengerti. Saya rasa kamu terkena flu. Saya akan meresepkan obat.' },
        { speaker: 'B', name: 'Patient', text: 'Should I rest at home?', translation: 'Haruskah saya istirahat di rumah?' },
        { speaker: 'A', name: 'Doctor', text: 'Yes. Rest for two days, drink lots of water, and take the medicine three times a day.', translation: 'Ya. Istirahat selama dua hari, banyak minum air, dan minum obat tiga kali sehari.' },
      ],
      vocabulary: [
        { word: 'symptoms', meaning: 'gejala (penyakit)' },
        { word: 'headache', meaning: 'sakit kepala' },
        { word: 'sore throat', meaning: 'radang tenggorokan' },
        { word: 'fever', meaning: 'demam' },
        { word: 'temperature', meaning: 'suhu (tubuh)' },
        { word: 'flu', meaning: 'flu / influenza' },
        { word: 'prescribe', meaning: 'meresepkan (obat)' },
        { word: 'rest', meaning: 'istirahat' },
      ],
      exercises: [
        { type: 'mcq', question: 'The patient has been feeling unwell for:', answer: 'three days', options: ['one day', 'two days', 'three days', 'a week'] },
        { type: 'fill', question: 'The patient has a ___, a sore throat, and feels tired.', answer: 'headache' },
        { type: 'mcq', question: 'The patient\'s temperature is:', answer: '38 degrees', options: ['36 degrees', '37 degrees', '38 degrees', '39 degrees'] },
        { type: 'fill', question: 'The doctor thinks the patient has the ___.', answer: 'flu' },
        { type: 'mcq', question: 'The doctor says to take medicine:', answer: 'three times a day', options: ['once a day', 'twice a day', 'three times a day', 'four times a day'] },
      ],
    },
  ];

  // ── Public API ────────────────────────────────────────────

  const CATEGORIES = [
    { id: 'greetings', label: 'Salam & Perkenalan', icon: '👋' },
    { id: 'daily',     label: 'Kehidupan Sehari-hari', icon: '🌅' },
    { id: 'work',      label: 'Kerja & Sekolah', icon: '💼' },
    { id: 'travel',    label: 'Perjalanan & Arah', icon: '✈️' },
    { id: 'health',    label: 'Kesehatan', icon: '🏥' },
  ];

  return {
    getScenes() { return SCENES; },

    getScene(id) { return SCENES.find(s => s.id === id) || null; },

    getByCategory(cat) {
      if (!cat || cat === 'all') return SCENES;
      return SCENES.filter(s => s.category === cat);
    },

    getCategories() { return CATEGORIES; },

    getByLevel(level) {
      if (!level || level === 'all') return SCENES;
      return SCENES.filter(s => s.level === level);
    },

    getStats() {
      return {
        total: SCENES.length,
        a1: SCENES.filter(s => s.level === 'A1').length,
        a2: SCENES.filter(s => s.level === 'A2').length,
        totalExercises: SCENES.reduce((sum, s) => sum + s.exercises.length, 0),
      };
    },
  };
})();
