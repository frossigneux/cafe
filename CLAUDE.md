# მაი & Family café site

Static Astro site (ka at `/`, en at `/en/`, ru at `/ru/`): customers fill a cart and send the order as a prefilled WhatsApp message. No backend. Published to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Working rules

- **`git pull` before any edit.** Café staff edit content in Pages CMS (app.pagescms.org), and every save there is a commit on `main`.
- **Propose before changing behaviour or visible text.** Describe the change concretely (labels in ka/en/ru, the exact WhatsApp message) and wait for the owner's OK. Fully specified one-line instructions are the exception. After approval, commit, push and check that the deploy succeeded (`gh run watch`).
- The owner writes in French; reply in French.

## Content

- All café data is in `content/menu.json`, `content/settings.json` and `content/photos/`. It is validated at build time in `src/data/*.ts`, so a malformed file fails the build and the live site keeps its previous version. `npm run build < /dev/null` runs the same check as CI.
- `.pages.yml` defines the Pages CMS forms, with labels as "ქართული · English". **Pages CMS drops JSON keys that `.pages.yml` does not declare**, so a new key must be added in both places. Empty fields come back as `""` or `null`; the loaders treat them as absent via `blank()` and `blankText()` in `src/data/validate.ts`.
- After changing `.pages.yml`, check the form in Pages CMS. If it still shows the old form, push another small change to `.pages.yml`, such as a comment, to refresh its cached copy.
- Photos are referenced as `/photos/x.jpg`, the format Pages CMS writes; `photoFile()` also accepts a bare file name.

## Text and languages

- Interface strings and the WhatsApp message wording are in `src/i18n.ts`, in all three languages. The WhatsApp message always starts with the Georgian block; when the visitor's language is not ka, a separator and the same block in that language follow.
- Staff guidance lives in `content/README.md` (editing JSON on GitHub) and in `docs/guide/` (PDF guides in ka and en). Update them when a setting or form changes; `docs/guide/build.sh` regenerates the PDFs.

## Generated files

- `public/og.jpg` is rebuilt in CI by `scripts/make-og.py` from the café name and the first gallery picture. Run it locally with `python3 -I scripts/make-og.py`; it uses the fonts in `scripts/fonts/`.

## Gotchas

- `npx astro check` hangs on an interactive install prompt. Use the build instead.
- To stop the preview server, kill it by PID or with a pattern like `[a]stro preview`. A plain `pkill -f "astro preview"` also matches the shell running it.
- The design system is documented in `DESIGN.md` and the product decisions in `PRODUCT.md`.
