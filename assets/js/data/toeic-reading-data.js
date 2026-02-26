/**
 * EnglishPath — TOEIC Reading Data
 * Fase 14c-1: Practice Reading Parts 5–7
 * Part 5: Incomplete Sentences (10 soal)
 * Part 6: Text Completion (4 teks × 4 blanks)
 * Part 7: Reading Comprehension (3 single passage + 2 double passage)
 */

const TOEICReadingData = (() => {

  // ─── PART 5: Incomplete Sentences ────────────────────────────
  // Each item: sentence with blank, 4 choices, correct answer, explanation
  const part5 = [
    {
      id: 'p5_01',
      sentence: 'The marketing department will _____ a new campaign next quarter to attract more customers.',
      choices: ['launch', 'launching', 'launched', 'launches'],
      answer: 0,
      explanation: '"Will" is followed by the base form of the verb (infinitive without "to"). "Launch" is the base form.'
    },
    {
      id: 'p5_02',
      sentence: 'All employees are required to submit their expense reports _____ the end of the month.',
      choices: ['in', 'at', 'by', 'on'],
      answer: 2,
      explanation: '"By" indicates a deadline — something must happen no later than a specific time. "By the end of the month" means before or at that time.'
    },
    {
      id: 'p5_03',
      sentence: 'The new policy will affect _____ in the organization, from interns to senior managers.',
      choices: ['everything', 'everyone', 'anywhere', 'anytime'],
      answer: 1,
      explanation: '"Everyone" refers to all people. The sentence talks about people (interns, managers), so "everyone" is correct.'
    },
    {
      id: 'p5_04',
      sentence: 'Due to the heavy snowfall, the conference has been _____ until further notice.',
      choices: ['canceled', 'postponed', 'relocated', 'rescheduled'],
      answer: 1,
      explanation: '"Until further notice" means the event is delayed but no new date has been set — this matches "postponed." "Canceled" would mean it is permanently called off.'
    },
    {
      id: 'p5_05',
      sentence: 'The _____ of the new software upgrade is expected to improve overall system performance by 30 percent.',
      choices: ['implementation', 'implemented', 'implement', 'implementing'],
      answer: 0,
      explanation: 'The blank is the subject of the sentence and follows "The," so a noun is needed. "Implementation" is the noun form.'
    },
    {
      id: 'p5_06',
      sentence: 'Ms. Kim has been working at Global Tech _____ she graduated from university seven years ago.',
      choices: ['since', 'during', 'while', 'until'],
      answer: 0,
      explanation: '"Since" is used with the present perfect tense to show an action continuing from a point in the past. "Has been working since she graduated" is correct.'
    },
    {
      id: 'p5_07',
      sentence: 'The project manager asked the team to _____ their progress reports before the Friday meeting.',
      choices: ['compile', 'compliment', 'comply', 'complete'],
      answer: 3,
      explanation: 'In context, the team is asked to finish their reports before a meeting. "Complete" means to finish, which fits the sentence best.'
    },
    {
      id: 'p5_08',
      sentence: 'Customers who purchase items over $200 are _____ to free express shipping.',
      choices: ['entitled', 'eligible', 'allowed', 'granted'],
      answer: 1,
      explanation: '"Eligible to" is the correct collocation meaning "qualified for" or "meeting the criteria for" a benefit. "Entitled to" is also possible but "eligible to free shipping" is unnatural; "eligible for free shipping" would be used. In the TOEIC context, "eligible" fits the blank most naturally.'
    },
    {
      id: 'p5_09',
      sentence: 'The company offers a _____ benefits package that includes health insurance, paid leave, and retirement contributions.',
      choices: ['comprehensive', 'comprehensible', 'comprehending', 'comprehensively'],
      answer: 0,
      explanation: '"Comprehensive" is an adjective meaning "complete and including everything." It modifies the noun "benefits package." "Comprehensible" means "easy to understand," which does not fit.'
    },
    {
      id: 'p5_10',
      sentence: 'Staff members should _____ their managers of any changes to their work schedules at least 48 hours in advance.',
      choices: ['inform', 'notify', 'remind', 'request'],
      answer: 1,
      explanation: '"Notify" means to formally inform or give official notice to someone. "Notify managers of changes" is a standard business collocation. "Inform" could work but "notify of" is the more precise match here.'
    }
  ];

  // ─── PART 6: Text Completion ──────────────────────────────────
  // Each item: a short passage with 4 blanks, 4 choices per blank
  const part6 = [
    {
      id: 'p6_01',
      title: 'Office Memo — Annual Performance Reviews',
      passage: [
        { type: 'text', text: 'To: All Staff\nFrom: Human Resources Department\nSubject: Annual Performance Reviews\n\nThis is a reminder that annual performance reviews will ' },
        { type: 'blank', id: 'b1' },
        { type: 'text', text: ' during the second week of November. All employees are expected to complete their self-assessment forms and submit them to their direct managers ' },
        { type: 'blank', id: 'b2' },
        { type: 'text', text: ' October 31st. Managers will then schedule one-on-one meetings to discuss performance, goals, and development plans. The HR department ' },
        { type: 'blank', id: 'b3' },
        { type: 'text', text: ' that all reviews be completed within the designated time frame. Employees who have questions about the review process are encouraged to contact HR directly. We appreciate your ' },
        { type: 'blank', id: 'b4' },
        { type: 'text', text: ' in making this process a success.' }
      ],
      blanks: {
        b1: {
          choices: ['take place', 'taking place', 'taken place', 'to take place'],
          answer: 0,
          explanation: '"Will take place" — after "will," use the base form of the verb.'
        },
        b2: {
          choices: ['on', 'by', 'at', 'for'],
          answer: 1,
          explanation: '"By October 31st" means no later than that date — a deadline preposition.'
        },
        b3: {
          choices: ['asks', 'requires', 'requests', 'insists'],
          answer: 1,
          explanation: '"Requires" is the formal word for mandatory obligation in business writing. "That all reviews be completed" uses the subjunctive correctly after "requires."'
        },
        b4: {
          choices: ['cooperation', 'cooperating', 'cooperative', 'cooperate'],
          answer: 0,
          explanation: 'After "your," a noun is needed. "Cooperation" is the noun form.'
        }
      }
    },
    {
      id: 'p6_02',
      title: 'Customer Service Email — Order Delay',
      passage: [
        { type: 'text', text: 'Dear Mr. Thompson,\n\nThank you for your recent order with Nexus Online Store. We are writing to ' },
        { type: 'blank', id: 'b1' },
        { type: 'text', text: ' you that your order (Order #47821) has experienced an unexpected delay due to high demand for the item you purchased. We sincerely apologize for any ' },
        { type: 'blank', id: 'b2' },
        { type: 'text', text: ' this may cause. Your order is now expected to ship within 5–7 business days. As a gesture of goodwill, we would like to offer you a 15% discount on your ' },
        { type: 'blank', id: 'b3' },
        { type: 'text', text: ' order. This discount code will be sent to your registered email address. We value your ' },
        { type: 'blank', id: 'b4' },
        { type: 'text', text: ' and hope to continue serving you in the future.\n\nSincerely,\nNexus Customer Support' }
      ],
      blanks: {
        b1: {
          choices: ['inform', 'advice', 'say', 'notify'],
          answer: 0,
          explanation: '"Inform you that" is the standard formal phrase. "Notify" also works but "notify you that" is slightly less formal in email writing than "inform you that."'
        },
        b2: {
          choices: ['inconvenience', 'problem', 'trouble', 'difficulty'],
          answer: 0,
          explanation: '"Inconvenience" is the standard word used in business apologies. "We apologize for any inconvenience" is a fixed formal expression.'
        },
        b3: {
          choices: ['next', 'later', 'following', 'future'],
          answer: 0,
          explanation: '"Next order" is the natural collocation — it means the next purchase the customer makes.'
        },
        b4: {
          choices: ['patron', 'loyalty', 'custom', 'support'],
          answer: 1,
          explanation: '"We value your loyalty" is the standard phrase used to express appreciation for a continuing customer relationship.'
        }
      }
    },
    {
      id: 'p6_03',
      title: 'Notice — Building Renovation',
      passage: [
        { type: 'text', text: 'NOTICE TO ALL BUILDING OCCUPANTS\n\nPlease be advised that renovation work on Floors 3 and 4 will ' },
        { type: 'blank', id: 'b1' },
        { type: 'text', text: ' from Monday, March 6th through Friday, March 17th. During this period, access to these floors will be ' },
        { type: 'blank', id: 'b2' },
        { type: 'text', text: ' to authorized personnel only. All tenants currently ' },
        { type: 'blank', id: 'b3' },
        { type: 'text', text: ' on Floors 3 and 4 have been temporarily relocated to Floor 6. The building management team ' },
        { type: 'blank', id: 'b4' },
        { type: 'text', text: ' for your patience and understanding during this time. If you have any questions, please contact the main office.' }
      ],
      blanks: {
        b1: {
          choices: ['commence', 'beginning', 'starting', 'initiate'],
          answer: 0,
          explanation: '"Will commence" — "commence" is the formal verb for "begin/start" commonly used in official notices. It requires a base form after "will."'
        },
        b2: {
          choices: ['limited', 'restricted', 'allowed', 'forbidden'],
          answer: 1,
          explanation: '"Restricted to authorized personnel" is the standard phrase meaning access is controlled and only permitted for specific people.'
        },
        b3: {
          choices: ['located', 'occupying', 'renting', 'working'],
          answer: 1,
          explanation: '"Occupying" means physically located in or using a space. "Tenants occupying Floors 3 and 4" is the natural phrase for people who use those floors.'
        },
        b4: {
          choices: ['thanks', 'appreciates', 'is grateful', 'thanks you'],
          answer: 1,
          explanation: '"Appreciates your patience" is the standard formal expression. Subject is "management team" (third person singular), so "appreciates" is correct.'
        }
      }
    },
    {
      id: 'p6_04',
      title: 'Job Posting — Marketing Coordinator',
      passage: [
        { type: 'text', text: 'Job Posting: Marketing Coordinator\nDepartment: Marketing\nLocation: Chicago, IL\n\nABC Corporation is ' },
        { type: 'blank', id: 'b1' },
        { type: 'text', text: ' a Marketing Coordinator to join our dynamic team. The successful candidate will be responsible for supporting the marketing team in executing campaigns, managing social media accounts, and ' },
        { type: 'blank', id: 'b2' },
        { type: 'text', text: ' market research. Applicants should have a bachelor\'s degree in Marketing or a related field and at ' },
        { type: 'blank', id: 'b3' },
        { type: 'text', text: ' two years of relevant experience. Strong written and verbal communication skills are ' },
        { type: 'blank', id: 'b4' },
        { type: 'text', text: '. Interested candidates are invited to submit their resume and cover letter to hr@abccorp.com.' }
      ],
      blanks: {
        b1: {
          choices: ['seeking', 'hiring', 'looking', 'recruiting'],
          answer: 0,
          explanation: '"Is seeking" is the most formal and professional phrasing for job postings. "Is recruiting" also works but "seeking" is more standard in this context.'
        },
        b2: {
          choices: ['conduct', 'conducted', 'conducting', 'to conduct'],
          answer: 2,
          explanation: 'Parallel structure: "supporting... executing... managing... and conducting." All are present participles (-ing form) after "responsible for."'
        },
        b3: {
          choices: ['least', 'minimum', 'less', 'lowest'],
          answer: 0,
          explanation: '"At least two years" is the correct phrase meaning "a minimum of two years." It is a fixed expression.'
        },
        b4: {
          choices: ['essential', 'required', 'necessary', 'mandatory'],
          answer: 0,
          explanation: '"Strong communication skills are essential" is the most natural phrase in job postings. All options are close in meaning, but "essential" is the standard word used to describe key requirements.'
        }
      }
    }
  ];

  // ─── PART 7: Reading Comprehension ───────────────────────────
  // 3 single passages + 2 double passages
  const part7 = [
    // ── Single Passage 1 ──
    {
      id: 'p7_s1',
      type: 'single',
      title: 'Email — Conference Registration Confirmation',
      passage: `From: registration@businesssummit.org
To: j.wong@techstartup.com
Subject: Registration Confirmed — Global Business Summit 2026
Date: January 14, 2026

Dear Ms. Wong,

Thank you for registering for the Global Business Summit 2026, taking place February 20–22, 2026, at the Riverside Convention Center in Seattle, WA.

Your registration includes full access to all keynote sessions, breakout workshops, the networking luncheon on February 21st, and the exhibition hall. Please note that the optional Executive Dinner on February 21st requires a separate ticket, available for $85 per person. Tickets can be purchased at the registration desk on the day of the event, subject to availability.

A detailed program guide will be sent to all registered attendees one week before the event. Your name badge and registration packet will be available for pickup at the main registration desk starting at 8:00 AM on February 20th.

Should you need to make any changes to your registration or require special accommodations, please contact us at registration@businesssummit.org or call 1-800-555-0192.

We look forward to seeing you at the summit!

Warm regards,
Global Business Summit Registration Team`,
      questions: [
        {
          id: 'p7_s1_q1',
          question: 'What is included in Ms. Wong\'s registration?',
          choices: [
            'The Executive Dinner on February 21st',
            'Access to all keynote sessions and breakout workshops',
            'A private meeting with keynote speakers',
            'A hotel room at the Riverside Convention Center'
          ],
          answer: 1,
          explanation: 'The email states that registration includes "full access to all keynote sessions, breakout workshops, the networking luncheon on February 21st, and the exhibition hall." The Executive Dinner is NOT included — it requires a separate ticket.'
        },
        {
          id: 'p7_s1_q2',
          question: 'What can attendees do to attend the Executive Dinner?',
          choices: [
            'Contact the organizer one week in advance',
            'Purchase a ticket for $85 at the registration desk',
            'Register online before the event',
            'Apply for a ticket when collecting their badge'
          ],
          answer: 1,
          explanation: 'The email says the Executive Dinner "requires a separate ticket, available for $85 per person" and "Tickets can be purchased at the registration desk on the day of the event."'
        },
        {
          id: 'p7_s1_q3',
          question: 'What will registered attendees receive one week before the event?',
          choices: [
            'Their name badge and registration packet',
            'A list of all registered participants',
            'A detailed program guide',
            'A confirmation call from the organizers'
          ],
          answer: 2,
          explanation: 'The email clearly states: "A detailed program guide will be sent to all registered attendees one week before the event."'
        }
      ]
    },

    // ── Single Passage 2 ──
    {
      id: 'p7_s2',
      type: 'single',
      title: 'Notice — Employee Parking Policy Update',
      passage: `MEMORANDUM

To: All Employees
From: Facilities Management
Subject: Update to Employee Parking Policy
Date: March 1, 2026

Effective April 1, 2026, the employee parking policy will be updated as follows:

PARKING PERMIT REQUIREMENT
All employees who wish to use the company parking lot must obtain a parking permit. Permits are available at no cost from the Facilities Management office (Room 101) and must be renewed annually each January.

DESIGNATED ZONES
The parking lot has been divided into three zones. Zone A (nearest to the building entrance) is reserved for employees with disabilities and senior management. Zone B is available to all permit holders on a first-come, first-served basis. Zone C is for visitors and temporary staff.

VIOLATIONS
Vehicles parked without a valid permit or in the wrong zone will be issued a warning for the first offense. A second offense will result in the vehicle being towed at the owner's expense.

Employees with questions should contact Facilities Management at extension 4400.`,
      questions: [
        {
          id: 'p7_s2_q1',
          question: 'What must employees do to use the company parking lot after April 1st?',
          choices: [
            'Pay a monthly parking fee',
            'Register their vehicle with security',
            'Obtain a parking permit from Facilities Management',
            'Apply online before the deadline'
          ],
          answer: 2,
          explanation: 'The memo states: "All employees who wish to use the company parking lot must obtain a parking permit... from the Facilities Management office."'
        },
        {
          id: 'p7_s2_q2',
          question: 'Who is Zone A reserved for?',
          choices: [
            'All full-time employees',
            'Visitors and temporary staff',
            'Employees with disabilities and senior management',
            'Permit holders on a first-come basis'
          ],
          answer: 2,
          explanation: '"Zone A (nearest to the building entrance) is reserved for employees with disabilities and senior management."'
        },
        {
          id: 'p7_s2_q3',
          question: 'What will happen to a vehicle parked without a permit for the second time?',
          choices: [
            'The driver will receive a fine',
            'The vehicle will be towed at the owner\'s expense',
            'The employee will lose their permit privileges',
            'The vehicle will receive a second warning'
          ],
          answer: 1,
          explanation: '"A second offense will result in the vehicle being towed at the owner\'s expense."'
        }
      ]
    },

    // ── Single Passage 3 ──
    {
      id: 'p7_s3',
      type: 'single',
      title: 'Article — Remote Work Trends in 2026',
      passage: `Remote Work in 2026: The New Normal Evolves

A recent survey of 1,500 companies across North America found that 68% now offer some form of remote or hybrid work arrangement, up from 42% in 2022. While fully remote roles have stabilized at around 22% of the workforce, hybrid models — where employees split time between home and the office — have become the dominant arrangement for white-collar workers.

The shift has driven significant changes in corporate real estate strategies. Many organizations have downsized their office footprints by 20–40%, opting instead for "hot-desking" arrangements where employees reserve workstations in advance. At the same time, spending on collaboration technology — including video conferencing software, project management tools, and digital whiteboards — has increased by an estimated 35% over the past three years.

Productivity metrics remain a point of debate. Proponents of remote work cite studies showing that remote employees report higher job satisfaction and lower rates of burnout. Critics argue, however, that spontaneous in-person collaboration drives innovation in ways that digital tools cannot replicate. A growing number of companies are addressing this tension by designating specific days as "collaboration days" when all team members are expected in the office.

HR professionals note that flexibility has become one of the top factors in job candidate decisions, often ranked alongside salary and career growth opportunities.`,
      questions: [
        {
          id: 'p7_s3_q1',
          question: 'According to the article, what percentage of companies now offer remote or hybrid work?',
          choices: ['22%', '35%', '42%', '68%'],
          answer: 3,
          explanation: 'The article states: "68% now offer some form of remote or hybrid work arrangement."'
        },
        {
          id: 'p7_s3_q2',
          question: 'What does the article say about "hot-desking"?',
          choices: [
            'It requires employees to work from home at least three days a week',
            'It is a system where employees reserve workstations in advance',
            'It was introduced to reduce spending on collaboration technology',
            'It is only used by fully remote companies'
          ],
          answer: 1,
          explanation: 'The article describes hot-desking as "arrangements where employees reserve workstations in advance."'
        },
        {
          id: 'p7_s3_q3',
          question: 'What is described as a "collaboration day" in the article?',
          choices: [
            'A day when all employees work from home using digital tools',
            'A day designated for virtual team meetings',
            'A day when all team members are expected to be in the office',
            'A day set aside for training and professional development'
          ],
          answer: 2,
          explanation: 'The article says "a growing number of companies are... designating specific days as \'collaboration days\' when all team members are expected in the office."'
        },
        {
          id: 'p7_s3_q4',
          question: 'How is flexibility described in terms of job recruitment?',
          choices: [
            'It is the single most important factor for job candidates',
            'It ranks alongside salary and career growth as a top factor',
            'It matters more than salary to most candidates',
            'It is mentioned briefly as a minor consideration'
          ],
          answer: 1,
          explanation: '"Flexibility has become one of the top factors in job candidate decisions, often ranked alongside salary and career growth opportunities."'
        }
      ]
    },

    // ── Double Passage 1 ──
    {
      id: 'p7_d1',
      type: 'double',
      title: 'Job Advertisement & Application Letter',
      passages: [
        {
          label: 'Document 1 — Job Advertisement',
          text: `POSITION: Senior Accountant
COMPANY: Meridian Financial Services
LOCATION: Boston, MA (On-site, 5 days/week)
POSTED: February 10, 2026

Meridian Financial Services is seeking an experienced Senior Accountant to join our growing finance team. The ideal candidate will have a minimum of five years of accounting experience, a CPA certification, and strong proficiency in financial reporting and tax compliance.

RESPONSIBILITIES:
• Prepare and review monthly financial statements
• Manage tax filing and compliance processes
• Liaise with external auditors during annual audit
• Mentor junior accounting staff
• Identify opportunities to improve financial processes

COMPENSATION: $85,000–$100,000 per year, depending on experience
BENEFITS: Health, dental, vision insurance; 401(k) with employer match; 15 days PTO
DEADLINE: Applications must be received by March 1, 2026.

To apply, send your resume and a cover letter to careers@meridianfinancial.com.`
        },
        {
          label: 'Document 2 — Application Letter',
          text: `February 16, 2026

Hiring Manager
Meridian Financial Services
Boston, MA

Dear Hiring Manager,

I am writing to apply for the Senior Accountant position advertised on your company website. I believe my background and skills make me an excellent fit for this role.

I hold a CPA certification and have seven years of accounting experience, including five years in a senior capacity at Davis & Park LLC, where I managed financial reporting for clients in the healthcare and technology sectors. I have extensive experience with tax compliance and have coordinated with external auditors during annual audits for several consecutive years.

In addition to my technical qualifications, I have consistently mentored junior team members and introduced process improvements that reduced monthly close time by two days. I am particularly attracted to Meridian's reputation for professional development and client-focused approach.

I have attached my resume for your review. I would welcome the opportunity to discuss how my experience aligns with the needs of your team.

Sincerely,
Carlos Reyes`
        }
      ],
      questions: [
        {
          id: 'p7_d1_q1',
          question: 'What is one of the stated responsibilities of the Senior Accountant role?',
          choices: [
            'Traveling to meet clients at their offices',
            'Mentoring junior accounting staff',
            'Overseeing the IT department',
            'Managing the company\'s payroll system'
          ],
          answer: 1,
          explanation: 'The job advertisement lists "Mentor junior accounting staff" as one of the responsibilities.'
        },
        {
          id: 'p7_d1_q2',
          question: 'What qualification does Mr. Reyes mention in his letter that meets the job requirement?',
          choices: [
            'A master\'s degree in finance',
            'Experience working in international markets',
            'A CPA certification',
            'Familiarity with Boston's business community'
          ],
          answer: 2,
          explanation: 'Mr. Reyes writes "I hold a CPA certification," which directly matches the job requirement of "a CPA certification."'
        },
        {
          id: 'p7_d1_q3',
          question: 'What process improvement did Mr. Reyes introduce at his previous employer?',
          choices: [
            'He reduced tax filing errors by 20 percent',
            'He reduced monthly close time by two days',
            'He implemented a new financial reporting system',
            'He cut annual audit costs by 15 percent'
          ],
          answer: 1,
          explanation: 'Mr. Reyes states he "introduced process improvements that reduced monthly close time by two days."'
        },
        {
          id: 'p7_d1_q4',
          question: 'By what date must applications be submitted to Meridian Financial Services?',
          choices: [
            'February 10, 2026',
            'February 16, 2026',
            'March 1, 2026',
            'March 15, 2026'
          ],
          answer: 2,
          explanation: 'The job advertisement states: "Applications must be received by March 1, 2026."'
        },
        {
          id: 'p7_d1_q5',
          question: 'What can be inferred about Mr. Reyes\'s application?',
          choices: [
            'He does not meet the minimum experience requirement',
            'He submitted his application after the deadline',
            'He exceeds the minimum experience requirement stated in the advertisement',
            'He has not yet obtained a CPA certification'
          ],
          answer: 2,
          explanation: 'The job requires "a minimum of five years of accounting experience." Mr. Reyes states he has "seven years of accounting experience" — exceeding the minimum requirement.'
        }
      ]
    },

    // ── Double Passage 2 ──
    {
      id: 'p7_d2',
      type: 'double',
      title: 'Product Announcement & Customer Review',
      passages: [
        {
          label: 'Document 1 — Product Announcement',
          text: `INTRODUCING THE LUMINAR X5 STANDING DESK
Now Available at WorkSpace Direct

WorkSpace Direct is proud to announce the launch of the Luminar X5 Electric Standing Desk — our most advanced height-adjustable workstation to date.

KEY FEATURES:
• Dual electric motors for smooth, whisper-quiet height adjustment
• Height range: 24.5 inches to 50 inches
• Memory settings: Save up to 4 preferred heights
• Anti-collision technology: Automatically stops if an obstacle is detected
• Desktop dimensions: 60" × 30" (available in Walnut, White Oak, and Matte Black)
• Weight capacity: 330 lbs
• Warranty: 7 years on frame, 5 years on motors and electronics

LAUNCH PRICE: $649 (regular price $749 starting April 1)
FREE SHIPPING on orders placed before March 31, 2026.

For more information, visit www.workspacedirect.com or call 1-800-555-0340.`
        },
        {
          label: 'Document 2 — Customer Review',
          text: `★★★★☆ — A solid investment with one minor complaint
Reviewed by: Marcus T. | Verified Purchase | March 5, 2026

I purchased the Luminar X5 in Walnut finish about two weeks ago and have been using it daily. Overall, I'm very impressed. Assembly took about 45 minutes and the instructions were clear. The height adjustment is genuinely quiet — my colleague in the next office couldn't hear it at all.

The 4-position memory feature is incredibly convenient; I saved my sitting and standing heights and switch between them throughout the day without thinking. The desktop surface is large enough to comfortably fit two monitors, a keyboard, and a laptop stand.

My one complaint is the anti-collision feature. It is very sensitive — it stopped moving twice when there was nothing actually blocking it. I've read in other reviews that a firmware update may address this, so I'm hopeful that will fix it.

I paid the launch price of $649 and am glad I didn't wait — the $100 saving was worth it. Would recommend to anyone looking to improve their workspace ergonomics.`
        }
      ],
      questions: [
        {
          id: 'p7_d2_q1',
          question: 'What is the regular price of the Luminar X5 after April 1st?',
          choices: ['$549', '$649', '$699', '$749'],
          answer: 3,
          explanation: 'The announcement states "regular price $749 starting April 1."'
        },
        {
          id: 'p7_d2_q2',
          question: 'What feature does Marcus praise most specifically?',
          choices: [
            'The weight capacity of 330 lbs',
            'The free shipping offer',
            'The 4-position memory feature',
            'The 7-year frame warranty'
          ],
          answer: 2,
          explanation: 'Marcus writes "The 4-position memory feature is incredibly convenient" and describes using it daily. He mentions it most enthusiastically.'
        },
        {
          id: 'p7_d2_q3',
          question: 'What complaint does Marcus have about the desk?',
          choices: [
            'The desktop is too small for two monitors',
            'The warranty period is too short',
            'The assembly instructions were unclear',
            'The anti-collision feature is overly sensitive'
          ],
          answer: 3,
          explanation: 'Marcus says: "My one complaint is the anti-collision feature. It is very sensitive — it stopped moving twice when there was nothing actually blocking it."'
        },
        {
          id: 'p7_d2_q4',
          question: 'How much did Marcus save compared to the regular price?',
          choices: ['$50', '$100', '$149', '$200'],
          answer: 1,
          explanation: 'Marcus paid the launch price of $649. The regular price is $749. $749 − $649 = $100 savings.'
        },
        {
          id: 'p7_d2_q5',
          question: 'What does Marcus suggest may resolve the issue he mentioned?',
          choices: [
            'Returning the desk and buying a different model',
            'Contacting customer support for a replacement part',
            'A firmware update that he read about in other reviews',
            'Adjusting the sensitivity settings manually'
          ],
          answer: 2,
          explanation: 'Marcus writes: "I\'ve read in other reviews that a firmware update may address this, so I\'m hopeful that will fix it."'
        }
      ]
    }
  ];

  return {
    getPart5() { return part5; },
    getPart6() { return part6; },
    getPart7() { return part7; },
    getPart7Single() { return part7.filter(p => p.type === 'single'); },
    getPart7Double() { return part7.filter(p => p.type === 'double'); }
  };

})();
