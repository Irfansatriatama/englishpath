/**
 * EnglishPath — TOEFL iBT Speaking Data
 * Fase 15c-1: Practice Speaking & Writing
 * Task 1: Independent (4 prompts)
 * Task 2: Integrated — Campus Announcement (read + listen → speak)
 * Task 3: Integrated — Academic Concept (read + listen → speak)
 * Task 4: Integrated — Academic Lecture (listen → speak)
 */
const TOEFLSpeakingData = (() => {

  // ── Task 1: Independent Speaking ─────────────────────
  const task1Prompts = [
    {
      id: 't1_01',
      icon: '🏡',
      title: 'Living Alone or With Others',
      prompt: 'Some people prefer to live alone, while others prefer to live with roommates or family members. Which do you prefer, and why? Use specific reasons and examples to support your answer.',
      prepTime: 15,
      speakTime: 45,
      keyPoints: ['Mention your preference clearly', 'Give 2 specific reasons', 'Use personal examples', 'Conclude briefly'],
      model: "I strongly prefer living with roommates, and I have two main reasons for this. First, it's much more economical. When I share an apartment, we split the rent and utilities, which allows me to save money for other priorities like travel or education. Second, and perhaps more importantly, having roommates reduces loneliness. Last year when I was going through a stressful period at work, my roommate would cook dinner and we'd talk through problems together. That social support was invaluable. Of course, privacy can sometimes be an issue, but for me, the financial and emotional benefits of shared living far outweigh that drawback.",
      rubric: [
        { criterion: 'Delivery', desc: 'Clear, natural speech with consistent pace and minimal hesitation' },
        { criterion: 'Language Use', desc: 'Varied vocabulary and grammar with minimal errors' },
        { criterion: 'Topic Development', desc: 'Clear opinion with well-developed reasons and specific examples' }
      ]
    },
    {
      id: 't1_02',
      icon: '📱',
      title: 'Technology in Education',
      prompt: 'Do you think students learn better when they use technology such as tablets and laptops in class, or when they study from traditional textbooks and handwritten notes? Explain your view with specific reasons and examples.',
      prepTime: 15,
      speakTime: 45,
      keyPoints: ['State your position clearly', 'Provide 2 concrete reasons', 'Give a specific example or scenario', 'Brief conclusion'],
      model: "In my opinion, traditional methods — textbooks and handwritten notes — produce better learning outcomes, and I'll explain why. Research consistently shows that handwriting activates deeper cognitive processing than typing. When I take notes by hand, I summarize and rephrase information, which helps me truly understand it rather than just transcribing it. In contrast, using a laptop often leads to verbatim copying without comprehension. Additionally, technology introduces constant distractions — notifications, social media, and browsing — that fragment students' attention. During my own undergraduate studies, my grades actually improved significantly during semesters when I minimised device use. So while technology certainly has its place in education, I believe traditional study methods build more genuine understanding.",
      rubric: [
        { criterion: 'Delivery', desc: 'Clear, natural speech with consistent pace and minimal hesitation' },
        { criterion: 'Language Use', desc: 'Varied vocabulary and grammar with minimal errors' },
        { criterion: 'Topic Development', desc: 'Clear opinion with well-developed reasons and specific examples' }
      ]
    },
    {
      id: 't1_03',
      icon: '🌍',
      title: 'Urban or Rural Living',
      prompt: 'Some people prefer living in large cities because of the opportunities and amenities they offer. Others prefer living in smaller towns or rural areas for a quieter, simpler life. Which would you choose, and why?',
      prepTime: 15,
      speakTime: 45,
      keyPoints: ['Clear preference statement', 'Two main reasons', 'Specific details or examples', 'Acknowledge trade-off briefly'],
      model: "I would choose to live in a large city, primarily because of career opportunities and cultural richness. Cities offer a vastly larger job market. In my field — graphic design — the most innovative studios, agencies, and networking events are concentrated in major urban centres. Without being in a city, my professional growth would be severely limited. Beyond career prospects, cities are intellectually stimulating. Museums, international restaurants, diverse communities, live music — these experiences broaden your perspective in ways that smaller towns simply cannot match. Yes, city living can be expensive and hectic, but I believe the professional and personal growth it enables is absolutely worth those trade-offs. I'd rather live a full, engaged life in a busy city than a comfortable but limited one elsewhere.",
      rubric: [
        { criterion: 'Delivery', desc: 'Clear, natural speech with consistent pace and minimal hesitation' },
        { criterion: 'Language Use', desc: 'Varied vocabulary and grammar with minimal errors' },
        { criterion: 'Topic Development', desc: 'Clear opinion with well-developed reasons and specific examples' }
      ]
    },
    {
      id: 't1_04',
      icon: '👥',
      title: 'Learning from Experience vs. Formal Education',
      prompt: 'Some people believe the most valuable lessons in life come from formal education in schools and universities. Others believe they come from real-life experience. Which view do you agree with more, and why?',
      prepTime: 15,
      speakTime: 45,
      keyPoints: ['Take a clear position', 'Explain your reasoning with 2 points', 'Use a concrete personal or observed example', 'Summarise briefly'],
      model: "I believe real-life experience teaches the most valuable lessons, though I want to acknowledge that formal education plays an important supporting role. Schools provide essential foundational knowledge, but they rarely prepare you for the emotional and practical complexities of real situations. For instance, studying business theory is useful, but the actual experience of running a small project — dealing with unexpected setbacks, managing people, pivoting when things go wrong — teaches skills no textbook can replicate. I learned more about resilience and problem-solving from failing at a startup in my mid-twenties than from four years of university. Formal education gives you a framework; life experience fills it with genuine understanding.",
      rubric: [
        { criterion: 'Delivery', desc: 'Clear, natural speech with consistent pace and minimal hesitation' },
        { criterion: 'Language Use', desc: 'Varied vocabulary and grammar with minimal errors' },
        { criterion: 'Topic Development', desc: 'Clear opinion with well-developed reasons and specific examples' }
      ]
    }
  ];

  // ── Task 2: Integrated — Campus Announcement ─────────
  const task2Items = [
    {
      id: 't2_01',
      icon: '📋',
      title: 'Library Hours Change',
      readingTitle: 'Announcement: Changes to Library Operating Hours',
      readingText: `The university library will implement new operating hours beginning next semester. The library will now open at 8:00 AM instead of the current 7:00 AM, and will close at 10:00 PM on weekdays rather than midnight. On weekends, the library will be closed on Sundays. The administration states that these changes are being made due to budget constraints that require a reduction in staffing costs. Officials note that usage statistics show that visits before 8:00 AM and after 10:00 PM are minimal, and that Sunday usage has declined by over 60% in recent years.`,
      readTime: 45,
      listenScript: [
        { speaker: 'Male Student', text: "Can you believe they're cutting the library hours? This is really going to affect me. I study late on weeknights — sometimes until midnight — because my dorm is too noisy in the evenings." },
        { speaker: 'Female Student', text: "I know, and I'm really worried about Sunday closures too. I use Sundays to do my deep research for the week, when the library is actually quieter. Their usage statistics must not be counting graduate students properly." },
        { speaker: 'Male Student', text: "Exactly. And the budget argument doesn't convince me. Surely they could find other ways to save money — reducing printing services or cutting conference room bookings — rather than restricting student access to academic resources." },
        { speaker: 'Female Student', text: "I agree. The library is supposed to be our primary academic resource. Reducing its availability feels like it undermines the university's commitment to student success." }
      ],
      prompt: 'The woman expresses her opinion about the changes to library hours described in the announcement. State her opinion and explain the reasons she gives for holding that opinion.',
      prepTime: 30,
      speakTime: 60,
      model: "The woman is strongly opposed to the announced changes to library hours. She gives two main reasons for her disagreement. First, she personally relies on Sundays for deep academic research, since the library is quieter on that day — making the Sunday closure particularly harmful for her study routine. She also questions the administration's usage statistics, suggesting that the data fails to accurately reflect graduate student behaviour. Second, she challenges the budget justification, arguing that the university should find other, less impactful ways to reduce costs — such as cutting printing services or conference room bookings — rather than restricting access to what she considers the university's most essential academic resource. Overall, she feels the changes undermine the university's responsibility to support student success.",
      rubric: [
        { criterion: 'Delivery', desc: 'Smooth, intelligible speech with natural pacing' },
        { criterion: 'Language Use', desc: 'Appropriate vocabulary, varied sentence structure' },
        { criterion: 'Topic Development', desc: 'Accurately conveys the speaker\'s opinion and her specific reasons' }
      ]
    },
    {
      id: 't2_02',
      icon: '🏫',
      title: 'New Group Study Policy',
      readingTitle: 'University Policy Update: Group Study Rooms',
      readingText: `Effective immediately, students wishing to use group study rooms in the main campus building must submit a reservation request at least 24 hours in advance through the online booking portal. Walk-in use of group study rooms will no longer be permitted. The administration explains that this policy change is intended to ensure fair and equitable access to study spaces for all students. Data shows that a small number of students monopolised study rooms, often leaving them unoccupied for long periods, which prevented other students from using them. The new system will allow rooms to be reassigned if not checked in within 10 minutes of the reservation start time.`,
      readTime: 45,
      listenScript: [
        { speaker: 'Female Student', text: "I just read about this new study room policy. I think it's actually a pretty sensible change." },
        { speaker: 'Male Student', text: "Really? I'm not so sure. Sometimes I spontaneously need a quiet place to work through a problem with a classmate — planning 24 hours ahead feels really rigid." },
        { speaker: 'Female Student', text: "I understand that, but I think the system addresses a real problem. I've turned up multiple times to find all rooms technically 'booked' but completely empty. That's genuinely frustrating when you need a space urgently." },
        { speaker: 'Male Student', text: "That's fair. And I suppose the 10-minute check-in rule means rooms won't sit empty for long." },
        { speaker: 'Female Student', text: "Exactly. If you don't show up, they release the room. So the policy is actually more flexible than it first appears. I think it will benefit more students overall." }
      ],
      prompt: 'The female student expresses her opinion about the new group study room policy. State her opinion and explain the reasons she gives for holding that opinion.',
      prepTime: 30,
      speakTime: 60,
      model: "The female student supports the new group study room reservation policy. She offers two clear reasons for her positive view. First, she has personally experienced the frustration of arriving at study rooms that were technically reserved but completely empty — wasting her time and preventing her from working. The new system addresses this problem directly. Second, she points out that the policy is less restrictive than it initially seems, because the 10-minute check-in rule means that if a student doesn't arrive promptly, the room is automatically released for others to use. She concludes that, despite the 24-hour advance requirement feeling rigid, the overall system will create fairer access and benefit a greater number of students than the previous walk-in arrangement.",
      rubric: [
        { criterion: 'Delivery', desc: 'Smooth, intelligible speech with natural pacing' },
        { criterion: 'Language Use', desc: 'Appropriate vocabulary, varied sentence structure' },
        { criterion: 'Topic Development', desc: 'Accurately conveys the speaker\'s opinion and her specific reasons' }
      ]
    }
  ];

  // ── Task 3: Integrated — Academic Concept ────────────
  const task3Items = [
    {
      id: 't3_01',
      icon: '🧠',
      title: 'Cognitive Dissonance',
      readingTitle: 'Reading: Cognitive Dissonance',
      readingText: `Cognitive dissonance is a psychological concept introduced by Leon Festinger in 1957. It refers to the mental discomfort experienced by a person who holds two or more contradictory beliefs, values, or ideas simultaneously, or who takes an action that conflicts with their existing beliefs. Because this discomfort is unpleasant, people are strongly motivated to reduce it. They typically do this in one of three ways: by changing one of the conflicting beliefs, by acquiring new information that supports one belief over the other, or by reducing the importance of the conflict in their mind.`,
      readTime: 45,
      listenScript: [
        { speaker: 'Professor', text: "Cognitive dissonance shows up everywhere in everyday life. Let me give you a couple of vivid examples so you can see how it actually operates." },
        { speaker: 'Professor', text: "Consider a smoker who is fully aware that smoking causes serious health problems. That person holds two conflicting cognitions: 'I smoke' and 'smoking is dangerous'. According to Festinger, this creates genuine psychological discomfort." },
        { speaker: 'Professor', text: "Now, how might they reduce that dissonance? They might change their behaviour and quit smoking — that's one route. But more commonly, people don't change the behaviour. Instead, they rationalise it." },
        { speaker: 'Professor', text: "They might say: 'My grandfather smoked his whole life and lived to ninety.' Or: 'I only smoke socially — that doesn't really count.' They're adding new cognitions that make the contradiction feel less severe." },
        { speaker: 'Professor', text: "Another example: a committed environmentalist who takes a long-haul flight for a holiday. She believes in reducing carbon emissions, yet her action contradicts that belief. To reduce the dissonance, she might offset her carbon by donating to an environmental charity, or tell herself the holiday was genuinely necessary for her mental health. Both strategies allow her to reconcile the conflict without fundamentally changing her travel behaviour." }
      ],
      prompt: 'Using the examples from the lecture, explain how they illustrate the concept of cognitive dissonance described in the reading passage.',
      prepTime: 30,
      speakTime: 60,
      model: "The reading introduces cognitive dissonance — the mental discomfort that arises when someone holds contradictory beliefs or acts against their own values. The professor provides two clear examples that illustrate how people experience and resolve this discomfort. The first example involves a smoker who knows smoking is harmful but continues anyway. Rather than quitting — which would eliminate the dissonance — the smoker rationalises the behaviour by telling themselves things like 'My grandfather smoked and lived to ninety.' This is the reading's third strategy: minimising the importance of the conflict by adding supportive cognitions. The second example involves an environmentalist who takes a long-haul flight. She reduces her dissonance not by changing her behaviour but by purchasing carbon offsets or convincing herself the trip was necessary — again, acquiring new information to make the contradiction feel less significant. Both examples show that people typically prefer to justify their behaviour rather than change it.",
      rubric: [
        { criterion: 'Delivery', desc: 'Smooth, intelligible speech with natural pacing' },
        { criterion: 'Language Use', desc: 'Accurate use of academic vocabulary; minimal errors' },
        { criterion: 'Topic Development', desc: 'Accurately connects lecture examples to the reading concept' }
      ]
    },
    {
      id: 't3_02',
      icon: '💰',
      title: 'The Sunk Cost Fallacy',
      readingTitle: 'Reading: The Sunk Cost Fallacy',
      readingText: `In economics and decision theory, a sunk cost is any cost that has already been incurred and cannot be recovered. Rational decision-making theory holds that sunk costs should be ignored when evaluating future courses of action, because they are irrelevant to future outcomes. However, humans frequently exhibit what is known as the sunk cost fallacy: the irrational tendency to continue investing time, money, or effort into a course of action simply because they have already invested in it, even when it is no longer the best choice. This fallacy is driven by a desire to avoid the psychological pain of feeling that previous investments were wasted.`,
      readTime: 45,
      listenScript: [
        { speaker: 'Professor', text: "The sunk cost fallacy is one of the most pervasive cognitive biases we observe in real-world decision making. Let me illustrate with two scenarios." },
        { speaker: 'Professor', text: "Suppose you buy a non-refundable concert ticket for fifty dollars. The day of the concert, you develop a headache and feel genuinely unwell. The rational thing to do is stay home and rest — the fifty dollars is gone regardless of what you decide. But most people will drag themselves to the concert anyway, because they feel compelled to 'get their money's worth'." },
        { speaker: 'Professor', text: "They're making a current decision based on a past, unrecoverable cost. That's the fallacy in action." },
        { speaker: 'Professor', text: "A corporate example is even more striking. A company invests two hundred million dollars developing a new product. Market research eventually reveals that the product is unlikely to succeed. The rational response is to cut losses and cancel the project. But executives often continue pouring money into it, saying 'We've already invested too much to quit now.'" },
        { speaker: 'Professor', text: "In both cases, the past investment has no bearing on whether continuing is the right choice. Yet the emotional weight of prior spending drives irrational persistence. Recognising sunk costs for what they are — irrecoverable — is the first step toward making better decisions." }
      ],
      prompt: 'Using the examples from the lecture, explain how they illustrate the concept of the sunk cost fallacy as described in the reading passage.',
      prepTime: 30,
      speakTime: 60,
      model: "The reading defines the sunk cost fallacy as the tendency to continue investing in a course of action simply because you've already invested in it — even when it's no longer the rational choice. The professor illustrates this with two examples. In the first, a person with a headache still attends a concert they've paid for, even though staying home would be better for their wellbeing. The ticket price is a sunk cost — it's already gone — but the desire to avoid feeling the money was wasted drives a decision that doesn't serve the person's actual interests. The second example involves a company that continues funding a failing product because executives feel they've already committed too much to walk away. Again, the prior investment is irrecoverable, and the reading explains that rational decision theory says it should be ignored — but emotional attachment to past spending overrides logic. Both examples perfectly demonstrate the fallacy: letting unrecoverable past costs dictate present and future choices.",
      rubric: [
        { criterion: 'Delivery', desc: 'Smooth, intelligible speech with natural pacing' },
        { criterion: 'Language Use', desc: 'Accurate use of academic vocabulary; minimal errors' },
        { criterion: 'Topic Development', desc: 'Accurately connects lecture examples to the reading concept' }
      ]
    }
  ];

  // ── Task 4: Integrated — Academic Lecture ────────────
  const task4Items = [
    {
      id: 't4_01',
      icon: '🌊',
      title: 'Mimicry in Nature',
      listenScript: [
        { speaker: 'Professor', text: "Today I want to discuss a fascinating survival strategy in the natural world: mimicry. Mimicry is when one organism evolves to resemble another in appearance, behaviour, or sound, in order to gain a survival advantage." },
        { speaker: 'Professor', text: "There are two main types we'll look at. The first is Batesian mimicry, named after the naturalist Henry Walter Bates. In Batesian mimicry, a harmless species imitates the warning signals of a dangerous or unpalatable species, fooling predators into avoiding it." },
        { speaker: 'Professor', text: "The classic example is the hoverfly. Hoverflies are completely harmless — they don't sting or bite. Yet they have evolved yellow and black striped patterns almost identical to those of bees and wasps. Birds that have had unpleasant encounters with stinging insects avoid hoverflies altogether, even though there's no actual danger." },
        { speaker: 'Professor', text: "The second type is Müllerian mimicry, named after Fritz Müller. Here, multiple species that are ALL genuinely harmful or toxic evolve to look similar to each other. This is actually mutually beneficial — predators only need to learn one warning pattern to avoid all of them." },
        { speaker: 'Professor', text: "A well-known example comes from the Amazon, where several distinct species of poison dart frogs have evolved strikingly similar bright red and black colouring, despite not being closely related. When a predator learns that bright red frogs are toxic, it avoids all red frogs — benefiting every species in the group. So both types serve the same ultimate purpose — protection — but through very different mechanisms." }
      ],
      prompt: 'Using the examples from the lecture, explain the two types of mimicry discussed by the professor.',
      prepTime: 20,
      speakTime: 60,
      model: "The professor describes two types of mimicry as survival strategies in nature. The first is Batesian mimicry, where a harmless species evolves to look like a dangerous one in order to deceive predators. The professor's example is the hoverfly, which has developed yellow and black stripes resembling bees and wasps — insects that sting. Birds that have been stung before avoid hoverflies even though they are completely harmless, because the visual resemblance is so convincing. The second type is Müllerian mimicry, where multiple genuinely dangerous or toxic species converge on a similar appearance, benefiting all of them collectively. The professor's example involves Amazon poison dart frogs — several unrelated species that have all evolved bright red and black colouring. Once predators learn to associate red colouring with toxicity, they avoid all red frogs, so every species in the mimicry group gains protection. In short, Batesian mimicry benefits one harmless impersonator, while Müllerian mimicry creates a shared warning system among multiple harmful species.",
      rubric: [
        { criterion: 'Delivery', desc: 'Smooth, intelligible speech with natural pacing' },
        { criterion: 'Language Use', desc: 'Accurate academic vocabulary; minimal errors' },
        { criterion: 'Topic Development', desc: 'Accurately explains both types with their specific lecture examples' }
      ]
    },
    {
      id: 't4_02',
      icon: '🏙️',
      title: 'The Broken Windows Theory',
      listenScript: [
        { speaker: 'Professor', text: "I want to talk about an influential concept in criminology called the Broken Windows Theory, introduced by James Wilson and George Kelling in 1982." },
        { speaker: 'Professor', text: "The central idea is this: visible signs of disorder and neglect in an environment — like a broken window that goes unrepaired, graffiti, or litter — signal that the community does not care about that space. This sends a message that rule-breaking is tolerated." },
        { speaker: 'Professor', text: "According to the theory, this permissive signal creates a downward spiral. Minor disorder attracts more disorder, which in turn attracts more serious crime. The broken window becomes a symbol that escalates into genuine lawlessness." },
        { speaker: 'Professor', text: "The theory was famously applied in New York City during the 1990s. Transit authorities began aggressively cleaning graffiti from subway trains overnight. Every train that was tagged was cleaned before it ran the next morning. The reasoning was that allowing graffiti to remain would signal acceptance of disorder throughout the transit system." },
        { speaker: 'Professor', text: "Simultaneously, police began cracking down on seemingly trivial violations — fare evasion, public drinking, and so on. Many criminologists credit these policies with contributing to a dramatic decline in New York's crime rate during that period, though others argue that broader social and economic factors were more decisive. Nevertheless, the Broken Windows approach profoundly shaped urban policing strategies worldwide." }
      ],
      prompt: 'Using the information from the lecture, explain the Broken Windows Theory and how it was applied in the example the professor provides.',
      prepTime: 20,
      speakTime: 60,
      model: "The professor explains the Broken Windows Theory, which argues that visible signs of neglect and disorder in an environment — like an unrepaired broken window or graffiti — signal to both residents and would-be offenders that a community tolerates rule-breaking. According to the theory, this creates a cycle: minor disorder invites more disorder, which eventually escalates to more serious criminal behaviour. The professor then describes how this theory was applied in New York City's subway system in the 1990s. Transit authorities began cleaning graffiti from every tagged train before it could run the following morning, ensuring that no visible disorder accumulated. At the same time, police began strictly enforcing minor violations like fare evasion and public drinking. The logic was that maintaining order at the small scale would prevent the escalation to larger crimes. The professor notes that New York's crime rate fell significantly during this period, though there is debate about how much of that decline was directly caused by Broken Windows policing versus broader social and economic changes.",
      rubric: [
        { criterion: 'Delivery', desc: 'Smooth, intelligible speech with natural pacing' },
        { criterion: 'Language Use', desc: 'Accurate academic vocabulary; minimal errors' },
        { criterion: 'Topic Development', desc: 'Accurately explains the theory and the specific application example' }
      ]
    }
  ];

  // ── Public API ─────────────────────────────────────────
  return {
    getTask1Prompts: () => task1Prompts,
    getTask1ById: id => task1Prompts.find(p => p.id === id),
    getTask2Items: () => task2Items,
    getTask2ById: id => task2Items.find(p => p.id === id),
    getTask3Items: () => task3Items,
    getTask3ById: id => task3Items.find(p => p.id === id),
    getTask4Items: () => task4Items,
    getTask4ById: id => task4Items.find(p => p.id === id)
  };

})();
