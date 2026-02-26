/**
 * EnglishPath — TOEIC Simulation Data
 * Fase 14c-2: Simulasi Full Test TOEIC
 *
 * Listening Section (45 min):
 *   Part 1: 6 soal (Photograph Description)
 *   Part 2: 25 soal (Question-Response)
 *   Part 3: 39 soal (Short Conversations, 13 set × 3Q)
 *   Part 4: 30 soal (Short Talks, 10 set × 3Q)
 *   Total LC: 100 soal
 *
 * Reading Section (75 min):
 *   Part 5: 30 soal (Incomplete Sentences)
 *   Part 6: 16 soal (Text Completion, 4 teks × 4 blanks)
 *   Part 7: 54 soal (Reading Comprehension, single + double + triple passage)
 *   Total RC: 100 soal
 */

const TOEICSimData = (() => {

  // ─── LISTENING SECTION ────────────────────────────────────────

  // Part 1: Photograph Description (6 soal)
  const part1 = [
    {
      id: 'sim_p1_01',
      imageDesc: 'A woman is presenting data on a large screen in a boardroom.',
      ttsPrompt: 'Look at the photograph. Choose the statement that best describes what you see.',
      choices: [
        'A woman is cleaning the screen with a cloth.',
        'A woman is pointing at a presentation on a large screen.',
        'A woman is seated at the conference table.',
        'A woman is shaking hands with a colleague.'
      ],
      answer: 1
    },
    {
      id: 'sim_p1_02',
      imageDesc: 'Two men are loading boxes onto a delivery truck in a parking lot.',
      ttsPrompt: 'Look at the photograph. Choose the statement that best describes what you see.',
      choices: [
        'Two men are unloading furniture from a truck.',
        'Two men are loading boxes onto a delivery truck.',
        'The truck is parked in a warehouse.',
        'One man is driving the truck while the other walks.'
      ],
      answer: 1
    },
    {
      id: 'sim_p1_03',
      imageDesc: 'A receptionist is speaking on the phone at a hotel front desk.',
      ttsPrompt: 'Look at the photograph. Choose the statement that best describes what you see.',
      choices: [
        'A receptionist is checking in a hotel guest.',
        'A receptionist is speaking on the phone at a front desk.',
        'A receptionist is typing a report on a computer.',
        'A receptionist is handing a key to a customer.'
      ],
      answer: 1
    },
    {
      id: 'sim_p1_04',
      imageDesc: 'Workers in hard hats are reviewing blueprints at a construction site.',
      ttsPrompt: 'Look at the photograph. Choose the statement that best describes what you see.',
      choices: [
        'Workers are operating heavy machinery at the site.',
        'Workers are taking a lunch break near the building.',
        'Workers in hard hats are reviewing blueprints.',
        'Workers are painting the walls of a new building.'
      ],
      answer: 2
    },
    {
      id: 'sim_p1_05',
      imageDesc: 'A chef is preparing food at a kitchen workstation in a restaurant.',
      ttsPrompt: 'Look at the photograph. Choose the statement that best describes what you see.',
      choices: [
        'A chef is washing dishes in a sink.',
        'A chef is serving food to a customer at a table.',
        'A chef is preparing food at a kitchen workstation.',
        'A chef is reading a menu in the dining area.'
      ],
      answer: 2
    },
    {
      id: 'sim_p1_06',
      imageDesc: 'An office worker is filing documents in a large cabinet.',
      ttsPrompt: 'Look at the photograph. Choose the statement that best describes what you see.',
      choices: [
        'An office worker is searching for a file on a computer.',
        'An office worker is filing documents in a cabinet.',
        'An office worker is making copies at a printer.',
        'An office worker is throwing away old papers.'
      ],
      answer: 1
    }
  ];

  // Part 2: Question-Response (25 soal)
  const part2 = [
    {
      id: 'sim_p2_01',
      question: 'When does the staff meeting start?',
      choices: ['At three o\'clock this afternoon.', 'In the main conference room.', 'The manager will attend.'],
      answer: 0
    },
    {
      id: 'sim_p2_02',
      question: 'Who is responsible for the quarterly report?',
      choices: ['It\'s due next Friday.', 'Sarah from the finance team handles that.', 'The report was very detailed.'],
      answer: 1
    },
    {
      id: 'sim_p2_03',
      question: 'Could you send me the updated project timeline?',
      choices: ['Sure, I\'ll email it right away.', 'The project was completed last month.', 'It was a very long timeline.'],
      answer: 0
    },
    {
      id: 'sim_p2_04',
      question: 'Where should I park when I visit the office?',
      choices: ['The meeting is at nine.', 'There\'s a visitor parking lot on the left side.', 'You can take the elevator to the third floor.'],
      answer: 1
    },
    {
      id: 'sim_p2_05',
      question: 'Have the new computers been installed yet?',
      choices: ['The IT department will handle it tomorrow.', 'They are very expensive.', 'The monitors are on the third floor.'],
      answer: 0
    },
    {
      id: 'sim_p2_06',
      question: 'Why was the product launch delayed?',
      choices: ['We launch new products every quarter.', 'Because of some last-minute quality issues.', 'The product is very popular.'],
      answer: 1
    },
    {
      id: 'sim_p2_07',
      question: 'How many people attended the trade show?',
      choices: ['It was held last October.', 'Over five hundred visitors came.', 'The booths were very colorful.'],
      answer: 1
    },
    {
      id: 'sim_p2_08',
      question: 'Didn\'t you receive my email about the budget changes?',
      choices: ['No, I must have missed it.', 'The budget was approved last week.', 'Yes, the email was very long.'],
      answer: 0
    },
    {
      id: 'sim_p2_09',
      question: 'Would you like me to schedule a follow-up call?',
      choices: ['The call lasted an hour.', 'Yes, Thursday afternoon would work best.', 'She already called yesterday.'],
      answer: 1
    },
    {
      id: 'sim_p2_10',
      question: 'Is the cafeteria open on weekends?',
      choices: ['The food there is excellent.', 'Only on Saturday until two o\'clock.', 'We can eat in the meeting room.'],
      answer: 1
    },
    {
      id: 'sim_p2_11',
      question: 'Which vendor did we choose for the new supplies?',
      choices: ['We ordered too many supplies last time.', 'We went with Global Office Solutions.', 'The supplies arrived yesterday.'],
      answer: 1
    },
    {
      id: 'sim_p2_12',
      question: 'How should I submit my expense report?',
      choices: ['Fill in the online form and attach your receipts.', 'The expense was quite high this month.', 'HR will process it in three days.'],
      answer: 0
    },
    {
      id: 'sim_p2_13',
      question: 'Can the deadline be extended by one week?',
      choices: ['I\'ll check with the project manager and let you know.', 'The deadline was moved to Monday.', 'We completed it ahead of schedule.'],
      answer: 0
    },
    {
      id: 'sim_p2_14',
      question: 'Who will be covering for Ms. Park while she\'s on leave?',
      choices: ['She is taking two weeks off.', 'Daniel from the marketing team will cover.', 'Her office is on the second floor.'],
      answer: 1
    },
    {
      id: 'sim_p2_15',
      question: 'Should we order lunch for the afternoon workshop?',
      choices: ['The workshop runs from one to five.', 'That sounds like a good idea. I\'ll take care of it.', 'Lunch is served in the cafeteria.'],
      answer: 1
    },
    {
      id: 'sim_p2_16',
      question: 'When will the renovation of the lobby be finished?',
      choices: ['The contractor said by the end of this month.', 'The lobby is on the ground floor.', 'We hired a new design firm.'],
      answer: 0
    },
    {
      id: 'sim_p2_17',
      question: 'Do you know where Mr. Lee is?',
      choices: ['He left for a client meeting about an hour ago.', 'His presentation was very impressive.', 'I\'ve worked with him for three years.'],
      answer: 0
    },
    {
      id: 'sim_p2_18',
      question: 'Hasn\'t the printer been repaired yet?',
      choices: ['The technician is coming this afternoon.', 'We printed a hundred copies.', 'The paper tray is empty.'],
      answer: 0
    },
    {
      id: 'sim_p2_19',
      question: 'What time does your flight to Seoul depart?',
      choices: ['I\'m flying Korean Air.', 'It takes about three hours by air.', 'At seven forty-five in the morning.'],
      answer: 2
    },
    {
      id: 'sim_p2_20',
      question: 'Would you prefer to hold the interview in person or online?',
      choices: ['Either works for me — just let me know what\'s more convenient.', 'The interview went very well.', 'We have three candidates scheduled.'],
      answer: 0
    },
    {
      id: 'sim_p2_21',
      question: 'Who approved the new marketing strategy?',
      choices: ['The board of directors approved it last Tuesday.', 'The strategy involves social media campaigns.', 'Marketing is on the fourth floor.'],
      answer: 0
    },
    {
      id: 'sim_p2_22',
      question: 'Are all the conference rooms booked for Friday?',
      choices: ['Rooms A and B are available in the morning.', 'The conference was very productive.', 'We use the large room for presentations.'],
      answer: 0
    },
    {
      id: 'sim_p2_23',
      question: 'Why haven\'t we received the shipment from our supplier?',
      choices: ['The shipment weighed over two hundred kilograms.', 'There was a customs delay at the port.', 'We ordered fifty units in total.'],
      answer: 1
    },
    {
      id: 'sim_p2_24',
      question: 'How do I reset my password for the company portal?',
      choices: ['Click the "Forgot Password" link and follow the instructions.', 'The portal has a lot of useful features.', 'IT set up the system last year.'],
      answer: 0
    },
    {
      id: 'sim_p2_25',
      question: 'Is there a shuttle from the airport to the hotel?',
      choices: ['The hotel is about twenty minutes from the airport.', 'Yes, it runs every thirty minutes.', 'I prefer taking a taxi.'],
      answer: 1
    }
  ];

  // Part 3: Short Conversations (13 set × 3Q = 39 soal)
  const part3 = [
    {
      id: 'sim_p3_01',
      title: 'Meeting Rescheduling',
      ttsScript: 'Woman: Hi, I wanted to confirm our client meeting for Thursday at two. Man: Actually, I have a conflict that afternoon. Would Friday morning work instead? Woman: Friday morning is fine. Should I send a new calendar invite? Man: Yes, please. And could you let the client know as well?',
      questions: [
        { text: 'Why is the meeting being rescheduled?', choices: ['The client cancelled.', 'The man has a conflict on Thursday.', 'The conference room is unavailable.', 'The woman is traveling.'], answer: 1 },
        { text: 'When will the rescheduled meeting take place?', choices: ['Thursday at two', 'Friday morning', 'Monday afternoon', 'Saturday morning'], answer: 1 },
        { text: 'What does the man ask the woman to do?', choices: ['Book a conference room', 'Prepare a presentation', 'Send a new invite and notify the client', 'Call the client directly'], answer: 2 }
      ]
    },
    {
      id: 'sim_p3_02',
      title: 'Office Supply Order',
      ttsScript: 'Man: We\'re running low on printer cartridges. Should I place an order with the usual supplier? Woman: We actually switched to a new supplier last month — they offer better pricing. Man: Do you have the contact information? Woman: It\'s on the company intranet under "Approved Vendors."',
      questions: [
        { text: 'What problem is mentioned?', choices: ['The printer is broken.', 'Printer cartridges are running low.', 'The supplier has not delivered.', 'The intranet is down.'], answer: 1 },
        { text: 'What did the company do last month?', choices: ['Bought a new printer', 'Hired a new employee', 'Switched to a new supplier', 'Updated the intranet'], answer: 2 },
        { text: 'Where can the man find the supplier\'s contact information?', choices: ['In an email from the manager', 'On the company intranet', 'On the old supply invoice', 'From the accounting department'], answer: 1 }
      ]
    },
    {
      id: 'sim_p3_03',
      title: 'Performance Review',
      ttsScript: 'Woman: Your performance this quarter has been outstanding. Your sales numbers were the highest on the team. Man: Thank you. I\'ve been focusing on building better relationships with our key accounts. Woman: It shows. We\'d like to offer you a promotion to senior account manager. Man: That\'s wonderful news. I\'d be honored to accept.',
      questions: [
        { text: 'What did the man excel at this quarter?', choices: ['Customer service scores', 'Sales numbers', 'Cost reduction', 'Team leadership'], answer: 1 },
        { text: 'What has the man been focusing on?', choices: ['Learning new software', 'Building better client relationships', 'Reducing overhead costs', 'Training new employees'], answer: 1 },
        { text: 'What is offered to the man?', choices: ['A salary bonus', 'A new account', 'A promotion to senior account manager', 'Additional vacation days'], answer: 2 }
      ]
    },
    {
      id: 'sim_p3_04',
      title: 'Travel Arrangements',
      ttsScript: 'Man: I need to book flights and a hotel for the Tokyo conference next month. Woman: Have you checked if your travel falls within the approved budget? Man: I looked at it — business class is over budget, but economy is fine. Woman: Go ahead with economy then and I\'ll get the manager\'s approval for the hotel.',
      questions: [
        { text: 'What is the man trying to arrange?', choices: ['A team event', 'Travel to a conference in Tokyo', 'A client dinner reservation', 'An office relocation'], answer: 1 },
        { text: 'What is the problem with business class?', choices: ['It is fully booked.', 'It is over budget.', 'It is not available on that date.', 'The manager does not allow it.'], answer: 1 },
        { text: 'What will the woman do next?', choices: ['Book the economy flight', 'Contact the Tokyo hotel', 'Get the manager\'s approval for the hotel', 'Review the travel policy'], answer: 2 }
      ]
    },
    {
      id: 'sim_p3_05',
      title: 'New Employee Orientation',
      ttsScript: 'Woman: Welcome to the company. Your first week will include orientation sessions, department introductions, and system access setup. Man: When will I be able to start working on actual projects? Woman: Typically by the second week. But feel free to ask your mentor any questions in the meantime. Man: That sounds great. Who will be my mentor?',
      questions: [
        { text: 'What does the first week consist of?', choices: ['Project assignments and training', 'Orientation, introductions, and system setup', 'Client meetings and presentations', 'Only system access setup'], answer: 1 },
        { text: 'When can the man typically start on real projects?', choices: ['Immediately', 'After the first month', 'By the second week', 'After passing an assessment'], answer: 2 },
        { text: 'What does the man ask at the end?', choices: ['About his salary', 'About the office location', 'About his work schedule', 'About his mentor\'s identity'], answer: 3 }
      ]
    },
    {
      id: 'sim_p3_06',
      title: 'Budget Discussion',
      ttsScript: 'Man: The marketing budget for next quarter is fifteen percent lower than this quarter. Woman: That\'s going to be a challenge with the product launch coming up. Man: We may need to prioritize digital channels over print media. Woman: I agree. Digital generally gives us a better return on investment anyway.',
      questions: [
        { text: 'What changed about the marketing budget?', choices: ['It increased by fifteen percent.', 'It was cut by fifteen percent.', 'It was frozen for one quarter.', 'It was moved to product development.'], answer: 1 },
        { text: 'What event is coming up?', choices: ['An annual sales conference', 'A company anniversary', 'A product launch', 'A board presentation'], answer: 2 },
        { text: 'What do the speakers agree to prioritize?', choices: ['Print media campaigns', 'Trade show participation', 'Digital channels', 'Television advertising'], answer: 2 }
      ]
    },
    {
      id: 'sim_p3_07',
      title: 'Equipment Malfunction',
      ttsScript: 'Woman: The projector in Room B isn\'t working again. We have a presentation in twenty minutes. Man: I\'ll call the IT helpdesk right now. Woman: We might need to move to Room C instead if it can\'t be fixed in time. Man: Good idea. I\'ll check if Room C is available.',
      questions: [
        { text: 'What is the problem?', choices: ['The printer ran out of paper.', 'The projector in Room B is not working.', 'The presentation file is corrupted.', 'The room is double-booked.'], answer: 1 },
        { text: 'How soon is the presentation?', choices: ['In ten minutes', 'In twenty minutes', 'In thirty minutes', 'In one hour'], answer: 1 },
        { text: 'What does the man say he will do?', choices: ['Fix the projector himself', 'Postpone the presentation', 'Call IT and check Room C availability', 'Contact the presenter'], answer: 2 }
      ]
    },
    {
      id: 'sim_p3_08',
      title: 'Contract Negotiation',
      ttsScript: 'Man: We\'ve reviewed your proposal and the price point is slightly above our budget. Woman: I understand. If you commit to a two-year contract, we can offer a ten percent discount. Man: That could work. Can we also include a service-level guarantee? Woman: Absolutely. I\'ll revise the proposal and send it by end of day.',
      questions: [
        { text: 'What concern does the man raise?', choices: ['The delivery schedule', 'The quality of the product', 'The price is above budget', 'The contract length'], answer: 2 },
        { text: 'What does the woman offer for a two-year commitment?', choices: ['Free installation', 'Extended warranty', 'Ten percent discount', 'Priority support'], answer: 2 },
        { text: 'What will the woman send by end of day?', choices: ['An invoice', 'A revised proposal', 'A signed contract', 'Product specifications'], answer: 1 }
      ]
    },
    {
      id: 'sim_p3_09',
      title: 'Customer Complaint',
      ttsScript: 'Woman: I received the wrong item in my order. I ordered a blue jacket, but I got a red one. Man: I sincerely apologize for the inconvenience. We\'ll ship the correct item right away. Woman: How long will it take? Man: You should receive it within two to three business days. We\'ll also refund your shipping cost.',
      questions: [
        { text: 'What problem does the customer describe?', choices: ['An item was missing from the order.', 'The wrong color item was delivered.', 'The item arrived damaged.', 'The order was never received.'], answer: 1 },
        { text: 'What will the company do immediately?', choices: ['Issue a full refund', 'Send a replacement item', 'Investigate the warehouse', 'Email a discount coupon'], answer: 1 },
        { text: 'What additional thing will the company refund?', choices: ['The full item cost', 'The handling fee', 'The shipping cost', 'The tax on the order'], answer: 2 }
      ]
    },
    {
      id: 'sim_p3_10',
      title: 'Job Interview',
      ttsScript: 'Man: What experience do you have in project management? Woman: I\'ve managed cross-functional teams for the past four years at my current company. Man: Have you worked with remote teams as well? Woman: Yes, I\'ve led projects with team members in three different countries. Man: Impressive. That aligns well with what we need here.',
      questions: [
        { text: 'How many years of project management experience does the woman have?', choices: ['Two years', 'Three years', 'Four years', 'Five years'], answer: 2 },
        { text: 'What type of teams has the woman managed?', choices: ['Only local teams', 'Cross-functional and remote teams', 'Only technical teams', 'Only sales teams'], answer: 1 },
        { text: 'What does the man say at the end?', choices: ['He offers the woman the position.', 'He asks for references.', 'He says her experience aligns with their needs.', 'He schedules a second interview.'], answer: 2 }
      ]
    },
    {
      id: 'sim_p3_11',
      title: 'Product Feedback',
      ttsScript: 'Woman: The feedback from the focus group on the new product design was mostly positive. Man: What were the main concerns? Woman: They felt the user interface was a bit confusing for first-time users. Man: We should add a guided tutorial then. I\'ll bring it up with the development team.',
      questions: [
        { text: 'What type of event provided feedback on the product?', choices: ['A customer survey', 'A focus group', 'A trade show', 'An internal review'], answer: 1 },
        { text: 'What was the main concern raised?', choices: ['The price was too high.', 'The product was too heavy.', 'The user interface was confusing.', 'The color options were limited.'], answer: 2 },
        { text: 'What solution does the man suggest?', choices: ['Redesigning the product', 'Adding a guided tutorial', 'Lowering the price', 'Conducting another focus group'], answer: 1 }
      ]
    },
    {
      id: 'sim_p3_12',
      title: 'Office Move',
      ttsScript: 'Man: Our new office space will be ready on the first of next month. Woman: That\'s great! Have the moving arrangements been finalized? Man: Yes, we\'ve hired a commercial moving company. They\'ll start on the Saturday before we open. Woman: What about IT? All the systems need to be up before Monday. Man: IT confirmed they\'ll set everything up on Sunday.',
      questions: [
        { text: 'When will the new office be ready?', choices: ['This Friday', 'The first of next month', 'Next quarter', 'In two months'], answer: 1 },
        { text: 'When will the moving company start?', choices: ['On the Monday of the move', 'On the Friday before', 'On the Saturday before opening', 'On the Sunday before opening'], answer: 2 },
        { text: 'What will IT do on Sunday?', choices: ['Pack up the old office equipment', 'Install new computers', 'Set up all the systems', 'Move the server room'], answer: 2 }
      ]
    },
    {
      id: 'sim_p3_13',
      title: 'Quarterly Review Prep',
      ttsScript: 'Woman: The quarterly review is next Tuesday and we still need the sales data from each regional manager. Man: I\'ve received reports from all regions except the Northeast. Woman: Can you follow up with them today? Man: Of course. And do you want me to compile everything into one summary document? Woman: Yes, that would be very helpful. Please have it ready by Monday morning.',
      questions: [
        { text: 'What is happening next Tuesday?', choices: ['A product launch', 'A board meeting', 'A quarterly review', 'A training session'], answer: 2 },
        { text: 'Which region has not submitted its report?', choices: ['Southeast', 'Northwest', 'Southwest', 'Northeast'], answer: 3 },
        { text: 'When does the woman want the summary document?', choices: ['Today by end of day', 'By Friday', 'By Monday morning', 'By Tuesday at the start of the meeting'], answer: 2 }
      ]
    }
  ];

  // Part 4: Short Talks (10 set × 3Q = 30 soal)
  const part4 = [
    {
      id: 'sim_p4_01',
      title: 'Company Announcement',
      ttsScript: 'Attention all staff. Please be advised that the main elevator in Building A will be out of service from Monday through Wednesday next week due to routine maintenance. During this time, please use the elevators in Building B or the stairways in both buildings. We apologize for any inconvenience and thank you for your patience.',
      questions: [
        { text: 'What will be out of service next week?', choices: ['The parking lot in Building A', 'The main elevator in Building A', 'The stairways in Building B', 'The air conditioning in both buildings'], answer: 1 },
        { text: 'How long will the maintenance last?', choices: ['One day', 'Two days', 'Three days', 'Five days'], answer: 2 },
        { text: 'What are employees advised to use instead?', choices: ['A temporary external elevator', 'Escalators', 'Building B elevators or stairways', 'A shuttle bus'], answer: 2 }
      ]
    },
    {
      id: 'sim_p4_02',
      title: 'Retail Store Announcement',
      ttsScript: 'Good afternoon, shoppers. Welcome to FashionWorld\'s end-of-season clearance sale. All summer clothing is now fifty percent off the original price. Children\'s wear is on the second floor, and men\'s and women\'s sections are on the first floor. Our store will remain open until ten o\'clock tonight. Please see a store associate if you need assistance finding a size or style.',
      questions: [
        { text: 'What type of sale is happening?', choices: ['A grand opening sale', 'An end-of-season clearance', 'A holiday promotion', 'A buy-one-get-one offer'], answer: 1 },
        { text: 'How much is the discount on summer clothing?', choices: ['Twenty percent', 'Thirty percent', 'Forty percent', 'Fifty percent'], answer: 3 },
        { text: 'Until what time is the store open tonight?', choices: ['Eight o\'clock', 'Nine o\'clock', 'Ten o\'clock', 'Eleven o\'clock'], answer: 2 }
      ]
    },
    {
      id: 'sim_p4_03',
      title: 'Voicemail Message',
      ttsScript: 'Hello, this is a message for Mr. Thompson. I\'m calling from Premier Accounting regarding the tax documents you submitted last week. We noticed one of the forms appears to be missing your signature on page three. Could you come by our office at your earliest convenience to sign it, or we can send a courier to your location if that would be easier? Please call us back at 555-9300 to let us know your preference.',
      questions: [
        { text: 'Why is the caller contacting Mr. Thompson?', choices: ['His payment is overdue.', 'His documents are missing a signature.', 'His appointment has been rescheduled.', 'His tax return has been processed.'], answer: 1 },
        { text: 'When were the documents submitted?', choices: ['Today', 'Yesterday', 'Last week', 'Last month'], answer: 2 },
        { text: 'What alternative does the caller offer?', choices: ['Accepting an email copy', 'Sending a courier to Mr. Thompson', 'Extending the deadline', 'Completing the form by phone'], answer: 1 }
      ]
    },
    {
      id: 'sim_p4_04',
      title: 'Radio Advertisement',
      ttsScript: 'Are you tired of paying too much for your business internet? Switch to SpeedNet Business Fiber today and get guaranteed speeds of up to one gigabit per second for just ninety-nine dollars a month. That\'s unlimited data, priority support, and a free router setup — all included. Call us at 1-800-SPEEDNET or visit our website to check availability in your area. Switch this month and receive your first two months at half price.',
      questions: [
        { text: 'What product is being advertised?', choices: ['A new laptop model', 'Business fiber internet', 'A cloud storage service', 'A phone plan for businesses'], answer: 1 },
        { text: 'What is the monthly price?', choices: ['Forty-nine dollars', 'Seventy-nine dollars', 'Ninety-nine dollars', 'One hundred nineteen dollars'], answer: 2 },
        { text: 'What is the special offer for switching this month?', choices: ['A free router', 'One month free', 'First two months at half price', 'Free installation'], answer: 2 }
      ]
    },
    {
      id: 'sim_p4_05',
      title: 'Training Session Introduction',
      ttsScript: 'Good morning, everyone. Thank you for joining today\'s customer service excellence workshop. Over the next three hours, we\'ll cover effective communication techniques, handling difficult customers, and using our new CRM software. You\'ll find printed workbooks under your chairs. Please keep all phones on silent during the session. There\'ll be a fifteen-minute break at ten-thirty, and we\'ll wrap up with a short role-playing exercise before lunch.',
      questions: [
        { text: 'What is the focus of today\'s workshop?', choices: ['Sales techniques', 'Customer service excellence', 'Financial planning', 'Leadership development'], answer: 1 },
        { text: 'Where can participants find the workbooks?', choices: ['On the front desk', 'On the tables', 'Under their chairs', 'In a folder handed out at the door'], answer: 2 },
        { text: 'What will happen before lunch?', choices: ['A group discussion', 'A knowledge test', 'A role-playing exercise', 'A software demonstration'], answer: 2 }
      ]
    },
    {
      id: 'sim_p4_06',
      title: 'Airport Announcement',
      ttsScript: 'Ladies and gentlemen, this is a final boarding call for passengers on Flight KE 827 to Hong Kong. The gate is closing in ten minutes. All passengers should proceed immediately to Gate 34 in Terminal 2. Please have your boarding pass and passport ready for inspection. We remind you that carry-on luggage must comply with the size and weight regulations. Thank you.',
      questions: [
        { text: 'What flight is being announced?', choices: ['KE 728 to Singapore', 'KE 827 to Hong Kong', 'KE 278 to Tokyo', 'KE 872 to Seoul'], answer: 1 },
        { text: 'In how many minutes is the gate closing?', choices: ['Five minutes', 'Ten minutes', 'Fifteen minutes', 'Twenty minutes'], answer: 1 },
        { text: 'Where should passengers go?', choices: ['Gate 34 in Terminal 1', 'Gate 43 in Terminal 2', 'Gate 34 in Terminal 2', 'Gate 43 in Terminal 1'], answer: 2 }
      ]
    },
    {
      id: 'sim_p4_07',
      title: 'Investor Briefing',
      ttsScript: 'Good morning. I\'d like to begin our quarterly investor briefing by highlighting our strong performance in the Asia-Pacific region, where revenue grew by twenty-three percent compared to the same period last year. Our e-commerce division has been the primary growth driver, accounting for forty percent of total sales. We\'ve also reduced operating costs by eight percent through process automation. Looking ahead, we plan to expand into two new markets in Southeast Asia by the end of the fiscal year.',
      questions: [
        { text: 'By how much did revenue grow in the Asia-Pacific region?', choices: ['Twelve percent', 'Eighteen percent', 'Twenty-three percent', 'Thirty percent'], answer: 2 },
        { text: 'What is the primary growth driver?', choices: ['The retail division', 'The e-commerce division', 'The logistics division', 'The manufacturing division'], answer: 1 },
        { text: 'What is the company planning by year-end?', choices: ['Launching a new product line', 'Merging with a competitor', 'Expanding into two new Southeast Asian markets', 'Reducing its workforce'], answer: 2 }
      ]
    },
    {
      id: 'sim_p4_08',
      title: 'Tour Guide Speech',
      ttsScript: 'Welcome to the City History Museum. My name is Helen and I\'ll be your guide today. Our tour will take approximately ninety minutes and will cover three floors. We\'ll start on the ground floor with the ancient civilizations exhibit, move to the second floor for the colonial era displays, and finish on the third floor with our contemporary history collection. Photography is permitted, but please use the stairs as the elevator is currently being serviced. Café and gift shop are on the ground floor and will be available after the tour.',
      questions: [
        { text: 'How long will the tour take?', choices: ['Sixty minutes', 'Seventy-five minutes', 'Ninety minutes', 'Two hours'], answer: 2 },
        { text: 'Why should visitors use the stairs?', choices: ['The stairs are faster.', 'The elevator is being serviced.', 'The elevator is too small.', 'The elevator only goes to the second floor.'], answer: 1 },
        { text: 'When is the café available?', choices: ['Before the tour begins', 'During the break between floors', 'After the tour', 'Only on weekdays'], answer: 2 }
      ]
    },
    {
      id: 'sim_p4_09',
      title: 'HR Policy Update',
      ttsScript: 'This is a reminder from Human Resources. Effective the first of next month, the company will implement a new flexible working policy. Full-time employees may choose to work remotely up to two days per week, provided that they inform their manager at least twenty-four hours in advance. Core hours, which are from ten in the morning to three in the afternoon, must be observed on all working days including remote days. The full policy document is available on the company intranet under "HR Policies."',
      questions: [
        { text: 'What is the new policy about?', choices: ['Vacation day allocation', 'Flexible remote work', 'Office dress code', 'Overtime pay'], answer: 1 },
        { text: 'How many days per week can employees work remotely?', choices: ['One day', 'Two days', 'Three days', 'Four days'], answer: 1 },
        { text: 'What are the core working hours?', choices: ['9 AM to 12 PM', '10 AM to 3 PM', '8 AM to 2 PM', '10 AM to 5 PM'], answer: 1 }
      ]
    },
    {
      id: 'sim_p4_10',
      title: 'Product Recall Notice',
      ttsScript: 'Attention customers of HomeSafe Appliances. We are issuing a voluntary recall on our model HS-200 electric kettle, purchased between January and June of this year. A small number of units have been found to have a faulty heating element that may cause overheating. For your safety, please stop using the kettle immediately and contact our customer service line at 1-800-HOMESAFE. We will arrange a free replacement unit or a full refund. We apologize for any inconvenience and thank you for your cooperation.',
      questions: [
        { text: 'Which product is being recalled?', choices: ['HS-100 toaster', 'HS-200 electric kettle', 'HS-300 coffee maker', 'HS-200 rice cooker'], answer: 1 },
        { text: 'What is the reason for the recall?', choices: ['A design defect in the handle', 'A faulty lid mechanism', 'A faulty heating element', 'An electrical short in the cord'], answer: 2 },
        { text: 'What is being offered to affected customers?', choices: ['A discount on next purchase', 'A partial refund', 'A free replacement or full refund', 'Free repair service'], answer: 2 }
      ]
    }
  ];

  // ─── READING SECTION ──────────────────────────────────────────

  // Part 5: Incomplete Sentences (30 soal)
  const part5 = [
    { id:'sim_p5_01', sentence:'The annual sales conference will _____ place at the Riverside Convention Center next month.', choices:['take','make','give','have'], answer:0, explanation:'"Take place" is the correct idiom meaning to happen or occur.' },
    { id:'sim_p5_02', sentence:'All new employees must _____ a background check before starting work.', choices:['undergo','overtake','overlook','overcome'], answer:0, explanation:'"Undergo" means to experience or be subjected to a process. It\'s used for medical checks, tests, and procedures.' },
    { id:'sim_p5_03', sentence:'The company has been _____ in the consumer electronics market for over two decades.', choices:['operating','operated','operate','operation'], answer:0, explanation:'"Has been + present participle" forms the present perfect continuous tense. "Operating" is correct here.' },
    { id:'sim_p5_04', sentence:'Please ensure that all customer data is _____ protected in accordance with privacy regulations.', choices:['adequate', 'adequately', 'adequateness', 'adequation'], answer:1, explanation:'"Adequately" is an adverb modifying the adjective "protected." An adverb is needed to describe how the data should be protected.' },
    { id:'sim_p5_05', sentence:'The board of directors will vote _____ the proposed merger at next week\'s meeting.', choices:['for','to','about','on'], answer:3, explanation:'"Vote on" something means to decide about it by voting. "Vote on the merger" is the correct collocation.' },
    { id:'sim_p5_06', sentence:'The IT department is _____ a software update to fix the security vulnerability.', choices:['deploying','displaying','delaying','disposing'], answer:0, explanation:'"Deploying a software update" means releasing and installing it. This is standard IT terminology.' },
    { id:'sim_p5_07', sentence:'She was recognized _____ her outstanding contributions to the company\'s growth.', choices:['with','of','for','by'], answer:2, explanation:'"Recognized for" something is the standard collocation. "For" introduces the reason for recognition.' },
    { id:'sim_p5_08', sentence:'The contract includes a _____ that allows either party to terminate the agreement with sixty days\' notice.', choices:['policy','clause','statement','condition'], answer:1, explanation:'"Clause" is the legal term for a specific provision or condition in a contract.' },
    { id:'sim_p5_09', sentence:'Stock prices fluctuated _____ throughout the trading session due to mixed economic signals.', choices:['significantly','significant','significance','signify'], answer:0, explanation:'"Fluctuated" is a verb and needs an adverb to describe how prices fluctuated. "Significantly" is an adverb.' },
    { id:'sim_p5_10', sentence:'The HR department will _____ a series of wellness workshops starting next month.', choices:['conduct','conduction','conducted','conducting'], answer:0, explanation:'"Will + base verb" — the base form "conduct" is needed after the modal "will."' },
    { id:'sim_p5_11', sentence:'We need to _____ our marketing strategy to stay competitive in the current market.', choices:['revise','revision','revised','revising'], answer:0, explanation:'"Need to + base verb" — the infinitive "revise" is required after "to."' },
    { id:'sim_p5_12', sentence:'The financial _____ for Q3 showed a fifteen percent increase in net revenue.', choices:['results','result','resulting','resulted'], answer:0, explanation:'"Financial results" is the standard noun phrase used in business reporting.' },
    { id:'sim_p5_13', sentence:'A comprehensive training program has been _____ for all frontline staff.', choices:['developed','developing','develop','developer'], answer:0, explanation:'"Has been + past participle" forms the present perfect passive. "Developed" is the past participle.' },
    { id:'sim_p5_14', sentence:'The purchasing department is _____ several vendors to find the best price.', choices:['comparing','compare','compared','comparison'], answer:0, explanation:'"Is + present participle" forms the present continuous. "Comparing" is correct.' },
    { id:'sim_p5_15', sentence:'Due to the renovation, the office will be _____ to the fifth floor temporarily.', choices:['relocated', 'relocation','relocating','relocate'], answer:0, explanation:'"Will be + past participle" is the future passive. "Relocated" is the past participle of "relocate."' },
    { id:'sim_p5_16', sentence:'_____ sales targets were met last quarter, bonuses will be distributed in January.', choices:['Although','Unless','Since','Despite'], answer:2, explanation:'"Since" introduces a cause-and-effect relationship. Since targets were met (cause), bonuses will be given (effect).' },
    { id:'sim_p5_17', sentence:'The new regulation _____ all companies to disclose their carbon emissions annually.', choices:['requires','requests','recommends','reminds'], answer:0, explanation:'"Requires" expresses a mandatory obligation. "The regulation requires companies to..." is the correct legal/formal usage.' },
    { id:'sim_p5_18', sentence:'The CEO gave a _____ speech at the annual company dinner, thanking employees for their hard work.', choices:['heartfelt','heartless','heartening','heartbeat'], answer:0, explanation:'"Heartfelt" means sincere and genuine. "A heartfelt speech" is a common collocation.' },
    { id:'sim_p5_19', sentence:'All employees are _____ to attend the mandatory fire safety training.', choices:['obliged','obliging','obligation','obligatory'], answer:0, explanation:'"Are obliged to" means required or expected to. It\'s used with people: "employees are obliged to attend."' },
    { id:'sim_p5_20', sentence:'The merger was _____ approved by the shareholders at last month\'s general meeting.', choices:['unanimous','unanimously','unanimity','unanimize'], answer:1, explanation:'"Unanimously" is an adverb modifying "approved." It means approved by everyone without exception.' },
    { id:'sim_p5_21', sentence:'We are committed to providing a _____ and inclusive workplace for all employees.', choices:['diversity','diverse','diversify','diversified'], answer:1, explanation:'"Diverse" is an adjective modifying "workplace." "A diverse and inclusive workplace" is the standard phrase.' },
    { id:'sim_p5_22', sentence:'The seminar _____ a wide range of topics related to digital transformation.', choices:['covered','covering','cover','covers'], answer:3, explanation:'Simple present "covers" describes what the seminar (generally or habitually) does as a topic-covering event.' },
    { id:'sim_p5_23', sentence:'Please submit your application _____ the deadline of October 31st.', choices:['before','within','by','until'], answer:2, explanation:'"By the deadline" means no later than that date. "By" is the standard preposition for deadlines.' },
    { id:'sim_p5_24', sentence:'The executive team was pleased with the _____ of the new product line.', choices:['perform','performance','performing','performed'], answer:1, explanation:'"Pleased with the performance" — "performance" is a noun, which is needed after "the" and "with."' },
    { id:'sim_p5_25', sentence:'Sales of the product have _____ steadily over the past three years.', choices:['risen','raised','arisen','arose'], answer:0, explanation:'"Risen" is the past participle of "rise" (intransitive — no object). Sales rise on their own; you don\'t "raise sales" here because "have" indicates present perfect.' },
    { id:'sim_p5_26', sentence:'The company offers _____ benefits that include dental, vision, and life insurance.', choices:['competitive','competition','compete','competitor'], answer:0, explanation:'"Competitive benefits" is the standard phrase meaning benefits that are comparable to or better than other companies.' },
    { id:'sim_p5_27', sentence:'The project manager will _____ the progress of the construction every two weeks.', choices:['monitor','monitoring','monitorization','monitored'], answer:0, explanation:'"Will + base verb" — after the modal "will," use the base form "monitor."' },
    { id:'sim_p5_28', sentence:'Our customer service team is available _____ the clock to assist you.', choices:['over','around','through','along'], answer:1, explanation:'"Around the clock" means 24 hours a day, 7 days a week.' },
    { id:'sim_p5_29', sentence:'After careful _____, the committee decided to approve the new health and safety guidelines.', choices:['deliberation','deliberate','deliberately','deliberating'], answer:0, explanation:'"After careful deliberation" — "deliberation" is a noun meaning careful thought and discussion.' },
    { id:'sim_p5_30', sentence:'The vendor _____ the delivery date three times, causing significant delays to our production schedule.', choices:['postponed','proposed','promoted','processed'], answer:0, explanation:'"Postponed" means delayed to a later time. The vendor pushed back the delivery date repeatedly.' }
  ];

  // Part 6: Text Completion (4 teks × 4 blanks = 16 soal)
  const part6 = [
    {
      id: 'sim_p6_01',
      title: 'Internal Memo — Remote Work Policy',
      text: 'TO: All Staff\nFROM: Human Resources\nRE: Updated Remote Work Policy\n\nEffective {B1} of next month, the company will expand its remote work options for eligible employees. Staff members who have been with the company for at least six months may apply to work remotely up to {B2} days per week.\n\nTo be eligible, employees must have a dedicated workspace at home, a reliable internet connection, and must maintain {B3} availability during core business hours. Applications should be submitted to your department head by the fifteenth of this month.\n\nThis policy is designed to improve work-life balance while {B4} the company\'s performance standards.',
      blanks: [
        { id:'B1', choices:['the first', 'a first', 'the one', 'first'], answer:0, explanation:'"The first of next month" is the standard way to refer to a specific date.' },
        { id:'B2', choices:['the', 'a', 'three', 'several'], answer:2, explanation:'"Up to three days per week" specifies the maximum number.' },
        { id:'B3', choices:['full', 'fuller', 'fully', 'fullness'], answer:0, explanation:'"Full availability" — an adjective is needed before the noun "availability."' },
        { id:'B4', choices:['maintained', 'maintaining', 'to maintain', 'maintain'], answer:1, explanation:'"While maintaining" — the preposition "while" is followed by a gerund (-ing form).' }
      ]
    },
    {
      id: 'sim_p6_02',
      title: 'Business Email — Project Update',
      text: 'Dear Ms. Tanaka,\n\nI wanted to {B1} you on the current status of the Henderson account project. The initial research phase has been completed {B2} schedule, and our team is now moving into the analysis stage.\n\nWe anticipate the full report will be ready by the end of next week. {B3}, we may need to schedule an additional review meeting to discuss the findings before the final presentation.\n\nPlease let me know if you have any questions or if there are specific areas you would like us to {B4} particular attention to.\n\nBest regards,\nDavid Chen',
      blanks: [
        { id:'B1', choices:['update', 'inform', 'brief', 'notify'], answer:0, explanation:'"Update you on the status" is the standard business email phrase.' },
        { id:'B2', choices:['ahead of', 'in front of', 'before', 'prior'], answer:0, explanation:'"Completed ahead of schedule" means finished earlier than planned. This is a standard business idiom.' },
        { id:'B3', choices:['However', 'Therefore', 'Furthermore', 'Instead'], answer:2, explanation:'"Furthermore" adds additional information. The writer is adding that a review meeting may also be needed.' },
        { id:'B4', choices:['pay', 'give', 'spend', 'put'], answer:0, explanation:'"Pay attention to" is the standard collocation. Other verbs do not collocate naturally with "attention" in this context.' }
      ]
    },
    {
      id: 'sim_p6_03',
      title: 'Job Advertisement',
      text: 'SALES MANAGER — ASIA PACIFIC\nDivision: Commercial Sales\nLocation: Singapore (Regional Hub)\n\nWe are seeking a {B1} Sales Manager to lead our growing Asia Pacific team. The ideal candidate will have a proven track record in B2B sales and at least eight years of {B2} experience in the industry.\n\nResponsibilities include managing a team of twelve sales representatives, developing regional strategies, and building strong client {B3}.\n\nWe offer a competitive salary package and excellent benefits. {B4} candidates should submit their résumé and a cover letter to hr@globalventures.com.',
      blanks: [
        { id:'B1', choices:['dynamics', 'dynamic', 'dynamically', 'dynamism'], answer:1, explanation:'"A dynamic Sales Manager" — "dynamic" is an adjective modifying the noun "Sales Manager."' },
        { id:'B2', choices:['related', 'relatable', 'relevantly', 'relevant'], answer:3, explanation:'"Relevant experience" means experience that is applicable to the position.' },
        { id:'B3', choices:['relations', 'relationship', 'relationships', 'relating'], answer:2, explanation:'"Building strong client relationships" is the standard phrase in sales and business.' },
        { id:'B4', choices:['Interest', 'Interested', 'Interesting', 'Interestingly'], answer:1, explanation:'"Interested candidates" — "interested" is an adjective (past participle used as adjective) describing people who have interest in applying.' }
      ]
    },
    {
      id: 'sim_p6_04',
      title: 'Customer Newsletter',
      text: 'VALUED CUSTOMER NOTICE\n\nAs part of our ongoing commitment to {B1} you with the best possible service, we are upgrading our online ordering system. The upgrade will take place this Saturday between midnight and 6:00 AM.\n\nDuring this time, the online store will be temporarily {B2}. We apologize for any inconvenience and appreciate your {B3}.\n\nOnce the upgrade is complete, you will {B4} a faster checkout process, improved product search, and personalized recommendations based on your purchase history.\n\nThank you for being a loyal customer.',
      blanks: [
        { id:'B1', choices:['providing', 'provide', 'provided', 'provision'], answer:0, explanation:'"Commitment to providing" — after "to" (as a preposition), use the gerund (-ing form).' },
        { id:'B2', choices:['unavailable', 'unavailiable', 'unavailible', 'unavaileable'], answer:0, explanation:'"Temporarily unavailable" is the correct spelling and the standard phrase for a service that is down.' },
        { id:'B3', choices:['patient', 'patiently', 'patience', 'patients'], answer:2, explanation:'"Appreciate your patience" is the standard customer service expression. "Patience" is a noun.' },
        { id:'B4', choices:['enjoy', 'experience', 'benefit', 'receive'], answer:1, explanation:'"Experience a faster checkout process" — customers will go through/experience the new features.' }
      ]
    }
  ];

  // Part 7: Reading Comprehension
  // Single passages: 3 passages × 3–4 soal = 10 soal
  // Double passages: 2 sets × 5 soal = 10 soal
  // We'll include 3 single + 2 double for a total manageable simulation
  const part7 = [
    // Single Passage 1
    {
      id: 'sim_p7_s1',
      type: 'single',
      title: 'Email — Contract Renewal',
      passage: `From: Patricia Moore <p.moore@globallogix.com>
To: Sales Team
Subject: Annual Contract Renewal Reminder

Dear Sales Team,

This is a reminder that annual contract renewal season begins on the first of next month. Clients whose contracts expire within the next ninety days should be contacted no later than sixty days before their expiration date.

Please review your client portfolios and identify any contracts that will be expiring. Prepare a renewal proposal that includes updated pricing, service level agreements, and any new features or add-ons we are currently offering.

All renewal proposals must be reviewed and approved by your department manager before being sent to clients. Once approved, proposals should be emailed directly to the client contact and a copy forwarded to contracts@globallogix.com.

If you anticipate any challenges with specific accounts, please schedule a brief meeting with me so we can discuss strategy. I want to ensure that our renewal rate remains above ninety percent this year.

Best regards,
Patricia Moore
Head of Sales`,
      questions: [
        { text: 'What is the main purpose of this email?', choices: ['To announce new product features', 'To remind the sales team about contract renewals', 'To introduce a new contract management system', 'To report last year\'s renewal rate'], answer: 1 },
        { text: 'How far in advance should clients be contacted before contract expiration?', choices: ['Thirty days', 'Forty-five days', 'Sixty days', 'Ninety days'], answer: 2 },
        { text: 'What must happen before sending a renewal proposal to a client?', choices: ['The client must request it.', 'It must be approved by the department manager.', 'It must be sent to contracts@globallogix.com first.', 'It must be reviewed by the legal department.'], answer: 1 },
        { text: 'What does Patricia Moore say about the renewal rate?', choices: ['It should match last year\'s rate.', 'It should stay above ninety percent.', 'It declined significantly last year.', 'It is not a priority this year.'], answer: 1 }
      ]
    },
    // Single Passage 2
    {
      id: 'sim_p7_s2',
      type: 'single',
      title: 'Notice — Office Renovation',
      passage: `NOTICE TO ALL STAFF
Building Management — Clifton Tower

This notice is to inform all tenants that planned renovation work will be carried out on floors 14 through 18 from March 3 to March 21. The work will involve replacing the HVAC system, repainting all corridors, and upgrading the electrical wiring.

During the renovation period, the following temporary arrangements will be in effect:

1. The freight elevator will be available exclusively for contractors between 8:00 AM and 12:00 PM on weekdays.
2. The main stairwells on the affected floors will be partially restricted. Please use the central stairwell.
3. Noise levels may be elevated between 9:00 AM and 4:00 PM.
4. Dust filtration screens will be installed at all entry points to affected floors.

We ask that all personnel on the affected floors make alternative meeting arrangements where possible. Shared meeting rooms on floors 10 and 12 are available for booking through the online reservation system.

For questions or concerns, contact Building Management at ext. 4400 or buildingmgmt@cliftontower.com.

We apologize for the inconvenience and thank you for your cooperation.`,
      questions: [
        { text: 'What is the main subject of the notice?', choices: ['A new tenant policy', 'Renovation work on several floors', 'An emergency evacuation drill', 'Changes to the elevator schedule'], answer: 1 },
        { text: 'When is the freight elevator available only to contractors?', choices: ['All day on weekdays', 'From 8 AM to 12 PM on weekdays', 'From 12 PM to 5 PM on weekdays', 'On weekends only'], answer: 1 },
        { text: 'Where should affected floor staff hold meetings?', choices: ['On floor 14', 'In the building lobby area', 'On floors 10 and 12', 'In the central stairwell'], answer: 2 }
      ]
    },
    // Single Passage 3
    {
      id: 'sim_p7_s3',
      type: 'single',
      title: 'Article — Workplace Productivity',
      passage: `Remote Work and Productivity: What the Data Shows

A recent study conducted by WorkTrends Research Group followed 2,400 professionals across ten countries over eighteen months to measure the impact of remote and hybrid work models on productivity, engagement, and well-being.

The study found that employees working in hybrid arrangements — typically two to three days in the office and the remaining days from home — reported the highest levels of both productivity and job satisfaction. Fully remote workers scored higher on focus-related tasks but lower on measures of collaboration and team cohesion.

Interestingly, the data also revealed that employees who had access to dedicated home office equipment provided by their employer showed a twenty-seven percent higher productivity score compared to those who did not. This suggests that companies investing in home office infrastructure see a measurable return.

On the other hand, employees who frequently participated in unstructured video calls — those without a clear agenda or defined outcomes — reported a twenty percent drop in daily productive hours.

The study's lead researcher, Dr. Andrea Marsh, recommends that organizations adopt clear communication protocols, define expectations for both in-office and remote days, and invest in ergonomic home office setups for their remote staff.`,
      questions: [
        { text: 'Which work arrangement led to the highest productivity and satisfaction?', choices: ['Fully remote', 'Fully in-office', 'Hybrid (2–3 days in office)', 'Rotating weekly schedule'], answer: 2 },
        { text: 'What does the study say about company-provided home office equipment?', choices: ['It had no significant impact.', 'It improved productivity by twenty-seven percent.', 'It was preferred by only senior employees.', 'It reduced office costs by fifteen percent.'], answer: 1 },
        { text: 'According to the study, what led to a drop in productive hours?', choices: ['Working from home full-time', 'Participating in unstructured video calls', 'Having too many in-person meetings', 'Lack of home office equipment'], answer: 1 }
      ]
    },
    // Double Passage 1
    {
      id: 'sim_p7_d1',
      type: 'double',
      title: 'Job Posting + Application Email',
      passage1: `JOB POSTING
Position: Senior Graphic Designer
Company: BrightWave Creative Agency
Location: Remote (must be available EST timezone)

BrightWave Creative Agency is looking for a Senior Graphic Designer to join our growing design team. The ideal candidate will have at least five years of professional design experience, proficiency in Adobe Creative Suite, and a strong portfolio.

Responsibilities include creating visual content for client campaigns, collaborating with the marketing and copywriting teams, and mentoring junior designers.

We offer a competitive salary, flexible working hours, professional development support, and full medical and dental benefits.

To apply, submit your CV, portfolio link, and a brief cover letter explaining why you are a great fit for BrightWave to careers@brightwavecreative.com by October 15.`,
      passage2: `From: Jennifer Hartley <j.hartley@designstudio.net>
To: careers@brightwavecreative.com
Subject: Application — Senior Graphic Designer

Dear Hiring Team,

I am writing to apply for the Senior Graphic Designer position advertised on your website. I have seven years of experience in brand and digital design, specializing in visual identity and marketing collateral.

My current role at PixelStudio involves leading the design team of four and managing relationships with key clients in the retail and tech sectors. I am proficient in the full Adobe Creative Suite and have recently expanded my skills to include motion graphics using After Effects.

I am particularly drawn to BrightWave because of your reputation for purpose-driven campaigns. My portfolio, which you can view at www.jenniferhartley.design, showcases projects that I believe align well with your agency's focus.

I look forward to the opportunity to discuss how I can contribute to your team.

Best regards,
Jennifer Hartley`,
      questions: [
        { text: 'What is the minimum experience required for the job?', choices: ['Three years', 'Four years', 'Five years', 'Seven years'], answer: 2 },
        { text: 'What is one benefit mentioned in the job posting?', choices: ['Stock options', 'Relocation assistance', 'Professional development support', 'Company car'], answer: 2 },
        { text: 'How many years of experience does Jennifer have?', choices: ['Five', 'Six', 'Seven', 'Eight'], answer: 2 },
        { text: 'What recent skill has Jennifer added to her portfolio?', choices: ['3D modeling', 'Motion graphics using After Effects', 'UX/UI design', 'Photography'], answer: 1 },
        { text: 'What does Jennifer say drew her to BrightWave?', choices: ['The flexible hours', 'The salary', 'BrightWave\'s reputation for purpose-driven campaigns', 'BrightWave\'s team size'], answer: 2 }
      ]
    },
    // Double Passage 2
    {
      id: 'sim_p7_d2',
      type: 'double',
      title: 'Press Release + Customer Review',
      passage1: `PRESS RELEASE
FOR IMMEDIATE RELEASE

NovaTech Announces Launch of SmartDesk Pro
The AI-Powered Workspace Assistant

SILICON VALLEY, CA — NovaTech today announced the launch of SmartDesk Pro, an AI-powered desk assistant designed to enhance workplace productivity. SmartDesk Pro integrates with major calendar, email, and project management platforms, allowing users to manage their day without switching between multiple applications.

Key features include AI meeting summaries, smart scheduling that learns user preferences over time, and a distraction-free focus mode that blocks non-essential notifications during deep work sessions.

SmartDesk Pro is available starting at $149 per user per year. Enterprise pricing is available for teams of twenty or more. A thirty-day free trial is available at www.novatech.com/smartdesk.

"We built SmartDesk Pro to solve the productivity bottleneck created by application overload," said CEO Marcus Liu. "Our users can now spend less time managing tools and more time doing their best work."`,
      passage2: `CUSTOMER REVIEW — SmartDesk Pro
Rating: 4.5 / 5 stars
Posted by: Mark T. | Verified Purchase

I've been using SmartDesk Pro for three months now and it has genuinely changed how I manage my workday. The AI meeting summaries are incredibly accurate and save me about thirty minutes a day that I used to spend writing up notes. The smart scheduling feature took about two weeks to "learn" my preferences, but once it did, it started blocking out focus time automatically at the right parts of my day.

The only downside I've noticed is that the integration with one of the project management tools I use — not one of the main supported platforms — is a bit limited. I've had to manually sync some tasks. Not a dealbreaker, but something NovaTech could improve.

All in all, this is one of the best productivity tools I've invested in this year. I'm on a small team of eight and we all use it now. Definitely worth the price.`,
      questions: [
        { text: 'What is the starting price of SmartDesk Pro?', choices: ['$99 per user per year', '$149 per user per year', '$199 per user per year', '$249 per user per year'], answer: 1 },
        { text: 'According to the press release, what problem does SmartDesk Pro solve?', choices: ['High software licensing costs', 'Productivity bottleneck from application overload', 'Difficulty managing remote teams', 'Security issues with email platforms'], answer: 1 },
        { text: 'How much time does Mark save per day using the AI meeting summaries?', choices: ['Fifteen minutes', 'Twenty minutes', 'Twenty-five minutes', 'Thirty minutes'], answer: 3 },
        { text: 'What limitation does Mark mention?', choices: ['The app crashes frequently.', 'The smart scheduling never worked.', 'Integration with one non-standard project management tool is limited.', 'The interface is difficult to use.'], answer: 2 },
        { text: 'How many people on Mark\'s team use SmartDesk Pro?', choices: ['Three', 'Five', 'Eight', 'Twenty'], answer: 2 }
      ]
    }
  ];

  // ─── Score Conversion ─────────────────────────────────────────
  // TOEIC Official Scale Conversion (approximate)
  // Listening: 0–100 correct → 5–495
  // Reading:   0–100 correct → 5–495
  function convertScore(correct, total, section) {
    const pct = correct / total;
    const maxScale = 495;
    const minScale = 5;
    // Approximate conversion curve (non-linear like real TOEIC)
    let scaled;
    if (pct >= 0.98) scaled = 495;
    else if (pct >= 0.95) scaled = Math.round(480 + (pct - 0.95) / 0.03 * 15);
    else if (pct >= 0.90) scaled = Math.round(455 + (pct - 0.90) / 0.05 * 25);
    else if (pct >= 0.85) scaled = Math.round(425 + (pct - 0.85) / 0.05 * 30);
    else if (pct >= 0.80) scaled = Math.round(395 + (pct - 0.80) / 0.05 * 30);
    else if (pct >= 0.75) scaled = Math.round(360 + (pct - 0.75) / 0.05 * 35);
    else if (pct >= 0.70) scaled = Math.round(325 + (pct - 0.70) / 0.05 * 35);
    else if (pct >= 0.65) scaled = Math.round(290 + (pct - 0.65) / 0.05 * 35);
    else if (pct >= 0.60) scaled = Math.round(255 + (pct - 0.60) / 0.05 * 35);
    else if (pct >= 0.50) scaled = Math.round(200 + (pct - 0.50) / 0.10 * 55);
    else if (pct >= 0.40) scaled = Math.round(150 + (pct - 0.40) / 0.10 * 50);
    else if (pct >= 0.30) scaled = Math.round(100 + (pct - 0.30) / 0.10 * 50);
    else if (pct >= 0.20) scaled = Math.round(60 + (pct - 0.20) / 0.10 * 40);
    else if (pct >= 0.10) scaled = Math.round(25 + (pct - 0.10) / 0.10 * 35);
    else scaled = Math.round(5 + pct / 0.10 * 20);

    return Math.max(minScale, Math.min(maxScale, Math.round(scaled / 5) * 5));
  }

  return {
    getPart1() { return part1; },
    getPart2() { return part2; },
    getPart3() { return part3; },
    getPart4() { return part4; },
    getPart5() { return part5; },
    getPart6() { return part6; },
    getPart7() { return part7; },
    convertScore
  };

})();
