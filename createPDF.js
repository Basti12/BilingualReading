const fs = require('fs');
const PDFDocument = require('pdfkit');

function createPDF(text) {
    const doc = new PDFDocument();

    // Define the output file path relative to the current working directory
    const outputPath = './output.pdf';

    // Pipe its output to a file in the current directory
    doc.pipe(fs.createWriteStream(outputPath));

    // Add your text to the document
    doc.text(text, {
        // Any additional options like align, etc.
    });

    // Finalize the PDF and end the stream
    doc.end();

    console.log(`PDF created at ${outputPath}`);
}

module.exports = {
    createPDF
};
