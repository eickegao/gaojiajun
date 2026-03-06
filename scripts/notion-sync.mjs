#!/usr/bin/env node
/**
 * Notion → Blog sync script
 *
 * Pulls published posts from a Notion database and converts them
 * to Astro-compatible Markdown files.
 *
 * Notion database required properties:
 *   - Title       (title)        — Post title
 *   - Description (rich_text)    — Short description
 *   - Slug        (rich_text)    — URL slug (e.g. "my-first-post")
 *   - Tags        (multi_select) — Post tags
 *   - Lang        (select)       — "en" or "zh"
 *   - PubDate     (date)         — Publish date
 *   - Published   (checkbox)     — Only checked posts will be synced
 *
 * Environment variables:
 *   NOTION_API_KEY    — Notion integration token
 *   NOTION_DATABASE_ID — Database ID to pull from
 *
 * Usage:
 *   node scripts/notion-sync.mjs
 */

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
  console.error("Error: NOTION_API_KEY and NOTION_DATABASE_ID are required.");
  console.error("Set them with:");
  console.error("  export NOTION_API_KEY=ntn_...");
  console.error("  export NOTION_DATABASE_ID=...");
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

const OUTPUT_DIR = join(process.cwd(), "src/content/blog");
mkdirSync(OUTPUT_DIR, { recursive: true });

// Helper: extract plain text from Notion rich_text array
function getPlainText(richTextArray) {
  if (!richTextArray || richTextArray.length === 0) return "";
  return richTextArray.map((t) => t.plain_text).join("");
}

// Helper: extract property values from a Notion page
function getPageProps(page) {
  const props = page.properties;
  return {
    title: getPlainText(props.Title?.title),
    description: getPlainText(props.Description?.rich_text),
    slug: getPlainText(props.Slug?.rich_text),
    tags: (props.Tags?.multi_select || []).map((t) => t.name),
    lang: props.Lang?.select?.name || "en",
    pubDate: props.PubDate?.date?.start || new Date().toISOString().split("T")[0],
  };
}

async function main() {
  console.log("Fetching posts from Notion...");

  // Query published posts
  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "PubDate", direction: "descending" }],
  });

  console.log(`Found ${response.results.length} published post(s).`);

  for (const page of response.results) {
    const props = getPageProps(page);

    if (!props.slug) {
      console.warn(`Skipping "${props.title}" — no slug defined.`);
      continue;
    }

    // Convert Notion blocks to Markdown
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const mdContent = n2m.toMarkdownString(mdBlocks);
    const body = mdContent.parent || mdContent;

    // Build frontmatter
    const frontmatter = [
      "---",
      `title: "${props.title.replace(/"/g, '\\"')}"`,
      `description: "${props.description.replace(/"/g, '\\"')}"`,
      `pubDate: ${props.pubDate}`,
      `tags: [${props.tags.map((t) => `"${t}"`).join(", ")}]`,
      `lang: "${props.lang}"`,
      "---",
    ].join("\n");

    const filePath = join(OUTPUT_DIR, `${props.slug}.md`);
    writeFileSync(filePath, frontmatter + "\n\n" + body + "\n");
    console.log(`  ✓ ${props.slug}.md (${props.lang})`);
  }

  console.log("Sync complete!");
}

main().catch((err) => {
  console.error("Sync failed:", err.message);
  process.exit(1);
});
