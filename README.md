# Wikipedia Table Scraper

## Overview

This repository contains a Node.js script that scrapes data from Wikipedia tables. It utilizes Axios for making HTTP requests, Cheerio for HTML parsing, and Moment for timestamp creation.

---

## Features

- **HTTP Requests:** Uses Axios for efficient HTTP requests.
- **HTML Parsing:** Utilizes Cheerio for parsing HTML structure.
- **Data Extraction:** Extracts data from episode tables on Wikipedia pages.
- **Error Handling:** Handles errors gracefully for a smooth scraping experience.

---

## Usage

1. Clone the Repository
    ```bash
    git clone https://github.com/Afadfath03/Wikipedia-Table-Scraper.git
    ```
2. Navigate to the Project Directory
    ```bash
    cd Wikipedia-Table-Scraper
    ```
4. Run the Script
    ```bash
    node wiki-table-scraper.js
    ```
5. Enter Wikipedia URL (e.g., https://en.wikipedia.org/wiki/List_of_XX_episodes)
6. Choose Output Format (JSON or TXT)