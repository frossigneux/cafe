import { langs, type Lang } from '../i18n';

export type Text = Record<Lang, string>;

export function check(ok: unknown, file: string, message: string): asserts ok {
  if (!ok) throw new Error(`\n\n✗ ${file}: ${message}\n`);
}

// A text in the three site languages. Only one is required; missing ones fall back
// to English, then Georgian, then Russian.
export function text(value: unknown, file: string, where: string): Text {
  check(value && typeof value === 'object' && !Array.isArray(value), file, `${where} must look like { "ka": "…", "en": "…", "ru": "…" }`);
  const v = value as Record<string, unknown>;
  for (const key of Object.keys(v)) {
    check(langs.includes(key as Lang), file, `${where}: unknown language "${key}" (use "ka", "en" or "ru")`);
    check(typeof v[key] === 'string', file, `${where}.${key} must be text in quotes`);
  }
  const fallback = [v.en, v.ka, v.ru].find((s) => typeof s === 'string' && s.trim()) as string | undefined;
  check(fallback, file, `${where} needs at least one of "ka", "en" or "ru"`);
  return Object.fromEntries(langs.map((l) => [l, ((v[l] as string) || fallback).trim()])) as Text;
}

// Pages CMS writes empty fields as null or "" instead of leaving them out.
export const blank = (v: unknown) => v === undefined || v === null || v === '';

// Pages CMS stores photos as "/photos/x.jpg"; a bare "x.jpg" works too.
// Returns the file name inside content/photos/, or null if the value is not one.
export function photoFile(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const name = v.trim().replace(/^\/?(content\/)?photos\//, '');
  return /^[\w.-]+\.(jpe?g|png|webp)$/i.test(name) ? name : null;
}

// A text left empty in every language counts as no text.
export const blankText = (v: unknown) =>
  blank(v) || (typeof v === 'object' && Object.values(v as object).every((s) => blank(typeof s === 'string' ? s.trim() : s)));
