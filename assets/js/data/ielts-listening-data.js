/**
 * EnglishPath — IELTS Listening Data
 * Fase 13b: 4 Sections (TTS audio simulation)
 * Section 1: Conversation (social), Section 2: Monologue (social)
 * Section 3: Conversation (academic), Section 4: Lecture
 */

const IELTSListeningData = (() => {

  const sections = [
    // ─── SECTION 1: Social Conversation ───────────────────
    {
      id: 's1',
      section: 1,
      type: 'conversation',
      title: 'Section 1 — Registering for a Sports Centre',
      description: 'A conversation between a new member and a receptionist at a sports centre.',
      ttsRate: 0.88,
      speakers: ['Receptionist (Julia)', 'Customer (Marcus)'],
      audio: [
        { speaker: 0, text: "Good morning, welcome to Westfield Sports Centre. How can I help you?" },
        { speaker: 1, text: "Hi, I'd like to join as a member, please." },
        { speaker: 0, text: "Of course! I'll need to take some details. Can I start with your full name?" },
        { speaker: 1, text: "It's Marcus Adeyemi. That's A-D-E-Y-E-M-I." },
        { speaker: 0, text: "Thank you. And your date of birth?" },
        { speaker: 1, text: "Fifteenth of March, 1995." },
        { speaker: 0, text: "Great. What's your home address?" },
        { speaker: 1, text: "Flat 14, Birchwood House, 32 Langton Road, Southgate." },
        { speaker: 0, text: "And the postcode?" },
        { speaker: 1, text: "N14 6BQ." },
        { speaker: 0, text: "Perfect. Now, there are three membership types. The Standard Membership is 35 pounds a month and gives you access to the gym, swimming pool, and group exercise classes." },
        { speaker: 1, text: "What about the other options?" },
        { speaker: 0, text: "The Premium Membership is 50 pounds a month. That includes everything in Standard, plus access to our spa facilities, one personal training session per month, and free towel hire every visit." },
        { speaker: 1, text: "And the third option?" },
        { speaker: 0, text: "Off-Peak Membership is 22 pounds a month, but you can only visit before 4 pm on weekdays and you're not included in weekend access." },
        { speaker: 1, text: "I think I'll go for the Standard. I don't really need the spa." },
        { speaker: 0, text: "Good choice for a first membership! Now, would you like to set up a direct debit, or pay by card each month?" },
        { speaker: 1, text: "Direct debit is fine." },
        { speaker: 0, text: "And which facilities are you most interested in using?" },
        { speaker: 1, text: "Mainly the gym and maybe the swimming pool occasionally. I'm hoping to start attending a spinning class too, if there's space." },
        { speaker: 0, text: "Spinning is very popular! You'll need to book those in advance online or through our app. They fill up quickly, especially Tuesday and Thursday evenings." },
        { speaker: 1, text: "Good to know. What are the centre's opening hours?" },
        { speaker: 0, text: "We're open Monday to Friday from 6 in the morning until 10 at night. Weekends, we open at 7 and close at 8. On bank holidays, we operate reduced hours — usually 9 until 5." },
        { speaker: 1, text: "That works well for me. Is there parking on site?" },
        { speaker: 0, text: "Yes, there's a car park with 80 spaces. The first two hours are free with your membership card. After that it's one pound fifty per hour." },
        { speaker: 1, text: "Brilliant. Anything else I need to know?" },
        { speaker: 0, text: "Just bring a padlock for the lockers — we don't provide them. And you'll receive a welcome pack by email within 24 hours with your membership number and a guide to all our facilities." }
      ],
      questions: [
        {
          id: 's1_q1',
          type: 'form',
          question: 'Complete the registration form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          label: 'Last name of customer:',
          answer: 'Adeyemi',
          hint: 'The customer spells out their surname.'
        },
        {
          id: 's1_q2',
          type: 'form',
          label: 'Date of birth:',
          answer: '15th March 1995',
          hint: 'Listen for the date mentioned.'
        },
        {
          id: 's1_q3',
          type: 'form',
          label: 'Flat number:',
          answer: '14',
          hint: 'Part of the address.'
        },
        {
          id: 's1_q4',
          type: 'form',
          label: 'Postcode:',
          answer: 'N14 6BQ',
          hint: 'Spelled out by the customer.'
        },
        {
          id: 's1_q5',
          type: 'mcq',
          question: 'Which membership type does Marcus choose?',
          options: ['Premium Membership (£50/month)', 'Standard Membership (£35/month)', 'Off-Peak Membership (£22/month)'],
          answer: 1,
          explanation: 'Marcus says "I\'ll go for the Standard. I don\'t really need the spa."'
        },
        {
          id: 's1_q6',
          type: 'mcq',
          question: 'How will Marcus pay for his membership?',
          options: ['By card each month', 'By direct debit', 'By cash at reception'],
          answer: 1,
          explanation: '"Direct debit is fine."'
        },
        {
          id: 's1_q7',
          type: 'mcq',
          question: 'When are spinning classes described as most popular?',
          options: ['Monday and Wednesday evenings', 'Tuesday and Thursday evenings', 'Saturday and Sunday mornings'],
          answer: 1,
          explanation: '"They fill up quickly, especially Tuesday and Thursday evenings."'
        },
        {
          id: 's1_q8',
          type: 'mcq',
          question: 'What are the weekend opening hours?',
          options: ['6 am to 10 pm', '7 am to 9 pm', '7 am to 8 pm'],
          answer: 2,
          explanation: '"Weekends, we open at 7 and close at 8."'
        },
        {
          id: 's1_q9',
          type: 'mcq',
          question: 'How long is parking free with a membership card?',
          options: ['One hour', 'Two hours', 'Three hours'],
          answer: 1,
          explanation: '"The first two hours are free with your membership card."'
        },
        {
          id: 's1_q10',
          type: 'form',
          label: 'Item members must bring for lockers:',
          answer: 'padlock',
          hint: 'Something members must supply themselves.'
        }
      ]
    },

    // ─── SECTION 2: Social Monologue ──────────────────────
    {
      id: 's2',
      section: 2,
      type: 'monologue',
      title: 'Section 2 — A Talk About Volunteering Opportunities',
      description: 'A community coordinator gives a talk about volunteering opportunities in the city.',
      ttsRate: 0.85,
      speakers: ['Community Coordinator (Helen)'],
      audio: [
        { speaker: 0, text: "Good evening, everyone, and welcome to our monthly Volunteer Information Session. My name's Helen, and I'm the Community Volunteer Coordinator for the Northampton Volunteer Network. Tonight I want to tell you about some of the exciting opportunities available across the city for anyone who'd like to get involved in volunteering." },
        { speaker: 0, text: "Let me start by giving you a quick overview. Our network currently supports over 120 partner organisations — from hospitals and schools to environmental charities and arts groups. We match volunteers with roles that suit their skills, interests, and availability. Whether you can give one hour a week or two full days a month, there's something for you." },
        { speaker: 0, text: "Let me highlight a few current opportunities. First, we urgently need reading mentors for our Literacy Boost programme. This involves visiting a primary school once a week to read one-to-one with children aged 6 to 8 who are struggling with reading. The commitment is just one hour per session, and training is provided — no teaching qualification is needed. Schools involved are all within the NN1 and NN3 postcode areas." },
        { speaker: 0, text: "Second, there's a fantastic opportunity with the Riverside Conservation Trust. They're looking for volunteers to help maintain their 15 kilometres of riverside footpaths and wildlife habitats. This is outdoor work — clearing vegetation, repairing path surfaces, and planting native species. Most sessions run on Saturday mornings, 9 until 12, and you should be comfortable with moderate physical activity." },
        { speaker: 0, text: "Third, for those with a background in healthcare or a caring profession, St Anne's Hospice is seeking volunteer companions. These volunteers visit patients who would benefit from social contact, providing conversation and light activities such as reading aloud, playing cards, or doing puzzles. This is a genuinely rewarding role, but we ask that volunteers commit to at least one shift per fortnight and are comfortable in an end-of-life care environment." },
        { speaker: 0, text: "Now I want to mention a larger one-off opportunity. Every September, we run the annual Northampton Heritage Festival. We need around 200 volunteers over the three-day event to act as guides, stewards, and information point staff. It's a brilliant opportunity to learn about the city's history, meet new people, and gain event management experience. Last year's festival attracted over 14,000 visitors. Applications open in June." },
        { speaker: 0, text: "To register your interest in any of these roles, you can visit our website at volunteernorthampton.org, call our offices between 9 and 5 Monday to Friday, or pick up a paper form at the back of this room tonight. All volunteers receive a reference letter after completing 50 hours of service, and you'll be added to our training and development programme, which includes workshops on communication, safeguarding, and first aid." },
        { speaker: 0, text: "I'd also like to mention our Employer Supported Volunteering scheme. If your company gives you paid time off for volunteering, we can help you identify roles that match your professional skills — particularly useful for those working in IT, marketing, or legal services. Several local businesses, including Hartley Insurance and Greenfield Consulting, already participate. I have leaflets available if you'd like more information on that." },
        { speaker: 0, text: "After my presentation, there'll be a chance to speak to representatives from six of our partner organisations who are here tonight. Do take the opportunity to ask questions and find out more about the specific roles. Refreshments will be available from 8 o'clock in the side room. Thank you for your time and interest — it genuinely makes a difference." }
      ],
      questions: [
        {
          id: 's2_q1',
          type: 'mcq',
          question: 'How many partner organisations does the Northampton Volunteer Network support?',
          options: ['Over 80', 'Over 100', 'Over 120'],
          answer: 2,
          explanation: '"Our network currently supports over 120 partner organisations."'
        },
        {
          id: 's2_q2',
          type: 'form',
          label: 'Age group of children in the Literacy Boost programme:',
          answer: '6 to 8',
          hint: 'Children in primary school.'
        },
        {
          id: 's2_q3',
          type: 'mcq',
          question: 'What type of work does the Riverside Conservation Trust volunteering involve?',
          options: ['Teaching environmental science in schools', 'Outdoor path maintenance and habitat work', 'Organising fundraising events for conservation'],
          answer: 1,
          explanation: '"clearing vegetation, repairing path surfaces, and planting native species."'
        },
        {
          id: 's2_q4',
          type: 'mcq',
          question: 'What is required of St Anne\'s Hospice volunteer companions?',
          options: [
            'A healthcare qualification',
            'Commitment to at least one shift per fortnight',
            'Previous experience in end-of-life care'
          ],
          answer: 1,
          explanation: '"we ask that volunteers commit to at least one shift per fortnight."'
        },
        {
          id: 's2_q5',
          type: 'form',
          label: 'Number of volunteers needed for the Heritage Festival:',
          answer: '200',
          hint: 'An approximate number is given.'
        },
        {
          id: 's2_q6',
          type: 'mcq',
          question: 'When do applications for the Heritage Festival open?',
          options: ['April', 'May', 'June'],
          answer: 2,
          explanation: '"Applications open in June."'
        },
        {
          id: 's2_q7',
          type: 'mcq',
          question: 'After how many hours of service do volunteers receive a reference letter?',
          options: ['25 hours', '50 hours', '100 hours'],
          answer: 1,
          explanation: '"All volunteers receive a reference letter after completing 50 hours of service."'
        },
        {
          id: 's2_q8',
          type: 'form',
          label: 'One training topic mentioned in the development programme:',
          answer: 'safeguarding',
          hint: 'Three topics are mentioned — any is acceptable.'
        },
        {
          id: 's2_q9',
          type: 'mcq',
          question: 'Which company is mentioned as participating in the Employer Supported Volunteering scheme?',
          options: ['Northampton Finance Group', 'Hartley Insurance', 'Greenfield Solutions'],
          answer: 1,
          explanation: '"Hartley Insurance and Greenfield Consulting already participate."'
        },
        {
          id: 's2_q10',
          type: 'mcq',
          question: 'Where will refreshments be available after the presentation?',
          options: ['In the main hall', 'In the side room from 8 o\'clock', 'In the lobby from 7:30'],
          answer: 1,
          explanation: '"Refreshments will be available from 8 o\'clock in the side room."'
        }
      ]
    },

    // ─── SECTION 3: Academic Conversation ─────────────────
    {
      id: 's3',
      section: 3,
      type: 'conversation',
      title: 'Section 3 — Discussing a Research Project on Urban Biodiversity',
      description: 'Two students, Priya and Callum, discuss their research project with their tutor, Dr Mathers.',
      ttsRate: 0.87,
      speakers: ['Dr Mathers (Tutor)', 'Priya (Student)', 'Callum (Student)'],
      audio: [
        { speaker: 0, text: "Right, let's talk about your project on urban biodiversity. You've submitted your initial research plan, and overall it's a solid foundation. Where are you with your data collection?" },
        { speaker: 1, text: "We've completed the field surveys in four of the six parks we selected. Each survey involved recording all plant species, insect populations using pitfall traps, and bird sightings using point count methods." },
        { speaker: 0, text: "Good. And have you encountered any methodological challenges?" },
        { speaker: 2, text: "The main issue has been inconsistency in weather conditions during the surveys. Two of the parks were surveyed on overcast days, which significantly affects insect activity and bird behaviour. It makes direct comparison tricky." },
        { speaker: 0, text: "That's a genuine limitation you'll need to address in your methodology section. Have you considered how you'll account for it statistically?" },
        { speaker: 2, text: "We were thinking of using weather data from the Met Office for each survey day as a covariate in our analysis. That should help control for the variation." },
        { speaker: 0, text: "That's a sensible approach. What about the plant species data — are you identifying to species level, or just recording genus?" },
        { speaker: 1, text: "Species level where possible, but for the grasses and some of the sedges, we've only been able to get to genus level. We don't have the expertise, and the identification keys are quite specialist." },
        { speaker: 0, text: "That's understandable. You might want to consult with someone from the Botany department. I believe Dr Kapoor has expertise in native grassland species and sometimes collaborates with student projects." },
        { speaker: 1, text: "That would be really helpful — thank you. One thing we're debating is whether to include the parks in the industrial zone in our main analysis or treat them as a separate category. Their pollution levels are quite different." },
        { speaker: 0, text: "What does the literature say about urban biodiversity in high-pollution environments?" },
        { speaker: 2, text: "It's mixed. Some studies show dramatic species reduction, but others suggest certain generalist species actually thrive in disturbed urban environments. The work by Aronson et al. from 2014 found that park size was actually a better predictor of diversity than pollution levels in most cases." },
        { speaker: 0, text: "Interesting. I think you could keep them in the main analysis but include pollution index as an additional variable — rather than artificially separating your dataset. You'd lose statistical power if you split the sample further." },
        { speaker: 1, text: "That makes sense. We've also been thinking about the write-up. We want to make sure our discussion addresses the policy implications, especially around green infrastructure planning." },
        { speaker: 0, text: "Good thinking. Urban biodiversity research is increasingly being used to inform planning decisions. Make sure you engage with current UK planning policy — the National Planning Policy Framework revised in 2023 has specific provisions on biodiversity net gain that would be very relevant." },
        { speaker: 2, text: "We're planning to have a draft discussion section ready by the end of next week. Would it be possible to get feedback before the final submission?" },
        { speaker: 0, text: "I can look at a draft, yes. Send it by Friday the fourteenth and I'll try to return comments within three working days. Remember the final submission date is the twenty-eighth — that gives you just over a week to incorporate feedback." }
      ],
      questions: [
        {
          id: 's3_q1',
          type: 'mcq',
          question: 'How many of the six parks have been surveyed so far?',
          options: ['Three', 'Four', 'Five'],
          answer: 1,
          explanation: '"We\'ve completed the field surveys in four of the six parks."'
        },
        {
          id: 's3_q2',
          type: 'mcq',
          question: 'What is the main methodological challenge Callum identifies?',
          options: [
            'Lack of funding for equipment',
            'Inconsistent weather conditions during surveys',
            'Difficulty accessing some park areas'
          ],
          answer: 1,
          explanation: '"The main issue has been inconsistency in weather conditions during the surveys."'
        },
        {
          id: 's3_q3',
          type: 'mcq',
          question: 'How do the students plan to account for weather variation statistically?',
          options: [
            'By repeating all surveys in consistent conditions',
            'By using weather data as a covariate in the analysis',
            'By excluding the two surveys done on overcast days'
          ],
          answer: 1,
          explanation: '"using weather data from the Met Office for each survey day as a covariate in our analysis."'
        },
        {
          id: 's3_q4',
          type: 'mcq',
          question: 'Why have the students struggled with identifying some plant species?',
          options: [
            'The plants were found in a protected area.',
            'They lack expertise and the identification keys are specialist.',
            'The species are not found in standard botanical databases.'
          ],
          answer: 1,
          explanation: '"We don\'t have the expertise, and the identification keys are quite specialist."'
        },
        {
          id: 's3_q5',
          type: 'form',
          label: 'Name of academic who may help identify grassland species:',
          answer: 'Dr Kapoor',
          hint: 'Dr Mathers suggests a colleague.'
        },
        {
          id: 's3_q6',
          type: 'mcq',
          question: 'According to Aronson et al. (2014), what was the best predictor of biodiversity in urban parks?',
          options: ['Pollution levels', 'Park size', 'Proximity to water'],
          answer: 1,
          explanation: '"park size was actually a better predictor of diversity than pollution levels."'
        },
        {
          id: 's3_q7',
          type: 'mcq',
          question: 'What does Dr Mathers recommend regarding parks in the industrial zone?',
          options: [
            'Exclude them from the analysis entirely',
            'Treat them as a completely separate study',
            'Include them with pollution index as an additional variable'
          ],
          answer: 2,
          explanation: '"include pollution index as an additional variable — rather than artificially separating your dataset."'
        },
        {
          id: 's3_q8',
          type: 'mcq',
          question: 'What policy document does Dr Mathers suggest the students should engage with?',
          options: [
            'The UK Biodiversity Strategy 2022',
            'The National Planning Policy Framework revised in 2023',
            'The Urban Greening Factor Guidelines 2021'
          ],
          answer: 1,
          explanation: '"the National Planning Policy Framework revised in 2023 has specific provisions on biodiversity net gain."'
        },
        {
          id: 's3_q9',
          type: 'form',
          label: 'Deadline for submitting draft discussion section:',
          answer: 'Friday the fourteenth',
          hint: 'A specific date is mentioned.'
        },
        {
          id: 's3_q10',
          type: 'mcq',
          question: 'When is the final project submission date?',
          options: ['The fourteenth', 'The twenty-first', 'The twenty-eighth'],
          answer: 2,
          explanation: '"the final submission date is the twenty-eighth."'
        }
      ]
    },

    // ─── SECTION 4: Academic Lecture ──────────────────────
    {
      id: 's4',
      section: 4,
      type: 'lecture',
      title: 'Section 4 — The Origins of Writing Systems',
      description: 'A university lecture on the development of early writing systems.',
      ttsRate: 0.84,
      speakers: ['Lecturer (Professor Chen)'],
      audio: [
        { speaker: 0, text: "Good morning. Today we're going to look at the origins of writing — how and why human beings first developed systems for recording language in a lasting, visual form. This is one of the most significant cognitive and cultural transitions in human history." },
        { speaker: 0, text: "Until relatively recently, it was assumed that writing had a single origin — probably in Mesopotamia — and spread from there to other regions. This diffusionist view has been largely overturned. We now have strong evidence that writing emerged independently in at least three or four distinct locations: in Mesopotamia around 3200 BCE, in ancient Egypt around 3100 BCE, in China around 1200 BCE — though some evidence suggests earlier protosystems — and in Mesoamerica with the Olmec and later Mayan civilisations." },
        { speaker: 0, text: "What drove the invention of writing? The oldest Sumerian writing — the cuneiform script of Mesopotamia — was not, as you might romanticise, poetry or religious texts. It was accounting records. The earliest tablets contain lists of goods: quantities of grain, numbers of livestock, records of labour payments. Writing was invented primarily as a technology for administration and economic record-keeping. As city-states grew and trade networks expanded, oral memory and simple tally systems were no longer adequate to manage complex transactions." },
        { speaker: 0, text: "Early writing systems were not alphabetic. The earliest scripts used logograms — symbols representing whole words or concepts — and later syllabic systems, where each symbol represents a syllable. The Sumerian cuneiform and Egyptian hieroglyphics both began as logographic systems. This is cognitively demanding — users needed to know hundreds or even thousands of distinct symbols. Over time, most complex civilisations shifted toward more economical phonetic systems." },
        { speaker: 0, text: "The alphabetic principle — using a small set of symbols to represent individual speech sounds — is believed to have originated only once, among Semitic-speaking peoples in the ancient Levant, probably around 1800 BCE. This Proto-Sinaitic or Proto-Canaanite script is thought to be the ancestor of virtually all alphabetic writing systems in the world today, including the Greek, Latin, Arabic, and Hebrew alphabets, and ultimately the Devanagari script used for Sanskrit, Hindi, and many other South Asian languages." },
        { speaker: 0, text: "The social control of writing is also significant. In Mesopotamia and Egypt, literacy was largely restricted to scribes — specialist administrators who received years of formal training. Writing was a tool of elite power, used to administer taxes, record laws, and communicate royal decrees. The democratisation of literacy — the gradual spread of reading and writing beyond administrative elites — occurred much later, and was significantly accelerated by technologies such as the printing press in the fifteenth century and, in our own time, digital communication." },
        { speaker: 0, text: "There's also fascinating ongoing debate about writing systems that remain undeciphered. The Indus Valley script, found on thousands of artefacts from the Bronze Age civilisation of South Asia, has not been decoded despite over a century of scholarly effort. Without a bilingual text — like the Rosetta Stone, which unlocked Egyptian hieroglyphics — undeciphered scripts often resist interpretation. Linear A, the ancient Minoan script of Crete, is another example." },
        { speaker: 0, text: "For next week, I'd like you to read the chapter on script typology in our main textbook and look at the primary source readings on the Rosetta Stone discovery. We'll be discussing the decipherment of hieroglyphics in more detail. I also recommend the British Museum's online resources — they have an excellent interactive section on early writing that you'll find genuinely engaging." }
      ],
      questions: [
        {
          id: 's4_q1',
          type: 'mcq',
          question: 'What is the "diffusionist view" of writing that has been largely overturned?',
          options: [
            'Writing spread gradually from lower to higher social classes.',
            'Writing had a single origin and spread to other regions from there.',
            'Writing developed from pictorial art in all civilisations.'
          ],
          answer: 1,
          explanation: '"writing had a single origin — probably in Mesopotamia — and spread from there to other regions. This diffusionist view has been largely overturned."'
        },
        {
          id: 's4_q2',
          type: 'form',
          label: 'Approximate date writing developed in ancient China:',
          answer: '1200 BCE',
          hint: 'The lecturer gives specific dates for each location.'
        },
        {
          id: 's4_q3',
          type: 'mcq',
          question: 'What did the earliest Sumerian writing tablets record?',
          options: [
            'Religious hymns and royal decrees',
            'Historical narratives and poetry',
            'Accounting records of goods and labour'
          ],
          answer: 2,
          explanation: '"The oldest Sumerian writing... was accounting records. lists of goods: quantities of grain, numbers of livestock, records of labour payments."'
        },
        {
          id: 's4_q4',
          type: 'mcq',
          question: 'What is a "logogram"?',
          options: [
            'A symbol representing a single speech sound',
            'A symbol representing a syllable',
            'A symbol representing a whole word or concept'
          ],
          answer: 2,
          explanation: '"logograms — symbols representing whole words or concepts."'
        },
        {
          id: 's4_q5',
          type: 'mcq',
          question: 'When and where is the alphabetic principle believed to have originated?',
          options: [
            'In Mesopotamia around 3200 BCE',
            'Among Semitic peoples in the Levant around 1800 BCE',
            'In Egypt around 3100 BCE'
          ],
          answer: 1,
          explanation: '"The alphabetic principle... is believed to have originated only once, among Semitic-speaking peoples in the ancient Levant, probably around 1800 BCE."'
        },
        {
          id: 's4_q6',
          type: 'form',
          label: 'Name of early script considered ancestor of most alphabetic writing:',
          answer: 'Proto-Sinaitic',
          hint: 'Also called Proto-Canaanite.'
        },
        {
          id: 's4_q7',
          type: 'mcq',
          question: 'Who were the primary literate group in early Mesopotamia and Egypt?',
          options: [
            'Priests and religious leaders',
            'Merchants and traders',
            'Scribes — specialist administrators'
          ],
          answer: 2,
          explanation: '"literacy was largely restricted to scribes — specialist administrators who received years of formal training."'
        },
        {
          id: 's4_q8',
          type: 'mcq',
          question: 'Which script from the Indus Valley remains undeciphered?',
          options: ['Linear A', 'The Indus Valley script', 'Proto-Canaanite'],
          answer: 1,
          explanation: '"The Indus Valley script... has not been decoded despite over a century of scholarly effort."'
        },
        {
          id: 's4_q9',
          type: 'mcq',
          question: 'What made it possible to decipher Egyptian hieroglyphics?',
          options: [
            'A scholarly analysis of pictorial symbols',
            'A bilingual text — the Rosetta Stone',
            'Comparison with cuneiform writing'
          ],
          answer: 1,
          explanation: '"Without a bilingual text — like the Rosetta Stone, which unlocked Egyptian hieroglyphics."'
        },
        {
          id: 's4_q10',
          type: 'form',
          label: 'Reading assignment for next week (topic):',
          answer: 'script typology',
          hint: 'A specific chapter topic is mentioned.'
        }
      ]
    }
  ];

  return {
    getAll() { return sections; },
    getById(id) { return sections.find(s => s.id === id) || null; },
    getBySection(num) { return sections.find(s => s.section === num) || null; }
  };

})();
