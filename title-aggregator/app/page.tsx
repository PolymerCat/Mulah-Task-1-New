'use client'
import type { NextApiRequest, NextApiResponse } from "next";
import { scrapeHeadlines } from "../../utils/scraper";

import { useEffect, useState } from "react";

interface Article {
  title: string;
  link: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("title-aggregator/app/api/articles.ts")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Title Aggregator</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index} className="mb-4">
            <a
              href={article.link}
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
