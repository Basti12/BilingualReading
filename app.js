const { PDFLesen, getTextProSeite } = require('./PDFLeser.js');
const { translateText } = require('./translate.js');
const { createPDF } = require('./createPDF.js');

async function processPDF() {
    try {
        await PDFLesen('./example.pdf');
        const textProSeite = getTextProSeite();

        // Assuming createPDF is adapted to handle an array of {original, translation} objects
        let bilingualPages = [];

        for (let pageText of textProSeite) {
            const translatedText = await translateText(pageText, "EN"); // Ensure this returns the translated text
            bilingualPages.push({
                original: pageText,
                translation: translatedText
            });
        }

        // Create a bilingual PDF with the structured content
        createPDF(bilingualPages);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}


processPDF();
