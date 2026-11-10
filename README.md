# ai-vakil

> An AI-driven legal assistant for analyzing, summarizing, and researching legal documents.

ai-vakil is a modern legal-tech platform built with Next.js that helps legal professionals and teams review contracts, extract key clauses, assess risk, and surface critical dates and obligations — all from an intuitive document workspace.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation Guide](#installation-guide)
- [Usage Examples](#usage-examples)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)
- [Disclaimer](#disclaimer)

---

## Project Overview

**ai-vakil** is an AI-driven legal assistant designed to streamline the review and management of legal documents. Whether you are a solo practitioner, an in-house counsel, or part of a legal operations team, ai-vakil reduces the manual effort of reading through lengthy contracts by surfacing the clauses, dates, obligations, and risks that matter most.

### Mission

To make legal document review faster, more accurate, and more accessible by combining AI-powered extraction with a developer-friendly, privacy-conscious codebase.

### Role in the Legal Tech Landscape

Traditional contract review is time-intensive and error-prone. ai-vakil addresses this by:

- **Extracting structured text** from PDF and DOCX legal documents.
- **Categorizing clauses** by type (e.g., termination, indemnification, governing law) and assigning risk levels.
- **Highlighting critical dates** and contractual obligations that require attention.
- **Enabling natural-language Q&A** over uploaded documents through an AI question bar.
- **Providing a secure, authenticated workspace** for managing documents and insights.

The project is built for extensibility, so teams can plug in their preferred AI models, document sources, and downstream legal workflows.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Document Analysis** | Upload and extract text from PDF (up to 500 pages) and DOCX files with robust parsing, password detection, and corruption handling. |
| **Clause Extraction & Categorization** | Automatically identify clauses and categorize them (e.g., Rent & Security Deposit, Termination & Notice, Indemnification & Liability, Governing Law & Dispute Resolution). |
| **Risk Assessment** | Assign risk levels to individual clauses so reviewers can prioritize high-risk provisions. |
| **Critical Dates & Obligations** | Surface important dates, deadlines, and contractual obligations requiring action. |
| **Case Summarization** | Generate concise overviews of document contents, including key points and suggested revisions per clause. |
| **AI Question Bar** | Ask natural-language questions about an open document and receive cited, context-grounded answers. |
| **Document Workspace** | Organize, search, and navigate uploaded documents with filters, stats, and a document viewer. |
| **Dashboard** | View summary metrics, recent documents, upcoming dates, and attention items at a glance. |
| **Authentication** | Secure sign-up, login, and password recovery flows powered by Supabase Auth. |
| **Settings & Preferences** | Configure AI preferences, data privacy, notifications, security, and document settings. |

---

## Tech Stack

### Frontend

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 15 (App Router) | Full-stack React framework with server and client components |
| UI Library | React 19 | Component-based user interfaces |
| Styling | Tailwind CSS 4 | Utility-first CSS for responsive design |
| Language | TypeScript 5 | Static typing across the codebase |
| Icons | Lucide React | Consistent iconography |
| Animations | Framer Motion | Page transitions and interactive motion |

### Backend & Infrastructure

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Auth & Database | Supabase | Authentication, user profiles, and document storage |
| SSR Helpers | `@supabase/ssr` | Server-side rendering cookie and session management |
| Validation | Zod 4 | Schema validation for forms and API inputs |
| Server Utilities | `server-only` | Enforce server-side module boundaries |

### Document Processing

| Layer | Technology | Purpose |
|-------|-----------|---------|
| PDF Parsing | `pdf-parse`, `pdfjs-dist` | Extract text and metadata from PDF documents |
| DOCX Parsing | `mammoth`, `yauzl` | Extract raw text from DOCX archives with entry validation |
| Text Chunking | Custom utilities (`chunking.ts`) | Split long documents for downstream AI processing |

### Development Tooling

| Tool | Purpose |
|------|---------|
| ESLint 9 | Linting with Next.js config |
| TypeScript | Type checking (`tsc --noEmit`) |
| Git | Version control |

---

## Installation Guide

### Prerequisites

- **Node.js** 18 or later
- **npm** (comes with Node.js)
- A **Supabase** project (for authentication and document storage)

### 1. Clone the repository

```bash
git clone https://github.com/<your-org>/ai-vakil.git
cd ai-vakil/ai-vakil
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> If no `.env.example` exists, create `.env.local` manually using the variables above. Never commit real secrets to version control.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint to check for code issues |

---

## Usage Examples

### Uploading and analyzing a document

Through the UI:

1. Sign up or log in at `/login` or `/register`.
2. Navigate to the document workspace and upload a PDF or DOCX contract.
3. ai-vakil extracts the text, categorizes clauses, and flags risk levels.
4. Open a document to view insights: key dates, obligations, and attention items.
5. Use the AI question bar to ask questions such as:
   - *"What is the termination notice period?"*
   - *"Which clauses are high risk?"*
   - *"What are the governing law and dispute resolution terms?"*

### Programmatic document extraction

ai-vakil exposes a server-only document extraction utility:

```ts
import { extractDocumentText } from "@/lib/document-extraction";
import { readFile } from "fs/promises";

async function analyzeFile(filePath: string) {
  const bytes = new Uint8Array(await readFile(filePath));

  const result = await extractDocumentText("pdf", bytes);

  console.log("Pages:", result.pageCount);
  console.log("Text length:", result.text.length);
  console.log("First page:", result.pageText?.[0]?.text);
}

analyzeFile("./contract.pdf").catch(console.error);
```

Supported file types: `"pdf"` | `"docx"`.

### Working with clauses

```ts
import type { Clause } from "@/types/clause";

const clause: Clause = {
  id: "clause_1",
  documentId: "doc_42",
  sectionNumber: "§ 7.1",
  title: "Termination & Notice",
  text: "Either party may terminate this agreement...",
  page: 3,
  category: "Termination & Notice",
  riskLevel: "medium",
  explanation: "Standard termination clause with 30-day notice.",
  keyPoints: ["30-day notice required", "Termination for convenience"],
  isFlagged: false,
};
```

### Authentication (Supabase)

```ts
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "secure-password",
});
```

See `src/lib/supabase/` for server and client Supabase helpers.

---

## Contribution Guidelines

We welcome contributions from developers and legal professionals alike. Whether you're fixing a typo, improving documentation, or adding a new AI capability, your help is appreciated.

### How to contribute

1. **Fork the repository** and create your feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Set up the development environment** following the Installation Guide.

3. **Make your changes** following the existing code style:
   - TypeScript with strict mode enabled.
   - Tailwind CSS for styling; use `clsx` and `tailwind-merge` for conditional classes.
   - Zod for input validation.
   - Server-only modules for sensitive logic (mark with `"server-only"`).

4. **Run linting** before submitting:

   ```bash
   npm run lint
   ```

5. **Commit your changes** with a descriptive message:

   ```bash
   git commit -m "feat: add clause risk-level filtering"
   ```

6. **Push to your fork** and open a pull request:

   ```bash
   git push origin feature/your-feature-name
   ```

### Pull request process

- Ensure the build passes (`npm run build`).
- Keep PRs focused on a single concern.
- Update documentation when changing user-facing behavior.
- Be respectful and patient during review.

### Legal professionals

Non-code contributions are equally valuable:
- Report inaccurate clause categorizations or risk assessments.
- Suggest new clause categories relevant to specific jurisdictions or practice areas.
- Review the disclaimer and help improve legal accuracy language.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Disclaimer

ai-vakil is an AI-assisted legal support tool, not a substitute for professional legal advice. Outputs such as clause categorizations, risk levels, summaries, and question answers are generated by AI and may contain errors or omissions. Always review extracted content with a qualified attorney before relying on it for legal decisions. The maintainers accept no liability for actions taken based on ai-vakil output.
