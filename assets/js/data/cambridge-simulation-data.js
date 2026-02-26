/**
 * EnglishPath — Cambridge Simulation Data
 * Fase 16c-2: Simulasi Full Test Cambridge B2 First / C1 Advanced
 * localStorage: ep_user_{id}_sim_results (shared)
 */

const CambridgeSimulationData = (() => {

  // ── Reading & Use of English — Simulation Subset ─────────────────────────
  // Part 1: Multiple-Choice Cloze (6 gaps)
  const simPart1 = {
    id: 'sim_p1',
    title: 'The Art of Negotiation',
    text: `Negotiation is often __(1)__ as a battle of wills, but skilled negotiators know that the most effective approach is rarely confrontational. Research __(2)__ that people who enter negotiations with a collaborative mindset tend to reach agreements that __(3)__ both parties better than those reached through aggressive tactics. The key lies in understanding not just what the other party wants, but __(4)__ they want it. When you understand the underlying __(5)__, you can often find creative solutions that address everyone's needs. This approach requires patience and a genuine __(6)__ to listen — two qualities that are harder to develop than most people assume.`,
    gaps: [
      { num: 1, options: ['regarded', 'seen', 'considered', 'viewed'], answer: 2, explanation: '"Often considered as" is the most natural collocation in formal writing.' },
      { num: 2, options: ['indicates', 'shows', 'proves', 'confirms'], answer: 0, explanation: '"Research indicates" is standard academic register.' },
      { num: 3, options: ['satisfy', 'serve', 'benefit', 'help'], answer: 1, explanation: '"Serve both parties" is the correct collocatio here.' },
      { num: 4, options: ['why', 'what', 'how', 'when'], answer: 0, explanation: '"Why they want it" — understanding motivation/reason.' },
      { num: 5, options: ['interests', 'motives', 'reasons', 'causes'], answer: 0, explanation: '"Underlying interests" is the standard term in negotiation theory.' },
      { num: 6, options: ['willingness', 'ability', 'readiness', 'desire'], answer: 0, explanation: '"Genuine willingness to listen" — collocates naturally with "genuine".' }
    ]
  };

  // Part 2: Open Cloze (7 gaps)
  const simPart2 = {
    id: 'sim_p2',
    title: 'The Rise of Slow Travel',
    text: `A growing number of travellers are rejecting the idea __(1)__ cramming as many destinations as possible into a single trip. Instead, they are choosing to spend longer __(2)__ one place, living __(3)__ locals rather than tourists. This movement, sometimes called "slow travel", prioritises depth __(4)__ breadth. Rather __(5)__ ticking boxes on a must-see list, slow travellers aim to understand the culture, history, and daily rhythm of wherever they find themselves. The result, __(6)__ many of them report, is a richer, more meaningful experience that stays __(7)__ them long after they return home.`,
    gaps: [
      { num: 1, answer: 'of', explanation: '"The idea of cramming" — gerund construction.' },
      { num: 2, answer: 'in', explanation: '"Spend longer in one place".' },
      { num: 3, answer: 'like', explanation: '"Living like locals" — comparison using "like".' },
      { num: 4, answer: 'over', explanation: '"Depth over breadth" — preference structure.' },
      { num: 5, answer: 'than', explanation: '"Rather than" — comparative contrast.' },
      { num: 6, answer: 'as', explanation: '"As many of them report" — reporting clause.' },
      { num: 7, answer: 'with', explanation: '"Stays with them" — fixed phrasal collocation.' }
    ]
  };

  // Part 3: Word Formation (8 gaps)
  const simPart3 = {
    id: 'sim_p3',
    title: 'The Science of Memory',
    text: `Memory is not a single, __(1)__ (UNIFORM) system — it encompasses several distinct processes. The initial __(2)__ (ENCODE) of information determines how well it can later be retrieved. Our memories are also __(3)__ (REMARK) malleable; each time we recall something, we subtly __(4)__ (MODIFICATION) it, often without any __(5)__ (AWARE) that this is happening. Emotional experiences tend to be encoded with greater __(6)__ (VIVID), which is why a childhood memory can feel so immediate. Neuroscientists are now exploring the __(7)__ (POSSIBLE) of strengthening or even erasing specific memories, raising profound __(8)__ (ETHIC) questions about identity and autonomy.`,
    gaps: [
      { num: 1, base: 'UNIFORM', answer: 'uniform', explanation: 'Used as adjective — "uniform" is already correct.' },
      { num: 2, base: 'ENCODE', answer: 'encoding', explanation: '"Encoding" — gerund/noun form of encode.' },
      { num: 3, base: 'REMARK', answer: 'remarkably', explanation: '"Remarkably malleable" — adverb modifying adjective.' },
      { num: 4, base: 'MODIFICATION', answer: 'modify', explanation: '"We subtly modify it" — verb form.' },
      { num: 5, base: 'AWARE', answer: 'awareness', explanation: '"Without any awareness" — noun form.' },
      { num: 6, base: 'VIVID', answer: 'vividness', explanation: '"With greater vividness" — noun form.' },
      { num: 7, base: 'POSSIBLE', answer: 'possibility', explanation: '"The possibility of" — noun form.' },
      { num: 8, base: 'ETHIC', answer: 'ethical', explanation: '"Ethical questions" — adjective form.' }
    ]
  };

  // Part 4: Key Word Transformation (6 items)
  const simPart4 = {
    id: 'sim_p4',
    items: [
      { num: 1, original: 'The manager said the meeting had been postponed.', keyword: 'INFORMED', answer: 'The manager informed us that the meeting had been postponed.', explanation: '"Inform someone that" replaces "said" + passive.' },
      { num: 2, original: 'I haven\'t been to a live concert for three years.', keyword: 'SINCE', answer: 'It\'s been three years since I (last) went to a live concert.', explanation: '"It\'s been [time] since" — time expression with since.' },
      { num: 3, original: 'The applicant was too inexperienced to get the job.', keyword: 'ENOUGH', answer: 'The applicant was not experienced enough to get the job.', explanation: '"Not ... enough to" replaces "too ... to".' },
      { num: 4, original: 'People say that exercise improves mental health.', keyword: 'SAID', answer: 'Exercise is said to improve mental health.', explanation: 'Passive reporting structure: "is said to".' },
      { num: 5, original: 'Despite the rain, they continued with the match.', keyword: 'CARRY', answer: 'They carried on with the match despite the rain.', explanation: '"Carry on with" = continue.' },
      { num: 6, original: 'She regrets not studying more when she was young.', keyword: 'WISHES', answer: 'She wishes she had studied more when she was young.', explanation: '"Wish + past perfect" expresses regret about the past.' }
    ]
  };

  // Part 5: Reading — Long Text MCQ
  const simPart5 = {
    id: 'sim_p5',
    part: 5,
    title: 'The Value of Boredom',
    author: 'Adapted from an essay on creativity and modern life',
    text: `There is something almost quaint about boredom. In an era defined by the relentless availability of stimulation — streaming services, social media feeds, podcast libraries, instant-message threads — the condition of having nothing to do, nothing to look at, nothing to absorb, has become nearly obsolete. Most people who experience a moment of enforced idleness immediately reach for their phones. The possibility that this reflex is not neutral, that it is costing us something important, is beginning to attract serious research attention.

Sandi Mann, a psychologist at the University of Central Lancashire, conducted an experiment in which one group of participants was asked to complete a boring task — copying out telephone numbers from a directory — before being given a creative challenge. A second group went straight to the creative task. The bored group significantly outperformed the others. Mann's interpretation was that boredom generates a desire for stimulation, and that in the absence of external stimulation, the mind turns inward, drawing on imagination. Daydreaming, long dismissed as inattentiveness, appears to engage the brain's default mode network in ways that may be essential to creativity and problem-solving.

This is not, of course, an argument for permanent idleness. Chronic boredom — the kind associated with meaningless, repetitive work or social isolation — is psychologically harmful and associated with risk-taking behaviour and depression. The distinction matters. What researchers are gesturing towards is something more specific: a state of mild, temporary boredom, unrelieved by distraction, that appears to serve as a catalyst for generative thought. The key element is the absence of external input. The brain, deprived of novelty, begins to supply its own.

The irony is that many people most in need of creative thinking — executives, designers, educators, researchers — are also those whose schedules leave the least room for enforced idleness. Meetings fill the gaps between tasks; commutes are spent listening to podcasts; even exercise, once a solitary activity, is now typically accompanied by music or audio content. There is virtually no moment in the day that is not colonised by something.

Some organisations have begun to respond. Certain tech companies now officially encourage employees to spend a proportion of their time on unstructured activities. But even this approach risks converting boredom into a productivity tool, which rather misses the point. The value of doing nothing may lie precisely in the fact that it is not in service of anything. The moment you assign boredom a purpose, you have replaced it with something else.`,
    questions: [
      {
        id: 'p5_q1',
        question: 'What does the writer suggest about the habit of reaching for a phone during idle moments?',
        choices: ['It is a harmless response to modern life.', 'It may have consequences that people overlook.', 'It demonstrates how technology has improved focus.', 'It reflects a natural human need for connection.'],
        answer: 1,
        explanation: 'The writer says the reflex "is not neutral" and "is costing us something important" — consequences people overlook.'
      },
      {
        id: 'p5_q2',
        question: 'According to Mann\'s research, what is the key mechanism behind boredom\'s creative benefits?',
        choices: ['Boredom reduces anxiety about performance.', 'Boredom activates the same areas as sleep.', 'Boredom motivates the mind to seek its own stimulation.', 'Boredom clears short-term memory, improving retention.'],
        answer: 2,
        explanation: '"Boredom generates a desire for stimulation, and... the mind turns inward, drawing on imagination."'
      },
      {
        id: 'p5_q3',
        question: 'Why does the writer distinguish between different types of boredom?',
        choices: ['To show that only creative people benefit from boredom.', 'To clarify that not all boredom has beneficial effects.', 'To argue that chronic boredom is preferable to mild boredom.', 'To counter critics who dismiss the research entirely.'],
        answer: 1,
        explanation: 'The writer notes chronic boredom is "psychologically harmful" — distinguishing it from the "mild, temporary" kind that may aid creativity.'
      },
      {
        id: 'p5_q4',
        question: 'What is the writer\'s view of companies that introduce unstructured time for employees?',
        choices: ['They are setting a valuable precedent.', 'They misunderstand what makes boredom valuable.', 'They are improving productivity significantly.', 'They are wasting company resources.'],
        answer: 1,
        explanation: '"This approach risks converting boredom into a productivity tool, which rather misses the point."'
      }
    ]
  };

  // ── Writing Section — Simulation ─────────────────────────────────────────
  const simWritingPart1 = {
    id: 'sim_w_p1_b2',
    level: 'B2',
    title: 'The Role of Sport in Education',
    stimulus: 'In your English class, you have been discussing the role of sport in school life. Your teacher has asked you to write an essay.',
    prompt: `Write an essay using all the notes and give reasons for your point of view.\n\n**Essay question:** Should competitive sport be compulsory in schools?\n\n**Notes:**\n- Physical health and fitness\n- Teamwork and social skills\n- Pressure and exclusion of less sporty students\n\nWrite your answer in 140–190 words (B2).`,
    wordMin: 140, wordMax: 190,
    planningPrompts: [
      '💡 Introduction: State your position on compulsory competitive sport — for or against, or nuanced?',
      '📌 Point 1 (Health): How does regular sport contribute to physical wellbeing?',
      '📌 Point 2 (Teamwork): What social and interpersonal skills does sport develop?',
      '📌 Point 3 (Counter): How might compulsory competition harm less sporty students?',
      '✅ Conclusion: Is there a middle ground? Should "compulsory" mean competitive, or just active?'
    ],
    rubric: [
      { criterion: 'Content', desc: 'All three notes addressed with relevant supporting arguments' },
      { criterion: 'Communicative Achievement', desc: 'Essay register maintained; clear argument with appropriate academic tone' },
      { criterion: 'Organisation', desc: 'Introduction, body paragraphs, and conclusion with linking phrases' },
      { criterion: 'Language', desc: 'B2-level vocabulary and grammar; varied structures; minimal errors' }
    ],
    model: `Whether competitive sport should be compulsory in schools is a question that divides educators and parents alike. While I broadly support sport in schools, I believe making it compulsory in a competitive format raises important concerns.\n\nThe health argument is compelling. Regular physical activity reduces the risk of obesity and establishes lifelong fitness habits. Moreover, team sports cultivate communication, cooperation, and resilience — skills that are increasingly valued in professional life. These benefits are difficult to replicate in a classroom setting.\n\nHowever, compulsory competition creates pressure for students who are naturally less athletic. Being publicly ranked or excluded from teams can damage self-esteem, and some students may develop a lasting aversion to physical activity as a result.\n\nA better approach might be to make physical education compulsory while offering both competitive and non-competitive options — allowing students to discover activities they genuinely enjoy. Sport should inspire, not exclude.\n\nIn conclusion, while sport in schools is valuable, the compulsory element should focus on participation rather than competition.`
  };

  const simWritingPart1C1 = {
    id: 'sim_w_p1_c1',
    level: 'C1',
    title: 'The Pursuit of Happiness',
    stimulus: 'In your English class, you have been discussing what governments and individuals can do to improve wellbeing. Your teacher has asked you to write an essay.',
    prompt: `Write an essay using all the notes and give reasons for your point of view.\n\n**Essay question:** Is the pursuit of happiness a meaningful goal for government policy?\n\n**Notes:**\n- Economic growth vs. wellbeing metrics\n- Mental health and social connection\n- Individual vs. collective responsibility\n\nWrite your answer in 220–260 words (C1).`,
    wordMin: 220, wordMax: 260,
    planningPrompts: [
      '💡 Introduction: Frame the tension between traditional policy goals (GDP) and wellbeing-focused governance.',
      '📌 Point 1 (Metrics): What is the case for going beyond economic indicators to measure national progress?',
      '📌 Point 2 (Mental health): How might policy prioritise social connection and mental health services?',
      '📌 Point 3 (Responsibility): To what extent is happiness an individual matter rather than a state concern?',
      '⚖️ Counter: Can governments effectively legislate for happiness, or does this risk paternalism?',
      '✅ Conclusion: A nuanced position — what can and cannot be meaningfully governed.'
    ],
    rubric: [
      { criterion: 'Content', desc: 'All three notes addressed; argument is developed with examples and nuance' },
      { criterion: 'Communicative Achievement', desc: 'Sophisticated academic essay register; complex argument effectively communicated' },
      { criterion: 'Organisation', desc: 'Well-structured with coherent paragraphing, varied discourse markers, and clear conclusion' },
      { criterion: 'Language', desc: 'C1-level vocabulary and grammar; idiomatic; wide range of structures; near-accurate' }
    ],
    model: `Happiness has long been considered too subjective a concept for policy-making. Yet a growing body of research suggests that governments which attend to the wellbeing of their citizens — not merely their economic productivity — produce healthier, more cohesive societies. Whether this constitutes a meaningful policy goal, however, depends on how narrowly one defines "happiness" and how willing one is to expand the role of the state.\n\nThe case for a wellbeing-centred approach begins with the inadequacy of GDP as an indicator of human flourishing. A country may grow economically while its citizens become increasingly isolated, anxious, and overworked. Alternative metrics — such as Bhutan's Gross National Happiness index or the OECD's Better Life Index — suggest that quality of life encompasses factors like social connection, meaningful work, and access to nature, none of which GDP captures.\n\nThere is now compelling evidence that loneliness and poor mental health impose costs comparable to major physical illnesses. Governments that invest in community spaces, accessible mental health services, and policies supporting work-life balance address these costs in ways that purely economic policy cannot.\n\nYet critics raise a legitimate concern: happiness is ultimately a private experience, shaped by personality, relationships, and values. Governments that attempt to engineer contentment risk paternalism — nudging citizens towards approved notions of the good life.\n\nThe most defensible position, then, is not that governments should pursue happiness directly, but that they should remove structural barriers to it: inequality, insecurity, and social fragmentation. Happiness may not be governable, but the conditions for it can be.`
  };

  // Part 2 options for simulation (3 task choices)
  const simWritingPart2Options = [
    {
      id: 'sim_w2_letter',
      type: 'letter',
      icon: '✉️',
      title: 'Formal Letter — Job Application',
      stimulus: 'You have seen an advertisement for a summer internship at a British environmental charity. Write a letter of application.',
      prompt: 'Write your letter of application in 140–190 words. Include why you are interested in environmental issues, any relevant experience, and why you would be a good fit for the role.',
      wordMin: 140, wordMax: 190,
      planningPrompts: [
        '💡 Opening: Formal salutation + state purpose of letter.',
        '📌 Para 1: Why you are interested in environmental issues.',
        '📌 Para 2: Relevant experience (volunteering, studies, projects).',
        '📌 Para 3: Why you are a good fit — skills and enthusiasm.',
        '✅ Closing: Formal sign-off, offer to provide more information.'
      ],
      model: `Dear Sir or Madam,\n\nI am writing to apply for the summer internship position advertised on your organisation's website. As a third-year Environmental Science student, I have long admired GreenFuture's work in urban sustainability and would welcome the opportunity to contribute to your projects.\n\nMy interest in environmental issues developed during my school years, when our local river suffered significant pollution. Volunteering with a clean-up initiative showed me that grassroots action can produce tangible change, and deepened my commitment to pursuing this field professionally.\n\nOver the past two years, I have gained relevant experience through a university research project analysing air quality data in London boroughs, as well as a short placement with a wildlife conservation trust. I am comfortable with data analysis software and have strong written and verbal communication skills.\n\nI believe I would bring both practical skills and genuine enthusiasm to your team. I would be happy to provide further information or attend an interview at your convenience.\n\nYours faithfully,\nA. Student`
    },
    {
      id: 'sim_w2_report',
      type: 'report',
      icon: '📊',
      title: 'Report — Local Transport Issues',
      stimulus: 'Your college principal has asked you to write a report on transport issues affecting students and to make recommendations for improvement.',
      prompt: 'Write your report in 140–190 words. Cover the main problems students face, what has already been tried, and your recommendations.',
      wordMin: 140, wordMax: 190,
      planningPrompts: [
        '💡 Title + Introduction: State the report\'s purpose and scope.',
        '📌 Section 1: Main transport problems (cost, reliability, frequency).',
        '📌 Section 2: Measures already in place (student discount cards, shuttle, etc.).',
        '📌 Section 3: Recommendations (negotiate bus routes, student rail passes, cycling infrastructure).',
        '✅ Conclusion: Brief summary and call to action.'
      ],
      model: `REPORT: STUDENT TRANSPORT — ISSUES AND RECOMMENDATIONS\n\nPrepared for: College Principal\n\nIntroduction\nThis report examines the transport challenges currently faced by students at this college and sets out recommendations for addressing them.\n\nCurrent Issues\nThe majority of students rely on public transport. Buses serving the college are infrequent — particularly in the evenings — and fares have increased by 15% over two years. Consequently, several students have reported missing evening classes or extracurricular activities.\n\nExisting Measures\nThe college currently offers a subsidised bus pass for full-time students. While appreciated, the pass is limited to one route and does not cover weekend journeys.\n\nRecommendations\nFirst, the college should negotiate with the local council to extend the subsidised route. Second, a bicycle loan scheme — already operating at neighbouring institutions — would provide a cost-effective alternative. Finally, a student survey should be conducted each term to monitor changing needs.\n\nConclusion\nWith targeted investment, it is possible to improve accessibility significantly and support student attendance and engagement.`
    },
    {
      id: 'sim_w2_review',
      type: 'review',
      icon: '⭐',
      title: 'Review — A Museum or Exhibition',
      stimulus: 'A travel website is inviting readers to write reviews of cultural attractions. Write a review of a museum, gallery, or exhibition you have visited.',
      prompt: 'Write your review in 140–190 words. Comment on what the attraction offers, what impressed or disappointed you, and whether you would recommend it.',
      wordMin: 140, wordMax: 190,
      planningPrompts: [
        '💡 Opening: Name and brief description of the attraction.',
        '📌 Para 1: What the attraction offers — collections, layout, facilities.',
        '📌 Para 2: Highlights — what impressed you most.',
        '📌 Para 3: Any disappointments or areas for improvement.',
        '✅ Recommendation: Who would enjoy it and why.'
      ],
      model: `Review: The Natural History Museum, London ★★★★☆\n\nThe Natural History Museum is one of London's most visited cultural attractions, and it is not difficult to see why. Housed in a spectacular Victorian building, it offers an astonishing range of exhibits spanning geology, botany, entomology, and palaeontology.\n\nThe museum's highlights are hard to narrow down. The Dinosaur Gallery — centred on a remarkably preserved Stegosaurus skeleton — is genuinely awe-inspiring, and the newly renovated Our Broken Planet exhibition addresses climate change with unusual candour and visual impact. The interactive elements are particularly well-designed, making complex scientific concepts accessible to visitors of all ages.\n\nHowever, the museum's popularity can work against it. Queues at peak times are substantial, and the café prices are notably steep. Some galleries feel underlit, which detracts from smaller exhibits.\n\nOverall, the Natural History Museum is a world-class institution that rewards multiple visits. I would particularly recommend it to families, school groups, and anyone with a genuine curiosity about the natural world. Entry is free — an extraordinary public resource.`
    }
  ];

  // ── Listening — Simulation Subset ────────────────────────────────────────
  // Part 1: 3 short extracts MCQ
  const simListeningPart1 = [
    {
      id: 'sl1_e1',
      label: 'Extract 1 — Two colleagues discussing a presentation',
      script: [
        { speaker: 'Woman', text: "How do you think the client presentation went this morning?" },
        { speaker: 'Man', text: "Honestly? I thought it went well technically — the slides were clear and the data spoke for itself. But I don't think we convinced them." },
        { speaker: 'Woman', text: "Really? I felt the energy in the room was positive." },
        { speaker: 'Man', text: "That was politeness, not enthusiasm. They were asking surface questions. When clients are genuinely interested, they drill down — they want to challenge your assumptions, understand the methodology. These people were just being courteous." },
        { speaker: 'Woman', text: "That's quite a pessimistic reading." },
        { speaker: 'Man', text: "Maybe. But I've sat in enough of these to know the difference. Let's wait for the follow-up email." }
      ],
      question: "What is the man's main concern about the presentation?",
      choices: [
        'The data was not presented clearly enough.',
        'The client did not seem genuinely interested.',
        'The slides contained errors he had not noticed.',
        'The woman misread the client\'s reaction.'
      ],
      answer: 1,
      explanation: 'The man says clients asking surface questions signals politeness, not enthusiasm — they were not genuinely interested.'
    },
    {
      id: 'sl1_e2',
      label: 'Extract 2 — A radio interview about urban farming',
      script: [
        { speaker: 'Host', text: "You've set up a rooftop farm in central Manchester. What was the biggest challenge?" },
        { speaker: 'Guest', text: "Weight, believe it or not. Buildings have load-bearing limits, and soil is extraordinarily heavy. We had to design an entirely lightweight substrate — more like a growing medium than actual earth." },
        { speaker: 'Host', text: "And was the yield what you'd hoped?" },
        { speaker: 'Guest', text: "Eventually. The first season was disappointing — we underestimated how wind affects plants at height. They were stressed and growing slowly. But we adapted: windbreaks, different varieties, more shelter. Year two was excellent." },
        { speaker: 'Host', text: "Would you recommend it to other cities?" },
        { speaker: 'Guest', text: "With the right guidance, absolutely. The key is structural assessment before anything else — you cannot retrofit an idea like this if the building can't support it." }
      ],
      question: "What does the guest say was the most unexpected challenge?",
      choices: [
        'Finding seeds suited to the climate.',
        'The structural weight of growing materials.',
        'Persuading the building owner to allow it.',
        'Managing water supply to the rooftop.'
      ],
      answer: 1,
      explanation: 'The guest says "Weight, believe it or not" was the biggest challenge — soil\'s weight exceeding building load limits.'
    },
    {
      id: 'sl1_e3',
      label: 'Extract 3 — Two students discussing a history project',
      script: [
        { speaker: 'Man', text: "I've been struggling with how to structure the essay. I've got all this research but it feels disconnected." },
        { speaker: 'Woman', text: "What's your central argument?" },
        { speaker: 'Man', text: "That the economic causes of the war were more significant than the political ones. But every time I try to write it, I end up describing events rather than arguing." },
        { speaker: 'Woman', text: "That's a really common problem. You need to interrogate each piece of evidence — not just present it, but ask what it proves about your argument." },
        { speaker: 'Man', text: "How do you do that practically?" },
        { speaker: 'Woman', text: "After every paragraph, write a one-sentence summary that starts with 'This shows that...' and connects it back to your main claim. If you can't write that sentence, the paragraph doesn't belong." }
      ],
      question: "What advice does the woman give the man about his essay?",
      choices: [
        'He should rewrite his introduction to be clearer.',
        'He should reduce the amount of research he includes.',
        'He should ensure each paragraph connects to his argument.',
        'He should change his essay topic to something simpler.'
      ],
      answer: 2,
      explanation: 'The woman says each paragraph should connect back to the main claim — "This shows that..." connects evidence to argument.'
    }
  ];

  // Part 2: Sentence Completion
  const simListeningPart2 = {
    id: 'sl2',
    label: 'Part 2 — A talk about the history of cartography',
    intro: 'You will hear a lecture about the history of cartography — the art and science of map-making.',
    script: [
      { text: "Maps are among the oldest human artefacts — the earliest known example dates to around 25,000 BCE and is carved on a mammoth tusk." },
      { text: "For most of history, maps were status symbols as much as navigational tools. Owning an accurate world map in the 15th century was comparable to owning classified government intelligence today." },
      { text: "The Mercator projection, developed in 1569 by the Flemish cartographer Gerardus Mercator, was designed specifically for maritime navigation — it represented lines of constant compass bearing as straight lines, which was revolutionary for sailors." },
      { text: "However, the Mercator projection has a significant distortion: areas near the poles appear far larger than they actually are. Greenland, for instance, appears roughly the same size as Africa on a Mercator map, when in reality Africa is about 14 times larger." },
      { text: "Modern digital mapping has transformed the field dramatically. GPS data, satellite imagery, and crowd-sourced corrections from millions of users mean that today's maps are updated in near real-time." },
      { text: "OpenStreetMap, launched in 2004, operates on an open-source model — volunteers map their local areas, and the data is freely available to anyone. It has proven particularly valuable in humanitarian crises, where commercial maps may be outdated or unavailable." },
      { text: "Despite all this technology, cartographers argue that map-making still involves significant editorial choices. Every map reflects its maker's priorities — what to include, what to omit, what to place at the centre. A map is never simply neutral." }
    ],
    questions: [
      { num: 1, stem: 'The earliest known map dates to approximately ________ BCE.', answer: '25,000', explanation: 'The speaker states it "dates to around 25,000 BCE".' },
      { num: 2, stem: 'Mercator designed his projection primarily to help ________ navigate.', answer: 'sailors / maritime navigators', explanation: 'The projection was "designed specifically for maritime navigation" for sailors.' },
      { num: 3, stem: 'On the Mercator map, Greenland appears similar in size to ________.', answer: 'Africa', explanation: '"Greenland appears roughly the same size as Africa on a Mercator map."' },
      { num: 4, stem: 'OpenStreetMap was founded in ________.', answer: '2004', explanation: '"OpenStreetMap, launched in 2004..."' },
      { num: 5, stem: 'OpenStreetMap has proved especially useful during ________ situations.', answer: 'humanitarian crises', explanation: '"Particularly valuable in humanitarian crises."' },
      { num: 6, stem: 'The speaker argues that a map always reflects its maker\'s ________.', answer: 'priorities', explanation: '"Every map reflects its maker\'s priorities."' }
    ]
  };

  // Part 3: Interview MCQ
  const simListeningPart3 = {
    id: 'sl3',
    label: 'Part 3 — Interview with a science communicator',
    intro: 'You will hear an interview with Dr. Helen Marsh, a scientist who communicates research to general audiences.',
    script: [
      { speaker: 'Interviewer', text: "Dr. Marsh, you've written several popular science books. What made you want to bridge the gap between academic research and the public?" },
      { speaker: 'Dr. Marsh', text: "Honestly, frustration. I kept reading brilliant research that was sitting behind paywalls, written in language that excluded everyone except specialists. The public funds a huge proportion of this research through taxes, and most of them will never have access to it. That seemed fundamentally unfair." },
      { speaker: 'Interviewer', text: "Have scientists been supportive of your work?" },
      { speaker: 'Dr. Marsh', text: "Mixed responses, I'd say. Many of my colleagues see it as valuable. But there's still a contingent in academia that views public engagement as somehow lesser — not as rigorous as peer-reviewed publication. I've had people imply that I've left real science behind. Which I find baffling, given how much time I still spend in the lab." },
      { speaker: 'Interviewer', text: "What are the risks of simplifying science for a general audience?" },
      { speaker: 'Dr. Marsh', text: "It's a real tension. You have to make choices — you simplify some things, lose some nuance. The risk is that people come away with a confident but incorrect understanding. I try to flag uncertainty explicitly — I use phrases like 'the evidence suggests' rather than 'science proves', because certainty is rarely the situation in real research. Overconfident communication has contributed to public distrust when findings later shift." },
      { speaker: 'Interviewer', text: "Do you think social media has helped or hurt science communication?" },
      { speaker: 'Dr. Marsh', text: "Both. It's allowed scientists to speak directly to the public without going through journalists, which is genuinely democratising. But the format rewards simplicity and controversy. A nuanced finding gets far fewer shares than a dramatic headline. You're always fighting against that gravity." }
    ],
    questions: [
      {
        id: 'sl3_q1',
        question: "What was Dr. Marsh's main reason for writing popular science books?",
        choices: [
          'She wanted to earn more money than academic publishing allows.',
          'She felt research funded by the public should be accessible to them.',
          'She wanted to challenge incorrect assumptions in academic journals.',
          'She had been unable to publish her own research in peer-reviewed outlets.'
        ],
        answer: 1,
        explanation: '"The public funds a huge proportion of this research... and most of them will never have access to it. That seemed fundamentally unfair."'
      },
      {
        id: 'sl3_q2',
        question: "What does Dr. Marsh say about academic colleagues' views of her work?",
        choices: [
          'Most have actively supported her public engagement activities.',
          'Some see it as less serious than academic publication.',
          'All have encouraged her to spend less time in the lab.',
          'They unanimously prefer public engagement over research.'
        ],
        answer: 1,
        explanation: '"There\'s still a contingent in academia that views public engagement as somehow lesser."'
      },
      {
        id: 'sl3_q3',
        question: "How does Dr. Marsh deal with the risk of oversimplifying science?",
        choices: [
          'She avoids topics that are too complex to explain simply.',
          'She uses language that signals uncertainty rather than certainty.',
          'She always includes technical appendices in her books.',
          'She consults with journalists before finalising any claims.'
        ],
        answer: 1,
        explanation: '"I use phrases like \'the evidence suggests\' rather than \'science proves\', because certainty is rarely the situation in real research."'
      },
      {
        id: 'sl3_q4',
        question: "What does Dr. Marsh identify as the main problem with social media for science communication?",
        choices: [
          'It excludes older and less digitally literate audiences.',
          'The format favours simple or dramatic content over nuance.',
          'Scientists are prohibited from posting about unverified findings.',
          'It is too expensive for individual researchers to use effectively.'
        ],
        answer: 1,
        explanation: '"The format rewards simplicity and controversy. A nuanced finding gets far fewer shares than a dramatic headline."'
      }
    ]
  };

  // Part 4: Multiple Matching
  const simListeningPart4 = {
    id: 'sl4',
    label: 'Part 4 — Five people talking about changing careers',
    statements: [
      { id: 'A', text: 'The financial risk of the change was the hardest part to accept.' },
      { id: 'B', text: 'I underestimated how much I would miss the social aspects of my previous job.' },
      { id: 'C', text: 'A chance conversation led me to reconsider what I really wanted.' },
      { id: 'D', text: 'I found the transition easier than I had expected.' },
      { id: 'E', text: 'My previous skills turned out to be more transferable than I thought.' },
      { id: 'F', text: 'I changed careers primarily because of how it would affect my family.' }
    ],
    speakers: [
      {
        id: 'S1',
        label: 'Speaker 1',
        script: "I'd been a solicitor for twelve years when I decided to train as a teacher. Everyone thought I was mad — giving up the salary, the prestige. To be honest, the salary cut was genuinely frightening. My partner and I had a mortgage and two young children. It took us about six months of careful planning before I felt confident enough to hand in my notice. Looking back, the financial worry was the dominant emotion in that first year.",
        answer: 'A',
        explanation: '"The financial worry was the dominant emotion" — the financial risk was the hardest part.'
      },
      {
        id: 'S2',
        label: 'Speaker 2',
        script: "I moved from marketing into writing — freelance copywriting, then eventually a novel. What surprised me was how much I relied on marketing skills without realising it. Understanding audiences, knowing how to frame a story, being concise — all of that came directly from my previous work. People assume it's a total reinvention, but it was more of a reapplication.",
        answer: 'E',
        explanation: '"My marketing skills were more transferable than I thought" — skills transferred across careers.'
      },
      {
        id: 'S3',
        label: 'Speaker 3',
        script: "I went from nursing to software development. I know — very different. But I was at a conference and sat next to a developer at dinner. We talked for three hours. She told me about coding bootcamps, about how the job market was, about what she actually did day to day. I went home and started researching. That conversation genuinely changed the direction of my life.",
        answer: 'C',
        explanation: '"A chance conversation" at a conference led her to change career direction.'
      },
      {
        id: 'S4',
        label: 'Speaker 4',
        script: "I was an architect, now I run a small bakery. It sounds like the sort of thing you'd romanticise — and I did, initially. The reality of the first year nearly broke me. But what I hadn't anticipated was how much I'd miss my old colleagues. Architecture is very collaborative. Baking at five in the morning is not. I still find the solitude difficult, and I hadn't accounted for that at all.",
        answer: 'B',
        explanation: '"I miss my old colleagues" and "the solitude" — misses the social aspects of previous work.'
      },
      {
        id: 'S5',
        label: 'Speaker 5',
        script: "I had been in finance — hedge funds — and I left to become a secondary school maths teacher. I thought it would be the hardest thing I'd done professionally. Actually, no. The PGCE was tough, the first classroom experiences were tough, but I adapted faster than I'd predicted. The children kept me on my toes in a way that made the learning curve feel exciting rather than terrifying.",
        answer: 'D',
        explanation: '"I adapted faster than I\'d predicted" — transition was easier than expected.'
      }
    ]
  };

  // ── Speaking Section — Simulation Prompts ────────────────────────────────
  const simSpeakingParts = [
    {
      part: 1,
      title: 'Part 1 — Interview',
      duration: 120,
      timerLabel: '2 minutes',
      instructions: 'Answer the following questions as naturally as you can. You will have 30 seconds to respond to each question. Press "Start" and speak aloud, or write your response.',
      questions: [
        { q: "Can you tell me about where you live and what you like about it?" },
        { q: "How do you usually spend your free time at weekends?" },
        { q: "Do you prefer studying or working alone, or with other people? Why?" },
        { q: "How important is it for you to keep up with current news and events?" }
      ]
    },
    {
      part: 2,
      title: 'Part 2 — Individual Long Turn',
      duration: 60,
      timerLabel: '1 minute',
      instructions: 'Talk about the topic below for ONE MINUTE. You have 15 seconds to prepare. Your partner will then answer a brief follow-up question.',
      task: {
        prompt: 'Compare these two situations and say which you think is more rewarding.',
        optionA: { icon: '🎓', label: 'Studying a subject you find difficult', desc: 'Persisting through challenges, building skills over time, feeling the satisfaction of finally understanding something complex.' },
        optionB: { icon: '✅', label: 'Mastering something you are already good at', desc: 'Deepening expertise in a natural talent, achieving flow and excellence, feeling confident and competent.' }
      },
      followUp: "Which do you think is more common — people who seek challenge or people who seek comfort in what they know?",
      model: "Comparing these two situations, I'd argue that studying something difficult is ultimately more rewarding — though less immediately satisfying. When we struggle with a subject and eventually break through, the sense of achievement is qualitatively different from simply improving at something we already do well. The difficulty itself is what makes the learning meaningful. Research on skill acquisition suggests that growth happens at the edge of our comfort zone, not at its centre. That said, mastering a natural talent has its own value — there's a kind of joy in doing something well that shouldn't be dismissed. But if I had to choose, I'd say the harder path tends to produce more lasting satisfaction."
    },
    {
      part: 3,
      title: 'Part 3 — Collaborative Task',
      duration: 180,
      timerLabel: '3 minutes',
      instructions: 'Discuss the following question, considering the different options. Try to reach a conclusion.',
      task: {
        main: 'A city wants to encourage more residents to volunteer in the community. Which of the following approaches would be most effective?',
        prompts: [
          { icon: '🎁', label: 'Financial incentives', desc: 'Tax reductions or small payments for verified volunteer hours.' },
          { icon: '🏫', label: 'School programmes', desc: 'Making community service a required part of the secondary school curriculum.' },
          { icon: '📢', label: 'Awareness campaigns', desc: 'Marketing campaigns showcasing the impact and personal benefits of volunteering.' },
          { icon: '💼', label: 'Employer partnerships', desc: 'Encouraging companies to give employees paid time off for volunteering.' },
          { icon: '🌐', label: 'Online platforms', desc: 'A city app connecting volunteers to local opportunities that match their skills.' }
        ]
      },
      followUp: "Do you think volunteering should ever be made compulsory? Why or why not?"
    },
    {
      part: 4,
      title: 'Part 4 — Further Discussion',
      duration: 240,
      timerLabel: '4 minutes',
      instructions: 'Discuss the following questions. Give developed answers with reasons and examples.',
      questions: [
        { q: "Do you think modern societies undervalue community and collective responsibility compared to individual achievement?" },
        { q: "In your view, is it possible for someone to be genuinely selfless, or is there always some personal benefit involved in helping others?" },
        { q: "How has the role of community changed in recent decades, and what has driven those changes?" },
        { q: "Some people argue that social media has replaced genuine community. Do you agree?" }
      ]
    }
  ];

  // ── Score / Grade Calculator ──────────────────────────────────────────────
  // Cambridge Scale 80–230 → Grade A/B/C/D/E/U
  // B2 First pass mark ≈ 160 (C grade), A = 193+
  // C1 Advanced pass mark ≈ 169 (C grade), A = 193+
  //
  // Raw → Cambridge Scale approximation (simplified):
  //  Reading+UoE: max 56 items → scale 80–170 (raw/56 * 90 + 80)
  //  Writing: self 1–5 → scale 1–5 * 20 + 80 (80–180)
  //  Listening: max 30 items → scale 80–170 (raw/30 * 90 + 80)
  //  Speaking: avg self 0–5 → scale 0–5 * 18 + 80 (80–170)
  //  Overall = avg of 4 paper scores, rounded to nearest integer

  function calcReadingUoEScore(p1Raw, p2Raw, p3Raw, p4Raw, p5Raw) {
    // Parts 1–4 (UoE): 6+7+8+6 = 27 items
    // Part 5 (Reading): 4 items
    // Total = 31 items, map to 80–170
    const total = (p1Raw || 0) + (p2Raw || 0) + (p3Raw || 0) + (p4Raw || 0) + (p5Raw || 0);
    const max = 31;
    return Math.round(80 + (total / max) * 90);
  }

  function calcListeningScore(p1Raw, p2Raw, p3Raw, p4Raw) {
    // Part1: 3, Part2: 6, Part3: 4, Part4: 5 = 18 items → map 80–170
    const total = (p1Raw || 0) + (p2Raw || 0) + (p3Raw || 0) + (p4Raw || 0);
    const max = 18;
    return Math.round(80 + (total / max) * 90);
  }

  function calcWritingScore(selfScore) {
    // selfScore 1–5
    const s = Math.max(1, Math.min(5, selfScore || 1));
    return Math.round(80 + (s - 1) / 4 * 90);
  }

  function calcSpeakingScore(avgSelf) {
    // avgSelf 1–5
    const s = Math.max(1, Math.min(5, avgSelf || 1));
    return Math.round(80 + (s - 1) / 4 * 90);
  }

  function calcOverallScale(rueScore, writingScore, listenScore, speakScore) {
    return Math.round((rueScore + writingScore + listenScore + speakScore) / 4);
  }

  function cambridgeScaleToGrade(scale) {
    if (scale >= 193) return { grade: 'A', label: 'Grade A', pass: true, color: '#22c55e', desc: 'Outstanding — exceeds C1 Advanced / B2 First requirements.' };
    if (scale >= 180) return { grade: 'B', label: 'Grade B', pass: true, color: '#84cc16', desc: 'Very good — well above the pass threshold.' };
    if (scale >= 169) return { grade: 'C', label: 'Grade C', pass: true, color: '#eab308', desc: 'Pass — meets the C1 Advanced / B2 First standard.' };
    if (scale >= 160) return { grade: 'D', label: 'Grade D', pass: false, color: '#f97316', desc: 'Just below pass — borderline. Some skills are strong.' };
    if (scale >= 142) return { grade: 'E', label: 'Grade E', pass: false, color: '#ef4444', desc: 'Below pass — significant improvement needed.' };
    return { grade: 'U', label: 'Grade U', pass: false, color: '#6b7280', desc: 'Ungraded — needs substantial preparation before retaking.' };
  }

  // ── Public API ────────────────────────────────────────────────────────────
  return {
    // Reading & UoE
    getSimPart1: () => simPart1,
    getSimPart2: () => simPart2,
    getSimPart3: () => simPart3,
    getSimPart4: () => simPart4,
    getSimPart5: () => simPart5,
    // Writing
    getSimWritingP1: (level) => level === 'C1' ? simWritingPart1C1 : simWritingPart1,
    getSimWritingP2Options: () => simWritingPart2Options,
    // Listening
    getSimListeningP1: () => simListeningPart1,
    getSimListeningP2: () => simListeningPart2,
    getSimListeningP3: () => simListeningPart3,
    getSimListeningP4: () => simListeningPart4,
    // Speaking
    getSimSpeakingParts: () => simSpeakingParts,
    // Score calculators
    calcReadingUoEScore,
    calcListeningScore,
    calcWritingScore,
    calcSpeakingScore,
    calcOverallScale,
    cambridgeScaleToGrade,
    // Times
    sectionTimes: {
      reading: 75 * 60,    // 75 minutes
      writing: 80 * 60,    // 80 minutes
      listening: 40 * 60,  // 40 minutes
      speaking: null       // self-paced with per-part timers
    }
  };

})();
