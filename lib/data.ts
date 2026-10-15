// Every figure on the site comes from the Panda Talkdesk transcript export
// (2 Jan to 4 Feb 2026). Measured figures cover all 6,738 calls. Process and
// tier figures come from reading every inbound call in full, with 400 calls
// read a second time to check and correct the tiering.

export type Tier = "A" | "B" | "C";

export const TIER_COLOR: Record<Tier, string> = {
  A: "var(--color-tier-a)",
  B: "var(--color-tier-b)",
  C: "var(--color-tier-c)",
};

export const TIER_NAME: Record<Tier, string> = {
  A: "Tier A · AI finishes it",
  B: "Tier B · AI plus a hand-off",
  C: "Tier C · Agent intake, then human-led",
};

export const measured = {
  totalCalls: 6738,
  inbound: 5925,
  outboundAnswered: 650,
  outboundVoicemail: 163,
  medianTurns: 104,
  p90Turns: 226,
  passedToSecondAgentPct: 41.2,
  handoffsToLoyaltyPct: 75,
  callsPerDay: 302,
  agents: 61,
  workingDays: 23,
  idCheckPct: 83,
  noAccountNumberPct: 7,
  queues: [
    { name: "Customer service", pct: 59.5 },
    { name: "Sales", pct: 28.5 },
    { name: "Loyalty", pct: 10.5 },
    { name: "Credit control", pct: 1.4 },
  ],
};

export const read = {
  withRequest: 5657,
  secondRead: 400,
  processAgreementPct: 90,
  priceConversations: 1700,
  priceConversationsPct: 30,
  priceStartedElsewherePct: 58,
  priceHandedOffPct: 73,
  topFivePct: 65,
  priceDecisionInTierCPct: 63,
};

export type Process = {
  key: string;
  label: string;
  share: number; // % of inbound calls with a real request
  calls: number;
  turns: number; // median turns
  mix: [number, number, number]; // A, B, C %
  tier: Tier; // where most of its calls land
  handoffPct: number;
  priceDecisionPct: number;
  needsPerson: string;
  example: string;
};

export const processes: Process[] = [
  {
    key: "price_review",
    label: "Plan & price review",
    share: 24.5,
    calls: 1384,
    turns: 129,
    mix: [8, 3, 89],
    tier: "C",
    handoffPct: 73,
    priceDecisionPct: 55,
    needsPerson: "Loyalty decides rates, credits and matches; over half get one",
    example: "Contract is up and a neighbour pays less. Can you do better?",
  },
  {
    key: "quote",
    label: "Price quote & coverage",
    share: 12.0,
    calls: 677,
    turns: 101,
    mix: [66, 12, 22],
    tier: "A",
    handoffPct: 12,
    priceDecisionPct: 26,
    needsPerson: "Free months or price-matches to win a switch; unlisted estates",
    example: "Do you collect in my estate, and what would three bins cost?",
  },
  {
    key: "cancel_move",
    label: "Close account",
    share: 9.9,
    calls: 559,
    turns: 101,
    mix: [78, 11, 11],
    tier: "A",
    handoffPct: 71,
    priceDecisionPct: 13,
    needsPerson: "Final collection still due or bins to remove; fee waivers",
    example: "We've sold the house. Close the account and tell me what I owe.",
  },
  {
    key: "signup",
    label: "New household sign-up",
    share: 9.9,
    calls: 559,
    turns: 164,
    mix: [74, 16, 10],
    tier: "A",
    handoffPct: 10,
    priceDecisionPct: 17,
    needsPerson: "Special rates or free months needing a manager; delivery dates",
    example: "We've just moved in and the bins here aren't ours.",
  },
  {
    key: "pay",
    label: "Card payment & arrears",
    share: 9.1,
    calls: 515,
    turns: 63,
    mix: [63, 27, 10],
    tier: "A",
    handoffPct: 11,
    priceDecisionPct: 6,
    needsPerson: "Payment plans and hardship exceptions below the minimum",
    example: "I want to clear the balance so the bins get lifted Thursday.",
  },
  {
    key: "billing_dispute",
    label: "Dispute, refund, complaint",
    share: 6.6,
    calls: 375,
    turns: 156,
    mix: [8, 22, 70],
    tier: "C",
    handoffPct: 59,
    priceDecisionPct: 34,
    needsPerson: "Waivers, refunds and honouring earlier promises",
    example: "I was promised a credit in December and it never arrived.",
  },
  {
    key: "tenancy",
    label: "House move / new holder",
    share: 5.7,
    calls: 321,
    turns: 141,
    mix: [21, 68, 11],
    tier: "B",
    handoffPct: 47,
    priceDecisionPct: 8,
    needsPerson: "Tenancy papers, or consent from the account holder",
    example: "I'm moving to Kilkenny. Can I bring my bins with me?",
  },
  {
    key: "cancel_switch",
    label: "Cancel to switch provider",
    share: 5.6,
    calls: 316,
    turns: 131,
    mix: [17, 4, 79],
    tier: "C",
    handoffPct: 75,
    priceDecisionPct: 54,
    needsPerson: "Save offers: price-matches, free months, credits",
    example: "Another company quoted me €25 a month. I want to cancel.",
  },
  {
    key: "admin",
    label: "Balance, bill & direct debit",
    share: 5.5,
    calls: 309,
    turns: 75,
    mix: [60, 35, 5],
    tier: "A",
    handoffPct: 23,
    priceDecisionPct: 4,
    needsPerson: "A plan change or a system correction by another team",
    example: "My direct debit bounced. Can I give you new bank details?",
  },
  {
    key: "delivery",
    label: "New-customer bin delivery",
    share: 3.1,
    calls: 176,
    turns: 73,
    mix: [44, 52, 4],
    tier: "B",
    handoffPct: 3,
    priceDecisionPct: 3,
    needsPerson: "Operations confirming a delivery date the agent can't see",
    example: "I signed up last week. When are my bins arriving?",
  },
  {
    key: "missed",
    label: "Missed collection",
    share: 2.5,
    calls: 141,
    turns: 91,
    mix: [11, 62, 27],
    tier: "B",
    handoffPct: 38,
    priceDecisionPct: 6,
    needsPerson: "Emergency lifts and operations checks the agent can't see",
    example: "The green bin was out by six and it wasn't emptied.",
  },
  {
    key: "returned_call",
    label: "Returned missed call",
    share: 2.2,
    calls: 127,
    turns: 31,
    mix: [67, 33, 0],
    tier: "A",
    handoffPct: 2,
    priceDecisionPct: 0,
    needsPerson: "A named colleague's callback, when the reason isn't logged",
    example: "Someone from Panda rang me earlier. What was it about?",
  },
  {
    key: "bereavement",
    label: "Bereavement",
    share: 2.1,
    calls: 120,
    turns: 159,
    mix: [3, 78, 19],
    tier: "B",
    handoffPct: 67,
    priceDecisionPct: 14,
    needsPerson: "Death verification and transfer to the surviving holder",
    example: "My mother passed away. The account needs to move to my name.",
  },
  {
    key: "binchange",
    label: "Bin repair, swap or removal",
    share: 1.3,
    calls: 71,
    turns: 87,
    mix: [20, 72, 8],
    tier: "B",
    handoffPct: 25,
    priceDecisionPct: 3,
    needsPerson: "Operations scheduling the swap or removal",
    example: "The lid on the brown bin has snapped off.",
  },
];

export const tiers: {
  tier: Tier;
  pct: number;
  calls: number;
  title: string;
  body: string;
  includes: string[];
  review?: string;
}[] = [
  {
    tier: "A",
    pct: 40,
    calls: 2253,
    title: "Voice AI contains it end to end",
    body: "",
    includes: [
      "Price quotes and coverage",
      "Closing an account",
      "New household sign-ups",
      "Card payments and arrears",
      "Balance, bills and direct debit",
      "Returned calls",
    ],
  },
  {
    tier: "B",
    pct: 21,
    calls: 1215,
    title: "AI takes the intake and the standard case",
    body: "The AI runs the standard steps and one part goes to a person: an operations booking it can't see, paperwork, consent, or a bereaved caller.",
    includes: [
      "House moves and new holders",
      "New-customer bin delivery",
      "Missed collections",
      "Bereavement",
      "Bin repairs and swaps",
    ],
  },
  {
    tier: "C",
    pct: 39,
    calls: 2189,
    title: "Agent intake, then human-led",
    body: "The AI verifies the caller and gathers the account, usage and contract end date, then a person makes the call on rates, credits, price-matches and save offers. 63% of these calls ended with one.",
    review:
      "Provisional. How much of Tier C is a genuine price decision, and how much the agent could resolve itself, is open for review. We will work through where each intent sits with Panda once we have full data and API access.",
    includes: [
      "Plan and price reviews",
      "Disputes, refunds and complaints",
      "Cancelling to switch provider",
      "Free months to win a prospect",
    ],
  },
];

export const scenarios = {
  Conservative: {
    contained: 28,
    containedCalls: 1564,
    assisted: 56,
    assistedCalls: 3140,
    note: "Floor case. Assumes voice friction, imperfect authentication and cautious escalation thresholds.",
  },
  Base: {
    contained: 39,
    containedCalls: 2227,
    assisted: 63,
    assistedCalls: 3544,
    note: "The planning figure, given how much of the work follows a fixed rule and how often the same ID check opens the call.",
  },
  Optimistic: {
    contained: 49,
    containedCalls: 2796,
    assisted: 79,
    assistedCalls: 4453,
    note: "Assumes clean system access, mature AOPs and time spent tuning against your own call log.",
  },
} as const;

export type ScenarioName = keyof typeof scenarios;

// Recording of Chelsea talking to a Panda AI agent. Fill in the transcript to
// show the "Show transcript" toggle.
export const chelseaCall = {
  src: "/audio/chelsea-panda-agent.m4a",
  durationS: 97,
  transcript: [] as { speaker: "Chelsea" | "Agent"; text: string }[],
};
