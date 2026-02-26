/**
 * EnglishPath — TOEFL iBT Simulation Data
 * Fase 15c-2: Simulasi Full Test TOEFL iBT
 *
 * Flow: Reading (54 min) → Listening (41 min) → Break (10 min) → Speaking (17 min) → Writing (50 min)
 *
 * Reading:  2 passages × 10 questions = 20 questions
 * Listening: 2 lectures × 6Q + 1 conversation × 5Q = 17 questions
 * Speaking: Task 1 (independent) + Task 2 (campus) + Task 3 (concept) + Task 4 (lecture)
 * Writing:  Task 1 (integrated) + Task 2 (academic discussion)
 */

const TOEFLSimData = (() => {

  // ─── READING SECTION ──────────────────────────────────────────
  // 2 passages × 10 questions each

  const readingPassages = [
    {
      id: 'sr1',
      title: 'The Origins of Agriculture',
      topic: 'Archaeology & History',
      passage: `
        <p>The transition from nomadic hunter-gatherer lifestyles to settled agricultural communities, often called the Neolithic Revolution, represents one of the most transformative shifts in human history. This transition began independently in several regions of the world at different times, beginning roughly 10,000 years ago in the Fertile Crescent — a region stretching from present-day Iraq and Syria through to the eastern coast of the Mediterranean. From these origins, agriculture spread to adjacent regions through both migration of farming populations and adoption by indigenous groups.</p>

        <p>What drove hunter-gatherers to begin cultivating crops and herding animals rather than continuing their successful foraging practices? For much of the twentieth century, scholars assumed that agriculture was an obvious improvement — more reliable, more productive, and less dangerous than hunting. This view has been substantially revised. Archaeological and anthropological evidence now suggests that early farmers generally worked longer hours, ate a less varied diet, and experienced more nutritional deficiencies and infectious diseases than their hunter-gatherer contemporaries. Skeletal remains at early agricultural sites frequently show signs of reduced stature and increased instances of tooth decay compared to forager populations.</p>

        <p>Several competing explanations have been proposed for this paradoxical shift. The oasis hypothesis, proposed by V. Gordon Childe in the 1930s, suggested that climate change at the end of the last ice age caused populations and animals to concentrate around shrinking water sources, facilitating closer human-plant-animal relationships. A more recent perspective focuses on demographic pressure: as human populations grew, the food resources available through foraging became insufficient, making cultivation a necessary response rather than a voluntary choice. A third explanation emphasises the role of social and ritual factors, noting that some of the earliest evidence for intensive plant management appears at ceremonial sites such as Göbekli Tepe in southern Turkey, suggesting that cultivation may have initially served non-subsistence purposes.</p>

        <p>The geographical spread of agriculture was far from uniform. In East Asia, millet and rice were cultivated independently around the Yellow and Yangtze River valleys respectively, while in Sub-Saharan Africa, sorghum and yams were domesticated by separate communities. The Americas saw independent developments of maize, potatoes, and squash in Mesoamerica and the Andean region. This pattern of multiple independent origins suggests that agriculture was not a single discovery that diffused outward from one location, but rather a threshold that numerous human societies crossed independently when the relevant ecological and social conditions converged.</p>

        <p>The consequences of agriculture extended far beyond food production. Settled communities accumulated material goods and developed storage technologies, creating the conditions for economic inequality. Larger populations in fixed locations enabled new forms of political organisation and eventually the emergence of states and cities. Writing systems were invented, at least in part, for record-keeping of agricultural surpluses and trade. In this way, the agricultural revolution is often described as the foundation upon which all subsequent human civilisations were built — despite its paradoxical costs to the health and leisure of those who first adopted it.</p>

        <p>Modern researchers continue to refine their understanding of the agricultural transition using increasingly sophisticated tools. Ancient DNA analysis has allowed scientists to distinguish between the spread of farming through migration of populations carrying new genes and the spread through cultural adoption by pre-existing populations. Isotope analysis of skeletal remains provides evidence about diet and mobility. These technological advances are gradually resolving long-standing debates about the pace, pathways, and drivers of one of the defining chapters of human prehistory.</p>
      `,
      questions: [
        {
          id: 'sr1_q1',
          type: 'factual',
          question: 'According to paragraph 1, which of the following is true about the origins of agriculture?',
          choices: [
            'It originated in a single location and spread globally from there.',
            'It began in the Fertile Crescent approximately 10,000 years ago.',
            'It was primarily adopted through cultural exchange rather than migration.',
            'It emerged simultaneously in all regions of the world.'
          ],
          answer: 1,
          explanation: 'Paragraph 1 states the transition "began roughly 10,000 years ago in the Fertile Crescent." The spread occurred through both migration and adoption, not from a single origin.'
        },
        {
          id: 'sr1_q2',
          type: 'negative_factual',
          question: 'According to paragraph 2, which of the following is NOT mentioned as a disadvantage experienced by early farmers?',
          choices: [
            'Longer working hours',
            'Reduced dietary variety',
            'Greater vulnerability to predators',
            'More frequent infectious diseases'
          ],
          answer: 2,
          explanation: 'Paragraph 2 mentions longer hours, less varied diet, nutritional deficiencies, and infectious diseases. Vulnerability to predators is not mentioned.'
        },
        {
          id: 'sr1_q3',
          type: 'vocab',
          question: 'The word "paradoxical" in paragraph 3 is closest in meaning to:',
          choices: ['expected', 'rapid', 'seemingly contradictory', 'geographically diverse'],
          answer: 2,
          explanation: '"Paradoxical" refers to something that seems contradictory — in this case, why people would adopt a harder lifestyle that offered fewer health benefits.'
        },
        {
          id: 'sr1_q4',
          type: 'inference',
          question: 'What can be inferred about the oasis hypothesis from paragraph 3?',
          choices: [
            'It is currently the most accepted explanation for the origins of agriculture.',
            'It was proposed in response to recent archaeological evidence.',
            'It has been partially replaced by more recent theories.',
            'It argues that agriculture spread through migration of farmers.'
          ],
          answer: 2,
          explanation: 'The passage presents the oasis hypothesis as "proposed ... in the 1930s" alongside "more recent perspectives," implying it has been supplemented or challenged by newer theories.'
        },
        {
          id: 'sr1_q5',
          type: 'rhetorical_purpose',
          question: 'Why does the author mention Göbekli Tepe in paragraph 3?',
          choices: [
            'To show that agriculture originated in Turkey.',
            'To support the argument that farming was initially motivated by non-food purposes.',
            'To provide evidence that climate change drove the agricultural revolution.',
            'To illustrate the geographic spread of early farming techniques.'
          ],
          answer: 1,
          explanation: 'Göbekli Tepe is mentioned as evidence supporting the third explanation — that cultivation may have begun for ritual/ceremonial purposes rather than subsistence.'
        },
        {
          id: 'sr1_q6',
          type: 'factual',
          question: 'According to paragraph 4, which of the following pairs of crops were domesticated in the Americas?',
          choices: [
            'Millet and rice',
            'Sorghum and yams',
            'Maize and potatoes',
            'Wheat and barley'
          ],
          answer: 2,
          explanation: 'Paragraph 4 states: "maize, potatoes, and squash in Mesoamerica and the Andean region" for the Americas. Millet/rice are East Asian; sorghum/yams are Sub-Saharan African.'
        },
        {
          id: 'sr1_q7',
          type: 'inference',
          question: 'Based on paragraph 4, what can be inferred about the development of agriculture in different regions?',
          choices: [
            'Farmers in different regions shared knowledge through trade networks.',
            'Environmental and social conditions in each region independently encouraged farming.',
            'One region\'s agricultural practices were deliberately spread to others.',
            'Only regions with sufficient water resources could develop agriculture.'
          ],
          answer: 1,
          explanation: 'The passage says agriculture appeared when "relevant ecological and social conditions converged," suggesting conditions in each region independently drove the transition.'
        },
        {
          id: 'sr1_q8',
          type: 'factual',
          question: 'According to paragraph 5, which development is described as a consequence of settled agricultural communities?',
          choices: [
            'The decline of nomadic trade networks',
            'The invention of writing for record-keeping',
            'The reduction of political complexity',
            'The elimination of food shortages'
          ],
          answer: 1,
          explanation: 'Paragraph 5 states: "Writing systems were invented, at least in part, for record-keeping of agricultural surpluses and trade."'
        },
        {
          id: 'sr1_q9',
          type: 'vocab',
          question: 'The phrase "refine their understanding" in paragraph 6 most nearly means:',
          choices: [
            'fundamentally change their theories',
            'improve their knowledge with greater accuracy',
            'publish their findings in academic journals',
            'dispute previous archaeological conclusions'
          ],
          answer: 1,
          explanation: '"Refine" means to improve or make more precise, so "refine their understanding" means to develop more accurate and nuanced knowledge.'
        },
        {
          id: 'sr1_q10',
          type: 'prose_summary',
          question: 'An introductory sentence for a brief summary of the passage is provided below. Complete the summary by selecting THREE answer choices that express the most important ideas in the passage. Some choices are incorrect because they express information that is not in the passage, are minor details, or contradict information in the passage.',
          intro: 'The agricultural revolution transformed human society despite presenting significant challenges to early farmers.',
          choices: [
            'Agriculture emerged independently in multiple world regions when ecological and social conditions were favourable.',
            'Early farmers often experienced worse health outcomes than hunter-gatherers who preceded them.',
            'The spread of agriculture was primarily driven by the desire to accumulate material goods.',
            'The transition to farming enabled the development of complex societies, cities, and writing systems.',
            'Modern DNA analysis has proven that farming spread exclusively through population migration.',
            'Competing theories attempt to explain why humans adopted a more difficult lifestyle.'
          ],
          answers: [0, 1, 3],
          explanation: 'The passage covers three main ideas: multiple independent origins (A), the health paradox of farming (B), and the civilizational consequences (D). C misrepresents the cause, E is contradicted by the passage, and F is secondary to A.'
        }
      ]
    },

    {
      id: 'sr2',
      title: 'Ocean Currents and Climate',
      topic: 'Earth Science & Oceanography',
      passage: `
        <p>Ocean currents are among the most powerful forces shaping Earth's climate. These continuous flows of seawater, driven by differences in water temperature, salinity, and wind patterns, transport enormous amounts of heat from the tropics toward the poles and facilitate the exchange of gases between the ocean and atmosphere. The global system of interconnected surface and deep-water currents is sometimes called the ocean conveyor belt, or more technically, the thermohaline circulation — a name derived from the Greek words for heat and salt.</p>

        <p>The thermohaline circulation operates through a process of density-driven flow. In the North Atlantic, warm surface water carried northward by currents such as the Gulf Stream releases heat to the atmosphere, warming the climates of Western Europe. As this water cools, it becomes denser and sinks to the deep ocean, forming North Atlantic Deep Water. This sinking triggers a compensatory flow of warm surface water from lower latitudes, maintaining the circulation. The water then slowly spreads through the deep ocean, eventually upwelling in the Pacific and Indian Oceans before returning, warmed, to complete the cycle — a journey estimated to take roughly 1,000 years for a single parcel of water.</p>

        <p>The climate implications of this circulation are profound. Research suggests that without the heat transported by the Atlantic branch of the thermohaline circulation, average temperatures in Northern Europe might be 5 to 10 degrees Celsius lower than they are today. The influence extends beyond temperature: ocean currents also affect precipitation patterns, storm tracks, and the distribution of marine nutrients that underpin oceanic food chains. Regions where cold, nutrient-rich water upwells to the surface — such as the coasts of Peru and West Africa — support some of the world's most productive fisheries.</p>

        <p>There is growing scientific concern that human-induced climate change may disrupt the thermohaline circulation. As global temperatures rise, Arctic ice melts, adding large volumes of freshwater to the North Atlantic. Since freshwater is less dense than saline water, this influx reduces the density differential that drives deep-water formation, potentially weakening the circulation. Paleoclimatic evidence from ice cores and ocean sediment records shows that abrupt slowdowns or reorganisations of the thermohaline circulation have occurred naturally in the past, associated with periods of rapid cooling and major ecological disruption in the Northern Hemisphere.</p>

        <p>The most serious past disruption, the Younger Dryas event approximately 12,900 years ago, saw a dramatic cooling of Northern Europe within decades as the thermohaline circulation weakened following the catastrophic drainage of a large glacial lake into the North Atlantic. Temperatures in parts of the North Atlantic region dropped by as much as 10 to 15 degrees Celsius, forests retreated, and Ice Age conditions temporarily returned. While the probability of a similarly abrupt collapse in the near future remains debated among scientists, the direction of change — a weakening of the circulation — is supported by multiple independent lines of evidence.</p>

        <p>Monitoring the thermohaline circulation has become a priority for oceanographers and climate scientists. A network of instruments deployed across the Atlantic, known as RAPID, has been measuring the strength of the circulation continuously since 2004. Early data from RAPID confirmed suspicions that the circulation had weakened over the twentieth century, though the interpretation of this data and its long-term significance continues to be debated. What is not debated is the critical role ocean currents play in regulating the conditions that allow complex terrestrial and marine ecosystems — including human societies — to exist.</p>
      `,
      questions: [
        {
          id: 'sr2_q1',
          type: 'vocab',
          question: 'The word "thermohaline" in paragraph 1 is derived from words meaning:',
          choices: ['ocean and depth', 'heat and salt', 'wind and pressure', 'current and flow'],
          answer: 1,
          explanation: 'The passage explicitly states the name is "derived from the Greek words for heat and salt."'
        },
        {
          id: 'sr2_q2',
          type: 'factual',
          question: 'According to paragraph 2, what causes the sinking of surface water in the North Atlantic?',
          choices: [
            'Strong winds push the water downward.',
            'Water becomes denser as it cools after releasing heat.',
            'Deep ocean currents pull the water below the surface.',
            'Salinity decreases as the water moves northward.'
          ],
          answer: 1,
          explanation: 'Paragraph 2 states: "As this water cools, it becomes denser and sinks to the deep ocean."'
        },
        {
          id: 'sr2_q3',
          type: 'factual',
          question: 'How long does the author suggest it takes for a single parcel of water to complete the thermohaline cycle?',
          choices: ['100 years', '500 years', '1,000 years', '10,000 years'],
          answer: 2,
          explanation: 'Paragraph 2 states: "a journey estimated to take roughly 1,000 years for a single parcel of water."'
        },
        {
          id: 'sr2_q4',
          type: 'inference',
          question: 'Based on paragraph 3, what can be inferred about the relationship between upwelling and marine life?',
          choices: [
            'Upwelling areas tend to have warmer water that fish prefer.',
            'Nutrient-rich cold water supports high fish populations in upwelling zones.',
            'Upwelling occurs only in tropical regions near the equator.',
            'Marine nutrients are primarily produced by surface currents rather than upwelling.'
          ],
          answer: 1,
          explanation: 'The passage links upwelling with "cold, nutrient-rich water" and says these regions "support some of the world\'s most productive fisheries."'
        },
        {
          id: 'sr2_q5',
          type: 'rhetorical_purpose',
          question: 'Why does the author mention the coasts of Peru and West Africa in paragraph 3?',
          choices: [
            'To illustrate regions that are most vulnerable to climate change.',
            'To provide examples of productive fishing areas linked to upwelling.',
            'To show where the thermohaline circulation begins and ends.',
            'To contrast tropical ocean conditions with those in the North Atlantic.'
          ],
          answer: 1,
          explanation: 'Peru and West Africa are mentioned as examples of upwelling zones that "support some of the world\'s most productive fisheries."'
        },
        {
          id: 'sr2_q6',
          type: 'factual',
          question: 'According to paragraph 4, how does climate change potentially weaken the thermohaline circulation?',
          choices: [
            'Rising temperatures increase wind speeds that disrupt surface currents.',
            'Melting Arctic ice adds freshwater that reduces the density of North Atlantic water.',
            'Warmer oceans cause upwelling zones to disappear.',
            'Increased CO₂ acidifies the ocean, reducing water density.'
          ],
          answer: 1,
          explanation: 'Paragraph 4 explains that melting ice adds freshwater, which "is less dense than saline water," reducing the density differential that drives deep-water formation.'
        },
        {
          id: 'sr2_q7',
          type: 'vocab',
          question: 'The word "abrupt" in paragraph 4 is closest in meaning to:',
          choices: ['gradual', 'sudden', 'minor', 'predictable'],
          answer: 1,
          explanation: '"Abrupt" means sudden or unexpected. The passage uses it to describe rapid changes in the thermohaline circulation.'
        },
        {
          id: 'sr2_q8',
          type: 'negative_factual',
          question: 'According to paragraph 5, which of the following is NOT mentioned as a consequence of the Younger Dryas event?',
          choices: [
            'Temperatures dropped significantly in the North Atlantic region.',
            'Forests retreated as the climate cooled.',
            'Sea levels rose due to glacial melt.',
            'Ice Age conditions temporarily returned.'
          ],
          answer: 2,
          explanation: 'The passage mentions temperature drops, forests retreating, and Ice Age conditions, but does NOT mention sea level rise during the Younger Dryas.'
        },
        {
          id: 'sr2_q9',
          type: 'inference',
          question: 'What can be inferred about the RAPID monitoring network from paragraph 6?',
          choices: [
            'It was established to predict future climate changes with certainty.',
            'Its data has settled all scientific debates about the thermohaline circulation.',
            'It has provided evidence supporting concerns about a weakening circulation.',
            'It replaced all previous methods of ocean current measurement.'
          ],
          answer: 2,
          explanation: 'The passage says RAPID "confirmed suspicions that the circulation had weakened," supporting — though not resolving — concerns about long-term trends.'
        },
        {
          id: 'sr2_q10',
          type: 'prose_summary',
          question: 'An introductory sentence for a brief summary of the passage is provided below. Complete the summary by selecting THREE answer choices that express the most important ideas.',
          intro: 'The thermohaline circulation plays a critical role in regulating Earth\'s climate and may be vulnerable to disruption by human activities.',
          choices: [
            'The circulation transports heat from the tropics to polar regions, significantly warming climates like that of Western Europe.',
            'The RAPID monitoring network has definitively proven that the thermohaline circulation will collapse within decades.',
            'Historical evidence shows that disruptions to the circulation have caused rapid, significant climate changes.',
            'The circulation is driven entirely by wind patterns across the ocean surface.',
            'Adding freshwater from melting ice to the North Atlantic may weaken the circulation by reducing water density.',
            'All major fisheries in the world are located in regions with strong thermohaline circulation.'
          ],
          answers: [0, 2, 4],
          explanation: 'The three key ideas are: the circulation\'s climate regulation role (A), historical precedents for disruption (C), and the freshwater-weakening mechanism (E). B overstates certainty, D is incorrect, F is too broad.'
        }
      ]
    }
  ];

  // ─── LISTENING SECTION ────────────────────────────────────────
  // 2 lectures + 1 conversation

  const listeningTracks = [
    {
      id: 'sl1',
      type: 'lecture',
      title: 'The Psychology of Decision Making',
      topic: 'Psychology',
      icon: '🧠',
      course: 'Introduction to Psychology',
      professor: 'Professor',
      script: [
        { speaker: 'Professor', text: "Today I want to discuss something that affects every one of us every day — how we make decisions. And specifically, I want to challenge the classic economic model that assumes humans are rational agents who make decisions by carefully weighing costs and benefits to maximize their personal utility." },
        { speaker: 'Professor', text: "Starting in the 1970s, psychologists Daniel Kahneman and Amos Tversky began systematically documenting the ways human decision making deviates from this rational model. Their work, which eventually earned Kahneman the Nobel Prize in Economics in 2002, introduced the concept of cognitive biases — predictable, systematic errors in judgment that affect virtually everyone regardless of intelligence or education." },
        { speaker: 'Professor', text: "One of the most robust findings is the concept of loss aversion. In simple terms, people feel the pain of losing something about twice as intensely as they feel the pleasure of gaining something equivalent. If I offer you a coin flip where you win fifty dollars if it lands heads, how much would you need to win to make it feel worth the risk of losing fifty dollars? Studies consistently show people require about one hundred to one hundred and fifty dollars — not fifty — to feel the risk is worthwhile. The potential loss weighs twice as heavily as the equivalent gain." },
        { speaker: 'Professor', text: "A related phenomenon is the endowment effect. Once people own something, they value it more highly than they would if they didn't own it. Classic experiments by Kahneman and colleagues gave participants a coffee mug and then asked what price they would accept to sell it. Participants who owned the mug demanded significantly more than participants who didn't own it were willing to pay for the same mug. Ownership itself creates additional subjective value." },
        { speaker: 'Professor', text: "Kahneman later synthesized much of this research into what he called System 1 and System 2 thinking. System 1 is fast, automatic, intuitive, and emotionally driven — it's what allows us to catch a ball or recognise a friend's face without conscious effort. System 2 is slow, deliberate, analytical, and requires mental effort. When we face complex decisions, we like to think we're using System 2 — carefully reasoning through the options. But research shows we often rely on System 1 shortcuts, called heuristics, even when the stakes are high." },
        { speaker: 'Professor', text: "What are the practical implications? Well, for one, this research has given rise to the field of behavioural economics, which has influenced policy design. The concept of nudges — small changes to how choices are presented that predictably influence decisions without restricting freedom — has been applied in areas from retirement savings to organ donation. Simply changing the default option from 'opt-in' to 'opt-out' for organ donation, for example, dramatically increases donation rates in countries that have made this change. For next class, I'd like you to read chapter six on nudge theory and think about examples you've encountered in your own life." }
      ],
      questions: [
        {
          id: 'sl1_q1',
          type: 'main_idea',
          question: 'What is the main purpose of the lecture?',
          choices: [
            'To explain the economic theory of rational choice.',
            'To describe how humans systematically deviate from rational decision making.',
            'To argue that cognitive biases can be eliminated through education.',
            'To compare the decision-making abilities of economists and psychologists.'
          ],
          answer: 1,
          explanation: 'The professor explicitly states the intention to "challenge the classic economic model" and describes systematic deviations from rational decision making.'
        },
        {
          id: 'sl1_q2',
          type: 'detail',
          question: 'According to the professor, how much would most people need to win on a coin flip to feel it is worth risking losing fifty dollars?',
          choices: ['About fifty dollars', 'About seventy-five dollars', 'About one hundred to one hundred and fifty dollars', 'About two hundred dollars'],
          answer: 2,
          explanation: 'The professor states: "Studies consistently show people require about one hundred to one hundred and fifty dollars — not fifty — to feel the risk is worthwhile."'
        },
        {
          id: 'sl1_q3',
          type: 'detail',
          question: 'What does the professor say about the endowment effect experiment?',
          choices: [
            'Participants who owned the mug accepted lower prices than non-owners would pay.',
            'Owners demanded significantly more than non-owners were willing to pay for the same item.',
            'Participants refused to sell their mugs regardless of the price offered.',
            'Non-owners valued the mugs more highly once they were given a chance to examine them.'
          ],
          answer: 1,
          explanation: 'The professor explains that mug owners "demanded significantly more than participants who didn\'t own it were willing to pay for the same mug."'
        },
        {
          id: 'sl1_q4',
          type: 'function',
          question: 'Why does the professor mention catching a ball and recognising a friend\'s face?',
          choices: [
            'To contrast physical and cognitive abilities.',
            'To give examples of activities that require System 2 thinking.',
            'To illustrate the automatic, effortless nature of System 1 thinking.',
            'To show that humans are more skilled at physical tasks than mental ones.'
          ],
          answer: 2,
          explanation: 'These examples are used to illustrate System 1 — "fast, automatic, intuitive" processing that "allows us to catch a ball or recognise a friend\'s face without conscious effort."'
        },
        {
          id: 'sl1_q5',
          type: 'inference',
          question: 'Based on the lecture, what can be inferred about nudge theory?',
          choices: [
            'It forces people to change their behavior through legal restrictions.',
            'It uses the predictability of cognitive biases to guide people toward beneficial choices.',
            'It was developed by Kahneman and Tversky in the 1970s.',
            'It has been applied primarily in the field of medical diagnosis.'
          ],
          answer: 1,
          explanation: 'Nudges are "small changes to how choices are presented that predictably influence decisions." This suggests they exploit predictable human biases to guide behavior.'
        },
        {
          id: 'sl1_q6',
          type: 'organization',
          question: 'How does the professor organize the information in the lecture?',
          choices: [
            'By presenting a problem and offering a historical solution.',
            'By introducing a theoretical framework, giving examples, then discussing applications.',
            'By comparing the work of two competing researchers.',
            'By describing a series of unrelated psychological phenomena.'
          ],
          answer: 1,
          explanation: 'The professor introduces the framework (deviations from rational decision making), gives specific examples (loss aversion, endowment effect, System 1/2), then discusses practical applications (behavioural economics, nudges).'
        }
      ]
    },

    {
      id: 'sl2',
      type: 'lecture',
      title: 'Plate Tectonics and Mountain Formation',
      topic: 'Geology',
      icon: '⛰️',
      course: 'Earth Science',
      professor: 'Professor',
      script: [
        { speaker: 'Professor', text: "Alright, let's talk about one of the most elegant theories in all of earth science — plate tectonics. This theory, which wasn't fully accepted until the 1960s and 1970s, explains a remarkable range of geological phenomena: earthquakes, volcanoes, the distribution of fossils across different continents, and most relevant to today's lecture — the formation of mountain ranges." },
        { speaker: 'Professor', text: "The basic idea is that Earth's outer shell — the lithosphere — is divided into several large and many smaller rigid plates that float on the partially molten rock of the asthenosphere beneath. These plates are in continuous motion, driven by convection currents in the mantle caused by heat from Earth's interior. They move at rates of a few centimetres per year — roughly the speed your fingernails grow — but over millions of years, these small movements accumulate into continental-scale changes." },
        { speaker: 'Professor', text: "Now, there are three types of plate boundaries, and each produces distinctive geological features. Divergent boundaries occur where plates move apart — new crust is created here as magma rises to fill the gap. The Mid-Atlantic Ridge, which runs down the centre of the Atlantic Ocean, is the classic example. Convergent boundaries occur where plates collide, and this is where things get particularly interesting for our purposes. Transform boundaries occur where plates slide past each other horizontally — the San Andreas Fault in California is the most famous example." },
        { speaker: 'Professor', text: "At convergent boundaries, the outcome depends on the types of plates colliding. When an oceanic plate meets a continental plate, the denser oceanic plate dives beneath the continental plate in a process called subduction. This creates deep ocean trenches, and as the subducted plate descends into the hot mantle, it melts and the resulting magma rises to form volcanic mountain ranges like the Andes in South America — what we call volcanic arc mountains." },
        { speaker: 'Professor', text: "But when two continental plates collide, neither one is dense enough to subduct significantly. Instead, the crust crumples and thickens, building enormous fold mountain ranges. The Himalayas are the textbook example. They formed — and are still forming — because the Indian subcontinent is colliding with the Eurasian plate. India was once a separate continent drifting northward after the breakup of the ancient supercontinent Gondwana. About 50 million years ago, India began colliding with Eurasia, and that slow-motion collision has pushed up the highest mountains on Earth. Mount Everest is getting slightly taller every year as the collision continues." },
        { speaker: 'Professor', text: "One of the most compelling lines of evidence for plate tectonics comes from marine fossils found at high altitude in the Himalayas. These rocks were once ocean floor sediments, deposited at the bottom of the ancient Tethys Sea that separated India from Eurasia. When the plates collided, these seafloor sediments were thrust upward, carrying marine fossils with them. Finding ocean fossils thousands of metres above sea level seems paradoxical until you understand plate tectonics — then it becomes direct, physical evidence of one of the greatest geological stories on Earth." }
      ],
      questions: [
        {
          id: 'sl2_q1',
          type: 'main_idea',
          question: 'What is the main focus of the lecture?',
          choices: [
            'The history of the plate tectonics theory.',
            'How plate movement at convergent boundaries creates mountain ranges.',
            'The differences between oceanic and continental plates.',
            'Evidence that disproves the theory of plate tectonics.'
          ],
          answer: 1,
          explanation: 'The professor states the lecture is about mountain formation and explains how different types of plate collisions create different mountain ranges.'
        },
        {
          id: 'sl2_q2',
          type: 'detail',
          question: 'According to the professor, what drives the movement of tectonic plates?',
          choices: [
            'The gravitational pull of the Moon',
            'Convection currents in the mantle caused by Earth\'s internal heat',
            'Differences in ocean current temperature',
            'The rotation of Earth on its axis'
          ],
          answer: 1,
          explanation: 'The professor states plates are driven by "convection currents in the mantle caused by heat from Earth\'s interior."'
        },
        {
          id: 'sl2_q3',
          type: 'detail',
          question: 'What does the professor say happens when an oceanic plate meets a continental plate?',
          choices: [
            'Both plates fold upward to form mountains.',
            'The continental plate sinks beneath the oceanic plate.',
            'The denser oceanic plate subducts beneath the continental plate.',
            'A rift valley forms between the two plates.'
          ],
          answer: 2,
          explanation: 'The professor explains: "the denser oceanic plate dives beneath the continental plate in a process called subduction."'
        },
        {
          id: 'sl2_q4',
          type: 'function',
          question: 'Why does the professor compare plate movement speed to fingernail growth?',
          choices: [
            'To show that the movement is too slow to have any geological significance.',
            'To help students visualise a very slow but steady rate of movement.',
            'To contrast biological and geological processes.',
            'To explain why earthquakes are difficult to predict.'
          ],
          answer: 1,
          explanation: 'The comparison to fingernail growth helps students understand the very slow (centimetres per year) but consistent movement of tectonic plates.'
        },
        {
          id: 'sl2_q5',
          type: 'inference',
          question: 'Based on the lecture, what can be inferred about Mount Everest?',
          choices: [
            'It formed when an oceanic plate subducted beneath Eurasia.',
            'It stopped growing approximately 50 million years ago.',
            'It is part of a volcanic arc mountain chain.',
            'It continues to grow taller because the Indian and Eurasian plates are still colliding.'
          ],
          answer: 3,
          explanation: 'The professor states India is "still" colliding with Eurasia, and that "Mount Everest is getting slightly taller every year as the collision continues."'
        },
        {
          id: 'sl2_q6',
          type: 'attitude',
          question: 'What is the professor\'s attitude toward the marine fossils found in the Himalayas?',
          choices: [
            'Skeptical — the evidence is inconclusive.',
            'Neutral — it is simply one of many types of geological evidence.',
            'Enthusiastic — it is compelling physical evidence for plate tectonics.',
            'Cautious — the fossils could be explained by other theories.'
          ],
          answer: 2,
          explanation: 'The professor calls the fossils "direct, physical evidence of one of the greatest geological stories on Earth" and describes finding them as seeming "paradoxical" until explained by plate tectonics — showing enthusiasm.'
        }
      ]
    },

    {
      id: 'sc1',
      type: 'conversation',
      title: 'Student Consulting Academic Advisor',
      topic: 'Campus Life',
      icon: '🏫',
      script: [
        { speaker: 'Advisor', text: "Come in! Oh hi, you must be the student who emailed about changing your major. Have a seat." },
        { speaker: 'Student', text: "Yes, thank you for making time. I'm Marcus Chen. I'm a second-year student currently in the Economics program, but I've been thinking seriously about switching to Environmental Science." },
        { speaker: 'Advisor', text: "Okay, that's quite a shift. What's driving this, Marcus? Academic dissatisfaction, career concerns, or something else entirely?" },
        { speaker: 'Student', text: "Honestly, it's more of a passion thing. I took an environmental policy elective last semester, and it completely changed how I think about my future. I realised I want to work on climate solutions, not just analyse markets. But I'm worried about losing credits and falling behind on graduation." },
        { speaker: 'Advisor', text: "That's a legitimate concern. Let me pull up your transcript here... okay, so you've completed thirty-two credits. The good news is that quite a few of your economics courses will count toward the Environmental Science degree. Statistics, Research Methods, and even your Macro and Micro economics courses are listed as relevant electives for the Environmental Economics track within Environmental Science." },
        { speaker: 'Student', text: "Wait, there's an Environmental Economics track? That sounds like it could be exactly what I'm looking for." },
        { speaker: 'Advisor', text: "Yes, it's relatively new — introduced two years ago. It combines environmental science core requirements like ecology, environmental chemistry, and field methods with economics courses focusing on environmental policy, natural resource economics, and cost-benefit analysis. Students in this track are quite employable — government agencies, NGOs, and sustainability consultancies all actively recruit from it." },
        { speaker: 'Student', text: "That sounds perfect, honestly. So how many additional credits would I need? Would I still be able to graduate on time?" },
        { speaker: 'Advisor', text: "Let me calculate... you have thirty-two credits, roughly eighteen of which I'd say can transfer directly. Environmental Science requires one hundred and twenty credits for graduation. So you'd need about one hundred and two more credits. At a normal pace of thirty-two credits per year, you'd be looking at graduating in about three and a half years from now, which means you'd be one semester late." },
        { speaker: 'Student', text: "One semester. That's not as bad as I feared. Could I potentially take summer courses to catch up?" },
        { speaker: 'Advisor', text: "Absolutely — summer sessions offer several Environmental Science core courses. If you take two courses each summer for two summers, you'd be back on track to graduate on your original timeline. I'd recommend meeting with Professor Tanaka in Environmental Science before you finalise the decision. She can walk you through the specific course sequence and let you know which of your existing courses will definitely transfer." }
      ],
      questions: [
        {
          id: 'sc1_q1',
          type: 'main_idea',
          question: 'Why is the student visiting the advisor?',
          choices: [
            'To appeal a failed grade in an Economics course.',
            'To discuss changing his major from Economics to Environmental Science.',
            'To get approval for taking more credits than normally allowed.',
            'To ask about internship opportunities in environmental policy.'
          ],
          answer: 1,
          explanation: 'Marcus explicitly states he is "thinking seriously about switching to Environmental Science" and has concerns about credit transfer and graduation timeline.'
        },
        {
          id: 'sc1_q2',
          type: 'detail',
          question: 'What motivated Marcus to consider changing his major?',
          choices: [
            'Poor grades in his Economics courses',
            'Advice from a professor in the Economics department',
            'An environmental policy elective that changed his perspective on his future',
            'Job market research showing more opportunities in environmental fields'
          ],
          answer: 2,
          explanation: 'Marcus says: "I took an environmental policy elective last semester, and it completely changed how I think about my future."'
        },
        {
          id: 'sc1_q3',
          type: 'detail',
          question: 'According to the advisor, how many of Marcus\'s existing credits would transfer to the Environmental Science program?',
          choices: ['All thirty-two credits', 'About eighteen credits', 'About twenty-five credits', 'Fewer than ten credits'],
          answer: 1,
          explanation: 'The advisor states: "you have thirty-two credits, roughly eighteen of which I\'d say can transfer directly."'
        },
        {
          id: 'sc1_q4',
          type: 'inference',
          question: 'What can be inferred about the Environmental Economics track?',
          choices: [
            'It is the most popular specialisation in the Environmental Science program.',
            'It may align well with both Marcus\'s economics background and environmental interests.',
            'It requires students to take fewer science courses than other tracks.',
            'It was developed in response to student demand for economics courses.'
          ],
          answer: 1,
          explanation: 'The track combines economics and environmental science courses, which fits Marcus\'s background (economics) and new interests (environmental policy and climate solutions).'
        },
        {
          id: 'sc1_q5',
          type: 'attitude',
          question: 'How does Marcus respond when he learns about the Environmental Economics track?',
          choices: [
            'He is disappointed that it does not fully align with his interests.',
            'He is uncertain whether the track is rigorous enough.',
            'He is immediately enthusiastic and thinks it could be what he is looking for.',
            'He is concerned about the employment prospects in that field.'
          ],
          answer: 2,
          explanation: 'Marcus responds: "That sounds like it could be exactly what I\'m looking for" and later "That sounds perfect, honestly."'
        }
      ]
    }
  ];

  // ─── SPEAKING SECTION ─────────────────────────────────────────
  // Task 1: Independent | Task 2: Campus Announcement | Task 3: Academic Concept | Task 4: Lecture

  const speakingTasks = {
    task1: {
      id: 'ss1',
      type: 'independent',
      icon: '💬',
      title: 'Independent Speaking — Task 1',
      prompt: 'Some people believe that students should be required to study a wide variety of subjects in university, including arts, sciences, and humanities. Others believe students should focus only on courses directly related to their chosen career. Which approach do you think is better for students, and why? Use specific reasons and examples to support your answer.',
      prepTime: 15,
      speakTime: 45,
      rubric: [
        { criterion: 'Delivery', desc: 'Pacing, clarity, natural flow — minimal pauses or hesitation' },
        { criterion: 'Language Use', desc: 'Vocabulary range, grammatical accuracy, sentence variety' },
        { criterion: 'Topic Development', desc: 'Clear position, well-supported reasoning, specific examples' }
      ],
      model: "I believe students should be required to study a broad range of subjects, and I have two main reasons. First, a broad education builds critical thinking skills that apply across all fields. In my own experience studying both literature and computer science, the analytical reading skills from literature actually made me a better programmer because I learned to interpret complex systems more carefully. Second, the world's most pressing challenges — climate change, public health, inequality — require people who can think across disciplines, not just in narrow specialisations. A doctor who understands sociology, or an engineer who appreciates ethics, will make better decisions than one who only knows their technical field. Of course, specialised knowledge matters too, but I think broad foundations should come first. They make specialists far more effective in the long run."
    },
    task2: {
      id: 'ss2',
      type: 'campus',
      icon: '📢',
      title: 'Campus Announcement — Task 2',
      readingTitle: 'Announcement from the Dean of Students',
      readingText: 'Effective from next semester, the university library will no longer offer 24-hour access to students on weekdays. The library will close at midnight and reopen at 7:00 a.m. This decision was made in response to concerns raised by library staff about working conditions during overnight hours, as well as data showing that the vast majority of students using the library between midnight and 7:00 a.m. are primarily engaged in social activities rather than academic work. Students requiring access to resources outside these hours may use the online library portal, which provides access to all digital resources at any time.',
      readingTime: 45,
      script: [
        { speaker: 'Student A', text: "Did you see the announcement about the library closing at midnight? I'm pretty upset about it, honestly." },
        { speaker: 'Student B', text: "Yeah, I heard. What do you think — does it affect you?" },
        { speaker: 'Student A', text: "It really does. I have a late shift at work three nights a week, so I don't even get home until eleven-thirty. The library was the one quiet place I could study after that without disturbing my roommate. Now I'm losing my best study time." },
        { speaker: 'Student B', text: "That's rough. I can see why they made the decision, though — I've been in the library at 2 a.m. and half the people are just hanging out, not studying." },
        { speaker: 'Student A', text: "Sure, but that's not everyone. And the thing about the online portal — I've tried using it for research, but it doesn't work well for everything. Some databases are really slow, and you can't access the physical reference materials. The announcement makes it sound like it's a perfect substitute, but it really isn't for everyone." }
      ],
      prepTime: 30,
      speakTime: 60,
      rubric: [
        { criterion: 'Content', desc: 'Accurately describe the announcement and the student\'s opinion with reasons' },
        { criterion: 'Language Use', desc: 'Varied vocabulary, accurate grammar, appropriate connectors' },
        { criterion: 'Coherence', desc: 'Well-organised response that integrates reading and listening' }
      ],
      promptQuestion: "The woman expresses her opinion about the library policy change. Explain her opinion and the reasons she gives for holding it."
    },
    task3: {
      id: 'ss3',
      type: 'academic',
      icon: '📖',
      title: 'Academic Concept — Task 3',
      readingTitle: 'Classical Conditioning',
      readingText: 'Classical conditioning is a form of learning in which a neutral stimulus becomes associated with a meaningful stimulus, eventually triggering a similar response on its own. The process was first systematically described by Russian physiologist Ivan Pavlov in the early 20th century through his famous experiments with dogs. In these experiments, Pavlov paired the ringing of a bell — a neutral stimulus — with the presentation of food — an unconditioned stimulus that naturally causes dogs to salivate. After repeated pairings, the dogs began to salivate in response to the bell alone, even when no food was present. The bell had become a conditioned stimulus capable of eliciting a conditioned response.',
      readingTime: 45,
      script: [
        { speaker: 'Professor', text: "The reading gives you Pavlov's original dog experiments as the classic illustration of classical conditioning. Let me give you two more modern examples that show how pervasive this type of learning is in everyday human life." },
        { speaker: 'Professor', text: "Think about the smell of a particular food that makes you feel nostalgic — maybe the smell of fresh bread reminds you of your grandmother's kitchen and immediately makes you feel warm and happy. You didn't decide to feel that way. The smell — a neutral stimulus — became associated with positive childhood experiences — the unconditioned stimulus — and now triggers an emotional response automatically. That's classical conditioning operating on human emotion and memory." },
        { speaker: 'Professor', text: "A less pleasant example: many people develop phobias through classical conditioning. If someone is attacked by a dog as a child, dogs — which might have been neutral stimuli before — become conditioned stimuli that trigger an intense fear response. Even seeing a photograph of a dog years later can trigger the conditioned fear response, even though the person knows rationally that a photograph cannot hurt them. Classical conditioning explains how these strong emotional associations can form and persist even when the original unconditioned stimulus is long gone." }
      ],
      prepTime: 30,
      speakTime: 60,
      rubric: [
        { criterion: 'Content', desc: 'Explain the concept from reading and connect to examples from lecture' },
        { criterion: 'Language Use', desc: 'Academic vocabulary, sentence variety, accurate grammar' },
        { criterion: 'Coherence', desc: 'Logical structure connecting theory and examples' }
      ],
      promptQuestion: "Explain what classical conditioning is, and describe how the professor illustrates it with examples."
    },
    task4: {
      id: 'ss4',
      type: 'lecture_only',
      icon: '🎓',
      title: 'Academic Lecture — Task 4',
      script: [
        { speaker: 'Professor', text: "Today I want to introduce you to a concept in ecology called keystone species — organisms that have a disproportionately large effect on their environment relative to their abundance." },
        { speaker: 'Professor', text: "The classic example is the sea otter. Sea otters eat sea urchins, which eat kelp. In ecosystems where sea otters are present, they keep sea urchin populations in check, which allows kelp forests to flourish. Kelp forests, in turn, support hundreds of other species — fish, invertebrates, marine mammals. When sea otters were hunted nearly to extinction along the Pacific coast, sea urchin populations exploded. The urchins overgrazed the kelp, creating what ecologists call 'urchin barrens' — barren areas of seafloor with almost no biodiversity. When sea otters were reintroduced, kelp forests recovered, and with them, the entire ecosystem." },
        { speaker: 'Professor', text: "Another keystone species is the grey wolf in Yellowstone National Park. When wolves were reintroduced in 1995, the effects rippled through the ecosystem in unexpected ways. Wolves preyed on elk, but more significantly, they changed elk behavior — elk avoided grazing in river valleys and gorges where they could be easily cornered. This behavioral shift allowed vegetation in those areas to recover. More vegetation stabilised riverbanks, reduced erosion, and changed the course of streams. Birds and beavers returned. The reintroduction of wolves quite literally changed the physical geography of parts of Yellowstone. This is called a trophic cascade." },
        { speaker: 'Professor', text: "What both examples illustrate is that ecological systems are not simply collections of independent species — they are webs of interdependence where the removal or addition of a single species can trigger cascading changes throughout the system. Identifying keystone species is therefore crucial for conservation efforts, because protecting them means protecting the entire ecosystem they support." }
      ],
      prepTime: 20,
      speakTime: 60,
      rubric: [
        { criterion: 'Content', desc: 'Accurately summarise the concept of keystone species and both examples' },
        { criterion: 'Language Use', desc: 'Accurate, varied academic vocabulary and grammar' },
        { criterion: 'Coherence', desc: 'Clear organisation and connection between concept and examples' }
      ],
      promptQuestion: "Using points and examples from the lecture, explain the concept of keystone species and why they are important."
    }
  };

  // ─── WRITING SECTION ──────────────────────────────────────────
  const writingTasks = {
    task1: {
      id: 'sw1',
      type: 'integrated',
      icon: '✍️',
      title: 'Integrated Writing — Task 1',
      readingTitle: 'The Case for Universal Basic Income',
      readingText: `Universal Basic Income (UBI) — a policy under which all citizens receive a regular, unconditional cash payment from the government regardless of employment status — has attracted growing support from economists, technologists, and policymakers worldwide. Proponents argue that UBI offers significant advantages over existing welfare systems. First, unlike means-tested benefits, UBI eliminates complex bureaucratic eligibility processes that frequently exclude the most vulnerable citizens through administrative errors or stigmatising requirements. By providing cash universally, UBI ensures that support reaches those who need it most. Second, UBI provides economic security that encourages entrepreneurship and risk-taking. When basic needs are guaranteed, individuals are more willing to leave stable but unfulfilling employment to start businesses or pursue education, potentially stimulating innovation and economic dynamism. Third, as automation increasingly displaces workers from routine jobs, UBI offers a mechanism to distribute the productivity gains of technological progress to society broadly, preventing the concentration of automation's benefits among a small class of technology owners.`,
      readingTime: 180,
      listenScript: [
        { speaker: 'Professor', text: "The reading presents a fairly optimistic picture of Universal Basic Income. I want to raise some counterarguments that complicate this picture." },
        { speaker: 'Professor', text: "First, the claim that UBI is more efficient than targeted welfare programs. The argument sounds appealing, but UBI is extraordinarily expensive. Providing even a modest payment to every citizen would cost trillions of dollars annually. To fund it, governments would likely need to eliminate or significantly reduce existing targeted programs that currently provide more generous support to the most vulnerable. A person relying on disability payments or housing assistance might actually receive less total support under UBI than under the current system. Universal doesn't necessarily mean more equitable." },
        { speaker: 'Professor', text: "Second, the entrepreneurship argument. The idea that economic security unleashes innovation is an appealing hypothesis, but the evidence base is thin. Most UBI pilot programs that have been conducted are small-scale and short-term. Large-scale, long-term behavioral changes — like whether people actually start more businesses — are much harder to predict from these pilots. Historical welfare expansions have not consistently produced entrepreneurship booms." },
        { speaker: 'Professor', text: "Third, the automation justification. The assumption that automation will eliminate jobs on a massive scale is itself contested. Historically, new technologies have always created new categories of work to replace displaced jobs. The net employment effect of automation is genuinely uncertain. Building a major, permanent policy on the assumption of mass technological unemployment may be premature." }
      ],
      listenNote: 'Profesor mempersoalkan tiga argumen utama dalam bacaan tentang UBI.',
      prompt: 'Summarise the points made in the lecture, being sure to explain how they cast doubt on specific points made in the reading passage.',
      wordMin: 150,
      wordMax: 225,
      timeLimit: 20,
      modelAnswer: `The professor challenges three main arguments presented in the reading in favour of Universal Basic Income.\n\nFirst, while the reading argues that UBI eliminates bureaucratic inefficiencies and reaches the most vulnerable, the professor counters that UBI would be extremely expensive to fund. Governments would likely have to cut existing targeted programs, which currently provide more generous support to those with specific needs such as disability or housing assistance. The result could be that vulnerable groups receive less support under UBI, not more.\n\nSecond, the reading claims UBI encourages entrepreneurship by providing economic security. The professor argues that the evidence for this is weak. Most UBI pilot programs are too small and short-term to prove large-scale behavioral effects, and historical welfare expansions have not reliably produced increases in new business formation.\n\nThird, the reading justifies UBI as a response to automation displacing workers. The professor questions the premise itself, noting that the assumption of mass technological unemployment is contested. Historically, new technologies have created new forms of work, and it may be premature to build a major policy around the assumption that this time will be different.`
    },
    task2: {
      id: 'sw2',
      type: 'discussion',
      icon: '💬',
      title: 'Academic Discussion — Task 2',
      professor: {
        name: 'Dr. Amara Nwosu',
        field: 'Sociology',
        post: "This week we've been examining theories of social change. I'd like you to consider the following question for our discussion: Is rapid technological change generally beneficial or harmful for society? Many scholars argue that technology consistently improves human welfare over time. Others warn that the pace of change outstrips our social, legal, and psychological capacity to adapt. What do you think, and what evidence or reasoning leads you to that conclusion?"
      },
      students: [
        {
          name: 'Hiroshi',
          post: "I think rapid technological change is generally beneficial, even if it creates short-term disruption. The historical record is pretty clear — advances in medicine, agriculture, communication, and energy have dramatically increased lifespans and reduced poverty globally over the past two centuries. The key is that societies adapt over time. New regulations emerge, new skills develop, new institutions form. Yes, there are losers in each transition, but the overall trajectory is positive. I'd rather live in a world of rapid technological progress than one of stagnation."
        },
        {
          name: 'Leila',
          post: "I'm more cautious than Hiroshi. I don't deny that technology has brought real benefits, but I think we systematically underestimate the costs. Social media is the obvious current example — it was designed to connect people but seems to be fuelling polarisation, mental health crises particularly in teenagers, and the spread of misinformation at a scale we haven't seen before. The problem isn't technology itself but the fact that we deploy it far faster than we develop the social or legal frameworks to manage its downsides. Maybe we need to build in more deliberate pause points before releasing powerful technologies into society."
        }
      ],
      prompt: "Contribute to the class discussion by sharing your own perspective. Support your view with specific reasons or examples. Your response should be at least 100 words.",
      wordMin: 100,
      timeLimit: 10,
      rubric: {
        0: 'Off-topic, too short, or fails to contribute meaningfully',
        1: 'Minimal contribution with vague or undeveloped ideas',
        2: 'A relevant position with limited explanation or engagement with classmates\' ideas',
        3: 'A clear position with adequate reasoning; some engagement with course discussion',
        4: 'Well-developed position with specific reasoning, clear engagement with the discussion thread',
        5: 'Insightful, well-organised response; integrates specific evidence; meaningfully builds on classmates\' contributions'
      }
    }
  };

  // ─── SCORE CALCULATORS ────────────────────────────────────────

  /**
   * Convert raw reading correct to 0–30 TOEFL iBT scale
   * Max: 20 questions (2 passages × 10)
   */
  function convertReadingScore(correct) {
    const total = 20;
    const pct = correct / total;
    if (pct >= 0.97) return 30;
    if (pct >= 0.93) return 29;
    if (pct >= 0.87) return 28;
    if (pct >= 0.83) return 27;
    if (pct >= 0.80) return 26;
    if (pct >= 0.77) return 25;
    if (pct >= 0.73) return 24;
    if (pct >= 0.70) return 23;
    if (pct >= 0.67) return 22;
    if (pct >= 0.63) return 21;
    if (pct >= 0.60) return 20;
    if (pct >= 0.57) return 19;
    if (pct >= 0.53) return 18;
    if (pct >= 0.50) return 17;
    if (pct >= 0.47) return 16;
    if (pct >= 0.43) return 15;
    if (pct >= 0.40) return 13;
    if (pct >= 0.37) return 11;
    if (pct >= 0.30) return 9;
    if (pct >= 0.23) return 7;
    if (pct >= 0.17) return 5;
    if (pct >= 0.10) return 3;
    return 1;
  }

  /**
   * Convert raw listening correct to 0–30 TOEFL iBT scale
   * Max: 17 questions (2×6 + 1×5)
   */
  function convertListeningScore(correct) {
    const total = 17;
    const pct = correct / total;
    if (pct >= 0.97) return 30;
    if (pct >= 0.90) return 28;
    if (pct >= 0.82) return 26;
    if (pct >= 0.76) return 24;
    if (pct >= 0.70) return 22;
    if (pct >= 0.64) return 20;
    if (pct >= 0.58) return 18;
    if (pct >= 0.52) return 16;
    if (pct >= 0.47) return 14;
    if (pct >= 0.41) return 12;
    if (pct >= 0.35) return 10;
    if (pct >= 0.29) return 8;
    if (pct >= 0.23) return 6;
    if (pct >= 0.17) return 4;
    return 2;
  }

  /**
   * Convert self-assessment scores to Speaking section score 0–30
   * 4 tasks rated 0–4 → scale to 0–30
   */
  function convertSpeakingScore(selfScores) {
    // selfScores: array of {score: 0-4} per task
    if (!selfScores || selfScores.length === 0) return 15; // default if no assessment
    const sum = selfScores.reduce((a, t) => a + (t || 0), 0);
    const avg = sum / selfScores.length;
    // avg 0-4 → scale to 0-30
    return Math.round((avg / 4) * 30);
  }

  /**
   * Convert self-assessment scores to Writing section score 0–30
   * 2 tasks rated 0–5 → scale to 0–30
   */
  function convertWritingScore(selfScores) {
    if (!selfScores || selfScores.length === 0) return 15;
    const sum = selfScores.reduce((a, t) => a + (t || 0), 0);
    const avg = sum / selfScores.length;
    // avg 0-5 → scale to 0-30
    return Math.round((avg / 5) * 30);
  }

  // Public API
  return {
    getReadingPassages: () => readingPassages,
    getListeningTracks: () => listeningTracks,
    getSpeakingTasks:  () => speakingTasks,
    getWritingTasks:   () => writingTasks,
    convertReadingScore,
    convertListeningScore,
    convertSpeakingScore,
    convertWritingScore
  };
})();
