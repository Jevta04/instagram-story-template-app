import { useState, useRef, useEffect } from "react";
import "./app.css";
import kosLogo from "./assets/koslogo.png";

// Postavi favicon i tab title na logo aplikacije
const useFavicon = () => {
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = kosLogo;
    document.title = "Koš Lounge · Story Editor";
  }, []);
};

const loadHtml2Canvas = () =>
  new Promise((resolve) => {
    if (window.html2canvas) return resolve(window.html2canvas);
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    s.onload = () => resolve(window.html2canvas);
    document.head.appendChild(s);
  });

const KosLogo = ({ size = 100 }) => (
  <img
    src={kosLogo}
    alt="Koš Lounge"
    width={size}
    height={size}
    style={{ objectFit: "contain", display: "block", flexShrink: 0 }}
  />
);

const TEMPLATES = [{ id: "classic", name: "Klasik" }, { id: "split", name: "Split" }, { id: "dark", name: "Tamni" }];
const DAYS = ["Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota", "Nedelja"];

function Panel({ label, children }) {
  return (
    <div className="panel">
      <div className="panel-label">{label}</div>
      {children}
    </div>
  );
}

function Corners() {
  return (
    <>
      <div className="corner corner-tl" />
      <div className="corner corner-tr" />
      <div className="corner corner-bl" />
      <div className="corner corner-br" />
    </>
  );
}

export default function App() {
  useFavicon();

  const [template, setTemplate] = useState("classic");
  const [day, setDay] = useState("Ponedeljak");
  const [price, setPrice] = useState("1350");
  const [title, setTitle] = useState("Jelo dana");
  const [dishes, setDishes] = useState([
    { name: "Potaž", image: "" },
    { name: "Lazanje", image: "" },
    { name: "Kupus salata", image: "" },
  ]);
  const [bgImage, setBgImage] = useState("");
  const [downloading, setDownloading] = useState(false);

  const dishRef0 = useRef(); const dishRef1 = useRef(); const dishRef2 = useRef();
  const dishRefs = [dishRef0, dishRef1, dishRef2];
  const bgRef = useRef();
  const previewRef = useRef();

  const readFile = (file, cb) => {
    const reader = new FileReader();
    reader.onload = (e) => cb(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDishImage = (i, e) => {
    const file = e.target.files[0];
    if (!file) return;
    readFile(file, (result) => {
      setDishes(prev => {
        const next = [...prev];
        next[i] = { ...next[i], image: result };
        return next;
      });
    });
  };

  const handleBgImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    readFile(file, setBgImage);
  };

  const updateDishName = (i, val) => {
    setDishes(prev => { const n = [...prev]; n[i] = { ...n[i], name: val }; return n; });
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const h2c = await loadHtml2Canvas();
      const canvas = await h2c(previewRef.current, {
        scale: 4, useCORS: true, allowTaint: true, backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `kos-lounge-${title.replace(/\s+/g, "-").toLowerCase()}-${day.toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      alert("Greška. Pokušaj desni klik → Save image.");
    }
    setDownloading(false);
  };

  const tplProps = { title, day, price, dishes, bgImage };

  return (
    <div className="app-wrapper">
      <div className="app-inner">

        {/* HEADER sa pravim logom */}
        <div className="app-header">
          <div className="app-header-logo">
            <KosLogo size={72} />
          </div>
          <div className="app-header-text">
            <h1 className="app-title">KOŠ LOUNGE</h1>
            <p className="app-subtitle">INSTAGRAM STORY EDITOR · 9:16</p>
          </div>
        </div>

        <div className="app-layout">

          {/* CONTROLS */}
          <div className="controls-col">

            <Panel label="STIL TEMPLATE-A">
              <div className="template-btn-group">
                {TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`template-btn${template === t.id ? " active" : ""}`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </Panel>

            <Panel label="INFORMACIJE">
              <div className="field-group">
                <select value={day} onChange={e => setDay(e.target.value)} className="app-select">
                  {DAYS.map(d => <option key={d}>{d}</option>)}
                </select>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Naslov" className="app-input" />
                <div className="price-row">
                  <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Cena" className="app-input" />
                  <span className="price-unit">din.</span>
                </div>
              </div>
            </Panel>

            <Panel label="JELA — klikni kvadrat za sliku">
              {dishes.map((d, i) => (
                <div key={i} className="dish-row">
                  <div
                    onClick={() => dishRefs[i].current.click()}
                    className="dish-thumb"
                    style={d.image ? { backgroundImage: `url(${d.image})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
                  >
                    {!d.image && "+"}
                  </div>
                  <input ref={dishRefs[i]} type="file" accept="image/*" style={{ display: "none" }}
                    onChange={e => handleDishImage(i, e)} />
                  <input value={d.name} onChange={e => updateDishName(i, e.target.value)}
                    placeholder={`Jelo ${i + 1}`} className="app-input" />
                </div>
              ))}
            </Panel>

            <Panel label="POZADINSKA SLIKA">
              <div
                onClick={() => bgRef.current.click()}
                className="bg-upload-btn"
                style={bgImage ? { backgroundImage: `url(${bgImage})`, borderColor: "#5b9df9" } : {}}
              >
                {bgImage
                  ? <span className="bg-upload-loaded-label">✓ Slika učitana · klikni za promenu</span>
                  : "+ Dodaj pozadinsku sliku"
                }
              </div>
              <input ref={bgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleBgImage} />
              {bgImage && (
                <button onClick={() => setBgImage("")} className="bg-remove-btn">
                  ✕ Ukloni pozadinu
                </button>
              )}
            </Panel>

            <button onClick={handleDownload} disabled={downloading} className="download-btn">
              {downloading ? "⏳  Preuzimanje..." : "⬇️  Preuzmi Story (PNG)"}
            </button>
            <p className="export-note">Export: 1080 × 1920px · Instagram Story</p>
          </div>

          {/* PREVIEW */}
          <div className="preview-col">
            <span className="preview-label">PREVIEW 9:16</span>
            <div ref={previewRef} className="preview-frame">
              {template === "classic" && <ClassicTemplate {...tplProps} />}
              {template === "split"   && <SplitTemplate   {...tplProps} />}
              {template === "dark"    && <DarkTemplate    {...tplProps} />}
            </div>
            <span className="preview-note">preview 270×480 · export 4× = 1080×1920</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── TEMPLATE 1: CLASSIC ── */
function ClassicTemplate({ title, day, price, dishes, bgImage }) {
  return (
    <div
      className="classic-wrap"
      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
    >
      <div className="classic-overlay" />
      <div className="tpl-top-line" />
      <div className="tpl-bottom-line" />
      <Corners />
      <div className="classic-content">
        <KosLogo size={90} />
        <div className="classic-day-badge">
          <span>{day.toUpperCase()}</span>
        </div>
        <h2 className="classic-title">{title}</h2>
        <div className="tpl-divider">
          <div className="tpl-divider-line-l" />
          <span className="tpl-divider-icon">✦</span>
          <div className="tpl-divider-line-r" />
        </div>
        <div className="classic-dishes">
          {dishes.map((d, i) => (
            <div key={i} className="classic-dish-row">
              {d.image
                ? <div className="classic-dish-img" style={{ backgroundImage: `url(${d.image})` }} />
                : <div className="classic-dish-placeholder">🍽️</div>
              }
              <div>
                <div className="classic-dish-name">{d.name}</div>
                <div className="classic-dish-sub">KOŠ LOUNGE</div>
              </div>
            </div>
          ))}
        </div>
        <div className="classic-price-box">
          <div className="classic-price-label">CENA KOMPLETNOG MENIJA</div>
          <div className="classic-price-value">
            {price} <span className="classic-price-unit">dinara</span>
          </div>
        </div>
        <div className="tpl-footer-address">Vojvode Stepe 118 · @kos.lounge</div>
      </div>
    </div>
  );
}

/* ── TEMPLATE 2: SPLIT ── */
function SplitTemplate({ title, day, price, dishes, bgImage }) {
  return (
    <div className="split-wrap">
      {bgImage && <>
        <div className="split-bg" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="split-bg-overlay" />
      </>}
      <div className="tpl-top-line" />
      <div className="tpl-bottom-line" />
      <div className="split-content">
        <KosLogo size={90} />
        <div className="split-day-badge">
          <span>{day.toUpperCase()}</span>
        </div>
        <h2 className="split-title">{title}</h2>
        <div className="split-divider">
          <div className="tpl-divider-line-l" />
          <span className="tpl-divider-icon">◆</span>
          <div className="tpl-divider-line-r" />
        </div>
        <div className="split-grid">
          {dishes.map((d, i) => (
            <div key={i} className="split-dish-card">
              {d.image
                ? <div className="split-dish-img" style={{ backgroundImage: `url(${d.image})` }} />
                : <div className="split-dish-placeholder">🍽️</div>
              }
              <div className="split-dish-label">
                <div className="split-dish-name">{d.name}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="split-price-box">
          <div className="split-price-label">CENA MENIJA</div>
          <div className="split-price-value">
            {price} <span className="split-price-unit">RSD</span>
          </div>
        </div>
        <div className="tpl-footer-address">@kos.lounge · Vojvode Stepe 118</div>
      </div>
    </div>
  );
}

/* ── TEMPLATE 3: DARK LUXURY ── */
function DarkTemplate({ title, day, price, dishes, bgImage }) {
  return (
    <div className="dark-wrap">
      {bgImage && <>
        <div className="dark-bg" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="dark-bg-overlay" />
      </>}
      <div className="dark-circle-1" />
      <div className="dark-circle-2" />
      <div className="dark-circle-3" />
      <div className="tpl-top-line" />
      <div className="tpl-bottom-line" />
      <Corners />
      <div className="dark-content">
        <div className="dark-header-row">
          <div>
            <div className="dark-day-label">{day.toUpperCase()}</div>
            <h2 className="dark-title">{title}</h2>
          </div>
          <KosLogo size={90} />
        </div>
        <div className="dark-divider">
          <div className="dark-divider-line" />
          <span className="dark-divider-icon">✦</span>
        </div>
        <div className="dark-dishes">
          {dishes.map((d, i) => (
            <div key={i} className="dark-dish-row">
              {d.image
                ? <div className="dark-dish-img" style={{ backgroundImage: `url(${d.image})` }} />
                : <div className="dark-dish-placeholder">🍽️</div>
              }
              <div>
                <div className="dark-dish-name">{d.name}</div>
                <div className="dark-dish-sub">KOŠ LOUNGE</div>
              </div>
            </div>
          ))}
        </div>
        <div className="dark-footer">
          <div>
            <div className="dark-footer-price-label">KOMPLETAN MENI</div>
            <div className="dark-footer-price">
              {price}<span className="dark-footer-price-unit"> din.</span>
            </div>
          </div>
          <div className="dark-footer-address">
            <div className="dark-footer-street">Vojvode Stepe 118</div>
            <div className="dark-footer-handle">@kos.lounge</div>
          </div>
        </div>
      </div>
    </div>
  );
}