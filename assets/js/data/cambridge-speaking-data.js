/**
 * EnglishPath — Cambridge Speaking Data
 * Fase 16c-1: Practice Writing & Speaking
 * Part 1: Interview (5 topics × 3 questions)
 * Part 2: Individual Long Turn (photo descriptions with compare prompt, 1-min timer)
 * Part 3: Collaborative Task (5 prompts, 3-min timer)
 * Part 4: Further Discussion (4 open-ended follow-up questions)
 * localStorage: ep_user_{id}_cambridge_speaking
 */
const CambridgeSpeakingData = (() => {

  // ── Part 1: Interview ─────────────────────────────────────────────────────
  const part1Topics = [
    {
      id: 'sp1_studies',
      icon: '📚',
      topic: 'Studies & Learning',
      questions: [
        {
          q: 'What subjects do you enjoy studying most, and why?',
          model: `I find myself most drawn to the sciences — particularly biology. What I appreciate is the way it explains everyday phenomena: why we get ill, how ecosystems balance themselves. There's something satisfying about understanding the mechanics of the world around you. I also enjoy languages, though for different reasons — there's a creativity in learning to express yourself in a completely different system.`
        },
        {
          q: 'How has the way you study changed since you were a child?',
          model: `When I was younger, studying meant memorising facts for tests — very passive, very reactive. Now I find myself much more interested in understanding concepts rather than just knowing answers. I take notes actively, I look for connections between subjects, and I'm more willing to sit with confusion for a while before seeking help. It's become a more deliberate process.`
        },
        {
          q: 'Do you think it\'s important to study things that might not be directly useful for your career? Why?',
          model: `Absolutely, yes. There's a tendency now to judge education purely by its economic utility, but I think that's quite short-sighted. Studying history, philosophy, or the arts doesn't just give you knowledge — it develops your capacity to think critically, to understand different perspectives, and to communicate complex ideas. Those skills transfer across any career. Besides, some of the most innovative thinking happens at the intersections of fields that appear unrelated.`
        }
      ]
    },
    {
      id: 'sp1_work',
      icon: '💼',
      topic: 'Work & Future Plans',
      questions: [
        {
          q: 'What kind of work do you imagine yourself doing in ten years?',
          model: `That's a question I find both exciting and genuinely uncertain. Ideally, I'd like to be working in a field that combines problem-solving with some kind of creative element — perhaps in UX design or product development. What I know I don't want is a purely administrative role. I need work that challenges me intellectually. But honestly, given how quickly industries are evolving, I suspect the specific job title might not even exist yet.`
        },
        {
          q: 'Do you think it\'s better to have one stable career or to change careers several times? Why?',
          model: `I lean toward the view that multiple careers can be enriching rather than destabilising — but it depends enormously on the person and circumstances. Stability offers depth: you develop expertise and professional relationships over time. But changing careers can lead to a more dynamic understanding of different industries and your own capacities. What I think matters most is that the work continues to challenge you and feel meaningful. Staying in a career purely out of fear of change seems like a missed opportunity.`
        },
        {
          q: 'How important is it to enjoy your work, versus earning a high salary?',
          model: `I think the relationship between enjoyment and salary is more nuanced than the either/or framing suggests. Research on wellbeing consistently shows that beyond a certain income threshold — enough to cover basic needs and some stability — additional money contributes surprisingly little to happiness. What truly matters is a sense of purpose, autonomy, and competence in your work. That said, I recognise this is a privilege: not everyone has the luxury of prioritising enjoyment over necessity.`
        }
      ]
    },
    {
      id: 'sp1_technology',
      icon: '💻',
      topic: 'Technology & Daily Life',
      questions: [
        {
          q: 'How has technology changed the way you communicate with friends and family?',
          model: `Dramatically, and in ways that are both positive and slightly concerning. On one hand, I can video-call relatives who live on the other side of the world — that would have been unimaginable to previous generations. On the other, I notice that even when I'm physically with friends, phones sometimes fragment the conversation. There's a quality of attention that gets diluted. I think the technology itself is neutral; it's the habits we build around it that matter.`
        },
        {
          q: 'What technology do you think will have the biggest impact on society in the next decade?',
          model: `I think artificial intelligence will be the defining technology of the next decade, though perhaps not in the dramatic, sci-fi sense people imagine. The more immediate impact will be on knowledge work — writing, analysis, coding, design. These professions will change profoundly, not necessarily disappear. There's also the question of AI in healthcare, where diagnostic tools are already outperforming humans in specific tasks. The challenge will be governance: how do we ensure these tools are fair, transparent, and genuinely beneficial?`
        },
        {
          q: 'Do you think people rely too much on technology in their daily lives?',
          model: `In many respects, yes — though I hold myself equally accountable. There's a reflexive quality to how we reach for our phones that I find troubling. The ability to sit with boredom, with silence, with uncertainty — without immediately stimulating ourselves — seems to be diminishing. That said, I'm wary of technology panics; every generation has worried about the new medium of its time. The question worth asking isn't whether technology is "bad" but whether we're using it consciously or compulsively.`
        }
      ]
    },
    {
      id: 'sp1_environment',
      icon: '🌍',
      topic: 'Environment & Travel',
      questions: [
        {
          q: 'Have you ever been to a place that really impressed you? What was it about it?',
          model: `Yes — I visited Kyoto a few years ago and it genuinely exceeded my expectations. What struck me most was the coexistence of the ancient and the modern: you could walk from a 1,000-year-old shrine into a contemporary neighbourhood within minutes. There was also a quality of quietness about the older parts of the city, a kind of deliberate stillness, that felt almost designed to slow you down. It's the only place I've been where I felt actively encouraged to be present.`
        },
        {
          q: 'How do you feel about the environmental impact of travelling?',
          model: `It's a genuine tension for me. I value travel deeply — for the perspective it offers, the empathy it builds — but I'm also aware that flying is one of the highest-carbon activities an individual can undertake. I don't think the answer is simply never to travel; that feels like a privilege argument — those who can already afford to travel saying others shouldn't. But I do think frequency matters, and choosing slower, overland travel where feasible is something I try to do. The broader solution needs to be structural: sustainable aviation fuel, high-speed rail investment.`
        },
        {
          q: 'Do you think tourism is mostly beneficial or harmful for local communities?',
          model: `Both, and the balance depends heavily on the type and scale of tourism. Mass tourism — vast cruise ships, overcrowded heritage sites — can depress local wages, drive up housing costs, and erode the very culture that made a place worth visiting. But sensitive, distributed tourism, where travellers stay in locally-owned accommodation and eat in family restaurants, can be genuinely transformative for local economies. The problem is that mass tourism is often easier and cheaper, so market incentives push in that direction unless there's meaningful regulation.`
        }
      ]
    },
    {
      id: 'sp1_arts',
      icon: '🎨',
      topic: 'Arts & Entertainment',
      questions: [
        {
          q: 'What kind of music, films, or books do you enjoy most? Why?',
          model: `I'm quite drawn to long-form fiction — novels that take their time to build worlds and characters. What I enjoy most is the experience of living inside a different consciousness for a while: seeing the world through another person's logic, even if it's very different from my own. In terms of film, I tend to prefer character studies over plot-driven stories. For music, it shifts, but I find myself returning to jazz — there's an intellectual and emotional complexity to it that sustains repeated listening.`
        },
        {
          q: 'Do you think it\'s important for the government to fund the arts? Why or why not?',
          model: `Yes, I do — though it's not the easiest argument to make in an era of competing priorities. The arts don't generate immediate economic value in the same way as infrastructure or healthcare, but they're essential to cultural cohesion and national identity. Without public funding, artistic output risks becoming the preserve of those who can self-finance — which means it becomes unrepresentative and, ultimately, less interesting. Independent filmmakers, experimental theatre, literary journals — these exist because of subsidies. Without them, culture narrows.`
        },
        {
          q: 'How has streaming changed the way people consume entertainment?',
          model: `Profoundly, and in both empowering and destabilising ways. The access is extraordinary — any film ever made, any album, any series, available instantly. But I wonder whether abundance has changed our relationship with individual works. When access is scarce, you watch something three times because it's the only thing available, and you develop a deeper relationship with it. Now there's always something else to watch, and that constant possibility of switching can actually prevent genuine engagement. There's also the economic side: streaming has disrupted the revenue models that sustained mid-budget, mid-scale work.`
        }
      ]
    }
  ];

  // ── Part 2: Individual Long Turn ─────────────────────────────────────────
  const part2Tasks = [
    {
      id: 'sp2_01',
      icon: '🏙️',
      title: 'Places to Study',
      photoA: {
        label: 'Photo A',
        description: `A busy university library: rows of students at long wooden desks, some with laptops, others with open textbooks. Bright overhead lighting. A few students are wearing headphones. The atmosphere looks focused but slightly tense — there are no spoken conversations visible.`
      },
      photoB: {
        label: 'Photo B',
        description: `A relaxed coffee shop: a student sits alone at a small round table near a window, a latte beside their open notebook. Soft background music seems implied by the café decor. Other patrons are chatting quietly nearby. The atmosphere looks comfortable and informal.`
      },
      task: `Compare these two places to study. Consider the advantages and disadvantages of each, and say which environment you would find more productive and why.`,
      speakTime: 60,
      followUp: `Which type of environment do you find most conducive to focused work?`,
      model: `In Photo A, we can see a formal university library setting — students are clearly working hard, but the environment looks quite pressured and perhaps a little rigid. The bright, institutional lighting and the rows of desks create an atmosphere of expectation: you're there to study, nothing else. The advantage is structure — it signals to your brain that it's time to focus. The disadvantage is that the environment can be slightly oppressive for creative thinking.

Photo B is almost the opposite in atmosphere. The coffee shop setting is informal, comfortable, and human. The presence of background noise and other people can actually be productive — research suggests a moderate level of ambient noise enhances focus for some tasks. However, the risk is distraction: social conversations, phone notifications, and the temptation to simply enjoy the coffee.

Personally, I'd choose the library for technical, analytical work — problem-solving and writing that requires sustained logic. But for reading and brainstorming, I think the coffee shop environment allows a more relaxed, associative kind of thinking. The best approach might be to use both strategically.`
    },
    {
      id: 'sp2_02',
      icon: '🏕️',
      title: 'Ways to Spend a Holiday',
      photoA: {
        label: 'Photo A',
        description: `A group of young adults on an outdoor adventure holiday: they are hiking through a mountain forest, wearing backpacks, laughing together. The scenery is dramatic — tall trees, a distant mountain peak. The image suggests physical challenge and camaraderie.`
      },
      photoB: {
        label: 'Photo B',
        description: `A family on a beach holiday: two adults and two children are building sandcastles at the edge of the water. The beach is calm and sunny. The mood is relaxed and domestic — there is a picnic rug visible in the background with drinks and a book.`
      },
      task: `Compare these two types of holiday. Think about what different people might enjoy about each type, and explain which holiday you would find more fulfilling and why.`,
      speakTime: 60,
      followUp: `Do you think the purpose of a holiday is primarily to relax, or to have new experiences?`,
      model: `These two photos represent quite distinct holiday philosophies. The first image shows an adventure holiday with a group of friends — physically demanding, immersed in nature, clearly social. The appeal here is the sense of achievement and shared experience: doing something together that pushes your limits creates strong bonds. The disadvantage is that it requires a certain level of fitness and energy, and if you're already exhausted from work or stress, it might feel like more effort than reward.

The second image captures something much more restorative — a family holiday centred on relaxation, proximity, and simple pleasure. There's real value in the unhurried quality of a beach day: it allows minds to decompress, and the simplicity of sandcastles and picnics can be more nourishing than anything structured.

For me personally, the appeal changes depending on where I am in life. When I'm energised and healthy, I'm drawn to the mountains and the challenge. But when I'm genuinely exhausted, I think there's wisdom in choosing rest over adventure. Both holidays are valid — the key is knowing what you actually need rather than what you think you should want.`
    },
    {
      id: 'sp2_03',
      icon: '🎭',
      title: 'Types of Performance',
      photoA: {
        label: 'Photo A',
        description: `A large outdoor music festival: a huge crowd in front of a main stage, colourful lights, a band performing. The crowd is energetic — people have their arms raised, some are dancing. The scale is enormous; it feels celebratory and communal.`
      },
      photoB: {
        label: 'Photo B',
        description: `An intimate jazz club: a small ensemble of three musicians — piano, double bass, saxophone — performing in a dimly lit room. Perhaps 40 people are seated at round tables with drinks. The mood is attentive and sophisticated. Some audience members are leaning forward, listening intently.`
      },
      task: `Compare these two types of live performance. Discuss what audience members might gain from each experience, and say which you would prefer to attend and why.`,
      speakTime: 60,
      followUp: `Do you think live performances are becoming more or less important in the age of streaming?`,
      model: `These two images represent completely different relationships between performer and audience. The music festival is an experience of scale and collective energy — being part of 50,000 people sharing the same moment, with the same music washing over everyone simultaneously. There's something genuinely transcendent about that communal experience. The disadvantage is the loss of intimacy: the artist is a distant figure on a stage, and there's very little nuance in the listening.

The jazz club in Photo B is the opposite in almost every dimension. The scale is human, the attention is focused, and the relationship between musician and audience is genuinely interactive. Jazz especially benefits from this context — when musicians can read the room and improvise in response to the energy, something happens that cannot be recorded or replicated.

I would choose the jazz club, personally — not because festivals don't have value, but because I find the concentrated attention of a small venue more intellectually and emotionally rewarding. The best live music experiences I've had have all been in spaces where I could hear every note clearly and feel genuinely in the presence of the artists.`
    }
  ];

  // ── Part 3: Collaborative Task ────────────────────────────────────────────
  const part3Tasks = [
    {
      id: 'sp3_01',
      icon: '🏫',
      title: 'Improving a School',
      taskPrompt: `A school wants to improve students' overall wellbeing and academic performance. Here are five possible initiatives they are considering. Discuss each option and decide which two would be most beneficial.`,
      prompts: [
        { id: 'p3_a', label: 'Longer lunch breaks', icon: '🍽️', desc: 'Extending lunch breaks to 90 minutes to allow proper rest and social time.' },
        { id: 'p3_b', label: 'Mindfulness classes', icon: '🧘', desc: 'Introducing weekly mindfulness and stress management sessions for all students.' },
        { id: 'p3_c', label: 'No homework policy', icon: '📋', desc: 'Eliminating all take-home assignments to reduce stress outside school.' },
        { id: 'p3_d', label: 'More creative subjects', icon: '🎨', desc: 'Adding art, music, and drama to the compulsory curriculum for all year groups.' },
        { id: 'p3_e', label: 'Mentoring scheme', icon: '👥', desc: 'Pairing older students with younger students for academic and social support.' }
      ],
      speakTime: 180,
      followUp: `If the school had budget for only ONE initiative, which would you recommend and why?`
    },
    {
      id: 'sp3_02',
      icon: '🌆',
      title: 'Improving a City',
      taskPrompt: `A city council has funds available to make one major improvement to the city. Here are five proposals being considered. Discuss each option and decide which two would benefit residents the most.`,
      prompts: [
        { id: 'p3_a', label: 'New public park', icon: '🌳', desc: 'Create a large green park with sports facilities and a community garden in the city centre.' },
        { id: 'p3_b', label: 'Free public transport', icon: '🚌', desc: 'Make all buses and trams within the city limits free for all residents.' },
        { id: 'p3_c', label: 'Arts and culture centre', icon: '🎭', desc: 'Build a new multipurpose arts centre with galleries, theatre, and music venues.' },
        { id: 'p3_d', label: 'Cycling network', icon: '🚴', desc: 'Construct a safe, connected network of cycling lanes throughout the city.' },
        { id: 'p3_e', label: 'Community tech hub', icon: '💻', desc: 'Open free digital skills centres in each neighbourhood for residents of all ages.' }
      ],
      speakTime: 180,
      followUp: `Which improvement do you think would have the longest-lasting positive effect on the city?`
    },
    {
      id: 'sp3_03',
      icon: '💼',
      title: 'Skills for the Future',
      taskPrompt: `A careers organisation is designing a programme to help young people prepare for the job market of the future. Here are five skills they are considering including. Discuss which skills are most important and decide which two should be prioritised.`,
      prompts: [
        { id: 'p3_a', label: 'Digital and AI literacy', icon: '🤖', desc: 'Understanding how to work with and critically evaluate AI tools and digital systems.' },
        { id: 'p3_b', label: 'Cross-cultural communication', icon: '🌐', desc: 'Building skills to work effectively in diverse, international teams.' },
        { id: 'p3_c', label: 'Financial management', icon: '💰', desc: 'Practical skills in personal finance, budgeting, and understanding economic systems.' },
        { id: 'p3_d', label: 'Creative problem-solving', icon: '💡', desc: 'Developing divergent thinking and the ability to generate innovative solutions.' },
        { id: 'p3_e', label: 'Wellbeing and resilience', icon: '🧠', desc: 'Strategies for maintaining mental health, managing stress, and recovering from setbacks.' }
      ],
      speakTime: 180,
      followUp: `Do you think schools today are adequately preparing young people for the future workplace?`
    }
  ];

  // ── Part 4: Further Discussion ─────────────────────────────────────────────
  const part4Sets = [
    {
      id: 'sp4_education',
      icon: '🎓',
      theme: 'Education and Learning',
      linkedPart3: 'sp3_01',
      questions: [
        {
          q: `Some people argue that the education system focuses too much on academic achievement and not enough on personal development. To what extent do you agree?`,
          model: `I find this quite a compelling argument. The emphasis on measurable outcomes — grades, test scores, university rankings — has real consequences for how students experience education. When the primary signal of success is a number, schools are incentivised to teach to that number. Personal development — curiosity, emotional intelligence, ethical reasoning — is harder to assess and therefore less rewarded. That said, I don't want to romanticise a system that doesn't also give students the intellectual and technical foundations they need. The question is balance, and currently I think many systems have it wrong.`
        },
        {
          q: `Do you think universities will remain relevant in 20 years, or will alternative forms of learning replace them?`,
          model: `I suspect universities will remain relevant but significantly transformed. The traditional model — three years, fixed campus, fixed curriculum — is already under pressure from online learning, bootcamps, and on-the-job training. What universities uniquely offer is the residential experience: living with peers, debating ideas outside class, the formation of intellectual community. Those things are very hard to replicate digitally. But the content delivery function of lectures? That can absolutely be done better online. I expect universities to become more hybrid, more project-based, and less focused on passive knowledge transmission.`
        },
        {
          q: `How important is it that education systems teach students to think critically, rather than simply delivering knowledge?`,
          model: `I would say it's arguably the most important function education can serve. Knowledge is now infinitely abundant and instantly searchable — the ability to absorb and regurgitate facts is of rapidly diminishing value. What isn't replicable by a search engine is the ability to evaluate sources, construct arguments, identify logical fallacies, and think across disciplines. Critical thinking is the meta-skill that makes all other learning possible. And yet, ironically, it's one of the hardest things to teach because it requires a tolerance for ambiguity and open questions that sits uncomfortably with curricula designed around definitive answers.`
        },
        {
          q: `In your opinion, what is the single most important thing a good teacher does?`,
          model: `I think the most important thing a good teacher does is make a student feel that their thinking matters. Not just their correct answers — their reasoning, their questions, their half-formed ideas. The teachers who have had the most impact on me were not necessarily the ones who knew the most. They were the ones who treated my confusion as interesting rather than inconvenient, and who modelled genuine enthusiasm for the subject. That quality — intellectual passion combined with genuine interest in the student — is irreplaceable. No technology replicates it.`
        }
      ]
    },
    {
      id: 'sp4_society',
      icon: '🌍',
      theme: 'Society and Values',
      linkedPart3: 'sp3_02',
      questions: [
        {
          q: `Some people believe that individuals have a responsibility to actively improve their communities. Others think that this is the government's role. What is your view?`,
          model: `I think this framing presents a false dichotomy. Individual civic engagement and effective government are not alternatives — they're complementary and mutually reinforcing. When communities are active and organised, governments are more accountable. When governments function well, individuals have more capacity to engage meaningfully rather than simply surviving. What concerns me about pushing all responsibility onto individuals is that it tends to obscure systemic problems. Volunteering is valuable, but it doesn't fix a broken housing system or inadequate public transport.`
        },
        {
          q: `To what extent do you think social media has changed how communities are formed and maintained?`,
          model: `Radically, and with genuinely mixed consequences. Social media has enabled communities based on shared identity or interest that transcend geography — which for marginalised groups or people in isolated places is profoundly valuable. At the same time, there's mounting evidence that the algorithmic design of these platforms fragments and polarises communities, amplifying outrage and rewarding conflict. So the technology expands the possibility space for community while simultaneously distorting the conditions in which community thrives. I think the outcome depends heavily on how the platforms are regulated and designed, not just how individuals choose to use them.`
        },
        {
          q: `Do you think it is the responsibility of wealthy nations to financially support less developed countries? Why or why not?`,
          model: `I believe there are both ethical and pragmatic arguments for saying yes. Ethically, the prosperity of wealthy nations was partly built on systems — colonialism, exploitative trade — that directly impoverished others. Some form of reparative obligation seems difficult to argue against. Pragmatically, a world with extreme inequality is a less stable world: poverty drives migration, conflict, and political instability that ultimately affects everyone. The debate is more legitimately about the form and conditionality of support. Aid with strings attached that perpetuates dependency is not straightforwardly good; investment in education, healthcare infrastructure, and genuine trade equity is more defensible.`
        },
        {
          q: `How important do you think it is for people to maintain connections to their cultural heritage?`,
          model: `I think it's deeply valuable, but in a way that needs to be chosen rather than imposed. Cultural heritage provides identity, rootedness, a sense of belonging to something larger than yourself. It also contains accumulated wisdom about how to live — stories, rituals, and practices that have survived for reasons worth understanding. The problem arises when heritage is weaponised as an instrument of exclusion, or when it calcifies into something that cannot be questioned or adapted. The healthiest relationship with cultural heritage seems to involve both genuine love and critical distance — cherishing what is beautiful and meaningful while being willing to examine what should change.`
        }
      ]
    }
  ];

  // ── Self-Assessment Rubric ────────────────────────────────────────────────
  const rubricCriteria = [
    {
      id: 'grammar_vocab',
      label: 'Grammar & Vocabulary',
      desc: 'Range and accuracy of grammatical structures; breadth and precision of vocabulary; ability to paraphrase'
    },
    {
      id: 'discourse_management',
      label: 'Discourse Management',
      desc: 'Ability to produce extended, coherent discourse; use of linking devices; maintaining and developing ideas'
    },
    {
      id: 'pronunciation',
      label: 'Pronunciation',
      desc: 'Clarity of articulation; appropriate stress and intonation; intelligibility to a listener'
    },
    {
      id: 'interactive_communication',
      label: 'Interactive Communication',
      desc: 'Initiating and responding; developing the interaction; ability to collaborate and negotiate meaning'
    }
  ];

  // ── Public API ───────────────────────────────────────────────────────────
  return {
    getPart1Topics: () => part1Topics,
    getPart1ById: (id) => part1Topics.find(t => t.id === id),
    getPart2Tasks: () => part2Tasks,
    getPart2ById: (id) => part2Tasks.find(t => t.id === id),
    getPart3Tasks: () => part3Tasks,
    getPart3ById: (id) => part3Tasks.find(t => t.id === id),
    getPart4Sets: () => part4Sets,
    getPart4ById: (id) => part4Sets.find(t => t.id === id),
    getRubric: () => rubricCriteria
  };

})();
