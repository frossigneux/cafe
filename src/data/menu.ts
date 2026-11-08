import raw from '../../content/menu.json';
import { langs } from '../i18n';
import { check, text, type Text } from './validate';

// The menu lives in content/menu.json so the pizzeria can edit it on GitHub.
// Anything malformed stops the build with a message naming the item and the field,
// so a bad edit never reaches the live site.

export interface Item {
  id: string;
  name: Text;
  desc: Text;
  price: number; // GEL, what the customer pays (the promo price during a promo)
  regularPrice?: number; // set only during a promo, shown struck through
  photo?: string; // file name in content/photos/
  // false: temporarily unavailable (shown greyed out, cannot be ordered).
  available: boolean;
}

export interface Category {
  id: string;
  name: Text;
  // false: shown for information only (served at the café, not ordered online).
  orderable: boolean;
  items: Item[];
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '');

function load(data: unknown): Category[] {
  const file = 'content/menu.json';
  const root = data as { categories?: unknown };
  check(Array.isArray(root?.categories) && root.categories.length > 0, file, '"categories" must be a list with at least one category');

  const seen = new Set<string>();
  const uniqueId = (wanted: string, where: string) => {
    check(!seen.has(wanted), file, `${where}: two entries end up with the id "${wanted}". Give one of them its own "id".`);
    seen.add(wanted);
    return wanted;
  };

  return (root.categories as Record<string, unknown>[]).map((c, ci) => {
    const where = `category ${ci + 1}`;
    const name = text(c.name, file, `${where} → "name"`);
    const id = uniqueId(typeof c.id === 'string' && c.id ? c.id : slug(name.en), where);
    check(c.orderable === undefined || typeof c.orderable === 'boolean', file, `${where} ("${name.en}") → "orderable" must be true or false, without quotes`);
    check(Array.isArray(c.items), file, `${where} ("${name.en}") → "items" must be a list`);

    // "hidden": true removes an item from the site for good but keeps it in the file;
    // "available": false shows it greyed out until it is back.
    const items = (c.items as Record<string, unknown>[])
      .map((i, ii) => {
        const at = `${where} ("${name.en}"), item ${ii + 1}`;
        const itemName = text(i.name, file, `${at} → "name"`);
        const label = `${at} ("${itemName.en}")`;
        check(typeof i.price === 'number' && i.price > 0, file, `${label} → "price" must be a number above 0, without quotes or ₾, e.g. 15 or 15.5`);
        check(
          i.promoPrice === undefined || (typeof i.promoPrice === 'number' && i.promoPrice > 0 && i.promoPrice < (i.price as number)),
          file,
          `${label} → "promoPrice" must be a number lower than "price", without quotes (remove the line to end the promo)`,
        );
        check(
          i.photo === undefined || (typeof i.photo === 'string' && /^[\w.-]+\.(jpe?g|png|webp)$/i.test(i.photo)),
          file,
          `${label} → "photo" must be a file name from content/photos/, e.g. "pepperoni.jpg"`,
        );
        check(i.available === undefined || typeof i.available === 'boolean', file, `${label} → "available" must be true or false, without quotes`);
        check(i.hidden === undefined || typeof i.hidden === 'boolean', file, `${label} → "hidden" must be true or false, without quotes`);
        if (i.hidden === true) return null;
        return {
          id: uniqueId(typeof i.id === 'string' && i.id ? i.id : slug(itemName.en), label),
          name: itemName,
          desc: i.description === undefined ? Object.fromEntries(langs.map((l) => [l, ''])) as Text : text(i.description, file, `${label} → "description"`),
          price: (i.promoPrice ?? i.price) as number,
          ...(i.promoPrice !== undefined && { regularPrice: i.price as number }),
          available: i.available !== false,
          ...(i.photo !== undefined && { photo: i.photo as string }),
        };
      })
      .filter((i): i is Item => i !== null);
    return { id, name, orderable: c.orderable !== false, items };
  }).filter((c) => c.items.length > 0);
}

export const menu: Category[] = load(raw);

// Only what can be ordered online right now can go into the cart.
export const items: Record<string, Item> = Object.fromEntries(
  menu.filter((c) => c.orderable).flatMap((c) => c.items.filter((i) => i.available).map((i) => [i.id, i])),
);

