# Wikipedia-Table-Scraper
Wikipedia Table Scraper using Node.js and Cheerio

This repository contains a Node.js script that scrapes data from Wikipedia tables. It uses Axios to fetch the HTML content and Cheerio to parse the structure. Currently, it targets episode tables (`.wikiepisodetable`) and extracts episode titles from the summary cells (`.summary`).

**Features:**

- Leverages Axios for making HTTP requests
- Utilizes Cheerio for HTML parsing
- Extracts table data efficiently
- Handles errors gracefully

**Usage:**

1. Install dependencies: `npm install axios cheerio`
2. Replace the placeholder URL (`https://en.wikipedia.org/wiki/`) with the desired Wikipedia page. ex
3. Run the script: `node wikipedia-table-scraper.js`

**Feel free to adapt and extend this description based on your specific scraping goals.**

