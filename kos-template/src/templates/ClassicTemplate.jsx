import "../templates.css";
import "./ClassicTemplate.css";
import KosLogo from "../components/KosLogo";
import Corners from "../components/Corners";

/**
 * @param {{ title: string, day: string, price: string, dishes: {name: string, image: string}[], bgImage: string }} props
 */
export default function ClassicTemplate({ title, day, price, dishes, bgImage }) {
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
        <KosLogo size={70} />
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
          {dishes.slice(0, 3).map((d, i) => (
            <div key={i} className="classic-dish-row">
              {d.image
                ? <div className="classic-dish-img" style={{ backgroundImage: `url(${d.image})` }} />
                : <div className="classic-dish-placeholder">🍽️</div>
              }
              <div>
                <div className="classic-dish-name">{d.name}</div>
                {d.subtitle && <div className="classic-dish-sub">{d.subtitle}</div>}
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