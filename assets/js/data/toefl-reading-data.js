/**
 * EnglishPath — TOEFL iBT Reading Data
 * Fase 15b: Practice Reading
 * 3 Academic Passages (500–700 words each)
 * Question types: factual info, negative factual, inference, vocabulary in context,
 *                 reference, rhetorical purpose, insert text, prose summary
 */

const TOEFLReadingData = (() => {

  // ─── PASSAGE 1: The Domestication of Dogs ─────────────────────
  const passage1 = {
    id: 'p1',
    title: 'The Domestication of Dogs',
    topic: 'Biology & Evolution',
    icon: '🐕',
    level: 'Academic',
    estimatedTime: 20,
    passage: `
      <p>The domestication of dogs from wild wolves represents one of the most significant and ancient partnerships between humans and another species. While the precise timeline remains debated among researchers, genetic evidence suggests that dogs were domesticated at least 15,000 years ago, though some studies propose a date as far back as 40,000 years. What is clear is that this transformation occurred before the advent of agriculture, indicating that early hunter-gatherer communities were the first to develop meaningful relationships with proto-domestic dogs.</p>

      <p>The process by which wolves became dogs is still not fully understood. The prevailing hypothesis proposes a self-domestication model, in which certain wolves with less fearful temperaments were drawn to human settlements to scavenge food scraps. Over successive generations, these less aggressive wolves reproduced more successfully near humans, gradually producing a population genetically distinct from their wild counterparts. Natural selection, rather than deliberate human breeding, may have driven the earliest stages of domestication.</p>

      <p>Anatomical changes accompanied the behavioral shift. Domestic dogs generally have shorter snouts, smaller teeth, and a more juvenile facial structure compared to wolves — a phenomenon known as neoteny, or the retention of juvenile characteristics into adulthood. These physical changes are thought to make dogs appear less threatening and more appealing to humans, which may have reinforced the bond between the two species. Neurological changes are also evident: domestic dogs demonstrate a remarkable ability to read human social cues, such as gaze direction and pointing gestures, a skill that wild wolves do not typically exhibit even when raised in captivity.</p>

      <p>The geographic origin of dog domestication has been a contentious issue. For many years, East Asia was favored as the primary site of domestication based on the high genetic diversity of dog populations in that region. However, more recent analyses suggest that the story is more complex — domestication may have occurred in multiple locations independently, or a single domestication event may have been followed by extensive migration and interbreeding. A 2016 study proposing dual domestication events in both East Asia and Europe added considerable complexity to the debate.</p>

      <p>Regardless of how or exactly where dogs were first domesticated, their role in human societies has been profound and varied. Archaeological evidence shows that dogs were buried alongside humans as early as 14,000 years ago, suggesting deep emotional bonds. Across cultures and continents, dogs have served as hunting companions, herders, guards, and in some societies, as a source of food. The selective breeding that intensified following the agricultural revolution produced the extraordinary diversity of breeds seen today — from the compact Chihuahua to the towering Great Dane — all descendants of a common ancestral wolf population.</p>

      <p>Modern genomic research continues to reshape our understanding of dog domestication. By comparing the genomes of contemporary dogs, ancient dog remains, and wolves from various geographic locations, scientists are reconstructing the branching history of canine lineages with increasing precision. These findings not only illuminate the origins of humanity's oldest animal companion but also provide broader insights into the mechanisms of domestication and artificial selection that have shaped many of the plant and animal species central to human civilization.</p>
    `,
    questions: [
      {
        id: 'p1_q1',
        type: 'factual',
        question: 'According to paragraph 1, which of the following is true about dog domestication?',
        choices: [
          'It occurred after early humans began farming.',
          'It took place at least 15,000 years ago according to genetic evidence.',
          'The exact date is now confirmed to be 40,000 years ago.',
          'It was initiated by agricultural communities.'
        ],
        answer: 1,
        explanation: 'Paragraph 1 states: "genetic evidence suggests that dogs were domesticated at least 15,000 years ago." The passage also notes this occurred before agriculture.'
      },
      {
        id: 'p1_q2',
        type: 'vocab',
        question: 'The word "prevailing" in paragraph 2 is closest in meaning to:',
        choices: ['controversial', 'outdated', 'most widely accepted', 'recently proposed'],
        answer: 2,
        explanation: '"Prevailing" means currently dominant or most widely accepted. In context, the "prevailing hypothesis" is the one most researchers currently support.'
      },
      {
        id: 'p1_q3',
        type: 'inference',
        question: 'What can be inferred from paragraph 2 about the earliest dog domestication?',
        choices: [
          'Humans intentionally selected wolves with gentle temperaments for breeding.',
          'Less aggressive wolves may have domesticated themselves by living near humans.',
          'Early humans avoided wolf populations near their settlements.',
          'Deliberate selective breeding was the primary driver from the start.'
        ],
        answer: 1,
        explanation: 'The paragraph describes a self-domestication model where wolves with less fearful temperaments were drawn to human settlements. It states that "Natural selection, rather than deliberate human breeding, may have driven the earliest stages."'
      },
      {
        id: 'p1_q4',
        type: 'factual',
        question: 'According to paragraph 3, neoteny in domestic dogs refers to:',
        choices: [
          'The ability to understand human gestures.',
          'The development of larger teeth over time.',
          'Retaining juvenile physical features into adulthood.',
          'An increase in snout length compared to wolves.'
        ],
        answer: 2,
        explanation: 'The passage defines neoteny as "the retention of juvenile characteristics into adulthood," which in dogs includes shorter snouts and smaller teeth.'
      },
      {
        id: 'p1_q5',
        type: 'negative',
        question: 'According to paragraph 3, which of the following is NOT mentioned as a difference between dogs and wolves?',
        choices: [
          'Dogs have shorter snouts than wolves.',
          'Dogs have a more juvenile facial structure.',
          'Dogs have greater physical strength than wolves.',
          'Dogs can read human social cues better than wolves.'
        ],
        answer: 2,
        explanation: 'The paragraph mentions shorter snouts, smaller teeth, juvenile facial structure, and ability to read social cues as differences. Greater physical strength is never mentioned.'
      },
      {
        id: 'p1_q6',
        type: 'rhetorical',
        question: 'Why does the author mention the 2016 study in paragraph 4?',
        choices: [
          'To confirm that dogs were domesticated only in East Asia.',
          'To illustrate that the geographic origin of dog domestication is still debated.',
          'To argue that all domestication occurred in Europe.',
          'To show that genetic diversity is highest in East Asian dogs.'
        ],
        answer: 1,
        explanation: 'The author uses the 2016 study as an example of how the geographic origin debate has become more complicated, supporting the idea that the issue remains unresolved.'
      },
      {
        id: 'p1_q7',
        type: 'insert',
        question: 'Look at the four squares [■] that indicate where the following sentence could be added to paragraph 5:\n\n"This remarkable range reflects thousands of years of human-guided selective breeding for specific traits and functions."\n\nWhere would the sentence best fit?',
        choices: [
          'After "The selective breeding that intensified following the agricultural revolution"',
          'After "dogs were buried alongside humans as early as 14,000 years ago"',
          'After "dogs have served as hunting companions, herders, guards"',
          'After "all descendants of a common ancestral wolf population"'
        ],
        answer: 3,
        explanation: 'The sentence explains the "remarkable range" of breeds, which directly follows the mention of the great variety from Chihuahua to Great Dane. Placing it after the description of that variety makes the connection logical.'
      },
      {
        id: 'p1_q8',
        type: 'summary',
        question: 'An introductory sentence for a brief summary of the passage is provided below. Complete the summary by selecting the THREE answer choices that express the most important ideas. Some sentences do not belong because they express minor ideas or contain incorrect information.\n\n"The domestication of dogs from wolves was a complex process that has been illuminated by modern research."',
        choices: [
          'Dogs were likely domesticated at least 15,000 years ago, possibly through a process of self-selection by less aggressive wolves.',
          'Physical and neurological changes in domestic dogs, including neoteny and social cognition, set them apart from their wolf ancestors.',
          'The Great Dane is among the largest dog breeds produced by selective breeding.',
          'The geographic origin of domestication remains debated, with evidence suggesting possibly multiple independent events.',
          'Archaeological digs in 2016 confirmed that dogs were first domesticated in Europe.',
          'Modern genomic research continues to refine our understanding of the origins and history of domestic dogs.'
        ],
        answer: [0, 1, 3],
        explanation: 'The three main ideas are: (1) the timeline and process of domestication, (2) the biological changes in dogs, and (4) the unresolved debate about geographic origin. The Great Dane fact is a minor detail; the 2016 statement is a misrepresentation; and choice 6 is partially true but less central than the others.'
      }
    ]
  };

  // ─── PASSAGE 2: The Development of Written Language ───────────
  const passage2 = {
    id: 'p2',
    title: 'The Development of Written Language',
    topic: 'History & Civilization',
    icon: '📜',
    level: 'Academic',
    estimatedTime: 20,
    passage: `
      <p>The invention of writing stands as one of the most transformative developments in human history. Unlike spoken language, which appears to be an innate capacity of the human species, writing is a technology — a culturally transmitted system that must be learned and that emerged independently in only a few locations across the world. The earliest writing systems arose in Mesopotamia, Egypt, China, and Mesoamerica, each developing in response to the social and administrative demands of complex, stratified societies.</p>

      <p>The oldest known writing system is the Sumerian script of ancient Mesopotamia, which emerged around 3200 BCE in the city of Uruk. Initially, Sumerian writing consisted of pictographs — simple images representing objects or concepts — impressed into clay tablets using a reed stylus. Over several centuries, these pictographs evolved into the abstract, wedge-shaped symbols known as cuneiform. The motivation behind this invention was not literary or communicative in the way we might expect; the earliest cuneiform tablets record economic transactions, inventories, and administrative records, reflecting the bureaucratic needs of an expanding urban civilization.</p>

      <p>A similar pattern can be observed in ancient Egypt, where hieroglyphic writing appeared around the same time as cuneiform. Egyptian hieroglyphics, however, developed a more complex system that combined logographic elements (symbols representing words or morphemes) with phonetic elements (symbols representing sounds). This dual nature gave Egyptian writing unusual flexibility and expressive power. The famous Rosetta Stone, discovered in 1799, proved essential in deciphering hieroglyphics by providing the same text in three scripts: hieroglyphic, Demotic, and Greek.</p>

      <p>Chinese writing represents a distinct tradition that developed independently around 1200 BCE, with the earliest examples found on oracle bones used in divination rituals. Unlike Sumerian cuneiform, which shifted from pictographic to phonetic representation, Chinese writing retained a largely logographic character. Each character primarily represents a morpheme — the smallest unit of meaning — rather than a sound. This logographic system, while demanding a large number of characters, has the advantage of being comprehensible across different spoken dialects, a feature that has contributed to cultural cohesion across China's vast and linguistically diverse geography.</p>

      <p>Mesoamerican civilizations, including the Maya, also developed independent writing systems. Maya hieroglyphics, which reached their most sophisticated form between the 3rd and 10th centuries CE, combined logographic and syllabic elements. The full decipherment of Maya script, achieved largely through the work of scholars like Yuri Knorozov in the 1950s and Linda Schele in the 1970s and 1980s, revealed a rich record of royal genealogies, astronomical calendars, and mythological narratives.</p>

      <p>The transition from writing as an administrative tool to writing as a vehicle for literature, religion, and philosophy marked a significant shift in human intellectual life. The Epic of Gilgamesh, written in cuneiform and dated to around 2100 BCE, is among the earliest surviving works of literature. As literacy expanded — however unevenly — it created new possibilities for the preservation and transmission of knowledge across time and space, enabling the accumulation of learning across generations in ways that oral tradition alone could not support.</p>
    `,
    questions: [
      {
        id: 'p2_q1',
        type: 'factual',
        question: 'According to paragraph 1, what distinguishes writing from spoken language?',
        choices: [
          'Writing emerged in every human society simultaneously.',
          'Writing is a naturally acquired capacity, while speech is learned.',
          'Writing is a culturally transmitted technology, while speech appears innate.',
          'Writing developed before spoken language in most civilizations.'
        ],
        answer: 2,
        explanation: 'Paragraph 1 explicitly states that spoken language "appears to be an innate capacity" while writing is described as "a technology — a culturally transmitted system that must be learned."'
      },
      {
        id: 'p2_q2',
        type: 'vocab',
        question: 'The word "stratified" in paragraph 1 is closest in meaning to:',
        choices: ['isolated', 'organized into social levels or classes', 'economically advanced', 'geographically spread out'],
        answer: 1,
        explanation: '"Stratified" refers to something arranged in layers or strata, and when applied to societies, it means they are organized into different social classes or levels.'
      },
      {
        id: 'p2_q3',
        type: 'factual',
        question: 'According to paragraph 2, what was the primary purpose of the earliest cuneiform tablets?',
        choices: [
          'Recording religious rituals and prayers.',
          'Documenting economic transactions and administrative records.',
          'Composing literary works for entertainment.',
          'Transmitting oral traditions into written form.'
        ],
        answer: 1,
        explanation: 'The passage states that "the earliest cuneiform tablets record economic transactions, inventories, and administrative records, reflecting the bureaucratic needs of an expanding urban civilization."'
      },
      {
        id: 'p2_q4',
        type: 'inference',
        question: 'What can be inferred from paragraph 3 about the Rosetta Stone?',
        choices: [
          'It was written entirely in hieroglyphics.',
          'It was discovered before cuneiform was deciphered.',
          'Knowledge of Greek was important in deciphering hieroglyphics.',
          'It contained only religious texts from ancient Egypt.'
        ],
        answer: 2,
        explanation: 'The passage states the Rosetta Stone provided the same text in hieroglyphic, Demotic, and Greek. Since Greek was already understood by scholars, they could use the Greek version as a key to decode hieroglyphics.'
      },
      {
        id: 'p2_q5',
        type: 'vocab',
        question: 'The word "comprehensible" in paragraph 4 is closest in meaning to:',
        choices: ['difficult to memorize', 'understandable', 'visually complex', 'historically significant'],
        answer: 1,
        explanation: '"Comprehensible" means able to be understood. The passage notes that the Chinese logographic system can be understood across different dialects.'
      },
      {
        id: 'p2_q6',
        type: 'rhetorical',
        question: 'Why does the author mention the Epic of Gilgamesh in paragraph 6?',
        choices: [
          'To argue that Mesopotamia was the most literate ancient civilization.',
          'To show that writing eventually moved beyond administrative purposes to literature.',
          'To provide evidence that cuneiform was the most complex writing system.',
          'To demonstrate that writing systems were developed for entertainment.'
        ],
        answer: 1,
        explanation: 'The Gilgamesh example illustrates the paragraph\'s main point about the transition from administrative writing to literature, philosophy, and knowledge preservation.'
      },
      {
        id: 'p2_q7',
        type: 'negative',
        question: 'According to the passage, which of the following is NOT mentioned as a feature of Chinese writing?',
        choices: [
          'It developed independently around 1200 BCE.',
          'It retained a largely logographic character.',
          'It was found on oracle bones used in divination.',
          'It borrowed symbols from Egyptian hieroglyphics.'
        ],
        answer: 3,
        explanation: 'The passage never states that Chinese writing borrowed symbols from Egyptian hieroglyphics. In fact, it emphasizes that Chinese writing "developed independently."'
      },
      {
        id: 'p2_q8',
        type: 'summary',
        question: 'Select the THREE answer choices that express the most important ideas in the passage about the development of writing.\n\n"Writing emerged independently in several ancient civilizations and evolved from simple record-keeping into a vehicle for complex human expression."',
        choices: [
          'Writing emerged independently in Mesopotamia, Egypt, China, and Mesoamerica, typically beginning as an administrative tool.',
          'The cuneiform tablets found in Uruk are currently displayed in museums around the world.',
          'Different writing systems developed distinct structures — some becoming phonetic, others remaining logographic.',
          'The Rosetta Stone was discovered in 1799 and is currently held in the British Museum.',
          'As writing expanded beyond administration to literature and philosophy, it enabled the accumulation of knowledge across generations.',
          'The Maya developed their writing system between the 3rd and 10th centuries CE.'
        ],
        answer: [0, 2, 4],
        explanation: 'The three major ideas are: (1) independent emergence for administrative purposes, (3) different structural approaches in different systems, and (5) expansion of writing to literature and knowledge transmission. The other options are minor details.'
      }
    ]
  };

  // ─── PASSAGE 3: Neuroplasticity and Learning ──────────────────
  const passage3 = {
    id: 'p3',
    title: 'Neuroplasticity and Learning',
    topic: 'Psychology & Neuroscience',
    icon: '🧠',
    level: 'Academic',
    estimatedTime: 20,
    passage: `
      <p>For much of the twentieth century, the dominant view in neuroscience held that the adult brain was essentially fixed in its structure — that neurons did not regenerate, and that the neural pathways established in childhood remained largely unchanged throughout an individual's life. This perspective, often attributed to the influential Spanish neuroanatomist Santiago Ramón y Cajal, seemed to close the door on the possibility of significant brain reorganization beyond early developmental periods. However, research beginning in the latter half of the twentieth century has fundamentally overturned this view, revealing that the brain retains a substantial capacity for structural and functional reorganization throughout life — a property now known as neuroplasticity.</p>

      <p>Neuroplasticity refers to the brain's ability to modify its connections and restructure its activity in response to experience, learning, injury, or environmental change. At the cellular level, plasticity involves changes in the strength of synaptic connections between neurons, the growth of new synaptic terminals, and, in certain brain regions, the formation of entirely new neurons through a process called neurogenesis. The hippocampus, a region critical for memory formation and spatial navigation, has been identified as one of the primary sites of adult neurogenesis, a finding that has dramatically altered scientists' understanding of memory and learning.</p>

      <p>Research on the mechanisms of learning has highlighted the role of long-term potentiation (LTP) as a key cellular basis for memory formation. LTP is a persistent strengthening of synaptic connections that follows repeated activation. When two neurons fire together repeatedly, the connection between them becomes more efficient — a principle sometimes summarized as "neurons that fire together, wire together." This Hebbian learning rule provides a mechanistic explanation for how practice, rehearsal, and repetition translate into durable neural representations.</p>

      <p>The practical implications of neuroplasticity for education and rehabilitation are considerable. Studies have demonstrated that intensive skill training — in domains ranging from musical performance to second-language acquisition — produces measurable structural changes in the brain. Taxi drivers in London, for instance, who must memorize thousands of streets (a process known as "acquiring the Knowledge"), show significantly enlarged hippocampi compared to non-taxi drivers. Similarly, musicians who begin training in childhood show differences in auditory cortex organization and the size of cortical areas associated with finger movement.</p>

      <p>Neuroplasticity also underlies the brain's capacity for recovery following injury. After a stroke or traumatic brain injury, damaged neural circuits may be partially compensated for by the reorganization of surviving tissue. Rehabilitation programs that exploit neuroplasticity — using intensive, repetitive exercises designed to activate and strengthen alternative neural pathways — have shown considerable effectiveness in restoring function in stroke patients. The extent of recovery depends on numerous factors, including the severity and location of the damage, the age of the patient, and the timing and intensity of rehabilitation.</p>

      <p>Despite the optimism surrounding neuroplasticity, researchers caution that the brain's capacity for change is not unlimited. Critical periods exist during which certain types of learning or neural organization are most easily achieved, and these windows of heightened plasticity do not remain open indefinitely. Furthermore, while neuroplasticity can facilitate recovery and learning, it can also reinforce maladaptive patterns — for example, the chronic pain condition known as central sensitization involves pathological changes in neural circuits that amplify pain signals, a form of "negative" neuroplasticity. A nuanced understanding of both the opportunities and limitations of neuroplasticity is therefore essential for its effective application in educational and clinical contexts.</p>
    `,
    questions: [
      {
        id: 'p3_q1',
        type: 'factual',
        question: 'According to paragraph 1, what was the dominant view of the adult brain for much of the twentieth century?',
        choices: [
          'The brain could reorganize itself rapidly in response to injury.',
          'Neural pathways established in childhood changed significantly in adulthood.',
          'The adult brain was essentially fixed, with limited capacity for reorganization.',
          'Neurons regenerated continuously throughout adult life.'
        ],
        answer: 2,
        explanation: 'Paragraph 1 states that the dominant view held "that the adult brain was essentially fixed in its structure — that neurons did not regenerate, and that the neural pathways established in childhood remained largely unchanged."'
      },
      {
        id: 'p3_q2',
        type: 'vocab',
        question: 'The word "overturned" in paragraph 1 is closest in meaning to:',
        choices: ['supported', 'complicated', 'reversed or disproved', 'gradually confirmed'],
        answer: 2,
        explanation: '"Overturned" means to reverse or negate a previously held position. The passage states that research "fundamentally overturned" the old view that the brain was fixed.'
      },
      {
        id: 'p3_q3',
        type: 'factual',
        question: 'According to paragraph 2, which brain region is identified as a primary site of adult neurogenesis?',
        choices: ['The auditory cortex', 'The motor cortex', 'The hippocampus', 'The prefrontal cortex'],
        answer: 2,
        explanation: 'The passage explicitly states that "The hippocampus, a region critical for memory formation and spatial navigation, has been identified as one of the primary sites of adult neurogenesis."'
      },
      {
        id: 'p3_q4',
        type: 'inference',
        question: 'Based on paragraph 3, what does the principle "neurons that fire together, wire together" suggest about learning?',
        choices: [
          'Learning is most effective when done in groups.',
          'Repeated practice strengthens the neural connections involved in that skill.',
          'Neurons must be physically connected to work together.',
          'Memory formation only occurs during sleep.'
        ],
        answer: 1,
        explanation: 'The principle summarizes long-term potentiation — repeated activation of neural connections makes them more efficient, providing a cellular basis for why practice improves learning.'
      },
      {
        id: 'p3_q5',
        type: 'rhetorical',
        question: 'Why does the author mention London taxi drivers in paragraph 4?',
        choices: [
          'To argue that taxi driving is the best way to improve memory.',
          'To provide a real-world example of how skill training causes measurable brain changes.',
          'To show that the hippocampus is only relevant for navigation.',
          'To contrast taxi drivers with musicians as groups affected by neuroplasticity.'
        ],
        answer: 1,
        explanation: 'The taxi driver example is used to illustrate the practical implication that intensive skill training produces measurable structural brain changes, specifically hippocampal enlargement.'
      },
      {
        id: 'p3_q6',
        type: 'factual',
        question: 'According to paragraph 5, what is one factor that affects the extent of recovery after brain injury?',
        choices: [
          'The patient\'s level of education',
          'The severity and location of the damage',
          'The type of medication administered',
          'The number of neurons in the hippocampus'
        ],
        answer: 1,
        explanation: 'The passage lists "the severity and location of the damage, the age of the patient, and the timing and intensity of rehabilitation" as factors affecting recovery extent.'
      },
      {
        id: 'p3_q7',
        type: 'vocab',
        question: 'The word "maladaptive" in paragraph 6 is closest in meaning to:',
        choices: ['highly beneficial', 'poorly adjusted or harmful', 'extremely complex', 'relating to movement'],
        answer: 1,
        explanation: '"Maladaptive" describes behaviors or patterns that are poorly suited to a situation and potentially harmful. The passage uses it to describe negative neuroplasticity that reinforces pain signals.'
      },
      {
        id: 'p3_q8',
        type: 'summary',
        question: 'Select the THREE answer choices that express the most important ideas in the passage.\n\n"Neuroplasticity demonstrates that the brain retains significant capacity for change throughout life, with important implications for learning and recovery."',
        choices: [
          'The adult brain can modify its structure and function in response to experience, learning, and injury — contradicting the earlier view that it was fixed.',
          'Long-term potentiation (LTP) and Hebbian learning provide a cellular mechanism explaining how repeated practice strengthens neural connections.',
          'Santiago Ramón y Cajal was born in Spain and made important early contributions to neuroanatomy.',
          'Neuroplasticity has practical applications in both education — as shown by structural changes from skill training — and clinical rehabilitation after brain injury.',
          'London taxi drivers must memorize thousands of streets as part of their training.',
          'Neuroplasticity has limits, including critical periods and the possibility of reinforcing harmful neural patterns.'
        ],
        answer: [0, 1, 3],
        explanation: 'The key ideas are: (1) the discovery that the brain can change throughout life, (2) the cellular mechanism of LTP, and (4) the practical applications in learning and rehabilitation. Choices 3, 5, and 6 are minor details or misrepresentations.'
      }
    ]
  };

  return {
    getPassages() {
      return [passage1, passage2, passage3];
    },
    getPassage(id) {
      return [passage1, passage2, passage3].find(p => p.id === id) || null;
    }
  };

})();
