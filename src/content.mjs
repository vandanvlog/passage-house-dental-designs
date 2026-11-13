// Single source of truth for all four designs.
// Facts (address, hours, team, prices, policies) come from passagehousedental.co.uk.
// Descriptive copy is written fresh and kept deliberately general - confirm with the practice before launch.

export const practice = {
  name: 'Passage House Dental Care',
  short: 'Passage House',
  tagline: 'Modern dentistry for all',
  phone: '0117 950 3141',
  phoneHref: 'tel:01179503141',
  email: 'info@passagehousedental.co.uk',
  address: ['227 Passage Road', 'Henbury', 'Bristol', 'BS10 7DL'],
  map: 'https://www.google.com/maps/search/?api=1&query=Passage+House+Dental+Care+227+Passage+Road+Henbury+Bristol+BS10+7DL',
  mapEmbed: 'https://www.google.com/maps?q=227+Passage+Road+Henbury+Bristol+BS10+7DL&output=embed',
  liveSite: 'https://passagehousedental.co.uk/',
  out247: { name: 'The 247dentist', phone: '03301 759 995' },
  planFrom: '£2.30',
};

// day index = JS getDay(): 0 Sun ... 6 Sat
export const hours = [
  { d: 'Monday', s: '08:30', e: '17:30' },
  { d: 'Tuesday', s: '08:30', e: '18:30' },
  { d: 'Wednesday', s: '08:30', e: '17:00' },
  { d: 'Thursday', s: '08:00', e: '17:30' },
  { d: 'Friday', s: '08:00', e: '16:00' },
  { d: 'Saturday', s: null, e: null },
  { d: 'Sunday', s: null, e: null },
];

export const team = {
  managers: [
    { name: 'Jasmin Thoria', role: 'Registered Manager', gdc: '180520' },
    { name: 'Kudipsinh Gohil', role: 'Registered Manager', gdc: '150472' },
    { name: 'Jo Hall', role: 'Practice Manager' },
  ],
  dentists: [
    { name: 'Dr Brad Hall', role: 'Dentist', note: 'Special interest in dental implants' },
    { name: 'Dr Alex McCullagh', role: 'Dentist' },
    { name: 'Dr Adam Gardiner', role: 'Dentist' },
    { name: 'Dr Annabel Lee', role: 'Dentist', note: 'Joined the team recently' },
    { name: 'Dr Philippa Harris', role: 'Dentist' },
    { name: 'Dr Olivia Phelps', role: 'Dentist' },
    { name: 'Dr Janet Wewe', role: 'Dentist' },
    { name: 'Dr Gabriella Robson', role: 'Dentist' },
  ],
  specialists: [
    { name: 'Dr Ben Cross', role: 'Specialist Orthodontist', note: 'Treats children and adults' },
    { name: 'Mercedez Francis', role: 'Dental Hygienist' },
  ],
  nurses: ['Jess', 'Clair', 'Cat', 'Aneta', 'Karen', 'Azi', 'Jenny'],
  reception: ['Alison', 'Lorraine', 'Claire', 'Sue'],
  support: ['Jan (practice cleaner)'],
};

// ---- Private fee guide (as listed on the live site, "2024 prices") ----
export const fees = [
  { group: 'Check-ups & X-rays', rows: [
    ['New patient oral health examination (incl. 2 radiographs)', '£85'],
    ['Regular patient oral health examination (no scaling)', '£50'],
    ['Small X-ray (each)', '£15'],
    ['Pan-oral X-ray (OPG)', '£75'],
    ['CBCT (3D scan)', '£200'],
  ]},
  { group: 'Hygienist', rows: [
    ['Up to 20 minutes', '£60'],
    ['Up to 30 minutes', '£75'],
    ['Initial direct access appointment, up to 40 minutes', '£95'],
  ]},
  { group: 'Fillings & root canal', rows: [
    ['White fillings', 'from £90'],
    ['Root canal - canine / incisor', 'from £395'],
    ['Root canal - premolar', 'from £485'],
    ['Root canal - molar', 'from £625'],
  ]},
  { group: 'Extractions', rows: [
    ['Simple / planned', 'from £140'],
    ['Complex / surgical', 'from £225'],
    ['Multiple extractions or very loose teeth', 'Time-based'],
  ]},
  { group: 'Crowns, bridges & veneers', rows: [
    ['Crowns (type and material dependent)', 'from £600'],
    ['Bridges, per unit (type and material dependent)', 'from £660'],
    ['Porcelain / ceramic veneers', 'from £600'],
    ['Composite veneers', 'from £300'],
  ]},
  { group: 'Dentures (per arch)', rows: [
    ['Acrylic - full or partial, upper or lower', 'from £750'],
    ['Chrome cobalt - full or partial, upper or lower', 'from £1,200'],
  ]},
  { group: 'Whitening & protection', rows: [
    ['Teeth whitening (dentist instruction, advice and home whitening)', '£350'],
    ['Sports gum shield', 'from £90'],
  ]},
  { group: 'Dental implants', rows: [
    ['Single tooth (implant, crown and radiographs)', 'from £2,650'],
    ['Multiple teeth, bridgework or overdentures', 'Priced per case'],
  ]},
  { group: 'Orthodontics - child (private)', rows: [
    ['Metal brackets, upper and lower, incl. retainer', '£3,000'],
    ['Ceramic brackets, upper and lower, incl. retainer', '£3,500'],
    ['Specialist-led Invisalign, upper and lower, incl. retainer', '£4,000'],
  ]},
  { group: 'Orthodontics - adult (private)', rows: [
    ['Full assessment', '£100'],
    ['Metal brackets, upper and lower, incl. retainer', '£3,500'],
    ['Ceramic brackets, upper and lower, incl. retainer', '£4,000'],
    ['Specialist-led Invisalign, upper and lower, incl. retainer', '£4,500'],
  ]},
];
const feeRows = (g) => fees.find((f) => f.group === g)?.rows || null;

// ---- Treatments ----
export const treatments = [
  {
    slug: 'dental-implants', name: 'Dental Implants', group: 'Replace', icon: 'tooth', feature: true,
    short: 'Permanent, natural-looking replacements for missing teeth, led by Dr Brad Hall.',
    lead: 'A dental implant replaces the root of a missing tooth, so a crown, bridge or denture can be held firmly in place. Dr Brad Hall has a special interest in implant dentistry and works with patients across Bristol, whether registered with us or referred by their own dentist.',
    intro: [
      'Implants are small titanium posts placed into the jaw. Over a few months they bond with the bone, creating a stable foundation that feels and functions like a natural tooth root.',
      'Treatment begins with a thorough consultation and, where needed, 3D imaging (CBCT) so the plan is based on your bone, gums and bite rather than guesswork.',
    ],
    highlights: [
      { h: 'Looks and feels natural', p: 'Crowns are shaped and shaded to blend with your own teeth.' },
      { h: 'Protects your jaw', p: 'An implant helps keep the bone around a missing tooth supported.' },
      { h: 'Built to last', p: 'With good home care and regular check-ups, implants can serve for many years.' },
      { h: 'Flexible options', p: 'Single teeth, bridgework or implant-retained dentures, planned per case.' },
    ],
    steps: [
      { h: 'Consultation & planning', p: 'We assess your mouth, discuss options and costs, and take any scans needed.' },
      { h: 'Implant placement', p: 'The implant is placed carefully under local anaesthetic, with sedation or extra support discussed if you are nervous.' },
      { h: 'Healing', p: 'The implant integrates with the bone over several months while we monitor progress.' },
      { h: 'Final restoration', p: 'Your custom crown, bridge or denture is fitted and checked for comfort and bite.' },
    ],
    faqs: [
      ['Does getting an implant hurt?', 'Placement is carried out under local anaesthetic. Most people describe the aftercare as manageable with simple pain relief, and we will talk you through what to expect.'],
      ['Am I suitable for an implant?', 'Many adults are, but healthy gums and enough supporting bone matter. Your consultation will tell us whether implants are right for you or whether another option fits better.'],
      ['Can I spread the cost?', 'Yes. We offer a 0% finance plan, subject to status, and our Dental Plan members receive 10% off many treatments.'],
      ['Do I need to be a patient to have implants?', 'No. You can contact us directly or be referred by your own dentist.'],
    ],
    price: { title: 'Implant fees', rows: feeRows('Dental implants'), note: 'Guide prices from our private fee guide - your exact plan is confirmed at consultation.' },
  },
  {
    slug: 'orthodontics', name: 'Orthodontics', group: 'Straighten', icon: 'smile', feature: true,
    short: 'Braces and clear aligners for children and adults, with specialist Dr Ben Cross.',
    lead: 'Straighter teeth are easier to clean, more comfortable to bite with, and often a real confidence boost. Specialist orthodontist Dr Ben Cross treats both children and adults at the practice.',
    intro: [
      'Options include traditional metal braces, tooth-coloured (ceramic) braces, specialist-led Invisalign, and for some adults fixed braces on the back of the teeth or shorter-term systems such as Six Month Smiles, subject to suitability.',
      'Children are usually assessed around age 12, once most adult teeth have come through, although the right time depends on tooth count and jaw growth. Adults can be treated at any age with good oral hygiene. Treatment commonly takes 18 to 24 months.',
    ],
    highlights: [
      { h: 'Specialist-led', p: 'Treatment planned and overseen by a specialist orthodontist.' },
      { h: 'All ages', p: 'Teenage and adult treatment, with options to suit lifestyle and goals.' },
      { h: 'Discreet choices', p: 'Ceramic brackets and clear aligner options for a lower-profile smile.' },
      { h: 'NHS where eligible', p: 'NHS orthodontics is available for under-18s with a clear health need.' },
    ],
    steps: [
      { h: 'Assessment', p: 'A full assessment to understand your bite, teeth and goals.' },
      { h: 'Your plan', p: 'We explain the options, timescales and costs - and whether NHS treatment applies.' },
      { h: 'Active treatment', p: 'Regular adjustment visits move teeth gradually into position.' },
      { h: 'Retention', p: 'Retainers help keep your new smile exactly where you want it.' },
    ],
    faqs: [
      ['Is NHS orthodontic treatment available?', 'For patients under 18 with a clear health need, yes. Adult NHS orthodontics is generally not available but may be considered for health reasons.'],
      ['How long does treatment take?', 'Typically 18 to 24 months, depending on how complex the case is.'],
      ['Can adults have braces?', 'Absolutely. Adult options are a little more limited than for teenagers, and good oral hygiene is essential.'],
    ],
    price: { title: 'Adult orthodontic fees (private)', rows: feeRows('Orthodontics - adult (private)'), note: 'Child private fees and NHS eligibility are explained at assessment.' },
  },
  {
    slug: 'hygienist', name: 'Hygienist', group: 'Prevent', icon: 'sparkle',
    short: 'Professional cleaning and gum care with our hygienist Mercedez Francis.',
    lead: 'Gum disease is one of the most common reasons adults lose teeth, and it is largely preventable. Our hygienist, Mercedez Francis, helps keep your gums healthy and your smile fresh.',
    intro: [
      'A hygiene visit removes plaque and hardened tartar that brushing cannot reach, polishes away surface staining and gives personalised advice on brushing, interdental cleaning and diet.',
      'You can book a direct access hygiene appointment without seeing a dentist first.',
    ],
    highlights: [
      { h: 'Healthier gums', p: 'Reduces the build-up that leads to bleeding and gum disease.' },
      { h: 'Fresher breath', p: 'Removing plaque and tartar helps tackle common causes of bad breath.' },
      { h: 'Brighter smile', p: 'A polish lifts everyday surface staining.' },
      { h: 'Tailored advice', p: 'Practical home-care guidance that fits your mouth.' },
    ],
    steps: [
      { h: 'Gum check', p: 'We measure and record the health of your gums.' },
      { h: 'Scale & polish', p: 'Gentle cleaning removes plaque, tartar and stains.' },
      { h: 'Home-care plan', p: 'You leave with clear, simple advice and a recommended recall interval.' },
    ],
    faqs: [
      ['How often should I see the hygienist?', 'It depends on your gum health - commonly every three to twelve months. We will recommend an interval for you.'],
      ['Do I need a dentist referral?', 'No. Direct access appointments are available.'],
    ],
    price: { title: 'Hygienist fees', rows: feeRows('Hygienist'), note: 'Plan members can budget for hygiene visits through the practice Dental Plan.' },
  },
  {
    slug: 'smilefast', name: 'SmileFast', group: 'Beautify', icon: 'sparkle',
    short: 'Composite veneers to reshape and brighten your smile, conservatively.',
    lead: 'SmileFast is our composite veneer approach to cosmetic smile improvement: a minimally invasive way to close gaps, reshape edges and brighten teeth.',
    intro: [
      'Composite veneers are sculpted directly from tooth-coloured material, usually with little or no removal of natural tooth. They are a flexible alternative to porcelain veneers where a conservative, more affordable route suits you.',
      'Your dentist will talk through what can realistically be achieved, and how composite compares with porcelain for your goals and budget.',
    ],
    highlights: [
      { h: 'Conservative', p: 'Typically preserves more natural tooth than porcelain options.' },
      { h: 'Natural shade', p: 'Material is matched to your teeth for a seamless finish.' },
      { h: 'Adjustable', p: 'Composite can usually be polished or repaired in the chair.' },
      { h: 'Accessible', p: 'Composite veneers start from £300 in our fee guide.' },
    ],
    steps: [
      { h: 'Smile consultation', p: 'We discuss what you would like to change.' },
      { h: 'Design', p: 'Shape, length and shade are agreed before we begin.' },
      { h: 'Placement', p: 'Composite is built up and polished to a natural finish.' },
    ],
    faqs: [
      ['Composite or porcelain?', 'Composite is quicker and more conservative; porcelain is generally more stain-resistant and long-lasting. We will help you choose.'],
      ['How do I look after them?', 'Brush and clean between teeth as normal, attend regular check-ups, and avoid biting hard objects.'],
    ],
    price: { title: 'Veneer fees', rows: feeRows('Crowns, bridges & veneers')?.filter((r) => /veneer/i.test(r[0])), note: 'Guide prices; confirmed after consultation.' },
  },
  {
    slug: 'cosmetic-dentistry', name: 'Cosmetic Dentistry', group: 'Beautify', icon: 'sparkle',
    short: 'A considered, natural approach to improving the look of your smile.',
    lead: 'Cosmetic dentistry is about subtle, tasteful improvement - a smile that looks like yours, only more confident.',
    intro: [
      'From whitening and white fillings to veneers and crowns, we combine treatments to match your goals, health and budget. Everything starts with a conversation about what you would like to change.',
    ],
    highlights: [
      { h: 'Whitening', p: 'Dentist-supervised home whitening.' },
      { h: 'Veneers', p: 'Composite or porcelain, shaped for you.' },
      { h: 'Tooth-coloured fillings', p: 'Replace or repair with natural-looking material.' },
      { h: 'Crowns & bridges', p: 'Restore strength and appearance.' },
    ],
    steps: [
      { h: 'Talk', p: 'Tell us what you would like to change.' },
      { h: 'Plan', p: 'We map out options, timescales and cost.' },
      { h: 'Treat', p: 'Care is delivered step by step, with your sign-off throughout.' },
    ],
    faqs: [['Is cosmetic treatment available on the NHS?', 'Purely cosmetic treatment is private. Treatment needed for your dental health can often be provided under the NHS.']],
    price: null,
  },
  {
    slug: 'teeth-whitening', name: 'Teeth Whitening', group: 'Beautify', icon: 'sparkle',
    short: 'Safe, dentist-supervised home whitening for a brighter smile.',
    lead: 'Professional whitening is carried out under dental supervision, using custom-made trays and clinical-strength gel so that your gums are protected and results are even.',
    intro: [
      'After a quick check that your teeth and gums are healthy, we take impressions for bespoke trays. You whiten at home at your own pace and we guide you throughout.',
      'Whitening works on natural teeth only - it does not change the shade of crowns, veneers or fillings, which is worth discussing beforehand.',
    ],
    highlights: [
      { h: 'Dentist supervised', p: 'Safer and more controlled than over-the-counter kits.' },
      { h: 'Custom trays', p: 'Fit your teeth precisely, protecting gums.' },
      { h: 'Fixed price', p: '£350 including instruction, advice and home whitening.' },
    ],
    steps: [
      { h: 'Check-up', p: 'We make sure your mouth is healthy first.' },
      { h: 'Trays', p: 'Impressions or scans create trays made for you.' },
      { h: 'Whiten at home', p: 'Follow our simple schedule for a brighter result.' },
    ],
    faqs: [['Will whitening make my teeth sensitive?', 'Some people notice temporary sensitivity. We can adjust the plan and recommend products to keep you comfortable.']],
    price: { title: 'Whitening fee', rows: feeRows('Whitening & protection')?.slice(0, 1), note: 'Guide price.' },
  },
  {
    slug: 'veneers', name: 'Veneers', group: 'Beautify', icon: 'sparkle',
    short: 'Thin porcelain or composite shells to reshape, colour and perfect teeth.',
    lead: 'Veneers are thin shells bonded to the front of teeth to change their shape, shade or alignment - a popular option for chipped, worn, discoloured or gapped teeth.',
    intro: [
      'Porcelain (ceramic) veneers are crafted in a dental laboratory and prized for their natural translucency and stain resistance. Composite veneers are built directly on the tooth in the chair.',
      'We will explain the pros and cons of each, including preparation, longevity and cost, so you can choose with confidence.',
    ],
    highlights: [
      { h: 'Porcelain', p: 'Refined, durable and highly natural-looking.' },
      { h: 'Composite', p: 'A conservative, more affordable alternative.' },
      { h: 'Tailored design', p: 'Shape and shade agreed with you in advance.' },
    ],
    steps: [
      { h: 'Consult', p: 'Discuss goals and review your teeth.' },
      { h: 'Prepare', p: 'Minimal preparation where needed and impressions or scans.' },
      { h: 'Fit', p: 'Veneers are bonded and fine-tuned for comfort and appearance.' },
    ],
    faqs: [['How long do veneers last?', 'It varies with material, bite and home care. Regular check-ups and avoiding habits like nail biting help them last.']],
    price: { title: 'Veneer fees', rows: feeRows('Crowns, bridges & veneers')?.filter((r) => /veneer/i.test(r[0])), note: 'Guide prices; confirmed after consultation.' },
  },
  {
    slug: 'crowns', name: 'Crowns', group: 'Restore', icon: 'tooth',
    short: 'Strong, natural-looking caps that protect and restore damaged teeth.',
    lead: 'A crown is a custom-made cap that fits over a tooth to restore its shape, strength and appearance - ideal for teeth that are heavily filled, cracked, weakened or root-treated.',
    intro: [
      'Crowns can be made from porcelain, ceramic or metal-based materials. Your dentist will recommend the best material for the tooth, your bite and appearance.',
    ],
    highlights: [
      { h: 'Protective', p: 'Holds a weakened tooth together.' },
      { h: 'Natural finish', p: 'Colour-matched to neighbouring teeth.' },
      { h: 'Long-term', p: 'A durable solution with good care.' },
    ],
    steps: [
      { h: 'Prepare', p: 'The tooth is shaped and an impression or scan is taken.' },
      { h: 'Temporary crown', p: 'Worn while your permanent crown is made.' },
      { h: 'Fit', p: 'The final crown is bonded and checked.' },
    ],
    faqs: [['Does it hurt?', 'Treatment is carried out with local anaesthetic, so you should feel comfortable throughout.']],
    price: { title: 'Crown fee', rows: feeRows('Crowns, bridges & veneers')?.slice(0, 1), note: 'Depends on type and material.' },
  },
  {
    slug: 'bridges', name: 'Bridges', group: 'Replace', icon: 'tooth',
    short: 'Fixed replacements that close the gap left by one or more missing teeth.',
    lead: 'A bridge replaces a missing tooth by anchoring a false tooth to the teeth on either side (or to implants), restoring your smile and your ability to chew comfortably.',
    intro: ['We will discuss conventional, adhesive and implant-supported bridge options, and which is likely to be the best long-term choice for you.'],
    highlights: [
      { h: 'Fixed', p: 'Stays in place - no removing at night.' },
      { h: 'Restores biting', p: 'Spreads bite forces more evenly.' },
      { h: 'Custom made', p: 'Shaped and shaded to match.' },
    ],
    steps: [
      { h: 'Plan', p: 'Examine supporting teeth and agree design.' },
      { h: 'Prepare', p: 'Impressions or scans; temporary bridge if needed.' },
      { h: 'Fit', p: 'Final bridge is cemented and adjusted.' },
    ],
    faqs: [['Bridge or implant?', 'Both can work well. An implant avoids involving neighbouring teeth; a bridge is often quicker. We will talk through both.']],
    price: { title: 'Bridge fee', rows: feeRows('Crowns, bridges & veneers')?.slice(1, 2), note: 'Per unit; depends on type and material.' },
  },
  {
    slug: 'dentures', name: 'Dentures', group: 'Replace', icon: 'tooth',
    short: 'Comfortable, well-fitting full or partial dentures.',
    lead: 'Modern dentures are lighter, better fitting and more natural-looking than many people expect. We provide full and partial dentures, in acrylic or chrome cobalt.',
    intro: ['Dentures can also be retained by implants for extra stability. We take time over fit, bite and appearance - and adjust afterwards until you are comfortable.'],
    highlights: [
      { h: 'Full or partial', p: 'Replace a few teeth or a whole arch.' },
      { h: 'Acrylic or chrome cobalt', p: 'Choose from different materials for strength and slimness.' },
      { h: 'Implant-retained option', p: 'More secure when you eat and speak.' },
    ],
    steps: [
      { h: 'Impressions', p: 'Accurate impressions or scans of your mouth.' },
      { h: 'Try-in', p: 'Check shape, shade and bite before finishing.' },
      { h: 'Fit & review', p: 'Final fit with follow-up adjustments.' },
    ],
    faqs: [['Will they feel strange at first?', 'A short settling-in period is normal. Review appointments help fine-tune the fit.']],
    price: { title: 'Denture fees', rows: feeRows('Dentures (per arch)'), note: 'Per arch.' },
  },
  {
    slug: 'white-fillings', name: 'White Fillings', group: 'Restore', icon: 'tooth',
    short: 'Tooth-coloured fillings that repair decay discreetly.',
    lead: 'White (composite) fillings repair decayed or damaged teeth using tooth-coloured material that blends invisibly with your smile.',
    intro: ['Composite bonds to the tooth, which often means less tooth needs to be removed. Early treatment is gentler - regular check-ups help us catch decay while it is small.'],
    highlights: [
      { h: 'Discreet', p: 'Matched to your natural shade.' },
      { h: 'Conservative', p: 'Bonds to the tooth, preserving structure.' },
      { h: 'Quick', p: 'Most fillings are completed in a single visit.' },
    ],
    steps: [
      { h: 'Numb', p: 'Local anaesthetic keeps you comfortable.' },
      { h: 'Clean', p: 'Decay is carefully removed.' },
      { h: 'Restore', p: 'The filling is placed, shaped and polished.' },
    ],
    faqs: [['Are white fillings available on the NHS?', 'Where a filling is clinically needed, NHS options are available; your dentist will explain what applies.']],
    price: { title: 'Filling fee', rows: feeRows('Fillings & root canal')?.slice(0, 1), note: 'Private guide price.' },
  },
  {
    slug: 'root-canal', name: 'Root Canal Treatment', group: 'Restore', icon: 'tooth',
    short: 'Save an infected or damaged tooth and relieve the pain.',
    lead: 'Root canal treatment removes infected or damaged tissue from inside a tooth so it can be saved - and the pain that often comes with infection relieved.',
    intro: ['Modern root canal treatment is carried out under local anaesthetic and is usually no more uncomfortable than having a filling. Afterwards the tooth is often protected with a crown.'],
    highlights: [
      { h: 'Saves your tooth', p: 'Avoids extraction where possible.' },
      { h: 'Relieves pain', p: 'Treats the source of infection.' },
      { h: 'Comfortable', p: 'Delivered with local anaesthetic.' },
    ],
    steps: [
      { h: 'Assess', p: 'X-rays and examination confirm the problem.' },
      { h: 'Clean & shape', p: 'The canals are cleaned and disinfected.' },
      { h: 'Seal & restore', p: 'The tooth is filled and protected.' },
    ],
    faqs: [['Is it painful?', 'The aim is to relieve pain. Local anaesthetic keeps treatment comfortable.']],
    price: { title: 'Root canal fees', rows: feeRows('Fillings & root canal')?.filter((r) => /root/i.test(r[0])), note: 'Depends on the tooth treated.' },
  },
];

// ---- Care options / services ----
export const care = [
  {
    slug: 'nhs', name: 'NHS Dental Care', icon: 'shield',
    short: 'NHS treatment, provided here for decades.',
    lead: 'We have provided NHS dental care for decades, alongside private Pay as you Go and our Dental Plan.',
    blocks: [
      { h: 'NHS charges', p: 'NHS treatment is charged using a banding system, unless you are exempt or entitled to financial help. Current band amounts are published on the NHS website.' },
      { h: 'Proof of entitlement', p: 'If you are claiming help with costs, you will need to show your dentist written proof at each NHS appointment. Please check forms are filled in correctly before signing, to avoid penalties for incorrect information.' },
      { h: 'Regular attendance', p: 'If more than two years pass without an appointment, we cannot offer further appointments. You can join our new-patient waiting list or register elsewhere.' },
      { h: 'Waiting list', p: 'NHS lists are not always open and waiting times vary with demand and appointment availability.' },
    ],
  },
  {
    slug: 'private', name: 'Private - Pay as you go', icon: 'pound',
    short: 'Private care on demand. No monthly fees.',
    lead: 'Simple and easy: pay for private treatment as you need it, with no monthly fees.',
    blocks: [
      { h: 'How it works', p: 'Choose private care for check-ups, hygiene and treatment, and pay per appointment or treatment.' },
      { h: 'Good to know', p: 'Pay as you go patients do not receive the discounts available to Dental Plan members. If you attend regularly, the plan may suit you better.' },
      { h: 'Fees', p: 'Our private fee guide lists prices for common treatments - see the Fees page.' },
    ],
  },
  {
    slug: 'dental-plan', name: 'Dental Plan', icon: 'heart',
    short: `Budget for check-ups and hygiene from ${'£2.30'} a week.`,
    lead: 'Spread the cost of private check-ups and hygiene visits with our Dental Plan, from £2.30 per week - less than a high-street takeaway coffee.',
    blocks: [
      { h: 'Included', list: ['Budgeting for annual private check-ups and hygiene appointments', '10% off many routine treatments', 'Global Dental Accident & Emergency Scheme: accidents, emergencies and mouth cancer diagnosis support (discretionary benefits, not insurance, assessed case by case)'] },
      { h: 'Joining as a current patient', p: 'Ask your dentist at your next appointment. Any outstanding treatment needs to be completed first.' },
      { h: 'Joining as a new patient', p: 'Book a private consultation and complete any required treatment before signing up.' },
      { h: 'Please note', p: 'Prices were stated as correct at 31/10/26 and may change - confirm before joining.' },
    ],
  },
  {
    slug: 'finance', name: '0% Finance', icon: 'pound',
    short: 'Spread the cost of treatment with 0% patient finance.',
    lead: 'Larger treatments such as implants or orthodontics can be spread over time with our 0% finance option, arranged through our finance partner.',
    blocks: [
      { h: 'How it works', p: 'Agree your treatment plan, then apply for finance. Finance is subject to status and terms, so ask us for details.' },
      { h: 'Plan members', p: 'Dental Plan members also receive 10% off many treatments.' },
    ],
  },
  {
    slug: 'referrals', name: 'Referrals', icon: 'user',
    short: 'Implants and orthodontics for patients of other practices.',
    lead: 'You do not need to be our patient to access specialist care. Dentists can refer patients, and you can contact us directly.',
    blocks: [
      { h: 'For patients', p: 'Call or email us to discuss implants or orthodontic treatment, or ask your own dentist to refer you.' },
      { h: 'For dentists', p: 'We welcome referrals for implant dentistry and specialist orthodontics. Contact the practice to discuss your patient.' },
    ],
  },
  {
    slug: 'nervous-patients', name: 'Nervous Patients', icon: 'heart',
    short: 'Calm, patient care for anyone who finds dentistry difficult.',
    lead: 'Whether it is the sound of the drill, injections, or a worry you cannot quite explain - we understand, and every dentist here is happy to look after apprehensive patients.',
    blocks: [
      { h: 'Tell us how you feel', p: 'Let the receptionist know you are anxious, or email us before your visit. We will plan around you.' },
      { h: 'Quieter appointments', p: 'We can book quieter times with less noise, which can help patients with autism or sensory sensitivity.' },
      { h: 'Dementia friendly', p: 'We became Bristol\'s first Dementia Friendly Dental Practice following training from Dementia Friends.' },
      { h: 'Any other needs', p: 'If there is anything else we can do to make your visit easier, please tell us.' },
    ],
  },
  {
    slug: 'urgent-care', name: 'Urgent & Out-of-hours Care', icon: 'alert',
    short: 'Same-day urgent slots, plus out-of-hours options.',
    lead: 'In pain or had an accident? Call us first thing.',
    blocks: [
      { h: 'During opening hours', p: 'We set aside time each day for urgent patients. These appointments are same-day only and fill quickly - please call 0117 950 3141 as early as you can.' },
      { h: 'Out of hours', p: 'Call NHS 111 for the NHS out-of-hours emergency service.' },
      { h: 'Private option', p: 'The 247dentist is open 365 days a year on 03301 759 995. It charges a call-out fee that varies by time, plus treatment. You will not be seen by a Passage House dentist and your notes will not be available. Treatment through this service is private.' },
    ],
  },
  {
    slug: 'oral-health', name: 'Oral Health Information', icon: 'sparkle',
    short: 'Practical guidance for healthy teeth and gums.',
    lead: 'Small daily habits protect your smile. Here are the essentials.',
    blocks: [
      { h: 'Daily care', list: ['Brush twice a day for two minutes with fluoride toothpaste', 'Clean between your teeth once a day', 'Spit, do not rinse, after brushing', 'Limit sugary food and drink to mealtimes'] },
      { h: 'Regular check-ups', p: 'Your dentist will recommend how often to attend - it depends on your oral health.' },
      { h: 'Worried about something?', p: 'Bleeding gums, a sore that does not heal within three weeks, or persistent pain should be checked promptly.' },
    ],
  },
];

export const family = [
  { age: '0-3', title: 'Babies & toddlers', p: 'Start early. Begin brushing as the first tooth appears with a smear of fluoride toothpaste, and bring your baby along to see us - familiarity builds confidence. NHS dental care is free for under-18s in England.' },
  { age: '3-6', title: 'Children', p: 'Use a pea-sized amount of fluoride toothpaste twice daily and supervise brushing. Keep sugary snacks and drinks to mealtimes, and attend regular check-ups.' },
  { age: '7-11', title: 'Growing smiles', p: 'Adult teeth are arriving. Keep brushing twice a day, encourage independence with supervision, and ask us about protecting new molars and early orthodontic checks.' },
  { age: '11+', title: 'Teens & beyond', p: 'Teenage years bring braces, sports and sweet temptations. We can advise on orthodontics, gum shields and keeping teeth healthy through busy years.' },
];

export const news = [
  { tag: 'Team', title: 'Welcome, Dr Annabel Lee', p: 'We are delighted to welcome Dr Annabel Lee to the practice, working three days a week.' },
  { tag: 'Patients', title: 'Change of dentist', p: 'Some patients are being reallocated to a different dentist over the coming months, from October 2026 through to around summer 2027. If this affects you, we will contact you directly.' },
  { tag: 'Plans', title: 'New cost-effective Dental Plans', p: 'Our Dental Plan starts from £2.30 per week and includes 10% off many routine treatments.' },
];

export const bookingTypes = [
  { id: 'new', label: 'New patient examination', sub: 'Private - includes 2 X-rays', who: 'dentist' },
  { id: 'checkup', label: 'Check-up', sub: 'NHS, private or plan member', who: 'dentist' },
  { id: 'hygiene', label: 'Hygienist', sub: 'Scale, polish & gum care', who: 'hygienist' },
  { id: 'implant', label: 'Implant consultation', sub: 'With Dr Brad Hall', who: 'implant' },
  { id: 'ortho', label: 'Orthodontic assessment', sub: 'With Dr Ben Cross', who: 'ortho' },
  { id: 'cosmetic', label: 'Smile / whitening consultation', sub: 'Cosmetic options', who: 'dentist' },
  { id: 'nervous', label: 'Nervous patient chat', sub: 'A gentle first visit', who: 'dentist' },
];

export const allTreatmentGroups = ['Replace', 'Straighten', 'Beautify', 'Restore', 'Prevent'];
