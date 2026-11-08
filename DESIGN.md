---
name: მაი & Family
description: Warm, light pickup ordering page in the restaurant-app category standard; menu to WhatsApp order in a few taps.
colors:
  tomato: "#e4572e"
  tomato-strong: "#c43f1a"
  tomato-soft: "#fde6dc"
  green: "#1f7a47"
  green-strong: "#186239"
  green-soft: "#e1f2e7"
  error: "#b3261e"
  bg: "#fffaf3"
  surface: "#ffffff"
  surface-2: "#fbf1e6"
  line: "#efe2d2"
  line-strong: "#e2d1bc"
  ink: "#2b211b"
  ink-2: "#6e5f53"
typography:
  display:
    fontFamily: "Rubik, Noto Sans Georgian, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Rubik, Noto Sans Georgian, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "Rubik, Noto Sans Georgian, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "Rubik, Noto Sans Georgian, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Rubik, Noto Sans Georgian, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.45
  caption:
    fontFamily: "Rubik, Noto Sans Georgian, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  s: "10px"
  m: "14px"
  l: "16px"
  pill: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "24px"
  "6": "32px"
  "7": "48px"
components:
  order-bar:
    backgroundColor: "{colors.tomato-strong}"
    textColor: "{colors.surface}"
    typography: "{typography.title}"
    rounded: "{rounded.m}"
    padding: "0 16px"
    height: "60px"
  send-button:
    backgroundColor: "{colors.green}"
    textColor: "{colors.surface}"
    rounded: "{rounded.m}"
    padding: "0 24px"
    height: "56px"
  send-button-hover:
    backgroundColor: "{colors.green-strong}"
  ghost-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  qty-add:
    backgroundColor: "{colors.tomato-soft}"
    textColor: "{colors.tomato-strong}"
    rounded: "{rounded.pill}"
    size: "44px"
  qty-filled:
    backgroundColor: "{colors.tomato-strong}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    height: "44px"
  chip:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  chip-status-open:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.green-strong}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.l}"
    padding: "16px 24px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.s}"
    padding: "12px 16px"
    height: "50px"
  pay-option-selected:
    backgroundColor: "{colors.tomato-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.s}"
    height: "52px"
---

# Design System: მაი & Family

## Overview

**Creative North Star: "The Warm Counter"**

This is the restaurant-ordering category standard, built to the finish of a good delivery app and kept warm. Nobody has to learn anything: a tomato header band names the café, a white venue card overlaps its lower edge with the open status and how to pay, sticky tabs underline the current category, and dish rows carry a round plus button on the right. A floating tomato bar holds the order on phones and opens into a bottom sheet; on desktop the same order stands as a sticky sidebar beside the menu. Convention is the commitment. No metaphor sits on top of it.

The warmth comes from colour, type and shape, not from imagery. The ground is a warm white, text is ink brown rather than black, shadows are tinted brown, and every interactive edge is rounded. Density is moderate: rows breathe at 16px and secondary text drops to a muted brown. The page uses no photos (the user's decision) and must never use stock food photography.

The page carries three languages. Georgian, English and Russian get equal care: Georgian runs in Noto Sans Georgian, Latin and Cyrillic run in Rubik, and every string is in sentence case.

**Key Characteristics:**
- Warm white ground, ink-brown text, one tomato accent family.
- Green used only for positive outcomes.
- Soft rounded cards (14 to 16px) with brown-tinted ambient shadows; pills for chips and small buttons.
- Round + becomes a filled − n + pill once the dish is in the order.
- Floating order bar on phones becomes a bottom sheet; a sticky sidebar on desktop at 960px and up.

## Colors

A warm-paper palette: cream and brown neutrals, one tomato accent in three strengths, a reserved green for success, and yellow kept for honesty notes.

### Primary
- **Tomato** (tomato): the brand accent where it carries no text. Draws the active-tab underline, the focus ring, input focus borders, the caret and the selected payment option's border. Also the page's `theme-color`.
- **Deep Tomato** (tomato-strong): wherever white text or white glyphs sit on tomato: the header band, the floating order bar, the filled quantity pill. Also tomato-coloured text on light ground: a price once its dish is in the order, the active language in the switcher, the "edit" link in the order footer, the checked radio dot. Its hover step darkens to #b13814 on the order bar.
- **Tomato Blush** (tomato-soft): resting ground of the round + button, the selected payment option fill, the input focus halo, text selection, and the closed-status chip.

### Secondary
- **Basil Green** (green): the WhatsApp send button and the sent confirmation's check glyph. **Deep Basil** (green-strong) is its hover state and the text colour of the "Open now" chip and copied-IBAN state. **Basil Mist** (green-soft) is the ground of the open-status chip and the sent check circle.

### Tertiary
- **Error Red** (error): invalid-field border, error hint, form error line.

### Neutral
- **Warm Paper** (bg): page ground and the sticky tab strip.
- **White** (surface): cards, the venue card, the order sheet and sidebar, inputs, ghost buttons.
- **Crust** (surface-2): neutral chips, the bank details panel, quantity pills inside the order list.
- **Flour Line** (line): row dividers, the tab strip's bottom rule, sheet header and footer rules.
- **Dough Line** (line-strong): 1.5px borders on inputs, payment options and ghost buttons; resting radio rings; scrollbar thumb.
- **Ink Brown** (ink): all primary text.
- **Cocoa** (ink-2): descriptions, second-language dish names, hints, inactive tabs, the payment line.

### Named Rules
**The White-On-Strong Rule.** White text never sits on Tomato (#e4572e). Any tomato fill that carries text or glyphs uses Deep Tomato, for contrast. Tomato itself is reserved for lines, rings and borders.

**The Green Means Done Rule.** Green appears only for positive states: "Open now", "Send on WhatsApp", the copied confirmation and the sent confirmation. It is never decoration and never a second brand colour.

## Typography

**Display Font:** Rubik (with Noto Sans Georgian, system-ui, sans-serif)
**Body Font:** Rubik (same stack)
**Georgian:** Noto Sans Georgian leads the stack on `:lang(ka)` pages, with Rubik behind it.

**Character:** A rounded, friendly grotesque paired with Georgian glyphs of matching weight. Both are self-hosted in 400, 500 and 700. The pairing reads soft and plain and never shouts.

### Hierarchy
- **Display** (700, 1.875rem, rising to 2.75rem at 960px and up, 1.1, -0.01em): the café name in the header band only.
- **Headline** (700, 1.375rem, 1.25): category headings, the info heading, the open sheet's title, the sent confirmation heading.
- **Title** (500, 1.0625rem, 1.3): dish names, tab labels, prices, order-line names; 700 for the order bar title and total.
- **Body** (400, 1.0625rem, 1.45): base text. Numerals are tabular everywhere (`font-variant-numeric: tabular-nums`) so prices align.
- **Label** (400 to 500, 0.9375rem): descriptions, chips, field labels, the language switch, ghost buttons, the payment line.
- **Caption** (400 to 500, 0.8125rem): second-language dish names, field hints, account holder.

### Named Rules
**The Sentence Case Rule.** Every string is in sentence case, in all three languages. No uppercase labels, no tracked-out capitals.

**The Three Weights Rule.** The system uses only 400, 500 and 700. Hierarchy comes from size and weight steps, not from colour or case.

## Layout

Phone-first, one column. Content sits in a 1120px max container with 16px side gutters. The header band is full-bleed tomato; the venue card is pulled up over its bottom edge (-24px, -32px on desktop), so the brand band and the venue facts read as one unit. Category tabs stick to the top of the viewport, with a 24px gap between labels and horizontal scrolling and no visible scrollbar on narrow screens.

Menu rows are flex: text on the left (name, description, second-language name, price), the quantity control on the right. Rows are separated by 1px rules with 16px vertical padding. Categories are spaced by 32px. Body bottom padding (96px plus the safe area) keeps the last row clear of the floating bar.

The spacing scale is 4, 8, 12, 16, 24, 32, 48px. 16px is the default rhythm, and 24px is the inner padding of cards and the sheet.

At 960px and up, the layout becomes a two-column grid: the menu column plus a 380px order sidebar with a 32px gap. The sidebar is sticky 72px from the top, and its height is capped at the viewport. The scrim, the chevron and the collapsed meta line are hidden there. Safe-area insets are honoured at the top of the header and the bottom of the bar and sheet. The touch-target floor is 44px.

## Elevation & Depth

A light hybrid. The page is mostly flat and tonal (paper ground, white surfaces, crust panels). Shadows appear only on the few things that float above the menu, and they are always tinted warm brown, never neutral grey.

### Shadow Vocabulary
- **Card** (`box-shadow: 0 6px 24px rgb(92 52 24 / 0.1), 0 1px 3px rgb(92 52 24 / 0.08)`): the venue card, the info card and the desktop order sidebar.
- **Bar** (`box-shadow: 0 10px 28px rgb(92 52 24 / 0.28)`): the floating order bar on phones.
- **Sheet** (`box-shadow: 0 -10px 30px rgb(92 52 24 / 0.18)`): the open bottom sheet, cast upward.
- **Scrim** (`rgb(43 33 27 / 0.45)`): an ink-brown dim behind the open sheet.

### Named Rules
**The Warm Shadow Rule.** Every shadow and scrim is tinted from the brown family (rgb 92 52 24 or the ink). Neutral black or grey shadows don't belong in this world.

## Shapes

Everything is soft. Cards and the sheet use 16px, the order bar and send button use 14px, and inputs, payment options and the bank panel use 10px. Chips, the language switch, quantity controls, ghost and copy buttons are full pills (999px). The + button is a 44px circle. The bottom sheet rounds only its top corners. The active-tab underline is 3px with rounded top ends. Borders are 1.5px on interactive fields and 1px on dividers. Icons are inline 20px stroke SVGs (2.2 stroke, round caps and joins) that inherit `currentColor`.

## Components

### Buttons
- **Order bar (primary on phones):** a Deep Tomato fill with white text. It is 60px tall with a 14px radius and the Bar shadow. Inside: a white count badge (28px pill, Deep Tomato numerals), the title in 700, and the total right-aligned. On hover it darkens to #b13814. When an item is added, it gives a short 1.03 scale bump with `cubic-bezier(0.16, 1, 0.3, 1)`, only when reduced motion is not requested.
- **Send on WhatsApp:** a full-width Basil Green fill with white 700 text and a chat glyph, the label on the left and the total on the right. It is 56px tall with a 14px radius and darkens to Deep Basil on hover.
- **Ghost / Copy:** a white pill with a 1.5px Dough Line border and 500 label text, 44px tall. On hover the border darkens to Cocoa. The copy button turns its border green and its text Deep Basil once copied.

### Quantity control (signature)
- **Resting:** a 44px Tomato Blush circle holding a Deep Tomato +.
- **In the order:** it grows into a Deep Tomato pill with white − n + (count in 700), and the row's price turns Deep Tomato. Hover on its buttons is a translucent white wash. Inside the order list the pill is 40px, on Crust, with ink glyphs.

### Chips
- **Neutral:** Crust ground, ink text, 30px pill, 4px 12px.
- **Status:** a Basil Mist ground with Deep Basil text and a leading 8px dot. When closed, it switches to Tomato Blush with Deep Tomato.

### Cards / Containers
- **Corner Style:** 16px for the venue card, the desktop sidebar and the sheet; 14px for the info card.
- **Background:** White on the Warm Paper ground. Nested panels (bank details) use Crust.
- **Shadow Strategy:** the Card shadow (see Elevation & Depth).
- **Border:** none. Separation comes from the shadow and the tone.
- **Internal Padding:** 16px 24px on phones and 24px 32px on desktop for the venue card; 24px for the info card and the sheet panel.

### Inputs / Fields
- **Style:** a White fill with a 1.5px Dough Line border and a 10px radius, 50px minimum height, 12px 16px padding, and a font size of at least 16px (no iOS zoom). Labels sit above in 500 label size; optional markers are 400 Cocoa. Hints are Cocoa captions.
- **Focus:** a Tomato border plus a 3px Tomato Blush halo, with a Tomato caret.
- **Error:** an Error Red border with a 12% red halo; the hint turns Error Red in 500.
- **Select:** native appearance removed, with an inline ink chevron SVG on the right.
- **Payment options:** 52px rows with a 1.5px border and a 10px radius, and a custom 20px radio. When selected, the row gets a Tomato border and a Tomato Blush fill, and the radio a 6px Deep Tomato ring.

### Navigation
- **Category tabs:** labels in 500 at title size, Cocoa at rest and Ink when current. The current tab gets a 3px Tomato underline that grows from the centre (scaleX, 0.25s ease-out). The strip sticks to the top on Warm Paper with a 1px Flour Line rule and is at least 52px tall.
- **Language switch:** a pill group outlined by a translucent white inset ring on the header band. Each option is at least 44 by 36px. The current option is White with Deep Tomato text.

### Order sheet (signature)
On phones, the bar opens into a bottom sheet (max 90dvh, 16px top corners, Sheet shadow, 32px slide-up with ease-out). The header grows to 72px, shows the title at headline size with an item count, and uses a chevron to close. The body scrolls inside the sheet. The footer holds a meta line with a Deep Tomato "edit" link above the send button. At 960px and up, the same element is a sticky white sidebar card.

## Do's and Don'ts

### Do:
- **Do** put white text only on Deep Tomato (#c43f1a) or Basil Green, never on Tomato (#e4572e).
- **Do** reserve green for positive states: open, send, copied, sent.
- **Do** tint every shadow and scrim warm brown.
- **Do** keep every string in sentence case and use only the 400, 500 and 700 weights.
- **Do** let Noto Sans Georgian lead the font stack on Georgian pages.
- **Do** keep touch targets at 44px or larger and form text at 16px or larger.
- **Do** use inline stroke SVG icons in `currentColor` at 20px.

### Don't:
- **Don't** bring back the replaced metro world: no navy, no grey ground, no signage capitals.
- **Don't** use stock or invented food photos. Photos arrive only when the café supplies its own.
- **Don't** add a second accent hue or use yellow for anything except placeholder disclosure.
- **Don't** use neutral grey or black shadows, or hard offset shadows.
- **Don't** add uppercase labels, kickers or eyebrows above headings.
- **Don't** layer a metaphor or theme on top of the category convention.
