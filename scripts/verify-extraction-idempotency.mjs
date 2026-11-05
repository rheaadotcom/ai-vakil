import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const apiBase = process.env.VERIFY_API_BASE || "http://localhost:3000";

if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}

function authHeaders(token, extra = {}) {
  return {
    apikey: key,
    Authorization: `Bearer ${token}`,
    ...extra,
  };
}

async function countChunks(token, documentId) {
  const res = await fetch(
    `${url}/rest/v1/document_chunks?document_id=eq.${documentId}&select=id`,
    {
      headers: {
        ...authHeaders(token),
        Prefer: "count=exact",
      },
    },
  );
  const body = await res.json();
  const range = res.headers.get("content-range"); // e.g. 0-2/3
  const total = range?.split("/")[1];
  return {
    status: res.status,
    contentRange: range,
    count: total === "*" ? body.length : Number(total),
    ids: body.map((row) => row.id),
  };
}

async function main() {
  const email = `aivakil-idempotency+${Date.now()}@example.com`;
  const password = `VerifyExtract_${Date.now()}!`;

  const signupRes = await fetch(`${url}/auth/v1/signup`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const session = await signupRes.json();
  if (!session.access_token || !session.user?.id) {
    console.error("signup failed", signupRes.status, session);
    process.exit(1);
  }
  const token = session.access_token;
  const userId = session.user.id;

  const pdfPath = path.join(__dirname, "..", "tmp-verify.pdf");
  const pdfBytes = fs.readFileSync(pdfPath);
  const filePath = `${userId}/${crypto.randomUUID()}.pdf`;

  const uploadRes = await fetch(
    `${url}/storage/v1/object/legal-documents/${filePath}`,
    {
      method: "POST",
      headers: {
        ...authHeaders(token),
        "Content-Type": "application/pdf",
        "x-upsert": "false",
      },
      body: pdfBytes,
    },
  );
  if (!uploadRes.ok) {
    console.error("upload failed", uploadRes.status, await uploadRes.text());
    process.exit(1);
  }

  const docRes = await fetch(`${url}/rest/v1/documents`, {
    method: "POST",
    headers: {
      ...authHeaders(token, {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      }),
    },
    body: JSON.stringify({
      user_id: userId,
      title: "idempotency-verify.pdf",
      file_path: filePath,
      file_type: "pdf",
      file_size_bytes: pdfBytes.length,
      status: "uploaded",
    }),
  });
  const docs = await docRes.json();
  const documentId = docs[0]?.id;
  if (!documentId) {
    console.error("document insert failed", docRes.status, docs);
    process.exit(1);
  }

  console.log("documentId", documentId);
  console.log("userId", userId);

  const before = await countChunks(token, documentId);
  console.log("\nBEFORE extraction #1:", before);

  async function runExtract(label) {
    const res = await fetch(`${apiBase}/api/documents/${documentId}/extract`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text.slice(0, 500) };
    }
    console.log(`\n${label}:`, res.status, json);
    return { status: res.status, json };
  }

  const first = await runExtract("extraction #1");
  const afterFirst = await countChunks(token, documentId);
  console.log("AFTER extraction #1:", afterFirst);

  const second = await runExtract("extraction #2");
  const afterSecond = await countChunks(token, documentId);
  console.log("AFTER extraction #2:", afterSecond);

  const extractionRes = await fetch(
    `${url}/rest/v1/document_extractions?document_id=eq.${documentId}&select=status,error_message,extracted_text`,
    { headers: authHeaders(token) },
  );
  const extraction = await extractionRes.json();
  console.log("\nextraction row:", {
    status: extraction[0]?.status,
    error_message: extraction[0]?.error_message,
    extracted_text_length: extraction[0]?.extracted_text?.length ?? 0,
    extracted_text_preview: extraction[0]?.extracted_text?.slice(0, 80) ?? null,
  });

  const pagesRes = await fetch(
    `${url}/rest/v1/document_pages?document_id=eq.${documentId}&select=page_number,extracted_text`,
    { headers: authHeaders(token) },
  );
  console.log("pages:", await pagesRes.json());

  const ok =
    first.status === 200 &&
    second.status === 200 &&
    afterFirst.count > 0 &&
    afterFirst.count === afterSecond.count &&
    extraction[0]?.status === "extracted" &&
    (extraction[0]?.extracted_text?.length ?? 0) > 0;

  console.log("\nIDEMPOTENT:", afterFirst.count === afterSecond.count);
  console.log("PASS:", ok);
  process.exit(ok ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
