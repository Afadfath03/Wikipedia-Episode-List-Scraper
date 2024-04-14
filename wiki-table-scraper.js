const fs = require("fs"); // file system access
const path = require("path"); // path manipulation
const axios = require("axios"); // making HTTP requests
const cheerio = require("cheerio"); // parsing HTML
const moment = require("moment"); // making timestamp

const timestamp = moment().format("YYYY-MM-DD_HH-mm-ss"); // Formatted timestamp

function getUserInput() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    readline.question(
      "\nEnter the Wikipedia URL to scrape (e.g., https://en.wikipedia.org/wiki/List_of_XX_episodes) \n : ",
      (wikiUrl) => {
        readline.close();
        resolve(wikiUrl); // Resolve the promise with the URL
      }
    );
  });
}

function getDesiredFormat() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    readline.question(
      "\nAvailable file format: \n1. JSON \n2. TXT (Numbered List) \n3. TXT (Unnumbered List) \nChoose file format : ",
      (formatChoice) => {
        readline.close();

        const validFormats = {1: "JSON", 2: "TXTN", 3: "TXTU" };
        const chosenFormat = validFormats[parseInt(formatChoice)];

        if (!chosenFormat) {
          reject(new Error("Invalid format. Please choose available format."));
        } else {
          resolve(chosenFormat);
        }
      }
    );
  });
}

async function scrapeWikipediaTable(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const table = $("table.wikitable");

    // Get the titles
    const episodeTitles = [];
    table.find("tr.module-episode-list-row").each(function (index) {
      const titleElement = $(this).find("td.summary");
      const titleText = titleElement.text().trim();

      const transliterationIndex = titleText
        .toLowerCase()
        .indexOf("transliteration:");

      let episodeTitle;
      if (transliterationIndex !== -1) {
        episodeTitle = titleText.substring(0, transliterationIndex).trim();
      } else {
        episodeTitle = titleText;
      }

      episodeTitles.push(episodeTitle);
    });

    return episodeTitles;
  } catch (error) {
    console.error("Error scraping data:", error);
  }
}

function createResultFolder(folderPath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(folderPath, { recursive: true }); // Create folder recursively if needed
    resolve(folderPath); // Resolve the promise with the folder path
  });
}

function createNumberedListFile(filePath, list) {
  const fs = require("fs");
  return new Promise((resolve, reject) => {
    const content = list
      .map((item, index) => `${index + 1}. ${item}`)
      .join("\n");
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`\nTXT file saved to ${filePath}`);
        resolve();
      }
    });
  });
}

function createUnNumberedListFile(filePath, list) {
  const fs = require("fs");
  return new Promise((resolve, reject) => {
    const content = list.join("\n");
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`\nTXT file saved to ${filePath}`);
        resolve();
      }
    });
  });
}


function createJSONFile(filePath, jsonData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        reject(err); // Reject the promise with error
      } else {
        console.log(`\nJSON file Saved to ${filePath}`);
        resolve(); // Resolve the promise on success
      }
    });
  });
}

async function main() {
  try {
    const wikiUrl = await getUserInput();
    const resultFolderPath = path.join(__dirname, "Result");
    await createResultFolder(resultFolderPath); // Ensure folder exists

    const episodeTitles = await scrapeWikipediaTable(wikiUrl);
    let episodeData;

    const desiredFormat = await getDesiredFormat();
    let writeFunction;
    let fileName;

    if (desiredFormat === "JSON") {
      fileName = `episode_titles_${timestamp}.json`;
      episodeData = JSON.stringify(episodeTitles, null, 2); // Convert to JSON string
      writeFunction = createJSONFile;
    } else if (desiredFormat === "TXTU") {
      fileName = `episode_titles_${timestamp}.txt`;
      episodeData = episodeTitles;
      writeFunction = createUnNumberedListFile;
    } else if (desiredFormat === "TXTN") {
      fileName = `episode_titles_${timestamp}.txt`;
      episodeData = episodeTitles;
      writeFunction = createNumberedListFile;
    } else{
      console.error("Invalid format. Please choose available format.");
    }

    await writeFunction(path.join(resultFolderPath, fileName), episodeData); // Use appropriate function based on user choice
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
