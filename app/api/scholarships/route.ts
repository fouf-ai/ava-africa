import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser({
  timeout: 10000,
  customFields: {
    item: ["description", "content:encoded", "pubDate"],
  },
});

const RSS_SOURCES = [
  {
    url: "https://www.opportunitiesforafricans.com/feed/",
    name: "Opportunities for Africans",
    category: "general",
  },
  {
    url: "https://opportunitydesk.org/feed/",
    name: "Opportunity Desk",
    category: "general",
  },
  {
    url: "https://www.scholars4dev.com/feed/",
    name: "Scholars4Dev",
    category: "scholarships",
  },
];

const SCHOLARSHIP_KEYWORDS = [
  "scholarship", "bourse", "fellowship", "grant", "funding",
  "funded", "tuition", "stipend", "award", "منحة",
  "fully funded", "partial", "master", "phd", "bachelor",
  "undergraduate", "graduate", "postgraduate", "doctoral",
];

const EXCLUDE_KEYWORDS = [
  "expired", "closed", "deadline passed",
];

interface Scholarship {
  title: string;
  link: string;
  source: string;
  date: string;
  description: string;
  category: string;
}

function isScholarship(title: string, description: string): boolean {
  const text = `${title} ${description}`.toLowerCase();
  const hasKeyword = SCHOLARSHIP_KEYWORDS.some((kw) => text.includes(kw));
  const isExcluded = EXCLUDE_KEYWORDS.some((kw) => text.includes(kw));
  return hasKeyword && !isExcluded;
}

function cleanDescription(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 300);
}

function extractDeadline(text: string): string | null {
  const patterns = [
    /deadline[:\s]*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i,
    /deadline[:\s]*(\d{1,2}\s+[A-Za-z]+\s+\d{4})/i,
    /closes?[:\s]*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i,
    /due[:\s]*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i,
    /apply by[:\s]*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return null;
}

let cachedData: { scholarships: Scholarship[]; lastFetch: number } | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

async function fetchScholarships(): Promise<Scholarship[]> {
  if (cachedData && Date.now() - cachedData.lastFetch < CACHE_DURATION) {
    return cachedData.scholarships;
  }

  const allScholarships: Scholarship[] = [];

  for (const source of RSS_SOURCES) {
    try {
      const feed = await parser.parseURL(source.url);
      for (const item of feed.items || []) {
        const title = item.title || "";
        const description = item["content:encoded"] || item.description || item.contentSnippet || "";
        const cleanDesc = cleanDescription(description);

        if (isScholarship(title, cleanDesc)) {
          const deadline = extractDeadline(cleanDesc);

          allScholarships.push({
            title: title.trim(),
            link: item.link || "",
            source: source.name,
            date: deadline || (item.pubDate ? new Date(item.pubDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""),
            description: cleanDesc,
            category: source.category,
          });
        }
      }
    } catch (error) {
      console.error(`Error fetching ${source.name}:`, error);
    }
  }

  // Sort by most recent first
  allScholarships.sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    return dateB - dateA;
  });

  // Remove duplicates by title similarity
  const unique = allScholarships.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.title.toLowerCase() === item.title.toLowerCase())
  );

  // Cache the results
  cachedData = { scholarships: unique.slice(0, 50), lastFetch: Date.now() };

  return cachedData.scholarships;
}

export async function GET() {
  try {
    const scholarships = await fetchScholarships();
    return NextResponse.json({
      count: scholarships.length,
      lastUpdated: new Date().toISOString(),
      scholarships,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch scholarships" },
      { status: 500 }
    );
  }
}