/**
 * EnglishPath — Cambridge Listening Data
 * Fase 16b: Practice Listening
 * Part 1: Short extracts MCQ | Part 2: Sentence completion
 * Part 3: Long text MCQ | Part 4: Multiple matching
 * localStorage: ep_user_{id}_cambridge_listening
 */

const CambridgeListeningData = (() => {

  // ─── PART 1: Multiple-Choice Short Extracts ────────────────────────────────
  const part1Extracts = [
    {
      id: 'l1_e1',
      label: 'Extract 1 — Two friends discussing a book',
      speakers: [
        { name: 'Woman', voice: 'female' },
        { name: 'Man', voice: 'male' }
      ],
      script: [
        { speaker: 'Woman', text: "I finally finished that novel you recommended. It took me ages, I have to say." },
        { speaker: 'Man', text: "Oh really? Did you enjoy it in the end?" },
        { speaker: 'Woman', text: "Enjoy is a complicated word for it. I found the writing style quite demanding — almost exhausting at times. But I couldn't put it down, which tells you something." },
        { speaker: 'Man', text: "That's exactly how I felt. The plot didn't make it easy either. All those flashbacks." },
        { speaker: 'Woman', text: "Yes, but I think they were essential. You'd lose so much without them. I just wish the ending had been more satisfying. It felt like the author ran out of ideas." },
        { speaker: 'Man', text: "I actually loved the ending. I think it's meant to be ambiguous." },
        { speaker: 'Woman', text: "Maybe. I'm still not convinced." }
      ],
      question: 'What does the woman think about the novel?',
      choices: [
        'It was easy to read but disappointing.',
        'It was engaging despite being challenging.',
        'It was well-written but too long.',
        'It was poorly structured throughout.'
      ],
      answer: 1,
      explanation: 'The woman found the style "demanding" but "couldn\'t put it down" — engaging despite the difficulty. She was disappointed by the ending, not the novel overall.'
    },
    {
      id: 'l1_e2',
      label: 'Extract 2 — A man calling a hotel',
      speakers: [
        { name: 'Receptionist', voice: 'female' },
        { name: 'Guest', voice: 'male' }
      ],
      script: [
        { speaker: 'Receptionist', text: "Good afternoon, Grand Meridian Hotel, how can I help?" },
        { speaker: 'Guest', text: "Hi, I have a reservation for the 14th — under the name Harrington. I wanted to check whether the gym facilities would be available during my stay." },
        { speaker: 'Receptionist', text: "Let me check, Mr Harrington. Ah, I'm afraid the gym is currently undergoing a refurbishment and will be closed until the 19th." },
        { speaker: 'Guest', text: "Oh, that's unfortunate. The gym was one of the main reasons I chose this hotel. Will there be any compensation?" },
        { speaker: 'Receptionist', text: "We do have an arrangement with a nearby fitness centre — they offer complimentary day passes for our guests during the closure." },
        { speaker: 'Guest', text: "I see. How far is that from the hotel?" },
        { speaker: 'Receptionist', text: "About a ten-minute walk, or we can arrange a taxi. I'm sorry for the inconvenience." },
        { speaker: 'Guest', text: "Alright, I suppose that will have to do. Thanks." }
      ],
      question: 'Why is the man dissatisfied with the hotel\'s response?',
      choices: [
        'The alternative gym is too far to be practical.',
        'He specifically chose the hotel for its gym.',
        'The hotel is not offering a price reduction.',
        'He cannot get a taxi to the fitness centre.'
      ],
      answer: 1,
      explanation: 'The guest says "The gym was one of the main reasons I chose this hotel" — the closure undermines his core reason for the booking.'
    },
    {
      id: 'l1_e3',
      label: 'Extract 3 — Radio interview with a chef',
      speakers: [
        { name: 'Interviewer', voice: 'male' },
        { name: 'Chef', voice: 'female' }
      ],
      script: [
        { speaker: 'Interviewer', text: "You've said before that texture matters more than flavour in cooking. Can you explain that?" },
        { speaker: 'Chef', text: "It's a provocation, partly. Flavour is obviously critical — nobody is arguing otherwise. But texture is what we notice unconsciously. People will eat a mediocre-tasting dish if the texture is right, but they'll struggle with a beautifully flavoured one that feels wrong in the mouth. It's deeply psychological." },
        { speaker: 'Interviewer', text: "Can you give an example?" },
        { speaker: 'Chef', text: "Think about silky soups. Blend them wrong — too thin, too lumpy — and the flavour doesn't save them. Or think about crunchy elements in salads. Remove them, and the dish collapses emotionally even if every flavour is perfect." },
        { speaker: 'Interviewer', text: "That's fascinating. So you'd say most cooks overlook this?" },
        { speaker: 'Chef', text: "Absolutely. They focus on seasoning, which is important, but texture is the silent architect of every dish." }
      ],
      question: 'What is the chef\'s main point about texture?',
      choices: [
        'It is more important than seasoning in professional cooking.',
        'It influences our enjoyment of food more than we consciously realise.',
        'It can compensate for poor flavour in most dishes.',
        'It is the element that separates amateur from professional cooking.'
      ],
      answer: 1,
      explanation: 'The chef calls it a "silent architect" and "unconscious" element — it shapes our experience without us realising. She does not say it can fully compensate for poor flavour.'
    }
  ];

  // ─── PART 2: Sentence Completion ──────────────────────────────────────────
  const part2Tracks = [
    {
      id: 'l2_t1',
      title: 'A Talk on Citizen Science',
      speaker: 'Dr. Amara Osei — Research Coordinator',
      intro: 'You will hear a talk about citizen science projects. Complete the sentences with a word or short phrase.',
      script: [
        { text: "Good evening, everyone. Tonight I want to talk about citizen science — and specifically about how amateur volunteers are making genuinely significant contributions to fields as varied as astronomy, ecology, and linguistics." },
        { text: "The term citizen science was first widely used in the 1990s, though the practice of using non-professional observers to collect scientific data goes back centuries. What's changed is the technology. Smartphones and internet connectivity mean that a volunteer in rural Indonesia can contribute observations that are immediately useful to a researcher in Norway." },
        { text: "One of the most successful citizen science projects is Galaxy Zoo, launched in 2007. At its peak, over 160,000 volunteers were classifying images of galaxies that professional astronomers simply didn't have time to process. The project produced more than 50 peer-reviewed scientific papers, which is an extraordinary output for a project run largely by enthusiasts." },
        { text: "In ecology, citizen science has been transformative for biodiversity monitoring. Projects like eBird, which aggregates birdwatching records from millions of observers, have created datasets that would be impossible to replicate through professional surveys alone. The eBird database now holds over 1 billion observations, making it the world's largest biodiversity database." },
        { text: "Of course, citizen science raises valid concerns about data quality. Trained scientists worry that amateur observations may be inconsistent or biased — for example, birdwatchers tend to report more attractive or unusual species and may undercount common ones. Researchers address this through statistical correction methods and by training volunteers using standardised protocols before they begin collecting data." },
        { text: "Perhaps most surprisingly, citizen science is also making headway in linguistics. The BOLD project — that's B-O-L-D — is using volunteer transcribers to annotate hours of spoken language recordings from endangered languages, helping linguists preserve documentation that would otherwise take decades using professional transcription alone." },
        { text: "If you're interested in getting involved, I'd recommend starting with SciStarter, which is a platform that lists over three thousand active projects across dozens of disciplines. You can filter by location, time commitment, and topic, making it easy to find something that suits your schedule and interests." },
        { text: "What citizen science demonstrates, ultimately, is that the boundary between expert and amateur is more permeable than we once thought. The scale of modern scientific challenges — climate change, biodiversity loss, language extinction — may require exactly the kind of distributed, large-scale effort that only public participation can provide." }
      ],
      questions: [
        {
          id: 'l2_q1',
          sentence: 'The term citizen science became widely used in the __.',
          answer: '1990s',
          explanation: 'Speaker says: "The term citizen science was first widely used in the 1990s."'
        },
        {
          id: 'l2_q2',
          sentence: 'Galaxy Zoo had more than __ volunteers classifying galaxy images at its peak.',
          answer: '160,000',
          explanation: 'Speaker says: "over 160,000 volunteers were classifying images."'
        },
        {
          id: 'l2_q3',
          sentence: 'Galaxy Zoo resulted in more than __ scientific papers.',
          answer: '50',
          explanation: 'Speaker says: "more than 50 peer-reviewed scientific papers."'
        },
        {
          id: 'l2_q4',
          sentence: 'The eBird database currently contains over __ bird observations.',
          answer: '1 billion',
          explanation: 'Speaker says: "over 1 billion observations."'
        },
        {
          id: 'l2_q5',
          sentence: 'One concern about citizen science data is that volunteers may __ common species.',
          answer: 'undercount',
          explanation: 'Speaker says birdwatchers "may undercount common ones."'
        },
        {
          id: 'l2_q6',
          sentence: 'The __ project uses volunteers to transcribe recordings of endangered languages.',
          answer: 'BOLD',
          explanation: 'Speaker refers to "the BOLD project" working on endangered language transcription.'
        },
        {
          id: 'l2_q7',
          sentence: 'The platform __ lists over three thousand active citizen science projects.',
          answer: 'SciStarter',
          explanation: 'Speaker recommends "starting with SciStarter."'
        }
      ]
    }
  ];

  // ─── PART 3: Long Text Multiple Choice ────────────────────────────────────
  const part3Tracks = [
    {
      id: 'l3_t1',
      title: 'Interview: Architectural Acoustics',
      speakers: [
        { name: 'Interviewer', voice: 'female' },
        { name: 'Dr. Vance', voice: 'male', role: 'Acoustic architect' }
      ],
      script: [
        { speaker: 'Interviewer', text: "Dr. Vance, you've described architectural acoustics as the most underappreciated discipline in building design. Why?" },
        { speaker: 'Dr. Vance', text: "Because it's invisible — and I mean that literally. People walk into a concert hall and notice the visual design, the materials, the colour scheme. Very rarely do they consciously register the acoustics. But if you blindfolded them and moved them to an acoustically inferior building, they would feel different within minutes. Anxious, perhaps. Less engaged. The acoustic environment shapes our emotional experience profoundly and almost entirely below the level of conscious awareness." },
        { speaker: 'Interviewer', text: "How did you come to specialise in this field?" },
        { speaker: 'Dr. Vance', text: "Somewhat by accident. I trained as a conventional architect and had no particular interest in acoustics until I worked on a school renovation project in my early career. The school had terrible acoustics — teachers were straining their voices, students were missing instructions, concentration was visibly suffering. When we addressed the acoustic problems, the improvement in the learning environment was dramatic. That experience changed the direction of my career entirely." },
        { speaker: 'Interviewer', text: "Can you give an example of a recent project where acoustics were central?" },
        { speaker: 'Dr. Vance', text: "We recently completed a children's hospital. Healthcare acoustics is a growing field because research consistently shows that noise in hospital environments delays recovery, increases patient stress, and contributes to staff burnout. We used a combination of acoustic panels, floating ceilings, and a careful layout that routes noisy clinical areas away from patient wards. The result was a significant reduction in average measured noise levels and, more importantly, measurable improvements in patient-reported wellbeing." },
        { speaker: 'Interviewer', text: "What about open-plan offices? They're controversial." },
        { speaker: 'Dr. Vance', text: "Extremely. The research is fairly damning. Open-plan offices consistently produce higher noise levels than private offices, and the type of noise matters as much as the volume. Intelligible speech — someone else's conversation that you can follow — is uniquely disruptive to cognitive tasks. The brain is almost helpless against it. People think they adapt over time, but the productivity data suggests otherwise. What actually happens is that people wear headphones and essentially create an acoustic refuge within the open space." },
        { speaker: 'Interviewer', text: "So are open-plan offices a mistake?" },
        { speaker: 'Dr. Vance', text: "Not necessarily, if they're designed well. The issue is that most aren't. The acoustic solution isn't simply adding more soft furnishings, though that helps. It requires thinking about the activities the space is meant to support and designing acoustic zones accordingly — spaces for focused individual work, spaces for collaboration, with appropriate acoustic separation between them. Most developers don't want to pay for that level of consideration, and so we end up with the problems we have." }
      ],
      questions: [
        {
          id: 'l3_q1',
          question: 'What point does Dr. Vance make about acoustics in the first answer?',
          choices: [
            'People rarely appreciate concert hall design until they experience poor acoustics.',
            'Acoustic environments affect us emotionally without our being aware of it.',
            'Building designers prioritise visual elements because they are easier to measure.',
            'Most people prefer acoustically quiet environments regardless of the setting.'
          ],
          answer: 1,
          explanation: 'Dr. Vance says acoustics "shapes our emotional experience profoundly and almost entirely below the level of conscious awareness."'
        },
        {
          id: 'l3_q2',
          question: 'What experience led Dr. Vance to specialise in acoustics?',
          choices: [
            'Working on an acoustically acclaimed concert hall early in his career.',
            'Observing the impact of poor acoustics on a school environment.',
            'A course in acoustic engineering during his architectural training.',
            'A commission from a hospital that had noise-related problems.'
          ],
          answer: 1,
          explanation: 'He describes a school renovation where addressing bad acoustics dramatically improved the learning environment.'
        },
        {
          id: 'l3_q3',
          question: 'According to Dr. Vance, what is particularly disruptive about noise in open-plan offices?',
          choices: [
            'The total volume of noise, which exceeds acceptable health limits.',
            'Overheard speech that the brain cannot block out.',
            'The inability to use headphones in professional environments.',
            'Background music that companies play to mask other sounds.'
          ],
          answer: 1,
          explanation: 'He says "intelligible speech... is uniquely disruptive" and "the brain is almost helpless against it."'
        },
        {
          id: 'l3_q4',
          question: 'What does Dr. Vance identify as the main reason open-plan offices have acoustic problems?',
          choices: [
            'The use of hard surfaces and minimal soft furnishings.',
            'Developers unwilling to invest in proper acoustic design.',
            'Employees\' resistance to acoustic management strategies.',
            'A fundamental incompatibility between open plans and office work.'
          ],
          answer: 1,
          explanation: 'He says "Most developers don\'t want to pay for that level of consideration, and so we end up with the problems we have."'
        }
      ]
    }
  ];

  // ─── PART 4: Multiple Matching ─────────────────────────────────────────────
  const part4Tracks = [
    {
      id: 'l4_t1',
      title: 'Five Speakers on Learning New Skills as an Adult',
      intro: 'You will hear five short monologues. Choose from A–F what each speaker says about learning a new skill as an adult. Use each letter only once. There is one extra option.',
      options: [
        { id: 'A', text: 'I underestimated how long it would take.' },
        { id: 'B', text: 'The social aspect was unexpectedly rewarding.' },
        { id: 'C', text: 'I had to change my expectations of myself.' },
        { id: 'D', text: 'Online resources were more useful than classes.' },
        { id: 'E', text: 'Failure was part of what made it worthwhile.' },
        { id: 'F', text: 'My prior knowledge actually hindered my progress.' }
      ],
      speakers: [
        {
          id: 'S1',
          label: 'Speaker 1',
          script: "I decided to learn the cello at 47. People thought I was mad. What surprised me most was how much my musician's ear — I play piano — actually worked against me. I could hear exactly how wrong I sounded, and that was painful in a way that a complete beginner wouldn't experience. I had to essentially switch off my critical faculty and accept a level of incompetence that was genuinely uncomfortable. Worth it, eventually. But the road was longer than I'd imagined because I was fighting my own expertise.",
          answer: 'F',
          explanation: 'Prior musical knowledge made it harder — "my prior knowledge actually hindered my progress."'
        },
        {
          id: 'S2',
          label: 'Speaker 2',
          script: "I joined a pottery class thinking I'd become reasonably proficient within a few months. Three years later, I'm still very much a beginner by any objective measure. But I've made peace with that — the joy is in the process, not the outcome. I've stopped comparing myself to the YouTube videos I watched obsessively at the start. Progress doesn't look how you expect it to. You have to redefine what success means for yourself.",
          answer: 'C',
          explanation: 'She changed her expectations — "I had to change my expectations of myself."'
        },
        {
          id: 'S3',
          label: 'Speaker 3',
          script: "I took up watercolour painting after retirement. The painting itself is fine — I enjoy it, I've improved. But honestly? The thing that has been transformative is the Tuesday afternoon group I attend. A bunch of us have coffee, we critique each other's work, we've become proper friends. I didn't expect that. I thought it would be a solitary pursuit. The connections I've formed have been far more valuable than anything I've put on canvas.",
          answer: 'B',
          explanation: 'The social dimension was unexpectedly rewarding.'
        },
        {
          id: 'S4',
          label: 'Speaker 4',
          script: "I've been learning to code for about two years. What nobody tells you when you start is how constant failure is. Not just occasional setbacks — constant, daily failure. Every day you try things that don't work. And I found that strangely motivating. Each bug you solve feels like a small victory specifically because you fought for it. I think I'd have learned less if it had come easily. The struggle was actually the point.",
          answer: 'E',
          explanation: 'Failure was part of what made it valuable — "Failure was part of what made it worthwhile."'
        },
        {
          id: 'S5',
          label: 'Speaker 5',
          script: "I wanted to learn Spanish. Enrolled in an evening class, lasted three sessions before the pace and the teaching style drove me away. I'm not criticising the teacher — just not how I learn. I found a combination of an app, podcasts, and a language exchange partner far more effective. Within a year I was having basic conversations. I think adults have the advantage that we know how we learn — if you use that knowledge and pick the right tools, it's possible to progress faster than in a traditional classroom.",
          answer: 'D',
          explanation: 'Online resources and apps were more useful than the class.'
        }
      ]
    }
  ];

  // ─── Public API ────────────────────────────────────────────────────────────
  return {
    getPart1Extracts() { return part1Extracts; },
    getPart2Tracks() { return part2Tracks; },
    getPart3Tracks() { return part3Tracks; },
    getPart4Tracks() { return part4Tracks; },
    getAllParts() {
      return [
        { num: 1, label: 'Part 1 — Short Extracts', icon: '🔊', desc: '3 short extracts. Choose the best answer from A, B, C, or D.', count: part1Extracts.length },
        { num: 2, label: 'Part 2 — Sentence Completion', icon: '✍️', desc: 'Monologue. Complete 7 sentences with a word or short phrase.', count: part2Tracks.length },
        { num: 3, label: 'Part 3 — Long Text Interview', icon: '🎙️', desc: 'Longer interview. Answer 4 multiple-choice questions.', count: part3Tracks.length },
        { num: 4, label: 'Part 4 — Multiple Matching', icon: '🗂️', desc: '5 short monologues. Match each speaker to a statement.', count: part4Tracks.length }
      ];
    }
  };

})();
