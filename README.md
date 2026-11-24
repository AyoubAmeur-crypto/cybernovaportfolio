<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./public/assets/readme-banner-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="./public/assets/readme-banner-light.svg" />
    <img alt="salmaatou — Cybersecurity Engineer Portfolio" src="./public/assets/readme-banner-light.svg" width="680" />
  </picture>

  <p>
    <strong>Personal cybersecurity portfolio of Salma Atou</strong> — bridging continuous Security Operations Center (SOC) monitoring and incident response with structured offensive security across web applications, APIs, and Active Directory.
  </p>

  <p>
    <a href="https://www.linkedin.com/in/salma-atou-532846332"><strong>LinkedIn</strong></a>
    &nbsp;·&nbsp;
    <a href="https://tryhackme.com/p/SalmaAtouCyberNova"><strong>TryHackMe</strong></a>
    &nbsp;·&nbsp;
    <a href="mailto:Salmaatouofficiel@gmail.com"><strong>Salmaatouofficiel@gmail.com</strong></a>
  </p>
</div>

---

## Overview

**salmaatou** is an editorial cybersecurity engineering portfolio designed with a studio-crafted visual identity (`#1A1A2E` Deep Navy & `#D4879C` Dusty Rose), cinematic scroll choreography, and automatic search-engine discoverability.

Rather than generic terminal tropes, the experience pairs a seamless dual-buffer floral video hero and a two-layer Z-axis camera portal with structured technical breakdowns of defensive and offensive security workflows.

---

## Portfolio Sections & Security Domains

| Section | Focus |
| :--- | :--- |
| **01 · Hero & Z-Axis Portal** | Dual-buffer pre-seeked floral video loop that zooms smoothly along the Z-axis directly into the editorial introduction with symmetrical forward & reverse easing. |
| **02 · Professional Introduction** | Concise perspective uniting Blue Team detection engineering with Red Team attack mechanics. |
| **03 · Core Expertise** | Three dedicated architectural chapters covering **Security Operations & Threat Detection (MITRE ATT&CK)**, **Web Application & API Security (OWASP Top 10 / API 10)**, and **Active Directory Security & Hardening**. |
| **04 · Open Source & Labs** | Direct gateway to ongoing security scripts, detection engineering notes, and lab research on GitHub. |
| **05 · Technical Ecosystem** | Filterable 7-category showcase and continuous horizontal marquee covering **32 cybersecurity & engineering tools** across SIEM (`Splunk`, `Elastic`, `Wazuh`, `QRadar`), Network Analysis (`Wireshark`, `Zeek`, `Suricata`, `Snort`), Web/API Testing (`Burp Suite`, `OWASP ZAP`, `Postman`, `sqlmap`, `Nikto`), Active Directory (`BloodHound`, `PowerView`, `Mimikatz`, `Impacket`, `NetExec`), Reconnaissance (`Nmap`, `Metasploit`), Scripting (`Python`, `PowerShell`, `Bash`, `C/C++`, `Java`), and Platforms. |
| **06 · Security Methodology** | Four-phase connected workflow: **01 Discover** → **02 Assess** → **03 Investigate** → **04 Improve**. |
| **07 · Contact Modal & Footer** | Accessible top-layer `<dialog>` contact experience with live HTTP email delivery, paired with a full-viewport navigation drawer and the signature `salmaatou` brand mark. |

---

## Engineering & Architecture

- **Framework & Styling**: React 19, TypeScript, Vite 8, and Tailwind CSS 4.
- **Brand Typography**: Attached double-diamond emblem paired with lowercase *`salma`* (`Times New Roman MT` Italic) + **`atou`** (`Be Vietnam Pro` Bold).
- **Motion Engine**: Powered exclusively by **GSAP 3.15 (`ScrollSmoother` + `ScrollTrigger`)** with `pinType: 'transform'`, compositor-only `translate3d` / `scale3d` GPU animations on the floating Apple-inspired Liquid Glass navbar, and full `prefers-reduced-motion` support.
- **Functional Email Delivery**:
  - Serverless endpoint at `api/contact.ts` (`POST /api/contact`) with input validation, HTML sanitization, and optional **Resend** (`RESEND_API_KEY`) delivery.
  - Zero-key fallback via **FormSubmit AJAX** (`https://formsubmit.co/ajax/...`) out of the box.
- **Automatic Search Engine Optimization (SEO)**:
  - Embedded `Schema.org` `@graph` (`ProfilePage`, `Person`, `WebSite`) cross-linking Salma Atou's verified `LinkedIn` and `TryHackMe` entities (`sameAs`).
  - Domain-auto-detecting Vercel endpoints for `/robots.txt` (`api/robots.ts`) and `/sitemap.xml` (`api/sitemap.ts`).
  - Runtime canonical URL hydration, Open Graph `profile` metadata, web app manifest (`public/site.webmanifest`), adaptive SVG favicon (`public/favicon.svg`), and `<noscript>` crawler summary.

---

## Project Structure

```text
├── api/
│   ├── contact.ts          # Vercel Serverless POST /api/contact email handler
│   ├── robots.ts           # Dynamic domain-aware /robots.txt generator
│   └── sitemap.ts          # Dynamic domain-aware /sitemap.xml generator
├── public/
│   ├── assets/             # Editorial illustrations & adaptive README brand banners
│   ├── favicon.svg         # Light/dark adaptive double-diamond site icon
│   └── site.webmanifest    # Web application manifest
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx # Dual-buffer video loop & pinned 2-layer Z-axis zoom
│   │   ├── Navbar.tsx      # Liquid Glass floating capsule & 100dvh menu drawer
│   │   ├── icons/          # Vector brand & cybersecurity tool icons
│   │   ├── sections/       # Post-hero editorial portfolio sections & contact modal
│   │   └── ui/             # BrandLogo, PillButton, and layout primitives
│   ├── context/            # Centralized GSAP ScrollSmoother provider
│   ├── data/               # Typed source-of-truth profile data & unit tests
│   └── types/              # Strict TypeScript interfaces & verification guards
├── index.html              # SEO metadata, Schema.org JSON-LD graph, & fonts
└── vercel.json             # Rewrites, immutable asset caching, & security headers
```

---

## Local Development

**Prerequisites:** Node.js `>= 20`

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (http://localhost:3000)
npm run dev

# 3. Run TypeScript typecheck, unit tests, and production build
npm run lint
npx tsx --test src/data/navData.test.ts
npm run build
```

---

## Deploying on Vercel

This repository is pre-configured for zero-config deployment on **Vercel** via `vercel.json`:

1. Import `AyoubAmeur-crypto/cybernovaportfolio` in the **Vercel Dashboard**.
2. Deploy with the default **Vite** preset (`npm run build` → `dist`).
3. *(Optional)* Configure environment variables in Vercel Project Settings:

| Variable | Required | Description |
| :--- | :---: | :--- |
| `VITE_CONTACT_EMAIL` | No | Overrides default recipient (`Salmaatouofficiel@gmail.com`). |
| `RESEND_API_KEY` | No | Enables server-side delivery via `/api/contact` instead of FormSubmit AJAX. |
| `CONTACT_TO_EMAIL` | No | Server-side recipient for `/api/contact` when `RESEND_API_KEY` is set. |
| `SITE_URL` | No | Explicit canonical origin override for `/robots.txt` and `/sitemap.xml`. |

---

<div align="center">
  <sub><em>“Trust, but verify — then verify again.”</em> — Salma Atou</sub>
</div>
