import type { NextApiRequest, NextApiResponse } from "next";
import { scrapeHeadlines } from "../../utils/scraper";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const articles = await scrapeHeadlines();
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
}
