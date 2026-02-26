/**
 * EnglishPath — IELTS Writing Data
 * Fase 13c-1: Practice per Skill — Writing
 * Task 1 Academic, Task 1 General Training, Task 2 Essay
 */
const IELTSWritingData = (() => {

  const task1Academic = [
    {
      id: 'a1',
      title: 'Internet Usage by Age Group',
      icon: '📊',
      type: 'bar_chart',
      difficulty: 'medium',
      description: 'The bar chart below shows the percentage of people in different age groups who used the internet daily in a European country in 2020.',
      chartData: {
        labels: ['16–24', '25–34', '35–44', '45–54', '55–64', '65+'],
        values: [96, 94, 88, 79, 62, 41],
        unit: '% using internet daily',
        year: 2020
      },
      textData: [
        'Age 16–24: 96% used the internet daily',
        'Age 25–34: 94% used the internet daily',
        'Age 35–44: 88% used the internet daily',
        'Age 45–54: 79% used the internet daily',
        'Age 55–64: 62% used the internet daily',
        'Age 65+: 41% used the internet daily'
      ],
      minWords: 150,
      timeLimit: 20,
      keyFeatures: [
        'Overall downward trend with age',
        'Very high usage among 16–34 (94–96%)',
        'Significant drop between 55–64 (62%) and 65+ (41%)',
        'Even lowest group (65+) shows substantial usage at 41%'
      ],
      model: 'The bar chart illustrates the proportion of individuals across six age groups who accessed the internet on a daily basis in a European country in 2020.\n\nOverall, it is clear that internet usage declined consistently with age, with young adults being by far the most frequent users and the oldest group showing considerably lower engagement.\n\nIn terms of specific figures, the 16–24 age group recorded the highest daily usage at 96%, closely followed by the 25–34 group at 94%. Usage remained relatively high among those aged 35–44 at 88%, suggesting that the majority of working-age adults used the internet every day.\n\nA more notable decline is evident in the older cohorts. Those aged 45–54 showed a daily usage rate of 79%, which, while still high, represents a meaningful drop from the younger groups. This downward trend continued among the 55–64 bracket at 62% and was most pronounced in the 65 and above category, where only 41% of individuals used the internet daily.\n\nIn summary, while internet use was near-universal among younger generations, it declined substantially with age, particularly among those over 55, though even the oldest group demonstrated a significant level of daily engagement at 41%.',
      scoringTips: [
        'Describe the overall trend first (age → usage goes down)',
        'Group similar data together rather than listing every figure',
        'Use precise comparatives: "considerably lower", "marginally higher"',
        'Include specific figures to support your description',
        'Write an overview paragraph — don\'t just describe every bar'
      ]
    },
    {
      id: 'a2',
      title: 'Global Energy Production Sources',
      icon: '⚡',
      type: 'pie_chart',
      difficulty: 'medium',
      description: 'The pie charts below show the sources of energy production in a particular country in 1990 and 2020.',
      chartData: null,
      textData: [
        '1990: Coal 45%, Oil 30%, Natural Gas 15%, Renewables 5%, Nuclear 5%',
        '2020: Coal 25%, Oil 25%, Natural Gas 20%, Renewables 20%, Nuclear 10%'
      ],
      minWords: 150,
      timeLimit: 20,
      keyFeatures: [
        'Coal dominance in 1990 vs. more balanced mix in 2020',
        'Dramatic rise of renewables from 5% to 20%',
        'Coal fell by 20 percentage points',
        'Nuclear doubled; natural gas increased slightly'
      ],
      model: 'The two pie charts compare the energy production sources in a specific country between 1990 and 2020, revealing a notable shift toward cleaner energy over this thirty-year period.\n\nIn 1990, the country was heavily reliant on fossil fuels. Coal was the dominant energy source, accounting for 45% of total production. This was followed by oil at 30% and natural gas at 15%. Renewable energy and nuclear power each contributed a modest 5%, together making up just one tenth of the energy mix.\n\nBy 2020, the energy landscape had changed considerably. While fossil fuels still dominated, their combined share had decreased. Coal fell substantially to 25%, and oil also declined slightly to 25%. Natural gas saw a modest increase to 20%. The most significant change was the dramatic growth of renewable energy, which rose from 5% in 1990 to 20% in 2020, a fourfold increase. Nuclear power also doubled its share to 10%.\n\nOverall, the most striking development between 1990 and 2020 was the diversification of the energy mix and the substantial growth of renewables, even as fossil fuels remained the primary source of energy production.',
      scoringTips: [
        'Compare both charts rather than describing each separately',
        'Highlight the biggest changes with clear data support',
        'Use language of change: "fell substantially", "rose dramatically"',
        'Include an overview identifying the main trend',
        'Group fossil fuels together vs. clean energy sources'
      ]
    },
    {
      id: 'a3',
      title: 'Tourist Arrivals to Three Countries',
      icon: '📈',
      type: 'line_graph',
      difficulty: 'hard',
      description: 'The line graph below shows the number of international tourist arrivals (in millions) to three countries between 2000 and 2020.',
      chartData: null,
      textData: [
        'Country A: 2000: 20M, 2005: 28M, 2010: 35M, 2015: 45M, 2020: 30M',
        'Country B: 2000: 15M, 2005: 18M, 2010: 25M, 2015: 30M, 2020: 28M',
        'Country C: 2000: 5M, 2005: 10M, 2010: 18M, 2015: 22M, 2020: 15M'
      ],
      minWords: 150,
      timeLimit: 20,
      keyFeatures: [
        'Country A consistently highest but sharp 2020 drop',
        'Country B steady growth, relatively stable 2020',
        'Country C strongest percentage growth despite lowest absolute numbers',
        'All three declined in 2020 (likely COVID-19 effect)'
      ],
      model: 'The line graph illustrates trends in international tourist arrivals to three unnamed countries between 2000 and 2020, measured in millions of visitors.\n\nCountry A attracted the largest number of tourists throughout the entire period. Starting at 20 million in 2000, arrivals grew steadily, reaching a peak of 45 million in 2015 before dropping sharply to 30 million in 2020. Despite this decline, Country A remained the leading destination.\n\nCountry B followed a broadly similar upward trajectory, though at lower levels. Arrivals rose from 15 million in 2000 to a high of 30 million in 2015, and remained relatively stable at 28 million in 2020, showing greater resilience than the other two countries in the final year.\n\nCountry C recorded the lowest absolute numbers but demonstrated the most impressive proportional growth. Tourist arrivals climbed from just 5 million in 2000 to 22 million in 2015, representing a fourfold increase. However, like the others, Country C saw a decline in 2020, falling to 15 million.\n\nOverall, all three countries experienced significant growth in tourist arrivals between 2000 and 2015, followed by a marked decline in 2020, which likely reflects the impact of the global pandemic on international travel.',
      scoringTips: [
        'Identify the key turning point year (2015 peak, 2020 fall)',
        'Compare countries at key time points',
        'Use language to describe trends: "grew steadily", "fell sharply"',
        'Note patterns common to all three (general uptrend then decline)',
        'Speculate about causes only briefly and cautiously'
      ]
    },
    {
      id: 'a4',
      title: 'How Rainwater is Collected',
      icon: '🌧️',
      type: 'diagram',
      difficulty: 'medium',
      description: 'The diagram below illustrates how a household rainwater collection system works.',
      chartData: null,
      textData: [
        'Step 1: Rainwater falls onto a sloped roof surface',
        'Step 2: Gutters along roof edges collect the water',
        'Step 3: A downpipe carries water from gutters downward',
        'Step 4: A filter removes debris and contaminants',
        'Step 5: Filtered water enters a storage tank underground',
        'Step 6: A pump draws water from the tank',
        'Step 7: Water is distributed to household taps and toilet'
      ],
      minWords: 150,
      timeLimit: 20,
      keyFeatures: [
        'Passive collection from roof',
        'Filtration stage is critical',
        'Underground storage for temperature stability',
        'Active pump for distribution',
        'End uses: non-drinking household uses'
      ],
      model: 'The diagram shows the process by which rainwater is collected, filtered, stored, and distributed for household use through a dedicated collection system.\n\nThe process begins when rainfall lands on the sloped surface of a roof. The slope ensures that water flows naturally toward gutters positioned along the edges of the roof. These gutters channel the collected water into a vertical downpipe, which carries it downward from the roof level to a filtration system.\n\nBefore entering storage, the water passes through a filter designed to remove physical debris such as leaves, twigs, and sediment, as well as other contaminants that may have accumulated on the roof surface. This is a critical stage to ensure the water is clean enough for domestic use.\n\nThe filtered water then flows into a storage tank, which in this system is installed underground. Underground placement helps maintain a stable water temperature and protects the stored water from light and heat, which can encourage bacterial growth.\n\nWhen water is required within the household, an electric pump draws it from the underground tank and pressurises it for distribution through the internal plumbing system. The water can then reach various points of use around the home, including bathroom taps, toilets, and outdoor taps.\n\nOverall, the system provides an efficient method of harvesting rainwater for everyday household purposes, reducing reliance on mains water supplies.',
      scoringTips: [
        'Use sequencing language: "first", "then", "subsequently", "finally"',
        'Use passive voice where appropriate: "water is filtered"',
        'Describe the purpose of each stage, not just what happens',
        'Write an overview identifying the main stages or purpose',
        'Don\'t just list steps — explain how they connect'
      ]
    }
  ];

  const task1General = [
    {
      id: 'g1',
      title: 'Formal Complaint Letter',
      icon: '📩',
      register: 'formal',
      situation: 'You recently bought a laptop from an electronics store. The laptop has developed a fault within two weeks of purchase. Write a letter to the store manager.',
      bulletPoints: [
        'Describe the problem with the laptop',
        'Explain the inconvenience it has caused you',
        'Say what you would like the store to do'
      ],
      minWords: 150,
      timeLimit: 20,
      features: ['formal salutation', 'clear structure', 'polite but assertive tone', 'specific details', 'formal sign-off'],
      model: 'Dear Sir or Madam,\n\nI am writing to formally complain about a laptop I purchased from your store on 12th November. The model in question is a TechPro X500, with the receipt number 8847201.\n\nThe laptop developed a significant fault within two weeks of purchase. Specifically, the screen now displays a black band across the lower third, making it impossible to view content fully. I have not dropped or damaged the device in any way, and I believe this is a manufacturing defect.\n\nThis fault has caused me considerable inconvenience, as I rely on the laptop for my work as a freelance writer. I have lost several hours of productivity and have been forced to rent equipment from a colleague in the meantime, at additional personal expense.\n\nI would therefore appreciate it if you could either arrange for the laptop to be repaired within a reasonable timeframe, ideally within five working days, or replace it with a new unit of the same model. Should neither option be possible, I would expect a full refund in accordance with consumer protection law.\n\nI would be grateful if you could treat this matter with urgency, given the disruption it is causing. I look forward to your prompt response.\n\nYours faithfully,\nA. Santoso',
      scoringTips: [
        'Open with "Dear Sir or Madam" (formal, recipient unknown) or name if given',
        'State your purpose clearly in the first paragraph',
        'Cover all three bullet points — missing one will cost marks',
        'Use formal vocabulary: "I am writing to", "I would be grateful if"',
        'Close with "Yours faithfully" (unknown recipient) or "Yours sincerely" (named)'
      ]
    },
    {
      id: 'g2',
      title: 'Semi-Formal Request Letter',
      icon: '📋',
      register: 'semi-formal',
      situation: 'You want to join a local sports club. Write a letter to the club secretary to request information and membership.',
      bulletPoints: [
        'Explain why you are interested in joining',
        'Ask about membership fees and what is included',
        'Enquire about any upcoming events or trials'
      ],
      minWords: 150,
      timeLimit: 20,
      features: ['semi-formal register', 'polite enquiry tone', 'clear questions', 'appropriate closing'],
      model: 'Dear Secretary,\n\nI am writing to enquire about membership at your club, having recently moved to the area and been recommended by a colleague who is an existing member.\n\nI have been playing tennis recreationally for several years and am particularly interested in improving my game in a more structured environment. I understand that your club has a strong coaching programme and active social scene, both of which appeal to me greatly.\n\nCould you please provide me with details about current membership options and the associated fees? I would also like to know what facilities and services are included in the standard membership package — for example, whether court booking is available to members and whether the coaching sessions are included or charged separately.\n\nAdditionally, I would be grateful if you could let me know whether there are any upcoming open days, trials, or social events in the near future. It would be a wonderful opportunity to meet other members and experience the club before committing to full membership.\n\nI look forward to hearing from you. Please feel free to contact me by email at a.santoso@email.com or by phone on 081234567890.\n\nKind regards,\nA. Santoso',
      scoringTips: [
        '"Kind regards" is appropriate for semi-formal letters',
        'Use polite question forms: "Could you please...", "I would be grateful if..."',
        'Include your contact details at the end',
        'Each bullet point should correspond to a paragraph',
        'Match formality to context — friendly but professional'
      ]
    },
    {
      id: 'g3',
      title: 'Informal Letter to a Friend',
      icon: '💌',
      register: 'informal',
      situation: 'Your English-speaking friend is planning to visit your city for the first time. Write a letter giving advice and suggestions.',
      bulletPoints: [
        'Recommend some places to visit or things to do',
        'Give advice about local customs or etiquette',
        'Offer to help with their plans or accommodation'
      ],
      minWords: 150,
      timeLimit: 20,
      features: ['informal register', 'friendly and warm tone', 'contractions and conversational phrases', 'personal style'],
      model: 'Hi Jamie,\n\nIt\'s so great to hear that you\'re finally coming to visit! I\'ve been looking forward to this for ages. You\'re going to love Bandung — there\'s so much to see and do.\n\nFirst things first: you absolutely have to visit Dago Pakar for the viewpoint — the panorama over the city is stunning, especially in the late afternoon. Braga Street is also a must — it\'s full of charming old Dutch colonial buildings, great cafes, and local boutiques. And if you\'re up for a slightly longer trip, the Tangkuban Perahu volcano is about an hour away and well worth the journey. The crater is genuinely impressive!\n\nA couple of things worth knowing before you arrive: Indonesians generally value politeness and respect, so a smile and a friendly "terima kasih" (thank you) will go a long way. Dress modestly when visiting religious sites — covering your shoulders and knees is appreciated.\n\nAnd don\'t even think about booking a hotel — you\'re staying with me! I\'ve already cleared the guest room. Let me know your flight details and I\'ll be there to pick you up. We can plan the itinerary together once you arrive.\n\nCan\'t wait to see you!\nWarm wishes,\nRio',
      scoringTips: [
        'Use contractions: "it\'s", "you\'re", "don\'t"',
        'Open informally: "Hi", "Dear [first name]"',
        'Use exclamations and enthusiasm to show warmth',
        'Informal phrases: "First things first", "can\'t wait to"',
        'Close with "Love", "Best wishes", "Take care", "Warm wishes"'
      ]
    }
  ];

  const task2Essays = [
    {
      id: 'e1',
      title: 'Remote Work & Society',
      icon: '🏠',
      type: 'opinion',
      question: 'Many companies now allow their employees to work from home. Some people believe this has many advantages, while others think it has significant disadvantages. Discuss both views and give your own opinion.',
      type_label: 'Discussion + Opinion Essay',
      minWords: 250,
      timeLimit: 40,
      planningPrompts: [
        'Advantages: flexibility, no commute, work-life balance, productivity?',
        'Disadvantages: isolation, blurred boundaries, collaboration challenges, inequality?',
        'Your own view: which outweighs the other? why?',
        'Example or evidence for each main point?'
      ],
      model: 'The rise of remote working has fundamentally altered traditional employment patterns, prompting debate about whether this shift is ultimately beneficial or detrimental. While compelling arguments exist on both sides, I believe the advantages outweigh the disadvantages when proper support structures are in place.\n\nProponents of remote work highlight several significant benefits. Perhaps most notably, employees gain considerable flexibility — they can adapt their working hours to suit personal rhythms, attend to family responsibilities, and eliminate time-consuming commutes. Research has consistently indicated that many workers report higher job satisfaction and, in some cases, greater productivity when working remotely. For employers, the arrangement can reduce office overheads and broaden the potential talent pool, since geography ceases to be a limiting factor in recruitment.\n\nConversely, critics raise valid concerns. Social isolation is a genuine risk, with many remote workers reporting feelings of disconnection from colleagues and a weakening of team cohesion. The boundaries between professional and personal life can become problematic when the home doubles as an office, leading to extended working hours and burnout. Furthermore, remote working is not equitably accessible — it favours office-based and knowledge workers while excluding those in manufacturing, healthcare, and service industries, potentially widening inequality.\n\nIn my view, the advantages of remote working are substantial but depend critically on effective implementation. When organisations invest in communication tools, regular team interaction, and clear boundaries around working hours, the benefits can be fully realised. Without such measures, the disadvantages become more pronounced. I therefore believe remote work represents a genuine improvement to working life — but one that requires thoughtful management.\n\nIn conclusion, remote working offers meaningful benefits in flexibility and productivity, though it presents real challenges around isolation and access. A hybrid approach, combining home and office working, may ultimately prove the most effective model for the majority of knowledge workers.',
      rubric: [
        { criterion: 'Task Response', description: 'Addresses all parts of the task; clear position; supported with relevant ideas' },
        { criterion: 'Coherence & Cohesion', description: 'Logical progression; effective paragraphing; linking devices used accurately' },
        { criterion: 'Lexical Resource', description: 'Wide range of vocabulary; appropriate collocations; minimal spelling errors' },
        { criterion: 'Grammar', description: 'Mix of simple and complex structures; accurate punctuation; errors do not impede communication' }
      ]
    },
    {
      id: 'e2',
      title: 'Fast Food & Public Health',
      icon: '🍔',
      type: 'problem_solution',
      question: 'In many countries, rates of obesity and diet-related illness are rising. What are the main causes of this problem, and what measures could be taken to address it?',
      type_label: 'Problem & Solution Essay',
      minWords: 250,
      timeLimit: 40,
      planningPrompts: [
        'Causes: cheap fast food access, sedentary lifestyles, marketing to children, food education gaps?',
        'Solutions: taxation on unhealthy food, better labelling, school education, public health campaigns?',
        'Link causes to solutions — each cause should have a corresponding measure',
        'Prioritise: which cause/solution is most significant?'
      ],
      model: 'Rising rates of obesity and diet-related illness represent one of the most pressing public health challenges of the modern era. Understanding the underlying causes and identifying effective responses is therefore of considerable importance.\n\nSeveral interconnected factors contribute to this trend. Most significantly, the proliferation of affordable, calorie-dense processed foods has made unhealthy diets accessible to a broad segment of the population. Fast food outlets and convenience stores now vastly outnumber fresh food markets in many urban areas, particularly in lower-income neighbourhoods. Simultaneously, increasingly sedentary lifestyles — driven by desk-based work, digital entertainment, and reduced physical activity in schools — mean that caloric intake frequently exceeds expenditure. Aggressive marketing of high-sugar and high-fat products, particularly to children, compounds the problem by shaping dietary preferences from an early age.\n\nAddressing these causes requires a coordinated response from governments, industries, and communities. Fiscal measures such as taxes on sugary beverages and processed foods have shown promising results in several countries; the revenue generated can be directed toward subsidising fresh produce, making healthy food more economically accessible. Mandatory, clear nutritional labelling on packaged foods would enable more informed consumer choices. Investment in physical education within schools and in public recreational infrastructure would help counteract sedentary behaviour. Equally, restricting the marketing of unhealthy foods to children, particularly in digital media, would reduce the normalisation of poor dietary habits.\n\nIn conclusion, the surge in diet-related illness reflects both economic and cultural factors that require systemic rather than purely individual solutions. Through a combination of regulation, education, and environmental redesign, governments and communities can create conditions in which healthier choices become the easier and more affordable option.',
      rubric: [
        { criterion: 'Task Response', description: 'Clearly identifies causes; proposes relevant, developed solutions; fully addresses the question' },
        { criterion: 'Coherence & Cohesion', description: 'Well-structured paragraphs; causes and solutions are logically linked; smooth transitions' },
        { criterion: 'Lexical Resource', description: 'Sophisticated vocabulary; accurate collocations; subject-specific terms used appropriately' },
        { criterion: 'Grammar', description: 'Varied sentence structures; accurate use of passive, conditionals, and complex clauses' }
      ]
    },
    {
      id: 'e3',
      title: 'Arts vs. Science in Schools',
      icon: '🎨',
      type: 'argument',
      question: 'Some people believe that schools should focus primarily on subjects like maths and science, as these are most useful in the modern world. Others argue that arts and humanities subjects are equally important. To what extent do you agree or disagree?',
      type_label: 'Opinion / Argument Essay',
      minWords: 250,
      timeLimit: 40,
      planningPrompts: [
        'STEM argument: economy, technology, well-paid jobs, innovation?',
        'Arts/humanities argument: creativity, critical thinking, cultural understanding, emotional intelligence?',
        'Your view: agree, disagree, or partially agree? Why?',
        'Avoid sitting on the fence too much — take a clear position'
      ],
      model: 'The debate over curriculum priorities in schools reflects broader disagreements about the purpose of education itself. While STEM subjects undeniably hold great economic importance, I firmly believe that arts and humanities are equally essential components of a well-rounded education.\n\nThe case for prioritising mathematics and science rests on strong practical foundations. The modern economy is increasingly driven by technology, data, and innovation, and there is significant demand for workers with strong quantitative and technical skills. Countries that produce graduates in these disciplines are often better positioned economically, and individual career prospects in STEM fields are generally excellent. These arguments, while sometimes overstated, are not without merit.\n\nHowever, this narrow utilitarian framing misrepresents what education is for and what it should produce. Arts and humanities cultivate skills that are not merely complementary to STEM but foundational to human flourishing: critical and analytical thinking, creative problem-solving, communication, empathy, and cultural literacy. Many of the most pressing challenges of our time — climate change, political polarisation, ethical governance of technology — demand precisely these capacities. Moreover, the rapid advancement of artificial intelligence makes many technical tasks automatable; what cannot easily be replicated is genuine creativity, ethical reasoning, and nuanced human judgment.\n\nFurthermore, from an individual wellbeing perspective, exposure to literature, art, music, and history enriches life in ways that extend far beyond professional utility. Education that produces economically productive but culturally and emotionally impoverished individuals is failing in its most fundamental mission.\n\nIn conclusion, I would argue strongly against sidelining arts and humanities in favour of STEM alone. A balanced curriculum, which develops both analytical rigour and creative, humanistic thinking, better prepares students for the complexity of modern life and work.',
      rubric: [
        { criterion: 'Task Response', description: 'Clear, consistent position; fully addresses the question; well-supported arguments' },
        { criterion: 'Coherence & Cohesion', description: 'Logical paragraph structure; counterargument addressed; effective discourse markers' },
        { criterion: 'Lexical Resource', description: 'Wide, precise vocabulary; sophisticated phrasing; appropriate academic register' },
        { criterion: 'Grammar', description: 'Complex structures used accurately; well-controlled sentence variety' }
      ]
    },
    {
      id: 'e4',
      title: 'Social Media & Young People',
      icon: '📱',
      type: 'discussion',
      question: 'Social media platforms have become a central part of young people\'s lives. To what extent is this a positive or negative development?',
      type_label: 'Evaluative Essay',
      minWords: 250,
      timeLimit: 40,
      planningPrompts: [
        'Positive: connection, self-expression, information access, social movements?',
        'Negative: mental health impact, misinformation, addiction, cyberbullying, comparison culture?',
        'On balance: is your conclusion positive or negative overall?',
        'Support each point with a specific example or development'
      ],
      model: 'Social media platforms now occupy a significant portion of young people\'s daily lives, prompting widespread discussion about whether this phenomenon is ultimately beneficial or harmful. On balance, I consider the negative consequences to outweigh the benefits, though the issue is considerably more nuanced than either extreme position suggests.\n\nThere are genuine advantages to young people\'s engagement with social media. These platforms facilitate connection and community-building, enabling young people to maintain relationships across geographical distances and to find communities of shared interest, which can be particularly valuable for those who feel marginalised in their immediate environment. Social media has also proved a powerful tool for political engagement and social movements, with young people leveraging platforms to organise and amplify causes they care deeply about.\n\nNevertheless, the documented harms are concerning and well-evidenced. Research increasingly links heavy social media use with anxiety, depression, and low self-esteem among young people, partly due to the culture of comparison fostered by curated self-presentation. The addictive design features of many platforms — infinite scrolling, variable reward mechanisms, and notification systems — are specifically engineered to maximise engagement at the expense of users\' wellbeing. Exposure to misinformation, cyberbullying, and age-inappropriate content represents further significant risks. Crucially, these harms fall disproportionately on younger and more vulnerable users.\n\nIn conclusion, while social media offers real social and informational value, its current design and incentive structures make it, on the whole, a problematic development for young people. Regulatory oversight, digital literacy education, and greater corporate responsibility in platform design are urgently needed to shift this balance.',
      rubric: [
        { criterion: 'Task Response', description: 'Both sides considered; clear evaluative stance reached; ideas fully developed' },
        { criterion: 'Coherence & Cohesion', description: 'Well-organised argument; coherent paragraphs; appropriate linking language' },
        { criterion: 'Lexical Resource', description: 'Precise, varied vocabulary; effective use of hedging language; academic register' },
        { criterion: 'Grammar', description: 'Accurate complex structures; controlled use of passive, relative clauses, and conditionals' }
      ]
    }
  ];

  return {
    getTask1Academic: () => task1Academic,
    getTask1AcademicById: (id) => task1Academic.find(t => t.id === id),
    getTask1General: () => task1General,
    getTask1GeneralById: (id) => task1General.find(t => t.id === id),
    getTask2Essays: () => task2Essays,
    getTask2EssayById: (id) => task2Essays.find(e => e.id === id)
  };

})();
