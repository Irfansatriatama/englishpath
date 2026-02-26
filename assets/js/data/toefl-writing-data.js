/**
 * EnglishPath — TOEFL iBT Writing Data
 * Fase 15c-1: Practice Speaking & Writing
 * Task 1: Integrated Writing (baca passage + dengar lecture → tulis 150–225 kata)
 * Task 2: Academic Discussion (balas post diskusi → 100+ kata)
 */
const TOEFLWritingData = (() => {

  // ── Task 1: Integrated Writing ────────────────────────
  const task1Items = [
    {
      id: 'w1_01',
      icon: '🌿',
      title: 'The Benefits of Urban Green Spaces',
      readingTitle: 'The Case for Urban Green Spaces',
      readingText: `Urban planners and environmental scientists increasingly advocate for the integration of green spaces — parks, gardens, urban forests, and green rooftops — into city design. Proponents argue that these spaces offer significant benefits on multiple levels. First, green spaces have been shown to improve air quality by absorbing carbon dioxide and filtering pollutants, contributing to measurable reductions in respiratory illness among urban populations. Second, access to nature has documented psychological benefits; studies consistently link proximity to parks and green areas with reduced rates of anxiety and depression among city dwellers. Third, green spaces serve an important ecological function by providing habitat and migration corridors for urban wildlife, supporting biodiversity in otherwise heavily built-up environments. Taken together, these advantages make the case for prioritising green space in urban development compelling and well-evidenced.`,
      listenScript: [
        { speaker: 'Professor', text: "While the reading presents a persuasive case for urban green spaces, I think it overstates some of the benefits and glosses over significant practical challenges." },
        { speaker: 'Professor', text: "Take the claim about air quality. It's true that plants absorb carbon dioxide, but the scale of urban green spaces is far too small to meaningfully offset the emissions produced by traffic, industry, and energy consumption in major cities. The effect on air quality is essentially negligible at the city level. Investing in green spaces as an air quality strategy is arguably a distraction from more impactful interventions, like improving public transport or transitioning to renewable energy." },
        { speaker: 'Professor', text: "As for the psychological benefits — yes, access to parks correlates with better mental health outcomes. But correlation is not causation. Wealthier neighbourhoods tend to have more green space AND better mental health outcomes for a host of other reasons: less financial stress, better healthcare access, safer streets. The green space may not be the active ingredient at all." },
        { speaker: 'Professor', text: "Finally, the biodiversity argument is genuinely well-intentioned but quite limited in practice. Small urban parks rarely sustain viable wildlife populations. They may serve as resting spots for birds, but they do little to reverse the broader pressures — habitat loss, pesticide use, climate change — that threaten biodiversity. Calling them meaningful ecological corridors is generous." }
      ],
      listenNote: 'Profesor mempertanyakan tiga klaim utama dalam bacaan tentang manfaat ruang hijau kota.',
      prompt: 'Summarise the points made in the lecture, being sure to explain how they challenge specific claims made in the reading passage.',
      wordMin: 150,
      wordMax: 225,
      timeLimit: 20,
      rubric: {
        0: 'Did not address the task or severely lacking in content',
        1: 'Very limited response; major points missing or largely inaccurate',
        2: 'Some relevant information but important points missing or unclear',
        3: 'Addresses the task; some inaccuracies or omissions; generally clear',
        4: 'Well-organised; accurately conveys key lecture points and their connection to reading',
        5: 'Fully and accurately summarises all major lecture points; clearly explains how each challenges the reading; well-organised with appropriate academic language'
      },
      modelAnswer: `The lecturer challenges three claims from the reading about the benefits of urban green spaces, arguing that each benefit is either overstated or based on flawed reasoning.

First, the reading claims that green spaces improve urban air quality by absorbing pollutants. The professor counters that the scale of urban vegetation is far too small to make a meaningful difference given the volume of emissions from traffic and industry. She suggests that other interventions, such as improving public transport, would be far more effective.

Second, the reading cites studies linking green spaces to better mental health. The lecturer argues that this correlation does not demonstrate causation. Wealthier areas tend to have both more green space and better mental health outcomes, but the actual driver may be reduced financial stress or better healthcare access rather than the green space itself.

Third, the reading argues that urban green spaces support biodiversity by providing ecological corridors. The professor dismisses this as an overstatement, noting that small urban parks rarely sustain viable wildlife populations and do little to address the deeper drivers of biodiversity loss, such as habitat destruction and pesticide use.

In each case, the lecturer concedes some truth to the reading's position while arguing that the evidence is less compelling than presented.`
    },
    {
      id: 'w1_02',
      icon: '🤖',
      title: 'Artificial Intelligence in the Workplace',
      readingTitle: 'The Economic Case for AI Adoption',
      readingText: `The widespread adoption of artificial intelligence in the workplace is frequently presented as an economic and social threat, primarily because of its potential to displace human workers. However, a careful analysis of historical and contemporary evidence suggests a more optimistic picture. First, AI excels at automating repetitive, routine tasks, which in practice frees human workers to focus on higher-value activities requiring creativity, judgement, and interpersonal skills — capabilities that AI systems currently cannot replicate. Second, historical precedent from previous waves of technological change, including industrialisation and computerisation, consistently shows that new technologies create as many — or more — jobs than they eliminate, while raising overall productivity and living standards. Third, AI adoption creates entirely new industries and categories of employment, from machine learning engineering to AI ethics consulting, generating economic activity in sectors that previously did not exist.`,
      listenScript: [
        { speaker: 'Professor', text: "The reading makes an optimistic case for AI in the workplace, but I have some serious reservations about each of those arguments." },
        { speaker: 'Professor', text: "The first claim — that AI frees workers for higher-value tasks — sounds appealing, but it assumes that workers displaced from routine roles automatically have the skills for complex, creative work. That's a huge assumption. In reality, a warehouse worker whose job is automated doesn't suddenly become a UX designer. The transition requires retraining at a massive scale, and there's little evidence that employers or governments are prepared to fund it adequately." },
        { speaker: 'Professor', text: "The historical precedent argument is also problematic. Past technological disruptions — industrialisation, computerisation — did eventually create more jobs overall. But eventually can mean decades. During those transition periods, entire communities suffered severe unemployment and social dislocation. We shouldn't dismiss that suffering by pointing to long-term outcomes. And critically, AI's speed and breadth of impact may be categorically different from anything we've seen before." },
        { speaker: 'Professor', text: "Finally, yes, AI creates new industries. But these tend to employ highly educated specialists — data scientists, engineers. The jobs being eliminated by AI are disproportionately held by lower-skilled workers who are least equipped to enter these new fields. So even if the total number of jobs doesn't decline, there's a serious risk of increasing economic inequality." }
      ],
      listenNote: 'Profesor mempertanyakan ketiga argumen utama dalam bacaan tentang dampak AI di tempat kerja.',
      prompt: 'Summarise the points made in the lecture, being sure to explain how they cast doubt on specific claims made in the reading passage.',
      wordMin: 150,
      wordMax: 225,
      timeLimit: 20,
      rubric: {
        0: 'Did not address the task or severely lacking in content',
        1: 'Very limited response; major points missing or largely inaccurate',
        2: 'Some relevant information but important points missing or unclear',
        3: 'Addresses the task; some inaccuracies or omissions; generally clear',
        4: 'Well-organised; accurately conveys key lecture points and their connection to reading',
        5: 'Fully and accurately summarises all major lecture points; clearly explains how each challenges the reading; well-organised with appropriate academic language'
      },
      modelAnswer: `The lecturer challenges each of the three arguments in the reading about the economic benefits of AI adoption in the workplace.

The reading's first claim is that AI frees workers from routine tasks so they can focus on higher-value activities. The professor questions the assumption underlying this argument: displaced workers do not automatically possess the skills needed for complex, creative roles. A large-scale and well-funded retraining effort would be required, and the professor sees little evidence that this is happening.

Second, the reading argues that historical precedent shows technology creates more jobs than it destroys. The lecturer acknowledges this general pattern but emphasises that the transition periods can last for decades, during which communities experience serious unemployment and hardship. She also suggests that AI's speed and scope may be fundamentally different from earlier technological shifts, making the historical comparison unreliable.

Third, the reading points to new AI-related industries as evidence of job creation. The professor concedes that these industries do exist, but notes that they primarily employ highly educated specialists. Since AI disproportionately eliminates jobs held by lower-skilled workers, the net effect may be a widening of economic inequality rather than shared prosperity.`
    },
    {
      id: 'w1_03',
      icon: '🧬',
      title: 'Genetic Engineering in Agriculture',
      readingTitle: 'Genetically Modified Crops: An Agricultural Solution',
      readingText: `Genetically modified (GM) crops represent one of the most significant advances in modern agriculture. Proponents offer three major arguments in their favour. First, GM crops can be engineered to resist pests, diseases, and herbicides, significantly reducing crop losses and the need for chemical pesticides — resulting in both economic benefits for farmers and environmental advantages from reduced chemical use. Second, genetic modification allows crops to be developed with enhanced nutritional profiles, exemplified by Golden Rice, which produces beta-carotene and has the potential to address vitamin A deficiency affecting hundreds of millions of people in developing countries. Third, GM technology enables the development of crops that are tolerant to drought, salinity, and extreme temperatures, which will be essential for maintaining food security in the face of climate change.`,
      listenScript: [
        { speaker: 'Professor', text: "The reading presents GM crops very favourably, but there are significant counterarguments to each of those claims that deserve serious attention." },
        { speaker: 'Professor', text: "On pest and herbicide resistance: while it's true that some GM crops initially reduce pesticide use, there's a well-documented phenomenon called the 'pesticide treadmill.' Insects and weeds evolve resistance to the very traits engineered into GM crops, which leads farmers to apply more chemicals over time — potentially more than before. The resistance advantage is often temporary." },
        { speaker: 'Professor', text: "Regarding Golden Rice and nutritional enhancement: this has been in development for over two decades and has yet to be widely deployed in the regions it was designed to help. Critics argue that the same nutritional deficiencies could be more efficiently addressed through dietary diversification, food fortification programmes, or distribution of vitamin supplements — approaches that are already proven and scalable." },
        { speaker: 'Professor', text: "And on climate resilience — engineering crops for drought tolerance is genuinely promising, but the development timeline from laboratory to field-ready, approved varieties is typically measured in decades. For the most urgent near-term climate challenges, developing and promoting traditional drought-resistant varieties through selective breeding may be faster and less controversial than waiting for regulatory approval of novel GM crops." }
      ],
      listenNote: 'Profesor menyanggah ketiga argumen utama dalam bacaan tentang manfaat tanaman GM.',
      prompt: 'Summarise the points made in the lecture, being sure to explain how they challenge specific points made in the reading passage.',
      wordMin: 150,
      wordMax: 225,
      timeLimit: 20,
      rubric: {
        0: 'Did not address the task or severely lacking in content',
        1: 'Very limited response; major points missing or largely inaccurate',
        2: 'Some relevant information but important points missing or unclear',
        3: 'Addresses the task; some inaccuracies or omissions; generally clear',
        4: 'Well-organised; accurately conveys key lecture points and their connection to reading',
        5: 'Fully and accurately summarises all major lecture points; clearly explains how each challenges the reading; well-organised with appropriate academic language'
      },
      modelAnswer: `The lecturer disputes all three arguments made in the reading in favour of genetically modified crops.

The reading argues that GM crops engineered for pest and herbicide resistance reduce chemical use and crop losses. The professor counters with the concept of the "pesticide treadmill" — over time, insects and weeds evolve resistance to the engineered traits, leading farmers to apply increasing quantities of chemicals. The initial benefit, she argues, is often short-lived.

Second, the reading cites Golden Rice as an example of GM technology addressing nutritional deficiencies. The professor notes that despite over twenty years of development, Golden Rice has not been successfully deployed at scale. She suggests that alternative approaches — dietary diversification, food fortification, or vitamin supplementation — are already proven and could address the same deficiencies more quickly and efficiently.

Third, the reading claims that climate-resilient GM crops will help ensure food security. The professor agrees this is a promising direction but raises the concern that regulatory approval and field-ready development take decades. For near-term climate challenges, she argues that traditional selective breeding of drought-resistant varieties may be faster and face fewer regulatory and public acceptance barriers.`
    }
  ];

  // ── Task 2: Academic Discussion ───────────────────────
  const task2Items = [
    {
      id: 'w2_01',
      icon: '💼',
      title: 'Remote Work vs. Office Work',
      professorPost: {
        name: 'Dr. Sandra Mitchell',
        avatar: '👩‍🏫',
        subject: 'Organisational Behaviour',
        prompt: "The shift to remote work has fundamentally changed how organisations function. Now that many companies are requiring employees to return to the office, we're seeing significant pushback. For this week's discussion: **Should companies give employees the permanent option to work fully remotely?** Think carefully about the benefits and drawbacks before responding. I want to see you engage with both sides, not just defend a single position."
      },
      studentPosts: [
        {
          name: 'Marcus',
          avatar: '👨‍💻',
          post: "I think employees should definitely have the permanent option to work remotely. The productivity data from the pandemic period was actually quite positive for many industries. People saved hours of commuting time, reported better work-life balance, and companies saved significantly on office space costs. Forcing people back into offices seems like it's driven more by managerial habit and the desire to justify expensive real estate than by genuine evidence that office work is better."
        },
        {
          name: 'Priya',
          avatar: '👩‍🎓',
          post: "I see Marcus's point, but I think we need to be careful about generalising. The productivity research is genuinely mixed — some roles benefited from remote work, others really didn't. I'm thinking particularly about roles that depend heavily on spontaneous collaboration, mentoring junior staff, or building client relationships. There are real things lost when everyone is on a screen. I'd argue for a hybrid model rather than a binary choice."
        }
      ],
      prompt: 'Contribute to the academic discussion. Add your perspective to extend or respond to what your classmates have said.',
      wordMin: 100,
      timeLimit: 10,
      rubric: {
        0: 'Did not address the prompt or incomprehensible',
        1: 'Minimal relevant content; does not engage with classmates',
        2: 'Some relevant ideas but limited development; minimal engagement',
        3: 'Addresses prompt with a clear position; some engagement with classmates\' ideas',
        4: 'Clear position, well-developed reasoning, explicitly engages with classmates\' points',
        5: 'Sophisticated contribution; advances discussion meaningfully; strong engagement with multiple perspectives; precise academic language'
      },
      modelAnswer: `Both Marcus and Priya raise valuable points, and I think the truth lies in recognising that remote work is not a single, uniform experience. Marcus is right that for many knowledge workers — writers, analysts, software developers — remote work can genuinely enhance productivity and well-being. However, Priya's concern about collaboration and mentorship is equally valid and often underappreciated.

I would argue that the question shouldn't be "remote or not" but rather "who benefits from remote work and who doesn't?" Companies should conduct honest, role-specific assessments rather than applying blanket policies either way. A senior developer who works independently most of the time has very different needs from a junior marketing associate who benefits enormously from daily in-person feedback and observation.

One aspect neither has addressed is equity. Remote work tends to favour employees with large, quiet homes and strong technology infrastructure — advantages that are unevenly distributed. Office environments can actually level the playing field by providing professional resources to all employees regardless of their home situation.

My conclusion: permanent remote options should be available, but with clear expectations tied to role requirements and regular reassessment based on actual performance and collaboration outcomes.`
    },
    {
      id: 'w2_02',
      icon: '🎓',
      title: 'Should University Education Be Free?',
      professorPost: {
        name: 'Dr. James Okafor',
        avatar: '👨‍🏫',
        subject: 'Public Policy',
        prompt: "Several countries — including Germany, Norway, and Finland — offer free or heavily subsidised university education funded by taxation. Others, like the United States and the United Kingdom, rely on a tuition-based model where students bear most of the cost, often through loans. For this week's discussion: **Should university education be free for all citizens?** Consider the economic, social, and practical dimensions. Engage critically with your classmates' arguments."
      },
      studentPosts: [
        {
          name: 'Sofia',
          avatar: '👩‍💼',
          post: "I firmly believe university should be free. Education is fundamentally a public good — a more educated workforce benefits the entire economy through innovation, higher productivity, and lower unemployment. When we make access dependent on financial ability, we're essentially telling talented students from low-income families that their potential doesn't matter. Countries like Germany have shown this model is financially sustainable if the political will exists."
        },
        {
          name: 'Ethan',
          avatar: '👨‍🎓',
          post: "Sofia raises important points, but I'm sceptical. Free university sounds appealing, but someone still has to pay — that means higher taxes. And if everyone has free access, do we risk over-expansion of universities without regard for labour market needs? There's also a fairness question: why should plumbers and nurses — who don't use university — subsidise degrees in fields with limited economic utility? I'd prefer an income-contingent loan model that targets support to those who genuinely need it."
        }
      ],
      prompt: 'Contribute to the academic discussion. Add your perspective to extend or respond to what your classmates have said.',
      wordMin: 100,
      timeLimit: 10,
      rubric: {
        0: 'Did not address the prompt or incomprehensible',
        1: 'Minimal relevant content; does not engage with classmates',
        2: 'Some relevant ideas but limited development; minimal engagement',
        3: 'Addresses prompt with a clear position; some engagement with classmates\' ideas',
        4: 'Clear position, well-developed reasoning, explicitly engages with classmates\' points',
        5: 'Sophisticated contribution; advances discussion meaningfully; strong engagement with multiple perspectives; precise academic language'
      },
      modelAnswer: `This debate highlights a genuine tension between two important values: equity of access and fiscal responsibility. Sofia is right that financial barriers to university perpetuate systemic inequality — talented students from disadvantaged backgrounds are disproportionately deterred by tuition costs, regardless of ability. Ethan's concern about who bears the tax burden is also legitimate.

However, I think Ethan's framing presents a false choice. The question isn't only "free vs. paid" but also "how do we design a funding system that maximises both access and efficiency?" The income-contingent loan model he mentions — where graduates repay only once they earn above a certain threshold — is actually a reasonable middle ground that many countries have adopted. It avoids large upfront costs while ensuring that those who genuinely benefit from a degree contribute to its cost.

Where I would push back on Ethan is the assumption that only economically productive degrees deserve subsidy. The social sciences, arts, and humanities build the critical thinking, communication, and civic engagement skills that democracies depend on. Reducing university funding to a pure return-on-investment calculation risks narrowing education in ways that ultimately harm society.

My position: targeted, need-based free tuition for lower-income students, combined with income-contingent repayment for others, represents a more sustainable and equitable solution than universal free university.`
    },
    {
      id: 'w2_03',
      icon: '🌱',
      title: 'Individual Action vs. Systemic Change on Climate',
      professorPost: {
        name: 'Dr. Yuki Tanaka',
        avatar: '👩‍🔬',
        subject: 'Environmental Studies',
        prompt: "Climate change is arguably the defining challenge of the 21st century. Debates about how to address it often polarise around two approaches: individual behavioural change (reducing personal carbon footprints through diet, transport, consumption habits) versus systemic change through government regulation and corporate accountability. For this week's discussion: **Which is more important for addressing climate change — individual action or systemic policy change?** I expect you to engage substantively with your classmates' views."
      },
      studentPosts: [
        {
          name: 'Anya',
          avatar: '👩‍💻',
          post: "I believe systemic change is far more important than individual action. The statistics are striking — just 100 corporations are responsible for over 70% of global greenhouse gas emissions. Asking individuals to reduce personal carbon footprints while these corporations continue operating unchecked is a distraction. The 'personal responsibility' narrative was actually promoted by fossil fuel companies in the 1980s precisely to shift public attention away from the need for regulation. Real change requires government policy: carbon taxes, renewable energy mandates, and international agreements."
        },
        {
          name: 'David',
          avatar: '👨‍🎓',
          post: "Anya makes a strong case for systemic action, and I largely agree — but I don't think we should dismiss individual action entirely. Governments in democracies respond to public opinion and consumer behaviour. If enough people make plant-based diet choices, invest in EVs, and vote for green candidates, that creates both direct emissions reductions and political pressure for systemic change. Individual and systemic action are complementary, not competing."
        }
      ],
      prompt: 'Contribute to the academic discussion. Add your perspective to extend or respond to what your classmates have said.',
      wordMin: 100,
      timeLimit: 10,
      rubric: {
        0: 'Did not address the prompt or incomprehensible',
        1: 'Minimal relevant content; does not engage with classmates',
        2: 'Some relevant ideas but limited development; minimal engagement',
        3: 'Addresses prompt with a clear position; some engagement with classmates\' ideas',
        4: 'Clear position, well-developed reasoning, explicitly engages with classmates\' points',
        5: 'Sophisticated contribution; advances discussion meaningfully; strong engagement with multiple perspectives; precise academic language'
      },
      modelAnswer: `Both Anya and David make compelling arguments, and David's point about complementarity is important — but I think we need to go further in analysing the conditions under which each type of action is most effective.

Anya's statistics about corporate emissions are correct, and her point about the historical origins of "personal carbon footprint" messaging is well-documented. However, I think framing this as a binary choice — individual versus systemic — can lead to paralysis. In practice, the most effective climate movements have operated at multiple scales simultaneously.

What I would add to this discussion is the role of collective individual action. When large groups of individuals change behaviour in coordinated ways — shifting pension funds, boycotting high-emission brands, mass adoption of public transport — this creates both direct reductions and signals to markets and governments that consumer priorities are shifting. This is distinct from isolated individual behaviour change, which Anya correctly identifies as insufficient.

I agree with Anya that binding regulatory frameworks are the highest-leverage intervention. But David is right that these don't emerge from a political vacuum — they require a citizenry engaged enough to demand them. My view: systemic policy change is the priority target, but individual and collective action is the mechanism through which that systemic change becomes politically possible. The two are not alternatives; they are sequential and mutually reinforcing.`
    }
  ];

  // ── Public API ──────────────────────────────────────────
  return {
    getTask1Items: () => task1Items,
    getTask1ById: id => task1Items.find(t => t.id === id),
    getTask2Items: () => task2Items,
    getTask2ById: id => task2Items.find(t => t.id === id)
  };

})();
