import { defineConfig } from "astro/config";
import courseGraph from "astro-course-university";
import universityTheme from "astro-theme-university";
import { astromotion, deckRemarkPlugins } from "astromotion";
import { courseMeta } from "./src/course-config.ts";
import { courseApiCollections } from "./src/site-config.ts";
import { gitOrigin, resolveDeployment } from "./scripts/pages-base.ts";

// Derived, never hardcoded --- see scripts/pages-base.ts for why.
const { site, base } = resolveDeployment(process.env, gitOrigin);

export default defineConfig({
  site,
  base,
  // Pages build as directories, so every route URL ends in a slash. Saying so
  // explicitly makes Astro emit matching links, which keeps the canonical URL
  // and what a visitor clicks in agreement --- otherwise each click costs a
  // 301 on GitHub Pages.
  trailingSlash: "always",
  integrations: [
    universityTheme({
      defaultLayout: "src/layouts/PageLayout.astro",
      // The whole brand choice: three colour tokens and a set of lockups. Keep
      // institutional brand packages and assets out of this fictional site.
      // The second entry is a project-owned a11y fix, not a brand asset ---
      // `brandCss` is used for it anyway because it's the one theme hook that
      // reliably imports CSS on every page (via injectScript("page-ssr", ...));
      // a project-level PageLayout.astro <style is:global> block was tried
      // first and Astro's per-page CSS chunking silently dropped the rule
      // from most pages (confirmed live: present in 5 of 31 pages' HTML,
      // missing everywhere else). See src/styles/a11y-fixes.css.
      brandCss: ["astro-theme-slop/slop.css", "/src/styles/a11y-fixes.css"],
      imageFormat: "avif",
      llmsTxt: true,
      // The theme owns the markdown plugin chain, so astromotion's slide
      // plugins (slide breaks, classes, backgrounds, notes, QR codes) are
      // handed to it rather than registered separately. Each one gates on
      // `.deck.mdx`, so ordinary pages are untouched.
      extraRemarkPlugins: deckRemarkPlugins,
    }),
    courseGraph({
      collections: courseApiCollections,
      timezone: "Australia/Canberra",
      course: courseMeta,
      canonicalUrl: `https://courses.slop.university/${courseMeta.code}/`,
    }),
    // Slide decks: every `.deck.mdx` under src/decks/ becomes a Reveal.js page
    // at /decks/<name>/. The theme's deck stylesheet reads the same brand
    // tokens the site does, so a deck arrives already wearing the Slop palette
    // --- see src/decks/theme.css. `fontVariables` makes the deck page emit the
    // @font-face for the theme's body font, which the deck styles ask for by
    // name.
    astromotion({
      theme: "./src/decks/theme.css",
      fontVariables: ["--font-public-sans"],
    }),
    // astro-theme-university's Nav component wires its mobile menu toggle to
    // clicks only, with no Escape handler --- unlike its own sibling
    // SearchDialog, which does close on Escape. Patched here (the theme is a
    // vendored dependency, not a file this repo can edit) rather than left
    // as a keyboard-convention gap.
    {
      name: "nav-escape-to-close",
      hooks: {
        "astro:config:setup": ({ injectScript }) => {
          injectScript(
            "page",
            `document.addEventListener("keydown", (event) => {
              if (event.key !== "Escape") return;
              const toggle = document.querySelector('.at-nav-toggle[aria-expanded="true"]');
              if (!toggle) return;
              toggle.setAttribute("aria-expanded", "false");
              const wrapper = toggle.closest(".at-nav")?.querySelector(".at-nav-links-wrapper");
              if (wrapper) wrapper.inert = true;
              toggle.focus();
            });`,
          );
        },
      },
    },
  ],
});
