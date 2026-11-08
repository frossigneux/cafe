import { items } from '../data/menu';
import { t, itemCount, price, type Lang } from '../i18n';

const lang = document.documentElement.lang as Lang;
const body = document.body;
const CART_KEY = 'cafe.cart';
const CUSTOMER_KEY = 'cafe.customer';

const store = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* private mode: the cart just won't survive a reload */
    }
  },
};

const cart = new Map<string, number>(
  Object.entries(store.get<Record<string, number>>(CART_KEY, {})).filter(([id, n]) => items[id] && n > 0),
);

const $ = <T extends Element>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel)!;
const $$ = <T extends Element>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

const dock = $<HTMLElement>('[data-dock]');
const toggle = $<HTMLButtonElement>('[data-toggle]');
const scrim = $<HTMLElement>('[data-scrim]');
const dockTitle = $<HTMLElement>('.dock-title');
const form = $<HTMLFormElement>('[data-form]');
const lines = $<HTMLUListElement>('[data-lines]');
const sent = $<HTMLElement>('[data-sent]');
const nameInput = form.elements.namedItem('name') as HTMLInputElement;
const nameHint = $<HTMLElement>('[data-name-hint]');
const formError = $<HTMLElement>('[data-form-error]');
const clearBtn = $<HTMLButtonElement>('[data-clear]');
const foot = $<HTMLElement>('[data-foot]');
const metaText = $<HTMLElement>('[data-meta-text]');
const pickupSelect = $<HTMLSelectElement>('[data-pickup]');
const desktop = matchMedia('(min-width: 960px)');

const units = () => [...cart.values()].reduce((a, n) => a + n, 0);
const total = () => [...cart].reduce((a, [id, n]) => a + items[id].price * n, 0);

function change(id: string, delta: number) {
  const n = Math.max(0, (cart.get(id) ?? 0) + delta);
  if (n) cart.set(id, n);
  else cart.delete(id);
  store.set(CART_KEY, Object.fromEntries(cart));
  formError.textContent = '';
  leaveSent();
  render();
  if (delta > 0) bump();
}

// The "sent" confirmation is for the order that just left; any new activity
// (adding an item, closing the sheet) brings back the form and its send button.
function leaveSent() {
  if (sent.hidden) return;
  sent.hidden = true;
  form.hidden = false;
}

function qtyControl(id: string, n: number): HTMLElement {
  const name = items[id].name[lang];
  const el = document.createElement('div');
  el.className = 'qty';
  el.dataset.qty = String(n);
  el.innerHTML = `
    <button class="qty-btn" type="button" data-remove aria-label="${t(lang, 'removeOne', { name })}"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12"/></svg></button>
    <output class="qty-n">${n}</output>
    <button class="qty-btn" type="button" data-add aria-label="${t(lang, 'addOne', { name })}"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12"/></svg></button>`;
  return el;
}

function render() {
  const count = units();
  const sum = price(total());

  for (const row of $$<HTMLElement>('[data-item]')) {
    const id = row.dataset.item!;
    const n = cart.get(id) ?? 0;
    const qty = $<HTMLElement>('.qty', row);
    qty.dataset.qty = String(n);
    $<HTMLElement>('[data-count]', row).textContent = String(n);
    row.classList.toggle('is-in', n > 0);
  }

  $<HTMLElement>('[data-units]').textContent = String(count);
  $<HTMLElement>('[data-count-label]').textContent = count ? itemCount(lang, count) : t(lang, 'empty');
  for (const el of $$<HTMLElement>('[data-total]')) el.textContent = sum;

  lines.replaceChildren(
    ...[...cart].map(([id, n]) => {
      const li = document.createElement('li');
      li.dataset.line = id;
      const nm = document.createElement('span');
      nm.className = 'l-name';
      nm.textContent = items[id].name[lang];
      const pr = document.createElement('span');
      pr.className = 'l-price';
      pr.textContent = price(items[id].price * n);
      li.append(nm, qtyControl(id, n), pr);
      return li;
    }),
  );
  $<HTMLElement>('[data-empty]').hidden = count > 0;
  clearBtn.hidden = count === 0;
  foot.hidden = count === 0 || !sent.hidden;
  dock.toggleAttribute('data-has', count > 0);
  syncTitle();
  updateMeta();
}

// A short pulse on the order bar confirms the add without moving the page.
function bump() {
  toggle.classList.remove('is-bump');
  void toggle.offsetWidth;
  toggle.classList.add('is-bump');
}

function updateMeta() {
  const opt = pickupSelect.selectedOptions[0];
  metaText.textContent = `${opt ? opt.text : ''} · ${payLabel(currentPay())}`;
}

// ── Quantity buttons (menu and order lines) ──────────────

document.addEventListener('click', (e) => {
  const btn = (e.target as Element).closest<HTMLButtonElement>('[data-add], [data-remove]');
  if (!btn) return;
  const id = btn.closest<HTMLElement>('[data-item], [data-line]')!;
  const itemId = id.dataset.item ?? id.dataset.line!;
  const removing = btn.hasAttribute('data-remove');
  change(itemId, removing ? -1 : 1);
  // Keep focus on a control that still exists after the re-render.
  if (id.dataset.item) {
    const n = cart.get(itemId) ?? 0;
    const next = n && removing ? $<HTMLButtonElement>('[data-remove]', id) : $<HTMLButtonElement>('[data-add]', id);
    next?.focus();
  } else {
    const row = lines.querySelector<HTMLElement>(`[data-line="${itemId}"]`);
    (row ? $<HTMLButtonElement>(removing ? '[data-remove]' : '[data-add]', row) : nameInput).focus();
  }
});

// ── Dock open / close (phones) ───────────────────────────

function syncTitle() {
  const open = dock.dataset.state === 'open';
  dockTitle.textContent = open ? dockTitle.dataset.title! : dockTitle.dataset.view!;
}

function setOpen(open: boolean) {
  if (!open) leaveSent();
  if (desktop.matches) open = true;
  dock.dataset.state = open ? 'open' : 'collapsed';
  syncTitle();
  toggle.setAttribute('aria-expanded', String(open));
  scrim.hidden = !open || desktop.matches;
  document.documentElement.style.overflow = open && !desktop.matches ? 'hidden' : '';
}

toggle.addEventListener('click', () => {
  if (!desktop.matches) setOpen(dock.dataset.state !== 'open');
});
scrim.addEventListener('click', () => setOpen(false));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && dock.dataset.state === 'open' && !desktop.matches) {
    setOpen(false);
    toggle.focus();
  }
});
desktop.addEventListener('change', () => {
  toggle.tabIndex = desktop.matches ? -1 : 0;
  setOpen(false);
});
toggle.tabIndex = desktop.matches ? -1 : 0;

// Desktop: the sticky order panel sits lower at the top of the page, so size it to the
// space actually visible; otherwise its send button falls below the fold.
let fitQueued = false;
function fitDock() {
  fitQueued = false;
  if (!desktop.matches) return dock.style.removeProperty('--dock-top');
  dock.style.setProperty('--dock-top', `${Math.max(72, dock.getBoundingClientRect().top)}px`);
}
const queueFit = () => {
  if (!fitQueued) requestAnimationFrame(fitDock);
  fitQueued = true;
};
addEventListener('scroll', queueFit, { passive: true });
addEventListener('resize', queueFit);
desktop.addEventListener('change', queueFit);
queueFit();

// ── Opening hours and pickup slots (Tbilisi time) ────────

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const fmt = (min: number) => `${String(Math.floor(min / 60) % 24).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;

// Minutes since midnight and weekday (0 = Monday) in Tbilisi.
function tbilisiNow(): { min: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Tbilisi',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(get('weekday'));
  return { min: Number(get('hour')) * 60 + Number(get('minute')), day };
}

type DayHours = { open: string; close: string } | null;
const week = JSON.parse(body.dataset.week!) as DayHours[];
const dayNames = JSON.parse(body.dataset.days!) as string[];

function setupHours() {
  const { min: now, day } = tbilisiNow();
  const today = week[day];
  const isOpen = !!today && now >= toMin(today.open) && now < toMin(today.close);
  const status = $<HTMLElement>('[data-status]');
  body.toggleAttribute('data-closed', !isOpen);

  // Next opening: later today, or the first open day after today.
  let next = { offset: 0, open: today ? toMin(today.open) : -1, close: today ? toMin(today.close) : -1 };
  if (!isOpen && !(today && now < toMin(today.open))) {
    for (let k = 1; k <= 7; k++) {
      const h = week[(day + k) % 7];
      if (h) {
        next = { offset: k, open: toMin(h.open), close: toMin(h.close) };
        break;
      }
    }
  }
  if (isOpen) status.textContent = status.dataset.openText!;
  else if (next.offset === 0) status.textContent = status.dataset.closedText!.replace('{t}', fmt(next.open));
  else
    status.textContent = status.dataset.closedDayText!.replace('{d}', dayNames[(day + next.offset) % 7]).replace('{t}', fmt(next.open));

  for (const row of $$<HTMLElement>('.hours tr')) row.classList.toggle('is-today', Number(row.dataset.day) === day);

  // Pickup slots every 15 minutes: from the next quarter hour today, or from the next opening.
  const select = pickupSelect;
  const keep = select.value;
  const prefix = next.offset ? `${dayNames[(day + next.offset) % 7]} ` : '';
  const first = isOpen ? Math.ceil((now + 1) / 15) * 15 : next.open;
  const options: HTMLOptionElement[] = [];
  if (isOpen) options.push(new Option(select.dataset.asap!, 'asap'));
  const dayKey = next.offset ? `${(day + next.offset) % 7}@` : '';
  for (let m = Math.ceil(first / 15) * 15; m <= next.close; m += 15) options.push(new Option(prefix + fmt(m), dayKey + fmt(m)));
  select.replaceChildren(...options);
  if (options.some((o) => o.value === keep)) select.value = keep;
  updateMeta();
}


// ── Payment and bank details ─────────────────────────────

const bank = $<HTMLElement>('[data-bank]');
const payInputs = $$<HTMLInputElement>('input[name="pay"]');
const payLabel = (v: string) => t(lang, v === 'bog' ? 'payBog' : v === 'tbc' ? 'payTbc' : 'payPickup');
const currentPay = () => payInputs.find((i) => i.checked)?.value ?? 'pickup';

function showBank() {
  const pay = currentPay();
  bank.hidden = pay === 'pickup';
  for (const acc of $$<HTMLElement>('[data-bank-acc]', bank)) acc.hidden = acc.dataset.bankAcc !== pay;
}

for (const input of payInputs) input.addEventListener('change', () => {
  showBank();
  saveCustomer();
  updateMeta();
});
pickupSelect.addEventListener('change', updateMeta);

document.addEventListener('click', async (e) => {
  const btn = (e.target as Element).closest<HTMLButtonElement>('[data-copy]');
  if (!btn) return;
  const label = $<HTMLElement>('span', btn);
  const original = label.textContent;
  try {
    await navigator.clipboard.writeText(btn.dataset.copy!);
    label.textContent = btn.dataset.copied!;
    btn.classList.add('is-done');
    setTimeout(() => {
      label.textContent = original;
      btn.classList.remove('is-done');
    }, 2000);
  } catch {
    // Clipboard blocked: select the IBAN so it can be copied by hand.
    const iban = btn.parentElement!.querySelector('.bank-iban')!;
    getSelection()?.selectAllChildren(iban);
  }
});

// ── Remembered customer ──────────────────────────────────

function saveCustomer() {
  store.set(CUSTOMER_KEY, { name: nameInput.value.trim(), pay: currentPay() });
}

const customer = store.get<{ name?: string; pay?: string }>(CUSTOMER_KEY, {});
if (customer.name) nameInput.value = customer.name;
const savedPay = payInputs.find((i) => i.value === customer.pay);
if (savedPay) savedPay.checked = true;
showBank();

nameInput.addEventListener('input', () => {
  if (nameInput.value.trim()) setNameError(false);
});
nameInput.addEventListener('change', saveCustomer);

function setNameError(on: boolean) {
  nameInput.setAttribute('aria-invalid', String(on));
  nameHint.textContent = on ? nameHint.dataset.error! : nameHint.dataset.hint!;
  nameHint.classList.toggle('is-error', on);
}

// ── Send on WhatsApp ─────────────────────────────────────

// The message always starts in Georgian for the staff; visitors on the English or
// Russian page also get their own language below a separator.
function message(): string {
  const data = new FormData(form);
  const pickup = String(data.get('pickup'));
  const note = String(data.get('note') ?? '').trim();
  const name = nameInput.value.trim();
  const pay = currentPay();

  const block = (l: Lang) => {
    const out = [t(l, 'msgHello'), t(l, 'msgOrder'), ''];
    for (const [id, n] of cart) out.push(`${n} × ${items[id].name[l]} — ${price(items[id].price * n)}`);
    out.push('', `${t(l, 'msgTotal')}: ${price(total())}`);
    out.push(`${t(l, 'msgName')}: ${name}`);
    out.push(`${t(l, 'msgPickup')}: ${pickupLabel(pickup, l)}`);
    out.push(`${t(l, 'msgPayment')}: ${t(l, pay === 'bog' ? 'payBog' : pay === 'tbc' ? 'payTbc' : 'payPickup')}`);
    if (note) out.push(`${t(l, 'msgNote')}: ${note}`);
    out.push('', t(l, 'msgConfirm'));
    return out.join('\n');
  };

  return lang === 'ka' ? block('ka') : `${block('ka')}\n\n— — — — —\n\n${block(lang)}`;
}

// Pickup values are "asap", "HH:MM" (today) or "<weekday 0-6, Monday first>@HH:MM".
function pickupLabel(value: string, l: Lang): string {
  if (value === 'asap') return t(l, 'asap');
  const [day, time] = value.includes('@') ? value.split('@') : [null, value];
  if (day === null) return time;
  const weekday = new Intl.DateTimeFormat(l, { weekday: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2024, 0, 1 + Number(day))));
  return `${weekday} ${time}`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!units()) {
    setOpen(true);
    formError.textContent = formError.dataset.emptyError!;
    return;
  }
  if (!nameInput.value.trim()) {
    setOpen(true);
    setNameError(true);
    nameInput.focus();
    return;
  }
  saveCustomer();
  openWhatsApp(message());

  const acc = currentPay() === 'pickup' ? null : bank.cloneNode(true) as HTMLElement;
  const sentBank = $<HTMLElement>('[data-sent-bank]');
  sentBank.replaceChildren();
  if (acc) {
    acc.hidden = false;
    acc.removeAttribute('data-bank');
    sentBank.append(acc);
  }
  // The order now lives in WhatsApp: empty the cart.
  cart.clear();
  store.set(CART_KEY, {});
  form.hidden = true;
  sent.hidden = false;
  render();
  setOpen(true);
  sent.focus();
});

// Phones: open the WhatsApp app directly (no api.whatsapp.com tab left behind), and fall
// back to the web link if the app did not take over. Computers: WhatsApp Web / desktop app.
function openWhatsApp(text: string) {
  const phone = body.dataset.wa!;
  const webUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  const ua = navigator.userAgent;
  const isPhone = /Android|iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  if (!isPhone) {
    if (!window.open(webUrl, '_blank', 'noopener')) location.href = webUrl;
    return;
  }
  let appOpened = false;
  const onHide = () => {
    if (document.visibilityState === 'hidden') appOpened = true;
  };
  const onLeave = () => (appOpened = true);
  document.addEventListener('visibilitychange', onHide);
  addEventListener('pagehide', onLeave);
  location.href = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(text)}`;
  setTimeout(() => {
    document.removeEventListener('visibilitychange', onHide);
    removeEventListener('pagehide', onLeave);
    if (!appOpened) location.href = webUrl;
  }, 1500);
}

$<HTMLButtonElement>('[data-new]').addEventListener('click', () => {
  form.reset();
  nameInput.value = store.get<{ name?: string }>(CUSTOMER_KEY, {}).name ?? '';
  sent.hidden = true;
  form.hidden = false;
  showBank();
  render();
  setOpen(false);
  scrollTo({ top: 0 });
});

clearBtn.addEventListener('click', () => {
  cart.clear();
  store.set(CART_KEY, {});
  formError.textContent = '';
  render();
  toggle.focus();
});

// ── Remember the language picked with the switcher ───────

for (const link of $$<HTMLAnchorElement>('.lang a')) {
  link.addEventListener('click', () => {
    try {
      localStorage.setItem('cafe.lang', link.hreflang); // read raw by the inline redirect in <head>
    } catch {
      /* private mode: the browser language decides next time */
    }
  });
}

// ── Category pills follow the scroll ─────────────────────

const cats = $<HTMLElement>('.cats-inner');
const pills = $$<HTMLAnchorElement>('.cats a');
const sections = $$<HTMLElement>('.cat');
let activeHash = '';
let spyQueued = false;

// The active tab is the last category whose heading has passed under the sticky tabs.
function syncTabs() {
  spyQueued = false;
  const line = cats.getBoundingClientRect().bottom + 24;
  const current = sections.filter((sec) => sec.getBoundingClientRect().top <= line).pop() ?? sections[0];
  const hash = `#${current.id}`;
  if (hash === activeHash) return;
  activeHash = hash;
  for (const p of pills) {
    const on = p.hash === hash;
    p.toggleAttribute('aria-current', on);
    // Scroll only the tab strip sideways. scrollIntoView would also nudge the
    // page vertically, which made the page bounce back while scrolling.
    if (on) {
      const left = p.offsetLeft - cats.offsetLeft; // both measured from the sticky .cats
      if (left < cats.scrollLeft || left + p.offsetWidth > cats.scrollLeft + cats.clientWidth) {
        cats.scrollTo({ left: Math.max(0, left - 16), behavior: 'smooth' });
      }
    }
  }
}
addEventListener(
  'scroll',
  () => {
    if (!spyQueued) requestAnimationFrame(syncTabs);
    spyQueued = true;
  },
  { passive: true },
);
syncTabs();

setupHours();
setInterval(setupHours, 60_000);
render();
setOpen(false);
