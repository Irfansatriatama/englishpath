/**
 * EnglishPath — TOEFL iBT Listening Data
 * Fase 15b: Practice Listening
 * 2 Academic Lectures + 1 Campus Conversation
 * Question types: main idea, detail, function, attitude, organization, inference
 */

const TOEFLListeningData = (() => {

  // ─── LECTURE 1: The Columbian Exchange ────────────────────────
  const lecture1 = {
    id: 'l1',
    type: 'lecture',
    title: 'The Columbian Exchange',
    topic: 'History',
    icon: '🌍',
    professor: 'Professor',
    course: 'World History',
    estimatedTime: 12,
    // Full TTS script for the lecture
    script: [
      { speaker: 'Professor', text: "Good morning, everyone. Today we're going to talk about one of the most significant ecological events in the last five hundred years — something historians call the Columbian Exchange." },
      { speaker: 'Professor', text: "The Columbian Exchange refers to the transfer of plants, animals, diseases, and people between the Americas and the Old World — Europe, Africa, and Asia — following Columbus's voyages beginning in 1492. And I want to emphasize: this wasn't just a historical curiosity. It fundamentally reshaped the biology, demographics, and food systems of the entire planet." },
      { speaker: 'Professor', text: "Let's start with the biological transfers that went from the Americas to the Old World. Think about the foods we consider 'traditionally European' today — tomatoes in Italian cuisine, potatoes in Ireland, hot peppers in Hungarian cooking. None of those foods existed in Europe before the late 15th century. All of them originated in the Americas. Corn, or maize, became a staple crop across much of Africa, Europe, and Asia. The potato, which thrives in cold climates where wheat struggles, is credited with supporting population growth in Northern Europe and in particular, Ireland." },
      { speaker: 'Professor', text: "Going in the other direction — from the Old World to the Americas — we see the transfer of wheat, rice, sugarcane, cattle, horses, and pigs. These transformed landscapes and economies throughout North and South America. Horses, which had actually gone extinct in the Americas thousands of years earlier, were reintroduced by Spanish explorers. The adoption of the horse by Plains peoples of North America was revolutionary — it completely changed how they hunted and organized their societies." },
      { speaker: 'Professor', text: "But the most devastating part of the Columbian Exchange was the transfer of disease. Indigenous peoples of the Americas had no prior exposure to diseases like smallpox, measles, influenza, and typhus. When Europeans arrived, epidemics swept through Native American populations. Scholars estimate that between 50 and 90 percent of the indigenous population of the Americas died within the first 150 years of sustained contact. This demographic catastrophe — sometimes called the Great Dying — had profound social, political, and environmental consequences." },
      { speaker: 'Professor', text: "There's actually an interesting climate connection here that some researchers have explored. The deaths of tens of millions of people across the Americas led to the abandonment of large areas of cultivated land. Forests regrew over those lands, absorbing significant amounts of carbon dioxide from the atmosphere. Some scientists argue this contributed to a measurable drop in global temperatures in the late 16th and early 17th centuries — a period known as the Little Ice Age. So the Columbian Exchange may have had effects even on the global climate." },
      { speaker: 'Professor', text: "The point I want you to take away is that the Columbian Exchange was not a simple or symmetrical process. It created winners and losers in ways that shaped inequalities that persist to the present day. For next week, I'd like you to read chapters 4 and 5 of Mann's 1493 — we'll be discussing how the exchange shaped the emergence of the modern global economy." }
    ],
    questions: [
      {
        id: 'l1_q1',
        type: 'main_idea',
        question: 'What is the main topic of the lecture?',
        choices: [
          'The voyages of Christopher Columbus to the Americas.',
          'The widespread biological and demographic exchanges between the Old and New Worlds after 1492.',
          'The development of European agriculture following the Medieval period.',
          'The causes and consequences of the Little Ice Age.'
        ],
        answer: 1,
        explanation: 'The professor defines the Columbian Exchange at the start and discusses its biological, demographic, and ecological consequences throughout the lecture.'
      },
      {
        id: 'l1_q2',
        type: 'detail',
        question: 'According to the professor, which food did NOT originate in the Americas?',
        choices: ['Tomatoes', 'Potatoes', 'Hot peppers', 'Wheat'],
        answer: 3,
        explanation: 'The professor lists tomatoes, potatoes, and hot peppers as foods that originated in the Americas. Wheat is mentioned as a crop transferred FROM the Old World TO the Americas.'
      },
      {
        id: 'l1_q3',
        type: 'detail',
        question: 'What does the professor say about the horse and Native American Plains peoples?',
        choices: [
          'Horses were brought to the Americas from Asia thousands of years ago.',
          'The adoption of horses had little effect on Plains peoples\' cultures.',
          'Horses reintroduced by Spanish explorers transformed Plains peoples\' hunting and society.',
          'Plains peoples domesticated horses independently of European contact.'
        ],
        answer: 2,
        explanation: 'The professor explains that horses had gone extinct in the Americas but were reintroduced by Spanish explorers, and that this "completely changed how they hunted and organized their societies."'
      },
      {
        id: 'l1_q4',
        type: 'inference',
        question: 'What can be inferred about indigenous Americans\' susceptibility to Old World diseases?',
        choices: [
          'They lacked effective medicines to treat the diseases.',
          'Their immune systems had no prior experience with those diseases.',
          'They were weakened by food shortages before European contact.',
          'European diseases only affected elderly indigenous people.'
        ],
        answer: 1,
        explanation: 'The professor says indigenous peoples "had no prior exposure" to diseases like smallpox and measles, implying their immune systems could not fight them effectively.'
      },
      {
        id: 'l1_q5',
        type: 'function',
        question: 'Why does the professor mention the climate connection in the sixth segment?',
        choices: [
          'To argue that the Columbian Exchange caused climate change intentionally.',
          'To show an unexpected and far-reaching consequence of the demographic collapse.',
          'To prove that the Little Ice Age was caused entirely by human activity.',
          'To introduce the topic of carbon dioxide for the next lecture.'
        ],
        answer: 1,
        explanation: 'The professor uses the climate connection as an example of the broad, unexpected consequences of the Columbian Exchange, extending from direct biological transfers to possible global climate effects.'
      },
      {
        id: 'l1_q6',
        type: 'attitude',
        question: 'What is the professor\'s attitude toward the Columbian Exchange?',
        choices: [
          'She views it as a purely positive development that improved food security worldwide.',
          'She presents it as a neutral historical event with equal benefits for all parties.',
          'She emphasizes it was a complex and asymmetrical process that created lasting inequalities.',
          'She argues that its effects have been largely exaggerated by modern historians.'
        ],
        answer: 2,
        explanation: 'The professor explicitly states: "the Columbian Exchange was not a simple or symmetrical process. It created winners and losers in ways that shaped inequalities that persist to the present day."'
      }
    ]
  };

  // ─── LECTURE 2: Behavioral Economics and Decision Making ───────
  const lecture2 = {
    id: 'l2',
    type: 'lecture',
    title: 'Behavioral Economics and Decision Making',
    topic: 'Economics & Psychology',
    icon: '📊',
    professor: 'Professor',
    course: 'Economics',
    estimatedTime: 12,
    script: [
      { speaker: 'Professor', text: "Alright, let's get started. So last week we covered the basics of classical economics — the rational actor model, utility maximization, and so on. Today I want to challenge some of those assumptions by looking at behavioral economics." },
      { speaker: 'Professor', text: "Classical economics assumes that people are rational agents who make decisions by systematically evaluating their options and choosing the one that maximizes their personal benefit. It's a clean, elegant model. The problem is — it doesn't match how people actually behave. Behavioral economics emerged in the 1970s and 1980s, largely through the work of Daniel Kahneman and Amos Tversky, to address this gap. They showed, through carefully designed experiments, that human decision-making is systematically biased in predictable ways." },
      { speaker: 'Professor', text: "One of the most influential concepts from their work is prospect theory. Prospect theory describes how people evaluate potential gains and losses. The key insight is this: people feel the pain of a loss more intensely than they feel the pleasure of an equivalent gain. Losing fifty dollars feels worse than winning fifty dollars feels good. This asymmetry is called loss aversion. Because of loss aversion, people will often take irrational risks to avoid a loss, even when a rational analysis would suggest accepting the loss and moving on." },
      { speaker: 'Professor', text: "Another important concept is the anchoring effect. When people need to make a numerical estimate, they tend to be heavily influenced by an initial number — the anchor — even when that number is arbitrary or irrelevant. So, for example, if I ask you to write down the last two digits of your student ID, and then ask you to estimate the price of a bottle of wine, studies have shown that people with higher-ending student IDs will estimate higher prices. The anchor contaminates the estimate even when people know the anchor is irrelevant." },
      { speaker: 'Professor', text: "Then there's the availability heuristic — our tendency to judge the probability of events based on how easily examples come to mind. People dramatically overestimate the likelihood of dramatic, memorable events like plane crashes or shark attacks because they're widely reported in the media, while underestimating more common but less vivid risks. This has real consequences for how people make decisions about insurance, health behaviors, and even voting." },
      { speaker: 'Professor', text: "What makes behavioral economics particularly powerful is that it doesn't just identify biases — it suggests ways to redesign choices to improve outcomes. This is the idea behind 'nudge theory,' associated with economists Richard Thaler and Cass Sunstein. The idea is that the way choices are presented — the default option, the order of options, the framing of information — can nudge people toward better decisions without removing their freedom to choose otherwise. For example, automatically enrolling employees in retirement savings plans — with the option to opt out — dramatically increases savings rates compared to requiring people to actively opt in." },
      { speaker: 'Professor', text: "So to summarize: behavioral economics challenges the rational actor model by documenting systematic, predictable biases in human decision-making, and then uses those insights to design better policies and environments. Kahneman's 2002 Nobel Prize in Economics acknowledged the significance of this paradigm shift. For next class, read the Thaler and Sunstein chapter on defaults — we'll discuss specific nudge applications in health care and public policy." }
    ],
    questions: [
      {
        id: 'l2_q1',
        type: 'main_idea',
        question: 'What is the main purpose of the lecture?',
        choices: [
          'To explain the history of classical economics from the 18th century.',
          'To introduce behavioral economics as a challenge to the rational actor model.',
          'To argue that people should be forced to make better financial decisions.',
          'To describe the careers of Daniel Kahneman and Amos Tversky.'
        ],
        answer: 1,
        explanation: 'The professor explicitly frames the lecture as challenging classical economics through behavioral economics, covering key concepts like prospect theory, anchoring, and availability heuristics.'
      },
      {
        id: 'l2_q2',
        type: 'detail',
        question: 'According to the professor, what is loss aversion?',
        choices: [
          'The tendency to avoid all financial risks.',
          'The asymmetry where losing money feels worse than gaining the same amount feels good.',
          'The preference for smaller certain gains over larger uncertain ones.',
          'The bias toward familiar investment options.'
        ],
        answer: 1,
        explanation: 'The professor explains: "the pain of a loss feels more intensely than the pleasure of an equivalent gain. Losing fifty dollars feels worse than winning fifty dollars feels good. This asymmetry is called loss aversion."'
      },
      {
        id: 'l2_q3',
        type: 'detail',
        question: 'What does the anchoring effect describe, according to the professor?',
        choices: [
          'The tendency to stick with the first choice in a list.',
          'The influence of an initial number on subsequent numerical estimates.',
          'The preference for round numbers in financial decisions.',
          'The effect of emotional state on financial risk-taking.'
        ],
        answer: 1,
        explanation: 'The professor explains anchoring as: "When people need to make a numerical estimate, they tend to be heavily influenced by an initial number — the anchor — even when that number is arbitrary or irrelevant."'
      },
      {
        id: 'l2_q4',
        type: 'function',
        question: 'Why does the professor mention the student ID experiment?',
        choices: [
          'To show that students generally pay too much for wine.',
          'To provide a concrete example of the anchoring effect.',
          'To demonstrate that numerical estimates are always inaccurate.',
          'To explain the concept of availability heuristic.'
        ],
        answer: 1,
        explanation: 'The professor uses the student ID / wine price experiment as an illustration of how an arbitrary number (the anchor) can bias subsequent numerical estimates.'
      },
      {
        id: 'l2_q5',
        type: 'inference',
        question: 'Based on the lecture, what can be inferred about nudge theory?',
        choices: [
          'It forces people to make specific choices by removing other options.',
          'It improves decision outcomes by changing how choices are presented, without removing freedom.',
          'It was developed primarily for use in marketing and advertising.',
          'It is most effective when combined with financial penalties.'
        ],
        answer: 1,
        explanation: 'The professor describes nudge theory as designing choices to improve outcomes "without removing their freedom to choose otherwise" — it changes defaults or framing without compelling any specific choice.'
      },
      {
        id: 'l2_q6',
        type: 'organization',
        question: 'How does the professor organize the lecture?',
        choices: [
          'By presenting the history of economics chronologically from ancient times.',
          'By first describing classical economics, then introducing behavioral economics and its key concepts.',
          'By comparing the careers of different Nobel Prize–winning economists.',
          'By focusing exclusively on financial applications of behavioral economics.'
        ],
        answer: 1,
        explanation: 'The professor begins by reviewing classical economics, then introduces behavioral economics as a challenge to it, covering key concepts (prospect theory, anchoring, availability heuristic, nudge theory) sequentially.'
      }
    ]
  };

  // ─── CONVERSATION: Office Hours Discussion ────────────────────
  const conversation1 = {
    id: 'c1',
    type: 'conversation',
    title: 'Office Hours: Research Paper Advice',
    topic: 'Campus Conversation',
    icon: '💬',
    setting: 'A student visits a professor\'s office during office hours to discuss a research paper.',
    estimatedTime: 8,
    script: [
      { speaker: 'Student', text: "Professor Chen? Is this still a good time for office hours?" },
      { speaker: 'Professor', text: "Yes, absolutely. Come in, Anya. What can I help you with today?" },
      { speaker: 'Student', text: "I wanted to talk about my research paper topic. You said we could choose any topic related to environmental science, and I was thinking about writing on ocean acidification. But I'm worried it might be too broad." },
      { speaker: 'Professor', text: "That's a reasonable concern. Ocean acidification is indeed a very large field. What aspect were you thinking of focusing on?" },
      { speaker: 'Student', text: "I was thinking about the effects on coral reefs specifically. I've read a few articles about how rising CO2 levels are lowering ocean pH and how that's dissolving coral skeletons." },
      { speaker: 'Professor', text: "That's a much better focus. Coral reefs and acidification is a well-documented area with substantial research. Now — are you planning to write a literature review, or are you hoping to include some original analysis?" },
      { speaker: 'Student', text: "Um... I think just a literature review, since we don't have access to a lab. But I wasn't sure how many sources I should use. The assignment says at least eight, but some of my classmates are using twenty or thirty." },
      { speaker: 'Professor', text: "Eight is the minimum, but more is generally better for a complex topic like this. That said, I'd rather you use fifteen really well-chosen, peer-reviewed sources than thirty sources where half are news articles or websites of questionable quality. Focus on finding strong primary research articles — studies published in journals like Nature, Science, Global Change Biology. Can you access those through the university library?" },
      { speaker: 'Student', text: "I think so, but I've had trouble navigating the database. The librarian showed me once, but I forget which database has the best science journals." },
      { speaker: 'Professor', text: "Web of Science and Scopus are both excellent for peer-reviewed science. You might also try Google Scholar as a starting point — it's not as rigorous, but it can help you identify key authors and papers, and then you can track down the full articles through the library. Also, look at the reference lists of the articles you find — that's often how you discover the most relevant foundational studies." },
      { speaker: 'Student', text: "That's really helpful. And for the structure — should I organize it thematically or chronologically?" },
      { speaker: 'Professor', text: "For this topic, I'd recommend thematic. You could have one section on the chemistry of acidification, one on the biological effects on coral, and one on broader ecosystem impacts or possible mitigation strategies. That gives your paper a clear logical flow. Chronological organization works well for historical topics, but for a scientific review, thematic is usually stronger." },
      { speaker: 'Student', text: "Okay, that makes sense. One last question — the paper is due in three weeks. Is that enough time to do it well?" },
      { speaker: 'Professor', text: "Three weeks is sufficient if you start this week. I'd suggest spending the first week finding and reading your sources and taking notes, the second week drafting, and the third week revising. Don't leave the reading for the last week — that's the most time-consuming part. And feel free to stop by again during office hours if you have questions once you've started drafting." },
      { speaker: 'Student', text: "Thank you so much, Professor Chen. I feel a lot better about this." },
      { speaker: 'Professor', text: "Good. I'll look forward to reading it." }
    ],
    questions: [
      {
        id: 'c1_q1',
        type: 'main_idea',
        question: 'Why does the student visit the professor?',
        choices: [
          'To request an extension on the research paper deadline.',
          'To get advice on her research paper topic, sources, and structure.',
          'To complain about the difficulty of the assignment.',
          'To ask the professor to approve a specific paper topic.'
        ],
        answer: 1,
        explanation: 'The student asks about narrowing her topic, source quality and quantity, paper organization, and time management — she is seeking general guidance on how to approach the assignment.'
      },
      {
        id: 'c1_q2',
        type: 'detail',
        question: 'What aspect of ocean acidification does the student decide to focus on?',
        choices: [
          'The chemistry of seawater pH changes.',
          'The economic impact on the fishing industry.',
          'The effects on coral reefs.',
          'The relationship between CO2 emissions and rainfall.'
        ],
        answer: 2,
        explanation: 'The student says: "I was thinking about the effects on coral reefs specifically." The professor affirms this is a well-documented, appropriately focused area.'
      },
      {
        id: 'c1_q3',
        type: 'attitude',
        question: 'What is the professor\'s attitude toward using thirty sources?',
        choices: [
          'She strongly encourages using as many sources as possible.',
          'She prefers fewer high-quality peer-reviewed sources over many low-quality ones.',
          'She believes more than twenty sources is unnecessary for any paper.',
          'She discourages using any online sources.'
        ],
        answer: 1,
        explanation: 'The professor says: "I\'d rather you use fifteen really well-chosen, peer-reviewed sources than thirty sources where half are news articles or websites of questionable quality."'
      },
      {
        id: 'c1_q4',
        type: 'detail',
        question: 'What does the professor recommend for finding foundational studies?',
        choices: [
          'Checking the professor\'s own reading list.',
          'Looking at the reference lists of articles already found.',
          'Using only the university library\'s print collections.',
          'Searching Wikipedia for overviews of the field.'
        ],
        answer: 1,
        explanation: 'The professor says: "look at the reference lists of the articles you find — that\'s often how you discover the most relevant foundational studies."'
      },
      {
        id: 'c1_q5',
        type: 'inference',
        question: 'What can be inferred about why the professor recommends thematic organization over chronological?',
        choices: [
          'Chronological organization is considered inappropriate for all academic papers.',
          'Thematic organization provides a clearer logical structure for scientific reviews.',
          'The student lacks the historical knowledge for chronological organization.',
          'Thematic papers are easier to write than chronological ones.'
        ],
        answer: 1,
        explanation: 'The professor says "thematic is usually stronger" for scientific reviews and explains it gives "a clear logical flow," while noting chronological works better for historical topics.'
      }
    ]
  };

  return {
    getLectures() {
      return [lecture1, lecture2];
    },
    getConversations() {
      return [conversation1];
    },
    getAll() {
      return [lecture1, lecture2, conversation1];
    },
    getById(id) {
      return [lecture1, lecture2, conversation1].find(t => t.id === id) || null;
    }
  };

})();
