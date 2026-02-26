/**
 * EnglishPath — Cambridge Writing Data
 * Fase 16c-1: Practice Writing & Speaking
 * Part 1: Compulsory Essay (B2: 140+ kata, C1: 220+ kata)
 * Part 2: Optional Tasks — Letter/Email, Report, Review, Article, Story
 * localStorage: ep_user_{id}_cambridge_writing
 */
const CambridgeWritingData = (() => {

  // ── Part 1: Compulsory Essay ─────────────────────────────────────────────
  // B2 First essays + C1 Advanced essays
  const part1Essays = [
    {
      id: 'essay_b2_01',
      level: 'B2',
      icon: '📱',
      title: 'Technology and Social Interaction',
      stimulus: `In your English class you have been discussing the impact of technology on how people interact with each other. Your teacher has asked you to write an essay.`,
      prompt: `Write an essay using all the notes and give reasons for your point of view.\n\n**Essay question:** Has technology made it harder for people to form genuine friendships?\n\n**Notes:**\n- Social media connections\n- Face-to-face communication\n- Time spent online vs offline\n\nWrite your answer in 140–190 words.`,
      wordMin: 140, wordMax: 190,
      planningPrompts: [
        '💡 Introduction: State your position clearly on whether technology helps or hinders genuine friendship.',
        '📌 Point 1 (Social media): Does connecting online lead to shallow or meaningful relationships?',
        '📌 Point 2 (Face-to-face): How has screen time affected in-person communication skills?',
        '📌 Point 3 (Time online): What is the opportunity cost of time spent on devices?',
        '✅ Conclusion: Summarise your view with a balanced or firm final opinion.'
      ],
      rubric: [
        { criterion: 'Content', desc: 'All three notes addressed with relevant arguments and examples' },
        { criterion: 'Communicative Achievement', desc: 'Appropriate academic essay register; clear argument that engages the reader' },
        { criterion: 'Organisation', desc: 'Clear introduction, body paragraphs, and conclusion with linking phrases' },
        { criterion: 'Language', desc: 'B2-level vocabulary and grammar; varied sentence structures; minimal errors' }
      ],
      model: `Technology has undeniably transformed how people connect, but the question of whether this transformation harms genuine friendship is more nuanced than it first appears.

On one hand, social media platforms allow us to maintain contact with hundreds of people simultaneously. However, critics argue that these connections are superficial — we know facts about people's lives without truly knowing the people themselves. A birthday notification is hardly the same as remembering someone's struggles.

Furthermore, the ubiquity of smartphones has eroded face-to-face communication skills. Many young people feel more comfortable texting than having difficult conversations in person, which is precisely where deep friendships are forged.

That said, technology also enables long-distance friendships to survive and thrive. Video calls can substitute meaningfully for physical presence in ways that letters never could.

In conclusion, while technology provides the infrastructure for connection, genuine friendship still requires intentional effort and real-world interaction. Technology is a tool — whether it helps or hinders depends entirely on how we choose to use it.`
    },
    {
      id: 'essay_b2_02',
      level: 'B2',
      icon: '🌱',
      title: 'Individual Action vs Environmental Change',
      stimulus: `In your English class you have been discussing environmental issues. Your teacher has asked you to write an essay.`,
      prompt: `Write an essay using all the notes and give reasons for your point of view.\n\n**Essay question:** Can individuals make a significant difference to environmental problems, or is government action more important?\n\n**Notes:**\n- Personal lifestyle choices\n- Government policies and regulations\n- Corporate responsibility\n\nWrite your answer in 140–190 words.`,
      wordMin: 140, wordMax: 190,
      planningPrompts: [
        '💡 Introduction: Frame the debate — individual vs structural solutions.',
        '📌 Point 1 (Personal choices): What can individuals realistically do? Are these changes meaningful at scale?',
        '📌 Point 2 (Government policies): Name specific policy types. Why are regulations more impactful?',
        '📌 Point 3 (Corporate responsibility): Who bears the greatest environmental burden?',
        '✅ Conclusion: Is it an either/or situation, or do both levels need to work together?'
      ],
      rubric: [
        { criterion: 'Content', desc: 'All three notes addressed with clear arguments, examples, and a developed viewpoint' },
        { criterion: 'Communicative Achievement', desc: 'Academic essay register; balanced discussion or persuasive argument' },
        { criterion: 'Organisation', desc: 'Logical structure with cohesive devices connecting ideas' },
        { criterion: 'Language', desc: 'B2 range of vocabulary and grammar; accurate expression of opinion' }
      ],
      model: `The environmental crisis demands action at every level, yet the debate about where responsibility truly lies remains heated and unresolved.

Individual lifestyle choices — reducing meat consumption, using public transport, minimising plastic — collectively represent significant carbon reductions. When millions of people make small changes, the cumulative effect is substantial. Moreover, consumer choices send powerful market signals to companies.

However, individuals face structural barriers. Without government investment in renewable energy infrastructure or affordable public transport, even the most committed person has limited options. Government regulations — carbon taxes, emissions standards, and international agreements — can compel systemic change that voluntary action never achieves.

Perhaps most importantly, corporate activity is responsible for the majority of global emissions. Without regulation compelling businesses to change, individual efforts risk being overwhelmed by industrial-scale pollution.

In conclusion, individual action matters and sets a moral example, but transformative environmental change requires strong government policy that reshapes both corporate behaviour and the infrastructure people live within.`
    },
    {
      id: 'essay_c1_01',
      level: 'C1',
      icon: '🎓',
      title: 'The Value of Higher Education',
      stimulus: `You have been asked to write an essay for a university magazine. The essay must be based on the following question and include the points listed below.`,
      prompt: `Write an essay addressing the following question:\n\n**Is a university degree still the most valuable investment a young person can make?**\n\nIn your essay, you should:\n- consider the changing graduate employment landscape\n- discuss alternative pathways to success (vocational training, entrepreneurship, self-directed learning)\n- evaluate whether universities adequately prepare students for the modern world\n\nWrite your answer in **220–260 words**.`,
      wordMin: 220, wordMax: 260,
      planningPrompts: [
        '💡 Introduction: Hook with the shifting perception of university value. State your nuanced position.',
        '📌 Argument 1: Graduate employment — rising graduate salaries vs credential inflation and student debt.',
        '📌 Argument 2: Alternatives — coding bootcamps, apprenticeships, self-taught entrepreneurs. Are these exceptions or the new norm?',
        '📌 Argument 3: University relevance — critical thinking and networks vs outdated curricula and lack of practical skills.',
        '⚖️ Counter-argument: Acknowledge the strongest opposing view before refuting it.',
        '✅ Conclusion: A considered verdict — conditional value, not absolute.'
      ],
      rubric: [
        { criterion: 'Content', desc: 'All three bullet points developed with sophisticated, specific arguments; balanced critical analysis' },
        { criterion: 'Communicative Achievement', desc: 'Academic magazine register maintained; engages reader intellectually; nuanced stance' },
        { criterion: 'Organisation', desc: 'Sophisticated use of cohesive devices; clear progression of argument; effective introduction and conclusion' },
        { criterion: 'Language', desc: 'C1-level vocabulary and idiom; complex grammatical structures used accurately; minimal errors affecting communication' }
      ],
      model: `For much of the twentieth century, a university degree represented the surest pathway to professional success. Yet in an era of spiralling tuition costs, credential inflation, and disruptive technology, this assumption demands rigorous scrutiny.

Proponents of higher education correctly note that graduates continue to earn, on average, significantly more than non-graduates over a lifetime. Universities also cultivate critical thinking, research skills, and professional networks that are notoriously difficult to acquire elsewhere. In fields such as medicine, law, or engineering, a degree remains an absolute prerequisite.

However, the landscape is shifting in profound ways. The explosive growth of vocational bootcamps, online learning platforms, and apprenticeship schemes has demonstrated that technical proficiency — once the preserve of universities — can be acquired faster and at a fraction of the cost. High-profile entrepreneurs who left or bypassed university altogether have complicated the traditional narrative, though their success stories arguably represent survivorship bias rather than a systemic alternative.

Perhaps the most damaging critique is that many curricula have failed to adapt to the modern economy. Graduates emerge with theoretical knowledge but insufficient practical skills, leaving employers and employees alike frustrated.

In conclusion, the value of a university degree is real but conditional. For many disciplines and career paths, it remains the wisest investment. For others, a more direct vocational route is both cheaper and more effective. The answer lies not in dismissing higher education, but in choosing it with clear-eyed purpose.`
    },
    {
      id: 'essay_c1_02',
      level: 'C1',
      icon: '🤖',
      title: 'Artificial Intelligence in Everyday Life',
      stimulus: `You have been asked to write an essay for a technology conference publication. The essay must address the following question and include the points listed.`,
      prompt: `Write an essay addressing the following question:\n\n**To what extent should society embrace artificial intelligence in everyday life?**\n\nIn your essay, you should:\n- consider the economic and efficiency benefits of AI integration\n- discuss the ethical concerns raised by widespread AI use\n- evaluate how AI may reshape human identity and purpose\n\nWrite your answer in **220–260 words**.`,
      wordMin: 220, wordMax: 260,
      planningPrompts: [
        '💡 Introduction: Frame AI as both transformative promise and genuine risk. Avoid cliché.',
        '📌 Argument 1: Economic/efficiency benefits — automation, healthcare diagnostics, accessibility tools.',
        '📌 Argument 2: Ethical concerns — algorithmic bias, surveillance, loss of privacy, autonomy.',
        '📌 Argument 3: Human identity — what happens to purpose when machines outperform us in intellectual tasks?',
        '⚖️ Counter-argument: Can regulation and design ethics resolve these concerns?',
        '✅ Conclusion: Nuanced view — embrace with governance, not uncritical enthusiasm.'
      ],
      rubric: [
        { criterion: 'Content', desc: 'Sophisticated engagement with all three points; insightful arguments beyond surface-level observations' },
        { criterion: 'Communicative Achievement', desc: 'Authoritative academic-journalistic register; persuasive but intellectually honest' },
        { criterion: 'Organisation', desc: 'Coherent argument arc; well-integrated counter-argument; strong conclusion' },
        { criterion: 'Language', desc: 'Precise C1 vocabulary; varied syntax; complex structures handled accurately' }
      ],
      model: `Artificial intelligence is no longer a speculative technology — it is woven into the fabric of daily existence, from personalised news feeds to medical imaging analysis. Yet the pace of its integration has outstripped our capacity to govern it wisely.

The efficiency and accessibility gains are undeniable. AI diagnostics identify cancers earlier than human radiologists; smart assistants extend autonomy to people with disabilities; machine translation connects communities across language barriers. These are not trivial achievements.

Nevertheless, the ethical implications are formidable. Algorithmic systems trained on biased data perpetuate and amplify existing inequalities in hiring, lending, and criminal sentencing. The normalisation of pervasive data collection erodes privacy as a social expectation rather than merely a legal right. More insidiously, the opacity of neural networks makes accountability nearly impossible — when an algorithm makes a consequential error, no individual can be held responsible.

Perhaps most philosophically troubling is the question of human purpose. If machines supersede human intelligence in creative, analytical, and emotional domains, what remains uniquely ours? This is not science fiction — it is a question that artists, philosophers, and economists must answer this generation.

In conclusion, dismissing AI is neither possible nor desirable. Its benefits are too significant to forgo. However, uncritical embrace is equally irresponsible. Society must develop robust regulatory frameworks, algorithmic transparency standards, and broader conversations about the kind of future we are building — before we find ourselves living in one we did not consciously choose.`
    }
  ];

  // ── Part 2: Optional Tasks ───────────────────────────────────────────────
  const part2Tasks = [
    // ── Letter / Email ──
    {
      id: 'p2_letter_01',
      level: 'B2',
      type: 'letter',
      icon: '✉️',
      title: 'Formal Letter of Complaint',
      stimulus: `You recently bought a laptop from an online retailer. When it arrived, it was damaged and did not match the product description on the website. You have already spoken to customer service but received no satisfactory response.`,
      prompt: `Write a **formal letter of complaint** to the company's customer services manager.\n\nIn your letter you should:\n- describe the problem with the laptop\n- explain what action customer service took (or failed to take)\n- state clearly what you expect the company to do now\n\nWrite your answer in **140–190 words** (B2) or **220–260 words** (C1).`,
      wordMin: 140, wordMax: 190,
      planningPrompts: [
        '📌 Opening: Formal salutation. State purpose immediately ("I am writing to express...") ',
        '📌 Para 1: Describe the problem clearly and factually — damage, discrepancy from description, order number/date.',
        '📌 Para 2: Customer service failure — what did they say/do? Why was it inadequate?',
        '📌 Para 3: Your request — refund, replacement, or compensation. Set a reasonable deadline.',
        '✅ Closing: Formal sign-off. State you await their response.'
      ],
      rubric: [
        { criterion: 'Content', desc: 'All three points addressed; factual and persuasive complaint' },
        { criterion: 'Communicative Achievement', desc: 'Formal register maintained throughout; appropriately firm but professional tone' },
        { criterion: 'Organisation', desc: 'Formal letter structure with clear paragraphing' },
        { criterion: 'Language', desc: 'Formal vocabulary and expressions; grammatically accurate; appropriate modals (would, should)' }
      ],
      model: `Dear Customer Services Manager,

I am writing to express my deep dissatisfaction with a recent purchase and the wholly inadequate response I have received from your company.

On 14th November, I ordered a ProBook 450 laptop (Order #GB-88142). When the package arrived three days later, the screen was cracked and the keyboard was clearly misaligned — damage consistent with mishandling during delivery. Furthermore, the laptop was described on your website as having 16GB RAM; the device I received has only 8GB.

I contacted your customer service team immediately. After a 45-minute wait, I was told to "wait for an investigation" that has now been ongoing for two weeks with no update. This response is entirely unacceptable given the scale of the problem.

I am therefore requesting a full replacement laptop matching the original specification, or a complete refund of £849, within ten working days of this letter. Should I not receive a satisfactory resolution, I will have no choice but to escalate this matter to the relevant consumer protection authority.

I look forward to your prompt response.

Yours faithfully,
A. Customer`
    },
    {
      id: 'p2_email_01',
      level: 'B2',
      type: 'letter',
      icon: '📧',
      title: 'Semi-Formal Email to a Colleague',
      stimulus: `You work for an international company. A new colleague from another country, Alex, is joining your team next month and has emailed asking for advice about settling in to the city and the company culture.`,
      prompt: `Write a **semi-formal email** to Alex.\n\nIn your email you should:\n- welcome Alex warmly and mention you are looking forward to working together\n- give two or three practical tips about the city\n- share one or two pieces of advice about the company culture\n\nWrite your answer in **140–190 words**.`,
      wordMin: 140, wordMax: 190,
      planningPrompts: [
        '📌 Opening: Semi-formal greeting (Dear Alex,) + warm welcome. Briefly introduce yourself.',
        '📌 Para 1: City tips — transport, neighbourhoods to explore, local recommendations.',
        '📌 Para 2: Company culture — communication style, expectations, social events.',
        '✅ Closing: Offer to answer more questions. Looking forward to meeting.'
      ],
      rubric: [
        { criterion: 'Content', desc: 'Welcome, city tips, and company culture advice all included' },
        { criterion: 'Communicative Achievement', desc: 'Semi-formal register — friendly but professional; helpful and encouraging tone' },
        { criterion: 'Organisation', desc: 'Logical flow; clear email structure with appropriate opening and closing' },
        { criterion: 'Language', desc: 'Range of B2 vocabulary; natural conversational phrasing; minimal errors' }
      ],
      model: `Dear Alex,

Welcome to the team! I'm really looking forward to working with you next month. I'm Jamie — I've been with the company for three years and I'm happy to help you settle in.

In terms of the city, I'd strongly recommend getting a monthly transit pass for the underground — it's far cheaper than individual tickets and gets you everywhere quickly. If you're looking for a nice area to live, the Westfield district is very popular with professionals: good cafés, parks, and a lively weekend market.

As for the company, a few things I wish someone had told me: firstly, we're quite a direct culture — people say what they think in meetings, which is refreshing once you're used to it. Secondly, Friday afternoon drinks are a genuine tradition, not optional! It's a great way to get to know people outside your immediate team.

Feel free to email me with any other questions — I'm happy to help.

Best wishes,
Jamie`
    },
    // ── Report ──
    {
      id: 'p2_report_01',
      level: 'B2',
      type: 'report',
      icon: '📊',
      title: 'Report on Community Facilities',
      stimulus: `Your local council has asked residents to submit a report on the current state of community facilities in the area, with suggestions for improvement.`,
      prompt: `Write a **report** for the local council.\n\nYour report should:\n- describe the current state of two or three facilities (e.g., parks, libraries, sports centres)\n- identify the main problems residents are experiencing\n- make specific, practical recommendations for improvement\n\nWrite your answer in **140–190 words** (B2) or **220–260 words** (C1).`,
      wordMin: 140, wordMax: 190,
      planningPrompts: [
        '📌 Title/Introduction: State the purpose and scope of the report (one or two sentences).',
        '📌 Section 1: Current State — describe facilities objectively. Use subheadings if helpful.',
        '📌 Section 2: Problems — what are residents saying? Overcrowding, poor maintenance, opening hours?',
        '📌 Section 3: Recommendations — specific, actionable. Number them for clarity.',
        '✅ Conclusion: Brief summary and how improvements would benefit the community.'
      ],
      rubric: [
        { criterion: 'Content', desc: 'Facilities described, problems identified, and recommendations made clearly' },
        { criterion: 'Communicative Achievement', desc: 'Formal report register; impersonal, objective tone; appropriate for council audience' },
        { criterion: 'Organisation', desc: 'Subheadings used effectively; logical progression from description to recommendation' },
        { criterion: 'Language', desc: 'Formal vocabulary; passive voice where appropriate; clear and precise expression' }
      ],
      model: `**Report on Community Facilities in the Hartfield District**

**Introduction**
This report examines the current state of community facilities in the Hartfield area and makes recommendations for improvement, based on feedback gathered from local residents.

**Current State**
The central park is well-maintained and well-used, particularly at weekends. However, the public library is severely understaffed, resulting in limited opening hours and long waiting times for reserved books. The sports centre, while spacious, suffers from outdated equipment that is frequently out of service.

**Key Problems**
Residents have identified three main concerns: insufficient library staffing, ageing sports facilities, and a lack of safe cycling routes connecting the park to the high street.

**Recommendations**
1. Increase library staffing to allow full seven-day opening.
2. Allocate budget for replacing sports equipment on a three-year rolling cycle.
3. Install a protected cycle lane on Bridge Road connecting the park to the town centre.

**Conclusion**
These targeted improvements would significantly enhance residents' quality of life and encourage greater community engagement with existing facilities.`
    },
    // ── Review ──
    {
      id: 'p2_review_01',
      level: 'B2',
      type: 'review',
      icon: '⭐',
      title: 'Film Review',
      stimulus: `A popular entertainment website has invited readers to submit reviews of recent films they have watched. The best reviews will be published on the site.`,
      prompt: `Write a **review** of a film you have watched recently.\n\nIn your review you should:\n- describe briefly what the film is about (without spoiling the ending)\n- discuss what you found most impressive or disappointing\n- recommend whether other people should watch it and why\n\nWrite your answer in **140–190 words**.`,
      wordMin: 140, wordMax: 190,
      planningPrompts: [
        '📌 Opening: Film title, director, genre. Hook the reader with your overall impression.',
        '📌 Para 1: Brief plot summary — setup and main conflict only. No spoilers.',
        '📌 Para 2: Highlights — acting, direction, visuals, soundtrack? Be specific.',
        '📌 Para 3: Weaknesses — pacing, plot holes, underdeveloped characters?',
        '✅ Recommendation: Who should watch this? Why? Star rating optional.'
      ],
      rubric: [
        { criterion: 'Content', desc: 'Plot summary, evaluation, and clear recommendation all present' },
        { criterion: 'Communicative Achievement', desc: 'Engaging review style; entertaining and informative; appropriate for general web audience' },
        { criterion: 'Organisation', desc: 'Effective introduction and conclusion; balanced structure of praise and criticism' },
        { criterion: 'Language', desc: 'B2 range; descriptive adjectives and evaluative language used well' }
      ],
      model: `**Review: "Past Lives" (dir. Celine Song, 2023)**

"Past Lives" is a quiet, devastating film about love, choice, and the paths not taken. When two childhood sweethearts in Seoul are separated by emigration, they reconnect online years later as adults — only to meet again in New York, where one has built a new life. The film asks a simple but profound question: what do we owe to the people we might have become?

What is most remarkable is the restraint of the filmmaking. There are no dramatic confrontations or manipulative music cues — just long, honest conversations and sideways glances that say everything. The performances from Greta Lee and Teo Yoo are extraordinary in their naturalism.

If there is a weakness, it is that the film's slow pace will test impatient viewers. This is very deliberately a quiet film, not an eventful one.

For anyone willing to sit with difficult feelings, "Past Lives" is one of the most emotionally intelligent films in recent memory. Absolutely recommended. ★★★★½`
    },
    // ── Article ──
    {
      id: 'p2_article_01',
      level: 'B2',
      type: 'article',
      icon: '📰',
      title: 'Article: The Benefits of Learning a New Skill',
      stimulus: `An international student magazine has asked readers to submit articles about a skill they have recently learned and what they gained from the experience.`,
      prompt: `Write an **article** for the magazine.\n\nIn your article you should:\n- describe a skill you have learned (or are learning)\n- explain what challenges you encountered\n- reflect on what the experience has taught you beyond the skill itself\n\nWrite your answer in **140–190 words**.`,
      wordMin: 140, wordMax: 190,
      planningPrompts: [
        '📌 Headline: Engaging title that captures your theme.',
        '📌 Opening: Hook with an interesting question or observation. Introduce the skill.',
        '📌 Para 1: What is the skill? Why did you decide to learn it?',
        '📌 Para 2: The challenges — what was harder than expected?',
        '📌 Para 3: Deeper lessons — patience, resilience, humility, self-discovery?',
        '✅ Closing: Broader message — encourage readers. End memorably.'
      ],
      rubric: [
        { criterion: 'Content', desc: 'All three points addressed; personal and reflective tone' },
        { criterion: 'Communicative Achievement', desc: 'Engaging magazine article style; vivid and readable; appropriate for student readers' },
        { criterion: 'Organisation', desc: 'Compelling opening; coherent narrative arc; memorable conclusion' },
        { criterion: 'Language', desc: 'B2 vocabulary including idiomatic expressions; varied sentence structures' }
      ],
      model: `**What Learning to Cook Taught Me About Failure**

Have you ever burned the same dish four times in a single week? Last year, that was my experience learning to cook from scratch — and it turned out to be one of the most important lessons of my adult life.

I started cooking out of necessity. Moving to a new city with a limited budget left me with one option: learn or eat instant noodles indefinitely. I began with simple recipes, following instructions precisely. The results were inconsistent at best and inedible at worst.

The challenge I hadn't expected was learning to improvise. Cooking, I discovered, demands instinct developed through repeated failure — and I was terrible at accepting that. Every burned onion felt like a personal inadequacy.

But gradually, something shifted. I stopped measuring the success of an evening by the quality of the meal. The process — the smell of garlic, the rhythm of chopping — became the point.

Learning to cook taught me that competence is built from small, unglamorous failures. It was the most useful lesson I didn't know I needed.`
    },
    // ── Story ──
    {
      id: 'p2_story_01',
      level: 'B2',
      type: 'story',
      icon: '📖',
      title: 'Short Story: The Unexpected Guest',
      stimulus: `Your college magazine is running a creative writing competition. Stories must begin with a provided sentence.`,
      prompt: `Write a **short story** beginning with the following sentence:\n\n*"The knock at the door came at exactly midnight, and nobody had been expected."*\n\nWrite your answer in **140–190 words**.`,
      wordMin: 140, wordMax: 190,
      planningPrompts: [
        '📌 Opening: Use the given sentence exactly. Set the scene — where, when, atmosphere.',
        '📌 Rising action: Who answers? What do they find? Build tension or mystery.',
        '📌 Complication: Something unexpected — the guest is not who they appear, or brings news.',
        '📌 Climax: The key moment of revelation or decision.',
        '✅ Resolution: End with a twist, a question, or a satisfying closure. Leave the reader thinking.'
      ],
      rubric: [
        { criterion: 'Content', desc: 'Story begins with given sentence; engaging narrative with clear arc' },
        { criterion: 'Communicative Achievement', desc: 'Appropriate narrative tone; engages reader with atmosphere and tension' },
        { criterion: 'Organisation', desc: 'Clear story structure; effective use of paragraphing to control pace' },
        { criterion: 'Language', desc: 'Descriptive and narrative vocabulary; varied tenses and sentence lengths; vivid details' }
      ],
      model: `The knock at the door came at exactly midnight, and nobody had been expected.

Clara set down her book, heart quickening. Through the frosted glass panel, a silhouette stood motionless. She nearly reached for her phone before recognising, absurdly, something familiar in the figure's posture.

She opened the door.

Her brother stood on the step, drenched, backpack hanging from one shoulder. He had been living in New Zealand for three years. They had not spoken in eleven months.

"Hello," he said, as though he had merely been out for the evening.

Clara opened her mouth, closed it, and stepped aside.

He came in, dripping quietly onto the hallway tiles, and looked around as though checking whether anything had changed. Much had. He had missed their mother's illness, a house move, a broken engagement — a whole chapter of life he had exited without explanation.

"I've been thinking," he said finally.

"That makes two of us," she replied, and went to put the kettle on.`
    }
  ];

  // ── Public API ─────────────────────────────────────────────────────────
  return {
    getPart1Essays: () => part1Essays,
    getPart1ByLevel: (level) => part1Essays.filter(e => e.level === level),
    getPart1ById: (id) => part1Essays.find(e => e.id === id),
    getPart2Tasks: () => part2Tasks,
    getPart2ByType: (type) => part2Tasks.filter(t => t.type === type),
    getPart2ById: (id) => part2Tasks.find(t => t.id === id),
    part2Types: ['letter', 'report', 'review', 'article', 'story']
  };

})();
