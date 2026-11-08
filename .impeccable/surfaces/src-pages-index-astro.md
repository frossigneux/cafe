---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Order page (index)

Scope: the single public page: menu → cart → send the order on WhatsApp. Mode: Operate (the visitor's success is a sent order). Phone-first, trilingual (ქა / EN / RU), pickup only, payment by BOG/TBC transfer or at pickup.

Constraints: no backend; menu and settings come from content/*.json; every name, dish, price, hour and IBAN is a marked placeholder while settings.showSampleLabels is true. No photos (user decision): warmth comes from colour, type and shape.

Replaced: the "Tbilisi metro line" world (navy, signage type, grey tile) was rejected as cold. Treat it as anti-reference.

## Direction contract

THESIS: A restaurant ordering page exactly as people expect it from Wolt, warm and light, with nothing to learn. Refuses metaphor and refuses cold UI: no navy, no grey ground, no signage capitals.

OWN-WORLD: Warm white ground (#fffaf3) with ink brown text, tomato red as the single brand accent: #e4572e for the active-tab underline and focus, #c43f1a (tomato-strong) wherever white text sits on it (header band, order bar, filled quantity pill), for contrast. Green only for positive states: "Open now", "Send on WhatsApp" and the sent confirmation. Rounded friendly sans (Rubik for Latin/Cyrillic, Noto Sans Georgian), sentence case. Soft rounded cards (14–16px radii; 16px for cards and the sheet) with gentle warm shadows, round + buttons.

STORY: The visitor sees the café, that it is open, the wait time and how to pay, scans the dishes, taps + on what they want, opens the order from the floating bar, adds their name and sends it on WhatsApp.

FIRST VIEWPORT: A tomato header band carrying the café name at display size and the ქა/EN/RU switch. A white info card overlaps its bottom edge with the chips (open · ~20 min · pickup only), the payment line and any sample disclosures. Sticky tabs with an underline for the active category. Item rows: name, description, price on the left, round + button on the right (becomes −n+). A floating tomato "View order · n · ₾ total" bar at the bottom.

FORM: The category standard (canon), chosen by the user over the roll; seed:14b099307dfac0bf. Craft bar: Wolt.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
