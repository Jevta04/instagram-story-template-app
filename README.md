# Koš Lounge — Instagram Story Editor

A web-based tool for creating ready-to-post Instagram Stories and social media visuals in under a minute — no design skills required.

Built for [Koš Lounge](https://www.instagram.com/kos.lounge/) as a client project — enables the restaurant staff to quickly produce daily menu posts with consistent branding, without any design tools or technical knowledge.

🔗 **Live app:** [kos-template.vercel.app](https://kos-template.vercel.app/) — works on desktop and mobile

---

## What it does

Fill in the day, dish names, prices and photos — pick a template — download. That's it.

- **Under a minute** from blank to export-ready post
- **4 templates** — Classic, Split, Dark, Elegance — each with a distinct visual style
- **Per-dish control** — name, subtitle, and photo for each dish individually
- **Add or remove dish photos** with a single click
- **Background image** support with automatic overlay
- **Day of the week** selector
- **Menu title and price** fields
- **High-quality PNG export** — 1080×1920px, Instagram Story ready
- **Reset** — clear everything and start fresh with one click

---

## Tech Stack

- [React](https://react.dev/) — UI
- [Vite](https://vitejs.dev/) — build tool
- [html2canvas](https://html2canvas.hertzen.com/) — PNG export

## Project Structure

```
src/
├── assets/
│   └── koslogo.png
├── components/
│   ├── Corners.jsx
│   ├── KosLogo.jsx
│   └── Panel.jsx
├── hooks/
│   ├── useFavicon.js
│   ├── useHandleImages.js
│   └── useHandleDishName.js
├── utils/
│   ├── loadHtml2Canvas.js
│   └── handleDownload.js
├── templates/
│   ├── ClassicTemplate.jsx / .css
│   ├── SplitTemplate.jsx  / .css
│   ├── DarkTemplate.jsx   / .css
│   └── EleganceTemplate.jsx / .css
├── variables.css
├── templates.css
├── App.jsx
└── App.css
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Export

The preview renders at 270×480px. On export, html2canvas captures at 4× scale producing a 1080×1920px PNG — the standard Instagram Story resolution.

---

## License

Copyright (c) 2025 Ognjen Jevtić

This project is licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).
You may view and share this code, but you may not use, modify, or distribute it without written permission from the author.