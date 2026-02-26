/**
 * EnglishPath — Phonetics Data
 * IPA phonemes, example words, minimal pairs, tongue twisters
 * Fase 5 — Foundation: Pronunciation & Phonetics v0.6.0
 */

const PhoneticsData = (() => {

  // ── IPA Phoneme Chart ──────────────────────────────────────
  // Divided into: vowels (short, long, diphthongs) and consonants

  const VOWELS_SHORT = [
    { symbol: 'ɪ', name: 'Short I',  example: 'sit',  ipa: '/sɪt/',  translation: 'duduk',   tip: 'Seperti "i" dalam "ini", tapi lebih pendek & santai.' },
    { symbol: 'e', name: 'Short E',  example: 'bed',  ipa: '/bed/',  translation: 'tempat tidur', tip: 'Seperti "e" dalam "ember".' },
    { symbol: 'æ', name: 'Short A',  example: 'cat',  ipa: '/kæt/', translation: 'kucing',   tip: 'Mulut terbuka lebar, lidah rendah ke depan. Lebih lebar dari "a" Indonesia.' },
    { symbol: 'ɒ', name: 'Short O',  example: 'hot',  ipa: '/hɒt/', translation: 'panas',    tip: 'Mulut bulat terbuka. Bunyi "o" pendek British English.' },
    { symbol: 'ʌ', name: 'Short U',  example: 'cup',  ipa: '/kʌp/', translation: 'cangkir',  tip: 'Seperti "a" terbuka di tengah mulut. Bukan "u"!' },
    { symbol: 'ʊ', name: 'Short OO', example: 'book', ipa: '/bʊk/', translation: 'buku',     tip: 'Seperti "u" dalam "untuk", tapi lebih pendek.' },
    { symbol: 'ə', name: 'Schwa',    example: 'about',ipa: '/əˈbaʊt/', translation: 'tentang', tip: 'Bunyi netral paling umum dalam bahasa Inggris. Seperti "e" pelan.' },
  ];

  const VOWELS_LONG = [
    { symbol: 'iː', name: 'Long EE', example: 'see',   ipa: '/siː/',  translation: 'melihat', tip: 'Seperti "i" dalam "isi", tapi lebih panjang & tegang.' },
    { symbol: 'ɑː', name: 'Long AH', example: 'car',   ipa: '/kɑː/', translation: 'mobil',   tip: 'Mulut terbuka lebar, seperti bilang "aah" ke dokter.' },
    { symbol: 'ɔː', name: 'Long AW', example: 'saw',   ipa: '/sɔː/', translation: 'melihat (lampau)', tip: 'Bunyi "o" panjang, bibir agak maju.' },
    { symbol: 'uː', name: 'Long OO', example: 'food',  ipa: '/fuːd/', translation: 'makanan', tip: 'Seperti "u" dalam "guru", tapi lebih panjang.' },
    { symbol: 'ɜː', name: 'Long ER', example: 'bird',  ipa: '/bɜːd/', translation: 'burung',  tip: 'Bunyi "er" tanpa getaran R. Mulut setengah terbuka.' },
  ];

  const DIPHTHONGS = [
    { symbol: 'eɪ', name: 'Diphthong AY', example: 'day',   ipa: '/deɪ/',  translation: 'hari',    tip: 'Mulai dari "e" lalu geser ke "i". Seperti "ei" dalam "ei, hei".' },
    { symbol: 'aɪ', name: 'Diphthong I',  example: 'my',    ipa: '/maɪ/',  translation: 'saya',    tip: 'Mulai dari "a" lebar lalu geser ke "i".' },
    { symbol: 'ɔɪ', name: 'Diphthong OY', example: 'boy',   ipa: '/bɔɪ/',  translation: 'anak laki', tip: 'Mulai dari "o" lalu geser ke "i".' },
    { symbol: 'aʊ', name: 'Diphthong OW', example: 'now',   ipa: '/naʊ/',  translation: 'sekarang', tip: 'Mulai dari "a" lebar lalu geser ke "u".' },
    { symbol: 'əʊ', name: 'Diphthong OH', example: 'go',    ipa: '/ɡəʊ/',  translation: 'pergi',    tip: 'Mulai dari schwa "ə" lalu geser ke "u".' },
    { symbol: 'ɪə', name: 'Diphthong EAR',example: 'here',  ipa: '/hɪə/', translation: 'di sini',  tip: 'Mulai dari "i" pendek lalu geser ke schwa.' },
    { symbol: 'eə', name: 'Diphthong AIR',example: 'there', ipa: '/ðeə/', translation: 'di sana',  tip: 'Mulai dari "e" lalu geser ke schwa.' },
    { symbol: 'ʊə', name: 'Diphthong URE',example: 'pure',  ipa: '/pjʊə/',translation: 'murni',    tip: 'Mulai dari "u" pendek lalu geser ke schwa.' },
  ];

  const CONSONANTS = [
    // Plosives
    { symbol: 'p', name: 'P', example: 'pen',   ipa: '/pen/',   translation: 'pena',       type: 'plosive',    voiced: false, tip: 'Bibir rapat, lepas udara tiba-tiba. Tidak ada getaran.' },
    { symbol: 'b', name: 'B', example: 'bed',   ipa: '/bed/',   translation: 'tempat tidur',type: 'plosive',    voiced: true,  tip: 'Sama seperti P tapi ada getaran di tenggorokan.' },
    { symbol: 't', name: 'T', example: 'top',   ipa: '/tɒp/',   translation: 'atas',       type: 'plosive',    voiced: false, tip: 'Lidah sentuh atap mulut dekat gigi, lepas tiba-tiba.' },
    { symbol: 'd', name: 'D', example: 'dog',   ipa: '/dɒɡ/',   translation: 'anjing',     type: 'plosive',    voiced: true,  tip: 'Sama seperti T tapi ada getaran.' },
    { symbol: 'k', name: 'K', example: 'cat',   ipa: '/kæt/',   translation: 'kucing',     type: 'plosive',    voiced: false, tip: 'Bagian belakang lidah sentuh langit-langit lunak.' },
    { symbol: 'ɡ', name: 'G', example: 'go',    ipa: '/ɡəʊ/',   translation: 'pergi',      type: 'plosive',    voiced: true,  tip: 'Sama seperti K tapi ada getaran.' },
    // Fricatives
    { symbol: 'f', name: 'F', example: 'fish',  ipa: '/fɪʃ/',   translation: 'ikan',       type: 'fricative',  voiced: false, tip: 'Gigi atas sentuh bibir bawah, hembuskan udara.' },
    { symbol: 'v', name: 'V', example: 'van',   ipa: '/væn/',   translation: 'van',        type: 'fricative',  voiced: true,  tip: 'Sama seperti F tapi ada getaran. Sangat berbeda dari B!' },
    { symbol: 'θ', name: 'TH (voiceless)', example: 'think', ipa: '/θɪŋk/', translation: 'berpikir', type: 'fricative', voiced: false, tip: 'Lidah di antara gigi, hembuskan udara. Jangan ucapkan "t" atau "s"!' },
    { symbol: 'ð', name: 'TH (voiced)',   example: 'this',  ipa: '/ðɪs/',  translation: 'ini',     type: 'fricative', voiced: true,  tip: 'Sama seperti θ tapi ada getaran. Seperti "the", "that", "they".' },
    { symbol: 's', name: 'S', example: 'sun',   ipa: '/sʌn/',   translation: 'matahari',   type: 'fricative',  voiced: false, tip: 'Lidah dekat gigi atas, udara mengalir di tengah.' },
    { symbol: 'z', name: 'Z', example: 'zoo',   ipa: '/zuː/',   translation: 'kebun binatang', type: 'fricative', voiced: true, tip: 'Sama seperti S tapi ada getaran.' },
    { symbol: 'ʃ', name: 'SH', example: 'ship',  ipa: '/ʃɪp/',   translation: 'kapal',     type: 'fricative',  voiced: false, tip: 'Seperti bilang "ssst" untuk diam. Bibir agak maju.' },
    { symbol: 'ʒ', name: 'ZH', example: 'measure', ipa: '/ˈmeʒə/', translation: 'mengukur', type: 'fricative', voiced: true,  tip: 'Sama seperti ʃ tapi ada getaran. Seperti "j" dalam bahasa Prancis.' },
    { symbol: 'h', name: 'H', example: 'hat',   ipa: '/hæt/',   translation: 'topi',       type: 'fricative',  voiced: false, tip: 'Hanya hembusan udara dari tenggorokan. Seperti napas panas di cermin.' },
    // Affricates
    { symbol: 'tʃ', name: 'CH', example: 'chair', ipa: '/tʃeə/', translation: 'kursi',    type: 'affricate',  voiced: false, tip: 'Kombinasi T + SH. Seperti "c" dalam "catur".' },
    { symbol: 'dʒ', name: 'J',  example: 'jump',  ipa: '/dʒʌmp/',translation: 'lompat',   type: 'affricate',  voiced: true,  tip: 'Kombinasi D + ZH. Seperti "j" dalam "jalan".' },
    // Nasals
    { symbol: 'm', name: 'M', example: 'man',   ipa: '/mæn/',   translation: 'pria',       type: 'nasal',      voiced: true,  tip: 'Bibir rapat, udara keluar lewat hidung.' },
    { symbol: 'n', name: 'N', example: 'no',    ipa: '/nəʊ/',   translation: 'tidak',      type: 'nasal',      voiced: true,  tip: 'Lidah sentuh atap mulut, udara keluar lewat hidung.' },
    { symbol: 'ŋ', name: 'NG', example: 'sing',  ipa: '/sɪŋ/',   translation: 'bernyanyi', type: 'nasal',      voiced: true,  tip: 'Bagian belakang lidah naik, udara keluar lewat hidung. Tidak ada bunyi G di akhir!' },
    // Approximants & Laterals
    { symbol: 'l', name: 'L', example: 'leg',   ipa: '/leɡ/',   translation: 'kaki',       type: 'lateral',    voiced: true,  tip: 'Lidah sentuh atap mulut, udara keluar dari sisi lidah.' },
    { symbol: 'r', name: 'R', example: 'red',   ipa: '/red/',   translation: 'merah',      type: 'approximant',voiced: true,  tip: 'Lidah melengkung ke atas tanpa menyentuh apapun. Berbeda dari R Indonesia!' },
    { symbol: 'j', name: 'Y', example: 'yes',   ipa: '/jes/',   translation: 'ya',         type: 'approximant',voiced: true,  tip: 'Seperti "y" dalam "yakin". Bukan seperti J bahasa Indonesia.' },
    { symbol: 'w', name: 'W', example: 'we',    ipa: '/wiː/',   translation: 'kami',       type: 'approximant',voiced: true,  tip: 'Bibir bulat seperti mau bersiul, lalu terbuka.' },
  ];

  // ── Minimal Pairs ─────────────────────────────────────────
  // Pasangan kata yang berbeda hanya 1 bunyi

  const MINIMAL_PAIRS = [
    {
      id: 'mp_01',
      category: 'V vs B',
      difficulty: 'hard',
      description: 'Banyak pelajar Indonesia mengucapkan V seperti B. Perhatikan perbedaannya!',
      pairs: [
        { word1: 'van',   ipa1: '/væn/',   word2: 'ban',   ipa2: '/bæn/',   meaning1: 'van',    meaning2: 'larangan' },
        { word1: 'vest',  ipa1: '/vest/',  word2: 'best',  ipa2: '/best/',  meaning1: 'rompi',  meaning2: 'terbaik' },
        { word1: 'very',  ipa1: '/ˈveri/', word2: 'berry', ipa2: '/ˈberi/', meaning1: 'sangat', meaning2: 'beri' },
        { word1: 'vine',  ipa1: '/vaɪn/',  word2: 'bine',  ipa2: '/baɪn/',  meaning1: 'tanaman merambat', meaning2: 'tanaman hop' },
      ]
    },
    {
      id: 'mp_02',
      category: 'TH vs D/S/T',
      difficulty: 'hard',
      description: 'Bunyi TH (θ dan ð) tidak ada dalam bahasa Indonesia. Latih dengan lidah di antara gigi!',
      pairs: [
        { word1: 'think', ipa1: '/θɪŋk/', word2: 'sink',  ipa2: '/sɪŋk/', meaning1: 'berpikir', meaning2: 'tenggelam' },
        { word1: 'three', ipa1: '/θriː/', word2: 'tree',  ipa2: '/triː/', meaning1: 'tiga',     meaning2: 'pohon' },
        { word1: 'this',  ipa1: '/ðɪs/',  word2: 'dis',   ipa2: '/dɪs/',  meaning1: 'ini',      meaning2: 'menghina' },
        { word1: 'that',  ipa1: '/ðæt/',  word2: 'dat',   ipa2: '/dæt/',  meaning1: 'itu',      meaning2: '(bukan kata baku)' },
      ]
    },
    {
      id: 'mp_03',
      category: 'Short vs Long Vowel',
      difficulty: 'medium',
      description: 'Panjang vokal sangat penting! "Ship" vs "sheep" — perbedaan yang bisa mengubah makna.',
      pairs: [
        { word1: 'ship',  ipa1: '/ʃɪp/',  word2: 'sheep', ipa2: '/ʃiːp/', meaning1: 'kapal',  meaning2: 'domba' },
        { word1: 'bit',   ipa1: '/bɪt/',  word2: 'beat',  ipa2: '/biːt/', meaning1: 'sedikit',meaning2: 'memukul/mengalahkan' },
        { word1: 'full',  ipa1: '/fʊl/',  word2: 'fool',  ipa2: '/fuːl/', meaning1: 'penuh',  meaning2: 'bodoh' },
        { word1: 'pull',  ipa1: '/pʊl/',  word2: 'pool',  ipa2: '/puːl/', meaning1: 'tarik',  meaning2: 'kolam renang' },
      ]
    },
    {
      id: 'mp_04',
      category: 'P vs B',
      difficulty: 'easy',
      description: 'Perbedaan antara bunyi bersuara (voiced) dan tidak bersuara (voiceless).',
      pairs: [
        { word1: 'pat',   ipa1: '/pæt/',  word2: 'bat',   ipa2: '/bæt/',  meaning1: 'tepuk',   meaning2: 'kelelawar/pemukul' },
        { word1: 'pie',   ipa1: '/paɪ/',  word2: 'buy',   ipa2: '/baɪ/',  meaning1: 'pai',     meaning2: 'membeli' },
        { word1: 'pack',  ipa1: '/pæk/',  word2: 'back',  ipa2: '/bæk/',  meaning1: 'kemasan', meaning2: 'belakang' },
        { word1: 'pin',   ipa1: '/pɪn/',  word2: 'bin',   ipa2: '/bɪn/',  meaning1: 'peniti',  meaning2: 'tempat sampah' },
      ]
    },
    {
      id: 'mp_05',
      category: 'L vs R',
      difficulty: 'medium',
      description: 'Perbedaan L dan R penting untuk komunikasi yang jelas.',
      pairs: [
        { word1: 'light', ipa1: '/laɪt/', word2: 'right', ipa2: '/raɪt/', meaning1: 'cahaya/ringan', meaning2: 'benar/kanan' },
        { word1: 'lead',  ipa1: '/liːd/', word2: 'read',  ipa2: '/riːd/', meaning1: 'memimpin', meaning2: 'membaca' },
        { word1: 'lock',  ipa1: '/lɒk/',  word2: 'rock',  ipa2: '/rɒk/',  meaning1: 'kunci',   meaning2: 'batu/musik rock' },
        { word1: 'lane',  ipa1: '/leɪn/', word2: 'rain',  ipa2: '/reɪn/', meaning1: 'jalur',   meaning2: 'hujan' },
      ]
    },
  ];

  // ── Tongue Twisters ─────────────────────────────────────────

  const TONGUE_TWISTERS = [
    {
      id: 'tt_01',
      text: 'She sells seashells by the seashore.',
      focus: 'SH vs S',
      phonemes: ['ʃ', 's'],
      difficulty: 'medium',
      tips: 'Fokus pada perbedaan "sh" (ʃ) dan "s". Bibir maju untuk "sh", biasa untuk "s".',
    },
    {
      id: 'tt_02',
      text: 'Peter Piper picked a peck of pickled peppers.',
      focus: 'P sound',
      phonemes: ['p'],
      difficulty: 'easy',
      tips: 'Latih bunyi "p" yang kuat dengan hembusan udara. Tempelkan tangan di depan mulut — rasakan hembusan udaranya!',
    },
    {
      id: 'tt_03',
      text: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?',
      focus: 'W sound & OO vowels',
      phonemes: ['w', 'ʊ', 'uː'],
      difficulty: 'hard',
      tips: 'Latih bunyi "w" dengan bibir bulat, dan perbedaan vokal ʊ (wood) dan uː (you).',
    },
    {
      id: 'tt_04',
      text: 'The thirty-three thieves thought that they thrilled the throne.',
      focus: 'TH sound (θ & ð)',
      phonemes: ['θ', 'ð'],
      difficulty: 'hard',
      tips: 'Taruh lidah lembut di antara gigi untuk semua bunyi "th". Jangan bilang "d" atau "t"!',
    },
    {
      id: 'tt_05',
      text: 'Red lorry, yellow lorry.',
      focus: 'L vs R',
      phonemes: ['l', 'r'],
      difficulty: 'medium',
      tips: 'Perhatikan posisi lidah: L menyentuh langit-langit, R tidak menyentuh apapun.',
    },
    {
      id: 'tt_06',
      text: 'Betty Botter bought some butter, but the butter was bitter.',
      focus: 'B & T sounds',
      phonemes: ['b', 't'],
      difficulty: 'medium',
      tips: 'Latih perbedaan B (bersuara) dan T (tak bersuara). Rasakan getaran di tenggorokan untuk B.',
    },
  ];

  // ── Word Stress Patterns ────────────────────────────────────

  const STRESS_PATTERNS = [
    {
      category: '2-Syllable Nouns/Adjectives',
      rule: 'Biasanya stress di suku kata PERTAMA',
      examples: [
        { word: 'TAble',   ipa: '/ˈteɪ.bl̩/',  meaning: 'meja' },
        { word: 'PREsent', ipa: '/ˈprez.ənt/', meaning: 'hadiah / sekarang' },
        { word: 'REcord',  ipa: '/ˈrek.ɔːd/', meaning: 'rekaman (noun)' },
        { word: 'HAppy',   ipa: '/ˈhæp.i/',  meaning: 'bahagia' },
        { word: 'DOctor',  ipa: '/ˈdɒk.tər/', meaning: 'dokter' },
      ]
    },
    {
      category: '2-Syllable Verbs',
      rule: 'Biasanya stress di suku kata KEDUA',
      examples: [
        { word: 'reLAX',   ipa: '/rɪˈlæks/', meaning: 'bersantai' },
        { word: 'reCORD',  ipa: '/rɪˈkɔːd/', meaning: 'merekam (verb)' },
        { word: 'preSENT', ipa: '/prɪˈzent/', meaning: 'mempresentasikan (verb)' },
        { word: 'rePEAT',  ipa: '/rɪˈpiːt/', meaning: 'mengulang' },
        { word: 'beGIN',   ipa: '/bɪˈɡɪn/',  meaning: 'mulai' },
      ]
    },
    {
      category: 'Words ending in -tion / -sion',
      rule: 'Stress SELALU di suku kata sebelum akhiran',
      examples: [
        { word: 'inforMAtion',  ipa: '/ˌɪn.fəˈmeɪ.ʃən/', meaning: 'informasi' },
        { word: 'educAtion',    ipa: '/ˌed.jʊˈkeɪ.ʃən/', meaning: 'pendidikan' },
        { word: 'communicAtion',ipa: '/kəˌmjuː.nɪˈkeɪ.ʃən/', meaning: 'komunikasi' },
        { word: 'situAtion',    ipa: '/ˌsɪtʃ.uˈeɪ.ʃən/', meaning: 'situasi' },
      ]
    },
    {
      category: 'Words ending in -ic',
      rule: 'Stress di suku kata SEBELUM -ic',
      examples: [
        { word: 'fanTAstic',   ipa: '/fænˈtæs.tɪk/', meaning: 'fantastis' },
        { word: 'elECtric',    ipa: '/ɪˈlek.trɪk/',  meaning: 'listrik' },
        { word: 'draMAtic',    ipa: '/drəˈmæt.ɪk/',  meaning: 'dramatis' },
        { word: 'speCIfic',    ipa: '/spɪˈsɪf.ɪk/',  meaning: 'spesifik' },
      ]
    },
  ];

  // ── Common Pronunciation Mistakes by Indonesian Speakers ───

  const COMMON_MISTAKES = [
    {
      id: 'cm_01',
      mistake: 'Menambahkan vokal di akhir konsonan',
      example_wrong: '"book" → /buku/',
      example_right: '"book" → /bʊk/',
      explanation: 'Bahasa Indonesia cenderung menambahkan "a/e/u" setelah konsonan akhir. Dalam bahasa Inggris, konsonan akhir harus "kering" tanpa vokal tambahan.',
      words: ['book', 'stop', 'clock', 'help', 'milk'],
    },
    {
      id: 'cm_02',
      mistake: 'Mengucapkan V seperti B atau F',
      example_wrong: '"very" → /beri/ atau /feri/',
      example_right: '"very" → /ˈveri/',
      explanation: 'Bunyi V (gigi atas + bibir bawah + getaran) tidak ada dalam bahasa Indonesia. Harus dilatih secara khusus.',
      words: ['very', 'video', 'voice', 'value', 'village'],
    },
    {
      id: 'cm_03',
      mistake: 'Mengucapkan TH seperti D atau S atau T',
      example_wrong: '"the" → /de/, "think" → /sink/ atau /tink/',
      example_right: '"the" → /ðə/, "think" → /θɪŋk/',
      explanation: 'Bunyi TH (lidah antara gigi) sama sekali tidak ada dalam bahasa Indonesia. Ini salah satu tantangan terbesar!',
      words: ['the', 'this', 'that', 'think', 'three', 'through'],
    },
    {
      id: 'cm_04',
      mistake: 'Tidak membedakan panjang vokal',
      example_wrong: '"ship" dan "sheep" diucapkan sama',
      example_right: 'ship /ʃɪp/ vs sheep /ʃiːp/',
      explanation: 'Bahasa Indonesia tidak memiliki konsep vokal panjang-pendek. Dalam bahasa Inggris, perbedaan ini bisa mengubah makna kata sepenuhnya!',
      words: ['ship/sheep', 'bit/beat', 'full/fool', 'pull/pool'],
    },
    {
      id: 'cm_05',
      mistake: 'Tidak mengucapkan bunyi SCHWA (ə)',
      example_wrong: '"about" → /aˈbaut/',
      example_right: '"about" → /əˈbaʊt/',
      explanation: 'Schwa (ə) adalah bunyi vokal paling umum dalam bahasa Inggris. Bunyi ini netral, pelan, seperti "e" yang malas. Banyak kata tidak beraturan dalam bahasa Inggris menggunakan schwa.',
      words: ['about', 'banana', 'camera', 'together', 'problem'],
    },
  ];

  // ── Practice Exercises ─────────────────────────────────────

  const PRACTICE_WORDS = {
    'iː': ['see', 'me', 'be', 'eat', 'feel', 'green', 'meet', 'need', 'seek', 'tree'],
    'ɪ':  ['sit', 'big', 'it', 'hit', 'fill', 'give', 'live', 'milk', 'ship', 'swim'],
    'e':  ['bed', 'red', 'ten', 'get', 'help', 'left', 'next', 'rest', 'set', 'well'],
    'æ':  ['cat', 'bad', 'man', 'at', 'black', 'can', 'hand', 'hat', 'land', 'pass'],
    'ʌ':  ['cup', 'bus', 'but', 'come', 'done', 'fun', 'love', 'run', 'sun', 'up'],
    'ɒ':  ['hot', 'lot', 'not', 'box', 'clock', 'dog', 'got', 'job', 'rock', 'stop'],
    'ɔː': ['saw', 'all', 'ball', 'call', 'door', 'fall', 'more', 'pour', 'talk', 'walk'],
    'ɑː': ['car', 'bar', 'far', 'arm', 'art', 'dark', 'farm', 'hard', 'park', 'star'],
    'uː': ['food', 'do', 'you', 'blue', 'cool', 'moon', 'pool', 'room', 'school', 'tool'],
    'ʊ':  ['book', 'good', 'look', 'put', 'push', 'should', 'stood', 'took', 'would', 'wood'],
    'ɜː': ['bird', 'her', 'sir', 'burn', 'first', 'girl', 'learn', 'turn', 'word', 'world'],
    'ə':  ['about', 'a', 'the', 'ago', 'butter', 'under', 'teacher', 'mother', 'father', 'other'],
    'θ':  ['think', 'thank', 'thin', 'three', 'throw', 'thumb', 'thunder', 'thousand', 'thirsty', 'through'],
    'ð':  ['the', 'this', 'that', 'they', 'there', 'then', 'though', 'those', 'thus', 'weather'],
    'ʃ':  ['ship', 'shop', 'she', 'shoe', 'short', 'show', 'share', 'shelf', 'shirt', 'should'],
    'ŋ':  ['sing', 'ring', 'king', 'bang', 'bring', 'hang', 'long', 'song', 'strong', 'young'],
  };

  // ── Listen & Choose Quiz ────────────────────────────────────
  // User hears a word, picks the correct IPA / meaning

  const LISTEN_QUIZ = [
    { word: 'ship',  ipa: '/ʃɪp/',  meaning: 'kapal',     distractors: ['/ʃiːp/', '/ʃep/', '/sɪp/'], distractor_meanings: ['domba', 'toko', 'teguk'] },
    { word: 'sheep', ipa: '/ʃiːp/', meaning: 'domba',     distractors: ['/ʃɪp/', '/ʃeɪp/', '/siːp/'], distractor_meanings: ['kapal', 'bentuk', '—'] },
    { word: 'think', ipa: '/θɪŋk/', meaning: 'berpikir',  distractors: ['/tɪŋk/', '/sɪŋk/', '/dɪŋk/'], distractor_meanings: ['tinta', 'tenggelam', '—'] },
    { word: 'van',   ipa: '/væn/',  meaning: 'van',       distractors: ['/bæn/', '/fæn/', '/pæn/'], distractor_meanings: ['larangan', 'kipas', 'panci'] },
    { word: 'bird',  ipa: '/bɜːd/', meaning: 'burung',    distractors: ['/bɪrd/', '/bɑːd/', '/beɪd/'], distractor_meanings: ['—', '—', '—'] },
    { word: 'food',  ipa: '/fuːd/', meaning: 'makanan',   distractors: ['/fʊd/', '/fɔːd/', '/feɪd/'], distractor_meanings: ['—', 'ford', '—'] },
    { word: 'book',  ipa: '/bʊk/',  meaning: 'buku',      distractors: ['/buːk/', '/bɒk/', '/bɔːk/'], distractor_meanings: ['—', '—', 'jalan'] },
    { word: 'light', ipa: '/laɪt/', meaning: 'cahaya/ringan', distractors: ['/raɪt/', '/laɪd/', '/leɪt/'], distractor_meanings: ['benar', '—', 'terlambat'] },
    { word: 'cat',   ipa: '/kæt/',  meaning: 'kucing',    distractors: ['/kɑːt/', '/kʌt/', '/keɪt/'], distractor_meanings: ['kereta dorong', 'potong', '—'] },
    { word: 'this',  ipa: '/ðɪs/',  meaning: 'ini',       distractors: ['/dɪs/', '/sɪs/', '/tɪs/'], distractor_meanings: ['menghina', '—', '—'] },
    { word: 'chair', ipa: '/tʃeə/', meaning: 'kursi',     distractors: ['/ʃeə/', '/tʃɑː/', '/dʒeə/'], distractor_meanings: ['berbagi', '—', 'jar'] },
    { word: 'three', ipa: '/θriː/', meaning: 'tiga',      distractors: ['/triː/', '/friː/', '/driː/'], distractor_meanings: ['pohon', 'bebas', '—'] },
  ];

  // ── Public API ─────────────────────────────────────────────

  return {
    VOWELS_SHORT,
    VOWELS_LONG,
    DIPHTHONGS,
    CONSONANTS,
    MINIMAL_PAIRS,
    TONGUE_TWISTERS,
    STRESS_PATTERNS,
    COMMON_MISTAKES,
    PRACTICE_WORDS,
    LISTEN_QUIZ,

    getAllVowels() {
      return [...VOWELS_SHORT, ...VOWELS_LONG, ...DIPHTHONGS];
    },
    getConsonantsByType(type) {
      return CONSONANTS.filter(c => c.type === type);
    },
    getPracticeWords(symbol) {
      return PRACTICE_WORDS[symbol] || [];
    },
  };
})();

window.PhoneticsData = PhoneticsData;
