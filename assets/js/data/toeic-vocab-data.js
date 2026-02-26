/**
 * EnglishPath — TOEIC Vocabulary Data
 * Fase 14a: 300+ Business English words
 * Domains: meetings, HR, finance, office, travel, logistics, customer service, general business
 */
const TOEICVocabData = (() => {

  const DOMAINS = [
    {
      id: 'meetings',
      name: 'Meetings & Presentations',
      nameID: 'Rapat & Presentasi',
      icon: '🤝',
      description: 'Vocabulary for business meetings, discussions, and presentations',
      words: [
        { id: 'mt001', word: 'agenda', ipa: '/əˈdʒendə/', translation: 'agenda / jadwal rapat', example: 'The agenda for the meeting was distributed in advance.', category: 'noun' },
        { id: 'mt002', word: 'adjourn', ipa: '/əˈdʒɜːn/', translation: 'menunda / menutup rapat', example: 'The chairman decided to adjourn the meeting until Friday.', category: 'verb' },
        { id: 'mt003', word: 'allocate', ipa: '/ˈæləkeɪt/', translation: 'mengalokasikan', example: 'We need to allocate more time for Q&A sessions.', category: 'verb' },
        { id: 'mt004', word: 'attendee', ipa: '/ˌætɛnˈdiː/', translation: 'peserta / hadirin', example: 'All attendees must sign the registration form.', category: 'noun' },
        { id: 'mt005', word: 'brainstorm', ipa: '/ˈbreɪnstɔːm/', translation: 'curah gagasan', example: 'Let\'s brainstorm ideas for the new campaign.', category: 'verb' },
        { id: 'mt006', word: 'briefing', ipa: '/ˈbriːfɪŋ/', translation: 'pengarahan / briefing', example: 'The team received a briefing before the client call.', category: 'noun' },
        { id: 'mt007', word: 'chairperson', ipa: '/ˈtʃeəpɜːsən/', translation: 'ketua rapat', example: 'The chairperson opened the annual general meeting.', category: 'noun' },
        { id: 'mt008', word: 'collaborate', ipa: '/kəˈlæbəreɪt/', translation: 'berkolaborasi / bekerja sama', example: 'The departments need to collaborate on this project.', category: 'verb' },
        { id: 'mt009', word: 'conference', ipa: '/ˈkɒnfərəns/', translation: 'konferensi / pertemuan', example: 'The annual sales conference is held in Singapore.', category: 'noun' },
        { id: 'mt010', word: 'consensus', ipa: '/kənˈsensəs/', translation: 'konsensus / kesepakatan', example: 'We need to reach a consensus before moving forward.', category: 'noun' },
        { id: 'mt011', word: 'delegate', ipa: '/ˈdelɪɡeɪt/', translation: 'mendelegasikan / utusan', example: 'The manager will delegate tasks to the team members.', category: 'verb/noun' },
        { id: 'mt012', word: 'facilitate', ipa: '/fəˈsɪlɪteɪt/', translation: 'memfasilitasi', example: 'She was asked to facilitate the workshop.', category: 'verb' },
        { id: 'mt013', word: 'follow up', ipa: '/ˈfɒloʊ ʌp/', translation: 'menindaklanjuti', example: 'Please follow up on the action items from yesterday\'s meeting.', category: 'phrase' },
        { id: 'mt014', word: 'handout', ipa: '/ˈhændaʊt/', translation: 'bahan handout / materi cetak', example: 'The presenter distributed handouts before the talk.', category: 'noun' },
        { id: 'mt015', word: 'minutes', ipa: '/ˈmɪnɪts/', translation: 'notulen rapat', example: 'Could you take the minutes of today\'s meeting?', category: 'noun' },
        { id: 'mt016', word: 'negotiate', ipa: '/nɪˈɡoʊʃieɪt/', translation: 'bernegosiasi / menegosiasi', example: 'Both parties agreed to negotiate the contract terms.', category: 'verb' },
        { id: 'mt017', word: 'objective', ipa: '/əbˈdʒektɪv/', translation: 'tujuan / sasaran', example: 'The main objective of the meeting is to finalize the budget.', category: 'noun' },
        { id: 'mt018', word: 'postpone', ipa: '/poʊstˈpoʊn/', translation: 'menunda / memundurkan', example: 'The meeting was postponed due to the CEO\'s travel.', category: 'verb' },
        { id: 'mt019', word: 'proposal', ipa: '/prəˈpoʊzəl/', translation: 'proposal / usulan', example: 'We submitted a proposal for the new marketing strategy.', category: 'noun' },
        { id: 'mt020', word: 'reschedule', ipa: '/riːˈʃedjuːl/', translation: 'menjadwal ulang', example: 'Can we reschedule Monday\'s call to Wednesday?', category: 'verb' },
        { id: 'mt021', word: 'summarize', ipa: '/ˈsʌməraɪz/', translation: 'meringkas / menyimpulkan', example: 'Please summarize the key decisions at the end.', category: 'verb' },
        { id: 'mt022', word: 'unanimous', ipa: '/juːˈnænɪməs/', translation: 'bulat / mufakat', example: 'The decision was unanimous among all board members.', category: 'adjective' },
        { id: 'mt023', word: 'venue', ipa: '/ˈvenjuː/', translation: 'tempat / lokasi acara', example: 'The venue for the conference was booked months in advance.', category: 'noun' },
        { id: 'mt024', word: 'videoconference', ipa: '/ˈvɪdiəʊˌkɒnfərəns/', translation: 'konferensi video', example: 'We held a videoconference with our overseas partners.', category: 'noun' },
        { id: 'mt025', word: 'workshop', ipa: '/ˈwɜːkʃɒp/', translation: 'lokakarya / workshop', example: 'A leadership workshop was organized for managers.', category: 'noun' },
      ]
    },
    {
      id: 'hr',
      name: 'Human Resources',
      nameID: 'Sumber Daya Manusia',
      icon: '👥',
      description: 'HR, recruitment, and employee management vocabulary',
      words: [
        { id: 'hr001', word: 'applicant', ipa: '/ˈæplɪkənt/', translation: 'pelamar / calon karyawan', example: 'The applicant submitted an impressive resume.', category: 'noun' },
        { id: 'hr002', word: 'appraisal', ipa: '/əˈpreɪzəl/', translation: 'penilaian kinerja', example: 'Annual appraisals help identify areas for improvement.', category: 'noun' },
        { id: 'hr003', word: 'benefit', ipa: '/ˈbenɪfɪt/', translation: 'tunjangan / manfaat', example: 'The company offers excellent health and pension benefits.', category: 'noun' },
        { id: 'hr004', word: 'candidate', ipa: '/ˈkændɪdət/', translation: 'kandidat / calon', example: 'Three candidates were shortlisted for the position.', category: 'noun' },
        { id: 'hr005', word: 'compensation', ipa: '/ˌkɒmpənˈseɪʃən/', translation: 'kompensasi / gaji', example: 'The compensation package includes salary and bonuses.', category: 'noun' },
        { id: 'hr006', word: 'dismiss', ipa: '/dɪsˈmɪs/', translation: 'memecat / memberhentikan', example: 'The employee was dismissed for misconduct.', category: 'verb' },
        { id: 'hr007', word: 'eligible', ipa: '/ˈelɪdʒɪbəl/', translation: 'memenuhi syarat / berhak', example: 'Employees with 3+ years are eligible for the pension.', category: 'adjective' },
        { id: 'hr008', word: 'employment', ipa: '/ɪmˈplɔɪmənt/', translation: 'pekerjaan / kepegawaian', example: 'Full employment remains the goal of economic policy.', category: 'noun' },
        { id: 'hr009', word: 'incentive', ipa: '/ɪnˈsentɪv/', translation: 'insentif / imbalan', example: 'Sales staff receive performance-based incentives.', category: 'noun' },
        { id: 'hr010', word: 'interview', ipa: '/ˈɪntəvjuː/', translation: 'wawancara kerja', example: 'The interview was scheduled for 10 AM on Thursday.', category: 'noun' },
        { id: 'hr011', word: 'maternity leave', ipa: '/məˈtɜːnɪti liːv/', translation: 'cuti hamil / cuti melahirkan', example: 'She will be on maternity leave for three months.', category: 'phrase' },
        { id: 'hr012', word: 'mentor', ipa: '/ˈmentɔː/', translation: 'mentor / pembimbing', example: 'Each new employee is assigned a mentor for the first year.', category: 'noun' },
        { id: 'hr013', word: 'onboarding', ipa: '/ˈɒnbɔːdɪŋ/', translation: 'orientasi karyawan baru', example: 'The onboarding process takes two weeks.', category: 'noun' },
        { id: 'hr014', word: 'overtime', ipa: '/ˈoʊvətaɪm/', translation: 'lembur', example: 'Staff who work overtime will receive additional pay.', category: 'noun' },
        { id: 'hr015', word: 'payroll', ipa: '/ˈpeɪroʊl/', translation: 'penggajian / daftar gaji', example: 'The payroll department processes salaries every month.', category: 'noun' },
        { id: 'hr016', word: 'personnel', ipa: '/ˌpɜːsəˈnel/', translation: 'personel / karyawan', example: 'All personnel must attend the fire safety drill.', category: 'noun' },
        { id: 'hr017', word: 'probation', ipa: '/prəˈbeɪʃən/', translation: 'masa percobaan', example: 'New employees complete a 3-month probation period.', category: 'noun' },
        { id: 'hr018', word: 'promotion', ipa: '/prəˈmoʊʃən/', translation: 'promosi / kenaikan jabatan', example: 'Her excellent performance led to a promotion.', category: 'noun' },
        { id: 'hr019', word: 'recruitment', ipa: '/rɪˈkruːtmənt/', translation: 'perekrutan / rekrutmen', example: 'The recruitment process takes about six weeks.', category: 'noun' },
        { id: 'hr020', word: 'redundancy', ipa: '/rɪˈdʌndənsi/', translation: 'PHK / pemutusan hubungan kerja', example: 'The company announced redundancies due to cost-cutting.', category: 'noun' },
        { id: 'hr021', word: 'resign', ipa: '/rɪˈzaɪn/', translation: 'mengundurkan diri / resign', example: 'She resigned from her position to start her own business.', category: 'verb' },
        { id: 'hr022', word: 'retirement', ipa: '/rɪˈtaɪəmənt/', translation: 'pensiun', example: 'The retirement age in this company is 60.', category: 'noun' },
        { id: 'hr023', word: 'salary', ipa: '/ˈsæləri/', translation: 'gaji', example: 'The starting salary is negotiable depending on experience.', category: 'noun' },
        { id: 'hr024', word: 'training', ipa: '/ˈtreɪnɪŋ/', translation: 'pelatihan', example: 'All staff receive safety training upon joining.', category: 'noun' },
        { id: 'hr025', word: 'turnover', ipa: '/ˈtɜːnoʊvə/', translation: 'perputaran karyawan / omzet', example: 'High staff turnover can be costly for businesses.', category: 'noun' },
      ]
    },
    {
      id: 'finance',
      name: 'Finance & Accounting',
      nameID: 'Keuangan & Akuntansi',
      icon: '💰',
      description: 'Financial terms used in TOEIC business contexts',
      words: [
        { id: 'fi001', word: 'accounts payable', ipa: '/əˈkaʊnts ˈpeɪəbəl/', translation: 'hutang usaha / utang dagang', example: 'Accounts payable must be settled within 30 days.', category: 'phrase' },
        { id: 'fi002', word: 'accounts receivable', ipa: '/əˈkaʊnts rɪˈsiːvəbəl/', translation: 'piutang usaha', example: 'Our accounts receivable increased by 15% this quarter.', category: 'phrase' },
        { id: 'fi003', word: 'audit', ipa: '/ˈɔːdɪt/', translation: 'audit / pemeriksaan keuangan', example: 'An external audit is conducted every year.', category: 'noun/verb' },
        { id: 'fi004', word: 'balance sheet', ipa: '/ˈbæləns ʃiːt/', translation: 'neraca keuangan', example: 'The balance sheet shows the company\'s assets and liabilities.', category: 'phrase' },
        { id: 'fi005', word: 'budget', ipa: '/ˈbʌdʒɪt/', translation: 'anggaran', example: 'We need to stay within our quarterly marketing budget.', category: 'noun' },
        { id: 'fi006', word: 'cash flow', ipa: '/ˈkæʃ fləʊ/', translation: 'arus kas', example: 'Good cash flow management is essential for startups.', category: 'phrase' },
        { id: 'fi007', word: 'commission', ipa: '/kəˈmɪʃən/', translation: 'komisi', example: 'Sales reps earn a 5% commission on each sale.', category: 'noun' },
        { id: 'fi008', word: 'dividend', ipa: '/ˈdɪvɪdend/', translation: 'dividen', example: 'Shareholders received a dividend of $2 per share.', category: 'noun' },
        { id: 'fi009', word: 'expenditure', ipa: '/ɪkˈspendɪtʃə/', translation: 'pengeluaran / belanja', example: 'Total expenditure exceeded the annual budget.', category: 'noun' },
        { id: 'fi010', word: 'forecast', ipa: '/ˈfɔːkɑːst/', translation: 'perkiraan / prakiraan', example: 'The financial forecast predicts 8% growth next year.', category: 'noun/verb' },
        { id: 'fi011', word: 'gross profit', ipa: '/ɡroʊs ˈprɒfɪt/', translation: 'laba kotor', example: 'Gross profit was 42% of total revenue.', category: 'phrase' },
        { id: 'fi012', word: 'inflation', ipa: '/ɪnˈfleɪʃən/', translation: 'inflasi', example: 'Rising inflation has increased production costs.', category: 'noun' },
        { id: 'fi013', word: 'invoice', ipa: '/ˈɪnvɔɪs/', translation: 'faktur / invoice', example: 'Please send the invoice to our accounts department.', category: 'noun' },
        { id: 'fi014', word: 'liability', ipa: '/ˌlaɪəˈbɪlɪti/', translation: 'kewajiban / liabilitas', example: 'Long-term liabilities include loans and bonds.', category: 'noun' },
        { id: 'fi015', word: 'merger', ipa: '/ˈmɜːdʒə/', translation: 'merger / penggabungan perusahaan', example: 'The merger created the largest bank in the region.', category: 'noun' },
        { id: 'fi016', word: 'net profit', ipa: '/net ˈprɒfɪt/', translation: 'laba bersih', example: 'Net profit after tax was reported at $4.5 million.', category: 'phrase' },
        { id: 'fi017', word: 'overhead', ipa: '/ˈoʊvəhed/', translation: 'biaya overhead / biaya umum', example: 'The company is trying to reduce overhead costs.', category: 'noun' },
        { id: 'fi018', word: 'portfolio', ipa: '/pɔːtˈfoʊlioʊ/', translation: 'portofolio', example: 'Our investment portfolio includes stocks and bonds.', category: 'noun' },
        { id: 'fi019', word: 'quarterly', ipa: '/ˈkwɔːtəli/', translation: 'triwulanan / per kuartal', example: 'Quarterly reports are submitted to the board.', category: 'adjective' },
        { id: 'fi020', word: 'revenue', ipa: '/ˈrevənjuː/', translation: 'pendapatan / omzet', example: 'Annual revenue grew by 12% compared to last year.', category: 'noun' },
        { id: 'fi021', word: 'shareholder', ipa: '/ˈʃeəhoʊldə/', translation: 'pemegang saham', example: 'Shareholders voted on the new board members.', category: 'noun' },
        { id: 'fi022', word: 'subsidy', ipa: '/ˈsʌbsɪdi/', translation: 'subsidi', example: 'Government subsidies helped the industry survive.', category: 'noun' },
        { id: 'fi023', word: 'tax deduction', ipa: '/tæks dɪˈdʌkʃən/', translation: 'potongan pajak', example: 'Business expenses qualify for tax deduction.', category: 'phrase' },
        { id: 'fi024', word: 'transaction', ipa: '/trænˈzækʃən/', translation: 'transaksi', example: 'All transactions must be recorded in the ledger.', category: 'noun' },
        { id: 'fi025', word: 'write-off', ipa: '/ˈraɪt ɒf/', translation: 'penghapusan / write-off', example: 'The bad debt was taken as a write-off this year.', category: 'noun' },
      ]
    },
    {
      id: 'office',
      name: 'Office & Administration',
      nameID: 'Kantor & Administrasi',
      icon: '🏢',
      description: 'Everyday office and administrative vocabulary',
      words: [
        { id: 'of001', word: 'archive', ipa: '/ˈɑːkaɪv/', translation: 'arsip / mengarsipkan', example: 'Old records are archived in the basement.', category: 'noun/verb' },
        { id: 'of002', word: 'cc', ipa: '/ˌsiː ˈsiː/', translation: 'tembusan / CC (email)', example: 'Please CC the manager on all client correspondence.', category: 'verb' },
        { id: 'of003', word: 'circulation', ipa: '/ˌsɜːkjʊˈleɪʃən/', translation: 'peredaran / distribusi (dokumen)', example: 'The memo is in circulation among department heads.', category: 'noun' },
        { id: 'of004', word: 'comply', ipa: '/kəmˈplaɪ/', translation: 'mematuhi / memenuhi', example: 'All staff must comply with the new dress code.', category: 'verb' },
        { id: 'of005', word: 'confidential', ipa: '/ˌkɒnfɪˈdenʃəl/', translation: 'rahasia / konfidensial', example: 'Employee salaries are confidential information.', category: 'adjective' },
        { id: 'of006', word: 'correspondence', ipa: '/ˌkɒrɪˈspɒndəns/', translation: 'korespondensi / surat-menyurat', example: 'All correspondence must be saved for six years.', category: 'noun' },
        { id: 'of007', word: 'deadline', ipa: '/ˈdedlaɪn/', translation: 'tenggat waktu / deadline', example: 'The project deadline is the end of this month.', category: 'noun' },
        { id: 'of008', word: 'directory', ipa: '/dɪˈrektəri/', translation: 'direktori / buku petunjuk', example: 'Check the office directory for her extension number.', category: 'noun' },
        { id: 'of009', word: 'duplicate', ipa: '/ˈdjuːplɪkeɪt/', translation: 'rangkap / menduplikasi', example: 'Please make a duplicate of all signed contracts.', category: 'noun/verb' },
        { id: 'of010', word: 'efficient', ipa: '/ɪˈfɪʃənt/', translation: 'efisien', example: 'We need a more efficient filing system.', category: 'adjective' },
        { id: 'of011', word: 'equipment', ipa: '/ɪˈkwɪpmənt/', translation: 'peralatan / perlengkapan', example: 'All office equipment must be maintained regularly.', category: 'noun' },
        { id: 'of012', word: 'expire', ipa: '/ɪkˈspaɪə/', translation: 'kadaluarsa / habis masa berlaku', example: 'Your employee ID will expire at year-end.', category: 'verb' },
        { id: 'of013', word: 'fax', ipa: '/fæks/', translation: 'faks', example: 'Please fax the signed documents to our office.', category: 'noun/verb' },
        { id: 'of014', word: 'filing', ipa: '/ˈfaɪlɪŋ/', translation: 'pengarsipan / filling dokumen', example: 'Filing documents correctly saves a lot of time.', category: 'noun' },
        { id: 'of015', word: 'headquarters', ipa: '/ˈhedˌkwɔːtəz/', translation: 'kantor pusat / markas', example: 'The company\'s headquarters is in Jakarta.', category: 'noun' },
        { id: 'of016', word: 'inventory', ipa: '/ˈɪnvəntri/', translation: 'inventaris / stok barang', example: 'We need to update the office supply inventory.', category: 'noun' },
        { id: 'of017', word: 'itinerary', ipa: '/aɪˈtɪnərəri/', translation: 'jadwal perjalanan / itinerari', example: 'Your travel itinerary has been emailed to you.', category: 'noun' },
        { id: 'of018', word: 'memo', ipa: '/ˈmemoʊ/', translation: 'memo / nota internal', example: 'The CEO sent a memo about the new office policy.', category: 'noun' },
        { id: 'of019', word: 'photocopier', ipa: '/ˈfoʊtəʊˌkɒpiə/', translation: 'mesin fotokopi', example: 'The photocopier is out of paper again.', category: 'noun' },
        { id: 'of020', word: 'premises', ipa: '/ˈpremɪsɪz/', translation: 'tempat / lokasi / gedung', example: 'Smoking is not allowed on the company premises.', category: 'noun' },
        { id: 'of021', word: 'procedure', ipa: '/prəˈsiːdʒə/', translation: 'prosedur', example: 'Follow the standard procedure for submitting expenses.', category: 'noun' },
        { id: 'of022', word: 'receptionist', ipa: '/rɪˈsepʃənɪst/', translation: 'resepsionis', example: 'The receptionist will direct you to the meeting room.', category: 'noun' },
        { id: 'of023', word: 'stationery', ipa: '/ˈsteɪʃənri/', translation: 'alat tulis / stationery', example: 'Office stationery is ordered monthly.', category: 'noun' },
        { id: 'of024', word: 'subscription', ipa: '/səbˈskrɪpʃən/', translation: 'langganan / berlangganan', example: 'The company has a subscription to several journals.', category: 'noun' },
        { id: 'of025', word: 'workload', ipa: '/ˈwɜːkloʊd/', translation: 'beban kerja', example: 'The new system has helped reduce the team\'s workload.', category: 'noun' },
      ]
    },
    {
      id: 'travel',
      name: 'Travel & Transportation',
      nameID: 'Perjalanan & Transportasi',
      icon: '✈️',
      description: 'Business travel and transport vocabulary',
      words: [
        { id: 'tr001', word: 'accommodation', ipa: '/əˌkɒməˈdeɪʃən/', translation: 'akomodasi / penginapan', example: 'The company provides accommodation for business trips.', category: 'noun' },
        { id: 'tr002', word: 'boarding pass', ipa: '/ˈbɔːdɪŋ pɑːs/', translation: 'kartu naik pesawat / boarding pass', example: 'Please print your boarding pass before check-in.', category: 'phrase' },
        { id: 'tr003', word: 'business class', ipa: '/ˈbɪznɪs klɑːs/', translation: 'kelas bisnis', example: 'Senior executives fly business class for long-haul flights.', category: 'phrase' },
        { id: 'tr004', word: 'cancellation', ipa: '/ˌkænsəˈleɪʃən/', translation: 'pembatalan', example: 'There is a fee for flight cancellation less than 24 hours before.', category: 'noun' },
        { id: 'tr005', word: 'check in', ipa: '/ˈtʃek ɪn/', translation: 'check-in / mendaftar tiba', example: 'Please check in at least two hours before departure.', category: 'verb' },
        { id: 'tr006', word: 'commute', ipa: '/kəˈmjuːt/', translation: 'perjalanan kerja / komuter', example: 'His daily commute is over one hour.', category: 'noun/verb' },
        { id: 'tr007', word: 'connecting flight', ipa: '/kəˈnektɪŋ flaɪt/', translation: 'penerbangan transit / connecting flight', example: 'Her connecting flight was delayed by two hours.', category: 'phrase' },
        { id: 'tr008', word: 'customs', ipa: '/ˈkʌstəmz/', translation: 'bea cukai / imigrasi', example: 'All passengers must pass through customs on arrival.', category: 'noun' },
        { id: 'tr009', word: 'departure', ipa: '/dɪˈpɑːtʃə/', translation: 'keberangkatan', example: 'Departure is scheduled for 7:30 AM.', category: 'noun' },
        { id: 'tr010', word: 'embassy', ipa: '/ˈembəsi/', translation: 'kedutaan besar', example: 'You need to apply for a visa at the embassy.', category: 'noun' },
        { id: 'tr011', word: 'expense report', ipa: '/ɪkˈspens rɪˌpɔːt/', translation: 'laporan biaya perjalanan', example: 'Submit your expense report within 5 days of returning.', category: 'phrase' },
        { id: 'tr012', word: 'itinerary', ipa: '/aɪˈtɪnərəri/', translation: 'rencana perjalanan', example: 'The travel agency prepared a detailed itinerary.', category: 'noun' },
        { id: 'tr013', word: 'layover', ipa: '/ˈleɪoʊvə/', translation: 'transit / singgah', example: 'We have a 3-hour layover in Kuala Lumpur.', category: 'noun' },
        { id: 'tr014', word: 'luggage', ipa: '/ˈlʌɡɪdʒ/', translation: 'bagasi / koper', example: 'Checked luggage must not exceed 23kg.', category: 'noun' },
        { id: 'tr015', word: 'passport', ipa: '/ˈpɑːspɔːt/', translation: 'paspor', example: 'Make sure your passport is valid for at least 6 months.', category: 'noun' },
        { id: 'tr016', word: 'per diem', ipa: '/pɜː ˈdiːəm/', translation: 'uang harian / biaya per hari', example: 'Staff receive a per diem allowance while traveling.', category: 'phrase' },
        { id: 'tr017', word: 'reimbursement', ipa: '/ˌriːɪmˈbɜːsmənt/', translation: 'penggantian biaya / reimbursement', example: 'Submit receipts for reimbursement within 30 days.', category: 'noun' },
        { id: 'tr018', word: 'reservation', ipa: '/ˌrezəˈveɪʃən/', translation: 'reservasi / pemesanan', example: 'Please confirm your hotel reservation in advance.', category: 'noun' },
        { id: 'tr019', word: 'terminal', ipa: '/ˈtɜːmɪnəl/', translation: 'terminal bandara', example: 'International flights depart from Terminal 3.', category: 'noun' },
        { id: 'tr020', word: 'transit visa', ipa: '/ˈtrænsɪt ˈviːzə/', translation: 'visa transit', example: 'Some nationalities need a transit visa for this connection.', category: 'phrase' },
        { id: 'tr021', word: 'turbulence', ipa: '/ˈtɜːbjʊləns/', translation: 'turbulensi / guncangan penerbangan', example: 'Passengers were asked to fasten seatbelts due to turbulence.', category: 'noun' },
        { id: 'tr022', word: 'visa', ipa: '/ˈviːzə/', translation: 'visa', example: 'A business visa is required for the trade conference.', category: 'noun' },
        { id: 'tr023', word: 'voucher', ipa: '/ˈvaʊtʃə/', translation: 'voucher / kupon', example: 'The hotel provided a meal voucher for the delayed guests.', category: 'noun' },
        { id: 'tr024', word: 'window seat', ipa: '/ˈwɪndoʊ siːt/', translation: 'tempat duduk jendela', example: 'She always requests a window seat on long flights.', category: 'phrase' },
        { id: 'tr025', word: 'work permit', ipa: '/ˈwɜːk pɜːmɪt/', translation: 'izin kerja', example: 'Foreigners need a valid work permit to be employed here.', category: 'phrase' },
      ]
    },
    {
      id: 'logistics',
      name: 'Logistics & Supply Chain',
      nameID: 'Logistik & Rantai Pasokan',
      icon: '📦',
      description: 'Supply chain, shipping, and logistics vocabulary',
      words: [
        { id: 'lo001', word: 'backorder', ipa: '/ˈbækˌɔːdə/', translation: 'pesanan tertunda / backorder', example: 'The item is on backorder and will ship next week.', category: 'noun' },
        { id: 'lo002', word: 'cargo', ipa: '/ˈkɑːɡoʊ/', translation: 'kargo / muatan', example: 'The cargo arrived at the port on Tuesday.', category: 'noun' },
        { id: 'lo003', word: 'consignment', ipa: '/kənˈsaɪnmənt/', translation: 'kiriman / konsinyasi', example: 'A consignment of 500 units was shipped yesterday.', category: 'noun' },
        { id: 'lo004', word: 'container', ipa: '/kənˈteɪnə/', translation: 'kontainer / peti kemas', example: 'Goods were loaded into a 20-foot container.', category: 'noun' },
        { id: 'lo005', word: 'customs clearance', ipa: '/ˈkʌstəmz ˈklɪərəns/', translation: 'pengurusan bea cukai', example: 'Customs clearance may take up to 3 days.', category: 'phrase' },
        { id: 'lo006', word: 'defective', ipa: '/dɪˈfektɪv/', translation: 'cacat / rusak', example: 'Defective products must be returned to the supplier.', category: 'adjective' },
        { id: 'lo007', word: 'delivery', ipa: '/dɪˈlɪvəri/', translation: 'pengiriman / penyerahan', example: 'Express delivery is available for an extra charge.', category: 'noun' },
        { id: 'lo008', word: 'dispatch', ipa: '/dɪˈspætʃ/', translation: 'mengirim / mengirimkan barang', example: 'Orders are dispatched within 2 business days.', category: 'verb' },
        { id: 'lo009', word: 'distribution', ipa: '/ˌdɪstrɪˈbjuːʃən/', translation: 'distribusi / penyaluran', example: 'The distribution centre handles 10,000 parcels daily.', category: 'noun' },
        { id: 'lo010', word: 'freight', ipa: '/freɪt/', translation: 'angkutan barang / kargo', example: 'Air freight is faster but more expensive than sea freight.', category: 'noun' },
        { id: 'lo011', word: 'inventory', ipa: '/ˈɪnvəntri/', translation: 'persediaan / stok', example: 'We track inventory using a real-time management system.', category: 'noun' },
        { id: 'lo012', word: 'lead time', ipa: '/ˈliːd taɪm/', translation: 'waktu tunggu / lead time', example: 'The supplier lead time is typically three weeks.', category: 'phrase' },
        { id: 'lo013', word: 'manufacturer', ipa: '/ˌmænjʊˈfæktʃərə/', translation: 'produsen / pabrik', example: 'We source directly from the manufacturer.', category: 'noun' },
        { id: 'lo014', word: 'order form', ipa: '/ˈɔːdə fɔːm/', translation: 'formulir pemesanan', example: 'Please complete the order form and email it.', category: 'phrase' },
        { id: 'lo015', word: 'out of stock', ipa: '/aʊt əv stɒk/', translation: 'kehabisan stok', example: 'The product is currently out of stock.', category: 'phrase' },
        { id: 'lo016', word: 'packing slip', ipa: '/ˈpækɪŋ slɪp/', translation: 'daftar barang dalam kiriman', example: 'Include a packing slip with each shipment.', category: 'phrase' },
        { id: 'lo017', word: 'purchase order', ipa: '/ˈpɜːtʃɪs ˈɔːdə/', translation: 'pesanan pembelian / PO', example: 'A purchase order is required before delivery.', category: 'phrase' },
        { id: 'lo018', word: 'refund', ipa: '/ˈriːfʌnd/', translation: 'pengembalian uang / refund', example: 'A full refund will be issued for defective goods.', category: 'noun' },
        { id: 'lo019', word: 'retailer', ipa: '/ˈriːteɪlə/', translation: 'pengecer / retailer', example: 'We sell through authorized retailers only.', category: 'noun' },
        { id: 'lo020', word: 'shipment', ipa: '/ˈʃɪpmənt/', translation: 'pengiriman / muatan kapal', example: 'The shipment arrived two days ahead of schedule.', category: 'noun' },
        { id: 'lo021', word: 'storage', ipa: '/ˈstɔːrɪdʒ/', translation: 'penyimpanan / gudang', example: 'Additional storage space has been rented.', category: 'noun' },
        { id: 'lo022', word: 'supplier', ipa: '/səˈplaɪə/', translation: 'pemasok / supplier', example: 'We have three main suppliers for raw materials.', category: 'noun' },
        { id: 'lo023', word: 'tracking number', ipa: '/ˈtrækɪŋ ˈnʌmbə/', translation: 'nomor pelacakan paket', example: 'Use your tracking number to check the delivery status.', category: 'phrase' },
        { id: 'lo024', word: 'warehouse', ipa: '/ˈweəhaʊs/', translation: 'gudang', example: 'The goods are stored in our warehouse in Surabaya.', category: 'noun' },
        { id: 'lo025', word: 'wholesale', ipa: '/ˈhoʊlseɪl/', translation: 'grosir / partai besar', example: 'Wholesale prices are offered for orders over 100 units.', category: 'noun/adjective' },
      ]
    },
    {
      id: 'customer_service',
      name: 'Customer Service',
      nameID: 'Layanan Pelanggan',
      icon: '🎯',
      description: 'Customer service and client relations vocabulary',
      words: [
        { id: 'cs001', word: 'acknowledgement', ipa: '/əkˈnɒlɪdʒmənt/', translation: 'penerimaan / pengakuan', example: 'You will receive an acknowledgement email shortly.', category: 'noun' },
        { id: 'cs002', word: 'assistance', ipa: '/əˈsɪstəns/', translation: 'bantuan / pertolongan', example: 'Our team is available for assistance 24/7.', category: 'noun' },
        { id: 'cs003', word: 'callback', ipa: '/ˈkɔːlbæk/', translation: 'panggilan balik', example: 'I\'ll arrange a callback from our technical team.', category: 'noun' },
        { id: 'cs004', word: 'claim', ipa: '/kleɪm/', translation: 'klaim / pengaduan', example: 'Please submit your claim with supporting documents.', category: 'noun' },
        { id: 'cs005', word: 'complaint', ipa: '/kəmˈpleɪnt/', translation: 'keluhan / pengaduan', example: 'All complaints are addressed within 48 hours.', category: 'noun' },
        { id: 'cs006', word: 'courtesy', ipa: '/ˈkɜːtɪsi/', translation: 'kesopanan / keramahan', example: 'Please extend courtesy to all customers.', category: 'noun' },
        { id: 'cs007', word: 'customer satisfaction', ipa: '/ˈkʌstəmə ˌsætɪsˈfækʃən/', translation: 'kepuasan pelanggan', example: 'Customer satisfaction is our top priority.', category: 'phrase' },
        { id: 'cs008', word: 'escalate', ipa: '/ˈeskəleɪt/', translation: 'eskalasi / meningkatkan (masalah)', example: 'If unresolved, the issue will be escalated to management.', category: 'verb' },
        { id: 'cs009', word: 'feedback', ipa: '/ˈfiːdbæk/', translation: 'umpan balik / masukan', example: 'We welcome feedback from all our clients.', category: 'noun' },
        { id: 'cs010', word: 'guarantee', ipa: '/ˌɡærənˈtiː/', translation: 'jaminan / garansi', example: 'We guarantee 100% satisfaction or a full refund.', category: 'noun/verb' },
        { id: 'cs011', word: 'inquiry', ipa: '/ɪnˈkwaɪəri/', translation: 'pertanyaan / permohonan informasi', example: 'For product inquiries, please contact our sales team.', category: 'noun' },
        { id: 'cs012', word: 'loyalty', ipa: '/ˈlɔɪəlti/', translation: 'loyalitas / kesetiaan', example: 'We reward customer loyalty with discount points.', category: 'noun' },
        { id: 'cs013', word: 'on hold', ipa: '/ɒn hoʊld/', translation: 'dalam antrian / ditunda', example: 'Your call is on hold. Please wait.', category: 'phrase' },
        { id: 'cs014', word: 'policy', ipa: '/ˈpɒlɪsi/', translation: 'kebijakan', example: 'Our return policy allows exchanges within 30 days.', category: 'noun' },
        { id: 'cs015', word: 'priority', ipa: '/praɪˈɒrɪti/', translation: 'prioritas', example: 'Premium members receive priority customer service.', category: 'noun' },
        { id: 'cs016', word: 'query', ipa: '/ˈkwɪəri/', translation: 'pertanyaan / kueri', example: 'Submit your query through our online portal.', category: 'noun' },
        { id: 'cs017', word: 'refund policy', ipa: '/ˈriːfʌnd ˈpɒlɪsi/', translation: 'kebijakan pengembalian uang', example: 'Please review our refund policy before purchasing.', category: 'phrase' },
        { id: 'cs018', word: 'resolution', ipa: '/ˌrezəˈluːʃən/', translation: 'resolusi / penyelesaian', example: 'We aim for same-day resolution of all issues.', category: 'noun' },
        { id: 'cs019', word: 'service level agreement', ipa: '/ˈsɜːvɪs ˈlevəl əˈɡriːmənt/', translation: 'perjanjian tingkat layanan / SLA', example: 'The SLA guarantees a 4-hour response time.', category: 'phrase' },
        { id: 'cs020', word: 'spokesperson', ipa: '/ˈspoʊkspɜːsən/', translation: 'juru bicara', example: 'The company spokesperson addressed all media questions.', category: 'noun' },
        { id: 'cs021', word: 'survey', ipa: '/ˈsɜːveɪ/', translation: 'survei / kuesioner', example: 'Please complete our satisfaction survey after your visit.', category: 'noun' },
        { id: 'cs022', word: 'technical support', ipa: '/ˈteknɪkəl səˈpɔːt/', translation: 'dukungan teknis', example: 'Contact technical support if the issue persists.', category: 'phrase' },
        { id: 'cs023', word: 'terms and conditions', ipa: '/ˈtɜːmz ænd kənˈdɪʃənz/', translation: 'syarat dan ketentuan', example: 'Please read the terms and conditions carefully.', category: 'phrase' },
        { id: 'cs024', word: 'troubleshoot', ipa: '/ˈtrʌbəlʃuːt/', translation: 'memecahkan masalah teknis', example: 'Our technician will troubleshoot the device remotely.', category: 'verb' },
        { id: 'cs025', word: 'warranty', ipa: '/ˈwɒrənti/', translation: 'garansi produk', example: 'This product comes with a 2-year warranty.', category: 'noun' },
      ]
    },
    {
      id: 'general_business',
      name: 'General Business',
      nameID: 'Bisnis Umum',
      icon: '💼',
      description: 'General business English used across TOEIC sections',
      words: [
        { id: 'gb001', word: 'acquisition', ipa: '/ˌækwɪˈzɪʃən/', translation: 'akuisisi / pengambilalihan', example: 'The acquisition of the startup was completed last month.', category: 'noun' },
        { id: 'gb002', word: 'brand awareness', ipa: '/brænd əˈweənɪs/', translation: 'kesadaran merek / brand awareness', example: 'The campaign significantly increased brand awareness.', category: 'phrase' },
        { id: 'gb003', word: 'benchmark', ipa: '/ˈbentʃmɑːk/', translation: 'tolok ukur / patokan', example: 'Our performance exceeds the industry benchmark.', category: 'noun' },
        { id: 'gb004', word: 'clientele', ipa: '/ˌklaɪənˈtel/', translation: 'pelanggan tetap / klientel', example: 'Our clientele includes major global corporations.', category: 'noun' },
        { id: 'gb005', word: 'confidentiality', ipa: '/ˌkɒnfɪˌdenʃɪˈæləti/', translation: 'kerahasiaan', example: 'Sign the confidentiality agreement before joining.', category: 'noun' },
        { id: 'gb006', word: 'consortium', ipa: '/kənˈsɔːtɪəm/', translation: 'konsorsium / gabungan perusahaan', example: 'A consortium of banks funded the project.', category: 'noun' },
        { id: 'gb007', word: 'contract', ipa: '/ˈkɒntrækt/', translation: 'kontrak / perjanjian', example: 'The contract must be signed by both parties.', category: 'noun' },
        { id: 'gb008', word: 'downsizing', ipa: '/ˈdaʊnsaɪzɪŋ/', translation: 'pengurangan karyawan / penyusutan', example: 'Corporate downsizing affected hundreds of workers.', category: 'noun' },
        { id: 'gb009', word: 'entrepreneur', ipa: '/ˌɒntrəprəˈnɜː/', translation: 'wirausahawan / entrepreneur', example: 'Young entrepreneurs are driving innovation.', category: 'noun' },
        { id: 'gb010', word: 'expansion', ipa: '/ɪkˈspænʃən/', translation: 'ekspansi / perluasan', example: 'The company plans expansion into Southeast Asian markets.', category: 'noun' },
        { id: 'gb011', word: 'franchise', ipa: '/ˈfrænʧaɪz/', translation: 'waralaba / franchise', example: 'They opened a franchise of the popular restaurant chain.', category: 'noun' },
        { id: 'gb012', word: 'initiative', ipa: '/ɪˈnɪʃɪətɪv/', translation: 'inisiatif / prakarsa', example: 'A new green initiative was launched this year.', category: 'noun' },
        { id: 'gb013', word: 'joint venture', ipa: '/dʒɔɪnt ˈventʃə/', translation: 'usaha patungan / joint venture', example: 'The joint venture was formed to enter the Asian market.', category: 'phrase' },
        { id: 'gb014', word: 'launch', ipa: '/lɔːntʃ/', translation: 'peluncuran / meluncurkan', example: 'The product launch attracted significant media attention.', category: 'noun/verb' },
        { id: 'gb015', word: 'leverage', ipa: '/ˈliːvərɪdʒ/', translation: 'memanfaatkan / leverage', example: 'We can leverage existing partnerships to grow faster.', category: 'verb/noun' },
        { id: 'gb016', word: 'logistics', ipa: '/ləˈdʒɪstɪks/', translation: 'logistik', example: 'Efficient logistics is key to supply chain management.', category: 'noun' },
        { id: 'gb017', word: 'market share', ipa: '/ˈmɑːkɪt ʃeə/', translation: 'pangsa pasar / market share', example: 'The brand increased its market share by 5% this year.', category: 'phrase' },
        { id: 'gb018', word: 'milestone', ipa: '/ˈmaɪlstəʊn/', translation: 'tonggak pencapaian / milestone', example: 'Reaching 1 million users was a major milestone.', category: 'noun' },
        { id: 'gb019', word: 'outsource', ipa: '/ˈaʊtsɔːs/', translation: 'mengoutsource / menyerahkan ke pihak luar', example: 'Many companies outsource their IT support.', category: 'verb' },
        { id: 'gb020', word: 'overhead costs', ipa: '/ˈoʊvəhed kɒsts/', translation: 'biaya overhead', example: 'Reducing overhead costs improved profitability.', category: 'phrase' },
        { id: 'gb021', word: 'productivity', ipa: '/ˌprɒdʌkˈtɪvɪti/', translation: 'produktivitas', example: 'Remote work has improved employee productivity.', category: 'noun' },
        { id: 'gb022', word: 'profit margin', ipa: '/ˈprɒfɪt ˈmɑːdʒɪn/', translation: 'margin laba / margin keuntungan', example: 'A 20% profit margin is considered healthy.', category: 'phrase' },
        { id: 'gb023', word: 'stakeholder', ipa: '/ˈsteɪkhoʊldə/', translation: 'pemangku kepentingan / stakeholder', example: 'All stakeholders were consulted before the decision.', category: 'noun' },
        { id: 'gb024', word: 'strategy', ipa: '/ˈstrætədʒi/', translation: 'strategi', example: 'The new strategy focuses on digital channels.', category: 'noun' },
        { id: 'gb025', word: 'subsidiary', ipa: '/səbˈsɪdɪəri/', translation: 'anak perusahaan / subsidiaris', example: 'The subsidiary operates independently in each country.', category: 'noun' },
        { id: 'gb026', word: 'sustainability', ipa: '/səˌsteɪnəˈbɪlɪti/', translation: 'keberlanjutan / sustainability', example: 'Sustainability goals are central to corporate policy.', category: 'noun' },
        { id: 'gb027', word: 'target market', ipa: '/ˈtɑːɡɪt ˈmɑːkɪt/', translation: 'target pasar', example: 'Young professionals are our primary target market.', category: 'phrase' },
        { id: 'gb028', word: 'turnover', ipa: '/ˈtɜːnoʊvə/', translation: 'omzet / pendapatan total', example: 'Annual turnover reached $50 million this year.', category: 'noun' },
        { id: 'gb029', word: 'upskill', ipa: '/ˈʌpskɪl/', translation: 'meningkatkan keterampilan', example: 'Employees are encouraged to upskill in digital tools.', category: 'verb' },
        { id: 'gb030', word: 'venture capital', ipa: '/ˈventʃə ˈkæpɪtəl/', translation: 'modal ventura / venture capital', example: 'The startup secured venture capital funding.', category: 'phrase' },
      ]
    }
  ];

  // ── Quiz questions bank ───────────────────────────────────────
  function _buildQuizQuestions(words, count = 10) {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));
    return selected.map(w => {
      const wrong = words.filter(x => x.id !== w.id).sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [w.translation, ...wrong.map(x => x.translation)].sort(() => Math.random() - 0.5);
      return {
        id: w.id,
        word: w.word,
        ipa: w.ipa,
        example: w.example,
        correctAnswer: w.translation,
        options
      };
    });
  }

  // ── Public API ────────────────────────────────────────────────
  return {
    getDomains() { return DOMAINS; },
    getDomain(id) { return DOMAINS.find(d => d.id === id) || null; },
    getAllWords() {
      return DOMAINS.flatMap(d => d.words.map(w => ({ ...w, domainId: d.id, domainName: d.nameID })));
    },
    getWordById(id) {
      for (const d of DOMAINS) {
        const w = d.words.find(x => x.id === id);
        if (w) return { ...w, domainId: d.id, domainName: d.nameID };
      }
      return null;
    },
    buildQuiz(domainId, count = 10) {
      const words = domainId === 'all' ? this.getAllWords()
        : (this.getDomain(domainId)?.words || []).map(w => ({ ...w, domainId }));
      return _buildQuizQuestions(words, count);
    },
    getTotalCount() { return this.getAllWords().length; },
    getDomainCount(id) { return this.getDomain(id)?.words.length || 0; }
  };
})();
