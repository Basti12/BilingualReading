const { PDFLesen, getTextProSeite } = require('./PDFLeser.js');
const { translateText } = require('./translate.js');
const { createPDF } = require('./createPDF.js');

async function processPDF() {
    try {
        await PDFLesen('./example.pdf');
        const textProSeite = getTextProSeite();
        console.log(textProSeite); // Ensure this logs the expected text

        // Translate all pages and wait for all to complete
        const translatedTexts = await Promise.all(textProSeite.map(pageText => {
            // Assuming translateText now properly returns a promise
            return translateText(pageText, "EN");
        }));

        // After all translations are done, create a PDF with the translated text
        createPDF(translatedTexts.join("\n")); // Example of combining texts, adjust as needed
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

processPDF();
