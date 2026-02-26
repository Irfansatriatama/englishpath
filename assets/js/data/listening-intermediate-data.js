/**
 * EnglishPath — Listening Intermediate Data B1–B2
 * Fase 9 — v1.0.0
 *
 * 8 track audio (TTS-driven): 4 B1 + 4 B2
 * Setiap track:
 *   - Transkrip (dibaca via Web Speech API)
 *   - Key phrases
 *   - Quiz: 5 soal (mcq / fill / dictation)
 */

const LISTENING_INTERMEDIATE_DATA = (function () {
  'use strict';

  const TRACKS = [

    // ══════════════════════════════════════════════════════════
    // B1 TRACKS
    // ══════════════════════════════════════════════════════════

    {
      id: 'job-interview',
      level: 'B1',
      icon: '💼',
      title: 'A Job Interview',
      description: 'Listen to a job interview between a candidate and an HR manager.',
      duration: '~2 min',
      category: 'Conversation',
      transcript: [
        'Interviewer: Good morning, please come in. I\'m Sarah Chen, the HR Manager. It\'s nice to meet you.',
        'Candidate: Good morning, Ms Chen. Thank you for seeing me. My name is David Williams.',
        'Interviewer: Please, take a seat. So, David, tell me a little about yourself and why you\'re interested in this position.',
        'Candidate: Of course. I have three years of experience in marketing, mainly working with social media campaigns and content creation. I\'m very interested in this role because your company has an excellent reputation for creative marketing, and I believe I can contribute to your team.',
        'Interviewer: That sounds great. What would you say is your biggest strength?',
        'Candidate: I think my biggest strength is my ability to work well under pressure. In my previous job, I often had to meet tight deadlines, and I learned to stay calm and focused even in stressful situations.',
        'Interviewer: And what about a weakness? Can you tell me about an area you\'re working to improve?',
        'Candidate: I\'d say I sometimes spend too much time on details. I want everything to be perfect. But I\'ve been working on this — I now set time limits for tasks to make sure I meet deadlines without sacrificing quality.',
        'Interviewer: That\'s a very honest answer. Do you have any questions for us?',
        'Candidate: Yes, actually. Could you tell me more about the team I\'d be working with, and what the typical career path looks like in this department?',
        'Interviewer: Of course. Our marketing team has twelve members, and we\'re a very collaborative group. As for career progression, we have a clear development programme for junior marketing executives.',
        'Candidate: That sounds very encouraging. Thank you so much for your time.',
        'Interviewer: Thank you, David. We\'ll be in touch within the next few days.',
      ],
      phrases: [
        { en: 'Tell me about yourself', id: 'Ceritakan tentang diri Anda' },
        { en: 'I have experience in...', id: 'Saya memiliki pengalaman di...' },
        { en: 'My biggest strength is...', id: 'Kekuatan terbesar saya adalah...' },
        { en: 'Work well under pressure', id: 'Bekerja dengan baik di bawah tekanan' },
        { en: "We'll be in touch", id: 'Kami akan menghubungi Anda' },
        { en: 'Career progression', id: 'Perkembangan karier' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'What is the interviewer\'s name and job title?',
          options: ['David Williams, Marketing Manager', 'Sarah Chen, HR Manager', 'Sarah Williams, Team Leader', 'David Chen, Creative Director'],
          answer: 'Sarah Chen, HR Manager',
          audioRef: 'I\'m Sarah Chen, the HR Manager.',
        },
        {
          type: 'mcq',
          question: 'How many years of experience does the candidate have in marketing?',
          options: ['One year', 'Two years', 'Three years', 'Five years'],
          answer: 'Three years',
          audioRef: 'I have three years of experience in marketing.',
        },
        {
          type: 'fill',
          question: 'The candidate says their biggest strength is working well under ________.',
          answer: 'pressure',
          audioRef: 'My biggest strength is my ability to work well under pressure.',
        },
        {
          type: 'mcq',
          question: 'What does the candidate mention as their weakness?',
          options: ['Poor communication', 'Difficulty meeting deadlines', 'Spending too much time on details', 'Lack of marketing experience'],
          answer: 'Spending too much time on details',
          audioRef: 'I sometimes spend too much time on details.',
        },
        {
          type: 'mcq',
          question: 'How many people are in the marketing team?',
          options: ['Six', 'Eight', 'Ten', 'Twelve'],
          answer: 'Twelve',
          audioRef: 'Our marketing team has twelve members.',
        },
      ],
    },

    {
      id: 'travel-podcast',
      level: 'B1',
      icon: '✈️',
      title: 'Budget Travel Tips: A Podcast',
      description: 'Listen to a podcast episode about tips for travelling on a budget.',
      duration: '~2 min',
      category: 'Podcast',
      transcript: [
        'Host: Welcome back to World on a Shoestring, the podcast for budget travellers. I\'m your host, Emma, and today I have some fantastic tips to help you travel more for less. Let\'s get started.',
        'Host: Tip number one: be flexible with your travel dates. Flights on Tuesdays and Wednesdays are often significantly cheaper than weekend flights. If you can shift your departure by just one or two days, you could save a lot of money.',
        'Host: Tip number two: consider alternatives to hotels. Hostels are a great option for solo travellers, and websites like Airbnb offer affordable private rooms. If you\'re feeling adventurous, couchsurfing communities connect travellers with locals who offer free accommodation.',
        'Host: Tip number three: eat like a local. Restaurants in tourist areas charge much higher prices. Instead, head to local markets, street food stalls, and neighbourhood restaurants. Not only will you save money, but you\'ll also get a much more authentic experience.',
        'Host: Tip number four: use public transport. Taxis and private transfers are convenient but expensive. Buses, trains, and metro systems are a fraction of the cost and give you a chance to see the city as locals do.',
        'Host: Tip number five: book your accommodation and activities in advance. Last-minute bookings can be expensive, especially during peak season. Planning ahead gives you access to early-bird discounts and more choices.',
        'Host: And finally, always carry a reusable water bottle. Buying bottled water daily adds up quickly. In most European and North American cities, tap water is perfectly safe to drink.',
        'Host: That\'s all for today\'s episode of World on a Shoestring. If you found this helpful, please subscribe and leave a review. Happy travels!',
      ],
      phrases: [
        { en: 'Budget travel', id: 'Perjalanan hemat/murah' },
        { en: 'Be flexible with dates', id: 'Fleksibel dengan tanggal perjalanan' },
        { en: 'Eat like a local', id: 'Makan seperti penduduk lokal' },
        { en: 'A fraction of the cost', id: 'Sebagian kecil dari biaya' },
        { en: 'Book in advance', id: 'Pesan terlebih dahulu / jauh-jauh hari' },
        { en: 'Early-bird discount', id: 'Diskon untuk pemesanan awal' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'What is the name of the podcast?',
          options: ['Travel Smart', 'World on a Shoestring', 'Budget Explorer', 'Emma\'s Travel Tips'],
          answer: 'World on a Shoestring',
          audioRef: 'Welcome back to World on a Shoestring.',
        },
        {
          type: 'mcq',
          question: 'On which days are flights often cheapest?',
          options: ['Monday and Friday', 'Saturday and Sunday', 'Tuesday and Wednesday', 'Thursday and Friday'],
          answer: 'Tuesday and Wednesday',
          audioRef: 'Flights on Tuesdays and Wednesdays are often significantly cheaper.',
        },
        {
          type: 'fill',
          question: 'To save money on food, the host recommends eating at local markets and street food ________.',
          answer: 'stalls',
          audioRef: 'Head to local markets, street food stalls, and neighbourhood restaurants.',
        },
        {
          type: 'mcq',
          question: 'Why does the host recommend carrying a reusable water bottle?',
          options: ['It helps the environment', 'Buying bottled water daily adds up in cost', 'Tap water is unsafe in most cities', 'Shops do not sell water bottles abroad'],
          answer: 'Buying bottled water daily adds up in cost',
          audioRef: 'Buying bottled water daily adds up quickly.',
        },
        {
          type: 'mcq',
          question: 'What is the benefit of booking accommodation in advance?',
          options: ['You can cancel easily', 'You get access to early-bird discounts', 'Hotels provide free breakfast', 'You avoid passport checks'],
          answer: 'You get access to early-bird discounts',
          audioRef: 'Planning ahead gives you access to early-bird discounts.',
        },
      ],
    },

    {
      id: 'health-news',
      level: 'B1',
      icon: '🏃',
      title: 'Health News Report: The Benefits of Walking',
      description: 'Listen to a news report about the health benefits of daily walking.',
      duration: '~2 min',
      category: 'News Report',
      transcript: [
        'Presenter: Good evening. In tonight\'s health news, researchers have published new findings about the benefits of daily walking. Our science correspondent, James Park, has the details.',
        'James: Thank you, Sarah. A major study published in the British Medical Journal this week has confirmed what many doctors have long suspected: walking regularly is one of the most effective things you can do for your health.',
        'James: The research, which followed over 50,000 participants for ten years, found that people who walked at least 7,000 steps per day had a significantly lower risk of heart disease, diabetes, and some types of cancer compared to those who were less active.',
        'James: Interestingly, the study found that pace matters too. Brisk walkers — those who covered a kilometre in under 12 minutes — showed even greater health benefits than those who walked slowly.',
        'James: Dr Anna Roberts from the University of Manchester, who was not involved in the study, said the findings are very encouraging. She pointed out that walking requires no special equipment, no gym membership, and can be done anywhere.',
        'James: Health authorities are now recommending that adults aim for at least 150 minutes of moderate physical activity per week — and walking counts. Simple changes, such as getting off the bus one stop early or taking the stairs instead of the lift, can make a significant difference.',
        'James: Back to you, Sarah.',
        'Presenter: Thank you, James. An important reminder that staying active doesn\'t have to be complicated or expensive. That\'s all for tonight\'s health news.',
      ],
      phrases: [
        { en: 'Published new findings', id: 'Mempublikasikan temuan baru' },
        { en: 'Brisk walkers', id: 'Pejalan cepat' },
        { en: 'Health authorities', id: 'Otoritas/instansi kesehatan' },
        { en: 'Moderate physical activity', id: 'Aktivitas fisik sedang' },
        { en: 'Was not involved in the study', id: 'Tidak terlibat dalam penelitian tersebut' },
        { en: 'Make a significant difference', id: 'Membuat perbedaan yang signifikan' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'Where was the walking study published?',
          options: ['The Lancet', 'Nature Magazine', 'The British Medical Journal', 'The New England Journal of Medicine'],
          answer: 'The British Medical Journal',
          audioRef: 'A major study published in the British Medical Journal this week.',
        },
        {
          type: 'mcq',
          question: 'How many participants were followed in the study and for how long?',
          options: ['5,000 for 5 years', 'Over 50,000 for 10 years', '10,000 for 20 years', '100,000 for 2 years'],
          answer: 'Over 50,000 for 10 years',
          audioRef: 'Which followed over 50,000 participants for ten years.',
        },
        {
          type: 'fill',
          question: 'People who walked at least ________ steps per day showed significantly lower risk of disease.',
          answer: '7,000',
          audioRef: 'People who walked at least 7,000 steps per day had a significantly lower risk.',
        },
        {
          type: 'mcq',
          question: 'What does Dr Anna Roberts say about walking as exercise?',
          options: ['It requires expensive equipment', 'It is only effective in gyms', 'It requires no special equipment and can be done anywhere', 'It is less effective than running'],
          answer: 'It requires no special equipment and can be done anywhere',
          audioRef: 'Walking requires no special equipment, no gym membership, and can be done anywhere.',
        },
        {
          type: 'mcq',
          question: 'How many minutes of moderate physical activity per week do health authorities now recommend?',
          options: ['100 minutes', '120 minutes', '150 minutes', '200 minutes'],
          answer: '150 minutes',
          audioRef: 'Adults aim for at least 150 minutes of moderate physical activity per week.',
        },
      ],
    },

    {
      id: 'university-lecture',
      level: 'B1',
      icon: '🎓',
      title: 'University Lecture: Introduction to Economics',
      description: 'Listen to part of a university economics lecture on supply and demand.',
      duration: '~2 min',
      category: 'Lecture',
      transcript: [
        'Professor: Good morning everyone, and welcome to Introduction to Economics. Today we\'re going to start with one of the most fundamental concepts in economics: supply and demand.',
        'Professor: Let\'s begin with demand. Demand refers to the quantity of a good or service that consumers are willing and able to buy at a given price. The key word here is "able" — we\'re not just talking about what people want, but what they can actually afford.',
        'Professor: The Law of Demand tells us that, all other things being equal, as the price of a product increases, the quantity demanded decreases. Think about coffee. If a coffee shop suddenly doubles its prices, fewer people will buy coffee there. This is the fundamental relationship between price and demand.',
        'Professor: Now, supply is the other side of the equation. Supply refers to the quantity of a good or service that producers are willing and able to sell at a given price. Unlike demand, supply typically increases as price increases. If coffee prices rise, more farmers will be motivated to grow coffee to profit from higher prices.',
        'Professor: The market price — or equilibrium price — is where supply and demand meet. At this point, the amount producers want to sell equals the amount consumers want to buy. If you look at your textbooks, page forty-seven has an excellent diagram showing this.',
        'Professor: For next week\'s class, I\'d like you to read chapter three and think about a real-world example of how supply and demand affects prices in your daily life. Any questions before we move on?',
      ],
      phrases: [
        { en: 'Supply and demand', id: 'Penawaran dan permintaan' },
        { en: 'All other things being equal', id: 'Dengan asumsi semua faktor lain tetap sama' },
        { en: 'Equilibrium price', id: 'Harga keseimbangan' },
        { en: 'Willing and able', id: 'Bersedia dan mampu' },
        { en: 'Real-world example', id: 'Contoh nyata di dunia nyata' },
        { en: 'As a result', id: 'Sebagai hasilnya; akibatnya' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'What is the topic of today\'s lecture?',
          options: ['Market research', 'Global trade', 'Supply and demand', 'Business management'],
          answer: 'Supply and demand',
          audioRef: 'Today we\'re going to start with supply and demand.',
        },
        {
          type: 'mcq',
          question: 'According to the Law of Demand, what happens when a product\'s price increases?',
          options: ['More people buy it', 'Fewer people buy it', 'The price stays the same', 'Suppliers increase production immediately'],
          answer: 'Fewer people buy it',
          audioRef: 'As the price of a product increases, the quantity demanded decreases.',
        },
        {
          type: 'fill',
          question: 'The ________ price is where the amount producers want to sell equals what consumers want to buy.',
          answer: 'equilibrium',
          audioRef: 'The market price — or equilibrium price — is where supply and demand meet.',
        },
        {
          type: 'mcq',
          question: 'If coffee prices rise, what typically happens to supply?',
          options: ['Supply decreases', 'Supply stays the same', 'More farmers grow coffee to profit', 'Consumers stop buying coffee'],
          answer: 'More farmers grow coffee to profit',
          audioRef: 'If coffee prices rise, more farmers will be motivated to grow coffee to profit from higher prices.',
        },
        {
          type: 'mcq',
          question: 'What homework does the professor assign?',
          options: ['Complete ten practice exercises', 'Watch a documentary', 'Read chapter three and think of a real-world example', 'Write a 500-word essay'],
          answer: 'Read chapter three and think of a real-world example',
          audioRef: 'Read chapter three and think about a real-world example of supply and demand.',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // B2 TRACKS
    // ══════════════════════════════════════════════════════════

    {
      id: 'ted-talk-habits',
      level: 'B2',
      icon: '🧠',
      title: 'Talk: The Science of Habit Formation',
      description: 'Listen to a talk about the neuroscience behind forming good habits.',
      duration: '~3 min',
      category: 'Talk',
      transcript: [
        'Speaker: Thank you. I want to start with a question: how many of your daily actions do you think are actually conscious decisions? Take a moment to consider this.',
        'Speaker: Research by neuroscientists at MIT suggests that approximately 40 to 45 percent of everything we do every day is driven not by deliberate decision-making, but by habit. Nearly half of our behaviour is essentially automatic.',
        'Speaker: So how do habits work? According to what researchers call the "habit loop," every habit consists of three components: a cue, a routine, and a reward. The cue is a trigger that initiates the behaviour. The routine is the behaviour itself. And the reward is what reinforces the habit in the brain.',
        'Speaker: Here\'s a familiar example. You feel stressed — that\'s the cue. You reach for your phone and scroll through social media — that\'s the routine. You feel momentarily distracted and less anxious — that\'s the reward. Over time, this loop becomes deeply embedded in your neural circuitry.',
        'Speaker: The key insight is that habits are never truly deleted from the brain — they can only be replaced. If you want to break a bad habit, you need to identify the cue and the reward, and then substitute a different routine that satisfies the same reward.',
        'Speaker: Studies also show that it takes an average of 66 days to form a new habit — not the 21 days you may have heard. The range varies considerably, from 18 to 254 days depending on the person and the complexity of the behaviour.',
        'Speaker: The practical implication? Don\'t be discouraged if a new habit feels difficult after two or three weeks. You\'re still building the neural pathways. Consistency, rather than perfection, is what matters. Missing one day doesn\'t ruin a habit — giving up entirely does.',
        'Speaker: Thank you.',
      ],
      phrases: [
        { en: 'Conscious decisions', id: 'Keputusan yang disadari' },
        { en: 'The habit loop', id: 'Lingkaran/siklus kebiasaan' },
        { en: 'Neural circuitry', id: 'Rangkaian saraf otak' },
        { en: 'Substitute a routine', id: 'Mengganti suatu rutinitas dengan yang lain' },
        { en: 'Practical implication', id: 'Implikasi praktis; dampak nyata dari suatu temuan' },
        { en: 'Consistency over perfection', id: 'Konsistensi lebih penting daripada kesempurnaan' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'According to MIT researchers, what percentage of daily behaviour is driven by habit?',
          options: ['About 10–15%', 'About 25–30%', 'About 40–45%', 'About 60–70%'],
          answer: 'About 40–45%',
          audioRef: 'Approximately 40 to 45 percent of everything we do is driven by habit.',
        },
        {
          type: 'mcq',
          question: 'In the "habit loop," what is the cue?',
          options: ['The behaviour itself', 'The reward received after the behaviour', 'A trigger that initiates the behaviour', 'A conscious decision to act'],
          answer: 'A trigger that initiates the behaviour',
          audioRef: 'The cue is a trigger that initiates the behaviour.',
        },
        {
          type: 'fill',
          question: 'Habits cannot be deleted from the brain — they can only be ________.',
          answer: 'replaced',
          audioRef: 'Habits are never truly deleted from the brain — they can only be replaced.',
        },
        {
          type: 'mcq',
          question: 'According to studies, how many days does it take on average to form a new habit?',
          options: ['21 days', '30 days', '66 days', '100 days'],
          answer: '66 days',
          audioRef: 'It takes an average of 66 days to form a new habit.',
        },
        {
          type: 'mcq',
          question: 'What does the speaker say is more important than perfection when forming habits?',
          options: ['Speed', 'Motivation', 'Consistency', 'Willpower'],
          answer: 'Consistency',
          audioRef: 'Consistency, rather than perfection, is what matters.',
        },
      ],
    },

    {
      id: 'documentary-narration',
      level: 'B2',
      icon: '🌍',
      title: 'Documentary: Climate Migration',
      description: 'Listen to a documentary narration about people displaced by climate change.',
      duration: '~3 min',
      category: 'Documentary',
      transcript: [
        'Narrator: Across the planet, a quiet crisis is unfolding. Not sudden, not dramatic in the way of earthquakes or tsunamis, but no less devastating in its consequences.',
        'Narrator: Climate migration — the movement of people forced from their homes by the slow, relentless advance of environmental change — is already reshaping communities and nations. Rising sea levels are swallowing coastal villages in Bangladesh and the Pacific Islands. In sub-Saharan Africa, prolonged droughts are turning fertile land into desert. In Central America, unpredictable rainfall is destroying the agriculture that millions depend on for survival.',
        'Narrator: The International Organisation for Migration estimates that by 2050, climate change could displace between 200 million and one billion people. To put that in perspective: the largest refugee crisis in recorded history — the displacement of Syrians during the civil war — involved approximately 13 million people.',
        'Narrator: Yet climate migrants exist in a legal vacuum. Unlike refugees fleeing persecution, they have no formal status under international law. The 1951 Refugee Convention, written in the aftermath of World War Two, makes no provision for those displaced by environmental factors.',
        'Narrator: In the Pacific island nation of Kiribati, the government has been purchasing land in Fiji as a contingency plan — preparing for the day when rising seas may make their islands uninhabitable. This is not science fiction. It is a plan already in motion.',
        'Narrator: The question facing the international community is no longer whether climate migration will occur on a massive scale. It already is. The question is whether our political and legal systems will adapt quickly enough to respond with humanity and justice to the millions who will have no choice but to move.',
      ],
      phrases: [
        { en: 'Relentless advance', id: 'Kemajuan/pergerakan yang tak henti-henti' },
        { en: 'Legal vacuum', id: 'Kekosongan hukum; tidak ada aturan yang mengatur' },
        { en: 'Refugee Convention', id: 'Konvensi pengungsi (perjanjian internasional tentang pengungsi)' },
        { en: 'Contingency plan', id: 'Rencana cadangan untuk menghadapi situasi darurat' },
        { en: 'International community', id: 'Komunitas internasional; negara-negara di seluruh dunia' },
        { en: 'No provision for', id: 'Tidak ada ketentuan/aturan untuk' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'How does the narrator describe climate migration at the beginning?',
          options: ['As sudden and dramatic', 'As a quiet and slow crisis', 'As a minor inconvenience', 'As a solved problem'],
          answer: 'As a quiet and slow crisis',
          audioRef: 'A quiet crisis is unfolding. Not sudden, not dramatic.',
        },
        {
          type: 'mcq',
          question: 'How many climate migrants could be displaced by 2050 according to the IOM?',
          options: ['13 million to 50 million', '50 million to 100 million', '200 million to 1 billion', '2 billion to 3 billion'],
          answer: '200 million to 1 billion',
          audioRef: 'Climate change could displace between 200 million and one billion people.',
        },
        {
          type: 'fill',
          question: 'Climate migrants have no formal status under international law — they exist in a legal ________.',
          answer: 'vacuum',
          audioRef: 'Climate migrants exist in a legal vacuum.',
        },
        {
          type: 'mcq',
          question: 'What has the government of Kiribati done as a contingency plan?',
          options: ['Built higher sea walls', 'Moved its capital city inland', 'Purchased land in Fiji', 'Applied for refugee status'],
          answer: 'Purchased land in Fiji',
          audioRef: 'The government has been purchasing land in Fiji as a contingency plan.',
        },
        {
          type: 'mcq',
          question: 'According to the narrator, what is the main question facing the international community?',
          options: ['How to stop climate change entirely', 'Whether to accept climate refugees', 'Whether political and legal systems can respond with humanity and justice', 'How to rebuild coastal cities'],
          answer: 'Whether political and legal systems can respond with humanity and justice',
          audioRef: 'Whether our political and legal systems will adapt quickly enough to respond with humanity and justice.',
        },
      ],
    },

    {
      id: 'debate-automation',
      level: 'B2',
      icon: '🤝',
      title: 'Debate: Will Automation Destroy Jobs?',
      description: 'Listen to two experts debate the impact of automation on employment.',
      duration: '~3 min',
      category: 'Debate',
      transcript: [
        'Moderator: Good evening. Tonight\'s debate focuses on one of the defining economic questions of our era: Will automation and artificial intelligence destroy employment as we know it? We have two experts with us. Dr Maya Patel argues that automation poses a serious threat to jobs. Professor Liam Brooks disagrees. Dr Patel, let\'s start with you.',
        'Dr Patel: Thank you. The evidence is alarming. McKinsey Global Institute estimates that up to 800 million jobs could be displaced by automation by 2030. We are already seeing this in manufacturing, logistics, and customer service. Entire categories of routine, predictable work — from assembly line tasks to data entry — are being handed to machines at an accelerating pace.',
        'Professor Brooks: With respect, this view lacks historical perspective. Every major technological revolution — from the printing press to the industrial revolution to the internet — was predicted to cause mass unemployment. Instead, technology consistently creates more jobs than it destroys. Automation increases productivity, which generates wealth, which creates demand for new goods and services, which creates new employment.',
        'Dr Patel: The difference this time is speed and scope. Previous technological transitions occurred over generations, giving societies time to adapt. The pace of AI development is fundamentally different. And this time, cognitive tasks — not just physical ones — are being automated. When AI can outperform humans at legal research, medical diagnosis, and financial analysis, what exactly will humans be employed to do?',
        'Professor Brooks: They\'ll be employed in jobs we haven\'t yet imagined. In 1990, who could have predicted that social media managers, app developers, and podcast producers would be major employment categories? My view is that we need investment in education and retraining — not pessimism about the future of work.',
        'Moderator: A fascinating debate. The truth, perhaps, lies somewhere in between — the impact of automation will depend greatly on the policy choices we make in the coming years.',
      ],
      phrases: [
        { en: 'Displaced by automation', id: 'Digantikan/dipindahkan oleh otomasi' },
        { en: 'Historical perspective', id: 'Perspektif sejarah; melihat sesuatu dari sudut pandang sejarah' },
        { en: 'Mass unemployment', id: 'Pengangguran massal' },
        { en: 'Cognitive tasks', id: 'Tugas kognitif; pekerjaan yang melibatkan berpikir dan analisis' },
        { en: 'Retraining', id: 'Pelatihan ulang untuk pekerjaan baru' },
        { en: 'Policy choices', id: 'Pilihan kebijakan; keputusan yang dibuat oleh pemerintah' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'According to Dr Patel, how many jobs could be displaced by automation by 2030?',
          options: ['80 million', '800 million', '8 billion', '80 billion'],
          answer: '800 million',
          audioRef: 'Up to 800 million jobs could be displaced by automation by 2030.',
        },
        {
          type: 'mcq',
          question: 'What is Professor Brooks\'s main argument about automation and jobs?',
          options: ['Automation has always caused mass unemployment', 'Technology historically creates more jobs than it destroys', 'AI is too advanced to be regulated', 'We should slow down technological development'],
          answer: 'Technology historically creates more jobs than it destroys',
          audioRef: 'Technology consistently creates more jobs than it destroys.',
        },
        {
          type: 'fill',
          question: 'Dr Patel argues that this technological transition is different because of its ________ and scope.',
          answer: 'speed',
          audioRef: 'The difference this time is speed and scope.',
        },
        {
          type: 'mcq',
          question: 'What new job categories does Professor Brooks mention as examples of previously unimaginable jobs?',
          options: ['Farmers, doctors, lawyers', 'Pilots, engineers, teachers', 'Social media managers, app developers, podcast producers', 'Miners, factory workers, cashiers'],
          answer: 'Social media managers, app developers, podcast producers',
          audioRef: 'Social media managers, app developers, and podcast producers would be major employment categories.',
        },
        {
          type: 'mcq',
          question: 'What does the moderator suggest at the end of the debate?',
          options: ['Dr Patel is correct', 'Professor Brooks is correct', 'The truth lies somewhere between the two views', 'No conclusion is possible'],
          answer: 'The truth lies somewhere between the two views',
          audioRef: 'The truth, perhaps, lies somewhere in between.',
        },
      ],
    },

    {
      id: 'business-meeting',
      level: 'B2',
      icon: '📊',
      title: 'Business Meeting: Product Launch Strategy',
      description: 'Listen to a business meeting discussing the launch strategy for a new product.',
      duration: '~3 min',
      category: 'Meeting',
      transcript: [
        'Chair: Good morning, everyone. Thank you for joining the quarterly product strategy meeting. Today we\'re focusing on the launch strategy for the EcoPack range. Lisa, could you start with the market research overview?',
        'Lisa: Of course. Our research indicates strong consumer demand for sustainable packaging solutions, particularly among the 25–40 demographic. Eighty-three percent of respondents said they would pay a premium for eco-friendly products if the price differential was within fifteen percent.',
        'Chair: Interesting. And what does competitive analysis show?',
        'Lisa: Our two main competitors have already entered this space, but neither has fully committed. GreenBox is positioning as a budget option, while EcoWrap targets luxury brands. That leaves a significant gap in the mid-market — exactly where we\'re positioned.',
        'James: I\'d like to add a note of caution here. Our supply chain for the new compostable materials is still being finalised. If we commit to a Q3 launch and encounter procurement issues, we risk significant reputational damage.',
        'Chair: That\'s a valid concern, James. What\'s the current status on supplier contracts?',
        'James: We\'ve received confirmations from two of the three suppliers. The third — our primary source for the cellulose-based lining — is still negotiating terms. I\'d recommend building an eight-week buffer into the launch timeline.',
        'Lisa: Understood. In that case, I\'d propose we adjust our target launch to early Q4, which also has the advantage of aligning with the Christmas retail season and our planned sustainability marketing campaign.',
        'Chair: That seems sensible. Let\'s also consider the pricing strategy. Finance has proposed a fifteen percent premium over our existing packaging line. Does the team concur?',
        'James: I think that\'s appropriate, given the research findings. But we should build in a review mechanism at the six-month mark to assess market response.',
        'Chair: Agreed. Let\'s set action items: Lisa, please revise the launch timeline. James, push for resolution on the supplier contract this week. I\'ll brief the board on the revised strategy at Thursday\'s meeting.',
      ],
      phrases: [
        { en: 'Competitive analysis', id: 'Analisis kompetitif; kajian tentang para pesaing' },
        { en: 'Mid-market', id: 'Segmen menengah; pasar antara produk murah dan mewah' },
        { en: 'Supply chain', id: 'Rantai pasokan; proses dari bahan baku ke produk jadi' },
        { en: 'Note of caution', id: 'Peringatan; catatan untuk berhati-hati' },
        { en: 'Reputational damage', id: 'Kerusakan reputasi' },
        { en: 'Action items', id: 'Daftar tugas yang perlu dilakukan setelah rapat' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'What percentage of consumers said they\'d pay a premium for eco-friendly products?',
          options: ['63%', '73%', '83%', '93%'],
          answer: '83%',
          audioRef: 'Eighty-three percent of respondents said they would pay a premium for eco-friendly products.',
        },
        {
          type: 'mcq',
          question: 'How is GreenBox positioned in the market?',
          options: ['As a luxury option', 'As a budget option', 'In the mid-market', 'Targeting sustainable brands only'],
          answer: 'As a budget option',
          audioRef: 'GreenBox is positioning as a budget option.',
        },
        {
          type: 'fill',
          question: 'James recommends building an ________-week buffer into the launch timeline due to supply chain concerns.',
          answer: 'eight',
          audioRef: 'I\'d recommend building an eight-week buffer into the launch timeline.',
        },
        {
          type: 'mcq',
          question: 'What is the advantage of launching in early Q4 according to Lisa?',
          options: ['Lower production costs', 'Less competition', 'Alignment with Christmas retail season', 'Government subsidies available'],
          answer: 'Alignment with Christmas retail season',
          audioRef: 'Aligning with the Christmas retail season and our planned sustainability marketing campaign.',
        },
        {
          type: 'mcq',
          question: 'What is James\'s action item at the end of the meeting?',
          options: ['Brief the board on Thursday', 'Revise the launch timeline', 'Push for resolution on the supplier contract', 'Review the pricing strategy'],
          answer: 'Push for resolution on the supplier contract',
          audioRef: 'James, push for resolution on the supplier contract this week.',
        },
      ],
    },

  ];

  // ── Public API ─────────────────────────────────────────────
  return {
    getAll() { return TRACKS; },
    getByLevel(level) {
      if (level === 'all') return TRACKS;
      return TRACKS.filter(t => t.level === level);
    },
    getByCategory(cat) {
      if (cat === 'all') return TRACKS;
      return TRACKS.filter(t => t.category === cat);
    },
    getById(id) { return TRACKS.find(t => t.id === id) || null; },
    getQuiz(trackId) {
      const track = TRACKS.find(t => t.id === trackId);
      if (!track) return [];
      return [...track.quiz].sort(() => Math.random() - 0.5);
    },
    getCategories() {
      return ['all', ...new Set(TRACKS.map(t => t.category))];
    },
    totalTracks() { return TRACKS.length; },
    getTranscriptText(trackId) {
      const track = TRACKS.find(t => t.id === trackId);
      if (!track) return '';
      return track.transcript.join(' ');
    },
  };

})();
