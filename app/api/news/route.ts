import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser({ timeout: 10000 });

const NEWS_SOURCES = [
  // Cybersecurity & Tech Africa
  { url: "https://www.itnewsafrica.com/feed/", name: "IT News Africa", category: "tech" },
  { url: "https://techcabal.com/feed/", name: "TechCabal", category: "tech" },
  { url: "https://disrupt-africa.com/feed/", name: "Disrupt Africa", category: "startups" },
  // AI & Innovation
  { url: "https://venturebeat.com/category/ai/feed/", name: "VentureBeat AI", category: "ai" },
  // Humanitarian & Africa
  { url: "https://reliefweb.int/updates/rss.xml", name: "ReliefWeb", category: "emergencies" },
  { url: "https://africanarguments.org/feed/", name: "African Arguments", category: "africa" },
  // Education & Youth
  { url: "https://www.opportunitiesforafricans.com/feed/", name: "Opportunities for Africans", category: "opportunities" },
  { url: "https://opportunitydesk.org/feed/", name: "Opportunity Desk", category: "opportunities" },
];

const DOMAIN_KEYWORDS: Record<string, string[]> = {
  cybersecurity: ["cybersecurity", "cyber", "hacking", "data breach", "ransomware", "malware", "security", "infosec", "vulnerability", "encryption", "phishing"],
  ai: ["artificial intelligence", "machine learning", "deep learning", "ai ", "gpt", "llm", "neural", "automation", "chatbot", "algorithm"],
  emergencies: ["crisis", "emergency", "disaster", "flood", "drought", "conflict", "humanitarian", "refugee", "displacement", "famine", "epidemic", "cholera", "ebola"],
  education: ["scholarship", "education", "university", "training", "fellowship", "grant", "mooc", "certification", "students", "learning"],
  youth: ["youth", "young", "startup", "entrepreneur", "innovation", "hackathon", "incubator", "accelerator"],
  africa: ["africa", "african", "nigeria", "kenya", "south africa", "ghana", "ethiopia", "tanzania", "rwanda", "senegal", "cameroon", "congo", "morocco", "egypt", "tunisia", "algeria"],
};

interface NewsItem {
  title: string;
  link: string;
  source: string;
  date: string;
  description: string;
  domains: string[];
  category: string;
}

function cleanHTML(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, " ").trim().slice(0, 250);
}

function detectDomains(text: string): string[] {
  const lower = text.toLowerCase();
  const detected: string[] = [];
  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      detected.push(domain);
    }
  }
  return detected;
}

let cachedNews: { items: NewsItem[]; lastFetch: number } | null = null;
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours

async function fetchNews(): Promise<NewsItem[]> {
  if (cachedNews && Date.now() - cachedNews.lastFetch < CACHE_DURATION) {
    return cachedNews.items;
  }

  const allNews: NewsItem[] = [];

  for (const source of NEWS_SOURCES) {
    try {
      const feed = await parser.parseURL(source.url);
      for (const item of (feed.items || []).slice(0, 15)) {
        const title = item.title || "";
        const desc = cleanHTML(item.contentSnippet || item.description || item.content || "");
        const domains = detectDomains(`${title} ${desc}`);

        if (domains.length > 0) {
          allNews.push({
            title: title.trim(),
            link: item.link || "",
            source: source.name,
            date: item.pubDate ? new Date(item.pubDate).toISOString() : "",
            description: desc,
            domains,
            category: source.category,
          });
        }
      }
    } catch (error) {
      console.error(`Error fetching ${source.name}:`, error);
    }
  }

  allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const unique = allNews.filter(
    (item, index, self) => index === self.findIndex((t) => t.title.toLowerCase() === item.title.toLowerCase())
  );

  cachedNews = { items: unique.slice(0, 100), lastFetch: Date.now() };
  return cachedNews.items;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  try {
    let news = await fetchNews();
    if (domain && domain !== "all") {
      news = news.filter((n) => n.domains.includes(domain));
    }
    return NextResponse.json({ count: news.length, lastUpdated: new Date().toISOString(), news: news.slice(0, 50) });
  } catch {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}