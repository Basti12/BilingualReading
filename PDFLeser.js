const fs = require('fs');
const pdf = require('pdf-parse');

let textProSeite = [];

// PDF-Datei lesen
function PDFLesen(PDFFile) {
    return new Promise((resolve, reject) => {
        let dataBuffer = fs.readFileSync(PDFFile);

        pdf(dataBuffer).then(async function (data) {
            console.log(`Gesamtseiten: ${data.numpages}`);
            // Use a loop to handle async operations in sequence
            for (let i = 1; i <= data.numpages; i++) {
                try {
                    // Wait for the text of each page to be retrieved before continuing
                    let pageData = await pdf(dataBuffer, { max: i, min: i });
                    textProSeite.push(pageData.text);
                } catch (error) {
                    console.error(`Fehler beim Lesen der Seite ${i}:`, error);
                    reject(error); // Reject the promise if an error occurs
                    return;
                }
            }
            resolve(); // Resolve the promise when all pages have been processed
        }).catch(function (error) {
            // Fehlerbehandlung
            console.error(error);
            reject(error);
        });
    });
}

module.exports = {
    PDFLesen,
    getTextProSeite: () => textProSeite // Export a getter function for textProSeite
};
