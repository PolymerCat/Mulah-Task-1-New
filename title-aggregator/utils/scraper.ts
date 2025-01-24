import * as cheerio from "cheerio";

export async function scrapeHeadlines(): Promise<{ title: string; link: string }[]> {
    const url = "https://api.scraperapi.com/?api_key=YOUR_API_KEY&url=https://www.theverge.com";


  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });

  const html = await response.text();
  console.log(html); // Log the raw HTML response

  const $ = cheerio.load(html);
  const articles: { title: string; link: string }[] = [];

  $(".c-entry-box--compact__title a").each((_, el) => {
    const title = $(el).text();
    const link = $(el).attr("href") || "";
    articles.push({ title, link });
  });

  return articles;
}
