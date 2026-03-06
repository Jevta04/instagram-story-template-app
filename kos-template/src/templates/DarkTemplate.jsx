import "../templates.css";
import "./DarkTemplate.css";
import KosLogo from "../components/KosLogo.jsx";
import Corners from "../components/Corners.jsx";

/**
 * @param {{ title: string, day: string, price: string, dishes: {name: string, image: string}[], bgImage: string }} props
 */
export default function DarkTemplate({ title, day, price, dishes, bgImage }) {
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
