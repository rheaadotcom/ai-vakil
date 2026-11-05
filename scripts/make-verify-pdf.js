const fs = require("fs");
const path = require("path");

const content =
  "BT /F1 24 Tf 100 700 Td (Hello AIVakil extraction verify text for chunking) Tj ET";
const objects = [
  "1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj",
  "2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj",
  "3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources<< /Font<< /F1 5 0 R >> >> >>endobj",
  `4 0 obj<< /Length ${content.length} >>stream\n${content}\nendstream endobj`,
  "5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj",
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
for (const obj of objects) {
  offsets.push(Buffer.byteLength(pdf, "utf8"));
  pdf += `${obj}\n`;
}
const xrefStart = Buffer.byteLength(pdf, "utf8");
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
for (let i = 1; i <= objects.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

const out = path.join(__dirname, "..", "tmp-verify.pdf");
fs.writeFileSync(out, pdf);
console.log("wrote", out, Buffer.byteLength(pdf), "bytes");
