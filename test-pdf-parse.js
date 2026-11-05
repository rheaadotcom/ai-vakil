import { readFile } from "fs/promises";
import path from "path";
(async () => {
  try {
    const pdfPath = path.resolve('test-files', 'sample.pdf');
    const data = await readFile(pdfPath);
    const pdfParse = await import('pdf-parse');
    const parse = pdfParse.default ?? pdfParse;
    const result = await parse(Buffer.from(data));
    console.log('Extracted length:', result.text.length);
    console.log('First 200 chars:', result.text.slice(0, 200));
  } catch (e) {
    console.error('Error:', e);
  }
})();
