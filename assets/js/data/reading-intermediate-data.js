/**
 * EnglishPath — Reading Intermediate Data B1–B2
 * Fase 9 — v1.0.0
 *
 * 8 artikel: 4 B1 + 4 B2
 * Setiap artikel:
 *   - Teks artikel (3–5 paragraf)
 *   - Key vocabulary (5–7 kata)
 *   - Quiz: 5 soal (mcq / fill / true-false)
 */

const READING_INTERMEDIATE_DATA = (function () {
  'use strict';

  const ARTICLES = [

    // ══════════════════════════════════════════════════════════
    // B1 ARTICLES
    // ══════════════════════════════════════════════════════════

    {
      id: 'remote-work',
      level: 'B1',
      icon: '💻',
      title: 'The Rise of Remote Work',
      subtitle: 'How working from home changed the world',
      readTime: '3 min',
      topic: 'Work & Society',
      paragraphs: [
        'Before 2020, remote work was considered a privilege for a small number of professionals. Most employees were expected to commute to offices five days a week. The idea of working from home full-time seemed unrealistic for many industries.',
        'The COVID-19 pandemic changed everything. Companies around the world were forced to send their employees home almost overnight. Thanks to video conferencing tools like Zoom and collaboration platforms like Slack, many businesses discovered that their teams could work just as effectively from home.',
        'As the pandemic ended, many employees were reluctant to return to the office full-time. Surveys showed that a majority of workers preferred a hybrid model — spending some days at home and some days in the office. Some companies, particularly in the technology sector, allowed their employees to work remotely permanently.',
        'Remote work has brought significant benefits. Employees save time and money on commuting. They often report higher job satisfaction and better work-life balance. However, challenges remain: feelings of isolation, difficulty separating work from personal life, and the need for reliable internet connections are common issues.',
        'The future of work is clearly changing. Most experts believe that flexible working arrangements are here to stay, fundamentally reshaping how we think about offices and productivity.',
      ],
      vocab: [
        { word: 'commute', def: 'Perjalanan rutin ke tempat kerja (naik kendaraan)' },
        { word: 'reluctant', def: 'Enggan; tidak bersemangat untuk melakukan sesuatu' },
        { word: 'hybrid model', def: 'Model campuran; kombinasi kerja di kantor dan dari rumah' },
        { word: 'isolation', def: 'Perasaan terpisah/sendirian dari orang lain' },
        { word: 'productivity', def: 'Efisiensi kerja; seberapa banyak pekerjaan yang dihasilkan' },
        { word: 'permanently', def: 'Secara permanen; untuk selamanya' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'Before 2020, remote work was considered...',
          options: ['a common practice for all workers', 'a privilege for a few professionals', 'impossible due to technology', 'banned in most companies'],
          answer: 'a privilege for a few professionals',
          passageRef: 'Before 2020, remote work was considered a privilege for a small number of professionals.',
        },
        {
          type: 'mcq',
          question: 'Which tools helped companies adapt to remote work during the pandemic?',
          options: ['Email and fax machines', 'Zoom and Slack', 'Telephones and offices', 'Buses and trains'],
          answer: 'Zoom and Slack',
          passageRef: 'Thanks to video conferencing tools like Zoom and collaboration platforms like Slack...',
        },
        {
          type: 'tf',
          question: 'After the pandemic, all employees were required to return to the office full-time.',
          answer: false,
          passageRef: 'Many employees were reluctant to return to the office full-time.',
        },
        {
          type: 'fill',
          question: 'A ________ model means employees spend some days at home and some days in the office.',
          answer: 'hybrid',
          passageRef: 'They preferred a hybrid model — spending some days at home and some days in the office.',
        },
        {
          type: 'mcq',
          question: 'Which of the following is mentioned as a CHALLENGE of remote work?',
          options: ['Better work-life balance', 'Saving money on commuting', 'Feelings of isolation', 'Higher job satisfaction'],
          answer: 'Feelings of isolation',
          passageRef: 'Challenges remain: feelings of isolation, difficulty separating work from personal life...',
        },
      ],
    },

    {
      id: 'social-media-teens',
      level: 'B1',
      icon: '📱',
      title: 'Social Media and Teenagers',
      subtitle: 'Benefits, risks, and finding balance',
      readTime: '3 min',
      topic: 'Technology',
      paragraphs: [
        'Social media platforms such as Instagram, TikTok, and YouTube have become central to the lives of most teenagers. Studies show that the average teenager spends more than three hours per day on social media. For many young people, these platforms are a primary way of communicating with friends and discovering new interests.',
        'There are clear advantages to social media use. Young people can connect with others who share their hobbies, whether that is gaming, music, art, or sport. Social media also provides access to educational content, news, and creative inspiration. During periods of social isolation, such as during the pandemic, these platforms helped teenagers maintain friendships.',
        'However, researchers have raised concerns about the negative effects of excessive social media use. Studies have linked heavy usage to increased levels of anxiety and depression, particularly among teenage girls. The pressure to present a perfect image online, combined with cyberbullying, can seriously damage mental health.',
        'Many experts recommend that teenagers limit their screen time and take regular breaks from social media. Parents and schools play an important role in teaching digital literacy — helping young people to think critically about the content they consume and the images they see.',
        'Finding the right balance is key. Social media can be a positive force in young people\'s lives, but it requires mindful use and clear boundaries.',
      ],
      vocab: [
        { word: 'excessive', def: 'Berlebihan; melebihi batas yang wajar' },
        { word: 'cyberbullying', def: 'Perundungan/pelecehan yang terjadi secara online' },
        { word: 'anxiety', def: 'Kecemasan; perasaan khawatir yang berlebihan' },
        { word: 'digital literacy', def: 'Kemampuan menggunakan dan memahami teknologi digital secara kritis' },
        { word: 'mindful', def: 'Penuh kesadaran; memperhatikan tindakan dengan seksama' },
        { word: 'boundaries', def: 'Batasan; garis yang tidak boleh dilewati' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'According to the article, how much time does the average teenager spend on social media per day?',
          options: ['One hour', 'Two hours', 'More than three hours', 'Five hours'],
          answer: 'More than three hours',
          passageRef: 'Studies show that the average teenager spends more than three hours per day on social media.',
        },
        {
          type: 'tf',
          question: 'Social media was helpful for teenagers during the COVID-19 pandemic.',
          answer: true,
          passageRef: 'During periods of social isolation, these platforms helped teenagers maintain friendships.',
        },
        {
          type: 'mcq',
          question: 'Which group is particularly affected by negative effects of social media?',
          options: ['Adult men', 'Elderly women', 'Teenage girls', 'Young boys'],
          answer: 'Teenage girls',
          passageRef: 'Particularly among teenage girls.',
        },
        {
          type: 'fill',
          question: 'Teaching young people to think critically about content they consume is called digital ________.',
          answer: 'literacy',
          passageRef: 'Teaching digital literacy — helping young people to think critically about the content they consume.',
        },
        {
          type: 'mcq',
          question: 'What is the main message of the last paragraph?',
          options: ['Social media is always harmful', 'Social media should be banned for teens', 'Balance and mindful use are important', 'Parents should control all social media'],
          answer: 'Balance and mindful use are important',
          passageRef: 'Finding the right balance is key. Social media can be a positive force but it requires mindful use.',
        },
      ],
    },

    {
      id: 'street-food',
      level: 'B1',
      icon: '🍜',
      title: 'Street Food: More Than Just a Meal',
      subtitle: 'The cultural importance of street food around the world',
      readTime: '3 min',
      topic: 'Culture & Food',
      paragraphs: [
        'Street food is one of the most universal culinary traditions in the world. From the pad thai stalls of Bangkok to the hot dog carts of New York City, street food offers quick, affordable, and delicious meals that reflect the culture and history of a place.',
        'In many countries, street food is not just a convenient option — it is a way of life. In cities like Mexico City, Istanbul, and Ho Chi Minh City, food vendors set up their stalls before dawn and serve customers throughout the day. These vendors often follow family recipes passed down through generations, keeping traditional flavours alive.',
        'Street food also plays an important economic role. For millions of people in developing countries, selling food on the street provides a livelihood. It requires minimal startup costs and allows vendors to reach a large number of customers in busy public spaces.',
        'In recent years, street food has gained international recognition. Food markets, festivals, and television programmes have introduced global audiences to the incredible diversity of street food. Chefs and food critics increasingly celebrate street food as an authentic expression of local culture.',
        'However, street food vendors often face challenges such as strict regulations, lack of formal infrastructure, and competition from fast food chains. Supporting local street food vendors means preserving an important part of cultural heritage.',
      ],
      vocab: [
        { word: 'culinary', def: 'Berkaitan dengan masakan atau seni memasak' },
        { word: 'vendors', def: 'Pedagang; orang yang menjual barang atau makanan' },
        { word: 'livelihood', def: 'Mata pencaharian; cara seseorang mendapatkan penghasilan' },
        { word: 'heritage', def: 'Warisan budaya; hal-hal yang diwariskan dari generasi ke generasi' },
        { word: 'authentic', def: 'Asli; tidak palsu; sesuai dengan asal-usulnya' },
        { word: 'regulations', def: 'Peraturan resmi yang dibuat oleh pemerintah atau otoritas' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'Which cities are mentioned as examples of strong street food culture?',
          options: ['Paris, London, Tokyo', 'Mexico City, Istanbul, Ho Chi Minh City', 'Berlin, Sydney, Lagos', 'Cairo, Rome, Seoul'],
          answer: 'Mexico City, Istanbul, Ho Chi Minh City',
          passageRef: 'In cities like Mexico City, Istanbul, and Ho Chi Minh City, food vendors set up their stalls before dawn.',
        },
        {
          type: 'tf',
          question: 'Street food recipes are often modern innovations created by professional chefs.',
          answer: false,
          passageRef: 'These vendors often follow family recipes passed down through generations.',
        },
        {
          type: 'fill',
          question: 'Selling street food requires minimal ________ costs, making it accessible for many people.',
          answer: 'startup',
          passageRef: 'It requires minimal startup costs and allows vendors to reach a large number of customers.',
        },
        {
          type: 'mcq',
          question: 'What has helped street food gain international recognition recently?',
          options: ['Government subsidies', 'Food markets, festivals, and TV programmes', 'University courses', 'Supermarket partnerships'],
          answer: 'Food markets, festivals, and TV programmes',
          passageRef: 'Food markets, festivals, and television programmes have introduced global audiences to street food.',
        },
        {
          type: 'mcq',
          question: 'What does the article say about supporting street food vendors?',
          options: ['It increases food prices', 'It replaces fast food chains', 'It helps preserve cultural heritage', 'It creates health risks'],
          answer: 'It helps preserve cultural heritage',
          passageRef: 'Supporting local street food vendors means preserving an important part of cultural heritage.',
        },
      ],
    },

    {
      id: 'ocean-plastic',
      level: 'B1',
      icon: '🌊',
      title: 'The Plastic Problem in Our Oceans',
      subtitle: 'Understanding one of the greatest environmental challenges',
      readTime: '3 min',
      topic: 'Environment',
      paragraphs: [
        'Every year, approximately 8 million tonnes of plastic waste enter the world\'s oceans. This plastic comes from many sources, including poorly managed landfills, rivers that carry rubbish from cities, and fishing equipment abandoned at sea.',
        'Once in the ocean, plastic does not disappear. Instead, it breaks down into tiny particles called microplastics. These particles are so small that they are invisible to the naked eye. Scientists have found microplastics in fish, in drinking water, and even in the human body.',
        'Marine wildlife is severely affected by ocean plastic. Sea turtles often mistake plastic bags for jellyfish and eat them. Seabirds feed plastic fragments to their chicks, causing malnutrition and death. Whales and dolphins become entangled in discarded fishing nets, preventing them from swimming properly.',
        'Governments and organisations are taking action. Many countries have banned single-use plastics such as straws and plastic bags. Large-scale clean-up projects have collected hundreds of tonnes of plastic from the ocean. Public awareness campaigns encourage people to reduce, reuse, and recycle.',
        'Individual actions matter too. Reducing personal plastic consumption, participating in beach clean-ups, and choosing products with sustainable packaging are simple steps everyone can take to help protect our oceans.',
      ],
      vocab: [
        { word: 'microplastics', def: 'Partikel plastik yang sangat kecil, hasil dari plastik yang hancur' },
        { word: 'malnutrition', def: 'Kekurangan gizi; kondisi tubuh yang tidak mendapat nutrisi cukup' },
        { word: 'entangled', def: 'Terjerat; tersangkut dalam sesuatu' },
        { word: 'sustainable', def: 'Berkelanjutan; tidak merusak lingkungan untuk generasi mendatang' },
        { word: 'consumption', def: 'Konsumsi; jumlah sesuatu yang digunakan atau dimakan' },
        { word: 'abandoned', def: 'Ditinggalkan; tidak diurus lagi' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'How much plastic waste enters the oceans every year?',
          options: ['8 thousand tonnes', '8 million tonnes', '8 billion tonnes', '800 tonnes'],
          answer: '8 million tonnes',
          passageRef: 'Every year, approximately 8 million tonnes of plastic waste enter the world\'s oceans.',
        },
        {
          type: 'fill',
          question: 'When plastic breaks down in the ocean, it becomes tiny particles called ________.',
          answer: 'microplastics',
          passageRef: 'It breaks down into tiny particles called microplastics.',
        },
        {
          type: 'mcq',
          question: 'Why do sea turtles eat plastic bags?',
          options: ['They are hungry', 'They mistake them for jellyfish', 'They are attracted to bright colours', 'They eat everything in the ocean'],
          answer: 'They mistake them for jellyfish',
          passageRef: 'Sea turtles often mistake plastic bags for jellyfish and eat them.',
        },
        {
          type: 'tf',
          question: 'Many countries have banned single-use plastics as part of efforts to reduce ocean pollution.',
          answer: true,
          passageRef: 'Many countries have banned single-use plastics such as straws and plastic bags.',
        },
        {
          type: 'mcq',
          question: 'Which action is suggested for individuals to help protect the oceans?',
          options: ['Stop eating fish entirely', 'Participate in beach clean-ups', 'Avoid travelling by plane', 'Build ocean barriers'],
          answer: 'Participate in beach clean-ups',
          passageRef: 'Participating in beach clean-ups... are simple steps everyone can take to help protect our oceans.',
        },
      ],
    },

    // ══════════════════════════════════════════════════════════
    // B2 ARTICLES
    // ══════════════════════════════════════════════════════════

    {
      id: 'ai-creativity',
      level: 'B2',
      icon: '🤖',
      title: 'Can Artificial Intelligence Be Truly Creative?',
      subtitle: 'Exploring the boundaries between human and machine creativity',
      readTime: '4 min',
      topic: 'Technology & Society',
      paragraphs: [
        'Artificial intelligence has made remarkable progress in recent years, demonstrating capabilities once thought to be exclusively human. AI systems can now write poetry, compose music, generate visual art, and produce convincing narratives. But a profound question remains: does this constitute genuine creativity, or is it merely sophisticated pattern recognition?',
        'Proponents of AI creativity argue that the distinction between "genuine" and "simulated" creativity is philosophically problematic. They point out that human creativity is itself a product of pattern recognition — we absorb influences from our environment and recombine them in novel ways. If AI systems do the same at an extraordinary scale, why should we consider the results less legitimate?',
        'Critics counter that AI lacks the essential ingredients of creativity: intentionality, emotional experience, and lived experience. A poem written by an AI about loss, they argue, cannot carry the same weight as one written by a human who has genuinely suffered. Creativity, in this view, is inseparable from consciousness and subjective experience.',
        'There is also the question of originality. AI systems are trained on vast datasets of human-created work. When an AI generates a painting, it is drawing on millions of existing artworks. Some critics argue this constitutes a form of appropriation rather than creation. Copyright law has struggled to keep pace with these questions.',
        'Perhaps the most productive way to view this debate is not as a competition between humans and machines, but as an exploration of what creativity means. AI tools are already helping musicians, designers, and writers produce work they could not have achieved alone. In this sense, AI may be best understood not as a creative entity in itself, but as a powerful amplifier of human creativity.',
      ],
      vocab: [
        { word: 'intentionality', def: 'Kesengajaan; tindakan yang dilakukan dengan tujuan dan kesadaran penuh' },
        { word: 'appropriation', def: 'Pengambilalihan; menggunakan karya orang lain tanpa izin' },
        { word: 'consciousness', def: 'Kesadaran; keadaan sadar dan dapat berpikir' },
        { word: 'proponents', def: 'Pendukung; orang yang mendukung suatu ide atau gagasan' },
        { word: 'amplifier', def: 'Penguat; sesuatu yang memperbesar atau meningkatkan efek lain' },
        { word: 'subjective', def: 'Subjektif; berdasarkan pengalaman dan perasaan pribadi' },
        { word: 'legitimate', def: 'Sah; dapat diterima; berdasarkan aturan yang berlaku' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'What is the central question the article explores?',
          options: ['Whether AI will replace all human jobs', 'Whether AI can be genuinely creative', 'Whether AI is dangerous', 'Whether AI is better than humans at chess'],
          answer: 'Whether AI can be genuinely creative',
          passageRef: 'A profound question remains: does this constitute genuine creativity, or is it merely sophisticated pattern recognition?',
        },
        {
          type: 'mcq',
          question: 'What argument do proponents of AI creativity make?',
          options: ['AI creates better art than humans', 'Human creativity is also based on pattern recognition', 'AI has feelings and emotions', 'AI should have copyright protection'],
          answer: 'Human creativity is also based on pattern recognition',
          passageRef: 'Human creativity is itself a product of pattern recognition — we absorb influences and recombine them in novel ways.',
        },
        {
          type: 'tf',
          question: 'Critics believe that AI lacks emotional experience, which is essential for true creativity.',
          answer: true,
          passageRef: 'Critics counter that AI lacks the essential ingredients of creativity: intentionality, emotional experience, and lived experience.',
        },
        {
          type: 'fill',
          question: 'AI systems generate art by drawing on vast ________ of human-created work.',
          answer: 'datasets',
          passageRef: 'AI systems are trained on vast datasets of human-created work.',
        },
        {
          type: 'mcq',
          question: 'How does the author suggest we should view AI in relation to human creativity?',
          options: ['As a replacement for human artists', 'As an enemy of creativity', 'As a powerful amplifier of human creativity', 'As a legal threat to copyright holders'],
          answer: 'As a powerful amplifier of human creativity',
          passageRef: 'AI may be best understood not as a creative entity in itself, but as a powerful amplifier of human creativity.',
        },
      ],
    },

    {
      id: 'urbanisation',
      level: 'B2',
      icon: '🏙️',
      title: 'The Challenges and Opportunities of Rapid Urbanisation',
      subtitle: 'How cities are reshaping human civilisation',
      readTime: '4 min',
      topic: 'Society & Geography',
      paragraphs: [
        'For the first time in human history, more than half of the world\'s population now lives in cities. This shift towards urbanisation, driven by economic opportunity, technological advancement, and the decline of agricultural employment, represents one of the most significant demographic transformations of our era. By 2050, urban populations are projected to reach nearly 7 billion — approximately two-thirds of humanity.',
        'Cities have historically been engines of innovation and economic growth. The concentration of diverse people, industries, and ideas in dense urban environments creates what economists call "agglomeration effects" — synergies that drive productivity, entrepreneurship, and cultural exchange. Silicon Valley, London\'s financial district, and Nairobi\'s technology hub are all examples of urban ecosystems where innovation flourishes.',
        'However, rapid and unplanned urbanisation brings severe challenges. Many cities in the developing world struggle with inadequate housing, insufficient infrastructure, and overburdened public services. Informal settlements, commonly known as slums, have expanded dramatically as rural migrants seek urban opportunity. The United Nations estimates that approximately one billion people currently live in informal urban settlements globally.',
        'Environmental sustainability is another pressing concern. Cities consume approximately 75% of global energy and produce 80% of greenhouse gas emissions. Urban sprawl destroys natural habitats and agricultural land. However, well-designed cities can also be more environmentally efficient than dispersed rural populations, as dense housing and public transport significantly reduce per capita energy consumption.',
        'The future of urbanisation depends on the decisions made today about planning, governance, and investment. Smart city technologies, inclusive housing policies, robust public transport systems, and green urban design offer pathways to cities that are both prosperous and sustainable — but realising this vision requires unprecedented levels of international cooperation and political will.',
      ],
      vocab: [
        { word: 'agglomeration', def: 'Pengelompokan; berkumpulnya banyak hal di satu tempat' },
        { word: 'infrastructure', def: 'Infrastruktur; fasilitas dasar seperti jalan, listrik, dan air bersih' },
        { word: 'sprawl', def: 'Perluasan kota yang tidak terencana ke daerah pinggiran' },
        { word: 'per capita', def: 'Per orang; untuk setiap individu' },
        { word: 'governance', def: 'Tata kelola; cara pemerintahan atau organisasi dijalankan' },
        { word: 'demographic', def: 'Demografis; berkaitan dengan komposisi dan perubahan populasi' },
        { word: 'unprecedented', def: 'Belum pernah terjadi sebelumnya; luar biasa karena baru pertama kali' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'By 2050, what proportion of humanity is projected to live in cities?',
          options: ['One quarter', 'One half', 'Two thirds', 'Three quarters'],
          answer: 'Two thirds',
          passageRef: 'Urban populations are projected to reach nearly 7 billion — approximately two-thirds of humanity.',
        },
        {
          type: 'fill',
          question: 'The concentration of people and industries in cities creates "________ effects" that drive productivity.',
          answer: 'agglomeration',
          passageRef: 'Economists call "agglomeration effects" — synergies that drive productivity.',
        },
        {
          type: 'mcq',
          question: 'How many people are estimated to live in informal urban settlements globally?',
          options: ['100 million', '500 million', '1 billion', '3 billion'],
          answer: '1 billion',
          passageRef: 'The United Nations estimates that approximately one billion people currently live in informal urban settlements.',
        },
        {
          type: 'tf',
          question: 'Dense cities are always less environmentally efficient than rural areas.',
          answer: false,
          passageRef: 'Well-designed cities can also be more environmentally efficient than dispersed rural populations.',
        },
        {
          type: 'mcq',
          question: 'What does the author say is needed to achieve sustainable and prosperous cities?',
          options: ['Slowing down urbanisation', 'Moving people back to rural areas', 'International cooperation and political will', 'Reducing city populations by 50%'],
          answer: 'International cooperation and political will',
          passageRef: 'Realising this vision requires unprecedented levels of international cooperation and political will.',
        },
      ],
    },

    {
      id: 'sleep-science',
      level: 'B2',
      icon: '😴',
      title: 'Why Sleep Is More Important Than You Think',
      subtitle: 'The science of sleep and its profound effects on health and performance',
      readTime: '4 min',
      topic: 'Health & Science',
      paragraphs: [
        'In modern societies that celebrate productivity and constant activity, sleep is often treated as an inconvenience — a necessary but regrettable interruption to a busy day. Yet neuroscientists and sleep researchers are increasingly clear: sleep is not passive. It is one of the most biologically active and essential periods of human life.',
        'During sleep, the brain undergoes a remarkable process of consolidation. Memories formed during the day are transferred from short-term to long-term storage, connections between neurons are strengthened, and irrelevant information is pruned away. Studies have demonstrated that students who sleep well before an exam consistently outperform those who study through the night — a phenomenon that has largely overturned traditional assumptions about the value of "all-nighters".',
        'Sleep also plays a critical role in physical health. During deep sleep stages, the body releases growth hormone, which is essential for tissue repair and immune function. Chronic sleep deprivation has been linked to an increased risk of cardiovascular disease, diabetes, obesity, and impaired immune response. One landmark study found that individuals who slept fewer than six hours per night were four times more likely to develop a cold when exposed to a virus.',
        'Mental health is equally affected. Disrupted sleep patterns are strongly associated with depression, anxiety, and emotional dysregulation. The relationship is bidirectional — mental health problems cause sleep difficulties, and poor sleep exacerbates mental health conditions, creating a cycle that can be difficult to break.',
        'Despite this evidence, many people continue to prioritise work and entertainment over sleep. Experts recommend seven to nine hours of sleep per night for adults. Establishing consistent sleep and wake times, reducing screen exposure before bed, and creating a dark, cool sleeping environment are among the most effective evidence-based strategies for improving sleep quality.',
      ],
      vocab: [
        { word: 'consolidation', def: 'Konsolidasi; proses memperkuat dan menstabilkan ingatan' },
        { word: 'neurons', def: 'Sel saraf; unit dasar sistem saraf yang mengirim sinyal' },
        { word: 'deprivation', def: 'Kekurangan; kondisi tidak mendapatkan sesuatu yang diperlukan' },
        { word: 'bidirectional', def: 'Dua arah; berlaku dalam dua arah sekaligus' },
        { word: 'dysregulation', def: 'Gangguan regulasi; ketidakmampuan mengontrol emosi atau fungsi tubuh' },
        { word: 'exacerbates', def: 'Memperburuk; membuat sesuatu menjadi lebih parah' },
        { word: 'cardiovascular', def: 'Kardiovaskular; berkaitan dengan jantung dan pembuluh darah' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'How does the author describe modern society\'s attitude towards sleep?',
          options: ['Highly valued and prioritised', 'Treated as an inconvenience', 'Considered a luxury', 'Seen as a form of meditation'],
          answer: 'Treated as an inconvenience',
          passageRef: 'Sleep is often treated as an inconvenience — a necessary but regrettable interruption.',
        },
        {
          type: 'tf',
          question: 'Students who study all night before an exam consistently perform better than those who sleep well.',
          answer: false,
          passageRef: 'Students who sleep well before an exam consistently outperform those who study through the night.',
        },
        {
          type: 'mcq',
          question: 'According to the article, people sleeping fewer than six hours were how many times more likely to catch a cold?',
          options: ['Twice', 'Three times', 'Four times', 'Six times'],
          answer: 'Four times',
          passageRef: 'Individuals who slept fewer than six hours per night were four times more likely to develop a cold.',
        },
        {
          type: 'fill',
          question: 'The relationship between sleep and mental health is ________, meaning each affects the other.',
          answer: 'bidirectional',
          passageRef: 'The relationship is bidirectional — mental health problems cause sleep difficulties, and poor sleep exacerbates mental health conditions.',
        },
        {
          type: 'mcq',
          question: 'How many hours of sleep do experts recommend for adults?',
          options: ['Five to six hours', 'Six to seven hours', 'Seven to nine hours', 'Nine to eleven hours'],
          answer: 'Seven to nine hours',
          passageRef: 'Experts recommend seven to nine hours of sleep per night for adults.',
        },
      ],
    },

    {
      id: 'global-food-security',
      level: 'B2',
      icon: '🌾',
      title: 'Global Food Security in a Changing Climate',
      subtitle: 'Feeding a growing world population under environmental stress',
      readTime: '5 min',
      topic: 'Environment & Global Affairs',
      paragraphs: [
        'Feeding the world has always been a complex challenge, but the convergence of climate change, population growth, geopolitical instability, and resource constraints has made it more urgent and complex than ever before. By 2050, the global population is expected to reach approximately 9.7 billion people. Agriculture will need to produce roughly 70% more food than it does today, while simultaneously adapting to more extreme weather patterns, rising sea levels, and changing precipitation patterns.',
        'Climate change poses an existential threat to agricultural systems in many regions. Rising temperatures reduce crop yields — researchers estimate that every degree Celsius of warming reduces global wheat production by approximately 6%. In Sub-Saharan Africa and South Asia, where food insecurity is already acute, more frequent droughts and floods could devastate smallholder farming communities that depend on predictable seasonal patterns.',
        'Yet the agricultural sector is itself a major contributor to climate change, responsible for approximately 23% of global greenhouse gas emissions. This includes methane from livestock, nitrous oxide from fertilisers, and carbon dioxide from land clearing. Reducing agricultural emissions while increasing food production represents one of the most profound paradoxes of our time.',
        'Innovation offers some pathways forward. Precision agriculture, which uses satellite data and sensors to optimise inputs like water and fertiliser, can significantly reduce waste and environmental impact. Alternative proteins — including plant-based foods and cultivated meat — could reduce dependence on land-intensive livestock farming. Genetic science is developing drought-resistant and heat-tolerant crop varieties that may help farmers adapt to changing conditions.',
        'However, technological solutions alone are insufficient. Addressing food insecurity requires tackling systemic inequalities in access to land, finance, and markets. An estimated one-third of all food produced globally is wasted, often through supply chain inefficiencies and overconsumption in wealthy nations. Reducing food waste may be one of the most cost-effective strategies for improving global food security without additional environmental costs.',
      ],
      vocab: [
        { word: 'convergence', def: 'Konvergensi; pertemuan beberapa hal dari berbagai arah' },
        { word: 'geopolitical', def: 'Geopolitik; berkaitan dengan hubungan politik antar negara berdasarkan faktor geografis' },
        { word: 'precipitation', def: 'Curah hujan; air yang jatuh dari atmosfer' },
        { word: 'paradox', def: 'Paradoks; situasi yang tampak bertentangan tetapi bisa benar' },
        { word: 'smallholder', def: 'Petani kecil; petani yang menggarap lahan kecil' },
        { word: 'systemic', def: 'Sistemik; berkaitan dengan sistem secara keseluruhan, bukan hanya bagian-bagiannya' },
        { word: 'cultivated meat', def: 'Daging yang ditumbuhkan di laboratorium dari sel hewan' },
      ],
      quiz: [
        {
          type: 'mcq',
          question: 'By 2050, how much more food will agriculture need to produce compared to today?',
          options: ['30% more', '50% more', '70% more', '100% more'],
          answer: '70% more',
          passageRef: 'Agriculture will need to produce roughly 70% more food than it does today.',
        },
        {
          type: 'fill',
          question: 'For every degree Celsius of warming, global ________ production is estimated to fall by 6%.',
          answer: 'wheat',
          passageRef: 'Every degree Celsius of warming reduces global wheat production by approximately 6%.',
        },
        {
          type: 'mcq',
          question: 'What percentage of greenhouse gas emissions does the agricultural sector contribute?',
          options: ['About 10%', 'About 23%', 'About 40%', 'About 60%'],
          answer: 'About 23%',
          passageRef: 'Responsible for approximately 23% of global greenhouse gas emissions.',
        },
        {
          type: 'tf',
          question: 'According to the article, technology alone is sufficient to solve global food insecurity.',
          answer: false,
          passageRef: 'Technological solutions alone are insufficient. Addressing food insecurity requires tackling systemic inequalities.',
        },
        {
          type: 'mcq',
          question: 'How much of globally produced food is estimated to be wasted?',
          options: ['One quarter', 'One third', 'One half', 'Two thirds'],
          answer: 'One third',
          passageRef: 'An estimated one-third of all food produced globally is wasted.',
        },
      ],
    },

  ];

  // ── Public API ─────────────────────────────────────────────
  return {
    getAll() { return ARTICLES; },
    getByLevel(level) {
      if (level === 'all') return ARTICLES;
      return ARTICLES.filter(a => a.level === level);
    },
    getById(id) { return ARTICLES.find(a => a.id === id) || null; },
    getQuiz(articleId) {
      const article = ARTICLES.find(a => a.id === articleId);
      if (!article) return [];
      // Shuffle quiz questions
      return [...article.quiz].sort(() => Math.random() - 0.5);
    },
    totalArticles() { return ARTICLES.length; },
    countByLevel(level) { return ARTICLES.filter(a => a.level === level).length; },
  };

})();
