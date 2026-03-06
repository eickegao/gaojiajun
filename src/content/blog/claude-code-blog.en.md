---
title: "I Built a Blog with Claude Code Without Writing a Single Line of Code"
description: "A developer's real experience using AI to build a blog: from project setup to going live with a custom domain, Claude Code did everything. Free hosting on GitHub Pages, with auto-translation built in."
pubDate: 2026-03-06
tags: ["AI-tools", "indie-hacking", "passive-income"]
lang: "en"
---

## How It Started

As a coder going all in on the Solopreneur path, I've been meaning to set up a personal blog. Simple requirements: write articles, run ads, support both Chinese and English.

In the old days, this would've taken me a day or two — setting up the framework, tweaking styles, configuring deployment. But today, I decided to let **Claude Code** handle it.

The result? **From zero to live, I didn't write a single line of code.**

## What Did Claude Code Actually Do?

### 1. Project Setup

I just said "build me a personal blog," and Claude Code:

- Chose **Astro** as the framework (a static site generator, perfect for blogs)
- Initialized the project and installed dependencies
- Created the complete project structure

### 2. One Config File to Rule Them All

It created a `src/config.ts` that centralizes every configurable option:

```typescript
export const SITE = {
  title: { en: "Solopreneur", zh: "独立营业中" },
  author: { name: { en: "Eric Gao", zh: "德州小高" } },
  analytics: { googleAnalyticsId: "" },
  ads: { googleAdsenseId: "" },
  theme: { primaryColor: "#2563eb" },
  // ...
};
```

Want to change something later? Just tell Claude Code: "change the primary color to red" or "add my GitHub link."

### 3. Bilingual Support

The blog automatically supports Chinese and English. Chinese is the default, English lives under `/en/`. There's a language toggle in the nav bar — one click to switch.

Even better, it wrote an **AI translation script** — I just write in Chinese, run one command, and the English version is auto-generated:

```bash
node scripts/translate.mjs src/content/blog/my-post.md
```

One article, two languages, fully automated.

### 4. Ads and Analytics

Google AdSense and Google Analytics code are pre-wired into the templates. I just need to fill in the IDs in the config file, and ads automatically appear on article pages.

### 5. Free Deployment on GitHub Pages

This is the best part:

- Claude Code wrote a GitHub Actions workflow
- Every time I `git push`, the site auto-builds and deploys
- **Completely free** — GitHub Pages doesn't charge for public repos
- Custom domain? Just configure DNS and you're done

The most "technical" thing I did in the entire process was changing a DNS record on Cloudflare. 😂

## How Much Did It Cost?

| Item | Cost |
|------|------|
| Claude Code | $200/month (was already using it) |
| GitHub Pages | Free |
| Domain | Already owned |
| Server | Not needed |

**Total additional cost: $0.**

## What Does This Mean?

As a coder with nearly 20 years of experience, here's my takeaway:

**AI isn't replacing programmers — it's making programmers 10x more productive.**

Setting up a blog used to mean spending half a day just tweaking CSS. Now? I just describe what I want, and Claude Code builds it. My time is freed up for what actually matters — creating content and thinking about monetization strategies.

For anyone thinking about going the Solopreneur route, this is a signal:

✅ **The technical barrier is dropping fast**
✅ **One person + AI can do the work of a small team**
✅ **What truly matters is your ideas and execution**

## Next Step: Auto Topic Selection

To be honest, this system isn't fully automated yet. Here's the current workflow:

1. **I** come up with the article topic and outline
2. **Claude Code** generates content and translations
3. **I** review the content, make edits, and publish

The bottleneck is step one — I still have to come up with topics myself.

So the next thing I'm building is an **auto topic selection feature.** The idea is to have AI recommend topics based on my blog's niche, trending subjects, and SEO data — and even generate first drafts automatically.

When that's in place, my workflow becomes:

1. AI auto-recommends topics + generates drafts
2. **I just review and publish**

From "I write a blog" to "AI writes the blog, I curate quality." That's the proper Solopreneur mindset — **spend your time on decisions, not execution.**

## Final Thoughts

This blog itself, including the article you're reading right now, was built and co-created with Claude Code.

If you've been thinking about starting your Solopreneur journey, stop hesitating. The tools are ready. All that's left is to **take action**.

🚀 **Solopreneur life — let's go!**
