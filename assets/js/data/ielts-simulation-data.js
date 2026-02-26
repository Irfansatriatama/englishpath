/**
 * EnglishPath — IELTS Simulation Data
 * Fase 13c-2: Simulasi Full Test + Halaman Hasil
 * 4 sections: Listening (30 min), Reading (60 min), Writing (60 min), Speaking (cue card, 14 min)
 */
const IELTSSimulationData = (() => {

  // ── LISTENING (30 minutes, 4 sections, 40 questions) ──────────────────────────────
  const listening = {
    totalMinutes: 30,
    sections: [
      {
        id: 'l_s1',
        title: 'Section 1',
        type: 'conversation',
        description: 'A conversation between two people in an everyday social context',
        audioScript: `Agent: Good afternoon, Greenfield Rentals. How can I help you?
Tenant: Hi, I'm calling about the flat advertised on your website — the two-bedroom on Maple Street.
Agent: Ah yes, number 14 Maple Street. Are you interested in viewing it?
Tenant: Yes, I'd like some information first. What's the monthly rent?
Agent: It's £950 per month, which includes water rates but not electricity or gas.
Tenant: And is there parking available?
Agent: There's one parking space allocated with the property. Additional spaces cost £30 per month.
Tenant: What about the deposit?
Agent: We require six weeks' rent as a deposit — that would be £1,425.
Tenant: Is the property furnished?
Agent: It's partly furnished — there's a sofa, dining table, and beds, but no kitchen appliances.
Tenant: What's the minimum contract length?
Agent: We prefer twelve months, though we can sometimes negotiate nine months for the right tenant.
Tenant: I see. And is the property available immediately?
Agent: It becomes available from the first of next month — that's about three weeks away.
Tenant: Great. Can I arrange a viewing for this Saturday afternoon?
Agent: Saturday at two o'clock works well. Could I take your name and contact number?
Tenant: Sure — my name is Patricia Henley, and my number is 07724 398 156.
Agent: Thank you, Ms Henley. We'll confirm your appointment by email. What's your email address?
Tenant: It's p.henley@mailbox.com — P dot Henley at mailbox dot com.
Agent: Perfect. We'll see you Saturday at two. Is there anything else?
Tenant: No, that's everything. Thank you very much.
Agent: You're welcome. Goodbye.`,
        questions: [
          {
            id: 'l1_q1', type: 'mcq', points: 1,
            text: 'What is the monthly rent for the flat?',
            options: ['£850', '£950', '£1,050', '£1,100'],
            answer: 1,
            answerText: '£950'
          },
          {
            id: 'l1_q2', type: 'mcq', points: 1,
            text: 'What is included in the rent?',
            options: ['Electricity and gas', 'Water rates only', 'All utilities', 'No utilities'],
            answer: 1,
            answerText: 'Water rates only'
          },
          {
            id: 'l1_q3', type: 'mcq', points: 1,
            text: 'How much does an additional parking space cost per month?',
            options: ['£20', '£25', '£30', '£35'],
            answer: 2,
            answerText: '£30'
          },
          {
            id: 'l1_q4', type: 'form', points: 1,
            text: 'The required deposit is ___.',
            answer: '£1,425',
            hint: 'six weeks\' rent'
          },
          {
            id: 'l1_q5', type: 'mcq', points: 1,
            text: 'Which items are already in the flat?',
            options: [
              'Sofa, beds, and kitchen appliances',
              'Sofa, dining table, and beds',
              'Dining table, kitchen appliances, and beds',
              'Sofa, dining table, and kitchen appliances'
            ],
            answer: 1,
            answerText: 'Sofa, dining table, and beds'
          },
          {
            id: 'l1_q6', type: 'mcq', points: 1,
            text: 'What is the preferred minimum contract length?',
            options: ['Six months', 'Nine months', 'Twelve months', 'Eighteen months'],
            answer: 2,
            answerText: 'Twelve months'
          },
          {
            id: 'l1_q7', type: 'form', points: 1,
            text: 'The tenant\'s name is ___.',
            answer: 'Patricia Henley'
          },
          {
            id: 'l1_q8', type: 'form', points: 1,
            text: 'The tenant\'s email address is ___.',
            answer: 'p.henley@mailbox.com'
          },
          {
            id: 'l1_q9', type: 'mcq', points: 1,
            text: 'When is the viewing appointment?',
            options: ['Saturday at 12:00', 'Saturday at 14:00', 'Sunday at 12:00', 'Sunday at 14:00'],
            answer: 1,
            answerText: 'Saturday at 14:00'
          },
          {
            id: 'l1_q10', type: 'mcq', points: 1,
            text: 'When does the property become available?',
            options: ['Immediately', 'In one week', 'In about three weeks', 'In two months'],
            answer: 2,
            answerText: 'In about three weeks'
          }
        ]
      },
      {
        id: 'l_s2',
        title: 'Section 2',
        type: 'monolog',
        description: 'A monolog in an everyday social context — a talk about local facilities',
        audioScript: `Welcome to Riverside Community Centre. I'm delighted to introduce you to the services and facilities we offer here.

Let me start with our sports facilities. We have a fully equipped gym on the ground floor, open from six in the morning until ten at night, seven days a week. The swimming pool is on the first floor and is divided into lanes — four for leisure swimmers and two reserved for competitive training. Swimming sessions for children under twelve are held on Tuesday and Thursday mornings from nine until eleven.

For those interested in wellness, we run yoga classes on Monday, Wednesday, and Friday evenings. We also have a meditation room available for individual bookings. Our physiotherapy clinic operates on Tuesday and Thursday afternoons by appointment only — please call reception to book.

On the second floor, you'll find our learning hub. This includes a computer suite with twenty workstations, available to members free of charge. We also run English language classes every Saturday morning — these are particularly popular with new residents and those preparing for English language examinations.

Membership is available in three tiers. The Basic membership at £25 per month gives you gym access only. Our Standard membership at £40 per month includes the gym, swimming pool, and group classes. The Premium membership at £60 per month adds physiotherapy consultations and priority booking for all facilities.

To register, please speak to any member of staff at reception. You'll need to provide proof of address and a passport or driving licence for identification.`,
        questions: [
          {
            id: 'l2_q1', type: 'mcq', points: 1,
            text: 'What floor is the gym on?',
            options: ['Basement', 'Ground floor', 'First floor', 'Second floor'],
            answer: 1,
            answerText: 'Ground floor'
          },
          {
            id: 'l2_q2', type: 'mcq', points: 1,
            text: 'How many lanes are reserved for competitive training in the pool?',
            options: ['2', '4', '6', '8'],
            answer: 0,
            answerText: '2'
          },
          {
            id: 'l2_q3', type: 'mcq', points: 1,
            text: 'When are children\'s swimming sessions held?',
            options: [
              'Monday and Wednesday mornings',
              'Tuesday and Thursday mornings',
              'Wednesday and Friday afternoons',
              'Saturday and Sunday mornings'
            ],
            answer: 1,
            answerText: 'Tuesday and Thursday mornings'
          },
          {
            id: 'l2_q4', type: 'mcq', points: 1,
            text: 'What is the cost of Standard membership per month?',
            options: ['£25', '£35', '£40', '£60'],
            answer: 2,
            answerText: '£40'
          },
          {
            id: 'l2_q5', type: 'mcq', points: 1,
            text: 'What does Basic membership include?',
            options: [
              'Gym and swimming pool',
              'Gym and group classes',
              'Gym access only',
              'All facilities'
            ],
            answer: 2,
            answerText: 'Gym access only'
          },
          {
            id: 'l2_q6', type: 'mcq', points: 1,
            text: 'What do you need to provide to register? (Choose the most complete answer)',
            options: [
              'Proof of address only',
              'Passport or driving licence only',
              'Proof of address and identification',
              'Bank details and identification'
            ],
            answer: 2,
            answerText: 'Proof of address and identification'
          },
          {
            id: 'l2_q7', type: 'form', points: 1,
            text: 'Yoga classes are held on Monday, Wednesday, and Friday ___.',
            answer: 'evenings'
          },
          {
            id: 'l2_q8', type: 'form', points: 1,
            text: 'The computer suite has ___ workstations.',
            answer: 'twenty'
          },
          {
            id: 'l2_q9', type: 'mcq', points: 1,
            text: 'The physiotherapy clinic operates on which days?',
            options: [
              'Monday and Wednesday',
              'Tuesday and Thursday',
              'Wednesday and Friday',
              'Saturday and Sunday'
            ],
            answer: 1,
            answerText: 'Tuesday and Thursday'
          },
          {
            id: 'l2_q10', type: 'mcq', points: 1,
            text: 'English language classes are held ___.',
            options: [
              'Every weekday evening',
              'Tuesday and Thursday mornings',
              'Every Saturday morning',
              'Monday, Wednesday, and Friday'
            ],
            answer: 2,
            answerText: 'Every Saturday morning'
          }
        ]
      },
      {
        id: 'l_s3',
        title: 'Section 3',
        type: 'discussion',
        description: 'A discussion between students in an academic context',
        audioScript: `Tutor: So, you've both been working on your research proposal. How's it coming along?
Student A: We've made good progress. We've decided to focus on the impact of social media on academic performance among university students.
Student B: Yes, it's a topic that's quite relevant to our own experience. We've found some interesting preliminary research suggesting a correlation between heavy social media use and lower GPA scores.
Tutor: That's an interesting angle. What methodology are you planning to use?
Student A: We're planning a mixed-methods approach — a quantitative survey of 200 students, followed by qualitative interviews with a smaller sample of about twenty students.
Tutor: And how will you recruit participants?
Student B: We'll use stratified random sampling to ensure we get a representative cross-section of different year groups and academic disciplines.
Tutor: Good. Have you considered potential ethical issues?
Student A: Absolutely. We'll need informed consent from all participants, and we'll anonymize all data to protect privacy.
Student B: We're also going to make clear that participation is entirely voluntary and that students can withdraw at any time.
Tutor: What do you expect to find?
Student A: Our hypothesis is that students who spend more than three hours per day on social media show a measurable decline in academic performance.
Student B: Though we're trying to keep an open mind — it's possible that social media might actually be beneficial for some types of academic tasks, like research or group collaboration.
Tutor: That's a thoughtful position. When do you plan to start data collection?
Student A: We're hoping to begin in about three weeks, once the ethics committee has approved our proposal.
Tutor: Good luck with that. Make sure your survey instrument is piloted before you roll it out.`,
        questions: [
          {
            id: 'l3_q1', type: 'mcq', points: 1,
            text: 'What is the research topic?',
            options: [
              'Social media marketing strategies',
              'Impact of social media on academic performance',
              'University students\' mental health',
              'Technology use in education'
            ],
            answer: 1,
            answerText: 'Impact of social media on academic performance'
          },
          {
            id: 'l3_q2', type: 'mcq', points: 1,
            text: 'What type of methodology will the students use?',
            options: [
              'Purely quantitative',
              'Purely qualitative',
              'Mixed-methods',
              'Experimental'
            ],
            answer: 2,
            answerText: 'Mixed-methods'
          },
          {
            id: 'l3_q3', type: 'form', points: 1,
            text: 'They plan to survey ___ students.',
            answer: '200'
          },
          {
            id: 'l3_q4', type: 'mcq', points: 1,
            text: 'How many students will be interviewed?',
            options: ['10', '15', '20', '25'],
            answer: 2,
            answerText: '20'
          },
          {
            id: 'l3_q5', type: 'mcq', points: 1,
            text: 'What sampling method will be used?',
            options: [
              'Random sampling',
              'Convenience sampling',
              'Stratified random sampling',
              'Snowball sampling'
            ],
            answer: 2,
            answerText: 'Stratified random sampling'
          },
          {
            id: 'l3_q6', type: 'mcq', points: 1,
            text: 'What is the students\' hypothesis?',
            options: [
              'Social media always improves academic performance',
              'Social media use of 3+ hours/day causes measurable academic decline',
              'Students use social media mainly for academic purposes',
              'Social media has no effect on grades'
            ],
            answer: 1,
            answerText: 'Social media use of 3+ hours/day causes measurable academic decline'
          },
          {
            id: 'l3_q7', type: 'form', points: 1,
            text: 'They hope to begin data collection in about ___ weeks.',
            answer: 'three'
          },
          {
            id: 'l3_q8', type: 'mcq', points: 1,
            text: 'What must be approved before they start collecting data?',
            options: [
              'The research proposal by the department head',
              'The survey instrument by the tutor',
              'The ethics committee approval',
              'The university administration'
            ],
            answer: 2,
            answerText: 'The ethics committee approval'
          },
          {
            id: 'l3_q9', type: 'mcq', points: 1,
            text: 'What ethical measures will they take? (Choose the MOST complete answer)',
            options: [
              'Informed consent only',
              'Anonymizing data only',
              'Informed consent, anonymizing data, and voluntary participation',
              'Payment to participants'
            ],
            answer: 2,
            answerText: 'Informed consent, anonymizing data, and voluntary participation'
          },
          {
            id: 'l3_q10', type: 'mcq', points: 1,
            text: 'What does the tutor advise at the end?',
            options: [
              'Change the research topic',
              'Pilot the survey instrument before rolling it out',
              'Increase the sample size',
              'Use a different sampling method'
            ],
            answer: 1,
            answerText: 'Pilot the survey instrument before rolling it out'
          }
        ]
      },
      {
        id: 'l_s4',
        title: 'Section 4',
        type: 'lecture',
        description: 'A lecture or talk on an academic subject',
        audioScript: `Good morning. Today I'd like to talk about the concept of urban heat islands — a phenomenon that has significant implications for city planning and climate policy.

An urban heat island, or UHI, refers to the fact that urban areas tend to be significantly warmer than surrounding rural areas. This temperature difference can range from one to seven degrees Celsius, and in extreme cases, urban centres can be ten degrees warmer than the countryside at night.

The primary causes of urban heat islands are well-established. First, the replacement of natural vegetation with impermeable surfaces — roads, buildings, and pavements — reduces evapotranspiration. Plants naturally cool their environment through the evaporation of water. Without them, heat is simply absorbed and re-radiated by concrete and asphalt.

Second, the geometry of cities plays a role. Buildings form urban canyons that trap outgoing longwave radiation, preventing heat from escaping into the atmosphere. This effect is most pronounced in densely built-up city centres with tall buildings.

Third, there's waste heat from human activity — from vehicles, air conditioning units, industry, and domestic appliances. Paradoxically, the more air conditioning units we use to cool buildings, the more heat they expel into the surrounding urban environment.

The effects of urban heat islands are wide-ranging. In public health terms, they increase the risk of heat-related illness, particularly during summer heat waves. Vulnerable populations — the elderly, young children, and those with chronic illnesses — are disproportionately at risk.

Solutions to the UHI effect include green roofs — that is, roofs covered with vegetation — urban forests, and cool pavements that reflect rather than absorb solar radiation. Increasing urban tree cover by just ten percent has been shown to reduce local temperatures by approximately one degree Celsius.

In conclusion, urban heat islands represent both a challenge and an opportunity. As cities grow, addressing this phenomenon through thoughtful urban design can significantly improve quality of life for millions of urban residents.`,
        questions: [
          {
            id: 'l4_q1', type: 'mcq', points: 1,
            text: 'What is the main topic of the lecture?',
            options: [
              'Climate change and global warming',
              'Urban heat islands',
              'City planning regulations',
              'Environmental pollution'
            ],
            answer: 1,
            answerText: 'Urban heat islands'
          },
          {
            id: 'l4_q2', type: 'mcq', points: 1,
            text: 'By how much can urban centres be warmer than countryside at night?',
            options: ['Up to 5 degrees', 'Up to 7 degrees', 'Up to 10 degrees', 'Up to 15 degrees'],
            answer: 2,
            answerText: 'Up to 10 degrees'
          },
          {
            id: 'l4_q3', type: 'mcq', points: 1,
            text: 'What role do plants play in cooling the environment?',
            options: [
              'They reflect solar radiation',
              'They increase wind speed',
              'They cool through evaporation of water',
              'They absorb heat from buildings'
            ],
            answer: 2,
            answerText: 'They cool through evaporation of water'
          },
          {
            id: 'l4_q4', type: 'mcq', points: 1,
            text: 'What are "urban canyons"?',
            options: [
              'Deep trenches dug in cities',
              'Underground rail networks',
              'Building arrangements that trap heat',
              'Natural valleys in urban areas'
            ],
            answer: 2,
            answerText: 'Building arrangements that trap heat'
          },
          {
            id: 'l4_q5', type: 'mcq', points: 1,
            text: 'Which of the following is NOT mentioned as a source of waste heat?',
            options: ['Vehicles', 'Air conditioning units', 'Solar panels', 'Industry'],
            answer: 2,
            answerText: 'Solar panels'
          },
          {
            id: 'l4_q6', type: 'mcq', points: 1,
            text: 'What is the "paradox" of air conditioning mentioned in the lecture?',
            options: [
              'It cools buildings but is expensive to run',
              'It cools buildings but expels heat into the urban environment',
              'It is efficient but rarely used',
              'It reduces indoor pollution but increases outdoor pollution'
            ],
            answer: 1,
            answerText: 'It cools buildings but expels heat into the urban environment'
          },
          {
            id: 'l4_q7', type: 'mcq', points: 1,
            text: 'Which groups are most at risk from urban heat islands?',
            options: [
              'Young adults and workers',
              'Tourists and visitors',
              'The elderly, young children, and chronically ill',
              'Outdoor workers and athletes'
            ],
            answer: 2,
            answerText: 'The elderly, young children, and chronically ill'
          },
          {
            id: 'l4_q8', type: 'form', points: 1,
            text: 'Increasing urban tree cover by ___ percent can reduce local temperatures by about 1°C.',
            answer: 'ten'
          },
          {
            id: 'l4_q9', type: 'mcq', points: 1,
            text: 'What are "green roofs"?',
            options: [
              'Roofs painted green to reflect sunlight',
              'Roofs covered with vegetation',
              'Roofs made from recycled materials',
              'Solar panel roofs'
            ],
            answer: 1,
            answerText: 'Roofs covered with vegetation'
          },
          {
            id: 'l4_q10', type: 'mcq', points: 1,
            text: 'What does the speaker say about urban heat islands at the end?',
            options: [
              'They are impossible to solve',
              'They are only a problem in developing countries',
              'They represent both a challenge and an opportunity',
              'They will disappear as technology improves'
            ],
            answer: 2,
            answerText: 'They represent both a challenge and an opportunity'
          }
        ]
      }
    ]
  };

  // ── READING (60 minutes, 3 passages, 40 questions) ───────────────────────────────
  const reading = {
    totalMinutes: 60,
    passages: [
      {
        id: 'r_p1',
        title: 'The Psychology of Colour',
        type: 'Academic',
        text: `Colour is one of the most powerful tools in human communication and design. While many people assume that colour responses are universal — that red always means danger or blue always means calm — research suggests that human responses to colour are far more complex, culturally variable, and context-dependent than commonly supposed.

The psychological study of colour began in earnest in the early twentieth century with the German art theorist Johann Wolfgang von Goethe, whose 1810 work "Theory of Colours" proposed that colour influenced human emotion and perception. Although Goethe's methods were largely intuitive rather than empirical, his work laid the foundation for systematic inquiry into the relationship between colour and human psychology.

Modern research has confirmed that colour does affect mood and behaviour, but the effects are often subtle and depend heavily on individual factors such as personal experience, cultural background, and context. A study conducted at the University of Rochester found that exposure to the colour red before an academic examination significantly impaired performance, apparently because red has associations with failure and danger. However, the same study found that red enhanced performance in tasks requiring attention to detail.

Cultural variations in colour perception are particularly striking. In Western cultures, white is traditionally associated with purity and marriage, while in many East Asian cultures, it is the colour of mourning. Similarly, the colour green holds positive associations in many Western contexts — with nature, growth, and environmental responsibility — but in parts of Indonesia, it carries associations with supernatural danger.

These cultural variations raise important questions for global marketing and design. Companies expanding internationally must be acutely aware that colour choices which work well in one market may be deeply inappropriate or off-putting in another. The fast-food giant McDonald's discovered this when it modified its iconic yellow and red colour scheme to green and red in some European markets in response to environmental concerns.

Despite the complexity of colour psychology, some generalisations do hold across cultures. Warm colours — reds, oranges, and yellows — consistently generate higher levels of physiological arousal than cool colours. Cool colours — blues and greens — are more consistently associated with calm and relaxation. These patterns appear to be linked, at least partially, to evolutionary biology: warm colours are associated with fire and danger, cool colours with water and open sky.

The practical applications of colour psychology are extensive. Interior designers use colour to manipulate the perceived size and temperature of spaces. Healthcare settings increasingly use evidence-based colour schemes to reduce patient anxiety. Retailers deploy colour strategically to influence purchasing decisions. And advertisers carefully test colour palettes to maximise the emotional impact of their communications.`,
        questions: [
          {
            id: 'r1_q1', type: 'mcq', points: 1,
            text: 'According to the passage, what was Goethe\'s approach to colour theory?',
            options: [
              'Largely empirical and scientific',
              'Largely intuitive rather than empirical',
              'Based on cultural studies',
              'Focused on art history'
            ],
            answer: 1,
            answerText: 'Largely intuitive rather than empirical'
          },
          {
            id: 'r1_q2', type: 'tfng', points: 1,
            text: 'The University of Rochester study found that red uniformly improved academic performance.',
            options: ['True', 'False', 'Not Given'],
            answer: 1,
            answerText: 'False'
          },
          {
            id: 'r1_q3', type: 'tfng', points: 1,
            text: 'In all East Asian cultures, white is used exclusively for wedding ceremonies.',
            options: ['True', 'False', 'Not Given'],
            answer: 2,
            answerText: 'Not Given'
          },
          {
            id: 'r1_q4', type: 'mcq', points: 1,
            text: 'Why did McDonald\'s change its colour scheme in some European markets?',
            options: [
              'To attract younger customers',
              'Due to legal requirements',
              'In response to environmental concerns',
              'To differentiate from competitors'
            ],
            answer: 2,
            answerText: 'In response to environmental concerns'
          },
          {
            id: 'r1_q5', type: 'tfng', points: 1,
            text: 'Warm colours consistently generate higher physiological arousal than cool colours across cultures.',
            options: ['True', 'False', 'Not Given'],
            answer: 0,
            answerText: 'True'
          },
          {
            id: 'r1_q6', type: 'mcq', points: 1,
            text: 'According to the author, what are the evolutionary links of warm colours?',
            options: [
              'Water and sky',
              'Growth and nature',
              'Fire and danger',
              'Joy and celebration'
            ],
            answer: 2,
            answerText: 'Fire and danger'
          },
          {
            id: 'r1_q7', type: 'tfng', points: 1,
            text: 'Healthcare settings now routinely use colour to reduce patient anxiety.',
            options: ['True', 'False', 'Not Given'],
            answer: 0,
            answerText: 'True'
          },
          {
            id: 'r1_q8', type: 'mcq', points: 1,
            text: 'In which country does green carry associations with supernatural danger?',
            options: ['Japan', 'China', 'Indonesia', 'India'],
            answer: 2,
            answerText: 'Indonesia'
          },
          {
            id: 'r1_q9', type: 'tfng', points: 1,
            text: 'The author concludes that human responses to colour are universal and predictable.',
            options: ['True', 'False', 'Not Given'],
            answer: 1,
            answerText: 'False'
          },
          {
            id: 'r1_q10', type: 'mcq', points: 1,
            text: 'According to the passage, what does Goethe\'s work primarily show?',
            options: [
              'Colour is culturally relative',
              'Colour influences emotion and perception',
              'Red always indicates danger',
              'Blue is universally calming'
            ],
            answer: 1,
            answerText: 'Colour influences emotion and perception'
          },
          {
            id: 'r1_q11', type: 'tfng', points: 1,
            text: 'McDonald\'s changed its entire global branding after the European experience.',
            options: ['True', 'False', 'Not Given'],
            answer: 2,
            answerText: 'Not Given'
          },
          {
            id: 'r1_q12', type: 'tfng', points: 1,
            text: 'Personal experience can influence an individual\'s response to colour.',
            options: ['True', 'False', 'Not Given'],
            answer: 0,
            answerText: 'True'
          },
          {
            id: 'r1_q13', type: 'mcq', points: 1,
            text: 'The passage suggests that colour psychology research has been useful for which professionals? (Choose the BEST answer)',
            options: [
              'Teachers and educators',
              'Politicians and policy makers',
              'Interior designers, healthcare professionals, retailers, and advertisers',
              'Scientists and researchers only'
            ],
            answer: 2,
            answerText: 'Interior designers, healthcare professionals, retailers, and advertisers'
          }
        ]
      },
      {
        id: 'r_p2',
        title: 'The History of the Bicycle',
        type: 'Academic',
        text: `Few inventions have transformed human mobility as profoundly and as swiftly as the bicycle. From its crude origins in the early nineteenth century to its contemporary status as both a practical transport solution and a global sporting phenomenon, the bicycle's development encapsulates broader themes of technological ingenuity, social change, and environmental consciousness.

The earliest precursor to the bicycle was the "draisine" or "running machine," invented by the German baron Karl von Drais in 1817. This device consisted of two wheels connected by a wooden beam, propelled by the rider pushing their feet along the ground. It had no pedals and limited steering capability, but it represented the foundational concept of balancing on two wheels — a principle that remains central to bicycle design today.

Pedals were added to bicycle design in the 1860s, attributed variously to Pierre Michaux and Pierre Lallement, both of whom worked in Paris. These early "velocipedes" were heavy iron-framed machines with the pedals attached directly to the front wheel. They were notoriously uncomfortable — the cobblestoned streets of Paris earned them the nickname "boneshakers."

The 1870s saw the introduction of the penny-farthing, characterised by its enormous front wheel and tiny rear wheel. The large front wheel was designed to increase speed — one rotation of the pedals would carry the rider further — but it created significant dangers. Riders sat high above the ground, and any obstacle in the road could send them over the handlebars in a fall known as "taking a header."

The "safety bicycle" — forerunner of the modern bicycle — emerged in the 1880s. Designed by John Kemp Starley and produced commercially from 1885, it featured two wheels of equal size, a chain drive, and a lower centre of gravity. The pneumatic tyre, invented by John Boyd Dunlop in 1888, dramatically improved comfort and speed. By the 1890s, bicycles had become mass-produced and affordable, triggering what historians have called "the bicycle craze."

The social implications of the bicycle were profound, particularly for women. In the late Victorian era, the bicycle became a symbol of female emancipation. Women who cycled were seen as challenging gender norms: they wore shorter skirts or "bloomers" for practical cycling comfort, they traveled independently, and they enjoyed physical activity in public spaces. The suffragist Susan B. Anthony famously declared that the bicycle had "done more to emancipate women than anything else in the world."

Today, the bicycle enjoys a global renaissance driven by concerns about urban congestion, carbon emissions, and public health. Cities across Europe and Asia have invested heavily in cycling infrastructure, and bicycle-sharing schemes operate in hundreds of cities worldwide. The global bicycle industry is worth over seventy billion US dollars annually, and cycling's popularity as both transport and sport continues to grow.`,
        questions: [
          {
            id: 'r2_q1', type: 'mcq', points: 1,
            text: 'When was the draisine invented?',
            options: ['1807', '1817', '1827', '1837'],
            answer: 1,
            answerText: '1817'
          },
          {
            id: 'r2_q2', type: 'tfng', points: 1,
            text: 'The draisine had a steering mechanism and pedals from the outset.',
            options: ['True', 'False', 'Not Given'],
            answer: 1,
            answerText: 'False'
          },
          {
            id: 'r2_q3', type: 'mcq', points: 1,
            text: 'Why were early velocipedes nicknamed "boneshakers"?',
            options: [
              'Because they were made of bone',
              'Because they were propelled by shaking',
              'Because of the uncomfortable ride on cobblestones',
              'Because they broke down frequently'
            ],
            answer: 2,
            answerText: 'Because of the uncomfortable ride on cobblestones'
          },
          {
            id: 'r2_q4', type: 'tfng', points: 1,
            text: 'The penny-farthing was praised for its safety and stability.',
            options: ['True', 'False', 'Not Given'],
            answer: 1,
            answerText: 'False'
          },
          {
            id: 'r2_q5', type: 'mcq', points: 1,
            text: 'Who designed the "safety bicycle"?',
            options: ['Karl von Drais', 'Pierre Michaux', 'John Kemp Starley', 'John Boyd Dunlop'],
            answer: 2,
            answerText: 'John Kemp Starley'
          },
          {
            id: 'r2_q6', type: 'mcq', points: 1,
            text: 'What invention in 1888 dramatically improved comfort and speed?',
            options: ['Chain drive', 'Steel frame', 'Pneumatic tyre', 'Hand brakes'],
            answer: 2,
            answerText: 'Pneumatic tyre'
          },
          {
            id: 'r2_q7', type: 'tfng', points: 1,
            text: 'Historians have called the popularity surge in the 1890s "the bicycle craze."',
            options: ['True', 'False', 'Not Given'],
            answer: 0,
            answerText: 'True'
          },
          {
            id: 'r2_q8', type: 'mcq', points: 1,
            text: 'According to Susan B. Anthony, what had the bicycle done for women?',
            options: [
              'Allowed them to work',
              'Done more to emancipate them than anything else',
              'Given them the right to vote',
              'Made them physically stronger'
            ],
            answer: 1,
            answerText: 'Done more to emancipate them than anything else'
          },
          {
            id: 'r2_q9', type: 'tfng', points: 1,
            text: 'Bicycle-sharing schemes now operate in hundreds of cities worldwide.',
            options: ['True', 'False', 'Not Given'],
            answer: 0,
            answerText: 'True'
          },
          {
            id: 'r2_q10', type: 'mcq', points: 1,
            text: 'What is the approximate annual value of the global bicycle industry?',
            options: [
              'Over seven billion US dollars',
              'Over seventeen billion US dollars',
              'Over seventy billion US dollars',
              'Over seven hundred billion US dollars'
            ],
            answer: 2,
            answerText: 'Over seventy billion US dollars'
          },
          {
            id: 'r2_q11', type: 'tfng', points: 1,
            text: 'Pierre Lallement and Pierre Michaux both worked in London.',
            options: ['True', 'False', 'Not Given'],
            answer: 1,
            answerText: 'False'
          },
          {
            id: 'r2_q12', type: 'tfng', points: 1,
            text: 'The draisine is described as the foundational concept of balancing on two wheels.',
            options: ['True', 'False', 'Not Given'],
            answer: 0,
            answerText: 'True'
          },
          {
            id: 'r2_q13', type: 'tfng', points: 1,
            text: 'Women cycling in the Victorian era were widely praised by society at large.',
            options: ['True', 'False', 'Not Given'],
            answer: 2,
            answerText: 'Not Given'
          }
        ]
      },
      {
        id: 'r_p3',
        title: 'Ocean Acidification and Marine Ecosystems',
        type: 'Academic',
        text: `The world's oceans have absorbed approximately thirty percent of the carbon dioxide emitted by human activities since the industrial revolution. While this has moderated the pace of atmospheric warming, it has come at a significant cost: as oceans absorb CO₂, a chemical reaction produces carbonic acid, lowering the pH of seawater in a process known as ocean acidification.

Pre-industrial ocean pH averaged approximately 8.2. Current measurements indicate an average of around 8.1 — a seemingly small change that nonetheless represents a thirty percent increase in acidity, since the pH scale is logarithmic. Projections suggest that by 2100, ocean pH may fall to 7.8, representing an acidity increase of one hundred and fifty percent relative to pre-industrial levels.

The biological consequences of acidification are wide-ranging and, in many cases, severe. Perhaps most critically, lower pH reduces the availability of carbonate ions, which are essential for calcification — the process by which marine organisms build calcium carbonate shells and skeletons. Corals, oysters, mussels, sea urchins, and certain types of plankton all rely on carbonate ions for their structural integrity.

Coral reefs are among the most biodiverse ecosystems on Earth, supporting an estimated twenty-five percent of all marine species despite covering less than one percent of the ocean floor. Research published in Nature Climate Change suggests that coral reefs could cease to grow and begin to dissolve at pH levels projected for the middle of this century. The collapse of reef systems would trigger cascading biodiversity losses affecting fisheries, coastal protection, and the livelihoods of hundreds of millions of people who depend on reef ecosystems.

The effects of acidification extend beyond calcifying organisms. Studies have shown that acidic conditions affect the behaviour of marine fish — including their ability to detect predators and navigate. The altered sensory chemistry of acidified water appears to disrupt the olfactory signals that fish use to identify danger and find their way home. Some juvenile fish raised in acidic conditions demonstrate increased boldness and reduced avoidance of predators, behaviours that dramatically reduce their survival rates.

There are, however, some reasons for qualified optimism. Certain species — particularly some species of algae and sea grasses — appear to benefit from higher CO₂ concentrations, as increased carbon availability accelerates photosynthesis. Rapid evolutionary adaptation has been documented in some short-lived marine organisms. And emerging technologies for local alkalinity enhancement — adding minerals to increase ocean pH in specific areas — show promise for protecting vulnerable ecosystems such as coral nurseries.

Ultimately, however, scientists are nearly unanimous that the only effective long-term solution to ocean acidification is a dramatic and rapid reduction in anthropogenic CO₂ emissions. Local and regional interventions can buy time and protect particularly valuable ecosystems, but they cannot address the global scale of the problem.`,
        questions: [
          {
            id: 'r3_q1', type: 'mcq', points: 1,
            text: 'Approximately how much CO₂ have the oceans absorbed since the industrial revolution?',
            options: ['10%', '20%', '30%', '40%'],
            answer: 2,
            answerText: '30%'
          },
          {
            id: 'r3_q2', type: 'tfng', points: 1,
            text: 'The current ocean pH is approximately 8.2.',
            options: ['True', 'False', 'Not Given'],
            answer: 1,
            answerText: 'False'
          },
          {
            id: 'r3_q3', type: 'mcq', points: 1,
            text: 'Why does a change from 8.2 to 8.1 pH represent a 30% increase in acidity?',
            options: [
              'Because acidity is measured on a linear scale',
              'Because the pH scale is logarithmic',
              'Because scientists use a different formula',
              'Because ocean water has special properties'
            ],
            answer: 1,
            answerText: 'Because the pH scale is logarithmic'
          },
          {
            id: 'r3_q4', type: 'tfng', points: 1,
            text: 'Coral reefs cover more than ten percent of the ocean floor.',
            options: ['True', 'False', 'Not Given'],
            answer: 1,
            answerText: 'False'
          },
          {
            id: 'r3_q5', type: 'mcq', points: 1,
            text: 'What percentage of marine species do coral reefs support?',
            options: ['10%', '25%', '40%', '50%'],
            answer: 1,
            answerText: '25%'
          },
          {
            id: 'r3_q6', type: 'tfng', points: 1,
            text: 'Research suggests coral reefs could begin to dissolve at pH levels projected for mid-century.',
            options: ['True', 'False', 'Not Given'],
            answer: 0,
            answerText: 'True'
          },
          {
            id: 'r3_q7', type: 'mcq', points: 1,
            text: 'How does acidification affect marine fish behaviour?',
            options: [
              'It makes them swim faster',
              'It improves their navigation skills',
              'It disrupts their ability to detect predators and navigate',
              'It causes them to migrate to cooler waters'
            ],
            answer: 2,
            answerText: 'It disrupts their ability to detect predators and navigate'
          },
          {
            id: 'r3_q8', type: 'tfng', points: 1,
            text: 'Some algae and sea grasses appear to benefit from higher CO₂ concentrations.',
            options: ['True', 'False', 'Not Given'],
            answer: 0,
            answerText: 'True'
          },
          {
            id: 'r3_q9', type: 'mcq', points: 1,
            text: 'What does "alkalinity enhancement" aim to do?',
            options: [
              'Increase ocean temperature',
              'Increase ocean pH in specific areas',
              'Reduce ocean CO₂ levels globally',
              'Accelerate coral growth rates'
            ],
            answer: 1,
            answerText: 'Increase ocean pH in specific areas'
          },
          {
            id: 'r3_q10', type: 'tfng', points: 1,
            text: 'Scientists disagree about the long-term solution to ocean acidification.',
            options: ['True', 'False', 'Not Given'],
            answer: 1,
            answerText: 'False'
          },
          {
            id: 'r3_q11', type: 'mcq', points: 1,
            text: 'What process do corals and oysters rely on carbonate ions for?',
            options: ['Respiration', 'Photosynthesis', 'Calcification', 'Reproduction'],
            answer: 2,
            answerText: 'Calcification'
          },
          {
            id: 'r3_q12', type: 'tfng', points: 1,
            text: 'Juvenile fish raised in acidic conditions showed reduced survival rates.',
            options: ['True', 'False', 'Not Given'],
            answer: 0,
            answerText: 'True'
          },
          {
            id: 'r3_q13', type: 'tfng', points: 1,
            text: 'The author believes local interventions alone are sufficient to solve ocean acidification.',
            options: ['True', 'False', 'Not Given'],
            answer: 1,
            answerText: 'False'
          },
          {
            id: 'r3_q14', type: 'mcq', points: 1,
            text: 'What does the passage say is the only effective long-term solution?',
            options: [
              'Building more coral nurseries',
              'Algae and seagrass cultivation',
              'Dramatic reduction in anthropogenic CO₂ emissions',
              'International ocean pH monitoring'
            ],
            answer: 2,
            answerText: 'Dramatic reduction in anthropogenic CO₂ emissions'
          }
        ]
      }
    ]
  };

  // ── WRITING (60 minutes) ─────────────────────────────────────────────────────────
  const writing = {
    totalMinutes: 60,
    tasks: [
      {
        id: 'w_t1',
        type: 'task1_academic',
        title: 'Task 1 — Academic Writing (150 words minimum)',
        timeRecommended: 20,
        minWords: 150,
        prompt: `The bar chart below shows the percentage of households in three countries (UK, Germany, and Japan) that owned at least one car, in three different years: 1990, 2005, and 2020.

📊 BAR CHART DATA:
┌─────────────────┬──────┬──────┬──────┐
│ Country         │ 1990 │ 2005 │ 2020 │
├─────────────────┼──────┼──────┼──────┤
│ United Kingdom  │  55% │  72% │  78% │
│ Germany         │  60% │  75% │  82% │
│ Japan           │  48% │  68% │  76% │
└─────────────────┴──────┴──────┴──────┘

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.`,
        rubric: [
          { criterion: 'Task Achievement', desc: 'Does it accurately cover main trends & comparisons?', band: 0 },
          { criterion: 'Coherence & Cohesion', desc: 'Is it logically organised with linking words?', band: 0 },
          { criterion: 'Lexical Resource', desc: 'Variety of vocabulary, accurate word choice?', band: 0 },
          { criterion: 'Grammatical Range & Accuracy', desc: 'Complex sentences, minimal errors?', band: 0 }
        ],
        sampleAnswer: `The bar chart illustrates the proportion of households owning at least one car in the UK, Germany, and Japan across three years: 1990, 2005, and 2020.

Overall, car ownership increased in all three countries over the thirty-year period, with Germany consistently recording the highest rates throughout.

In 1990, Germany had the highest ownership at 60%, followed closely by the UK at 55%, while Japan had the lowest at 48%. By 2005, all three countries had seen substantial growth. Germany rose to 75%, the UK reached 72%, and Japan climbed to 68%.

The upward trend continued into 2020, though the rate of increase slowed somewhat. Germany remained the leader at 82%, with the UK at 78% and Japan at 76%. Notably, Japan showed the greatest overall increase — approximately 28 percentage points — over the thirty-year period, narrowing the gap with the other two countries considerably.

In summary, while Germany maintained its lead, Japan's impressive growth rate means the differences between the three countries narrowed significantly by 2020.`
      },
      {
        id: 'w_t2',
        type: 'task2_essay',
        title: 'Task 2 — Essay (250 words minimum)',
        timeRecommended: 40,
        minWords: 250,
        prompt: `Some people believe that social media has had a predominantly negative effect on modern society, while others argue that its benefits outweigh its drawbacks.

Discuss both views and give your own opinion.`,
        rubric: [
          { criterion: 'Task Response', desc: 'Does it address all parts of the task and give a clear position?', band: 0 },
          { criterion: 'Coherence & Cohesion', desc: 'Clear paragraphing, logical progression, effective linking?', band: 0 },
          { criterion: 'Lexical Resource', desc: 'Sophisticated vocabulary, accurate collocations?', band: 0 },
          { criterion: 'Grammatical Range & Accuracy', desc: 'Wide range of structures, high accuracy?', band: 0 }
        ],
        sampleAnswer: `Social media has transformed the way people communicate, access information, and perceive the world. While critics argue that these platforms cause more harm than good, proponents maintain that the advantages are considerable. In my view, the benefits of social media, when used responsibly, outweigh its drawbacks.

Those who see social media negatively often point to its association with mental health problems. Research has linked heavy use of platforms such as Instagram and TikTok to increased anxiety, depression, and low self-esteem, particularly among young people. The phenomenon of "social comparison" — whereby users measure themselves against idealised images — can undermine wellbeing. Furthermore, the spread of misinformation through social networks poses a genuine threat to public discourse and democratic processes.

On the other hand, social media offers significant benefits. It has democratised communication, allowing individuals to share ideas with a global audience regardless of their social position or resources. It has been instrumental in mobilising social movements, from the Arab Spring to environmental campaigns. For small businesses, social media provides affordable marketing channels that were previously accessible only to large corporations. And for individuals separated by distance, these platforms provide a means of maintaining relationships that might otherwise wither.

In conclusion, while social media carries real risks — particularly for vulnerable young users — the technology itself is neither inherently harmful nor beneficial. Its impact depends largely on how it is used and regulated. With appropriate digital literacy education and platform accountability, social media can be a powerful force for connection and positive change.`
      }
    ]
  };

  // ── SPEAKING (Cue cards for Part 2, simulated) ───────────────────────────────────
  const speaking = {
    totalMinutes: 14,
    parts: [
      {
        id: 'sp_p1',
        part: 1,
        title: 'Part 1 — Introduction & Interview (4–5 minutes)',
        description: 'The examiner will ask you general questions about yourself and familiar topics.',
        prepTime: 0,
        speakTime: 0,
        questions: [
          { id: 'sp1_q1', text: 'Can you tell me your full name?' },
          { id: 'sp1_q2', text: 'Where do you come from?' },
          { id: 'sp1_q3', text: 'Do you work or study?' },
          { id: 'sp1_q4', text: 'What do you enjoy doing in your free time?' },
          { id: 'sp1_q5', text: 'Do you prefer spending time indoors or outdoors? Why?' }
        ]
      },
      {
        id: 'sp_p2',
        part: 2,
        title: 'Part 2 — Individual Long Turn (3–4 minutes)',
        description: 'You have 1 minute to prepare, then speak for 1–2 minutes on the topic below.',
        prepTime: 60,
        speakTime: 120,
        cueCard: {
          topic: 'Describe a skill you have learned that has been particularly useful in your life.',
          points: [
            'What the skill is',
            'How and when you learned it',
            'How you have used it',
            'Why it has been particularly useful'
          ],
          followUp: 'Do you think this skill will continue to be useful in the future?',
          modelAnswer: `One skill that has proved incredibly valuable in my life is the ability to cook. I started learning to cook properly when I was about eighteen, when I moved away from home for the first time to study at university.

Initially, necessity was the main driver — I had a very limited budget and couldn't afford to eat out regularly. I began by watching cooking videos online and experimenting with simple recipes. My flatmates and I would sometimes cook together, which made the learning process much more enjoyable.

Over time, I developed genuine enthusiasm for cooking. I started trying more ambitious dishes — different cuisines from around the world, dishes that required more technique and patience. Now, years later, cooking is genuinely one of my greatest pleasures.

The skill has been useful in countless ways. Most obviously, it saves money compared to eating out or buying prepared food. But beyond the financial aspect, cooking my own food means I have complete control over what I eat — which is important for my health. Perhaps most unexpectedly, cooking has become a wonderful social activity: I regularly invite friends for dinner, and some of my most memorable experiences have been cooking elaborate meals for people I care about.

If I had to identify why this skill has been so particularly valuable, it's because it affects almost every day of my life in some way. Very few skills are that pervasive and consistently useful.`
        }
      },
      {
        id: 'sp_p3',
        part: 3,
        title: 'Part 3 — Two-Way Discussion (4–5 minutes)',
        description: 'The examiner will ask more abstract questions related to the Part 2 topic.',
        prepTime: 0,
        speakTime: 0,
        questions: [
          {
            id: 'sp3_q1',
            text: 'In general, do you think practical skills like cooking are taught enough in schools?',
            model: 'Many people argue that schools focus too heavily on academic knowledge at the expense of practical life skills. Cooking, budgeting, basic home maintenance — these are things that many young people leave school without knowing, yet they are essential for independent adult life. I think there\'s a strong case for making such practical skills a more central part of the school curriculum.'
          },
          {
            id: 'sp3_q2',
            text: 'How has technology changed the way people learn new skills today?',
            model: 'Technology has fundamentally transformed skill acquisition. Platforms like YouTube mean that virtually any skill can be self-taught — from playing an instrument to coding to home renovation. The barrier to learning has dropped dramatically, and people can learn at their own pace and in their own time. However, there\'s still something to be said for in-person teaching, particularly for complex skills that require immediate feedback and correction.'
          },
          {
            id: 'sp3_q3',
            text: 'Some people say that it\'s better to be an expert in one skill rather than having many different skills. Do you agree?',
            model: 'This is a genuinely complex question. In highly specialised professional fields, depth of expertise is undoubtedly valuable — a surgeon needs to be exceptionally skilled in a very specific domain. However, in an increasingly interconnected world, the ability to draw connections across different fields — what some call "T-shaped" knowledge — is also highly valued. I think the ideal probably depends heavily on the individual and their professional context.'
          }
        ]
      }
    ]
  };

  // ── BAND SCORE TABLES ──────────────────────────────────────────────────────────────
  // IELTS official raw score → Band (Listening & Reading)
  const listeningBandTable = [
    { min: 39, max: 40, band: 9.0 },
    { min: 37, max: 38, band: 8.5 },
    { min: 35, max: 36, band: 8.0 },
    { min: 32, max: 34, band: 7.5 },
    { min: 30, max: 31, band: 7.0 },
    { min: 26, max: 29, band: 6.5 },
    { min: 23, max: 25, band: 6.0 },
    { min: 18, max: 22, band: 5.5 },
    { min: 16, max: 17, band: 5.0 },
    { min: 13, max: 15, band: 4.5 },
    { min: 10, max: 12, band: 4.0 },
    { min: 8,  max: 9,  band: 3.5 },
    { min: 6,  max: 7,  band: 3.0 },
    { min: 4,  max: 5,  band: 2.5 },
    { min: 0,  max: 3,  band: 2.0 }
  ];

  const readingBandTable = [
    { min: 39, max: 40, band: 9.0 },
    { min: 37, max: 38, band: 8.5 },
    { min: 35, max: 36, band: 8.0 },
    { min: 33, max: 34, band: 7.5 },
    { min: 30, max: 32, band: 7.0 },
    { min: 27, max: 29, band: 6.5 },
    { min: 23, max: 26, band: 6.0 },
    { min: 19, max: 22, band: 5.5 },
    { min: 15, max: 18, band: 5.0 },
    { min: 13, max: 14, band: 4.5 },
    { min: 10, max: 12, band: 4.0 },
    { min: 8,  max: 9,  band: 3.5 },
    { min: 6,  max: 7,  band: 3.0 },
    { min: 4,  max: 5,  band: 2.5 },
    { min: 0,  max: 3,  band: 2.0 }
  ];

  // Public API
  return {
    getListening: () => listening,
    getReading:   () => reading,
    getWriting:   () => writing,
    getSpeaking:  () => speaking,

    rawToListeningBand(raw) {
      const table = listeningBandTable;
      for (const row of table) {
        if (raw >= row.min && raw <= row.max) return row.band;
      }
      return 1.0;
    },

    rawToReadingBand(raw) {
      const table = readingBandTable;
      for (const row of table) {
        if (raw >= row.min && raw <= row.max) return row.band;
      }
      return 1.0;
    },

    // Overall band = average of 4 bands, rounded to nearest 0.5
    calcOverallBand(l, r, w, s) {
      const avg = (l + r + w + s) / 4;
      return Math.round(avg * 2) / 2;
    },

    // Recommendation text per section based on band
    getRecommendation(section, band) {
      if (band >= 8.0) {
        return { level: 'Sangat Baik', text: `Band ${band} di ${section} menunjukkan kemampuan yang sangat tinggi. Pertahankan dengan membaca/mendengarkan materi native-level secara rutin.` };
      } else if (band >= 7.0) {
        return { level: 'Baik', text: `Band ${band} di ${section} sudah solid. Fokus pada kesalahan kecil di vocabulary dan grammatical accuracy untuk naik ke 7.5+.` };
      } else if (band >= 6.0) {
        return { level: 'Cukup', text: `Band ${band} di ${section} sudah melewati target banyak universitas. Tingkatkan dengan berlatih soal authentic IELTS setiap hari.` };
      } else if (band >= 5.0) {
        return { level: 'Perlu Ditingkatkan', text: `Band ${band} di ${section} masih perlu perbaikan signifikan. Perbanyak latihan soal dan review jawaban yang salah dengan cermat.` };
      } else {
        return { level: 'Perlu Banyak Latihan', text: `Band ${band} di ${section} menunjukkan perlunya penguatan fondasi. Kembali ke materi dasar dan bangun kemampuan secara bertahap.` };
      }
    }
  };
})();
