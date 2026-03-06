// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://gaojiajun.me",

  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },

  integrations: [sitemap()],
});