import "../templates.css";
import "./SplitTemplate.css";
import KosLogo from "../components/KosLogo.jsx";
import Corners from "../components/Corners.jsx";

/**
 * @param {{ title: string, day: string, price: string, dishes: {name: string, image: string}[], bgImage: string }} props
 */
export default function SplitTemplate({ title, day, price, dishes, bgImage }) {
  return (
    <div className="split-wrap">
      {bgImage && <>
        <div className="split-bg" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="split-bg-overlay" />
      </>}
      <div className="tpl-top-line" />
      <div className="tpl-bottom-line" />
      <Corners />
      <div className="split-content">
        <KosLogo size={70} />
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