// app/home/page.tsx
'use client'
import { useEffect, useState } from 'react';

const Home = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the articles from the API
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/scrape');
        if (!response.ok) {
          throw new Error(`Error fetching articles: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data);
      } catch (error: any) {
        setError(error.message);
        console.error('Error:', error);
      }
    };

    fetchArticles();
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <h1>Headlines</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
