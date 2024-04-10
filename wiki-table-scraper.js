const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWikipediaTable(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const table = $('table.wikiepisodetable');

        const tableData = [];
        table.find('tr.module-episode-list-row').each(function (index) {
            const rowData = [];
            const titleElement = $(this).find('td.summary').contents().filter(function () {
                return this.nodeType === 3;
            }).first();
            rowData.push(titleElement.text().trim());
            tableData.push(rowData);
        });

        return tableData.map(row => row[0]);
    } catch (error) {
        console.error('Error scraping data:', error);
    }
}

// URL of the Wikipedia page to scrape
const wikiUrl = 'https://en.wikipedia.org/wiki/';

scrapeWikipediaTable(wikiUrl)
    .then(data => {
        console.log('Extracted table data:', data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });