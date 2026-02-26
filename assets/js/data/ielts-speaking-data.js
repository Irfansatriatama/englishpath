/**
 * EnglishPath — IELTS Speaking Data
 * Fase 13c-1: Practice per Skill — Speaking
 * Part 1: 8 topics × 5 questions, Part 2: 6 cue cards, Part 3: 6 topics
 */
const IELTSSpeakingData = (() => {

  const part1Topics = [
    {
      id: 'p1_hometown',
      title: 'Hometown & Home',
      icon: '🏡',
      questions: [
        { id: 'q1', text: 'Where are you from?', model: 'I\'m originally from Bandung, a city in West Java, Indonesia. It\'s known for its cool climate, creative arts scene, and delicious food — especially local dishes like sundanese cuisine.' },
        { id: 'q2', text: 'What do you like most about your hometown?', model: 'What I love most is the weather — it\'s much cooler than Jakarta. I also appreciate the strong sense of community and the fact that it\'s a creative city with lots of music, fashion, and art.' },
        { id: 'q3', text: 'Has your hometown changed much in recent years?', model: 'Yes, quite significantly. There\'s been a lot of urban development, with new shopping malls and residential areas. The traffic has also become heavier, which is a bit of a downside.' },
        { id: 'q4', text: 'Would you like to live somewhere else in the future?', model: 'I\'d love to experience living abroad, perhaps in a European city for a few years, just to broaden my horizons. But ultimately, I think I\'d return home — there\'s a comfort in familiar surroundings.' },
        { id: 'q5', text: 'Do you live in a house or an apartment?', model: 'I currently live in an apartment in the city centre, which is very convenient for work and transport. It\'s compact but has everything I need. I\'d eventually like a house with a garden though.' }
      ]
    },
    {
      id: 'p1_work_study',
      title: 'Work & Study',
      icon: '💼',
      questions: [
        { id: 'q1', text: 'Are you working or studying at the moment?', model: 'I\'m currently working as a marketing coordinator for a mid-sized technology company. I\'ve been in this role for about two years, and I find it both challenging and rewarding.' },
        { id: 'q2', text: 'What do you enjoy most about your work or studies?', model: 'I particularly enjoy the creative aspects of my job — developing campaign ideas and seeing them come to life. I also love collaborating with my team and learning from more experienced colleagues.' },
        { id: 'q3', text: 'What are your future career plans?', model: 'In the next five years, I\'d like to move into a management role and eventually specialise in digital marketing strategy. I\'m also considering pursuing a postgraduate qualification to strengthen my skills.' },
        { id: 'q4', text: 'Do you prefer working alone or in a team?', model: 'I enjoy both, actually. Working alone gives me focus and independence, while teamwork brings energy and diverse perspectives. It really depends on the task — some projects call for deep individual concentration, others thrive on collaboration.' },
        { id: 'q5', text: 'Is there a job you\'ve always dreamed of doing?', model: 'When I was a child, I wanted to be an astronaut! Now my dream is a bit more grounded — I\'d love to run my own creative agency one day, where I can lead projects I\'m truly passionate about.' }
      ]
    },
    {
      id: 'p1_free_time',
      title: 'Free Time & Hobbies',
      icon: '🎨',
      questions: [
        { id: 'q1', text: 'What do you like doing in your free time?', model: 'I have quite a few hobbies. Reading is my main one — I love fiction, particularly contemporary novels. I also enjoy cooking, cycling at weekends, and occasionally watching films or series with friends.' },
        { id: 'q2', text: 'Do you have enough free time?', model: 'To be honest, not always. Work can get quite busy, and when I get home I\'m often tired. But I try to protect at least a couple of evenings a week for activities I enjoy — it\'s important for my mental wellbeing.' },
        { id: 'q3', text: 'Did you have different hobbies as a child?', model: 'Definitely. As a child I was obsessed with drawing and painting. I spent hours creating characters and telling stories through illustrations. I still doodle occasionally, but I don\'t dedicate as much time to it as I used to.' },
        { id: 'q4', text: 'Is there a hobby you\'d like to take up?', model: 'I\'ve always wanted to learn to play the guitar. I started a few times but never stuck with it. With more discipline I think I could really enjoy it — music is such a universal language.' },
        { id: 'q5', text: 'Do you prefer indoor or outdoor activities?', model: 'It depends on my mood. Outdoors, I love cycling and hiking in nature. Indoors, I enjoy reading, cooking, and board games with friends. I try to balance both throughout the week.' }
      ]
    },
    {
      id: 'p1_food',
      title: 'Food & Cooking',
      icon: '🍜',
      questions: [
        { id: 'q1', text: 'What kind of food do you most enjoy eating?', model: 'I have a real passion for Asian cuisine — particularly Indonesian and Japanese food. I love the bold flavours, the use of fresh herbs and spices, and the variety. A bowl of ramen or a plate of nasi goreng can genuinely make my day.' },
        { id: 'q2', text: 'Do you enjoy cooking?', model: 'Very much so. I find cooking therapeutic — it allows me to be creative and focus on something other than work. I cook most of my meals at home and I enjoy experimenting with new recipes, especially on weekends.' },
        { id: 'q3', text: 'What did you eat when you were growing up?', model: 'Traditional Indonesian home cooking, mostly. My grandmother was an incredible cook. We\'d have dishes like soto ayam, rendang, and lots of rice-based meals. Very flavoursome and comforting.' },
        { id: 'q4', text: 'Are there any foods you dislike?', model: 'I\'m not particularly fond of very bitter vegetables like bitter melon. And I don\'t love excessively spicy food, though I appreciate a moderate level of heat. I\'m pretty adventurous apart from those!' },
        { id: 'q5', text: 'Do you prefer eating at home or in restaurants?', model: 'Both have their appeal. At home I control the ingredients and it\'s more economical. Restaurants offer variety and a social experience. I probably eat at home four or five nights a week and go out the rest.' }
      ]
    },
    {
      id: 'p1_travel',
      title: 'Travel & Transport',
      icon: '✈️',
      questions: [
        { id: 'q1', text: 'How often do you travel?', model: 'I try to travel at least two or three times a year — usually within Southeast Asia for shorter trips and occasionally further afield. Travelling opens my mind and gives me new perspectives.' },
        { id: 'q2', text: 'Do you prefer travelling by plane, train, or car?', model: 'For long distances, I prefer flying as it saves time. For medium journeys, trains are wonderful — you can watch the scenery and feel more connected to the landscape. Cars are convenient for short trips.' },
        { id: 'q3', text: 'What is the most memorable place you\'ve visited?', model: 'Without doubt, Kyoto in Japan. The temples, gardens, and traditional wooden houses were breathtaking. There was a wonderful sense of calm and timelessness that I\'ve rarely experienced elsewhere.' },
        { id: 'q4', text: 'Do you prefer travelling alone or with others?', model: 'Each has its merits. Solo travel is incredibly liberating — you set your own pace and are more open to chance encounters. Travelling with friends or family creates shared memories. I enjoy both depending on the trip.' },
        { id: 'q5', text: 'Is there a place you\'d really like to visit?', model: 'I\'d love to visit Patagonia in South America — the dramatic landscapes and remoteness really appeal to me. Iceland is another destination on my list, particularly for the northern lights and geothermal activity.' }
      ]
    },
    {
      id: 'p1_technology',
      title: 'Technology & Internet',
      icon: '💻',
      questions: [
        { id: 'q1', text: 'How often do you use the internet?', model: 'Almost constantly throughout the day — both for work and personal use. I use it for research, communication, entertainment, and shopping. It\'s become such an integral part of modern life that it\'s hard to imagine living without it.' },
        { id: 'q2', text: 'Do you think technology has improved your life?', model: 'On balance, yes. It\'s made communication easier, information more accessible, and many tasks more efficient. That said, it\'s important to maintain a healthy relationship with technology and not let it dominate all of our time.' },
        { id: 'q3', text: 'What do you mainly use your phone for?', model: 'Primarily communication — calls, messages, and emails. But also for music, podcasts, navigation, and managing my calendar. I try to limit social media use as I find it can be quite time-consuming.' },
        { id: 'q4', text: 'Do you think children spend too much time on screens?', model: 'I think there\'s a valid concern. While technology can be educational and social, excessive screen time can affect sleep, attention spans, and face-to-face social skills. Balance and parental guidance are key.' },
        { id: 'q5', text: 'What technology do you wish existed that doesn\'t yet?', model: 'I\'d love a universal translation device that could translate spoken language in real time, perfectly capturing nuance and tone. It would transform global communication and bring people closer together.' }
      ]
    },
    {
      id: 'p1_environment',
      title: 'Environment & Nature',
      icon: '🌿',
      questions: [
        { id: 'q1', text: 'Are you interested in environmental issues?', model: 'Yes, deeply. I believe the environmental crisis is the defining challenge of our generation. I try to stay informed, reduce my personal footprint where possible, and support organisations working on climate solutions.' },
        { id: 'q2', text: 'What do you do to protect the environment?', model: 'I try to reduce waste by minimising plastic use, recycling, and composting. I use public transport and cycle when I can, and I\'ve been making more plant-based food choices. Small steps, but every bit helps.' },
        { id: 'q3', text: 'Do you spend time in nature?', model: 'Yes, it\'s very important to me. I try to go hiking or visit parks regularly. Being in nature reduces my stress levels and gives me a sense of perspective. I feel recharged after spending time outdoors.' },
        { id: 'q4', text: 'How has the environment changed since you were young?', model: 'Quite noticeably. The weather patterns seem more extreme. Flooding and heatwaves that used to be unusual are becoming more frequent. I\'ve also noticed more air pollution in cities over the years.' },
        { id: 'q5', text: 'What environmental change concerns you most?', model: 'Climate change and biodiversity loss concern me deeply. The loss of ecosystems and the sixth mass extinction are issues that don\'t receive enough attention. Once species disappear, they\'re gone forever.' }
      ]
    },
    {
      id: 'p1_health',
      title: 'Health & Sport',
      icon: '🏃',
      questions: [
        { id: 'q1', text: 'How do you stay healthy?', model: 'I try to maintain a balanced diet, exercise regularly, and get enough sleep. I also try to manage stress through activities I enjoy, like reading and spending time outdoors. Mental health is just as important as physical health to me.' },
        { id: 'q2', text: 'Do you play any sports?', model: 'I play badminton casually at weekends with friends, and I cycle to work when the weather allows. I also do yoga a couple of times a week, which I find brilliant for both flexibility and mindfulness.' },
        { id: 'q3', text: 'Do you think people in your country are health-conscious?', model: 'It\'s mixed. I notice a growing health and wellness movement, especially among younger people — more gyms, healthy cafes, and awareness about nutrition. However, many people still lead quite sedentary lifestyles.' },
        { id: 'q4', text: 'How important is sleep to you?', model: 'Extremely important. When I\'m well-rested I\'m more productive, creative, and emotionally balanced. I try to get seven to eight hours most nights and avoid screens before bed to protect sleep quality.' },
        { id: 'q5', text: 'Have your health habits changed as you\'ve gotten older?', model: 'Yes, significantly. In my teens I could eat anything and stay up all night without consequences! Now I\'m much more mindful of what I eat, prioritise sleep, and make exercise a regular part of my routine rather than an occasional thing.' }
      ]
    }
  ];

  const part2Cards = [
    {
      id: 'c1',
      title: 'A Person Who Inspired You',
      icon: '⭐',
      prompt: 'Describe a person who has inspired you.',
      cues: [
        'Who this person is',
        'How you know or knew them',
        'What they did or do that inspires you',
        'Explain how this person has influenced your life'
      ],
      prepTime: 60,
      speakTime: 120,
      model: 'I\'d like to talk about my secondary school English teacher, Mr Santoso. I met him when I was about fourteen years old, and he was truly unlike any teacher I\'d encountered before.\n\nWhat made him stand out was his extraordinary passion for literature and language. He didn\'t just teach English — he made us fall in love with words. He\'d read poetry aloud with such conviction that the whole class would be completely captivated. He once spent an entire lesson discussing a single paragraph from a novel, unpacking layers of meaning that I would never have found on my own.\n\nHe also had an uncanny ability to connect with students. He seemed to understand which of us were struggling and would find creative ways to build our confidence. He encouraged me specifically to write short stories, and he treated my early, rather clumsy efforts with genuine respect and constructive feedback.\n\nThe influence he had on my life has been profound. He showed me that language is a superpower — that being able to express yourself clearly and creatively opens doors professionally and personally. He\'s the reason I became interested in writing, and that interest eventually led me to pursue a career in communications.\n\nI think the most inspiring people are those who give generously of themselves without expecting anything in return, and Mr Santoso did exactly that. I occasionally still think about what he taught me whenever I face a challenging piece of writing.'
    },
    {
      id: 'c2',
      title: 'A Place You Enjoyed Visiting',
      icon: '🗺️',
      prompt: 'Describe a place you have visited that you particularly enjoyed.',
      cues: [
        'Where the place is',
        'When you went there',
        'What you did there',
        'Explain why you enjoyed it so much'
      ],
      prepTime: 60,
      speakTime: 120,
      model: 'I\'d like to describe my trip to the island of Lombok in Indonesia, which I visited about two years ago with three friends. We spent five days there, and it was genuinely one of the most wonderful experiences I\'ve had.\n\nLombok is located east of Bali and is somewhat less commercialised, which I think contributes enormously to its appeal. We stayed in a small guesthouse near Selong Belanak beach — a sweeping bay of white sand and crystal-clear turquoise water. The scenery was simply stunning.\n\nDuring our visit we did a range of activities. We hiked partway up Mount Rinjani, an active volcano — the views from the crater rim were absolutely breathtaking. We also went snorkelling around the Gili Islands, where the marine life was incredible: sea turtles, colourful fish, and pristine coral. In the evenings, we\'d sit on the beach, eat fresh grilled fish, and watch the sunset.\n\nWhat I enjoyed most wasn\'t any single activity but rather the overall atmosphere. The local people were extraordinarily warm and welcoming. Time seemed to slow down. There was no pressure to rush anywhere. I felt genuinely relaxed in a way that\'s quite rare in everyday life.\n\nI think that\'s why I enjoyed it so much — it gave me a sense of freedom and renewal that I really needed at that point in my life. I\'d go back without hesitation.'
    },
    {
      id: 'c3',
      title: 'A Book or Film You Found Interesting',
      icon: '📚',
      prompt: 'Describe a book or film that you found particularly interesting.',
      cues: [
        'What the book or film is',
        'When you read/watched it',
        'What it is about',
        'Explain why you found it interesting'
      ],
      prepTime: 60,
      speakTime: 120,
      model: 'I\'d like to talk about a novel called "The Kite Runner" by Khaled Hosseini, which I read about three years ago during the school holidays. It had been on my reading list for a long time, and when I finally got round to it, I read it in just three days.\n\nThe novel is set primarily in Afghanistan, tracing the lives of two boys — Amir, from a wealthy family, and Hassan, his servant\'s son — from their childhood in Kabul in the 1970s through the turbulence of the Soviet invasion and the Taliban regime, and ultimately to the present day. It\'s a story about friendship, betrayal, guilt, and ultimately redemption.\n\nWhat made it so compelling was the way Hosseini weaves together deeply personal relationships with major historical events. You\'re reading what feels like an intimate family drama, but in the background you\'re also learning about the extraordinary upheaval Afghanistan has experienced. The storytelling is vivid and immersive — I felt as though I was in Kabul with the characters.\n\nThe themes also resonated with me personally. The idea that one terrible decision can haunt a person for decades, and the possibility of finding a way to make amends, is universal and profoundly human.\n\nI found it intellectually and emotionally enriching. It expanded my understanding of a country I knew very little about, and it stayed with me long after I finished reading. I\'d recommend it to absolutely anyone.'
    },
    {
      id: 'c4',
      title: 'A Time You Helped Someone',
      icon: '🤝',
      prompt: 'Describe a time when you helped someone.',
      cues: [
        'Who you helped',
        'When and where this happened',
        'How you helped them',
        'Explain how you felt about helping this person'
      ],
      prepTime: 60,
      speakTime: 120,
      model: 'I\'d like to describe a time when I helped a new colleague who had just joined my company about a year ago. Her name is Dina, and she had relocated from another city to take up the position.\n\nShe joined during what was an unusually busy period for our department — we were running a major product launch. Most people were so focused on their own responsibilities that nobody had much time to onboard her properly. I noticed she looked quite overwhelmed and isolated in her first week.\n\nI decided to make a conscious effort to help her settle in. Practically, I walked her through our internal systems, explained the company culture, and introduced her to key colleagues. I also included her in my lunch group so she wouldn\'t have to eat alone, which can be daunting in a new environment. Outside of work hours, I shared some recommendations for the city — good areas to live, local restaurants, and transport tips.\n\nOver the following weeks, I checked in on her regularly and answered her questions whenever she had them, even when I was busy. I remembered what it was like to be new and not want to seem incompetent by asking too many questions.\n\nAs for how I felt — genuinely good. There\'s something deeply satisfying about making someone else\'s experience easier. Dina has become a close friend and a valued colleague. Seeing her confidence grow has been a real pleasure. I think small acts of kindness in the workplace make an enormous difference to organisational culture.'
    },
    {
      id: 'c5',
      title: 'An Important Decision You Made',
      icon: '🎯',
      prompt: 'Describe an important decision you have made in your life.',
      cues: [
        'What the decision was',
        'When you made it',
        'Why you made this decision',
        'Explain how this decision affected your life'
      ],
      prepTime: 60,
      speakTime: 120,
      model: 'One of the most significant decisions I\'ve made was to leave a stable but unfulfilling job to pursue a career more aligned with my genuine interests. This happened about four years ago, when I was twenty-three.\n\nAt the time, I was working in finance — a field I\'d entered largely to satisfy expectations rather than out of any real passion. The salary was good and the role was secure, but I felt uninspired and creatively stifled. After about two years, I reached a crossroads.\n\nThe decision to leave wasn\'t easy. I had financial commitments, and I was giving up stability for considerable uncertainty. I spent several months researching and planning, saving money, and exploring what I genuinely wanted to do. Eventually I decided to take a short course in digital communications, build up a portfolio, and apply for roles in marketing.\n\nThe impact on my life has been enormously positive. The transition was challenging — my first marketing job paid significantly less than my finance role. But within eighteen months I had built real expertise and moved into a position I find genuinely engaging. I look forward to going to work most days, which I couldn\'t say before.\n\nPerhaps more importantly, making that decision taught me that calculated risk-taking is necessary for growth. I\'d been letting fear of uncertainty hold me back, and overcoming that has given me greater confidence in other areas of my life. It was scary, but it was absolutely the right choice.'
    },
    {
      id: 'c6',
      title: 'A Celebration You Enjoyed',
      icon: '🎉',
      prompt: 'Describe a celebration or special occasion you have enjoyed.',
      cues: [
        'What the occasion was',
        'Who was there',
        'What you did',
        'Explain why it was so special or enjoyable'
      ],
      prepTime: 60,
      speakTime: 120,
      model: 'I\'d like to describe my grandmother\'s eightieth birthday celebration, which took place about two years ago. It was an extraordinary gathering of our extended family that I\'ll never forget.\n\nMy grandmother is a remarkable woman — she raised seven children largely by herself, supported the whole family through some very difficult periods, and has maintained her warmth and humour well into old age. When her eightieth birthday approached, the entire family agreed that it deserved a truly special celebration.\n\nAround sixty people attended — children, grandchildren, great-grandchildren, and old friends. The event was held at a large hall, decorated with photographs documenting her life from childhood onwards. Several family members performed traditional songs. We prepared a feast of her favourite Indonesian dishes: rendang, soto betawi, various sambals, and an enormous birthday cake.\n\nThe highlight for me was a moment when one of my aunts gave a speech recounting stories from my grandmother\'s life — her resilience, her sacrifice, her unending love for her family. Many people were in tears, including my grandmother herself.\n\nWhat made it so special was the profound sense of gratitude and love that filled the room. We were celebrating not just a birthday but a life fully and generously lived. Seeing my grandmother surrounded by the family she had built, clearly moved and joyful, was deeply touching.\n\nFamily celebrations like that remind me of what truly matters in life, and I feel very fortunate to have experienced it.'
    }
  ];

  const part3Topics = [
    {
      id: 'pt3_education',
      title: 'Education & Learning',
      icon: '🎓',
      questions: [
        { id: 'q1', text: 'How important is education in your country?', model: 'Education is considered extremely important in Indonesia — both culturally and economically. Families make significant sacrifices to ensure their children receive good schooling. There\'s a widespread belief that education is the primary route to social mobility and better opportunities.' },
        { id: 'q2', text: 'Do you think the education system in your country needs to change?', model: 'Yes, in several respects. The current system tends to emphasise rote learning and examination performance over critical thinking and creativity. I think there should be greater focus on developing problem-solving skills, emotional intelligence, and practical competencies relevant to the modern economy.' },
        { id: 'q3', text: 'What role does technology play in education today?', model: 'An increasingly central one. Technology provides access to vast knowledge resources, enables remote learning, and allows for personalised learning experiences. The pandemic accelerated this shift dramatically. However, it also raises concerns about equity — not all students have equal access to technology and reliable internet.' }
      ]
    },
    {
      id: 'pt3_environment',
      title: 'Environmental Issues',
      icon: '🌍',
      questions: [
        { id: 'q1', text: 'Who is most responsible for protecting the environment — governments, businesses, or individuals?', model: 'I think all three bear responsibility, but in different ways and proportions. Governments have the legislative power to enforce environmental standards and create systemic change. Businesses, as major polluters, must be held accountable and incentivised to adopt sustainable practices. Individuals can apply consumer pressure and make lifestyle choices that, in aggregate, matter.' },
        { id: 'q2', text: 'Do you think people are doing enough to protect the environment?', model: 'Collectively, no — the evidence from climate data suggests we are not on track to avoid the worst consequences of climate change. While awareness has grown significantly, action at both individual and institutional levels has not kept pace. There\'s often a gap between what people believe and how they actually behave.' },
        { id: 'q3', text: 'How might cities become more environmentally friendly in the future?', model: 'I think future cities will be substantially greener — more green spaces, improved public transport, reduced car dependency, greater use of renewable energy, and smarter waste management. Urban farming and vertical gardens could become commonplace. The key challenge is retrofitting existing infrastructure while building new cities sustainably.' }
      ]
    },
    {
      id: 'pt3_technology',
      title: 'Technology & Society',
      icon: '🤖',
      questions: [
        { id: 'q1', text: 'How has technology changed the way we communicate?', model: 'Profoundly and in many directions simultaneously. We can communicate instantly across the globe, which has obvious benefits. But some argue that digital communication lacks depth compared to face-to-face interaction. Social media has also introduced new dynamics in how we present ourselves and relate to others — sometimes with positive effects, sometimes less so.' },
        { id: 'q2', text: 'Do you think artificial intelligence is a threat or a benefit to society?', model: 'I see it as both, and I think that\'s the honest answer. AI has the potential to transform medicine, education, and productivity in ways that could genuinely improve lives. But it also raises serious questions about employment, privacy, bias, and concentration of power. The outcome depends heavily on how we govern and regulate its development.' },
        { id: 'q3', text: 'How might working life change in the next twenty years due to technology?', model: 'Quite dramatically, I suspect. Many routine tasks will be automated, requiring workers to develop skills that complement rather than compete with machines — creativity, complex problem-solving, empathy. Remote and flexible working may become standard. I think we\'ll also see shorter working weeks in some industries as productivity increases.' }
      ]
    },
    {
      id: 'pt3_travel',
      title: 'Tourism & Travel',
      icon: '🌐',
      questions: [
        { id: 'q1', text: 'What are the benefits of tourism for a country?', model: 'Tourism can be enormously beneficial economically — generating revenue, creating employment, and supporting local businesses and communities. It also promotes cultural exchange and understanding between peoples. However, it\'s important that tourism is managed sustainably to avoid damaging the very environments and cultures that attract visitors.' },
        { id: 'q2', text: 'What problems can mass tourism cause?', model: 'Several significant ones. Overcrowding can damage fragile ecosystems and historical sites. It can drive up local property prices, displacing residents. Cultural commodification can dilute the authenticity of local traditions. And the environmental footprint of aviation and tourism infrastructure is considerable. Many iconic destinations are now grappling with these challenges.' },
        { id: 'q3', text: 'Do you think people will travel more or less in the future?', model: 'It\'s genuinely hard to predict. Environmental concerns and carbon pricing might deter some long-haul travel. Virtual and augmented reality could offer alternative experiences. But the fundamental human desire to explore, to encounter different cultures, and to have novel experiences is unlikely to diminish. My guess is that travel will continue but perhaps become more considered and purposeful.' }
      ]
    },
    {
      id: 'pt3_health',
      title: 'Health & Wellbeing',
      icon: '💊',
      questions: [
        { id: 'q1', text: 'Why do some people choose unhealthy lifestyles despite knowing the risks?', model: 'There are multiple factors. Unhealthy foods and sedentary entertainment are often more convenient, affordable, and immediately satisfying than healthy alternatives. Stress and poor mental health can lead to coping behaviours like overeating or smoking. And there\'s often a gap between knowing what\'s healthy and having the motivation or resources to act on that knowledge.' },
        { id: 'q2', text: 'How can governments encourage people to lead healthier lives?', model: 'Through a combination of education, infrastructure, and policy. Better health education in schools, investment in public spaces and cycling infrastructure, taxation on unhealthy products, and subsidies on healthy foods can all play a role. Mental health services also need adequate funding and reduced stigma.' },
        { id: 'q3', text: 'Do you think modern medicine has improved quality of life?', model: 'Without question. Life expectancy has increased dramatically over the past century largely due to medical advances — vaccines, antibiotics, surgical techniques, and cancer treatments. Diseases that were once death sentences are now manageable conditions. That said, there are growing concerns about antimicrobial resistance and the limitations of treating lifestyle-related illnesses with medication alone.' }
      ]
    },
    {
      id: 'pt3_society',
      title: 'Society & Relationships',
      icon: '👥',
      questions: [
        { id: 'q1', text: 'How important are family relationships in your culture?', model: 'Extremely important in Indonesian culture. Family ties are central to social identity and daily life. It\'s common for multiple generations to live together or in close proximity. Family occasions — births, weddings, celebrations — are major social events. This strong family orientation provides a powerful support network, though it can also create pressure to conform to family expectations.' },
        { id: 'q2', text: 'Do you think people are more or less connected to their communities than they used to be?', model: 'It\'s nuanced. Urbanisation and digital technology have created new communities that transcend geography, which is genuinely enriching. But many people report feeling more isolated from their immediate physical communities. The bonds that once formed organically in stable neighbourhoods — knowing your neighbours, local social infrastructure — have in many places weakened.' },
        { id: 'q3', text: 'What qualities do you think are most important in a good friend?', model: 'Trustworthiness is foundational for me — a friend who keeps confidences and can be relied upon. Genuine empathy and the ability to listen without judgment are also essential. Honesty matters too, even when it\'s uncomfortable. And I think the best friendships have a quality of mutual growth — you bring out the best in each other over time.' }
      ]
    }
  ];

  return {
    getPart1Topics: () => part1Topics,
    getPart1Topic: (id) => part1Topics.find(t => t.id === id),
    getPart2Cards: () => part2Cards,
    getPart2Card: (id) => part2Cards.find(c => c.id === id),
    getPart3Topics: () => part3Topics,
    getPart3Topic: (id) => part3Topics.find(t => t.id === id)
  };

})();
