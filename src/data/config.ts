import raw from '../../content/settings.json';
import { check, text } from './validate';

// Settings live in content/settings.json so the pizzeria can edit them on GitHub.

const file = 'content/settings.json';
const s = raw as Record<string, any>;
const hhmm = /^([01]\d|2[0-3]):[0-5]\d$/;

check(typeof s.name === 'string' && s.name.trim(), file, '"name" must be the pizzeria name in quotes');
check(s.showPhoto === undefined || typeof s.showPhoto === 'boolean', file, '"showPhoto" must be true or false, without quotes');

const whatsapp = String(s.whatsapp ?? '').replace(/\D/g, '');
check(s.facebook === undefined || (typeof s.facebook === 'string' && /^https:\/\//.test(s.facebook)), file, '"facebook" must be the full page link starting with https://, or be removed');
check(whatsapp.length >= 9, file, '"whatsapp" must be the full number with country code, e.g. "+995 555 12 34 56"');

// Monday first. Each day is { "open": "10:00", "close": "22:00" } or "closed".
export const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
export type DayHours = { open: string; close: string } | null;
check(s.openingHours && typeof s.openingHours === 'object', file, '"openingHours" must list the seven days, e.g. "monday": { "open": "10:00", "close": "22:00" }');
for (const key of Object.keys(s.openingHours)) {
  check((weekdays as readonly string[]).includes(key), file, `"openingHours": unknown day "${key}" (use monday … sunday, in English)`);
}
const week: DayHours[] = weekdays.map((day) => {
  const h = s.openingHours[day];
  check(h !== undefined, file, `"openingHours" → "${day}" is missing (write "closed" if the café is closed that day)`);
  if (h === 'closed') return null;
  check(hhmm.test(h?.open) && hhmm.test(h?.close), file, `"openingHours" → "${day}" must look like { "open": "10:00", "close": "22:00" } (24-hour clock) or "closed"`);
  check(h.open < h.close, file, `"openingHours" → "${day}": "close" must be later than "open" (closing after midnight is not supported)`);
  return { open: h.open, close: h.close };
});
check(week.some(Boolean), file, '"openingHours": at least one day must be open');

for (const bank of ['bog', 'tbc'] as const) {
  const acc = s.bankAccounts?.[bank];
  check(acc && typeof acc.iban === 'string' && /^GE\d{2}[A-Z]{2}\d{16}$/.test(acc.iban.replace(/\s/g, '')), file, `"bankAccounts" → "${bank}" → "iban" must be a Georgian IBAN, e.g. "GE29 BG00 0000 0000 0000 00"`);
  check(typeof acc.holder === 'string' && acc.holder.trim(), file, `"bankAccounts" → "${bank}" → "holder" must be the account holder's name`);
}

const loc = s.location;
check(
  loc === undefined || (typeof loc?.lat === 'number' && typeof loc?.lng === 'number' && Math.abs(loc.lat) <= 90 && Math.abs(loc.lng) <= 180),
  file,
  '"location" must look like { "lat": 41.91935, "lng": 44.727734 } (numbers, no quotes), or be removed',
);

export const config = {
  name: s.name.trim() as string,
  // The café illustration (src/assets/cafe.jpg) at the top of the info card.
  showPhoto: s.showPhoto !== false,
  // Digits only, as https://wa.me/<number> expects.
  whatsapp,
  // Tbilisi time (UTC+4, no daylight saving).
  week,
  address: text(s.address, file, '"address"'),
  // Opens the pin in Google Maps (app on phones, website otherwise).
  location: loc ? { lat: loc.lat as number, lng: loc.lng as number } : null,
  // As written in settings, for display ("+995 593 62 80 90").
  phoneDisplay: String(s.whatsapp).trim(),
  facebook: (s.facebook as string | undefined) ?? null,
  mapUrl: loc ? `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}` : null,
  banks: {
    bog: { iban: s.bankAccounts.bog.iban.replace(/\s/g, '') as string, holder: s.bankAccounts.bog.holder as string },
    tbc: { iban: s.bankAccounts.tbc.iban.replace(/\s/g, '') as string, holder: s.bankAccounts.tbc.holder as string },
  },
};

export type BankId = keyof typeof config.banks;
