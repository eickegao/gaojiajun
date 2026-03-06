// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://gaojiajun.me",
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },
});
