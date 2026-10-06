/**
 * vertical.config.ts — THE ONLY FILE THAT CHANGES PER DEPLOYMENT
 *
 * Copy this file, fill in your vertical, deploy to Vercel.
 * All other code reads from this config at runtime.
 */

export type PricingModel = 'hourly' | 'fixed' | 'session' | 'quote'
export type BookingFlow  = 'instant' | 'quote_first' | 'consult_first'

export interface VerticalConfig {
  // ── Identity ────────────────────────────────────────────
  id:          string   // slug used in URLs, DB tables, etc.
  name:        string   // "CleanFast" / "ElderCare+" / "TuneUp"
  tagline:     string
  domain:      string   // final domain, used in metadata
  themeColor:  string   // tailwind color name: "blue" | "emerald" | "violet" etc.

  // ── Provider terminology ─────────────────────────────────
  providerLabel:  string  // "Cleaner" | "Carer" | "Mechanic" | "Tutor"
  providerPlural: string  // "Cleaners" | "Carers" | "Mechanics" | "Tutors"
  consumerLabel:  string  // "Client" | "Family" | "Driver" | "Student"

  // ── Service categories ───────────────────────────────────
  categories: Category[]

  // ── Booking ──────────────────────────────────────────────
  pricingModel:   PricingModel
  bookingFlow:    BookingFlow
  minPrice:       number   // £ — floor for AI price suggestion
  maxPrice:       number   // £ — ceiling
  sessionMinutes: number   // default session length
  platformFeePercent: number

  // ── AI context ───────────────────────────────────────────
  aiSystemPrompt: string   // injected into every AI call
  aiMatchHints:   string[] // extra signals for provider matching

  // ── Features (toggle) ───────────────────────────────────
  features: {
    backgroundCheck:  boolean
    portfolioPhotos:  boolean
    videoIntro:       boolean
    instantBook:      boolean
    recurringBook:    boolean
    homeVisit:        boolean
    remoteSession:    boolean
    groupSession:     boolean
    insuranceBadge:   boolean
    aiDiagnosis:      boolean   // e.g. car fault codes before mechanic
    careJournal:      boolean   // e.g. daily notes for elder care
  }

  // ── Hero demo copy (falls back to a generic exchange) ───
  demo?: { role: 'user' | 'ai'; text: string; delay: number }[]
  exampleRequest?: string

  // ── Homepage copy; page.tsx falls back to the original care-marketplace wording ──
  copy?: {
    badge: string
    demoTitle?: string; demoCta?: string
    heroHead: string; heroAccent: string
    searchPlaceholder: string; searchCta: string
    categoriesHeading: string; categoriesSub: string
    steps: { title: string; desc: string }[]
    trust: { icon: 'shield' | 'heart' | 'clock' | 'sparkles'; label: string; desc: string }[]
  }

  // ── SEO / meta ───────────────────────────────────────────
  metaTitle:       string
  metaDescription: string
  keywords:        string[]
}

export interface Category {
  id:    string
  label: string
  icon:  string  // emoji or lucide icon name
  desc:  string
}

// ════════════════════════════════════════════════════════════
// ACTIVE VERTICAL — swap this to change the entire app
// ════════════════════════════════════════════════════════════

const BASE: VerticalConfig = {
  // ── ElderCare+ (base defaults; PRESETS overrides per NEXT_PUBLIC_VERTICAL) — In-Home Care Marketplace ────────────────
  id:         'eldercare',
  name:       'ElderCare+',
  tagline:    'In-home care for your parents, from carers you\'d trust with your own.',
  domain:     'eldercareplus.app',
  themeColor: 'rose',

  providerLabel:  'Carer',
  providerPlural: 'Carers',
  consumerLabel:  'Family',

  categories: [
    { id: 'companion-care',   label: 'Companion Care',      icon: '☕', desc: 'A friendly regular visitor for tea, conversation, a walk to the shops — because loneliness does more damage than most illnesses.' },
    { id: 'personal-care',    label: 'Personal Care',       icon: '🛁', desc: 'Dignified help with bathing, dressing and toileting from carers trained to preserve independence, not take it over.' },
    { id: 'dementia-care',    label: 'Dementia Care',       icon: '🧠', desc: 'Carers with specific dementia training who know that a bad afternoon isn\'t defiance, it\'s confusion — and how to gently redirect it.' },
    { id: 'overnight-care',   label: 'Overnight Care',      icon: '🌙', desc: 'Someone awake and nearby through the night, so falls at 3am don\'t go undiscovered until morning.' },
    { id: 'respite-care',     label: 'Respite Care',        icon: '🌿', desc: 'Cover for family carers who need a weekend off without spending it feeling guilty.' },
    { id: 'meals-medication', label: 'Meals & Medication',  icon: '💊', desc: 'Proper cooked meals and medication given on time, logged, so you can check from your phone that Mum actually ate today.' },
  ],

  pricingModel:        'hourly',
  bookingFlow:         'consult_first',
  minPrice:            15,
  maxPrice:            45,
  sessionMinutes:      120,
  platformFeePercent:  12,

  aiSystemPrompt: `You are the ElderCare+ care assistant, helping families find vetted in-home carers for aging parents and relatives. Understand that the person messaging you is often an adult child who is worried, guilty, and exhausted — they may be arranging care from another city, and this might be the first time they've admitted their parent needs help. Never rush them; ask about their parent's daily routine, mobility, memory, and personality before suggesting carers, because a good match is about temperament as much as qualifications. Be explicit about safety: every carer on ElderCare+ is background-checked, reference-verified, and insured, and you should say so when trust concerns come up. Use warm, plain language — "help with getting dressed" not "ADL support" — and never make a family feel judged for how long they waited to seek care. When recommending carers, explain why each one fits (experience with dementia, speaks Tamil, has a dog the client would love), not just their availability. If asked anything outside home care for older adults, respond: "I'm here to help with in-home care on ElderCare+. For that, try Google or ChatGPT!"`,

  aiMatchHints: [
    'dementia or memory-loss experience', 'overnight and live-in availability',
    'language spoken at home', 'comfortable with hoists/mobility aids',
    'personality fit (chatty vs calm)', 'driving licence for appointments',
    'experience with end-of-life care', 'same-carer continuity preference',
  ],

  features: {
    backgroundCheck:  true,
    portfolioPhotos:  true,
    videoIntro:       true,
    instantBook:      false,
    recurringBook:    true,
    homeVisit:        true,
    remoteSession:    false,
    groupSession:     false,
    insuranceBadge:   true,
    aiDiagnosis:      false,
    careJournal:      true,
  },

  metaTitle:       'ElderCare+ — Trusted In-Home Care for Aging Parents',
  metaDescription: 'Find vetted in-home carers for elderly parents. Background-checked, insured home care — companion visits, dementia care, overnight support. Book with confidence.',
  keywords:        ['in-home elder care', 'home care for elderly parents', 'dementia care at home', 'respite care', 'live-in carer'],
}


export const ROOM_TYPES = [
  { id: 'living-room',  icon: '🛋️', label: 'Living Room' },
  { id: 'bedroom',      icon: '🛏️', label: 'Bedroom' },
  { id: 'kitchen',      icon: '🍳', label: 'Kitchen' },
  { id: 'bathroom',     icon: '🚿', label: 'Bathroom' },
  { id: 'home-office',  icon: '💻', label: 'Home Office' },
  { id: 'dining-room',  icon: '🍽️', label: 'Dining Room' },
  { id: 'garden',       icon: '🌿', label: 'Garden' },
  { id: 'hallway',      icon: '🚪', label: 'Hallway' },
]

export const DESIGN_STYLES = [
  { id: 'modern',        emoji: '⬜', label: 'Modern' },
  { id: 'scandinavian',  emoji: '🪵', label: 'Scandinavian' },
  { id: 'industrial',    emoji: '🔩', label: 'Industrial' },
  { id: 'bohemian',      emoji: '🌸', label: 'Bohemian' },
  { id: 'minimalist',    emoji: '◻️', label: 'Minimalist' },
  { id: 'traditional',   emoji: '🏺', label: 'Traditional' },
  { id: 'art-deco',      emoji: '✨', label: 'Art Deco' },
  { id: 'coastal',       emoji: '🌊', label: 'Coastal' },
]

// ════════════════════════════════════════════════════════════
// OTHER VERTICALS (copy + swap the export above)
// ════════════════════════════════════════════════════════════

export const PRESETS: Record<string, Partial<VerticalConfig>> = {
  agency: {
    id: 'agency', name: 'AgencyOS', themeColor: 'indigo',
    domain: 'agencyos.app',
    tagline: 'One chief of staff routes every request to the right specialist agent, and you approve what goes out.',
    providerLabel: 'Specialist', providerPlural: 'Specialists', consumerLabel: 'Client',
    categories: [
      { id: 'chief', label: 'Chief of Staff', icon: '🧭', desc: 'Reads every request and hands it to the right specialist, so you talk to one agent, not six.' },
      { id: 'brain', label: 'Second Brain', icon: '🧠', desc: 'Answers from your own notes and documents, with sources, instead of guessing.' },
      { id: 'inbox', label: 'Inbox', icon: '📥', desc: 'Triages email and drafts replies for you to approve.' },
      { id: 'content', label: 'Content', icon: '✍️', desc: 'Drafts posts, newsletters and scripts in your voice.' },
      { id: 'legal', label: 'Legal', icon: '⚖️', desc: 'First-pass review of contracts and terms, flagging clauses for a human lawyer.' },
      { id: 'seo', label: 'SEO', icon: '🔎', desc: 'Audits pages and suggests fixes for search and AI answer engines.' },
    ],
    pricingModel: 'quote', bookingFlow: 'consult_first',
    // ponytail: no invented pricing. Set real numbers once the first buyer agrees a price.
    minPrice: 0, maxPrice: 0, sessionMinutes: 30, platformFeePercent: 0,
    aiSystemPrompt: `You are the AgencyOS assistant. AgencyOS is a team of AI agents for small businesses: a chief of staff routes each request to a specialist (second brain, inbox, content, legal, SEO). Ask what the visitor's business does and which task costs them the most time, then say which agent would handle it and what a first 2-week build would cover. Be concrete and plain; never promise results or prices you were not given. If asked anything outside AgencyOS and what its agents do, respond: "I'm here to help with AgencyOS. For that, try Google or ChatGPT!"`,
    aiMatchHints: [
      'task they repeat every week', 'tools they already use (email, CRM, docs)',
      'where their notes and documents live', 'who approves outgoing messages',
      'tone of voice for content', 'compliance or privacy limits',
    ],
    features: { backgroundCheck:false, portfolioPhotos:false, videoIntro:false,
      instantBook:false, recurringBook:true, homeVisit:false, remoteSession:true,
      groupSession:false, insuranceBadge:false, aiDiagnosis:false, careJournal:false },
    demo: [
      { role: 'user', text: 'I run a 5-person marketing agency. Client emails eat my mornings.', delay: 600 },
      { role: 'ai',   text: 'Got it. Which tools do the emails come through, and who should approve replies before they go out?', delay: 1800 },
      { role: 'user', text: 'Gmail, and I approve everything.', delay: 2800 },
      { role: 'ai',   text: '✨ The Inbox agent would triage and draft replies for you to approve, and the Chief of Staff would route briefs to Content or SEO.\n\nWant a scoped 2-week build?', delay: 4200 },
    ],
    copy: {
      badge: 'You approve everything before it goes out',
      demoTitle: 'Chief of Staff', demoCta: 'Scope my 2-week build →',
      heroHead: 'A team of AI agents that runs the busywork for', heroAccent: 'your business',
      searchPlaceholder: 'What task eats your week?', searchCta: 'Get my agent team',
      categoriesHeading: 'One chief of staff, six specialists',
      categoriesSub: 'Tell the chief what you need and it hands the work to the right agent.',
      steps: [
        { title: 'Tell us your bottleneck', desc: 'Describe the task that costs you the most time. Two minutes.' },
        { title: 'Meet your agent team', desc: 'We map it to the chief of staff and the specialists that fit.' },
        { title: 'Scoped 2-week build', desc: 'A fixed scope you can review before anything goes live.' },
      ],
      trust: [
        { icon: 'shield', label: 'Human approval', desc: 'Nothing is sent or published without your sign-off' },
        { icon: 'sparkles', label: 'Grounded in your notes', desc: 'Answers come from your documents, with sources' },
        { icon: 'clock', label: 'Fixed scope', desc: 'A two-week build, agreed before we start' },
      ],
    },
    exampleRequest: 'I run a small agency and client emails eat my mornings. I want drafts ready for me to approve.',
    metaTitle: 'AgencyOS — A Team of AI Agents for Your Business',
    metaDescription: 'A chief-of-staff AI routes each request to specialist agents for your inbox, content, legal review and SEO. Scoped 2-week builds for small businesses.',
    keywords: ['AI agents for business', 'AI chief of staff', 'AI agent team', 'business automation agents'],
  },
  eldercare: {
    id: 'eldercare', name: 'ElderCare+', themeColor: 'rose',
    domain: 'eldercareplus.app',
    tagline: 'In-home care for your parents, from carers you\'d trust with your own.',
    providerLabel: 'Carer', providerPlural: 'Carers', consumerLabel: 'Family',
    categories: [
      { id: 'companion-care', label: 'Companion Care', icon: '☕', desc: 'A friendly regular visitor for tea, conversation, a walk to the shops — because loneliness does more damage than most illnesses.' },
      { id: 'personal-care', label: 'Personal Care', icon: '🛁', desc: 'Dignified help with bathing, dressing and toileting from carers trained to preserve independence, not take it over.' },
      { id: 'dementia-care', label: 'Dementia Care', icon: '🧠', desc: 'Carers with specific dementia training who know that a bad afternoon isn\'t defiance, it\'s confusion — and how to gently redirect it.' },
      { id: 'overnight-care', label: 'Overnight Care', icon: '🌙', desc: 'Someone awake and nearby through the night, so falls at 3am don\'t go undiscovered until morning.' },
      { id: 'respite-care', label: 'Respite Care', icon: '🌿', desc: 'Cover for family carers who need a weekend off without spending it feeling guilty.' },
      { id: 'meals-medication', label: 'Meals & Medication', icon: '💊', desc: 'Proper cooked meals and medication given on time, logged, so you can check from your phone that Mum actually ate today.' },
    ],
    pricingModel: 'hourly', bookingFlow: 'consult_first',
    minPrice: 15, maxPrice: 45, sessionMinutes: 120, platformFeePercent: 12,
    aiSystemPrompt: `You are the ElderCare+ care assistant, helping families find vetted in-home carers for aging parents and relatives. Understand that the person messaging you is often an adult child who is worried, guilty, and exhausted — they may be arranging care from another city, and this might be the first time they've admitted their parent needs help. Never rush them; ask about their parent's daily routine, mobility, memory, and personality before suggesting carers, because a good match is about temperament as much as qualifications. Be explicit about safety: every carer on ElderCare+ is background-checked, reference-verified, and insured, and you should say so when trust concerns come up. Use warm, plain language — "help with getting dressed" not "ADL support" — and never make a family feel judged for how long they waited to seek care. When recommending carers, explain why each one fits (experience with dementia, speaks Tamil, has a dog the client would love), not just their availability. If asked anything outside home care for older adults, respond: "I'm here to help with in-home care on ElderCare+. For that, try Google or ChatGPT!"`,
    aiMatchHints: [
      'dementia or memory-loss experience', 'overnight and live-in availability',
      'language spoken at home', 'comfortable with hoists/mobility aids',
      'personality fit (chatty vs calm)', 'driving licence for appointments',
      'experience with end-of-life care', 'same-carer continuity preference',
    ],
    features: { backgroundCheck:true, portfolioPhotos:true, videoIntro:true,
      instantBook:false, recurringBook:true, homeVisit:true, remoteSession:false,
      groupSession:false, insuranceBadge:true, aiDiagnosis:false, careJournal:true },
    metaTitle: 'ElderCare+ — Trusted In-Home Care for Aging Parents',
    metaDescription: 'Find vetted in-home carers for elderly parents. Background-checked, insured home care — companion visits, dementia care, overnight support. Book with confidence.',
    keywords: ['in-home elder care', 'home care for elderly parents', 'dementia care at home', 'respite care', 'live-in carer'],
  },
  petcare: {
    id: 'petcare', name: 'WagTail', themeColor: 'orange',
    domain: 'wagtail.app',
    tagline: 'Sitters and walkers your dog will actually be excited to see.',
    providerLabel: 'Sitter', providerPlural: 'Sitters', consumerLabel: 'Pet Parent',
    categories: [
      { id: 'dog-walking', label: 'Dog Walking', icon: '🐕', desc: 'Solo or small-group walks with GPS-tracked routes and a photo of your muddy, delighted dog mid-zoomies.' },
      { id: 'pet-sitting', label: 'In-Home Pet Sitting', icon: '🏠', desc: 'A sitter stays at yours so your anxious cat keeps her routine, her windowsill, and her opinion of strangers.' },
      { id: 'doggy-daycare', label: 'Doggy Daycare', icon: '🎾', desc: 'A full day of play for dogs who treat an empty house like a personal insult.' },
      { id: 'grooming', label: 'Grooming', icon: '✂️', desc: 'Bath, brush, nails and de-shedding from groomers who know a nervous first-timer needs to go slow.' },
      { id: 'overnight-boarding', label: 'Overnight Boarding', icon: '🌙', desc: 'Your dog sleeps in a real home with a vetted sitter — not a kennel run — with photo updates before you\'ve even landed.' },
      { id: 'puppy-visits', label: 'Puppy Drop-Ins', icon: '🐾', desc: 'Midday toilet breaks, feeding and play for puppies too little to hold it — and too cute to be mad at.' },
    ],
    pricingModel: 'fixed', bookingFlow: 'instant',
    minPrice: 10, maxPrice: 60, sessionMinutes: 30, platformFeePercent: 15,
    aiSystemPrompt: `You are the WagTail assistant, helping pet parents find sitters, walkers and groomers for animals they consider full family members. Treat every pet as an individual: always ask for name, breed, age, and quirks (reactive on lead? escape artist? terrified of dryers?) before matching, and use the pet's name in your replies — people light up when you talk about Biscuit, not "your dog." Be upbeat and warm, but take safety seriously: mention that sitters are vetted and reviewed, ask about vaccination and medication needs when relevant, and never gloss over behavioural issues that affect matching. Reassure anxious first-time bookers that photo updates and meet-and-greets are standard — leaving your pet with a stranger is a big deal and you know it. Match on the stuff that matters: a high-energy collie needs a runner, a senior cat needs someone calm who'll actually sit still. If asked anything outside pet care and pet services, respond: "I'm all about pets here on WagTail! For that, try Google or ChatGPT!"`,
    aiMatchHints: [
      'breed size and energy level', 'reactive/anxious dog experience',
      'cat-only households', 'medication and senior-pet care',
      'home has secure garden', 'solo walks vs group walks',
      'puppy experience', 'comfortable with exotics/small animals',
    ],
    features: { backgroundCheck:true, portfolioPhotos:true, videoIntro:false,
      instantBook:true, recurringBook:true, homeVisit:true, remoteSession:false,
      groupSession:true, insuranceBadge:true, aiDiagnosis:false, careJournal:false },
    metaTitle: 'WagTail — Trusted Dog Walkers & Pet Sitters Near You',
    metaDescription: 'Book trusted dog walkers, pet sitters & groomers near you. Vetted local sitters, meet-and-greets, GPS-tracked walks and photo updates. Your pet\'s new best friend.',
    keywords: ['dog walker near me', 'pet sitting service', 'dog boarding', 'pet grooming booking', 'doggy daycare'],
  },
  tutoring: {
    id: 'tutoring', name: 'GradeUp', themeColor: 'sky',
    domain: 'gradeup.app',
    tagline: 'Tutors matched to your child, with progress you can actually measure.',
    providerLabel: 'Tutor', providerPlural: 'Tutors', consumerLabel: 'Student',
    categories: [
      { id: 'maths', label: 'Maths', icon: '📐', desc: 'From times-tables panic to A-level calculus — tutors who find the exact gap where it stopped making sense.' },
      { id: 'english', label: 'English & Writing', icon: '✍️', desc: 'Essay structure, comprehension and creative writing for kids who "hate English" until someone teaches it properly.' },
      { id: 'sciences', label: 'Sciences', icon: '🔬', desc: 'Biology, chemistry and physics tutors who teach the why behind the mark scheme, not just the mark scheme.' },
      { id: 'exam-prep', label: 'Exam Prep', icon: '🎯', desc: 'Targeted 11+, GCSE, A-level and SAT prep with past-paper drills and a week-by-week plan to test day.' },
      { id: 'languages', label: 'Languages', icon: '🗣️', desc: 'French, Spanish, Mandarin and more — conversation-first lessons, because nobody ever got fluent from a vocab list.' },
      { id: 'university-level', label: 'University Subjects', icon: '🎓', desc: 'Undergrad help in stats, economics, computer science and engineering from tutors who took the same modules and remember the pain.' },
    ],
    pricingModel: 'session', bookingFlow: 'instant',
    minPrice: 15, maxPrice: 80, sessionMinutes: 60, platformFeePercent: 15,
    aiSystemPrompt: `You are the GradeUp assistant, matching students with academic tutors from primary school through university. Know your two audiences: parents want measurable progress and a return on money spent — grades, confidence, exam readiness — while students want a tutor who doesn't make them feel stupid; serve both. Always ask for the subject, year/grade level, current performance, target (exam board or specific goal), and how the student learns best before recommending anyone. Be confident and specific: recommend tutors by track record ("raised most GCSE students a full grade in two terms") rather than vague praise, and suggest a realistic session cadence tied to the exam calendar. Encourage a trial session and remind parents that tutor-student rapport predicts results better than credentials alone. Never overpromise a grade — frame outcomes as trajectories, and flag when a goal needs more runway than the family has allowed. If asked anything outside tutoring and academic support, respond: "I'm focused on tutoring here at GradeUp. For that, try Google or ChatGPT!"`,
    aiMatchHints: [
      'exam board familiarity (AQA/Edexcel/IB/SAT)', 'year group / key stage',
      'SEN and dyslexia experience', 'online vs in-person',
      'track record of grade improvement', 'patient with low-confidence learners',
      'native/fluent language speaker', 'university module expertise',
    ],
    features: { backgroundCheck:true, portfolioPhotos:false, videoIntro:true,
      instantBook:true, recurringBook:true, homeVisit:true, remoteSession:true,
      groupSession:true, insuranceBadge:false, aiDiagnosis:false, careJournal:false },
    metaTitle: 'GradeUp — Private Tutors Matched to Your Child',
    metaDescription: 'Find expert private tutors for K-12 and university — maths, English, sciences, exam prep. Matched to your child\'s level with measurable progress reports.',
    keywords: ['private tutor near me', 'online tutoring', 'GCSE tutor', 'exam prep tutor', 'maths tutor'],
  },
  homecleaning: {
    id: 'homecleaning', name: 'Spotless', themeColor: 'emerald',
    domain: 'spotless.app',
    tagline: 'A vetted cleaner at your door this week. Book in two minutes.',
    providerLabel: 'Cleaner', providerPlural: 'Cleaners', consumerLabel: 'Household',
    categories: [
      { id: 'regular-cleaning', label: 'Regular Cleaning', icon: '🧹', desc: 'The same cleaner, same day each week — kitchen, bathrooms, floors, surfaces done so you never spend Sunday catching up.' },
      { id: 'deep-cleaning', label: 'Deep Clean', icon: '🫧', desc: 'The inside-the-oven, behind-the-sofa, limescale-off-the-shower clean your house needs twice a year and never gets.' },
      { id: 'end-of-tenancy', label: 'End of Tenancy', icon: '🔑', desc: 'Checklist-based cleans built around what letting agents actually inspect — get the full deposit back or the reclean is free.' },
      { id: 'after-builders', label: 'After Builders', icon: '🛠️', desc: 'Fine dust off every surface, paint specks off the glass, floors done twice — because renovation dust hides for weeks.' },
      { id: 'oven-appliance', label: 'Oven & Appliance', icon: '🔥', desc: 'Ovens, hobs, extractor hoods and fridges degreased to like-new, using dip-tank methods, not just a spray and wipe.' },
      { id: 'carpet-upholstery', label: 'Carpet & Upholstery', icon: '🛋️', desc: 'Hot-water extraction for carpets, sofas and mattresses — removes the stain and the smell, not just the surface of both.' },
    ],
    pricingModel: 'fixed', bookingFlow: 'instant',
    minPrice: 20, maxPrice: 150, sessionMinutes: 120, platformFeePercent: 15,
    aiSystemPrompt: `You are the Spotless assistant, matching households with vetted, insured home cleaners. Your users want speed and certainty, not chat — get to a quote and an available slot fast. Ask only what you need: property size (bedrooms/bathrooms), clean type (regular, deep, end-of-tenancy, after-builders), any priority areas or pet hair, and preferred day; then recommend cleaners with availability, rating, and a clear hourly or fixed price up front. Be direct about the practical stuff people worry about: all cleaners are ID-checked, insured and reviewed after every job, keys can be handled via lockbox, and products are included unless the household prefers their own. For end-of-tenancy jobs, mention the agent-checklist standard and reclean guarantee — deposits are on the line and customers know it. Never pad answers; a straight price and a bookable time beats a paragraph of reassurance. If asked anything outside home cleaning services, respond: "I handle home cleaning here at Spotless. For that, try Google or ChatGPT!"`,
    aiMatchHints: [
      'brings own products/equipment', 'pet-friendly (hair and presence)',
      'same-cleaner weekly slot', 'end-of-tenancy checklist certified',
      'short-notice availability', 'steam/extraction equipment',
      'eco products on request', 'keyholding / lockbox comfortable',
    ],
    features: { backgroundCheck:true, portfolioPhotos:true, videoIntro:false,
      instantBook:true, recurringBook:true, homeVisit:true, remoteSession:false,
      groupSession:false, insuranceBadge:true, aiDiagnosis:false, careJournal:false },
    metaTitle: 'Spotless — Book a Vetted Home Cleaner Online',
    metaDescription: 'Book vetted, insured home cleaners online — regular cleaning, deep cleans & end of tenancy. Fixed upfront prices, next-day slots, satisfaction guaranteed.',
    keywords: ['house cleaning service', 'end of tenancy cleaning', 'deep clean booking', 'home cleaner near me', 'domestic cleaning'],
  },
  mechanics: {
    id: 'mechanics', name: 'MechFix', themeColor: 'orange',
    tagline: 'Find a trusted local mechanic — AI pre-diagnosis included',
    providerLabel: 'Mechanic', providerPlural: 'Mechanics', consumerLabel: 'Driver',
    pricingModel: 'quote', bookingFlow: 'quote_first',
    features: { backgroundCheck:false, portfolioPhotos:true, videoIntro:false,
      instantBook:false, recurringBook:false, homeVisit:true, remoteSession:false,
      groupSession:false, insuranceBadge:true, aiDiagnosis:true, careJournal:false },
  },
  music: {
    id: 'music', name: 'TuneUp', themeColor: 'indigo',
    tagline: 'Learn any instrument from verified local tutors',
    providerLabel: 'Tutor', providerPlural: 'Tutors', consumerLabel: 'Student',
    pricingModel: 'session', bookingFlow: 'instant',
    features: { backgroundCheck:true, portfolioPhotos:true, videoIntro:true,
      instantBook:true, recurringBook:true, homeVisit:true, remoteSession:true,
      groupSession:true, insuranceBadge:false, aiDiagnosis:false, careJournal:false },
  },
  wedding: {
    id: 'wedding', name: 'WedFlow', themeColor: 'rose',
    tagline: 'Every wedding vendor you need — curated, reviewed, instantly bookable',
    providerLabel: 'Vendor', providerPlural: 'Vendors', consumerLabel: 'Couple',
    pricingModel: 'fixed', bookingFlow: 'quote_first',
    features: { backgroundCheck:false, portfolioPhotos:true, videoIntro:true,
      instantBook:false, recurringBook:false, homeVisit:false, remoteSession:false,
      groupSession:false, insuranceBadge:false, aiDiagnosis:false, careJournal:false },
  },
  nutrition: {
    id: 'nutrition', name: 'NutriCoach', themeColor: 'green',
    tagline: 'Personalised nutrition coaching — AI-matched to your goals',
    providerLabel: 'Nutritionist', providerPlural: 'Nutritionists', consumerLabel: 'Client',
    pricingModel: 'session', bookingFlow: 'consult_first',
    features: { backgroundCheck:false, portfolioPhotos:false, videoIntro:true,
      instantBook:false, recurringBook:true, homeVisit:false, remoteSession:true,
      groupSession:true, insuranceBadge:true, aiDiagnosis:false, careJournal:true },
  },
}

// Active vertical: NEXT_PUBLIC_VERTICAL picks a PRESETS key; default is the generic agency.
const config: VerticalConfig = { ...BASE, ...(PRESETS[process.env.NEXT_PUBLIC_VERTICAL || 'agency'] ?? PRESETS.agency) }

export default config
