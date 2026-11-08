# Editing the menu and settings

Two files in this folder control what the website shows:

| File | What it holds |
|---|---|
| [`menu.json`](menu.json) | Categories, pizzas, drinks, descriptions and prices |
| [`settings.json`](settings.json) | Name, WhatsApp number, opening hours, address, map location, bank accounts |

## How to edit on GitHub

1. Open the file above and click the pencil icon (**Edit this file**).
2. Make your change.
3. Click **Commit changes…**, then **Commit changes** again.
4. The site updates by itself within about 2 minutes. On the file's page, a mark appears next to your change: a yellow dot while it builds, then a green check when it is live (details in the **Actions** tab).

If you made a mistake, a red cross appears instead. Click it, then **Details**: the build log ends with a message saying what to fix and where. **The live site keeps the previous version until the mistake is fixed**, so customers never see a broken menu.

## Common changes

**Change a price.** Write a plain number, without quotes or `₾`:

```json
"price": 17
```

**Run a promo.** Add `"promoPrice"` with the new price, lower than `"price"`. The site shows the normal price struck through, the promo price in red with a "Promo" tag, and charges the promo price. Remove the line to end the promo.

```json
"price": 15,
"promoPrice": 12
```

**Temporarily unavailable** (sold out today, missing ingredient). Add `"available": false` to the item. It stays on the site, greyed out with "Temporarily unavailable", and cannot be ordered. Remove the line (or set it to `true`) when it is back.

**Remove an item for good** (no longer on the menu). Add `"hidden": true`. It disappears from the site but stays in the file, so you can bring it back later by removing the line.

```json
{
  "name": { "ka": "იმერული", "en": "Imeruli", "ru": "Имерули" },
  "description": { "ka": "…", "en": "…", "ru": "…" },
  "price": 20,
  "available": false
},
```

**Add a pizza.** Copy an existing block from `{` to `},` and paste it below, then change the text and the price. Every block except the last one in a list ends with a comma.

**Show a category without online ordering** (e.g. coffee and tea, served at the café only). Add `"orderable": false` to the category, next to its `"name"`. Its items show with their price but no + button, under a short "served at the café only" note. Leave it out for categories that can be ordered.

**Reorder.** Items and categories appear on the site in the same order as in the file.

**Texts in three languages.** `ka` is Georgian, `en` English, `ru` Russian. If one is missing, the site uses the English text, or the Georgian one if there is no English.

## Settings

- `"whatsapp"`: the number that receives orders, with country code, e.g. `"+995 555 12 34 56"`.
- `"facebook"`: link to the Facebook page, shown in the Info section. Remove the line to hide it.
- `"location"`: the pickup point on the map, as `{ "lat": 41.91935, "lng": 44.727734 }`. In Google Maps, right-click the place and click the coordinates to copy them. Remove the line to hide the map link.
- `"openingHours"`: one line per day (`monday` … `sunday`), 24-hour clock, Tbilisi time, e.g. `"friday": { "open": "10:00", "close": "23:00" }`. Write `"sunday": "closed"` for a day off. Closing after midnight is not supported.
- `"bankAccounts"`: IBAN and account holder for Bank of Georgia (`bog`) and TBC (`tbc`). Spaces in the IBAN are fine.
- `"showPhoto"`: `true` shows the café illustration at the top of the info card, `false` hides it.

## Rules of JSON, in short

- Text goes in straight double quotes: `"Margherita"`.
- Numbers have no quotes: `15`.
- Items in a list are separated by commas, with **no comma after the last one**.
- Each `{` needs its `}` and each `[` needs its `]`.

Optional: give an item an `"id"` (e.g. `"id": "margherita"`) if you want to rename it in English without emptying carts that customers already have open. Without an id, the English name is used.
