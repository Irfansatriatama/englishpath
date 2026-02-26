/**
 * EnglishPath — Cambridge Reading & Use of English Data
 * Fase 16b: Practice Reading & Use of English
 * Parts 1–7: cloze, open cloze, word formation, key word transformation, + reading
 * localStorage: ep_user_{id}_cambridge_reading
 */

const CambridgeReadingData = (() => {

  // ─── PART 1: Multiple-Choice Cloze ────────────────────────────────────────
  const part1Sets = [
    {
      id: 'p1_s1',
      title: 'The Power of Habit',
      level: 'B2/C1',
      text: `Habits are the invisible architecture of daily life. Scientists estimate that about 40% of our actions are not actual decisions but habits. A habit is formed when the brain __(1)__ a sequence of actions into an automatic routine, a process called "chunking." The brain __(2)__ this because it is constantly looking for ways to save effort. When a habit emerges, the brain stops fully __(3)__ in decision-making, so unless you deliberately fight a habit, the pattern will unfold __(4)__ automatically. This is advantageous, as it frees up cognitive capacity for other tasks. However, it also means that when we are in stress or under pressure, __(5)__ habits tend to resurface even if we have been trying to __(6)__ them for years.`,
      gaps: [
        { num: 1, options: ['turns', 'converts', 'transforms', 'changes'], answer: 0, explanation: '"Turn a sequence into" is the natural collocation here.' },
        { num: 2, options: ['does', 'makes', 'performs', 'conducts'], answer: 0, explanation: '"Does this" — refers back to the chunking process.' },
        { num: 3, options: ['participating', 'engaging', 'involving', 'entering'], answer: 1, explanation: '"Engaging in decision-making" is the correct collocation.' },
        { num: 4, options: ['utterly', 'wholly', 'entirely', 'almost'], answer: 3, explanation: '"Almost automatically" is most natural here given the nuance.' },
        { num: 5, options: ['old', 'former', 'ancient', 'prior'], answer: 0, explanation: '"Old habits" is the standard idiomatic phrase.' },
        { num: 6, options: ['break', 'remove', 'end', 'stop'], answer: 0, explanation: '"Break a habit" is the fixed collocation.' }
      ]
    },
    {
      id: 'p1_s2',
      title: 'Urban Green Spaces',
      level: 'B2/C1',
      text: `City planners have long __(1)__ the value of parks and green spaces. Research now __(2)__ what many residents have always known intuitively: access to nature in cities has measurable health benefits. Studies __(3)__ that people living near parks report lower levels of anxiety and depression. The mechanisms behind this are only partially understood. One theory holds that natural environments __(4)__ the nervous system, reducing cortisol levels. Another __(5)__ that green spaces simply provide opportunities for physical activity and social interaction, both of which __(6)__ to improved mental health outcomes.`,
      gaps: [
        { num: 1, options: ['acknowledged', 'recognised', 'accepted', 'admitted'], answer: 1, explanation: '"Recognised the value" is the most natural collocation for planners.' },
        { num: 2, options: ['confirms', 'proves', 'supports', 'verifies'], answer: 2, explanation: '"Research supports what people have known" — "supports" is standard academic register.' },
        { num: 3, options: ['show', 'indicate', 'point', 'demonstrate'], answer: 1, explanation: '"Studies indicate" is a standard academic phrase.' },
        { num: 4, options: ['calms', 'soothes', 'restores', 'relaxes'], answer: 2, explanation: '"Restores the nervous system" is the technically correct term in stress-recovery theory.' },
        { num: 5, options: ['suggests', 'argues', 'proposes', 'states'], answer: 1, explanation: '"Another argues" — presenting a competing theory uses "argue" in academic writing.' },
        { num: 6, options: ['contribute', 'lead', 'result', 'bring'], answer: 0, explanation: '"Contribute to" is the correct prepositional collocation.' }
      ]
    }
  ];

  // ─── PART 2: Open Cloze ───────────────────────────────────────────────────
  const part2Sets = [
    {
      id: 'p2_s1',
      title: 'The Science of Sleep',
      level: 'B2/C1',
      text: `Sleep is far __(1)__ a passive state. __(2)__ we sleep, the brain cycles through different stages, each serving a distinct function. During slow-wave sleep, memories are consolidated — the brain replays experiences from the day and transfers them __(3)__ long-term storage. REM sleep, __(4)__ the other hand, is associated with emotional processing and creativity. There is growing evidence __(5)__ inadequate sleep is linked not just to fatigue but to a wide range of chronic health conditions, __(6)__ heart disease and type 2 diabetes. Despite this, many people still regard sleep __(7)__ a luxury rather than a biological necessity.`,
      gaps: [
        { num: 1, answer: 'from', explanation: '"Far from a passive state" — "far from" means not at all.' },
        { num: 2, answer: 'While', explanation: '"While we sleep" — concurrent action.' },
        { num: 3, answer: 'into', explanation: '"Transfer into long-term storage" — fixed phrasal verb.' },
        { num: 4, answer: 'on', explanation: '"On the other hand" — fixed discourse marker.' },
        { num: 5, answer: 'that', explanation: '"Evidence that" — "that" introduces a noun clause.' },
        { num: 6, answer: 'including', explanation: '"Including heart disease" — listing examples.' },
        { num: 7, answer: 'as', explanation: '"Regard sleep as a luxury" — "regard as" is the fixed structure.' }
      ]
    },
    {
      id: 'p2_s2',
      title: 'Digital Literacy',
      level: 'B2/C1',
      text: `The ability to navigate digital environments critically has become __(1)__ essential as reading and writing. Yet many educational systems have been slow to __(2)__ this shift into their curricula. Digital literacy goes __(3)__ knowing how to use software; it involves evaluating sources, recognising misinformation, and understanding __(4)__ personal data is used online. Studies suggest that teenagers, __(5)__ assumed to be "digital natives," often lack the skills to distinguish reliable information __(6)__ unreliable content. Addressing this gap requires a coordinated effort __(7)__ schools, technology companies, and governments.`,
      gaps: [
        { num: 1, answer: 'as', explanation: '"As essential as" — comparative structure "as ... as".' },
        { num: 2, answer: 'integrate', explanation: '"Integrate this shift into curricula" — appropriate verb.' },
        { num: 3, answer: 'beyond', explanation: '"Goes beyond knowing" — to mean more than.' },
        { num: 4, answer: 'how', explanation: '"Understanding how personal data is used" — embedded question.' },
        { num: 5, answer: 'often', explanation: '"Often assumed to be" — frequency adverb fits.' },
        { num: 6, answer: 'from', explanation: '"Distinguish X from Y" — fixed structure.' },
        { num: 7, answer: 'among', explanation: '"Among schools, companies, and governments" — involving multiple parties.' }
      ]
    }
  ];

  // ─── PART 3: Word Formation ────────────────────────────────────────────────
  const part3Sets = [
    {
      id: 'p3_s1',
      title: 'The Future of Work',
      level: 'B2/C1',
      text: `Automation is bringing __(1)FUNDAMENTAL__ changes to the labour market. Many jobs that once required human __(2)JUDGE__ are now being performed by algorithms with considerable __(3)ACCURATE__. This has sparked __(4)CONSIDER__ debate about the future of employment. Some economists remain __(5)OPTIMISM__ about humanity's ability to adapt, pointing to historical examples of __(6)TECHNOLOGY__ disruption that ultimately created more jobs than they destroyed. Others are less __(7)CONVINCE__, arguing that the pace of current change is __(8)PRECEDENT__.`,
      gaps: [
        { num: 1, base: 'FUNDAMENTAL', answer: 'fundamental', explanation: 'Adjective modifying "changes".' },
        { num: 2, base: 'JUDGE', answer: 'judgement', explanation: 'Noun: "human judgement" — the quality of judging.' },
        { num: 3, base: 'ACCURATE', answer: 'accuracy', explanation: 'Noun: "with considerable accuracy".' },
        { num: 4, base: 'CONSIDER', answer: 'considerable', explanation: 'Adjective modifying "debate".' },
        { num: 5, base: 'OPTIMISM', answer: 'optimistic', explanation: 'Adjective: "remain optimistic about".' },
        { num: 6, base: 'TECHNOLOGY', answer: 'technological', explanation: 'Adjective modifying "disruption".' },
        { num: 7, base: 'CONVINCE', answer: 'convinced', explanation: 'Past participle as adjective: "less convinced".' },
        { num: 8, base: 'PRECEDENT', answer: 'unprecedented', explanation: 'Adjective: "un-" prefix + "-ed" suffix.' }
      ]
    },
    {
      id: 'p3_s2',
      title: 'Ocean Conservation',
      level: 'B2/C1',
      text: `The world's oceans are under __(1)INCREASE__ threat from multiple sources. Plastic __(2)POLLUTE__ has reached alarming levels, with microplastics now found in the __(3)DEEP__ parts of the ocean. The __(4)DESTROY__ of coral reefs is another grave concern; these ecosystems, despite covering less than 1% of the ocean floor, support an __(5)ESTIMATE__ quarter of all marine species. Climate change is further __(6)COMPOUND__ these problems through ocean acidification and rising water temperatures. Despite growing __(7)AWARE__ of these issues, meaningful international __(8)COOPERATE__ remains elusive.`,
      gaps: [
        { num: 1, base: 'INCREASE', answer: 'increasing', explanation: 'Adjective/participle modifying "threat".' },
        { num: 2, base: 'POLLUTE', answer: 'pollution', explanation: 'Noun: "plastic pollution".' },
        { num: 3, base: 'DEEP', answer: 'deepest', explanation: 'Superlative adjective.' },
        { num: 4, base: 'DESTROY', answer: 'destruction', explanation: 'Noun: "the destruction of".' },
        { num: 5, base: 'ESTIMATE', answer: 'estimated', explanation: 'Past participle as adjective: "an estimated quarter".' },
        { num: 6, base: 'COMPOUND', answer: 'compounding', explanation: 'Present participle in continuous aspect.' },
        { num: 7, base: 'AWARE', answer: 'awareness', explanation: 'Noun: "growing awareness".' },
        { num: 8, base: 'COOPERATE', answer: 'cooperation', explanation: 'Noun: "international cooperation".' }
      ]
    }
  ];

  // ─── PART 4: Key Word Transformation ──────────────────────────────────────
  const part4Sets = [
    {
      id: 'p4_s1',
      title: 'Key Word Transformations — Set A',
      level: 'B2/C1',
      items: [
        {
          id: 'kwt1',
          original: 'She started learning French five years ago.',
          keyword: 'FOR',
          answer: 'She has been learning French for five years.',
          explanation: 'Present perfect continuous + "for" to describe ongoing duration.'
        },
        {
          id: 'kwt2',
          original: 'It is not necessary for you to submit the form today.',
          keyword: 'HAVE',
          answer: "You don't have to submit the form today.",
          explanation: '"Don\'t have to" = absence of obligation (equivalent to "not necessary").'
        },
        {
          id: 'kwt3',
          original: 'The manager told the team to finish the report by Friday.',
          keyword: 'ASKED',
          answer: 'The manager asked the team to finish the report by Friday.',
          explanation: '"Asked ... to do" = indirect speech with "ask + object + infinitive".'
        },
        {
          id: 'kwt4',
          original: 'Despite being tired, she finished all the tasks.',
          keyword: 'ALTHOUGH',
          answer: 'Although she was tired, she finished all the tasks.',
          explanation: '"Although + subject + verb" replaces "Despite + gerund".'
        },
        {
          id: 'kwt5',
          original: 'They said the meeting would be cancelled if it rained.',
          keyword: 'WOULD',
          answer: 'They said the meeting would be cancelled if it rained.',
          explanation: 'Second conditional reported speech — "would be cancelled" (passive).'
        },
        {
          id: 'kwt6',
          original: 'I regret not taking that opportunity when I had it.',
          keyword: 'WISH',
          answer: 'I wish I had taken that opportunity when I had it.',
          explanation: '"Wish + past perfect" to express regret about past.'
        }
      ]
    },
    {
      id: 'p4_s2',
      title: 'Key Word Transformations — Set B',
      level: 'C1',
      items: [
        {
          id: 'kwt7',
          original: 'There is no need for you to apologise.',
          keyword: 'NECESSARY',
          answer: 'It is not necessary for you to apologise.',
          explanation: '"It is not necessary for + object + infinitive".'
        },
        {
          id: 'kwt8',
          original: 'The project was so complex that nobody could complete it on time.',
          keyword: 'TOO',
          answer: 'The project was too complex for anybody to complete on time.',
          explanation: '"Too + adjective + for + object + infinitive".'
        },
        {
          id: 'kwt9',
          original: 'She had never experienced such kindness before.',
          keyword: 'FIRST',
          answer: 'It was the first time she had experienced such kindness.',
          explanation: '"It was the first time + past perfect".'
        },
        {
          id: 'kwt10',
          original: 'The new policy resulted in a reduction in waste.',
          keyword: 'LED',
          answer: 'The new policy led to a reduction in waste.',
          explanation: '"Lead to" = cause / result in.'
        },
        {
          id: 'kwt11',
          original: 'You should take the earlier train to avoid missing your connection.',
          keyword: 'RISK',
          answer: 'You should take the earlier train to avoid risking missing your connection.',
          explanation: '"Risk + gerund" expresses the possibility of an unwanted outcome.'
        },
        {
          id: 'kwt12',
          original: 'They expected him to arrive by noon.',
          keyword: 'SUPPOSED',
          answer: 'He was supposed to arrive by noon.',
          explanation: '"Be supposed to" = expected to / required to.'
        }
      ]
    }
  ];

  // ─── PART 5–7: Reading Comprehension ─────────────────────────────────────
  const readingPassages = [
    {
      id: 'rp1',
      part: 5,
      type: 'multiple_choice',
      title: 'The Rediscovery of Slow Travel',
      level: 'B2/C1',
      icon: '🚂',
      estimatedTime: 18,
      passage: `<p>In an era defined by the cult of efficiency, a growing number of travellers are deliberately choosing to slow down. The slow travel movement — part philosophical stance, part practical approach — encourages journeys that prioritise depth over breadth, experience over destination. Rather than flying between cities and ticking off attractions, adherents spend weeks or months in a single location, shopping at local markets, learning fragments of the language, and forming connections with residents that fleeting visits rarely allow.</p>

<p>The irony is that slow travel, far from being a new phenomenon, represents a return. Before mass aviation collapsed distances in the mid-twentieth century, extended land and sea journeys were simply the reality for most travellers. Grand Tours lasting months were considered essential to the education of young European aristocrats. What has changed is not the desire for meaningful travel but the expectation that it can and should be rapid — an expectation that slow travel advocates are pushing back against with considerable conviction.</p>

<p>Critics of the movement argue that it is an indulgence available only to the privileged: those with flexible employment, generous savings, or no obligations that anchor them to a fixed location. There is merit in this critique. The freedom to spend six weeks in Lisbon or three months in Oaxaca is not equally distributed. Yet proponents counter that slow travel can be practised at any scale: choosing a train over a plane for a weekend trip, staying in a neighbourhood rather than a tourist district, or substituting a single extended domestic break for several short international ones all embody its principles without requiring extraordinary resources.</p>

<p>The environmental dimension adds complexity. Slow travel is often framed as more sustainable: spending longer in fewer places reduces the frequency of flights, which are disproportionately carbon-intensive relative to other forms of transport. Yet this calculus is not straightforward. A traveller who flies once to a destination and stays for a month may generate fewer emissions than one who takes multiple short-haul trips by train across the continent, depending on the routes, distances, and accommodation choices involved.</p>

<p>What seems beyond dispute is that slow travel tends to produce different — and for many, more satisfying — experiences than its hurried counterpart. Neurologically, this may have an explanation: the brain consolidates memories more effectively when experiences are spaced out and varied. A month in one city, with its gradual accumulation of small discoveries — the baker who remembers your order, the shortcut through an unmarked alley, the festival that nobody warned you about — tends to leave a deeper imprint than two weeks covering five capital cities.</p>`,
      questions: [
        {
          id: 'rp1_q1',
          question: 'The writer suggests that slow travel is "ironic" (paragraph 2) because:',
          choices: [
            'it requires more money than conventional travel',
            'it represents a revival rather than an innovation',
            'it contradicts the environmental values of its advocates',
            'it is more popular among younger travellers than older ones'
          ],
          answer: 1,
          explanation: 'The irony is that slow travel looks like a new trend but is actually a return to how travel used to be before mass aviation.'
        },
        {
          id: 'rp1_q2',
          question: 'How does the writer respond to the criticism that slow travel is elitist?',
          choices: [
            'By dismissing it as irrelevant to most travellers',
            'By acknowledging it but arguing slow travel can be practised modestly',
            'By claiming that slow travel is actually cheaper than conventional travel',
            'By suggesting that the criticism misunderstands the movement\'s goals'
          ],
          answer: 1,
          explanation: 'The writer says "There is merit in this critique" but then explains how slow principles can be applied at any budget level.'
        },
        {
          id: 'rp1_q3',
          question: 'What point does the writer make about slow travel and carbon emissions in paragraph 4?',
          choices: [
            'Slow travel always produces lower emissions than conventional travel',
            'The environmental benefits of slow travel are difficult to calculate simply',
            'Train travel is always more environmentally friendly than flying',
            'Multiple short trips are never preferable to one long journey'
          ],
          answer: 1,
          explanation: 'The paragraph says "this calculus is not straightforward" — the environmental picture is more nuanced than often assumed.'
        },
        {
          id: 'rp1_q4',
          question: 'In the final paragraph, the writer uses neurological research to support which idea?',
          choices: [
            'That slow travel reduces stress levels significantly',
            'That spending time in one place creates stronger memories',
            'That rapid travel is harmful to cognitive function',
            'That travellers should spend at least a month in each destination'
          ],
          answer: 1,
          explanation: 'The brain consolidates memories better when experiences are spaced out — this supports the idea that slow travel creates deeper impressions.'
        }
      ]
    },
    {
      id: 'rp2',
      part: 6,
      type: 'gapped_text',
      title: 'How Colour Shapes Perception',
      level: 'C1',
      icon: '🎨',
      estimatedTime: 18,
      passage_intro: `The following article has six paragraphs from which four have been removed. Choose from paragraphs A–F the one which fits each gap (1–4). There are two extra paragraphs you do not need to use.`,
      passage: [
        { id: 'pp1', text: `Colour is rarely just decorative. From the deliberate palette choices of architects and interior designers to the carefully calibrated hues of food packaging, colour profoundly influences how we perceive and interact with the world around us. Researchers in environmental psychology have spent decades documenting these effects, with findings that are by turns illuminating and counterintuitive.` },
        { id: 'pp2', text: `[GAP 1]` },
        { id: 'pp3', text: `Yet the relationship between colour and cognition is far from universal. Cultural associations play a significant role: white, which signals purity and cleanliness in many Western contexts, is associated with mourning in parts of Asia. Red, which in China evokes good fortune and celebration, carries connotations of danger or stop in many other cultural settings. Any business expanding globally ignores these variations at considerable peril.` },
        { id: 'pp4', text: `[GAP 2]` },
        { id: 'pp5', text: `The influence of colour extends to appetite and taste perception. Research conducted in dining environments has shown that people eat more slowly in rooms painted in cool blues and purples, while warm reds and oranges accelerate eating pace. Fast-food chains, unsurprisingly, have long exploited this knowledge; the prevalence of red and yellow in their branding is rarely coincidental.` },
        { id: 'pp6', text: `[GAP 3]` },
        { id: 'pp7', text: `Critics of colour psychology research note that many foundational studies suffer from small sample sizes and poor replication rates — weaknesses that have become increasingly prominent as the broader "replication crisis" in psychology has come to light. This has led some researchers to advocate for a more cautious interpretation of findings, particularly those with obvious commercial applications.` },
        { id: 'pp8', text: `[GAP 4]` },
        { id: 'pp9', text: `Whatever the final scientific verdict, the practical application of colour knowledge continues apace. Hospital designers specify calming greens and blues for wards. School architects debate whether bright primaries or muted tones better support concentration. And marketing departments the world over remain convinced — rightly or otherwise — that the colour on a label is as important as the product within.` }
      ],
      removed_paragraphs: [
        { id: 'A', text: `The workplace has been another productive area of investigation. Studies have suggested that blue-toned office environments enhance creative output, while red ones may improve performance on detail-oriented tasks requiring accuracy. The mechanisms proposed include associations between colour and physiological arousal levels.` },
        { id: 'B', text: `These methodological concerns are not unfounded, but they should be placed in context. Colour effects on behaviour, even if more modest than early enthusiasts claimed, are real enough to have practical significance when applied across large populations.` },
        { id: 'C', text: `Consider the longstanding belief in "drunk tank pink," a specific shade of bubble-gum pink that was widely adopted by prison authorities after researcher Alexander Schauss claimed in the 1970s that it induced calm and reduced aggression. Subsequent studies have failed to confirm these effects reliably, raising questions about whether the initial enthusiasm was warranted.` },
        { id: 'D', text: `The most robust findings concern the relationship between colour and emotion. Blue is consistently associated with calm and competence across multiple cultures; green evokes associations with nature, health, and sustainability; yellow provokes attention and can elevate mood. These associations form the bedrock of much contemporary brand identity work.` },
        { id: 'E', text: `Colour therapy, or chromotherapy, extends these ideas into medical and therapeutic contexts. Practitioners claim that exposure to specific wavelengths of coloured light can treat a range of conditions from depression to chronic pain. These claims remain highly contested within mainstream medicine.` },
        { id: 'F', text: `Language provides an interesting window onto colour perception. Linguistic relativity research has demonstrated that speakers of languages with separate words for light blue and dark blue — such as Russian — can distinguish between these shades more rapidly than speakers of languages that use a single term, suggesting that naming shapes perception itself.` }
      ],
      answers: { 1: 'D', 2: 'A', 3: 'C', 4: 'B' },
      explanation: 'Gap 1 follows the intro (needs specific effects) → D (emotion associations). Gap 2 follows cultural differences → A (workplace studies, another domain). Gap 3 follows appetite research → C (pink prison study, questioning results). Gap 4 before the final paragraph → B (putting criticisms in context).'
    },
    {
      id: 'rp3',
      part: 7,
      type: 'multiple_matching',
      title: 'Voices on Remote Work',
      level: 'B2/C1',
      icon: '💼',
      estimatedTime: 18,
      intro: `You are going to read four short texts about remote work. For questions 1–10, choose from the texts (A–D). The texts may be chosen more than once.`,
      texts: [
        {
          id: 'A',
          author: 'Priya, 34 — Software Engineer',
          text: `Remote work transformed my relationship with my career. I used to spend two hours a day commuting — time I now spend exercising and cooking proper meals. My productivity has genuinely improved: I design my deep work hours around my own cognitive rhythms rather than fitting them into an open-plan office where interruptions were constant. The company has noticed. My output has measurably increased. That said, I have had to be intentional about maintaining social connections. Video calls cannot fully replicate the informal bonding of office life, and I sometimes miss the spontaneous conversations that led to unexpected creative breakthroughs. The solution I found was scheduling regular calls with colleagues that had no agenda — just time to talk.`
        },
        {
          id: 'B',
          author: 'Marcus, 41 — Marketing Director',
          text: `I manage a team of twelve across three time zones, and remote work has forced me to become a more deliberate and thoughtful manager. When everyone was in the office, I could sense the mood, have an impromptu conversation, or notice if someone seemed disengaged. Remotely, these informal signals vanish. I have had to replace them with structured check-ins, written communication norms, and more explicit feedback cycles. In some respects, this has made me better at my job — clarity that I once left to intuition is now explicit and documented. But I won't pretend the transition has been without cost. Junior team members, particularly those early in their careers, have less access to the informal mentoring and modelling that physical proximity makes possible.`
        },
        {
          id: 'C',
          author: 'Yuki, 28 — Junior Analyst',
          text: `I started this job remotely and have mixed feelings. The flexibility is real — I no longer have to plan my personal life around an inflexible commute. But I have learned considerably less quickly than I would have in an office. So much of professional development happens through osmosis: overhearing experienced colleagues deal with difficult situations, reading the room in a client meeting, absorbing institutional knowledge without it being formally taught. These channels are largely unavailable to me. I feel my learning curve has been flattened, and I worry about what I am missing without knowing exactly what I am missing. My managers are supportive, but support by video call is qualitatively different from the kind of mentorship I'd imagined when I joined.`
        },
        {
          id: 'D',
          author: 'Elena, 52 — HR Manager',
          text: `From an organisational perspective, remote work has exposed the weaknesses in how many companies managed performance when everyone was co-located. We often equated presence with productivity — the person who arrived first and left last was implicitly valued, regardless of output. Remote work forces a reckoning: you have to measure what people actually produce. This is uncomfortable for organisations accustomed to managing by visibility, but it is ultimately healthier. Where I am concerned is culture. Culture is not built through mission statements and town halls; it is built through accumulated small interactions, shared humour, navigating disagreements in real time. Preserving that culture remotely requires extraordinary intentionality and, frankly, more resources than most companies are willing to dedicate.`
        }
      ],
      questions: [
        { id: 'mm1', question: 'Who mentions that remote work improved a previously inefficient management approach?', answers: ['D'], explanation: 'Elena says remote work "forces a reckoning" and is "ultimately healthier" than presence-based management.' },
        { id: 'mm2', question: 'Who describes finding a practical solution to a social challenge of remote work?', answers: ['A'], explanation: 'Priya describes scheduling agenda-free calls to maintain social connections.' },
        { id: 'mm3', question: 'Who expresses concern about the professional development of less experienced employees?', answers: ['B', 'C'], explanation: 'Marcus mentions junior team members losing informal mentoring; Yuki (a junior employee) feels her learning has been "flattened".' },
        { id: 'mm4', question: 'Who suggests that remote work has resulted in more explicit professional communication?', answers: ['B'], explanation: 'Marcus says he replaced informal signals with "structured check-ins, written communication norms, and more explicit feedback cycles".' },
        { id: 'mm5', question: 'Who notes that the benefits of remote work are dependent on deliberate effort?', answers: ['A', 'D'], explanation: 'Priya says she had "to be intentional" about social connections; Elena says culture preservation "requires extraordinary intentionality".' }
      ]
    }
  ];

  // ─── Public API ────────────────────────────────────────────────────────────
  return {
    getPart1Sets() { return part1Sets; },
    getPart2Sets() { return part2Sets; },
    getPart3Sets() { return part3Sets; },
    getPart4Sets() { return part4Sets; },
    getReadingPassages() { return readingPassages; },
    getAllParts() {
      return [
        { num: 1, label: 'Part 1 — Multiple-Choice Cloze', icon: '🔤', desc: '6 gaps, 4 options each. Choose the correct word or phrase.', count: part1Sets.length },
        { num: 2, label: 'Part 2 — Open Cloze', icon: '✍️', desc: '7–8 gaps. Write the missing word (grammar or vocabulary).', count: part2Sets.length },
        { num: 3, label: 'Part 3 — Word Formation', icon: '🔡', desc: '8 gaps. Form the correct word from the base word given.', count: part3Sets.length },
        { num: 4, label: 'Part 4 — Key Word Transformation', icon: '🔁', desc: '6 sentences. Rewrite using the keyword given.', count: part4Sets.length },
        { num: 5, label: 'Part 5 — Reading: Multiple Choice', icon: '📖', desc: '4 questions. Read a long text and answer multiple choice.', count: readingPassages.filter(p => p.part === 5).length },
        { num: 6, label: 'Part 6 — Reading: Gapped Text', icon: '🧩', desc: '4 gaps. Match removed paragraphs to their correct positions.', count: readingPassages.filter(p => p.part === 6).length },
        { num: 7, label: 'Part 7 — Reading: Multiple Matching', icon: '🗂️', desc: '5–10 questions. Match statements to text sections.', count: readingPassages.filter(p => p.part === 7).length }
      ];
    }
  };

})();
