# MASTER PROMPT: Vyapo website rebuild (Concept C, "Kolkata Signage")

You are a senior front-end engineer and designer. Build the new vyapo.tech: a distinctive, polished, fast marketing site with a Vyapo ID sign-up/login area. Read this whole brief first, then post a short plan (stack, folder structure, phases, assumptions) and start building. Do not stop to ask questions unless something blocks you; state assumptions and mark them `TODO(confirm)`.

---

## 1. Context

**Company:** Vyapo (vyapo.tech), Newtown, Kolkata, India. Products and services: POS billing (KOT, GST, inventory, reports), EdTech support systems (school management), exam portals, and website/app development. Operates in alliance with **Anibotix** (robotics).

**Real clients to showcase:** Chakhana By Kilo, Veg Spicy Hut, Gharelu Khana (restaurants), Rainbow School (education). The business count is "10+" in total. Do not invent logos, testimonials, metrics, or uptime claims. Where real content is missing, use clearly marked placeholders (`TODO(content)`).

**Required alliance bar text (exact):** `Anibotix Alliance | Empowering POS, EdTech & Web Development Ecosystems`

**Contact:** `contact@vyapo.tech` (from the brand document; `TODO(confirm)`; the old site used a Gmail address). Social links are placeholders until supplied.

### References (open and study these)
- Brand and visibility document (attached PDF: `Anibotix_Vyapo_Brand__Visibility_Report_1.pdf`). Brand colors and alliance rules come from it. If it conflicts with this prompt, this prompt wins.
- Current site, for content inventory only: https://vyapo.tech
- Structure and attitude inspiration: https://www.anibotixrobotics.com (dark, acid-lime `#c8ff32`, confident and technical). Vyapo should feel like its sibling, not its twin: lighter, paper and ink, cobalt and orange.
- **Chosen concept sketch (C, Kolkata Signage):** https://claude.ai/artifact/XHz4G7Mwi5QTrsrioGxetF. Match its poster-scale condensed type, Bengali tag, sticker, marquee, and three flat sector panels.
- Sketch A (Receipt), for the order-slip contact form idea only: https://claude.ai/artifact/7mikpCFhUj4SKqnzjBk7F2
- Sketch B (Control Room), for the crosshair idea only (optional easter egg): https://claude.ai/artifact/29aPyc2DTFsfjpwjfzF4Xi

---

## 2. Design direction

**One line:** Kolkata shop-signage energy, refined. Loud poster typography and flat color blocks, with calm spacing, fine borders and polished interaction.

**Reduce brutalism versus the sketch:**
- Borders are 2px ink. Hard offset shadows (3 to 4px) only on pressable things (buttons, openable cards).
- UI controls (inputs, buttons, ID card) get 6px radius. Big poster panels stay square.
- More whitespace around loud type. Real photography and screenshots in cobalt/orange duotone where available.

### Tokens
```
--ink:#0B132B  --paper:#F4F6F9  --blue:#0052CC  --orange:#FF8C00  --white:#FFFFFF
```
- Flat color only. The blue-to-orange gradient appears only inside the logo glyph.
- Check contrast: no orange text on paper for body copy; use ink on orange.

### Typography (self-host woff2, subset Latin + Bengali, `font-display: swap`, preload the display and text faces, set `size-adjust` fallbacks to avoid layout shift)
- Display (poster headlines): **Druk Condensed** if licensed. Otherwise **Clash Display**, with **Anton** as the last-resort fallback.
- Text/UI: **General Sans** (Fontshare, free commercial use). Fallback: system sans.
- Bengali: **Anek Bangla**.
- Mono labels (sparingly): JetBrains Mono.
- Do NOT use Inter, Plus Jakarta Sans, Montserrat, Poppins or Space Grotesk.

### Logo (create as clean SVG, vector, in `/public/brand`)
1. **Primary mark:** a bold "V" whose right stroke extends upward like a checkmark/growth arrow, with square terminals, built on a strict grid. Blue-to-orange gradient inside the glyph only.
2. **Wordmark:** custom-cut "VYAPO" in the display face, with notched V.
3. **Lockups:** mark + wordmark horizontal; mono (ink) and reversed (paper) versions.
4. **Stamp seal:** circular "VYAPO · VERIFIED · BILLING" for the client wall.
5. **Vyapo ID badge:** the mark inside a small ID-card notch shape.
6. **Favicon and app icon** (SVG + PNG 192/512), plus an OG image (1200x630).
7. **Alliance lockup:** `VYAPO × ANIBOTIX`.

### Anti-"AI template" rules
No purple/indigo gradients, no glassmorphism or frosted blur, no emoji as icons, no centered hero + three identical rounded cards, no stock-photo people, no filler copy ("seamlessly", "elevate", "unlock"). Copy is direct, plain and a little Kolkata-local. Icons: a single consistent set (Lucide or Phosphor, 2px stroke), used sparingly.

---

## 3. Tech stack and architecture

- **Next.js (App Router) + TypeScript + Tailwind CSS.** Server Components by default; make only the animated or interactive parts client islands.
- **GSAP + ScrollTrigger** for scroll choreography. **Lenis** for smooth scroll, driven from `gsap.ticker` (a single shared rAF loop; `lenis.raf` inside the ticker, `lagSmoothing(0)`).
- **Howler.js or the Web Audio API** for sound, loaded lazily after the gate click.
- `next/image` (AVIF/WebP, explicit dimensions), `next/font/local`.
- Forms: `react-hook-form` + `zod`. State: React state/Zustand only where truly needed. No heavy UI kit.
- Deploy target: Vercel (preview deploys per branch).

### Performance rules (non-negotiable; this is the "no stutter, snappy" requirement)
1. **Animate only `transform` and `opacity`.** Never animate width/height/top/left/margin, `filter`, `backdrop-filter`, large `box-shadow`, or gradients.
2. **One scroll loop.** No `scroll` event listeners that set React state. Scroll-linked values go through GSAP/ScrollTrigger and write straight to the DOM. No layout reads (`getBoundingClientRect`, `offsetHeight`) inside animation callbacks.
3. **Scrub with light smoothing.** Use `scrub: 0.4` to `0.6` (not `1+`) so motion tracks the scroll tightly and reverses instantly in both directions. Use `anticipatePin: 1`. Prefer `pinType: "transform"` only if native pinning causes jitter.
4. **Lenis tuning:** `lerp` about 0.1, `syncTouch: false` (leave native touch scrolling on phones; do not hijack it). Disable smooth scrolling under `prefers-reduced-motion`.
5. **`will-change` only on elements actively animating**, and remove it when done. Use `contain: layout paint` on panels. Use `translate3d` where it helps on mobile Safari.
6. **Responsive timelines with `gsap.matchMedia()`.** Desktop gets the full pinned choreography; below 768px use fewer pins and simpler transforms. Kill and rebuild timelines cleanly on resize (debounced), and call `ScrollTrigger.refresh()` after fonts and images load.
7. **Interaction speed:** every button, link and toggle responds visually in under 100 ms (`:active` state, no waiting on network). Transitions are 120 to 220 ms with crisp easing (`power3.out` or `cubic-bezier(.2,.8,.2,1)`). No transition on `all`. Use optimistic UI for forms.
8. **Route changes:** prefetch links on hover and viewport entry; use the View Transitions API with a graceful fallback for a hard "shutter wipe" page transition. Keep layout shells (navbar, footer) mounted.
9. **Bundle discipline:** initial JS at most about 200 KB gzipped. Dynamically import the live demos, the audio engine and the auth forms. Lazy-load below-fold images and any video (`preload="none"`, poster frames, muted loops under 1.5 MB, with WebM and MP4).
10. **Targets (measure on a throttled mid-range Android profile: 4x CPU slowdown, Fast 4G):** LCP under 2.0 s, CLS under 0.05, INP under 150 ms, steady 60 fps while scrolling in both directions, no long tasks over 50 ms during scroll.

---

## 4. Global behaviours

### Opener: the shop shutter
- On first visit per session, the page loads fully *beneath* a closed rolling-shutter overlay (ribbed ink panel with the Vyapo mark). This keeps SEO, LCP and no-JS usable.
- Two buttons: **"Enter with sound"** and **"Enter silent"** (with the Bengali "খুলুন" as a small label). Clicking plays a ~1.2 s shutter-roll-up animation (transform only) and, if sound is on, the shutter sound plus the ~3 to 4 s brand jingle (upbeat electronic percussion and warm synth pad).
- **Skip** link visible at all times; Escape also skips. Total intro at most ~3 s. Store the choice in `sessionStorage` (and the sound preference in `localStorage`). Do not replay within the session.
- Autoplay-safe: audio starts only after the click. Honour `prefers-reduced-motion` (replace the shutter with a quick fade and no sound).
- Accessibility: the gate is a focus-trapped dialog; the page behind is `inert` until dismissed.
- **Audio assets:** until real files exist, synthesize the shutter, jingle and click/success ticks with the Web Audio API in `lib/audio.ts`, behind a swappable interface (`play('shutter' | 'jingle' | 'tick' | 'success')`). Keep any later files under ~100 KB each.

### Navbar
- Left: logo mark and wordmark. Center/right: **Products** (mega-menu: POS, EdTech, Exam Portals, Web & Apps), **Work**, **Alliance**, **Contact**. Far right: sound toggle (aria-pressed, with state saved), then **Log in** and **Sign up** (Vyapo ID).
- Transparent at the top, solid and bordered after about 40px of scroll. Hides on scroll down, reappears on scroll up (both directions animate with transforms only). Its color theme switches to match the section behind it (paper, cobalt, navy), driven by section markers.
- Mobile: a full-screen signage-style menu with large type and staggered links; trap focus; close on Escape.
- Skip-to-content link; visible focus rings (3px blue or orange).

### Cursor and micro-interactions (desktop only, subtle)
- A small custom cursor that grows over interactive items and shows a label ("OPEN", "VIEW"). Never hide the system cursor on touch devices. Magnetic effect on primary buttons (a few pixels only).

---

## 5. Home page sections (scroll choreography)

All scroll effects are **scrubbed and fully reversible**: scrolling up replays them in reverse with no jumps. Never use one-shot "play once" reveals for primary motion; if a small reveal is used, it must reset when the element leaves the viewport in either direction.

1. **Alliance bar + Hero poster.** The bar is a slow marquee. Hero: two giant "VYAPO" words (one solid ink, one cobalt outline) slide apart horizontally as you scroll; the Bengali "ব্যবসা" tag drifts and rotates; the "10+ businesses billing with us" sticker spins slowly; the whole poster scales back and fades as you leave. Short subhead and two CTAs ("Book a demo", "See our work").
2. **Client marquee.** Names (with stamp logos once provided) scroll with *velocity-reactive* speed, and the direction flips when you scroll up.
3. **Bill it / Teach it / Build it (pinned).** Three full-width panels (paper, cobalt, ink) stack over each other like shutters as you scroll; the page background and navbar theme morph in sync. Each panel: huge condensed headline, one-line promise, key capabilities, link to its page.
4. **Try it live (pinned).** A device mockup. Scroll steps through (a) a working mini POS where items can be tapped to build a bill with GST total, then (b) an exam portal with timer and question palette. Demos must also be fully usable by click and touch, not only by scroll.
5. **Work (pinned horizontal).** Vertical scroll drives a horizontal strip of client "dossier" cards: client name, type, what we built, 2 to 3 outcomes (`TODO(content)` if unknown), screenshot area. Each card opens `/work/[slug]`.
6. **How we work.** Discover, Build, Deploy, Support as a real sequence; a connector line draws itself with scroll (reversible), steps highlight as it passes.
7. **Alliance.** The "VYAPO" and "ANIBOTIX" halves slide together and lock into the `VYAPO × ANIBOTIX` lockup, with two short paragraphs explaining the partnership (software + robotics). `TODO(content)`.
8. **Proof.** Testimonials in simple cards (real quotes only; mark placeholders) and honest counters tied to scroll (up and back down). Show only numbers provided by the client.
9. **Vyapo ID teaser.** An ID card that tilts and flips with scroll, copy: one ID for everything Vyapo builds. CTA: Sign up.
10. **Contact + footer.** The contact form styled as an order slip (name, phone, what do you need, optional message) with instant, optimistic submit feedback. Footer: a giant wordmark revealed like a curtain as you reach the end, with links, contact and the alliance lockup.

### Other routes
`/pos`, `/edtech`, `/exam-portal`, `/web`, `/work`, `/work/[slug]`, `/alliance`, `/contact`, `/privacy`, `/terms`, a custom 404. Product pages reuse the same visual language with one pinned moment each, not the full home choreography.

---

## 6. Vyapo ID (auth area)

**Goal:** a person creates one Vyapo ID that will later sign them into future Vyapo SaaS products. The auth provider has NOT been chosen yet, so build the UI, routes and flows now and put the provider behind an adapter.

- Routes (for now inside this app; later movable to `id.vyapo.tech`): `/id/login`, `/id/signup`, `/id/verify`, `/id/onboarding`, `/id/forgot`, and a placeholder `/dashboard` showing "Your products" (POS, EdTech, Exam Portal, Web as cards with "Coming soon / Request access").
- Data model (in types and a mock adapter): `User` (the person; owns the Vyapo ID) → `Workspace` (a business such as a restaurant or school) → `Membership` (role: owner, staff, viewer). One user can belong to several workspaces.
- Sign-up flow: phone (+91 by default) or email, then an OTP via a six-box code input (autofill, paste, auto-advance, resend countdown), then business type (restaurant, school/institute, other), workspace name, then the Vyapo ID is issued and the user lands on the dashboard.
- Also include "Continue with Google" as a UI option behind the adapter.
- `lib/auth/adapter.ts` defines the interface (`signUp`, `requestOtp`, `verifyOtp`, `signIn`, `signOut`, `getSession`). Ship a **mock adapter** only; do not implement your own password hashing or token logic. Mark `TODO(auth-provider)` where a managed or self-hosted OIDC provider will plug in.
- UX: the auth pages use the same signage identity but calmer (no big parallax). Inline validation, clear loading, error and success states, disabled-while-submitting buttons, and focus management. Never log or display OTPs in production code paths.
- Security hygiene in the scaffold: CSRF-safe patterns, rate-limit placeholders on OTP requests, `noindex` on `/id/*` and `/dashboard`, secure cookie settings documented for later (`Domain=.vyapo.tech`, `HttpOnly`, `Secure`, `SameSite=Lax`).

---

## 7. Accessibility, SEO, content

- WCAG 2.1 AA: contrast, keyboard operability for everything (including demos and menus), visible focus, semantic landmarks, alt text, `aria-live` for sound and form status. All motion respects `prefers-reduced-motion` (no parallax, no sound, simple fades).
- `lang="en"` with `lang="bn"` on Bengali text.
- Metadata, Open Graph and Twitter cards, canonical URLs, `sitemap.xml`, `robots.txt`, JSON-LD (Organization, LocalBusiness with Newtown, Kolkata address `TODO(confirm)`).
- Analytics: privacy-friendly, optional, behind a single config flag.
- Content: use only provided or clearly marked placeholder content. Keep a `content/` folder (typed objects or MDX) so copy and case studies can be edited without touching components.

---

## 8. How to work

1. **Plan first** (a short message): stack, folders, the phase list, and assumptions.
2. **Phase 1:** project scaffold, tokens, fonts, logo SVGs, layout shell, navbar, scroll engine (Lenis + GSAP wiring), opener with audio engine.
3. **Phase 2:** home sections 1 to 5, with full reversibility checks.
4. **Phase 3:** sections 6 to 10, product pages, work pages, contact.
5. **Phase 4:** Vyapo ID screens and mock adapter, dashboard placeholder.
6. **Phase 5:** performance, accessibility and SEO pass; polish.

After each phase, **verify before moving on**: run the app and the production build; scroll the full home page down and up at 360, 768 and 1440 px widths; throttle CPU 4x and confirm no dropped frames or layout shifts; check keyboard-only navigation; run Lighthouse and report LCP, CLS and INP against the targets. Fix anything that misses the targets, and list any remaining issue honestly instead of hiding it.

## 9. Definition of done
- Every section's scroll animation plays forward and backward smoothly, with no jumps, flashes or re-trigger bugs.
- Clicks, taps and toggles feel instant (visible response under 100 ms).
- No horizontal page overflow at any width; no layout shift from fonts or images.
- The opener works, can be skipped, never autoplays sound, and does not replay in the session.
- Vyapo ID flows are complete against the mock adapter, with all states handled.
- Lighthouse performance 90+ on mobile profile, accessibility 95+, SEO 95+.
- No placeholder text left unmarked; all `TODO(...)` items listed in a final summary.
