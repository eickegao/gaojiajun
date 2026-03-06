#!/usr/bin/env node
/**
 * Blog post translation script
 *
 * Usage:
 *   node scripts/translate.mjs src/content/blog/my-post.md
 *
 * Reads a blog post, detects its language from frontmatter,
 * translates it to the other language using OpenAI API,
 * and saves the translated version.
 *
 * Requires OPENAI_API_KEY environment variable.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { basename, dirname, join } from "path";
import OpenAI from "openai";

const sourcePath = process.argv[2];
if (!sourcePath) {
  console.error("Usage: node scripts/translate.mjs <path-to-markdown-file>");
  process.exit(1);
}

if (!process.env.OPENAI_API_KEY) {
  console.error("Error: OPENAI_API_KEY environment variable is required.");
  console.error("Set it with: export OPENAI_API_KEY=sk-...");
  process.exit(1);
}

const source = readFileSync(sourcePath, "utf-8");

// Parse frontmatter
const fmMatch = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!fmMatch) {
  console.error("Error: Could not parse frontmatter.");
  process.exit(1);
}

const frontmatter = fmMatch[1];
const body = fmMatch[2];

// Detect source language
const langMatch = frontmatter.match(/lang:\s*["']?(en|zh)["']?/);
const sourceLang = langMatch ? langMatch[1] : "en";
const targetLang = sourceLang === "en" ? "zh" : "en";

const langNames = { en: "English", zh: "Chinese (Simplified)" };

console.log(`Translating: ${sourceLang} → ${targetLang}`);
console.log(`Source: ${sourcePath}`);

const openai = new OpenAI();

const prompt = `Translate the following blog post from ${langNames[sourceLang]} to ${langNames[targetLang]}.

Rules:
- Translate the frontmatter fields: title, description. Keep all other frontmatter fields unchanged EXCEPT change lang to "${targetLang}".
- Translate the markdown body naturally, preserving all markdown formatting, code blocks, and links.
- Code inside code blocks should NOT be translated, but code comments can be translated.
- Keep the translation natural and fluent, not word-for-word.
- Return ONLY the complete translated markdown file (frontmatter + body), nothing else.

---
${source}`;

const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: prompt }],
  temperature: 0.3,
});

let translated = response.choices[0].message.content.trim();

// Remove wrapping markdown code fence if present
if (translated.startsWith("```")) {
  translated = translated.replace(/^```(?:markdown|md)?\n/, "").replace(/\n```$/, "");
}

// Generate output filename
const sourceFile = basename(sourcePath, ".md");
const dir = dirname(sourcePath);
const outputPath = join(dir, `${sourceFile}.${targetLang}.md`);

writeFileSync(outputPath, translated + "\n");
console.log(`Output: ${outputPath}`);
console.log("Done!");
