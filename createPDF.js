const PDFDocument = require('pdfkit');
const fs = require('fs');

function createPDF(bilingualPages) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('bilingual.pdf'));

    bilingualPages.forEach((page, index) => {
        // Check if it's not the first page, then add a new page
        if (index > 0) {
            doc.addPage();
        }

        // Add original text
        doc.fontSize(12).text('Original:', {
            underline: true
        }).moveDown(0.5);
        doc.fontSize(10).text(page.original).moveDown(1);

        // Add a page break for the translation
        doc.addPage();

        // Add translated text
        doc.fontSize(12).text('Translation:', {
            underline: true
        }).moveDown(0.5);
        doc.fontSize(10).text(page.translation);

        // If it's not the last page, add another new page as a separator
        if (index < bilingualPages.length - 1) {
            doc.addPage();
        }
    });

    // Finalize the PDF and end the stream
    doc.end();
}

module.exports = { createPDF };
