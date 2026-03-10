import { useState, useRef } from "react";
import "./App.css";

import useFavicon from "./hooks/useFavicon.js";
import useHandleImages from "./hooks/useHandleImages.js";
import useHandleDishName from "./hooks/useHandleDishName.js";
import handleDownload from "./utils/handleDownload.js";

import KosLogo from "./components/KosLogo.jsx";
import Panel from "./components/Panel.jsx";

import ClassicTemplate from "./templates/ClassicTemplate.jsx";
import SplitTemplate from "./templates/SplitTemplate.jsx";
import DarkTemplate from "./templates/DarkTemplate.jsx";
import EleganceTemplate from "./templates/EleganceTemplate.jsx";

const TEMPLATES = [
  { id: "classic",  name: "Klasik",   maxDishes: 3 },
  { id: "split",    name: "Split",    maxDishes: 4 },
  { id: "dark",     name: "Tamni",    maxDishes: 3 },
  { id: "elegance", name: "Elegance", maxDishes: 3 },
];
// maxDishes: maksimalan broj jela koji staje na template

const DAYS = ["Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota", "Nedelja"];

export default function App() {
  useFavicon();

  const [template, setTemplate] = useState("classic");
  const [day, setDay]           = useState("Ponedeljak");
  const [price, setPrice]       = useState("0");
  const [title, setTitle]       = useState("Jelo dana");
  const [dishes, setDishes]     = useState([
    { name: "", image: "", subtitle: "" },
    { name: "", image: "", subtitle: "" },
    { name: "", image: "", subtitle: "" },
    { name: "", image: "", subtitle: "" },
  ]);
  const [bgImage, setBgImage]         = useState("");
  const [downloading, setDownloading] = useState(false);

  const dishRef0 = useRef(); const dishRef1 = useRef(); const dishRef2 = useRef(); const dishRef3 = useRef();
  const dishRefs = [dishRef0, dishRef1, dishRef2, dishRef3];
  const bgRef      = useRef();
  const previewRef = useRef();

  const { handleDishImage, handleBgImage, removeDishImage, removeBgImage } = useHandleImages(setDishes, setBgImage);
  const { updateDishName, updateDishSubtitle } = useHandleDishName(setDishes);

  // maksimalan broj jela koji se moze upisati za svaki tempalte; default 3
  const maxDishes = TEMPLATES.find(t => t.id === template)?.maxDishes ?? 3;
  const tplProps = { title, day, price, dishes: dishes.slice(0, maxDishes), bgImage };

  return (
    <div className="app-wrapper">
      <div className="app-inner">

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

          {/* ── CONTROLS ── */}
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
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Naslov"
                  className="app-input"
                />
                <div className="price-row">
                  <input
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Cena"
                    className="app-input"
                  />
                  <span className="price-unit">din.</span>
                </div>

              </div>
            </Panel>

            <Panel label="JELA — klikni kvadrat za sliku">
              {dishes.slice(0, maxDishes).map((d, i) => (
                <div key={i} className="dish-row">
                  <div className="dish-thumb-wrap">
                    <div
                      onClick={() => dishRefs[i].current.click()}
                      className="dish-thumb"
                      style={d.image
                        ? { backgroundImage: `url(${d.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                        : {}
                      }
                    >
                      {!d.image && "+"}
                    </div>
                    {d.image && (
                      <button
                        className="dish-thumb-remove"
                        onClick={() => removeDishImage(i)}
                      >✕</button>
                    )}
                  </div>
                  <input
                    ref={dishRefs[i]}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={e => handleDishImage(i, e)}
                  />
                  <div className="dish-inputs">
                    <input
                      value={d.name}
                      onChange={e => updateDishName(i, e.target.value)}
                      placeholder={`Jelo ${i + 1}`}
                      className="app-input"
                    />
                    <input
                      value={d.subtitle}
                      onChange={e => updateDishSubtitle(i, e.target.value)}
                      placeholder="Podnaslov (opciono)"
                      className="app-input app-input--sub"
                    />
                  </div>
                </div>
              ))}
            </Panel>

            <Panel label="POZADINSKA SLIKA">
              <div
                onClick={() => bgRef.current.click()}
                className="bg-upload-btn"
                style={bgImage ? { backgroundImage: `url(${bgImage})`, borderColor: "var(--color-primary-light)" } : {}}
              >
                {bgImage
                  ? <span className="bg-upload-loaded-label">✓ Slika učitana · klikni za promenu</span>
                  : "+ Dodaj pozadinsku sliku"
                }
              </div>
              <input ref={bgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleBgImage} />
              {bgImage && (
                <button onClick={removeBgImage} className="bg-remove-btn">
                  ✕ Ukloni pozadinu
                </button>
              )}
            </Panel>

            <button
              onClick={() => handleDownload(previewRef, title, day, setDownloading)}
              disabled={downloading}
              className="download-btn"
            >
              {downloading ? "⏳  Preuzimanje..." : "⬇️  Preuzmi Story (PNG)"}
            </button>
            <p className="export-note">Export: 1080 × 1920px · Instagram Story</p>
          </div>

          {/* ── PREVIEW ── */}
          <div className="preview-col">
            <span className="preview-label">PREVIEW 9:16</span>
            <div ref={previewRef} className="preview-frame">
              {template === "classic" && <ClassicTemplate {...tplProps} />}
              {template === "split"   && <SplitTemplate   {...tplProps} />}
              {template === "dark"    && <DarkTemplate    {...tplProps} />}
              {template === "elegance"  && <EleganceTemplate  {...tplProps} />}
            </div>
            <span className="preview-note">preview 270×480 · export 4× = 1080×1920</span>
          </div>

        </div>
      </div>
    </div>
  );
}