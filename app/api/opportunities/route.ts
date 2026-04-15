import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser({ timeout: 10000 });

const OPPORTUNITY_SOURCES = [
  { url: "https://www.opportunitiesforafricans.com/feed/", name: "Opportunities for Africans" },
  { url: "https://opportunitydesk.org/feed/", name: "Opportunity Desk" },
  { url: "https://www.scholars4dev.com/feed/", name: "Scholars4Dev" },
];

const TRAINING_KEYWORDS = [
  "training", "formation", "workshop", "atelier", "webinar", "séminaire",
  "seminar", "conference", "conférence", "bootcamp", "course", "cours",
  "program", "programme", "certification", "certificate", "free",
  "gratuit", "online", "virtual", "summit", "forum", "hackathon",
  "competition", "concours", "call for", "apply", "application",
  "fellowship", "internship", "stage", "volunteer", "exchange",
  "accelerator", "incubator",
];

const EXCLUDE = ["expired", "closed", "deadline passed"];

interface Opportunity {
  title: string;
  link: string;
  source: string;
  date: string;
  description: string;
  type: string;
}

function cleanHTML(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim().slice(0, 300);
}

function detectType(text: string): string {
  const lower = text.toLowerCase();
  if (["conference", "conférence", "summit", "forum"].some((k) => lower.includes(k))) return "conference";
  if (["training", "formation", "bootcamp", "course", "cours"].some((k) => lower.includes(k))) return "training";
  if (["seminar", "séminaire", "webinar", "workshop", "atelier"].some((k) => lower.includes(k))) return "seminar";
  if (["hackathon", "competition", "concours", "challenge"].some((k) => lower.includes(k))) return "competition";
  if (["fellowship", "internship", "stage", "exchange"].some((k) => lower.includes(k))) return "fellowship";
  if (["accelerator", "incubator"].some((k) => lower.includes(k))) return "incubator";
  return "opportunity";
}

function isOpportunity(title: string, desc: string): boolean {
  const text = `${title} ${desc}`.toLowerCase();
  const has = TRAINING_KEYWORDS.some((kw) => text.includes(kw));
  const excluded = EXCLUDE.some((kw) => text.includes(kw));
  return has && !excluded;
}

let cached: { items: Opportunity[]; lastFetch: number } | null = null;
const CACHE = 12 * 60 * 60 * 1000;

async function fetchOpportunities(): Promise<Opportunity[]> {
  if (cached && Date.now() - cached.lastFetch < CACHE) return cached.items;

  const all: Opportunity[] = [];

  for (const source of OPPORTUNITY_SOURCES) {
    try {
      const feed = await parser.parseURL(source.url);
      for (const item of (feed.items || []).slice(0, 20)) {
        const title = item.title || "";
        const desc = cleanHTML(item.contentSnippet || item.description || "");
        if (isOpportunity(title, desc)) {
          all.push({
            title: title.trim(),
            link: item.link || "",
            source: source.name,
            date: item.pubDate ? new Date(item.pubDate).toISOString() : "",
            description: desc,
            type: detectType(`${title} ${desc}`),
          });
        }
      }
    } catch (error) {
      console.error(`Error fetching ${source.name}:`, error);
    }
  }

  all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const unique = all.filter((item, i, self) => i === self.findIndex((t) => t.title.toLowerCase() === item.title.toLowerCase()));
  cached = { items: unique.slice(0, 80), lastFetch: Date.now() };
  return cached.items;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    let opps = await fetchOpportunities();
    if (type && type !== "all") opps = opps.filter((o) => o.type === type);
    return NextResponse.json({ count: opps.length, lastUpdated: new Date().toISOString(), opportunities: opps.slice(0, 40) });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}