/**
 * EnglishPath — TOEIC Listening Data
 * Fase 14b: Practice Listening Parts 1–4
 * Part 1: Photograph Description (6 sets)
 * Part 2: Question-Response (10 sets)
 * Part 3: Short Conversations (4 sets, 3 questions each)
 * Part 4: Short Talks (4 sets, 3 questions each)
 */

const TOEICListeningData = (() => {

  // ─── PART 1: Photograph Description ──────────────────────────
  // Each item: TTS description (spoken), 4 choices, correct answer
  const part1 = [
    {
      id: 'p1_01',
      imageDesc: 'A man standing at a whiteboard in a meeting room, pointing at a chart.',
      ttsPrompt: 'Look at the photograph. Choose the statement that best describes what you see.',
      choices: [
        'A man is writing on a whiteboard.',
        'A man is pointing at a chart on the wall.',
        'A man is sitting at a conference table.',
        'A man is erasing information from the board.'
      ],
      answer: 1,
      explanation: 'The man is pointing at a chart, not writing, sitting, or erasing.'
    },
    {
      id: 'p1_02',
      imageDesc: 'Two women reviewing documents at a desk, one holding a pen.',
      ttsPrompt: 'Look at the photograph. Choose the statement that best describes what you see.',
      choices: [
        'The women are having lunch at a restaurant.',
        'One woman is reviewing documents while the other takes notes.',
        'The women are shaking hands across a table.',
        'One woman is presenting to an audience.'
      ],
      answer: 1,
      explanation: 'They are reviewing documents; one holds a pen to take notes.'
    },
    {
      id: 'p1_03',
      imageDesc: 'A warehouse with shelves stacked with boxes; a worker is operating a forklift.',
      ttsPrompt: 'Look at the photograph. Choose the statement that best describes what you see.',
      choices: [
        'Workers are loading boxes into a truck.',
        'A worker is operating a forklift among shelves of boxes.',
        'The shelves are empty and being cleaned.',
        'Boxes are being unpacked on the floor.'
      ],
      answer: 1,
      explanation: 'A forklift operator is working among shelves stacked with boxes.'
    },
    {
      id: 'p1_04',
      imageDesc: 'A woman at an airport check-in counter, handing documents to a staff member.',
      ttsPrompt: 'Look at the photograph. Choose the statement that best describes what you see.',
      choices: [
        'A woman is buying a plane ticket at a kiosk.',
        'A woman is boarding an airplane.',
        'A woman is handing documents to airport staff at a counter.',
        'A woman is waiting in line at a security checkpoint.'
      ],
      answer: 2,
      explanation: 'She is at a check-in counter handing documents — likely her passport or boarding pass.'
    },
    {
      id: 'p1_05',
      imageDesc: 'Several people gathered around a table in a restaurant; food and drinks are visible.',
      ttsPrompt: 'Look at the photograph. Choose the statement that best describes what you see.',
      choices: [
        'People are sitting around a table with food and drinks.',
        'A chef is serving food to customers at the bar.',
        'Waiters are clearing the table after a meal.',
        'A group is standing in a line to pay the bill.'
      ],
      answer: 0,
      explanation: 'The photograph shows people seated with food and drinks on the table.'
    },
    {
      id: 'p1_06',
      imageDesc: 'A man in a suit talking on a phone while walking through an office hallway.',
      ttsPrompt: 'Look at the photograph. Choose the statement that best describes what you see.',
      choices: [
        'A man is answering emails at his desk.',
        'A man is walking and talking on the phone in an office hallway.',
        'A man is giving a presentation in the hallway.',
        'A man is leaving the office with his briefcase.'
      ],
      answer: 1,
      explanation: 'He is walking and using his phone in a corridor — not sitting or presenting.'
    }
  ];

  // ─── PART 2: Question-Response ────────────────────────────────
  // Each item: a question (spoken) + 3 responses, correct answer
  const part2 = [
    {
      id: 'p2_01',
      question: "When does the quarterly report need to be submitted?",
      choices: [
        "By Friday at five o'clock.",
        "It's on the third floor.",
        "Yes, the manager approved it."
      ],
      answer: 0,
      explanation: "The question asks 'when', so the correct answer gives a time/deadline."
    },
    {
      id: 'p2_02',
      question: "Who is responsible for ordering office supplies?",
      choices: [
        "In the storage room.",
        "Lisa from the admin team handles that.",
        "We ordered them last Tuesday."
      ],
      answer: 1,
      explanation: "The question asks 'who', so naming a person (Lisa) is the correct response."
    },
    {
      id: 'p2_03',
      question: "Could you reschedule tomorrow's meeting to Thursday?",
      choices: [
        "Thursday is fine with me.",
        "The meeting room is on the second floor.",
        "Yes, we met last Thursday."
      ],
      answer: 0,
      explanation: "Agreeing to reschedule to Thursday directly answers the request."
    },
    {
      id: 'p2_04',
      question: "Have the new product samples arrived yet?",
      choices: [
        "The samples are very affordable.",
        "No, they're expected by Wednesday.",
        "I arrived early this morning."
      ],
      answer: 1,
      explanation: "'Have they arrived yet?' expects a yes/no + timing response."
    },
    {
      id: 'p2_05',
      question: "Why was the client presentation postponed?",
      choices: [
        "The presentation was excellent.",
        "Because the lead designer was traveling.",
        "To the main conference room."
      ],
      answer: 1,
      explanation: "'Why' requires a reason — the designer was traveling."
    },
    {
      id: 'p2_06',
      question: "Where should I send the signed contract?",
      choices: [
        "The contract was signed yesterday.",
        "I'll sign it by end of day.",
        "Email it directly to our legal department."
      ],
      answer: 2,
      explanation: "'Where' needs a location or method — emailing legal dept. answers this."
    },
    {
      id: 'p2_07',
      question: "How many people attended the training session?",
      choices: [
        "About twenty-five employees.",
        "The session was very informative.",
        "It was held in the main auditorium."
      ],
      answer: 0,
      explanation: "'How many' requires a number — approximately twenty-five."
    },
    {
      id: 'p2_08',
      question: "Should we hire an external consultant for this project?",
      choices: [
        "I hired someone from the consulting firm.",
        "That might be worth considering given our tight timeline.",
        "The project was completed on schedule."
      ],
      answer: 1,
      explanation: "A suggestion ('might be worth considering') is the appropriate response to 'should we'."
    },
    {
      id: 'p2_09',
      question: "Didn't the marketing team already review the proposal?",
      choices: [
        "Yes, they submitted their feedback this morning.",
        "I'll review it after lunch.",
        "The proposal is very detailed."
      ],
      answer: 0,
      explanation: "Confirming the review with additional detail (feedback submitted) is correct."
    },
    {
      id: 'p2_10',
      question: "I heard we're getting a new IT system next month.",
      choices: [
        "I was hired last month.",
        "Really? I wasn't aware of that.",
        "The IT department is on the fourth floor."
      ],
      answer: 1,
      explanation: "This is a statement, not a question. Expressing surprise/unawareness is a natural response."
    }
  ];

  // ─── PART 3: Short Conversations ─────────────────────────────
  const part3 = [
    {
      id: 'p3_01',
      title: 'Conversation 1 — Arranging a Client Visit',
      ttsRate: 0.88,
      audio: [
        { speaker: 0, label: 'Woman', text: "Hi Jason, I just heard back from the Regal Dynamics team. They want to come in for a site visit next week." },
        { speaker: 1, label: 'Man', text: "That's great news! Which day works for them?" },
        { speaker: 0, label: 'Woman', text: "They suggested Tuesday or Wednesday morning. I'm thinking Wednesday would be easier since the conference room is free all day." },
        { speaker: 1, label: 'Man', text: "Wednesday works for me too. Should I prepare a presentation on our new product line?" },
        { speaker: 0, label: 'Woman', text: "Yes, and I'll ask Karen to coordinate the catering. Can you send me your slide deck by Monday so I can review it?" },
        { speaker: 1, label: 'Man', text: "No problem. I'll have it ready by Monday afternoon." }
      ],
      questions: [
        {
          id: 'p3_01_q1',
          question: 'What is being planned?',
          choices: ['A product launch event', 'A client site visit', 'A staff training session', 'An annual general meeting'],
          answer: 1
        },
        {
          id: 'p3_01_q2',
          question: 'Why does the woman prefer Wednesday?',
          choices: ['It is closer to the weekend', 'The conference room is available all day', 'The client requested Wednesday specifically', 'The man is free only on Wednesday'],
          answer: 1
        },
        {
          id: 'p3_01_q3',
          question: 'What does the woman ask the man to do by Monday?',
          choices: ['Book the conference room', 'Confirm the client's attendance', 'Send his presentation slides', 'Arrange the catering'],
          answer: 2
        }
      ]
    },
    {
      id: 'p3_02',
      title: 'Conversation 2 — Budget Discussion',
      ttsRate: 0.88,
      audio: [
        { speaker: 0, label: 'Man', text: "Sarah, I've been looking at the Q3 budget report. Our marketing expenses are about 15% over the approved limit." },
        { speaker: 1, label: 'Woman', text: "I know — we ran two extra campaigns in August due to the product relaunch. I think we need to request an additional allocation." },
        { speaker: 0, label: 'Man', text: "I agree. Do you want to prepare a justification report for the finance committee?" },
        { speaker: 1, label: 'Woman', text: "I can do that. I'll outline the campaigns, the results, and the return on investment. Would you be able to support the request in the meeting?" },
        { speaker: 0, label: 'Man', text: "Absolutely. Let's schedule a pre-meeting call first so we're aligned on the figures." },
        { speaker: 1, label: 'Woman', text: "Perfect. How about Thursday at 10?" }
      ],
      questions: [
        {
          id: 'p3_02_q1',
          question: 'What is the problem mentioned?',
          choices: ['The marketing team missed a deadline', 'Marketing expenses exceeded the approved budget', 'The product relaunch was cancelled', 'The finance committee rejected their proposal'],
          answer: 1
        },
        {
          id: 'p3_02_q2',
          question: 'What will Sarah prepare?',
          choices: ['A new marketing campaign', 'A justification report for the finance committee', 'A quarterly budget forecast', 'A product relaunch plan'],
          answer: 1
        },
        {
          id: 'p3_02_q3',
          question: 'What do they agree to do before the main meeting?',
          choices: ['Submit the report early', 'Have a call to align on figures', 'Email the finance committee', 'Reduce marketing spend immediately'],
          answer: 1
        }
      ]
    },
    {
      id: 'p3_03',
      title: 'Conversation 3 — Delivery Issue',
      ttsRate: 0.88,
      audio: [
        { speaker: 0, label: 'Woman', text: "Hello, this is Anne from Brookfield Technologies. I'm calling about order number BT-4421. It was supposed to arrive yesterday but we haven't received it yet." },
        { speaker: 1, label: 'Man', text: "I'm sorry to hear that, Ms. Anne. Let me check our system. Can you hold for a moment?" },
        { speaker: 0, label: 'Woman', text: "Of course." },
        { speaker: 1, label: 'Man', text: "Thank you for holding. I can see here that the shipment was delayed due to a logistics issue at the distribution centre. It's now scheduled for delivery tomorrow morning." },
        { speaker: 0, label: 'Woman', text: "That's frustrating. We needed those components today for our production line." },
        { speaker: 1, label: 'Man', text: "I completely understand. I can arrange for an express courier as a priority delivery if that would help — it would arrive by this afternoon." },
        { speaker: 0, label: 'Woman', text: "Yes, please do that. And I'd appreciate a confirmation email once it's dispatched." }
      ],
      questions: [
        {
          id: 'p3_03_q1',
          question: 'Why is the woman calling?',
          choices: ['To place a new order', 'To report a missing invoice', 'To follow up on a delayed shipment', 'To cancel an existing order'],
          answer: 2
        },
        {
          id: 'p3_03_q2',
          question: 'What caused the delay?',
          choices: ['A shortage of components', 'A logistics issue at the distribution centre', 'Bad weather conditions', 'An incorrect delivery address'],
          answer: 1
        },
        {
          id: 'p3_03_q3',
          question: 'What does the woman request at the end?',
          choices: ['A full refund', 'A discount on the order', 'Express delivery and a confirmation email', 'The order to be cancelled and re-placed'],
          answer: 2
        }
      ]
    },
    {
      id: 'p3_04',
      title: 'Conversation 4 — Job Interview Follow-Up',
      ttsRate: 0.88,
      audio: [
        { speaker: 0, label: 'Man', text: "Hi Ms. Kim, this is David from Halcyon Recruitment. I wanted to follow up on your interview with our client last Thursday." },
        { speaker: 1, label: 'Woman', text: "Oh yes, thank you for calling. How did it go from their side?" },
        { speaker: 0, label: 'Man', text: "I have good news — they were very impressed with your experience in supply chain management and your leadership examples." },
        { speaker: 1, label: 'Woman', text: "That's wonderful to hear!" },
        { speaker: 0, label: 'Man', text: "They'd like to invite you for a second interview. This time it will be with the operations director and will include a short case study exercise." },
        { speaker: 1, label: 'Woman', text: "I'm happy to proceed. What dates are they suggesting?" },
        { speaker: 0, label: 'Man', text: "They have availability next Tuesday or Thursday afternoon. They're flexible around your schedule." },
        { speaker: 1, label: 'Woman', text: "Thursday would be better for me. Please confirm that with them." }
      ],
      questions: [
        {
          id: 'p3_04_q1',
          question: 'What is the main purpose of this conversation?',
          choices: ['To schedule a first interview', 'To inform the woman about the outcome of her interview', 'To offer her a job position', 'To request her CV and references'],
          answer: 1
        },
        {
          id: 'p3_04_q2',
          question: 'What will the second interview include?',
          choices: ['A written English test', 'A group discussion', 'A case study exercise', 'A technical skills assessment'],
          answer: 2
        },
        {
          id: 'p3_04_q3',
          question: 'Which day does the woman prefer for the second interview?',
          choices: ['Tuesday morning', 'Wednesday afternoon', 'Thursday afternoon', 'Friday morning'],
          answer: 2
        }
      ]
    }
  ];

  // ─── PART 4: Short Talks ──────────────────────────────────────
  const part4 = [
    {
      id: 'p4_01',
      title: 'Talk 1 — Office Announcement',
      ttsRate: 0.86,
      audio: [
        {
          speaker: 0, label: 'Announcer',
          text: "Good morning, everyone. I'd like to make a brief announcement about the upcoming office renovation. Starting next Monday, the third and fourth floors will be undergoing electrical and HVAC upgrades. During this period, all staff currently working on those floors will be temporarily relocated to the newly refurbished workspace on the sixth floor. Workstations have already been assigned and you'll receive an email today with your specific desk location. Please note that the move must be completed by Friday afternoon at the latest. Building services will assist with moving equipment. If you have any IT-related concerns, contact the help desk directly. Thank you for your cooperation, and we apologize for any inconvenience during this process."
        }
      ],
      questions: [
        {
          id: 'p4_01_q1',
          question: 'What is the announcement about?',
          choices: ['A new office opening', 'Staff relocation due to renovation', 'A change in working hours', 'A company restructuring plan'],
          answer: 1
        },
        {
          id: 'p4_01_q2',
          question: 'Where will affected staff be temporarily moved?',
          choices: ['To a nearby building', 'To the basement level', 'To the sixth floor', 'To a rented external office'],
          answer: 2
        },
        {
          id: 'p4_01_q3',
          question: 'What should staff do if they have IT concerns?',
          choices: ['Speak to their manager', 'Email the HR department', 'Contact the help desk', 'Submit a written request'],
          answer: 2
        }
      ]
    },
    {
      id: 'p4_02',
      title: 'Talk 2 — Retail Store Message',
      ttsRate: 0.86,
      audio: [
        {
          speaker: 0, label: 'Announcer',
          text: "Welcome to Harrington's Department Store. We're delighted to offer our loyal members an exclusive shopping event this Saturday, from nine in the morning until noon. During this members-only preview, you'll have first access to our new autumn collection, with discounts of up to thirty percent on selected items. Our personal shoppers will be available on all floors to assist you in finding the perfect outfit or gift. Complimentary refreshments will be served on the second floor lounge throughout the morning. Please remember to bring your membership card to gain entry. Not yet a member? Visit our customer service desk on the ground floor to sign up today and receive an instant ten-pound welcome voucher. We look forward to seeing you on Saturday."
        }
      ],
      questions: [
        {
          id: 'p4_02_q1',
          question: 'Who is this message intended for?',
          choices: ['All shoppers passing by', 'Store employees', 'Members of the store loyalty program', 'Suppliers and vendors'],
          answer: 2
        },
        {
          id: 'p4_02_q2',
          question: 'What is offered on the second floor during the event?',
          choices: ['A fashion show', 'Free refreshments', 'A gift wrapping service', 'A personal stylist consultation'],
          answer: 1
        },
        {
          id: 'p4_02_q3',
          question: 'What do non-members receive if they sign up at the event?',
          choices: ['A 30% discount on all items', 'Free entry to the autumn preview', 'A ten-pound welcome voucher', 'A complimentary personal shopping session'],
          answer: 2
        }
      ]
    },
    {
      id: 'p4_03',
      title: 'Talk 3 — Company Training Notice',
      ttsRate: 0.86,
      audio: [
        {
          speaker: 0, label: 'Trainer',
          text: "Thank you all for joining today's orientation session. Over the next three hours, we'll be covering the key systems and procedures you'll use in your roles here at Meridian Financial Group. This morning, we'll start with an overview of our internal communication platform and the document management system. After a fifteen-minute break at eleven o'clock, we'll move on to compliance training, which is mandatory for all new employees. Lunch will be provided in the main cafeteria on the ground floor from twelve-thirty. This afternoon, you'll have the opportunity to meet with your respective department heads and receive your individual training schedules for the coming weeks. If you haven't already submitted your signed onboarding forms, please do so by end of day today to avoid any delays in setting up your system access. We're very glad to have you on board."
        }
      ],
      questions: [
        {
          id: 'p4_03_q1',
          question: 'What type of event is being described?',
          choices: ['A product launch seminar', 'A new employee orientation', 'A management retreat', 'An annual performance review'],
          answer: 1
        },
        {
          id: 'p4_03_q2',
          question: 'What happens at eleven o'clock?',
          choices: ['Lunch is served', 'Compliance training begins after a short break', 'Department head meetings start', 'System access is set up'],
          answer: 1
        },
        {
          id: 'p4_03_q3',
          question: 'What must new employees submit by the end of the day?',
          choices: ['Their department preferences', 'Their signed onboarding forms', 'A training schedule proposal', 'Their identification documents'],
          answer: 1
        }
      ]
    },
    {
      id: 'p4_04',
      title: 'Talk 4 — Telephone Recorded Message',
      ttsRate: 0.86,
      audio: [
        {
          speaker: 0, label: 'Recording',
          text: "Thank you for calling Pinnacle Property Management. Our offices are currently closed. Our regular business hours are Monday through Friday, eight-thirty in the morning to five-thirty in the evening. If you are calling about a maintenance emergency, please press one and you will be connected to our twenty-four-hour emergency line. For general enquiries about available properties, please press two to leave a message and a member of our lettings team will return your call within one business day. If you are an existing tenant and have a question about your lease or payments, please press three. To speak with someone regarding commercial property opportunities, please press four. You can also visit our website at pinnacleproperty dot co dot uk for listings, virtual tours, and downloadable application forms. We apologize for any inconvenience and look forward to assisting you."
        }
      ],
      questions: [
        {
          id: 'p4_04_q1',
          question: 'What type of business recorded this message?',
          choices: ['A bank', 'A property management company', 'An insurance firm', 'A law office'],
          answer: 1
        },
        {
          id: 'p4_04_q2',
          question: 'What should a caller do in case of a maintenance emergency?',
          choices: ['Visit the office in person', 'Send an email to the support team', 'Press one to reach the emergency line', 'Wait until business hours to call back'],
          answer: 2
        },
        {
          id: 'p4_04_q3',
          question: 'What can callers find on the company website?',
          choices: ['Office directions and parking details', 'Listings, virtual tours, and application forms', 'Staff contact information and biographies', 'Details about upcoming property auctions'],
          answer: 1
        }
      ]
    }
  ];

  return {
    getPart1() { return part1; },
    getPart2() { return part2; },
    getPart3() { return part3; },
    getPart4() { return part4; },
    getPart(n) {
      const map = { 1: part1, 2: part2, 3: part3, 4: part4 };
      return map[n] || [];
    },
    getPartInfo() {
      return [
        {
          num: 1, key: 'part1',
          title: 'Part 1: Photograph Description',
          titleID: 'Deskripsi Foto',
          icon: '🖼️',
          desc: 'Listen to 4 statements about a photograph and choose the one that best describes it.',
          descID: 'Dengarkan 4 pernyataan tentang foto dan pilih yang paling sesuai.',
          count: part1.length,
          realCount: '6 soal (dalam tes nyata)',
          tips: 'Focus on the main subject and action. Watch out for statements that are partially true but not the best description.'
        },
        {
          num: 2, key: 'part2',
          title: 'Part 2: Question-Response',
          titleID: 'Tanya-Jawab',
          icon: '💬',
          desc: 'Listen to a question and three responses. Choose the most appropriate response.',
          descID: 'Dengarkan pertanyaan dan tiga respons. Pilih respons yang paling tepat.',
          count: part2.length,
          realCount: '25 soal (dalam tes nyata)',
          tips: 'Pay attention to question words (who, what, when, where, why, how). Eliminate obviously wrong answers first.'
        },
        {
          num: 3, key: 'part3',
          title: 'Part 3: Short Conversations',
          titleID: 'Percakapan Singkat',
          icon: '🗣️',
          desc: 'Listen to a conversation between two or three speakers, then answer 3 questions.',
          descID: 'Dengarkan percakapan antara dua atau tiga pembicara, lalu jawab 3 pertanyaan.',
          count: part3.length,
          realCount: '13 percakapan (39 soal) (dalam tes nyata)',
          tips: 'Read the questions before listening. Focus on purpose, problem, and outcome of the conversation.'
        },
        {
          num: 4, key: 'part4',
          title: 'Part 4: Short Talks',
          titleID: 'Monolog Singkat',
          icon: '📢',
          desc: 'Listen to a short monologue (announcement, message, advertisement) and answer 3 questions.',
          descID: 'Dengarkan monolog singkat (pengumuman, pesan, iklan) dan jawab 3 pertanyaan.',
          count: part4.length,
          realCount: '10 monolog (30 soal) (dalam tes nyata)',
          tips: 'Identify the speaker and context immediately. Listen for specific numbers, names, and action items.'
        }
      ];
    }
  };

})();
