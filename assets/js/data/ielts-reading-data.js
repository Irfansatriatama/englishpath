/**
 * EnglishPath — IELTS Reading Data
 * Fase 13b: 4 Academic passages + 2 General Training passages
 * Question types: Multiple Choice, True/False/Not Given, Matching Headings, Matching Info
 */

const IELTSReadingData = (() => {

  const passages = [
    // ─── ACADEMIC 1 ───────────────────────────────────────
    {
      id: 'ac1',
      type: 'academic',
      title: 'The Decline of Coral Reefs',
      topic: 'Environment & Science',
      level: 'Band 6–7',
      timeLimit: 20, // minutes
      wordCount: 650,
      text: `Coral reefs are among the most diverse and productive ecosystems on Earth, covering less than one percent of the ocean floor yet supporting approximately 25 percent of all marine species. These complex underwater structures are built by tiny marine invertebrates called coral polyps, which secrete calcium carbonate to form hard skeletons. Over thousands of years, these skeletons accumulate to create the vast reef structures we see today.

Despite their ecological importance, coral reefs worldwide are facing unprecedented threats. The primary driver of reef degradation is rising ocean temperatures caused by climate change. When water temperatures increase by even one degree Celsius above the seasonal maximum for several weeks, corals expel the symbiotic algae — called zooxanthellae — that live within their tissues. This process, known as coral bleaching, leaves the coral white and vulnerable. Without the algae, which provide up to 90 percent of the coral's energy through photosynthesis, the coral will eventually die if temperatures remain elevated.

Ocean acidification presents another serious challenge. As atmospheric carbon dioxide concentrations rise, more CO₂ dissolves into seawater, forming carbonic acid. This reduces the ocean's pH, making it harder for corals to build and maintain their calcium carbonate skeletons. Studies suggest that if CO₂ emissions continue at current rates, ocean acidity could increase by 150 percent by 2100, potentially making large portions of the ocean inhospitable to reef-building corals.

Human activities beyond greenhouse gas emissions also threaten reefs. Agricultural runoff introduces excess nutrients into coastal waters, promoting algal blooms that smother corals and block sunlight. Sedimentation from coastal development smothers reefs and reduces water clarity. Overfishing disrupts the ecological balance by removing herbivorous fish that control algae growth, allowing algae to outcompete corals.

However, there are reasons for cautious optimism. Marine protected areas have demonstrated measurable success in allowing reef ecosystems to recover when human pressures are reduced. Research into heat-resistant coral strains shows promise for assisted evolution programmes. Some reef systems have displayed surprising resilience, with corals adapting to higher temperatures in certain locations. International cooperation through agreements such as the Paris Climate Accord represents a step toward addressing the root cause of warming oceans.

Scientists emphasise that time is critical. Projections indicate that if global temperatures rise by 1.5°C above pre-industrial levels, between 70 and 90 percent of coral reefs may be severely damaged. At 2°C of warming, more than 99 percent could be lost. The window for meaningful intervention is narrow, and decisions made by governments, industries, and individuals in the coming decade will largely determine the fate of these irreplaceable ecosystems.`,
      questions: [
        {
          id: 'ac1_q1',
          type: 'tfng',
          question: 'Coral polyps produce calcium carbonate to construct their skeletal structures.',
          answer: 'TRUE',
          explanation: 'Paragraph 1 states: "coral polyps, which secrete calcium carbonate to form hard skeletons."'
        },
        {
          id: 'ac1_q2',
          type: 'tfng',
          question: 'Coral bleaching occurs when water temperature falls below the seasonal minimum.',
          answer: 'FALSE',
          explanation: 'The passage states bleaching occurs when temperature RISES above the seasonal maximum, not falls below the minimum.'
        },
        {
          id: 'ac1_q3',
          type: 'tfng',
          question: 'Zooxanthellae provide all of the energy that corals need to survive.',
          answer: 'FALSE',
          explanation: 'The passage states zooxanthellae provide "up to 90 percent" of energy, not all of it.'
        },
        {
          id: 'ac1_q4',
          type: 'tfng',
          question: 'Ocean acidity is projected to increase by 150 percent by the end of the century if emissions continue.',
          answer: 'TRUE',
          explanation: 'Paragraph 3 states: "ocean acidity could increase by 150 percent by 2100."'
        },
        {
          id: 'ac1_q5',
          type: 'tfng',
          question: 'The passage mentions that all coral species are equally vulnerable to temperature increases.',
          answer: 'NOT GIVEN',
          explanation: 'The passage mentions some corals adapting to higher temperatures but does not compare vulnerability across all species.'
        },
        {
          id: 'ac1_q6',
          type: 'mcq',
          question: 'According to the passage, what percentage of marine species do coral reefs support?',
          options: ['About 10 percent', 'About 25 percent', 'About 50 percent', 'About 90 percent'],
          answer: 1,
          explanation: 'Paragraph 1: "supporting approximately 25 percent of all marine species."'
        },
        {
          id: 'ac1_q7',
          type: 'mcq',
          question: 'What does the writer suggest about marine protected areas?',
          options: [
            'They have had no measurable effect on reef recovery.',
            'They have shown success in allowing ecosystems to recover.',
            'They are the only solution to coral reef decline.',
            'They are too expensive to implement globally.'
          ],
          answer: 1,
          explanation: 'Paragraph 5: "Marine protected areas have demonstrated measurable success in allowing reef ecosystems to recover."'
        },
        {
          id: 'ac1_q8',
          type: 'mcq',
          question: 'The primary threat to coral reefs mentioned in the passage is:',
          options: [
            'Overfishing by local communities',
            'Agricultural runoff and sedimentation',
            'Rising ocean temperatures due to climate change',
            'Ocean acidification from CO₂ dissolving in water'
          ],
          answer: 2,
          explanation: 'Paragraph 2: "The primary driver of reef degradation is rising ocean temperatures caused by climate change."'
        },
        {
          id: 'ac1_q9',
          type: 'match_heading',
          question: 'Which paragraph discusses the chemical changes in seawater that affect coral growth?',
          options: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3', 'Paragraph 4'],
          answer: 2,
          explanation: 'Paragraph 3 discusses ocean acidification — CO₂ dissolving in seawater and reducing pH.'
        },
        {
          id: 'ac1_q10',
          type: 'mcq',
          question: 'At what temperature rise are more than 99% of coral reefs predicted to be lost?',
          options: ['1°C', '1.5°C', '2°C', '3°C'],
          answer: 2,
          explanation: 'Paragraph 6: "At 2°C of warming, more than 99 percent could be lost."'
        }
      ]
    },

    // ─── ACADEMIC 2 ───────────────────────────────────────
    {
      id: 'ac2',
      type: 'academic',
      title: 'The Psychology of Decision-Making',
      topic: 'Psychology & Behaviour',
      level: 'Band 6–7',
      timeLimit: 20,
      wordCount: 620,
      text: `For much of the twentieth century, economists and social scientists assumed that human decision-making was fundamentally rational. The dominant model, known as rational choice theory, held that people consistently choose the option that maximises their personal utility — weighing costs and benefits objectively to arrive at optimal outcomes. This elegant framework underpinned much of economic theory and public policy for decades.

However, a series of experiments beginning in the 1970s began to reveal systematic patterns in human judgment that deviated markedly from rational predictions. Psychologists Daniel Kahneman and Amos Tversky were among the first to document these deviations rigorously. Their research identified numerous cognitive biases — predictable errors in thinking — that influence how people assess probabilities, evaluate risk, and make choices.

One of their most influential findings was the concept of loss aversion. Through controlled experiments, Kahneman and Tversky demonstrated that people feel the pain of losing something approximately twice as intensely as they feel the pleasure of gaining something of equivalent value. This asymmetry has profound implications for behaviour: people often take irrational risks to avoid losses that they would never accept to make equivalent gains.

Another key concept is the anchoring effect, whereby initial information serves as a reference point that disproportionately influences subsequent judgments, even when the anchor is arbitrary or irrelevant. In one classic experiment, participants who spun a wheel to produce a random number between 0 and 100 were then asked to estimate the percentage of African countries in the United Nations. Those who had spun high numbers gave consistently higher estimates than those who had spun low numbers — demonstrating that even meaningless information can anchor judgment.

Kahneman later synthesised much of this research into a two-system model of cognition. System 1 thinking is fast, automatic, and intuitive — it operates largely outside conscious awareness and relies on heuristics, or mental shortcuts. System 2 thinking is slow, deliberate, and analytical, requiring conscious effort. Most everyday decisions are handled by System 1, which is efficient but prone to the biases documented by decades of research. System 2 can override System 1, but doing so requires motivation and cognitive capacity that people often lack.

The practical implications of this research extend across many domains. In medicine, awareness of cognitive biases has led to the development of decision aids and structured protocols that help clinicians avoid diagnostic errors. In public policy, behavioural insights have been used to design "nudges" — subtle changes in how choices are presented that guide people toward better decisions without restricting their freedom. In finance, behavioural economics has challenged the efficient market hypothesis and offered explanations for phenomena such as market bubbles and the disposition effect, whereby investors hold losing stocks too long and sell winning ones too quickly.`,
      questions: [
        {
          id: 'ac2_q1',
          type: 'tfng',
          question: 'Rational choice theory argues that people always choose the option with the highest financial reward.',
          answer: 'FALSE',
          explanation: 'Rational choice theory says people maximise "personal utility" — not specifically financial reward.'
        },
        {
          id: 'ac2_q2',
          type: 'tfng',
          question: 'Kahneman and Tversky carried out their initial research in the 1970s.',
          answer: 'TRUE',
          explanation: 'Paragraph 2: "a series of experiments beginning in the 1970s."'
        },
        {
          id: 'ac2_q3',
          type: 'tfng',
          question: 'Loss aversion means people feel gains and losses with equal emotional intensity.',
          answer: 'FALSE',
          explanation: 'The passage states people feel losses "approximately twice as intensely" as equivalent gains.'
        },
        {
          id: 'ac2_q4',
          type: 'tfng',
          question: 'In the anchoring experiment, participants were asked about African nations in the United Nations.',
          answer: 'TRUE',
          explanation: 'Paragraph 4 describes exactly this experiment.'
        },
        {
          id: 'ac2_q5',
          type: 'tfng',
          question: 'The passage claims that System 2 thinking is always superior to System 1 thinking.',
          answer: 'NOT GIVEN',
          explanation: 'The passage describes System 2 as deliberate and analytical but does not state it is "always superior."'
        },
        {
          id: 'ac2_q6',
          type: 'mcq',
          question: 'What is the "anchoring effect" as described in the passage?',
          options: [
            'The tendency to fear losses more than equivalent gains',
            'The influence of initial information on later judgments',
            'The use of mental shortcuts in decision-making',
            'The tendency to hold losing investments too long'
          ],
          answer: 1,
          explanation: 'Paragraph 4: "initial information serves as a reference point that disproportionately influences subsequent judgments."'
        },
        {
          id: 'ac2_q7',
          type: 'mcq',
          question: 'According to the passage, what are "nudges" in public policy?',
          options: [
            'Laws that force people to make better choices',
            'Financial incentives for healthy behaviour',
            'Subtle changes in how choices are presented',
            'Educational programmes about cognitive biases'
          ],
          answer: 2,
          explanation: 'Paragraph 6: "subtle changes in how choices are presented that guide people toward better decisions."'
        },
        {
          id: 'ac2_q8',
          type: 'mcq',
          question: 'Which of the following best describes System 1 thinking?',
          options: [
            'Slow, deliberate, and analytical',
            'Fast, automatic, and intuitive',
            'Conscious, rational, and objective',
            'Slow, biased, and emotional'
          ],
          answer: 1,
          explanation: 'Paragraph 5: "System 1 thinking is fast, automatic, and intuitive."'
        },
        {
          id: 'ac2_q9',
          type: 'mcq',
          question: 'The "disposition effect" in finance refers to:',
          options: [
            'Selling winning stocks too late',
            'Buying stocks during market bubbles',
            'Holding losing stocks too long and selling winners too quickly',
            'Refusing to invest in volatile markets'
          ],
          answer: 2,
          explanation: 'Paragraph 6: "investors hold losing stocks too long and sell winning ones too quickly."'
        },
        {
          id: 'ac2_q10',
          type: 'mcq',
          question: 'What was the main weakness of rational choice theory, according to the passage?',
          options: [
            'It was too mathematically complex for practical use.',
            'It failed to account for systematic errors in human judgment.',
            'It ignored financial factors in decision-making.',
            'It was only applicable to economic contexts.'
          ],
          answer: 1,
          explanation: 'The passage describes how experiments revealed "systematic patterns in human judgment that deviated markedly from rational predictions."'
        }
      ]
    },

    // ─── ACADEMIC 3 ───────────────────────────────────────
    {
      id: 'ac3',
      type: 'academic',
      title: 'Urban Heat Islands: Causes and Mitigation',
      topic: 'Urban Planning & Environment',
      level: 'Band 7–8',
      timeLimit: 20,
      wordCount: 580,
      text: `Cities are measurably warmer than the surrounding rural and suburban areas — a phenomenon known as the urban heat island (UHI) effect. In major metropolitan areas, this temperature difference can exceed 10°C on clear, calm nights, with significant consequences for energy consumption, air quality, human health, and climate adaptation strategies.

The UHI effect arises from several interconnected factors. First, the physical characteristics of urban surfaces play a critical role. Conventional building materials such as asphalt, concrete, and dark roofing absorb solar radiation more effectively than natural surfaces, releasing stored heat slowly throughout the night. In contrast, vegetated surfaces reflect more sunlight and cool the air through evapotranspiration — the combined process of water evaporation and plant transpiration. Second, the three-dimensional structure of cities, with closely spaced tall buildings creating street canyons, traps longwave radiation that would otherwise escape into the atmosphere. Third, urban areas generate substantial anthropogenic heat from vehicles, air conditioning units, industrial processes, and human metabolism — sources absent in rural environments.

Researchers have also found that impervious surfaces — pavements and rooftops that prevent rainwater infiltration — exacerbate the UHI effect. Because water cannot penetrate these surfaces, less of it is available for evaporation, reducing a natural cooling mechanism. This is compounded by the reduced vegetation cover typical of dense urban areas, which limits the cooling effects of shade and evapotranspiration.

Numerous cities are now implementing strategies to counteract the UHI effect. Green roofs — rooftop gardens covered with vegetation — reduce surface temperatures and provide insulation. Cool roofs, coated with highly reflective materials, diminish heat absorption. Urban tree canopies are being expanded in many cities, as trees provide shade, reduce wind speed, and release water vapour. Permeable pavements allow water to infiltrate the ground, enhancing evaporative cooling.

Beyond individual interventions, urban planners are rethinking city design at a broader scale. Singapore's "City in a Garden" initiative integrates green spaces throughout the built environment, combining parks, green corridors, and vegetation on building facades. Melbourne's Urban Forest Strategy aims to double the city's tree canopy by 2040. Research from Phoenix, Arizona — one of the most extreme UHI environments in the world — has demonstrated that strategically placed trees can reduce pavement temperatures by up to 36°C.

The economic case for UHI mitigation is strong. Reduced air conditioning demand during heat events lowers both energy costs and carbon emissions. Urban greenery has been shown to reduce storm water runoff costs and increase property values. Moreover, as climate change is projected to intensify extreme heat events, proactive investment in UHI mitigation represents a cost-effective adaptation strategy for cities worldwide.`,
      questions: [
        {
          id: 'ac3_q1',
          type: 'tfng',
          question: 'In major cities, the UHI effect can cause temperatures to be more than 10°C higher than surrounding areas.',
          answer: 'TRUE',
          explanation: 'Paragraph 1: "this temperature difference can exceed 10°C on clear, calm nights."'
        },
        {
          id: 'ac3_q2',
          type: 'tfng',
          question: 'Vegetated surfaces absorb more solar radiation than urban materials such as asphalt.',
          answer: 'FALSE',
          explanation: 'The passage states vegetated surfaces "reflect more sunlight" — the opposite of absorbing more radiation.'
        },
        {
          id: 'ac3_q3',
          type: 'tfng',
          question: 'The passage states that Melbourne plans to increase its tree canopy coverage by 2040.',
          answer: 'TRUE',
          explanation: 'Paragraph 5: "Melbourne\'s Urban Forest Strategy aims to double the city\'s tree canopy by 2040."'
        },
        {
          id: 'ac3_q4',
          type: 'tfng',
          question: 'Research in Phoenix found that trees can lower pavement temperatures by at least 30°C.',
          answer: 'TRUE',
          explanation: 'Paragraph 5 states trees can reduce pavement temperatures "by up to 36°C."'
        },
        {
          id: 'ac3_q5',
          type: 'tfng',
          question: 'The passage argues that climate change will reduce the need for UHI mitigation strategies.',
          answer: 'FALSE',
          explanation: 'The passage argues the opposite — climate change will intensify extreme heat, making UHI mitigation more important.'
        },
        {
          id: 'ac3_q6',
          type: 'mcq',
          question: 'What is "evapotranspiration" as used in the passage?',
          options: [
            'The absorption of solar radiation by concrete surfaces',
            'The combined process of water evaporation and plant transpiration',
            'The trapping of longwave radiation in street canyons',
            'A type of permeable pavement technology'
          ],
          answer: 1,
          explanation: 'Paragraph 2: "evapotranspiration — the combined process of water evaporation and plant transpiration."'
        },
        {
          id: 'ac3_q7',
          type: 'mcq',
          question: 'According to the passage, what is an advantage of "cool roofs"?',
          options: [
            'They absorb rainwater to enhance evaporative cooling.',
            'They provide insulation by supporting plant growth.',
            'They diminish heat absorption through reflective coatings.',
            'They release water vapour to cool surrounding air.'
          ],
          answer: 2,
          explanation: 'Paragraph 4: "Cool roofs, coated with highly reflective materials, diminish heat absorption."'
        },
        {
          id: 'ac3_q8',
          type: 'mcq',
          question: 'Why do impervious surfaces worsen the UHI effect?',
          options: [
            'They generate anthropogenic heat from vehicles.',
            'They prevent rainwater infiltration, reducing evaporative cooling.',
            'They create street canyons that trap longwave radiation.',
            'They reflect sunlight back into the urban atmosphere.'
          ],
          answer: 1,
          explanation: 'Paragraph 3: impervious surfaces "prevent rainwater infiltration" so less water is available for evaporation.'
        },
        {
          id: 'ac3_q9',
          type: 'mcq',
          question: 'What economic benefit of UHI mitigation is mentioned in the final paragraph?',
          options: [
            'Increased tourism to greener cities',
            'Higher government tax revenues from property values',
            'Reduced energy costs and carbon emissions during heat events',
            'Lower costs of constructing green infrastructure'
          ],
          answer: 2,
          explanation: 'Paragraph 6: "Reduced air conditioning demand during heat events lowers both energy costs and carbon emissions."'
        },
        {
          id: 'ac3_q10',
          type: 'match_heading',
          question: 'Which paragraph focuses primarily on the role of water in the UHI effect?',
          options: ['Paragraph 2', 'Paragraph 3', 'Paragraph 4', 'Paragraph 5'],
          answer: 1,
          explanation: 'Paragraph 3 discusses how impervious surfaces prevent water infiltration, reducing natural cooling through evaporation.'
        }
      ]
    },

    // ─── ACADEMIC 4 ───────────────────────────────────────
    {
      id: 'ac4',
      type: 'academic',
      title: 'The History and Science of Fermentation',
      topic: 'Food Science & History',
      level: 'Band 6',
      timeLimit: 20,
      wordCount: 600,
      text: `Fermentation is one of the oldest food technologies known to humanity. Evidence from ancient China, the Middle East, and sub-Saharan Africa suggests that humans have been deliberately fermenting foods and beverages for at least 10,000 years. Long before people understood the microbial processes involved, they had developed sophisticated techniques for producing bread, beer, wine, cheese, yoghurt, and a wide variety of preserved foods through controlled fermentation.

At its core, fermentation is a metabolic process in which microorganisms — primarily bacteria, yeasts, and moulds — convert sugars and starches into alcohol, carbon dioxide, and organic acids. In anaerobic fermentation, this occurs in the absence of oxygen. Yeasts, for example, break down glucose through a process called glycolysis to produce ethanol and CO₂, which is why bread rises and beer and wine contain alcohol. Lactic acid bacteria, by contrast, convert sugars into lactic acid, acidifying the environment — a process that both preserves food and creates distinctive flavours in products such as yoghurt, kimchi, and sourdough bread.

The scientific understanding of fermentation was transformed in the nineteenth century by the work of French chemist Louis Pasteur. Before Pasteur, many scientists believed in spontaneous generation — the idea that life could arise from non-living matter. Pasteur's meticulous experiments demonstrated conclusively that fermentation was caused by living microorganisms, not by chemical reactions alone. This insight laid the groundwork for germ theory and revolutionised both medicine and the food industry.

In contemporary food science, fermentation has experienced a significant revival of interest. Traditionally fermented foods have been associated with numerous health benefits. The lactic acid bacteria present in fermented products such as kefir, kombucha, and kimchi are considered probiotics — beneficial microorganisms that may support gut health by promoting a diverse and balanced intestinal microbiome. While research in this area is ongoing and some claims remain contested, epidemiological studies have suggested associations between fermented food consumption and reduced risk of certain inflammatory and metabolic conditions.

Beyond nutrition, fermentation is increasingly valued in industrial biotechnology. Microorganisms can be engineered to produce pharmaceuticals, biofuels, and biodegradable plastics through fermentation-based processes. Insulin, for instance, is now manufactured by genetically modified bacteria using fermentation. The convergence of traditional fermentation knowledge with modern biotechnology represents one of the most promising frontiers in sustainable industrial production.

Fermentation also has significant cultural dimensions. Many fermented foods are deeply embedded in regional identities — from Japan's miso and natto to Ethiopia's injera and Germany's sauerkraut. As globalisation homogenises food cultures, there is growing interest in preserving traditional fermentation knowledge, which often includes microbial strains and techniques developed over generations that are not found in commercial products.`,
      questions: [
        {
          id: 'ac4_q1',
          type: 'tfng',
          question: 'Humans have been deliberately fermenting foods for approximately 10,000 years.',
          answer: 'TRUE',
          explanation: 'Paragraph 1: "humans have been deliberately fermenting foods and beverages for at least 10,000 years."'
        },
        {
          id: 'ac4_q2',
          type: 'tfng',
          question: 'Ancient civilisations fully understood the microbial processes behind fermentation.',
          answer: 'FALSE',
          explanation: 'Paragraph 1 states they developed techniques "Long before people understood the microbial processes involved."'
        },
        {
          id: 'ac4_q3',
          type: 'tfng',
          question: 'Lactic acid bacteria produce ethanol as their main fermentation product.',
          answer: 'FALSE',
          explanation: 'Lactic acid bacteria produce lactic acid, not ethanol. Ethanol is produced by yeasts.'
        },
        {
          id: 'ac4_q4',
          type: 'tfng',
          question: 'Louis Pasteur demonstrated that fermentation is caused by living microorganisms.',
          answer: 'TRUE',
          explanation: 'Paragraph 3: "Pasteur\'s meticulous experiments demonstrated conclusively that fermentation was caused by living microorganisms."'
        },
        {
          id: 'ac4_q5',
          type: 'tfng',
          question: 'All health benefits of probiotic fermented foods have been scientifically confirmed.',
          answer: 'FALSE',
          explanation: 'Paragraph 4 states: "research in this area is ongoing and some claims remain contested."'
        },
        {
          id: 'ac4_q6',
          type: 'mcq',
          question: 'What does "anaerobic fermentation" mean?',
          options: [
            'Fermentation involving multiple microorganism species',
            'Fermentation that occurs in the absence of oxygen',
            'Fermentation that requires high temperatures',
            'Fermentation that produces only lactic acid'
          ],
          answer: 1,
          explanation: 'Paragraph 2: "In anaerobic fermentation, this occurs in the absence of oxygen."'
        },
        {
          id: 'ac4_q7',
          type: 'mcq',
          question: 'According to the passage, what did spontaneous generation theory claim?',
          options: [
            'Fermentation required living microorganisms to occur.',
            'Life could arise from non-living matter.',
            'Microorganisms could evolve into more complex organisms.',
            'Chemical reactions were insufficient to cause fermentation.'
          ],
          answer: 1,
          explanation: 'Paragraph 3: spontaneous generation was "the idea that life could arise from non-living matter."'
        },
        {
          id: 'ac4_q8',
          type: 'mcq',
          question: 'What is one industrial application of fermentation mentioned in the passage?',
          options: [
            'Production of solar energy',
            'Synthesis of natural flavourings',
            'Manufacture of insulin using genetically modified bacteria',
            'Development of new food preservation techniques'
          ],
          answer: 2,
          explanation: 'Paragraph 5: "Insulin, for instance, is now manufactured by genetically modified bacteria using fermentation."'
        },
        {
          id: 'ac4_q9',
          type: 'mcq',
          question: 'Why is traditional fermentation knowledge considered worth preserving?',
          options: [
            'It is more economically efficient than industrial fermentation.',
            'It includes unique microbial strains and techniques not found in commercial products.',
            'It produces foods with higher nutritional value than modern equivalents.',
            'It is required by international food safety regulations.'
          ],
          answer: 1,
          explanation: 'Paragraph 6 mentions unique microbial strains and techniques "developed over generations that are not found in commercial products."'
        },
        {
          id: 'ac4_q10',
          type: 'match_heading',
          question: 'Which paragraph discusses fermentation\'s potential health benefits for gut health?',
          options: ['Paragraph 3', 'Paragraph 4', 'Paragraph 5', 'Paragraph 6'],
          answer: 1,
          explanation: 'Paragraph 4 discusses probiotics, gut health, and health benefits of fermented foods.'
        }
      ]
    },

    // ─── GENERAL TRAINING 1 ───────────────────────────────
    {
      id: 'gt1',
      type: 'general',
      title: 'Community Garden Membership Guide',
      topic: 'Community & Local Information',
      level: 'Band 5–6',
      timeLimit: 15,
      wordCount: 420,
      text: `RIVERSIDE COMMUNITY GARDEN — MEMBERSHIP GUIDE 2025

Welcome to the Riverside Community Garden! Our garden is a shared green space managed by its members and supported by the Riverside Borough Council. This guide explains how to join, what to expect, and the rules that keep our community garden a pleasant environment for everyone.

MEMBERSHIP TIERS

Standard Plot Membership (£45/year): Access to your own 10m² growing plot, use of communal tools and water points, and attendance at monthly workshops. Members are expected to tend their plots at least twice per month.

Family Plot Membership (£65/year): A larger 20m² plot suitable for families. All benefits of Standard Membership, plus two additional guest passes per month. Up to four family members may register under one account.

Community Volunteer Membership (Free): No personal plot, but full access to the communal growing areas, tools, and workshops in exchange for a minimum four hours of communal work per month. This option is ideal for those interested in gardening without the commitment of a private plot.

REGISTRATION PROCESS

To register, complete the online application form at riversidegarden.co.uk/join. You will need to provide proof of address confirming your Riverside Borough residency. Non-residents may apply for the waiting list; spaces are allocated to residents first.

Payment can be made by direct debit, bank transfer, or at the garden office on Saturday mornings between 9 am and 12 pm. Cash payments are only accepted at the garden office. Once payment is confirmed, you will receive your membership card and plot allocation within five working days.

GARDEN RULES

The following rules apply to all members:

- No pesticides or synthetic fertilisers are permitted. Only organic growing methods are allowed.
- Plots must be kept tidy. If a plot is left unattended for more than four weeks without notice, the membership coordinator may reassign it.
- The garden is open daily from 7 am to 8 pm in summer and 8 am to 5 pm in winter. Gates are locked outside these hours.
- Dogs are not permitted in the main growing area, but may be brought to the social area near the entrance on a lead.
- All waste must be placed in the appropriate composting or recycling bins.

COMMUNITY EVENTS

The garden hosts a monthly Open Day on the first Sunday of each month, when non-members may visit and explore. There is also an annual Summer Fair in July, which raises funds for tool replacement and infrastructure improvements. Members are encouraged to participate in planning these events through the Member Forum, held on the third Thursday of each month.`,
      questions: [
        {
          id: 'gt1_q1',
          type: 'tfng',
          question: 'The annual cost of a Standard Plot Membership is £45.',
          answer: 'TRUE',
          explanation: 'The guide clearly states Standard Plot Membership is £45/year.'
        },
        {
          id: 'gt1_q2',
          type: 'tfng',
          question: 'Family Plot Membership allows up to six family members per account.',
          answer: 'FALSE',
          explanation: 'The guide states "Up to four family members may register under one account."'
        },
        {
          id: 'gt1_q3',
          type: 'tfng',
          question: 'Community Volunteer Members are given access to a small personal plot.',
          answer: 'FALSE',
          explanation: 'Community Volunteer Membership provides "No personal plot" — only communal growing areas.'
        },
        {
          id: 'gt1_q4',
          type: 'tfng',
          question: 'Non-residents of Riverside Borough can still apply for garden membership.',
          answer: 'TRUE',
          explanation: 'Non-residents "may apply for the waiting list" though residents are given priority.'
        },
        {
          id: 'gt1_q5',
          type: 'tfng',
          question: 'Cash payments for membership can be made at the garden office on any weekday.',
          answer: 'FALSE',
          explanation: 'Cash payments are "only accepted at the garden office" on "Saturday mornings between 9 am and 12 pm."'
        },
        {
          id: 'gt1_q6',
          type: 'mcq',
          question: 'What happens to a plot left unattended for more than four weeks without notice?',
          options: [
            'The member is fined £20.',
            'The membership is automatically cancelled.',
            'The coordinator may reassign the plot.',
            'The member is placed on a warning list.'
          ],
          answer: 2,
          explanation: 'The rules state: "the membership coordinator may reassign it."'
        },
        {
          id: 'gt1_q7',
          type: 'mcq',
          question: 'When can non-members visit the garden?',
          options: [
            'On the third Thursday of each month',
            'On the first Sunday of each month',
            'During the annual Summer Fair in July only',
            'Every Saturday morning'
          ],
          answer: 1,
          explanation: 'The guide mentions "Open Day on the first Sunday of each month, when non-members may visit."'
        },
        {
          id: 'gt1_q8',
          type: 'mcq',
          question: 'What is the minimum commitment required for Community Volunteer Membership?',
          options: [
            'Attending two workshops per month',
            'Tending a communal plot twice per week',
            'Four hours of communal work per month',
            'Attending the monthly Member Forum'
          ],
          answer: 2,
          explanation: 'Community Volunteer Membership requires "a minimum four hours of communal work per month."'
        },
        {
          id: 'gt1_q9',
          type: 'mcq',
          question: 'What type of gardening methods are required at Riverside Community Garden?',
          options: [
            'Any method approved by the Borough Council',
            'Only organic growing methods',
            'Methods that minimise water usage',
            'Hydroponics and container growing only'
          ],
          answer: 1,
          explanation: 'Rules state: "No pesticides or synthetic fertilisers are permitted. Only organic growing methods are allowed."'
        },
        {
          id: 'gt1_q10',
          type: 'tfng',
          question: 'The Summer Fair proceeds are used to fund community social events.',
          answer: 'FALSE',
          explanation: 'The Summer Fair "raises funds for tool replacement and infrastructure improvements," not social events.'
        }
      ]
    },

    // ─── GENERAL TRAINING 2 ───────────────────────────────
    {
      id: 'gt2',
      type: 'general',
      title: 'Returning to Work After a Career Break',
      topic: 'Employment & Career',
      level: 'Band 5–6',
      timeLimit: 15,
      wordCount: 480,
      text: `Returning to employment after a significant career break can feel daunting, but with the right preparation, it can also be a positive new chapter. Whether you have taken time out for caring responsibilities, health reasons, further study, or personal reasons, employers are increasingly recognising the value of candidates who bring diverse life experience to the workplace.

UPDATING YOUR SKILLS

Before beginning your job search, assess which of your skills are transferable and which may need refreshing. Many professional fields have changed substantially in recent years, particularly in areas such as digital tools, compliance requirements, and communication platforms. Free and low-cost online courses are available through providers such as Coursera, LinkedIn Learning, and the Open University. Your local Jobcentre Plus or career support service can also provide guidance on funded retraining programmes.

Consider gaining practical experience to bridge any gaps. Volunteering with organisations in your target sector can help you rebuild confidence, update your CV, and demonstrate recent relevant activity to prospective employers.

PREPARING YOUR APPLICATION

When addressing your career break in application materials, be straightforward and confident. You do not need to apologise for time away from work. Focus on what you gained during your break — new perspectives, skills acquired, or responsibilities managed — and how these strengthen your candidacy.

Your CV should be clearly structured and honest. Avoid unexplained gaps, but there is no need to elaborate extensively. A brief line such as "Career break — caring for a family member (2022–2024)" is entirely acceptable. If you have completed any courses, volunteering, or freelance work during the break, include these in the relevant sections of your CV.

INTERVIEWS

Career break candidates often underestimate the strength of their position in interviews. Hiring managers increasingly value maturity, resilience, and the ability to manage complex, non-work challenges. Prepare specific examples of skills demonstrated during your break using the STAR method (Situation, Task, Action, Result).

Research the company thoroughly before your interview. Demonstrating knowledge of the organisation's recent activities and strategic direction shows genuine interest and helps offset any concerns an employer might have about your time away from the sector.

SUPPORT AVAILABLE

Several organisations in the UK specifically support career returners. Programmes such as Return to Work schemes offered by large employers provide structured re-entry with mentoring and flexible working arrangements. The charity Working Families provides advice and resources for parents and carers returning to employment. Many local councils also fund Return to Work advisers who offer one-to-one guidance free of charge.

Taking time to plan your return strategically — rather than rushing into the first available role — is likely to result in a more satisfying and sustainable career transition.`,
      questions: [
        {
          id: 'gt2_q1',
          type: 'tfng',
          question: 'The passage suggests that employers now recognise value in candidates with diverse life experience.',
          answer: 'TRUE',
          explanation: 'Paragraph 1: "employers are increasingly recognising the value of candidates who bring diverse life experience."'
        },
        {
          id: 'gt2_q2',
          type: 'tfng',
          question: 'LinkedIn Learning and Coursera are described as expensive retraining options.',
          answer: 'FALSE',
          explanation: 'The passage describes them as "Free and low-cost online courses."'
        },
        {
          id: 'gt2_q3',
          type: 'tfng',
          question: 'The passage advises candidates to apologise for their career break in application materials.',
          answer: 'FALSE',
          explanation: 'The passage explicitly states: "You do not need to apologise for time away from work."'
        },
        {
          id: 'gt2_q4',
          type: 'tfng',
          question: 'The STAR method is recommended for preparing interview responses.',
          answer: 'TRUE',
          explanation: 'The interview section recommends "the STAR method (Situation, Task, Action, Result)."'
        },
        {
          id: 'gt2_q5',
          type: 'tfng',
          question: 'All career returner support programmes in the UK are provided by government agencies.',
          answer: 'NOT GIVEN',
          explanation: 'The passage mentions employers, charities, and councils — it doesn\'t state all support comes from government agencies.'
        },
        {
          id: 'gt2_q6',
          type: 'mcq',
          question: 'Why does the passage recommend volunteering during a career break?',
          options: [
            'To earn income while looking for paid work',
            'To rebuild confidence, update the CV, and show recent activity',
            'To gain academic qualifications',
            'To meet legal employment requirements'
          ],
          answer: 1,
          explanation: '"Volunteering... can help you rebuild confidence, update your CV, and demonstrate recent relevant activity."'
        },
        {
          id: 'gt2_q7',
          type: 'mcq',
          question: 'How should a career break be presented in a CV, according to the passage?',
          options: [
            'It should be omitted entirely to avoid drawing attention.',
            'With a brief, honest explanation with no need to elaborate extensively.',
            'With a detailed explanation of all personal circumstances.',
            'In a separate cover letter only, not in the CV itself.'
          ],
          answer: 1,
          explanation: 'The passage advises: "Avoid unexplained gaps, but there is no need to elaborate extensively."'
        },
        {
          id: 'gt2_q8',
          type: 'mcq',
          question: 'What does "Working Families" do, according to the passage?',
          options: [
            'Provides structured re-entry programmes with mentoring',
            'Offers one-to-one guidance funded by local councils',
            'Provides advice and resources for parents and carers returning to work',
            'Runs government-funded retraining courses'
          ],
          answer: 2,
          explanation: '"The charity Working Families provides advice and resources for parents and carers returning to employment."'
        },
        {
          id: 'gt2_q9',
          type: 'mcq',
          question: 'What does the passage say about the qualities career break candidates bring to interviews?',
          options: [
            'They typically lack the technical skills required for modern roles.',
            'They often underestimate their strength and bring maturity and resilience.',
            'They are usually less prepared than candidates without career gaps.',
            'They find it harder to demonstrate relevant experience.'
          ],
          answer: 1,
          explanation: '"Career break candidates often underestimate the strength of their position... Hiring managers increasingly value maturity, resilience."'
        },
        {
          id: 'gt2_q10',
          type: 'tfng',
          question: 'The passage recommends accepting the first available job offer to avoid prolonged unemployment.',
          answer: 'FALSE',
          explanation: 'The passage says "Taking time to plan your return strategically — rather than rushing into the first available role — is likely to result in a more satisfying... transition."'
        }
      ]
    }
  ];

  return {
    getAll() { return passages; },
    getById(id) { return passages.find(p => p.id === id) || null; },
    getAcademic() { return passages.filter(p => p.type === 'academic'); },
    getGeneral() { return passages.filter(p => p.type === 'general'); }
  };

})();
