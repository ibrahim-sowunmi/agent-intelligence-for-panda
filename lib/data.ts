// Every figure on the site comes from two samples of Panda's own calls:
// the Talkdesk transcript export (2 Jan to 4 Feb 2026, 6,738 calls) and the
// call recordings (13 to 15 Oct 2026, 2,991 calls). Every inbound call in both
// was read in full; 400 Jan-Feb calls and 160 October calls were read a second
// time by a stronger model to check the tiering. Process and tier figures below
// combine both samples from their call counts.

import { october } from "./october";

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

// Jan-Feb reading only. The combined figures are `read` further down.
export const readJan = {
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

// Jan-Feb sample, as read from the Talkdesk transcripts.
export const processesJan: Process[] = [
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

// Jan-Feb sample only.
export const tiersJan = [
  { tier: "A" as Tier, pct: 40, calls: 2253 },
  { tier: "B" as Tier, pct: 21, calls: 1215 },
  { tier: "C" as Tier, pct: 39, calls: 2189 },
];

const TIER_COPY: {
  tier: Tier;
  title: string;
  body: string;
  extra?: string[];
  review?: string;
}[] = [
  {
    tier: "A",
    title: "Voice AI contains it end to end",
    body: "",
  },
  {
    tier: "B",
    title: "AI takes the intake and the standard case",
    body: "The AI runs the standard steps and one part goes to a person: an operations check or booking it can't see, paperwork, consent, or a bereaved caller.",
  },
  {
    tier: "C",
    title: "Agent intake, then human-led",
    body: "The AI verifies the caller and gathers the account, usage and contract end date, then a person makes the call on rates, credits, price-matches and save offers.",
    extra: ["Free months to win a prospect"],
    review:
      "Provisional. How much of Tier C is a genuine price decision, and how much the agent could resolve itself, is open for review. We will work through where each intent sits with Panda once we have full data and API access.",
  },
];

// ---- Combined: Jan-Feb transcripts + October recordings -------------------

type OctProcess = { calls: number; A: number; B: number; C: number; priceDecision: number; transferred: number; medianSecs: number };
const octProc = october.counts.processes as Record<string, OctProcess>;
const oct = october.counts;

// Round percentages so they still add to 100.
function roundTo100(values: number[]) {
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const raw = values.map((v) => (v / total) * 100);
  const out = raw.map(Math.floor);
  let left = 100 - out.reduce((a, b) => a + b, 0);
  raw
    .map((v, i) => [v - Math.floor(v), i] as const)
    .sort((a, b) => b[0] - a[0])
    .forEach(([, i]) => {
      if (left > 0) { out[i] += 1; left -= 1; }
    });
  return out;
}

const withRequest = readJan.withRequest + oct.inboundReal;
const TIERS: Tier[] = ["A", "B", "C"];

export type CombinedProcess = Process & { callsJan: number; callsOct: number; medianMinOct: number };

export const processes: CombinedProcess[] = processesJan
  .map((p) => {
    const o = octProc[p.key] ?? { calls: 0, A: 0, B: 0, C: 0, priceDecision: 0, transferred: 0, medianSecs: 0 };
    const calls = p.calls + o.calls;
    const counts = TIERS.map((t, i) => (p.calls * p.mix[i]) / 100 + o[t]);
    const mix = roundTo100(counts) as [number, number, number];
    return {
      ...p,
      calls,
      callsJan: p.calls,
      callsOct: o.calls,
      share: Math.round((calls / withRequest) * 1000) / 10,
      mix,
      tier: TIERS[counts.indexOf(Math.max(...counts))],
      handoffPct: Math.round(((p.calls * p.handoffPct) / 100 + o.transferred) / calls * 100),
      priceDecisionPct: Math.round(((p.calls * p.priceDecisionPct) / 100 + o.priceDecision) / calls * 100),
      medianMinOct: Math.round(o.medianSecs / 6) / 10,
    };
  })
  .sort((a, b) => b.share - a.share);

const tierCalls = Object.fromEntries(tiersJan.map((t) => [t.tier, t.calls + oct.tier[t.tier]])) as Record<Tier, number>;
const tierPct = roundTo100(TIERS.map((t) => tierCalls[t]));

const INCLUDE: Record<string, string> = {
  price_review: "Plan and price reviews",
  quote: "Price quotes and coverage",
  cancel_move: "Closing an account",
  signup: "New household sign-ups",
  pay: "Card payments and arrears",
  billing_dispute: "Disputes, refunds and complaints",
  tenancy: "House moves and new holders",
  cancel_switch: "Cancelling to switch provider",
  admin: "Balance, bills and direct debit",
  delivery: "New-customer bin delivery",
  missed: "Missed collections",
  returned_call: "Returned calls",
  bereavement: "Bereavement",
  binchange: "Bin repairs and swaps",
};

const priceKeys = ["price_review", "cancel_switch"];
const priceOct = priceKeys.map((k) => octProc[k]).filter(Boolean);
const priceConversations = Math.round(readJan.priceConversations + priceOct.reduce((a, o) => a + o.calls, 0));
const priceHandedOff =
  (readJan.priceConversations * readJan.priceHandedOffPct) / 100 + priceOct.reduce((a, o) => a + o.transferred, 0);

export const read = {
  withRequest,
  withRequestJan: readJan.withRequest,
  withRequestOct: oct.inboundReal,
  secondRead: readJan.secondRead + 160,
  secondReadJan: readJan.secondRead,
  secondReadOct: 160,
  processAgreementPct: readJan.processAgreementPct,
  priceConversations,
  priceConversationsPct: Math.round((priceConversations / withRequest) * 100),
  priceStartedElsewherePct: readJan.priceStartedElsewherePct, // Jan-Feb only
  priceHandedOffPct: Math.round((priceHandedOff / priceConversations) * 100),
  topFivePct: Math.round(processes.slice(0, 5).reduce((a, p) => a + p.share, 0)),
  priceDecisionInTierCPct: Math.round(
    (((readJan.priceDecisionInTierCPct / 100) * tiersJan[2].calls + oct.tierCPriceDecision) / tierCalls.C) * 100,
  ),
  // Long tail: business enquiries (0.1% of Jan-Feb, plus October's commercial calls).
  businessPct:
    Math.round(((readJan.withRequest * 0.001 + oct.inboundReal - Object.values(octProc).reduce((a, o) => a + o.calls, 0)) / withRequest) * 1000) / 10,
};

export const tiers: {
  tier: Tier;
  pct: number;
  calls: number;
  title: string;
  body: string;
  includes: string[];
  review?: string;
}[] = TIER_COPY.map((t, i) => ({
  tier: t.tier,
  pct: tierPct[i],
  calls: tierCalls[t.tier],
  title: t.title,
  body: t.tier === "C" ? `${t.body} ${read.priceDecisionInTierCPct}% of these calls ended with one.` : t.body,
  includes: [...processes.filter((p) => p.tier === t.tier).map((p) => INCLUDE[p.key]), ...(t.extra ?? [])],
  review: t.review,
}));

// Containment coefficients per tier: [Tier A, Tier B, Tier C].
const COEFF = {
  Conservative: { contained: [0.6, 0.175, 0], assisted: [1, 0.73, 0] },
  Base: { contained: [0.8, 0.35, 0], assisted: [1, 1, 0.035] },
  Optimistic: { contained: [0.95, 0.54, 0], assisted: [1, 1, 0.45] },
};
const NOTES = {
  Conservative: "Floor case. Assumes voice friction, imperfect authentication and cautious escalation thresholds.",
  Base: "The planning figure, given how much of the work follows a fixed rule and how often the same ID check opens the call.",
  Optimistic: "Assumes clean system access, mature AOPs and time spent tuning against your own call log.",
};
const apply = (c: number[]) => TIERS.reduce((a, t, i) => a + tierCalls[t] * c[i], 0);
export const scenarios = Object.fromEntries(
  (Object.keys(COEFF) as (keyof typeof COEFF)[]).map((name) => {
    const containedCalls = Math.round(apply(COEFF[name].contained));
    const assistedCalls = Math.round(apply(COEFF[name].assisted));
    return [
      name,
      {
        contained: Math.round((containedCalls / withRequest) * 100),
        containedCalls,
        assisted: Math.round((assistedCalls / withRequest) * 100),
        assistedCalls,
        note: NOTES[name],
      },
    ];
  }),
) as Record<keyof typeof COEFF, { contained: number; containedCalls: number; assisted: number; assistedCalls: number; note: string }>;

// Both samples, inbound: share passed to a second agent. Jan-Feb from Talkdesk agent
// changes; October counted by person from the recordings.
export const passedToSecondAgentPct = Math.round(
  (((measured.passedToSecondAgentPct / 100) * measured.inbound + oct.inboundRealTransferred) / (measured.inbound + oct.inboundAll)) * 100,
);

export type ScenarioName = keyof typeof scenarios;

// Recording of Chelsea talking to a Panda AI agent, with the cleaned transcript.
export const chelseaCall = {
  src: "/audio/chelsea-panda-agent.m4a",
  durationS: 97,
  transcript: [
    { speaker: "Agent", text: "Hi there, how can I help you today?" },
    { speaker: "Chelsea", text: "Hi, I'm wondering what I can put in my recycling bin." },
    { speaker: "Agent", text: "For dry mixed recycling, you can put clean, dry recyclables like plastic, glass, paper, cardboard, metals, cans, tins, foil, cartons, and Tetra Paks." },
    { speaker: "Chelsea", text: "Okay, thanks. And what can't go into the bin?" },
    { speaker: "Agent", text: "For your general waste bin, items that can't be recycled like plastics, polystyrene, floor sweepings, and packaging shouldn't go in there." },
    { speaker: "Chelsea", text: "Um, what about tree branches?" },
    { speaker: "Agent", text: "I don't have specific info on tree branches for the recycling bin, but if you're doing a garden project, you can put garden waste in one of our skips." },
    { speaker: "Chelsea", text: "Okay, what about my compost bin?" },
    { speaker: "Agent", text: "I don't have specific information about compost bins in our system. Are you asking about a Panda-provided compost bin, or is this a general question?" },
    { speaker: "Chelsea", text: "A general question." },
    { speaker: "Agent", text: "I can only help with questions about Panda Recycling's services and bins, so I wouldn't be able to advise on general composting. Is there anything else about our waste or recycling services I can help with?" },
    { speaker: "Chelsea", text: "What time can you collect the bin?" },
    { speaker: "Agent", text: "I can look into that for you. Could you give me your Panda account number or your business postcode so I can find your account?" },
  ] as { speaker: "Chelsea" | "Agent"; text: string }[],
};
