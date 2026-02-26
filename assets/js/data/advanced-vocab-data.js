/**
 * EnglishPath — Advanced Vocabulary Data (C1–C2)
 * Fase 17a: 400+ kata C1–C2 dalam 8 domain
 */
const AdvancedVocabData = (() => {

  const DOMAINS = [
    {
      id: 'academic',
      name: 'Academic & Intellectual',
      nameID: 'Akademik & Intelektual',
      icon: '🎓',
      description: 'High-frequency academic vocabulary for essays, lectures, and intellectual discourse',
      words: [
        { id: 'ac001', word: 'ubiquitous', ipa: '/juːˈbɪkwɪtəs/', translation: 'ada di mana-mana / tersebar luas', example: 'Smartphones have become ubiquitous in modern society.', wordType: 'adjective', family: 'ubiquity' },
        { id: 'ac002', word: 'paradigm', ipa: '/ˈpærədaɪm/', translation: 'paradigma / kerangka berpikir dominan', example: 'The discovery caused a paradigm shift in scientific thinking.', wordType: 'noun', family: 'paradigmatic' },
        { id: 'ac003', word: 'catalyst', ipa: '/ˈkætəlɪst/', translation: 'katalis / pemicu perubahan', example: 'The financial crisis was a catalyst for sweeping reforms.', wordType: 'noun', family: 'catalyse' },
        { id: 'ac004', word: 'scrutinise', ipa: '/ˈskruːtɪnaɪz/', translation: 'memeriksa dengan teliti / mengkaji secara mendalam', example: 'Researchers scrutinised the data before publishing their findings.', wordType: 'verb', family: 'scrutiny' },
        { id: 'ac005', word: 'prevalent', ipa: '/ˈprevələnt/', translation: 'lazim / tersebar luas / dominan', example: 'Sedentary lifestyles are increasingly prevalent in urban areas.', wordType: 'adjective', family: 'prevalence' },
        { id: 'ac006', word: 'substantiate', ipa: '/səbˈstænʃieɪt/', translation: 'membuktikan / mendukung dengan bukti', example: 'The lawyer failed to substantiate her claims in court.', wordType: 'verb', family: 'substantive' },
        { id: 'ac007', word: 'delineate', ipa: '/dɪˈlɪnieɪt/', translation: 'menguraikan / menggambarkan dengan jelas / mendefinisikan batas', example: 'The report delineates the key challenges facing the industry.', wordType: 'verb', family: 'delineation' },
        { id: 'ac008', word: 'postulate', ipa: '/ˈpɒstʃʊleɪt/', translation: 'mendalilkan / mengajukan sebagai asumsi dasar', example: 'Darwin postulated that all species evolved from a common ancestor.', wordType: 'verb', family: 'postulation' },
        { id: 'ac009', word: 'discrepancy', ipa: '/dɪˈskrep(ə)nsi/', translation: 'perbedaan / ketidaksesuaian / inkonsistensi', example: 'There is a discrepancy between the two sets of financial data.', wordType: 'noun', family: 'discrepant' },
        { id: 'ac010', word: 'holistic', ipa: '/həʊˈlɪstɪk/', translation: 'holistik / menyeluruh / mempertimbangkan keseluruhan', example: 'The treatment takes a holistic approach to patient wellbeing.', wordType: 'adjective', family: 'holism' },
        { id: 'ac011', word: 'inherent', ipa: '/ɪnˈhɪərənt/', translation: 'inheren / melekat / bawaan', example: 'There are inherent risks in any surgical procedure.', wordType: 'adjective', family: 'inherently' },
        { id: 'ac012', word: 'nuanced', ipa: '/ˈnjuːɑːnst/', translation: 'bernuansa / penuh gradasi halus', example: 'Her analysis was nuanced, acknowledging both strengths and weaknesses.', wordType: 'adjective', family: 'nuance' },
        { id: 'ac013', word: 'extrapolate', ipa: '/ɪkˈstræpəleɪt/', translation: 'mengekstrapolasi / menarik kesimpulan dari data yang ada', example: 'We can extrapolate future trends from current population data.', wordType: 'verb', family: 'extrapolation' },
        { id: 'ac014', word: 'empirical', ipa: '/ɪmˈpɪrɪk(ə)l/', translation: 'empiris / berdasarkan pengamatan dan eksperimen', example: 'The theory lacks empirical support from controlled experiments.', wordType: 'adjective', family: 'empiricism' },
        { id: 'ac015', word: 'synthesis', ipa: '/ˈsɪnθɪsɪs/', translation: 'sintesis / penggabungan menjadi satu kesatuan', example: 'The paper provides a synthesis of recent research in the field.', wordType: 'noun', family: 'synthesise' },
        { id: 'ac016', word: 'commensurate', ipa: '/kəˈmenʃ(ə)rət/', translation: 'sepadan / setara / proporsional', example: 'The salary should be commensurate with experience and qualifications.', wordType: 'adjective', family: 'commensurability' },
        { id: 'ac017', word: 'dichotomy', ipa: '/daɪˈkɒtəmi/', translation: 'dikotomi / pembagian menjadi dua hal berlawanan', example: 'The false dichotomy between art and science limits creative thinking.', wordType: 'noun', family: 'dichotomous' },
        { id: 'ac018', word: 'corroborate', ipa: '/kəˈrɒbəreɪt/', translation: 'mengkonfirmasi / memperkuat bukti', example: 'New archaeological findings corroborate the historical accounts.', wordType: 'verb', family: 'corroboration' },
        { id: 'ac019', word: 'epistemology', ipa: '/ɪˌpɪstɪˈmɒlədʒi/', translation: 'epistemologi / ilmu tentang sumber dan hakikat pengetahuan', example: 'Philosophy of science is rooted in questions of epistemology.', wordType: 'noun', family: 'epistemological' },
        { id: 'ac020', word: 'impede', ipa: '/ɪmˈpiːd/', translation: 'menghambat / menghalang-halangi', example: 'Bureaucratic procedures often impede scientific progress.', wordType: 'verb', family: 'impediment' },
        { id: 'ac021', word: 'juxtapose', ipa: '/ˌdʒʌkstəˈpəʊz/', translation: 'menempatkan berdampingan untuk perbandingan', example: 'The essay juxtaposes traditional values with modern ideals.', wordType: 'verb', family: 'juxtaposition' },
        { id: 'ac022', word: 'congruent', ipa: '/ˈkɒŋɡrʊənt/', translation: 'kongruen / sesuai / konsisten', example: 'The findings are congruent with previous research on the topic.', wordType: 'adjective', family: 'congruence' },
        { id: 'ac023', word: 'proliferate', ipa: '/prəˈlɪfəreɪt/', translation: 'berkembang biak / menyebar pesat', example: 'Social media platforms have proliferated over the past decade.', wordType: 'verb', family: 'proliferation' },
        { id: 'ac024', word: 'premise', ipa: '/ˈpremɪs/', translation: 'premis / asumsi dasar / proposisi', example: 'The entire argument rests on a flawed premise.', wordType: 'noun', family: 'premised' },
        { id: 'ac025', word: 'culminate', ipa: '/ˈkʌlmɪneɪt/', translation: 'berujung pada / mencapai puncak', example: 'Years of research culminated in a groundbreaking discovery.', wordType: 'verb', family: 'culmination' },
        { id: 'ac026', word: 'arbitrate', ipa: '/ˈɑːbɪtreɪt/', translation: 'menengahi / mendamaikan perselisihan', example: 'A neutral party was brought in to arbitrate the dispute.', wordType: 'verb', family: 'arbitration' },
        { id: 'ac027', word: 'exacerbate', ipa: '/ɪɡˈzæsəbeɪt/', translation: 'memperburuk / memperparah', example: 'The drought exacerbated the already critical food shortage.', wordType: 'verb', family: 'exacerbation' },
        { id: 'ac028', word: 'attenuate', ipa: '/əˈtenjʊeɪt/', translation: 'melemahkan / mengurangi intensitas', example: 'The new drug attenuates the severity of symptoms.', wordType: 'verb', family: 'attenuation' },
        { id: 'ac029', word: 'circumvent', ipa: '/ˌsɜːkəmˈvent/', translation: 'menghindari / menemukan celah dari', example: 'Some companies try to circumvent environmental regulations.', wordType: 'verb', family: 'circumvention' },
        { id: 'ac030', word: 'inextricable', ipa: '/ɪˈnɛkstrɪkəb(ə)l/', translation: 'tidak terpisahkan / terkait erat', example: 'Language and culture are inextricably linked.', wordType: 'adjective', family: 'inextricably' },
      ]
    },
    {
      id: 'formal',
      name: 'Formal & Written English',
      nameID: 'Bahasa Inggris Formal & Tulis',
      icon: '📝',
      description: 'Vocabulary used in formal writing, essays, reports, and official documents',
      words: [
        { id: 'fw001', word: 'hitherto', ipa: '/ˌhɪðəˈtuː/', translation: 'hingga kini / sampai saat ini (sebelum momen ini)', example: 'Hitherto, no satisfactory solution had been found.', wordType: 'adverb', family: '' },
        { id: 'fw002', word: 'notwithstanding', ipa: '/ˌnɒtwɪθˈstændɪŋ/', translation: 'meskipun / terlepas dari / walaupun demikian', example: 'Notwithstanding the difficulties, the project was completed on time.', wordType: 'preposition/adverb', family: '' },
        { id: 'fw003', word: 'pursuant to', ipa: '/pəˈsjuːənt tuː/', translation: 'sesuai dengan / berdasarkan (hukum atau peraturan)', example: 'Pursuant to the agreement, both parties must comply.', wordType: 'prepositional phrase', family: '' },
        { id: 'fw004', word: 'thereof', ipa: '/ˌðeərˈɒv/', translation: 'dari hal tersebut / tentang itu', example: 'The committee approved the plan and all elements thereof.', wordType: 'adverb', family: '' },
        { id: 'fw005', word: 'insofar as', ipa: '/ˌɪnsəˈfɑːr æz/', translation: 'sepanjang / sejauh / dalam hal', example: 'The policy is effective insofar as it addresses the root cause.', wordType: 'conjunction', family: '' },
        { id: 'fw006', word: 'forthwith', ipa: '/ˌfɔːθˈwɪθ/', translation: 'segera / tanpa penundaan', example: 'The order must be implemented forthwith.', wordType: 'adverb', family: '' },
        { id: 'fw007', word: 'stipulate', ipa: '/ˈstɪpjʊleɪt/', translation: 'menetapkan / mensyaratkan secara resmi', example: 'The contract stipulates a minimum notice period of 30 days.', wordType: 'verb', family: 'stipulation' },
        { id: 'fw008', word: 'adjudicate', ipa: '/əˈdʒuːdɪkeɪt/', translation: 'memutuskan / mengadili / menghakimi', example: 'An independent panel will adjudicate the competition.', wordType: 'verb', family: 'adjudication' },
        { id: 'fw009', word: 'enumerate', ipa: '/ɪˈnjuːməreɪt/', translation: 'menyebutkan satu per satu / merincikan', example: 'The report enumerates the key factors contributing to failure.', wordType: 'verb', family: 'enumeration' },
        { id: 'fw010', word: 'conjecture', ipa: '/kənˈdʒektʃə/', translation: 'dugaan / spekulasi tanpa bukti kuat', example: 'The claims are mere conjecture without empirical support.', wordType: 'noun', family: 'conjectural' },
        { id: 'fw011', word: 'ratify', ipa: '/ˈrætɪfaɪ/', translation: 'meratifikasi / mengesahkan secara resmi', example: 'Thirty countries need to ratify the treaty for it to take effect.', wordType: 'verb', family: 'ratification' },
        { id: 'fw012', word: 'supersede', ipa: '/ˌsuːpəˈsiːd/', translation: 'menggantikan / mengesampingkan yang sebelumnya', example: 'Digital records have superseded paper filing systems.', wordType: 'verb', family: 'supersession' },
        { id: 'fw013', word: 'abate', ipa: '/əˈbeɪt/', translation: 'mereda / berkurang / menurun (intensitas)', example: 'The storm abated towards evening, allowing rescue operations to resume.', wordType: 'verb', family: 'abatement' },
        { id: 'fw014', word: 'promulgate', ipa: '/ˈprɒm(ə)lɡeɪt/', translation: 'mengundangkan / memaklumkan secara resmi', example: 'The new regulation was promulgated by the government last week.', wordType: 'verb', family: 'promulgation' },
        { id: 'fw015', word: 'preclude', ipa: '/prɪˈkluːd/', translation: 'mencegah / menghalangi kemungkinan terjadinya', example: 'Illness precluded her from attending the conference.', wordType: 'verb', family: 'preclusion' },
        { id: 'fw016', word: 'duly', ipa: '/ˈdjuːli/', translation: 'dengan semestinya / sebagaimana mestinya', example: 'The application was duly submitted before the deadline.', wordType: 'adverb', family: '' },
        { id: 'fw017', word: 'mandate', ipa: '/ˈmændeɪt/', translation: 'mandat / kewenangan resmi / memerintahkan', example: 'The new law mandates annual safety inspections.', wordType: 'noun/verb', family: 'mandatory' },
        { id: 'fw018', word: 'rescind', ipa: '/rɪˈsɪnd/', translation: 'membatalkan / mencabut (keputusan resmi)', example: 'The court rescinded the earlier decision on procedural grounds.', wordType: 'verb', family: 'rescission' },
        { id: 'fw019', word: 'apprise', ipa: '/əˈpraɪz/', translation: 'memberitahu / menginformasikan secara resmi', example: 'Staff should be apprised of any changes to company policy.', wordType: 'verb', family: '' },
        { id: 'fw020', word: 'ensue', ipa: '/ɪnˈsjuː/', translation: 'terjadi kemudian / mengikuti (sebagai akibat)', example: 'A heated debate ensued following the announcement.', wordType: 'verb', family: 'ensuing' },
        { id: 'fw021', word: 'ameliorate', ipa: '/əˈmiːliəreɪt/', translation: 'memperbaiki / meningkatkan kualitas sesuatu', example: 'Aid agencies worked to ameliorate the humanitarian crisis.', wordType: 'verb', family: 'amelioration' },
        { id: 'fw022', word: 'cogent', ipa: '/ˈkəʊdʒ(ə)nt/', translation: 'meyakinkan / kuat argumennya / logis', example: 'She presented a cogent argument for reducing carbon emissions.', wordType: 'adjective', family: 'cogency' },
        { id: 'fw023', word: 'purport', ipa: '/ˈpɜːpɔːt/', translation: 'mengaku / mengklaim (biasanya palsu)', example: 'The document purports to be an official government report.', wordType: 'verb', family: 'purported' },
        { id: 'fw024', word: 'herein', ipa: '/ˌhɪərˈɪn/', translation: 'di sini / dalam hal ini / di dalam dokumen ini', example: 'The terms and conditions herein shall be binding on all parties.', wordType: 'adverb', family: '' },
        { id: 'fw025', word: 'concede', ipa: '/kənˈsiːd/', translation: 'mengakui / mengalah dalam suatu argumen', example: 'The politician conceded that mistakes had been made.', wordType: 'verb', family: 'concession' },
      ]
    },
    {
      id: 'idioms',
      name: 'Idioms & Fixed Expressions',
      nameID: 'Idiom & Ekspresi Tetap C1–C2',
      icon: '💡',
      description: 'Advanced idiomatic expressions used by proficient English speakers',
      words: [
        { id: 'id001', word: 'bite the bullet', ipa: '/baɪt ðə ˈbʊlɪt/', translation: 'gigit peluru / menerima hal sulit dengan tabah', example: 'We need to bite the bullet and cut our spending.', wordType: 'idiom', family: '' },
        { id: 'id002', word: 'catch someone off guard', ipa: '/kætʃ ˌsʌmwʌn ɒf ˈɡɑːd/', translation: 'mengejutkan seseorang yang tidak siap', example: 'The sudden resignation caught everyone off guard.', wordType: 'idiom', family: '' },
        { id: 'id003', word: 'go against the grain', ipa: '/ɡəʊ əˌɡenst ðə ˈɡreɪn/', translation: 'melawan kebiasaan / bertentangan dengan naluri', example: 'It goes against the grain for her to accept help.', wordType: 'idiom', family: '' },
        { id: 'id004', word: 'let sleeping dogs lie', ipa: '/let ˌsliːpɪŋ ˌdɒɡz ˈlaɪ/', translation: 'jangan membangkitkan masalah lama', example: 'It happened years ago — let sleeping dogs lie.', wordType: 'idiom', family: '' },
        { id: 'id005', word: 'read between the lines', ipa: '/riːd bɪˌtwiːn ðə ˈlaɪnz/', translation: 'membaca di antara baris / memahami makna tersembunyi', example: 'Reading between the lines, it seems they want us to resign.', wordType: 'idiom', family: '' },
        { id: 'id006', word: 'throw caution to the wind', ipa: '/θrəʊ ˈkɔːʃ(ə)n tə ðə ˈwɪnd/', translation: 'mengabaikan risiko / bertindak berani tanpa hati-hati', example: 'She threw caution to the wind and quit her job to travel.', wordType: 'idiom', family: '' },
        { id: 'id007', word: 'nip something in the bud', ipa: '/nɪp ˌsʌmθɪŋ ɪn ðə ˈbʌd/', translation: 'memotong di awal sebelum berkembang', example: 'We need to nip the problem in the bud before it escalates.', wordType: 'idiom', family: '' },
        { id: 'id008', word: 'on the fence', ipa: '/ɒn ðə ˈfens/', translation: 'di atas pagar / belum menentukan pilihan', example: 'Many voters remain on the fence about the new policy.', wordType: 'idiom', family: '' },
        { id: 'id009', word: 'cut corners', ipa: '/kʌt ˈkɔːnəz/', translation: 'memotong sudut / mengurangi kualitas demi menghemat', example: 'The contractor cut corners on safety, which led to the accident.', wordType: 'idiom', family: '' },
        { id: 'id010', word: 'turn a blind eye', ipa: '/tɜːn ə ˌblaɪnd ˈaɪ/', translation: 'menutup mata / berpura-pura tidak tahu', example: 'Management turned a blind eye to the widespread misconduct.', wordType: 'idiom', family: '' },
        { id: 'id011', word: 'burning the midnight oil', ipa: '/ˌbɜːnɪŋ ðə ˌmɪdnaɪt ˈɔɪl/', translation: 'bekerja atau belajar hingga larut malam', example: 'She was burning the midnight oil to finish her dissertation.', wordType: 'idiom', family: '' },
        { id: 'id012', word: 'a double-edged sword', ipa: '/ə ˌdʌb(ə)l ˌedʒd ˈsɔːd/', translation: 'pedang bermata dua / sesuatu yang punya keuntungan dan kerugian', example: 'Social media is a double-edged sword: it connects and isolates.', wordType: 'idiom', family: '' },
        { id: 'id013', word: 'the tip of the iceberg', ipa: '/ðə ˌtɪp əv ðə ˈaɪsbɜːɡ/', translation: 'puncak gunung es / bagian kecil dari masalah yang lebih besar', example: 'The reported cases are just the tip of the iceberg.', wordType: 'idiom', family: '' },
        { id: 'id014', word: 'get the ball rolling', ipa: '/ɡet ðə ˌbɔːl ˈrəʊlɪŋ/', translation: 'memulai sesuatu / menggerakkan proses', example: 'Let me get the ball rolling by introducing the new team members.', wordType: 'idiom', family: '' },
        { id: 'id015', word: 'bark up the wrong tree', ipa: '/bɑːk ʌp ðə ˌrɒŋ ˈtriː/', translation: 'salah sasaran / mengejar sesuatu yang tidak tepat', example: 'If you think he is responsible, you are barking up the wrong tree.', wordType: 'idiom', family: '' },
        { id: 'id016', word: 'keep a low profile', ipa: '/kiːp ə ˌləʊ ˈprəʊfaɪl/', translation: 'menjaga profil rendah / tidak menarik perhatian', example: 'After the controversy, the CEO kept a very low profile.', wordType: 'idiom', family: '' },
        { id: 'id017', word: 'sweeping generalisation', ipa: '/ˌswiːpɪŋ ˌdʒenərəlaɪˈzeɪʃ(ə)n/', translation: 'generalisasi yang terlalu luas / menyamaratakan', example: 'Claiming all politicians are corrupt is a sweeping generalisation.', wordType: 'noun phrase', family: '' },
        { id: 'id018', word: 'take something with a pinch of salt', ipa: '/teɪk ˌsʌmθɪŋ wɪð ə ˌpɪntʃ əv ˈsɔːlt/', translation: 'tidak mempercayai sepenuhnya', example: 'Take his claims with a pinch of salt — he tends to exaggerate.', wordType: 'idiom', family: '' },
        { id: 'id019', word: 'strike while the iron is hot', ipa: '/straɪk ˌwaɪl ðə ˌaɪən ɪz ˈhɒt/', translation: 'manfaatkan kesempatan ketika ada', example: 'We should strike while the iron is hot and close the deal today.', wordType: 'idiom', family: '' },
        { id: 'id020', word: 'a vicious circle', ipa: '/ə ˌvɪʃəs ˈsɜːk(ə)l/', translation: 'lingkaran setan / siklus masalah yang memperkuat diri sendiri', example: 'Poverty creates a vicious circle of poor education and unemployment.', wordType: 'idiom', family: '' },
        { id: 'id021', word: 'pull strings', ipa: '/pʊl ˈstrɪŋz/', translation: 'menggunakan pengaruh / memanfaatkan koneksi untuk hasil tertentu', example: 'He pulled strings to get his son a job at the ministry.', wordType: 'idiom', family: '' },
        { id: 'id022', word: 'cast doubt on', ipa: '/kɑːst ˈdaʊt ɒn/', translation: 'menimbulkan keraguan tentang', example: 'The new evidence cast serious doubt on the official version of events.', wordType: 'idiom', family: '' },
        { id: 'id023', word: 'at the expense of', ipa: '/æt ðɪ ɪkˈspens əv/', translation: 'dengan mengorbankan / dengan mengorbankan sesuatu', example: 'Economic growth came at the expense of environmental protection.', wordType: 'prepositional phrase', family: '' },
        { id: 'id024', word: 'pave the way for', ipa: '/peɪv ðə ˈweɪ fɔː/', translation: 'membuka jalan bagi / memungkinkan sesuatu di masa depan', example: 'The groundbreaking research paved the way for a new treatment.', wordType: 'idiom', family: '' },
        { id: 'id025', word: 'take precedence over', ipa: '/teɪk ˈpresɪd(ə)ns ˌəʊvə/', translation: 'lebih diprioritaskan dari / didahulukan daripada', example: 'Safety must always take precedence over productivity.', wordType: 'idiom', family: '' },
      ]
    },
    {
      id: 'collocations',
      name: 'Advanced Collocations',
      nameID: 'Kolokasi Tingkat Lanjut C1–C2',
      icon: '🔗',
      description: 'Strong word partnerships that elevate academic and professional writing',
      words: [
        { id: 'cl001', word: 'far-reaching consequences', ipa: '/ˌfɑːˈriːtʃɪŋ ˈkɒnsɪkwənsɪz/', translation: 'konsekuensi berdampak luas / akibat yang jauh jangkauannya', example: 'The policy had far-reaching consequences for the entire economy.', wordType: 'collocation', family: '' },
        { id: 'cl002', word: 'stark contrast', ipa: '/stɑːk ˈkɒntrɑːst/', translation: 'kontras yang mencolok / perbedaan yang sangat jelas', example: 'The two cities provide a stark contrast in living standards.', wordType: 'collocation', family: '' },
        { id: 'cl003', word: 'forge a consensus', ipa: '/fɔːdʒ ə kənˈsensəs/', translation: 'membangun kesepakatan / membentuk konsensus', example: 'Leaders must forge a consensus on how to tackle climate change.', wordType: 'collocation', family: '' },
        { id: 'cl004', word: 'entail significant risks', ipa: '/ɪnˈteɪl sɪɡˈnɪfɪkənt ˈrɪsks/', translation: 'mengandung risiko signifikan', example: 'The investment strategy entails significant risks in volatile markets.', wordType: 'collocation', family: '' },
        { id: 'cl005', word: 'come to the fore', ipa: '/kʌm tə ðə ˈfɔː/', translation: 'muncul ke permukaan / menjadi menonjol', example: 'New leaders have come to the fore in recent elections.', wordType: 'collocation', family: '' },
        { id: 'cl006', word: 'bear the brunt of', ipa: '/beə ðə ˈbrʌnt əv/', translation: 'menanggung beban paling berat dari', example: 'The poorest communities bear the brunt of climate change.', wordType: 'collocation', family: '' },
        { id: 'cl007', word: 'engender mistrust', ipa: '/ɪnˈdʒendə mɪsˈtrʌst/', translation: 'menimbulkan ketidakpercayaan', example: 'Repeated broken promises engender mistrust in institutions.', wordType: 'collocation', family: '' },
        { id: 'cl008', word: 'exert pressure on', ipa: '/ɪɡˈzɜːt ˈpreʃər ɒn/', translation: 'memberikan tekanan pada', example: 'Shareholders exerted pressure on the board to cut costs.', wordType: 'collocation', family: '' },
        { id: 'cl009', word: 'foster innovation', ipa: '/ˈfɒstər ˌɪnəˈveɪʃ(ə)n/', translation: 'mendorong inovasi / menumbuhkan kreativitas', example: 'A supportive culture can foster innovation within organisations.', wordType: 'collocation', family: '' },
        { id: 'cl010', word: 'harbour doubts', ipa: '/ˈhɑːbə ˈdaʊts/', translation: 'menyimpan keraguan / menaruh curiga', example: 'Experts harbour serious doubts about the long-term viability of the plan.', wordType: 'collocation', family: '' },
        { id: 'cl011', word: 'mount a challenge', ipa: '/maʊnt ə ˈtʃælɪndʒ/', translation: 'melancarkan tantangan / mengajukan keberatan resmi', example: 'Opposition parties mounted a challenge to the new legislation.', wordType: 'collocation', family: '' },
        { id: 'cl012', word: 'pose a threat', ipa: '/pəʊz ə ˈθret/', translation: 'menimbulkan ancaman', example: 'Rising sea levels pose a direct threat to coastal communities.', wordType: 'collocation', family: '' },
        { id: 'cl013', word: 'redress the balance', ipa: '/rɪˈdres ðə ˈbæləns/', translation: 'menyeimbangkan kembali / memperbaiki ketimpangan', example: 'New measures aim to redress the balance between rich and poor.', wordType: 'collocation', family: '' },
        { id: 'cl014', word: 'signal a departure from', ipa: '/ˈsɪɡn(ə)l ə dɪˈpɑːtʃə frəm/', translation: 'menandai penyimpangan dari / perubahan arah dari', example: 'The announcement signals a significant departure from past policy.', wordType: 'collocation', family: '' },
        { id: 'cl015', word: 'trigger debate', ipa: '/ˈtrɪɡər dɪˈbeɪt/', translation: 'memantik perdebatan / memicu diskusi publik', example: 'The controversial report triggered intense debate in parliament.', wordType: 'collocation', family: '' },
        { id: 'cl016', word: 'wield influence', ipa: '/wiːld ˈɪnfluəns/', translation: 'menggunakan pengaruh / memegang kuasa', example: 'Large corporations wield enormous influence over governments.', wordType: 'collocation', family: '' },
        { id: 'cl017', word: 'straddle the divide', ipa: '/ˈstrædl ðə dɪˈvaɪd/', translation: 'menjembatani perbedaan / berada di dua sisi', example: 'Her work straddles the divide between art and science.', wordType: 'collocation', family: '' },
        { id: 'cl018', word: 'tackle root causes', ipa: '/ˈtæk(ə)l ˌruːt ˈkɔːzɪz/', translation: 'mengatasi akar masalah / menangani penyebab mendasar', example: 'Effective policy must tackle the root causes of poverty.', wordType: 'collocation', family: '' },
        { id: 'cl019', word: 'embody the spirit of', ipa: '/ɪmˈbɒdi ðə ˈspɪrɪt əv/', translation: 'mewujudkan semangat / mencerminkan esensi dari', example: 'Her work embodies the spirit of creative innovation.', wordType: 'collocation', family: '' },
        { id: 'cl020', word: 'lend credibility to', ipa: '/lend kredɪˈbɪlɪti tuː/', translation: 'memberikan kredibilitas pada / memperkuat kepercayaan terhadap', example: 'The endorsement lends credibility to the organisation\'s claims.', wordType: 'collocation', family: '' },
        { id: 'cl021', word: 'incur costs', ipa: '/ɪnˈkɜː ˈkɒsts/', translation: 'menanggung biaya / mengalami pengeluaran', example: 'Delays will inevitably incur additional costs for the project.', wordType: 'collocation', family: '' },
        { id: 'cl022', word: 'prompt reflection on', ipa: '/prɒmpt rɪˈflekʃ(ə)n ɒn/', translation: 'mendorong refleksi tentang / mengajak merenung tentang', example: 'The tragedy prompted deep reflection on national security policy.', wordType: 'collocation', family: '' },
        { id: 'cl023', word: 'reinforce stereotypes', ipa: '/ˌriːɪnˈfɔːs ˈstɪərɪəˌtaɪps/', translation: 'memperkuat stereotip / mempertegas prasangka', example: 'Some media coverage tends to reinforce harmful stereotypes.', wordType: 'collocation', family: '' },
        { id: 'cl024', word: 'uphold principles', ipa: '/ʌpˈhəʊld ˈprɪnsɪp(ə)lz/', translation: 'menjunjung tinggi prinsip / mempertahankan nilai', example: 'The judiciary must uphold the principles of justice for all.', wordType: 'collocation', family: '' },
        { id: 'cl025', word: 'yield to pressure', ipa: '/jiːld tuː ˈpreʃə/', translation: 'menyerah pada tekanan / mengalah', example: 'The minister refused to yield to public pressure to resign.', wordType: 'collocation', family: '' },
      ]
    },
    {
      id: 'phrasal',
      name: 'Phrasal Verbs C1–C2',
      nameID: 'Phrasal Verbs C1–C2',
      icon: '⚡',
      description: 'Complex multi-word verbs essential for fluency in advanced English',
      words: [
        { id: 'pv001', word: 'gloss over', ipa: '/ˈɡlɒs ˌəʊvə/', translation: 'memperhalus / mengabaikan detail penting', example: 'The report glosses over the serious flaws in the methodology.', wordType: 'phrasal verb', family: '' },
        { id: 'pv002', word: 'rein in', ipa: '/ˈreɪn ˌɪn/', translation: 'mengendalikan / membatasi dengan tegas', example: 'The government tried to rein in public spending.', wordType: 'phrasal verb', family: '' },
        { id: 'pv003', word: 'grapple with', ipa: '/ˈɡræp(ə)l ˌwɪð/', translation: 'bergulat dengan / berusaha keras memahami atau mengatasi', example: 'Scientists continue to grapple with the causes of Alzheimer\'s disease.', wordType: 'phrasal verb', family: '' },
        { id: 'pv004', word: 'wade into', ipa: '/ˈweɪd ˌɪntə/', translation: 'terjun ke dalam (isu atau pertengkaran)', example: 'The politician waded into the debate with strong opinions.', wordType: 'phrasal verb', family: '' },
        { id: 'pv005', word: 'carve out', ipa: '/ˈkɑːv ˌaʊt/', translation: 'mengukir / menciptakan sesuatu melalui usaha keras', example: 'She carved out a successful career in international law.', wordType: 'phrasal verb', family: '' },
        { id: 'pv006', word: 'paper over', ipa: '/ˈpeɪpər ˌəʊvə/', translation: 'menutupi masalah sementara / menyembunyikan konflik', example: 'The truce merely papers over the deep divisions in the party.', wordType: 'phrasal verb', family: '' },
        { id: 'pv007', word: 'root out', ipa: '/ˈruːt ˌaʊt/', translation: 'memberantas / menghilangkan sama sekali', example: 'The new inspector is determined to root out corruption.', wordType: 'phrasal verb', family: '' },
        { id: 'pv008', word: 'hold sway', ipa: '/ˈhəʊld ˌsweɪ/', translation: 'mempunyai pengaruh besar / berkuasa', example: 'Traditional values still hold sway in rural areas.', wordType: 'phrasal verb', family: '' },
        { id: 'pv009', word: 'chip away at', ipa: '/ˈtʃɪp əˌweɪ æt/', translation: 'mengikis secara bertahap / melemahkan perlahan', example: 'Inflation has been chipping away at consumers\' purchasing power.', wordType: 'phrasal verb', family: '' },
        { id: 'pv010', word: 'hammer out', ipa: '/ˈhæmər ˌaʊt/', translation: 'membahas hingga menghasilkan kesepakatan', example: 'Negotiators finally hammered out a compromise after five days of talks.', wordType: 'phrasal verb', family: '' },
        { id: 'pv011', word: 'play down', ipa: '/ˈpleɪ ˌdaʊn/', translation: 'meremehkan / mengecilkan arti sesuatu', example: 'Officials tried to play down the severity of the crisis.', wordType: 'phrasal verb', family: '' },
        { id: 'pv012', word: 'iron out', ipa: '/ˈaɪən ˌaʊt/', translation: 'menyelesaikan / merapikan masalah kecil', example: 'There are still a few technical issues to iron out.', wordType: 'phrasal verb', family: '' },
        { id: 'pv013', word: 'vie for', ipa: '/ˈvaɪ fɔː/', translation: 'bersaing / berkompetisi untuk', example: 'Several candidates are vying for the leadership position.', wordType: 'phrasal verb', family: '' },
        { id: 'pv014', word: 'hedge against', ipa: '/ˈhedʒ əˌɡenst/', translation: 'melindungi diri dari risiko / berjaga-jaga terhadap', example: 'Diversifying investments helps hedge against market volatility.', wordType: 'phrasal verb', family: '' },
        { id: 'pv015', word: 'bear out', ipa: '/ˈbeər ˌaʊt/', translation: 'mengkonfirmasi / membuktikan kebenaran', example: 'The latest data bears out the theory about climate change.', wordType: 'phrasal verb', family: '' },
        { id: 'pv016', word: 'single out', ipa: '/ˈsɪŋɡ(ə)l ˌaʊt/', translation: 'memilih / menarget individu tertentu dari kelompok', example: 'She was singled out for special praise by the committee.', wordType: 'phrasal verb', family: '' },
        { id: 'pv017', word: 'fall short of', ipa: '/ˈfɔːl ˌʃɔːt əv/', translation: 'tidak memenuhi / berada di bawah standar yang diharapkan', example: 'The project fell short of the ambitious targets set by management.', wordType: 'phrasal verb', family: '' },
        { id: 'pv018', word: 'draw on', ipa: '/ˈdrɔː ˌɒn/', translation: 'memanfaatkan / menggunakan sebagai sumber', example: 'Her writing draws on years of field research in conflict zones.', wordType: 'phrasal verb', family: '' },
        { id: 'pv019', word: 'set back', ipa: '/ˈset ˌbæk/', translation: 'menghambat kemajuan / memperlambat perkembangan', example: 'The scandal set back the reform movement by several years.', wordType: 'phrasal verb', family: '' },
        { id: 'pv020', word: 'run counter to', ipa: '/ˈrʌn ˌkaʊntər tuː/', translation: 'bertentangan dengan / berjalan melawan', example: 'This policy runs counter to the principles of free trade.', wordType: 'phrasal verb', family: '' },
        { id: 'pv021', word: 'give rise to', ipa: '/ˌɡɪv ˈraɪz tuː/', translation: 'menimbulkan / menjadi penyebab munculnya', example: 'Rapid urbanisation has given rise to serious social challenges.', wordType: 'phrasal verb', family: '' },
        { id: 'pv022', word: 'lapse into', ipa: '/ˈlæps ˌɪntə/', translation: 'terjerumus ke / kembali ke kebiasaan buruk', example: 'Without continuous effort, it is easy to lapse into bad habits.', wordType: 'phrasal verb', family: '' },
        { id: 'pv023', word: 'stand up to scrutiny', ipa: '/ˌstænd ˈʌp tə ˈskruːtɪni/', translation: 'tahan uji / dapat dipertanggungjawabkan', example: 'Not all of his claims stand up to scrutiny.', wordType: 'phrasal verb', family: '' },
        { id: 'pv024', word: 'push through', ipa: '/ˈpʊʃ ˌθruː/', translation: 'mendorong (kebijakan) agar disahkan meski ada tentangan', example: 'The government pushed through the bill despite strong opposition.', wordType: 'phrasal verb', family: '' },
        { id: 'pv025', word: 'kick off', ipa: '/ˈkɪk ˌɒf/', translation: 'memulai / meluncurkan secara resmi', example: 'The summit kicked off with a keynote address from the president.', wordType: 'phrasal verb', family: '' },
      ]
    },
    {
      id: 'word_formation',
      name: 'Word Formation Patterns',
      nameID: 'Pola Pembentukan Kata',
      icon: '🔤',
      description: 'Affixes, derivations and transformations central to C1–C2 word knowledge',
      words: [
        { id: 'wf001', word: 'counterproductive', ipa: '/ˌkaʊntəprəˈdʌktɪv/', translation: 'kontraproduktif / menghasilkan efek sebaliknya', example: 'Over-regulation can be counterproductive, stifling the very innovation it seeks to encourage.', wordType: 'adjective', family: 'productivity, produce' },
        { id: 'wf002', word: 'unprecedented', ipa: '/ʌnˈpresɪdentɪd/', translation: 'belum pernah terjadi sebelumnya / luar biasa', example: 'The pandemic caused unprecedented disruption to global supply chains.', wordType: 'adjective', family: 'precedent, precede' },
        { id: 'wf003', word: 'disproportionate', ipa: '/ˌdɪsprəˈpɔːʃ(ə)nət/', translation: 'tidak proporsional / tidak sebanding', example: 'The punishment was disproportionate to the severity of the offence.', wordType: 'adjective', family: 'proportion, proportionate' },
        { id: 'wf004', word: 'sustainability', ipa: '/səˌsteɪnəˈbɪlɪti/', translation: 'keberlanjutan / kemampuan untuk terus bertahan', example: 'Sustainability is at the heart of the company\'s long-term strategy.', wordType: 'noun', family: 'sustain, sustainable' },
        { id: 'wf005', word: 'misrepresentation', ipa: '/ˌmɪsˌreprɪzenˈteɪʃ(ə)n/', translation: 'penyajian yang menyesatkan / representasi yang tidak akurat', example: 'The article was a gross misrepresentation of the scientific findings.', wordType: 'noun', family: 'represent, misrepresent' },
        { id: 'wf006', word: 'interoperability', ipa: '/ˌɪntərˌɒpərəˈbɪlɪti/', translation: 'interoperabilitas / kemampuan sistem bekerja bersama', example: 'The new software standard improves interoperability between platforms.', wordType: 'noun', family: 'operate, interoperable' },
        { id: 'wf007', word: 'oversimplification', ipa: '/ˌəʊvəˌsɪmplɪfɪˈkeɪʃ(ə)n/', translation: 'penyederhanaan berlebihan / simplifikasi yang menyesatkan', example: 'Saying crime is caused only by poverty is an oversimplification.', wordType: 'noun', family: 'simplify, oversimplify' },
        { id: 'wf008', word: 'underrepresented', ipa: '/ˌʌndərˌreprɪˈzentɪd/', translation: 'kurang terwakili / jumlahnya lebih kecil dari yang seharusnya', example: 'Women remain underrepresented in senior management positions.', wordType: 'adjective', family: 'represent, underrepresent' },
        { id: 'wf009', word: 'recontextualise', ipa: '/ˌriːkənˈtekstʃʊəlaɪz/', translation: 'mengkontekstualisasi ulang / memberikan makna baru dalam konteks lain', example: 'The director recontextualises the classic play for a modern audience.', wordType: 'verb', family: 'context, contextualise' },
        { id: 'wf010', word: 'disenchantment', ipa: '/ˌdɪsɪnˈtʃɑːntmənt/', translation: 'kekecewaan / hilangnya kepercayaan atau harapan', example: 'Growing disenchantment with politics has led to low voter turnout.', wordType: 'noun', family: 'enchant, disenchant' },
        { id: 'wf011', word: 'impartiality', ipa: '/ɪmˌpɑːʃiˈæləti/', translation: 'ketidakberpihakan / keadilan dan objektivitas', example: 'Journalists must demonstrate impartiality in their reporting.', wordType: 'noun', family: 'partial, impartial' },
        { id: 'wf012', word: 'circumspect', ipa: '/ˈsɜːkəmspekt/', translation: 'berhati-hati / mempertimbangkan segala aspek sebelum bertindak', example: 'She was circumspect in her comments about the ongoing investigation.', wordType: 'adjective', family: 'circumspection' },
        { id: 'wf013', word: 'multifaceted', ipa: '/ˌmʌltiˈfæsɪtɪd/', translation: 'multifaset / kompleks dengan banyak dimensi', example: 'Addressing climate change requires a multifaceted approach.', wordType: 'adjective', family: 'facet, multifaceted' },
        { id: 'wf014', word: 'counterintuitive', ipa: '/ˌkaʊntərɪnˈtjuːɪtɪv/', translation: 'kontraintuitif / bertentangan dengan intuisi umum', example: 'It may seem counterintuitive, but failure is key to long-term success.', wordType: 'adjective', family: 'intuitive, intuition' },
        { id: 'wf015', word: 'dehumanise', ipa: '/diːˈhjuːmanaɪz/', translation: 'dehumanisasi / menghilangkan sifat kemanusiaan', example: 'Using language that dehumanises opponents escalates conflict.', wordType: 'verb', family: 'human, humanise, dehumanisation' },
        { id: 'wf016', word: 'self-perpetuating', ipa: '/ˌself pəˈpetʃueɪtɪŋ/', translation: 'melanggengkan diri sendiri / terus memperkuat dirinya', example: 'Inequality is self-perpetuating without deliberate intervention.', wordType: 'adjective', family: 'perpetuate, perpetual' },
        { id: 'wf017', word: 'interdependency', ipa: '/ˌɪntədɪˈpendənsi/', translation: 'saling ketergantungan / hubungan saling membutuhkan', example: 'Globalisation has deepened the interdependency of national economies.', wordType: 'noun', family: 'depend, interdependent' },
        { id: 'wf018', word: 'reconceptualise', ipa: '/ˌriːkənˈseptʃuəlaɪz/', translation: 'mengonseptualisasikan ulang / memikirkan kembali secara mendasar', example: 'The crisis forced policymakers to reconceptualise their approach.', wordType: 'verb', family: 'concept, conceptualise' },
        { id: 'wf019', word: 'pre-empt', ipa: '/ˌpriːˈempt/', translation: 'mendahului / mencegah dengan bertindak lebih awal', example: 'The government pre-empted criticism by releasing the full report.', wordType: 'verb', family: 'pre-emptive, pre-emption' },
        { id: 'wf020', word: 'irrefutable', ipa: '/ɪˈrefjʊtəb(ə)l/', translation: 'tidak terbantahkan / tidak dapat disangkal', example: 'The DNA evidence was irrefutable, sealing his conviction.', wordType: 'adjective', family: 'refute, irrefutably' },
        { id: 'wf021', word: 'accountability', ipa: '/əˌkaʊntəˈbɪlɪti/', translation: 'akuntabilitas / tanggung jawab atas tindakan', example: 'Greater accountability in public institutions builds trust.', wordType: 'noun', family: 'accountable, account' },
        { id: 'wf022', word: 'transcend', ipa: '/trænˈsend/', translation: 'melampaui / melewati batas tertentu', example: 'Her artwork transcends cultural and linguistic boundaries.', wordType: 'verb', family: 'transcendence, transcendent' },
        { id: 'wf023', word: 'fragmentation', ipa: '/ˌfræɡmenˈteɪʃ(ə)n/', translation: 'fragmentasi / perpecahan menjadi bagian-bagian kecil', example: 'The fragmentation of political parties has destabilised the government.', wordType: 'noun', family: 'fragment, fragmented' },
        { id: 'wf024', word: 'compoundingly', ipa: '/kəmˈpaʊndɪŋli/', translation: 'secara kumulatif / dengan efek yang makin berlipat', example: 'The problems compoundingly affected the most vulnerable communities.', wordType: 'adverb', family: 'compound, compounding' },
        { id: 'wf025', word: 'macro-level', ipa: '/ˈmækrəʊ ˌlev(ə)l/', translation: 'tingkat makro / pada skala besar atau menyeluruh', example: 'At the macro-level, the data shows strong economic growth.', wordType: 'adjective/noun', family: 'macro, level' },
      ]
    },
    {
      id: 'nuanced',
      name: 'Nuanced Adjectives & Adverbs',
      nameID: 'Kata Sifat & Keterangan Bernuansa',
      icon: '✨',
      description: 'Precise, high-register descriptors that convey subtle shades of meaning',
      words: [
        { id: 'na001', word: 'astute', ipa: '/əˈstjuːt/', translation: 'cerdik / jeli / tajam dalam penilaian', example: 'Her astute analysis anticipated the market crash by six months.', wordType: 'adjective', family: 'astuteness, astutely' },
        { id: 'na002', word: 'sanguine', ipa: '/ˈsæŋɡwɪn/', translation: 'optimistis / yakin akan hasil baik', example: 'He remained sanguine about the prospects for a negotiated settlement.', wordType: 'adjective', family: '' },
        { id: 'na003', word: 'tenuous', ipa: '/ˈtenjʊəs/', translation: 'lemah / rapuh / tidak kuat (hubungan atau argumen)', example: 'The connection between the two events is tenuous at best.', wordType: 'adjective', family: 'tenuously' },
        { id: 'na004', word: 'incisive', ipa: '/ɪnˈsaɪsɪv/', translation: 'tajam / langsung ke inti masalah', example: 'The journalist is known for her incisive questioning of politicians.', wordType: 'adjective', family: 'incisively' },
        { id: 'na005', word: 'elusive', ipa: '/ɪˈluːsɪv/', translation: 'sulit ditangkap / sulit didefinisikan atau diperoleh', example: 'Peace in the region remains an elusive goal despite decades of negotiation.', wordType: 'adjective', family: 'elusively, elusiveness' },
        { id: 'na006', word: 'scrupulous', ipa: '/ˈskruːpjʊləs/', translation: 'teliti / sangat berhati-hati dalam hal kebenaran', example: 'The researcher was scrupulous in documenting every data point.', wordType: 'adjective', family: 'scrupulously, scrupulousness' },
        { id: 'na007', word: 'precarious', ipa: '/prɪˈkeərɪəs/', translation: 'tidak stabil / bergantung pada sesuatu yang tidak pasti', example: 'Workers in the gig economy often face precarious employment conditions.', wordType: 'adjective', family: 'precariously, precariousness' },
        { id: 'na008', word: 'ambivalent', ipa: '/æmˈbɪvələnt/', translation: 'ambivalen / memiliki perasaan yang saling bertentangan', example: 'She felt ambivalent about the job offer — excited but also apprehensive.', wordType: 'adjective', family: 'ambivalence, ambivalently' },
        { id: 'na009', word: 'intractable', ipa: '/ɪnˈtræktəb(ə)l/', translation: 'sulit diatasi / keras kepala / tidak mudah diselesaikan', example: 'The conflict has become an intractable political problem for the region.', wordType: 'adjective', family: 'intractably' },
        { id: 'na010', word: 'tacit', ipa: '/ˈtæsɪt/', translation: 'diam-diam / tersirat / tidak diucapkan secara eksplisit', example: 'There was a tacit understanding between the two leaders.', wordType: 'adjective', family: 'tacitly, tacitness' },
        { id: 'na011', word: 'profoundly', ipa: '/prəˈfaʊndli/', translation: 'secara mendalam / sangat berpengaruh', example: 'The experience profoundly changed her outlook on life.', wordType: 'adverb', family: 'profound, profundity' },
        { id: 'na012', word: 'acutely', ipa: '/əˈkjuːtli/', translation: 'secara tajam / dengan sangat jelas atau parah', example: 'She was acutely aware of the risks involved in the venture.', wordType: 'adverb', family: 'acute, acuteness' },
        { id: 'na013', word: 'ostensibly', ipa: '/ɒˈstensɪbli/', translation: 'secara tampaknya / seolah-olah (tapi mungkin tidak)', example: 'Ostensibly, the policy aims to reduce poverty, but critics see other motives.', wordType: 'adverb', family: 'ostensible, ostension' },
        { id: 'na014', word: 'inexorably', ipa: '/ɪˈneksərəbli/', translation: 'tak terhindarkan / terus bergerak tanpa bisa dihentikan', example: 'Technology is inexorably changing the nature of work.', wordType: 'adverb', family: 'inexorable' },
        { id: 'na015', word: 'pervasive', ipa: '/pəˈveɪsɪv/', translation: 'meresap ke mana-mana / menyebar luas dan sulit dihilangkan', example: 'The pervasive influence of social media shapes public opinion daily.', wordType: 'adjective', family: 'pervade, pervasively' },
        { id: 'na016', word: 'contentious', ipa: '/kənˈtenʃəs/', translation: 'kontroversial / memicu perdebatan', example: 'Euthanasia remains a highly contentious issue in many countries.', wordType: 'adjective', family: 'contention, contentiously' },
        { id: 'na017', word: 'implicit', ipa: '/ɪmˈplɪsɪt/', translation: 'implisit / tersirat / tidak dinyatakan secara langsung', example: 'There was implicit criticism in his response to the question.', wordType: 'adjective', family: 'imply, implicitly' },
        { id: 'na018', word: 'manifestly', ipa: '/ˈmænɪfestli/', translation: 'secara nyata / jelas terlihat tanpa perlu penjelasan', example: 'The decision was manifestly unfair and lacked any legal basis.', wordType: 'adverb', family: 'manifest, manifestation' },
        { id: 'na019', word: 'fraught with', ipa: '/frɔːt wɪð/', translation: 'penuh dengan / sarat (risiko atau kesulitan)', example: 'The peace negotiations were fraught with difficulties and mistrust.', wordType: 'adjective phrase', family: '' },
        { id: 'na020', word: 'palpable', ipa: '/ˈpælpəb(ə)l/', translation: 'terasa nyata / dapat dirasakan secara jelas', example: 'There was a palpable sense of tension in the negotiating room.', wordType: 'adjective', family: 'palpably' },
        { id: 'na021', word: 'unequivocal', ipa: '/ˌʌnɪˈkwɪvək(ə)l/', translation: 'tidak ambigu / tegas dan jelas', example: 'The committee gave its unequivocal support to the proposed reform.', wordType: 'adjective', family: 'unequivocally' },
        { id: 'na022', word: 'sporadic', ipa: '/spəˈrædɪk/', translation: 'sporadis / tidak teratur / terjadi sesekali saja', example: 'Sporadic protests erupted in several cities following the announcement.', wordType: 'adjective', family: 'sporadically' },
        { id: 'na023', word: 'meticulous', ipa: '/mɪˈtɪkjʊləs/', translation: 'teliti / penuh perhatian pada detail', example: 'The forensic team conducted a meticulous examination of the crime scene.', wordType: 'adjective', family: 'meticulously, meticulousness' },
        { id: 'na024', word: 'arbitrary', ipa: '/ˈɑːbɪtr(ə)ri/', translation: 'sewenang-wenang / berdasarkan kehendak tanpa alasan yang jelas', example: 'The selection criteria seemed arbitrary and lacked transparency.', wordType: 'adjective', family: 'arbitrarily, arbitrariness' },
        { id: 'na025', word: 'unprecedented', ipa: '/ʌnˈpresɪdentɪd/', translation: 'belum pernah terjadi sebelumnya', example: 'The scale of the humanitarian disaster was unprecedented in modern history.', wordType: 'adjective', family: 'precedent' },
        { id: 'na026', word: 'disconcerting', ipa: '/ˌdɪskənˈsɜːtɪŋ/', translation: 'mengganggu / menimbulkan kekhawatiran atau kebingungan', example: 'It is disconcerting that so little progress has been made after years of talks.', wordType: 'adjective', family: 'disconcert, disconcertingly' },
        { id: 'na027', word: 'rudimentary', ipa: '/ˌruːdɪˈment(ə)ri/', translation: 'mendasar / pada tingkat dasar / belum berkembang', example: 'A rudimentary understanding of economics is essential for all citizens.', wordType: 'adjective', family: 'rudiment' },
        { id: 'na028', word: 'categorical', ipa: '/ˌkætɪˈɡɒrɪk(ə)l/', translation: 'kategoris / tegas tanpa syarat', example: 'The minister gave a categorical denial of any wrongdoing.', wordType: 'adjective', family: 'categorically, category' },
        { id: 'na029', word: 'pivotal', ipa: '/ˈpɪvət(ə)l/', translation: 'krusial / sangat penting / menjadi titik balik', example: 'The meeting played a pivotal role in resolving the dispute.', wordType: 'adjective', family: 'pivot, pivotally' },
        { id: 'na030', word: 'cursory', ipa: '/ˈkɜːs(ə)ri/', translation: 'sekilas / dilakukan dengan cepat tanpa ketelitian', example: 'A cursory reading of the contract revealed several serious flaws.', wordType: 'adjective', family: 'cursorily' },
      ]
    },
    {
      id: 'specialized',
      name: 'Specialized Domains',
      nameID: 'Domain Khusus: Sains, Hukum & Bisnis',
      icon: '🔬',
      description: 'Technical vocabulary from science, law and business encountered at C1–C2 level',
      words: [
        { id: 'sp001', word: 'jurisprudence', ipa: '/ˌdʒʊərɪsˈpruːd(ə)ns/', translation: 'yurisprudensi / teori dan filsafat hukum', example: 'The ruling set an important precedent in human rights jurisprudence.', wordType: 'noun (law)', family: 'jurisprudential' },
        { id: 'sp002', word: 'litigant', ipa: '/ˈlɪtɪɡənt/', translation: 'pihak yang berperkara / penggugat atau tergugat', example: 'Both litigants presented their arguments to the tribunal.', wordType: 'noun (law)', family: 'litigate, litigation' },
        { id: 'sp003', word: 'subpoena', ipa: '/səbˈpiːnə/', translation: 'surat panggilan pengadilan', example: 'The journalist received a subpoena to testify before the grand jury.', wordType: 'noun (law)', family: '' },
        { id: 'sp004', word: 'fiduciary', ipa: '/fɪˈdjuːʃ(ə)ri/', translation: 'fidusia / hubungan kepercayaan dalam hukum keuangan', example: 'The fund manager has a fiduciary duty to act in the client\'s best interest.', wordType: 'adjective/noun (law)', family: '' },
        { id: 'sp005', word: 'injunction', ipa: '/ɪnˈdʒʌŋkʃ(ə)n/', translation: 'injunksi / perintah pengadilan untuk mencegah suatu tindakan', example: 'The court issued an injunction preventing the factory from operating.', wordType: 'noun (law)', family: 'enjoin' },
        { id: 'sp006', word: 'aggregate demand', ipa: '/ˈæɡrɪɡɪt dɪˈmɑːnd/', translation: 'permintaan agregat / total permintaan dalam perekonomian', example: 'A fall in aggregate demand can trigger a recession.', wordType: 'noun phrase (economics)', family: 'aggregate' },
        { id: 'sp007', word: 'monetise', ipa: '/ˈmʌnɪtaɪz/', translation: 'memonetisasi / mengubah sesuatu menjadi sumber pendapatan', example: 'The startup found innovative ways to monetise its user data legally.', wordType: 'verb (business)', family: 'monetisation, monetary' },
        { id: 'sp008', word: 'leveraged buyout', ipa: '/ˈlevərɪdʒd ˈbaɪaʊt/', translation: 'pembelian dengan utang / pengambilalihan perusahaan menggunakan pinjaman', example: 'The firm executed a leveraged buyout of its main competitor.', wordType: 'noun phrase (finance)', family: 'leverage' },
        { id: 'sp009', word: 'hypothesis', ipa: '/haɪˈpɒθɪsɪs/', translation: 'hipotesis / dugaan sementara yang perlu diuji', example: 'The researcher formulated a clear hypothesis before conducting the experiment.', wordType: 'noun (science)', family: 'hypothesise, hypothetical' },
        { id: 'sp010', word: 'metabolism', ipa: '/mɪˈtæbəlɪz(ə)m/', translation: 'metabolisme / proses kimia dalam organisme hidup', example: 'Exercise boosts metabolism, helping the body burn calories more efficiently.', wordType: 'noun (biology)', family: 'metabolise, metabolic' },
        { id: 'sp011', word: 'entropy', ipa: '/ˈentrəpi/', translation: 'entropi / kecenderungan sistem menuju ketidakorderan', example: 'In thermodynamics, entropy always increases in isolated systems.', wordType: 'noun (science)', family: 'entropic' },
        { id: 'sp012', word: 'catalyst for change', ipa: '/ˈkætəlɪst fɔː tʃeɪndʒ/', translation: 'katalis perubahan / pemicu transformasi', example: 'The economic crisis acted as a catalyst for change in political leadership.', wordType: 'noun phrase', family: '' },
        { id: 'sp013', word: 'paradigm shift', ipa: '/ˈpærədaɪm ʃɪft/', translation: 'pergeseran paradigma / perubahan mendasar dalam cara berpikir', example: 'The internet represented a paradigm shift in how humans communicate.', wordType: 'noun phrase (science/business)', family: '' },
        { id: 'sp014', word: 'stakeholder', ipa: '/ˈsteɪkhəʊldə/', translation: 'pemangku kepentingan / pihak yang terpengaruh oleh keputusan', example: 'All key stakeholders must be consulted before a final decision is made.', wordType: 'noun (business)', family: 'stakeholding' },
        { id: 'sp015', word: 'solvency', ipa: '/ˈsɒlv(ə)nsi/', translation: 'solvabilitas / kemampuan membayar kewajiban keuangan', example: 'The bank was declared insolvent, raising concerns about broader solvency.', wordType: 'noun (finance)', family: 'solvent, insolvent' },
        { id: 'sp016', word: 'biodiversity', ipa: '/ˌbaɪəʊdaɪˈvɜːsɪti/', translation: 'keanekaragaman hayati', example: 'Deforestation is the leading threat to global biodiversity.', wordType: 'noun (biology)', family: 'diverse, biodiversity loss' },
        { id: 'sp017', word: 'genome', ipa: '/ˈdʒiːnəʊm/', translation: 'genom / keseluruhan materi genetik suatu organisme', example: 'Mapping the human genome has revolutionised medicine.', wordType: 'noun (genetics)', family: 'genomics, genomic' },
        { id: 'sp018', word: 'cartel', ipa: '/kɑːˈtel/', translation: 'kartel / kelompok produsen yang bersepakat mengendalikan harga', example: 'The oil cartel restricted production to keep prices artificially high.', wordType: 'noun (economics)', family: '' },
        { id: 'sp019', word: 'pandemic', ipa: '/pænˈdemɪk/', translation: 'pandemi / wabah penyakit yang menyebar lintas negara', example: 'The 2020 pandemic exposed deep inequalities in healthcare systems.', wordType: 'noun (medicine/policy)', family: 'pandemic, epidemic, endemic' },
        { id: 'sp020', word: 'quantitative easing', ipa: '/ˌkwɒntɪtətɪv ˈiːzɪŋ/', translation: 'pelonggaran kuantitatif / kebijakan bank sentral mencetak uang', example: 'Quantitative easing was introduced to prevent economic collapse after the crisis.', wordType: 'noun phrase (finance)', family: '' },
        { id: 'sp021', word: 'null hypothesis', ipa: '/ˌnʌl haɪˈpɒθɪsɪs/', translation: 'hipotesis nol / asumsi tidak ada efek, diuji dalam penelitian', example: 'The study rejected the null hypothesis with 95% confidence.', wordType: 'noun phrase (research)', family: 'hypothesis' },
        { id: 'sp022', word: 'collateral damage', ipa: '/kəˈlæt(ə)r(ə)l ˈdæmɪdʒ/', translation: 'kerusakan sampingan / kerugian yang tidak disengaja', example: 'Civilian casualties were described as collateral damage in the official report.', wordType: 'noun phrase (law/military)', family: '' },
        { id: 'sp023', word: 'vicarious liability', ipa: '/vɪˈkeərɪəs laɪəˈbɪlɪti/', translation: 'tanggung jawab pengganti / tanggung gugat atas tindakan orang lain', example: 'The employer was found to have vicarious liability for the employee\'s negligence.', wordType: 'noun phrase (law)', family: '' },
        { id: 'sp024', word: 'scalability', ipa: '/ˌskeɪləˈbɪlɪti/', translation: 'skalabilitas / kemampuan sistem tumbuh seiring permintaan', example: 'Scalability is a key consideration when designing cloud-based infrastructure.', wordType: 'noun (technology)', family: 'scale, scalable' },
        { id: 'sp025', word: 'tipping point', ipa: '/ˈtɪpɪŋ pɔɪnt/', translation: 'titik kritis / momen di mana perubahan menjadi tidak terbendung', example: 'Scientists warn we are approaching a climatic tipping point.', wordType: 'noun phrase (science/general)', family: '' },
      ]
    }
  ];

  function getAllWords() {
    const result = [];
    DOMAINS.forEach(d => {
      d.words.forEach(w => result.push({ ...w, domainId: d.id, domainName: d.nameID }));
    });
    return result;
  }

  function getDomain(id) { return DOMAINS.find(d => d.id === id) || null; }

  function getAllDomains() { return DOMAINS; }

  function getWordFamilies() {
    // Group words that share a root family
    const allWords = getAllWords();
    const families = {};
    allWords.forEach(w => {
      if (w.family) {
        const roots = w.family.split(',').map(f => f.trim()).filter(Boolean);
        roots.forEach(root => {
          if (!families[root]) families[root] = [];
          families[root].push(w);
        });
      }
    });
    return families;
  }

  return { getAllWords, getDomain, getAllDomains, getWordFamilies, DOMAINS };
})();
