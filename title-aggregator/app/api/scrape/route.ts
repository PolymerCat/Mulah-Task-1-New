// app/api/scrape/route.ts
import puppeteer from 'puppeteer';

export async function GET() {
  try {
    console.log('API call received'); // Add this log to confirm the route is being hit

    const browser = await puppeteer.launch({ headless: true }); // For faster scraping, set headless to true
    const page = await browser.newPage();

    // Navigate to the website and wait for the DOM to load
    await page.goto('https://www.theverge.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000, // Increased timeout to 60 seconds
    });

    // Wait for the headlines to be visible on the page
    await page.waitForSelector('article h2', {
      timeout: 60000, // Increased timeout to 60 seconds
    });

    // Scrape the headlines from the page
    const headlines = await page.evaluate(() => {
      const articles = Array.from(document.querySelectorAll('article h2'));
      if (articles.length === 0) {
        throw new Error('No articles found on the page');
      }
      return articles.map((article) => ({
        title: article.textContent?.trim() || 'No title',
        link: article.closest('a')?.href || '',
      }));
    });

    console.log('Scraped headlines:', headlines); // Log the scraped headlines to ensure data is extracted

    await browser.close();

    return new Response(JSON.stringify(headlines), { status: 200 });
  } catch (error) {
    console.error('Error scraping:', error); // Log the error
    return new Response('Error scraping data: ' + error.message, { status: 500 });
  }
}
