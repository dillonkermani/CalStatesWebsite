export const divisions = [
  {
    id: "1a-championship",
    name: "1A Championship",
    icon: "Trophy",
    eligibility: "All ages and skill levels",
    format: "1-minute preliminary round, top performers advance to 2-minute finals",
    description: "The main competitive division featuring single-handed string tricks",
    details: [
      "Expected 10-20 finalists depending on registration numbers",
      "Music must be uploaded before the registration deadline",
      "All music must be appropriate for all audiences",
      "Judged using official 2024 NYYL scoring standards"
    ]
  },
  {
    id: "x-division",
    name: "X-Division",
    icon: "Zap",
    eligibility: "2A, 3A, 4A, and 5A styles",
    format: "Style-specific scoring with multipliers per 2024 NYYL ruleset",
    description: "Multi-style competition for diverse yo-yo techniques",
    details: [
      "2A: Two-handed looping tricks",
      "3A: Two-handed string tricks (two yo-yos)",
      "4A: Offstring (yo-yo not attached to string)",
      "5A: Counterweight (freehand) style",
      "Each style has specific score multipliers"
    ]
  },
  {
    id: "futures",
    name: "Futures Division",
    icon: "Sparkles",
    eligibility: "Newcomers and first-time competitors",
    format: "Single 1-minute round following Sport Division judging",
    description: "Entry-level division designed for gaining stage experience",
    details: [
      "Age categories: 12 and under, 13 and up",
      "Cannot enter both Futures and 1A Championship",
      "Supportive environment focused on experience over results",
      "Great opportunity to gain stage experience"
    ]
  }
]

export const generalRules = [
  "All competitors must check in by 10:30 AM on competition day",
  "Music must be uploaded before the registration deadline (April 9th, 2026 at midnight PST)",
  "All music must be deemed appropriate for all audiences - inappropriate selections result in disqualification",
  "Competitors cannot enter both Futures and 1A Championship",
  "Single entry per division only",
  "This competition does not seed into the 2026 US National Yo-Yo Championships"
]

export const multiDivisionRules = [
  {
    rule: "1A Championship + X-Division",
    allowed: true,
    description: "You may compete in both 1A Championship AND X-Division simultaneously"
  },
  {
    rule: "Futures + X-Division",
    allowed: true,
    description: "You may compete in both Futures AND X-Division simultaneously"
  },
  {
    rule: "Futures + 1A Championship",
    allowed: false,
    description: "You cannot compete in both Futures and 1A Championship - choose one"
  },
  {
    rule: "Multiple entries in same division",
    allowed: false,
    description: "Only one entry per division is allowed"
  }
]

export const musicRequirements = [
  "MP3 format preferred (320kbps recommended for best quality)",
  "Include your name and division in the filename (e.g., 'JohnDoe_1A.mp3')",
  "Music must be uploaded before April 9th, 2026 at midnight PST",
  "All music must be family-friendly and appropriate for all audiences",
  "A backup copy will be available at check-in for verification"
]

export const venueConsiderations = {
  title: "Outdoor Venue Conditions",
  description: "The Chico City Plaza is an outdoor venue. While not known for being particularly windy, wind conditions can affect slack tricks unpredictably. All competitors will experience the same conditions, and judges take environmental factors into account."
}
