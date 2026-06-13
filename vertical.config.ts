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

const config: VerticalConfig = {
  // ── AgencyOS — AI Content Agency Platform ────────────────
  id:         'agencyos',
  name:       'AgencyOS',
  tagline:    'Brief → research → draft → schedule. AI handles the heavy lifting so your team ships 10x more content.',
  domain:     'agencyos.app',
  themeColor: 'blue',

  providerLabel:  'Creator',
  providerPlural: 'Creators',
  consumerLabel:  'Client',

  categories: [
    { id: 'blog-seo',       label: 'Blog / SEO Article',   icon: '📝', desc: '1,200-word SEO article with meta + headings in 90 seconds' },
    { id: 'podcast',        label: 'Podcast Episode',       icon: '🎙️', desc: 'Hook + outline + full script + show notes' },
    { id: 'faceless-video', label: 'Faceless Video',        icon: '🎬', desc: 'AI voiceover script + B-roll scene prompts' },
    { id: 'linkedin',       label: 'LinkedIn Posts',        icon: '💼', desc: '3 posts — thought leader, hook bait, carousel' },
    { id: 'email',          label: 'Email Sequence',        icon: '📧', desc: '5-email nurture — welcome → educate → convert' },
    { id: 'clips',          label: 'Short Clips',           icon: '✂️', desc: '10 Reels/TikTok captions with hook formulas' },
    { id: 'report',         label: 'Client Report',         icon: '📊', desc: 'Strategy deck + 30-day content calendar' },
    { id: 'research',       label: 'Opportunity Research',  icon: '🔍', desc: 'Trend Scout + Gap Analyzer + Client Finder agent' },
  ],

  pricingModel:        'fixed',
  bookingFlow:         'instant',
  minPrice:            0,
  maxPrice:            99,
  sessionMinutes:      90,
  platformFeePercent:  0,

  aiSystemPrompt: `You are an AI content strategist for AgencyOS, an AI-native content agency platform.
Help users create high-quality content across all formats: blog posts, podcasts, video scripts, LinkedIn posts, email sequences, short clips, and client reports.
Ask about: the brand name, target audience, topic or angle, preferred tone (professional/casual/bold), and which formats they need.
Focus on content agency workflows — briefs, client management, content calendars, and AI-generated drafts.
Be direct and results-focused. Agencies value speed and quality.`,

  aiMatchHints: [
    'content strategy', 'SEO writing', 'social media copywriting',
    'podcast scripting', 'email marketing', 'video scripting',
    'LinkedIn thought leadership', 'content calendar management',
  ],

  features: {
    backgroundCheck:  false,
    portfolioPhotos:  true,
    videoIntro:       false,
    instantBook:      true,
    recurringBook:    true,
    homeVisit:        false,
    remoteSession:    true,
    groupSession:     true,
    insuranceBadge:   false,
    aiDiagnosis:      false,
    careJournal:      false,
  },

  metaTitle:       'AgencyOS — AI Content Agency Platform',
  metaDescription: 'Run your content agency on AI. Brief to blog, podcast, video, LinkedIn, emails, and client report in 90 seconds. Free to start.',
  keywords:        ['AI content agency', 'content agency platform', 'AI blog writer', 'social media AI', 'content automation tool'],
}

export default config

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
