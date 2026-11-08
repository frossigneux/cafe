# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Astro. The pages are mostly static (menu, info), so Astro ships them as plain HTML with near-zero JS, which keeps load fast on phones. The cart is the only interactive part and can be a single island that builds a pre-filled WhatsApp message link. With no backend, the whole site can be hosted as static files. Deploy target: GitHub Pages from the public repo frossigneux/pizzeria for now (https://frossigneux.github.io/pizzeria/); moving to Cloudflare Pages with a private repo is documented in README.md. The menu and settings live in `content/*.json` so the pizzeria can edit them on github.com; every commit rebuilds the site, and a malformed file fails the build without touching the live site.

## Users

Customers in Georgia ordering online from Family, a café (storefront: coffee, tea, cakes, pizza). Pizzas, cakes and canned cold drinks are ordered online; coffee and tea are listed for information and served at the café. The audience mixes Georgian speakers, Russian speakers, and English-speaking visitors and expats. They are usually hungry and want to get food quickly, so the order should take as few steps as possible.

## Product Purpose

Let customers browse the menu and place a pickup order quickly, sent via WhatsApp. Success means a customer goes from landing on the site to a confirmed order with little friction, and comes back to order again.

## Positioning

Fast and good value: quick service, fair prices, orders ready on time. The product should feel like that promise in practice. The ordering flow itself is the evidence of speed and value.

## Capabilities and Constraints

- Core flow: browse menu → build cart → send the order via WhatsApp. The site composes the order, and WhatsApp carries it to the pizzeria. There is no order backend.
- Guest checkout only: no customer accounts.
- No delivery: customers pick up their order or eat in at the café.
- Payment: the customer chooses between a bank transfer to the pizzeria's account at TBC or Bank of Georgia (BOG), done from their banking app, and paying at pickup. No card-payment gateway.
- Languages: Georgian, English, Russian.
- No staff/kitchen view in scope. The pizzeria receives and confirms orders in WhatsApp.
- Location: Georgia. Prices in GEL (₾).
- Open decisions: real opening hours, pickup address text, and the BOG/TBC account details (IBAN, account holder).

## Brand Commitments

- Visual direction (chosen 2026-10-27 after a first "metro line" design felt cold): the category standard for restaurant ordering, warm and light, executed at Wolt's level of finish. Convention is the commitment: no metaphor layered on top.
- No food photos until the pizzeria supplies its own; never use stock photos.

## Evidence on Hand

Name: მაი & Family (from the storefront sign; the Georgian word may continue beyond what photos show). Location pin: 41.91935, 44.727734. WhatsApp / phone: +995 593 62 80 90 (business card). Address: სოფ. ნატახტარი (Natakhtari village). Facebook: https://www.facebook.com/share/1FirPqmoLS/. Real menu (photos of the printed menu, 2026-11-08) is in content/menu.json; cold-drink prices were read from a photo of the fridge and are approximate. No logo yet. Placeholders remain in content/*.json (IBANs, hours, most prices). On 2026-10-28 the user removed the "sample" labels feature entirely, so the site shows these values as-is; replacing them before real customers use the site is on the owner. Never present invented names, dishes, prices, reviews or photos as real.

## Product Principles

1. **Speed is the brand.** Every screen should get a hungry customer closer to a confirmed order. Cut any step that does not do that.
2. **Value is shown plainly.** Prices, fees and totals are always visible and honest, with no surprises at checkout.
3. **Reliability builds repeat orders.** Order status, timing and confirmation are clear, and reordering is easy.
4. **Phone first in practice.** Most orders happen on a phone, often while the customer is doing something else, so the flow must work one-handed and on slow connections.
