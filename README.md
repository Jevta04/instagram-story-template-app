# Koš Lounge — Instagram Story Editor

A web-based tool for creating Instagram Story posts (9:16) for Koš Lounge restaurant. Built with React and Vite, exports high-quality 1080×1920px PNG files ready for Instagram.

---

## Features

- **4 templates** — Classic, Split, Dark, Elegance
- **Per-dish customization** — name, subtitle, and photo for each dish
- **Background image** support with overlay
- **High-quality PNG export** — 1080×1920px via html2canvas
- **No quality loss** — images use `URL.createObjectURL` for full resolution
- **Reset** — clear all inputs with one click

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
You may view and share this code, but you may not use, modify, or distribute it without permission.
